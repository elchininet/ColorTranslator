import {
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject,
    Color,
    NumberOrString,
    Options
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
    getOrderedArrayString
} from '#helpers';

const getComma = (withSpace: boolean): string => withSpace
    ? ', '
    : ',';

const prepareColorForCss = (color: Color, isHex = false): NumberOrString[] => {
    const props = getOrderedArrayString(Object.keys(color));
    const model = VALID_COLOR_OBJECTS[props];
    const keys = COLOR_PROPS[model];
    return keys.reduce((result: NumberOrString[], key: keyof typeof color): NumberOrString[] => {
        const value = color[key];
        if (typeof value !== 'undefined') {
            if (isHex) {
                result.push(
                    toHEX(
                        round(value, 0)
                    )
                );
            } else {
                result.push(value);
            }
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

export const CSS = {
    [ColorModel.HEX]: (color: HEXObject | RGBObject): string => {
        const values = prepareColorForCss(color, true);
        const template = values.length === 4
            ? '#{1}{2}{3}{4}'
            : '#{1}{2}{3}';
        return getResultFromTemplate(template, values);
    },
    [ColorModel.RGB]: (color: RGBObject, options: Options): string => {
        const { legacyCSS, spacesAfterCommas } = options;
        const comma = getComma(spacesAfterCommas);
        const values = prepareColorForCss(color);
        const template = legacyCSS
            ? (
                values.length === 4
                    ? `rgba({1}${comma}{2}${comma}{3}${comma}{4})`
                    : `rgb({1}${comma}{2}${comma}{3})`
            )
            : (
                values.length === 4
                    ? 'rgb({1} {2} {3} / {4})'
                    : 'rgb({1} {2} {3})'
            );
        return getResultFromTemplate(template, values);
    },
    [ColorModel.HSL]: (color: HSLObject, options: Options): string => {
        const { legacyCSS, spacesAfterCommas } = options;
        const comma = getComma(spacesAfterCommas);
        const values = prepareColorForCss(color);
        const template = legacyCSS
            ? (
                values.length === 4
                    ? `hsla({1}${comma}{2}%${comma}{3}%${comma}{4})`
                    : `hsl({1}${comma}{2}%${comma}{3}%)`
            )
            : (
                values.length === 4
                    ? 'hsl({1} {2}% {3}% / {4})'
                    : 'hsl({1} {2}% {3}%)'
            );
        return getResultFromTemplate(template, values);
    },
    [ColorModel.CMYK]: (color: CMYKObject, options: Options): string => {
        const { legacyCSS, spacesAfterCommas } = options;
        const comma = getComma(spacesAfterCommas);
        const values = prepareColorForCss(color);
        const template = legacyCSS
            ? (
                values.length === 5
                    ? `device-cmyk({1}%${comma}{2}%${comma}{3}%${comma}{4}%${comma}{5})`
                    : `device-cmyk({1}%${comma}{2}%${comma}{3}%${comma}{4}%)`
            )
            : (
                values.length === 5
                    ? 'device-cmyk({1}% {2}% {3}% {4}% / {5})'
                    : 'device-cmyk({1}% {2}% {3}% {4}%)'
            );
        return getResultFromTemplate(template, values);
    }
};