import {
    AnglesUnitEnum,
    AngleUnitRegExpMatchArray,
    InputOptions,
    NumberOrString
} from '@types';
import {
    Harmony,
    HarmonyString,
    HEX,
    HSL_HUE,
    MAX_DECIMALS,
    Mix,
    MixString,
    PCENT
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

        const matches = hue.match(HSL_HUE) as AngleUnitRegExpMatchArray;
        const groups = matches.groups;
        const value = +groups.number;
        const units = groups.units as AnglesUnitEnum;
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

//---Normalize alpha
export const normalizeAlpha = (alpha: number | string | undefined | null): number => {
    if (typeof alpha === 'string') {
        if(PCENT.test(alpha)) {
            alpha = percentNumber(alpha) / 100;
        } else {
            alpha = +alpha;
        }
    }
    return (isNaN(+alpha) || alpha > 1) ? 1 : round(alpha);
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

export const isHarmony = (param: HarmonyString | MixString | InputOptions): param is HarmonyString => {
    return `${param}` in Harmony;
};

export const isMix = (param: MixString | InputOptions): param is MixString => {
    return `${param}` in Mix;
};