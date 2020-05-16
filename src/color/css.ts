import { ColorModel } from '#constants';
import { HEXObject, RGBObject, HSLObject, CMYKObject } from '@types';
import { toHEX, hasProp, round } from '#helpers';

export const CSS = {
    [ColorModel.HEX]: (color: HEXObject | RGBObject): string => `#${toHEX(color.r)}${toHEX(color.g)}${toHEX(color.b)}${color.a && toHEX(color.a) || ''}`,
    [ColorModel.RGB]: (color: RGBObject): string => `rgb${hasProp<RGBObject>(color, 'a') && 'a' || ''}(${round(color.r)},${round(color.g)},${round(color.b)}${hasProp<RGBObject>(color, 'a') && `,${round(color.a, 2)}` || ''})`,
    [ColorModel.HSL]: (color: HSLObject): string => `hsl${hasProp<HSLObject>(color, 'a') && 'a' || ''}(${round(color.h)},${round(color.s)}%,${round(color.l)}%${hasProp<HSLObject>(color, 'a') && `,${round(color.a, 2)}` || ''})`,
    [ColorModel.CMYK]: (color: CMYKObject): string => `cmyk(${round(color.c)}%,${round(color.m)}%,${round(color.y)}%,${round(color.k)}%)`
};