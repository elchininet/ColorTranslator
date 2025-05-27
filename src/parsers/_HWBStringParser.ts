import {
    AnglesUnitEnum,
    AngleUnitRegExpMatchArray,
    HWBRegExpMatchArray,
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
import { hwbToRgb } from '#color/translators';

export class HWBStringParser {

    constructor(colorString: string) {
        const match = colorString.match(COLORREGS.HWB) as HWBRegExpMatchArray;
        const groups = match.groups;
        this._h = groups.h;
        this._w = groups.w;
        this._b = groups.b;
        this._a = groups.a;
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

    private _h: string;
    private _w: string;
    private _b: string;
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
        return COLORREGS.HWB.test(colorString);
    }

}