import { COLORS, FUNCTIONS, ColorProps, ColorTranslator } from './data/data';

type Props = keyof typeof COLORS[0];

//Iterate over the colors
COLORS.forEach((item: ColorProps): void => {

    const colors = Object.keys(item) as Props[];

    // Iterate over the color models
    colors.forEach((color1: Props): void => {

        describe(`ColorTranslator dynamic tests from ${color1}: ${JSON.stringify(item[color1])}`, (): void => {

            const convert = item[color1];
            const convertString = typeof convert === 'string' ? convert : JSON.stringify(convert);

            // Iterate again the color models
            colors.forEach((color2: Props): void => {

                const functionName = FUNCTIONS[color2].name;
                const functionCall = FUNCTIONS[color2].func;
                const cssProps = FUNCTIONS[color2].css;
                const result = item[color2];
                const resultString = typeof result === 'string' ? result : JSON.stringify(result);

                it(`Getting ${functionName} from ${convertString} must return => ${resultString}`, (): void => {
                    if (cssProps) {
                        expect(functionCall(convert, true)).toBe(result);
                    } else {
                        expect(functionCall(convert, false)).toMatchObject(result);
                    }
                });

            });

        });

    });

});

describe('Check static methods', (): void => {

    it('Return HEXA color with alpha if the alpha is 0', (): void => {
        expect(ColorTranslator.toHEXA('#FF0000')).toBe('#FF0000FF');
        expect(ColorTranslator.toHEXA('#FF000000', false)).toMatchObject({r: '0xFF', g: '0x00', b: '0x00', a: '0x00'});
    });

});