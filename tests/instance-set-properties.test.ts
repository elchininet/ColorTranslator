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
        instance.H = 240;
        expect(instance.H).toBe(240);
        expect(instance.HEX).toBe(TEST_COLORS.blue.hex);
    });

    it('Set property S', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        instance.S = 0;
        expect(instance.S).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.gray.hex);
    });

    it('Set property L', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.hex);
        instance.L = 50;
        expect(instance.L).toBe(50);
        expect(instance.HEX).toBe(TEST_COLORS.gray.hex);
    });

    it('Set property R', () => {
        const instance = new ColorTranslator(TEST_COLORS.blue.hex);
        instance.R = 255;
        expect(instance.R).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property G', () => {
        const instance = new ColorTranslator(TEST_COLORS.white.hex);
        instance.G = 0;
        expect(instance.G).toBe(0);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property B', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        instance.B = 255;
        expect(instance.B).toBe(255);
        expect(instance.HEX).toBe(TEST_COLORS.magenta.hex);
    });

    it('Set property A', () => {
        const instance = new ColorTranslator(TEST_COLORS.red.hex);
        const REG = /^(.*)(\d)(\))$/;
        instance.A = 0.5;
        expect(instance.A).toBe(0.5);
        expect(instance.HEX).toBe(TEST_COLORS.red.hex);
        expect(instance.HEXA).toBe(TEST_COLORS.red.hex + '7F');
        expect(instance.HEXObject).toMatchObject(TEST_COLORS.red.hexObject);
        expect(instance.HEXAObject).toMatchObject({
            ...TEST_COLORS.red.hexObject,
            a: '0x7F'
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

});

describe('ColorTranslator set CMYK instance properties', () => {

    it('Set property C', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.lime.rgb);
        instance.C = 0;
        expect(instance.C).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.cmyk);
    });

    it('Set property M', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.M = 0;
        expect(instance.M).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.yellow.cmyk);
    });

    it('Set property Y', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.Y = 0;
        expect(instance.Y).toBe(0);
        expect(instance.CMYK).toBe(TEST_CMYK_COLORS.magenta.cmyk);
    });

    it('Set property K', () => {
        const instance = new ColorTranslator(TEST_CMYK_COLORS.red.rgb);
        instance.K = 100;
        expect(instance.K).toBe(100);
        expect(instance.CMYK).toBe('cmyk(0%,100%,100%,100%)');
    });

});