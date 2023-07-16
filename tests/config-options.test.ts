import { ColorTranslator, InputOptions } from '../src';
import { Options } from '../src/@types';
import { DEFAULT_OPTIONS } from '../src/constants';

interface TestCase {
    options: InputOptions;
    extraOptions?: InputOptions;
    rgb: string;
    rgba: string;
    hsl: string;
    hsla: string;
    isDefault: boolean;
}

describe('ColorTranslator CSS config options', () => {

    const COLOR = '#FF00FF';

    const TEST_CASES: TestCase[] = [
        {
            options: { legacyCSS: true },
            rgb: 'rgb(255,0,255)',
            rgba: 'rgba(255,0,255,1)',
            hsl: 'hsl(300,100%,50%)',
            hsla: 'hsla(300,100%,50%,1)',
            isDefault: false
        },
        {
            options: { legacyCSS: false },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            isDefault: true
        },
        {
            options: { spacesAfterCommas: true },
            extraOptions: { legacyCSS: true },
            rgb: 'rgb(255, 0, 255)',
            rgba: 'rgba(255, 0, 255, 1)',
            hsl: 'hsl(300, 100%, 50%)',
            hsla: 'hsla(300, 100%, 50%, 1)',
            isDefault: false
        },
        {
            options: { spacesAfterCommas: false },
            extraOptions: { legacyCSS: true },
            rgb: 'rgb(255,0,255)',
            rgba: 'rgba(255,0,255,1)',
            hsl: 'hsl(300,100%,50%)',
            hsla: 'hsla(300,100%,50%,1)',
            isDefault: true
        }
    ];

    TEST_CASES.forEach((testCase: TestCase): void => {

        const {
            options,
            extraOptions = {},
            rgb,
            rgba,
            hsl,
            hsla,
            isDefault
        } = testCase;

        it(`Check ${JSON.stringify(options)}`, () => {
            const mergedOptions = { ...options, ...extraOptions };
            const instance = new ColorTranslator(COLOR, mergedOptions);
            expect(instance.RGB).toBe(rgb);
            expect(instance.RGBA).toBe(rgba);
            expect(instance.HSL).toBe(hsl);
            expect(instance.HSLA).toBe(hsla);
            expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(rgb);
            expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(rgba);
            expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(hsl);
            expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(hsla);
        });

        if (isDefault) {

            const key: keyof Options = Object.keys(options)[0] as keyof Options;
            const { [key]: defaultProp, ...defaultOptions } = { ...DEFAULT_OPTIONS };

            it(`Check default value of ${key}:${defaultProp}`, () => {
                const mergedOptions = { ...defaultOptions, ...extraOptions };
                const instance = new ColorTranslator(COLOR, mergedOptions);
                expect(instance.RGB).toBe(rgb);
                expect(instance.RGBA).toBe(rgba);
                expect(instance.HSL).toBe(hsl);
                expect(instance.HSLA).toBe(hsla);
                expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(rgb);
                expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(rgba);
                expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(hsl);
                expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(hsla);
            });

        }

    });

});

describe('ColorTranslator CSS config options autodetection', () => {

    it(`legacyCSS auto detection`, () => {

        expect(ColorTranslator.toRGB('rgba(255,0,255)')).toBe('rgb(255,0,255)');
        expect(ColorTranslator.toHSLA('rgba(255 0 255 / 1)')).toBe('hsl(300 100% 50% / 1)');

    });

    it(`spacesAfterCommas auto detection`, () => {

        expect(ColorTranslator.toRGBA('rgba(255,0,255)')).toBe('rgba(255,0,255,1)');
        expect(ColorTranslator.toRGBA('rgba(255, 0,255)')).toBe('rgba(255,0,255,1)');
        expect(ColorTranslator.toHSL('rgba(255, 0, 255, 1)')).toBe('hsl(300, 100%, 50%)');
        expect(ColorTranslator.toHSL('rgba(255,0,255, 1)')).toBe('hsl(300,100%,50%)');

    });

});