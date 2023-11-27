const HEX_DIGIT = '[a-f\\d]';
const HEX_DIGIT_DOUBLE = `${HEX_DIGIT}{2}`;
const NUMBER_WITH_DECIMALS = '(?:\\d*\\.)?\\d+';
const SPACE = '\\s*';
const COMMA = `${SPACE},${SPACE}`;
const SLASH = `${SPACE}\\/${SPACE}`;
const HSL_DEGREES_UNITS = '(?:deg|grad|rad|turn)?';

module.exports = {
    COLOR_REGEXP_STRINGS: {
        HEX: `
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
        RGB: `
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
        HSL: `
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
        CIELab: `
            ^lab${SPACE}\\(
                    ${SPACE}
                    (?:
                        (${NUMBER_WITH_DECIMALS}%?)
                        ${SPACE}
                        (-?${NUMBER_WITH_DECIMALS}%?)
                        ${SPACE}
                        (-?${NUMBER_WITH_DECIMALS}%?)
                        (?:
                            ${SLASH}
                            (${NUMBER_WITH_DECIMALS}%?)
                        )?
                    )
                    ${SPACE}
            \\)$
        `,
        CMYK: `
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
    },
    HSL_HUE: new RegExp(`^(-?${NUMBER_WITH_DECIMALS})(${HSL_DEGREES_UNITS})$`),
    toRegExp: function (str, caseInsensitive = false) {
        const stringWithoutSpaces = str.replace(/\s*/gm, '');
        return caseInsensitive ? new RegExp(stringWithoutSpaces, 'i') : new RegExp(stringWithoutSpaces);
    }
};
