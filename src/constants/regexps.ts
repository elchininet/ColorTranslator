import { ColorModel } from './enums';

const HEX_DIGIT = '[a-f\\d]';
const HEX_DIGIT_DOUBLE = `${HEX_DIGIT}{2}`;
const NUMBER_WITH_DECIMALS = '(?:\\d*\\.)?\\d+';
const SPACE = '\\s*';
const COMMA = `${SPACE},${SPACE}`;
const SLASH = `${SPACE}\\/${SPACE}`;
const HSL_DEGREES_UNITS = '(?:deg|grad|rad|turn)?';

const toRegExp = (str: string, caseInsensitive = false): RegExp => {
    const stringWithoutSpaces = str.replace(/\s*/gm, '');
    return caseInsensitive
        ? new RegExp(stringWithoutSpaces, 'i')
        : new RegExp(stringWithoutSpaces);
};

const COLOR_REGEXP_STRINGS = {
    [ColorModel.HEX]: `
        ^#(?:
                (${HEX_DIGIT})
                (${HEX_DIGIT})
                (${HEX_DIGIT})
                (${HEX_DIGIT})?
            |
                (${HEX_DIGIT_DOUBLE})
                (${HEX_DIGIT_DOUBLE})
                (${HEX_DIGIT_DOUBLE})
                (${HEX_DIGIT_DOUBLE})?
        )$
    `,
    [ColorModel.RGB]: `
        ^rgba?${SPACE}\\(
            ${SPACE}
            (?:
                    (${NUMBER_WITH_DECIMALS}%?)
                    ${COMMA}
                    (${NUMBER_WITH_DECIMALS}%?)
                    ${COMMA}
                    (${NUMBER_WITH_DECIMALS}%?)
                    (?:
                        ${COMMA}
                        (${NUMBER_WITH_DECIMALS})
                    )?
                |
                    (${NUMBER_WITH_DECIMALS}%?)
                    ${SPACE}
                    (${NUMBER_WITH_DECIMALS}%?)
                    ${SPACE}
                    (${NUMBER_WITH_DECIMALS}%?)
                    (?:
                        ${SLASH}
                        (${NUMBER_WITH_DECIMALS}%?)
                    )?
            )
            ${SPACE}
        \\)$
    `,
    [ColorModel.HSL]: `
        ^hsla?${SPACE}\\(
            ${SPACE}
            (?:
                    (-?${NUMBER_WITH_DECIMALS}${HSL_DEGREES_UNITS})
                    ${COMMA}
                    (${NUMBER_WITH_DECIMALS})%
                    ${COMMA}
                    (${NUMBER_WITH_DECIMALS})%
                    (?:
                        ${COMMA}
                        (${NUMBER_WITH_DECIMALS})
                    )?
                |
                    (-?${NUMBER_WITH_DECIMALS}${HSL_DEGREES_UNITS})
                    ${SPACE}
                    (${NUMBER_WITH_DECIMALS})%
                    ${SPACE}
                    (${NUMBER_WITH_DECIMALS})%
                    (?:
                        ${SLASH}
                        (${NUMBER_WITH_DECIMALS}%?)
                    )?
            )
            ${SPACE}
        \\)$
    `,
    [ColorModel.CMYK]: `
        ^(?:device-cmyk|cmyk)
        ${SPACE}
        \\(${SPACE}
            (?:
                (${NUMBER_WITH_DECIMALS}%?)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%?)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%?)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%?)
                (?:
                    ${COMMA}
                    (${NUMBER_WITH_DECIMALS})
                )?
            |
                (${NUMBER_WITH_DECIMALS}%?)
                ${SPACE}
                (${NUMBER_WITH_DECIMALS}%?)
                ${SPACE}
                (${NUMBER_WITH_DECIMALS}%?)
                ${SPACE}
                (${NUMBER_WITH_DECIMALS}%?)
                (?:
                    ${SLASH}
                    (${NUMBER_WITH_DECIMALS}%?)
                )?
            )
            ${SPACE}
        \\)$
    `
};

export const COLORREGS = {
    [ColorModel.HEX]  : toRegExp(COLOR_REGEXP_STRINGS.HEX, true),
    [ColorModel.RGB]  : toRegExp(COLOR_REGEXP_STRINGS.RGB),
    [ColorModel.HSL]  : toRegExp(COLOR_REGEXP_STRINGS.HSL),
    [ColorModel.CMYK] : toRegExp(COLOR_REGEXP_STRINGS.CMYK)
};

export const PCENT = /^(\d+(?:\.\d+)?|\.\d+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;
export const HSL_HUE = new RegExp(`^(-?${NUMBER_WITH_DECIMALS})(${HSL_DEGREES_UNITS})$`);