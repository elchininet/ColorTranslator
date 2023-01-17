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
    ColorOutput
} from '@types';
import {
    ColorModel,
    Harmony,
    Mix,
    MIN_DECIMALS
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

const getReturn = <T>(
    color: ColorInput,
    model: ColorModel,
    css: boolean,
    translateFunction: (color: Color) => T,
    cssFunction: (color: T) => string
): T | string => {
    const rgbObject = utils.getRGBObject(color, model);
    const translated = translateFunction(rgbObject);
    if (!css) {
        return translated;
    }
    return cssFunction(translated);
};

const defaultBlendSteps = 5;

const getBlendReturn = <T>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    css: boolean,
    translateFunction: (color: Color) => T,
    cssFunction: (color: T) => string
): (T | string)[] => {
    if (steps < 1) steps = defaultBlendSteps;
    const fromRGBObject = utils.getRGBObject(from);
    const toRGBObject = utils.getRGBObject(to);
    const blendArray = utils.blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject): T | string => {
        const translated = translateFunction(color);
        if (!css) {
            return translated;
        }
        return cssFunction(translated);
    });
};

export class ColorTranslator {

    // Constructor
    public constructor(color: ColorInput) {
        this.rgb = utils.getRGBObject(color);
        this.updateHSL();
        this.updateCMYK();
    }

    // Private properties
    private rgb: RGBObject;
    private hsl: HSLObject;
    private cmyk: CMYKObject;

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

    // Public HSL properties
    public get H(): number {
        return round(this.hsl.h);
    }

    public get S(): number {
        return round(this.hsl.s);
    }

    public get L(): number {
        return round(this.hsl.l);
    }

    // Public RGB properties
    public get R(): number {
        return round(this.rgb.r);
    }

    public get G(): number {
        return round(this.rgb.g);
    }

    public get B(): number {
        return round(this.rgb.b);
    }

    // Public alpha property
    public get A(): number {
        return round(this.hsl.a, MIN_DECIMALS);
    }

    // Public CMYK properties
    public get C(): number {
        return round(this.cmyk.c);
    }

    public get M(): number {
        return round(this.cmyk.m);
    }

    public get Y(): number {
        return round(this.cmyk.y);
    }

