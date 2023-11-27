import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    RGBObjectGeneric,
    CIELabObjectGeneric,
    HSLObjectGeneric,
    CMYKObjectGeneric,
    CMYKObject,
    HSLObject,
    CIELabObject,
    RGBObject,
    RYBObject,
    RGYBObject,
    HEXObject,
    RGBOutput,
    HSLOutput,
    CIELabOutput,
    HEXOutput,
    ColorOutput,
    Options
} from '@types';
import {
    HEX,
    PCENT,
    ColorModel,
    Mix,
    ColorKeywords,
    COLORREGS,
    COLOR_KEYS,
    ERRORS,
    VALID_COLOR_OBJECTS
} from '#constants';
import {
    getOrderedArrayString,
    getDEC,
    getHEX,
    getBase255Number,
    getBase125Number,
    getCMYKNumber,
    hasProp,
    percent,
    percentNumber,
    round,
    minmax,
    normalizeHue
} from '#helpers';
import {
    rgbToHSL,
    hslToRGB,
    cmykToRGB,
    rgbToCMYK,
    rgbToRYB,
    rybToRGB,
    rgbToLab,
    labToRgb,
    hueRYB
} from '#color/translators';
import { CSS } from '#color/css';

type HarmonyFunction = (color: HSLObject, mode: Mix) => HSLObject[];

//---Normalize alpha
export const normalizeAlpha = (alpha: number | string | undefined | null): number => {
    if (typeof alpha === 'string') {
        if (PCENT.test(alpha)) {
            alpha = percentNumber(alpha) / 100;
        } else {
            alpha = +alpha;
        }
    }
    return isNaN(+alpha) || alpha > 1 ? 1 : round(alpha);
};

//---Harmony
const harmony = (color: HSLObject, angles: number[], mode: Mix): HSLObject[] =>
    angles.reduce(
        (arr: HSLObject[], num: number): HSLObject[] => [
            ...arr,
            {
                ...color,
                H:
                    mode === Mix.ADDITIVE
                        ? normalizeHue(color.H + num)
                        : normalizeHue(hueRYB(hueRYB(color.H, false) + num, true))
            }
        ],
        [{ ...color }]
    );

export const analogous = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [30, -30], mode);
export const complementary = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [180], mode);
export const splitComplementary = (color: HSLObject, mode: Mix): HSLObject[] =>
    harmony(color, [150, -150], mode);
export const triadic = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [120, -120], mode);
export const tetradic = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [60, -120, 180], mode);
export const square = (color: HSLObject, mode: Mix): HSLObject[] => harmony(color, [90, -90, 180], mode);

//---Detect the color model from an string
const getColorModelFromString = (color: string): ColorModel => {
    let model;
    Object.keys(ColorModel).some((p: ColorModel): boolean => {
        const reg = COLORREGS[p];
        if (reg.test(color)) {
            model = p;
            return true;
        }
    });
    if (!model && !!~COLOR_KEYS.indexOf(color)) {
        model = ColorModel.HEX;
    }
    if (!model) {
        throw new Error(ERRORS.NOT_ACCEPTED_STRING_INPUT);
    }
    return model;
};

//---Detect the color model from an object
const getColorModelFromObject = (color: Color): ColorModel => {
    let model: ColorModel;
    let invalid = false;
    const props = getOrderedArrayString(Object.keys(color));

    if (VALID_COLOR_OBJECTS[props]) {
        model = VALID_COLOR_OBJECTS[props];
    }

    if (model && model === ColorModel.RGB) {
        const hasInvalidHex = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !HEX.test(`${item[1]}`);
        });

        const hasInvalidRegb = Object.entries(color).some((item: [string, string | number]): boolean => {
            return !(
                PCENT.test(`${item[1]}`) ||
                (!HEX.test(`${item[1]}`) && !isNaN(+item[1]) && +item[1] <= 255)
            );
        });

        if (hasInvalidHex && hasInvalidRegb) {
            invalid = true;
        }

        if (!hasInvalidHex) {
            model = ColorModel.HEX;
        }
    }
    if (!model || invalid) {
        throw new Error(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);
    }
    return model;
};

