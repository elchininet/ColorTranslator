import {
    CIELabObject,
    CIELabObjectGeneric,
    CMYKObject,
    ColorInput,
    ColorInputWithoutCMYK,
    ColorOutput,
    HEXObject,
    HSLObject,
    HSLObjectGeneric,
    HWBObject,
    HWBObjectGeneric,
    InputOptions,
    LCHObject,
    LCHObjectGeneric,
    Options,
    RGBObject
} from '@types';
import {
    BASE_255,
    DEFAULT_BLEND_STEPS,
    DEFAULT_SHADES_TINTS_STEPS,
    Harmony,
    HarmonyString,
    MAX_ALPHA,
    MAX_LAB,
    MAX_LCH_C,
    MAX_PCENT,
    Mix,
    MixString
} from '#constants';
import {
    cmykToRgb,
    hslToRgb,
    hwbToRgb,
    labToLch,
    labToRgb,
    lchToLab,
    lchToRgb,
    rgbToCmyk,
    rgbToHsl,
    rgbToHwb,
    rgbToLab,
    rgbToLch
} from '#color/translators';
import * as utils from '#color/utils';
import {
    getColorModel,
    getOptionsFromColorInput,
    getRGBObject
} from '#color/extractors';
import { CSS } from '#color/css';
import {
    isHarmony,
    isMix,
    minmax,
    normalizeHue,
    round
} from '#helpers';
import {
    getBlendReturn,
    getBlendReturnWithParameters,
    getColorReturn,
    getHarmonyReturn,
    getMixReturn
} from '#returns';

const bindedMixers = Object.fromEntries(
    Object.entries(utils.colorMixer).map((entry) => {
        const [key, fn] = entry;
        return [key, fn.bind(utils.colorMixer)];
    })
) as typeof utils.colorMixer;

export class ColorTranslator {

    // Constructor
    public constructor(color: ColorInput, options: InputOptions = {}) {
        this._options = getOptionsFromColorInput(options, color);
        this.rgb = getRGBObject(color);
        this.update('rgb');
    }

    // Private properties
    private _options: Options;
    private rgb: RGBObject;
    private hsl: HSLObject;
    private hwb: HWBObject;
    private lab: CIELabObject;
    private lch: LCHObject;
    private cmyk: CMYKObject;

    // Private methods
    private update(...exclude: ('rgb' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'cmyk')[]): void {
        if (!exclude.includes('rgb')) {
            this.updateRGB();
        }
        if (!exclude.includes('hsl')) {
            this.updateHSL();
        }
        if (!exclude.includes('hwb')) {
            this.updateHWB();
        }
        if (!exclude.includes('lab')) {
            this.updateLAB();
        }
        if (!exclude.includes('lch')) {
            this.updateLCH();
        }
        if (!exclude.includes('cmyk')) {
            this.updateCMYK();
        }
    }

    private updateRGB(): void {
        this.rgb = {
            ...hslToRgb(
                this.hsl.H,
                this.hsl.S,
                this.hsl.L
            ),
            A: this.hsl.A
        };
    }

    private updateHSL(): void {
        this.hsl = rgbToHsl(
            this.rgb.R,
            this.rgb.G,
            this.rgb.B,
            this.rgb.A
        );
    }

    private updateHWB(): void {
        this.hwb = rgbToHwb(
            this.rgb.R,
            this.rgb.G,
            this.rgb.B,
            this.rgb.A
        );
    }

    private updateLAB(): void {
        this.lab = {
            ...rgbToLab(
                this.rgb.R,
                this.rgb.G,
                this.rgb.B
            ),
            A: this.rgb.A
        };
    }

    private updateLCH(): void {
        this.lch = {
            ...rgbToLch(
                this.rgb.R,
                this.rgb.G,
                this.rgb.B
            ),
            A: this.rgb.A
        };
    }

    private updateCMYK(): void {
        this.cmyk = rgbToCmyk(
            this.rgb.R,
            this.rgb.G,
            this.rgb.B
        );
    }

