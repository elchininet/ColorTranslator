import 'mocha';
import { expect } from 'chai';
import { COLORS, FUNCTIONS, ColorProps, ColorFunctionProps } from './data/data';

//Iterate over the colors
COLORS.forEach((item: ColorProps): void => {

    // Excluding CMYK from the tests. Conversion from/to CMYK is made taking a random black color value to calculate the rest
    // This makes the testing pointless because the same value converted to RGB and reconverted back again to CMYK will not have the same values
    const colors = Object.keys(item).filter((c: string): boolean => c.indexOf("cmyk") < 0);

    // Iterate over the color models
    colors.forEach((color1: keyof ColorProps): void => {

        describe(`ColorTranslator dynamic tests from ${color1}: ${JSON.stringify(item[color1])}`, () => {

            const convert = item[color1];
            const convertString = typeof convert === 'string' ? convert : JSON.stringify(convert);

            // Iterate again the color models
            colors.forEach((color2: keyof ColorProps): void => {

                const functionName = FUNCTIONS[color2].name;
                const functionCall = FUNCTIONS[color2].func;
                const cssProps = FUNCTIONS[color2].css;
                const result = item[color2];
                const resultString = typeof result === 'string' ? result : JSON.stringify(result);

                it(`Getting ${functionName} from ${convertString} must return => ${resultString}`, () => {
                    if (cssProps) {
                        expect(functionCall(convert, true)).equal(result);
                    } else {
                        expect(functionCall(convert, false)).to.deep.equal(result);
                    }
                });

            });

        });

    });
});