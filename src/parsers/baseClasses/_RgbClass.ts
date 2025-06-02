import { RGBObject } from '@types';

export class RgbClass {
    protected _rgb: RGBObject;
    public get rgb(): RGBObject {
        return this._rgb;
    }
}