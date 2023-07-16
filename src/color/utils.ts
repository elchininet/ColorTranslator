import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    RGBObjectGeneric,
    HSLObjectGeneric,
    CMYKObjectGeneric,
    CMYKObject,
    HSLObject,
    RGBObject,
    RYBObject,
    RGYBObject,
    HEXObject,
    RGBOutput,
    HSLOutput,
    HEXOutput,
    ColorOutput,
    Options,
    AnglesUnitEnum
} from '@types';
import {
    HEX,
    PCENT,
    ColorModel,
    Mix,
    ColorKeywords,
    COLORREGS,
    COLOR_KEYS,
    ERRORS,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    getOrderedArrayString,
    getDEC,
    getHEX,
    getBase255Number,
    getCMYKNumber,
    hasProp,
    percent,
    percentNumber,
    round,
    minmax,
    normalizeHue,
    translateDegrees
} from '#helpers';
import {
    rgbToHSL,
    hslToRGB,
    cmykToRGB,
    rgbToCMYK,
    rgbToRYB,
    rybToRGB,
    hueRYB
} from '#color/translators';
import { CSS } from '#color/css';

type HarmonyFunction = (color: HSLObject, mode: Mix) => HSLObject[];

//---Normalize alpha
export const normalizeAlpha = (alpha: number | string | undefined | null): number => {
    if (typeof alpha === 'string') {
        if(PCENT.test(alpha)) {
            alpha = percentNumber(alpha) / 100;
        } else {
            alpha = +alpha;
        }
    }
    return (isNaN(+alpha) || alpha > 1) ? 1 : round(alpha);
};

//---Harmony
const harmony = (
    color: HSLObject,
    angles: number[],
    mode: Mix
): HSLObject[] =>
    angles.reduce(
        (arr: HSLObject[], num: number): HSLObject[] =>
            (
                [
                    ...arr,
                    {
                        ...color,
                        h: mode === Mix.ADDITIVE
                            ? normalizeHue(color.h + num)
                            : normalizeHue(hueRYB(hueRYB(color.h, false) + num, true))
                    }
                ]
            ), [{...color}]
    );

export const analogous          = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [30, -30], mode);
export const complementary      = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [180], mode);
export const splitComplementary = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [150, -150], mode);
export const triadic            = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [120, -120], mode);
export const tetradic           = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [60, -120, 180], mode);
export const square             = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [90, -90, 180], mode);

//---Detect the color model from an string
const getColorModelFromString = (color: string): ColorModel => {
    let model;
    Object.keys(ColorModel).some((p: ColorModel): boolean => {
        const reg = COLORREGS[p];
        if (reg.test(color)) {
            model = p;
            return true;
        }
    });
    if (
        !model &&
        !!~COLOR_KEYS.indexOf(color)
    ) {
        model = ColorModel.HEX;
    }
    if (!model) {
        throw new Error(ERRORS.NOT_ACCEPTED_STRING_INPUT);
    }
    return model;
};

//---Detect the color model from an object
const getColorModelFromObject = (color: Color): ColorModel => {

    let model: ColorModel;
    let invalid = false;
    const props = getOrderedArrayString(Object.keys(color));

    if(VALID_COLOR_OBJECTS[props]) {
        model = VALID_COLOR_OBJECTS[props];
    }

    if (model && model === ColorModel.RGB) {

        const hasInvalidHex = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !HEX.test(`${item[1]}`);
        });

        const hasInvalidRegb = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !(
                PCENT.test(`${item[1]}`) ||
                (
                    !HEX.test(`${item[1]}`) &&
                    !isNaN(+item[1]) &&
                    +item[1] <= 255
                )
            );
        });

        if (hasInvalidHex && hasInvalidRegb) {
            invalid = true;
        }

        if (!hasInvalidHex) {
            model = ColorModel.HEX;
        }

    }
    if (!model || invalid) {
        throw new Error(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);
    }
    return model;
};

//---Detect the color model
export const getColorModel = (color: string | Color): ColorModel => typeof color === 'string'
    ? getColorModelFromString(color)
    : getColorModelFromObject(color);

