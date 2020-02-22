import { Color, ColorInput, RGBObject, HSLObject, HSLObjectFinal, CMYKObject, RGBObjectFinal, RGBOutput, HSLOutput, Omit } from '@types';
import { ColorModel, COLORREGS, ERRORS } from '#constants';
import { getOrderedArrayString, getDEC, getHEX, getBase255Number, getCMYKNumber, hasProp, percent, round } from '#helpers';
import { rgbToHSL, hslToRGB, cmykToRGB, rgbToCMYK } from '#color/translators';
import { CSS } from '#color/css';

type HarmonyFunction = (color: HSLObjectFinal) => HSLObjectFinal[];
type NotHEX = Omit<ColorModel, 'HEX'>;

//---Normalize hue
const pi2 = 360;

export const normalizeHue = (hue: number): number => {
    if (hue > 360) {
        hue -= Math.floor(hue / pi2) * pi2;
    } else if (hue < 0) {
        hue = (Math.ceil(hue / pi2) + 1) * pi2 + hue;
    }
    return hue;
}; 

//---Normalize alpha
export const normalizeAlpha = (alpha: number | undefined | null): number => (isNaN(+alpha) || alpha > 1) ? 1 : round(alpha, 2);

//---Harmony
const harmony = (color: HSLObjectFinal, angles: number[]): HSLObjectFinal[] =>
    angles.reduce(
        (arr: HSLObjectFinal[], num: number): HSLObjectFinal[] =>
            (                
                [...arr, {...color, h: normalizeHue(color.h + num)}]
            ), [{...color}]
    );

