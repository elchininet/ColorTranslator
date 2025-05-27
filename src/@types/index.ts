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
    A?: NumberOrString;
}

export interface HWBObject {
    H: number;
    W: number;
    B: number;
    A?: number;
}

export interface HWBObjectGeneric {
    H: number;
    W: NumberOrString;
    B: NumberOrString;
    A?: NumberOrString;
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
    A?: NumberOrString;
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
    A?: NumberOrString;
}

export interface RYBObject {
    R: number;
    Y: number;
    B: number;
    A?: number;
}

export type RGYBObject = RGBObject | RYBObject;

export type Color = 
    | RGBObjectGeneric
    | HSLObjectGeneric
    | HWBObjectGeneric
    | CMYKObjectGeneric
    | CIELabObjectGeneric;

export type ColorWithoutCMYK =
    | RGBObjectGeneric
    | HSLObjectGeneric
    | HWBObjectGeneric
    | CIELabObjectGeneric;

export type ColorInput = string | Color;
export type ColorInputWithoutCMYK = string | ColorWithoutCMYK;
export type HEXOutput = string | HEXObject;
export type RGBOutput = string | RGBObject;
export type HWBOutput = string | HWBObject;
export type CIELabOutput = string | CIELabObject;
export type HSLOutput = string | HSLObject;
export type CMYKOutput = string | CMYKObject;
export type ColorOutput =
    | HEXOutput
    | RGBOutput
    | HSLOutput
    | HWBOutput
    | CIELabOutput;

export interface HEXRegExpMatchArray extends RegExpMatchArray {
    groups: {
        r: string;
        g: string;
        b: string;
        a: string | undefined;
        rr: string;
        gg: string;
        bb: string;
        aa: string | undefined;
    }
}

export interface RGBRegExpMatchArray extends RegExpMatchArray {
    groups: {
        r_legacy: string;
        g_legacy: string;
        b_legacy: string;
        a_legacy: string | undefined;
        r: string;
        g: string;
        b: string;
        a: string | undefined;
    }
}

export interface HSLRegExpMatchArray extends RegExpMatchArray {
    groups: {
        h_legacy: string;
        s_legacy: string;
        l_legacy: string;
        a_legacy: string | undefined;
        h: string;
        s: string;
        l: string;
        a: string | undefined;
    }
}

export interface HWBRegExpMatchArray extends RegExpMatchArray {
    groups: {
        h: string;
        w: string;
        b: string;
        a: string | undefined;
    }
}

export interface CIELabRegExpMatchArray extends RegExpMatchArray {
    groups: {
        L: string;
        a: string;
        b: string;
        A: string | undefined;
    }
}

export interface CMYKRegExpMatchArray extends RegExpMatchArray {
    groups: {
        c_legacy: string;
        m_legacy: string;
        y_legacy: string;
        k_legacy: string;
        a_legacy: string | undefined;
        c: string;
        m: string;
        y: string;
        k: string;
        a: string | undefined;
    }
}

export interface AngleUnitRegExpMatchArray extends RegExpMatchArray {
    groups: {
        number: string;
        units: string;
    }
}

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

export type MatchOptions = {
    [K in keyof Pick<Options, 'legacyCSS' | 'spacesAfterCommas' | 'cmykFunction'>]: number;
};