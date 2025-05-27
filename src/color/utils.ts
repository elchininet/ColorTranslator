import {
    AnglesUnitEnum,
    CIELabObject,
    CIELabObjectGeneric,
    CIELabOutput,
    CMYKFunctionEnum,
    CMYKObject,
    CMYKObjectGeneric,
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    ColorOutput,
    ColorUnitEnum,
    HEXObject,
    HEXOutput,
    HSLObject,
    HSLObjectGeneric,
    HSLOutput,
    HWBObject,
    HWBObjectGeneric,
    HWBOutput,
    InputOptions,
    MatchOptions,
    Options,
    RGBObject,
    RGBObjectGeneric,
    RGBOutput,
    RGYBObject,
    RYBObject
} from '@types';
import {
    COLOR_KEYS,
    ColorKeywords,
    ColorModel,
    COLORREGS,
    COMMAS_AND_NEXT_CHARS,
    DEFAULT_OPTIONS,
    ERRORS,
    HEX,
    Mix,
    MixString,
    PCENT,
    SPACES,
    TypeOf,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    getBase125Number,
    getBase255Number,
    getCMYKNumber,
    getHEX,
    getOrderedArrayString,
    hasProp,
    minmax,
    normalizeAlpha,
    normalizeHue,
    percent,
    round
} from '#helpers';
import {
    CIELabStringParser,
    CMYKStringParser,
    HEXStringParser,
    HSLStringParser,
    HWBStringParser,
    RGBStringParser
} from '#parsers';
import {
    cmykToRGB,
    hslToRGB,
    hueRYB,
    hwbToRgb,
    labToRgb,
    rgbToCMYK,
    rgbToHSL,
    rgbToHwb,
    rgbToLab,
    rgbToRYB,
    rybToRGB
} from '#color/translators';
import { CSS } from '#color/css';

type HarmonyFunction = (color: HSLObject, mode: MixString) => HSLObject[];

//---Harmony
const harmony = (
    color: HSLObject,
    angles: number[],
    mode: MixString
): HSLObject[] =>
    angles.reduce(
        (arr: HSLObject[], num: number): HSLObject[] =>
            (
                [
                    ...arr,
                    {
                        ...color,
                        H: mode === Mix.ADDITIVE
                            ? normalizeHue(color.H + num)
                            : normalizeHue(hueRYB(hueRYB(color.H, false) + num, true))
                    }
                ]
            ), [{...color}]
    );

export const analogous          = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [30, -30], mode);
export const complementary      = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [180], mode);
export const splitComplementary = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [150, -150], mode);
export const triadic            = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [120, -120], mode);
export const tetradic           = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [60, -120, 180], mode);
export const square             = (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [90, -90, 180], mode);

//---Detect the color model from an string
const getColorModelFromString = (color: string): ColorModel => {
    let model;
    Object.keys(ColorModel).some((p: ColorModel): boolean => {
        const reg = COLORREGS[p];
        if (reg.test(color)) {
            model = p;
            return true;
        }
    });
    if (
        !model &&
        !!~COLOR_KEYS.indexOf(color)
    ) {
        model = ColorModel.HEX;
    }
    if (!model) {
        throw new Error(ERRORS.NOT_ACCEPTED_STRING_INPUT);
    }
    return model;
};

//---Detect the color model from an object
const getColorModelFromObject = (color: Color): ColorModel => {

    let model: ColorModel;
    let invalid = false;
    const props = getOrderedArrayString(Object.keys(color));

    if(VALID_COLOR_OBJECTS[props]) {
        model = VALID_COLOR_OBJECTS[props];
    }

    if (model && model === ColorModel.RGB) {

        const hasInvalidHex = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !HEX.test(`${item[1]}`);
        });

        const hasInvalidRegb = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !(
                PCENT.test(`${item[1]}`) ||
                (
                    !HEX.test(`${item[1]}`) &&
                    !isNaN(+item[1]) &&
                    +item[1] <= 255
                )
            );
        });

        if (hasInvalidHex && hasInvalidRegb) {
            invalid = true;
        }

        if (!hasInvalidHex) {
            model = ColorModel.HEX;
        }

    }
    if (!model || invalid) {
        throw new Error(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);
    }
    return model;
};

