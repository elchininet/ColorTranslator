import {
    CIELabObject,
    CMYKObject,
    HSLObject,
    HWBObject
} from '@types';
import { round } from '#helpers';

export const roundHSLObject = (
    color: HSLObject,
    decimals: number
): HSLObject => {
    return {
        H: round(color.H, decimals),
        S: round(color.S, decimals),
        L: round(color.L, decimals)
    };
};

export const roundHWBObject = (
    color: HWBObject,
    decimals: number
): HWBObject => {
    return {
        H: round(color.H, decimals),
        W: round(color.W, decimals),
        B: round(color.B, decimals)
    };
};

export const roundCIELabObject = (
    color: CIELabObject,
    decimals: number
): CIELabObject => {
    return {
        L: round(color.L, decimals),
        a: round(color.a, decimals),
        b: round(color.b, decimals)
    };
};

export const roundCMYKObject = (
    color: CMYKObject,
    decimals: number
): CMYKObject => {
    return {
        C: round(color.C, decimals),
        M: round(color.M, decimals),
        Y: round(color.Y, decimals),
        K: round(color.K, decimals)
    };
};