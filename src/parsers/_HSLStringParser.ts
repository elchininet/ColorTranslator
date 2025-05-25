import {
    AnglesUnitEnum,
    AngleUnitRegExpMatchArray,
    HSLRegExpMatchArray,
    RGBObject
} from '@types';
import {
    COLORREGS,
    HSL_HUE,
    PCENT
} from '#constants';
import {
    normalizeAlpha,
    normalizeHue,
    percent
} from '#helpers';
import { hslToRGB } from '#color/translators';

export class HSLStringParser {

    constructor(colorString: string) {
        const match = colorString.match(COLORREGS.HSL) as HSLRegExpMatchArray;
        const groups = match.groups;
        this._h = groups.h_legacy ?? groups.h;
        this._s = groups.s_legacy ?? groups.s;
        this._l = groups.l_legacy ?? groups.l;
        this._a = groups.a_legacy ?? groups.a;
        const rgb: RGBObject = hslToRGB(
            normalizeHue(this._h),
            percent(this._s),
            percent(this._l)
        );
        if (this._a !== undefined) {
            rgb.A = normalizeAlpha(this._a);
        }
        this._rgb = rgb;
    }

    private _h: string;
    private _s: string;
    private _l: string;
    private _a: string | undefined;
    private _rgb: RGBObject;

    public get rgb(): RGBObject {
        return this._rgb;
    }

    public get angleUnit(): AnglesUnitEnum {
        const angleUnitMatch = this._h.match(HSL_HUE) as AngleUnitRegExpMatchArray;
        const angleUnit = angleUnitMatch.groups.units;
        return angleUnit === ''
            ? AnglesUnitEnum.NONE
            : angleUnit as AnglesUnitEnum;
    }

    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._a);
    }

    static test(colorString: string): boolean {
        return COLORREGS.HSL.test(colorString);
    }

}