import { NumberOrString } from '@types';
import { PCENT, HEX } from '#constants';

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
    const hex = parseInt(`${number}`).toString(16).toUpperCase();
    if (hex.length === 1) { return `0x0${hex}`; }
    return `0x${hex}`;
};

//---Convert to final hexadecimal
export const toHEX = (h: number | string): string => {
    let hex = parseInt(`${h}`).toString(16).toUpperCase();
    if (hex.length === 1) {
        hex = `0${hex}`;
    }
    return hex;
};

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
            ? parseInt(color) / 255
            : parseInt(color);
    }
    return Math.min(+color, alpha ? 1 : 255);
};


//---Calculate a decimal 0-1 value from CMYK value
export const getCMYKNumber = (color: string): number => Math.min(PCENT.test(color) ? +(color.replace(PCENT, '$1')) / 100 : +color, 1);

//---Return an ordered string from an array values
export const getOrderedArrayString = (keys: string[]): string => keys.sort().join().toUpperCase();

//---Round value
export const round = (value: NumberOrString, decimals = 0): number => {
    const exp = Math.pow(10, decimals);
    return Math.round(+value * exp) / exp;
};

//---Minimum and maximum
export const minmax = (n: number, min: number, max: number): number => Math.max(min, Math.min(n, max));