import { ColorTranslator } from '../src';
import { Harmony, Mix } from '../src/constants';
import { HEXObject, RGBObject, HSLObjectGeneric } from '../src/@types';

describe('ColorTranslator harmony tests', (): void => {

    const hexColorFunctions = [
        ColorTranslator.toHEX,
        ColorTranslator.toHEXA,
        ColorTranslator.toHEXObject,
        ColorTranslator.toHEXAObject
    ];

    const colorFunctions = [
        ColorTranslator.toRGB,
        ColorTranslator.toRGBA,
        ColorTranslator.toHSL,
        ColorTranslator.toHSLA,
        ColorTranslator.toRGBObject,
        ColorTranslator.toRGBAObject,
        ColorTranslator.toHSLObject,
        ColorTranslator.toHSLAObject
    ];

    const base = '#FF0000';

    const additive_results = [
        ['#FF0000', '#FF8000', '#FF0080'],
        ['#FF0000', '#00FFFF'],
        ['#FF0000', '#00FF80', '#0080FF'],
        ['#FF0000', '#00FF00', '#0000FF'],
        ['#FF0000', '#FFFF00', '#0000FF', '#00FFFF'],
        ['#FF0000', '#80FF00', '#8000FF', '#00FFFF']
    ];

    const subtractive_results = [
        ['#FF0000', '#FF4000', '#FF0080'],
        ['#FF0000', '#00FF00'],
        ['#FF0000', '#80FF00', '#00FFFF'],
        ['#FF0000', '#FFFF00', '#0000FF'],
        ['#FF0000', '#FF8000', '#0000FF', '#00FF00'],
        ['#FF0000', '#FFBF00', '#8000FF', '#00FF00']
    ];

    Object.keys(Harmony).forEach((harmony, index): void => {

        hexColorFunctions.forEach((fn): void => {

            const color = fn(base) as string & HEXObject & RGBObject & HSLObjectGeneric;
            const additiveResult = additive_results.map(colors => colors.map(color => fn(color)));
            const subtractiveResult = subtractive_results.map(colors => colors.map(color => fn(color)));

            it(`Additive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(additiveResult[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(color)
                    : ColorTranslator.getHarmony(color, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(additiveResult[index]);
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(subtractiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchObject(subtractiveResult[index]);
            });

            it('Additive Complementary > 360º', (): void => {
                const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE);
                expect(colors[1]).toBe('#FF8000');
            });

        });

        colorFunctions.forEach((fn): void => {

            const options = { decimals: 0 };
            const color = fn(base, options) as string & HEXObject & RGBObject & HSLObjectGeneric;
            const additiveResult = additive_results.map(colors => colors.map(color => fn(color, options)));
            const subtractiveResult = subtractive_results.map(colors => colors.map(color => fn(color, options)));

            it(`Additive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(additiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.ADDITIVE, options);
                expect(colors).toMatchObject(additiveResult[index]);
            });

            it(`Additive Harmony with decimals for ${JSON.stringify(color)}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.ADDITIVE);
                expect(colors).toMatchSnapshot();
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(subtractiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE, options);
                expect(colors).toMatchObject(subtractiveResult[index]);
            });

            it(`Subtractive Harmony with decimals for ${JSON.stringify(color)}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchSnapshot();
            });

            it('Additive Complementary > 360º', (): void => {
                const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE, options);
                expect(colors[1]).toBe('#FF8000');
            });

        });

    });

});