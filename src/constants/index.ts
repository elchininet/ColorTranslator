export const CONST = {
    HEX: 'HEX',
    RGB: 'RGB',
    RGBA: 'RGBA',
    HSL: 'HSL',
    HSLA: 'HSLA',
    CMYK: 'CMYK'
};

export const COLORREGS = {
    [CONST.HEX]: /^#([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})?$/i,
    [CONST.RGB]: /^rgb\s*\(\s*(?:(\d+%)\s*\,\s*(\d+%)\s*\,\s*(\d+%)|(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+))\s*\)$/,
    [CONST.RGBA]: /^rgba\s*\(\s*(?:(\d+%)\s*\,\s*(\d+%)\s*\,\s*(\d+%)|(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+))\s*,\s*(\d\.?\d*)\s*\)$/,
    [CONST.HSL]: /^hsl\s*\(\s*(\-?\d+)\s*\,\s*(\d+)%\s*\,\s*(\d+)%s*\)$/,
    [CONST.HSLA]: /^hsla\s*\(\s*(\-?\d+)\s*\,\s*(\d+)%\s*\,\s*(\d+)%\s*\,\s*(\d\.?\d*)\s*\)$/,
    [CONST.CMYK]: /^(?:device-cmyk|cmyk)\s*\(\s*(?:(\d+%)\s*\,\s*(\d+%)\s*\,\s*(\d+%)\s*\,\s*(\d+%)|(\d\.?\d*)\s*\,\s*(\d\.?\d*)\s*\,\s*(\d\.?\d*)\s*\,\s*(\d\.?\d*))\s*\)$/
};

export const PCENT = /^([\d\.]+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;

export const ERRORS = {
    NOT_ACCEPTED_STRING_INPUT: 'The provided string color doesn\'t have a correct format',
    NOT_ACCEPTED_OBJECT_INPUT: 'The provided color object doesn\'t have the proper keys'
};