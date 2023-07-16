export type NumberOrString = number | string;

export interface HEXObject {
    r: string;
    g: string;
    b: string;
    a?: string;
}

export interface RGBObject {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface RGBObjectGeneric {
    r: NumberOrString;
    g: NumberOrString;
    b: NumberOrString;
    a?: NumberOrString;
}

export interface HSLObject {
    h: number;
    s: number;
    l: number;
    a?: number;
}

export interface HSLObjectGeneric {
    h: number;
    s: NumberOrString;
    l: NumberOrString;
    a?: number;
}

export interface CMYKObject {
    c: number;
    m: number;
    y: number;
    k: number;
    a?: number;
}

export interface CMYKObjectGeneric {
    c: NumberOrString;
    m: NumberOrString;
    y: NumberOrString;
    k: NumberOrString;
    a?: number;
}

export interface RYBObject {
    r: number;
    y: number;
    b: number;
    a?: number;
}

export type RGYBObject = RGBObject | RYBObject;

export type Color = RGBObjectGeneric | HSLObjectGeneric | CMYKObjectGeneric;
export type ColorWithoutCMYK = RGBObjectGeneric | HSLObjectGeneric;

export type ColorInput = string | Color;
export type ColorInputWithoutCMYK = string | ColorWithoutCMYK;
export type HEXOutput = string | HEXObject;
export type RGBOutput = string | RGBObject;
export type HSLOutput = string | HSLObject;
export type CMYKOutput = string | CMYKObject;
export type ColorOutput = HEXOutput | RGBOutput | HSLOutput;

export interface ObjectProps<T> {
    [key: string]: T;
}

export interface Options {
    decimals: number;
    legacyCSS: boolean;
    spacesAfterCommas: boolean;
}

export type InputOptions = Partial<Options>;