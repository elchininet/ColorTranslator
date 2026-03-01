import {
    AnglesUnitEnum,
    ColorInput,
    ColorObject,
    ColorUnitEnum,
    CSSOptionsBase,
    LCHObject,
    LCHObjectGeneric,
    LCHRegExpMatchArray,
    NumberOrString,
    Options
} from '@types';
import {
    COLORREGS,
    ColorModel,
    MAX_ALPHA,
    MAX_LCH_C,
    MAX_PCENT,
    PCENT
} from '#constants';
import {
    from150NumberToPercent,
    getAngleUnit,
    getBase150Number,
    isLCHObject,
    isString,
    isUndefined,
    minmax,
    normalizeAlpha,
    normalizeHue,
    percent,
    round,
    translateDegrees
} from '#utilities';
import {
    getCSSAlpha,
    getResultFromCSSTemplate,
    prepareColorForCss
} from '#css';
import { getRGB } from '#color/rgb';
import { rgbToLch } from '#color/translators';
import { CalcParser } from './CalcParser';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    angleUnit: AnglesUnitEnum;
    hasPercentageValues: boolean;
    hasPercentageAlpha: boolean;
}

export class LCHParser extends ColorParser {

    private _extract(input: string): LCHRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.LCH) as LCHRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {
        if (isString(input)) {
            return COLORREGS.LCH.test(input);
        }
        return isLCHObject(input);
    }

    parse(input: string | LCHObjectGeneric, context: ColorParserContext): LCHObject {

        if (isString(input)) {
            
            const groups = this._extract(input);

            const {
                // LCH values
                l,
                c,
                h,
                a,
                // Relative values
                from,
                relative_l,
                relative_c,
                relative_h,
                relative_a
            } = groups;

            if (from) {

                const fromColor = context.parse(from);
                const fromRGB = getRGB(fromColor);

                const fromLCH = rgbToLch(
                    fromRGB.R,
                    fromRGB.G,
                    fromRGB.B
                );
                const fromLCHVars = {
                    l: fromLCH.L,
                    c: fromLCH.C,
                    h: fromLCH.H,
                    alpha: fromRGB.A ?? 1
                };

                const L = new CalcParser('l', relative_l, fromLCHVars).result;
                const C = new CalcParser('c', relative_c, fromLCHVars).result;
                const H = new CalcParser('h', relative_h, fromLCHVars).result;

                const lch: LCHObject = {
                    L: minmax(L, 0, MAX_PCENT),
                    C: minmax(C, - MAX_LCH_C, MAX_LCH_C),
                    H: normalizeHue(H)
                };

                if (relative_a) {
                    const A = new CalcParser('alpha', relative_a, fromLCHVars).result;
                    lch.A = minmax(A, 0, MAX_ALPHA);
                }

                return lch;

            } else {

                return {
                    L: percent(l),
                    C: getBase150Number(c),
                    H: normalizeHue(h),
                    ...(
                        isUndefined(a)
                            ? {}
                            : {
                                A: normalizeAlpha(a)
                            }
                    )
                };

            }

        }

        return {
            L: percent(input.L),
            C: getBase150Number(`${input.C}`),
            H: normalizeHue(input.H),
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
    ): LCHObject {
        let lch: LCHObject;
        if (isLCHObject(color)) {
            lch = color as LCHObject;
        } else {
            const rgb = getRGB(color);
            lch = rgbToLch(
                rgb.R,
                rgb.G,
                rgb.B
            );
        }
        return this._roundLCHObject(
            {
                L: lch.L,
                C: lch.C,
                H: lch.H,
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
            lchUnit,
            anglesUnit
        } = options;
        const lch = this.convert(color, options.decimals, withAlpha)
        const transformer = (value: number, index: number): NumberOrString => {
            if (index === 0) {
                const L = round(
                    percent(value),
                    decimals
                );
                return lchUnit === ColorUnitEnum.PERCENT
                    ? `${L}%`
                    : `${L}`;
            }
            if (index === 1) {
                return lchUnit === ColorUnitEnum.PERCENT
                    ? `${from150NumberToPercent(value, decimals)}%`
                    : round(value, decimals);
            }
            if (index === 2) {
                if (anglesUnit !== AnglesUnitEnum.NONE) {
                    const translated = round(
                        translateDegrees(
                            value,
                            anglesUnit
                        ),
                        decimals
                    );
                    return `${translated}${anglesUnit}`;
                }
                return round(value, decimals);
            }
            return getCSSAlpha(value, options, true);
        };
        const values = prepareColorForCss(lch, transformer);
        const template = values.length === 4
            ? `lch({1} {2} {3} / {4})`
            : `lch({1} {2} {3})`;
        return getResultFromCSSTemplate(template, values);
    }

    private _roundLCHObject(color: LCHObject, decimals: number): LCHObject {
        return {
            L: round(color.L, decimals),
            C: round(color.C, decimals),
            H: round(
                normalizeHue(color.H),
                decimals
            ),
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
        return {
            angleUnit: getAngleUnit(groups.h),
            hasPercentageValues: (
                PCENT.test(groups.l) &&
                PCENT.test(groups.c)
            ),
            hasPercentageAlpha: PCENT.test(groups.a),
            hasAlpha: !isUndefined(groups.a)
        };
    }

    public get model(): ColorModel {
        return ColorModel.LCH;
    }

}