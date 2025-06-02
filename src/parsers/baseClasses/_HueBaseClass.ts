import { AnglesUnitEnum, AngleUnitRegExpMatchArray } from '@types';
import { HSL_HUE } from '#constants';
import { AlphaBaseClass } from './_AlphaBaseClass';

export class HueBaseClass extends AlphaBaseClass {
    protected _h: string;
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
}