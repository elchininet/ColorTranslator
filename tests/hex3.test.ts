import { ColorTranslator } from '../src';
import { HEX3 } from './tests.constants';

type HexProps = typeof HEX3[0];
type Props = Exclude<keyof HexProps, 'keyword'>;

const hex3Props: Props[] = ['hex', 'hexObject', 'hexa', 'hexaObject', 'hexObjectPercent', 'rgbPercent'];

HEX3.forEach((item: HexProps): void => {

    // Iterate over the color models
    hex3Props.forEach((prop: Props): void => {

        describe(`ColorTranslator dynamic test for the HEX3 color: ${JSON.stringify(item[prop])}`, (): void => {

            it('CSS RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop])).toBe(item.rgb);
                expect(ColorTranslator.toRGB(item.keyword)).toBe(item.rgb);
            });

            it('Object RGB', (): void => {
                expect(ColorTranslator.toRGBObject(item[prop])).toMatchObject(item.rgbObject);
                expect(ColorTranslator.toRGBObject(item.keyword)).toMatchObject(item.rgbObject);
            });

            it('CSS RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop])).toBe(item.rgba);
                expect(ColorTranslator.toRGBA(item.keyword)).toBe(item.rgba);
            });

            it('Object RGBA', (): void => {
                expect(ColorTranslator.toRGBAObject(item[prop])).toMatchObject(item.rgbaObject);
                expect(ColorTranslator.toRGBAObject(item.keyword)).toMatchObject(item.rgbaObject);
            });

            it('CSS HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop])).toBe(item.hsl);
                expect(ColorTranslator.toHSL(item.keyword)).toBe(item.hsl);
            });

            it('Object HSL', (): void => {
                expect(ColorTranslator.toHSLObject(item[prop])).toMatchObject(item.hslObject);
                expect(ColorTranslator.toHSLObject(item.keyword)).toMatchObject(item.hslObject);
            });

            it('CSS HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop])).toBe(item.hsla);
                expect(ColorTranslator.toHSLA(item.keyword)).toBe(item.hsla);
            });

            it('Object HSLA', (): void => {
                expect(ColorTranslator.toHSLAObject(item[prop])).toMatchObject(item.hslaObject);
                expect(ColorTranslator.toHSLAObject(item.keyword)).toMatchObject(item.hslaObject);
            });

        });

    });

});