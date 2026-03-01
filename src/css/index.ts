import {
    AnglesUnitEnum,
    Color,
    ColorUnitEnum,
    NumberOrString,
    Options
} from '@types';
import {
    COLOR_PROPS,
    TEMPLATE_VAR,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    getOrderedArrayString,
    round,
    translateDegrees
} from '#utilities';

type Transformer = (value: NumberOrString, index?: number) => NumberOrString;

export const getCSSComma = (withSpace: boolean): string => withSpace
    ? ', '
    : ',';

export const prepareColorForCss = (
    color: Color,
    transformer: Transformer
): NumberOrString[] => {
    const props = getOrderedArrayString(Object.keys(color));
    const model = VALID_COLOR_OBJECTS[props];
    const keys = COLOR_PROPS[model];
    return keys.reduce((result: NumberOrString[], key: keyof typeof color, index: number): NumberOrString[] => {
        const value = color[key];
        if (typeof value !== 'undefined') {
            result.push(transformer(value, index));
        }
        return result;
    }, []);
};

export const getResultFromCSSTemplate = (template: string, vars: NumberOrString[]): string => {
    return template.replace(TEMPLATE_VAR, (__match: string, indexStr: string): string => {
        const index = +indexStr - 1;
        return `${vars[index]}`;
    });
};

export const getCSSAlpha = (value: number, options: Options, ignoreLegacy = false): NumberOrString => {
    const { alphaUnit, legacyCSS, decimals } = options;
    if (
        alphaUnit === ColorUnitEnum.PERCENT &&
        (
            !legacyCSS ||
            ignoreLegacy
        )
    ) {
        return `${round(value * 100, decimals)}%`;
    }
    return round(value, decimals);
};

export const buildCSSHueTransformer = (options: Options) => {
    const { anglesUnit, decimals } = options;
    return (value: number, index: number): NumberOrString => {
        if (
            index === 0 &&
            anglesUnit !== AnglesUnitEnum.NONE
        ) {
            const translated = round(
                translateDegrees(
                    value,
                    anglesUnit
                ),
                decimals
            );
            return `${translated}${anglesUnit}`;
        }
        return index === 3
            ? getCSSAlpha(value, options)
            : round(value, decimals);
    };
};