//---Convert a color string to an RGB object
export const getRGBObjectFromString = {
    [ColorModel.HEX](color: string): RGBObject {
        const colorStr = !~COLOR_KEYS.indexOf(color)
            ? color
            : ColorKeywords[color as keyof typeof ColorKeywords];
        const match = colorStr.match(COLORREGS.HEX);
        const object: RGBObject = {
            r: getDEC(match[1] || match[5]),
            g: getDEC(match[2] || match[6]),
            b: getDEC(match[3] || match[7])
        };
        const a = match[4] || match[8];
        if (a !== undefined) {
            object.a = getDEC(a) / 255;
        }
        return object;
    },
    [ColorModel.RGB](color: string): RGBObject {
        const match = color.match(COLORREGS.RGB);
        const r = getBase255Number(match[1] || match[5]);
        const g = getBase255Number(match[2] || match[6]);
        const b = getBase255Number(match[3] || match[7]);
        const a = match[4] || match[8];
        const object: RGBObject = {
            r: Math.min(r, 255),
            g: Math.min(g, 255),
            b: Math.min(b, 255)
        };
        if (a !== undefined) {
            object.a = normalizeAlpha(a);
        }
        return object;
    },
    [ColorModel.HSL](color: string): RGBObject {
        const match = color.match(COLORREGS.HSL);
        const h = normalizeHue(match[1] || match[5]);
        const s = percent(match[2] || match[6]);
        const l = percent(match[3] || match[7]);
        const a = match[4] || match[8];
        const rgb = hslToRGB(h, s, l);
        if (a !== undefined) {
            rgb.a = normalizeAlpha(a);
        }
        return rgb;
    },
    [ColorModel.CMYK](color: string): RGBObject {
        const match = color.match(COLORREGS.CMYK);
        const c = getCMYKNumber(match[1] || match[6]);
        const m = getCMYKNumber(match[2] || match[7]);
        const y = getCMYKNumber(match[3] || match[8]);
        const k = getCMYKNumber(match[4] || match[9]);
        const a = match[5] || match[10];
        const rgb = cmykToRGB(c, m, y, k);
        if (a !== undefined) {
            rgb.a = normalizeAlpha(a);
        }
        return rgb;
    }
};

//---Convert a color object to an RGB object
export const getRGBObjectFromObject = {
    [ColorModel.HEX](color: RGBObjectGeneric): RGBObject {
        const object: RGBObject = {
            r: getBase255Number(`${color.r}`),
            g: getBase255Number(`${color.g}`),
            b: getBase255Number(`${color.b}`)
        };
        if (hasProp<RGBObjectGeneric>(color, 'a')) {
            object.a = Math.min(getBase255Number(`${color.a}`, true), 1);
        }
        return object;
    },
    [ColorModel.RGB](color: RGBObjectGeneric): RGBObject {
        return this.HEX(color);
    },
    [ColorModel.HSL](color: HSLObjectGeneric): RGBObject {
        const s = percent(`${color.s}`);
        const l = percent(`${color.l}`);
        const rgb = hslToRGB(normalizeHue(color.h), s, l);
        if (hasProp<HSLObjectGeneric>(color, 'a')) {
            rgb.a = normalizeAlpha(color.a);
        }
        return rgb;
    },
    [ColorModel.CMYK](color: CMYKObjectGeneric): RGBObject {
        const c = getCMYKNumber(`${color.c}`);
        const m = getCMYKNumber(`${color.m}`);
        const y = getCMYKNumber(`${color.y}`);
        const k = getCMYKNumber(`${color.k}`);
        const rgb = cmykToRGB(c, m, y, k);
        if (hasProp<CMYKObjectGeneric>(color, 'a')) {
            rgb.a = normalizeAlpha(color.a);
        }
        return rgb;
    }
};

export const getRGBObject = (color: ColorInput, model: ColorModel = getColorModel(color)): RGBObject => {
    return typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model](color as RGBObjectGeneric & HSLObjectGeneric & CMYKObjectGeneric);
};

