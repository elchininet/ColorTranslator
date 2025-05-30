import {
    CIELabRegExpMatchArray,
    ParserGetRgbObject,
    RGBObject
} from '@types';
import {
    BASE_255,
    COLORREGS,
    PCENT
} from '#constants';
import {
    getBase125Number,
    normalizeAlpha,
    percent
} from '#helpers';
import { labToRgb, rgbToLab } from '#color/translators';
import { CalcParser } from './_CalcParser';

export class CIELabStringParser {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        const match = colorString.match(COLORREGS.CIELab) as CIELabRegExpMatchArray;
        const groups = match.groups;

        const {
            // Lab values
            L,
            a,
            b,
            A,
            // Relative values
            from,
            relative_L,
            relative_a,
            relative_b,
            relative_A
        } = groups;

        if (from) {

            const fromRGB = getRGBObject(from);
            const fromLab = rgbToLab(
                fromRGB.R,
                fromRGB.G,
                fromRGB.B
            );
            const fromLabVars = {
                l: fromLab.L,
                a: fromLab.a,
                b: fromLab.b,
                alpha: fromRGB.A ?? 1
            };

            const L = new CalcParser('l', relative_L, fromLabVars).result;
            const a = new CalcParser('a', relative_a, fromLabVars).result;
            const b = new CalcParser('b', relative_b, fromLabVars).result;

            const toRGB = labToRgb(
                L,
                a,
                b
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

            if (relative_A) {
                const A = new CalcParser('a', relative_A, fromLabVars).result;
                rgb.A = Math.min(A, 1);
            }

            this._rgb = rgb;

        } else {

            this._L = L;
            this._a = a;
            this._b = b;
            this._A = A;
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