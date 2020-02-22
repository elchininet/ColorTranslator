import { Color, ColorInput, RGBObject, HSLObject, CMYKObject, RGBObjectFinal, HSLObjectFinal, CMYKObjectFinal, RGBOutput, HSLOutput, CMYKOutput, Omit } from '@types';
import { ColorModel } from '#constants';
import { rgbToHSL, hslToRGB, rgbToCMYK, cmykToRGB } from '#color/translators';
import { getColorModel, getRGBObjectFromString, getRGBObjectFromObject, translateColor, blend } from '#color/utils';
import { CSS } from '#color/css';
import { hasProp, round, minmax } from '#helpers';

type NotHEX = Omit<ColorModel, ColorModel.HEX>;

const check = (color: ColorInput, css: boolean): boolean => (typeof color === 'string' && css || typeof color === 'object' && !css);

const getRGBObject = (color: ColorInput, model: ColorModel = getColorModel(color)): RGBObjectFinal => {
    return typeof color === 'string'
        ? getRGBObjectFromString[model](color)
        : getRGBObjectFromObject[model as NotHEX](color as RGBObject & HSLObject & CMYKObject);
};

const getReturn = <A>(
    color: ColorInput,
    model: ColorModel,
    css: boolean,
    translateFunction: (color: Color) => A,
    cssFunction: (color: A) => string
): A | string => {
    const rgbObject = getRGBObject(color, model);
    const translated = translateFunction(rgbObject);
    if (!css) {
        return translated;
    }
    return cssFunction(translated);
};

const defaultBlendSteps = 5;

const getBlenReturn = <A>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    css: boolean,
    translateFunction: (color: Color) => A,
    cssFunction: (color: A) => string
): (A | string)[] => {
    if (steps < 1) steps = defaultBlendSteps;
    const fromModel = getColorModel(from);
    const toModel = getColorModel(to);
    const fromRGBObject = getRGBObject(from, fromModel);
    const toRGBObject = getRGBObject(to, toModel);
    const blendArray = blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObjectFinal): A | string => {
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
        this.rgb = getRGBObject(color);
        this.updateHSL();
        this.updateCMYK();
    }

    // Private properties
    private rgb: RGBObjectFinal;
    private hsl: HSLObjectFinal;
    private cmyk: CMYKObjectFinal;
    private pi2: number = 360;

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
        if (h > 360) {
            h -= Math.floor(h / this.pi2) * this.pi2;
        } else if (h < 0) {
            h = Math.ceil(h / this.pi2) * this.pi2 - h;
        }
        this.hsl.h = h;
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
        return round(this.hsl.a, 2);
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
    public get HEXObject(): RGBObject {
        return translateColor.HEX(this.rgb);
    }

    public get HEXAObject(): RGBObject {
        return translateColor.HEXA(this.rgb);
    }

    public get RGBObject(): RGBObject {
        const rgb = { ...this.rgb };
        return translateColor.RGB(rgb);
    }

    public get RGBAObject(): RGBObject {
        const rgb = { ...this.rgb };
        return translateColor.RGBA(rgb);
    }

    public get HSLObject(): HSLObject {
        return {
            h: round(this.hsl.h),
            s: round(this.hsl.s),
            l: round(this.hsl.l)
        };
    }

    public get HSLAObject(): HSLObject {
        return {
            h: round(this.hsl.h),
            s: round(this.hsl.s),
            l: round(this.hsl.l),
            a: hasProp<HSLObject>(this.hsl, 'a')
                ? round(this.hsl.a, 2)
                : 1
        };
    }

    public get CMYKObject(): CMYKObject {
        return {
            c: round(this.cmyk.c),
            m: round(this.cmyk.m),
            y: round(this.cmyk.y),
            k: round(this.cmyk.k)
        };
    }

    // CSS public properties
    public get HEX(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b };
        return CSS.HEX(rgb);
    }

    public get HEXA(): string {
        const { r, g, b, a = 1 } = this.rgb;
        const rgb = { r, g, b, a: a * 255 };
        return CSS.HEX(rgb);
    }

    public get RGB(): string {
        const { r, g, b } = this.rgb;
        const rgb = { r, g, b };
        return CSS.RGB(rgb);
    }

    public get RGBA(): string {
        const { r, g, b, a = 1 } = this.rgb;
        const rgb = { r, g, b, a };
        return CSS.RGB(rgb);
    }

    public get HSL(): string {
        const { h, s, l } = this.hsl;
        const hsl = { h, s, l };
        return CSS.HSL(hsl);
    }

    public get HSLA(): string {
        const { h, s, l, a = 1 } = this.hsl;
        const hsl = { h, s, l, a };
        return CSS.HSL(hsl);
    }

    public get CMYK(): string {
        return CSS.CMYK(this.cmyk);
    }

    // Static methods
    public static toHEX(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.HEX, CSS.HEX);
    }

    public static toHEXA(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.HEXA, CSS.HEX);
    }

    public static toRGB(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.RGB, CSS.RGB);
    }

    public static toRGBA(color: ColorInput, css: boolean = true): RGBOutput {
        const model = getColorModel(color);
        return getReturn<RGBObject>(color, model, css, translateColor.RGBA, CSS.RGB);
    }

    public static toHSL(color: ColorInput, css: boolean = true): HSLOutput {
        const model = getColorModel(color);
        if (model === ColorModel.HSL && check(color, css)) {
            return color as HSLOutput;
        }
        return getReturn<HSLObject>(color, model, css, translateColor.HSL, CSS.HSL);
    }

    public static toHSLA(color: ColorInput, css: boolean = true): HSLOutput {
        const model = getColorModel(color);
        if (model === ColorModel.HSLA && check(color, css)) {
            return color as HSLOutput;
        }
        return getReturn<HSLObject>(color, model, css, translateColor.HSLA, CSS.HSL);
    }

    public static toCMYK(color: ColorInput, css: boolean = true): CMYKOutput {
        const model = getColorModel(color);
        if (model === ColorModel.CMYK && check(color, css)) {
            return color as CMYKOutput;
        }
        return getReturn<CMYKObject>(color, model, css, translateColor.CMYK, CSS.CMYK);
    }

    public static getBlendHEX(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): RGBOutput[] {
        return getBlenReturn<RGBObject>(from, to, steps, css, translateColor.HEX, CSS.HEX);
    }

    public static getBlendHEXA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): RGBOutput[] {
        return getBlenReturn<RGBObject>(from, to, steps, css, translateColor.HEXA, CSS.HEX);
    }

    public static getBlendRGB(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): RGBOutput[] {
        return getBlenReturn<RGBObject>(from, to, steps, css, translateColor.RGB, CSS.RGB);
    }

    public static getBlendRGBA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): RGBOutput[] {
        return getBlenReturn<RGBObject>(from, to, steps, css, translateColor.RGBA, CSS.RGB);
    }

    public static getBlendHSL(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): HSLOutput[] {
        return getBlenReturn<HSLObject>(from, to, steps, css, translateColor.HSL, CSS.HSL);
    }

    public static getBlendHSLA(from: ColorInput, to: ColorInput, steps: number = defaultBlendSteps, css: boolean = true): HSLOutput[] {
        return getBlenReturn<HSLObject>(from, to, steps, css, translateColor.HSLA, CSS.HSL);
    }

}