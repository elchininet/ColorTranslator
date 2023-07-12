import { ColorTranslator } from '../src';
import { Mix } from '../src/constants';
import { ADDITIVE_MIXES, SUBTRACTIVE_MIXES } from './tests.constants';

type MixObject = typeof ADDITIVE_MIXES[0];

const mixFunctions = [
    { name: 'getMixHEX',  mixFn: ColorTranslator.getMixHEX,  fn: ColorTranslator.toHEX },
    { name: 'getMixHEXA', mixFn: ColorTranslator.getMixHEXA, fn: ColorTranslator.toHEXA },
    { name: 'getMixRGB',  mixFn: ColorTranslator.getMixRGB,  fn: ColorTranslator.toRGB },
    { name: 'getMixRGBA', mixFn: ColorTranslator.getMixRGBA, fn: ColorTranslator.toRGBA },
    { name: 'getMixHSL',  mixFn: ColorTranslator.getMixHSL,  fn: ColorTranslator.toHSL },
    { name: 'getMixHSLA', mixFn: ColorTranslator.getMixHSLA, fn: ColorTranslator.toHSLA },
    { name: 'getMixHEXObject',  mixFn: ColorTranslator.getMixHEXObject,  fn: ColorTranslator.toHEXObject },
    { name: 'getMixHEXAObject', mixFn: ColorTranslator.getMixHEXAObject, fn: ColorTranslator.toHEXAObject },
    { name: 'getMixRGBObject',  mixFn: ColorTranslator.getMixRGBObject,  fn: ColorTranslator.toRGBObject },
    { name: 'getMixRGBAObject', mixFn: ColorTranslator.getMixRGBAObject, fn: ColorTranslator.toRGBAObject },
    { name: 'getMixHSLObject',  mixFn: ColorTranslator.getMixHSLObject,  fn: ColorTranslator.toHSLObject },
    { name: 'getMixHSLAObject', mixFn: ColorTranslator.getMixHSLAObject, fn: ColorTranslator.toHSLAObject }
];

describe('Additive Color mixing', (): void => {
    mixFunctions.forEach((fnObject): void => {
        ADDITIVE_MIXES.forEach((item: MixObject): void => {
            const colors = item.colors.map((c) => fnObject.fn(c));
            const mix = fnObject.mixFn(colors);
            it(`Regular additive mix using ${fnObject.name} ${JSON.stringify(colors)} => ${JSON.stringify(mix)}`, (): void => {
                if (typeof mix === 'string') {
                    expect(mix).toBe(fnObject.fn(item.mix));
                } else {
                    expect(mix).toMatchObject(fnObject.fn(item.mix));
                }
            });
        });
    });
});

describe('Subtractive Color mixing', (): void => {
    SUBTRACTIVE_MIXES.forEach((item: MixObject): void => {
        const mix = ColorTranslator.getMixHEX(item.colors, Mix.SUBTRACTIVE);
        it(`Regular CSS subtractive mix using getMixHEX ${JSON.stringify(item.colors)} => ${mix}`, (): void => {
            expect(mix).toBe(item.mix);
        });
    });
    SUBTRACTIVE_MIXES.forEach((item: MixObject): void => {
        const colors = item.colors.map((c): string => ColorTranslator.toHEXA(c));
        const mix = ColorTranslator.getMixHEXA(colors, Mix.SUBTRACTIVE);
        it(`Regular CSS subtractive mix using getMixHEXA ${JSON.stringify(colors)} => ${mix}`, (): void => {
            expect(mix).toBe(ColorTranslator.toHEXA(item.mix));
        });
    });
});

describe('Color mixing with alphas', (): void => {
    ADDITIVE_MIXES.forEach((item: MixObject): void => {
        const colors = item.colors.map((c): string => {
            return `${c}55`;
        });
        const mix = ColorTranslator.getMixHEXA(colors);
        it(`Regular CSS additive mix with alpha using getMixHEXA ${JSON.stringify(colors)} => ${mix}`, (): void => {
            if (colors.length === 3) {
                expect(mix.slice(-2)).toBe('B3');
            } else {
                expect(mix.slice(-2)).toBe('8E');
            }
        });
    });
    SUBTRACTIVE_MIXES.forEach((item: MixObject): void => {
        const colors = item.colors.map((c): string => {
            return `${c}55`;
        });
        const mix = ColorTranslator.getMixHEXA(colors);
        it(`Regular CSS subtractive mix with alpha using getMixHEXA ${JSON.stringify(colors)} => ${mix}`, (): void => {
            if (colors.length === 3) {
                expect(mix.slice(-2)).toBe('B3');
            } else {
                expect(mix.slice(-2)).toBe('8E');
            }
        });
    });
});

describe('Strong additive colors mixing', (): void => {
    it('Black with blue', (): void => {
        expect(ColorTranslator.getMixHEX(['#000000', '#0000FF'], Mix.SUBTRACTIVE)).toBe('#000000');
    });
    it('Black with White', (): void => {
        expect(ColorTranslator.getMixHEX(['#000000', '#FFFFFF'], Mix.SUBTRACTIVE)).toBe('#000000');
    });
});