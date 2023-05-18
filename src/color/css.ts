import {
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject,
    Color,
    NumberOrString
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

const prepareColorForCss = (color: Color, isHex = false): NumberOrString[] => {
    const props = getOrderedArrayString(Object.keys(color));
    const model = VALID_COLOR_OBJECTS[props];
    const keys = COLOR_PROPS[model];
    return keys.reduce((result: NumberOrString[], key: keyof typeof color): NumberOrString[] => {
        const value = color[key];
        if (typeof value !== 'undefined') {
            if (isHex) {
                result.push(
                    toHEX(value)
                );
            } else {
                result.push(
                    round(value)
                );
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
    [ColorModel.RGB]: (color: RGBObject): string => {
        const values = prepareColorForCss(color);
        const template = values.length === 4
            ? 'rgba({1},{2},{3},{4})'
            : 'rgb({1},{2},{3})';
        return getResultFromTemplate(template, values);
    },
    [ColorModel.HSL]: (color: HSLObject): string => {
        const values = prepareColorForCss(color);
        const template = values.length === 4
            ? 'hsla({1},{2}%,{3}%,{4})'
            : 'hsl({1},{2}%,{3}%)';
        return getResultFromTemplate(template, values);
    },
    [ColorModel.CMYK]: (color: CMYKObject): string => {
        const values = prepareColorForCss(color);
        const template = values.length === 5
            ? 'cmyk({1}%,{2}%,{3}%,{4}%,{5})'
            : 'cmyk({1}%,{2}%,{3}%,{4}%)';
        return getResultFromTemplate(template, values);
    }
};