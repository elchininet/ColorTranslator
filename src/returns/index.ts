import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    ColorOutput,
    InputOptions,
    Options,
    RGBObject
} from '@types';
import {
    ColorModel,
    DEFAULT_BLEND_STEPS,
    Harmony,
    HarmonyString,
    Mix,
    MixString
} from '#constants';
import * as utils from '#color/utils';
import { getOptionsFromColorInput, getRGBObject } from '#color/extractors';

export const getColorReturn = <T>(
    color: ColorInput,
    model: ColorModel,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => T
): T => {
    const rgbObject = getRGBObject(color, model);
    return translateFunction(rgbObject, decimals);
};

export const getBlendReturn = <T>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => T
): T[] => {
    if (steps < 1) steps = DEFAULT_BLEND_STEPS;
    const fromRGBObject = getRGBObject(from);
    const toRGBObject = getRGBObject(to);
    const blendArray = utils.blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject): T => {
        return translateFunction(color, decimals);
    });
};

interface GetBlendReturnObjectWithParameters<T>{
    from: ColorInput;
    to: ColorInput;
    thirdParameter?: number | InputOptions;
    fourthParameter?: InputOptions;
    translateFunction: (color: Color, decimals: number) => T;
}

interface GetBlendReturnStringWithParameters<T> extends GetBlendReturnObjectWithParameters<T> {
    cssFunction?: (color: T, options: Options) => string;
}

export function getBlendReturnWithParameters<T>(
    params: GetBlendReturnObjectWithParameters<T>
): T[];
export function getBlendReturnWithParameters<T>(
    params: GetBlendReturnStringWithParameters<T>
): string[];
export function getBlendReturnWithParameters<T>(
    params: GetBlendReturnStringWithParameters<T>
): T[] | string[] {
    const {
        from,
        to,
        thirdParameter,
        fourthParameter,
        translateFunction,
        cssFunction
    } = params;
    const result = typeof thirdParameter === 'number'
        ? getBlendReturn<T>(
            from,
            to,
            thirdParameter,
            fourthParameter?.decimals,
            translateFunction
        )
        : getBlendReturn<T>(
            from,
            to,
            DEFAULT_BLEND_STEPS,
            thirdParameter?.decimals,
            translateFunction
        );
    if (cssFunction) {
        return result.map((color: T): string => cssFunction(
            color,
            getOptionsFromColorInput(
                (
                    typeof thirdParameter === 'number'
                        ? fourthParameter
                        : thirdParameter
                ) ?? {},
                from,
                to
            )
        ));
    }
    return result;

}

interface GetMixReturn {
    colors: ColorInput[];
    secondParameter?: MixString | InputOptions;
    thirdParameter?: InputOptions;
    colorMixerFunction: (color: ColorInput[], mix: MixString, isCSS: boolean, options: Options) => string;
}

interface GetMixObjectReturn extends GetMixReturn {
    css: false;
}

interface GetMixCssReturn extends GetMixReturn {
    css: true;
}

export function getMixReturn<T>(params: GetMixObjectReturn): T;
export function getMixReturn(params: GetMixCssReturn): string;
export function getMixReturn<T>(
    params: GetMixObjectReturn | GetMixCssReturn
): T | string {
    const {
        colors,
        secondParameter,
        thirdParameter,
        colorMixerFunction,
        css
    } = params;
    const options = getOptionsFromColorInput(
        (
            typeof secondParameter === 'string'
                ? thirdParameter
                : secondParameter
        ) ?? {},
        ...colors
    );
    if (typeof secondParameter === 'string') {
        return colorMixerFunction(
            colors,
            secondParameter,
            css,
            options
        );
    }
    return colorMixerFunction(
        colors,
        Mix.ADDITIVE,
        css,
        options
    );
}

export const getHarmonyReturn = (
    harmony: HarmonyString,
    color: ColorInputWithoutCMYK,
    mode: MixString,
    options: Options
): ColorOutput[] => {
    return ({
        [Harmony.ANALOGOUS]:           utils.colorHarmony.buildHarmony(color, utils.analogous, mode, options),
        [Harmony.COMPLEMENTARY]:       utils.colorHarmony.buildHarmony(color, utils.complementary, mode, options),
        [Harmony.SPLIT_COMPLEMENTARY]: utils.colorHarmony.buildHarmony(color, utils.splitComplementary, mode, options),
        [Harmony.TRIADIC]:             utils.colorHarmony.buildHarmony(color, utils.triadic, mode, options),
        [Harmony.TETRADIC]:            utils.colorHarmony.buildHarmony(color, utils.tetradic, mode, options),
        [Harmony.SQUARE]:              utils.colorHarmony.buildHarmony(color, utils.square, mode, options)
    })[harmony];
};