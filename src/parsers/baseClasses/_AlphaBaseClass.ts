import { PCENT } from '#constants';
import { RgbClass } from './_RgbClass';

export class AlphaBaseClass extends RgbClass {
    protected _a: string | undefined;
    public get hasPercentageAlpha(): boolean {
        return PCENT.test(this._a);
    }
}