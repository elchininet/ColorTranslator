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
    ColorOutput
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
    HSL_HUE,
    MAX_DECIMALS
} from '#constants';
import {
    getOrderedArrayString,
    getDEC,
    getHEX,
    getBase255Number,
    getCMYKNumber,
    hasProp,
    percent,
    round,
    minmax,
    grades
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

//---Normalize hue
const pi2 = 360;

export const normalizeHue = (hue: number | string): number => {

    if (typeof hue === 'string') {

        const matches = hue.match(HSL_HUE) as string[];
        const value = +matches[1];
        const units = matches[2];
        switch(units) {
            case 'rad':
                hue = Math.round(grades(value));
                break;
            case 'turn':
                hue = Math.round(value * 360);
                break;
            case 'deg':
            case 'grad':
            default:
                hue = value;
        }
    }

    if (hue > 360 || hue < 0) {
        hue -= Math.floor(hue / pi2) * pi2;
    }

    return hue;
};

//---Normalize alpha
export const normalizeAlpha = (alpha: number | string | undefined | null): number => {
    if (typeof alpha === 'string') {
        if(PCENT.test(alpha)) {
            alpha = +alpha.replace(PCENT, '$1') / 100;
        } else {
            alpha = +alpha;
        }
    }
    return (isNaN(+alpha) || alpha > 1) ? 1 : round(alpha, MAX_DECIMALS);
};

//---Harmony
const harmony = (color: HSLObject, angles: number[], mode: Mix): HSLObject[] =>
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

const VALID_COLOR_OBJECTS = Object.entries(ColorModel).reduce((acc: Record<string, ColorModel>, entry: [string, ColorModel]) => {
    const [key, value] = entry;
    if (key !== ColorModel.HEX) {
        const ordered = getOrderedArrayString(key.split(''));
        acc[ordered] = value;
        acc['A' + ordered] = value;
    }
    return acc;
}, {});

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
    return model as ColorModel;
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

    [ColorModel.RGB](color: RGBObject): RGBObject {
        if (hasProp<RGBObject>(color, 'a')) {
            delete color.a;
        }
        return color;
    },

    RGBA(color: RGBObject): RGBObject {
        color.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return color;
    },

    [ColorModel.HSL](color: RGBObject): HSLObject {
        const hsl = rgbToHSL(color.r, color.g, color.b);
        delete hsl.a;
        return hsl;
    },

    HSLA(color: RGBObject): HSLObject {
        const hsl = translateColor.HSL(color);
        hsl.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return hsl;
    },

    [ColorModel.CMYK](color: RGBObject): CMYKObject {
        return rgbToCMYK(color.r, color.g, color.b);
    },

    CMYKA(color: RGBObject): CMYKObject {
        const cmyk = rgbToCMYK(color.r, color.g, color.b);
        cmyk.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, 2)
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
            a: round(fromA + diffA * i, 2)
        };
    });
};

//---Shades
export const getColorMixture = (color: ColorInputWithoutCMYK, steps: number, shades: boolean): ColorOutput[] => {
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
                            ? CSS.HEX({ ...rgbColor, a: round(rgbColor.a * 255, MAX_DECIMALS) })
                            : CSS.HEX(rgbColor)
                        : hasAlpha
                            ? translateColor.HEXA(rgbColor)
                            : translateColor.HEX(rgbColor);
                });
        case ColorModel.RGB:
            return hslMap.map((hslColor: HSLObject): RGBOutput => {
                const rgbColor = hslToRGB(hslColor.h, hslColor.s, hslColor.l);
                if (hasAlpha) rgbColor.a = hslColor.a;
                return isCSS
                    ? CSS.RGB(rgbColor)
                    : hasAlpha
                        ? translateColor.RGBA(rgbColor)
                        : translateColor.RGB(rgbColor);
            });
        case ColorModel.HSL:
            return hslMap.map((hslColor: HSLObject): HSLOutput => {
                return isCSS
                    ? CSS.HSL(hslColor)
                    : hasAlpha
                        ? translateColor.HSLA({ ...hslToRGB(hslColor.h, hslColor.s, hslColor.l), a: hslColor.a })
                        : translateColor.HSL(hslToRGB(hslColor.h, hslColor.s, hslColor.l));
            });

    }
};

