import {
    HWBRegExpMatchArray,
    ParserGetRgbObject,
    RGBObject
} from '@types';
import {
    COLORREGS,
    MAX_ALPHA,
    MAX_HUE,
    MAX_PCENT
} from '#constants';
import {
    minmax,
    normalizeAlpha,
    normalizeHue,
    percent
} from '#helpers';
import { hwbToRgb, rgbToHwb } from '#color/translators';
import { CalcParser } from './_CalcParser';
import { HueBaseClass } from './baseClasses/_HueBaseClass';

export class HWBStringParser extends HueBaseClass {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        super();

        const match = colorString.match(COLORREGS.HWB) as HWBRegExpMatchArray;
        const groups = match.groups;

        const {
            // HWB values
            h,
            w,
            b,
            a,
            // Relative values
            from,
            relative_h,
            relative_w,
            relative_b,
            relative_a
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromHWB = rgbToHwb(
                fromRGB.R,
                fromRGB.G,
                fromRGB.B,
                fromRGB.A
            );
            const fromHWBVars = {
                h: fromHWB.H,
                w: fromHWB.W,
                b: fromHWB.B,
                alpha: fromHWB.A
            };

            const H = new CalcParser('h', relative_h, fromHWBVars).result;
            const W = new CalcParser('w', relative_w, fromHWBVars).result;
            const B = new CalcParser('b', relative_b, fromHWBVars).result;

            const rgb = hwbToRgb(
                minmax(H, 0, MAX_HUE),
                minmax(W, 0, MAX_PCENT),
                minmax(B, 0, MAX_PCENT)
            );

            if (relative_a) {
                const A = new CalcParser('alpha', relative_a, fromHWBVars).result;
                rgb.A = minmax(A, 0, MAX_ALPHA);
            }

            this._rgb = rgb;

        } else {

            this._h = h;
            this._w = w;
            this._b = b;
            this._a = a;
            const rgb: RGBObject = hwbToRgb(
                normalizeHue(this._h),
                percent(this._w),
                percent(this._b)
            );
            if (this._a !== undefined) {
                rgb.A = normalizeAlpha(this._a);
            }
            this._rgb = rgb;

        }
    }

    private _w: string;
    private _b: string;

    static test(colorString: string): boolean {
        return COLORREGS.HWB.test(colorString);
    }

}