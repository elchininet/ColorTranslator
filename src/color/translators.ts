import { RGBObject, HSLObject, CMYKObject, RYBObject } from '@types';
import { round } from '#helpers';

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