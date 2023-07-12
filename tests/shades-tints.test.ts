import { ColorTranslator } from '../src';
import { HEXObject, RGBObject, HSLObjectGeneric } from '../src/@types';

describe('ColorTranslator shades and tints tests', (): void => {

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
    const shades_results = ['#D50000', '#AA0000', '#800000', '#550000', '#2B0000'];
    const tints_results = ['#FF2B2B', '#FF5555', '#FF8080', '#FFAAAA', '#FFD5D5'];

    hexColorFunctions.forEach((fn): void => {
        const input = fn(base) as string & HEXObject & RGBObject & HSLObjectGeneric;
        const alpha = '80';
        const inputWithAlpha = fn(base + alpha) as string & HEXObject & RGBObject & HSLObjectGeneric;
        it(`Shades tests from ${JSON.stringify(input)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color));
            const shades = ColorTranslator.getShades(input, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color + alpha));
            const shades = ColorTranslator.getShades(inputWithAlpha, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests from ${JSON.stringify(input)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color));
            const shades = ColorTranslator.getTints(input, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha));
            const shades = ColorTranslator.getTints(inputWithAlpha, 5);
            expect(shades).toMatchObject(output);
        });
    });

    colorFunctions.forEach((fn): void => {
        const options = { decimals: 0, legacyCSS: false };
        const input = fn(base, options) as string & HEXObject & RGBObject & HSLObjectGeneric;
        const alpha = '80';
        const inputWithAlpha = fn(base + alpha, options) as string & HEXObject & RGBObject & HSLObjectGeneric;
        it(`Shades tests from ${JSON.stringify(input)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color, options));
            const shades = ColorTranslator.getShades(input, 5, options);
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color + alpha, options));
            const shades = ColorTranslator.getShades(inputWithAlpha, 5, options);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests from ${JSON.stringify(input)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color, options));
            const shades = ColorTranslator.getTints(input, 5, options);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha, options));
            const shades = ColorTranslator.getTints(inputWithAlpha, 5, options);
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests from ${JSON.stringify(input)} with decimals`, (): void => {
            const shades = ColorTranslator.getShades(input, 5, options);
            expect(shades).toMatchSnapshot();
        });
    });

});