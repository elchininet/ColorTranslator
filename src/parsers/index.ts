import { ColorModel } from '#constants';
import { ColorParserContext } from '#classes/ColorParserContext';
import { HEXParser } from '#classes/HEXParser';
import { RGBParser } from '#classes/RGBParser';
import { HSLParser } from '#classes/HSLParser';
import { HWBParser } from '#classes/HWBParser';
import { CIELabParser } from '#classes/CIELabParser';
import { LCHParser } from '#classes/LCHParser';
import { CMYKParser } from '#classes/CMYKParser';

export const hexParser = new HEXParser();
export const rgbParser = new RGBParser();
export const hslParser = new HSLParser();
export const hwbParser = new HWBParser();
export const cieLabParser = new CIELabParser();
export const lchParser = new LCHParser();
export const cmykParser = new CMYKParser();

export const colorParserContext = new ColorParserContext({
    [ColorModel.HEX]: hexParser,
    [ColorModel.RGB]: rgbParser,
    [ColorModel.HSL]: hslParser,
    [ColorModel.HWB]: hwbParser,
    [ColorModel.CIELab]: cieLabParser,
    [ColorModel.LCH]: lchParser,
    [ColorModel.CMYK]: cmykParser
});
