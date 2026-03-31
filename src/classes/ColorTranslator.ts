import {
    CIELabObject,
    CMYKObject,
    ColorInput,
    ColorInputWithoutCMYK,
    ColorOutput,
    GetBlendOverload,
    GetMixOverload,
    HarmonyString,
    HEXObject,
    HSLObject,
    HWBObject,
    InputOptions,
    LCHObject,
    MixString,
    Options,
    RGBObject,
    StaticFunctionReturn
} from '@types';
import {
    BASE_255,
    ColorModel,
    Harmony,
    MAX_ALPHA,
    MAX_LAB,
    MAX_LCH_C,
    MAX_PCENT,
    Mix
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
import {
    getColorModel,
    minmax,
    normalizeHue,
    round
} from '#utilities';
import { colorParserContext, getOptionsFromColorInput } from '#parsers';
import {
    getBlendReturn,
    getBlendReturnParams,
    getMixReturn,
    getMixReturnParameters,
    getShadesOrTintsReturn,
    getShadesOrTintsReturnParameters,
    getHarmonyReturn,
    getHarmonyReturnParameters
} from '#returns';

export class ColorTranslator {

    // Constructor
    public constructor(color: ColorInput, options: InputOptions = {}) {
        this._options = getOptionsFromColorInput(options, color);
        const parsedColor = colorParserContext.parse(color);
        const model = getColorModel(parsedColor);
        switch (model) {
            case ColorModel.HSL:
                this.hsl = parsedColor as HSLObject;
                this.update('hsl');
                break;
            case ColorModel.HWB:
                this.hwb = parsedColor as HWBObject;
                this.updateRGBFromHWB();
                this.update('hwb', 'rgb');
                break;
            case ColorModel.CIELab:
                this.lab = parsedColor as CIELabObject;
                this.updateRGBFromLAB();
                this.update('lab', 'rgb');
                break;
            case ColorModel.LCH:
                this.lch = parsedColor as LCHObject;
                this.updateRGBFromLCH();
                this.update('lch', 'rgb');
                break;
            case ColorModel.CMYK:
                this.cmyk = parsedColor as CMYKObject;
                this.updateRGBFromCMYK();
                this.update('cmyk', 'rgb');
                break;
            default:
                this.rgb = parsedColor as RGBObject;
                this.update('rgb');
        }
    }

    // Private properties
    private _options: Options;
    private rgb!: RGBObject;
    private hsl!: HSLObject;
    private hwb!: HWBObject;
    private lab!: CIELabObject;
    private lch!: LCHObject;
    private cmyk!: CMYKObject;

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
            A: this.hsl.A ?? 1
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
            A: this.rgb.A ?? 1
        };
    }

    private updateLCH(): void {
        this.lch = {
            ...rgbToLch(
                this.rgb.R,
                this.rgb.G,
                this.rgb.B
            ),
            A: this.rgb.A ?? 1
        };
    }

    private updateCMYK(): void {
        this.cmyk = {
            ...rgbToCmyk(
                this.rgb.R,
                this.rgb.G,
                this.rgb.B
            ),
            A: this.rgb.A ?? 1
        };
    }

    private updateRGBFromHWB(): void {
        this.rgb = {
            ...hwbToRgb(
                this.hwb.H,
                this.hwb.W,
                this.hwb.B
            ),
            A: this.hwb?.A ?? 1
        };
    }

    private updateRGBFromLCH(): void {
        this.rgb = {
            ...lchToRgb(
                this.lch.L,
                this.lch.C,
                this.lch.H
            ),
            A: this.lch.A ?? 1
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
            A: this.cmyk.A ?? 1
        };
    }

    private updateRGBFromLAB(): void {
        this.rgb = {
            ...labToRgb(
                this.lab.L,
                this.lab.a,
                this.lab.b
            ),
            A: this.lab.A ?? 1
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
        return this;
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
        return round(this.hsl.A as number, this.options.decimals);
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
        return colorParserContext.convert(
            this.rgb,
            ColorModel.HEX
        );
    }

    public get HEXAObject(): HEXObject {
        return colorParserContext.convert(
            this.rgb,
            ColorModel.HEX,
            0,
            true
        );
    }

    public get RGBObject(): RGBObject {
        return colorParserContext.convert(
            this.rgb,
            ColorModel.RGB,
            this.options.decimals
        );
    }

    public get RGBAObject(): RGBObject {
        return colorParserContext.convert(
            this.rgb,
            ColorModel.RGB,
            this.options.decimals,
            true
        );
    }

    public get HSLObject(): HSLObject {
        return colorParserContext.convert(
            this.hsl,
            ColorModel.HSL,
            this.options.decimals
        );
    }

    public get HSLAObject(): HSLObject {
        return colorParserContext.convert(
            this.hsl,
            ColorModel.HSL,
            this.options.decimals,
            true
        );
    }

    public get HWBObject(): HWBObject {
        return colorParserContext.convert(
            this.hwb,
            ColorModel.HWB,
            this.options.decimals
        );
    }

    public get HWBAObject(): HWBObject {
        return colorParserContext.convert(
            this.hwb,
            ColorModel.HWB,
            this.options.decimals,
            true
        );
    }

    public get CIELabObject(): CIELabObject {
        return colorParserContext.convert(
            this.lab,
            ColorModel.CIELab,
            this.options.decimals
        );
    }

    public get CIELabAObject(): CIELabObject {
        return colorParserContext.convert(
            this.lab,
            ColorModel.CIELab,
            this.options.decimals,
            true
        );
    }

    public get LCHObject(): LCHObject {
        return colorParserContext.convert(
            this.lch,
            ColorModel.LCH,
            this.options.decimals
        );
    }

    public get LCHAObject(): LCHObject {
        return colorParserContext.convert(
            this.lch,
            ColorModel.LCH,
            this.options.decimals,
            true
        );
    }

    public get CMYKObject(): CMYKObject {
        return colorParserContext.convert(
            this.cmyk,
            ColorModel.CMYK,
            this.options.decimals
        );
    }

    public get CMYKAObject(): CMYKObject {
        return colorParserContext.convert(
            this.cmyk,
            ColorModel.CMYK,
            this.options.decimals,
            true
        );
    }

    // CSS public properties
    public get HEX(): string {
        return colorParserContext.convertCSS(
            this.rgb,
            ColorModel.HEX
        );
    }

    public get HEXA(): string {
        return colorParserContext.convertCSS(
            this.rgb,
            ColorModel.HEX,
            {},
            true
        );
    }

    public get RGB(): string {
        return colorParserContext.convertCSS(
            this.rgb,
            ColorModel.RGB,
            this.options
        );
    }

    public get RGBA(): string {
        return colorParserContext.convertCSS(
            this.rgb,
            ColorModel.RGB,
            this.options,
            true
        );
    }

    public get HSL(): string {
        return colorParserContext.convertCSS(
            this.hsl,
            ColorModel.HSL,
            this.options
        );
    }

    public get HSLA(): string {
        return colorParserContext.convertCSS(
            this.hsl,
            ColorModel.HSL,
            this.options,
            true
        );
    }

    public get HWB(): string {
        return colorParserContext.convertCSS(
            this.hwb,
            ColorModel.HWB,
            this.options
        );
    }

    public get HWBA(): string {
        return colorParserContext.convertCSS(
            this.hwb,
            ColorModel.HWB,
            this.options,
            true
        );
    }

    public get CIELab(): string {
        return colorParserContext.convertCSS(
            this.lab,
            ColorModel.CIELab,
            this.options
        );
    }

    public get CIELabA(): string {
        return colorParserContext.convertCSS(
            this.lab,
            ColorModel.CIELab,
            this.options,
            true
        );
    }

    public get LCH(): string {
        return colorParserContext.convertCSS(
            this.lch,
            ColorModel.LCH,
            this.options
        );
    }

    public get LCHA(): string {
        return colorParserContext.convertCSS(
            this.lch,
            ColorModel.LCH,
            this.options,
            true
        );
    }

    public get CMYK(): string {
        return colorParserContext.convertCSS(
            this.cmyk,
            ColorModel.CMYK,
            this.options
        );
    }

    public get CMYKA(): string {
        return colorParserContext.convertCSS(
            this.cmyk,
            ColorModel.CMYK,
            this.options,
            true
        );
    }

    // Color Conversion Static Methods
    public static toHEXObject(color: ColorInput): HEXObject {
        return colorParserContext.convert(
            color,
            ColorModel.HEX
        );
    }

    public static toHEX(color: ColorInput): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HEX
        );
    }

    public static toHEXAObject(color: ColorInput): HEXObject {
        return colorParserContext.convert(
            color,
            ColorModel.HEX,
            undefined,
            true
        );
    }

    public static toHEXA(color: ColorInput): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HEX,
            undefined,
            true
        );
    }

    public static toRGBObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        return colorParserContext.convert(
            color,
            ColorModel.RGB,
            options.decimals
        );
    }

    public static toRGB(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.RGB,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toRGBAObject(color: ColorInput, options: InputOptions = {}): RGBObject {
        return colorParserContext.convert(
            color,
            ColorModel.RGB,
            options.decimals,
            true
        );
    }

    public static toRGBA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.RGB,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    public static toHSLObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        return colorParserContext.convert(
            color,
            ColorModel.HSL,
            options.decimals
        );
    }

    public static toHSL(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HSL,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toHSLAObject(color: ColorInput, options: InputOptions = {}): HSLObject {
        return colorParserContext.convert(
            color,
            ColorModel.HSL,
            options.decimals,
            true
        );
    }

    public static toHSLA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HSL,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    public static toHWBObject(color: ColorInput, options: InputOptions = {}): HWBObject {
        return colorParserContext.convert(
            color,
            ColorModel.HWB,
            options.decimals
        );
    }

    public static toHWB(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HWB,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toHWBAObject(color: ColorInput, options: InputOptions = {}): HWBObject {
        return colorParserContext.convert(
            color,
            ColorModel.HWB,
            options.decimals,
            true
        );
    }

    public static toHWBA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.HWB,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    public static toCIELabObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        return colorParserContext.convert(
            color,
            ColorModel.CIELab,
            options.decimals
        );
    }

    public static toCIELab(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.CIELab,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toCIELabAObject(color: ColorInput, options: InputOptions = {}): CIELabObject {
        return colorParserContext.convert(
            color,
            ColorModel.CIELab,
            options.decimals,
            true
        );
    }

    public static toCIELabA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.CIELab,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    public static toLCHObject(color: ColorInput, options: InputOptions = {}): LCHObject {
        return colorParserContext.convert(
            color,
            ColorModel.LCH,
            options.decimals
        );
    }

    public static toLCH(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.LCH,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toLCHAObject(color: ColorInput, options: InputOptions = {}): LCHObject {
        return colorParserContext.convert(
            color,
            ColorModel.LCH,
            options.decimals,
            true
        );
    }

    public static toLCHA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.LCH,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    public static toCMYKObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        return colorParserContext.convert(
            color,
            ColorModel.CMYK,
            options.decimals
        );
    }

    public static toCMYK(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.CMYK,
            getOptionsFromColorInput(options, color)
        );
    }

    public static toCMYKAObject(color: ColorInput, options: InputOptions = {}): CMYKObject {
        return colorParserContext.convert(
            color,
            ColorModel.CMYK,
            options.decimals,
            true
        );
    }

    public static toCMYKA(color: ColorInput, options: InputOptions = {}): string {
        return colorParserContext.convertCSS(
            color,
            ColorModel.CMYK,
            getOptionsFromColorInput(options, color),
            true
        );
    }

    // Color Blending Static Methods
    public static getBlendHEXObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number
    ): RGBObject[] {
        return getBlendReturn(
            from,
            to,
            ColorModel.HEX,
            false,
            false,
            steps
        );
    }

    public static getBlendHEX(
        from: ColorInput,
        to: ColorInput,
        steps?: number
    ): string[] {
        return getBlendReturn(
            from,
            to,
            ColorModel.HEX,
            true,
            false,
            steps
        );
    }

    public static getBlendHEXAObject(
        from: ColorInput,
        to: ColorInput,
        steps?: number
    ): RGBObject[] {
        return getBlendReturn(
            from,
            to,
            ColorModel.HEX,
            false,
            true,
            steps
        );
    }

    public static getBlendHEXA(
        from: ColorInput,
        to: ColorInput,
        steps?: number
    ): string[] {
        return getBlendReturn(
            from,
            to,
            ColorModel.HEX,
            true,
            true,
            steps
        );
    }

    public static getBlendRGBObject: GetBlendOverload<RGBObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.RGB,
        false,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendRGB: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.RGB,
        true,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendRGBAObject: GetBlendOverload<RGBObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.RGB,
        false,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendRGBA: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.RGB,
        true,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHSLObject: GetBlendOverload<HSLObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HSL,
        false,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHSL: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HSL,
        true,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHSLAObject: GetBlendOverload<HSLObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HSL,
        false,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHSLA: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HSL,
        true,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHWBObject: GetBlendOverload<HWBObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HWB,
        false,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHWB: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HWB,
        true,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHWBAObject: GetBlendOverload<HWBObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HWB,
        false,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendHWBA: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.HWB,
        true,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendCIELabObject: GetBlendOverload<CIELabObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.CIELab,
        false,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendCIELab: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.CIELab,
        true,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendCIELabAObject: GetBlendOverload<CIELabObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.CIELab,
        false,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendCIELabA: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.CIELab,
        true,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendLCHObject: GetBlendOverload<LCHObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.LCH,
        false,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendLCH: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.LCH,
        true,
        false,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendLCHAObject: GetBlendOverload<LCHObject> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.LCH,
        false,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    public static getBlendLCHA: GetBlendOverload<string> = (
        from: ColorInput,
        to: ColorInput,
        thirdParameter?: number | InputOptions,
        fourthParameter?: InputOptions
    ) => getBlendReturn(
        from,
        to,
        ColorModel.LCH,
        true,
        true,
        ...getBlendReturnParams(
            thirdParameter,
            fourthParameter
        )
    );

    // Color Mix Static Methods
    public static getMixHEXObject = (
        colors: ColorInput[],
        mode?: MixString
    ): HEXObject => getMixReturn(
        colors,
        ColorModel.HEX,
        false,
        false,
        mode
    );

    public static getMixHEX = (
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE
    ): string => getMixReturn(
        colors,
        ColorModel.HEX,
        true,
        false,
        mode
    );

    public static getMixHEXAObject = (
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE
    ): HEXObject => getMixReturn(
        colors,
        ColorModel.HEX,
        false,
        true,
        mode
    );

    public static getMixHEXA = (
        colors: ColorInput[],
        mode: MixString = Mix.ADDITIVE
    ): string => getMixReturn(
        colors,
        ColorModel.HEX,
        true,
        true,
        mode
    );

    public static getMixRGBObject: GetMixOverload<RGBObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.RGB,
        false,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixRGB: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.RGB,
        true,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixRGBAObject: GetMixOverload<RGBObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.RGB,
        false,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixRGBA: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.RGB,
        true,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHSLObject: GetMixOverload<HSLObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HSL,
        false,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHSL: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HSL,
        true,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHSLAObject: GetMixOverload<HSLObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HSL,
        false,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHSLA: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HSL,
        true,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHWBObject: GetMixOverload<HWBObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HWB,
        false,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHWB: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HWB,
        true,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHWBAObject: GetMixOverload<HWBObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HWB,
        false,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixHWBA: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.HWB,
        true,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixCIELabObject: GetMixOverload<CIELabObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.CIELab,
        false,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixCIELab: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.CIELab,
        true,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixCIELabAObject: GetMixOverload<CIELabObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.CIELab,
        false,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixCIELabA: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.CIELab,
        true,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixLCHObject: GetMixOverload<LCHObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.LCH,
        false,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixLCH: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.LCH,
        true,
        false,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixLCHAObject: GetMixOverload<LCHObject> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.LCH,
        false,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    public static getMixLCHA: GetMixOverload<string> = (
        colors: ColorInput[],
        secondParameter?: MixString | InputOptions,
        thirdParameter?: InputOptions
    ) => getMixReturn(
        colors,
        ColorModel.LCH,
        true,
        true,
        ...getMixReturnParameters(
            secondParameter,
            thirdParameter
        )
    );

    // Get shades static method
    public static getShades<C extends ColorInputWithoutCMYK>(
        color: C,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getShades<C extends ColorInputWithoutCMYK>(
        color: C,
        shades?: number,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getShades(
        color: ColorInputWithoutCMYK,
        secondParameter?: number | InputOptions,
        thirdParameter?: InputOptions
    ): ColorOutput[] {
        return getShadesOrTintsReturn(
            true,
            color,
            ...getShadesOrTintsReturnParameters(
                secondParameter,
                thirdParameter
            )
        );
    }

    // Get tints static method
    public static getTints<C extends ColorInputWithoutCMYK>(
        color: C,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getTints<C extends ColorInputWithoutCMYK>(
        color: C,
        tints?: number,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getTints(
        color: ColorInputWithoutCMYK,
        secondParameter?: number | InputOptions,
        thirdParameter?: InputOptions
    ): ColorOutput[] {
        return getShadesOrTintsReturn(
            false,
            color,
            ...getShadesOrTintsReturnParameters(
                secondParameter,
                thirdParameter
            )
        );
    }

    // Color Harmony Static Method
    public static getHarmony<C extends ColorInputWithoutCMYK>(
        color: C,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getHarmony<C extends ColorInputWithoutCMYK>(
        color: C,
        mode?: MixString,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getHarmony<C extends ColorInputWithoutCMYK>(
        color: C,
        harmony?: Harmony,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getHarmony<C extends ColorInputWithoutCMYK>(
        color: C,
        harmony?: Harmony,
        mode?: MixString,
        options?: InputOptions
    ): StaticFunctionReturn<C>;
    public static getHarmony(
        color: ColorInputWithoutCMYK ,
        secondParam?: HarmonyString | MixString | InputOptions,
        thirdParam?: MixString | InputOptions,
        fourthParam?: InputOptions
    ): ColorOutput[] {
        return getHarmonyReturn(
            color,
            ...getHarmonyReturnParameters(
                secondParam,
                thirdParam,
                fourthParam
            )
        );
    }
}