//---Detect the color model
export const getColorModel = (color: string | Color): ColorModel =>
    typeof color === 'string' ? getColorModelFromString(color) : getColorModelFromObject(color);

//---Convert a color string to an RGB object
export const getRGBObjectFromString = {
    [ColorModel.HEX](color: string): RGBObject {
        const colorStr = !~COLOR_KEYS.indexOf(color)
            ? color
            : ColorKeywords[color as keyof typeof ColorKeywords];
        const match = colorStr.match(COLORREGS.HEX);
        const object: RGBObject = {
            R: getDEC(match[1] || match[5]),
            G: getDEC(match[2] || match[6]),
            B: getDEC(match[3] || match[7])
        };
        const A = match[4] || match[8];
        if (A !== undefined) {
            object.A = getDEC(A) / 255;
        }
        return object;
    },
    [ColorModel.RGB](color: string): RGBObject {
        const match = color.match(COLORREGS.RGB);
        const R = getBase255Number(match[1] || match[5]);
        const G = getBase255Number(match[2] || match[6]);
        const B = getBase255Number(match[3] || match[7]);
        const A = match[4] || match[8];
        const object: RGBObject = {
            R: Math.min(R, 255),
            G: Math.min(G, 255),
            B: Math.min(B, 255)
        };
        if (A !== undefined) {
            object.A = normalizeAlpha(A);
        }
        return object;
    },
    [ColorModel.HSL](color: string): RGBObject {
        const match = color.match(COLORREGS.HSL);
        const H = normalizeHue(match[1] || match[5]);
        const S = percent(match[2] || match[6]);
        const L = percent(match[3] || match[7]);
        const A = match[4] || match[8];
        const RGB = hslToRGB(H, S, L);
        if (A !== undefined) {
            RGB.A = normalizeAlpha(A);
        }
        return RGB;
    },
    [ColorModel.CIELab](color: string): RGBObject {
        const match = color.match(COLORREGS.CIELab);
        const L = percent(match[1]);
        const a = getBase125Number(match[2]);
        const b = getBase125Number(match[3]);
        const A = match[4];
        const RGB = labToRgb(L, a, b);
        if (A !== undefined) {
            RGB.A = normalizeAlpha(A);
        }
        return RGB;
    },
    [ColorModel.CMYK](color: string): RGBObject {
        const match = color.match(COLORREGS.CMYK);
        const C = getCMYKNumber(match[1] || match[6]);
        const M = getCMYKNumber(match[2] || match[7]);
        const Y = getCMYKNumber(match[3] || match[8]);
        const K = getCMYKNumber(match[4] || match[9]);
        const A = match[5] || match[10];
        const RGB = cmykToRGB(C, M, Y, K);
        if (A !== undefined) {
            RGB.A = normalizeAlpha(A);
        }
        return RGB;
    }
};

