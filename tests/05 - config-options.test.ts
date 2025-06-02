import { ColorTranslator, InputOptions } from '../src';
import { Options } from '../src/@types';
import { DEFAULT_OPTIONS } from '../src/constants';

interface TestCase {
    options: InputOptions;
    extraOptions?: InputOptions;
    RGB: string;
    RGBA: string;
    HSL: string;
    HSLA: string;
    HWB: string;
    HWBA: string;
    CIELab: string;
    CIELabA: string;
    LCH: string;
    LCHA: string;
    CMYK: string;
    CMYKA: string;
    isDefault: boolean;
}

describe('ColorTranslator CSS config options', () => {

    const COLOR = '#FF00FF';

    const TEST_CASES: TestCase[] = [
        {
            options: { legacyCSS: true },
            RGB: 'rgb(255,0,255)',
            RGBA: 'rgba(255,0,255,1)',
            HSL: 'hsl(300,100%,50%)',
            HSLA: 'hsla(300,100%,50%,1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0%,100%,0%,0%)',
            CMYKA: 'device-cmyk(0%,100%,0%,0%,1)',
            isDefault: false
        },
        {
            options: { legacyCSS: false },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { spacesAfterCommas: true },
            extraOptions: { legacyCSS: true },
            RGB: 'rgb(255, 0, 255)',
            RGBA: 'rgba(255, 0, 255, 1)',
            HSL: 'hsl(300, 100%, 50%)',
            HSLA: 'hsla(300, 100%, 50%, 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0%, 100%, 0%, 0%)',
            CMYKA: 'device-cmyk(0%, 100%, 0%, 0%, 1)',
            isDefault: false
        },
        {
            options: { spacesAfterCommas: false },
            extraOptions: { legacyCSS: true },
            RGB: 'rgb(255,0,255)',
            RGBA: 'rgba(255,0,255,1)',
            HSL: 'hsl(300,100%,50%)',
            HSLA: 'hsla(300,100%,50%,1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0%,100%,0%,0%)',
            CMYKA: 'device-cmyk(0%,100%,0%,0%,1)',
            isDefault: true
        },
        {
            options: { anglesUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { anglesUnit: 'deg' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300deg 100% 50%)',
            HSLA: 'hsl(300deg 100% 50% / 1)',
            HWB: 'hwb(300deg 0% 0%)',
            HWBA: 'hwb(300deg 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357deg)',
            LCHA: 'lch(60.169696 111.407731 327.109357deg / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'grad' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(333.333333grad 100% 50%)',
            HSLA: 'hsl(333.333333grad 100% 50% / 1)',
            HWB: 'hwb(333.333333grad 0% 0%)',
            HWBA: 'hwb(333.333333grad 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 363.454841grad)',
            LCHA: 'lch(60.169696 111.407731 363.454841grad / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'rad' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(5.235988rad 100% 50%)',
            HSLA: 'hsl(5.235988rad 100% 50% / 1)',
            HWB: 'hwb(5.235988rad 0% 0%)',
            HWBA: 'hwb(5.235988rad 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 5.709135rad)',
            LCHA: 'lch(60.169696 111.407731 5.709135rad / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { anglesUnit: 'turn' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(0.833333turn 100% 50%)',
            HSLA: 'hsl(0.833333turn 100% 50% / 1)',
            HWB: 'hwb(0.833333turn 0% 0%)',
            HWBA: 'hwb(0.833333turn 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 0.908637turn)',
            LCHA: 'lch(60.169696 111.407731 0.908637turn / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { rgbUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { rgbUnit: 'percent' },
            RGB: 'rgb(100% 0% 100%)',
            RGBA: 'rgb(100% 0% 100% / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { labUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { labUnit: 'percent' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696% 74.84002% -48.398845%)',
            CIELabA: 'lab(60.169696% 74.84002% -48.398845% / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { lchUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { lchUnit: 'percent' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696% 74.271821% 327.109357)',
            LCHA: 'lch(60.169696% 74.271821% 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { cmykUnit: 'percent' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { cmykUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0 1 0 0)',
            CMYKA: 'device-cmyk(0 1 0 0 / 1)',
            isDefault: false
        },
        {
            options: { alphaUnit: 'none' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        },
        {
            options: { alphaUnit: 'percent' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 100%)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 100%)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 100%)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 100%)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 100%)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 100%)',
            isDefault: false
        },
        {
            options: { cmykFunction: 'cmyk' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'cmyk(0% 100% 0% 0%)',
            CMYKA: 'cmyk(0% 100% 0% 0% / 1)',
            isDefault: false
        },
        {
            options: { cmykFunction: 'device-cmyk' },
            RGB: 'rgb(255 0 255)',
            RGBA: 'rgb(255 0 255 / 1)',
            HSL: 'hsl(300 100% 50%)',
            HSLA: 'hsl(300 100% 50% / 1)',
            HWB: 'hwb(300 0% 0%)',
            HWBA: 'hwb(300 0% 0% / 1)',
            CIELab: 'lab(60.169696 93.550025 -60.498556)',
            CIELabA: 'lab(60.169696 93.550025 -60.498556 / 1)',
            LCH: 'lch(60.169696 111.407731 327.109357)',
            LCHA: 'lch(60.169696 111.407731 327.109357 / 1)',
            CMYK: 'device-cmyk(0% 100% 0% 0%)',
            CMYKA: 'device-cmyk(0% 100% 0% 0% / 1)',
            isDefault: true
        }
    ];

    TEST_CASES.forEach((testCase: TestCase): void => {

        const {
            options,
            extraOptions = {},
            RGB,
            RGBA,
            HSL,
            HSLA,
            HWB,
            HWBA,
            CIELab,
            CIELabA,
            LCH,
            LCHA,
            CMYK,
            CMYKA,
            isDefault
        } = testCase;

        it(`Check ${JSON.stringify(options)}`, () => {
            const mergedOptions = { ...options, ...extraOptions };
            const instance = new ColorTranslator(COLOR, mergedOptions);
            expect(instance.RGB).toBe(RGB);
            expect(instance.RGBA).toBe(RGBA);
            expect(instance.HSL).toBe(HSL);
            expect(instance.HSLA).toBe(HSLA);
            expect(instance.HWB).toBe(HWB);
            expect(instance.HWBA).toBe(HWBA);
            expect(instance.CIELab).toBe(CIELab);
            expect(instance.CIELabA).toBe(CIELabA);
            expect(instance.LCH).toBe(LCH);
            expect(instance.LCHA).toBe(LCHA);
            expect(instance.CMYK).toBe(CMYK);
            expect(instance.CMYKA).toBe(CMYKA);
            expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(RGB);
            expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(RGBA);
            expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(HSL);
            expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(HSLA);
            expect(ColorTranslator.toHWB(COLOR, mergedOptions)).toBe(HWB);
            expect(ColorTranslator.toHWBA(COLOR, mergedOptions)).toBe(HWBA);
            expect(ColorTranslator.toCIELab(COLOR, mergedOptions)).toBe(CIELab);
            expect(ColorTranslator.toCIELabA(COLOR, mergedOptions)).toBe(CIELabA);
            expect(ColorTranslator.toLCH(COLOR, mergedOptions)).toBe(LCH);
            expect(ColorTranslator.toLCHA(COLOR, mergedOptions)).toBe(LCHA);
            expect(ColorTranslator.toCMYK(COLOR, mergedOptions)).toBe(CMYK);
            expect(ColorTranslator.toCMYKA(COLOR, mergedOptions)).toBe(CMYKA);
        });

        if (isDefault) {

            const key: keyof Options = Object.keys(options)[0] as keyof Options;
            const { [key]: defaultProp, ...defaultOptions } = { ...DEFAULT_OPTIONS };

            it(`Check default value of ${key}:${defaultProp}`, () => {
                const mergedOptions = { ...defaultOptions, ...extraOptions };
                const instance = new ColorTranslator(COLOR, mergedOptions);
                expect(instance.RGB).toBe(RGB);
                expect(instance.RGBA).toBe(RGBA);
                expect(instance.HSL).toBe(HSL);
                expect(instance.HSLA).toBe(HSLA);
                expect(instance.HWB).toBe(HWB);
                expect(instance.HWBA).toBe(HWBA);
                expect(instance.CIELab).toBe(CIELab);
                expect(instance.CIELabA).toBe(CIELabA);
                expect(instance.LCH).toBe(LCH);
                expect(instance.LCHA).toBe(LCHA);
                expect(instance.CMYK).toBe(CMYK);
                expect(instance.CMYKA).toBe(CMYKA);
                expect(ColorTranslator.toRGB(COLOR, mergedOptions)).toBe(RGB);
                expect(ColorTranslator.toRGBA(COLOR, mergedOptions)).toBe(RGBA);
                expect(ColorTranslator.toHSL(COLOR, mergedOptions)).toBe(HSL);
                expect(ColorTranslator.toHSLA(COLOR, mergedOptions)).toBe(HSLA);
                expect(ColorTranslator.toHWB(COLOR, mergedOptions)).toBe(HWB);
                expect(ColorTranslator.toHWBA(COLOR, mergedOptions)).toBe(HWBA);
                expect(ColorTranslator.toCIELab(COLOR, mergedOptions)).toBe(CIELab);
                expect(ColorTranslator.toCIELabA(COLOR, mergedOptions)).toBe(CIELabA);
                expect(ColorTranslator.toLCH(COLOR, mergedOptions)).toBe(LCH);
                expect(ColorTranslator.toLCHA(COLOR, mergedOptions)).toBe(LCHA);
                expect(ColorTranslator.toCMYK(COLOR, mergedOptions)).toBe(CMYK);
                expect(ColorTranslator.toCMYKA(COLOR, mergedOptions)).toBe(CMYKA);
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

        const HSL = {
            H: 720,
            S: 100,
            L: 50
        };

        const HWB = {
            H: 450,
            W: 10,
            B: 20
        };

        const LCH = {
            L: 60.169696,
            C: 111.407731,
            H: 327.109357
        };

        const HSL_TEST_CASES = [
            {
                color: `hsl(${HSL.H} ${HSL.S}% ${HSL.L}%)`,
                result: `hsl(0 ${HSL.S}% ${HSL.L}%)`
            },
            {
                color: `hsl(${HSL.H}deg ${HSL.S}% ${HSL.L}%)`,
                result: `hsl(0deg ${HSL.S}% ${HSL.L}%)`
            },
            {
                color: `hsl(${HSL.H}grad ${HSL.S}% ${HSL.L}%)`,
                result: `hsl(320grad ${HSL.S}% ${HSL.L}%)`
            },
            {
                color: `hsl(${HSL.H}turn ${HSL.S}% ${HSL.L}%)`,
                result: `hsl(0turn ${HSL.S}% ${HSL.L}%)`
            },
            {
                color: `hsl(${HSL.H}rad ${HSL.S}% ${HSL.L}%)`,
                result: `hsl(3.716875rad ${HSL.S}% ${HSL.L}%)`
            }
        ];

        const HWB_TEST_CASES = [
            {
                color: `hwb(${HWB.H} ${HWB.W}% ${HWB.B}%)`,
                result: `hwb(90 ${HWB.W}% ${HWB.B}%)`
            },
            {
                color: `hwb(${HWB.H}deg ${HWB.W}% ${HWB.B}%)`,
                result: `hwb(90deg ${HWB.W}% ${HWB.B}%)`
            },
            {
                color: `hwb(${HWB.H}grad ${HWB.W}% ${HWB.B}%)`,
                result: `hwb(50grad ${HWB.W}% ${HWB.B}%)`
            },
            {
                color: `hwb(${HWB.H}turn ${HWB.W}% ${HWB.B}%)`,
                result: `hwb(0turn ${HWB.W}% ${HWB.B}%)`
            },
            {
                color: `hwb(${HWB.H}rad ${HWB.W}% ${HWB.B}%)`,
                result: `hwb(3.893843rad ${HWB.W}% ${HWB.B}%)`
            }
        ];

        const LCH_TEST_CASES = [
            {
                color: `lch(${LCH.L} ${LCH.C} ${LCH.H})`,
                regexp: /^lch\(\d+\.\d+ \d+\.\d+ \d+\.\d+\)$/
            },
            {
                color: `lch(${LCH.L} ${LCH.C} ${LCH.H}deg)`,
                regexp: /^lch\(\d+\.\d+ \d+\.\d+ \d+\.\d+deg\)$/
            },
            {
                color: `lch(${LCH.L} ${LCH.C} ${LCH.H}grad)`,
                regexp: /^lch\(\d+\.\d+ \d+\.\d+ \d+\.\d+grad\)$/
            },
            {
                color: `lch(${LCH.L} ${LCH.C} ${LCH.H}rad)`,
                regexp: /^lch\(\d+\.\d+ \d+\.\d+ \d+\.\d+rad\)$/
            },
            {
                color: `lch(${LCH.L} ${LCH.C} ${LCH.H}turn)`,
                regexp: /^lch\(\d+\.\d+ \d+\.\d+ \d+\.\d+turn\)$/
            }
        ];

        HSL_TEST_CASES.forEach((testCase): void => {
            const instance = new ColorTranslator(testCase.color);
            expect(instance.HSL).toBe(testCase.result);
            expect(ColorTranslator.toHSL(testCase.color)).toBe(testCase.result);
        });

        HWB_TEST_CASES.forEach((testCase): void => {
            const instance = new ColorTranslator(testCase.color);
            expect(instance.HWB).toBe(testCase.result);
            expect(ColorTranslator.toHWB(testCase.color)).toBe(testCase.result);
        });

        LCH_TEST_CASES.forEach((testCase): void => {
            const instance = new ColorTranslator(testCase.color);
            expect(instance.LCH).toMatch(testCase.regexp);
            expect(ColorTranslator.toLCH(testCase.color)).toMatch(testCase.regexp);
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

    it(`labUnit auto detection`, () => {

        const instancePercentage = new ColorTranslator('lab(54% 64% 55%)');

        const REG_PERCENT = /(\d+)(\.\d+)?%/g;

        expect(instancePercentage.CIELab.match(REG_PERCENT)).toHaveLength(3);
        expect(instancePercentage.CIELabA.match(REG_PERCENT)).toHaveLength(3);

        const instanceNone = new ColorTranslator('lab(54 80 70)');

        expect(instanceNone.CIELab.includes('%')).toBe(false);
        expect(instanceNone.CIELabA.includes('%')).toBe(false);

    });

    it(`lchUnit auto detection`, () => {

        const instancePercentage = new ColorTranslator('lch(60.169696% 74.271821% 327.109357)');

        const REG_PERCENT = /^lch\(\d+\.\d+% \d+\.\d+% \d+\.\d+\)$/;
        const ALPHA_REG_PERCENT = /^lch\(\d+\.\d+% \d+\.\d+% \d+\.\d+ \/ \d\)$/;

        expect(instancePercentage.LCH).toMatch(REG_PERCENT);
        expect(instancePercentage.LCHA).toMatch(ALPHA_REG_PERCENT);

        const instanceNone = new ColorTranslator('lch(60.169696 74.271821% 327.109357)');

        expect(instanceNone.LCH.includes('%')).toBe(false);
        expect(instanceNone.LCHA.includes('%')).toBe(false);

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
        expect(instanceAlphaNone.HWBA).toBe('hwb(300 0% 0% / 0.5)');
        expect(instanceAlphaNone.RGBA).toBe('rgb(255 0 255 / 0.5)');
        expect(instanceAlphaNone.LCHA).toMatch(regNone);
        expect(instanceAlphaNone.CMYKA).toMatch(regNone);

        const instanceAlphaPercentage = new ColorTranslator('rgb(255 0 255 / 50%)');

        expect(instanceAlphaPercentage.HSLA).toBe('hsl(300 100% 50% / 50%)');
        expect(instanceAlphaPercentage.HWBA).toBe('hwb(300 0% 0% / 50%)');
        expect(instanceAlphaPercentage.RGBA).toBe('rgb(255 0 255 / 50%)');
        expect(instanceAlphaPercentage.LCHA).toMatch(regPercent);
        expect(instanceAlphaPercentage.CMYKA).toMatch(regPercent);

        expect(ColorTranslator.toHSLA('rgb(255 0 255 / 0.5)')).toBe('hsl(300 100% 50% / 0.5)');
        expect(ColorTranslator.toHWBA('rgb(255 0 255 / 0.5)')).toBe('hwb(300 0% 0% / 0.5)');
        expect(ColorTranslator.toRGBA('rgb(255 0 255 / 0.5)')).toBe('rgb(255 0 255 / 0.5)');
        expect(ColorTranslator.toLCHA('rgb(255 0 255 / 0.5)')).toMatch(regNone);
        expect(ColorTranslator.toCMYKA('rgb(255 0 255 / 0.5)')).toMatch(regNone);

        expect(ColorTranslator.toHSLA('rgb(255 0 255 / 80%)')).toBe('hsl(300 100% 50% / 80%)');
        expect(ColorTranslator.toHWBA('rgb(255 0 255 / 80%)')).toBe('hwb(300 0% 0% / 80%)');
        expect(ColorTranslator.toRGBA('rgb(255 0 255 / 5%)')).toBe('rgb(255 0 255 / 5%)');
        expect(ColorTranslator.toLCHA('rgb(255 0 255 / 50%)')).toMatch(regPercent);
        expect(ColorTranslator.toCMYKA('rgb(255 0 255 / 50%)')).toMatch(regPercent);

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
                labUnit: 'percentage',
                // @ts-ignore
                lchUnit: 'null',
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