import {
    AnglesUnitEnum,
    AngleUnitRegExpMatchArray,
    CIELabObject,
    CMYKFunctionEnum,
    CMYKObject,
    Color,
    ColorInput,
    ColorUnitEnum,
    HSLObject,
    HWBObject,
    InputOptions,
    LCHObject,
    MatchOptions,
    NumberOrString,
    Options,
    RGBObject
} from '@types';
import {
    BASE_255,
    ColorModel,
    COMMAS_AND_NEXT_CHARS,
    DEFAULT_OPTIONS,
    GRADIANS,
    Harmony,
    HarmonyString,
    HEX,
    HSL_HUE,
    MAX_ALPHA,
    MAX_DECIMALS,
    MAX_HUE,
    MAX_LAB,
    MAX_LCH_C,
    Mix,
    MixString,
    PCENT,
    SPACES,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    rgbParser,
    hslParser,
    hwbParser,
    cieLabParser,
    lchParser,
    cmykParser
} from '#parsers';

//---Return an ordered string from an array values
export const getOrderedArrayString = (keys: string[]): string => [...keys].sort().join('').toUpperCase();

// Primitive predicates
export const isString = (input: unknown): input is string => typeof input === 'string';
export const isNumber = (input: unknown): input is number => typeof input === 'number';
export const isBoolean = (input: unknown): input is boolean => typeof input === 'boolean';
export const isUndefined = (input: unknown): input is undefined => input === undefined;

// Color predicates
export const getColorModel = (color: Color): ColorModel => {
    return VALID_COLOR_OBJECTS[
        getOrderedArrayString(Object.keys(color))
    ];
};

export const isRGBObject = (color: Color): color is RGBObject => getColorModel(color) === ColorModel.RGB;
export const isHSLObject = (color: Color): color is HSLObject => getColorModel(color) === ColorModel.HSL;
export const isHWBObject = (color: Color): color is HWBObject => getColorModel(color) === ColorModel.HWB;
export const isCIELabObject = (color: Color): color is CIELabObject => getColorModel(color) === ColorModel.CIELab;
export const isLCHObject = (color: Color): color is LCHObject => getColorModel(color) === ColorModel.LCH;
export const isCMYKObject = (color: Color): color is CMYKObject => getColorModel(color) === ColorModel.CMYK;

//---Get percent number
export const percentNumber = (percent: NumberOrString): number => {
    return +`${percent}`.replace(PCENT, '$1');
};

//---Get a percentage
export const percent = (percent: NumberOrString): number => PCENT.test(`${percent}`)
    ? percentNumber(percent)
    : Math.min(+percent, 100);

//---Convert to decimal
export const getDEC = (hex: string): number => {
    if (hex.length === 1) { hex += hex; }
    return parseInt(hex, 16);
};

//---Convert to hexadecimal
export const getHEX = (number: NumberOrString): string => {
    const hex = round(number, 0).toString(16).toUpperCase();
    if (hex.length === 1) { return `0x0${hex}`; }
    return `0x${hex}`;
};

//---Convert to final hexadecimal
export const toHEX = (h: NumberOrString): string => {
    let hex = round(h, 0).toString(16).toUpperCase();
    if (hex.length === 1) {
        hex = `0${hex}`;
    }
    return hex;
};

//---Convert from decimal 255 to percent
export const from255NumberToPercent = (value: number, decimals: number): number => round(value / BASE_255 * 100, decimals);

//---Convert from decimal 125 to percent
export const from125NumberToPercent = (value: number, decimals: number): number => round(value / MAX_LAB * 100, decimals);

//---Convert from decimal 150 to percent
export const from150NumberToPercent = (value: number, decimals: number): number => round(value / MAX_LCH_C * 100, decimals);

//---Calculate a decimal 255 from an RGB color
export const getBase255Number = (color: string, alpha = false): number => {
    if (!alpha && PCENT.test(color)) {
        return Math.min(BASE_255 * percentNumber(color) / 100, BASE_255);
    }
    if (HEX.test(color)) {
        if (color.length === 3) {
            color += color.slice(-1);
        }
        return alpha
            ? round(color) / BASE_255
            : round(color);
    }
    return Math.min(+color, alpha ? 1 : BASE_255);
};

