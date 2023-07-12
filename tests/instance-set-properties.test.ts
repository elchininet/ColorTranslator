import { ColorTranslator } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

const TEST_COLORS = {
    red: COLORS[0],
    blue: COLORS[2],
    magenta: COLORS[3],
    white: COLORS[4],
    gray: COLORS[6]
};

const TEST_CMYK_COLORS = {
    red: CMYK_COLORS[0],
    lime: CMYK_COLORS[1],
    blue: CMYK_COLORS[2],
    aqua: CMYK_COLORS[3],
    yellow: CMYK_COLORS[4],
    magenta: CMYK_COLORS[5]
};

describe('ColorTranslator set instance properties', () => {

    it('Set property H', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        instance.setH(240);
        expect(instance.H).toBe(240);
        expect(instance.HEX).toBe(TEST_COLORS.blue.hex);
    });

    it('Set property S', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        instance.setS(0);
        expect(instance.S).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.gray.hex);
    });

    it('Set property L', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.hex);
        instance.setL(50);
        expect(instance.L).toBe(50);
        expect(instance.HEX).toBe(TEST_COLORS.gray.hex);
    });

    it('Set property R', () => {
        const instance = new ColorTranslator(TEST_COLORS.blue.hex);
        instance.setR(255);
        expect(instance.R).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property G', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.hex);
        instance.setG(0);
        expect(instance.G).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property B', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        instance.setB(255);
        expect(instance.B).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property A', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        const REG = /^(.*)(\d)(\))$/;
        instance.setA(0.5);
        expect(instance.A).toBe(0.5);
        expect(instance.HEX).toBe(TEST_COLORS.red.hex);
        expect(instance.HEXA).toBe(TEST_COLORS.red.hex + '80');
        expect(instance.HEXObject).toMatchObject(TEST_COLORS.red.hexObject);
        expect(instance.HEXAObject).toMatchObject({
            ...TEST_COLORS.red.hexObject,
            a: '0x80'
        });
        expect(instance.RGB).toBe(TEST_COLORS.red.rgb);
        expect(instance.RGBA).toBe(TEST_COLORS.red.rgba.replace(REG, '$10.5$3'));
        expect(instance.RGBObject).toMatchObject(TEST_COLORS.red.rgbObject);
        expect(instance.RGBAObject).toMatchObject({
            ...TEST_COLORS.red.rgbObject,
            a: 0.5
        });
        expect(instance.HSL).toBe(TEST_COLORS.red.hsl);
        expect(instance.HSLA).toBe(TEST_COLORS.red.hsla.replace(REG, '$10.5$3'));
        expect(instance.HSLObject).toMatchObject(TEST_COLORS.red.hslObject);
        expect(instance.HSLAObject).toMatchObject({
            ...TEST_COLORS.red.hslObject,
            a: 0.5
        });
    });

    it('Set property decimals', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex, { decimals: 3 });
        expect(instance.options.decimals).toBe(3);
        instance.setOptions({ decimals: 5 });
        expect(instance.options.decimals).toBe(5);
        instance.setOptions();
        expect(instance.options.decimals).toBe(5);
        instance.setOptions({});
        expect(instance.options.decimals).toBe(5);
    });

});

// Test class properties
describe('Properties boundaries', (): void => {

    COLORS.forEach((item): void => {

        const instance = new ColorTranslator(item.hex);

        it(`check R, G, B, and A properties for color ${item.hex}`, (): void => {

            const R = instance.R;
            const G = instance.G;
            const B = instance.B;
            const H = instance.H;
            const S = instance.S;
            const L = instance.L;
            const A = instance.A;
            const C = instance.C;
            const M = instance.M;
            const Y = instance.Y;
            const K = instance.K;

            // Test A
            instance.setA(0.5);
            expect(instance.A).toBe(0.5);
            instance.setA(-1);
            expect(instance.A).toBe(0);
            instance.setA(2);
            expect(instance.A).toBe(1);
            instance.setA(A);

            // Test R
            instance.setR(128);
            expect(instance.R).toBe(128);
            instance.setR(-255);
            expect(instance.R).toBe(0);
            instance.setR(500);
            expect(instance.R).toBe(255);
            instance.setR(R);

            // Test G
            instance.setG(128);
            expect(instance.G).toBe(128);
            instance.setG(-255);
            expect(instance.G).toBe(0);
            instance.setG(500);
            expect(instance.G).toBe(255);
            instance.setG(G);

            // Test B
            instance.setB(128);
            expect(instance.B).toBe(128);
            instance.setB(-255);
            expect(instance.B).toBe(0);
            instance.setB(500);
            expect(instance.B).toBe(255);
            instance.setB(B);

            // Test H
            instance.setH(128);
            expect(instance.H).toBe(128);
            instance.setH(-128);
            expect(instance.H).toBe(232);
            instance.setH(488);
            expect(instance.H).toBe(128);
            instance.setH(H);

            // Test S
            instance.setS(50);
            expect(instance.S).toBe(50);
            instance.setS(-100);
            expect(instance.S).toBe(0);
            instance.setS(200);
            expect(instance.S).toBe(100);
            instance.setS(S);

            // Test L
            instance.setL(50);
            expect(instance.L).toBe(50);
            instance.setL(-100);
            expect(instance.L).toBe(0);
            instance.setL(200);
            expect(instance.L).toBe(100);
            instance.setL(L);

            // Test C
            instance.setC(50);
            expect(instance.C).toBe(50);
            instance.setC(-100);
            expect(instance.C).toBe(0);
            instance.setC(200);
            expect(instance.C).toBe(100);
            instance.setC(C);

            // Test M
            instance.setM(50);
            expect(instance.M).toBe(50);
            instance.setM(-100);
            expect(instance.M).toBe(0);
            instance.setM(200);
            expect(instance.M).toBe(100);
            instance.setM(M);

            // Test Y
            instance.setY(50);
            expect(instance.Y).toBe(50);
            instance.setY(-100);
            expect(instance.Y).toBe(0);
            instance.setY(200);
            expect(instance.Y).toBe(100);
            instance.setY(Y);

            // Test K
            instance.setK(50);
            expect(instance.K).toBe(50);
            instance.setK(-100);
            expect(instance.K).toBe(0);
            instance.setK(200);
            expect(instance.K).toBe(100);
            instance.setK(K);

        });

    });

});

describe('ColorTranslator set CMYK instance properties', () => {

    it('Set property C', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.lime.rgb);
        instance.setC(0);
        expect(instance.C).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.cmyk);
    });

    it('Set property M', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.setM(0);
        expect(instance.M).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.cmyk);
    });

    it('Set property Y', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.setY(0);
        expect(instance.Y).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.magenta.cmyk);
    });

    it('Set property K', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.setK(100);
        expect(instance.K).toBe(100);
        expect(instance.CMYK).toBe('device-cmyk(0% 100% 100% 100%)');
    });

});