    public get K(): number {
        return round(this.cmyk.k);
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
            a: this.hsl.a
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
            a: this.hsl.a
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
            c: this.C,
            m: this.M,
            y: this.Y,
            k: this.K,
            a: this.hsl.a
        };
    }

    // CSS public properties
    public get HEX(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b };
        return CSS.HEX(rgb);
    }

    public get HEXA(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b, a: this.hsl.a * 255 };
        return CSS.HEX(rgb);
    }

    public get RGB(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b };
        return CSS.RGB(rgb);
    }

    public get RGBA(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b, a: this.hsl.a };
        return CSS.RGB(rgb);
    }

    public get HSL(): string {
        const { h, s, l } = this.hsl;
        const hsl = { h, s, l };
        return CSS.HSL(hsl);
    }

    public get HSLA(): string {
        return CSS.HSL(this.hsl);
    }

    public get CMYK(): string {
        return CSS.CMYK(this.cmyk);
    }

    public get CMYKA(): string {
        return CSS.CMYK({
            ...this.cmyk,
            a: this.hsl.a
        });
    }

    // Color Conversion Static Methods
    public static toHEX(color: ColorInput): string;
    public static toHEX(color: ColorInput, css: true): string;
    public static toHEX(color: ColorInput, css: false): HEXObject;
    public static toHEX(color: ColorInput, css = true): HEXOutput {
        const model = utils.getColorModel(color);
        return getReturn<HEXObject>(color, model, css, utils.translateColor.HEX, CSS.HEX);
    }

    public static toHEXA(color: ColorInput): string;
    public static toHEXA(color: ColorInput, css: true): string;
    public static toHEXA(color: ColorInput, css: false): HEXObject;
    public static toHEXA(color: ColorInput, css = true): HEXOutput {
        const model = utils.getColorModel(color);
        return getReturn<HEXObject>(color, model, css, utils.translateColor.HEXA, CSS.HEX);
    }

    public static toRGB(color: ColorInput): string;
    public static toRGB(color: ColorInput, css: true): string;
    public static toRGB(color: ColorInput, css: false): RGBObject;
    public static toRGB(color: ColorInput, css = true): RGBOutput {
        const model = utils.getColorModel(color);
        return getReturn<RGBObject>(color, model, css, utils.translateColor.RGB, CSS.RGB);
    }

    public static toRGBA(color: ColorInput): string;
    public static toRGBA(color: ColorInput, css: true): string;
    public static toRGBA(color: ColorInput, css: false): RGBObject;
    public static toRGBA(color: ColorInput, css = true): RGBOutput {
        const model = utils.getColorModel(color);
        return getReturn<RGBObject>(color, model, css, utils.translateColor.RGBA, CSS.RGB);
    }

    public static toHSL(color: ColorInput): string;
    public static toHSL(color: ColorInput, css: true): string;
    public static toHSL(color: ColorInput, css: false): HSLObject;
    public static toHSL(color: ColorInput, css = true): HSLOutput {
        const model = utils.getColorModel(color);
        return getReturn<HSLObject>(color, model, css, utils.translateColor.HSL, CSS.HSL);
    }

    public static toHSLA(color: ColorInput): string;
    public static toHSLA(color: ColorInput, css: true): string;
    public static toHSLA(color: ColorInput, css: false): HSLObject;
    public static toHSLA(color: ColorInput, css = true): HSLOutput {
        const model = utils.getColorModel(color);
        return getReturn<HSLObject>(color, model, css, utils.translateColor.HSLA, CSS.HSL);
    }

    public static toCMYK(color: ColorInput): string;
    public static toCMYK(color: ColorInput, css: true): string;
    public static toCMYK(color: ColorInput, css: false): CMYKObject;
    public static toCMYK(color: ColorInput, css = true): CMYKOutput {
        const model = utils.getColorModel(color);
        return getReturn<CMYKObject>(color, model, css, utils.translateColor.CMYK, CSS.CMYK);
    }

    public static toCMYKA(color: ColorInput): string;
    public static toCMYKA(color: ColorInput, css: true): string;
    public static toCMYKA(color: ColorInput, css: false): CMYKObject;
    public static toCMYKA(color: ColorInput, css = true): CMYKOutput {
        const model = utils.getColorModel(color);
        return getReturn<CMYKObject>(color, model, css, utils.translateColor.CMYKA, CSS.CMYK);
    }

    // Color Blending Static Methods
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number, css: false): HEXObject[];
    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): HEXOutput[] {
        return getBlendReturn<HEXObject>(from, to, steps, css, utils.translateColor.HEX, CSS.HEX);
    }

    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number, css: false): HEXObject[];
    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): HEXOutput[] {
        return getBlendReturn<HEXObject>(from, to, steps, css, utils.translateColor.HEXA, CSS.HEX);
    }

    public static getBlendRGB(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number, css: false): RGBObject[];
    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): RGBOutput[] {
        return getBlendReturn<RGBObject>(from, to, steps, css, utils.translateColor.RGB, CSS.RGB);
    }

    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number): string[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number, css: false): RGBObject[];
    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): RGBOutput[] {
        return getBlendReturn<RGBObject>(from, to, steps, css, utils.translateColor.RGBA, CSS.RGB);
    }

    public static getBlendHSL(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number, css: false): HSLObject[];
    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): HSLOutput[] {
        return getBlendReturn<HSLObject>(from, to, steps, css, utils.translateColor.HSL, CSS.HSL);
    }

    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps?: number): string[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number, css: true): string[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number, css: false): HSLObject[];
    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css = true): HSLOutput[] {
        return getBlendReturn<HSLObject>(from, to, steps, css, utils.translateColor.HSLA, CSS.HSL);
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
    public static getMixRGB(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixRGB(colors: ColorInput[], mode: Mix, css: false): RGBObject;
    public static getMixRGB(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): RGBOutput {
        return utils.colorMixer.RGB(colors, mode, css);
    }

    public static getMixRGBA(colors: ColorInput[]): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixRGBA(colors: ColorInput[], mode: Mix, css: false): RGBObject;
    public static getMixRGBA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): RGBOutput {
        return utils.colorMixer.RGBA(colors, mode, css);
    }

    public static getMixHSL(colors: ColorInput[]): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixHSL(colors: ColorInput[], mode: Mix, css: false): HSLObject;
    public static getMixHSL(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): HSLOutput {
        return utils.colorMixer.HSL(colors, mode, css);
    }

    public static getMixHSLA(colors: ColorInput[]): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix, css: true): string;
    public static getMixHSLA(colors: ColorInput[], mode: Mix, css: false): HSLObject;
    public static getMixHSLA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE, css = true): HSLOutput {
        return utils.colorMixer.HSLA(colors, mode, css);
    }

    // Get shades static method
    public static getShades(color: string, shades: number): string[];
    public static getShades(color: HEXObject, shades: number): HEXObject[];
    public static getShades(color: RGBObject, shades: number): RGBObject[];
    public static getShades(color: HSLObjectGeneric, shades: number): HSLObject[];
    public static getShades(color: ColorInputWithoutCMYK, shades: number): ColorOutput[] {
        return utils.getColorMixture(color, shades, true);
    }

    // Get tints static method
    public static getTints(color: string, tints: number): string[];
    public static getTints(color: HEXObject, tints: number): HEXObject[];
    public static getTints(color: RGBObject, tints: number): RGBObject[];
    public static getTints(color: HSLObjectGeneric, tints: number): HSLObject[];
    public static getTints(color: ColorInputWithoutCMYK, tints: number): ColorOutput[] {
        return utils.getColorMixture(color, tints, false);
    }

    // Color Harmony Static Method
    public static getHarmony(color: string, armony?: Harmony, mode?: Mix): string[];
    public static getHarmony(color: HEXObject, armony?: Harmony, mode?: Mix): HEXObject[];
    public static getHarmony(color: RGBObject, armony?: Harmony, mode?: Mix): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, armony?: Harmony, mode?: Mix): HSLObject[];
    public static getHarmony(
        color: ColorInputWithoutCMYK,
        armony: Harmony = Harmony.COMPLEMENTARY,
        mode: Mix = Mix.ADDITIVE
    ): ColorOutput[] {
        switch(armony) {
            case Harmony.ANALOGOUS:
                return utils.colorHarmony.buildHarmony(color, utils.analogous, mode);
            case Harmony.SPLIT_COMPLEMENTARY:
                return utils.colorHarmony.buildHarmony(color, utils.splitComplementary, mode);
            case Harmony.TRIADIC:
                return utils.colorHarmony.buildHarmony(color, utils.triadic, mode);
            case Harmony.TETRADIC:
                return utils.colorHarmony.buildHarmony(color, utils.tetradic, mode);
            case Harmony.SQUARE:
                return utils.colorHarmony.buildHarmony(color, utils.square, mode);
            default:
                return utils.colorHarmony.buildHarmony(color, utils.complementary, mode);

        }
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