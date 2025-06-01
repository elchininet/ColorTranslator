const {
    COLOR_REGEXP_STRINGS,
    HSL_HUE,
    CALC,
    toRegExp
} = require('./.plop/regexps-strings');

module.exports = (plop) => {
    plop.setGenerator('Compile RegExps', {
        description: 'Compile the regular library regular expressions from a template file',
        prompts: [],
        actions: [
            {
                type: 'modify',
                path: 'src/constants/regexps.ts',
                pattern: /\/\/ START REGEXPS[\s\S]*\/\/ END REGEXPS/,
                data: {
                    HEX: toRegExp(
                        COLOR_REGEXP_STRINGS.HEX,
                        {
                            caseInsensitive: true
                        }
                    ),
                    RGB: toRegExp(COLOR_REGEXP_STRINGS.RGB),
                    HWB: toRegExp(COLOR_REGEXP_STRINGS.HWB),
                    HSL: toRegExp(COLOR_REGEXP_STRINGS.HSL),
                    CIELab: toRegExp(COLOR_REGEXP_STRINGS.CIELab),
                    LCH: toRegExp(COLOR_REGEXP_STRINGS.LCH),
                    CMYK: toRegExp(COLOR_REGEXP_STRINGS.CMYK),
                    CALC_REGEXP: toRegExp(CALC.REGEXP),
                    CALC_SCOPED: toRegExp(
                        CALC.SCOPED,
                        {
                            global: true
                        }
                    ),
                    CALC_DIVISION: toRegExp(CALC.DIVISION),
                    CALC_MULTIPLICATION: toRegExp(CALC.MULTIPLICATION),
                    CALC_SUM: toRegExp(CALC.SUM),
                    CALC_REST: toRegExp(CALC.REST),
                    HSL_HUE
                },
                templateFile: '.plop/regexps.hbs'
            }
        ]
    });
};