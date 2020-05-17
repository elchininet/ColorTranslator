import { CMYK, CMYKProps, ColorTranslator } from './data/data';

CMYK.forEach((item: CMYKProps): void => {
    describe('ColorTranslator CMYK tests', (): void => {

        const hex = ColorTranslator.toHEX(item.rgb);
        const instanceRGB = new ColorTranslator(item.rgb);
        const instanceCMYK = new ColorTranslator(item.cmyk);
        const instanceCMYKInt = new ColorTranslator(item.cmykint);

        it(`${item.rgb} => ${item.cmyk}`, (): void => {
            expect(ColorTranslator.toCMYK(item.rgb)).toBe(item.cmyk);
        });
        it(`${item.rgb} => ${item.cmyk} Object`, (): void => {
            expect(ColorTranslator.toCMYK(item.rgb, false)).toMatchObject(item.cmykIntObject100);
        });
        it(`${item.cmyk} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmyk)).toBe(hex);
        });
        it(`${item.cmykint} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykint)).toBe(hex);
        });
        it(`${JSON.stringify(item.cmykObject)} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykObject)).toBe(hex);
        });
        it(`${JSON.stringify(item.cmykIntObject)} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykIntObject)).toBe(hex);
        });
        it(`${JSON.stringify(item.cmykIntObject100)} => ${hex}`, (): void => {
            expect(ColorTranslator.toHEX(item.cmykIntObject100)).toBe(hex);
        });
        it(`${JSON.stringify(item.cmyk)} same output`, (): void => {
            expect(ColorTranslator.toCMYK(item.cmyk)).toBe(item.cmyk);
        });
        it(`${JSON.stringify(item.cmykIntObject100)} same output`, (): void => {
            expect(ColorTranslator.toCMYK(item.cmykIntObject100, false)).toMatchObject(item.cmykIntObject100);
        });
        it(`${JSON.stringify(item.rgb)} instance CMYK property`, (): void => {
            expect(instanceRGB.CMYK).toBe(item.cmyk);
        });
        it(`${JSON.stringify(item.rgb)} instance CMYKObject property`, (): void => {
            expect(instanceRGB.CMYKObject).toMatchObject(item.cmykIntObject100);
        });
        it(`${JSON.stringify(item.cmyk)} instance CMYK property`, (): void => {
            expect(instanceCMYK.CMYK).toBe(item.cmyk);
        });
        it(`${JSON.stringify(item.cmyk)} instance CMYKObject property`, (): void => {
            expect(instanceCMYK.CMYKObject).toMatchObject(item.cmykIntObject100);
        });
        it(`${JSON.stringify(item.cmykint)} instance CMYK property`, (): void => {
            expect(instanceCMYKInt.CMYK).toBe(item.cmyk);
        });
        it(`${JSON.stringify(item.cmykint)} instance CMYKObject property`, (): void => {
            expect(instanceCMYKInt.CMYKObject).toMatchObject(item.cmykIntObject100);
        });
    });
});