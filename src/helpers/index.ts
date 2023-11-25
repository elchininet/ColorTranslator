import {
    Options,
    InputOptions,
    NumberOrString,
    ColorInput,
    AnglesUnitEnum,
    ColorUnitEnum,
    CMYKFunctionEnum
} from '@types';
import {
    PCENT,
    HEX,
    MAX_DECIMALS,
    DEFAULT_OPTIONS,
    COMMAS_AND_NEXT_CHARS,
    SPACES,
    COLORREGS,
    HSL_HUE,
    TypeOf
} from '#constants';

//---Has property
export const hasProp = <T extends object, K = keyof T>(obj: T, prop: K): boolean => Object.prototype.hasOwnProperty.call(obj, prop);

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
export const from255NumberToPercent = (value: number, decimals: number): number => round(value / 255 * 100, decimals);

//---Convert from decimal 125 to percent
export const from125NumberToPercent = (value: number, decimals: number): number => round(value / 125 * 100, decimals);

//---Calculate a decimal 255 from an RGB color
export const getBase255Number = (color: string, alpha = false): number => {
    if (!alpha && PCENT.test(color)) {
        return Math.min(255 * percentNumber(color) / 100, 255);
    }
    if (HEX.test(color)) {
        if (color.length === 3) {
            color += color.slice(-1);
        }
        return alpha
            ? round(color) / 255
            : round(color);
    }
    return Math.min(+color, alpha ? 1 : 255);
};

//---Calculate a decimal 125 from an CIE Lab color
export const getBase125Number = (color: string): number => {
    if (PCENT.test(color)) {
        return minmax(125 * percentNumber(color) / 100, -125, 125);
    }
    return minmax(+color, -125, 125);
};

//---Calculate a decimal 0-1 value from CMYK value
export const getCMYKNumber = (color: string): number => Math.min(PCENT.test(color) ? percentNumber(color) / 100 : +color, 1);

//---Return an ordered string from an array values
export const getOrderedArrayString = (keys: string[]): string => [...keys].sort().join('').toUpperCase();

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
const pi2 = 360;

export const normalizeHue = (hue: number | string): number => {

    if (typeof hue === 'string') {

        const matches = hue.match(HSL_HUE) as string[];
        const value = +matches[1];
        const units = matches[2] as AnglesUnitEnum;
        switch(units) {
            case AnglesUnitEnum.RADIANS:
                hue = round(degrees(value));
                break;
            case AnglesUnitEnum.TURNS:
                hue = round(value * pi2);
                break;
            case AnglesUnitEnum.GRADIANS:
                hue = round(9 / 10 * value);
                break;
            case AnglesUnitEnum.DEGREES:
            default:
                hue = value;
        }
    }

    if (hue > 360 || hue < 0) {
        hue -= Math.floor(hue / pi2) * pi2;
    }

    return hue;
};

export const translateDegrees = (degrees: number, units: AnglesUnitEnum): number => {

    let hue: number;

    switch(units) {
        case AnglesUnitEnum.RADIANS:
            hue = round(radians(degrees));
            break;
        case AnglesUnitEnum.TURNS:
            hue = round(degrees / pi2);
            break;
        case AnglesUnitEnum.GRADIANS:
            hue = round(10 / 9 * degrees);
            break;
        case AnglesUnitEnum.DEGREES:
        case AnglesUnitEnum.NONE:
        default:
            hue = degrees;
    }

    return hue;
};

type MatchOptions = {
    [K in keyof Pick<Options, 'legacyCSS' | 'spacesAfterCommas' | 'cmykFunction'>]: number;
};

export const getOptionsFromColorInput = (options: InputOptions, ...colors: ColorInput[]): Options => {
    const cssColors: string[] = [];
    const hslColors: AnglesUnitEnum[] = [];
    const rgbColors: boolean[] = [];
    const labColors: boolean[] = [];
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

        if (typeof color === 'string') {

            cssColors.push(color);

            if (color.includes(',')){
                matchOptions.legacyCSS ++;
                const commasWithNextCharacter = color.match(COMMAS_AND_NEXT_CHARS);
                if (
                    new Set(commasWithNextCharacter).size === 1 &&
                    SPACES.test(commasWithNextCharacter[0].slice(1))
                ) {
                    matchOptions.spacesAfterCommas ++;
                }
            }

            if (color.match(COLORREGS.HSL)) {
                const match = color.match(COLORREGS.HSL);
                const angle = match[1] || match[5];
                const alpha = match[8];
                const angleUnit = angle.match(HSL_HUE)[2];
                hslColors.push(
                    angleUnit === ''
                        ? AnglesUnitEnum.NONE
                        : angleUnit as AnglesUnitEnum
                );
                alphaValues.push(
                    PCENT.test(alpha)
                );
                continue;
            }

            if (COLORREGS.RGB.test(color)) {
                const match = color.match(COLORREGS.RGB);
                const R = match[1] || match[5];
                const G = match[2] || match[6];
                const B = match[3] || match[7];
                const A = match[8];
                rgbColors.push(
                    PCENT.test(R) &&
                    PCENT.test(G) &&
                    PCENT.test(B)
                );
                alphaValues.push(
                    PCENT.test(A)
                );
                continue;
            }

            if (COLORREGS.CIELab.test(color)) {
                const match = color.match(COLORREGS.CIELab);
                const L = match[1];
                const a = match[2];
                const b = match[3];
                const A = match[4];
                labColors.push(
                    PCENT.test(L) &&
                    PCENT.test(a) &&
                    PCENT.test(b)
                );
                alphaValues.push(
                    PCENT.test(A)
                );
                continue;
            }

            if (color.match(COLORREGS.CMYK)) {
                const match = color.match(COLORREGS.CMYK);
                const C = match[1] || match[6];
                const M = match[2] || match[7];
                const Y = match[3] || match[8];
                const K = match[4] || match[9];
                const A = match[10];
                cmykColors.push(
                    PCENT.test(C) &&
                    PCENT.test(M) &&
                    PCENT.test(Y) &&
                    PCENT.test(K)
                );
                if (color.startsWith('cmyk')) {
                    matchOptions.cmykFunction ++;
                }
                alphaValues.push(
                    PCENT.test(A)
                );
            }

        }

    }
    return {
        decimals: typeof options.decimals === TypeOf.NUMBER
            ? options.decimals
            : DEFAULT_OPTIONS.decimals,
        legacyCSS: typeof options.legacyCSS === TypeOf.BOOLEAN
            ? options.legacyCSS
            : Boolean(
                cssColors.length &&
                matchOptions.legacyCSS === cssColors.length
            ) || DEFAULT_OPTIONS.legacyCSS,
        spacesAfterCommas: typeof options.spacesAfterCommas === TypeOf.BOOLEAN
            ? options.spacesAfterCommas
            : Boolean(
                cssColors.length &&
                matchOptions.spacesAfterCommas === cssColors.length
            ) || DEFAULT_OPTIONS.spacesAfterCommas,
        anglesUnit: options.anglesUnit && anglesUnitValues.includes(options.anglesUnit)
            ? options.anglesUnit as AnglesUnitEnum
            : (
                new Set(hslColors).size === 1
                    ? hslColors[0]
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