//---Detect the color model
export const getColorModel = (color: string | Color): ColorModel => typeof color === 'string'
    ? getColorModelFromString(color)
    : getColorModelFromObject(color);

//---Convert a color string to an RGB object
export const getRGBObjectFromString = {
    [ColorModel.HEX](color: string): RGBObject {
        const colorStr = !~COLOR_KEYS.indexOf(color)
            ? color
            : ColorKeywords[color as keyof typeof ColorKeywords];
        return new HEXStringParser(colorStr).rgb;
    },
    [ColorModel.RGB](color: string): RGBObject {
        return new RGBStringParser(color).rgb;
    },
    [ColorModel.HSL](color: string): RGBObject {
        return new HSLStringParser(color).rgb;
    },
    [ColorModel.HWB](color: string): RGBObject {
        return new HWBStringParser(color).rgb;
    },
    [ColorModel.CIELab](color: string): RGBObject {
        return new CIELabStringParser(color).rgb;
    },
    [ColorModel.CMYK](color: string): RGBObject {
        return new CMYKStringParser(color).rgb;
    }
};

//---Convert a color object to an RGB object
export const getRGBObjectFromObject = {
    [ColorModel.HEX](color: RGBObjectGeneric): RGBObject {
        const object: RGBObject = {
            R: getBase255Number(`${color.R}`),
            G: getBase255Number(`${color.G}`),
            B: getBase255Number(`${color.B}`)
        };
        if (hasProp<RGBObjectGeneric>(color, 'A')) {
            object.A = Math.min(getBase255Number(`${color.A}`, true), 1);
        }
        return object;
    },
    [ColorModel.RGB](color: RGBObjectGeneric): RGBObject {
        return this.HEX(color);
    },
    [ColorModel.HSL](color: HSLObjectGeneric): RGBObject {
        const S = percent(`${color.S}`);
        const L = percent(`${color.L}`);
        const RGB = hslToRGB(normalizeHue(color.H), S, L);
        if (hasProp<HSLObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    },
    [ColorModel.HWB](color: HWBObjectGeneric): RGBObject {
        const W = percent(`${color.W}`);
        const B = percent(`${color.B}`);
        const RGB = hwbToRgb(normalizeHue(color.H), W, B);
        if (hasProp<HWBObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    },
    [ColorModel.CIELab](color: CIELabObjectGeneric): RGBObject {
        const L = percent(`${color.L}`);
        const a = getBase125Number(`${color.a}`);
        const b = getBase125Number(`${color.b}`);
        const RGB = labToRgb(L, a, b);
        if (hasProp<CIELabObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    },
    [ColorModel.CMYK](color: CMYKObjectGeneric): RGBObject {
        const C = getCMYKNumber(`${color.C}`);
        const M = getCMYKNumber(`${color.M}`);
        const Y = getCMYKNumber(`${color.Y}`);
        const K = getCMYKNumber(`${color.K}`);
        const RGB = cmykToRGB(C, M, Y, K);
        if (hasProp<CMYKObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    }
};

export const getOptionsFromColorInput = (options: InputOptions, ...colors: ColorInput[]): Options => {
    const cssColors: string[] = [];
    const anglesUnits: AnglesUnitEnum[] = [];
    const rgbColors: boolean[] = [];
    const labColors: boolean[] = [];
    const cmykColors: boolean[] = [];
    const alphaValues: boolean[] = [];
    const anglesUnitValues = Object.values<string>(AnglesUnitEnum);
    const colorUnitValues = Object.values<string>(ColorUnitEnum);
    const cmykFunctionValues = Object.values<string>(CMYKFunctionEnum);

    const matchOptions: MatchOptions = {
        legacyCSS: 0,
        spacesAfterCommas: 0,
        cmykFunction: 0
    };

    for(const color of colors) {

        if (typeof color === 'string') {

            cssColors.push(color);

            if (color.includes(',')){
                matchOptions.legacyCSS ++;
                const commasWithNextCharacter = color.match(COMMAS_AND_NEXT_CHARS);
                if (
                    new Set(commasWithNextCharacter).size === 1 &&
                    SPACES.test(commasWithNextCharacter[0].slice(1))
                ) {
                    matchOptions.spacesAfterCommas ++;
                }
            }

            if (HSLStringParser.test(color)) {
                const parser = new HSLStringParser(color);
                anglesUnits.push(parser.angleUnit);
                alphaValues.push(
                    parser.hasPercentageAlpha
                );
                continue;
            }

            if (HWBStringParser.test(color)) {
                const parser = new HWBStringParser(color);
                anglesUnits.push(parser.angleUnit);
                alphaValues.push(
                    parser.hasPercentageAlpha
                );
                continue;
            }

            if (RGBStringParser.test(color)) {
                const parser = new RGBStringParser(color);
                rgbColors.push(
                    parser.hasPercentageValues
                );
                alphaValues.push(
                    parser.hasPercentageAlpha
                );
                continue;
            }

            if (CIELabStringParser.test(color)) {
                const parser = new CIELabStringParser(color);
                labColors.push(
                    parser.hasPercentageValues
                );
                alphaValues.push(
                    parser.hasPercentageAlpha
                );
                continue;
            }

            if (CMYKStringParser.test(color)) {
                const parser = new CMYKStringParser(color);
                cmykColors.push(
                    parser.hasPercentageValues
                );
                if (color.startsWith('cmyk')) {
                    matchOptions.cmykFunction ++;
                }
                alphaValues.push(
                    parser.hasPercentageAlpha
                );
            }

        }

    }
    return {
        decimals: typeof options.decimals === TypeOf.NUMBER
            ? options.decimals
            : DEFAULT_OPTIONS.decimals,
        legacyCSS: typeof options.legacyCSS === TypeOf.BOOLEAN
            ? options.legacyCSS
            : Boolean(
                cssColors.length &&
                matchOptions.legacyCSS === cssColors.length
            ) || DEFAULT_OPTIONS.legacyCSS,
        spacesAfterCommas: typeof options.spacesAfterCommas === TypeOf.BOOLEAN
            ? options.spacesAfterCommas
            : Boolean(
                cssColors.length &&
                matchOptions.spacesAfterCommas === cssColors.length
            ) || DEFAULT_OPTIONS.spacesAfterCommas,
        anglesUnit: options.anglesUnit && anglesUnitValues.includes(options.anglesUnit)
            ? options.anglesUnit as AnglesUnitEnum
            : (
                new Set(anglesUnits).size === 1
                    ? anglesUnits[0]
                    : DEFAULT_OPTIONS.anglesUnit
            ),
        rgbUnit: options.rgbUnit && colorUnitValues.includes(options.rgbUnit)
            ? options.rgbUnit as ColorUnitEnum
            : (
                new Set(rgbColors).size === 1 && rgbColors[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.rgbUnit
            ),
        labUnit: options.labUnit && colorUnitValues.includes(options.labUnit)
            ? options.labUnit as ColorUnitEnum
            : (
                new Set(labColors).size === 1 && labColors[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.labUnit
            ),
        cmykUnit: options.cmykUnit && colorUnitValues.includes(options.cmykUnit)
            ? options.cmykUnit as ColorUnitEnum
            : (
                new Set(cmykColors).size === 1 && !cmykColors[0]
                    ? ColorUnitEnum.NONE
                    : DEFAULT_OPTIONS.cmykUnit
            ),
        alphaUnit: options.alphaUnit && colorUnitValues.includes(options.alphaUnit)
            ? options.alphaUnit as ColorUnitEnum
            : (
                new Set(alphaValues).size === 1 && alphaValues[0]
                    ? ColorUnitEnum.PERCENT
                    : DEFAULT_OPTIONS.alphaUnit
            ),
        cmykFunction: options.cmykFunction && cmykFunctionValues.includes(options.cmykFunction)
            ? options.cmykFunction as CMYKFunctionEnum
            : (
                cmykColors.length && cmykColors.length === matchOptions.cmykFunction
                    ? CMYKFunctionEnum.CMYK
                    : DEFAULT_OPTIONS.cmykFunction
            )
    };
};

export const getRGBObject = (color: ColorInput, model: ColorModel = getColorModel(color)): RGBObject => {
    return typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model](
            color as (
                RGBObjectGeneric &
                HSLObjectGeneric &
                HWBObjectGeneric &
                CIELabObjectGeneric &
                CMYKObjectGeneric
            )
        );
};

//---Get the color values from an object
export const translateColor = {

    [ColorModel.HEX](color: RGBObject): HEXObject {
        return {
            R: getHEX(color.R),
            G: getHEX(color.G),
            B: getHEX(color.B)
        };
    },

    HEXA(color: RGBObject): HEXObject {
        const RGB = translateColor.HEX(color);
        RGB.A = hasProp<RGBObject>(color, 'A')
            ? getHEX(color.A * 255)
            : '0xFF';
        return RGB;
    },

    [ColorModel.RGB](color: RGBObject, decimals: number): RGBObject {
        const RGB = roundRGBObject(color, decimals);
        if (hasProp<RGBObject>(RGB, 'A')) {
            delete RGB.A;
        }
        return RGB;
    },

    RGBA(color: RGBObject, decimals: number): RGBObject {
        const RGB = translateColor.RGB(color, decimals);
        RGB.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A)
            : 1;
        return RGB;
    },

    [ColorModel.HSL](color: RGBObject, decimals: number): HSLObject {
        const HSL = rgbToHSL(color.R, color.G, color.B);
        delete HSL.A;
        return roundHSLObject(HSL, decimals);
    },

    HSLA(color: RGBObject, decimals: number): HSLObject {
        const HSL = translateColor.HSL(color, decimals);
        HSL.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return HSL;
    },

    [ColorModel.HWB](color: RGBObject, decimals: number): HWBObject {
        const HWB = rgbToHwb(color.R, color.G, color.B);
        delete HWB.A;
        return roundHWBObject(HWB, decimals);
    },

    HWBA(color: RGBObject, decimals: number): HWBObject {
        const HWB = translateColor.HWB(color, decimals);
        HWB.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return HWB;
    },

    [ColorModel.CIELab](color: RGBObject, decimals: number): CIELabObject {
        const Lab = rgbToLab(color.R, color.G, color.B);
        return roundCIELabObject(Lab, decimals);
    },

    CIELabA(color: RGBObject, decimals: number): CIELabObject {
        const Lab = translateColor.CIELab(color, decimals);
        Lab.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return Lab;
    },

    [ColorModel.CMYK](color: RGBObject, decimals: number): CMYKObject {
        return roundCMYKObject(
            rgbToCMYK(color.R, color.G, color.B),
            decimals
        );
    },

    CMYKA(color: RGBObject, decimals: number): CMYKObject {
        const CMYK = translateColor.CMYK(color, decimals);
        CMYK.A = hasProp<RGBObject>(color, 'A')
            ? round(color.A, decimals)
            : 1;
        return CMYK;
    }
};

//---Blending
export const blend = (from: RGBObject, to: RGBObject, steps: number): RGBObject[] => {
    const div = steps - 1;
    const diffR = (to.R - from.R) / div;
    const diffG = (to.G - from.G) / div;
    const diffB = (to.B - from.B) / div;
    const fromA = normalizeAlpha(from.A);
    const toA = normalizeAlpha(to.A);
    const diffA = (toA - fromA) / div;
    return Array(steps).fill(null).map((__n, i): RGBObject => {
        if (i === 0) { return from; }
        if (i === div) { return to; }
        return {
            R: round(from.R + diffR * i),
            G: round(from.G + diffG * i),
            B: round(from.B + diffB * i),
            A: round(fromA + diffA * i)
        };
    });
};

//---Shades
export const getColorMixture = (
    color: ColorInputWithoutCMYK,
    steps: number,
    shades: boolean,
    options: Options
): ColorOutput[] => {
    const model = getColorModel(color);
    const isCSS = typeof color === 'string';
    const RGB = getRGBObject(color, model);
    const hasAlpha = (
        (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
        (typeof color !== 'string' && hasProp<RGBObjectGeneric | HSLObjectGeneric | HWBObjectGeneric | CIELabObjectGeneric>(color, 'A'))
    );
    const HSL: HSLObject = rgbToHSL(RGB.R, RGB.G, RGB.B, RGB.A);
    if (!hasAlpha) delete HSL.A;
    const increment = shades
        ? HSL.L / (steps + 1)
        : (100 - HSL.L) / (steps + 1);
    const hslMap = Array(steps).fill(null).map((__n, i): HSLObject => ({
        ...HSL,
        L: HSL.L + increment * (i + 1) * (1 - +shades * 2)
    }));
    switch(model) {
        case ColorModel.HEX:
        default:
            return hslMap.map((HSLColor: HSLObject): HEXOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? hasAlpha
                        ? CSS.HEX(
                            {
                                ...RGBColor,
                                A: round(RGBColor.A * 255)
                            }
                        )
                        : CSS.HEX(RGBColor)
                    : hasAlpha
                        ? translateColor.HEXA(RGBColor)
                        : translateColor.HEX(RGBColor);
            });
        case ColorModel.RGB:
            return hslMap.map((HSLColor: HSLObject): RGBOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? CSS.RGB(RGBColor, options)
                    : hasAlpha
                        ? translateColor.RGBA(RGBColor, options.decimals)
                        : translateColor.RGB(RGBColor, options.decimals);
            });
        case ColorModel.HSL:
            return hslMap.map((HSLColor: HSLObject): HSLOutput => {
                return isCSS
                    ? CSS.HSL(HSLColor, options)
                    : hasAlpha
                        ? translateColor.HSLA(
                            {
                                ...hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L),
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                        : translateColor.HSL(
                            hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L),
                            options.decimals
                        );
            });
        case ColorModel.HWB:
            return hslMap.map((HSLColor: HSLObject): HWBOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                const HWBColor = rgbToHwb(RGBColor.R, RGBColor.G, RGBColor.B);
                if (hasAlpha) HWBColor.A = HSLColor.A;
                return isCSS
                    ? CSS.HWB(HWBColor, options)
                    : translateColor.HWB(
                        RGBColor,
                        options.decimals
                    );
            });
        case ColorModel.CIELab:
            return hslMap.map((HSLColor: HSLObject): CIELabOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                return isCSS
                    ? CSS.CIELab(
                        hasAlpha
                            ? translateColor.CIELabA(RGBColor, options.decimals)
                            : translateColor.CIELab(RGBColor, options.decimals),
                        options
                    )
                    : hasAlpha
                        ? translateColor.CIELabA(
                            {
                                ...RGBColor,
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                        : translateColor.CIELab(
                            RGBColor,
                            options.decimals
                        );
            });

    }
};

//---Harmony
export const colorHarmony = {

    buildHarmony(
        color: ColorInputWithoutCMYK,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        options: Options
    ): ColorOutput[] {
        const model = getColorModel(color);
        const RGB = getRGBObject(color, model);
        const HSL = rgbToHSL(RGB.R, RGB.G, RGB.B, RGB.A);
        const hasAlpha = (
            (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
            (typeof color !== 'string' && hasProp<RGBObjectGeneric | HSLObjectGeneric | HWBObjectGeneric | CIELabObjectGeneric>(color, 'A'))
        );
        const isCSS = typeof color === 'string';
        switch(model) {
            case ColorModel.HEX:
            default:
                return hasAlpha
                    ? this.HEXA(
                        roundHSLObject(HSL, 0),
                        harmonyFunction,
                        mode,
                        isCSS
                    )
                    : this.HEX(
                        roundHSLObject(HSL, 0),
                        harmonyFunction,
                        mode,
                        isCSS
                    );
            case ColorModel.HSL:
                return hasAlpha
                    ? this.HSLA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.HSL(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.HWB:
                return hasAlpha
                    ? this.HWBA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.HWB(HSL, harmonyFunction, mode, isCSS, options)
            case ColorModel.RGB:
                return hasAlpha
                    ? this.RGBA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.RGB(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.CIELab:
                return hasAlpha
                    ? this.CIELabA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.CIELab(HSL, harmonyFunction, mode, isCSS, options);
        }
    },

    [ColorModel.HEX](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        hslToRGB(c.H, c.S, c.L)
                    )
                    : translateColor.HEX(
                        hslToRGB(c.H, c.S, c.L)
                    )
            )
        );
    },

    HEXA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput => (
                css
                    ? CSS.HEX(
                        {
                            ...hslToRGB(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A) * 255
                        }
                    )
                    : translateColor.HEXA({
                        ...hslToRGB(c.H, c.S, c.L),
                        A: normalizeAlpha(c.A)
                    })
            )
        );
    },

    [ColorModel.RGB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        hslToRGB(c.H, c.S, c.L),
                        options
                    )
                    : translateColor.RGB(
                        hslToRGB(c.H, c.S, c.L),
                        options.decimals
                    )
            )
        );
    },

    RGBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput => (
                css
                    ? CSS.RGB(
                        {
                            ...hslToRGB(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.RGBA(
                        {
                            ...hslToRGB(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    )
            )
        );
    },

    [ColorModel.HSL](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        {
                            H: c.H,
                            S: c.S,
                            L: c.L
                        },
                        options
                    )
                    : translateColor.HSL(
                        hslToRGB(c.H, c.S, c.L),
                        options.decimals
                    )
            )
        );
    },

    HSLA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput => (
                css
                    ? CSS.HSL(
                        {
                            ...c,
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.HSLA(
                        {
                            ...hslToRGB(c.H, c.S, c.L),
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    )
            )
        );
    },

    [ColorModel.HWB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HWBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HWBOutput => {
                const rgb = hslToRGB(c.H, c.S, c.L);
                const hwb = rgbToHwb(rgb.R, rgb.G, rgb.B);
                return css
                    ? CSS.HWB(
                        {
                            H: hwb.H,
                            W: hwb.W,
                            B: hwb.B
                        },
                        options
                    )
                    : translateColor.HWB(
                        rgb,
                        options.decimals
                    );
            }
        );
    },

    HWBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): HWBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HWBOutput => {
                const rgb = hslToRGB(c.H, c.S, c.L);
                const hwb = rgbToHwb(rgb.R, rgb.G, rgb.B);
                return css
                    ? CSS.HWB(
                        {
                            ...hwb,
                            A: normalizeAlpha(c.A)
                        },
                        options
                    )
                    : translateColor.HWBA(
                        {
                            ...rgb,
                            A: normalizeAlpha(c.A)
                        },
                        options.decimals
                    );
            }
        );
    },

    [ColorModel.CIELab](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): CIELabOutput => {
                const RGB = hslToRGB(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.CIELab(
                            rgbToLab(
                                RGB.R,
                                RGB.G,
                                RGB.B
                            ),
                            options
                        )
                        : translateColor.CIELab(
                            RGB,
                            options.decimals
                        )
                );
            }
        );
    },

    CIELabA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: MixString,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): CIELabOutput => {
                const RGB = hslToRGB(c.H, c.S, c.L);
                return (
                    css
                        ? CSS.CIELab(
                            {
                                ...rgbToLab(
                                    RGB.R,
                                    RGB.G,
                                    RGB.B
                                ),
                                A: normalizeAlpha(c.A)
                            },
                            options
                        )
                        : translateColor.CIELabA(
                            {
                                ...RGB,
                                A: normalizeAlpha(c.A)
                            },
                            options.decimals
                        )
                );
            }
        );
    }
};

