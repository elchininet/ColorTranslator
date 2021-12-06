import { COLORS, ColorPropsWithKeyword, ColorTranslator } from './data/data';
import { RGBObject, HSLObject } from '../src/@types';

// Test class properties
COLORS.forEach((item: ColorPropsWithKeyword): void => {

    const instance = new ColorTranslator(item.rgbObject);
    const keywordInstance = new ColorTranslator(item.keyword);

    describe(`Test properties of ${JSON.stringify(item.rgbObject)}`, (): void => {

        it('check R, G, B, and A properties', (): void => {

            expect(instance.R).toBe((item.rgbObject as RGBObject).r);
            expect(instance.G).toBe((item.rgbObject as RGBObject).g);
            expect(instance.B).toBe((item.rgbObject as RGBObject).b);
            expect(instance.A).toBe(1);

            expect(keywordInstance.R).toBe((item.rgbObject as RGBObject).r);
            expect(keywordInstance.G).toBe((item.rgbObject as RGBObject).g);
            expect(keywordInstance.B).toBe((item.rgbObject as RGBObject).b);
            expect(keywordInstance.A).toBe(1);
    
        });

        it('check H, S, and L properties', (): void => {

            expect(instance.H).toBe((item.hslObject as HSLObject).h);
            expect(instance.S).toBe((item.hslObject as HSLObject).s);
            expect(instance.L).toBe((item.hslObject as HSLObject).l);

            expect(keywordInstance.H).toBe((item.hslObject as HSLObject).h);
            expect(keywordInstance.S).toBe((item.hslObject as HSLObject).s);
            expect(keywordInstance.L).toBe((item.hslObject as HSLObject).l);

        });

        it('check HEXObject, HEXAObject, RGBObject, RGBAObject, HSLObject, and HSLAObject properties', (): void => {

            expect(instance.HEXObject).toMatchObject(item.hexObject);
            expect(instance.HEXAObject).toMatchObject(item.hexaObject);
            expect(instance.RGBObject).toMatchObject(item.rgbObject);
            expect(instance.RGBAObject).toMatchObject(item.rgbaObject);
            expect(instance.HSLObject).toMatchObject(item.hslObject);
            expect(instance.HSLAObject).toMatchObject(item.hslaObject);

            expect(keywordInstance.HEXObject).toMatchObject(item.hexObject);
            expect(keywordInstance.HEXAObject).toMatchObject(item.hexaObject);
            expect(keywordInstance.RGBObject).toMatchObject(item.rgbObject);
            expect(keywordInstance.RGBAObject).toMatchObject(item.rgbaObject);
            expect(keywordInstance.HSLObject).toMatchObject(item.hslObject);
            expect(keywordInstance.HSLAObject).toMatchObject(item.hslaObject);

        });

        it('check CSS properties', (): void => {

            expect(instance.HEX).toBe(item.hex);
            expect(instance.HEXA).toBe(item.hexa);
            expect(instance.RGB).toBe(item.rgb);
            expect(instance.RGBA).toBe(item.rgba);
            expect(instance.HSL).toBe(item.hsl);
            expect(instance.HSLA).toBe(item.hsla);

            expect(keywordInstance.HEX).toBe(item.hex);
            expect(keywordInstance.HEXA).toBe(item.hexa);
            expect(keywordInstance.RGB).toBe(item.rgb);
            expect(keywordInstance.RGBA).toBe(item.rgba);
            expect(keywordInstance.HSL).toBe(item.hsl);
            expect(keywordInstance.HSLA).toBe(item.hsla);

        });

    });

});

describe('Check class properties', (): void => {

    it('Return HEXA color with alpha if the alpha is 0', (): void => {
        expect(new ColorTranslator({r: 255, g: 0, b: 0, a: 0}).HEXA).toBe('#FF000000');
        expect(new ColorTranslator('#FFFFFF00').HEXAObject).toMatchObject({r: '0xFF', g: '0xFF', b: '0xFF', a: '0x00'});
    });

});