//---Harmony
export const colorHarmony = {

    buildHarmony(color: ColorInputWithoutCMYK, harmonyFunction: HarmonyFunction, mode: Mix): ColorOutput[] {
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
                    ? this.HEXA(hsl, harmonyFunction, mode, isCSS)
                    : this.HEX(hsl, harmonyFunction, mode, isCSS);
            case ColorModel.HSL:
                return hasAlpha
                    ? this.HSLA(hsl, harmonyFunction, mode, isCSS)
                    : this.HSL(hsl, harmonyFunction, mode, isCSS);
            case ColorModel.RGB:
                return hasAlpha
                    ? this.RGBA(hsl, harmonyFunction, mode, isCSS)
                    : this.RGB(hsl, harmonyFunction, mode, isCSS);
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
                    ? CSS.HEX(hslToRGB(c.h, c.s, c.l))
                    : translateColor.HEX(hslToRGB(c.h, c.s, c.l))
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
                    ? CSS.HEX({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a) * 255})
                    : translateColor.HEXA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
            )
        );
    },

    [ColorModel.RGB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(hslToRGB(c.h, c.s, c.l))
                    : translateColor.RGB(hslToRGB(c.h, c.s, c.l))
            )
        );
    },

    RGBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
                    : translateColor.RGBA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
            )
        );
    },

    [ColorModel.HSL](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL({h: c.h, s: c.s, l: c.l})
                    : translateColor.HSL(hslToRGB(c.h, c.s, c.l))
            )
        );
    },

    HSLA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL({...c, a: normalizeAlpha(c.a)})
                    : translateColor.HSLA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
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
            r: round(mix.r, 2),
            g: round(mix.g, 2),
            b: round(mix.b, 2),
            a: minmax(mix.a, 0, 1)
        };
    },
    [ColorModel.HEX](colors: ColorInput[], mode: Mix, css: boolean): HEXOutput {
        const mix = this.mix(colors, mode);
        delete mix.a;
        return css
            ? CSS.HEX(mix)
            : translateColor.HEX(mix);
    },
    HEXA(colors: ColorInput[], mode: Mix, css: boolean): HEXOutput {
        const mix = this.mix(colors, mode);
        mix.a = css
            ? normalizeAlpha(mix.a) * 255
            : normalizeAlpha(mix.a);
        return css
            ? CSS.HEX(mix)
            : translateColor.HEXA(mix);
    },
    [ColorModel.RGB](colors: ColorInput[], mode: Mix, css: boolean): RGBOutput {
        const mix = this.mix(colors, mode);
        delete mix.a;
        return css
            ? CSS.RGB(mix)
            : translateColor.RGB(mix);
    },
    RGBA(colors: ColorInput[], mode: Mix, css: boolean): RGBOutput {
        const mix = this.mix(colors, mode);
        return css
            ? CSS.RGB(mix)
            : translateColor.RGBA(mix);
    },
    [ColorModel.HSL](colors: ColorInput[], mode: Mix, css: boolean): HSLOutput {
        const mix = this.mix(colors, mode);
        const hsl = rgbToHSL(mix.r, mix.g, mix.b);
        delete mix.a;
        delete hsl.a;
        return css
            ? CSS.HSL(hsl)
            : translateColor.HSL(mix);
    },
    HSLA(colors: ColorInput[], mode: Mix, css: boolean): HSLOutput {
        const mix = this.mix(colors, mode);
        const hsl = rgbToHSL(mix.r, mix.g, mix.b, mix.a);
        return css
            ? CSS.HSL(hsl)
            : translateColor.HSLA(mix);
    }
};