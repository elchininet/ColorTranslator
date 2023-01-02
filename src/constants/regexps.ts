import { ColorModel } from './enums';

const HEX_DIGIT = '[a-f\\d]';
const HEX_DIGIT_DOUBLE = `${HEX_DIGIT}{2}`;
const DIGIT = '\\d+';
const DIGIT_WITH_DECIMALS = '(?:\\d?\\.)?\\d*';
const NUMBER_WITH_DECIMALS = '\\d+\\.?\\d*';
const PERCENTAGE_DIGIT = '\\d+%';
const SPACE = '\\s*';
const COMMA = `${SPACE},${SPACE}`;

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
        ^rgb${SPACE}\\(
            ${SPACE}
            (?:
                    (${PERCENTAGE_DIGIT})
                    ${COMMA}
                    (${PERCENTAGE_DIGIT})
                    ${COMMA}
                    (${PERCENTAGE_DIGIT})
                |
                    (${DIGIT})
                    ${COMMA}
                    (${DIGIT})
                    ${COMMA}
                    (${DIGIT})
            )
            ${SPACE}
        \\)$
    `,
    [ColorModel.RGBA]: `
        ^rgba${SPACE}\\(
            ${SPACE}
            (?:
                    (${PERCENTAGE_DIGIT})
                    ${COMMA}
                    (${PERCENTAGE_DIGIT})
                    ${COMMA}
                    (${PERCENTAGE_DIGIT})
                |
                    (${DIGIT})
                    ${COMMA}
                    (${DIGIT})
                    ${COMMA}
                    (${DIGIT})
            )
            ${COMMA}
            (${DIGIT_WITH_DECIMALS})
            ${SPACE}
        \\)$
    `,
    [ColorModel.HSL]: `
        ^hsl${SPACE}\\(
            ${SPACE}
            (-?${NUMBER_WITH_DECIMALS})
            ${COMMA}
            (${NUMBER_WITH_DECIMALS})%
            ${COMMA}
            (${NUMBER_WITH_DECIMALS})%
            ${SPACE}
        \\)$
    `,
    [ColorModel.HSLA]: `
        ^hsla${SPACE}\\(
            ${SPACE}
            (-?${NUMBER_WITH_DECIMALS})
            ${COMMA}
            (${NUMBER_WITH_DECIMALS})%
            ${COMMA}
            (${NUMBER_WITH_DECIMALS})%
            ${COMMA}
            (${DIGIT_WITH_DECIMALS})
            ${SPACE}
        \\)$
    `,
    [ColorModel.CMYK]: `
        ^(?:device-cmyk|cmyk)
        ${SPACE}
        \\(${SPACE}
            (?:
                (${NUMBER_WITH_DECIMALS}%)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%)
                ${COMMA}
                (${NUMBER_WITH_DECIMALS}%)
            |
                (${DIGIT_WITH_DECIMALS})
                ${COMMA}
                (${DIGIT_WITH_DECIMALS})
                ${COMMA}
                (${DIGIT_WITH_DECIMALS})
                ${COMMA}
                (${DIGIT_WITH_DECIMALS})
            )
            ${SPACE}
        \\)$
    `
};

export const COLORREGS = {
    [ColorModel.HEX]  : toRegExp(COLOR_REGEXP_STRINGS.HEX, true),
    [ColorModel.RGB]  : toRegExp(COLOR_REGEXP_STRINGS.RGB),
    [ColorModel.RGBA] : toRegExp(COLOR_REGEXP_STRINGS.RGBA),
    [ColorModel.HSL]  : toRegExp(COLOR_REGEXP_STRINGS.HSL),
    [ColorModel.HSLA] : toRegExp(COLOR_REGEXP_STRINGS.HSLA),
    [ColorModel.CMYK] : toRegExp(COLOR_REGEXP_STRINGS.CMYK)
};

export const PCENT = /^(\d+(?:\.\d+)?|\.\d+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;