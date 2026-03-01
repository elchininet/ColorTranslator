import {
    ColorInput,
    ColorObject,
    ColorUnitEnum,
    CSSOptionsBase,
    NumberOrString,
    Options,
    RGBObject,
    RGBObjectGeneric,
    RGBRegExpMatchArray
} from '@types';
import {
    BASE_255,
    COLORREGS,
    ColorModel,
    HEX,
    PCENT
} from '#constants';
import {
    from255NumberToPercent,
    getBase255Number,
    isString,
    isRGBObject,
    isUndefined,
    normalizeAlpha,
    round
} from '#utilities';
import {
    getCSSAlpha,
    getCSSComma,
    getResultFromCSSTemplate,
    prepareColorForCss
} from '#css';
import { getRGB } from '#color/rgb';
import { CalcParser } from './CalcParser';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    hasPercentageValues: boolean;
    hasPercentageAlpha: boolean;
}

export class RGBParser extends ColorParser {

    private _extract(input: string): RGBRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.RGB) as RGBRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {

        if (isString(input)) {
            return COLORREGS.RGB.test(input);
        }

        const hasInvalidRegb = Object.entries(input).some((item: [string, string | number]): boolean => {
            return !(
                PCENT.test(`${item[1]}`) ||
                (
                    !HEX.test(`${item[1]}`) &&
                    !isNaN(+item[1]) &&
                    +item[1] <= BASE_255
                )
            );
        });

        return isRGBObject(input) && !hasInvalidRegb;

    }

    parse(input: string | RGBObjectGeneric, context: ColorParserContext): RGBObject {

        if (isString(input)) {

            const groups = this._extract(input);
            const {
                // Legacy values
                r_legacy,
                g_legacy,
                b_legacy,
                a_legacy,
                // RGB values
                r,
                g,
                b,
                a,
                // Relative values
                from,
                relative_r,
                relative_g,
                relative_b,
                relative_a
            } = groups;

            if (from) {

                const fromColor = context.parse(from);
                const fromRGB = getRGB(fromColor as ColorObject);
                const fromRGBVars = {
                    r: fromRGB.R,
                    g: fromRGB.G,
                    b: fromRGB.B,
                    alpha: fromRGB.A ?? 1
                };
                const R = new CalcParser('r', relative_r, fromRGBVars).result;
                const G = new CalcParser('g', relative_g, fromRGBVars).result;
                const B = new CalcParser('b', relative_b, fromRGBVars).result;

                const rgb: RGBObject = {
                    R: Math.min(
                        R,
                        BASE_255
                    ),
                    G: Math.min(
                        G,
                        BASE_255
                    ),
                    B: Math.min(
                        B,
                        BASE_255
                    )
                };
    
                if (relative_a) {
                    const A = new CalcParser('alpha', relative_a, fromRGBVars).result;
                    rgb.A = Math.min(A, 1);
                }

                return rgb;

            } else {

                const R = r_legacy ?? r;
                const G = g_legacy ?? g;
                const B = b_legacy ?? b;
                const A = a_legacy ?? a;

                return {
                    R: Math.min(
                        getBase255Number(R),
                        BASE_255
                    ),
                    G: Math.min(
                        getBase255Number(G),
                        BASE_255
                    ),
                    B: Math.min(
                        getBase255Number(B),
                        BASE_255
                    ),
                    ...(
                        isUndefined(A)
                            ? {}
                            : {
                                A: normalizeAlpha(A)
                            }
                    )
                };

            }

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
        decimals: number,
        withAlpha: boolean
    ): RGBObject {
        const rgb: RGBObject = isRGBObject(color)
            ? color as RGBObject
            : getRGB(color);
        return this._roundRGBObject(
            {
                R: rgb.R,
                G: rgb.G,
                B: rgb.B,
                ...(
                    withAlpha
                        ? {
                            A: rgb.A ?? 1
                        }
                        : {}
                )
            },
            decimals
        );
    }

    convertCSS(
        color: ColorObject,
        options: Options,
        withAlpha: boolean
    ): string {
        const {
            decimals,
            legacyCSS,
            spacesAfterCommas,
            rgbUnit
        } = options;
        const rgb = this.convert(color, options.decimals, withAlpha);
        const comma = getCSSComma(spacesAfterCommas);
        const transformer = (value: number, index: number): NumberOrString => {
            return rgbUnit === ColorUnitEnum.PERCENT && index < 3
                ?  `${from255NumberToPercent(value, decimals)}%`
                : (
                    index === 3
                        ? getCSSAlpha(value, options)
                        : round(value, decimals)
                );
        };
        const values = prepareColorForCss(rgb, transformer);
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
        return getResultFromCSSTemplate(template, values);
    }

    private _roundRGBObject(color: RGBObject, decimals: number): RGBObject {
        const R = round(color.R, decimals);
        const G = round(color.G, decimals);
        const B = round(color.B, decimals);
        return {
            R,
            G,
            B,
            ...(
                isUndefined(color.A)
                    ? {}
                    : {
                        A: round(color.A, decimals)
                    }
            )
        };
    }

    public getCSSOptions(input: string): CSSOptions {
        const groups = this._extract(input);
        const {
            r_legacy,
            g_legacy,
            b_legacy,
            a_legacy,
            r,
            g,
            b,
            a
        } = groups;
        return {
            hasPercentageValues: (
                PCENT.test(r_legacy ?? r) &&
                PCENT.test(g_legacy ?? g) &&
                PCENT.test(b_legacy ?? b)
            ),
            hasPercentageAlpha: PCENT.test(a_legacy ?? a),
            hasAlpha: !isUndefined(a_legacy ?? a)
        };
    }

    public get model(): ColorModel {
        return ColorModel.RGB;
    }

}