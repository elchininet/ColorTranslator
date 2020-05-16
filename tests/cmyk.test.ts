import { CMYK, CMYKProps, ColorTranslator } from './data/data';

CMYK.forEach((item: CMYKProps): void => {
    describe('ColorTranslator basic CMYK tests', (): void => {
        const hex = ColorTranslator.toHEX(item.rgb);
        it(`${item.rgb} => ${item.cmyk}`, (): void => {
            expect(ColorTranslator.toCMYK(item.rgb)).toBe(item.cmyk);
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
    });
});