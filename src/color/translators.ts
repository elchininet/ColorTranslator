import {
    CIELabObject,
    CMYKObject,
    ColorArray,
    HSLObject,
    HWBObject,
    RGBObject,
    RYBObject
} from '@types';
import { minmax, round } from '#helpers';

const MATRIX_LRGB_XYZ_D50: [ColorArray, ColorArray, ColorArray] = [
    [0.4360747, 0.3850649, 0.1430804],
    [0.2225045, 0.7168786, 0.0606169],
    [0.0139322, 0.0971045, 0.7141733]
];

const MATRIX_XYZ_D50_LRGB: [ColorArray, ColorArray, ColorArray] = [
    [3.1338561, -1.6168667, -0.4906146],
    [-0.9787684, 1.9161415, 0.033454],
    [0.0719453, -0.2289914, 1.4052427]
];

const TRISTIMULUS_D50 = MATRIX_LRGB_XYZ_D50.map((matrix: ColorArray): number => {
    return matrix.reduce((sum: number, value: number): number => sum + value, 0);
}) as ColorArray;

//---HUE to RGB
const hueToRGB = (t1: number, t2: number, hue: number): number => {
    if (hue < 0) { hue += 6; }
    if (hue >= 6) { hue -= 6; }
    if (hue < 1) {
        return round(((t2 - t1) * hue + t1) * 255);
    } else if (hue < 3) {
        return round(t2 * 255);
    } else if (hue < 4) {
        return round(((t2 - t1) * (4 - hue) + t1) * 255);
    } else {
        return round(t1 * 255);
    }
};

// RGB to linear-light RGB
// http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
const rgbToLinearLightRGB = (value: number): number => {
    return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
};

const linearLightRGBToRGB = (value: number): number => {
    return value <= 0.0031308
        ? 12.92 * value
        : 1.055 * (value ** (1 / 2.4)) - 0.055;
};

// Matrix * vector multiplication
const matrixVectorMultiplication = (
    v1: number, v2: number, v3: number,
    matrix: [ColorArray, ColorArray, ColorArray]
): ColorArray => {
    const result: ColorArray = [0, 0, 0];
    const linearRGB = [ v1, v2, v3 ];
    matrix.forEach((array: number[], index: number): void => {
        array.forEach((value: number, mindex: number) => {
            result[index] += value * linearRGB[mindex];
        });
    });
    return result;
};

const from_CIE_XYZ_D50_to_CIE_LAB = (x: number, y: number, z: number): ColorArray => {
    const f = (t: number): number => {
        return t > (6 / 29) ** 3
            ? Math.cbrt(t)
            : t / (3 * (6 / 29) ** 2) + (4 / 29);
    };
    const fx = f(x / TRISTIMULUS_D50[0]);
    const fy = f(y / TRISTIMULUS_D50[1]);
    const fz = f(z / TRISTIMULUS_D50[2]);
    return [
        116 * fy - 16,
        500 * (fx - fy),
        200 * (fy - fz)
    ];
};

const from_CIE_LAB_to_CIE_XYZ_D50 = (L: number, a: number, b: number): ColorArray => {
    const f = (t: number): number => {
        return t > 6 / 29
            ? t ** 3
            : 3 * (6 / 29) ** 2 * (t - 4 / 29);
    };
    const fl = (L + 16) / 116;
    const fa = a / 500;
    const fb = b / 200;
    return [
        TRISTIMULUS_D50[0] * f(fl + fa),
        TRISTIMULUS_D50[1] * f(fl),
        TRISTIMULUS_D50[2] * f(fl - fb)
    ];
};

//---HSL to RGB
export const hslToRGB = (H: number, S: number, L: number): RGBObject => {
    H /= 60;
    S /= 100;
    L /= 100;
    const t2 = (L <= .5)
        ? L * (S + 1)
        : L + S - (L * S);
    const t1 = L * 2 - t2;
    const R = hueToRGB(t1, t2, H + 2);
    const G = hueToRGB(t1, t2, H);
    const B = hueToRGB(t1, t2, H - 2);
    return { R, G, B };
};

