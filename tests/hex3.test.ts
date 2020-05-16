import { HEX3, ColorProps, ColorTranslator } from './data/data';

const hex3Props = ['hex', 'hexObject', 'hexa', 'hexaObject', 'hexObjectPercent', 'rgbPercent'];

HEX3.forEach((item: ColorProps): void => {

    // Iterate over the color models
    hex3Props.forEach((prop: keyof ColorProps): void => {

        describe(`ColorTranslator dynamic test for the HEX3 color: ${JSON.stringify(item[prop])}`, (): void => {

            it('CSS RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop])).toBe(item.rgb);
            });

            it('Object RGB', (): void => {
                expect(ColorTranslator.toRGB(item[prop], false)).toMatchObject(item.rgbObject);
            });

            it('CSS RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop])).toBe(item.rgba);
            });

            it('Object RGBA', (): void => {
                expect(ColorTranslator.toRGBA(item[prop], false)).toMatchObject(item.rgbaObject);
            });

            it('CSS HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop])).toBe(item.hsl);
            });

            it('Object HSL', (): void => {
                expect(ColorTranslator.toHSL(item[prop], false)).toMatchObject(item.hslObject);
            });

            it('CSS HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop])).toBe(item.hsla);
            });

            it('Object HSLA', (): void => {
                expect(ColorTranslator.toHSLA(item[prop], false)).toMatchObject(item.hslaObject);
            });

        });

    });
});