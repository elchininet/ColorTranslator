import { ColorTranslator } from '../src';

const from = '#FF0000';
const to = '#0000FF';

const hexBlendFunctions = [
    { colorFn: ColorTranslator.toHEX,  blendFn: ColorTranslator.getBlendHEX  },
    { colorFn: ColorTranslator.toHEXA, blendFn: ColorTranslator.getBlendHEXA },
];

const blendFunctions = [
    { colorFn: ColorTranslator.toRGB,  blendFn: ColorTranslator.getBlendRGB  },
    { colorFn: ColorTranslator.toRGBA, blendFn: ColorTranslator.getBlendRGBA },
    { colorFn: ColorTranslator.toHSL,  blendFn: ColorTranslator.getBlendHSL  },
    { colorFn: ColorTranslator.toHSLA, blendFn: ColorTranslator.getBlendHSLA }
];

const options = { decimals: 0 };

describe('ColorTranslator blending tests', (): void => {

    it('Blending deep equals', (): void => {

        const result1 = [ '#FF0000', '#800080', '#0000FF' ];
        const result2 = [ '#FF0000', '#CC0033', '#990066', '#660099', '#3300CC', '#0000FF' ];
        const result3 = [ '#FF0000', '#BF0040', '#800080', '#4000BF', '#0000FF' ];

        hexBlendFunctions.forEach((obj): void => {
            const r1 = result1.map(c => obj.colorFn(c));
            const r2 = result2.map(c => obj.colorFn(c));
            const r3 = result3.map(c => obj.colorFn(c));
            const r4 = result1.map(c => obj.colorFn(c, false));
            const r5 = result2.map(c => obj.colorFn(c, false));
            const r6 = result3.map(c => obj.colorFn(c, false));

            expect(obj.blendFn(from, to, r1.length)).toMatchObject(r1);
            expect(obj.blendFn(from, to, r2.length)).toMatchObject(r2);
            expect(obj.blendFn(from, to)).toMatchObject(r3);
            expect(obj.blendFn(from, to, r1.length, false)).toMatchObject(r4);
            expect(obj.blendFn(from, to, r2.length, false)).toMatchObject(r5);
            expect(obj.blendFn(from, to, 0, false)).toMatchObject(r6);
        });

        blendFunctions.forEach((obj): void => {
            const r1 = result1.map(c => obj.colorFn(c, true, options));
            const r2 = result2.map(c => obj.colorFn(c, true, options));
            const r3 = result1.map(c => obj.colorFn(c, false, options));
            const r4 = result2.map(c => obj.colorFn(c, false, options));

            expect(obj.blendFn(from, to, r1.length, true, options)).toMatchObject(r1);
            expect(obj.blendFn(from, to, r2.length, true, options)).toMatchObject(r2);
            expect(obj.blendFn(from, to, r3.length, false, options)).toMatchObject(r3);
            expect(obj.blendFn(from, to, r4.length, false, options)).toMatchObject(r4);

            expect(obj.blendFn(from, to).length).toBe(5);

        });

        // Check default steps
        expect(ColorTranslator.getBlendHEX(from, to)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        expect(ColorTranslator.getBlendHEX(from, to, -5)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));

    });

    it('Blending with decimals snapshots', (): void => {
        blendFunctions.forEach((obj) => {
            expect(obj.blendFn(from, to)).toMatchSnapshot();
        });
    });

});