import { ColorModel, MIN_DECIMALS } from '#constants';
import { HEXObject, RGBObject, HSLObject, CMYKObject } from '@types';
import { toHEX, hasProp, round, roundAll, toHEXAll } from '#helpers';

export const CSS = {
    [ColorModel.HEX]: (color: HEXObject | RGBObject): string => {
        const { r, g, b } = color;
        const values = toHEXAll([r, g, b]);
        const hasAlpha = hasProp(color, 'a');
        const alphaText = hasAlpha ? toHEX(color.a) : '';
        return `#${values.join('')}${alphaText}`;
    },
    [ColorModel.RGB]: (color: RGBObject): string => {
        const { r, g, b } = color;
        const values = roundAll([r, g, b]);
        const hasAlpha = hasProp<RGBObject>(color, 'a');
        const alphaText = hasAlpha ? `,${round(color.a, MIN_DECIMALS)}` : '';
        return `rgb${hasAlpha ? 'a' : ''}(${values.join(',')}${alphaText})`;
    },
    [ColorModel.HSL]: (color: HSLObject): string => {
        const { h, s, l } = color;
        const hasAlpha = hasProp<HSLObject>(color, 'a');
        const alphaText = hasAlpha ? `,${round(color.a, MIN_DECIMALS)}` : '';
        return `hsl${hasAlpha ? 'a' : ''}(${round(h)},${round(s)}%,${round(
            l
        )}%${alphaText})`;
    },
    [ColorModel.CMYK]: (color: CMYKObject): string => {
        const { c, m, y, k } = color;
        const values = roundAll([c, m, y, k]);
        const hasAlpha = hasProp<CMYKObject>(color, 'a');
        const alphaText = hasAlpha ? `,${round(color.a, MIN_DECIMALS)}` : '';
        return `cmyk(${values.join('%,')}%${alphaText})`;
    }
};
