import { COLORS, FUNCTIONS, ColorProps } from './data/data';
import { HSLObject } from '../src/@types';

type Props = Exclude<keyof typeof COLORS[0], 'keyword'>;

// Test HSL Objects
const hslTo: Props[] = ['rgb', 'rgbObject', 'rgba', 'rgbaObject', 'hex', 'hexObject', 'hexa', 'hexaObject'];

COLORS.forEach((item: ColorProps): void => {

    describe('HSL Object tests', (): void => {

        const hsl = { ...item.hslObject as HSLObject };
        const hsla = { ...item.hslaObject as HSLObject };
        const hslPercentages = { ...hsl, s: hsl.s + '%', l: hsl.l + '%' };
        const hslaPercentages = { ...hsla, s: hsla.s + '%', l: hsla.l + '%' };
        const hslBigHue = { ...hsl, h: hsl.h + 360 };
        const hslaBigHue = { ...hsl, h: hsl.h + 360 };
        const hslLowHue = { ...hsl, h: hsl.h - 360 };
        const hslaLowHue = { ...hsl, h: hsl.h - 360 };

        hslTo.forEach((prop: Props): void => {

            const functionCall = FUNCTIONS[prop].func;
            const cssProps = FUNCTIONS[prop].css;

            it(`HSL Objects with percentages ${JSON.stringify(hslPercentages)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslPercentages, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslPercentages, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects with percentages ${JSON.stringify(hslaPercentages)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaPercentages, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaPercentages, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSL Objects big hue ${JSON.stringify(hslBigHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslBigHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslBigHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects big hue ${JSON.stringify(hslaBigHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaBigHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaBigHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSL Objects low hue ${JSON.stringify(hslLowHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslLowHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslLowHue, false)).toMatchObject(item[prop]);
                }

            });

            it(`HSLA Objects low hue ${JSON.stringify(hslaLowHue)} => ${JSON.stringify(item[prop])}`, (): void => {

                if (cssProps) {
                    expect(functionCall(hslaLowHue, true)).toBe(item[prop]);
                } else {
                    expect(functionCall(hslaLowHue, false)).toMatchObject(item[prop]);
                }

            });

        });

    });

});