import { RGBObject, HEXRegExpMatchArray } from '@types';
import { COLORREGS } from '#constants';
import { getDEC } from '#helpers';

export class HEXStringParser {

    constructor(colorString: string) {
        const match = colorString.match(COLORREGS.HEX) as HEXRegExpMatchArray;
        const groups = match.groups;
        this._r = groups.r ?? groups.rr;
        this._g = groups.g ?? groups.gg;
        this._b = groups.b ?? groups.bb;
        this._a = groups.a ?? groups.aa;
        const rgb: RGBObject = {
            R: getDEC(this._r),
            G: getDEC(this._g),
            B: getDEC(this._b)
        };
        if (this._a !== undefined) {
            rgb.A = getDEC(this._a) / 255;
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

}