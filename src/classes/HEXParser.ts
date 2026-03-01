import {
    ColorInput,
    ColorObject,
    CSSOptionsBase,
    HEXObject,
    HEXRegExpMatchArray,
    NumberOrString,
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
    HEX
} from '#constants';
import { getRGB } from '#color/rgb';
import { getResultFromCSSTemplate, prepareColorForCss } from '#css';
import {
    getDEC,
    getHEX,
    getBase255Number,
    isString,
    isUndefined,
    isRGBObject,
    round,
    toHEX
} from '#utilities';
import { ColorParserContext, ColorParser } from './ColorParserContext';

export class HEXParser extends ColorParser {

    private _extract(input: string): HEXRegExpMatchArray['groups'] {
        const colorStr = !~COLOR_KEYS.indexOf(input)
            ? input
            : ColorKeywords[input as keyof typeof ColorKeywords];
        const match = colorStr.match(COLORREGS.HEX) as HEXRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {

        if (isString(input)) {
            return (
                COLORREGS.HEX.test(input) ||
                !!~COLOR_KEYS.indexOf(input)
            );
        }

        const hasInvalidHex = Object.entries(input).some((item: [string, string | number]): boolean => {
            return !HEX.test(`${item[1]}`);
        });

        return isRGBObject(input) && !hasInvalidHex;
    }

    parse(
        input: string | RGBObjectGeneric,
        __context: ColorParserContext
    ): RGBObject {

        if (isString(input)) {

            const groups = this._extract(input);

            const r = groups.r ?? groups.rr;
            const g = groups.g ?? groups.gg;
            const b = groups.b ?? groups.bb;
            const a = groups.a ?? groups.aa;

            return {
                R: getDEC(r),
                G: getDEC(g),
                B: getDEC(b),
                ...(
                    isUndefined(a)
                        ? {}
                        : {
                            A: getDEC(a) / BASE_255
                        }
                )
            };

        }

        return {
            R: getBase255Number(`${input.R}`),
            G: getBase255Number(`${input.G}`),
            B: getBase255Number(`${input.B}`),
            ...(
                isUndefined(input.A)
                    ? {}
                    : {
                        A: Math.min(getBase255Number(`${input.A}`, true), 1)
                    }
            )
        };

    }

    convert(
        color: ColorObject,
        __decimals: number,
        withAlpha: boolean
    ): HEXObject {
        const rgb: RGBObject = isRGBObject(color)
            ? color as RGBObject
            : getRGB(color);
        return {
            R: getHEX(rgb.R),
            G: getHEX(rgb.G),
            B: getHEX(rgb.B),
            ...(
                withAlpha
                    ? {
                        A: isUndefined(rgb.A)
                            ? '0xFF'
                            : getHEX(rgb.A * BASE_255)
                    }
                    : {}
            )
        };
    }

    convertCSS(
        color: ColorObject,
        options: Options,
        withAlpha: boolean
    ): string {
        const rgb = this.convert(color, options.decimals, withAlpha);
        const transformer = (value: NumberOrString): string => toHEX(round(value));
        const values = prepareColorForCss(rgb, transformer);
        const template = values.length === 4
            ? '#{1}{2}{3}{4}'
            : '#{1}{2}{3}';
        return getResultFromCSSTemplate(template, values);
    }

    public getCSSOptions(input: string): CSSOptionsBase {
        const groups = this._extract(input);
        return {
            hasAlpha: !isUndefined(groups.a ?? groups.aa)
        };
    }

    public get model(): ColorModel {
        return ColorModel.HEX;
    }

}