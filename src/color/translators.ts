import { RGBObject, HSLObject, CMYKObject } from '@types';

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