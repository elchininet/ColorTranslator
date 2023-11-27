import { ColorTranslator, InputOptions } from '../src';
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

const options: InputOptions = { rgbUnit: 'none' };

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

describe('Color mixing with L*a*b colors', (): void => {
    it('Mixing lab colors should return the same result of mising hex colors', (): void => {
        expect(
            ColorTranslator.getMixHEX(['lab(54.291734 80.812455 69.88504)', 'lab(29.567573 68.298653 -112.02943)'])
        ).toBe(
            ColorTranslator.getMixHEX(['#F00', '#00F'])
        );
    });
    it('Return a mix in lab color', (): void => {
        expect(
            ColorTranslator.getMixCIELab(['#F00', '#00F'], Mix.ADDITIVE, { decimals: 0 })
        ).toBe(
            'lab(60 94 -60)'
        );
    });
    it('Return a mix in lab color with decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELab(['#F00', '#00F'], Mix.ADDITIVE)
        ).toBe(
            'lab(60.169696 93.550025 -60.498556)'
        );
        expect(
            ColorTranslator.getMixCIELab(['#F00', '#00F'])
        ).toBe(
            'lab(60.169696 93.550025 -60.498556)'
        );
    });
    it('Return a mix in lab color as an object', (): void => {
        expect(
            ColorTranslator.getMixCIELabObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ],
                Mix.ADDITIVE,
                { decimals: 0 }
            )
        ).toMatchObject(
            { L: 60, a: 94, b: -60 }
        );
    });
    it('Return a mix in lab color as an object with decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELabObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ]
            )
        ).toMatchObject(
            { L: 60.169696, a: 93.550025, b: -60.498556 }
        );
    });
    it('Return a substractive mix in lab color as an object with decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELabObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ],
                Mix.SUBTRACTIVE
            )
        ).toMatchObject(
            { L: 39.282789, a: 74.659748, b: -95.543967 }
        );
    });
    it('Return a mix in lab color with alpha', (): void => {
        expect(
            ColorTranslator.getMixCIELabA(['#F00', '#00F'], Mix.ADDITIVE, { decimals: 0 })
        ).toBe(
            'lab(60 94 -60 / 1)'
        );
    });
    it('Return a substractive mix in lab color with alpha', (): void => {
        expect(
            ColorTranslator.getMixCIELabA(['#F00', '#00F'], Mix.SUBTRACTIVE)
        ).toBe(
            'lab(39.282789 74.659748 -95.543967 / 1)'
        );
    });
    it('Return a mix in lab color with alpha and decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELabA(['#F00', '#00F'])
        ).toBe(
            'lab(60.169696 93.550025 -60.498556 / 1)'
        );
    });
    it('Return a mix in lab color with alpha as an object', (): void => {
        expect(
            ColorTranslator.getMixCIELabAObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ],
                Mix.ADDITIVE,
                { decimals: 0 }
            )
        ).toMatchObject(
            { L: 60, a: 94, b: -60, A: 1 }
        );
    });
    it('Return a substractive mix in lab color with alpha as an object with decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELabAObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ],
                Mix.SUBTRACTIVE
            )
        ).toMatchObject(
            { L: 39.282789, a: 74.659748, b: -95.543967, A: 1 }
        );
    });
    it('Return a mix in lab color with alpha as an object with decimals', (): void => {
        expect(
            ColorTranslator.getMixCIELabAObject(
                [
                    { R: 255, G: 0, B: 0 },
                    { R: 0, G: 0, B: 255 }
                ]
            )
        ).toMatchObject(
            { L: 60.169696, a: 93.550025, b: -60.498556, A: 1 }
        );
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
        expect(ColorTranslator.getMixHSLA([{R: 0, G: 0, B: 0}, 'rgba(0,0,0)'])).toBe('hsla(0,0%,0%,1)');
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