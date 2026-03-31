import {
    AnglesUnitEnum,
    ColorUnitEnum,
    CMYKFunctionEnum,
    Harmony,
    Mix
} from '#constants';

export type ColorArray = [number, number, number];

export type NumberOrString = number | string;

export type AnglesUnitEnumString = `${AnglesUnitEnum}`;
export type ColorUnitEnumString = `${ColorUnitEnum}`;
export type CMYKFunctionEnumString = `${CMYKFunctionEnum}`;
export type HarmonyString = `${Harmony}`;
export type MixString = `${Mix}`;

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

export interface LCHObject {
    L: number;
    C: number;
    H: number;
    A?: number;
}

export interface LCHObjectGeneric {
    L: NumberOrString;
    C: NumberOrString;
    H: NumberOrString;
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

export type ColorObject =
    | HEXObject
    | RGBObject
    | HSLObject
    | HWBObject
    | CIELabObject
    | LCHObject
    | CMYKObject;

export type Color =
    | RGBObjectGeneric
    | HSLObjectGeneric
    | HWBObjectGeneric
    | CMYKObjectGeneric
    | CIELabObjectGeneric
    | LCHObjectGeneric;

export type ColorWithoutCMYK =
    | RGBObjectGeneric
    | HSLObjectGeneric
    | HWBObjectGeneric
    | CIELabObjectGeneric
    | LCHObjectGeneric;

export type ColorInput = string | Color;
export type ColorInputWithoutCMYK = string | ColorWithoutCMYK;
export type HEXOutput = string | HEXObject;
export type RGBOutput = string | RGBObject;
export type HWBOutput = string | HWBObject;
export type CIELabOutput = string | CIELabObject;
export type LCHOutput = string | LCHObject;
export type HSLOutput = string | HSLObject;
export type CMYKOutput = string | CMYKObject;
export type ColorOutput =
    | HEXOutput
    | RGBOutput
    | HSLOutput
    | HWBOutput
    | CIELabOutput
    | LCHOutput;

export interface HEXRegExpMatchArray extends RegExpMatchArray {
    groups: {
        r: string;
        g: string;
        b: string;
        a?: string;
        rr: string;
        gg: string;
        bb: string;
        aa?: string;
    }
}

export interface RGBRegExpMatchArray extends RegExpMatchArray {
    groups: {
        // Legacy values
        r_legacy: string;
        g_legacy: string;
        b_legacy: string;
        a_legacy?: string;
        // RGB values
        r: string;
        g: string;
        b: string;
        a?: string;
        // Relative values
        from: string;
        relative_r: string;
        relative_g: string;
        relative_b: string;
        relative_a?: string;
    }
}

export interface HSLRegExpMatchArray extends RegExpMatchArray {
    groups: {
        // Legacy values
        h_legacy: string;
        s_legacy: string;
        l_legacy: string;
        a_legacy?: string;
        // HSL values
        h: string;
        s: string;
        l: string;
        a?: string;
        // Relative values
        from: string;
        relative_h: string;
        relative_s: string;
        relative_l: string;
        relative_a?: string;
    }
}

export interface HWBRegExpMatchArray extends RegExpMatchArray {
    groups: {
        // HWB values
        h: string;
        w: string;
        b: string;
        a?: string;
        // Relative values
        from: string;
        relative_h: string;
        relative_w: string;
        relative_b: string;
        relative_a?: string;
    }
}

export interface CIELabRegExpMatchArray extends RegExpMatchArray {
    groups: {
        // Lab values
        L: string;
        a: string;
        b: string;
        A?: string;
        // Relative values
        from: string;
        relative_L: string;
        relative_a: string;
        relative_b: string;
        relative_A?: string;
    }
}

export interface LCHRegExpMatchArray extends RegExpMatchArray {
    groups: {
        // LCH values
        l: string;
        c: string;
        h: string;
        a?: string;
        // Relative values
        from: string;
        relative_l: string;
        relative_c: string;
        relative_h: string;
        relative_a?: string;
    }
}

export interface CMYKRegExpMatchArray extends RegExpMatchArray {
    groups: {
        c_legacy: string;
        m_legacy: string;
        y_legacy: string;
        k_legacy: string;
        a_legacy?: string;
        c: string;
        m: string;
        y: string;
        k: string;
        a?: string;
    }
}

export interface AngleUnitRegExpMatchArray extends RegExpMatchArray {
    groups: {
        number: string;
        units: string;
    }
}

export interface Options {
    decimals: number;
    legacyCSS: boolean;
    spacesAfterCommas: boolean;
    anglesUnit: AnglesUnitEnumString;
    rgbUnit: ColorUnitEnumString;
    labUnit: ColorUnitEnumString;
    lchUnit: ColorUnitEnumString,
    cmykUnit: ColorUnitEnumString;
    alphaUnit: ColorUnitEnumString;
    cmykFunction: CMYKFunctionEnumString;
}

export type InputOptions = Partial<Options>;

export type MatchOptions = {
    [K in keyof Pick<Options, 'legacyCSS' | 'spacesAfterCommas' | 'cmykFunction'>]: number;
};

export type HarmonyFunction = (color: HSLObject, mode: MixString) => HSLObject[];

export type StaticFunctionColorOutput<C> =
    C extends HEXObject           ? HEXObject    :
    C extends RGBObject           ? RGBObject    :
    C extends HSLObjectGeneric    ? HSLObject    :
    C extends HWBObjectGeneric    ? HWBObject    :
    C extends CIELabObjectGeneric ? CIELabObject :
    C extends LCHObjectGeneric    ? LCHObject    :
    string;

export type StaticFunctionReturn<C extends ColorInputWithoutCMYK> = StaticFunctionColorOutput<C>[];

export type GetBlendOverload<C> = {
    (from: ColorInput, to: ColorInput, options?: InputOptions): C[];
    (from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): C[];
};

export type GetMixOverload<C> = {
    (color: ColorInput[], options?: InputOptions): C;
    (color: ColorInput[], mode?: MixString, options?: InputOptions): C;
};

export type CSSTransformer =
    | ((value: NumberOrString, index: number) => NumberOrString)
    | ((value: NumberOrString) => NumberOrString);

export interface CSSOptionsBase {
    hasAlpha: boolean;
}

export type CSSCalcVars = Record<string, number>;
