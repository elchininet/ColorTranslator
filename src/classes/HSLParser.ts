import {
    AnglesUnitEnum,
    ColorObject,
    ColorInput,
    CSSOptionsBase,
    HSLObject,
    HSLObjectGeneric,
    HSLRegExpMatchArray,
    Options
} from '@types';
import {
    COLORREGS,
    ColorModel,
    MAX_ALPHA,
    PCENT
} from '#constants';
import {
    getAngleUnit,
    isHSLObject,
    isString,
    isUndefined,
    minmax,
    normalizeAlpha,
    normalizeHue,
    percent,
    round
} from '#utilities';
import {
    buildCSSHueTransformer,
    getCSSComma,
    getResultFromCSSTemplate,
    prepareColorForCss
} from '#css';
import { getRGB } from '#color/rgb';
import { rgbToHsl } from '#color/translators';
import { CalcParser } from './CalcParser';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    angleUnit: AnglesUnitEnum;
    hasPercentageAlpha: boolean;
}

export class HSLParser extends ColorParser {

    private _extract(input: string): HSLRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.HSL) as HSLRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {
        if (isString(input)) {
            return COLORREGS.HSL.test(input);
        }
        return isHSLObject(input);
    }

    parse(
        input: string | HSLObjectGeneric,
        context: ColorParserContext
    ): HSLObject {

        if (isString(input)) {

            const groups = this._extract(input);

            const {
                // Legacy values
                h_legacy,
                s_legacy,
                l_legacy,
                a_legacy,
                // HSL values
                h,
                s,
                l,
                a,
                // Relative values
                from,
                relative_h,
                relative_s,
                relative_l,
                relative_a
            } = groups;

            if (from) {

                const fromColor = context.parse(from);
                const fromRGB = getRGB(fromColor);
                const fromHSL = rgbToHsl(
                    fromRGB.R,
                    fromRGB.G,
                    fromRGB.B,
                    fromRGB.A
                );
                const fromHSLVars = {
                    h: fromHSL.H,
                    s: fromHSL.S,
                    l: fromHSL.L,
                    alpha: fromHSL.A
                };

                const H = new CalcParser('h', relative_h, fromHSLVars).result;
                const S = new CalcParser('s', relative_s, fromHSLVars).result;
                const L = new CalcParser('l', relative_l, fromHSLVars).result;

                const hsl: HSLObject = {
                    H: normalizeHue(H),
                    S: percent(S),
                    L: percent(L)
                };

                if (relative_a) {
                    const A = new CalcParser('alpha', relative_a, fromHSLVars).result;
                    hsl.A = minmax(A, 0, MAX_ALPHA);
                }

                return hsl;

            } else {

                const H = h_legacy ?? h;
                const S = s_legacy ?? s;
                const L = l_legacy ?? l;
                const A = a_legacy ?? a;

                return {
                    H: normalizeHue(H),
                    S: percent(S),
                    L: percent(L),
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
            H: normalizeHue(input.H),
            S: percent(`${input.S}`),
            L: percent(`${input.L}`),
            ...(
                isUndefined(input.A)
                    ? {}
                    : {
                        A: minmax(+input.A, 0, MAX_ALPHA)
                    }
            )
        };

    }

    convert(
        color: ColorObject,
        decimals: number,
        withAlpha: boolean
    ): HSLObject {
        let hsl: HSLObject;
        if (isHSLObject(color)) {
            hsl = color as HSLObject;
        } else {
            const rgb = getRGB(color);
            hsl = rgbToHsl(
                rgb.R,
                rgb.G,
                rgb.B,
                rgb.A
            );
        }
        return this._roundHSLObject(
            {
                H: hsl.H,
                S: hsl.S,
                L: hsl.L,
                ...(
                    withAlpha
                        ? {
                            A: hsl.A ?? 1
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
        const { legacyCSS, spacesAfterCommas } = options;
        const comma = getCSSComma(spacesAfterCommas);
        const hsl = this.convert(color, options.decimals, withAlpha);
        const transformer = buildCSSHueTransformer(options);
        const values = prepareColorForCss(hsl, transformer);
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
        return getResultFromCSSTemplate(template, values);
    }

    private _roundHSLObject(color: HSLObject, decimals: number): HSLObject {
        return {
            H: round(
                normalizeHue(color.H),
                decimals
            ),
            S: round(color.S, decimals),
            L: round(color.L, decimals),
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
            h_legacy,
            h,
            a_legacy,
            a
        } = groups;
        return {
            angleUnit: getAngleUnit(h_legacy ?? h),
            hasPercentageAlpha: PCENT.test(a_legacy ?? a),
            hasAlpha: !isUndefined(a_legacy ?? a)
        };
    }

    public get model(): ColorModel {
        return ColorModel.HSL;
    }

}