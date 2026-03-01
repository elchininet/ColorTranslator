import {
    AnglesUnitEnum,
    ColorInput,
    ColorObject,
    CSSOptionsBase,
    HWBObject,
    HWBObjectGeneric,
    HWBRegExpMatchArray,
    Options
} from '@types';
import {
    COLORREGS,
    ColorModel,
    MAX_ALPHA,
    MAX_HUE,
    MAX_PCENT,
    PCENT
} from '#constants';
import {
    getAngleUnit,
    isHWBObject,
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
    getResultFromCSSTemplate,
    prepareColorForCss
} from '#css';
import { getRGB } from '#color/rgb';
import { rgbToHwb } from '#color/translators';
import { CalcParser } from './CalcParser';
import { ColorParserContext, ColorParser } from './ColorParserContext';

interface CSSOptions extends CSSOptionsBase {
    angleUnit: AnglesUnitEnum;
    hasPercentageAlpha: boolean;
}

export class HWBParser extends ColorParser {

    private _extract(input: string): HWBRegExpMatchArray['groups'] {
        const match = input.match(COLORREGS.HWB) as HWBRegExpMatchArray;
        return match.groups;
    }

    supports(input: ColorInput): boolean {
        if (isString(input)) {
            return COLORREGS.HWB.test(input);
        }
        return isHWBObject(input);
    }

    parse(input: string | HWBObjectGeneric, context: ColorParserContext): HWBObject {

        if (isString(input)) {

            const groups = this._extract(input);

            const {
                // HWB values
                h,
                w,
                b,
                a,
                // Relative values
                from,
                relative_h,
                relative_w,
                relative_b,
                relative_a
            } = groups;

            if (from) {

                const fromColor = context.parse(from);
                const fromRGB = getRGB(fromColor);
                const fromHWB = rgbToHwb(
                    fromRGB.R,
                    fromRGB.G,
                    fromRGB.B,
                    fromRGB.A
                );
                const fromHWBVars = {
                    h: fromHWB.H,
                    w: fromHWB.W,
                    b: fromHWB.B,
                    alpha: fromHWB.A
                };

                const H = new CalcParser('h', relative_h, fromHWBVars).result;
                const W = new CalcParser('w', relative_w, fromHWBVars).result;
                const B = new CalcParser('b', relative_b, fromHWBVars).result;

                const hwb: HWBObject = {
                    H: minmax(H, 0, MAX_HUE),
                    W: minmax(W, 0, MAX_PCENT),
                    B: minmax(B, 0, MAX_PCENT)
                };

                if (relative_a) {
                    const A = new CalcParser('alpha', relative_a, fromHWBVars).result;
                    hwb.A = minmax(A, 0, MAX_ALPHA);
                }

                return hwb;

            } else {

                return {
                    H: normalizeHue(h),
                    W: percent(w),
                    B: percent(b),
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
            H: normalizeHue(input.H),
            W: percent(input.W),
            B: percent(input.B),
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
    ): HWBObject {
        let hwb: HWBObject;
        if (isHWBObject(color)) {
            hwb = color as HWBObject;
        } else {
            const rgb = getRGB(color);
            hwb = rgbToHwb(
                rgb.R,
                rgb.G,
                rgb.B,
                rgb.A
            );
        }
        return this._roundHWBObject(
            {
                H: hwb.H,
                W: hwb.W,
                B: hwb.B,
                ...(
                    withAlpha
                        ? {
                            A: hwb.A ?? 1
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
        const hwb = this.convert(color, options.decimals, withAlpha);
        const transformer = buildCSSHueTransformer(options);
        const values = prepareColorForCss(hwb, transformer);
        const template = values.length === 4
            ? `hwb({1} {2}% {3}% / {4})`
            : `hwb({1} {2}% {3}%)`;
        return getResultFromCSSTemplate(template, values);
    }

    private _roundHWBObject(color: HWBObject, decimals: number): HWBObject {
        return {
            H: round(
                normalizeHue(color.H),
                decimals
            ),
            W: round(color.W, decimals),
            B: round(color.B, decimals),
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
            hasPercentageAlpha: PCENT.test(groups.a),
            hasAlpha: !isUndefined(groups.a)
        };
    }

    public get model(): ColorModel {
        return ColorModel.HWB;
    }

}