import {
    ColorObject,
    RGBObject
} from '@types';
import {
    cmykToRgb,
    hslToRgb,
    hwbToRgb,
    labToRgb,
    lchToRgb
} from '#color/translators';
import {
    isCIELabObject,
    isCMYKObject,
    isHSLObject,
    isHWBObject,
    isLCHObject,
    isUndefined
} from '#utilities';

const getAlpha = (color: ColorObject): { A?: number} => {
    if (isUndefined(color.A)) {
        return {};
    }
    return {
        A: +color.A
    };
};

export const getRGB = (color: ColorObject): RGBObject => {

    const alpha = getAlpha(color);

    if (isHSLObject(color)) {
        return {
            ...hslToRgb(
                color.H,
                color.S,
                color.L
            ),
            ...alpha
        };
    }

    if (isHWBObject(color)) {
        return {
            ...hwbToRgb(
                color.H,
                color.W,
                color.B
            ),
            ...alpha
        }
    }

    if (isCIELabObject(color)) {
        return {
            ...labToRgb(
                color.L,
                color.a,
                color.b
            ),
            ...alpha
        };
    }

    if (isLCHObject(color)) {
        return {
            ...lchToRgb(
                color.L,
                color.C,
                color.H
            ),
            ...alpha
        };
    }

    if (isCMYKObject(color)) {
        return {
            ...cmykToRgb(
                color.C,
                color.M,
                color.Y,
                color.K
            ),
            ...alpha
        };
    }

    return color as RGBObject;

};