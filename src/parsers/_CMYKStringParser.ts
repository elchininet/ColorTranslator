import { CMYKRegExpMatchArray, RGBObject } from '@types';
import { COLORREGS, PCENT } from '#constants';
import { getCMYKNumber, normalizeAlpha } from '#helpers';
import { cmykToRGB } from '#color/translators';

export class CMYKStringParser {

    constructor(colorString: string) {
        const match = colorString.match(COLORREGS.CMYK) as CMYKRegExpMatchArray;
        const groups = match.groups;
        this._c = groups.c_legacy ?? groups.c;
        this._m = groups.m_legacy ?? groups.m;
        this._y = groups.y_legacy ?? groups.y;
        this._k = groups.k_legacy ?? groups.k;
        this._a = groups.a_legacy ?? groups.a;
        const rgb: RGBObject = cmykToRGB(
            getCMYKNumber(this._c),
            getCMYKNumber(this._m),
            getCMYKNumber(this._y),
            getCMYKNumber(this._k)
        );
        if (this._a !== undefined) {
            rgb.A = normalizeAlpha(this._a);
        }
        this._rgb = rgb;
    }

    private _c: string;
    private _m: string;
    private _y: string;
    private _k: string;
    private _a: string | undefined;

    private _rgb: RGBObject;

    public get rgb(): RGBObject {
        return this._rgb;
    }

    public get hasPercentageValues(): boolean {
        return (
            PCENT.test(this._c) &&
            PCENT.test(this._m) &&
            PCENT.test(this._y) &&
            PCENT.test(this._k)
        );
    }

    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._a);
    }

    static test(colorString: string): boolean {
        return COLORREGS.CMYK.test(colorString);
    }

}