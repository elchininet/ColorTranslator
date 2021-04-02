import { ColorTranslator } from './data/data';
import { Harmony } from '../src/constants';
import { HEXObject, RGBObject, HSLObjectGeneric } from '../src/@types';

describe('ColorTranslator harmony tests', (): void => {    

    const colorFunctions = [
        ColorTranslator.toHEX,
        ColorTranslator.toHEXA,
        ColorTranslator.toRGB,
        ColorTranslator.toRGBA,
        ColorTranslator.toHSL,
        ColorTranslator.toHSLA
    ];

    const base = '#FF0000';
    
    const results = [
        ['#FF0000', '#FF8000', '#FF0080'],
        ['#FF0000', '#00FFFF'],
        ['#FF0000', '#00FF80', '#0080FF'],
        ['#FF0000', '#00FF00', '#0000FF'],
        ['#FF0000', '#FFFF00', '#0000FF', '#00FFFF'],
        ['#FF0000', '#80FF00', '#8000FF', '#00FFFF']
    ];

    Object.keys(Harmony).forEach((harmony, index): void => {

        colorFunctions.forEach((fn): void => {

            const css = fn(base);
            const obj = fn(base, false) as HEXObject & RGBObject & HSLObjectGeneric;
            const resultCSS = results.map(colors => colors.map(color => fn(color)));
            const resultObject = results.map(colors => colors.map(color => fn(color, false))) as (HEXObject | RGBObject | HSLObjectGeneric)[][];

            it(`Harmony deep equals: ${harmony} for ${css} => ${JSON.stringify(resultCSS[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(css)
                    : ColorTranslator.getHarmony(css, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(resultCSS[index]);
            });
            
            it(`Harmony deep equals: ${harmony} for ${JSON.stringify(obj)} => ${JSON.stringify(resultObject[index])}`, (): void => {
                const colors = harmony === Harmony.COMPLEMENTARY
                    ? ColorTranslator.getHarmony(obj)
                    : ColorTranslator.getHarmony(obj, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(resultObject[index]);
            });

        });  

    });

});