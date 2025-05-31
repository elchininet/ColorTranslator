import { ColorModel } from './enums';

/**
 * Regular exressions generated automatically from templates
 * The string templates are located in .plop/regexps-strings.js
 * To regenerate these regular expressions run pnpm compile:regexps
 * DO NOT REMOVE THE START AND END COMMENTS!
 */
// START REGEXPS
export const COLORREGS = {
    [ColorModel.HEX]: /^#(?:(?<r>[a-f\d])(?<g>[a-f\d])(?<b>[a-f\d])(?<a>[a-f\d])?|(?<rr>[a-f\d]{2})(?<gg>[a-f\d]{2})(?<bb>[a-f\d]{2})(?<aa>[a-f\d]{2})?)$/i,
    [ColorModel.RGB]: /^rgba?\s*\(\s*(?:(?<r_legacy>(?:\d*\.)?\d+%?)\s*,\s*(?<g_legacy>(?:\d*\.)?\d+%?)\s*,\s*(?<b_legacy>(?:\d*\.)?\d+%?)(?:\s*,\s*(?<a_legacy>(?:\d*\.)?\d+))?|(?<r>(?:\d*\.)?\d+%?)\s+(?<g>(?:\d*\.)?\d+%?)\s+(?<b>(?:\d*\.)?\d+%?)(?:\s*\/\s*(?<a>(?:\d*\.)?\d+%?))?|from\s+(?<from>(?:\w+|\w+\(\s*[^())]+\s*\)|\w+\(from\s+\w+\(.*\)\s*\)|#[a-fA-F\d]+))\s+(?<relative_r>(?:[rgb]|(?:\d*\.)?\d+|calc\([rgb()/*\-+\d.\s]+\)))\s+(?<relative_g>(?:[rgb]|(?:\d*\.)?\d+|calc\([rgb()/*\-+\d.\s]+\)))\s+(?<relative_b>(?:[rgb]|(?:\d*\.)?\d+|calc\([rgb()/*\-+\d.\s]+\)))(?:\s*\/\s*(?<relative_a>(?:(?:\d*\.)?\d+%?|calc\([()/*\-+\d.\s\w]*(?:alpha)?[()/*\-+\d.\s\w]*\)|alpha)))?)\s*\)$/,
    [ColorModel.HWB]: /^hwb\s*\(\s*(?:(?<h>(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s+(?<w>(?:\d*\.)?\d+)%\s+(?<b>(?:\d*\.)?\d+)%(?:\s*\/\s*(?<a>(?:\d*\.)?\d+%?))?|from\s+(?<from>(?:\w+|\w+\(\s*[^())]+\s*\)|\w+\(from\s+\w+\(.*\)\s*\)|#[a-fA-F\d]+))\s+(?<relative_h>(?:[hwb]|(?:\d*\.)?\d+|calc\([hwb()/*\-+\d.\s]+\)))\s+(?<relative_w>(?:[hwb]|(?:\d*\.)?\d+|calc\([hwb()/*\-+\d.\s]+\)))%?\s+(?<relative_b>(?:[hwb]|(?:\d*\.)?\d+|calc\([hwb()/*\-+\d.\s]+\)))%?(?:\s*\/\s*(?<relative_a>(?:(?:\d*\.)?\d+%?|calc\([()/*\-+\d.\s\w]*(?:alpha)?[()/*\-+\d.\s\w]*\)|alpha)))?)\s*\)$/,
    [ColorModel.HSL]: /^hsla?\s*\(\s*(?:(?<h_legacy>-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*,\s*(?<s_legacy>(?:\d*\.)?\d+)%\s*,\s*(?<l_legacy>(?:\d*\.)?\d+)%(?:\s*,\s*(?<a_legacy>(?:\d*\.)?\d+))?|(?<h>-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s+(?<s>(?:\d*\.)?\d+)%\s+(?<l>(?:\d*\.)?\d+)%(?:\s*\/\s*(?<a>(?:\d*\.)?\d+%?))?|from\s+(?<from>(?:\w+|\w+\(\s*[^())]+\s*\)|\w+\(from\s+\w+\(.*\)\s*\)|#[a-fA-F\d]+))\s+(?<relative_h>(?:[hsl]|(?:\d*\.)?\d+|calc\([hsl()/*\-+\d.\s]+\)))\s+(?<relative_s>(?:[hsl]|(?:\d*\.)?\d+|calc\([hsl()/*\-+\d.\s]+\)))%?\s+(?<relative_l>(?:[hsl]|(?:\d*\.)?\d+|calc\([hsl()/*\-+\d.\s]+\)))%?(?:\s*\/\s*(?<relative_a>(?:(?:\d*\.)?\d+%?|calc\([()/*\-+\d.\s\w]*(?:alpha)?[()/*\-+\d.\s\w]*\)|alpha)))?)\s*\)$/,
    [ColorModel.CIELab]: /^lab\s*\(\s*(?:(?<L>(?:\d*\.)?\d+%?)\s+(?<a>-?(?:\d*\.)?\d+%?)\s+(?<b>-?(?:\d*\.)?\d+%?)(?:\s*\/\s*(?<A>(?:\d*\.)?\d+%?))?|from\s+(?<from>(?:\w+|\w+\(\s*[^())]+\s*\)|\w+\(from\s+\w+\(.*\)\s*\)|#[a-fA-F\d]+))\s+(?<relative_L>(?:[lab]|(?:\d*\.)?\d+|calc\([lab()/*\-+\d.\s]+\)))\s+(?<relative_a>(?:[lab]|(?:\d*\.)?\d+|calc\([lab()/*\-+\d.\s]+\)))\s+(?<relative_b>(?:[lab]|(?:\d*\.)?\d+|calc\([lab()/*\-+\d.\s]+\)))(?:\s*\/\s*(?<relative_A>(?:(?:\d*\.)?\d+%?|calc\([()/*\-+\d.\s\w]*(?:alpha)?[()/*\-+\d.\s\w]*\)|alpha)))?)\s*\)$/,
    [ColorModel.CMYK]: /^(?:device-cmyk|cmyk)\s*\(\s*(?:(?<c_legacy>(?:\d*\.)?\d+%?)\s*,\s*(?<m_legacy>(?:\d*\.)?\d+%?)\s*,\s*(?<y_legacy>(?:\d*\.)?\d+%?)\s*,\s*(?<k_legacy>(?:\d*\.)?\d+%?)(?:\s*,\s*(?<a_legacy>(?:\d*\.)?\d+))?|(?<c>(?:\d*\.)?\d+%?)\s+(?<m>(?:\d*\.)?\d+%?)\s+(?<y>(?:\d*\.)?\d+%?)\s+(?<k>(?:\d*\.)?\d+%?)(?:\s*\/\s*(?<a>(?:\d*\.)?\d+%?))?)\s*\)$/
};

export const CALC = {
    REGEXP: /^calc\(\s*(?<operation>[\d./*+-\w\s]+)\s*\)$/,
    SCOPED: /\(\s*([^()]+)\s*\)/g,
    DIVISION: /\s*(?<left>(?:(?:\d*\.)?\d+|\w+))\s*\/\s*(?<right>(?:(?:\d*\.)?\d+|\w+))\s*/,
    MULTIPLICATION: /\s*(?<left>(?:(?:\d*\.)?\d+|\w+))\s*\*\s*(?<right>(?:(?:\d*\.)?\d+|\w+))\s*/,
    SUM: /\s*(?<left>(?:(?:\d*\.)?\d+|\w+))\s*\+\s*(?<right>(?:(?:\d*\.)?\d+|\w+))\s*/,
    REST: /\s*(?<left>(?:(?:\d*\.)?\d+|\w+))\s*-\s*(?<right>(?:(?:\d*\.)?\d+|\w+))\s*/
};

export const HSL_HUE = /^(?<number>-?(?:\d*\.)?\d+)(?<units>(?:deg|grad|rad|turn)?)$/;
// END REGEXPS

export const PCENT = /^(-?\d+(?:\.\d+)?|-?\.\d+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;
export const TEMPLATE_VAR = /\{(\d+)\}/g;
export const COMMAS_AND_NEXT_CHARS = /,( +|\d+)/g;
export const SPACES = / +/;