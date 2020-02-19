import { Color, RGBObject, HSLObject, CMYKObject, RGBObjectFinal } from '@types';
import { CONST, COLORREGS, ERRORS } from '#constants';
import { getOrderedArrayString, getDEC, getHEX, getBase255Number, getCMYKNumber, hasProp, percent, round } from '#helpers';
import { rgbToHSL, hslToRGB, cmykToRGB, rgbToCMYK } from '#color/translators';

type ColorModel = keyof typeof CONST;

//---Detect the color model from an string
const getColorModelFromString = (color: string): ColorModel => {
    let model;
    Object.keys(CONST).some((p: ColorModel): boolean => {
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
    Object.keys(CONST).some((p: ColorModel): boolean => {
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
    HEX(color: string): RGBObjectFinal {
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
    RGB(color: string): RGBObjectFinal {
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
    RGBA(color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.RGBA);
        const r = getBase255Number(match[1] || match[4]);
        const g = getBase255Number(match[2] || match[5]);
        const b = getBase255Number(match[3] || match[6]);
        const a = +match[7];
        const object = {
            r: Math.min(r, 255),
            g: Math.min(g, 255),
            b: Math.min(b, 255),
            a: isNaN(a) || a > 1 ? 1 : round(a, 2)
        };
        return object;
    },
    HSL(color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.HSL);
        const h = +match[1];
        const s = percent(match[2]);
        const l = percent(match[3]);
        return hslToRGB(h, s, l);
    },
    HSLA(color: string): RGBObjectFinal {
        const match = color.match(COLORREGS.HSLA);
        const a = +match[4];
        const h = +match[1];
        const s = percent(match[2]);
        const l = percent(match[3]);
        const rgb = hslToRGB(h, s, l);
        rgb.a = isNaN(a) || a > 1 ? 1 : round(a, 2);
        return rgb;
    },
    CMYK(color: string): RGBObjectFinal {
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
    RGB(color: RGBObject): RGBObjectFinal {
        const object: RGBObjectFinal = {
            r: getBase255Number(`${color.r}`),
            g: getBase255Number(`${color.g}`),
            b: getBase255Number(`${color.b}`)
        };
        return object;
    },
    RGBA(color: RGBObject): RGBObjectFinal {
        const object = this.RGB(color);
        object.a = hasProp<RGBObject>(color, 'a')
            ? Math.min(getBase255Number(`${color.a}`, true), 1)
            : 1;
        return object;
    },
    HSL(color: HSLObject): RGBObjectFinal {
        const s = percent(`${color.s}`);
        const l = percent(`${color.l}`);
        return hslToRGB(color.h, s, l);
    },
    HSLA(color: HSLObject): RGBObjectFinal {
        const rgb = this.HSL(color);
        rgb.a = isNaN(+color.a) || +color.a > 1 ? 1 : round(color.a, 2);
        return rgb;
    },
    CMYK(color: CMYKObject): RGBObjectFinal {
        const c = getCMYKNumber(`${color.c}`);
        const m = getCMYKNumber(`${color.m}`);
        const y = getCMYKNumber(`${color.y}`);
        const k = getCMYKNumber(`${color.k}`);
        return cmykToRGB(c, m, y, k);
    }
};

//---Get the color values from an object
export const translateColor = {

    HEX(color: RGBObjectFinal): RGBObject {
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

    RGB(color: RGBObjectFinal): RGBObject {
        if (hasProp<RGBObjectFinal>(color, 'a')) {
            delete color.a;
        }
        return color;
    },

    RGBA(color: RGBObjectFinal): RGBObject {
        color.a = hasProp<RGBObjectFinal>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return color;
    },

    HSL(color: RGBObjectFinal): HSLObject {
        const hsl = rgbToHSL(color.r, color.g, color.b);
        delete hsl.a;
        return hsl;
    },

    HSLA(color: RGBObjectFinal): HSLObject {
        const hsl = translateColor.HSL(color);
        hsl.a = hasProp<RGBObjectFinal>(color, 'a')
            ? round(color.a, 2)
            : 1;
        return hsl;
    },

    CMYK(color: RGBObjectFinal): CMYKObject {
        return rgbToCMYK(color.r, color.g, color.b);
    }
};

//---Blending
export const blend = (from: RGBObjectFinal, to: RGBObjectFinal, steps: number): RGBObjectFinal[] => {
    const div = steps - 1;
    const diffR = (to.r - from.r) / div;
    const diffG = (to.g - from.g) / div;
    const diffB = (to.b - from.b) / div;
    const fromA = isNaN(+from.a) ? 1 : from.a;
    const toA = isNaN(+to.a) ? 1 : to.a;
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