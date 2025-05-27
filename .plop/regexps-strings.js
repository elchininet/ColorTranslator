const HEX_DIGIT = '[a-f\\d]';
const HEX_DIGIT_DOUBLE = `${HEX_DIGIT}{2}`;
const NUMBER_WITH_DECIMALS = '(?:\\d*\\.)?\\d+';
const SPACE = '\\s*';
const REAL_SPACE = '\\s+';
const COMMA = `${SPACE},${SPACE}`;
const SLASH = `${SPACE}\\/${SPACE}`;
const DEGREES_UNITS = '(?:deg|grad|rad|turn)?';

module.exports = {
    COLOR_REGEXP_STRINGS: {
        HEX: `
            ^#(?:
                    (?<r>${HEX_DIGIT})
                    (?<g>${HEX_DIGIT})
                    (?<b>${HEX_DIGIT})
                    (?<a>${HEX_DIGIT})?
                |
                    (?<rr>${HEX_DIGIT_DOUBLE})
                    (?<gg>${HEX_DIGIT_DOUBLE})
                    (?<bb>${HEX_DIGIT_DOUBLE})
                    (?<aa>${HEX_DIGIT_DOUBLE})?
            )$
        `,
        RGB: `
            ^rgba?${SPACE}\\(
                ${SPACE}
                (?:
                        (?<r_legacy>${NUMBER_WITH_DECIMALS}%?)
                        ${COMMA}
                        (?<g_legacy>${NUMBER_WITH_DECIMALS}%?)
                        ${COMMA}
                        (?<b_legacy>${NUMBER_WITH_DECIMALS}%?)
                        (?:
                            ${COMMA}
                            (?<a_legacy>${NUMBER_WITH_DECIMALS})
                        )?   
                    |
                        (?<r>${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<g>${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<b>${NUMBER_WITH_DECIMALS}%?)
                        (?:
                            ${SLASH}
                            (?<a>${NUMBER_WITH_DECIMALS}%?)
                        )?

                )
                ${SPACE}
            \\)$
        `,
        HWB: `
            ^hwb${SPACE}\\(
                ${SPACE}
                (?:
                    (?<h>${NUMBER_WITH_DECIMALS}${DEGREES_UNITS})
                    ${REAL_SPACE}
                    (?<w>${NUMBER_WITH_DECIMALS})%
                    ${REAL_SPACE}
                    (?<b>${NUMBER_WITH_DECIMALS})%
                    (?:
                        ${SLASH}
                        (?<a>${NUMBER_WITH_DECIMALS}%?)
                    )?
                )
                ${SPACE}
            \\)$
        `,
        HSL: `
            ^hsla?${SPACE}\\(
                ${SPACE}
                (?:
                        (?<h_legacy>-?${NUMBER_WITH_DECIMALS}${DEGREES_UNITS})
                        ${COMMA}
                        (?<s_legacy>${NUMBER_WITH_DECIMALS})%
                        ${COMMA}
                        (?<l_legacy>${NUMBER_WITH_DECIMALS})%
                        (?:
                            ${COMMA}
                            (?<a_legacy>${NUMBER_WITH_DECIMALS})
                        )?
                    |
                        (?<h>-?${NUMBER_WITH_DECIMALS}${DEGREES_UNITS})
                        ${REAL_SPACE}
                        (?<s>${NUMBER_WITH_DECIMALS})%
                        ${REAL_SPACE}
                        (?<l>${NUMBER_WITH_DECIMALS})%
                        (?:
                            ${SLASH}
                            (?<a>${NUMBER_WITH_DECIMALS}%?)
                        )?
                )
                ${SPACE}
            \\)$
        `,
        CIELab: `
            ^lab${SPACE}\\(
                    ${SPACE}
                    (?:
                        (?<L>${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<a>-?${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<b>-?${NUMBER_WITH_DECIMALS}%?)
                        (?:
                            ${SLASH}
                            (?<A>${NUMBER_WITH_DECIMALS}%?)
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
                    (?<c_legacy>${NUMBER_WITH_DECIMALS}%?)
                    ${COMMA}
                    (?<m_legacy>${NUMBER_WITH_DECIMALS}%?)
                    ${COMMA}
                    (?<y_legacy>${NUMBER_WITH_DECIMALS}%?)
                    ${COMMA}
                    (?<k_legacy>${NUMBER_WITH_DECIMALS}%?)
                    (?:
                        ${COMMA}
                        (?<a_legacy>${NUMBER_WITH_DECIMALS})
                    )?
                |
                    (?<c>${NUMBER_WITH_DECIMALS}%?)
                    ${REAL_SPACE}
                    (?<m>${NUMBER_WITH_DECIMALS}%?)
                    ${REAL_SPACE}
                    (?<y>${NUMBER_WITH_DECIMALS}%?)
                    ${REAL_SPACE}
                    (?<k>${NUMBER_WITH_DECIMALS}%?)
                    (?:
                        ${SLASH}
                        (?<a>${NUMBER_WITH_DECIMALS}%?)
                    )?
                )
                ${SPACE}
            \\)$
        `
    },
    HSL_HUE: new RegExp(`^(?<number>-?${NUMBER_WITH_DECIMALS})(?<units>${DEGREES_UNITS})$`),
    toRegExp: function (str, caseInsensitive = false) {
        const stringWithoutSpaces = str.replace(/\s*/gm, '');
        return caseInsensitive
            ? new RegExp(stringWithoutSpaces, 'i')
            : new RegExp(stringWithoutSpaces);
    }
};