//---RGB to HSL
export const rgbToHSL = (R: number, G: number, B: number, A = 1): HSLObject => {
    R /= 255;
    G /= 255;
    B /= 255;
    A = Math.min(A, 1);
    const MAX = Math.max(R, G, B);
    const MIN = Math.min(R, G, B);
    const D = MAX - MIN;
    let H = 0;
    let S = 0;
    const L = (MAX + MIN) / 2;
    if (D !== 0) {
        switch (MAX) {
            case R:
                H = ((G - B) / D) % 6;
                break;
            case G:
                H = (B - R) / D + 2;
                break;
            case B:
                H = (R - G) / D + 4;
                break;
        }
        H = round(H * 60);
        if (H < 0) { H += 360; }
        S = D / (1 - Math.abs(2 * L - 1));
    }
    return {
        H,
        S: round(S * 100),
        L: round(L * 100),
        A
    };
};

//--- RGB to Lab
export const rgbToLab = (R: number, G: number, B: number): CIELabObject => {

    const LINEAR_LIGHT_RGB = [
        R / 255,
        G / 255,
        B / 255
    ].map(rgbToLinearLightRGB);

    const CIE_XYZ_D50 = matrixVectorMultiplication(
        LINEAR_LIGHT_RGB[0],
        LINEAR_LIGHT_RGB[1],
        LINEAR_LIGHT_RGB[2],
        MATRIX_LRGB_XYZ_D50
    );
    const CIE_LAB = from_CIE_XYZ_D50_to_CIE_LAB(
        CIE_XYZ_D50[0],
        CIE_XYZ_D50[1],
        CIE_XYZ_D50[2]
    );

    return {
        L: CIE_LAB[0],
        a: CIE_LAB[1],
        b: CIE_LAB[2]
    };
};

//---Lab to RGB
export const labToRgb = (L: number, a: number, b: number): RGBObject => {

    const CIE_XYZ_D50 = from_CIE_LAB_to_CIE_XYZ_D50(L, a, b);

    const LINEAR_LIGHT_RGB = matrixVectorMultiplication(
        CIE_XYZ_D50[0],
        CIE_XYZ_D50[1],
        CIE_XYZ_D50[2],
        MATRIX_XYZ_D50_LRGB
    );

    const RGB = LINEAR_LIGHT_RGB.map(linearLightRGBToRGB) as ColorArray;

    return {
        R: minmax(RGB[0] * 255, 0, 255),
        G: minmax(RGB[1] * 255, 0, 255),
        B: minmax(RGB[2] * 255, 0, 255)
    };
};

//---RGB to HWB
export const rgbToHwb = (R: number, G: number, B: number, A: number = 1): HWBObject => {
    R /= 255;
    G /= 255;
    B /= 255;
    const MAX = Math.max(R, G, B);
    const MIN = Math.min(R, G, B);
    const D = MAX - MIN;
    let H = 0;
    if (D !== 0) {
        switch (MAX) {
            case R:
                H = ((G - B) / D) % 6;
                break;
            case G:
                H = (B - R) / D + 2;
                break;
            case B:
                H = (R - G) / D + 4;
                break;
        }
        H = round(H * 60);
        if (H < 0) { H += 360; }
    }
    return {
        H,
        W: round(MIN * 100),
        B: round((1 - MAX) * 100),
        A
    };
};

//--HWB to RGB
export const hwbToRgb = (H: number, W: number, B: number): RGBObject => {
    W /= 100;
    B /= 100;
    const V = 1 - B;
    const C = V - W;
    const X = C * (1 - Math.abs((H / 60) % 2 - 1));
    let RGB_R = 0;
    let RGB_G = 0;
    let RGB_B = 0;
    if (H < 60) {
        RGB_R = C;
        RGB_G = X;
        RGB_B = 0;
    } else if (H >= 60 && H < 120) {
        RGB_R = X;
        RGB_G = C;
        RGB_B = 0;
    } else if (H >= 120 && H < 180) {
        RGB_R = 0;
        RGB_G = C;
        RGB_B = X;
    } else if (H >= 180 && H < 240) {
        RGB_R = 0;
        RGB_G = X;
        RGB_B = C;
    } else if (H >= 240 && H < 300) {
        RGB_R = X;
        RGB_G = 0;
        RGB_B = C;
    } else if (H >= 300) {
        RGB_R = C;
        RGB_G = 0;
        RGB_B = X;
    }
    RGB_R += W;
    RGB_G += W;
    RGB_B += W;
    return {
        R: minmax(RGB_R * 255, 0, 255),
        G: minmax(RGB_G * 255, 0, 255),
        B: minmax(RGB_B * 255, 0, 255)
    };
};