//---Convert a color object to an RGB object
export const getRGBObjectFromObject = {
    [ColorModel.HEX](color: RGBObjectGeneric): RGBObject {
        const object: RGBObject = {
            R: getBase255Number(`${color.R}`),
            G: getBase255Number(`${color.G}`),
            B: getBase255Number(`${color.B}`)
        };
        if (hasProp<RGBObjectGeneric>(color, 'A')) {
            object.A = Math.min(getBase255Number(`${color.A}`, true), 1);
        }
        return object;
    },
    [ColorModel.RGB](color: RGBObjectGeneric): RGBObject {
        return this.HEX(color);
    },
    [ColorModel.HSL](color: HSLObjectGeneric): RGBObject {
        const S = percent(`${color.S}`);
        const L = percent(`${color.L}`);
        const RGB = hslToRGB(normalizeHue(color.H), S, L);
        if (hasProp<HSLObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    },
    [ColorModel.CIELab](color: CIELabObjectGeneric): RGBObject {
        const L = percent(`${color.L}`);
        const a = getBase125Number(`${color.a}`);
        const b = getBase125Number(`${color.b}`);
        const RGB = labToRgb(L, a, b);
        if (hasProp<CIELabObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    },
    [ColorModel.CMYK](color: CMYKObjectGeneric): RGBObject {
        const C = getCMYKNumber(`${color.C}`);
        const M = getCMYKNumber(`${color.M}`);
        const Y = getCMYKNumber(`${color.Y}`);
        const K = getCMYKNumber(`${color.K}`);
        const RGB = cmykToRGB(C, M, Y, K);
        if (hasProp<CMYKObjectGeneric>(color, 'A')) {
            RGB.A = normalizeAlpha(color.A);
        }
        return RGB;
    }
};

export const getRGBObject = (color: ColorInput, model: ColorModel = getColorModel(color)): RGBObject => {
    return typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model](
              color as RGBObjectGeneric & HSLObjectGeneric & CIELabObjectGeneric & CMYKObjectGeneric
          );
};

//---Get the color values from an object
export const translateColor = {
    [ColorModel.HEX](color: RGBObject): HEXObject {
        return {
            R: getHEX(color.R),
            G: getHEX(color.G),
            B: getHEX(color.B)
        };
    },

    HEXA(color: RGBObject): HEXObject {
        const RGB = translateColor.HEX(color);
        RGB.A = hasProp<RGBObject>(color, 'A') ? getHEX(color.A * 255) : '0xFF';
        return RGB;
    },

    [ColorModel.RGB](color: RGBObject, decimals: number): RGBObject {
        const RGB = roundRGBObject(color, decimals);
        if (hasProp<RGBObject>(RGB, 'A')) {
            delete RGB.A;
        }
        return RGB;
    },

    RGBA(color: RGBObject, decimals: number): RGBObject {
        const RGB = translateColor.RGB(color, decimals);
        RGB.A = hasProp<RGBObject>(color, 'A') ? round(color.A) : 1;
        return RGB;
    },

    [ColorModel.HSL](color: RGBObject, decimals: number): HSLObject {
        const HSL = rgbToHSL(color.R, color.G, color.B);
        delete HSL.A;
        return roundHSLObject(HSL, decimals);
    },

    HSLA(color: RGBObject, decimals: number): HSLObject {
        const HSL = translateColor.HSL(color, decimals);
        HSL.A = hasProp<RGBObject>(color, 'A') ? round(color.A, decimals) : 1;
        return HSL;
    },

    [ColorModel.CIELab](color: RGBObject, decimals: number): CIELabObject {
        const Lab = rgbToLab(color.R, color.G, color.B);
        return roundCIELabObject(Lab, decimals);
    },

    CIELabA(color: RGBObject, decimals: number): CIELabObject {
        const Lab = translateColor.CIELab(color, decimals);
        Lab.A = hasProp<RGBObject>(color, 'A') ? round(color.A, decimals) : 1;
        return Lab;
    },

    [ColorModel.CMYK](color: RGBObject, decimals: number): CMYKObject {
        return roundCMYKObject(rgbToCMYK(color.R, color.G, color.B), decimals);
    },

    CMYKA(color: RGBObject, decimals: number): CMYKObject {
        const CMYK = translateColor.CMYK(color, decimals);
        CMYK.A = hasProp<RGBObject>(color, 'A') ? round(color.A, decimals) : 1;
        return CMYK;
    }
};

//---Blending
export const blend = (from: RGBObject, to: RGBObject, steps: number): RGBObject[] => {
    const div = steps - 1;
    const diffR = (to.R - from.R) / div;
    const diffG = (to.G - from.G) / div;
    const diffB = (to.B - from.B) / div;
    const fromA = normalizeAlpha(from.A);
    const toA = normalizeAlpha(to.A);
    const diffA = (toA - fromA) / div;
    return Array(steps)
        .fill(null)
        .map((__n, i): RGBObject => {
            if (i === 0) {
                return from;
            }
            if (i === div) {
                return to;
            }
            return {
                R: round(from.R + diffR * i),
                G: round(from.G + diffG * i),
                B: round(from.B + diffB * i),
                A: round(fromA + diffA * i)
            };
        });
};

//---Shades
export const getColorMixture = (
    color: ColorInputWithoutCMYK,
    steps: number,
    shades: boolean,
    options: Options
): ColorOutput[] => {
    const model = getColorModel(color);
    const isCSS = typeof color === 'string';
    const RGB = getRGBObject(color, model);
    const hasAlpha =
        (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
        (typeof color !== 'string' &&
            hasProp<RGBObjectGeneric | HSLObjectGeneric | CIELabObjectGeneric>(color, 'A'));
    const HSL: HSLObject = rgbToHSL(RGB.R, RGB.G, RGB.B, RGB.A);
    if (!hasAlpha) delete HSL.A;
    const increment = shades ? HSL.L / (steps + 1) : (100 - HSL.L) / (steps + 1);
    const hslMap = Array(steps)
        .fill(null)
        .map(
            (__n, i): HSLObject => ({
                ...HSL,
                L: HSL.L + increment * (i + 1) * (1 - +shades * 2)
            })
        );
    switch (model) {
        case ColorModel.HEX:
        default:
            return hslMap.map((HSLColor: HSLObject): HEXOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? hasAlpha
                        ? CSS.HEX({
                              ...RGBColor,
                              A: round(RGBColor.A * 255)
                          })
                        : CSS.HEX(RGBColor)
                    : hasAlpha
                      ? translateColor.HEXA(RGBColor)
                      : translateColor.HEX(RGBColor);
            });
        case ColorModel.RGB:
            return hslMap.map((HSLColor: HSLObject): RGBOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                if (hasAlpha) RGBColor.A = HSLColor.A;
                return isCSS
                    ? CSS.RGB(RGBColor, options)
                    : hasAlpha
                      ? translateColor.RGBA(RGBColor, options.decimals)
                      : translateColor.RGB(RGBColor, options.decimals);
            });
        case ColorModel.HSL:
            return hslMap.map((HSLColor: HSLObject): HSLOutput => {
                return isCSS
                    ? CSS.HSL(HSLColor, options)
                    : hasAlpha
                      ? translateColor.HSLA(
                            {
                                ...hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L),
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                      : translateColor.HSL(hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L), options.decimals);
            });
        case ColorModel.CIELab:
            return hslMap.map((HSLColor: HSLObject): CIELabOutput => {
                const RGBColor = hslToRGB(HSLColor.H, HSLColor.S, HSLColor.L);
                return isCSS
                    ? CSS.CIELab(
                          hasAlpha
                              ? translateColor.CIELabA(RGBColor, options.decimals)
                              : translateColor.CIELab(RGBColor, options.decimals),
                          options
                      )
                    : hasAlpha
                      ? translateColor.CIELabA(
                            {
                                ...RGBColor,
                                A: HSLColor.A
                            },
                            options.decimals
                        )
                      : translateColor.CIELab(RGBColor, options.decimals);
            });
    }
};

