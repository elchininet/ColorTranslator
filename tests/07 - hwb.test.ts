import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

COLORS.forEach((item): void => {

    describe(`HWB tests for ${item.HWB}`, (): void => {

        const HWB = { ...item.HWBObject };
        const HWBA = { ...item.HWBAObject };
        const HWBPercentages = { ...HWB, W: HWB.W + '%', B: HWB.B + '%' };
        const HWBAPercentages = { ...HWBA, W: HWBA.W + '%', B: HWBA.B + '%', A: '100%' };
        const HWBBigHue = { ...HWB, H: HWB.H + 360 };
        const HWBABigHue = { ...HWBA, H: HWBA.H + 360 };
        const HWBLowHue = { ...HWB, H: HWB.H - 360 };
        const HWBALowHue = { ...HWBA, H: HWBA.H - 360 };
        const options = { decimals: 0 };
        const legacyOptions = { ...options, legacyCSS: true };

        it(`HWB with percentages ${JSON.stringify(HWBPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(HWBPercentages, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HWBPercentages, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HWBPercentages, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHWB(HWBPercentages, options)).toBe(item.HWB);
            expect(ColorTranslator.toHWBObject(HWBPercentages, options)).toMatchObject(item.HWBObject);

            expect(ColorTranslator.toRGB(HWBPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHWB(HWBPercentages)).toMatchSnapshot();

        });

        it(`HWBA with percentages ${JSON.stringify(HWBAPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(HWBAPercentages, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HWBAPercentages, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HWBAPercentages, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHWBA(HWBAPercentages, options)).toBe(item.HWBA);
            expect(ColorTranslator.toHWBAObject(HWBAPercentages, options)).toMatchObject(item.HWBAObject);

            expect(ColorTranslator.toRGBA(HWBAPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHWB(HWBAPercentages)).toMatchSnapshot();

        });

        it(`HWB big hue ${JSON.stringify(HWBBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(HWBBigHue, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HWBBigHue, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HWBBigHue, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHWB(HWBBigHue, options)).toBe(item.HWB);
            expect(ColorTranslator.toHWBObject(HWBBigHue, options)).toMatchObject(item.HWBObject);

        });

        it(`HWBA big hue ${JSON.stringify(HWBABigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(HWBABigHue, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HWBABigHue, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HWBABigHue, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHWBA(HWBABigHue, options)).toBe(item.HWBA);
            expect(ColorTranslator.toHWBAObject(HWBABigHue, options)).toMatchObject(item.HWBAObject);

        });

        it(`HWB low hue ${JSON.stringify(HWBLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(HWBLowHue, options)).toBe(item.RGB);
            expect(ColorTranslator.toRGB(HWBLowHue, legacyOptions)).toBe(item.RGBLegacy);
            expect(ColorTranslator.toRGBObject(HWBLowHue, options)).toMatchObject(item.RGBObject);

            expect(ColorTranslator.toHWB(HWBLowHue, options)).toBe(item.HWB);
            expect(ColorTranslator.toHWBObject(HWBLowHue, options)).toMatchObject(item.HWBObject);

        });

        it(`HWBA low hue ${JSON.stringify(HWBALowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(HWBALowHue, options)).toBe(item.RGBA);
            expect(ColorTranslator.toRGBA(HWBALowHue, legacyOptions)).toBe(item.RGBALegacy);
            expect(ColorTranslator.toRGBAObject(HWBALowHue, options)).toMatchObject(item.RGBAObject);

            expect(ColorTranslator.toHWBA(HWBALowHue, options)).toBe(item.HWBA);
            expect(ColorTranslator.toHWBAObject(HWBALowHue, options)).toMatchObject(item.HWBAObject);

        });

    });

});