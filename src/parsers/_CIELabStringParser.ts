import { CIELabRegExpMatchArray, RGBObject } from '@types';
import { COLORREGS, PCENT } from '#constants';
import {
    getBase125Number,
    normalizeAlpha,
    percent
} from '#helpers';
import { labToRgb } from '#color/translators';

export class CIELabStringParser {

    constructor(colorString: string) {
        const match = colorString.match(COLORREGS.CIELab) as CIELabRegExpMatchArray;
        const groups = match.groups;
        this._L = groups.L;
        this._a = groups.a;
        this._b = groups.b;
        this._A = groups.A;
        const rgb: RGBObject = labToRgb(
            percent(this._L),
            getBase125Number(this._a),
            getBase125Number(this._b)
        );
        if (this._A !== undefined) {
            rgb.A = normalizeAlpha(this._A);
        }
        this._rgb = rgb;
    }

    private _L: string;
    private _a: string;
    private _b: string;
    private _A: string | undefined;
    private _rgb: RGBObject;

    public get rgb(): RGBObject {
        return this._rgb;
    }

    public get hasPercentageValues(): boolean {
        return (
            PCENT.test(this._L) &&
            PCENT.test(this._a) &&
            PCENT.test(this._b)
        );
    }

    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._A);
    }

    static test(colorString: string): boolean {
        return COLORREGS.CIELab.test(colorString);
    }

}