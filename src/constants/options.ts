import {
    Options,
    AnglesUnitEnum,
    ColorUnitEnum
} from '@types';
import { MAX_DECIMALS } from './numbers';

export const DEFAULT_OPTIONS: Options = {
    decimals: MAX_DECIMALS,
    legacyCSS: false,
    spacesAfterCommas: false,
    anglesUnit: AnglesUnitEnum.NONE,
    rgbUnit: ColorUnitEnum.NONE
};