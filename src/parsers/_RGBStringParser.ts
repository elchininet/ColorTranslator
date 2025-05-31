import {
    ParserGetRgbObject,
    RGBObject,
    RGBRegExpMatchArray
} from '@types';
import {
    BASE_255,
    COLORREGS,
    PCENT
} from '#constants';
import { getBase255Number, normalizeAlpha } from '#helpers';
import { CalcParser } from './_CalcParser';

export class RGBStringParser {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        const match = colorString.match(COLORREGS.RGB) as RGBRegExpMatchArray;
        const groups = match.groups;
        const {
            // Legacy values
            r_legacy,
            g_legacy,
            b_legacy,
            a_legacy,
            // RGB values
            r,
            g,
            b,
            a,
            // Relative values
            from,
            relative_r,
            relative_g,
            relative_b,
            relative_a
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromRGBVars = {
                r: fromRGB.R,
                g: fromRGB.G,
                b: fromRGB.B,
                alpha: fromRGB.A ?? 1
            };

            const R = new CalcParser('r', relative_r, fromRGBVars).result;
            const G = new CalcParser('g', relative_g, fromRGBVars).result;
            const B = new CalcParser('b', relative_b, fromRGBVars).result;

            const rgb: RGBObject = {
                R: Math.min(
                    R,
                    BASE_255
                ),
                G: Math.min(
                    G,
                    BASE_255
                ),
                B: Math.min(
                    B,
                    BASE_255
                )
            };

            if (relative_a) {
                const A = new CalcParser('alpha', relative_a, fromRGBVars).result;
                rgb.A = Math.min(A, 1);
            }

            this._rgb = rgb;
            
        } else {

            this._r = r_legacy ?? r;
            this._g = g_legacy ?? g;
            this._b = b_legacy ?? b;
            this._a = a_legacy ?? a;

            const rgb: RGBObject = {
                R: Math.min(
                    getBase255Number(this._r),
                    BASE_255
                ),
                G: Math.min(
                    getBase255Number(this._g),
                    BASE_255
                ),
                B: Math.min(
                    getBase255Number(this._b),
                    BASE_255
                )
            };

            if (this._a !== undefined) {
                rgb.A = normalizeAlpha(this._a);
            }

            this._rgb = rgb;

        }
    }

    private _r: string;
    private _g: string;
    private _b: string;
    private _a: string | undefined;
    private _rgb: RGBObject;

    public get rgb(): RGBObject {
        return this._rgb;
    }

    public get hasPercentageValues(): boolean {
        return (
            PCENT.test(this._r) &&
            PCENT.test(this._g) &&
            PCENT.test(this._b)
        );
    }

    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._a);
    }

    static test(colorString: string): boolean {
        return COLORREGS.RGB.test(colorString);
    }

}