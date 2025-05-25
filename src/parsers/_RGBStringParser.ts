import { RGBObject, RGBRegExpMatchArray } from '@types';
import { COLORREGS, PCENT } from '#constants';
import { getBase255Number, normalizeAlpha } from '#helpers';

export class RGBStringParser {

    constructor(colorString: string) {
        const BASE = 255;
        const match = colorString.match(COLORREGS.RGB) as RGBRegExpMatchArray;
        const groups = match.groups;
        this._r = groups.r_legacy ?? groups.r;
        this._g = groups.g_legacy ?? groups.g;
        this._b = groups.b_legacy ?? groups.b;
        this._a = groups.a_legacy ?? groups.a;
        const rgb: RGBObject = {
            R: Math.min(
                getBase255Number(this._r),
                BASE
            ),
            G: Math.min(
                getBase255Number(this._g),
                BASE
            ),
            B: Math.min(
                getBase255Number(this._b),
                BASE
            )
        };
        if (this._a !== undefined) {
            rgb.A = normalizeAlpha(this._a);
        }
        this._rgb = rgb;
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