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
    COLORREGS,
    ERRORS,
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
    minmax
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
type ColorModelKeys = keyof typeof ColorModel;

//---Normalize hue
const pi2 = 360;

export const normalizeHue = (hue: number): number => {
    if (hue > 360 || hue < 0) {
        hue -= Math.floor(hue / pi2) * pi2;
    }
    return hue;
}; 

//---Normalize alpha
export const normalizeAlpha = (alpha: number | undefined | null): number => (isNaN(+alpha) || alpha > 1) ? 1 : round(alpha, 2);

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
    if (!model) {
        throw new Error(ERRORS.NOT_ACCEPTED_STRING_INPUT);
    }
    return model;
};

//---Detect the color model from an object
const getColorModelFromObject = (color: Color): ColorModel => {
    let model;
    let different = false;
    const props = getOrderedArrayString(Object.keys(color));
    const keys = Object.keys(ColorModel).filter((key: ColorModelKeys) => key !== ColorModel.HEX);
    keys.some((p: ColorModelKeys): boolean => {
        if (getOrderedArrayString(p.split('')) === props) {
            model = p;
            return true;
        }
    });
    if (model && model === ColorModel.RGB || model === ColorModel.RGBA) {

        const isHEX = Object.entries(color).map((item: [string, string | number]): boolean =>
            HEX.test(`${item[1]}`));
        const isRGB = Object.entries(color).map((item: [string, string | number]): boolean =>
            PCENT.test(`${item[1]}`) || (!HEX.test(`${item[1]}`) && !isNaN(+item[1]) && +item[1] <= 255));
        
        const differentHEX = isHEX.some((item: boolean, index: number): boolean => {
            if (index > 0 && item !== isHEX[index - 1]) {
                return true;
            }
            return false;
        });

        const differentRGB = isRGB.some((item: boolean, index: number): boolean => {
            if (index > 0 && item !== isRGB[index - 1]) {
                return true;
            }
            return false;
        });

        different = differentHEX || differentRGB || (!isHEX[0] && !isRGB[0]);

        if (!different && isHEX[0]) {
            model = ColorModel.HEX;
        }
    }
    if (!model || different) {
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
        const match = color.match(COLORREGS.HEX);
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
        const r = getBase255Number(match[1] || match[4]);
        const g = getBase255Number(match[2] || match[5]);
        const b = getBase255Number(match[3] || match[6]);
        const object = {
            r: Math.min(r, 255),
            g: Math.min(g, 255),
            b: Math.min(b, 255)
        };
        return object;
    },
    [ColorModel.RGBA](color: string): RGBObject {
        const match = color.match(COLORREGS.RGBA);
        const r = getBase255Number(match[1] || match[4]);
        const g = getBase255Number(match[2] || match[5]);
        const b = getBase255Number(match[3] || match[6]);
        const a = +match[7];
        const object = {
            r: Math.min(r, 255),
            g: Math.min(g, 255),
            b: Math.min(b, 255),
            a: normalizeAlpha(a)
        };
        return object;
    },
    [ColorModel.HSL](color: string): RGBObject {
        const match = color.match(COLORREGS.HSL);
        const h = normalizeHue(+match[1]);
        const s = percent(match[2]);
        const l = percent(match[3]);
        return hslToRGB(h, s, l);
    },
    [ColorModel.HSLA](color: string): RGBObject {
        const match = color.match(COLORREGS.HSLA);
        const h = normalizeHue(+match[1]);
        const s = percent(match[2]);
        const l = percent(match[3]);
        const a = +match[4];
        const rgb = hslToRGB(h, s, l);
        rgb.a = normalizeAlpha(a);
        return rgb;
    },
    [ColorModel.CMYK](color: string): RGBObject {
        const match = color.match(COLORREGS.CMYK);
        const c = getCMYKNumber(match[1] || match[5]);
        const m = getCMYKNumber(match[2] || match[6]);
        const y = getCMYKNumber(match[3] || match[7]);
        const k = getCMYKNumber(match[4] || match[8]);
        return cmykToRGB(c, m, y, k);
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
        object.a = hasProp<RGBObjectGeneric>(color, 'a')
            ? Math.min(getBase255Number(`${color.a}`, true), 1)
            : 1;
        return object;
    },
    [ColorModel.RGB](color: RGBObjectGeneric): RGBObject {
        const rgbColor = this.HEX(color);
        delete rgbColor.a;
        return rgbColor;
    },
    [ColorModel.RGBA](color: RGBObjectGeneric): RGBObject {
        return this.HEX(color);
    },
    [ColorModel.HSL](color: HSLObjectGeneric): RGBObject {
        const s = percent(`${color.s}`);
        const l = percent(`${color.l}`);
        return hslToRGB(normalizeHue(color.h), s, l);
    },
    [ColorModel.HSLA](color: HSLObjectGeneric): RGBObject {
        const rgb = this.HSL(color);
        rgb.a = normalizeAlpha(color.a);
        return rgb;
    },
    [ColorModel.CMYK](color: CMYKObjectGeneric): RGBObject {
        const c = getCMYKNumber(`${color.c}`);
        const m = getCMYKNumber(`${color.m}`);
        const y = getCMYKNumber(`${color.y}`);
        const k = getCMYKNumber(`${color.k}`);
        return cmykToRGB(c, m, y, k);
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
            b: getHEX(color.b),
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

    [ColorModel.RGBA](color: RGBObject): RGBObject {
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

    [ColorModel.HSLA](color: RGBObject): HSLObject {
        const hsl = translateColor.HSL(color);
        hsl.a = hasProp<RGBObject>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return hsl;
    },

    [ColorModel.CMYK](color: RGBObject): CMYKObject {
        return rgbToCMYK(color.r, color.g, color.b);
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
    return Array(steps).fill(null).map((n, i): RGBObject => {
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
                return this.HSL(hsl, harmonyFunction, mode, isCSS);
            case ColorModel.HSLA:
                return this.HSLA(hsl, harmonyFunction, mode, isCSS);
            case ColorModel.RGB:
                return this.RGB(hsl, harmonyFunction, mode, isCSS);
            case ColorModel.RGBA:
                return this.RGBA(hsl, harmonyFunction, mode, isCSS);
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

    [ColorModel.RGBA](
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

    [ColorModel.HSLA](
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
                    r: mix.r  + color.r * colorA,
                    b: mix.b + color.b * colorA,
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
                        ? { g: mixGY + colorGY * colorA }
                        : { y: mixGY + colorGY * colorA }
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
            r: minmax(mix.r, 0, 255),
            g: minmax(mix.g, 0, 255),
            b: minmax(mix.b, 0, 255),
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
    [ColorModel.RGBA](colors: ColorInput[], mode: Mix, css: boolean): RGBOutput {
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
    [ColorModel.HSLA](colors: ColorInput[], mode: Mix, css: boolean): HSLOutput {
        const mix = this.mix(colors, mode);
        const hsl = rgbToHSL(mix.r, mix.g, mix.b, mix.a);
        return css
            ? CSS.HSL(hsl)
            : translateColor.HSLA(mix);
    }
};