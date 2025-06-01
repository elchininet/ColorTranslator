const HEX_DIGIT = '[a-f\\d]';
const HEX_DIGIT_DOUBLE = `${HEX_DIGIT}{2}`;
const HEX_NUMBER = '#[a-fA-F\\d]+';
const NUMBER_WITH_DECIMALS = '(?:\\d*\\.)?\\d+';
const SPACE = '\\s*';
const REAL_SPACE = '\\s+';
const COMMA = `${SPACE},${SPACE}`;
const SLASH = `${SPACE}\\/${SPACE}`;
const DEGREES_UNITS = '(?:deg|grad|rad|turn)?';
const FROM_COLOR = `(?:\\w+|\\w+\\(${SPACE}[^())]+${SPACE}\\)|\\w+\\(from${REAL_SPACE}\\w+\\(.*\\)${SPACE}\\)|${HEX_NUMBER})`;
const CALC_CHARACTERS = '()/*\\-+\\d.\\s';
const CALC_OPERATION = '[\\d./*+-\\w\\s]+';
const CALC_OPERAND = `(?:${NUMBER_WITH_DECIMALS}|\\w+)`;
const CALC_RGB_COLOR = `calc\\([rgb${CALC_CHARACTERS}]+\\)`;
const CALC_HWB_COLOR = `calc\\([hwb${CALC_CHARACTERS}]+\\)`;
const CALC_HSL_COLOR = `calc\\([hsl${CALC_CHARACTERS}]+\\)`;
const CALC_LAB_COLOR = `calc\\([lab${CALC_CHARACTERS}]+\\)`;
const CALC_LCH_COLOR = `calc\\([lch${CALC_CHARACTERS}]+\\)`;
const CALC_ALPHA_COLOR = `calc\\([${CALC_CHARACTERS}\\w]*(?:alpha)?[${CALC_CHARACTERS}\\w]*\\)`;
const RELATIVE_RGB_COLOR = `(?:[rgb]|${NUMBER_WITH_DECIMALS}|${CALC_RGB_COLOR})`;
const RELATIVE_HWB_COLOR = `(?:[hwb]|${NUMBER_WITH_DECIMALS}|${CALC_HWB_COLOR})`;
const RELATIVE_HSL_COLOR = `(?:[hsl]|${NUMBER_WITH_DECIMALS}|${CALC_HSL_COLOR})`;
const RELATIVE_LAB_COLOR = `(?:[lab]|${NUMBER_WITH_DECIMALS}|${CALC_LAB_COLOR})`;
const RELATIVE_LCH_COLOR = `(?:[lch]|${NUMBER_WITH_DECIMALS}|${CALC_LCH_COLOR})`;
const RELATIVE_ALPHA = `(?:${NUMBER_WITH_DECIMALS}%?|${CALC_ALPHA_COLOR}|alpha)`;

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
                    |
                        from
                        ${REAL_SPACE}
                        (?<from>${FROM_COLOR})
                        ${REAL_SPACE}
                        (?<relative_r>${RELATIVE_RGB_COLOR})
                        ${REAL_SPACE}
                        (?<relative_g>${RELATIVE_RGB_COLOR})
                        ${REAL_SPACE}
                        (?<relative_b>${RELATIVE_RGB_COLOR})
                        (?:
                            ${SLASH}
                            (?<relative_a>${RELATIVE_ALPHA})
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
                    |
                        from
                        ${REAL_SPACE}
                        (?<from>${FROM_COLOR})
                        ${REAL_SPACE}
                        (?<relative_h>${RELATIVE_HWB_COLOR})
                        ${REAL_SPACE}
                        (?<relative_w>${RELATIVE_HWB_COLOR})%?
                        ${REAL_SPACE}
                        (?<relative_b>${RELATIVE_HWB_COLOR})%?
                        (?:
                            ${SLASH}
                            (?<relative_a>${RELATIVE_ALPHA})
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
                    |
                        from
                        ${REAL_SPACE}
                        (?<from>${FROM_COLOR})
                        ${REAL_SPACE}
                        (?<relative_h>${RELATIVE_HSL_COLOR})
                        ${REAL_SPACE}
                        (?<relative_s>${RELATIVE_HSL_COLOR})%?
                        ${REAL_SPACE}
                        (?<relative_l>${RELATIVE_HSL_COLOR})%?
                        (?:
                            ${SLASH}
                            (?<relative_a>${RELATIVE_ALPHA})
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
                    |
                        from
                        ${REAL_SPACE}
                        (?<from>${FROM_COLOR})
                        ${REAL_SPACE}
                        (?<relative_L>${RELATIVE_LAB_COLOR})
                        ${REAL_SPACE}
                        (?<relative_a>${RELATIVE_LAB_COLOR})
                        ${REAL_SPACE}
                        (?<relative_b>${RELATIVE_LAB_COLOR})
                        (?:
                            ${SLASH}
                            (?<relative_A>${RELATIVE_ALPHA})
                        )?
                )
                ${SPACE}
            \\)$
        `,
        LCH: `
            ^lch${SPACE}\\(
                ${SPACE}
                (?:
                        (?<l>${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<c>-?${NUMBER_WITH_DECIMALS}%?)
                        ${REAL_SPACE}
                        (?<h>-?${NUMBER_WITH_DECIMALS})
                        (?:
                            ${SLASH}
                            (?<a>${NUMBER_WITH_DECIMALS}%?)
                        )?
                    |
                        from
                        ${REAL_SPACE}
                        (?<from>${FROM_COLOR})
                        ${REAL_SPACE}
                        (?<relative_l>${RELATIVE_LCH_COLOR})
                        ${REAL_SPACE}
                        (?<relative_c>${RELATIVE_LCH_COLOR})
                        ${REAL_SPACE}
                        (?<relative_h>${RELATIVE_LCH_COLOR})
                        (?:
                            ${SLASH}
                            (?<relative_a>${RELATIVE_ALPHA})
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
    CALC: {
        REGEXP: `
            ^calc\\(
                ${SPACE}
                (?<operation>${CALC_OPERATION})
                ${SPACE}
            \\)$
        `,
        SCOPED: `
            \\(
                ${SPACE}
                ([^()]+)
                ${SPACE}
            \\)
        `,
        DIVISION: `
            ${SPACE}
            (?<left>${CALC_OPERAND})
            ${SPACE}
            \\/
            ${SPACE}
            (?<right>${CALC_OPERAND})
            ${SPACE}
        `,
        MULTIPLICATION: `
            ${SPACE}
            (?<left>${CALC_OPERAND})
            ${SPACE}
            \\*
            ${SPACE}
            (?<right>${CALC_OPERAND})
            ${SPACE}
        `,
        SUM: `
            ${SPACE}
            (?<left>${CALC_OPERAND})
            ${SPACE}
            \\+
            ${SPACE}
            (?<right>${CALC_OPERAND})
            ${SPACE}
        `,
        REST: `
            ${SPACE}
            (?<left>${CALC_OPERAND})
            ${SPACE}
            -
            ${SPACE}
            (?<right>${CALC_OPERAND})
            ${SPACE}
        `
    },
    HSL_HUE: new RegExp(`^(?<number>-?${NUMBER_WITH_DECIMALS})(?<units>${DEGREES_UNITS})$`),
    toRegExp: function (str, options = {}) {
        const {
            global = false,
            caseInsensitive = false,
        } = options;
        let flags = '';
        if (global) {
            flags += 'g';
        }
        if (caseInsensitive) {
            flags += 'i';
        }
        const stringWithoutSpaces = str.replace(/\s*/gm, '');
        return flags === ''
            ? new RegExp(stringWithoutSpaces)
            : new RegExp(stringWithoutSpaces, flags);
    }
};