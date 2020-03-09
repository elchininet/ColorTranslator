import { COLORS, HEX3, CMYK, FUNCTIONS, ColorProps, CMYKProps, ColorTranslator, Harmony } from './data/data';
import { HSLObject, ColorInput } from '../src/@types';
import { ERRORS } from '../src/constants';

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

// Test HSL Objects
const hslTo = ['rgb', 'rgbObject', 'rgba', 'rgbaObject', 'hex', 'hexObject', 'hexa', 'hexaObject'];

COLORS.forEach((item: ColorProps): void => {

    describe('HSL Object tests', (): void => {

        const hsl = { ...item.hslObject as HSLObject };
        const hsla = { ...item.hslaObject as HSLObject };
        const hslPercentages = { ...hsl, s: hsl.s + '%', l: hsl.l + '%' };
        const hslaPercentages = { ...hsla, s: hsla.s + '%', l: hsla.l + '%' };
        const hslBigHue = { ...hsl, h: hsl.h + 360 };
        const hslaBigHue = { ...hsl, h: hsl.h + 360 };
        const hslLowHue = { ...hsl, h: hsl.h - 360 };
        const hslaLowHue = { ...hsl, h: hsl.h - 360 };

        hslTo.forEach((prop: keyof ColorProps): void => {

            const functionCall = FUNCTIONS[prop].func;
            const cssProps = FUNCTIONS[prop].css;

            it(`HSL Objects with percentages ${JSON.stringify(hslPercentages)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslPercentages, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslPercentages, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects with percentages ${JSON.stringify(hslaPercentages)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaPercentages, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaPercentages, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSL Objects big hue ${JSON.stringify(hslBigHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslBigHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslBigHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects big hue ${JSON.stringify(hslaBigHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaBigHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaBigHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSL Objects low hue ${JSON.stringify(hslLowHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslLowHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslLowHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects low hue ${JSON.stringify(hslaLowHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaLowHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaLowHue, false)).toMatchObject(item[prop]);
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
        it(`${JSON.stringify(item.cmykObject)} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykObject)).toBe(hex);
        });
        it(`${JSON.stringify(item.cmykIntObject)} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykIntObject)).toBe(hex);
        });
    });
});

describe('ColorTranslator blending tests', (): void => {

    it('Blending deep equals', (): void => {

        const from = '#FF0000';
        const to = '#0000FF';

        const blendFunctions = [
            { colorFn: ColorTranslator.toHEX, blendFn: ColorTranslator.getBlendHEX },
            { colorFn: ColorTranslator.toHEXA, blendFn: ColorTranslator.getBlendHEXA },
            { colorFn: ColorTranslator.toRGB, blendFn: ColorTranslator.getBlendRGB },
            { colorFn: ColorTranslator.toRGBA, blendFn: ColorTranslator.getBlendRGBA },
            { colorFn: ColorTranslator.toHSL, blendFn: ColorTranslator.getBlendHSL },
            { colorFn: ColorTranslator.toHSLA, blendFn: ColorTranslator.getBlendHSLA }
        ];

        const result1 = [ '#FF0000', '#800080', '#0000FF' ];
        const result2 = [ '#FF0000', '#CC0033', '#990066', '#660099', '#3300CC', '#0000FF' ];

        blendFunctions.forEach((obj): void => {

            const r1 = result1.map(c => obj.colorFn(c));
            const r2 = result2.map(c => obj.colorFn(c));

            expect(obj.blendFn(from, to, r1.length)).toMatchObject(r1);
            expect(obj.blendFn(from, to, r2.length)).toMatchObject(r2);

        });
        
        // Check default steps
        expect(ColorTranslator.getBlendHEX(from, to)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        expect(ColorTranslator.getBlendHEX(from, to, -5)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        
    });

});

describe('ColorTranslator harmony tests', (): void => {    

    const colorFunctions = [
        ColorTranslator.toHEX,
        ColorTranslator.toHEXA,
        ColorTranslator.toRGB,
        ColorTranslator.toRGBA,
        ColorTranslator.toHSL,
        ColorTranslator.toHSLA
    ];

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

        colorFunctions.forEach((fn): void => {

            const b = fn(base);
            const r = results.map(colors => colors.map(color => fn(color)));

            it(`Harmony deep equals: ${harmony} for ${b} => ${JSON.stringify(r[index])}`, (): void => {

                const colors = ColorTranslator.getHarmony(b, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(r[index]);

            });            

        });  

    });

});

describe('Wrong inputs', (): void => {

    it('Wrong string', (): void => {

        expect(() => {
            ColorTranslator.toHEX('AAA');
        }).toThrowError(ERRORS.NOT_ACCEPTED_STRING_INPUT);

    });

    it('Wrong object', (): void => {

        expect(() => {
            ColorTranslator.toHEX({p: 100, h: 20, t: 360} as unknown as ColorInput);
        }).toThrowError(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);

    });

});