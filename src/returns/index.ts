import {
    ColorInput,
    ColorInputWithoutCMYK,
    ColorObject,
    InputOptions,
    RGBObject,
    RYBObject,
    RGYBObject,
    HSLObject,
    CMYKObjectGeneric,
    CMYKObject
} from '@types';
import {
    BASE_255,
    ColorModel,
    DEFAULT_BLEND_STEPS,
    DEFAULT_SHADES_TINTS_STEPS,
    Harmony,
    HarmonyString,
    Mix,
    MixString
} from '#constants';
import {
    getOptionsFromColorInput,
    isHarmony,
    isNumber,
    isString,
    isMix,
    isUndefined,
    normalizeAlpha,
    normalizeHue,
    round
} from '#utilities';
import {
    hueRyb,
    rgbToRyb,
    rybToRgb
} from '#color/translators';
import { getRGB } from '#color/rgb';
import { colorParserContext } from '#parsers';

//---Blending
const blend = (from: RGBObject, to: RGBObject, steps: number): RGBObject[] => {
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

export function getBlendReturn<T extends ColorObject>(
    from: ColorInput,
    to: ColorInput,
    model: ColorModel,
    css: false,
    withAlpha?: boolean,
    steps?: number,
    options?: InputOptions
): T[];
export function getBlendReturn(
    from: ColorInput,
    to: ColorInput,
    model: ColorModel,
    css: true,
    withAlpha?: boolean,
    steps?: number,
    options?: InputOptions
): string[];
export function getBlendReturn(
    from: ColorInput,
    to: ColorInput,
    model: ColorModel,
    css: boolean,
    withAlpha: boolean,
    steps: number = DEFAULT_BLEND_STEPS,
    options: InputOptions = {}
) {
    if (steps < 1) steps = DEFAULT_BLEND_STEPS;
    const fromParsed = colorParserContext.parse(from);
    const toParsed = colorParserContext.parse(to);
    const fromRGBObject = getRGB(fromParsed);
    const toRGBObject = getRGB(toParsed);
    const blendArray = blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject) => {
        if (css) {
            return colorParserContext.convertCSS(
                color,
                model,
                getOptionsFromColorInput(
                    options,
                    from,
                    to
                ),
                withAlpha
            );
        }
        return colorParserContext.convert(
            color,
            model,
            options.decimals,
            withAlpha
        );
    });
}

export const getBlendReturnParams = (
    thirdParameter?: number | InputOptions,
    fourthParameter?: InputOptions
): [number | undefined, InputOptions] => {
    const stepsParameter = isNumber(thirdParameter)
        ? thirdParameter
        : undefined;
    const optionsParameter = isNumber(thirdParameter)
        ? fourthParameter
        : thirdParameter;
    return [
        stepsParameter,
        optionsParameter
    ];
};

export function getMixReturn<T extends ColorObject>(
    colors: ColorInput[],
    model: ColorModel,
    css?: false,
    withAlpha?: boolean,
    mode?: MixString,
    options?: InputOptions
): T;
export function getMixReturn(
    colors: ColorInput[],
    model: ColorModel,
    css: true,
    withAlpha?: boolean,
    mode?: MixString,
    options?: InputOptions
): string;
export function getMixReturn<T extends ColorObject>(
    colors: ColorInput[],
    model: ColorModel,
    css: boolean,
    withAlpha: boolean,
    mode: MixString = Mix.ADDITIVE,
    options: InputOptions = {}
): T | string {

    const rgbMap = colors.map((color: ColorInput): RGBObject => {
        return colorParserContext.convert(
            color,
            ColorModel.RGB,
            options.decimals,
            withAlpha
        );
    });

    const rybMap = mode === Mix.SUBTRACTIVE
        ? rgbMap.map((color: RGBObject): RYBObject => {
            const RYB = rgbToRyb(color.R, color.G, color.B);
            if (!isUndefined(color.A)) {
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
            const colorA = isUndefined(color.A)
                ? 1
                : color.A;
            const common = {
                R: Math.min(mix.R  + color.R * colorA, BASE_255),
                B: Math.min(mix.B + color.B * colorA, BASE_255),
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
                    ? { G: Math.min(mixGY + colorGY * colorA, BASE_255) }
                    : { Y: Math.min(mixGY + colorGY * colorA, BASE_255) }
                )
            };
        }, initial);
    }

    let mix: RGBObject;

    if (mode === Mix.ADDITIVE) {
        mix = createMix(rgbMap);
    } else {
        const RYB = createMix(rybMap);
        mix = rybToRgb(RYB.R, RYB.Y, RYB.B);
        mix.A = RYB.A;
    }

    if (css) {
        return colorParserContext.convertCSS(
            mix,
            model,
            getOptionsFromColorInput(options, ...colors),
            withAlpha
        );
    }

    return colorParserContext.convert<T>(
        mix,
        model,
        options.decimals,
        withAlpha
    );
};

export const getMixReturnParameters = (
    secondParameter?: MixString | InputOptions,
    thirdParameter?: InputOptions
): [MixString | undefined, InputOptions] => {
    const modeParam = isString(secondParameter)
        ? secondParameter
        : undefined;
    const optionsParam = isString(secondParameter)
        ? thirdParameter
        : secondParameter;
    return [
        modeParam,
        optionsParam
    ];
};

