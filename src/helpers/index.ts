import { NumberOrString, RGBObject } from '@types';
import { PCENT, HEX } from '#constants';

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
}

//---Calculate a decimal 255 value from a percent
export const getBase255Number = (color: string): number => PCENT.test(color)
    ? Math.min(255 * parseInt(color) / 100, 255)
    : Math.min(parseInt(color), 255);

//---Calculate a decimal 0-1 value from CMYK value
export const getCMYKNumber = (color: string): number => Math.min(PCENT.test(color) ? parseInt(color) / 100 : parseInt(color), 1);

//---Return an ordered string from an array values
export const getOrderedArrayString = (keys: Array<string>): string => keys.sort().join().toUpperCase();