import {
    ColorInput,
    ColorObject,
    CSSOptionsBase,
    InputOptions
} from '@types';
import {
    ColorModel,
    DEFAULT_OPTIONS,
    ERRORS
} from '#constants';
import { isString, isUndefined } from '#utilities';

export class ColorParserContext {

    constructor(parsers: Record<ColorModel, ColorParser>) {
        this._parsers = parsers;
    }

    private _parsers: Record<ColorModel, ColorParser>;

    getParser(input: ColorInput): ColorParser {
        const parser = Object.values(this._parsers).find(parser => parser.supports(input));
        if (parser) {
            return parser;
        }
        throw new Error(ERRORS.NOT_ACCEPTED_INPUT);
    }

    parse(input: ColorInput): ColorObject {
        const parser = this.getParser(input);
        return parser.parse(input, this);
    }

    convert<T extends ColorObject>(
        input: ColorInput,
        model: ColorModel,
        decimals: number = DEFAULT_OPTIONS.decimals,
        withAlpha = false
    ): T {
        const color = this.parse(input);
        const parser = this._parsers[model];
        return parser.convert(color, decimals, withAlpha) as T;
    }

    convertCSS(
        input: ColorInput,
        model: ColorModel,
        options: InputOptions = {},
        withAlpha = false
    ): string {
        const color = this.parse(input);
        const parser = this._parsers[model];
        return parser.convertCSS(color, options, withAlpha);
    }

}

export abstract class ColorParser {
    public abstract supports(input: ColorInput): boolean
    public abstract parse(input: ColorInput, context: ColorParserContext): ColorObject;
    public abstract convert(input: ColorObject, decimals: number, withAlpha: boolean): ColorObject;
    public abstract convertCSS(input: ColorObject, options: InputOptions, withAlpha: boolean): string;
    public abstract getCSSOptions(input: ColorInput): CSSOptionsBase;
    public abstract get model(): ColorModel;
    public hasAlpha(input: ColorInput): boolean {
        if (isString(input)) {
            return this.getCSSOptions(input).hasAlpha;
        }
        return !isUndefined(input.A);
    };
}