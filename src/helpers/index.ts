import { NumberOrString } from '@types';
import { PCENT, HEX, MAX_DECIMALS } from '#constants';

//---Has property
export const hasProp = <T>(obj: T, prop: string): boolean => Object.prototype.hasOwnProperty.call(obj, prop);

//---Get a percentage
export const percent = (percent: NumberOrString): number => PCENT.test(`${percent}`)
    ? +(`${percent}`.replace(PCENT, '$1'))
    : Math.min(+percent, 100);

//---Convert to decimal
export const getDEC = (hex: string): number => {
    if (hex.length === 1) { hex += hex; }
    return parseInt(hex, 16);
};

//---Convert to hexadecimal
export const getHEX = (number: NumberOrString): string => {
    const hex = round(number).toString(16).toUpperCase();
    if (hex.length === 1) { return `0x0${hex}`; }
    return `0x${hex}`;
};

//---Convert to final hexadecimal
export const toHEX = (h: NumberOrString): string => {
    let hex = round(h).toString(16).toUpperCase();
    if (hex.length === 1) {
        hex = `0${hex}`;
    }
    return hex;
};

//---Convert all to final hexadecimal
export const toHEXAll = (values: NumberOrString[]): string[] =>
    values.map(value => toHEX(value));

//---Calculate a decimal 255 from an RGB color
export const getBase255Number = (color: string, alpha = false): number => {
    if (!alpha && PCENT.test(color)) {
        return Math.min(255 * +(color.replace(PCENT, '$1')) / 100, 255);
    }
    if (HEX.test(color)) {
        if (color.length === 3) {
            return alpha
                ? parseInt(color + color.slice(-1)) / 255
                : parseInt(color + color.slice(-1));
        }
        return alpha
            ? round(color, MAX_DECIMALS) / 255
            : round(color, MAX_DECIMALS);
    }
    return Math.min(+color, alpha ? 1 : 255);
};


//---Calculate a decimal 0-1 value from CMYK value
export const getCMYKNumber = (color: string): number => Math.min(PCENT.test(color) ? +(color.replace(PCENT, '$1')) / 100 : +color, 1);

//---Return an ordered string from an array values
export const getOrderedArrayString = (keys: string[]): string => {
    const resultKeys = [...keys];
    resultKeys.sort();
    return resultKeys.join('').toUpperCase();
};

//---Round value
export const round = (value: NumberOrString, decimals = 0): number => {
    const exp = Math.pow(10, decimals);
    return Math.round(+value * exp) / exp;
};

//---Round all values
export const roundAll = (values: NumberOrString[], decimals = 0): number[] =>
    values.map(value => round(value, decimals));

//---Minimum and maximum
export const minmax = (n: number, min: number, max: number): number => Math.max(min, Math.min(n, max));

//--Radian to grades
export const grades = (radian: number): number => radian * 180 / Math.PI;