export const colorMixer = {

    mix(colors: ColorInput[], mode: MixString): RGBObject {

        const rgbMap = colors.map((color: ColorInput): RGBObject => {
            const model = getColorModel(color);
            return getRGBObject(color, model);
        });

        const rybMap = mode === Mix.SUBTRACTIVE
            ? rgbMap.map((color: RGBObject): RYBObject => {
                const RYB = rgbToRYB(color.R, color.G, color.B);
                if (hasProp<RGBObject>(color, 'A')) {
                    RYB.A = color.A;
                }
                return RYB;
            })
            : null;

        function createMix(items: RGBObject[]): RGBObject;
        function createMix(items: RYBObject[]): RYBObject;
        function createMix(items: RGYBObject[]): RGYBObject {
            const initial = mode === Mix.ADDITIVE
                ? {R: 0, G: 0, B: 0, A: 0}
                : {R: 0, Y: 0, B: 0, A: 0};
            return items.reduce((mix: RGYBObject, color: RGYBObject): RGYBObject => {
                const colorA = hasProp<RGYBObject>(color, 'A') ? color.A : 1;
                const common = {
                    R: Math.min(mix.R  + color.R * colorA, 255),
                    B: Math.min(mix.B + color.B * colorA, 255),
                    A: 1 - (1 - colorA) * (1 - mix.A)
                };
                const mixGY = 'G' in mix
                    ? mix.G
                    : mix.Y;
                const colorGY = 'G' in color
                    ? color.G
                    : color.Y;
                return {
                    ...common,
                    ...(mode === Mix.ADDITIVE
                        ? { G: Math.min(mixGY + colorGY * colorA, 255) }
                        : { Y: Math.min(mixGY + colorGY * colorA, 255) }
                    )
                };
            }, initial);
        }

        let mix: RGBObject;

        if (mode === Mix.ADDITIVE) {
            mix = createMix(rgbMap);
        } else {
            const RYB = createMix(rybMap);
            mix = rybToRGB(RYB.R, RYB.Y, RYB.B);
            mix.A = RYB.A;
        }

        return {
            R: round(mix.R),
            G: round(mix.G),
            B: round(mix.B),
            A: minmax(mix.A, 0, 1)
        };
    },
    [ColorModel.HEX]<CSS extends boolean, R = CSS extends true ? string : HEXObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEX(mix)
        ) as R;
    },
    HEXA<CSS extends boolean, R = CSS extends true ? string : HEXObject >(
        colors: ColorInput[],
        mode: MixString,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        mix.A = css
            ? normalizeAlpha(mix.A) * 255
            : normalizeAlpha(mix.A);
        return (
            css
                ? CSS.HEX(mix)
                : translateColor.HEXA(mix)
        ) as R;
    },
    [ColorModel.RGB]<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGB(mix, options.decimals)
        ) as R;
    },
    RGBA<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        return (
            css
                ? CSS.RGB(mix, options)
                : translateColor.RGBA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.HSL]<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHSL(mix.R, mix.G, mix.B);
        delete mix.A;
        delete HSL.A;
        return (
            css
                ? CSS.HSL(HSL, options)
                : translateColor.HSL(mix, options.decimals)
        ) as R;
    },
    HSLA<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHSL(mix.R, mix.G, mix.B, mix.A);
        return (
            css
                ? CSS.HSL(HSL, options)
                : translateColor.HSLA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.HWB]<CSS extends boolean, R = CSS extends true ? string : HWBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HWB = rgbToHwb(mix.R, mix.G, mix.B);
        delete mix.A;
        delete HWB.A;
        return (
            css
                ? CSS.HWB(HWB, options)
                : translateColor.HWB(mix, options.decimals)
        ) as R;
    },
    HWBA<CSS extends boolean, R = CSS extends true ? string : HWBObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HWB = rgbToHwb(mix.R, mix.G, mix.B, mix.A);
        return (
            css
                ? CSS.HWB(HWB, options)
                : translateColor.HWBA(mix, options.decimals)
        ) as R;
    },
    [ColorModel.CIELab]<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        delete mix.A;
        return (
            css
                ? CSS.CIELab(Lab, options)
                : translateColor.CIELabA(mix, options.decimals)
        ) as R;
    },
    CIELabA<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: MixString,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        if (hasProp<RGBObject>(mix, 'A')) {
            Lab.A = mix.A;
        }
        return (
            css
                ? CSS.CIELab(Lab, options)
                : translateColor.CIELabA(mix, options.decimals)
        ) as R;
    }
};

