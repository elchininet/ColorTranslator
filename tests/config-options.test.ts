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
    cmyk: string;
    cmyka: string;
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
            cmyk: 'device-cmyk(0%,100%,0%,0%)',
            cmyka: 'device-cmyk(0%,100%,0%,0%,1)',
            isDefault: false
        },
        {
            options: { legacyCSS: false },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { spacesAfterCommas: true },
            extraOptions: { legacyCSS: true },
            rgb: 'rgb(255, 0, 255)',
            rgba: 'rgba(255, 0, 255, 1)',
            hsl: 'hsl(300, 100%, 50%)',
            hsla: 'hsla(300, 100%, 50%, 1)',
            cmyk: 'device-cmyk(0%, 100%, 0%, 0%)',
            cmyka: 'device-cmyk(0%, 100%, 0%, 0%, 1)',
            isDefault: false
        },
        {
            options: { spacesAfterCommas: false },
            extraOptions: { legacyCSS: true },
            rgb: 'rgb(255,0,255)',
            rgba: 'rgba(255,0,255,1)',
            hsl: 'hsl(300,100%,50%)',
            hsla: 'hsla(300,100%,50%,1)',
            cmyk: 'device-cmyk(0%,100%,0%,0%)',
            cmyka: 'device-cmyk(0%,100%,0%,0%,1)',
            isDefault: true
        },
        {
            options: { anglesUnit: 'none' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { anglesUnit: 'deg' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300deg 100% 50%)',
            hsla: 'hsl(300deg 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'grad' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(333.333333grad 100% 50%)',
            hsla: 'hsl(333.333333grad 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'rad' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(5.235988rad 100% 50%)',
            hsla: 'hsl(5.235988rad 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'turn' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(0.833333turn 100% 50%)',
            hsla: 'hsl(0.833333turn 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { rgbUnit: 'none' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { rgbUnit: 'percent' },
            rgb: 'rgb(100% 0% 100%)',
            rgba: 'rgb(100% 0% 100% / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { cmykUnit: 'percent' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { cmykUnit: 'none' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0 1 0 0)',
            cmyka: 'device-cmyk(0 1 0 0 / 1)',
            isDefault: false
        },
        {
            options: { alphaUnit: 'none' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { alphaUnit: 'percent' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 100%)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 100%)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 100%)',
            isDefault: false
        },
        {
            options: { cmykFunction: 'cmyk' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'cmyk(0% 100% 0% 0%)',
            cmyka: 'cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { cmykFunction: 'device-cmyk' },
            rgb: 'rgb(255 0 255)',
            rgba: 'rgb(255 0 255 / 1)',
            hsl: 'hsl(300 100% 50%)',
            hsla: 'hsl(300 100% 50% / 1)',
            cmyk: 'device-cmyk(0% 100% 0% 0%)',
            cmyka: 'device-cmyk(0% 100% 0% 0% / 1)',
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
            cmyk,
            cmyka,
            isDefault
        } = testCase;

        it(`Check ${JSON.stringify(options)}`, () => {
            const mergedOptions = { ...options, ...extraOptions };
            const instance = new ColorTranslator(COLOR, mergedOptions);
            expect(instance.RGB).toBe(rgb);
            expect(instance.RGBA).toBe(rgba);
            expect(instance.HSL).toBe(hsl);
            expect(instance.HSLA).toBe(hsla);
            expect(instance.CMYK).toBe(cmyk);
            expect(instance.CMYKA).toBe(cmyka);
            expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(rgb);
            expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(rgba);
            expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(hsl);
            expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(hsla);
            expect(ColorTranslator.toCMYK(COLOR, mergedOptions)).toBe(cmyk);
            expect(ColorTranslator.toCMYKA(COLOR, mergedOptions)).toBe(cmyka);
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
                expect(instance.CMYK).toBe(cmyk);
                expect(instance.CMYKA).toBe(cmyka);
                expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(rgb);
                expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(rgba);
                expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(hsl);
                expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(hsla);
                expect(ColorTranslator.toCMYK(COLOR, mergedOptions)).toBe(cmyk);
                expect(ColorTranslator.toCMYKA(COLOR, mergedOptions)).toBe(cmyka);
            });

        }

    });

});