//---Get the color values from an object
export const translateColor = {

    [ColorModel.HEX](color: RGBObject): HEXObject {
        return {
            r: getHEX(color.r),
            g: getHEX(color.g),
            b: getHEX(color.b)
        };
    },

    HEXA(color: RGBObject): HEXObject {
        const rgb = translateColor.HEX(color);
        rgb.a = hasProp<RGBObject>(color, 'a')
            ? getHEX(color.a * 255)
            : '0xFF';
        return rgb;
    },

    [ColorModel.RGB](color: RGBObject, options: Options): RGBObject {
        if (hasProp<RGBObject>(color, 'a')) {
            delete color.a;
        }
        return roundRGBObject(color, options);
    },

    RGBA(color: RGBObject, options: Options): RGBObject {
        color.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a)
            : 1;
        return roundRGBObject(color, options);
    },

    [ColorModel.HSL](color: RGBObject, options: Options): HSLObject {
        const hsl = rgbToHSL(color.r, color.g, color.b);
        delete hsl.a;
        return roundHSLObject(hsl, options, false);
    },

    HSLA(color: RGBObject, options: Options): HSLObject {
        const { decimals } = options;
        const hsl = translateColor.HSL(color, options);
        hsl.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, decimals)
            : 1;
        return hsl;
    },

    [ColorModel.CMYK](color: RGBObject, options: Options): CMYKObject {
        return roundCMYKObject(
            rgbToCMYK(color.r, color.g, color.b),
            options
        );
    },

    CMYKA(color: RGBObject, options: Options): CMYKObject {
        const { decimals } = options;
        const cmyk = translateColor.CMYK(color, options);
        cmyk.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, decimals)
            : 1;
        return cmyk;
    }
};

