import { RGBObject, HSLObject, CMYKObject, RYBObject } from '@types';

//---HUE to RGB
export const hueToRGB = (t1: number, t2: number, hue: number): number => {
    if (hue < 0) { hue += 6; }
    if (hue >= 6) { hue -= 6; }
    if (hue < 1) {
        return Math.round(((t2 - t1) * hue + t1) * 255);
    } else if (hue < 3) {
        return Math.round(t2 * 255);
    } else if (hue < 4) {
        return Math.round(((t2 - t1) * (4 - hue) + t1) * 255);
    } else {
        return Math.round(t1 * 255);
    }
};

//---HSL to RGB
export const hslToRGB = (h: number, s: number, l: number): RGBObject => {
    h /= 60;
    s /= 100;
    l /= 100;
    const t2 = (l <= .5)
        ? l * (s + 1)
        : l + s - (l * s);
    const t1 = l * 2 - t2;
    const r = hueToRGB(t1, t2, h + 2);
    const g = hueToRGB(t1, t2, h);
    const b = hueToRGB(t1, t2, h - 2);
    return { r, g, b };
};

//---CMYK To RGB
export const cmykToRGB = (c: number, m: number, y: number, k: number): RGBObject => {
    k = 1 - k;
    const r = Math.round(255 * (1 - c) * k);
    const g = Math.round(255 * (1 - m) * k);
    const b = Math.round(255 * (1 - y) * k);
    return { r, g, b };
};

//---RGB to CMYK
export const rgbToCMYK = (r: number, g: number, b: number): CMYKObject => {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    const k1 = 1 - k;
    const c = (k1 - r) / k1;
    const m = (k1 - g) / k1;
    const y = (k1 - b) / k1;
    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
};

//---RGB to HSL
export const rgbToHSL = (r: number, g: number, b: number, a = 1): HSLObject => {
    r /= 255;
    g /= 255;
    b /= 255;
    a = Math.min(a, 1);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (d === 0) {
        h = 0;
        s = 0;
    } else {
        switch (max) {
            case r:
                h = ((g - b) / d) % 6;
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h = Math.round(h * 60);
        if (h < 0) { h += 360; }
        s = d / (1 - Math.abs(2 * l - 1));
    }
    return {
        h,
        s: Math.round(s * 100),
        l: Math.round(l * 100),
        a
    };
};

//---RGB to RYB and RYB to RGB for color mixes
/*
* http://nishitalab.org/user/UEI/publication/Sugita_IWAIT2015.pdf
*/
export const rgbToRYB = (r: number, g: number, b: number): RYBObject => {
    const Iw = Math.min(r, g, b);
    const Ib = Math.min(255 - r, 255 - g, 255 - b);
    const rRGB = r - Iw;
    const gRGB = g - Iw;
    const bRGB = b - Iw;
    const minRG = Math.min(rRGB, gRGB);
    const rRYB = rRGB - minRG;
    const yRYB = (gRGB + minRG) / 2;
    const bRYB = (bRGB + gRGB - minRG) / 2;
    const n = Math.max(rRYB, yRYB, bRYB) / Math.max(rRGB, gRGB, bRGB);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        r: rRYB / N + Ib,
        y: yRYB / N + Ib,
        b: bRYB / N + Ib
    };
};

export const rybToRGB = (r: number, y: number, b: number): RGBObject => {
    const Iw = Math.min(r, y, b);
    const Ib = Math.min(255 - r, 255 - y, 255 - b);
    const rRYB = r - Iw;
    const yRYB = y - Iw;
    const bRYB = b - Iw;
    const minYB = Math.min(yRYB, bRYB);
    const rRGB = rRYB + yRYB - minYB;
    const gRGB = yRYB + minYB;
    const bRGB = 2 * (bRYB - minYB);
    const n = Math.max(rRGB, gRGB, bRGB) / Math.max(rRYB, yRYB, bRYB);
    const N = isNaN(n) || n === Infinity || n <= 0 ? 1 : n;
    return {
        r: rRGB / N + Ib,
        g: gRGB / N + Ib,
        b: bRGB / N + Ib
    };
};

//---Hue RYB
export const hueRYB = (hue: number, toRYB: boolean): number => {
    
    if (hue < 0) hue += 360;
    if (hue > 360) hue -= 360;

    if (hue === 360 || hue === 0) return hue;

    const map1 = [[0, 120], [120, 180], [180, 240], [240, 360]];
    const map2 = [[0, 60], [60, 120], [120, 240], [240, 360]];
    const from = toRYB ? map1 : map2;
    const to = toRYB ? map2 : map1;

    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;

    from.find((arr: [number, number], index: number): boolean => {
        if (hue >= arr[0] && hue < arr[1]) {
            a = arr[0];
            b = arr[1];
            c = to[index][0];
            d = to[index][1];
            return true;
        }
        return false;
    });

    return c + (hue - a) * ((d - c) / (b - a));

};