import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    HSLObjectGeneric,
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject,
    HEXOutput,
    RGBOutput,
    HSLOutput,
    CMYKOutput,
    ColorOutput,
    ColorModelOutput,
} from '@types';
import {
    ColorModel,
    Harmony,
    Mix,
    DEFAULT_BLEND_STEPS,
    MAX_DECIMALS,
    DEFAULT_COLOR_LEVEL_4
} from '#constants';
import {
    rgbToHSL,
    hslToRGB,
    rgbToCMYK,
    cmykToRGB
} from '#color/translators';
import * as utils from '#color/utils';
import { CSS } from '#color/css';
import { round, minmax } from '#helpers';

const getColorReturn = <T extends ColorModel>(
    color: ColorInput,
    fromModel: ColorModel,
    css: boolean,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => ColorModelOutput[T],
    toModel: T,
    colorLevel4 = DEFAULT_COLOR_LEVEL_4,
): ColorModelOutput[T] | string => {
    const rgbObject = utils.getRGBObject(color, fromModel);
    const translated = translateFunction(rgbObject, decimals);
    if (!css) {
        return translated;
    }
    return CSS(toModel, translated, colorLevel4);
};

const getBlendReturn = <T extends ColorModel>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    css: boolean,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => ColorModelOutput[T],
    toModel: T,
    colorLevel4 = DEFAULT_COLOR_LEVEL_4,
): (ColorModelOutput[T] | string)[] => {
    if (steps < 1) steps = DEFAULT_BLEND_STEPS;
    const fromRGBObject = utils.getRGBObject(from);
    const toRGBObject = utils.getRGBObject(to);
    const blendArray = utils.blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject): ColorModelOutput[T] | string => {
        const translated = translateFunction(color, decimals);
        if (!css) {
            return translated;
        }
        return CSS(toModel, translated, colorLevel4);
    });
};

const getHarmonyReturn = (
    harmony: Harmony,
    color: ColorInputWithoutCMYK,
    decimals: number,
    mode?: Mix,
    colorLevel4 = DEFAULT_COLOR_LEVEL_4
): ColorOutput[] => {
    return ({
        [Harmony.ANALOGOUS]: utils.colorHarmony.buildHarmony(color, utils.analogous, mode, decimals, colorLevel4),
        [Harmony.COMPLEMENTARY]: utils.colorHarmony.buildHarmony(color, utils.complementary, mode, decimals, colorLevel4),
        [Harmony.SPLIT_COMPLEMENTARY]: utils.colorHarmony.buildHarmony(color, utils.splitComplementary, mode, decimals, colorLevel4),
        [Harmony.TRIADIC]: utils.colorHarmony.buildHarmony(color, utils.triadic, mode, decimals, colorLevel4),
        [Harmony.TETRADIC]: utils.colorHarmony.buildHarmony(color, utils.tetradic, mode, decimals, colorLevel4),
        [Harmony.SQUARE]: utils.colorHarmony.buildHarmony(color, utils.square, mode, decimals, colorLevel4)
    })[harmony];
};

export class ColorTranslator {

    // Constructor
    public constructor(color: ColorInput, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4) {
        this.rgb = utils.getRGBObject(color);
        this._decimals = decimals;
        this._colorLevel4 = colorLevel4;
        this.updateHSL();
        this.updateCMYK();
    }

    // Private properties
    private rgb: RGBObject;
    private hsl: HSLObject;
    private cmyk: CMYKObject;
    private _decimals: number;
    private _colorLevel4: boolean;

    // Private methods
    private updateRGB(): void {
        this.rgb = { ...hslToRGB(this.hsl.h, this.hsl.s, this.hsl.l), a: this.hsl.a };
    }

    private updateRGBFromCMYK(): void {
        this.rgb = { ...cmykToRGB(this.cmyk.c, this.cmyk.m, this.cmyk.y, this.cmyk.k), a: this.rgb.a };
    }

    private updateHSL(): void {
        this.hsl = rgbToHSL(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.a);
    }

    private updateCMYK(): void {
        this.cmyk = rgbToCMYK(this.rgb.r, this.rgb.g, this.rgb.b);
    }

    private updateRGBAndCMYK(): ColorTranslator {
        this.updateRGB();
        this.updateCMYK();
        return this;
    }

    private updateHSLAndCMYK(): ColorTranslator {
        this.updateHSL();
        this.updateCMYK();
        return this;
    }

    private updateRGBAndHSL(): ColorTranslator {
        this.updateRGBFromCMYK();
        this.updateHSL();
        return this;
    }

