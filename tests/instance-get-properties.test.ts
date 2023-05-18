import { ColorTranslator } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

COLORS.forEach((color): void => {

    let instance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator instance properties for ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, 0);

            // HEX
            it(`HEX property => ${color.hex}`, () => {
                expect(instance.HEX).toBe(color.hex);
            });

            // HEXA
            it(`HEXA property => ${color.hexa}`, () => {
                expect(instance.HEXA).toBe(color.hexa);
            });

            // HEXObject
            it(`HEXObject property => ${JSON.stringify(color.hexObject)}`, () => {
                expect(instance.HEXObject).toMatchObject(color.hexObject);
            });

            // HEXAObject
            it(`HEXAObject property => ${JSON.stringify(color.hexaObject)}`, () => {
                expect(instance.HEXAObject).toMatchObject(color.hexaObject);
            });

            // RGB
            it(`RGB property => ${color.rgb}`, () => {
                expect(instance.RGB).toBe(color.rgb);
            });

            // RGBA
            it(`RGBA property => ${color.rgba}`, () => {
                expect(instance.RGBA).toBe(color.rgba);
            });

            // RGBObject
            it(`RGBObject property => ${JSON.stringify(color.rgbObject)}`, () => {
                expect(instance.RGBObject).toMatchObject(color.rgbObject);
            });

            // RGBAObject
            it(`RGBAObject property => ${JSON.stringify(color.rgbaObject)}`, () => {
                expect(instance.RGBAObject).toMatchObject(color.rgbaObject);
            });

            // HSL
            it(`HSL property => ${color.hsl}`, () => {
                expect(instance.HSL).toBe(color.hsl);
            });

            // HSLA
            it(`HSLA property => ${color.hsla}`, () => {
                expect(instance.HSLA).toBe(color.hsla);
            });

            // HSLObject
            it(`HSLObject property => ${JSON.stringify(color.hslObject)}`, () => {
                expect(instance.HSLObject).toMatchObject(color.hslObject);
            });

            // HSLAObject
            it(`HSLAObject property => ${JSON.stringify(color.hslaObject)}`, () => {
                expect(instance.HSLAObject).toMatchObject(color.hslaObject);
            });

            // H
            it(`H property => ${color.hslObject.h}`, () => {
                expect(instance.H).toBe(color.hslObject.h);
            });

            // S
            it(`S property => ${color.hslObject.s}`, () => {
                expect(instance.S).toBe(color.hslObject.s);
            });

            // L
            it(`L property => ${color.hslObject.l}`, () => {
                expect(instance.L).toBe(color.hslObject.l);
            });

            // R
            it(`R property => ${color.rgbObject.r}`, () => {
                expect(instance.R).toBe(color.rgbObject.r);
            });

            // G
            it(`G property => ${color.rgbObject.g}`, () => {
                expect(instance.G).toBe(color.rgbObject.g);
            });

            // B
            it(`B property => ${color.rgbObject.b}`, () => {
                expect(instance.B).toBe(color.rgbObject.b);
            });

            // A
            it(`A property => ${color.rgbaObject.a}`, () => {
                expect(instance.A).toBe(color.rgbaObject.a);
            });

        });

    });

});

CMYK_COLORS.forEach((color) => {

    let instance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator CMYK instance properties ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, 0);

            // CMYK
            it(`CMYK property => ${color.cmyk}`, () => {
                expect(instance.CMYK).toBe(color.cmyk);
            });

            // CMYKA
            it(`CMYKA property => ${color.cmykWithAlpha}`, () => {
                expect(instance.CMYKA).toBe(color.cmykWithAlpha);
            });

            // CMYKObject
            it(`CMYKObject property => ${JSON.stringify(color.cmykIntObject100)}`, () => {
                expect(instance.CMYKObject).toMatchObject(color.cmykIntObject100);
            });

            // CMYKAObject
            it(`CMYKAObject property => ${JSON.stringify(color.cmykIntObject100WithAlpha)}`, () => {
                expect(instance.CMYKAObject).toMatchObject(color.cmykIntObject100WithAlpha);
            });

            // C
            it(`C property => ${color.cmykIntObject100.c}`, () => {
                expect(instance.C).toBe(color.cmykIntObject100.c);
            });

            // M
            it(`M property => ${color.cmykIntObject100.m}`, () => {
                expect(instance.M).toBe(color.cmykIntObject100.m);
            });

            // Y
            it(`Y property => ${color.cmykIntObject100.y}`, () => {
                expect(instance.Y).toBe(color.cmykIntObject100.y);
            });

            // K
            it(`K property => ${color.cmykIntObject100.k}`, () => {
                expect(instance.K).toBe(color.cmykIntObject100.k);
            });

        });

    });

});