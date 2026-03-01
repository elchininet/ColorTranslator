import { ColorTranslator, InputOptions } from '../src';
import {
    COLORS,
    CMYK_COLORS,
    LAB_AND_LCH_COLORS
} from './tests.constants';

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
                expect(ColorTranslator.toHEXObject(colorValue)).toEqual(color.HEXObject);
            });

            // toHEXA
            it(`toHEXA method from ${colorValueStr} => ${color.HEXA}`, () => {
                expect(ColorTranslator.toHEXA(colorValue)).toBe(color.HEXA);
            });

            it(`toHEXAObject method from ${colorValueStr} => ${JSON.stringify(color.HEXAObject)}`, () => {
                expect(ColorTranslator.toHEXAObject(colorValue)).toEqual(color.HEXAObject);
            });

            // toRGB
            it(`toRGB method from ${colorValueStr} => ${color.RGB}`, () => {
                expect(ColorTranslator.toRGB(colorValue, options)).toBe(color.RGB);
            });

            it(`toRGBObject method from ${colorValueStr} => ${JSON.stringify(color.RGBObject)}`, () => {
                expect(ColorTranslator.toRGBObject(colorValue, options)).toEqual(color.RGBObject);
            });

            // toRGBA
            it(`toRGBA method from ${colorValueStr} => ${color.RGBA}`, () => {
                expect(ColorTranslator.toRGBA(colorValue, options)).toBe(color.RGBA);
            });

            it(`toRGBAObject method from ${colorValueStr} => ${JSON.stringify(color.RGBAObject)}`, () => {
                expect(ColorTranslator.toRGBAObject(colorValue, options)).toEqual(color.RGBAObject);
            });

            // toHSL
            it(`toHSL method from ${colorValueStr} => ${color.HSL}`, () => {
                expect(ColorTranslator.toHSL(colorValue, options)).toBe(color.HSL);
            });

            it(`toHSLObject method from ${colorValueStr} => ${JSON.stringify(color.HSLObject)}`, () => {
                expect(ColorTranslator.toHSLObject(colorValue, options)).toEqual(color.HSLObject);
            });

            // toHSLA
            it(`toHSLA method from ${colorValueStr} => ${color.HSLA}`, () => {
                expect(ColorTranslator.toHSLA(colorValue, options)).toBe(color.HSLA);
            });

            it(`toHSLAObject method from ${colorValueStr} => ${JSON.stringify(color.HSLAObject)}`, () => {
                expect(ColorTranslator.toHSLAObject(colorValue, options)).toEqual(color.HSLAObject);
            });

            // toHWB
            it(`toHWB method from ${colorValueStr} => ${color.HWB}`, () => {
                expect(ColorTranslator.toHWB(colorValue, options)).toBe(color.HWB);
            });

            it(`toHWBObject method from ${colorValueStr} => ${JSON.stringify(color.HWBObject)}`, () => {
                expect(ColorTranslator.toHWBObject(colorValue, options)).toEqual(color.HWBObject);
            });

            // toHWBA
            it(`toHWBA method from ${colorValueStr} => ${color.HWBA}`, () => {
                expect(ColorTranslator.toHWBA(colorValue, options)).toBe(color.HWBA);
            });

            it(`toHWBAObject method from ${colorValueStr} => ${JSON.stringify(color.HWBAObject)}`, () => {
                expect(ColorTranslator.toHWBAObject(colorValue, options)).toEqual(color.HWBAObject);
            });

        });

    });

    describe('Colors static methods round trip', () => {

        it('HEX round trip', () => {
            expect(
                ColorTranslator.toHEX(color.HEX)
            ).toBe(color.HEX);
            expect(
                ColorTranslator.toHEXA(color.HEXA)
            ).toBe(color.HEXA);
            expect(
                ColorTranslator.toHEXObject(color.HEXObject)
            ).toEqual(color.HEXObject);
            expect(
                ColorTranslator.toHEXAObject(color.HEXAObject)
            ).toEqual(color.HEXAObject);
        });

        it('RGB round trip', () => {
            expect(
                ColorTranslator.toRGB(color.RGB)
            ).toBe(color.RGB);
            expect(
                ColorTranslator.toRGBA(color.RGBA)
            ).toBe(color.RGBA);
            expect(
                ColorTranslator.toRGBObject(color.RGBObject)
            ).toEqual(color.RGBObject);
            expect(
                ColorTranslator.toRGBAObject(color.RGBAObject)
            ).toEqual(color.RGBAObject);
            expect(
                ColorTranslator.toRGB(color.RGBLegacy)
            ).toBe(color.RGBLegacy);
            expect(
                ColorTranslator.toRGBA(color.RGBALegacy)
            ).toBe(color.RGBALegacy);
        });

        it('HSL round trip', () => {
            expect(
                ColorTranslator.toHSL(color.HSL)
            ).toBe(color.HSL);
            expect(
                ColorTranslator.toHSLA(color.HSLA)
            ).toBe(color.HSLA);
            expect(
                ColorTranslator.toHSLA(color.HSLAInPercentages)
            ).toBe(color.HSLAInPercentages);
            expect(
                ColorTranslator.toHSLObject(color.HSLObject)
            ).toEqual(color.HSLObject);
            expect(
                ColorTranslator.toHSLAObject(color.HSLAObject)
            ).toEqual(color.HSLAObject);
            expect(
                ColorTranslator.toHSL(color.HSLLegacy)
            ).toBe(color.HSLLegacy);
            expect(
                ColorTranslator.toHSLA(color.HSLALegacy)
            ).toBe(color.HSLALegacy);
        });

        it('HWB round trip', () => {
            expect(
                ColorTranslator.toHWB(color.HWB)
            ).toBe(color.HWB);
            expect(
                ColorTranslator.toHWBA(color.HWBA)
            ).toBe(color.HWBA);
            expect(
                ColorTranslator.toHWBA(color.HWBAInPercentage)
            ).toBe(color.HWBAInPercentage);
            expect(
                ColorTranslator.toHWBObject(color.HWBObject)
            ).toEqual(color.HWBObject);
            expect(
                ColorTranslator.toHWBAObject(color.HWBAObject)
            ).toEqual(color.HWBAObject);
        });

    });

});

