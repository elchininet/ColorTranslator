import { ColorTranslator, ADDITIVE_MIXES, SUBTRACTIVE_MIXES } from './data/data';
import { RGBOutput, HSLOutput, HEXOutput } from '../src/@types';
import { Mix } from '../src/constants';

type MixObject = typeof ADDITIVE_MIXES[0];

const mixFunctions = [
    { name: 'getMixHEX',  mixFn: ColorTranslator.getMixHEX,  fn: ColorTranslator.toHEX },
    { name: 'getMixHEXA', mixFn: ColorTranslator.getMixHEXA, fn: ColorTranslator.toHEXA },
    { name: 'getMixRGB',  mixFn: ColorTranslator.getMixRGB,  fn: ColorTranslator.toRGB },
    { name: 'getMixRGBA', mixFn: ColorTranslator.getMixRGBA, fn: ColorTranslator.toRGBA },
    { name: 'getMixHSL',  mixFn: ColorTranslator.getMixHSL,  fn: ColorTranslator.toHSL },
    { name: 'getMixHSLA', mixFn: ColorTranslator.getMixHSLA, fn: ColorTranslator.toHSLA },
];

describe('Additive Color mixing', (): void => {
    mixFunctions.forEach((fnObject): void => {
        ADDITIVE_MIXES.forEach((item: MixObject): void => {
            const colors = item.colors.map((c): string => fnObject.fn(c));
            const mix = fnObject.mixFn(colors);
            it(`Regular CSS additive mix using ${fnObject.name} ${JSON.stringify(colors)} => ${mix}`, (): void => {
                expect(mix).toBe(fnObject.fn(item.mix));
            });        
        });
        ADDITIVE_MIXES.forEach((item: MixObject): void => {
            const colors = item.colors.map((c): RGBOutput | HSLOutput | HEXOutput => fnObject.fn(c, false));
            const mix = fnObject.mixFn(colors, Mix.ADDITIVE, false);
            it(`Regular Object additive mix using ${fnObject.name} ${JSON.stringify(colors)} => ${JSON.stringify(mix)}`, (): void => {
                expect(mix).toMatchObject(fnObject.fn(item.mix, false));
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
                expect(mix.slice(-2)).toBe('B2');
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
                expect(mix.slice(-2)).toBe('B2');
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