    private updateRGBFromHWB(): void {
        this.rgb = {
            ...hwbToRgb(
                this.hwb.H,
                this.hwb.W,
                this.hwb.B
            ),
            A: this.rgb.A
        };
    }

    private updateRGBFromLCH(): void {
        this.rgb = {
            ...lchToRgb(
                this.lch.L,
                this.lch.C,
                this.lch.H
            ),
            A: this.rgb.A
        };
    }

    private updateRGBFromCMYK(): void {
        this.rgb = {
            ...cmykToRgb(
                this.cmyk.C,
                this.cmyk.M,
                this.cmyk.Y,
                this.cmyk.K
            ),
            A: this.rgb.A
        };
    }

    private updateRGBFromLAB(): void {
        this.rgb = {
            ...labToRgb(
                this.lab.L,
                this.lab.a,
                this.lab.b
            ),
            A: this.rgb.A
        };
    }

    private updateLCHFromLAB(): void {
        this.lch = {
            ...labToLch(
                this.lab.L,
                this.lab.a,
                this.lab.b
            ),
            A: this.lab.A
        };
    }

    private updateLABromLCH(): void {
        this.lab = {
            ...lchToLab(
                this.lch.L,
                this.lch.C,
                this.lch.H
            ),
            A: this.lch.A
        };
    }

    // Public options method
    public setOptions(options: InputOptions = {}): ColorTranslator {
        this._options = {
            ...this._options,
            ...options
        } as Options;
        return this;
    }

    // Public RGB methods
    public setR(R: number): ColorTranslator {
        this.rgb.R = minmax(R, 0, BASE_255);
        this.update('rgb');
        return;
    }

    public setG(G: number): ColorTranslator {
        this.rgb.G = minmax(G, 0, BASE_255);
        this.update('rgb');
        return this;
    }

    public setB(B: number): ColorTranslator {
        this.rgb.B = minmax(B, 0, BASE_255);
        this.update('rgb');
        return this;
    }

    // Public HSL methods
    public setH(H: number): ColorTranslator {
        this.hsl.H = normalizeHue(H);
        this.update('hsl');
        return this;
    }

    public setS(S: number): ColorTranslator {
        this.hsl.S = minmax(S, 0, MAX_PCENT);
        this.update('hsl');
        return this;
    }

    public setL(L: number): ColorTranslator {
        this.hsl.L = minmax(L, 0, MAX_PCENT);
        this.update('hsl');
        return this;
    }

    // Public HWB methods
    public setWhiteness(W: number): ColorTranslator {
        this.hwb.W = minmax(W, 0, MAX_PCENT);
        this.updateRGBFromHWB();
        this.update('rgb', 'hwb');
        return this;
    }

    public setBlackness(B: number): ColorTranslator {
        this.hwb.B = minmax(B, 0, MAX_PCENT);
        this.updateRGBFromHWB();
        this.update('rgb', 'hwb');
        return this;
    }

