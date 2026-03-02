import {
    ColorInput,
    InputOptions,
    MatchOptions,
    Options
} from '@types';
import {
    AnglesUnitEnum,
    ColorModel,
    ColorUnitEnum,
    COMMA,
    COMMAS_AND_NEXT_CHARS,
    CMYKFunctionEnum,
    DEFAULT_OPTIONS,
    SPACES
} from '#constants';
import {
    isBoolean,
    isNumber,
    isString
} from '#utilities';
import { ColorParserContext, ColorParser } from '#classes/ColorParserContext';
import { HEXParser } from '#classes/HEXParser';
import { RGBParser } from '#classes/RGBParser';
import { HSLParser } from '#classes/HSLParser';
import { HWBParser } from '#classes/HWBParser';
import { CIELabParser } from '#classes/CIELabParser';
import { LCHParser } from '#classes/LCHParser';
import { CMYKParser } from '#classes/CMYKParser';

export const hexParser = new HEXParser();
export const rgbParser = new RGBParser();
export const hslParser = new HSLParser();
export const hwbParser = new HWBParser();
export const cieLabParser = new CIELabParser();
export const lchParser = new LCHParser();
export const cmykParser = new CMYKParser();

export const colorParserContext = new ColorParserContext(
    new Map<ColorModel, ColorParser>([
        [ColorModel.HEX, hexParser],
        [ColorModel.RGB, rgbParser],
        [ColorModel.HSL, hslParser],
        [ColorModel.HWB, hwbParser],
        [ColorModel.CIELab, cieLabParser],
        [ColorModel.LCH, lchParser],
        [ColorModel.CMYK, cmykParser]
    ])
);

export const getOptionsFromColorInput = (options: InputOptions, ...colors: ColorInput[]): Options => {
    const cssColors: string[] = [];
    const anglesUnits: AnglesUnitEnum[] = [];
    const rgbColors: boolean[] = [];
    const labColors: boolean[] = [];
    const lchColors: boolean[] = [];
    const cmykColors: boolean[] = [];
    const alphaValues: boolean[] = [];
    const anglesUnitValues = Object.values<string>(AnglesUnitEnum);
    const colorUnitValues = Object.values<string>(ColorUnitEnum);
    const cmykFunctionValues = Object.values<string>(CMYKFunctionEnum);

    const matchOptions: MatchOptions = {
        legacyCSS: 0,
        spacesAfterCommas: 0,
        cmykFunction: 0
    };

    for(const color of colors) {

        if (isString(color)) {

            cssColors.push(color);

            if (color.includes(COMMA)) {
                matchOptions.legacyCSS ++;
                const commasWithNextCharacter = color.match(COMMAS_AND_NEXT_CHARS);
                if (
                    new Set(commasWithNextCharacter).size === 1 &&
                    SPACES.test(commasWithNextCharacter[0].slice(1))
                ) {
                    matchOptions.spacesAfterCommas ++;
                }
            }

            if (hslParser.supports(color)) {
                const options = hslParser.getCSSOptions(color);
                anglesUnits.push(options.angleUnit);
                alphaValues.push(options.hasPercentageAlpha);
                continue;
            }

            if (hwbParser.supports(color)) {
                const options = hwbParser.getCSSOptions(color);
                anglesUnits.push(options.angleUnit);
                alphaValues.push(options.hasPercentageAlpha);
                continue;
            }

            if (rgbParser.supports(color)) {
                const options = rgbParser.getCSSOptions(color);
                rgbColors.push(options.hasPercentageValues);
                alphaValues.push(options.hasPercentageAlpha);
                continue;
            }

            if (cieLabParser.supports(color)) {
                const options = cieLabParser.getCSSOptions(color);
                labColors.push(options.hasPercentageValues);
                alphaValues.push(options.hasPercentageAlpha);
                continue;
            }

            if (lchParser.supports(color)) {
                const options = lchParser.getCSSOptions(color);
                anglesUnits.push(options.angleUnit);
                lchColors.push(options.hasPercentageValues);
                alphaValues.push(options.hasPercentageAlpha);
                continue;
            }

            if (cmykParser.supports(color)) {
                const options = cmykParser.getCSSOptions(color);
                cmykColors.push(options.hasPercentageValues);
                if (color.startsWith(CMYKFunctionEnum.CMYK)) {
                    matchOptions.cmykFunction ++;
                }
                alphaValues.push(options.hasPercentageAlpha);
            }

        }

    }
    return {
        decimals: isNumber(options.decimals)
            ? options.decimals
            : DEFAULT_OPTIONS.decimals,
        legacyCSS: isBoolean(options.legacyCSS)
            ? options.legacyCSS
            : Boolean(
                cssColors.length &&
                matchOptions.legacyCSS === cssColors.length
            ) || DEFAULT_OPTIONS.legacyCSS,
        spacesAfterCommas: isBoolean(options.spacesAfterCommas)
            ? options.spacesAfterCommas
            : Boolean(
                cssColors.length &&
                matchOptions.spacesAfterCommas === cssColors.length
            ) || DEFAULT_OPTIONS.spacesAfterCommas,
        anglesUnit: options.anglesUnit && anglesUnitValues.includes(options.anglesUnit)
            ? options.anglesUnit as AnglesUnitEnum
            : (
                new Set(anglesUnits).size === 1
                    ? anglesUnits[0]
                    : DEFAULT_OPTIONS.anglesUnit
            ),
        rgbUnit: options.rgbUnit && colorUnitValues.includes(options.rgbUnit)
            ? options.rgbUnit as ColorUnitEnum
            : (
                new Set(rgbColors).size === 1 && rgbColors[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.rgbUnit
            ),
        labUnit: options.labUnit && colorUnitValues.includes(options.labUnit)
            ? options.labUnit as ColorUnitEnum
            : (
                new Set(labColors).size === 1 && labColors[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.labUnit
            ),
        lchUnit: options.lchUnit && colorUnitValues.includes(options.lchUnit)
            ? options.lchUnit as ColorUnitEnum
            : (
                new Set(lchColors).size === 1 && lchColors[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.lchUnit
            ),
        cmykUnit: options.cmykUnit && colorUnitValues.includes(options.cmykUnit)
            ? options.cmykUnit as ColorUnitEnum
            : (
                new Set(cmykColors).size === 1 && !cmykColors[0]
                    ? ColorUnitEnum.NONE
                    : DEFAULT_OPTIONS.cmykUnit
            ),
        alphaUnit: options.alphaUnit && colorUnitValues.includes(options.alphaUnit)
            ? options.alphaUnit as ColorUnitEnum
            : (
                new Set(alphaValues).size === 1 && alphaValues[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.alphaUnit
            ),
        cmykFunction: options.cmykFunction && cmykFunctionValues.includes(options.cmykFunction)
            ? options.cmykFunction as CMYKFunctionEnum
            : (
                cmykColors.length && cmykColors.length === matchOptions.cmykFunction
                    ? CMYKFunctionEnum.CMYK
                    : DEFAULT_OPTIONS.cmykFunction
            )
    };
};