export function getShadesOrTintsReturn(
    shades: boolean,
    color: string,
    steps?: number,
    options?: InputOptions
): string[];
export function getShadesOrTintsReturn<T extends Exclude<ColorObject, CMYKObjectGeneric>>(
    shades: boolean,
    color: ColorInputWithoutCMYK,
    steps?: number,
    options?: InputOptions
): T[];
export function getShadesOrTintsReturn<T extends Exclude<ColorObject, CMYKObjectGeneric>>(
    shades: boolean,
    color: ColorInputWithoutCMYK,
    steps = DEFAULT_SHADES_TINTS_STEPS,
    options: InputOptions = {}
): T[] | string[] {
    const isCSS = isString(color);
    const parser = colorParserContext.getParser(color);
    const model = parser.model;
    const withAlpha = parser.hasAlpha(color);
    const hsl = colorParserContext.convert(
        color,
        ColorModel.HSL,
        undefined,
        withAlpha
    ) as HSLObject;
    const increment = shades
        ? hsl.L / (steps + 1)
        : (100 - hsl.L) / (steps + 1);
    const hslMap = Array.from(Array(steps)).map((__n, i): HSLObject => ({
        ...hsl,
        L: hsl.L + increment * (i + 1) * (1 - +shades * 2)
    }));
    if (isCSS) {
        return hslMap.map((hslColor: HSLObject): string => {
            return colorParserContext.convertCSS(
                hslColor,
                model,
                getOptionsFromColorInput(options, color),
                withAlpha
            );
        });
    }
    return hslMap.map((hslColor: HSLObject): T => {
        return colorParserContext.convert(
            hslColor,
            model,
            options.decimals,
            withAlpha
        );
    });
}

export const getShadesOrTintsReturnParameters = (
    secondParameter?: number | InputOptions,
    thirdParameter?: InputOptions
): [number | undefined, InputOptions] => {
    const stepsParam = isNumber(secondParameter)
        ? secondParameter
        : undefined;
    const optionsParam = isNumber(secondParameter)
        ? thirdParameter
        : secondParameter;
    return [
        stepsParam,
        optionsParam
    ];
};

//---Harmony
const harmony = (
    color: HSLObject,
    angles: number[],
    mode: MixString
): HSLObject[] =>
    angles.reduce(
        (arr: HSLObject[], num: number): HSLObject[] => {
            return [
                ...arr,
                {
                    ...color,
                    H: mode === Mix.ADDITIVE
                        ? normalizeHue(color.H + num)
                        : normalizeHue(
                            hueRyb(
                                hueRyb(
                                    color.H,
                                    false
                                ) + num,
                                true
                            )
                        )
                }
            ];
        },
        [{...color}]
    );

type HarmonyFunction = (color: HSLObject, mode: MixString) => HSLObject[];

const HARMONIES = new Map<`${Harmony}`, HarmonyFunction>([
    [
        Harmony.ANALOGOUS,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [30, -30], mode)
    ],
    [
        Harmony.COMPLEMENTARY,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [180], mode)
    ],
    [
        Harmony.SPLIT_COMPLEMENTARY,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [150, -150], mode)
    ],
    [
        Harmony.TRIADIC,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [120, -120], mode)
    ],
    [
        Harmony.TETRADIC,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [60, -120, 180], mode)
    ],
    [
        Harmony.SQUARE,
        (color: HSLObject, mode: MixString): HSLObject[] => harmony(color, [90, -90, 180], mode)
    ]
]);

export const getHarmonyReturn = <T extends Exclude<ColorObject, CMYKObject>>(
    color: ColorInputWithoutCMYK,
    harmony: HarmonyString,
    mode: MixString,
    options: InputOptions = {}
): T[] | string[] => {
    const harmonyFunction = HARMONIES.get(harmony);
    const isCSS = isString(color);
    const parser = colorParserContext.getParser(color);
    const model = parser.model;
    const withAlpha = parser.hasAlpha(color);
    const hsl = colorParserContext.convert<HSLObject>(
        color,
        ColorModel.HSL
    );    
    const array = harmonyFunction(hsl, mode);
    if (isCSS) {
        return array.map((harmonyColor: HSLObject): string => {
            return colorParserContext.convertCSS(
                harmonyColor,
                model,
                getOptionsFromColorInput(options, color),
                withAlpha
            );
        });
    }
    return array.map(
        (harmonyColor: HSLObject) => {
            return colorParserContext.convert<T>(
                harmonyColor,
                model,
                options.decimals,
                withAlpha
            );
        }
    );
};

export const getHarmonyReturnParameters = (
    secondParam?: HarmonyString | MixString | InputOptions,
    thirdParam?: MixString | InputOptions,
    fourthParam?: InputOptions
): [HarmonyString, MixString, InputOptions | undefined] => {
    if (isHarmony(secondParam)) {
        return [
            secondParam,
            isMix(thirdParam)
                ? thirdParam
                : Mix.ADDITIVE,
            isMix(thirdParam)
                ? fourthParam
                : thirdParam
        ];
    }
    if (isMix(secondParam)) {
        return [
            Harmony.COMPLEMENTARY,
            secondParam,
            thirdParam as InputOptions
        ]
    }
    return [
        Harmony.COMPLEMENTARY,
        Mix.ADDITIVE,
        secondParam
    ];
};