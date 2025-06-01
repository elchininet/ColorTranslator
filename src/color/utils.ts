import {
    CIELabObject,
    CIELabObjectGeneric,
    CIELabOutput,
    CMYKObject,
    ColorInput,
    ColorInputWithoutCMYK,
    ColorOutput,
    HEXObject,
    HEXOutput,
    HSLObject,
    HSLObjectGeneric,
    HSLOutput,
    HWBObject,
    HWBObjectGeneric,
    HWBOutput,
    LCHObject,
    LCHObjectGeneric,
    LCHOutput,
    Options,
    RGBObject,
    RGBObjectGeneric,
    RGBOutput,
    RGYBObject,
    RYBObject
} from '@types';
import {
    BASE_255,
    ColorModel,
    Mix,
    MixString
} from '#constants';
import {
    getHEX,
    hasProp,
    minmax,
    normalizeAlpha,
    normalizeHue,
    round
} from '#helpers';
import {
    hslToRgb,
    hueRyb,
    rgbToCmyk,
    rgbToHsl,
    rgbToHwb,
    rgbToLab,
    rgbToLch,
    rgbToRyb,
    rybToRgb
} from '#color/translators';
import {
    getColorModel,
    getRGBObject
} from './extractors';
import {
    roundCIELabObject,
    roundCMYKObject,
    roundHSLObject,
    roundHWBObject,
    roundLCHObject
} from './rounders';
import { CSS } from '#color/css';

type HarmonyFunction = (color: HSLObject, mode: MixString) => HSLObject[];

//---Harmony
const harmony = (
    color: HSLObject,
    angles: number[],
    mode: MixString
): HSLObject[] =>
    angles.reduce(
        (arr: HSLObject[], num: number): HSLObject[] =>
            (
                [
                    ...arr,
                    {
                        ...color,
                        H: mode === Mix.ADDITIVE
                            ? normalizeHue(color.H + num)
                            : normalizeHue(hueRyb(hueRyb(color.H, false) + num, true))
                    }
                ]
            ), [{...color}]
    );

export const analogous          = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [30, -30], mode);
export const complementary      = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [180], mode);
export const splitComplementary = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [150, -150], mode);
export const triadic            = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [120, -120], mode);
export const tetradic           = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [60, -120, 180], mode);
export const square             = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [90, -90, 180], mode);

//---Get the color values from an object
export const translateColor = {

    [ColorModel.HEX](color: RGBObject): HEXObject {
        return {
            R: getHEX(color.R),
            G: getHEX(color.G),
            B: getHEX(color.B)
        };
    },

    HEXA(color: RGBObject): HEXObject {
        const RGB = translateColor.HEX(color);
        RGB.A = hasProp<RGBObject>(color, 'A')
            ? getHEX(color.A * BASE_255)
            : '0xFF';
        return RGB;
    },

    [ColorModel.RGB](color: RGBObject, decimals: number): RGBObject {
        const RGB = roundRGBObject(color, decimals);
        if (hasProp<RGBObject>(RGB, 'A')) {
            delete RGB.A;
        }
        return RGB;
    },

    RGBA(color: RGBObject, decimals: number): RGBObject {
        const RGB = translateColor.RGB(color, decimals);
        RGB.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A)
            : 1;
        return RGB;
    },

    [ColorModel.HSL](color: RGBObject, decimals: number): HSLObject {
        const HSL = rgbToHsl(color.R, color.G, color.B);
        delete HSL.A;
        return roundHSLObject(HSL, decimals);
    },

    HSLA(color: RGBObject, decimals: number): HSLObject {
        const HSL = translateColor.HSL(color, decimals);
        HSL.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return HSL;
    },

    [ColorModel.HWB](color: RGBObject, decimals: number): HWBObject {
        const HWB = rgbToHwb(color.R, color.G, color.B);
        delete HWB.A;
        return roundHWBObject(HWB, decimals);
    },

    HWBA(color: RGBObject, decimals: number): HWBObject {
        const HWB = translateColor.HWB(color, decimals);
        HWB.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return HWB;
    },

    [ColorModel.CIELab](color: RGBObject, decimals: number): CIELabObject {
        const Lab = rgbToLab(color.R, color.G, color.B);
        return roundCIELabObject(Lab, decimals);
    },

    CIELabA(color: RGBObject, decimals: number): CIELabObject {
        const Lab = translateColor.CIELab(color, decimals);
        Lab.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return Lab;
    },

    [ColorModel.LCH](color: RGBObject, decimals: number): LCHObject {
        const lch = rgbToLch(color.R, color.G, color.B);
        return roundLCHObject(lch, decimals);
    },

    LCHA(color: RGBObject, decimals: number): LCHObject {
        const lch = translateColor.LCH(color, decimals);
        lch.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return lch;
    },

    [ColorModel.CMYK](color: RGBObject, decimals: number): CMYKObject {
        return roundCMYKObject(
            rgbToCmyk(color.R, color.G, color.B),
            decimals
        );
    },

    CMYKA(color: RGBObject, decimals: number): CMYKObject {
        const CMYK = translateColor.CMYK(color, decimals);
        CMYK.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return CMYK;
    }
};