//---Blending
export const blend = (from: RGBObject, to: RGBObject, steps: number): RGBObject[] => {
    const div = steps - 1;
    const diffR = (to.r - from.r) / div;
    const diffG = (to.g - from.g) / div;
    const diffB = (to.b - from.b) / div;
    const fromA = normalizeAlpha(from.a);
    const toA = normalizeAlpha(to.a);
    const diffA = (toA - fromA) / div;
    return Array(steps).fill(null).map((__n, i): RGBObject => {
        if (i === 0) { return from; }
        if (i === div) { return to; }
        return {
            r: round(from.r + diffR * i),
            g: round(from.g + diffG * i),
            b: round(from.b + diffB * i),
            a: round(fromA + diffA * i)
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
    const rgb = getRGBObject(color, model);
    const hasAlpha = (
        (typeof color === 'string' && hasProp<RGBObject>(rgb, 'a')) ||
        (typeof color !== 'string' && hasProp<RGBObjectGeneric | HSLObjectGeneric>(color, 'a'))
    );
    const hsl: HSLObject = rgbToHSL(rgb.r, rgb.g, rgb.b, rgb.a);
    if (!hasAlpha) delete hsl.a;
    const increment = shades
        ? hsl.l / (steps + 1)
        : (100 - hsl.l) / (steps + 1);
    const hslMap = Array(steps).fill(null).map((__n, i): HSLObject => ({
        ...hsl,
        l: hsl.l + increment * (i + 1) * (1 - +shades * 2)
    }));
    switch(model) {
        case ColorModel.HEX:
            default:
                return hslMap.map((hslColor: HSLObject): HEXOutput => {
                    const rgbColor = hslToRGB(hslColor.h, hslColor.s, hslColor.l);
                    if (hasAlpha) rgbColor.a = hslColor.a;
                    return isCSS
                        ? hasAlpha
                            ? CSS.HEX(
                                roundRGBObject(
                                    {
                                        ...rgbColor,
                                        a: round(rgbColor.a * 255)
                                    },
                                    options
                                )
                            )
                            : CSS.HEX(
                                roundRGBObject(rgbColor, options)
                            )
                        : hasAlpha
                            ? translateColor.HEXA(rgbColor)
                            : translateColor.HEX(rgbColor);
                });
        case ColorModel.RGB:
            return hslMap.map((hslColor: HSLObject): RGBOutput => {
                const rgbColor = hslToRGB(hslColor.h, hslColor.s, hslColor.l);
                if (hasAlpha) rgbColor.a = hslColor.a;
                return isCSS
                    ? CSS.RGB(
                        roundRGBObject(rgbColor, options),
                        options
                    )
                    : hasAlpha
                        ? translateColor.RGBA(rgbColor, options)
                        : translateColor.RGB(rgbColor, options);
            });
        case ColorModel.HSL:
            return hslMap.map((hslColor: HSLObject): HSLOutput => {
                return isCSS
                    ? CSS.HSL(
                        roundHSLObject(hslColor, options),
                        options
                    )
                    : hasAlpha
                        ? translateColor.HSLA(
                            {
                                ...hslToRGB(hslColor.h, hslColor.s, hslColor.l),
                                a: hslColor.a
                            },
                            options
                        )
                        : translateColor.HSL(
                            hslToRGB(hslColor.h, hslColor.s, hslColor.l),
                            options
                        );
            });

    }
};

//---Harmony
export const colorHarmony = {

    buildHarmony(
        color: ColorInputWithoutCMYK,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        options: Options
    ): ColorOutput[] {
        const model = getColorModel(color);
        const rgb = getRGBObject(color, model);
        const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b, rgb.a);
        const hasAlpha = (
            (typeof color === 'string' && hasProp<RGBObject>(rgb, 'a')) ||
            (typeof color !== 'string' && hasProp<RGBObjectGeneric | HSLObjectGeneric>(color, 'a'))
        );
        const isCSS = typeof color === 'string';
        switch(model) {
            case ColorModel.HEX:
            default:
                return hasAlpha
                    ? this.HEXA(
                        roundHSLObject(hsl, null),
                        harmonyFunction,
                        mode,
                        isCSS
                    )
                    : this.HEX(
                        roundHSLObject(hsl, null),
                        harmonyFunction,
                        mode,
                        isCSS
                    );
            case ColorModel.HSL:
                return hasAlpha
                    ? this.HSLA(hsl, harmonyFunction, mode, isCSS, options)
                    : this.HSL(hsl, harmonyFunction, mode, isCSS, options);
            case ColorModel.RGB:
                return hasAlpha
                    ? this.RGBA(hsl, harmonyFunction, mode, isCSS, options)
                    : this.RGB(hsl, harmonyFunction, mode, isCSS, options);
        }
    },

    [ColorModel.HEX](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        hslToRGB(c.h, c.s, c.l)
                    )
                    : translateColor.HEX(
                        hslToRGB(c.h, c.s, c.l)
                    )
            )
        );
    },

    HEXA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        {
                            ...hslToRGB(c.h, c.s, c.l),
                            a: normalizeAlpha(c.a) * 255
                        }
                    )
                    : translateColor.HEXA({
                        ...hslToRGB(c.h, c.s, c.l),
                        a: normalizeAlpha(c.a)
                    })
            )
        );
    },

    [ColorModel.RGB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        roundRGBObject(
                            hslToRGB(c.h, c.s, c.l),
                            options
                        ),
                        options
                    )
                    : translateColor.RGB(
                        hslToRGB(c.h, c.s, c.l),
                        options
                    )
            )
        );
    },

    RGBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        roundRGBObject(
                            {
                                ...hslToRGB(c.h, c.s, c.l),
                                a: normalizeAlpha(c.a)
                            },
                            options
                        ),
                        options
                    )
                    : translateColor.RGBA(
                        {
                            ...hslToRGB(c.h, c.s, c.l),
                            a: normalizeAlpha(c.a)
                        },
                        options
                    )
            )
        );
    },

    [ColorModel.HSL](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        roundHSLObject(
                            {
                                h: c.h,
                                s: c.s,
                                l: c.l
                            },
                            options
                        ),
                        options
                    )
                    : translateColor.HSL(
                        hslToRGB(c.h, c.s, c.l),
                        options
                    )
            )
        );
    },

    HSLA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        roundHSLObject(
                            {
                                ...c,
                                a: normalizeAlpha(c.a)
                            },
                            options
                        ),
                        options
                    )
                    : translateColor.HSLA(
                        {
                            ...hslToRGB(c.h, c.s, c.l),
                            a: normalizeAlpha(c.a)
                        },
                        options
                    )
            )
        );
    }
};

