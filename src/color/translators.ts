import {
    CIELabObject,
    CMYKObject,
    ColorArray,
    HSLObject,
    HWBObject,
    LCHObject,
    RGBObject,
    RYBObject
} from '@types';
import { BASE_255, MAX_ALPHA } from '#constants';
import {
    degrees,
    minmax,
    normalizeHue,
    radians,
    round
} from '#helpers';

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
const hueToRgb = (t1: number, t2: number, hue: number): number => {
    if (hue < 0) { hue += 6; }
    if (hue >= 6) { hue -= 6; }
    if (hue < 1) {
        return round(((t2 - t1) * hue + t1) * BASE_255);
    } else if (hue < 3) {
        return round(t2 * BASE_255);
    } else if (hue < 4) {
        return round(((t2 - t1) * (4 - hue) + t1) * BASE_255);
    } else {
        return round(t1 * BASE_255);
    }
};

// RGB to linear-light RGB
// http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
const rgbToLinearLightRgb = (value: number): number => {
    return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
};

const linearLightRgbToRgb = (value: number): number => {
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
    const linearRgb = [ v1, v2, v3 ];
    matrix.forEach((array: number[], index: number): void => {
        array.forEach((value: number, mindex: number) => {
            result[index] += value * linearRgb[mindex];
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
export const hslToRgb = (H: number, S: number, L: number): RGBObject => {
    H /= 60;
    S /= 100;
    L /= 100;
    const t2 = (L <= .5)
        ? L * (S + 1)
        : L + S - (L * S);
    const t1 = L * 2 - t2;
    const R = hueToRgb(t1, t2, H + 2);
    const G = hueToRgb(t1, t2, H);
    const B = hueToRgb(t1, t2, H - 2);
    return { R, G, B };
};

//---RGB to HSL
export const rgbToHsl = (R: number, G: number, B: number, A = 1): HSLObject => {
    R /= BASE_255;
    G /= BASE_255;
    B /= BASE_255;
    A = Math.min(A, MAX_ALPHA);
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
        R / BASE_255,
        G / BASE_255,
        B / BASE_255
    ].map(rgbToLinearLightRgb);

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

    const rgb = LINEAR_LIGHT_RGB.map(linearLightRgbToRgb) as ColorArray;

    return {
        R: minmax(rgb[0] * BASE_255, 0, BASE_255),
        G: minmax(rgb[1] * BASE_255, 0, BASE_255),
        B: minmax(rgb[2] * BASE_255, 0, BASE_255)
    };
};

// LAB to LCH
export const labToLch = (L: number, a: number, b: number): LCHObject => {
    const C = Math.sqrt(
        a ** 2 + b ** 2
    );
    const H = degrees(
        Math.atan2(b, a)
    );
    return {
        L,
        C,
        H: normalizeHue(H)
    };
};

// LCH to LAB
export const lchToLab = (L: number, C: number, H: number): CIELabObject => {
    const radH = radians(H);
    const a = C * Math.cos(radH);
    const b = C * Math.sin(radH);
    return {
        L,
        a,
        b
    };
};

// RGB to LCH
export const rgbToLch = (R: number, G: number, B: number): LCHObject => {
    const lab = rgbToLab(R, G, B);
    return labToLch(
        lab.L,
        lab.a,
        lab.b
    );
};

// LCH to RGB
export const lchToRgb = (L: number, C: number, H: number): RGBObject => {
    const lab = lchToLab(L, C, H);
    return labToRgb(
        lab.L,
        lab.a,
        lab.b
    );
};

//---RGB to HWB
export const rgbToHwb = (R: number, G: number, B: number, A: number = 1): HWBObject => {
    const hsl = rgbToHsl(R, G, B, A);
    return {
        H: hsl.H,
        W: round(
            Math.min(R, G, B) / BASE_255 * 100
        ),
        B: round(
            (1 - Math.max(R, G, B) / BASE_255) * 100
        ),
        A
    };
};

//--HWB to RGB
export const hwbToRgb = (H: number, W: number, B: number): RGBObject => {
    W /= 100;
    B /= 100;
    const v = 1 - B;
    const c = v - W;
    const x = c * (1 - Math.abs((H / 60) % 2 - 1));
    let rgbR = 0;
    let rgbG = 0;
    let rgbB = 0;
    if (H < 60) {
        rgbR = c;
        rgbG = x;
        rgbB = 0;
    } else if (H >= 60 && H < 120) {
        rgbR = x;
        rgbG = c;
        rgbB = 0;
    } else if (H >= 120 && H < 180) {
        rgbR = 0;
        rgbG = c;
        rgbB = x;
    } else if (H >= 180 && H < 240) {
        rgbR = 0;
        rgbG = x;
        rgbB = c;
    } else if (H >= 240 && H < 300) {
        rgbR = x;
        rgbG = 0;
        rgbB = c;
    } else if (H >= 300) {
        rgbR = c;
        rgbG = 0;
        rgbB = x;
    }
    rgbR += W;
    rgbG += W;
    rgbB += W;
    return {
        R: minmax(rgbR * BASE_255, 0, BASE_255),
        G: minmax(rgbG * BASE_255, 0, BASE_255),
        B: minmax(rgbB * BASE_255, 0, BASE_255)
    };
};

//---CMYK To RGB
export const cmykToRgb = (C: number, M: number, Y: number, K: number): RGBObject => {
    K = 1 - K;
    return {
        R: round(BASE_255 * (1 - C) * K),
        G: round(BASE_255 * (1 - M) * K),
        B: round(BASE_255 * (1 - Y) * K)
    };
};

//---RGB to CMYK
export const rgbToCmyk = (R: number, G: number, B: number): CMYKObject => {
    R /= BASE_255;
    G /= BASE_255;
    B /= BASE_255;
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
export const rgbToRyb = (R: number, G: number, B: number): RYBObject => {
    const Iw = Math.min(R, G, B);
    const Ib = Math.min(BASE_255 - R, BASE_255 - G, BASE_255 - B);
    const rRgb = R - Iw;
    const gRgb = G - Iw;
    const bRgb = B - Iw;
    const minRg = Math.min(rRgb, gRgb);
    const rRyb = rRgb - minRg;
    const yRyb = (gRgb + minRg) / 2;
    const bRyb = (bRgb + gRgb - minRg) / 2;
    const n = Math.max(rRyb, yRyb, bRyb) / Math.max(rRgb, gRgb, bRgb);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        R: rRyb / N + Ib,
        Y: yRyb / N + Ib,
        B: bRyb / N + Ib
    };
};

export const rybToRgb = (R: number, Y: number, B: number): RGBObject => {
    const Iw = Math.min(R, Y, B);
    const Ib = Math.min(BASE_255 - R, BASE_255 - Y, BASE_255 - B);
    const rRyb = R - Iw;
    const yRyb = Y - Iw;
    const bRyb = B - Iw;
    const minYb = Math.min(yRyb, bRyb);
    const rRgb = rRyb + yRyb - minYb;
    const gRgb = yRyb + minYb;
    const bRgb = 2 * (bRyb - minYb);
    const n = Math.max(rRgb, gRgb, bRgb) / Math.max(rRyb, yRyb, bRyb);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        R: rRgb / N + Ib,
        G: gRgb / N + Ib,
        B: bRgb / N + Ib
    };
};

//---Hue RYB
export const hueRyb = (hue: number, toRyb: boolean): number => {

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
    const from = toRyb ? map1 : map2;
    const to = toRyb ? map2 : map1;

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