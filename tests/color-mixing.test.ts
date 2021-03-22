import { ColorTranslator, MIXES } from './data/data';
import { RGBOutput, HSLOutput, HEXOutput } from '../src/@types';

type Mix = typeof MIXES[0];

const mixFunctions = [
    { name: 'getMixHEX',  mixFn: ColorTranslator.getMixHEX,  fn: ColorTranslator.toHEX },
    { name: 'getMixHEXA', mixFn: ColorTranslator.getMixHEXA, fn: ColorTranslator.toHEXA },
    { name: 'getMixRGB',  mixFn: ColorTranslator.getMixRGB,  fn: ColorTranslator.toRGB },
    { name: 'getMixRGBA', mixFn: ColorTranslator.getMixRGBA, fn: ColorTranslator.toRGBA },
    { name: 'getMixHSL',  mixFn: ColorTranslator.getMixHSL,  fn: ColorTranslator.toHSL },
    { name: 'getMixHSLA', mixFn: ColorTranslator.getMixHSLA, fn: ColorTranslator.toHSLA },
];

describe('Color mixing', (): void => {
    mixFunctions.forEach((fnObject): void => {
        MIXES.forEach((item: Mix): void => {
            const colors = item.colors.map((c): string => fnObject.fn(c));
            const mix = fnObject.mixFn(colors);
            it(`Regular CSS mix using ${fnObject.name} ${JSON.stringify(colors)} => ${mix}`, (): void => {
                expect(mix).toBe(fnObject.fn(item.mix));
            });        
        });
        MIXES.forEach((item: Mix): void => {
            const colors = item.colors.map((c): RGBOutput | HSLOutput | HEXOutput => fnObject.fn(c, false));
            const mix = fnObject.mixFn(colors, false);
            it(`Regular Object mix using ${fnObject.name} ${JSON.stringify(colors)} => ${JSON.stringify(mix)}`, (): void => {
                expect(mix).toMatchObject(fnObject.fn(item.mix, false));
            });        
        }); 
    });
});