export const colorMixer = {

    mix(colors: ColorInput[], mode: Mix): RGBObject {

        const rgbMap = colors.map((color: ColorInput): RGBObject => {
            const model = getColorModel(color);
            return getRGBObject(color, model);
        });

        const rybMap = mode === Mix.SUBTRACTIVE
            ? rgbMap.map((color: RGBObject): RYBObject => {
                const ryb = rgbToRYB(color.r, color.g, color.b);
                if (hasProp<RGBObject>(color, 'a')) {
                    ryb.a = color.a;
                }
                return ryb;
            })
            : null;

        function createMix(items: RGBObject[]): RGBObject;
        function createMix(items: RYBObject[]): RYBObject;
        function createMix(items: RGYBObject[]): RGYBObject {
            const initial = mode === Mix.ADDITIVE
                ? {r: 0, g: 0, b: 0, a: 0}
                : {r: 0, y: 0, b: 0, a: 0};
            return items.reduce((mix: RGYBObject, color: RGYBObject): RGYBObject => {
                const colorA = hasProp<RGYBObject>(color, 'a') ? color.a : 1;
                const common = {
                    r: Math.min(mix.r  + color.r * colorA, 255),
                    b: Math.min(mix.b + color.b * colorA, 255),
                    a: 1 - (1 - colorA) * (1 - mix.a)
                };
                const mixGY = 'g' in mix
                    ? mix.g
                    : mix.y;
                const colorGY = 'g' in color
                    ? color.g
                    : color.y;
                return {
                    ...common,
                    ...(mode === Mix.ADDITIVE
                        ? { g: Math.min(mixGY + colorGY * colorA, 255) }
                        : { y: Math.min(mixGY + colorGY * colorA, 255) }
                    )
                };
            }, initial);
        }

        let mix: RGBObject;

        if (mode === Mix.ADDITIVE) {
            mix = createMix(rgbMap);
        } else {
            const ryb = createMix(rybMap);
            mix = rybToRGB(ryb.r, ryb.y, ryb.b);
            mix.a = ryb.a;
        }

        return {
            r: round(mix.r),
            g: round(mix.g),
            b: round(mix.b),
            a: minmax(mix.a, 0, 1)
        };
    },
    [ColorModel.HEX]<CSS extends boolean, R = CSS extends true ? string : HEXObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.a;
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEX(mix)
        ) as R;
    },
    HEXA<CSS extends boolean, R = CSS extends true ? string : HEXObject >(
        colors: ColorInput[],
        mode: Mix,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        mix.a = css
            ? normalizeAlpha(mix.a) * 255
            : normalizeAlpha(mix.a);
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEXA(mix)
        ) as R;
    },
    [ColorModel.RGB]<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.a;
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGB(mix, options)
        ) as R;
    },
    RGBA<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGBA(mix, options)
        ) as R;
    },
    [ColorModel.HSL]<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const hsl = rgbToHSL(mix.r, mix.g, mix.b);
        delete mix.a;
        delete hsl.a;
        return (
            css
                ? CSS.HSL(
                    roundHSLObject(hsl, options),
                    options
                )
                : translateColor.HSL(mix, options)
        ) as R;
    },
    HSLA<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const hsl = rgbToHSL(mix.r, mix.g, mix.b, mix.a);
        return (
            css
                ? CSS.HSL(
                    roundHSLObject(hsl, options),
                    options
                )
                : translateColor.HSLA(mix, options)
        ) as R;
    }
};

export const roundRGBObject = (color: RGBObject, options: Options): RGBObject => {
    const { decimals } = options;
    return {
        r: round(color.r, decimals),
        g: round(color.g, decimals),
        b: round(color.b, decimals),
        ...(
            hasProp<RGBObject>(color, 'a')
                ? {
                    a: round(color.a, decimals)
                }
                : {}
        )
    };
};

export const roundHSLObject = (color: HSLObject, options: Options | null, applyDegreesConvertion = true): HSLObject => {
    const decimals = options
        ? options.decimals
        : 0;
    const anglesUnits = options
        ? options.anglesUnit
        : AnglesUnitEnum.NONE;
    return {
        h: applyDegreesConvertion
            ? round(
                translateDegrees(
                    color.h,
                    anglesUnits
                ),
                decimals
            )
            : round(color.h, decimals),
        s: round(color.s, decimals),
        l: round(color.l, decimals),
        ...(
            hasProp<HSLObject>(color, 'a')
                ? {
                    a: round(color.a, decimals)
                }
                : {}
        )
    };
};

export const roundCMYKObject = (color: CMYKObject, options: Options): CMYKObject => {
    const { decimals } = options;
    return {
        c: round(color.c, decimals),
        m: round(color.m, decimals),
        y: round(color.y, decimals),
        k: round(color.k, decimals)
    };
};