describe('ColorTranslator CSS config options autodetection', () => {

    it(`legacyCSS auto detection`, () => {

        const instanceLegacy = new ColorTranslator('rgba(255,0,255)');

        expect(instanceLegacy.HSL).toBe('hsl(300,100%,50%)');
        expect(instanceLegacy.RGBA).toBe('rgba(255,0,255,1)');

        const instance = new ColorTranslator('hsl(300 100% 50% / 0.5)');

        expect(instance.RGB).toBe('rgb(255 0 255)');
        expect(instance.HSL).toBe('hsl(300 100% 50%)');

        expect(ColorTranslator.toRGB('rgba(255,0,255)')).toBe('rgb(255,0,255)');
        expect(ColorTranslator.toHSLA('rgba(255 0 255 / 1)')).toBe('hsl(300 100% 50% / 1)');

    });

    it(`spacesAfterCommas auto detection`, () => {

        const instanceWithoutSpaces = new ColorTranslator('rgba(255,0,255)');

        expect(instanceWithoutSpaces.RGB).toBe('rgb(255,0,255)');
        expect(instanceWithoutSpaces.HSLA).toBe('hsla(300,100%,50%,1)');

        const instanceWithSpaces = new ColorTranslator('rgb(255, 0, 255)');

        expect(instanceWithSpaces.RGBA).toBe('rgba(255, 0, 255, 1)');
        expect(instanceWithSpaces.HSL).toBe('hsl(300, 100%, 50%)');

        expect(ColorTranslator.toRGBA('rgba(255,0,255)')).toBe('rgba(255,0,255,1)');
        expect(ColorTranslator.toRGBA('rgba(255, 0,255)')).toBe('rgba(255,0,255,1)');
        expect(ColorTranslator.toHSL('rgba(255, 0, 255, 1)')).toBe('hsl(300, 100%, 50%)');
        expect(ColorTranslator.toHSL('rgba(255,0,255, 1)')).toBe('hsl(300,100%,50%)');

    });

    it(`anglesUnit auto detection`, () => {

        const hsl = {
            h: 720,
            s: 100,
            l: 50
        };

        const TEST_CASES = [
            {
                color: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)`,
                result: `hsl(0 ${hsl.s}% ${hsl.l}%)`
            },
            {
                color: `hsl(${hsl.h}deg ${hsl.s}% ${hsl.l}%)`,
                result: `hsl(0deg ${hsl.s}% ${hsl.l}%)`
            },
            {
                color: `hsl(${hsl.h}grad ${hsl.s}% ${hsl.l}%)`,
                result: `hsl(320grad ${hsl.s}% ${hsl.l}%)`
            },
            {
                color: `hsl(${hsl.h}turn ${hsl.s}% ${hsl.l}%)`,
                result: `hsl(0turn ${hsl.s}% ${hsl.l}%)`
            },
            {
                color: `hsl(${hsl.h}rad ${hsl.s}% ${hsl.l}%)`,
                result: `hsl(3.716875rad ${hsl.s}% ${hsl.l}%)`
            }
        ];

        TEST_CASES.forEach((testCase): void => {

            const instance = new ColorTranslator(testCase.color);
            expect(instance.HSL).toBe(testCase.result);
            expect(ColorTranslator.toHSL(testCase.color)).toBe(testCase.result);

        });

    });

    it(`rgbUnit auto detection`, () => {

        const instancePercentage = new ColorTranslator('rgb(100% 100% 0%)');

        expect(instancePercentage.RGBA).toBe('rgb(100% 100% 0% / 1)');
        expect(instancePercentage.RGB).toBe('rgb(100% 100% 0%)');

        const instanceNone = new ColorTranslator('rgb(255 255 0)');

        expect(instanceNone.RGBA).toBe('rgb(255 255 0 / 1)');
        expect(instanceNone.RGB).toBe('rgb(255 255 0)');

        expect(ColorTranslator.toRGBA('rgba(255 0 255)')).toBe('rgb(255 0 255 / 1)');
        expect(ColorTranslator.toRGB('rgb(100% 100% 0% / 0.5)')).toBe('rgb(100% 100% 0%)');

    });

    it(`cmykUnit auto detection`, () => {

        const instancePercentage = new ColorTranslator('device-cmyk(100% 100% 100% 100%)');

        expect(instancePercentage.CMYK).toBe('device-cmyk(0% 0% 0% 100%)');
        expect(instancePercentage.CMYKA).toBe('device-cmyk(0% 0% 0% 100% / 1)');

        const instanceNone = new ColorTranslator('device-cmyk(1 1 1 1)');

        expect(instanceNone.CMYK).toBe('device-cmyk(0 0 0 1)');
        expect(instanceNone.CMYKA).toBe('device-cmyk(0 0 0 1 / 1)');

        expect(ColorTranslator.toCMYK('device-cmyk(100% 100% 100% 100% / 0.5)')).toBe('device-cmyk(0% 0% 0% 100%)');
        expect(ColorTranslator.toCMYKA('device-cmyk(1 1 1 1)')).toBe('device-cmyk(0 0 0 1 / 1)');

    });

    it(`alphaUnit auto detection`, () => {

        const regNone = /^.* \/ 0\.5\)$/;
        const regPercent = /^.* \/ 50%\)$/;
        const instanceAlphaNone = new ColorTranslator('rgb(255 0 255 / 0.5)');

        expect(instanceAlphaNone.HSLA).toBe('hsl(300 100% 50% / 0.5)');
        expect(instanceAlphaNone.RGBA).toBe('rgb(255 0 255 / 0.5)');
        expect(regNone.test(instanceAlphaNone.CMYKA)).toBe(true);

        const instanceAlphaPercentage = new ColorTranslator('rgb(255 0 255 / 50%)');

        expect(instanceAlphaPercentage.HSLA).toBe('hsl(300 100% 50% / 50%)');
        expect(instanceAlphaPercentage.RGBA).toBe('rgb(255 0 255 / 50%)');
        expect(regPercent.test(instanceAlphaPercentage.CMYKA)).toBe(true);

        expect(ColorTranslator.toHSLA('rgb(255 0 255 / 0.5)')).toBe('hsl(300 100% 50% / 0.5)');
        expect(ColorTranslator.toRGBA('rgb(255 0 255 / 0.5)')).toBe('rgb(255 0 255 / 0.5)');
        expect(regNone.test(ColorTranslator.toCMYKA('rgb(255 0 255 / 0.5)'))).toBe(true);

        expect(ColorTranslator.toHSLA('rgb(255 0 255 / 80%)')).toBe('hsl(300 100% 50% / 80%)');
        expect(ColorTranslator.toRGBA('rgb(255 0 255 / 5%)')).toBe('rgb(255 0 255 / 5%)');
        expect(regPercent.test(ColorTranslator.toCMYKA('rgb(255 0 255 / 50%)'))).toBe(true);

    });

    it(`cmykFunction auto detection`, () => {

        const cmykRegExp = /^cmyk\(/;
        const deviceCmykRegExp = /^device-cmyk\(/;
        const instanceCmyk = new ColorTranslator('cmyk(0 0 0 0)');

        expect(instanceCmyk.CMYK).toMatch(cmykRegExp);
        expect(instanceCmyk.CMYKA).toMatch(cmykRegExp);

        const instanceDeviceCmyk = new ColorTranslator('device-cmyk(0 0 0 0)');

        expect(instanceDeviceCmyk.CMYK).toMatch(deviceCmykRegExp);
        expect(instanceDeviceCmyk.CMYKA).toMatch(deviceCmykRegExp);

        expect(ColorTranslator.toCMYK('cmyk(0 0 0 0)')).toMatch(cmykRegExp);
        expect(ColorTranslator.toCMYKA('cmyk(0 0 0 0)')).toMatch(cmykRegExp);

        expect(ColorTranslator.toCMYK('device-cmyk(0 0 0 0)')).toMatch(deviceCmykRegExp);
        expect(ColorTranslator.toCMYKA('device-cmyk(0 0 0 0)')).toMatch(deviceCmykRegExp);


    });

    it(`wrong config options`, () => {

        const instanceWrong = new ColorTranslator(
            '#FFF',
            {
                // @ts-ignore
                decimals: true,
                // @ts-ignore
                legacyCSS: 100,
                // @ts-ignore
                spacesAfterCommas: 'none',
                // @ts-ignore
                anglesUnit: 'percent',
                // @ts-ignore
                rgbUnit: 'false',
                // @ts-ignore
                cmykUnit: 2.45,
                // @ts-ignore
                alphaUnit: 0,
                // @ts-ignore
                cmykFunction: 'my-cmyk'
            }
        );

        expect(instanceWrong.options).toMatchObject(DEFAULT_OPTIONS);

    });

});