import { Color, RGBObjectFinal, RGBObject, HSLObject, CMYKObject, ColorInput, RGBOutput, HSLOutput, CMYKOutput } from '@types';
import { CONST } from '#constants';
import { getColorModel, getRGBObjectFromString, getRGBObjectFromObject, translateColor } from '#color/utils';
import { CSS } from '#color/css';

type ColorModel = keyof typeof CONST;

const check = (color: ColorInput, css: boolean): boolean => (typeof color === 'string' && css || typeof color === 'object' && !css);

const getReturn = <A>(
    color: ColorInput,
    model: ColorModel,
    css: boolean,
    translateFunction: (color: Color) => A,
    cssFunction: (color: A) => string
): A | string => {
    const colorObject: RGBObjectFinal = typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model](color as RGBObject & HSLObject & CMYKObject);
    const translated = translateFunction(colorObject);
    if (!css) {
        return translated;
    }
    return cssFunction(translated);
};

export const colortranslator = {

    //---Convert to RGB
    toRGB(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.RGB, CSS.RGB);
    },

    toRGBA(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.RGBA, CSS.RGB);
    },

    //---Convert to HEX RGB
    toHEX(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.HEX, CSS.HEX);
    },

    //---Convert to HEX RGBA
    toHEXA(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.HEXA, CSS.HEX);
    },

    //---Convert to HSL
    toHSL(color: ColorInput, css: boolean = true): HSLOutput {
        const model = getColorModel(color);
        if (model === CONST.HSL && check(color, css)) {
            return color as HSLOutput;
        }
        return getReturn<HSLObject>(color, model, css, translateColor.HSL, CSS.HSL);
    },

    //---Convert to HSLA
    toHSLA(color: ColorInput, css: boolean = true): HSLOutput {
        const model = getColorModel(color);
        if (model === CONST.HSLA && check(color, css)) {
            return color as HSLOutput;
        }
        return getReturn<HSLObject>(color, model, css, translateColor.HSLA, CSS.HSL);
    },

    //---Convert to CMYK
    toCMYK(color: ColorInput, css: boolean = true): CMYKOutput {
        const model = getColorModel(color);
        if (model === CONST.CMYK && check(color, css)) {
            return color as CMYKOutput;
        }
        return getReturn<CMYKObject>(color, model, css, translateColor.CMYK, CSS.CMYK);
    }

};