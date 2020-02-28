import { COLORS, HEX3, CMYK, FUNCTIONS, ColorProps, CMYKProps, ColorTranslator, Harmony } from './data/data';

//Iterate over the colors
COLORS.forEach((item: ColorProps): void => {

    const colors = Object.keys(item);

    // Iterate over the color models
    colors.forEach((color1: keyof ColorProps): void => {

        describe(`ColorTranslator dynamic tests from ${color1}: ${JSON.stringify(item[color1])}`, (): void => {

            const convert = item[color1];
            const convertString = typeof convert === 'string' ? convert : JSON.stringify(convert);

            // Iterate again the color models
            colors.forEach((color2: keyof ColorProps): void => {

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

const hex3Props = ['hex', 'hexObject', 'hexa', 'hexaObject', 'hexObjectPercent', 'rgbPercent'];

HEX3.forEach((item: ColorProps): void => {

    // Iterate over the color models
    hex3Props.forEach((prop: keyof ColorProps): void => {

        describe(`ColorTranslator dynamic test for the HEX3 color: ${JSON.stringify(item[prop])}`, (): void => {

            it('CSS RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop])).toBe(item.rgb);
            });

            it('Object RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop], false)).toMatchObject(item.rgbObject);
            });

            it('CSS RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop])).toBe(item.rgba);
            });

            it('Object RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop], false)).toMatchObject(item.rgbaObject);
            });

            it('CSS HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop])).toBe(item.hsl);
            });

            it('Object HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop], false)).toMatchObject(item.hslObject);
            });

            it('CSS HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop])).toBe(item.hsla);
            });

            it('Object HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop], false)).toMatchObject(item.hslaObject);
            });

        });

    });
});

CMYK.forEach((item: CMYKProps): void => {
    describe('ColorTranslator basic CMYK tests', (): void => {
        it(`${item.rgb} => ${item.cmyk}`, (): void => {
            expect(ColorTranslator.toCMYK(item.rgb)).toBe(item.cmyk);
        });
    });
});

describe('ColorTranslator blending tests', (): void => {

    it('Blending deep equals', (): void => {

        const from = '#FF0000';
        const to = '#0000FF';

        const blend1 = ColorTranslator.getBlendHEX(from, to, 3);
        const blend2 = ColorTranslator.getBlendHEX(from, to, 6);
        const blend3 = ColorTranslator.getBlendHEX(from, to, 9);

        expect(blend1).toMatchObject([ '#FF0000', '#7F007F', '#0000FF' ]);
        expect(blend2).toMatchObject([ '#FF0000', '#CC0033', '#990066', '#660099', '#3300CC', '#0000FF' ]);
        expect(blend3).toMatchObject([ '#FF0000', '#DF001F', '#BF003F', '#9F005F', '#7F007F', '#5F009F', '#3F00BF', '#1F00DF', '#0000FF' ]);
        
    });

});

describe('ColorTranslator harmony tests', (): void => {

    it('Harmony deep equals', (): void => {

        const base = '#FF0000';
        
        const results = [
            ['#FF0000', '#FF0080', '#FF8000'],
            ['#FF0000', '#00FFFF'],
            ['#FF0000', '#0080FF', '#00FF80'],
            ['#FF0000', '#00FF00', '#0000FF'],
            ['#FF0000', '#FF00FF', '#00FF00', '#00FFFF'],
            ['#FF0000', '#8000FF', '#80FF00', '#00FFFF']
        ];

        Object.keys(Harmony).forEach((harmony, index): void => {

            const colors = ColorTranslator.getHarmony(base, Harmony[harmony as Harmony]);
            
            expect(colors).toMatchObject(results[index]);

        });
        
    });

});