    // Public Lab methods
    public setCIEL(L: number): ColorTranslator {
        this.lab.L = minmax(L, 0, MAX_PCENT);
        this.updateRGBFromLAB();
        this.updateLCHFromLAB();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    public setCIEa(a: number): ColorTranslator {
        this.lab.a = minmax(a, -MAX_LAB, MAX_LAB);
        this.updateRGBFromLAB();
        this.updateLCHFromLAB();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    public setCIEb(b: number): ColorTranslator {
        this.lab.b = minmax(b, -MAX_LAB, MAX_LAB);
        this.updateRGBFromLAB();
        this.updateLCHFromLAB();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    // Puclic LCH methods
    public setLCHL(l: number): ColorTranslator {
        this.lch.L = minmax(l, 0, MAX_PCENT);
        this.updateRGBFromLCH();
        this.updateLABromLCH();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    public setLCHC(c: number): ColorTranslator {
        this.lch.C = minmax(c, 0, MAX_LCH_C);
        this.updateRGBFromLCH();
        this.updateLABromLCH();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    public setLCHH(h: number): ColorTranslator {
        this.lch.H = normalizeHue(h);
        this.updateRGBFromLCH();
        this.updateLABromLCH();
        this.update('rgb', 'lab', 'lch');
        return this;
    }

    // Public alpha method
    public setA(A: number): ColorTranslator {
        const alpha = minmax(A, 0, MAX_ALPHA);
        this.rgb.A = alpha;
        this.hsl.A = alpha;
        this.hwb.A = alpha;
        this.lab.A = alpha;
        this.lch.A = alpha;
        this.cmyk.A = alpha;
        return this;
    }

    // Public CMYK methods
    public setC(C: number): ColorTranslator {
        this.cmyk.C = minmax(C, 0, 100);
        this.updateRGBFromCMYK();
        this.update('cmyk');
        return this;
    }

    public setM(M: number): ColorTranslator {
        this.cmyk.M = minmax(M, 0, 100);
        this.updateRGBFromCMYK();
        this.update('cmyk');
        return this;
    }

    public setY(Y: number): ColorTranslator {
        this.cmyk.Y = minmax(Y, 0, 100);
        this.updateRGBFromCMYK();
        this.update('cmyk');
        return this;
    }

    public setK(K: number): ColorTranslator {
        this.cmyk.K = minmax(K, 0, 100);
        this.updateRGBFromCMYK();
        this.update('cmyk');
        return this;
    }

    // Public options property
    public get options(): Options {
        return this._options;
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

    // Public HWB properties
    public get Whiteness(): number {
        return round(this.hwb.W, this.options.decimals);
    }

    public get Blackness(): number {
        return round(this.hwb.B, this.options.decimals);
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

    // Pulic LCH properties
    public get LCHL(): number {
        return round(this.lch.L, this.options.decimals);
    }

    public get LCHC(): number {
        return round(this.lch.C, this.options.decimals);
    }

    public get LCHH(): number {
        return round(this.lch.H, this.options.decimals);
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

    public get HWBObject(): HWBObject {
        return {
            H: this.H,
            W: this.Whiteness,
            B: this.Blackness
        };
    }

    public get HWBAObject(): HWBObject {
        return {
            ...this.HWBObject,
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

    public get LCHObject(): LCHObject {
        return {
            L: this.LCHL,
            C: this.LCHC,
            H: this.LCHH
        };
    }

    public get LCHAObject(): LCHObject {
        return {
            ...this.LCHObject,
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
            A: this.A * BASE_255
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

    public get HWB(): string {
        return CSS.HWB(
            {
                H: this.H,
                W: this.Whiteness,
                B: this.Blackness
            },
            this.options
        );
    }

    public get HWBA(): string {
        return CSS.HWB(
            {
                H: this.H,
                W: this.Whiteness,
                B: this.Blackness,
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

    public get LCH(): string {
        return CSS.LCH(
            {
                L: this.LCHL,
                C: this.LCHC,
                H: this.LCHH
            },
            this.options
        );
    }

    public get LCHA(): string {
        return CSS.LCH(
            {
                L: this.LCHL,
                C: this.LCHC,
                H: this.LCHH,
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
        const model = getColorModel(color);
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
        const model = getColorModel(color);
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
        const model = getColorModel(color);
        return getColorReturn<RGBObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.RGB
        );
    }

    public static toRGB(color: ColorInput, options: InputOptions = {}): string {
        const rgb = ColorTranslator.toRGBObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.RGB(rgb, detectedOptions);
    }

    public static toRGBAObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        const model = getColorModel(color);
        return getColorReturn<RGBObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.RGBA
        );
    }

    public static toRGBA(color: ColorInput, options: InputOptions = {}): string {
        const rgba = ColorTranslator.toRGBAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.RGB(rgba, detectedOptions);
    }

    public static toHSLObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HSL
        );
    }

    public static toHSL(color: ColorInput, options: InputOptions = {}): string {
        const hsl = ColorTranslator.toHSLObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HSL(hsl, detectedOptions);
    }

    public static toHSLAObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        const model = getColorModel(color);
        return getColorReturn<HSLObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HSLA
        );
    }

    public static toHSLA(color: ColorInput, options: InputOptions = {}): string {
        const hsla = ColorTranslator.toHSLAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HSL(hsla, detectedOptions);
    }

    public static toHWBObject(color: ColorInput, options: InputOptions = {}): HWBObject {
        const model = getColorModel(color);
        return getColorReturn<HWBObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HWB
        );
    }

    public static toHWB(color: ColorInput, options: InputOptions = {}): string {
        const hwb = ColorTranslator.toHWBObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HWB(hwb, detectedOptions);
    }

    public static toHWBAObject(color: ColorInput, options: InputOptions = {}): HWBObject {
        const model = getColorModel(color);
        return getColorReturn<HWBObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.HWBA
        );
    }

    public static toHWBA(color: ColorInput, options: InputOptions = {}): string {
        const hwb = ColorTranslator.toHWBAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.HWB(hwb, detectedOptions);
    }

    public static toCIELabObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        const model = getColorModel(color);
        return getColorReturn<CIELabObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CIELab
        );
    }

    public static toCIELab(color: ColorInput, options: InputOptions = {}): string {
        const lab = ColorTranslator.toCIELabObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.CIELab(lab, detectedOptions);
    }

    public static toCIELabAObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        const model = getColorModel(color);
        return getColorReturn<CIELabObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CIELabA
        );
    }

    public static toCIELabA(color: ColorInput, options: InputOptions = {}): string {
        const lab = ColorTranslator.toCIELabAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.CIELab(lab, detectedOptions);
    }

    public static toLCHObject(color: ColorInput, options: InputOptions = {}): LCHObject {
        const model = getColorModel(color);
        return getColorReturn<LCHObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.LCH
        );
    }

    public static toLCH(color: ColorInput, options: InputOptions = {}): string {
        const lch = ColorTranslator.toLCHObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.LCH(lch, detectedOptions);
    }

    public static toLCHAObject(color: ColorInput, options: InputOptions = {}): LCHObject {
        const model = getColorModel(color);
        return getColorReturn<LCHObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.LCHA
        );
    }

    public static toLCHA(color: ColorInput, options: InputOptions = {}): string {
        const lch = ColorTranslator.toLCHAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.LCH(lch, detectedOptions);
    }

    public static toCMYKObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CMYK
        );
    }