export const roundRGBObject = (
    color: RGBObject,
    decimals: number
): RGBObject => {
    const R = round(color.R, decimals);
    const G = round(color.G, decimals);
    const B = round(color.B, decimals);
    return {
        R,
        G,
        B,
        ...(
            hasProp<RGBObject>(color, 'A')
                ? {
                    A: round(color.A, decimals)
                }
                : {}
        )
    };
};

export const roundHSLObject = (
    color: HSLObject,
    decimals: number
): HSLObject => {
    return {
        H: round(color.H, decimals),
        S: round(color.S, decimals),
        L: round(color.L, decimals)
    };
};

export const roundHWBObject = (
    color: HWBObject,
    decimals: number
): HWBObject => {
    return {
        H: round(color.H, decimals),
        W: round(color.W, decimals),
        B: round(color.B, decimals)
    };
};

export const roundCIELabObject = (
    color: CIELabObject,
    decimals: number
): CIELabObject => {
    return {
        L: round(color.L, decimals),
        a: round(color.a, decimals),
        b: round(color.b, decimals)
    };
};

export const roundCMYKObject = (
    color: CMYKObject,
    decimals: number
): CMYKObject => {
    return {
        C: round(color.C, decimals),
        M: round(color.M, decimals),
        Y: round(color.Y, decimals),
        K: round(color.K, decimals)
    };
};