import { RGBObject, HSLObject, CMYKObject } from '@types';
import { toHEX } from '#helpers';

export const CSS = {
    HEX: (color: RGBObject): string => `#${toHEX(color.r)}${toHEX(color.g)}${toHEX(color.b)}${color.a && toHEX(color.a) || ''}`,
    RGB: (color: RGBObject): string => `rgb${color.a && 'a' || ''}(${color.r},${color.g},${color.b}${color.a && `,${color.a}` || ''})`,
    HSL: (color: HSLObject): string => `hsl${color.a && 'a' || ''}(${color.h},${color.s}%,${color.l}%${color.a && `,${color.a}` || ''})`,
    CMYK: (color: CMYKObject): string => `device-cmyk(${color.c}%,${color.m}%,${color.y}%,${color.k}%)`
};