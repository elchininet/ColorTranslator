import { COLORS, HEX3, CMYK, FUNCTIONS, ColorProps, CMYKProps, ColorTranslator, Harmony } from './data/data';
import { HSLObject } from '../src/@types';

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

// Test HSL Objects with percentages
const hslTo = ['rgb', 'rgbObject', 'rgba', 'rgbaObject', 'hex', 'hexObject', 'hexa', 'hexaObject'];

COLORS.forEach((item: ColorProps): void => {

    describe(`HSL Object with percentages`, (): void => {

        const hsl = { ...item.hslObject as HSLObject };
        const hsla = { ...item.hslaObject as HSLObject };

        hsl.s += '%';
        hsl.l += '%';
        hsla.s += '%';
        hsla.l += '%';

        hslTo.forEach((prop: keyof ColorProps): void => {

            it(`${JSON.stringify(hsl)} => ${JSON.stringify(item[prop])}`, (): void => {

                const functionCall = FUNCTIONS[prop].func;
                const cssProps = FUNCTIONS[prop].css;

                if (cssProps) {
                    expect(functionCall(hsl, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hsl, false)).toMatchObject(item[prop]);
                }

            });

            it(`${JSON.stringify(hsla)} => ${JSON.stringify(item[prop])}`, (): void => {

                const functionCall = FUNCTIONS[prop].func;
                const cssProps = FUNCTIONS[prop].css;

                if (cssProps) {
                    expect(functionCall(hsla, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hsla, false)).toMatchObject(item[prop]);
                }

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
        const hex = ColorTranslator.toHEX(item.rgb);
        it(`${item.rgb} => ${item.cmyk}`, (): void => {
            expect(ColorTranslator.toCMYK(item.rgb)).toBe(item.cmyk);
        });
        it(`${item.cmyk} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmyk)).toBe(hex);
        });
        it(`${item.cmykint} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykint)).toBe(hex);
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
        
        // Check default steps
        expect(ColorTranslator.getBlendHEX(from, to)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        expect(ColorTranslator.getBlendHEX(from, to, -5)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        
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