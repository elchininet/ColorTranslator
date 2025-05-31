import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

COLORS.forEach((item): void => {

    describe(`HSL tests for ${item.HSL}`, (): void => {

        const HSL = { ...item.HSLObject };
        const HSLA = { ...item.HSLObject };
        const HSLPercentages = { ...HSL, S: HSL.S + '%', L: HSL.L + '%' };
        const HSLAPercentages = { ...HSLA, S: HSLA.S + '%', L: HSLA.L + '%' };
        const HSLBigHue = { ...HSL, H: HSL.H + 360 };
        const HSLABigHue = { ...HSL, H: HSL.H + 360 };
        const HSLLowHue = { ...HSL, H: HSL.H - 360 };
        const HSLALowHue = { ...HSL, H: HSL.H - 360 };
        const options = { decimals: 0 };
        const legacyOptions = { ...options, legacyCSS: true };

        it(`HSL with percentages ${JSON.stringify(HSLPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(HSLPercentages, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HSLPercentages, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HSLPercentages, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHSL(HSLPercentages, options)).toBe(item.HSL);
            expect(ColorTranslator.toHSL(HSLPercentages, legacyOptions)).toBe(item.HSLLegacy);
            expect(ColorTranslator.toHSLObject(HSLPercentages, options)).toMatchObject(item.HSLObject);

            expect(ColorTranslator.toRGB(HSLPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSL(HSLPercentages)).toMatchSnapshot();

        });

        it(`HSLA with percentages ${JSON.stringify(HSLAPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(HSLAPercentages, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HSLAPercentages, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HSLAPercentages, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHSLA(HSLAPercentages, options)).toBe(item.HSLA);
            expect(ColorTranslator.toHSLA(HSLAPercentages, legacyOptions)).toBe(item.HSLALegacy);
            expect(ColorTranslator.toHSLAObject(HSLAPercentages, options)).toMatchObject(item.HSLAObject);

            expect(ColorTranslator.toRGBA(HSLAPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSLA(HSLAPercentages)).toMatchSnapshot();

        });

        it(`HSL big hue ${JSON.stringify(HSLBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(HSLBigHue, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HSLBigHue, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HSLBigHue, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHSL(HSLBigHue, options)).toBe(item.HSL);
            expect(ColorTranslator.toHSL(HSLBigHue, legacyOptions)).toBe(item.HSLLegacy);
            expect(ColorTranslator.toHSLObject(HSLBigHue, options)).toMatchObject(item.HSLObject);

        });

        it(`HSLA big hue ${JSON.stringify(HSLABigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(HSLABigHue, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HSLABigHue, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HSLABigHue, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHSLA(HSLABigHue, options)).toBe(item.HSLA);
            expect(ColorTranslator.toHSLA(HSLABigHue, legacyOptions)).toBe(item.HSLALegacy);
            expect(ColorTranslator.toHSLAObject(HSLABigHue, options)).toMatchObject(item.HSLAObject);

        });

        it(`HSL low hue ${JSON.stringify(HSLLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(HSLLowHue, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HSLLowHue, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HSLLowHue, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHSL(HSLLowHue, options)).toBe(item.HSL);
            expect(ColorTranslator.toHSL(HSLLowHue, legacyOptions)).toBe(item.HSLLegacy);
            expect(ColorTranslator.toHSLObject(HSLLowHue, options)).toMatchObject(item.HSLObject);

        });

        it(`HSLA low hue ${JSON.stringify(HSLALowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(HSLALowHue, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HSLALowHue, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HSLALowHue, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHSLA(HSLALowHue, options)).toBe(item.HSLA);
            expect(ColorTranslator.toHSLA(HSLALowHue, legacyOptions)).toBe(item.HSLALegacy);
            expect(ColorTranslator.toHSLAObject(HSLALowHue, options)).toMatchObject(item.HSLAObject);

        });

    });

});