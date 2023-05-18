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

        it(`HSL with percentages ${JSON.stringify(hslPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(hslPercentages, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslPercentages, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslPercentages, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslPercentages, false, 0)).toMatchObject(item.hslObject);

            expect(ColorTranslator.toRGB(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSL(hslPercentages)).toMatchSnapshot();

        });

        it(`HSLA with percentages ${JSON.stringify(hslaPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaPercentages, true, 0)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaPercentages, false, 0)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaPercentages, true, 0)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaPercentages, false, 0)).toMatchObject(item.hslaObject);

            expect(ColorTranslator.toRGBA(hslPercentages)).toMatchSnapshot();
            expect(ColorTranslator.toHSLA(hslPercentages)).toMatchSnapshot();

        });

        it(`HSL big hue ${JSON.stringify(hslBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslBigHue, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslBigHue, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslBigHue, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslBigHue, false, 0)).toMatchObject(item.hslObject);

        });

        it(`HSLA big hue ${JSON.stringify(hslaBigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaBigHue, true, 0)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaBigHue, false, 0)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaBigHue, true, 0)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaBigHue, false, 0)).toMatchObject(item.hslaObject);

        });

        it(`HSL low hue ${JSON.stringify(hslLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslLowHue, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslLowHue, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslLowHue, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslLowHue, false, 0)).toMatchObject(item.hslObject);

        });

        it(`HSLA low hue ${JSON.stringify(hslaLowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaLowHue, true, 0)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaLowHue, false, 0)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaLowHue, true, 0)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaLowHue, false, 0)).toMatchObject(item.hslaObject);

        });

        it(`Hue in deg ${hslDeg}`, () => {

            expect(ColorTranslator.toRGB(hslDeg, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslDeg, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslDeg, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslDeg, false, 0)).toMatchObject(item.hslObject);

        });

        it(`Hue in grad ${hslGrad}`, () => {

            expect(ColorTranslator.toRGB(hslGrad, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslGrad, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslGrad, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslGrad, false, 0)).toMatchObject(item.hslObject);

        });

        it(`Hue in rad ${hslRadians}`, () => {

            expect(ColorTranslator.toRGB(hslRadians, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslRadians, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslRadians, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslRadians, false, 0)).toMatchObject(item.hslObject);

        });

        it(`Hue in turn ${hslTurns}`, () => {

            expect(ColorTranslator.toRGB(hslTurns, true, 0)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslTurns, false, 0)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslTurns, true, 0)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslTurns, false, 0)).toMatchObject(item.hslObject);

        });

    });

});