export const analogous = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [-30, 30]);
export const complementary = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [180]);
export const splitComplementary = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [-150, 150]);
export const triadic = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [120, -120]);
export const tetradic = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [-60, 120, 180]);
export const square = (color: HSLObjectFinal): HSLObjectFinal[] => harmony(color, [-90, 90, 180]);

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
    const props = getOrderedArrayString(Object.keys(color));
    Object.keys(ColorModel).some((p: ColorModel): boolean => {
        if (getOrderedArrayString(p.split('')) === props) {
            model = p;
            return true;
        }
    });
    if (!model) {
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
    [ColorModel.HEX](color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.HEX);
        const object: RGBObjectFinal = {
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
    [ColorModel.RGB](color: string): RGBObjectFinal {
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
    [ColorModel.RGBA](color: string): RGBObjectFinal {
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
    [ColorModel.HSL](color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.HSL);
        const h = +match[1];
        const s = percent(match[2]);
        const l = percent(match[3]);
        return hslToRGB(h, s, l);
    },
    [ColorModel.HSLA](color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.HSLA);
        const a = +match[4];
        const h = +match[1];
        const s = percent(match[2]);
        const l = percent(match[3]);
        const rgb = hslToRGB(h, s, l);
        rgb.a = normalizeAlpha(a);
        return rgb;
    },
    [ColorModel.CMYK](color: string): RGBObjectFinal {
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
    [ColorModel.RGB](color: RGBObject): RGBObjectFinal {
        const object: RGBObjectFinal = {
            r: getBase255Number(`${color.r}`),
            g: getBase255Number(`${color.g}`),
            b: getBase255Number(`${color.b}`)
        };
        return object;
    },
    [ColorModel.RGBA](color: RGBObject): RGBObjectFinal {
        const object = this.RGB(color);
        object.a = hasProp<RGBObject>(color, 'a')
            ? Math.min(getBase255Number(`${color.a}`, true), 1)
            : 1;
        return object;
    },
    [ColorModel.HSL](color: HSLObject): RGBObjectFinal {
        const s = percent(`${color.s}`);
        const l = percent(`${color.l}`);
        return hslToRGB(color.h, s, l);
    },
    [ColorModel.HSLA](color: HSLObject): RGBObjectFinal {
        const rgb = this.HSL(color);
        rgb.a = normalizeAlpha(color.a);
        return rgb;
    },
    [ColorModel.CMYK](color: CMYKObject): RGBObjectFinal {
        const c = getCMYKNumber(`${color.c}`);
        const m = getCMYKNumber(`${color.m}`);
        const y = getCMYKNumber(`${color.y}`);
        const k = getCMYKNumber(`${color.k}`);
        return cmykToRGB(c, m, y, k);
    }
};

export const getRGBObject = (color: ColorInput, model: ColorModel = getColorModel(color)): RGBObjectFinal => {
    return typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model as NotHEX](color as RGBObject & HSLObject & CMYKObject);
};

//---Get the color values from an object
export const translateColor = {

    [ColorModel.HEX](color: RGBObjectFinal): RGBObject {
        return {
            r: getHEX(color.r),
            g: getHEX(color.g),
            b: getHEX(color.b),
        };
    },

    HEXA(color: RGBObjectFinal): RGBObject {
        const rgb = translateColor.HEX(color);
        rgb.a = hasProp<RGBObjectFinal>(color, 'a')
            ? getHEX(color.a * 255)
            : '0xFF';
        return rgb;
    },

    [ColorModel.RGB](color: RGBObjectFinal): RGBObject {
        if (hasProp<RGBObjectFinal>(color, 'a')) {
            delete color.a;
        }
        return color;
    },

    [ColorModel.RGBA](color: RGBObjectFinal): RGBObject {
        color.a = hasProp<RGBObjectFinal>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return color;
    },

    [ColorModel.HSL](color: RGBObjectFinal): HSLObject {
        const hsl = rgbToHSL(color.r, color.g, color.b);
        delete hsl.a;
        return hsl;
    },

    [ColorModel.HSLA](color: RGBObjectFinal): HSLObject {
        const hsl = translateColor.HSL(color);
        hsl.a = hasProp<RGBObjectFinal>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return hsl;
    },

    [ColorModel.CMYK](color: RGBObjectFinal): CMYKObject {
        return rgbToCMYK(color.r, color.g, color.b);
    }
};

//---Blending
export const blend = (from: RGBObjectFinal, to: RGBObjectFinal, steps: number): RGBObjectFinal[] => {
    const div = steps - 1;
    const diffR = (to.r - from.r) / div;
    const diffG = (to.g - from.g) / div;
    const diffB = (to.b - from.b) / div;
    const fromA = normalizeAlpha(from.a);
    const toA = normalizeAlpha(to.a);
    const diffA = (toA - fromA) / div;
    return Array(steps).fill(null).map((n, i): RGBObjectFinal => {
        if (i === 0) { return from; }
        if (i === div) { return to; }
        return {
            r: from.r + diffR * i,
            g: from.g + diffG * i,
            b: from.b + diffB * i,
            a: fromA + diffA * i
        };
    });
};

//---Harmony
export const colorHarmony = {

    buildHarmony(color: ColorInput, harmonyFunction: HarmonyFunction): string[] {
        const model = getColorModel(color);
        const rgb = getRGBObject(color, model);
        const hsl = rgbToHSL(rgb.r, rgb.g, rgb.b, rgb.a);
        const hasAlpha = Object.prototype.hasOwnProperty.call(rgb, 'a');
        const isCSS = typeof color === 'string';
        switch(model) {
            case ColorModel.HEX:
                return hasAlpha
                    ? this.HEXA(hsl, harmonyFunction, isCSS)
                    : this.HEX(hsl, harmonyFunction, isCSS);
            case ColorModel.HSL:
                return this.HSL(hsl, harmonyFunction, isCSS);
            case ColorModel.HSLA:
                return this.HSLA(hsl, harmonyFunction, isCSS);
            case ColorModel.RGB:
                return this.RGB(hsl, harmonyFunction, isCSS);
            case ColorModel.RGBA:
                return this.RGBA(hsl, harmonyFunction, isCSS);
            default:
                return [];
        }
    },

    [ColorModel.HEX](color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): RGBOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): RGBOutput => (
                css
                    ? CSS.HEX(hslToRGB(c.h, c.s, c.l))
                    : translateColor.HEXA(hslToRGB(c.h, c.s, c.l))
            )
        );
    },

    HEXA(color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): RGBOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): RGBOutput => (
                css
                    ? CSS.HEX({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a) * 255})
                    : translateColor.HEXA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a) * 255})
            )
        );
    },

    [ColorModel.RGB](color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): RGBOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): RGBOutput => (
                css
                    ? CSS.RGB(hslToRGB(c.h, c.s, c.l))
                    : translateColor.RGB(hslToRGB(c.h, c.s, c.l))
            )
        );
    },

    [ColorModel.RGBA](color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): RGBOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): RGBOutput => (
                css
                    ? CSS.RGB({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
                    : translateColor.RGBA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
            )
        );
    },

    [ColorModel.HSL](color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): HSLOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): HSLOutput => (
                css
                    ? CSS.HSL({h: c.h, s: c.s, l: c.l})
                    : translateColor.HSL(hslToRGB(c.h, c.s, c.l))
            )
        );
    },

    [ColorModel.HSLA](color: HSLObjectFinal, harmonyFunction: HarmonyFunction, css: boolean): HSLOutput[] {
        const array = harmonyFunction(color);
        return array.map(
            (c: HSLObjectFinal): HSLOutput => (
                css
                    ? CSS.HSL({...c, a: normalizeAlpha(c.a)})
                    : translateColor.HSLA({...hslToRGB(c.h, c.s, c.l), a: normalizeAlpha(c.a)})
            )
        );
    }
};