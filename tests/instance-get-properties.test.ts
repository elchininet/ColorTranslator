import { ColorTranslator } from '../src';
import { COLORS, CMYK_COLORS } from './tests.constants';

const options = { decimals: 0 };
const legacyOptions = { ...options, legacyCSS: true };

COLORS.forEach((color): void => {

    let instance: ColorTranslator;
    let legacyInstance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator instance properties for ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, options);
            legacyInstance = new ColorTranslator(colorValue, legacyOptions);

            // HEX
            it(`HEX property => ${color.HEX}`, () => {
                expect(instance.HEX).toBe(color.HEX);
            });

            // HEXA
            it(`HEXA property => ${color.HEXA}`, () => {
                expect(instance.HEXA).toBe(color.HEXA);
            });

            // HEXObject
            it(`HEXObject property => ${JSON.stringify(color.HEXObject)}`, () => {
                expect(instance.HEXObject).toMatchObject(color.HEXObject);
            });

            // HEXAObject
            it(`HEXAObject property => ${JSON.stringify(color.HEXAObject)}`, () => {
                expect(instance.HEXAObject).toMatchObject(color.HEXAObject);
            });

            // RGB
            it(`RGB property => ${color.RGB}`, () => {
                expect(instance.RGB).toBe(color.RGB);
                expect(legacyInstance.RGB).toBe(color.RGBLegacy);
            });

            // RGBA
            it(`RGBA property => ${color.RGBA}`, () => {
                expect(instance.RGBA).toBe(color.RGBA);
                expect(legacyInstance.RGBA).toBe(color.RGBALegacy);
            });

            // RGBObject
            it(`RGBObject property => ${JSON.stringify(color.RGBObject)}`, () => {
                expect(instance.RGBObject).toMatchObject(color.RGBObject);
            });

            // RGBAObject
            it(`RGBAObject property => ${JSON.stringify(color.RGBAObject)}`, () => {
                expect(instance.RGBAObject).toMatchObject(color.RGBAObject);
            });

            // HSL
            it(`HSL property => ${color.HSL}`, () => {
                expect(instance.HSL).toBe(color.HSL);
                expect(legacyInstance.HSL).toBe(color.HSLLegacy);
            });

            // HSLA
            it(`HSLA property => ${color.HSLA}`, () => {
                expect(instance.HSLA).toBe(color.HSLA);
                expect(legacyInstance.HSLA).toBe(color.HSLALegacy);
            });

            // HSLObject
            it(`HSLObject property => ${JSON.stringify(color.HSLObject)}`, () => {
                expect(instance.HSLObject).toMatchObject(color.HSLObject);
            });

            // HSLAObject
            it(`HSLAObject property => ${JSON.stringify(color.HSLAObject)}`, () => {
                expect(instance.HSLAObject).toMatchObject(color.HSLAObject);
            });

            // H
            it(`H property => ${color.HSLObject.H}`, () => {
                expect(instance.H).toBe(color.HSLObject.H);
            });

            // S
            it(`S property => ${color.HSLObject.S}`, () => {
                expect(instance.S).toBe(color.HSLObject.S);
            });

            // L
            it(`L property => ${color.HSLObject.L}`, () => {
                expect(instance.L).toBe(color.HSLObject.L);
            });

            // R
            it(`R property => ${color.RGBObject.R}`, () => {
                expect(instance.R).toBe(color.RGBObject.R);
            });

            // G
            it(`G property => ${color.RGBObject.G}`, () => {
                expect(instance.G).toBe(color.RGBObject.G);
            });

            // B
            it(`B property => ${color.RGBObject.B}`, () => {
                expect(instance.B).toBe(color.RGBObject.B);
            });

            // A
            it(`A property => ${color.RGBAObject.A}`, () => {
                expect(instance.A).toBe(color.RGBAObject.A);
            });

        });

    });

});

CMYK_COLORS.forEach((color) => {

    let instance: ColorTranslator;
    let legacyInstance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator CMYK instance properties ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, options);
            legacyInstance = new ColorTranslator(colorValue, legacyOptions);

            // CMYK
            it(`CMYK property => ${color.CMYK}`, () => {
                expect(instance.CMYK).toBe(color.CMYK);
                expect(legacyInstance.CMYK).toBe(color.CMYKLegacy);
            });

            // CMYKA
            it(`CMYKA property => ${color.CMYKWithAlpha}`, () => {
                expect(instance.CMYKA).toBe(color.CMYKWithAlpha);
                expect(legacyInstance.CMYKA).toBe(color.CMYKLegacyWithAlpha);
            });

            // CMYKObject
            it(`CMYKObject property => ${JSON.stringify(color.CMYKIntObject100)}`, () => {
                expect(instance.CMYKObject).toMatchObject(color.CMYKIntObject100);
            });

            // CMYKAObject
            it(`CMYKAObject property => ${JSON.stringify(color.CMYKIntObject100WithAlpha)}`, () => {
                expect(instance.CMYKAObject).toMatchObject(color.CMYKIntObject100WithAlpha);
            });

            // C
            it(`C property => ${color.CMYKIntObject100.C}`, () => {
                expect(instance.C).toBe(color.CMYKIntObject100.C);
            });

            // M
            it(`M property => ${color.CMYKIntObject100.M}`, () => {
                expect(instance.M).toBe(color.CMYKIntObject100.M);
            });

            // Y
            it(`Y property => ${color.CMYKIntObject100.Y}`, () => {
                expect(instance.Y).toBe(color.CMYKIntObject100.Y);
            });

            // K
            it(`K property => ${color.CMYKIntObject100.K}`, () => {
                expect(instance.K).toBe(color.CMYKIntObject100.K);
            });

        });

    });

});