//---Harmony
export const colorHarmony = {
    buildHarmony(
        color: ColorInputWithoutCMYK,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        options: Options
    ): ColorOutput[] {
        const model = getColorModel(color);
        const RGB = getRGBObject(color, model);
        const HSL = rgbToHSL(RGB.R, RGB.G, RGB.B, RGB.A);
        const hasAlpha =
            (typeof color === 'string' && hasProp<RGBObject>(RGB, 'A')) ||
            (typeof color !== 'string' &&
                hasProp<RGBObjectGeneric | HSLObjectGeneric | CIELabObjectGeneric>(color, 'A'));
        const isCSS = typeof color === 'string';
        switch (model) {
            case ColorModel.HEX:
            default:
                return hasAlpha
                    ? this.HEXA(roundHSLObject(HSL, 0), harmonyFunction, mode, isCSS)
                    : this.HEX(roundHSLObject(HSL, 0), harmonyFunction, mode, isCSS);
            case ColorModel.HSL:
                return hasAlpha
                    ? this.HSLA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.HSL(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.RGB:
                return hasAlpha
                    ? this.RGBA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.RGB(HSL, harmonyFunction, mode, isCSS, options);
            case ColorModel.CIELab:
                return hasAlpha
                    ? this.CIELabA(HSL, harmonyFunction, mode, isCSS, options)
                    : this.CIELab(HSL, harmonyFunction, mode, isCSS, options);
        }
    },

    [ColorModel.HEX](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean
    ): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput =>
                css ? CSS.HEX(hslToRGB(c.H, c.S, c.L)) : translateColor.HEX(hslToRGB(c.H, c.S, c.L))
        );
    },

    HEXA(color: HSLObject, harmonyFunction: HarmonyFunction, mode: Mix, css: boolean): HEXOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HEXOutput =>
                css
                    ? CSS.HEX({
                          ...hslToRGB(c.H, c.S, c.L),
                          A: normalizeAlpha(c.A) * 255
                      })
                    : translateColor.HEXA({
                          ...hslToRGB(c.H, c.S, c.L),
                          A: normalizeAlpha(c.A)
                      })
        );
    },

    [ColorModel.RGB](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput =>
                css
                    ? CSS.RGB(hslToRGB(c.H, c.S, c.L), options)
                    : translateColor.RGB(hslToRGB(c.H, c.S, c.L), options.decimals)
        );
    },

    RGBA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): RGBOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): RGBOutput =>
                css
                    ? CSS.RGB(
                          {
                              ...hslToRGB(c.H, c.S, c.L),
                              A: normalizeAlpha(c.A)
                          },
                          options
                      )
                    : translateColor.RGBA(
                          {
                              ...hslToRGB(c.H, c.S, c.L),
                              A: normalizeAlpha(c.A)
                          },
                          options.decimals
                      )
        );
    },

    [ColorModel.HSL](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput =>
                css
                    ? CSS.HSL(
                          {
                              H: c.H,
                              S: c.S,
                              L: c.L
                          },
                          options
                      )
                    : translateColor.HSL(hslToRGB(c.H, c.S, c.L), options.decimals)
        );
    },

    HSLA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): HSLOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map(
            (c: HSLObject): HSLOutput =>
                css
                    ? CSS.HSL(
                          {
                              ...c,
                              A: normalizeAlpha(c.A)
                          },
                          options
                      )
                    : translateColor.HSLA(
                          {
                              ...hslToRGB(c.H, c.S, c.L),
                              A: normalizeAlpha(c.A)
                          },
                          options.decimals
                      )
        );
    },

    [ColorModel.CIELab](
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map((c: HSLObject): CIELabOutput => {
            const RGB = hslToRGB(c.H, c.S, c.L);
            return css
                ? CSS.CIELab(rgbToLab(RGB.R, RGB.G, RGB.B), options)
                : translateColor.CIELab(RGB, options.decimals);
        });
    },

    CIELabA(
        color: HSLObject,
        harmonyFunction: HarmonyFunction,
        mode: Mix,
        css: boolean,
        options: Options
    ): CIELabOutput[] {
        const array = harmonyFunction(color, mode);
        return array.map((c: HSLObject): CIELabOutput => {
            const RGB = hslToRGB(c.H, c.S, c.L);
            return css
                ? CSS.CIELab(
                      {
                          ...rgbToLab(RGB.R, RGB.G, RGB.B),
                          A: normalizeAlpha(c.A)
                      },
                      options
                  )
                : translateColor.CIELabA(
                      {
                          ...RGB,
                          A: normalizeAlpha(c.A)
                      },
                      options.decimals
                  );
        });
    }
};

