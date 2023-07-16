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

const options = { rgbUnit: 'none' };

describe('Additive Color mixing', (): void => {
    mixFunctions.forEach((fnObject): void => {
        ADDITIVE_MIXES.forEach((item: MixObject): void => {
            const colors = item.colors.map((c) => fnObject.fn(c));
            const mix = fnObject.mixFn(colors, Mix.ADDITIVE, options);
            it(`Regular additive mix using ${fnObject.name} ${JSON.stringify(colors)} => ${JSON.stringify(mix)}`, (): void => {
                if (typeof mix === 'string') {
                    expect(mix).toBe(fnObject.fn(item.mix, options));
                } else {
                    expect(mix).toMatchObject(fnObject.fn(item.mix, options));
                }
            });
            it('Default mixing should be ADDITIVE', () => {
                const mixAdditive = fnObject.mixFn(colors, Mix.ADDITIVE);
                const mixDefault = fnObject.mixFn(colors);
                if (typeof mixAdditive === 'string') {
                    expect(mixAdditive).toBe(mixDefault);
                } else {
                    expect(mixAdditive).toMatchObject(mixDefault);
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

describe('legacyCSS auto detection', (): void => {
    it('All colors legacy, output should be legacy', () => {
        expect(ColorTranslator.getMixRGB(['rgb(0,0,0)', 'rgb(0,0,0)'])).toBe('rgb(0,0,0)');
    });
    it('Only one color is legacy, output should be non-legacy', () => {
        expect(ColorTranslator.getMixRGBA(['rgb(0,0,0)', 'rgb(0 0 0)'])).toBe('rgb(0 0 0 / 1)');
    });
    it('No way to detect if the color is legacy, output should be non-legacy', () => {
        expect(ColorTranslator.getMixRGB(['#000', '#000000'])).toBe('rgb(0 0 0)');
    });
    it('Only one color is css and it is legacy, output should be legacy', () => {
        expect(ColorTranslator.getMixHSLA([{r: 0, g: 0, b: 0}, 'rgba(0,0,0)'])).toBe('hsla(0,0%,0%,1)');
    });
});

describe('rgbUnit auto detection', (): void => {
    it('All rgb colors without rgb units, output should be without rgb units', () => {
        expect(ColorTranslator.getMixRGB(['rgb(255 0 0)', 'rgb(255 0 0)'])).toBe('rgb(255 0 0)');
    });
    it('All rgb colors with rgb units, output should be with rgb units', () => {
        expect(ColorTranslator.getMixRGB(['rgb(100% 100% 100%)', 'rgb(100% 100% 100%)'])).toBe('rgb(100% 100% 100%)');
    });
    it('Rgb units mixed, output should be the default: none', () => {
        expect(ColorTranslator.getMixRGB(['rgb(100% 100% 100%)', 'rgb(255 255 255)'])).toBe('rgb(255 255 255)');
    });
});