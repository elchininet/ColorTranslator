import {
    Color,
    ColorModelInput,
    NumberOrString
} from '@types';
import {
    ColorModel,
    TEMPLATE_VAR,
    COLOR_PROPS,
    VALID_COLOR_OBJECTS,
    DEFAULT_COLOR_LEVEL_4
} from '#constants';
import {
    toHEX,
    round,
    getOrderedArrayString
} from '#helpers';

const prepareColorForCss = (color: Color): NumberOrString[] => {
    const props = getOrderedArrayString(Object.keys(color));
    const model = VALID_COLOR_OBJECTS[props];
    const keys = COLOR_PROPS[model];
    return keys.reduce((result: NumberOrString[], key: keyof typeof color): NumberOrString[] => {
        const value = color[key];
        if (typeof value !== 'undefined') {
            result.push(value);
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


export function CSS<T extends ColorModel>(colorModel: T, color: ColorModelInput[T], colorLevel4 = DEFAULT_COLOR_LEVEL_4) {
    let values = prepareColorForCss(color);
    let template: string;
    switch (colorModel) {
        case ColorModel.HEX:
            values = values.map(value => toHEX(
                round(value, 0)
            ));
            template = values.length === 4
                ? `#{1}{2}{3}{4}`
                : `#{1}{2}{3}`;
            break;
        case ColorModel.RGB:
            if(colorLevel4) {
                template = values.length === 4
                ? `rgb({1} {2} {3} / {4})`
                : `rgb({1} {2} {3})`;
            } else {
                template = values.length === 4
                ? `rgba({1}, {2}, {3}, {4})`
                : `rgb({1}, {2}, {3})`;
            }
            break;
        case ColorModel.HSL:
            if(colorLevel4) {
                template = values.length === 4
                ? `hsl({1} {2}% {3}% / {4})`
                : `hsl({1} {2}% {3}%)`;
            } else {
                template = values.length === 4
                ? `hsla({1}, {2}%, {3}%, {4})`
                : `hsl({1}, {2}%, {3}%)`;
            }
            break;
        case ColorModel.CMYK:
            if(colorLevel4) {
                template = values.length === 5
                    ? `cmyk({1}% {2}% {3}% {4}% / {5})`
                    : `cmyk({1}% {2}% {3}% {4}%)`;
            } else {
                template = values.length === 5
                    ? `cmyk({1}%, {2}%, {3}%, {4}%, {5})`
                    : `cmyk({1}%, {2}%, {3}%, {4}%)`;
            }
            break;
    }
    return getResultFromTemplate(template, values);
}