//---CMYK To RGB
export const cmykToRGB = (C: number, M: number, Y: number, K: number): RGBObject => {
    K = 1 - K;
    const R = round(255 * (1 - C) * K);
    const G = round(255 * (1 - M) * K);
    const B = round(255 * (1 - Y) * K);
    return { R, G, B };
};

//---RGB to CMYK
export const rgbToCMYK = (R: number, G: number, B: number): CMYKObject => {
    R /= 255;
    G /= 255;
    B /= 255;
    const K = 1 - Math.max(R, G, B);
    const K1 = 1 - K;
    const C = K1 && (K1 - R) / K1;
    const M = K1 && (K1 - G) / K1;
    const Y = K1 && (K1 - B) / K1;
    return {
        C: round(C * 100),
        M: round(M * 100),
        Y: round(Y * 100),
        K: round(K * 100)
    };
};

//---RGB to RYB and RYB to RGB for color mixes
/*
* http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
*/
export const rgbToRYB = (R: number, G: number, B: number): RYBObject => {
    const Iw = Math.min(R, G, B);
    const Ib = Math.min(255 - R, 255 - G, 255 - B);
    const rRGB = R - Iw;
    const gRGB = G - Iw;
    const bRGB = B - Iw;
    const minRG = Math.min(rRGB, gRGB);
    const rRYB = rRGB - minRG;
    const yRYB = (gRGB + minRG) / 2;
    const bRYB = (bRGB + gRGB - minRG) / 2;
    const n = Math.max(rRYB, yRYB, bRYB) / Math.max(rRGB, gRGB, bRGB);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        R: rRYB / N + Ib,
        Y: yRYB / N + Ib,
        B: bRYB / N + Ib
    };
};

export const rybToRGB = (R: number, Y: number, B: number): RGBObject => {
    const Iw = Math.min(R, Y, B);
    const Ib = Math.min(255 - R, 255 - Y, 255 - B);
    const rRYB = R - Iw;
    const yRYB = Y - Iw;
    const bRYB = B - Iw;
    const minYB = Math.min(yRYB, bRYB);
    const rRGB = rRYB + yRYB - minYB;
    const gRGB = yRYB + minYB;
    const bRGB = 2 * (bRYB - minYB);
    const n = Math.max(rRGB, gRGB, bRGB) / Math.max(rRYB, yRYB, bRYB);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        R: rRGB / N + Ib,
        G: gRGB / N + Ib,
        B: bRGB / N + Ib
    };
};

//---Hue RYB
export const hueRYB = (hue: number, toRYB: boolean): number => {

    if (hue < 0) hue += 360;
    if (hue > 360) hue -= 360;

    if (hue === 360 || hue === 0) return hue;

    const map1: [number, number][] = [
        [0, 120],
        [120, 180],
        [180, 240],
        [240, 360]
    ];
    const map2: [number, number][] = [
        [0, 60],
        [60, 120],
        [120, 240],
        [240, 360]
    ];
    const from = toRYB ? map1 : map2;
    const to = toRYB ? map2 : map1;

    let A = 0;
    let B = 0;
    let C = 0;
    let D = 0;

    from.find((arr: [number, number], index: number): boolean => {
        if (hue >= arr[0] && hue < arr[1]) {
            A = arr[0];
            B = arr[1];
            C = to[index][0];
            D = to[index][1];
            return true;
        }
        return false;
    });

    return C + (hue - A) * ((D - C) / (B - A));

};