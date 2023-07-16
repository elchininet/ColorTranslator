import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    HSLObjectGeneric,
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject,
    ColorOutput,
    Options,
    InputOptions
} from '@types';
import {
    ColorModel,
    Harmony,
    Mix,
    DEFAULT_BLEND_STEPS
} from '#constants';
import {
    rgbToHSL,
    hslToRGB,
    rgbToCMYK,
    cmykToRGB
} from '#color/translators';
import * as utils from '#color/utils';
import { CSS } from '#color/css';
import {
    round,
    minmax,
    getOptionsFromColorInput,
    normalizeHue
} from '#helpers';

const getColorReturn = <T>(
    color: ColorInput,
    model: ColorModel,
    options: InputOptions,
    translateFunction: (color: Color, options: Options) => T
): T => {
    const optionsFromInput = getOptionsFromColorInput(options, color);
    const rgbObject = utils.getRGBObject(color, model);
    return translateFunction(rgbObject, optionsFromInput);
};

const getBlendReturn = <T>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    options: InputOptions,
    translateFunction: (color: Color, options: Options) => T
): T[] => {
    const optionsFromInput = getOptionsFromColorInput(options, from, to);
    if (steps < 1) steps = DEFAULT_BLEND_STEPS;
    const fromRGBObject = utils.getRGBObject(from);
    const toRGBObject = utils.getRGBObject(to);
    const blendArray = utils.blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject): T => {
        return translateFunction(color, optionsFromInput);
    });
};

const getHarmonyReturn = (
    harmony: Harmony,
    color: ColorInputWithoutCMYK,
    mode: Mix,
    options: Options,
): ColorOutput[] => {
    return ({
        [Harmony.ANALOGOUS]:           utils.colorHarmony.buildHarmony(color, utils.analogous, mode, options),
        [Harmony.COMPLEMENTARY]:       utils.colorHarmony.buildHarmony(color, utils.complementary, mode, options),
        [Harmony.SPLIT_COMPLEMENTARY]: utils.colorHarmony.buildHarmony(color, utils.splitComplementary, mode, options),
        [Harmony.TRIADIC]:             utils.colorHarmony.buildHarmony(color, utils.triadic, mode, options),
        [Harmony.TETRADIC]:            utils.colorHarmony.buildHarmony(color, utils.tetradic, mode, options),
        [Harmony.SQUARE]:              utils.colorHarmony.buildHarmony(color, utils.square, mode, options)
    })[harmony];
};

export class ColorTranslator {

    // Constructor
    public constructor(color: ColorInput, options: InputOptions = {}) {
        this._options = getOptionsFromColorInput(options, color);
        this.rgb = utils.getRGBObject(color);
        this.updateHSL();
        this.updateCMYK();
    }

    // Private properties
    private _options: Options;
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

    // Public options method
    public setOptions(options: InputOptions = {}): ColorTranslator {
        this._options = {
            ...this._options,
            ...options
        } as Options;
        return this;
    }

    // Public HSL methods
    public setH(h: number): ColorTranslator {
        this.hsl.h = normalizeHue(h);
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

    // Public options property
    public get options(): Options {
        return this._options;
    }

    // Public HSL properties
    public get H(): number {
        return round(this.hsl.h, this.options.decimals);
    }

    public get S(): number {
        return round(this.hsl.s, this.options.decimals);
    }

    public get L(): number {
        return round(this.hsl.l, this.options.decimals);
    }

    // Public RGB properties
    public get R(): number {
        return round(this.rgb.r, this.options.decimals);
    }

    public get G(): number {
        return round(this.rgb.g, this.options.decimals);
    }

    public get B(): number {
        return round(this.rgb.b, this.options.decimals);
    }

    // Public alpha property
    public get A(): number {
        return round(this.hsl.a, this.options.decimals);
    }

    // Public CMYK properties
    public get C(): number {
        return round(this.cmyk.c, this.options.decimals);
    }

    public get M(): number {
        return round(this.cmyk.m, this.options.decimals);
    }

    public get Y(): number {
        return round(this.cmyk.y, this.options.decimals);
    }

    public get K(): number {
        return round(this.cmyk.k, this.options.decimals);
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
        return CSS.HEX({
            r: this.R,
            g: this.G,
            b: this.B
        });
    }

    public get HEXA(): string {
        return CSS.HEX({
            r: this.R,
            g: this.G,
            b: this.B,
            a: this.A * 255
        });
    }

    public get RGB(): string {
        return CSS.RGB(
            {
                r: this.R,
                g: this.G,
                b: this.B
            },
            this.options
        );
    }

    public get RGBA(): string {
        return CSS.RGB(
            {
                r: this.R,
                g: this.G,
                b: this.B,
                a: this.A
            },
            this.options
        );
    }

    public get HSL(): string {
        return CSS.HSL(
            utils.roundHSLObject(
                {
                    h: this.H,
                    s: this.S,
                    l: this.L
                },
                this.options
            ),
            this.options
        );
    }

    public get HSLA(): string {
        return CSS.HSL(
            utils.roundHSLObject(
                {
                    h: this.H,
                    s: this.S,
                    l: this.L,
                    a: this.A
                },
                this.options
            ),
            this.options
        );
    }

    public get CMYK(): string {
        return CSS.CMYK(
            {
                c: this.C,
                m: this.M,
                y: this.Y,
                k: this.K
            },
            this.options
        );
    }

    public get CMYKA(): string {
        return CSS.CMYK(
            {
                c: this.C,
                m: this.M,
                y: this.Y,
                k: this.K,
                a: this.A
            },
            this.options
        );
    }

    // Color Conversion Static Methods
    public static toHEXObject(color: ColorInput): HEXObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HEXObject>(
            color,
            model,
            { decimals: 0 },
            utils.translateColor.HEX
        );
    }

