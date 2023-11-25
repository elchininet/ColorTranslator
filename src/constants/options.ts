import {
    Options,
    AnglesUnitEnum,
    ColorUnitEnum,
    CMYKFunctionEnum
} from '@types';
import { MAX_DECIMALS } from './numbers';

export const DEFAULT_OPTIONS: Options = {
    decimals: MAX_DECIMALS,
    legacyCSS: false,
    spacesAfterCommas: false,
    anglesUnit: AnglesUnitEnum.NONE,
    rgbUnit: ColorUnitEnum.NONE,
    labUnit: ColorUnitEnum.NONE,
    cmykUnit: ColorUnitEnum.PERCENT,
    alphaUnit: ColorUnitEnum.NONE,
    cmykFunction: CMYKFunctionEnum.DEVICE_CMYK
};