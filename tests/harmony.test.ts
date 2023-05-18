import { ColorTranslator } from '../src';
import { Harmony, Mix } from '../src/constants';
import { HEXObject, RGBObject, HSLObjectGeneric } from '../src/@types';

describe('ColorTranslator harmony tests', (): void => {

    const hexColorFunctions = [
        ColorTranslator.toHEX,
        ColorTranslator.toHEXA,
    ];

    const colorFunctions = [
        ColorTranslator.toRGB,
        ColorTranslator.toRGBA,
        ColorTranslator.toHSL,
        ColorTranslator.toHSLA
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

            const css = fn(base);
            const obj = fn(base, false) as HEXObject & RGBObject & HSLObjectGeneric;
            const additiveResultCSS = additive_results.map(colors => colors.map(color => fn(color)));
            const additiveResultObject = additive_results.map(colors => colors.map(color => fn(color, false))) as (HEXObject | RGBObject | HSLObjectGeneric)[][];
            const subtractiveResultCSS = subtractive_results.map(colors => colors.map(color => fn(color)));
            const subtractiveResultObject = subtractive_results.map(colors => colors.map(color => fn(color, false))) as (HEXObject | RGBObject | HSLObjectGeneric)[][];

            it(`Additive Harmony deep equals: ${harmony} for ${css} => ${JSON.stringify(additiveResultCSS[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(css)
                    : ColorTranslator.getHarmony(css, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(additiveResultCSS[index]);
            });

            it(`Additive Harmony deep equals: ${harmony} for ${JSON.stringify(obj)} => ${JSON.stringify(additiveResultObject[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(obj)
                    : ColorTranslator.getHarmony(obj, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(additiveResultObject[index]);
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${css} => ${JSON.stringify(subtractiveResultCSS[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(css, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchObject(subtractiveResultCSS[index]);
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${JSON.stringify(obj)} => ${JSON.stringify(subtractiveResultObject[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(obj, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchObject(subtractiveResultObject[index]);
            });

            it('Additive Complementary > 360º', (): void => {
                const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE);
                expect(colors[1]).toBe('#FF8000');
            });

        });

        colorFunctions.forEach((fn): void => {

            const css = fn(base, true, 0);
            const obj = fn(base, false, 0) as HEXObject & RGBObject & HSLObjectGeneric;
            const additiveResultCSS = additive_results.map(colors => colors.map(color => fn(color, true, 0)));
            const additiveResultObject = additive_results.map(colors => colors.map(color => fn(color, false, 0))) as (HEXObject | RGBObject | HSLObjectGeneric)[][];
            const subtractiveResultCSS = subtractive_results.map(colors => colors.map(color => fn(color, true, 0)));
            const subtractiveResultObject = subtractive_results.map(colors => colors.map(color => fn(color, false, 0))) as (HEXObject | RGBObject | HSLObjectGeneric)[][];

            it(`Additive Harmony deep equals: ${harmony} for ${css} => ${JSON.stringify(additiveResultCSS[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(css, Harmony[harmony as Harmony], Mix.ADDITIVE, 0);
                expect(colors).toMatchObject(additiveResultCSS[index]);
            });

            it(`Additive Harmony deep equals: ${harmony} for ${JSON.stringify(obj)} => ${JSON.stringify(additiveResultObject[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(obj, Harmony[harmony as Harmony], Mix.ADDITIVE, 0);
                expect(colors).toMatchObject(additiveResultObject[index]);
            });

            it(`Additive Harmony with decimals for ${JSON.stringify(css)}`, (): void => {
                const colors = ColorTranslator.getHarmony(css, Harmony[harmony as Harmony], Mix.ADDITIVE);
                expect(colors).toMatchSnapshot();
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${css} => ${JSON.stringify(subtractiveResultCSS[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(css, Harmony[harmony as Harmony], Mix.SUBTRACTIVE, 0);
                expect(colors).toMatchObject(subtractiveResultCSS[index]);
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${JSON.stringify(obj)} => ${JSON.stringify(subtractiveResultObject[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(obj, Harmony[harmony as Harmony], Mix.SUBTRACTIVE, 0);
                expect(colors).toMatchObject(subtractiveResultObject[index]);
            });

            it(`Subtractive Harmony with decimals for ${JSON.stringify(css)}`, (): void => {
                const colors = ColorTranslator.getHarmony(css, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchSnapshot();
            });

            it('Additive Complementary > 360º', (): void => {
                const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE, 0);
                expect(colors[1]).toBe('#FF8000');
            });

        });

    });

});