import { NumberOrString, Options } from '@types';
import {
    PCENT,
    HEX,
    MAX_DECIMALS,
    DEFAULT_OPTIONS
} from '#constants';

//---Has property
export const hasProp = <T>(obj: T, prop: string): boolean => Object.prototype.hasOwnProperty.call(obj, prop);

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

//--Radian to grades
export const grades = (radian: number): number => radian * 180 / Math.PI;

export const parseOptions = (options: Partial<Options>): Options => ({
    ...DEFAULT_OPTIONS,
    ...options
});