export const colorMixer = {
    mix(colors: ColorInput[], mode: Mix): RGBObject {
        const rgbMap = colors.map((color: ColorInput): RGBObject => {
            const model = getColorModel(color);
            return getRGBObject(color, model);
        });

        const rybMap =
            mode === Mix.SUBTRACTIVE
                ? rgbMap.map((color: RGBObject): RYBObject => {
                      const RYB = rgbToRYB(color.R, color.G, color.B);
                      if (hasProp<RGBObject>(color, 'A')) {
                          RYB.A = color.A;
                      }
                      return RYB;
                  })
                : null;

        function createMix(items: RGBObject[]): RGBObject;
        function createMix(items: RYBObject[]): RYBObject;
        function createMix(items: RGYBObject[]): RGYBObject {
            const initial = mode === Mix.ADDITIVE ? { R: 0, G: 0, B: 0, A: 0 } : { R: 0, Y: 0, B: 0, A: 0 };
            return items.reduce((mix: RGYBObject, color: RGYBObject): RGYBObject => {
                const colorA = hasProp<RGYBObject>(color, 'A') ? color.A : 1;
                const common = {
                    R: Math.min(mix.R + color.R * colorA, 255),
                    B: Math.min(mix.B + color.B * colorA, 255),
                    A: 1 - (1 - colorA) * (1 - mix.A)
                };
                const mixGY = 'G' in mix ? mix.G : mix.Y;
                const colorGY = 'G' in color ? color.G : color.Y;
                return {
                    ...common,
                    ...(mode === Mix.ADDITIVE
                        ? { G: Math.min(mixGY + colorGY * colorA, 255) }
                        : { Y: Math.min(mixGY + colorGY * colorA, 255) })
                };
            }, initial);
        }

        let mix: RGBObject;

        if (mode === Mix.ADDITIVE) {
            mix = createMix(rgbMap);
        } else {
            const RYB = createMix(rybMap);
            mix = rybToRGB(RYB.R, RYB.Y, RYB.B);
            mix.A = RYB.A;
        }

        return {
            R: round(mix.R),
            G: round(mix.G),
            B: round(mix.B),
            A: minmax(mix.A, 0, 1)
        };
    },
    [ColorModel.HEX]<CSS extends boolean, R = CSS extends true ? string : HEXObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (css ? CSS.HEX(mix) : translateColor.HEX(mix)) as R;
    },
    HEXA<CSS extends boolean, R = CSS extends true ? string : HEXObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS
    ): R {
        const mix = this.mix(colors, mode);
        mix.A = css ? normalizeAlpha(mix.A) * 255 : normalizeAlpha(mix.A);
        return (css ? CSS.HEX(mix) : translateColor.HEXA(mix)) as R;
    },
    [ColorModel.RGB]<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        delete mix.A;
        return (css ? CSS.RGB(mix, options) : translateColor.RGB(mix, options.decimals)) as R;
    },
    RGBA<CSS extends boolean, R = CSS extends true ? string : RGBObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        return (css ? CSS.RGB(mix, options) : translateColor.RGBA(mix, options.decimals)) as R;
    },
    [ColorModel.HSL]<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHSL(mix.R, mix.G, mix.B);
        delete mix.A;
        delete HSL.A;
        return (css ? CSS.HSL(HSL, options) : translateColor.HSL(mix, options.decimals)) as R;
    },
    HSLA<CSS extends boolean, R = CSS extends true ? string : HSLObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const HSL = rgbToHSL(mix.R, mix.G, mix.B, mix.A);
        return (css ? CSS.HSL(HSL, options) : translateColor.HSLA(mix, options.decimals)) as R;
    },
    [ColorModel.CIELab]<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        delete mix.A;
        return (css ? CSS.CIELab(Lab, options) : translateColor.CIELabA(mix, options.decimals)) as R;
    },
    CIELabA<CSS extends boolean, R = CSS extends true ? string : CIELabObject>(
        colors: ColorInput[],
        mode: Mix,
        css: CSS,
        options: Options
    ): R {
        const mix = this.mix(colors, mode);
        const Lab = rgbToLab(mix.R, mix.G, mix.B);
        if (hasProp<RGBObject>(mix, 'A')) {
            Lab.A = mix.A;
        }
        return (css ? CSS.CIELab(Lab, options) : translateColor.CIELabA(mix, options.decimals)) as R;
    }
};

export const roundRGBObject = (color: RGBObject, decimals: number): RGBObject => {
    const R = round(color.R, decimals);
    const G = round(color.G, decimals);
    const B = round(color.B, decimals);
    return {
        R,
        G,
        B,
        ...(hasProp<RGBObject>(color, 'A')
            ? {
                  A: round(color.A, decimals)
              }
            : {})
    };
};

export const roundHSLObject = (color: HSLObject, decimals: number): HSLObject => {
    return {
        H: round(color.H, decimals),
        S: round(color.S, decimals),
        L: round(color.L, decimals),
        ...(hasProp<HSLObject>(color, 'A')
            ? {
                  A: round(color.A, decimals)
              }
            : {})
    };
};

export const roundCIELabObject = (color: CIELabObject, decimals: number): CIELabObject => {
    return {
        L: round(color.L, decimals),
        a: round(color.a, decimals),
        b: round(color.b, decimals)
    };
};

export const roundCMYKObject = (color: CMYKObject, decimals: number): CMYKObject => {
    return {
        C: round(color.C, decimals),
        M: round(color.M, decimals),
        Y: round(color.Y, decimals),
        K: round(color.K, decimals)
    };
};