    public static toHEX(color: ColorInput): string {
        return CSS.HEX(
            ColorTranslator.toHEXObject(color)
        );
    }

    public static toHEXAObject(color: ColorInput): HEXObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HEXObject>(
            color,
            model,
            { decimals: 0 },
            utils.translateColor.HEXA
        );
    }

    public static toHEXA(color: ColorInput): string {
        return CSS.HEX(
            ColorTranslator.toHEXAObject(color)
        );
    }

    public static toRGBObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        const model = utils.getColorModel(color);
        return getColorReturn<RGBObject>(
            color,
            model,
            options,
            utils.translateColor.RGB
        );
    }

    public static toRGB(color: ColorInput, options: InputOptions = {}): string {
        return CSS.RGB(
            ColorTranslator.toRGBObject(color, options),
            getOptionsFromColorInput(options, color)
        );
    }

    public static toRGBAObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        const model = utils.getColorModel(color);
        return getColorReturn<RGBObject>(
            color,
            model,
            options,
            utils.translateColor.RGBA
        );
    }

    public static toRGBA(color: ColorInput, options: InputOptions = {}): string {
        return CSS.RGB(
            ColorTranslator.toRGBAObject(color, options),
            getOptionsFromColorInput(options, color)
        );
    }

    public static toHSLObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options,
            utils.translateColor.HSL
        );
    }

    public static toHSL(color: ColorInput, options: InputOptions = {}): string {
        const hsl = ColorTranslator.toHSLObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HSL(
            utils.roundHSLObject(hsl, detectedOptions),
            detectedOptions
        );
    }

    public static toHSLAObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options,
            utils.translateColor.HSLA
        );
    }

    public static toHSLA(color: ColorInput, options: InputOptions = {}): string {
        const hsla = ColorTranslator.toHSLAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HSL(
            utils.roundHSLObject(hsla, detectedOptions),
            detectedOptions
        );
    }

    public static toCMYKObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options,
            utils.translateColor.CMYK
        );
    }

    public static toCMYK(color: ColorInput, options: InputOptions = {}): string {
        return CSS.CMYK(
            ColorTranslator.toCMYKObject(color, options),
            getOptionsFromColorInput(options, color)
        );
    }

    public static toCMYKAObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options,
            utils.translateColor.CMYKA
        );
    }

    public static toCMYKA(color: ColorInput, options: InputOptions = {}): string {
        return CSS.CMYK(
            ColorTranslator.toCMYKAObject(color, options),
            getOptionsFromColorInput(options, color)
        );
    }

    // Color Blending Static Methods
    public static getBlendHEXObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS
    ): HEXObject[] {
        return getBlendReturn<HEXObject>(
            from,
            to,
            steps,
            { decimals: 0 },
            utils.translateColor.HEX
        );
    }

    public static getBlendHEX(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
    ): string[] {
        return ColorTranslator.getBlendHEXObject(from, to, steps)
            .map((color: HEXObject): string => CSS.HEX(color));
    }

    public static getBlendHEXAObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS
    ): HEXObject[] {
        return getBlendReturn<HEXObject>(
            from,
            to,
            steps,
            { decimals: 0 },
            utils.translateColor.HEXA
        );
    }

    public static getBlendHEXA(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS
    ): string[] {
        return ColorTranslator.getBlendHEXAObject(from, to, steps)
            .map((color: HEXObject): string => CSS.HEX(color));
    }

    public static getBlendRGBObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): RGBObject[] {
        return getBlendReturn<RGBObject>(
            from,
            to,
            steps,
            options,
            utils.translateColor.RGB
        );
    }

    public static getBlendRGB(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        return ColorTranslator.getBlendRGBObject(from, to, steps, options)
            .map((color: RGBObject): string => {
                return CSS.RGB(
                    color,
                    getOptionsFromColorInput(options, from, to)
                );
            });
    }

    public static getBlendRGBAObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): RGBObject[] {
        return getBlendReturn<RGBObject>(
            from,
            to,
            steps,
            options,
            utils.translateColor.RGBA
        );
    }

    public static getBlendRGBA(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        return ColorTranslator.getBlendRGBAObject(from, to, steps, options)
            .map((color: RGBObject): string => {
                return CSS.RGB(
                    color,
                    getOptionsFromColorInput(options, from, to)
                );
            });
    }

    public static getBlendHSLObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): HSLObject[] {
        return getBlendReturn<HSLObject>(
            from,
            to,
            steps,
            options,
            utils.translateColor.HSL
        );
    }

    public static getBlendHSL(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        const detectedOptions = getOptionsFromColorInput(options, from, to);
        return ColorTranslator.getBlendHSLObject(from, to, steps, options)
            .map((color: HSLObject) => {
                return CSS.HSL(
                    utils.roundHSLObject(color, detectedOptions),
                    detectedOptions
                );
            });
    }

    public static getBlendHSLAObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): HSLObject[] {
        return getBlendReturn<HSLObject>(
            from,
            to,
            steps,
            options,
            utils.translateColor.HSLA
        );
    }

    public static getBlendHSLA(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        const detectedOptions = getOptionsFromColorInput(options, from, to);
        return ColorTranslator.getBlendHSLAObject(from, to, steps, options)
            .map((color: HSLObject): string => {
                return CSS.HSL(
                    utils.roundHSLObject(color, detectedOptions),
                    detectedOptions
                );
            });
    }

    // Color Mix Static Methods
    public static getMixHEXObject(colors: ColorInput[], mode: Mix = Mix.ADDITIVE): HEXObject {
        return utils.colorMixer.HEX(colors, mode, false);
    }

    public static getMixHEX(colors: ColorInput[], mode: Mix = Mix.ADDITIVE): string {
        return utils.colorMixer.HEX(colors, mode, true);
    }

    public static getMixHEXAObject(colors: ColorInput[], mode: Mix = Mix.ADDITIVE): HEXObject {
        return utils.colorMixer.HEXA(colors, mode, false);
    }

    public static getMixHEXA(colors: ColorInput[], mode: Mix = Mix.ADDITIVE): string {
        return utils.colorMixer.HEXA(colors, mode, true);
    }

    public static getMixRGBObject(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): RGBObject {
        return utils.colorMixer.RGB(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixRGB(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.RGB(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixRGBAObject(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): RGBObject {
        return utils.colorMixer.RGBA(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixRGBA(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.RGBA(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixHSLObject(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): HSLObject {
        return utils.colorMixer.HSL(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixHSL(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.HSL(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixHSLAObject(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): HSLObject {
        return utils.colorMixer.HSLA(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixHSLA(
        colors: ColorInput[],
        mode: Mix = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.HSLA(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    // Get shades static method
    public static getShades(color: string, shades: number, options?: InputOptions): string[];
    public static getShades(color: HEXObject, shades: number, options?: InputOptions): HEXObject[];
    public static getShades(color: RGBObject, shades: number, options?: InputOptions): RGBObject[];
    public static getShades(color: HSLObjectGeneric, shades: number, options?: InputOptions): HSLObject[];
    public static getShades(color: ColorInputWithoutCMYK, shades: number, options = {}): ColorOutput[] {
        return utils.getColorMixture(
            color,
            shades,
            true,
            getOptionsFromColorInput(options, color)
        );
    }

    // Get tints static method
    public static getTints(color: string, tints: number, options?: InputOptions): string[];
    public static getTints(color: HEXObject, tints: number, options?: InputOptions): HEXObject[];
    public static getTints(color: RGBObject, tints: number, options?: InputOptions): RGBObject[];
    public static getTints(color: HSLObjectGeneric, tints: number, options?: InputOptions): HSLObject[];
    public static getTints(color: ColorInputWithoutCMYK, tints: number, options = {}): ColorOutput[] {
        return utils.getColorMixture(
            color,
            tints,
            false,
            getOptionsFromColorInput(options, color)
        );
    }

    // Color Harmony Static Method
    public static getHarmony(color: string, harmony?: Harmony, mode?: Mix, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, mode?: Mix, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, mode?: Mix, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, mode?: Mix, options?: InputOptions): HSLObject[];
    public static getHarmony(color: ColorInputWithoutCMYK, harmony: Harmony = Harmony.COMPLEMENTARY, mode: Mix = Mix.ADDITIVE, options = {}): ColorOutput[] {
        return getHarmonyReturn(
            harmony,
            color,
            mode,
            getOptionsFromColorInput(options, color)
        );
    }
}

export {
    InputOptions,
    Harmony,
    Mix,
    HEXObject,
    RGBObject,
    HSLObject,
    CMYKObject
};