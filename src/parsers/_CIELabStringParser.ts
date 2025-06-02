import {
    CIELabRegExpMatchArray,
    ParserGetRgbObject,
    RGBObject
} from '@types';
import {
    COLORREGS,
    MAX_ALPHA,
    MAX_LAB,
    MAX_PCENT,
    PCENT
} from '#constants';
import {
    getBase125Number,
    minmax,
    normalizeAlpha,
    percent
} from '#helpers';
import { labToRgb, rgbToLab } from '#color/translators';
import { CalcParser } from './_CalcParser';
import { AlphaBaseClass } from './baseClasses/_AlphaBaseClass';

export class CIELabStringParser extends AlphaBaseClass {

    constructor(colorString: string, getRGBObject: ParserGetRgbObject) {

        super();

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

            const rgb = labToRgb(
                minmax(L, 0, MAX_PCENT),
                minmax(a, - MAX_LAB, MAX_LAB),
                minmax(b, - MAX_LAB, MAX_LAB)
            );

            if (relative_A) {
                const A = new CalcParser('alpha', relative_A, fromLabVars).result;
                rgb.A = minmax(A, 0, MAX_ALPHA);
            }

            this._rgb = rgb;

        } else {

            this._L = L;
            this._A = a;
            this._B = b;
            this._a = A;
            const rgb: RGBObject = labToRgb(
                percent(this._L),
                getBase125Number(this._A),
                getBase125Number(this._B)
            );
            if (this._a !== undefined) {
                rgb.A = normalizeAlpha(this._a);
            }
            this._rgb = rgb;

        }
    }

    private _L: string;
    private _A: string;
    private _B: string;

    public get hasPercentageValues(): boolean {
        return (
            PCENT.test(this._L) &&
            PCENT.test(this._A) &&
            PCENT.test(this._B)
        );
    }

    static test(colorString: string): boolean {
        return COLORREGS.CIELab.test(colorString);
    }

}