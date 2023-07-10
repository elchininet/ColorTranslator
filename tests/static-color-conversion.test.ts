import { ColorTranslator } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

const options = { decimals: 0 };

COLORS.forEach((color): void => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static color conversion for ${colorValueStr}`, () => {

            // toHEX
            it(`toHEX method as CSS from ${colorValueStr} => ${color.hex}`, () => {
                expect(ColorTranslator.toHEX(colorValue)).toBe(color.hex);
            });

            it(`toHEX method as Object from ${colorValueStr} => ${JSON.stringify(color.hexObject)}`, () => {
                expect(ColorTranslator.toHEX(colorValue, false)).toMatchObject(color.hexObject);
            });

            // toHEXA
            it(`toHEXA method as CSS from ${colorValueStr} => ${color.hexa}`, () => {
                expect(ColorTranslator.toHEXA(colorValue)).toBe(color.hexa);
            });

            it(`toHEXA method as Object from ${colorValueStr} => ${JSON.stringify(color.hexaObject)}`, () => {
                expect(ColorTranslator.toHEXA(colorValue, false)).toMatchObject(color.hexaObject);
            });

            // toRGB
            it(`toRGB method as CSS from ${colorValueStr} => ${color.rgb}`, () => {
                expect(ColorTranslator.toRGB(colorValue, true, options)).toBe(color.rgb);
            });

            it(`toRGB method as Object from ${colorValueStr} => ${JSON.stringify(color.rgbObject)}`, () => {
                expect(ColorTranslator.toRGB(colorValue, false, options)).toMatchObject(color.rgbObject);
            });

            // toRGBA
            it(`toRGBA method as CSS from ${colorValueStr} => ${color.rgba}`, () => {
                expect(ColorTranslator.toRGBA(colorValue, true, options)).toBe(color.rgba);
            });

            it(`toRGBA method as Object from ${colorValueStr} => ${JSON.stringify(color.rgbaObject)}`, () => {
                expect(ColorTranslator.toRGBA(colorValue, false, options)).toMatchObject(color.rgbaObject);
            });

            // toHSL
            it(`toHSL method as CSS from ${colorValueStr} => ${color.hsl}`, () => {
                expect(ColorTranslator.toHSL(colorValue, true, options)).toBe(color.hsl);
            });

            it(`toHSL method as Object from ${colorValueStr} => ${JSON.stringify(color.hslObject)}`, () => {
                expect(ColorTranslator.toHSL(colorValue, false, options)).toMatchObject(color.hslObject);
            });

            // toHSLA
            it(`toHSLA method as CSS from ${colorValueStr} => ${color.hsla}`, () => {
                expect(ColorTranslator.toHSLA(colorValue, true, options)).toBe(color.hsla);
            });

            it(`toHSLA method as Object from ${colorValueStr} => ${JSON.stringify(color.hslaObject)}`, () => {
                expect(ColorTranslator.toHSLA(colorValue, false, options)).toMatchObject(color.hslaObject);
            });

        });

    });

});

CMYK_COLORS.forEach((color) => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static CMYK color conversion for ${colorValueStr}`, () => {

            // toCMYK
            it(`toCMYK method as CSS from ${colorValueStr} => ${color.cmyk}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, true, options)).toBe(color.cmyk);
            });

            it(`toCMYK method as Object from ${colorValueStr} => ${JSON.stringify(color.cmykIntObject100)}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, false, options)).toMatchObject(color.cmykIntObject100);
            });

            // toCMYKA
            it(`toCMYKA method as CSS from ${colorValueStr} => ${color.cmykWithAlpha}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, true, options)).toBe(color.cmykWithAlpha);
            });

            it(`toCMYKA method as Object from ${colorValueStr} => ${JSON.stringify(color.cmykIntObject100WithAlpha)}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, false, options)).toMatchObject(color.cmykIntObject100WithAlpha);
            });

            it(`toCMYK method with decimals as CSS from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYK(colorValue)).toMatchSnapshot();
            });

            it(`toCMYKA method with decimals as CSS from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue)).toMatchSnapshot();
            });

        });

    });

});