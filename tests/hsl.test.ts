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
            return `${start}${Math.round((+number * Math.PI / 180) * 100) / 100}rad${end}`;
        });
        const hslTurns = item.hsl.replace(HSL_REGEXP, (__match: string, start: string, number: string, end: string): string => {
            return `${start}${Math.round(+number / 360 * 10000) / 10000}turn${end}`;
        });

        it(`HSL with percentages ${JSON.stringify(hslPercentages)}`, (): void => {

            expect(ColorTranslator.toRGB(hslPercentages)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslPercentages, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslPercentages)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslPercentages, false)).toMatchObject(item.hslObject);

        });

        it(`HSLA with percentages ${JSON.stringify(hslaPercentages)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaPercentages)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaPercentages, false)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaPercentages)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaPercentages, false)).toMatchObject(item.hslaObject);

        });

        it(`HSL big hue ${JSON.stringify(hslBigHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslBigHue)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslBigHue, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslBigHue)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslBigHue, false)).toMatchObject(item.hslObject);

        });

        it(`HSLA big hue ${JSON.stringify(hslaBigHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaBigHue)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaBigHue, false)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaBigHue)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaBigHue, false)).toMatchObject(item.hslaObject);

        });

        it(`HSL low hue ${JSON.stringify(hslLowHue)}`, (): void => {

            expect(ColorTranslator.toRGB(hslLowHue)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslLowHue, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslLowHue)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslLowHue, false)).toMatchObject(item.hslObject);

        });

        it(`HSLA low hue ${JSON.stringify(hslaLowHue)}`, (): void => {

            expect(ColorTranslator.toRGBA(hslaLowHue)).toBe(item.rgba);
            expect(ColorTranslator.toRGBA(hslaLowHue, false)).toMatchObject(item.rgbaObject);

            expect(ColorTranslator.toHSLA(hslaLowHue)).toBe(item.hsla);
            expect(ColorTranslator.toHSLA(hslaLowHue, false)).toMatchObject(item.hslaObject);

        });

        it(`Hue in deg ${hslDeg}`, () => {

            expect(ColorTranslator.toRGB(hslDeg)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslDeg, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslDeg)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslDeg, false)).toMatchObject(item.hslObject);

        });

        it(`Hue in grad ${hslGrad}`, () => {

            expect(ColorTranslator.toRGB(hslGrad)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslGrad, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslGrad)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslGrad, false)).toMatchObject(item.hslObject);

        });

        it(`Hue in rad ${hslRadians}`, () => {

            expect(ColorTranslator.toRGB(hslRadians)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslRadians, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslRadians)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslRadians, false)).toMatchObject(item.hslObject);

        });

        it(`Hue in turn ${hslTurns}`, () => {

            expect(ColorTranslator.toRGB(hslTurns)).toBe(item.rgb);
            expect(ColorTranslator.toRGB(hslTurns, false)).toMatchObject(item.rgbObject);

            expect(ColorTranslator.toHSL(hslTurns)).toBe(item.hsl);
            expect(ColorTranslator.toHSL(hslTurns, false)).toMatchObject(item.hslObject);

        });

    });

});