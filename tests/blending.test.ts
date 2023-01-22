import { ColorTranslator } from '../src';

describe('ColorTranslator blending tests', (): void => {

    it('Blending deep equals', (): void => {

        const from = '#FF0000';
        const to = '#0000FF';

        const blendFunctions = [
            { colorFn: ColorTranslator.toHEX,  blendFn: ColorTranslator.getBlendHEX  },
            { colorFn: ColorTranslator.toHEXA, blendFn: ColorTranslator.getBlendHEXA },
            { colorFn: ColorTranslator.toRGB,  blendFn: ColorTranslator.getBlendRGB  },
            { colorFn: ColorTranslator.toRGBA, blendFn: ColorTranslator.getBlendRGBA },
            { colorFn: ColorTranslator.toHSL,  blendFn: ColorTranslator.getBlendHSL  },
            { colorFn: ColorTranslator.toHSLA, blendFn: ColorTranslator.getBlendHSLA }
        ];

        const result1 = [ '#FF0000', '#800080', '#0000FF' ];
        const result2 = [ '#FF0000', '#CC0033', '#990066', '#660099', '#3300CC', '#0000FF' ];
        const result3 = [ '#FF0000', '#BF0040', '#800080', '#4000BF', '#0000FF' ];

        blendFunctions.forEach((obj): void => {

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

        // Check default steps
        expect(ColorTranslator.getBlendHEX(from, to)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));
        expect(ColorTranslator.getBlendHEX(from, to, -5)).toMatchObject(ColorTranslator.getBlendHEX(from, to, 5));

    });

});