    // Public decimal method
    public setDecimals(decimals: number): ColorTranslator {
        this._decimals = decimals;
        return this;
    }

    // Public decimal method
    public setColorLevel4(colorLevel4: boolean): ColorTranslator {
        this._colorLevel4 = colorLevel4;
        return this;
    }

    // Public HSL methods
    public setH(h: number): ColorTranslator {
        this.hsl.h = utils.normalizeHue(h);
        return this.updateRGBAndCMYK();
    }

    public setS(s: number): ColorTranslator {
        this.hsl.s = minmax(s, 0, 100);
        return this.updateRGBAndCMYK();
    }

    public setL(l: number): ColorTranslator {
        this.hsl.l = minmax(l, 0, 100);
        return this.updateRGBAndCMYK();
    }

    // Public RGB methods
    public setR(r: number): ColorTranslator {
        this.rgb.r = minmax(r, 0, 255);
        return this.updateHSLAndCMYK();
    }

    public setG(g: number): ColorTranslator {
        this.rgb.g = minmax(g, 0, 255);
        return this.updateHSLAndCMYK();
    }

    public setB(b: number): ColorTranslator {
        this.rgb.b = minmax(b, 0, 255);
        return this.updateHSLAndCMYK();
    }

    // Public alpha method
    public setA(a: number): ColorTranslator {
        this.hsl.a = this.rgb.a = minmax(a, 0, 1);
        return this;
    }

    // Public CMYK methods
    public setC(c: number): ColorTranslator {
        this.cmyk.c = minmax(c, 0, 100);
        return this.updateRGBAndHSL();
    }

    public setM(m: number): ColorTranslator {
        this.cmyk.m = minmax(m, 0, 100);
        return this.updateRGBAndHSL();
    }

    public setY(y: number): ColorTranslator {
        this.cmyk.y = minmax(y, 0, 100);
        return this.updateRGBAndHSL();
    }

    public setK(k: number): ColorTranslator {
        this.cmyk.k = minmax(k, 0, 100);
        return this.updateRGBAndHSL();
    }

    // Public decimals property
    public get decimals(): number {
        return this._decimals;
    }

    // Public colorLevel4 property
    public get colorLevel4(): boolean {
        return this._colorLevel4;
    }

    // Public HSL properties
    public get H(): number {
        return round(this.hsl.h, this.decimals);
    }

    public get S(): number {
        return round(this.hsl.s, this.decimals);
    }

    public get L(): number {
        return round(this.hsl.l, this.decimals);
    }

    // Public RGB properties
    public get R(): number {
        return round(this.rgb.r, this.decimals);
    }

    public get G(): number {
        return round(this.rgb.g, this.decimals);
    }

    public get B(): number {
        return round(this.rgb.b, this.decimals);
    }

    // Public alpha property
    public get A(): number {
        return round(this.hsl.a, this.decimals);
    }

    // Public CMYK properties
    public get C(): number {
        return round(this.cmyk.c, this.decimals);
    }

    public get M(): number {
        return round(this.cmyk.m, this.decimals);
    }

    public get Y(): number {
        return round(this.cmyk.y, this.decimals);
    }

    public get K(): number {
        return round(this.cmyk.k, this.decimals);
    }

    // Object public properties
    public get HEXObject(): HEXObject {
        return utils.translateColor.HEX(this.rgb);
    }

    public get HEXAObject(): HEXObject {
        return utils.translateColor.HEXA(this.rgb);
    }

    public get RGBObject(): RGBObject {
        return {
            r: this.R,
            g: this.G,
            b: this.B
        };
    }

    public get RGBAObject(): RGBObject {
        return {
            ...this.RGBObject,
            a: this.A
        };
    }

    public get HSLObject(): HSLObject {
        return {
            h: this.H,
            s: this.S,
            l: this.L
        };
    }

    public get HSLAObject(): HSLObject {
        return {
            ...this.HSLObject,
            a: this.A
        };
    }

    public get CMYKObject(): CMYKObject {
        return {
            c: this.C,
            m: this.M,
            y: this.Y,
            k: this.K
        };
    }

    public get CMYKAObject(): CMYKObject {
        return {
            ...this.CMYKObject,
            a: this.A
        };
    }

    // CSS public properties
    public get HEX(): string {
        return CSS(ColorModel.HEX, {
            r: this.R,
            g: this.G,
            b: this.B
        });
    }

    public get HEXA(): string {
        return CSS(ColorModel.HEX, {
            r: this.R,
            g: this.G,
            b: this.B,
            a: this.A * 255
        });
    }

