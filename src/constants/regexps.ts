import { ColorModel } from './enums';

/**
 * Regular exressions generated automatically from templates
 * The string templates are located in .plop/regexps-strings.js
 * To regenerate these regular expressions run pnpm compile:regexps
 * DO NOT REMOVE THE START AND END COMMENTS!
 */
// START REGEXPS
export const COLORREGS = {
    [ColorModel.HEX]    : /^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i,
    [ColorModel.RGB]    : /^rgba?\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,
    [ColorModel.HSL]    : /^hsla?\s*\(\s*(?:(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)%(?:\s*,\s*((?:\d*\.)?\d+))?|(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*((?:\d*\.)?\d+)%\s*((?:\d*\.)?\d+)%(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,
    [ColorModel.CIELab] : /^lab\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*(-?(?:\d*\.)?\d+%?)\s*(-?(?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,
    [ColorModel.CMYK]   : /^(?:device-cmyk|cmyk)\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/
};

export const HSL_HUE = /^(-?(?:\d*\.)?\d+)((?:deg|grad|rad|turn)?)$/;
// END REGEXPS

export const PCENT = /^(-?\d+(?:\.\d+)?|-?\.\d+)%$/;
export const HEX = /^0x([a-f\d]{1,2})$/i;
export const TEMPLATE_VAR = /\{(\d+)\}/g;
export const COMMAS_AND_NEXT_CHARS = /,( +|\d+)/g;
export const SPACES = / +/;
