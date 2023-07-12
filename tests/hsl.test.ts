import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

const HSL_REGEXP = /^(hsla?\()(\d+)([^)]*\))$/;

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
        const hslDeg = item.hsl.replace(HSL_REGEXP, '$1$2deg$3');
        const hslGrad = item.hsl.replace(HSL_REGEXP, '$1$2grad$3');
        const hslRadians = item.hsl.replace(HSL_REGEXP, (__match: string, start: string, number: string, end: string): string => {
            return `${start}${Math.round((+number * Math.PI / 180) * 10000) / 10000}rad${end}`;
        });
        const hslTurns = item.hsl.replace(HSL_REGEXP, (__match: string, start: string, number: string, end: string): string => {
            return `${start}${Math.round(+number / 360 * 10000) / 10000}turn${end}`;
        });
        const options = { decimals: 0 };

        it(`HSL with percentages ${JSON.stringify(hslPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(hslPercentages, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslPercentages, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslPercentages, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslPercentages, options)).toMatchObject(item.hslObject);

            expect(ColorTranslator.toRGB(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSL(hslPercentages)).toMatchSnapshot();

        });

        it(`HSLA with percentages ${JSON.stringify(hslaPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaPercentages, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBAObject(hslaPercentages, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaPercentages, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLAObject(hslaPercentages, options)).toMatchObject(item.hslaObject);

            expect(ColorTranslator.toRGBA(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSLA(hslPercentages)).toMatchSnapshot();

        });

        it(`HSL big hue ${JSON.stringify(hslBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslBigHue, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslBigHue, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslBigHue, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslBigHue, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA big hue ${JSON.stringify(hslaBigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaBigHue, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBAObject(hslaBigHue, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaBigHue, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLAObject(hslaBigHue, options)).toMatchObject(item.hslaObject);

        });

        it(`HSL low hue ${JSON.stringify(hslLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslLowHue, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslLowHue, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslLowHue, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslLowHue, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA low hue ${JSON.stringify(hslaLowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaLowHue, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBAObject(hslaLowHue, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaLowHue, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLAObject(hslaLowHue, options)).toMatchObject(item.hslaObject);

        });

        it(`Hue in deg ${hslDeg}`, () => {

            expect(ColorTranslator.toRGB(hslDeg, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslDeg, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslDeg, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslDeg, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in grad ${hslGrad}`, () => {

            expect(ColorTranslator.toRGB(hslGrad, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslGrad, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslGrad, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslGrad, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in rad ${hslRadians}`, () => {

            expect(ColorTranslator.toRGB(hslRadians, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslRadians, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslRadians, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslRadians, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in turn ${hslTurns}`, () => {

            expect(ColorTranslator.toRGB(hslTurns, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGBObject(hslTurns, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslTurns, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSLObject(hslTurns, options)).toMatchObject(item.hslObject);

        });

    });

});