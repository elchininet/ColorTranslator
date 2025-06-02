import {
    HSLRegExpMatchArray,
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
import { hslToRgb, rgbToHsl } from '#color/translators';
import { CalcParser } from './_CalcParser';
import { HueBaseClass } from './baseClasses/_HueBaseClass';

export class HSLStringParser extends HueBaseClass {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        super();

        const match = colorString.match(COLORREGS.HSL) as HSLRegExpMatchArray;
        const groups = match.groups;

        const {
            // Legacy values
            h_legacy,
            s_legacy,
            l_legacy,
            a_legacy,
            // HSL values
            h,
            s,
            l,
            a,
            // Relative values
            from,
            relative_h,
            relative_s,
            relative_l,
            relative_a
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromHSL = rgbToHsl(
                fromRGB.R,
                fromRGB.G,
                fromRGB.B,
                fromRGB.A
            );
            const fromHSLVars = {
                h: fromHSL.H,
                s: fromHSL.S,
                l: fromHSL.L,
                alpha: fromHSL.A
            };

            const H = new CalcParser('h', relative_h, fromHSLVars).result;
            const S = new CalcParser('s', relative_s, fromHSLVars).result;
            const L = new CalcParser('l', relative_l, fromHSLVars).result;

            const rgb = hslToRgb(
                minmax(H, 0, MAX_HUE),
                minmax(S, 0, MAX_PCENT),
                minmax(L, 0, MAX_PCENT)
            );

            if (relative_a) {
                const A = new CalcParser('alpha', relative_a, fromHSLVars).result;
                rgb.A = minmax(A, 0, MAX_ALPHA);
            }

            this._rgb = rgb;

        } else {

            this._h = h_legacy ?? h;
            this._s = s_legacy ?? s;
            this._l = l_legacy ?? l;
            this._a = a_legacy ?? a;
            const rgb: RGBObject = hslToRgb(
                normalizeHue(this._h),
                percent(this._s),
                percent(this._l)
            );
            if (this._a !== undefined) {
                rgb.A = normalizeAlpha(this._a);
            }
            this._rgb = rgb;

        }

    }

    private _s: string;
    private _l: string;

    static test(colorString: string): boolean {
        return COLORREGS.HSL.test(colorString);
    }

}