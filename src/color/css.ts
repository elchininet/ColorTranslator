import {
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject,
    Color,
    NumberOrString,
    Options,
    AnglesUnitEnum,
    ColorUnitEnum
} from '@types';
import {
    ColorModel,
    TEMPLATE_VAR,
    COLOR_PROPS,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    toHEX,
    round,
    getOrderedArrayString,
    from255NumberToPercent,
    translateDegrees
} from '#helpers';

const getComma = (withSpace: boolean): string => withSpace
    ? ', '
    : ',';

type Transformer = (value: NumberOrString, index?: number) => NumberOrString;

const prepareColorForCss = (
    color: Color,
    transformer: Transformer,
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

const getResultFromTemplate = (template: string, vars: NumberOrString[]): string => {
    return template.replace(TEMPLATE_VAR, (__match: string, indexStr: string): string => {
        const index = +indexStr - 1;
        return `${vars[index]}`;
    });
};

const getAlpha = (value: number, options: Options): NumberOrString => {
    const { alphaUnit, legacyCSS, decimals } = options;
    if (alphaUnit === ColorUnitEnum.PERCENT && !legacyCSS) {
        return `${round(value * 100, decimals)}%`;
    }
    return round(value, decimals);
};

export const CSS = {
    [ColorModel.HEX]: (color: HEXObject | RGBObject): string => {
        const transformer = (value: NumberOrString): string => toHEX(round(value));
        const values = prepareColorForCss(color, transformer);
        const template = values.length === 4
            ? '#{1}{2}{3}{4}'
            : '#{1}{2}{3}';
        return getResultFromTemplate(template, values);
    },
    [ColorModel.RGB]: (color: RGBObject, options: Options): string => {
        const {
            decimals,
            legacyCSS,
            spacesAfterCommas,
            rgbUnit
        } = options;
        const comma = getComma(spacesAfterCommas);
        const transformer = (value: number, index: number): NumberOrString => {
            return rgbUnit === ColorUnitEnum.PERCENT && index < 3
                ?  `${from255NumberToPercent(value, decimals)}%`
                : (
                    index === 3
                        ? getAlpha(value, options)
                        : round(value, decimals)
                );
        };
        const values = prepareColorForCss(color, transformer);
        const template = legacyCSS
            ? (
                values.length === 4
                    ? `rgba({1}${comma}{2}${comma}{3}${comma}{4})`
                    : `rgb({1}${comma}{2}${comma}{3})`
            )
            : (
                values.length === 4
                    ? `rgb({1} {2} {3} / {4})`
                    : `rgb({1} {2} {3})`
            );
        return getResultFromTemplate(template, values);
    },
    [ColorModel.HSL]: (color: HSLObject, options: Options): string => {
        const {
            decimals,
            legacyCSS,
            spacesAfterCommas,
            anglesUnit
        } = options;
        const comma = getComma(spacesAfterCommas);
        const transformer = (value: number, index: number): NumberOrString => {
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
                ? getAlpha(value, options)
                : round(value, decimals);
        };
        const values = prepareColorForCss(color, transformer);
        const template = legacyCSS
            ? (
                values.length === 4
                    ? `hsla({1}${comma}{2}%${comma}{3}%${comma}{4})`
                    : `hsl({1}${comma}{2}%${comma}{3}%)`
            )
            : (
                values.length === 4
                    ? `hsl({1} {2}% {3}% / {4})`
                    : `hsl({1} {2}% {3}%)`
            );
        return getResultFromTemplate(template, values);
    },
    [ColorModel.CMYK]: (color: CMYKObject, options: Options): string => {
        const {
            decimals,
            legacyCSS,
            spacesAfterCommas,
            cmykUnit,
            cmykFunction
        } = options;
        const comma = getComma(spacesAfterCommas);
        const transformer = (value: number, index: number): NumberOrString => {
            if (
                cmykUnit === ColorUnitEnum.PERCENT &&
                index < 4
            ) {
                return `${round(value, decimals)}%`;
            }
            return index === 4
                ? getAlpha(value, options)
                : round(value / 100, decimals);
        };
        const values = prepareColorForCss(color, transformer);
        const template = legacyCSS
            ? (
                values.length === 5
                    ? `${cmykFunction}({1}${comma}{2}${comma}{3}${comma}{4}${comma}{5})`
                    : `${cmykFunction}({1}${comma}{2}${comma}{3}${comma}{4})`
            )
            : (
                values.length === 5
                    ? `${cmykFunction}({1} {2} {3} {4} / {5})`
                    : `${cmykFunction}({1} {2} {3} {4})`
            );
        return getResultFromTemplate(template, values);
    }
};