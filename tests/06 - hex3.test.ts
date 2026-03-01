import { ColorTranslator, InputOptions } from '../src';
import { HEX3 } from './tests.constants';

type HexProps = typeof HEX3[0];
type Props = Exclude<keyof HexProps, 'keyword'>;

const hex3Props: Props[] = ['HEX', 'HEXObject', 'HEXA', 'HEXAObject', 'HEXObjectPercent', 'rgbPercent'];

HEX3.forEach((item: HexProps): void => {

    // Iterate over the color models
    hex3Props.forEach((prop: Props): void => {

        describe(`ColorTranslator dynamic test for the HEX3 color: ${JSON.stringify(item[prop])}`, (): void => {

            const options: InputOptions = { legacyCSS: true };
            const optionsRgbNone: InputOptions = { rgbUnit: 'none' };
            const optionsLegacyRgbNone: InputOptions = { ...options, ...optionsRgbNone };

            it('CSS RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop], optionsRgbNone)).toBe(item.RGB);
                expect(ColorTranslator.toRGB(item.KEYWORD)).toBe(item.RGB);
                expect(ColorTranslator.toRGB(item[prop], optionsLegacyRgbNone)).toBe(item.RGBLegacy);
                expect(ColorTranslator.toRGB(item.KEYWORD, options)).toBe(item.RGBLegacy);
            });

            it('Object RGB', (): void => {
                expect(ColorTranslator.toRGBObject(item[prop])).toEqual(item.RGBObject);
                expect(ColorTranslator.toRGBObject(item.KEYWORD)).toEqual(item.RGBObject);
            });

            it('CSS RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop], optionsRgbNone)).toBe(item.RGBA);
                expect(ColorTranslator.toRGBA(item.KEYWORD)).toBe(item.RGBA);
                expect(ColorTranslator.toRGBA(item[prop], optionsLegacyRgbNone)).toBe(item.RGBALegacy);
                expect(ColorTranslator.toRGBA(item.KEYWORD, options)).toBe(item.RGBALegacy);
            });

            it('Object RGBA', (): void => {
                expect(ColorTranslator.toRGBAObject(item[prop])).toEqual(item.RGBAObject);
                expect(ColorTranslator.toRGBAObject(item.KEYWORD)).toEqual(item.RGBAObject);
            });

            it('CSS HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop])).toBe(item.HSL);
                expect(ColorTranslator.toHSL(item.KEYWORD)).toBe(item.HSL);
                expect(ColorTranslator.toHSL(item[prop], options)).toBe(item.HSLLegacy);
                expect(ColorTranslator.toHSL(item.KEYWORD, options)).toBe(item.HSLLegacy);
            });

            it('Object HSL', (): void => {
                expect(ColorTranslator.toHSLObject(item[prop])).toEqual(item.HSLObject);
                expect(ColorTranslator.toHSLObject(item.KEYWORD)).toEqual(item.HSLObject);
            });

            it('CSS HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop])).toBe(item.HSLA);
                expect(ColorTranslator.toHSLA(item.KEYWORD)).toBe(item.HSLA);
                expect(ColorTranslator.toHSLA(item[prop], options)).toBe(item.HSLALegacy);
                expect(ColorTranslator.toHSLA(item.KEYWORD, options)).toBe(item.HSLALegacy);
            });

            it('Object HSLA', (): void => {
                expect(ColorTranslator.toHSLAObject(item[prop])).toEqual(item.HSLAObject);
                expect(ColorTranslator.toHSLAObject(item.KEYWORD)).toEqual(item.HSLAObject);
            });

        });

    });

});