LAB_AND_LCH_COLORS.forEach((color) => {

    const keyword = color.KEYWORD;

    describe(`ColorTranslator static CIELab and LCH color conversion for ${keyword}`, () => {

        const options = { decimals: 0 };
        const optionsWithPercentage = {
            ...options,
            labUnit: 'percent',
            lchUnit: 'percent',
            alphaUnit: 'percent'
        } as const;

        // LAB
        it(`toCIELab => ${ color.CIELab }`, () => {
            expect(ColorTranslator.toCIELab(keyword, options)).toBe(color.CIELab);
        });

        it(`toCIELab with parcentages => ${ color.CIELabInPrcentage }`, () => {
            expect(
                ColorTranslator.toCIELab(keyword, optionsWithPercentage)
            ).toBe(color.CIELabInPrcentage);
        });

        it(`toCIELabA => ${ color.CIELabA }`, () => {
            expect(ColorTranslator.toCIELabA(keyword, options)).toBe(color.CIELabA);
        });

        it(`toCIELabA with parcentages => ${ color.CIELabAInPrcentage }`, () => {
            expect(
                ColorTranslator.toCIELabA(keyword, optionsWithPercentage)
            ).toBe(color.CIELabAInPrcentage);
        });

        it(`toCIELabObject => ${ JSON.stringify(color.CIELabObject) }`, () => {
            expect(ColorTranslator.toCIELabObject(keyword, options)).toEqual(color.CIELabObject);
        });

        it(`toCIELabAObject => ${ JSON.stringify(color.CIELabAObject) }`, () => {
            expect(ColorTranslator.toCIELabAObject(keyword, options)).toEqual(color.CIELabAObject);
        });

        // LCH
        it(`toLCH => ${ color.LCH }`, () => {
            expect(ColorTranslator.toLCH(keyword, options)).toBe(color.LCH);
        });

        it(`toLCH with parcentages => ${ color.LCHInPercentage }`, () => {
            expect(
                ColorTranslator.toLCH(keyword, optionsWithPercentage)
            ).toBe(color.LCHInPercentage);
        });

        it(`toLCHA => ${ color.LCHA }`, () => {
            expect(ColorTranslator.toLCHA(keyword, options)).toBe(color.LCHA);
        });

        it(`toLCHA with parcentages => ${ color.LCHAInPercentage }`, () => {
            expect(
                ColorTranslator.toLCHA(keyword, optionsWithPercentage)
            ).toBe(color.LCHAInPercentage);
        });

        it(`toLCHObject => ${ JSON.stringify(color.LCHObject) }`, () => {
            expect(ColorTranslator.toLCHObject(keyword, options)).toEqual(color.LCHObject);
        });

        it(`toLCHAObject => ${ JSON.stringify(color.LCHAObject) }`, () => {
            expect(ColorTranslator.toLCHAObject(keyword, options)).toEqual(color.LCHAObject);
        });

    });

    describe('CIELab and LCH static methods round trip', () => {

        it('CIELab round trip', () => {
            expect(
                ColorTranslator.toCIELab(color.CIELab)
            ).toBe(color.CIELab);
            expect(
                ColorTranslator.toCIELab(color.CIELabInPrcentage)
            ).toBe(color.CIELabInPrcentage);
            expect(
                ColorTranslator.toCIELabA(color.CIELabA)
            ).toBe(color.CIELabA);
            expect(
                ColorTranslator.toCIELabA(color.CIELabAInPrcentage)
            ).toBe(color.CIELabAInPrcentage);
            expect(
                ColorTranslator.toCIELabObject(color.CIELabObject)
            ).toEqual(color.CIELabObject);
            expect(
                ColorTranslator.toCIELabAObject(color.CIELabAObject)
            ).toEqual(color.CIELabAObject);
        });

        it('LCH round trip', () => {
            expect(
                ColorTranslator.toLCH(color.LCH)
            ).toBe(color.LCH);
            expect(
                ColorTranslator.toLCH(color.LCHInPercentage)
            ).toBe(color.LCHInPercentage);
            expect(
                ColorTranslator.toLCHA(color.LCHA)
            ).toBe(color.LCHA);
            expect(
                ColorTranslator.toLCHA(color.LCHAInPercentage)
            ).toBe(color.LCHAInPercentage);
            expect(
                ColorTranslator.toLCHObject(color.LCHObject)
            ).toEqual(color.LCHObject);
            expect(
                ColorTranslator.toLCHAObject(color.LCHAObject)
            ).toEqual(color.LCHAObject);
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
            expect(ColorTranslator.toHWB(color.RGB, optionsNoDecimals)).toBe(color.HWB);
            expect(ColorTranslator.toHWBA(color.RGBObject, optionsNoDecimals)).toBe(color.HWBA);
        });

        it(' Legacy conversion', () => {
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
                expect(ColorTranslator.toCMYKObject(colorValue, options)).toEqual(color.CMYKIntObject100);
            });

            // toCMYKA
            it(`toCMYKA method from ${colorValueStr} => ${color.CMYKWithAlpha}`, () => {
                expect(ColorTranslator.toCMYKA(colorValue, options)).toBe(color.CMYKWithAlpha);
            });

            it(`toCMYKAObject method from ${colorValueStr} => ${JSON.stringify(color.CMYKIntObject100WithAlpha)}`, () => {
                expect(ColorTranslator.toCMYKAObject(colorValue, options)).toEqual(color.CMYKIntObject100WithAlpha);
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

        describe('Conversion from CMYK', () => {
            expect(ColorTranslator.toHEX(colorValue)).toBe(
                ColorTranslator.toHEX(color.RGB)
            );
        });

    });

    describe('CMYK static methods round trip', () => {
        it('CMYK round trip', () => {
            expect(
                ColorTranslator.toCMYK(color.CMYK)
            ).toBe(color.CMYK);
            expect(
                ColorTranslator.toCMYKA(color.CMYKWithAlpha)
            ).toBe(color.CMYKWithAlpha);
            expect(
                ColorTranslator.toCMYKA(color.CMYKWithAlphaInPercentages)
            ).toBe(color.CMYKWithAlphaInPercentages);

            expect(
                ColorTranslator.toCMYK(color.CMYKInt)
            ).toBe(color.CMYKInt);
            expect(
                ColorTranslator.toCMYKA(color.CMYKIntWithAlpha)
            ).toBe(color.CMYKIntWithAlpha);
            expect(
                ColorTranslator.toCMYKA(color.CMYKIntWithAlphaInPercentages)
            ).toBe(color.CMYKIntWithAlphaInPercentages);

            expect(
                ColorTranslator.toCMYK(color.CMYKLegacy)
            ).toBe(color.CMYKLegacy);
            expect(
                ColorTranslator.toCMYKA(color.CMYKLegacyWithAlpha)
            ).toBe(color.CMYKLegacyWithAlpha);

            expect(
                 ColorTranslator.toCMYK(color.CMYKIntLegacy)
            ).toBe(color.CMYKIntLegacy);
            expect(
                ColorTranslator.toCMYKA(color.CMYKIntLegacyWithAlpha)
            ).toBe(color.CMYKIntLegacyWithAlpha);
            expect(
                ColorTranslator.toCMYKA(color.CMYKIntWithAlphaInPercentages)
            ).toBe(color.CMYKIntWithAlphaInPercentages);
            
            // The round-trips for objects should go always to int 100
            expect(
                ColorTranslator.toCMYKObject(color.CMYKObject)
            ).toEqual(color.CMYKIntObject100);
            expect(
                ColorTranslator.toCMYKObject(color.CMYKIntObject)
            ).toEqual(color.CMYKIntObject100);
            expect(
                ColorTranslator.toCMYKObject(color.CMYKIntObject100)
            ).toEqual(color.CMYKIntObject100);
            expect(
                ColorTranslator.toCMYKAObject(color.CMYKIntObjectWithAlpha)
            ).toEqual(color.CMYKIntObject100WithAlpha);
            expect(
                ColorTranslator.toCMYKAObject(color.CMYKIntObject100WithAlpha)
            ).toEqual(color.CMYKIntObject100WithAlpha);
        });

    });

});