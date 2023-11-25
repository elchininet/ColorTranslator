export type ColorArray = [number, number, number];

export type NumberOrString = number | string;

export interface HEXObject {
    R: string;
    G: string;
    B: string;
    A?: string;
}

export interface RGBObject {
    R: number;
    G: number;
    B: number;
    A?: number;
}

export interface RGBObjectGeneric {
    R: NumberOrString;
    G: NumberOrString;
    B: NumberOrString;
    A?: NumberOrString;
}

export interface HSLObject {
    H: number;
    S: number;
    L: number;
    A?: number;
}

export interface HSLObjectGeneric {
    H: number;
    S: NumberOrString;
    L: NumberOrString;
    A?: number;
}

export interface CIELabObject {
    L: number;
    a: number;
    b: number;
    A?: number;
}

export interface CIELabObjectGeneric {
    L: NumberOrString;
    a: NumberOrString;
    b: NumberOrString;
    A?: number;
}

export interface CMYKObject {
    C: number;
    M: number;
    Y: number;
    K: number;
    A?: number;
}

export interface CMYKObjectGeneric {
    C: NumberOrString;
    M: NumberOrString;
    Y: NumberOrString;
    K: NumberOrString;
    A?: number;
}

export interface RYBObject {
    R: number;
    Y: number;
    B: number;
    A?: number;
}

export type RGYBObject = RGBObject | RYBObject;

export type Color = RGBObjectGeneric | HSLObjectGeneric | CMYKObjectGeneric | CIELabObjectGeneric;
export type ColorWithoutCMYK = RGBObjectGeneric | HSLObjectGeneric | CIELabObjectGeneric;

export type ColorInput = string | Color;
export type ColorInputWithoutCMYK = string | ColorWithoutCMYK;
export type HEXOutput = string | HEXObject;
export type RGBOutput = string | RGBObject;
export type CIELabOutput = string | CIELabObject;
export type HSLOutput = string | HSLObject;
export type CMYKOutput = string | CMYKObject;
export type ColorOutput = HEXOutput | RGBOutput | HSLOutput | CIELabOutput;

export interface ObjectProps<T> {
    [key: string]: T;
}

export enum AnglesUnitEnum {
    NONE = 'none',
    DEGREES = 'deg',
    GRADIANS = 'grad',
    RADIANS = 'rad',
    TURNS = 'turn'
}

export enum ColorUnitEnum {
    NONE = 'none',
    PERCENT = 'percent',
}

export enum CMYKFunctionEnum {
    DEVICE_CMYK = 'device-cmyk',
    CMYK = 'cmyk'
}

export interface Options {
    decimals: number;
    legacyCSS: boolean;
    spacesAfterCommas: boolean;
    anglesUnit: AnglesUnitEnum;
    rgbUnit: ColorUnitEnum;
    labUnit: ColorUnitEnum;
    cmykUnit: ColorUnitEnum;
    alphaUnit: ColorUnitEnum;
    cmykFunction: CMYKFunctionEnum
}

export type InputOptions = Partial<
    Omit<
        Options,
        'anglesUnit' | 'rgbUnit' | 'labUnit' | 'cmykUnit' | 'alphaUnit' | 'cmykFunction'
    >
> & {
    anglesUnit?: `${AnglesUnitEnum}`;
    rgbUnit?: `${ColorUnitEnum}`;
    cmykUnit?: `${ColorUnitEnum}`;
    labUnit?: `${ColorUnitEnum}`,
    alphaUnit?: `${ColorUnitEnum}`;
    cmykFunction?: `${CMYKFunctionEnum}`
};