import {
    AnglesUnitEnum,
    AngleUnitRegExpMatchArray,
    HWBRegExpMatchArray,
    ParserGetRgbObject,
    RGBObject
} from '@types';
import {
    BASE_255,
    COLORREGS,
    HSL_HUE,
    PCENT
} from '#constants';
import {
    normalizeAlpha,
    normalizeHue,
    percent
} from '#helpers';
import { hwbToRgb, rgbToHwb } from '#color/translators';
import { CalcParser } from './_CalcParser';

export class HWBStringParser {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        const match = colorString.match(COLORREGS.HWB) as HWBRegExpMatchArray;
        const groups = match.groups;

        const {
            // HWB values
            h,
            w,
            b,
            a,
            // Relative values
            from,
            relative_h,
            relative_w,
            relative_b,
            relative_a
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromHWB = rgbToHwb(
                fromRGB.R,
                fromRGB.G,
                fromRGB.B,
                fromRGB.A
            );
            const fromHWBVars = {
                h: fromHWB.H,
                w: fromHWB.W,
                b: fromHWB.B,
                alpha: fromHWB.A ?? 1
            };

            const H = new CalcParser('h', relative_h, fromHWBVars).result;
            const W = new CalcParser('w', relative_w, fromHWBVars).result;
            const B = new CalcParser('b', relative_b, fromHWBVars).result;

            const toRGB = hwbToRgb(
                H,
                W,
                B
            );

            const rgb: RGBObject = {
                R: Math.min(
                    toRGB.R,
                    BASE_255
                ),
                G: Math.min(
                    toRGB.G,
                    BASE_255
                ),
                B: Math.min(
                    toRGB.B,
                    BASE_255
                )
            };

            if (relative_a) {
                const A = new CalcParser('a', relative_a, fromHWBVars).result;
                rgb.A = Math.min(A, 1);
            }

            this._rgb = rgb;

        } else {

            this._h = h;
            this._w = w;
            this._b = b;
            this._a = a;
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
        if (this._h) {
            const angleUnitMatch = this._h.match(HSL_HUE) as AngleUnitRegExpMatchArray;
            const angleUnit = angleUnitMatch.groups.units;
            return angleUnit === ''
                ? AnglesUnitEnum.NONE
                : angleUnit as AnglesUnitEnum;
        }
        return AnglesUnitEnum.NONE;
    }

    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._a);
    }

    static test(colorString: string): boolean {
        return COLORREGS.HWB.test(colorString);
    }

}