import { ColorTranslator, Harmony } from './data/data';

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
        ['#FF0000', '#FF0080', '#FF8000'],
        ['#FF0000', '#00FFFF'],
        ['#FF0000', '#0080FF', '#00FF80'],
        ['#FF0000', '#00FF00', '#0000FF'],
        ['#FF0000', '#FF00FF', '#00FF00', '#00FFFF'],
        ['#FF0000', '#8000FF', '#80FF00', '#00FFFF']
    ];

    Object.keys(Harmony).forEach((harmony, index): void => {

        colorFunctions.forEach((fn): void => {

            const b = fn(base);
            const r = results.map(colors => colors.map(color => fn(color)));

            it(`Harmony deep equals: ${harmony} for ${b} => ${JSON.stringify(r[index])}`, (): void => {

                const colors = ColorTranslator.getHarmony(b, Harmony[harmony as Harmony]);
                expect(colors).toMatchObject(r[index]);

            });            

        });  

    });

});