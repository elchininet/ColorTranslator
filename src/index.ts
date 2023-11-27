import {
    Color,
    ColorInput,
    ColorInputWithoutCMYK,
    HSLObjectGeneric,
    HEXObject,
    RGBObject,
    HSLObject,
    CIELabObject,
    CIELabObjectGeneric,
    CMYKObject,
    ColorOutput,
    Options,
    InputOptions
} from '@types';
import {
    ColorModel,
    Harmony,
    HarmonyString,
    Mix,
    MixString,
    DEFAULT_BLEND_STEPS,
    MAX_DECIMALS
} from '#constants';
import {
    rgbToHSL,
    hslToRGB,
    rgbToLab,
    labToRgb,
    rgbToCMYK,
    cmykToRGB
} from '#color/translators';
import * as utils from '#color/utils';
import { CSS } from '#color/css';
import {
    round,
    minmax,
    getOptionsFromColorInput,
    normalizeHue,
    isHarmony,
    isMix
} from '#helpers';

const getColorReturn = <T>(
    color: ColorInput,
    model: ColorModel,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => T
): T => {
    const rgbObject = utils.getRGBObject(color, model);
    return translateFunction(rgbObject, decimals);
};

const getBlendReturn = <T>(
    from: ColorInput,
    to: ColorInput,
    steps: number,
    decimals: number,
    translateFunction: (color: Color, decimals: number) => T
): T[] => {
    if (steps < 1) steps = DEFAULT_BLEND_STEPS;
    const fromRGBObject = utils.getRGBObject(from);
    const toRGBObject = utils.getRGBObject(to);
    const blendArray = utils.blend(fromRGBObject, toRGBObject, steps);
    return blendArray.map((color: RGBObject): T => {
        return translateFunction(color, decimals);
    });
};