//---Blending
export const blend = (from: RGBObject, to: RGBObject, steps: number): RGBObject[] => {
    const div = steps - 1;
    const diffR = (to.R - from.R) / div;
    const diffG = (to.G - from.G) / div;
    const diffB = (to.B - from.B) / div;
    const fromA = normalizeAlpha(from.A);
    const toA = normalizeAlpha(to.A);
    const diffA = (toA - fromA) / div;
    return Array(steps).fill(null).map((__n, i): RGBObject => {
        if (i === 0) { return from; }
        if (i === div) { return to; }
        return {
            R: round(from.R + diffR * i),
            G: round(from.G + diffG * i),
            B: round(from.B + diffB * i),
            A: round(fromA + diffA * i)
        };
    });
};

//---Shades
export const getColorMixture = (
    color: ColorInputWithoutCMYK,
    steps: number,
    shades: boolean,
    options: Options
): ColorOutput[] => {
    const model = getColorModel(color);
    const isCSS = typeof color === 'string';
    const RGB = getRGBObject(color, model);
    const hasAlpha = (
        (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
        (typeof color !== 'string' &&
            hasProp<
                | RGBObjectGeneric
                | HSLObjectGeneric
                | HWBObjectGeneric
                | CIELabObjectGeneric
                | LCHObjectGeneric
            >(color, 'A'))
    );
    const HSL: HSLObject = rgbToHsl(RGB.R, RGB.G, RGB.B, RGB.A);
    if (!hasAlpha) delete HSL.A;
    const increment = shades
        ? HSL.L / (steps + 1)
        : (100 - HSL.L) / (steps + 1);
    const hslMap = Array(steps).fill(null).map((__n, i): HSLObject => ({
        ...HSL,
        L: HSL.L + increment * (i + 1) * (1 - +shades * 2)
    }));
    switch(model) {
        case ColorModel.HEX:
        default:
            return hslMap.map((HSLColor: HSLObject): HEXOutput => {
                const RGBColor = hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? hasAlpha
                        ? CSS.HEX(
                            {
                                ...RGBColor,
                                A: round(RGBColor.A * BASE_255)
                            }
                        )
                        : CSS.HEX(RGBColor)
                    : hasAlpha
                        ? translateColor.HEXA(RGBColor)
                        : translateColor.HEX(RGBColor);
            });
        case ColorModel.RGB:
            return hslMap.map((HSLColor: HSLObject): RGBOutput => {
                const RGBColor = hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? CSS.RGB(RGBColor, options)
                    : hasAlpha
                        ? translateColor.RGBA(RGBColor, options.decimals)
                        : translateColor.RGB(RGBColor, options.decimals);;
            });
        case ColorModel.HSL:
            return hslMap.map((HSLColor: HSLObject): HSLOutput => {
                return isCSS
                    ? CSS.HSL(HSLColor, options)
                    : hasAlpha
                        ? translateColor.HSLA(
                            {
                                ...hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L),
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                        : translateColor.HSL(
                            hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L),
                            options.decimals
                        );
            });
        case ColorModel.HWB:
            return hslMap.map((HSLColor: HSLObject): HWBOutput => {
                const RGBColor = hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;  
                const hwb = hasAlpha
                    ? translateColor.HWBA(RGBColor, options.decimals)
                    : translateColor.HWB(RGBColor, options.decimals);
                return isCSS
                    ? CSS.HWB(hwb, options)
                    : hwb;
            });
        case ColorModel.CIELab:
            return hslMap.map((HSLColor: HSLObject): CIELabOutput => {
                const RGBColor = hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                const lab = hasAlpha
                    ? translateColor.CIELabA(RGBColor, options.decimals)
                    : translateColor.CIELab(RGBColor, options.decimals);
                return isCSS
                    ? CSS.CIELab(lab, options)
                    : lab;
            });
        case ColorModel.LCH:
            return hslMap.map((HSLColor: HSLObject): LCHOutput => {
                const RGBColor = hslToRgb(HSLColor.H, HSLColor.S, HSLColor.L);
                const LCHColor = rgbToLch(RGBColor.R, RGBColor.G, RGBColor.B);
                if (hasAlpha) LCHColor.A = HSLColor.A;
                return isCSS
                    ? CSS.LCH(LCHColor, options)
                    : hasAlpha
                        ? translateColor.LCHA(
                            {
                                ...RGBColor,
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                        : translateColor.LCH(
                            RGBColor,
                            options.decimals
                        );
            });
    }
};

//---Harmony
export const colorHarmony = {

    buildHarmony(
        color: ColorInputWithoutCMYK,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        options: Options
    ): ColorOutput[] {
        const model = getColorModel(color);
        const RGB = getRGBObject(color, model);
        const HSL = rgbToHsl(RGB.R, RGB.G, RGB.B, RGB.A);
        const hasAlpha = (
            (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
            (
                typeof color !== 'string' &&
                hasProp<
                    | RGBObjectGeneric
                    | HSLObjectGeneric
                    | HWBObjectGeneric
                    | CIELabObjectGeneric
                    | LCHObjectGeneric
                >(color, 'A')
            )
        );
        const isCSS = typeof color === 'string';
        switch(model) {
            case ColorModel.HEX:
            default:
                return hasAlpha
                    ? this.HEXA(
                        roundHSLObject(HSL, 0),
                        harmonyFunction,
                        mode,
                        isCSS
                    )
                    : this.HEX(
                        roundHSLObject(HSL, 0),
                        harmonyFunction,
                        mode,
                        isCSS
                    );
            case ColorModel.HSL:
                return hasAlpha
                    ? this.HSLA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.HSL(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.HWB:
                return hasAlpha
                    ? this.HWBA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.HWB(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.RGB:
                return hasAlpha
                    ? this.RGBA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.RGB(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.CIELab:
                return hasAlpha
                    ? this.CIELabA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.CIELab(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.LCH:
                return hasAlpha
                    ? this.LCHA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.LCH(HSL, harmonyFunction, mode, isCSS, options);
        }
    },

    [ColorModel.HEX](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        hslToRgb(c.H, c.S, c.L)
                    )
                    : translateColor.HEX(
                        hslToRgb(c.H, c.S, c.L)
                    )
            )
        );
    },

    HEXA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        {
                            ...hslToRgb(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A) * BASE_255
                        }
                    )
                    : translateColor.HEXA({
                        ...hslToRgb(c.H, c.S, c.L),
                        A: normalizeAlpha(c.A)
                    })
            )
        );
    },

    [ColorModel.RGB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        hslToRgb(c.H, c.S, c.L),
                        options
                    )
                    : translateColor.RGB(
                        hslToRgb(c.H, c.S, c.L),
                        options.decimals
                    )
            )
        );
    },

    RGBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        {
                            ...hslToRgb(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.RGBA(
                        {
                            ...hslToRgb(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    )
            )
        );
    },

    [ColorModel.HSL](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        {
                            H: c.H,
                            S: c.S,
                            L: c.L
                        },
                        options
                    )
                    : translateColor.HSL(
                        hslToRgb(c.H, c.S, c.L),
                        options.decimals
                    )
            )
        );
    },

    HSLA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        {
                            ...c,
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.HSLA(
                        {
                            ...hslToRgb(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    )
            )
        );
    },

    [ColorModel.HWB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HWBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HWBOutput => {
                const rgb = hslToRgb(c.H, c.S, c.L);
                const hwb = rgbToHwb(rgb.R, rgb.G, rgb.B);
                return css
                    ? CSS.HWB(
                        {
                            H: hwb.H,
                            W: hwb.W,
                            B: hwb.B
                        },
                        options
                    )
                    : translateColor.HWB(
                        rgb,
                        options.decimals
                    );
            }
        );
    },

    HWBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HWBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HWBOutput => {
                const rgb = hslToRgb(c.H, c.S, c.L);
                const hwb = rgbToHwb(rgb.R, rgb.G, rgb.B);
                return css
                    ? CSS.HWB(
                        {
                            ...hwb,
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.HWBA(
                        {
                            ...rgb,
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    );
            }
        );
    },

    [ColorModel.CIELab](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): CIELabOutput => {
                const RGB = hslToRgb(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.CIELab(
                            rgbToLab(
                                RGB.R,
                                RGB.G,
                                RGB.B
                            ),
                            options
                        )
                        : translateColor.CIELab(
                            RGB,
                            options.decimals
                        )
                );
            }
        );
    },

    CIELabA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): CIELabOutput => {
                const RGB = hslToRgb(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.CIELab(
                            {
                                ...rgbToLab(
                                    RGB.R,
                                    RGB.G,
                                    RGB.B
                                ),
                                A: normalizeAlpha(c.A)
                            },
                            options
                        )
                        : translateColor.CIELabA(
                            {
                                ...RGB,
                                A: normalizeAlpha(c.A)
                            },
                            options.decimals
                        )
                );
            }
        );
    },

    [ColorModel.LCH](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): LCHOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): LCHOutput => {
                const RGB = hslToRgb(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.LCH(
                            rgbToLch(
                                RGB.R,
                                RGB.G,
                                RGB.B
                            ),
                            options
                        )
                        : translateColor.LCH(
                            RGB,
                            options.decimals
                        )
                );
            }
        );
    },

    LCHA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): LCHOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): LCHOutput => {
                const RGB = hslToRgb(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.LCH(
                            {
                                ...rgbToLch(
                                    RGB.R,
                                    RGB.G,
                                    RGB.B
                                ),
                                A: normalizeAlpha(c.A)
                            },
                            options
                        )
                        : translateColor.LCHA(
                            {
                                ...RGB,
                                A: normalizeAlpha(c.A)
                            },
                            options.decimals
                        )
                );
            }
        );
    }
};

