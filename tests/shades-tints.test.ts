import { ColorTranslator } from './data/data';
import { HEXObject, RGBObject, HSLObjectGeneric } from '../src/@types';

describe('ColorTranslator shades and tints tests', (): void => {    

    const colorFunctions = [
        ColorTranslator.toHEX,
        ColorTranslator.toHEXA,
        ColorTranslator.toRGB,
        ColorTranslator.toRGBA,
        ColorTranslator.toHSL,
        ColorTranslator.toHSLA
    ];

    const base = '#FF0000';
    const shades_results = ['#D40000', '#AA0000', '#800000', '#550000', '#2A0000'];
    const tints_results = ['#FF2B2B', '#FF5555', '#FF8080', '#FFAAAA', '#FFD5D5'];

    
    colorFunctions.forEach((fn): void => {
        const inputCSS = fn(base);
        const inputObject = fn(base, false) as (HEXObject & RGBObject & HSLObjectGeneric);
        const alpha = '80';
        const inputCSSWithAlpha = fn(base + alpha);
        const inputObjectWithAlpha = fn(base + alpha, false) as (HEXObject & RGBObject & HSLObjectGeneric);
        it(`Shades tests from ${JSON.stringify(inputCSS)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color));
            const shades = ColorTranslator.getShades(inputCSS, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests from ${JSON.stringify(inputObject)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color, false));
            const shades = ColorTranslator.getShades(inputObject, 5) as (HEXObject | RGBObject | HSLObjectGeneric)[];
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests with alpha from ${JSON.stringify(inputCSSWithAlpha)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color + alpha));
            const shades = ColorTranslator.getShades(inputCSSWithAlpha, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Shades tests with alpha from ${JSON.stringify(inputObjectWithAlpha)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color + alpha, false));
            const shades = ColorTranslator.getShades(inputObjectWithAlpha, 5) as (HEXObject | RGBObject | HSLObjectGeneric)[];
            expect(shades).toMatchObject(output);
        });

        it(`Tints tests from ${JSON.stringify(inputCSS)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color));
            const shades = ColorTranslator.getTints(inputCSS, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests from ${JSON.stringify(inputObject)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color, false));
            const shades = ColorTranslator.getTints(inputObject, 5) as (HEXObject | RGBObject | HSLObjectGeneric)[];
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputCSSWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha));
            const shades = ColorTranslator.getTints(inputCSSWithAlpha, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputObjectWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha, false));
            const shades = ColorTranslator.getTints(inputObjectWithAlpha, 5) as (HEXObject | RGBObject | HSLObjectGeneric)[];
            expect(shades).toMatchObject(output);
        });
    });

});