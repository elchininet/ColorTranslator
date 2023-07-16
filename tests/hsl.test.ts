import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

COLORS.forEach((item): void => {

    describe(`HSL tests for ${item.hsl}`, (): void => {

        const hsl = { ...item.hslObject };
        const hsla = { ...item.hslaObject };
        const hslPercentages = { ...hsl, s: hsl.s + '%', l: hsl.l + '%' };
        const hslaPercentages = { ...hsla, s: hsla.s + '%', l: hsla.l + '%' };
        const hslBigHue = { ...hsl, h: hsl.h + 360 };
        const hslaBigHue = { ...hsl, h: hsl.h + 360 };
        const hslLowHue = { ...hsl, h: hsl.h - 360 };
        const hslaLowHue = { ...hsl, h: hsl.h - 360 };
        const options = { decimals: 0 };
        const legacyOptions = { ...options, legacyCSS: true };

        it(`HSL with percentages ${JSON.stringify(hslPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(hslPercentages, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslPercentages, legacyOptions)).toBe(item.rgbLegacy);
            expect(ColorTranslator.toRGBObject(hslPercentages, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslPercentages, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslPercentages, legacyOptions)).toBe(item.hslLegacy);
            expect(ColorTranslator.toHSLObject(hslPercentages, options)).toMatchObject(item.hslObject);

            expect(ColorTranslator.toRGB(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSL(hslPercentages)).toMatchSnapshot();

        });

        it(`HSLA with percentages ${JSON.stringify(hslaPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaPercentages, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaPercentages, legacyOptions)).toBe(item.rgbaLegacy);
            expect(ColorTranslator.toRGBAObject(hslaPercentages, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaPercentages, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaPercentages, legacyOptions)).toBe(item.hslaLegacy);
            expect(ColorTranslator.toHSLAObject(hslaPercentages, options)).toMatchObject(item.hslaObject);

            expect(ColorTranslator.toRGBA(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSLA(hslPercentages)).toMatchSnapshot();

        });

        it(`HSL big hue ${JSON.stringify(hslBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslBigHue, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslBigHue, legacyOptions)).toBe(item.rgbLegacy);
            expect(ColorTranslator.toRGBObject(hslBigHue, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslBigHue, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslBigHue, legacyOptions)).toBe(item.hslLegacy);
            expect(ColorTranslator.toHSLObject(hslBigHue, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA big hue ${JSON.stringify(hslaBigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaBigHue, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaBigHue, legacyOptions)).toBe(item.rgbaLegacy);
            expect(ColorTranslator.toRGBAObject(hslaBigHue, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaBigHue, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaBigHue, legacyOptions)).toBe(item.hslaLegacy);
            expect(ColorTranslator.toHSLAObject(hslaBigHue, options)).toMatchObject(item.hslaObject);

        });

        it(`HSL low hue ${JSON.stringify(hslLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslLowHue, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslLowHue, legacyOptions)).toBe(item.rgbLegacy);
            expect(ColorTranslator.toRGBObject(hslLowHue, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslLowHue, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslLowHue, legacyOptions)).toBe(item.hslLegacy);
            expect(ColorTranslator.toHSLObject(hslLowHue, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA low hue ${JSON.stringify(hslaLowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaLowHue, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaLowHue, legacyOptions)).toBe(item.rgbaLegacy);
            expect(ColorTranslator.toRGBAObject(hslaLowHue, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaLowHue, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaLowHue, legacyOptions)).toBe(item.hslaLegacy);
            expect(ColorTranslator.toHSLAObject(hslaLowHue, options)).toMatchObject(item.hslaObject);

        });

    });

});