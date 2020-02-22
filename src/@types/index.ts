export type NumberOrString = number | string;

export interface RGBObject {
    r: NumberOrString;
    g: NumberOrString;
    b: NumberOrString;
    a?: NumberOrString;
}

export interface RGBObjectFinal {
    r: number;
    g: number;
    b: number;
    a?: number;
}

export interface HSLObject {
    h: number;
    s: NumberOrString;
    l: NumberOrString;
    a?: number;
}

export interface HSLObjectFinal {
    h: number;
    s: number;
    l: number;
    a?: number;
}

export interface CMYKObject {
    c: NumberOrString;
    m: NumberOrString;
    y: NumberOrString;
    k: NumberOrString;
}

export interface CMYKObjectFinal {
    c: number;
    m: number;
    y: number;
    k: number;
}

export type Color = RGBObject | HSLObject | CMYKObject;

export type ColorInput = string | Color;
export type RGBOutput = string | RGBObject;
export type HSLOutput = string | HSLObject;
export type CMYKOutput = string | CMYKObject;
export type ColorOutput = RGBOutput | HSLOutput | CMYKOutput;

export type Omit<T, K> = Exclude<T, K>

export interface ObjectProps<T> {
    [key: string]: T;
}