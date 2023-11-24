import { ColorTranslator, InputOptions } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

const optionsNoLegacy: InputOptions = { legacyCSS: false };
const optionsNoDecimals: InputOptions = { decimals: 0 };
const optionsRgbUnitNone: InputOptions = { rgbUnit: 'none' };
const optionsCmykUnitPercent: InputOptions = { cmykUnit: 'percent' };
const optionsAlphaUnitNone: InputOptions = { alphaUnit: 'none' };
const options = {
    ...optionsNoLegacy,
    ...optionsNoDecimals,
    ...optionsRgbUnitNone,
    ...optionsCmykUnitPercent,
    ...optionsAlphaUnitNone
};

COLORS.forEach((color): void => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static color conversion for ${colorValueStr}`, () => {

            // toHEX
            it(`toHEX method from ${colorValueStr} => ${color.HEX}`, () => {
                expect(ColorTranslator.toHEX(colorValue)).toBe(color.HEX);
            });

            it(`toHEXObject method from ${colorValueStr} => ${JSON.stringify(color.HEXObject)}`, () => {
                expect(ColorTranslator.toHEXObject(colorValue)).toMatchObject(color.HEXObject);
            });

            // toHEXA
            it(`toHEXA method from ${colorValueStr} => ${color.HEXA}`, () => {
                expect(ColorTranslator.toHEXA(colorValue)).toBe(color.HEXA);
            });

            it(`toHEXAObject method from ${colorValueStr} => ${JSON.stringify(color.HEXAObject)}`, () => {
                expect(ColorTranslator.toHEXAObject(colorValue)).toMatchObject(color.HEXAObject);
            });

            // toRGB
            it(`toRGB method from ${colorValueStr} => ${color.RGB}`, () => {
                expect(ColorTranslator.toRGB(colorValue, options)).toBe(color.RGB);
            });

            it(`toRGBObject method from ${colorValueStr} => ${JSON.stringify(color.RGBObject)}`, () => {
                expect(ColorTranslator.toRGBObject(colorValue, options)).toMatchObject(color.RGBObject);
            });

            // toRGBA
            it(`toRGBA method from ${colorValueStr} => ${color.RGBA}`, () => {
                expect(ColorTranslator.toRGBA(colorValue, options)).toBe(color.RGBA);
            });

            it(`toRGBAObject method from ${colorValueStr} => ${JSON.stringify(color.RGBAObject)}`, () => {
                expect(ColorTranslator.toRGBAObject(colorValue, options)).toMatchObject(color.RGBAObject);
            });

            // toHSL
            it(`toHSL method from ${colorValueStr} => ${color.HSL}`, () => {
                expect(ColorTranslator.toHSL(colorValue, options)).toBe(color.HSL);
            });

            it(`toHSLObject method from ${colorValueStr} => ${JSON.stringify(color.HSLObject)}`, () => {
                expect(ColorTranslator.toHSLObject(colorValue, options)).toMatchObject(color.HSLObject);
            });

            // toHSLA
            it(`toHSLA method from ${colorValueStr} => ${color.HSLA}`, () => {
                expect(ColorTranslator.toHSLA(colorValue, options)).toBe(color.HSLA);
            });

            it(`toHSLAObject method from ${colorValueStr} => ${JSON.stringify(color.HSLAObject)}`, () => {
                expect(ColorTranslator.toHSLAObject(colorValue, options)).toMatchObject(color.HSLAObject);
            });

        });

    });

});

COLORS.forEach((color): void => {

    describe('ColorTranslator static color conversion with auto legacyCSS detection', () => {

        it('Non legacy conversion', () => {
            expect(ColorTranslator.toRGB(color.HEX)).toBe(color.RGB);
            expect(ColorTranslator.toRGBA(color.HEXObject)).toBe(color.RGBA);
            expect(ColorTranslator.toHSL(color.RGB, optionsNoDecimals)).toBe(color.HSL);
            expect(ColorTranslator.toHSLA(color.RGBObject, optionsNoDecimals)).toBe(color.HSLA);
        });

        it('Legacy conversion', () => {
            expect(ColorTranslator.toRGB(color.HSLLegacy, optionsNoDecimals)).toBe(color.RGBLegacy);
            expect(ColorTranslator.toRGBA(color.HSLALegacy, optionsNoDecimals)).toBe(color.RGBALegacy);
            expect(ColorTranslator.toHSL(color.RGBALegacy, optionsNoDecimals)).toBe(color.HSLLegacy);
            expect(ColorTranslator.toHSLA(color.RGBLegacy, optionsNoDecimals)).toBe(color.HSLALegacy);
        });

    });

});

CMYK_COLORS.forEach((color) => {

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator static CMYK color conversion for ${colorValueStr}`, () => {

            // toCMYK
            it(`toCMYK method from ${colorValueStr} => ${color.CMYK}`, () => {
                expect(ColorTranslator.toCMYK(colorValue, options)).toBe(color.CMYK);
            });

            it(`toCMYKObject method from ${colorValueStr} => ${JSON.stringify(color.CMYKIntObject100)}`, () => {
                expect(ColorTranslator.toCMYKObject(colorValue, options)).toMatchObject(color.CMYKIntObject100);
            });

            // toCMYKA
            it(`toCMYKA method from ${colorValueStr} => ${color.CMYKWithAlpha}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, options)).toBe(color.CMYKWithAlpha);
            });

            it(`toCMYKAObject method from ${colorValueStr} => ${JSON.stringify(color.CMYKIntObject100WithAlpha)}`, () => {
                expect(ColorTranslator.toCMYKAObject(colorValue, options)).toMatchObject(color.CMYKIntObject100WithAlpha);
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
                expect(ColorTranslator.toCMYKA(colorValue, { ...optionsNoLegacy, ...optionsCmykUnitPercent, ...optionsAlphaUnitNone })).toMatchSnapshot();
            });

            it(`toCMYKA method with decimals and auto legacyCSS from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, { ...optionsCmykUnitPercent, ...optionsAlphaUnitNone })).toMatchSnapshot();
            });

            it(`toCMYKAObject method with decimals from ${colorValueStr}`, () => {
                expect(ColorTranslator.toCMYKAObject(colorValue)).toMatchSnapshot();
            });

        });

    });

});