import {
    AnglesUnitEnum,
    CMYKFunctionEnum,
    ColorUnitEnum,
    Options
} from '@types';
import {
    ColorKeywords,
    ColorModel,
    Harmony,
    Mix
} from './enums';

export const MAX_DECIMALS = 6;
export const DEFAULT_BLEND_STEPS = 5;
export const DEFAULT_SHADES_TINTS_STEPS = 5;
export const BASE_255 = 255;
export const MAX_HUE = 360;
export const MAX_PCENT = 100;
export const MAX_ALPHA = 1;
export const MAX_LAB = 125;
export const MAX_LCH_C = 150;
export const GRADIANS = 10 / 9;

export const COLOR_KEYS = Object.keys(ColorKeywords);

export const COLOR_PROPS = Object.freeze({
    HEX: ['R', 'G', 'B', 'A'],
    RGB: ['R', 'G', 'B', 'A'],
    HSL: ['H', 'S', 'L', 'A'],
    HWB: ['H', 'W', 'B', 'A'],
    CIELab: ['L', 'a', 'b', 'A'],
    LCH: ['L', 'C', 'H', 'A'],
    CMYK: ['C', 'M', 'Y', 'K', 'A']
});

export const VALID_COLOR_OBJECTS: Record<string, ColorModel> = Object.freeze({
    ABGR: ColorModel.RGB,
    ABHW: ColorModel.HWB,
    ACHL: ColorModel.LCH,
    ACKMY: ColorModel.CMYK,
    AHLS: ColorModel.HSL,
    ALAB: ColorModel.CIELab,
    BGR: ColorModel.RGB,
    BHW: ColorModel.HWB,
    CHL: ColorModel.LCH,
    CKMY: ColorModel.CMYK,
    HLS: ColorModel.HSL,
    LAB: ColorModel.CIELab
});

export type HarmonyString = `${Harmony}`;
export type MixString = `${Mix}`;

export const DEFAULT_OPTIONS: Options = Object.freeze({
    decimals: MAX_DECIMALS,
    legacyCSS: false,
    spacesAfterCommas: false,
    anglesUnit: AnglesUnitEnum.NONE,
    rgbUnit: ColorUnitEnum.NONE,
    labUnit: ColorUnitEnum.NONE,
    lchUnit: ColorUnitEnum.NONE,
    cmykUnit: ColorUnitEnum.PERCENT,
    alphaUnit: ColorUnitEnum.NONE,
    cmykFunction: CMYKFunctionEnum.DEVICE_CMYK
});

export const ERRORS = Object.freeze({
    NOT_ACCEPTED_INPUT: `The provided string color doesn't have a correct format`,
    NOT_A_VALID_RELATIVE_COLOR: 'is not a valid operation for a relative color'
});

export * from './regexps';
export * from './enums';