    public get RGB(): string {
        return CSS(ColorModel.RGB, {
            r: this.R,
            g: this.G,
            b: this.B
        }, this.colorLevel4);
    }

    public get RGBA(): string {
        return CSS(ColorModel.RGB, {
            r: this.R,
            g: this.G,
            b: this.B,
            a: this.A
        }, this.colorLevel4);
    }

    public get HSL(): string {
        return CSS(ColorModel.HSL, {
            h: this.H,
            s: this.S,
            l: this.L
        }, this.colorLevel4);
    }

    public get HSLA(): string {
        return CSS(ColorModel.HSL, {
            h: this.H,
            s: this.S,
            l: this.L,
            a: this.A
        }, this.colorLevel4);
    }

    public get CMYK(): string {
        return CSS(ColorModel.CMYK, {
            c: this.C,
            m: this.M,
            y: this.Y,
            k: this.K
        }, this.colorLevel4);
    }

    public get CMYKA(): string {
        return CSS(ColorModel.CMYK, {
            c: this.C,
            m: this.M,
            y: this.Y,
            k: this.K,
            a: this.A
        }, this.colorLevel4);
    }

    // Color Conversion Static Methods
    public static toHEX(color: ColorInput): string;
    public static toHEX(color: ColorInput, css: true): string;
    public static toHEX(color: ColorInput, css: false): HEXObject;
    public static toHEX(color: ColorInput, css = true): HEXOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            0,
            utils.translateColor.HEX,
            ColorModel.HEX
        );
    }

    public static toHEXA(color: ColorInput): string;
    public static toHEXA(color: ColorInput, css: true): string;
    public static toHEXA(color: ColorInput, css: false): HEXObject;
    public static toHEXA(color: ColorInput, css = true): HEXOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            0,
            utils.translateColor.HEXA,
            ColorModel.HEX
        );
    }

    public static toRGB(color: ColorInput): string;
    public static toRGB(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toRGB(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): RGBObject;
    public static toRGB(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.RGB, ColorModel.RGB, colorLevel4);
    }

    public static toRGBA(color: ColorInput): string;
    public static toRGBA(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toRGBA(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): RGBObject;
    public static toRGBA(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.RGBA, ColorModel.RGB, colorLevel4);
    }

    public static toHSL(color: ColorInput): string;
    public static toHSL(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toHSL(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): HSLObject;
    public static toHSL(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.HSL, ColorModel.HSL, colorLevel4);
    }

    public static toHSLA(color: ColorInput): string;
    public static toHSLA(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toHSLA(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): HSLObject;
    public static toHSLA(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.HSLA, ColorModel.HSL, colorLevel4);
    }

    public static toCMYK(color: ColorInput): string;
    public static toCMYK(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toCMYK(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): CMYKObject;
    public static toCMYK(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): CMYKOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.CMYK, ColorModel.CMYK, colorLevel4);
    }

    public static toCMYKA(color: ColorInput): string;
    public static toCMYKA(color: ColorInput, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static toCMYKA(color: ColorInput, css: false, decimals?: number, colorLevel4?: boolean): CMYKObject;
    public static toCMYKA(color: ColorInput, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): CMYKOutput {
        const model = utils.getColorModel(color);
        return getColorReturn(
            color,
            model,
            css,
            decimals,
            utils.translateColor.CMYKA, ColorModel.CMYK, colorLevel4);
    }

    // Color Blending Static Methods
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number): string[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number): HEXObject[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS): HEXOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.HEX, ColorModel.HEX, false);
    }

    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number): string[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number): HEXObject[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS): HEXOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.HEXA, ColorModel.HEX, false);
    }

    public static getBlendRGB(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number, colorLevel4?: boolean): string[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number, colorLevel4?: boolean): RGBObject[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.RGB, ColorModel.RGB, colorLevel4);
    }

    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number): string[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number, colorLevel4?: boolean): string[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number, colorLevel4?: boolean): RGBObject[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.RGBA, ColorModel.RGB, colorLevel4);
    }

    public static getBlendHSL(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number, colorLevel4?: boolean): string[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number, colorLevel4?: boolean): HSLObject[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.HSL, ColorModel.HSL, colorLevel4);
    }

    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number, css: true, decimals?: number, colorLevel4?: boolean): string[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number, css: false, decimals?: number, colorLevel4?: boolean): HSLObject[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number = DEFAULT_BLEND_STEPS, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput[] {
        return getBlendReturn(
            from,
            to,
            steps,
            css,
            decimals,
            utils.translateColor.HSLA, ColorModel.HSL, colorLevel4);
    }

    // Color Mix Static Methods
    public static getMixHEX(colors: ColorInput[]): string;
    public static getMixHEX(colors: ColorInput[], mode: Mix): string;
    public static getMixHEX(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixHEX(colors: ColorInput[], mode: Mix, css: false): HEXObject;
    public static getMixHEX(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): HEXOutput {
        return utils.colorMixer.HEX(colors, mode, css);
    }

    public static getMixHEXA(colors: ColorInput[]): string;
    public static getMixHEXA(colors: ColorInput[], mode: Mix): string;
    public static getMixHEXA(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixHEXA(colors: ColorInput[], mode: Mix, css: false): HEXObject;
    public static getMixHEXA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): HEXOutput {
        return utils.colorMixer.HEXA(colors, mode, css);
    }

    public static getMixRGB(colors: ColorInput[]): string;
    public static getMixRGB(colors: ColorInput[], mode: Mix): string;
    public static getMixRGB(colors: ColorInput[], mode: Mix, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static getMixRGB(colors: ColorInput[], mode: Mix, css: false, decimals?: number, colorLevel4?: boolean): RGBObject;
    public static getMixRGB(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput {
        return utils.colorMixer.RGB(colors, mode, css, decimals, colorLevel4);
    }

    public static getMixRGBA(colors: ColorInput[]): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix, css: false, decimals?: number, colorLevel4?: boolean): RGBObject;
    public static getMixRGBA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): RGBOutput {
        return utils.colorMixer.RGBA(colors, mode, css, decimals, colorLevel4);
    }

    public static getMixHSL(colors: ColorInput[]): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix, css: false, decimals?: number, colorLevel4?: boolean): HSLObject;
    public static getMixHSL(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput {
        return utils.colorMixer.HSL(colors, mode, css, decimals, colorLevel4);
    }

    public static getMixHSLA(colors: ColorInput[]): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix, css: true, decimals?: number, colorLevel4?: boolean): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix, css: false, decimals?: number, colorLevel4?: boolean): HSLObject;
    public static getMixHSLA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): HSLOutput {
        return utils.colorMixer.HSLA(colors, mode, css, decimals, colorLevel4);
    }

    // Get shades static method
    public static getShades(color: string, shades: number, decimals?: number, colorLevel4?: boolean): string[];
    public static getShades(color: HEXObject, shades: number, decimals?: number, colorLevel4?: boolean): HEXObject[];
    public static getShades(color: RGBObject, shades: number, decimals?: number, colorLevel4?: boolean): RGBObject[];
    public static getShades(color: HSLObjectGeneric, shades: number, decimals?: number, colorLevel4?: boolean): HSLObject[];
    public static getShades(color: ColorInputWithoutCMYK, shades: number, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): ColorOutput[] {
        return utils.getColorMixture(color, shades, true, decimals, colorLevel4);
    }

    // Get tints static method
    public static getTints(color: string, tints: number, decimals?: number, colorLevel4?: boolean): string[];
    public static getTints(color: HEXObject, tints: number, decimals?: number, colorLevel4?: boolean): HEXObject[];
    public static getTints(color: RGBObject, tints: number, decimals?: number, colorLevel4?: boolean): RGBObject[];
    public static getTints(color: HSLObjectGeneric, tints: number, decimals?: number, colorLevel4?: boolean): HSLObject[];
    public static getTints(color: ColorInputWithoutCMYK, tints: number, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): ColorOutput[] {
        return utils.getColorMixture(color, tints, false, decimals, colorLevel4);
    }

    // Color Harmony Static Method
    public static getHarmony(color: string, harmony?: Harmony, mode?: Mix, decimals?: number, colorLevel4?: boolean): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, mode?: Mix, decimals?: number, colorLevel4?: boolean): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, mode?: Mix, decimals?: number, colorLevel4?: boolean): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, mode?: Mix, decimals?: number, colorLevel4?: boolean): HSLObject[];
    public static getHarmony(color: ColorInputWithoutCMYK, harmony: Harmony = Harmony.COMPLEMENTARY, mode: Mix = Mix.ADDITIVE, decimals = MAX_DECIMALS, colorLevel4 = DEFAULT_COLOR_LEVEL_4): ColorOutput[] {
        return getHarmonyReturn(harmony, color, decimals, mode, colorLevel4);
    }
}

export {
    Harmony,
    Mix,
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject
};