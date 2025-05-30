import {
    AnglesUnitEnum,
    CIELabObjectGeneric,
    CMYKFunctionEnum,
    CMYKObjectGeneric,
    Color,
    ColorInput,
    ColorUnitEnum,
    HSLObjectGeneric,
    HWBObjectGeneric,
    InputOptions,
    MatchOptions,
    Options,
    RGBObject,
    RGBObjectGeneric
} from '@types';
import {
    BASE_255,
    COLOR_KEYS,
    ColorKeywords,
    ColorModel,
    COLORREGS,
    COMMAS_AND_NEXT_CHARS,
    DEFAULT_OPTIONS,
    ERRORS,
    HEX,
    PCENT,
    SPACES,
    TypeOf,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    getBase125Number,
    getBase255Number,
    getCMYKNumber,
    getOrderedArrayString,
    hasProp,
    normalizeAlpha,
    normalizeHue,
    percent
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
    hwbToRgb,
    labToRgb
} from '#color/translators';

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
                    +item[1] <= BASE_255
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
        return new RGBStringParser(color, getRGBObject).rgb;
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
                const parser = new RGBStringParser(color, getRGBObject);
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