export const colorMixer = {

    mix(colors: ColorInput[], mode: MixString): RGBObject {

        const rgbMap = colors.map((color: ColorInput): RGBObject => {
            const model = getColorModel(color);
            return getRGBObject(color, model);
        });

        const rybMap = mode === Mix.SUBTRACTIVE
            ? rgbMap.map((color: RGBObject): RYBObject => {
                const RYB = rgbToRyb(color.R, color.G, color.B);
                if (hasProp<RGBObject>(color, 'A')) {
                    RYB.A = color.A;
                }
                return RYB;
            })
            : null;

        function createMix(items: RGBObject[]): RGBObject;
        function createMix(items: RYBObject[]): RYBObject;
        function createMix(items: RGYBObject[]): RGYBObject {
            const initial = mode === Mix.ADDITIVE
                ? {R: 0, G: 0, B: 0, A: 0}
                : {R: 0, Y: 0, B: 0, A: 0};
            return items.reduce((mix: RGYBObject, color: RGYBObject): RGYBObject => {
                const colorA = hasProp<RGYBObject>(color, 'A') ? color.A : 1;
                const common = {
                    R: Math.min(mix.R  + color.R * colorA, BASE_255),
                    B: Math.min(mix.B + color.B * colorA, BASE_255),
                    A: 1 - (1 - colorA) * (1 - mix.A)
                };
                const mixGY = 'G' in mix
                    ? mix.G
                    : mix.Y;
                const colorGY = 'G' in color
                    ? color.G
                    : color.Y;
                return {
                    ...common,
                    ...(mode === Mix.ADDITIVE
                        ? { G: Math.min(mixGY + colorGY * colorA, BASE_255) }
                        : { Y: Math.min(mixGY + colorGY * colorA, BASE_255) }
                    )
                };
            }, initial);
        }

        let mix: RGBObject;

        if (mode === Mix.ADDITIVE) {
            mix = createMix(rgbMap);
        } else {
            const RYB = createMix(rybMap);
            mix = rybToRgb(RYB.R, RYB.Y, RYB.B);
            mix.A = RYB.A;
        }

        return {
            R: round(mix.R),
            G: round(mix.G),
            B: round(mix.B),
            A: minmax(mix.A, 0, 1)
        };
    },
    [ColorModel.HEX]<CSS extends boolean, R = CSS extends true ? string : HEXObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEX(mix)
        ) as R;
    },
    HEXA<CSS extends boolean, R = CSS extends true ? string : HEXObject >(
        colors: ColorInput[],
        mode: MixString,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        mix.A = css
            ? normalizeAlpha(mix.A) * BASE_255
            : normalizeAlpha(mix.A);
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEXA(mix)
        ) as R;
    },
    [ColorModel.RGB]<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGB(mix, options.decimals)
        ) as R;
    },
    RGBA<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGBA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.HSL]<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHsl(mix.R, mix.G, mix.B);
        delete mix.A;
        delete HSL.A;
        return (
            css
                ? CSS.HSL(HSL, options)
                : translateColor.HSL(mix, options.decimals)
        ) as R;
    },
    HSLA<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHsl(mix.R, mix.G, mix.B, mix.A);
        return (
            css
                ? CSS.HSL(HSL, options)
                : translateColor.HSLA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.HWB]<CSS extends boolean, R = CSS extends true ? string : HWBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HWB = rgbToHwb(mix.R, mix.G, mix.B);
        delete mix.A;
        delete HWB.A;
        return (
            css
                ? CSS.HWB(HWB, options)
                : translateColor.HWB(mix, options.decimals)
        ) as R;
    },
    HWBA<CSS extends boolean, R = CSS extends true ? string : HWBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HWB = rgbToHwb(mix.R, mix.G, mix.B, mix.A);
        return (
            css
                ? CSS.HWB(HWB, options)
                : translateColor.HWBA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.CIELab]<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        delete mix.A;
        return (
            css
                ? CSS.CIELab(Lab, options)
                : translateColor.CIELab(mix, options.decimals)
        ) as R;
    },
    CIELabA<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        if (hasProp<RGBObject>(mix, 'A')) {
            Lab.A = mix.A;
        }
        return (
            css
                ? CSS.CIELab(Lab, options)
                : translateColor.CIELabA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.LCH]<CSS extends boolean, R = CSS extends true ? string : LCHObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const lch = rgbToLch(mix.R, mix.G, mix.B);
        delete mix.A;
        return (
            css
                ? CSS.LCH(lch, options)
                : translateColor.LCH(mix, options.decimals)
        ) as R;
    },
    LCHA<CSS extends boolean, R = CSS extends true ? string : LCHObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const lch = rgbToLch(mix.R, mix.G, mix.B);
        if (hasProp<RGBObject>(mix, 'A')) {
            lch.A = mix.A;
        }
        return (
            css
                ? CSS.LCH(lch, options)
                : translateColor.LCHA(mix, options.decimals)
        ) as R;
    }
};

export const roundRGBObject = (
    color: RGBObject,
    decimals: number
): RGBObject => {
    const R = round(color.R, decimals);
    const G = round(color.G, decimals);
    const B = round(color.B, decimals);
    return {
        R,
        G,
        B,
        ...(
            hasProp<RGBObject>(color, 'A')
                ? {
                    A: round(color.A, decimals)
                }
                : {}
        )
    };
};