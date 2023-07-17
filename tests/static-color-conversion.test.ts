import { ColorTranslator } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

const optionsNoLegacy = { legacyCSS: false };
const optionsNoDecimals = { decimals: 0 };
const optionsRgbUnitNone = { rgbUnit: 'none' };
const optionsCmykUnitPercent = { cmykUnit: 'percent' };
const options = {
    ...optionsNoLegacy,
    ...optionsNoDecimals,
    ...optionsRgbUnitNone,
    ...optionsCmykUnitPercent
};

COLORS.forEach((color): void => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static color conversion for ${colorValueStr}`, () => {

            // toHEX
            it(`toHEX method from ${colorValueStr} => ${color.hex}`, () => {
                expect(ColorTranslator.toHEX(colorValue)).toBe(color.hex);
            });

            it(`toHEXObject method from ${colorValueStr} => ${JSON.stringify(color.hexObject)}`, () => {
                expect(ColorTranslator.toHEXObject(colorValue)).toMatchObject(color.hexObject);
            });

            // toHEXA
            it(`toHEXA method from ${colorValueStr} => ${color.hexa}`, () => {
                expect(ColorTranslator.toHEXA(colorValue)).toBe(color.hexa);
            });

            it(`toHEXAObject method from ${colorValueStr} => ${JSON.stringify(color.hexaObject)}`, () => {
                expect(ColorTranslator.toHEXAObject(colorValue)).toMatchObject(color.hexaObject);
            });

            // toRGB
            it(`toRGB method from ${colorValueStr} => ${color.rgb}`, () => {
                expect(ColorTranslator.toRGB(colorValue, options)).toBe(color.rgb);
            });

            it(`toRGBObject method from ${colorValueStr} => ${JSON.stringify(color.rgbObject)}`, () => {
                expect(ColorTranslator.toRGBObject(colorValue, options)).toMatchObject(color.rgbObject);
            });

            // toRGBA
            it(`toRGBA method from ${colorValueStr} => ${color.rgba}`, () => {
                expect(ColorTranslator.toRGBA(colorValue, options)).toBe(color.rgba);
            });

            it(`toRGBAObject method from ${colorValueStr} => ${JSON.stringify(color.rgbaObject)}`, () => {
                expect(ColorTranslator.toRGBAObject(colorValue, options)).toMatchObject(color.rgbaObject);
            });

            // toHSL
            it(`toHSL method from ${colorValueStr} => ${color.hsl}`, () => {
                expect(ColorTranslator.toHSL(colorValue, options)).toBe(color.hsl);
            });

            it(`toHSLObject method from ${colorValueStr} => ${JSON.stringify(color.hslObject)}`, () => {
                expect(ColorTranslator.toHSLObject(colorValue, options)).toMatchObject(color.hslObject);
            });

            // toHSLA
            it(`toHSLA method from ${colorValueStr} => ${color.hsla}`, () => {
                expect(ColorTranslator.toHSLA(colorValue, options)).toBe(color.hsla);
            });

            it(`toHSLAObject method from ${colorValueStr} => ${JSON.stringify(color.hslaObject)}`, () => {
                expect(ColorTranslator.toHSLAObject(colorValue, options)).toMatchObject(color.hslaObject);
            });

        });

    });

});

COLORS.forEach((color): void => {

    describe('ColorTranslator static color conversion with auto legacyCSS detection', () => {

        it('Non legacy conversion', () => {
            expect(ColorTranslator.toRGB(color.hex)).toBe(color.rgb);
            expect(ColorTranslator.toRGBA(color.hexObject)).toBe(color.rgba);
            expect(ColorTranslator.toHSL(color.rgb, optionsNoDecimals)).toBe(color.hsl);
            expect(ColorTranslator.toHSLA(color.rgbObject, optionsNoDecimals)).toBe(color.hsla);
        });

        it('Legacy conversion', () => {
            expect(ColorTranslator.toRGB(color.hslLegacy, optionsNoDecimals)).toBe(color.rgbLegacy);
            expect(ColorTranslator.toRGBA(color.hslaLegacy, optionsNoDecimals)).toBe(color.rgbaLegacy);
            expect(ColorTranslator.toHSL(color.rgbaLegacy, optionsNoDecimals)).toBe(color.hslLegacy);
            expect(ColorTranslator.toHSLA(color.rgbLegacy, optionsNoDecimals)).toBe(color.hslaLegacy);
        });

    });

});

CMYK_COLORS.forEach((color) => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static CMYK color conversion for ${colorValueStr}`, () => {

            // toCMYK
            it(`toCMYK method from ${colorValueStr} => ${color.cmyk}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, options)).toBe(color.cmyk);
            });

            it(`toCMYKObject method from ${colorValueStr} => ${JSON.stringify(color.cmykIntObject100)}`, () => {
                expect(ColorTranslator.toCMYKObject(colorValue, options)).toMatchObject(color.cmykIntObject100);
            });

            // toCMYKA
            it(`toCMYKA method from ${colorValueStr} => ${color.cmykWithAlpha}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, options)).toBe(color.cmykWithAlpha);
            });

            it(`toCMYKAObject method from ${colorValueStr} => ${JSON.stringify(color.cmykIntObject100WithAlpha)}`, () => {
                expect(ColorTranslator.toCMYKAObject(colorValue, options)).toMatchObject(color.cmykIntObject100WithAlpha);
            });

            it(`toCMYK method with decimals from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, { ...optionsNoLegacy, ...optionsCmykUnitPercent })).toMatchSnapshot();
            });

            it(`toCMYK method with decimals and auto legacyCSS from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, optionsCmykUnitPercent)).toMatchSnapshot();
            });

            it(`toCMYKObject method with decimals from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKObject(colorValue)).toMatchSnapshot();
            });

            it(`toCMYKA method with decimals from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, { ...optionsNoLegacy, ...optionsCmykUnitPercent })).toMatchSnapshot();
            });

            it(`toCMYKA method with decimals and auto legacyCSS from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, optionsCmykUnitPercent)).toMatchSnapshot();
            });

            it(`toCMYKAObject method with decimals from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKAObject(colorValue)).toMatchSnapshot();
            });

        });

    });

});