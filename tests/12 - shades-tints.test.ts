import { ColorTranslator } from '../src';
import {
    CIELabObjectGeneric,
    HEXObject,
    HSLObjectGeneric,
    HWBObjectGeneric,
    RGBObject
} from '../src/@types';

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
        ColorTranslator.toHSLAObject,
    ];

    const colorHwbFunctions = [
        ColorTranslator.toHWB,
        ColorTranslator.toHWBA,
        ColorTranslator.toHWBObject,
        ColorTranslator.toHWBAObject
    ];

    const labColorFunctions = [
        ColorTranslator.toCIELab,
        ColorTranslator.toCIELabA,
        ColorTranslator.toCIELabObject,
        ColorTranslator.toCIELabAObject
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
        it(`Shades tests without number of shades is equal to 5 from ${JSON.stringify(input)}`, (): void => {
            const shades = ColorTranslator.getShades(input, 5);
            const shadesDefault = ColorTranslator.getShades(input);
            expect(shades).toMatchObject(shadesDefault);
        });
        it(`Shades tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = shades_results.map((color: string) => fn(color + alpha));
            const shades = ColorTranslator.getShades(inputWithAlpha, 5);
            expect(shades).toMatchObject(output);
        });
        it(`Tints tests from ${JSON.stringify(input)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color));
            const tints = ColorTranslator.getTints(input, 5);
            expect(tints).toMatchObject(output);
        });
        it(`Tints tests without number of tints from ${JSON.stringify(input)}`, (): void => {
            const tints = ColorTranslator.getTints(input, 5);
            const tintsDefault = ColorTranslator.getTints(input);
            expect(tints).toMatchObject(tintsDefault);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha));
            const tints = ColorTranslator.getTints(inputWithAlpha, 5);
            expect(tints).toMatchObject(output);
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
            const tints = ColorTranslator.getTints(input, 5, options);
            expect(tints).toMatchObject(output);
        });
        it(`Tints tests with alpha from ${JSON.stringify(inputWithAlpha)}`, (): void => {
            const output = tints_results.map((color: string) => fn(color + alpha, options));
            const tints = ColorTranslator.getTints(inputWithAlpha, 5, options);
            expect(tints).toMatchObject(output);
        });
        it(`Shades tests from ${JSON.stringify(input)} with decimals`, (): void => {
            const shades = ColorTranslator.getShades(input, 5, options);
            expect(shades).toMatchSnapshot();
        });
    });

    colorHwbFunctions.forEach((fn): void => {
        const options = { decimals: 0 };
        const input = fn(base, { decimals: 10 }) as string & HWBObjectGeneric;
        it(`Shades snapshots with HWB functions from ${JSON.stringify(input)}`, (): void => {
            const shades = ColorTranslator.getShades(input, 5, options);
            expect(shades).toMatchSnapshot();
        });
        it(`Tints snapshots with HWB functions from ${JSON.stringify(input)}`, (): void => {
            const tints = ColorTranslator.getTints(input, 5, options);
            expect(tints).toMatchSnapshot();
        });
    });

    labColorFunctions.forEach((fn): void => {
        const options = { decimals: 0 };
        const input = fn(base, { decimals: 10 }) as string & CIELabObjectGeneric;
        it(`Shades snapshots with L*a*b functions from ${JSON.stringify(input)}`, (): void => {
            const shades = ColorTranslator.getShades(input, 5, options);
            expect(shades).toMatchSnapshot();
        });
        it(`Tints snapshots with L*a*b functions from ${JSON.stringify(input)}`, (): void => {
            const tints = ColorTranslator.getTints(input, 5, options);
            expect(tints).toMatchSnapshot();
        });
    });

});