import { COLORS, ColorProps, ColorTranslator } from './data/data';
import { RGBObject, HSLObject } from '../src/@types';

// Test class properties
COLORS.forEach((item: ColorProps): void => {

    const instance1 = new ColorTranslator(item.rgbObject);

    describe(`Test properties of ${JSON.stringify(item.rgbObject)}`, (): void => {

        it('check R, G, B, and A properties', (): void => {

            expect(instance1.R).toBe((item.rgbObject as RGBObject).r);
            expect(instance1.G).toBe((item.rgbObject as RGBObject).g);
            expect(instance1.B).toBe((item.rgbObject as RGBObject).b);
            expect(instance1.A).toBe(1);
    
        });

        it('check H, S, and L properties', (): void => {

            expect(instance1.H).toBe((item.hslObject as HSLObject).h);
            expect(instance1.S).toBe((item.hslObject as HSLObject).s);
            expect(instance1.L).toBe((item.hslObject as HSLObject).l);

        });

        it('check HEXObject, HEXAObject, RGBObject, RGBAObject, HSLObject, and HSLAObject properties', (): void => {

            expect(instance1.HEXObject).toMatchObject(item.hexObject);
            expect(instance1.HEXAObject).toMatchObject(item.hexaObject);
            expect(instance1.RGBObject).toMatchObject(item.rgbObject);
            expect(instance1.RGBAObject).toMatchObject(item.rgbaObject);
            expect(instance1.HSLObject).toMatchObject(item.hslObject);
            expect(instance1.HSLAObject).toMatchObject(item.hslaObject);

        });

        it('check CSS properties', (): void => {

            expect(instance1.HEX).toBe(item.hex);
            expect(instance1.HEXA).toBe(item.hexa);
            expect(instance1.RGB).toBe(item.rgb);
            expect(instance1.RGBA).toBe(item.rgba);
            expect(instance1.HSL).toBe(item.hsl);
            expect(instance1.HSLA).toBe(item.hsla);

        });

    });

});