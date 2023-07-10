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

            expect(ColorTranslator.toRGB(hslPercentages, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslPercentages, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslPercentages, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslPercentages, false, options)).toMatchObject(item.hslObject);

            expect(ColorTranslator.toRGB(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSL(hslPercentages)).toMatchSnapshot();

        });

        it(`HSLA with percentages ${JSON.stringify(hslaPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaPercentages, true, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaPercentages, false, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaPercentages, true, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaPercentages, false, options)).toMatchObject(item.hslaObject);

            expect(ColorTranslator.toRGBA(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSLA(hslPercentages)).toMatchSnapshot();

        });

        it(`HSL big hue ${JSON.stringify(hslBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslBigHue, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslBigHue, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslBigHue, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslBigHue, false, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA big hue ${JSON.stringify(hslaBigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaBigHue, true, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaBigHue, false, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaBigHue, true, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaBigHue, false, options)).toMatchObject(item.hslaObject);

        });

        it(`HSL low hue ${JSON.stringify(hslLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslLowHue, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslLowHue, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslLowHue, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslLowHue, false, options)).toMatchObject(item.hslObject);

        });

        it(`HSLA low hue ${JSON.stringify(hslaLowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaLowHue, true, options)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaLowHue, false, options)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaLowHue, true, options)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaLowHue, false, options)).toMatchObject(item.hslaObject);

        });

        it(`Hue in deg ${hslDeg}`, () => {

            expect(ColorTranslator.toRGB(hslDeg, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslDeg, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslDeg, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslDeg, false, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in grad ${hslGrad}`, () => {

            expect(ColorTranslator.toRGB(hslGrad, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslGrad, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslGrad, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslGrad, false, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in rad ${hslRadians}`, () => {

            expect(ColorTranslator.toRGB(hslRadians, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslRadians, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslRadians, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslRadians, false, options)).toMatchObject(item.hslObject);

        });

        it(`Hue in turn ${hslTurns}`, () => {

            expect(ColorTranslator.toRGB(hslTurns, true, options)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslTurns, false, options)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslTurns, true, options)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslTurns, false, options)).toMatchObject(item.hslObject);

        });

    });

});