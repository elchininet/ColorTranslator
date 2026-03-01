import {
    CMYKObject,
    CMYKObjectGeneric,
    CMYKRegExpMatchArray,
    ColorInput,
    ColorUnitEnum,
    ColorObject,
    CSSOptionsBase,
    NumberOrString,
    Options
} from '@types';
import {
    ColorModel,
    COLORREGS,
    PCENT
} from '#constants';
import {
    getCMYKNumber,
    isCMYKObject,
    isString,
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
import { rgbToCmyk } from '#color/translators';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    hasPercentageValues: boolean;
    hasPercentageAlpha: boolean;
}

export class CMYKParser extends ColorParser {

    private _extract(input: string): CMYKRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.CMYK) as CMYKRegExpMatchArray;
        return match.groups;
    }

    private _shouldMultiplyBy100(...colors: NumberOrString[]): boolean {
        return !colors.some((color: string) => +color > 1);
    }

    supports(input: ColorInput): boolean {
        if (isString(input)) {
            return COLORREGS.CMYK.test(input);
        }
        return isCMYKObject(input);
    }

    parse(input: string | CMYKObjectGeneric, __context: ColorParserContext): CMYKObject {

        if (isString(input)) {

            const groups = this._extract(input);

            const c = groups.c_legacy ?? groups.c;
            const m = groups.m_legacy ?? groups.m;
            const y = groups.y_legacy ?? groups.y;
            const k = groups.k_legacy ?? groups.k;
            const a = groups.a_legacy ?? groups.a;
            const shouldMultiplyBy100 = this._shouldMultiplyBy100(c, m, y, k);

            return {
                C: getCMYKNumber(c, shouldMultiplyBy100),
                M: getCMYKNumber(m, shouldMultiplyBy100),
                Y: getCMYKNumber(y, shouldMultiplyBy100),
                K: getCMYKNumber(k, shouldMultiplyBy100),
                ...(
                    isUndefined(a)
                        ? {}
                        : {
                            A: normalizeAlpha(a)
                        }
                )
            };

        }

        const shouldMultiplyBy100 = this._shouldMultiplyBy100(
            input.C,
            input.M,
            input.Y,
            input.K
        );

        return {
            C: getCMYKNumber(`${input.C}`, shouldMultiplyBy100),
            M: getCMYKNumber(`${input.M}`, shouldMultiplyBy100),
            Y: getCMYKNumber(`${input.Y}`, shouldMultiplyBy100),
            K: getCMYKNumber(`${input.K}`, shouldMultiplyBy100),
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
    ): CMYKObject {
        let cmyk: CMYKObject;
        if (isCMYKObject(color)) {
            cmyk = color as CMYKObject;
        } else {
            const rgb = getRGB(color);
            cmyk = rgbToCmyk(
                rgb.R,
                rgb.G,
                rgb.B
            );
        }
        return this._roundCMYKObject(
            {
                C: cmyk.C,
                M: cmyk.M,
                Y: cmyk.Y,
                K: cmyk.K,
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
            legacyCSS,
            spacesAfterCommas,
            cmykUnit,
            cmykFunction
        } = options;
        const comma = getCSSComma(spacesAfterCommas);
        const cmyk = this.convert(color, options.decimals, withAlpha);
        const transformer = (value: number, index: number): NumberOrString => {
            if (
                cmykUnit === ColorUnitEnum.PERCENT &&
                index < 4
            ) {
                return `${round(value, decimals)}%`;
            }
            return index === 4
                ? getCSSAlpha(value, options)
                : round(value / 100, decimals);
        };
        const values = prepareColorForCss(cmyk, transformer);
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
        return getResultFromCSSTemplate(template, values);
    }

    private _roundCMYKObject(color: CMYKObject, decimals: number): CMYKObject {
        return {
            C: round(color.C, decimals),
            M: round(color.M, decimals),
            Y: round(color.Y, decimals),
            K: round(color.K, decimals),
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
            c_legacy,
            m_legacy,
            y_legacy,
            k_legacy,
            a_legacy,
            c,
            m,
            y,
            k,
            a
        } = groups;

        return {
            hasPercentageValues: (
                PCENT.test(c_legacy ?? c) &&
                PCENT.test(m_legacy ?? m) &&
                PCENT.test(y_legacy ?? y) &&
                PCENT.test(k_legacy ?? k)
            ),
            hasPercentageAlpha: PCENT.test(a_legacy ?? a),
            hasAlpha: !isUndefined(a_legacy ?? a)
        };
    }

    /* the getter is here to comply with the abstract class but it is not used for CMYK */
    /* istanbul ignore next */
    public get model(): ColorModel {
        /* the getter is here to comply with the abstract class but it is not used for CMYK */
        /* istanbul ignore next */
        return ColorModel.CMYK;
    }

}