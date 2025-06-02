import {
    LCHRegExpMatchArray,
    ParserGetRgbObject,
    RGBObject
} from '@types';
import {
    COLORREGS,
    MAX_ALPHA,
    MAX_LCH_C,
    MAX_PCENT,
    PCENT
} from '#constants';
import {
    getBase150Number,
    minmax,
    normalizeAlpha,
    normalizeHue,
    percent
} from '#helpers';
import { lchToRgb, rgbToLch } from '#color/translators';
import { CalcParser } from './_CalcParser';
import { HueBaseClass } from './baseClasses/_HueBaseClass';

export class LCHStringParser extends HueBaseClass {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        super();

        const match = colorString.match(COLORREGS.LCH) as LCHRegExpMatchArray;
        const groups = match.groups;

        const {
            // LCH values
            l,
            c,
            h,
            a,
            // Relative values
            from,
            relative_l,
            relative_c,
            relative_h,
            relative_a
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromLCH = rgbToLch(
                fromRGB.R,
                fromRGB.G,
                fromRGB.B
            );
            const fromLCHVars = {
                l: fromLCH.L,
                c: fromLCH.C,
                h: fromLCH.H,
                alpha: fromRGB.A ?? 1
            };

            const L = new CalcParser('l', relative_l, fromLCHVars).result;
            const C = new CalcParser('c', relative_c, fromLCHVars).result;
            const H = new CalcParser('h', relative_h, fromLCHVars).result;

            const rgb = lchToRgb(
                minmax(L, 0, MAX_PCENT),
                minmax(C, - MAX_LCH_C, MAX_LCH_C),
                normalizeHue(H)
            );

            if (relative_a) {
                const A = new CalcParser('alpha', relative_a, fromLCHVars).result;
                rgb.A = minmax(A, 0, MAX_ALPHA);
            }

            this._rgb = rgb;

        } else {

            this._l = l;
            this._c = c;
            this._h = h;
            this._a = a;
            const rgb: RGBObject = lchToRgb(
                percent(this._l),
                getBase150Number(this._c),
                normalizeHue(this._h)
            );
            if (this._a !== undefined) {
                rgb.A = normalizeAlpha(this._a);
            }
            this._rgb = rgb;

        }
    }

    private _l: string;
    private _c: string;

    public get hasPercentageValues(): boolean {
        return (
            PCENT.test(this._l) &&
            PCENT.test(this._c)
        );
    }

    static test(colorString: string): boolean {
        return COLORREGS.LCH.test(colorString);
    }

}