//---Calculate a decimal 125 from a CIE Lab color
export const getBase125Number = (color: string): number => {
    if (PCENT.test(color)) {
        return minmax(MAX_LAB * percentNumber(color) / 100, -MAX_LAB, MAX_LAB);
    }
    return minmax(+color, -MAX_LAB, MAX_LAB);
};

//---Calculate a decimal 150 from an LCH color
export const getBase150Number = (color: string): number => {
    if (PCENT.test(color)) {
        return minmax(MAX_LCH_C * percentNumber(color) / 100, -MAX_LCH_C, MAX_LCH_C);
    }
    return minmax(+color, -MAX_LCH_C, MAX_LCH_C);
};

//---Calculate a decimal 0-1 value from CMYK value
export const getCMYKNumber = (color: string, base100: boolean): number => {
    const value = PCENT.test(color)
        ? percentNumber(color)
        : +color;
    if (base100) {
        return Math.min(value * 100, 100);
    }
    return Math.min(value, 100);
};

//---Round value
export const round = (value: NumberOrString, decimals = MAX_DECIMALS): number => {
    const exp = Math.pow(10, decimals);
    return Math.round(+value * exp) / exp;
};

//---Minimum and maximum
export const minmax = (n: number, min: number, max: number): number => Math.max(min, Math.min(n, max));

//--Radians to degrees
export const degrees = (radian: number): number => radian * 180 / Math.PI;

//--Degrees to radians
export const radians = (degrees: number): number => degrees * Math.PI / 180;

//---Normalize hue
export const normalizeHue = (hue: number | string): number => {

    if (isString(hue)) {

        const matches = hue.match(HSL_HUE) as AngleUnitRegExpMatchArray;
        const groups = matches.groups;
        const value = +groups.number;
        const units = groups.units as AnglesUnitEnum;
        switch(units) {
            case AnglesUnitEnum.RADIANS:
                hue = round(degrees(value));
                break;
            case AnglesUnitEnum.TURNS:
                hue = round(value * MAX_HUE);
                break;
            case AnglesUnitEnum.GRADIANS:
                hue = round(9 / 10 * value);
                break;
            case AnglesUnitEnum.DEGREES:
            default:
                hue = value;
        }
    }

    if (hue >= MAX_HUE || hue < 0) {
        hue -= Math.floor(hue / MAX_HUE) * MAX_HUE;
    }

    return hue;
};

//---Normalize alpha
export const normalizeAlpha = (alpha: number | string | undefined | null): number => {
    if (isString(alpha)) {
        if(PCENT.test(alpha)) {
            alpha = percentNumber(alpha) / 100;
        } else {
            alpha = +alpha;
        }
    }
    return (isNaN(+alpha) || alpha > MAX_ALPHA) ? MAX_ALPHA : round(alpha);
};

export const translateDegrees = (degrees: number, units: `${AnglesUnitEnum}`): number => {

    let hue: number;

    switch(units) {
        case AnglesUnitEnum.RADIANS:
            hue = round(radians(degrees));
            break;
        case AnglesUnitEnum.TURNS:
            hue = round(degrees / MAX_HUE);
            break;
        case AnglesUnitEnum.GRADIANS:
            hue = round(GRADIANS * degrees);
            break;
        case AnglesUnitEnum.DEGREES:
        case AnglesUnitEnum.NONE:
        default:
            hue = degrees;
    }

    return hue;
};

export const isHarmony = (param: HarmonyString | MixString | InputOptions): param is HarmonyString => {
    return `${param}` in Harmony;
};

export const isMix = (param: MixString | InputOptions): param is MixString => {
    return `${param}` in Mix;
};

export const getAngleUnit = (unit: string | undefined): AnglesUnitEnum => {
    if (unit) {
        const angleUnitMatch = unit.match(HSL_HUE) as AngleUnitRegExpMatchArray;
        const angleUnit = angleUnitMatch.groups.units;
        return angleUnit === ''
            ? AnglesUnitEnum.NONE
            : angleUnit as AnglesUnitEnum;
    }
    return AnglesUnitEnum.NONE;
};

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

            if (color.includes(',')) {
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
                if (color.startsWith('cmyk')) {
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
