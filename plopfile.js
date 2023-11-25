const { COLOR_REGEXP_STRINGS, HSL_HUE, toRegExp } = require('./.plop/regexps-strings');

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
                    HEX: toRegExp(COLOR_REGEXP_STRINGS.HEX, true),
                    RGB: toRegExp(COLOR_REGEXP_STRINGS.RGB),
                    HSL: toRegExp(COLOR_REGEXP_STRINGS.HSL),
                    CIELab: toRegExp(COLOR_REGEXP_STRINGS.CIELab),
                    CMYK: toRegExp(COLOR_REGEXP_STRINGS.CMYK),
                    HSL_HUE
                },
                templateFile: '.plop/regexps.hbs'
            }
        ]
    });
};