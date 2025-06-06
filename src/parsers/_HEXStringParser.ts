import { RGBObject, HEXRegExpMatchArray } from '@types';
import { BASE_255, COLORREGS } from '#constants';
import { getDEC } from '#helpers';
import { RgbClass } from './baseClasses/_RgbClass';

export class HEXStringParser extends RgbClass {

    constructor(colorString: string) {

        super();

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
            rgb.A = getDEC(this._a) / BASE_255;
        }
        this._rgb = rgb;
    }

    private _r: string;
    private _g: string;
    private _b: string;
    private _a: string | undefined;

}