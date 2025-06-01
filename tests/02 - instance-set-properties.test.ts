import { ColorTranslator } from '../src';
import {
    COLORS,
    CMYK_COLORS,
    LAB_AND_LCH_COLORS
} from './tests.constants';

const TEST_COLORS = {
    red: COLORS[0],
    blue: COLORS[2],
    magenta: COLORS[3],
    white: COLORS[4],
    gray: COLORS[6],
    black: COLORS[5]
};

const RED_LAB_AND_LCH_COLORS = LAB_AND_LCH_COLORS[0];

const TEST_CMYK_COLORS = {
    red: CMYK_COLORS[0],
    lime: CMYK_COLORS[1],
    blue: CMYK_COLORS[2],
    aqua: CMYK_COLORS[3],
    yellow: CMYK_COLORS[4],
    magenta: CMYK_COLORS[5]
};

describe('ColorTranslator set instance properties', () => {

    it('Method setH', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        instance.setH(240);
        expect(instance.H).toBe(240);
        expect(instance.HEX).toBe(TEST_COLORS.blue.HEX);
    });

    it('Method setS', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        instance.setS(0);
        expect(instance.S).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.gray.HEX);
    });

    it('Method setL', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.HEX);
        instance.setL(50);
        expect(instance.L).toBe(50);
        expect(instance.HEX).toBe(TEST_COLORS.gray.HEX);
    });

    it('Method setWhiteness', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        instance.setWhiteness(100);
        expect(instance.Whiteness).toBe(100);
        expect(instance.HEX).toBe(TEST_COLORS.white.HEX);
    });

    it('Method setBlackness', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        instance.setBlackness(100);
        expect(instance.Blackness).toBe(100);
        expect(instance.HEX).toBe(TEST_COLORS.black.HEX);
    });

    it('Method setR', () => {
        const instance = new ColorTranslator(TEST_COLORS.blue.HEX);
        instance.setR(255);
        expect(instance.R).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.HEX);
    });

    it('Method setG', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.HEX);
        instance.setG(0);
        expect(instance.G).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.HEX);
    });

    it('Method setB', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        instance.setB(255);
        expect(instance.B).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.HEX);
    });

    it('Method setLCHL', () => {
        const instance = new ColorTranslator(RED_LAB_AND_LCH_COLORS.KEYWORD);
        expect(instance.LCHL).not.toBe(50);
        instance.setLCHL(50);
        expect(instance.LCHL).toBe(50);
    });

    it('Method setLCHC', () => {
        const instance = new ColorTranslator(RED_LAB_AND_LCH_COLORS.KEYWORD);
        expect(instance.LCHC).not.toBe(50);
        instance.setLCHC(50);
        expect(instance.LCHC).toBe(50);
    });

    it('Method setLCHH', () => {
        const instance = new ColorTranslator(RED_LAB_AND_LCH_COLORS.KEYWORD);
        expect(instance.LCHH).not.toBe(50);
        instance.setLCHH(50);
        expect(instance.LCHH).toBe(50);
    });

    it('Method setA', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX);
        const REG = /^(.*)(\d)(\))$/;
        instance.setA(0.5);
        expect(instance.A).toBe(0.5);
        expect(instance.HEX).toBe(TEST_COLORS.red.HEX);
        expect(instance.HEXA).toBe(TEST_COLORS.red.HEX + '80');
        expect(instance.HEXObject).toMatchObject(TEST_COLORS.red.HEXObject);
        expect(instance.HEXAObject).toMatchObject({
            ...TEST_COLORS.red.HEXObject,
            A: '0x80'
        });
        expect(instance.RGB).toBe(TEST_COLORS.red.RGB);
        expect(instance.RGBA).toBe(TEST_COLORS.red.RGBA.replace(REG, '$10.5$3'));
        expect(instance.RGBObject).toMatchObject(TEST_COLORS.red.RGBObject);
        expect(instance.RGBAObject).toMatchObject({
            ...TEST_COLORS.red.RGBObject,
            A: 0.5
        });
        expect(instance.HSL).toBe(TEST_COLORS.red.HSL);
        expect(instance.HSLA).toBe(TEST_COLORS.red.HSLA.replace(REG, '$10.5$3'));
        expect(instance.HSLObject).toMatchObject(TEST_COLORS.red.HSLObject);
        expect(instance.HSLAObject).toMatchObject({
            ...TEST_COLORS.red.HSLObject,
            A: 0.5
        });
        expect(instance.HWB).toBe(TEST_COLORS.red.HWB);
        expect(instance.HWBA).toBe(TEST_COLORS.red.HWBA.replace(REG, '$10.5$3'));
        expect(instance.HWBObject).toMatchObject(TEST_COLORS.red.HWBObject);
        expect(instance.HWBAObject).toMatchObject({
            ...TEST_COLORS.red.HWBObject,
            A: 0.5
        });

        const LAB_REG = /^lab\([\d\.]+ [\d\.]+ [\d\.]+ \/ 0.5\)$/
        expect(instance.CIELabA).toMatch(LAB_REG);
        
        const LCH_REG = /^lch\([\d\.]+ [\d\.]+ [\d\.]+ \/ 0.5\)$/
        expect(instance.LCHA).toMatch(LCH_REG);
    });

    it('Set property decimals', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.HEX, { decimals: 3 });
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

        const instance = new ColorTranslator(item.HEX);

        it(`Set properties boundaries for color ${item.HEX}`, (): void => {

            const R = instance.R;
            const G = instance.G;
            const B = instance.B;
            const H = instance.H;
            const S = instance.S;
            const L = instance.L;
            const Whiteness = instance.Whiteness;
            const Blackness = instance.Blackness;
            const LCHL = instance.LCHL;
            const LCHC = instance.LCHC;
            const LCHH = instance.LCHH;
            const A = instance.A;
            const C = instance.C;
            const M = instance.M;
            const Y = instance.Y;
            const K = instance.K;
            const CIEL = instance.CIEL;
            const CIEa = instance.CIEa;
            const CIEb = instance.CIEb;

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

            // Test Whiteness
            instance.setWhiteness(50);
            expect(instance.Whiteness).toBe(50);
            instance.setWhiteness(-100);
            expect(instance.Whiteness).toBe(0);
            instance.setWhiteness(200);
            expect(instance.Whiteness).toBe(100);
            instance.setWhiteness(Whiteness);

            // Test Blackness
            instance.setBlackness(50);
            expect(instance.Blackness).toBe(50);
            instance.setBlackness(-100);
            expect(instance.Blackness).toBe(0);
            instance.setBlackness(200);
            expect(instance.Blackness).toBe(100);
            instance.setL(Blackness);

            // Test CIEL
            instance.setCIEL(50);
            expect(instance.CIEL).toBe(50);
            instance.setCIEL(-100);
            expect(instance.CIEL).toBe(0);
            instance.setCIEL(125);
            expect(instance.CIEL).toBe(100);
            instance.setL(CIEL);

            // Test CIEa
            instance.setCIEa(50);
            expect(instance.CIEa).toBe(50);
            instance.setCIEa(-100);
            expect(instance.CIEa).toBe(-100);
            instance.setCIEa(200);
            expect(instance.CIEa).toBe(125);
            instance.setL(CIEa);

            // Test CIEb
            instance.setCIEb(50);
            expect(instance.CIEb).toBe(50);
            instance.setCIEb(-120);
            expect(instance.CIEb).toBe(-120);
            instance.setCIEb(129);
            expect(instance.CIEb).toBe(125);
            instance.setL(CIEb);

            // Test LCHL
            instance.setLCHL(50);
            expect(instance.LCHL).toBe(50);
            instance.setLCHL(-120);
            expect(instance.LCHL).toBe(0);
            instance.setLCHL(150);
            expect(instance.LCHL).toBe(100);
            instance.setLCHL(LCHL);

            // Test LCHC
            instance.setLCHC(50);
            expect(instance.LCHC).toBe(50);
            instance.setLCHC(-100);
            expect(instance.LCHC).toBe(0);
            instance.setLCHC(200);
            expect(instance.LCHC).toBe(150);
            instance.setLCHC(LCHC);

            // Test LCHH
            instance.setLCHH(50);
            expect(instance.LCHH).toBe(50);
            instance.setLCHH(-100);
            expect(instance.LCHH).toBe(260);
            instance.setLCHH(400);
            expect(instance.LCHH).toBe(40);
            instance.setLCHH(LCHH);

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
        const instance = new ColorTranslator(TEST_CMYK_COLORS.lime.RGB);
        instance.setC(0);
        expect(instance.C).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.CMYK);
    });

    it('Set property M', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.RGB);
        instance.setM(0);
        expect(instance.M).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.CMYK);
    });

    it('Set property Y', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.RGB);
        instance.setY(0);
        expect(instance.Y).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.magenta.CMYK);
    });

    it('Set property K', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.RGB);
        instance.setK(100);
        expect(instance.K).toBe(100);
        expect(instance.CMYK).toBe('device-cmyk(0% 100% 100% 100%)');
    });

});