    public static toCMYK(color: ColorInput, options: InputOptions = {}): string {
        const cmyk = ColorTranslator.toCMYKObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
        return CSS.CMYK(cmyk, detectedOptions);
    }

    public static toCMYKAObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        const model = getColorModel(color);
        return getColorReturn<CMYKObject>(
            color,
            model,
            options.decimals,
            utils.translateColor.CMYKA
        );
    }

    public static toCMYKA(color: ColorInput, options: InputOptions = {}): string {
        const cmyka = ColorTranslator.toCMYKAObject(color, options);
        const detectedOptions = getOptionsFromColorInput(options, color);
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
        steps: number = DEFAULT_BLEND_STEPS
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
        options?: InputOptions
    ): RGBObject[];
    public static getBlendRGBObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): RGBObject[];
    public static getBlendRGBObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): RGBObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.RGB
        });
    }

    public static getBlendRGB(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendRGB(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendRGB(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.RGB,
            cssFunction: CSS.RGB
        });
    }

    public static getBlendRGBAObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): RGBObject[];
    public static getBlendRGBAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): RGBObject[];
    public static getBlendRGBAObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): RGBObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.RGBA
        });
    }

    public static getBlendRGBA(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendRGBA(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendRGBA(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.RGBA,
            cssFunction: CSS.RGB
        });
    }

    public static getBlendHSLObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): HSLObject[];
    public static getBlendHSLObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): HSLObject[];
    public static getBlendHSLObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): HSLObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HSL
        });
    }

    public static getBlendHSL(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendHSL(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendHSL(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HSL,
            cssFunction: CSS.HSL
        });
    }

    public static getBlendHSLAObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): HSLObject[];
    public static getBlendHSLAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): HSLObject[];
    public static getBlendHSLAObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): HSLObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HSLA
        });
    }

    public static getBlendHSLA(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendHSLA(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendHSLA(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HSLA,
            cssFunction: CSS.HSL
        });
    }

    public static getBlendHWBObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): HWBObject[];
    public static getBlendHWBObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): HWBObject[];
    public static getBlendHWBObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): HWBObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HWB
        });
    }

    public static getBlendHWB(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendHWB(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendHWB(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HWB,
            cssFunction: CSS.HWB
        });
    }

    public static getBlendHWBAObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): HWBObject[];
    public static getBlendHWBAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): HWBObject[];
    public static getBlendHWBAObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): HWBObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HWBA
        });
    }

    public static getBlendHWBA(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendHWBA(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendHWBA(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.HWBA,
            cssFunction: CSS.HWB
        });
    }

    public static getBlendCIELabObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): CIELabObject[];
    public static getBlendCIELabObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): CIELabObject[];
    public static getBlendCIELabObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): CIELabObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.CIELab
        });
    }

    public static getBlendCIELab(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendCIELab(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendCIELab(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.CIELab,
            cssFunction: CSS.CIELab
        });
    }

    public static getBlendCIELabAObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): CIELabObject[];
    public static getBlendCIELabAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): CIELabObject[];
    public static getBlendCIELabAObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): CIELabObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.CIELabA
        });
    }

    public static getBlendCIELabA(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendCIELabA(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendCIELabA(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.CIELabA,
            cssFunction: CSS.CIELab
        });
    }

    public static getBlendLCHObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): LCHObject[];
    public static getBlendLCHObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): LCHObject[];
    public static getBlendLCHObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): LCHObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.LCH
        });
    }

    public static getBlendLCH(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendLCH(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendLCH(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.LCH,
            cssFunction: CSS.LCH
        });
    }

    public static getBlendLCHAObject(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): LCHObject[];
    public static getBlendLCHAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): LCHObject[];
    public static getBlendLCHAObject(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): LCHObject[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.LCHA
        });
    }

    public static getBlendLCHA(
        from: ColorInput,
        to: ColorInput,
        options?: InputOptions
    ): string[];
    public static getBlendLCHA(
        from: ColorInput,
        to: ColorInput,
        steps?: number,
        options?: InputOptions
    ): string[];
    public static getBlendLCHA(
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ): string[] {
        return getBlendReturnWithParameters({
            from,
            to,
            thirdParameter,
            fourthParameter,
            translateFunction: utils.translateColor.LCHA,
            cssFunction: CSS.LCH
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
        options?: InputOptions
    ): RGBObject;
    public static getMixRGBObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): RGBObject;
    public static getMixRGBObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): RGBObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.RGB,
            css: false
        });
    }

    public static getMixRGB(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixRGB(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixRGB(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.RGB,
            css: true
        });
    }

    public static getMixRGBAObject(
        colors: ColorInput[],
        options?: InputOptions
    ): RGBObject;
    public static getMixRGBAObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): RGBObject;
    public static getMixRGBAObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): RGBObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.RGBA,
            css: false
        });
    }

    public static getMixRGBA(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixRGBA(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixRGBA(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.RGBA,
            css: true
        });
    }

    public static getMixHSLObject(
        colors: ColorInput[],
        options?: InputOptions
    ): HSLObject;
    public static getMixHSLObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): HSLObject;
    public static getMixHSLObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): HSLObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HSL,
            css: false
        });
    }

    public static getMixHSL(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixHSL(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixHSL(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HSL,
            css: true
        });
    }

    public static getMixHSLAObject(
        colors: ColorInput[],
        options?: InputOptions
    ): HSLObject;
    public static getMixHSLAObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): HSLObject;
    public static getMixHSLAObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): HSLObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HSLA,
            css: false
        });
    }

    public static getMixHSLA(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixHSLA(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixHSLA(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HSLA,
            css: true
        });
    }

    public static getMixHWBObject(
        colors: ColorInput[],
        options?: InputOptions
    ): HWBObject;
    public static getMixHWBObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): HWBObject;
    public static getMixHWBObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): HWBObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HWB,
            css: false
        });
    }

    public static getMixHWB(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixHWB(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixHWB(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HWB,
            css: true
        });
    }

    public static getMixHWBAObject(
        colors: ColorInput[],
        options?: InputOptions
    ): HWBObject;
    public static getMixHWBAObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): HWBObject;
    public static getMixHWBAObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): HWBObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HWBA,
            css: false
        });
    }

    public static getMixHWBA(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixHWBA(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixHWBA(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.HWBA,
            css: true
        });
    }

    public static getMixCIELabObject(
        colors: ColorInput[],
        options?: InputOptions
    ): CIELabObject;
    public static getMixCIELabObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): CIELabObject;
    public static getMixCIELabObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): CIELabObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.CIELab,
            css: false
        });
    }

    public static getMixCIELab(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixCIELab(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixCIELab(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.CIELab,
            css: true
        });
    }

    public static getMixCIELabAObject(
        colors: ColorInput[],
        options?: InputOptions
    ): CIELabObject;
    public static getMixCIELabAObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): CIELabObject;
    public static getMixCIELabAObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): CIELabObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.CIELabA,
            css: false
        });
    }

    public static getMixCIELabA(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixCIELabA(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixCIELabA(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.CIELabA,
            css: true
        });
    }

    public static getMixLCHObject(
        colors: ColorInput[],
        options?: InputOptions
    ): LCHObject;
    public static getMixLCHObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): LCHObject;
    public static getMixLCHObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): LCHObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.LCH,
            css: false
        });
    }

    public static getMixLCH(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixLCH(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixLCH(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.LCH,
            css: true
        });
    }

    public static getMixLCHAObject(
        colors: ColorInput[],
        options?: InputOptions
    ): LCHObject;
    public static getMixLCHAObject(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): LCHObject;
    public static getMixLCHAObject(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): LCHObject {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.LCHA,
            css: false
        });
    }

    public static getMixLCHA(
        colors: ColorInput[],
        options?: InputOptions
    ): string;
    public static getMixLCHA(
        colors: ColorInput[],
        mode?: MixString,
        options?: InputOptions
    ): string;
    public static getMixLCHA(
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ): string {
        return getMixReturn({
            colors,
            secondParameter,
            thirdParameter,
            colorMixerFunction: bindedMixers.LCHA,
            css: true
        });
    }

    // Get shades static method
    public static getShades(color: string, options?: InputOptions): string[];
    public static getShades(color: HEXObject, options?: InputOptions): HEXObject[];
    public static getShades(color: RGBObject, options?: InputOptions): RGBObject[];
    public static getShades(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    public static getShades(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    public static getShades(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    public static getShades(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];

    public static getShades(color: string, shades?: number, options?: InputOptions): string[];
    public static getShades(color: HEXObject, shades?: number, options?: InputOptions): HEXObject[];
    public static getShades(color: RGBObject, shades?: number, options?: InputOptions): RGBObject[];
    public static getShades(color: HSLObjectGeneric, shades?: number, options?: InputOptions): HSLObject[];
    public static getShades(color: HWBObjectGeneric, shades?: number, options?: InputOptions): HWBObject[];
    public static getShades(color: CIELabObjectGeneric, shades?: number, options?: InputOptions): CIELabObject[];
    public static getShades(color: LCHObjectGeneric, shades?: number, options?: InputOptions): LCHObject[];

    public static getShades(
        color: ColorInputWithoutCMYK,
        secondParameter?: number | InputOptions,
        thirdParameter?: InputOptions
    ): ColorOutput[] {
        if (typeof secondParameter === 'number') {
            return utils.getColorMixture(
                color,
                secondParameter,
                true,
                getOptionsFromColorInput(
                    thirdParameter || {},
                    color
                )
            );
        }
        return utils.getColorMixture(
            color,
            DEFAULT_SHADES_TINTS_STEPS,
            true,
            getOptionsFromColorInput(
                secondParameter || {},
                color
            )
        );
    }

    // Get tints static method
    public static getTints(color: string, options?: InputOptions): string[];
    public static getTints(color: HEXObject, options?: InputOptions): HEXObject[];
    public static getTints(color: RGBObject, options?: InputOptions): RGBObject[];
    public static getTints(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    public static getTints(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    public static getTints(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    public static getTints(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];

    public static getTints(color: string, tints?: number, options?: InputOptions): string[];
    public static getTints(color: HEXObject, tints?: number, options?: InputOptions): HEXObject[];
    public static getTints(color: RGBObject, tints?: number, options?: InputOptions): RGBObject[];
    public static getTints(color: HSLObjectGeneric, tints?: number, options?: InputOptions): HSLObject[];
    public static getTints(color: HWBObjectGeneric, tints?: number, options?: InputOptions): HWBObject[];
    public static getTints(color: CIELabObjectGeneric, tints?: number, options?: InputOptions): CIELabObject[];
    public static getTints(color: LCHObjectGeneric, tints?: number, options?: InputOptions): LCHObject[];

    public static getTints(
        color: ColorInputWithoutCMYK,
        secondParameter?: number | InputOptions,
        thirdParameter?: InputOptions
    ): ColorOutput[] {
        if (typeof secondParameter === 'number') {
            return utils.getColorMixture(
                color,
                secondParameter,
                false,
                getOptionsFromColorInput(
                    thirdParameter || {},
                    color
                )
            );
        }
        return utils.getColorMixture(
            color,
            DEFAULT_SHADES_TINTS_STEPS,
            false,
            getOptionsFromColorInput(
                secondParameter || {},
                color
            )
        );
    }

    // Color Harmony Static Method
    public static getHarmony(color: string, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    public static getHarmony(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    public static getHarmony(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    public static getHarmony(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];

    public static getHarmony(color: string, mode?: MixString, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, mode?: MixString, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, mode?: MixString, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, mode?: MixString, options?: InputOptions): HSLObject[];
    public static getHarmony(color: HWBObjectGeneric, mode?: MixString, options?: InputOptions): HWBObject[];
    public static getHarmony(color: CIELabObjectGeneric, mode?: MixString, options?: InputOptions): CIELabObject[];
    public static getHarmony(color: LCHObjectGeneric, mode?: MixString, options?: InputOptions): LCHObject[];

    public static getHarmony(color: string, harmony?: Harmony, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, options?: InputOptions): HSLObject[];
    public static getHarmony(color: HWBObjectGeneric, harmony?: Harmony, options?: InputOptions): HWBObject[];
    public static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, options?: InputOptions): CIELabObject[];
    public static getHarmony(color: LCHObjectGeneric, harmony?: Harmony, options?: InputOptions): LCHObject[];

    public static getHarmony(color: string, harmony?: Harmony, mode?: MixString, options?: InputOptions): string[];
    public static getHarmony(color: HEXObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): HEXObject[];
    public static getHarmony(color: RGBObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): RGBObject[];
    public static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): HSLObject[];
    public static getHarmony(color: HWBObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): HWBObject[];
    public static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): CIELabObject[];
    public static getHarmony(color: LCHObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): LCHObject[];

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
    HWBObject,
    CIELabObject,
    LCHObject,
    CMYKObject
};