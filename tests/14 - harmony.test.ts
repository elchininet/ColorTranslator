import { ColorTranslator } from '../src';
import { Harmony, Mix } from '../src/constants';
import {
    CIELabObjectGeneric,
    HEXObject,
    HSLObjectGeneric,
    HWBObjectGeneric,
    LCHObjectGeneric,
    RGBObject
} from '../src/@types';

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
        ColorTranslator.toHWB,
        ColorTranslator.toHWBA,
        ColorTranslator.toRGBObject,
        ColorTranslator.toRGBAObject,
        ColorTranslator.toHSLObject,
        ColorTranslator.toHSLAObject,
        ColorTranslator.toHWBObject,
        ColorTranslator.toHWBAObject
    ];

    const labColorFunctions = [
        ColorTranslator.toCIELab,
        ColorTranslator.toCIELabA,
        ColorTranslator.toCIELabObject,
        ColorTranslator.toCIELabAObject
    ];

    const lchColorFunctions = [
        ColorTranslator.toLCH,
        ColorTranslator.toLCHA,
        ColorTranslator.toLCHObject,
        ColorTranslator.toLCHAObject
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

            const options = { decimals: 0, legacyCSS: false };
            const color = fn(base) as string & HEXObject & RGBObject & HSLObjectGeneric & HWBObjectGeneric;
            const additiveResult = additive_results.map(colors => colors.map(color => fn(color)));
            const subtractiveResult = subtractive_results.map(colors => colors.map(color => fn(color)));

            it(`Additive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(additiveResult[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(color, Harmony.COMPLEMENTARY, Mix.ADDITIVE, options)
                    : ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.ADDITIVE, options);
                expect(colors).toEqual(additiveResult[index]);
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(subtractiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE, options);
                expect(colors).toEqual(subtractiveResult[index]);
            });

            it('Additive Complementary > 360º', (): void => {
                const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE, options);
                expect(colors[1]).toBe('#FF8000');
            });

        });

        colorFunctions.forEach((fn): void => {

            const optionsWithDecimals = { legacyCSS: false };
            const options = { ...optionsWithDecimals, decimals: 0 };
            const color = fn(base, options) as string & HEXObject & RGBObject & HSLObjectGeneric;
            const additiveResult = additive_results.map(colors => colors.map(color => fn(color, options)));
            const subtractiveResult = subtractive_results.map(colors => colors.map(color => fn(color, options)));

            it(`Additive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(additiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.ADDITIVE, options);
                expect(colors).toEqual(additiveResult[index]);
            });

            it(`Additive Harmony with decimals for ${JSON.stringify(color)}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony]);
                expect(colors).toMatchSnapshot();
            });

            it(`Subtractive Harmony deep equals: ${harmony} for ${color} => ${JSON.stringify(subtractiveResult[index])}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE, options);
                expect(colors).toEqual(subtractiveResult[index]);
            });

            it(`Subtractive Harmony with decimals and auto legacyCSS for ${JSON.stringify(color)}`, (): void => {
                const colors = ColorTranslator.getHarmony(color);
                expect(colors).toMatchSnapshot();
            });

            it(`Subtractive Harmony with decimals for ${JSON.stringify(color)}`, (): void => {
                const colors = ColorTranslator.getHarmony(color, Harmony[harmony as Harmony], Mix.SUBTRACTIVE);
                expect(colors).toMatchSnapshot();
            });

        });

    });

    it('Additive Complementary > 360º', (): void => {
        const colors = ColorTranslator.getHarmony('#0000FF', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE, { legacyCSS: false, decimals: 0 });
        expect(colors[1]).toBe('#FF8000');
    });

    it('L*a*b color as input', (): void => {
        labColorFunctions.forEach((fn) => {
            const harmony = ColorTranslator.getHarmony(
                fn('#0000FF') as string & CIELabObjectGeneric,
                Harmony.COMPLEMENTARY,
                Mix.SUBTRACTIVE,
                { decimals: 0 }
            );
            expect(harmony).toMatchSnapshot();
        });
    });

    it('lch color as input', (): void => {
        lchColorFunctions.forEach((fn) => {
            const harmony = ColorTranslator.getHarmony(
                fn('#0000FF') as string & LCHObjectGeneric,
                Harmony.COMPLEMENTARY,
                Mix.SUBTRACTIVE,
                { decimals: 0 }
            );
            expect(harmony).toMatchSnapshot();
        });
    });

    it('Harmony excluding optional parameters', (): void => {
        expect(
            ColorTranslator.getHarmony(base, Harmony.COMPLEMENTARY, Mix.ADDITIVE)
        ).toEqual(
            ColorTranslator.getHarmony(base, Harmony.COMPLEMENTARY)
        );

        expect(
            ColorTranslator.getHarmony(base, Harmony.COMPLEMENTARY, Mix.ADDITIVE)
        ).toEqual(
            ColorTranslator.getHarmony(base)
        );

        expect(
            ColorTranslator.getHarmony(base, Harmony.COMPLEMENTARY, { decimals: 0 })
        ).toEqual(
            ColorTranslator.getHarmony(base, { decimals: 0 })
        );

        expect(
            ColorTranslator.getHarmony(base, Mix.ADDITIVE)
        ).toEqual(
            ColorTranslator.getHarmony(base)
        );

        expect(
            ColorTranslator.getHarmony(base, Mix.ADDITIVE, { decimals: 0 })
        ).toEqual(
            ColorTranslator.getHarmony(base, { decimals: 0 })
        );
    });

});