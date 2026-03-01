import {
    CIELabObject,
    CIELabObjectGeneric,
    CIELabRegExpMatchArray,
    ColorInput,
    ColorObject,
    ColorUnitEnum,
    CSSOptionsBase,
    NumberOrString,
    Options,
} from '@types';
import {
    ColorModel,
    COLORREGS,
    MAX_ALPHA,
    MAX_LAB,
    MAX_PCENT,
    PCENT
} from '#constants';
import {
    from125NumberToPercent,
    getBase125Number,
    isCIELabObject,
    isString,
    isUndefined,
    minmax,
    normalizeAlpha,
    percent,
    round
} from '#utilities';
import {
    getCSSAlpha,
    getResultFromCSSTemplate,
    prepareColorForCss
} from '#css';
import { getRGB } from '#color/rgb';
import { rgbToLab } from '#color/translators';
import { CalcParser } from './CalcParser';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    hasPercentageValues: boolean;
    hasPercentageAlpha: boolean;
}

export class CIELabParser extends ColorParser {

    private _extract(input: string): CIELabRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.CIELab) as CIELabRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {
        if (isString(input)) {
            return COLORREGS.CIELab.test(input);
        }
        return isCIELabObject(input);
    }

    parse(input: string | CIELabObjectGeneric, context: ColorParserContext): CIELabObject {

        if (isString(input)) {

            const groups = this._extract(input);

            const {
                // Lab values
                L,
                a,
                b,
                A,
                // Relative values
                from,
                relative_L,
                relative_a,
                relative_b,
                relative_A
            } = groups;

            if (from) {

                const fromColor = context.parse(from);
                const fromRGB = getRGB(fromColor);
                const fromCIELab = rgbToLab(
                    fromRGB.R,
                    fromRGB.G,
                    fromRGB.B
                );
                const fromCIELabVars = {
                    l: fromCIELab.L,
                    a: fromCIELab.a,
                    b: fromCIELab.b,
                    alpha: fromRGB.A ?? 1
                };

                const L = new CalcParser('l', relative_L, fromCIELabVars).result;
                const a = new CalcParser('a', relative_a, fromCIELabVars).result;
                const b = new CalcParser('b', relative_b, fromCIELabVars).result;

                const CIELab: CIELabObject = {
                    L: minmax(L, 0, MAX_PCENT),
                    a: minmax(a, - MAX_LAB, MAX_LAB),
                    b: minmax(b, - MAX_LAB, MAX_LAB)
                };

                if (relative_A) {
                    const A = new CalcParser('alpha', relative_A, fromCIELabVars).result;
                    CIELab.A = minmax(A, 0, MAX_ALPHA);
                }

                return CIELab;

            } else {

                return {
                    L: percent(L),
                    a: getBase125Number(a),
                    b: getBase125Number(b),
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
            L: percent(input.L),
            a: getBase125Number(`${input.a}`),
            b: getBase125Number(`${input.b}`),
            ...(
                isUndefined(input.A)
                    ? {}
                    : {
                        A: normalizeAlpha(input.A)
                    }
            )
        };

    }

    convert(
        color: ColorObject,
        decimals: number,
        withAlpha: boolean
    ): CIELabObject {
        let lab: CIELabObject;
        if (isCIELabObject(color)) {
            lab = color as CIELabObject;
        } else {
            const rgb = getRGB(color);
            lab = rgbToLab(
                rgb.R,
                rgb.G,
                rgb.B
            );
        }
        return this._roundCIELabObject(
            {
                L: lab.L,
                a: lab.a,
                b: lab.b,
                ...(
                    withAlpha
                        ? {
                            A: +(color.A ?? 1)
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
            labUnit
        } = options;
        const lab = this.convert(color, options.decimals, withAlpha);
        const transformer = (value: number, index: number): NumberOrString => {
            if (index === 0) {
                const L = round(
                    percent(value),
                    decimals
                );
                return labUnit === ColorUnitEnum.PERCENT
                    ? `${L}%`
                    : `${L}`;
            }
            if (index < 3) {
                return labUnit === ColorUnitEnum.PERCENT
                    ? `${from125NumberToPercent(value, decimals)}%`
                    : round(value, decimals);
            }
            return getCSSAlpha(value, options, true);
        };
        const values = prepareColorForCss(lab, transformer);
        const template = values.length === 4
            ? `lab({1} {2} {3} / {4})`
            : `lab({1} {2} {3})`;
        return getResultFromCSSTemplate(template, values);
    }

    private _roundCIELabObject(color: CIELabObject, decimals: number): CIELabObject {
        return {
            L: round(color.L, decimals),
            a: round(color.a, decimals),
            b: round(color.b, decimals),
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
            L,
            a,
            b,
            A
        } = groups;
        return {
            hasPercentageValues: (
                PCENT.test(L) &&
                PCENT.test(a) &&
                PCENT.test(b)
            ),
            hasPercentageAlpha: PCENT.test(A),
            hasAlpha: !isUndefined(A)
        };
    }

    public get model(): ColorModel {
        return ColorModel.CIELab;
    }

}