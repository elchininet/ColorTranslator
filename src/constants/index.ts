export enum ColorModel {
    HEX = 'HEX',
    RGB = 'RGB',
    RGBA = 'RGBA',
    HSL = 'HSL',
    HSLA = 'HSLA',
    CMYK = 'CMYK'
}

export enum Harmony {
    ANALOGOUS = 'ANALOGOUS',
    COMPLEMENTARY = 'COMPLEMENTARY',
    SPLIT_COMPLEMENTARY = 'SPLIT_COMPLEMENTARY',
    TRIADIC = 'TRIADIC',
    TETRADIC = 'TETRADIC',
    SQUARE = 'SQUARE'
}

export const COLORREGS = {
    [ColorModel.HEX]: /^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i,
    [ColorModel.RGB]: /^rgb\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*\)$/,
    [ColorModel.RGBA]: /^rgba\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*,\s*(\d\.?\d*)\s*\)$/,
    [ColorModel.HSL]: /^hsl\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%s*\)$/,
    [ColorModel.HSLA]: /^hsla\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%\s*,\s*(\d\.?\d*)\s*\)$/,
    [ColorModel.CMYK]: /^(?:device-cmyk|cmyk)\s*\(\s*(?:(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)|(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*))\s*\)$/
};

export const PCENT = /^(\d+(?:\.\d+)?|\.\d+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;

export const ERRORS = {
    NOT_ACCEPTED_STRING_INPUT: 'The provided string color doesn\'t have a correct format',
    NOT_ACCEPTED_OBJECT_INPUT: 'The provided color object doesn\'t have the proper keys or format'
};