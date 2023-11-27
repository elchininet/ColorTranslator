import { ColorTranslator } from '../src';

const from = '#FF0000';
const to = '#0000FF';

const hexBlendFunctions = [
    { colorFn: ColorTranslator.toHEX,  blendFn: ColorTranslator.getBlendHEX  },
    { colorFn: ColorTranslator.toHEXA, blendFn: ColorTranslator.getBlendHEXA },
    { colorFn: ColorTranslator.toHEXObject,  blendFn: ColorTranslator.getBlendHEXObject  },
    { colorFn: ColorTranslator.toHEXAObject, blendFn: ColorTranslator.getBlendHEXAObject }
];

const blendFunctions = [
    { colorFn: ColorTranslator.toRGB,  blendFn: ColorTranslator.getBlendRGB  },
    { colorFn: ColorTranslator.toRGBA, blendFn: ColorTranslator.getBlendRGBA },
    { colorFn: ColorTranslator.toHSL,  blendFn: ColorTranslator.getBlendHSL  },
    { colorFn: ColorTranslator.toHSLA, blendFn: ColorTranslator.getBlendHSLA },
    { colorFn: ColorTranslator.toRGBObject,  blendFn: ColorTranslator.getBlendRGBObject  },
    { colorFn: ColorTranslator.toRGBAObject, blendFn: ColorTranslator.getBlendRGBAObject },
    { colorFn: ColorTranslator.toHSLObject,  blendFn: ColorTranslator.getBlendHSLObject  },
    { colorFn: ColorTranslator.toHSLAObject, blendFn: ColorTranslator.getBlendHSLAObject }
];

const blendLabFunctions = [
    ColorTranslator.getBlendCIELab,
    ColorTranslator.getBlendCIELabA,
    ColorTranslator.getBlendCIELabObject,
    ColorTranslator.getBlendCIELabAObject
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

            expect(obj.blendFn(from, to, r1.length)).toMatchObject(r1);
            expect(obj.blendFn(from, to, r2.length)).toMatchObject(r2);
            expect(obj.blendFn(from, to)).toMatchObject(r3);
            expect(obj.blendFn(from, to, 0)).toMatchObject(r3);
        });

        blendFunctions.forEach((obj): void => {
            const r1 = result1.map(c => obj.colorFn(c, options));
            const r2 = result2.map(c => obj.colorFn(c, options));

            expect(obj.blendFn(from, to, r1.length, options)).toMatchObject(r1);
            expect(obj.blendFn(from, to, r2.length, options)).toMatchObject(r2);

            expect(obj.blendFn(from, to).length).toBe(5);
            expect(
                obj.blendFn(from, to, { decimals: 6 })
            ).toMatchObject(
                obj.blendFn(from, to)
            );
            expect(
                obj.blendFn(from, to, 4, { decimals: 6 })
            ).toMatchObject(
                obj.blendFn(from, to, 4)
            );
            expect(
                obj.blendFn(from, to, { cmykUnit: 'percent' })
            ).toMatchObject(
                obj.blendFn(from, to)
            );
            expect(
                obj.blendFn(from, to, 3, { cmykUnit: 'percent' })
            ).toMatchObject(
                obj.blendFn(from, to, 3)
            );

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

    it('Blending with L*a*b colors', (): void => {
        blendLabFunctions.forEach((fn) => {
            expect(fn(from, to)).toMatchSnapshot();
        });

        blendLabFunctions.forEach((fn) => {
            expect(fn(from, to, 3)).toMatchSnapshot();
        });
    });

});