const getHarmonyReturn = (
    harmony: HarmonyString,
    color: ColorInputWithoutCMYK,
    mode: MixString,
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
        this.updateLab();
        this.updateCMYK();
    }

    // Private properties
    private _options: Options;
    private rgb: RGBObject;
    private hsl: HSLObject;
    private lab: CIELabObject;
    private cmyk: CMYKObject;

    // Private methods
    private updateRGB(): void {
        this.rgb = {
            ...hslToRGB(
                this.hsl.H,
                this.hsl.S,
                this.hsl.L
            ),
            A: this.hsl.A
        };
    }

    private updateRGBFromCMYK(): void {
        this.rgb = {
            ...cmykToRGB(
                this.cmyk.C,
                this.cmyk.M,
                this.cmyk.Y,
                this.cmyk.K
            ),
            A: this.rgb.A
        };
    }

    private updateRGBFromLab(): void {
        this.rgb = {
            ...labToRgb(
                this.lab.L,
                this.lab.a,
                this.lab.b
            ),
            A: this.rgb.A
        };
    }

    private updateHSL(): void {
        this.hsl = rgbToHSL(
            this.rgb.R,
            this.rgb.G,
            this.rgb.B,
            this.rgb.A
        );
    }

    private updateLab(): void {
        this.lab = {
            ...rgbToLab(
                this.rgb.R,
                this.rgb.G,
                this.rgb.B
            ),
            A: this.rgb.A
        };
    }

    private updateCMYK(): void {
        this.cmyk = rgbToCMYK(
            this.rgb.R,
            this.rgb.G,
            this.rgb.B
        );
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
    public setH(H: number): ColorTranslator {
        this.hsl.H = normalizeHue(H);
        this.updateRGB();
        this.updateLab();
        this.updateCMYK();
        return this;
    }

    public setS(S: number): ColorTranslator {
        this.hsl.S = minmax(S, 0, 100);
        this.updateRGB();
        this.updateLab();
        this.updateCMYK();
        return this;
    }

    public setL(L: number): ColorTranslator {
        this.hsl.L = minmax(L, 0, 100);
        this.updateRGB();
        this.updateLab();
        this.updateCMYK();
        return this;
    }

    // Public RGB methods
    public setR(R: number): ColorTranslator {
        this.rgb.R = minmax(R, 0, 255);
        this.updateHSL();
        this.updateLab();
        this.updateCMYK();
        return;
    }

    public setG(G: number): ColorTranslator {
        this.rgb.G = minmax(G, 0, 255);
        this.updateHSL();
        this.updateLab();
        this.updateCMYK();
        return this;
    }

    public setB(B: number): ColorTranslator {
        this.rgb.B = minmax(B, 0, 255);
        this.updateHSL();
        this.updateLab();
        this.updateCMYK();
        return this;
    }

    // Public Lab methods
    public setCIEL(L: number): ColorTranslator {
        this.lab.L = minmax(L, 0, 100);
        this.updateRGBFromLab();
        this.updateHSL();
        this.updateCMYK();
        return this;
    }

    public setCIEa(a: number): ColorTranslator {
        this.lab.a = minmax(a, -125, 125);
        this.updateRGBFromLab();
        this.updateHSL();
        this.updateCMYK();
        return this;
    }

    public setCIEb(b: number): ColorTranslator {
        this.lab.b = minmax(b, -125, 125);
        this.updateRGBFromLab();
        this.updateHSL();
        this.updateCMYK();
        return this;
    }

    // Public alpha method
    public setA(A: number): ColorTranslator {
        this.hsl.A = this.rgb.A = minmax(A, 0, 1);
        return this;
    }

    // Public CMYK methods
    public setC(C: number): ColorTranslator {
        this.cmyk.C = minmax(C, 0, 100);
        this.updateRGBFromCMYK();
        this.updateHSL();
        this.updateLab();
        return this;
    }

    public setM(M: number): ColorTranslator {
        this.cmyk.M = minmax(M, 0, 100);
        this.updateRGBFromCMYK();
        this.updateHSL();
        this.updateLab();
        return this;
    }

    public setY(Y: number): ColorTranslator {
        this.cmyk.Y = minmax(Y, 0, 100);
        this.updateRGBFromCMYK();
        this.updateHSL();
        this.updateLab();
        return this;
    }

    public setK(K: number): ColorTranslator {
        this.cmyk.K = minmax(K, 0, 100);
        this.updateRGBFromCMYK();
        this.updateHSL();
        this.updateLab();
        return this;
    }

    // Public options property
    public get options(): Options {
        return this._options;
    }

    // Public HSL properties
    public get H(): number {
        return round(this.hsl.H, this.options.decimals);
    }

    public get S(): number {
        return round(this.hsl.S, this.options.decimals);
    }

    public get L(): number {
        return round(this.hsl.L, this.options.decimals);
    }

    // Public Lab properties
    public get CIEL(): number {
        return round(this.lab.L, this.options.decimals);
    }

    public get CIEa(): number {
        return round(this.lab.a, this.options.decimals);
    }

    public get CIEb(): number {
        return round(this.lab.b, this.options.decimals);
    }

    // Public RGB properties
    public get R(): number {
        return round(this.rgb.R, this.options.decimals);
    }

    public get G(): number {
        return round(this.rgb.G, this.options.decimals);
    }

    public get B(): number {
        return round(this.rgb.B, this.options.decimals);
    }

    // Public alpha property
    public get A(): number {
        return round(this.hsl.A, this.options.decimals);
    }

    // Public CMYK properties
    public get C(): number {
        return round(this.cmyk.C, this.options.decimals);
    }

    public get M(): number {
        return round(this.cmyk.M, this.options.decimals);
    }

    public get Y(): number {
        return round(this.cmyk.Y, this.options.decimals);
    }

    public get K(): number {
        return round(this.cmyk.K, this.options.decimals);
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
            R: this.R,
            G: this.G,
            B: this.B
        };
    }

    public get RGBAObject(): RGBObject {
        return {
            ...this.RGBObject,
            A: this.A
        };
    }

    public get HSLObject(): HSLObject {
        return {
            H: this.H,
            S: this.S,
            L: this.L
        };
    }

    public get HSLAObject(): HSLObject {
        return {
            ...this.HSLObject,
            A: this.A
        };
    }

    public get CIELabObject(): CIELabObject {
        return {
            L: this.CIEL,
            a: this.CIEa,
            b: this.CIEb
        };
    }

    public get CIELabAObject(): CIELabObject {
        return {
            ...this.CIELabObject,
            A: this.A
        };
    }

    public get CMYKObject(): CMYKObject {
        return {
            C: this.C,
            M: this.M,
            Y: this.Y,
            K: this.K
        };
    }

    public get CMYKAObject(): CMYKObject {
        return {
            ...this.CMYKObject,
            A: this.A
        };
    }

    // CSS public properties
    public get HEX(): string {
        return CSS.HEX({
            R: this.R,
            G: this.G,
            B: this.B
        });
    }

    public get HEXA(): string {
        return CSS.HEX({
            R: this.R,
            G: this.G,
            B: this.B,
            A: this.A * 255
        });
    }

    public get RGB(): string {
        return CSS.RGB(
            {
                R: this.R,
                G: this.G,
                B: this.B
            },
            this.options
        );
    }

    public get RGBA(): string {
        return CSS.RGB(
            {
                R: this.R,
                G: this.G,
                B: this.B,
                A: this.A
            },
            this.options
        );
    }

    public get HSL(): string {
        return CSS.HSL(
            {
                H: this.H,
                S: this.S,
                L: this.L
            },
            this.options
        );
    }

    public get HSLA(): string {
        return CSS.HSL(
            {
                H: this.H,
                S: this.S,
                L: this.L,
                A: this.A
            },
            this.options
        );
    }

    public get CIELab(): string {
        return CSS.CIELab(
            {
                L: this.CIEL,
                a: this.CIEa,
                b: this.CIEb
            },
            this.options
        );
    }

    public get CIELabA(): string {
        return CSS.CIELab(
            {
                L: this.CIEL,
                a: this.CIEa,
                b: this.CIEb,
                A: this.A
            },
            this.options
        );
    }

    public get CMYK(): string {
        return CSS.CMYK(
            {
                C: this.C,
                M: this.M,
                Y: this.Y,
                K: this.K
            },
            this.options
        );
    }

    public get CMYKA(): string {
        return CSS.CMYK(
            {
                C: this.C,
                M: this.M,
                Y: this.Y,
                K: this.K,
                A: this.A
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
            0,
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
            0,
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
            options.decimals,
            utils.translateColor.RGB
        );
    }

    public static toRGB(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const rgb = getColorReturn<RGBObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.RGB
        );
        return CSS.RGB(rgb, detectedOptions);
    }

    public static toRGBAObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        const model = utils.getColorModel(color);
        return getColorReturn<RGBObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.RGBA
        );
    }

    public static toRGBA(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const rgba = getColorReturn<RGBObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.RGBA
        );
        return CSS.RGB(rgba, detectedOptions);
    }

    public static toHSLObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HSL
        );
    }

    public static toHSL(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const hsl = getColorReturn<HSLObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.HSL
        );
        return CSS.HSL(hsl, detectedOptions);
    }

    public static toHSLAObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = utils.getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HSLA
        );
    }

    public static toHSLA(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const hsla = getColorReturn<HSLObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.HSLA
        );
        return CSS.HSL(hsla, detectedOptions);
    }

    public static toCIELabObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CIELabObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CIELab
        );
    }

    public static toCIELab(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const lab = getColorReturn<CIELabObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.CIELab
        );
        return CSS.CIELab(lab, detectedOptions);
    }

    public static toCIELabAObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CIELabObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CIELabA
        );
    }

    public static toCIELabA(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const lab = getColorReturn<CIELabObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.CIELabA
        );
        return CSS.CIELab(lab, detectedOptions);
    }

    public static toCMYKObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CMYK
        );
    }

    public static toCMYK(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const cmyk = getColorReturn<CMYKObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.CMYK
        );
        return CSS.CMYK(cmyk, detectedOptions);
    }

    public static toCMYKAObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = utils.getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CMYKA
        );
    }

    public static toCMYKA(color: ColorInput, options: InputOptions = {}): string {
        const model = utils.getColorModel(color);
        const detectedOptions = getOptionsFromColorInput(options, color);
        const cmyka = getColorReturn<CMYKObject>(
            color,
            model,
            MAX_DECIMALS,
            utils.translateColor.CMYKA
        );
        return CSS.CMYK(cmyka, detectedOptions);
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
            0,
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
            0,
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
            options.decimals,
            utils.translateColor.RGB
        );
    }

    public static getBlendRGB(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        return getBlendReturn<RGBObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.RGB
        )
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
            options.decimals,
            utils.translateColor.RGBA
        );
    }

    public static getBlendRGBA(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        return getBlendReturn<RGBObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.RGBA
        )
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
            options.decimals,
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
        return getBlendReturn<HSLObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.HSL
        )
            .map((color: HSLObject) => {
                return CSS.HSL(color, detectedOptions);
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
            options.decimals,
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
        return getBlendReturn<HSLObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.HSLA
        )
            .map((color: HSLObject): string => {
                return CSS.HSL(color, detectedOptions);
            });
    }

    public static getBlendCIELabObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): CIELabObject[] {
        return getBlendReturn<CIELabObject>(
            from,
            to,
            steps,
            options.decimals,
            utils.translateColor.CIELab
        );
    }

    public static getBlendCIELab(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        const detectedOptions = getOptionsFromColorInput(options, from, to);
        return getBlendReturn<CIELabObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.CIELab
        )
            .map((color: CIELabObject) => {
                return CSS.CIELab(color, detectedOptions);
            });
    }

    public static getBlendCIELabAObject(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): CIELabObject[] {
        return getBlendReturn<CIELabObject>(
            from,
            to,
            steps,
            options.decimals,
            utils.translateColor.CIELabA
        );
    }

    public static getBlendCIELabA(
        from: ColorInput,
        to: ColorInput,
        steps: number = DEFAULT_BLEND_STEPS,
        options: InputOptions = {}
    ): string[] {
        const detectedOptions = getOptionsFromColorInput(options, from, to);
        return getBlendReturn<CIELabObject>(
            from,
            to,
            steps,
            MAX_DECIMALS,
            utils.translateColor.CIELabA
        )
            .map((color: CIELabObject) => {
                return CSS.CIELab(color, detectedOptions);
            });
    }

    // Color Mix Static Methods
    public static getMixHEXObject(colors: ColorInput[], mode: MixString = Mix.ADDITIVE): HEXObject {
        return utils.colorMixer.HEX(colors, mode, false);
    }

    public static getMixHEX(colors: ColorInput[], mode: MixString = Mix.ADDITIVE): string {
        return utils.colorMixer.HEX(colors, mode, true);
    }

    public static getMixHEXAObject(colors: ColorInput[], mode: MixString = Mix.ADDITIVE): HEXObject {
        return utils.colorMixer.HEXA(colors, mode, false);
    }

    public static getMixHEXA(colors: ColorInput[], mode: MixString = Mix.ADDITIVE): string {
        return utils.colorMixer.HEXA(colors, mode, true);
    }

    public static getMixRGBObject(
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
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
        mode: MixString = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.HSLA(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixCIELabObject(
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE,
        options: InputOptions = {}
    ): CIELabObject {
        return utils.colorMixer.CIELab(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixCIELab(
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.CIELab(
            colors,
            mode,
            true,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixCIELabAObject(
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE,
        options: InputOptions = {}
    ): CIELabObject {
        return utils.colorMixer.CIELabA(
            colors,
            mode,
            false,
            getOptionsFromColorInput(options, ...colors)
        );
    }

    public static getMixCIELabA(
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE,
        options: InputOptions = {}
    ): string {
        return utils.colorMixer.CIELabA(
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
    public static getShades(color: CIELabObjectGeneric, shades: number, options?: InputOptions): CIELabObject[];
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
    public static getTints(color: CIELabObjectGeneric, tints: number, options?: InputOptions): CIELabObject[];
    public static getTints(color: ColorInputWithoutCMYK, tints: number, options = {}): ColorOutput[] {
        return utils.getColorMixture(
            color,
            tints,
            false,
            getOptionsFromColorInput(options, color)
        );
    }

    // Color Harmony Static Method
    public static getHarmony(color: string, harmony?: Harmony, mode?: MixString, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): HSLObject[];
    public static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): CIELabObject[];

    public static getHarmony(color: string, harmony?: Harmony, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, options?: InputOptions): HSLObject[];
    public static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, options?: InputOptions): CIELabObject[];

    public static getHarmony(color: string, mode?: MixString, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, mode?: MixString, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, mode?: MixString, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, mode?: MixString, options?: InputOptions): HSLObject[];
    public static getHarmony(color: CIELabObjectGeneric, mode?: MixString, options?: InputOptions): CIELabObject[];

    public static getHarmony(color: string, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    public static getHarmony(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];

    public static getHarmony(
        color: ColorInputWithoutCMYK,
        secondParam?: HarmonyString | MixString | InputOptions,
        thirdParam?: MixString | InputOptions,
        fourthParam?: InputOptions
    ): ColorOutput[] {
        if (isHarmony(secondParam)) {
            return getHarmonyReturn(
                secondParam,
                color,
                isMix(thirdParam)
                    ? thirdParam
                    : Mix.ADDITIVE,
                getOptionsFromColorInput(
                    isMix(thirdParam)
                        ? (fourthParam || {})
                        : thirdParam || {},
                    color
                )
            );
        } else if (isMix(secondParam)) {
            return getHarmonyReturn(
                Harmony.COMPLEMENTARY,
                color,
                secondParam,
                getOptionsFromColorInput(
                    thirdParam as InputOptions || {},
                    color
                )
            );
        }
        return getHarmonyReturn(
            Harmony.COMPLEMENTARY,
            color,
            Mix.ADDITIVE,
            getOptionsFromColorInput(
                secondParam || {},
                color
            )
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