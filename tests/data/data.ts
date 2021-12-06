import { ColorInput, CMYKObjectGeneric } from '../../src/@types';
import { ColorTranslator as ct, Harmony, RGBObject, HSLObject, CMYKObject } from '../../src/';

export interface ColorProps {
    rgb: ColorInput;
    rgbObject: ColorInput;
    rgba: ColorInput;
    rgbaObject: ColorInput;
    hex: ColorInput;
    hexObject: ColorInput;
    hexa: ColorInput;
    hexaObject: ColorInput;
    hsl: ColorInput;
    hslObject: ColorInput;
    hsla: ColorInput;
    hslaObject: ColorInput;
}

export type ColorPropsWithKeyword = ColorProps & { keyword: string };

export interface CMYKProps {
    rgb: string;
    cmyk: string;
    cmykint: string;
    cmykObject: CMYKObjectGeneric;
    cmykIntObject: CMYKObject;
    cmykIntObject100: CMYKObject;
}

export interface ColorFunction {
    name: string;
    func: (color: ColorInput, css?: boolean) => RGBObject | HSLObject | CMYKObject | string;
    css: boolean;
}

export interface ColorFunctionProps {
    rgb: ColorFunction;
    rgbObject: ColorFunction;
    rgba: ColorFunction;
    rgbaObject: ColorFunction;
    hex: ColorFunction;
    hexObject: ColorFunction;
    hexa: ColorFunction;
    hexaObject: ColorFunction;
    hsl: ColorFunction;
    hslObject: ColorFunction;
    hsla: ColorFunction;
    hslaObject: ColorFunction;
    cmyk: ColorFunction;
    cmykObject: ColorFunction;
}

export const COLORS = [
    {
        keyword: 'red',
        rgb: 'rgb(255,0,0)',
        rgbObject: { r: 255, g: 0, b: 0 },
        rgba: 'rgba(255,0,0,1)',
        rgbaObject: { r: 255, g: 0, b: 0, a: 1 },
        hex: '#FF0000',
        hexObject: { r: '0xFF', g: '0x00', b: '0x00' },
        hexa: '#FF0000FF',
        hexaObject: { r: '0xFF', g: '0x00', b: '0x00', a: '0xFF' },
        hsl: 'hsl(0,100%,50%)',
        hslObject: { h: 0, s: 100, l: 50 },
        hsla: 'hsla(0,100%,50%,1)',
        hslaObject: { h: 0, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'lime',
        rgb: 'rgb(0,255,0)',
        rgbObject: { r: 0, g: 255, b: 0 },
        rgba: 'rgba(0,255,0,1)',
        rgbaObject: { r: 0, g: 255, b: 0, a: 1 },
        hex: '#00FF00',
        hexObject: { r: '0x00', g: '0xFF', b: '0x00' },
        hexa: '#00FF00FF',
        hexaObject: { r: '0x00', g: '0xFF', b: '0x00', a: '0xFF' },
        hsl: 'hsl(120,100%,50%)',
        hslObject: { h: 120, s: 100, l: 50 },
        hsla: 'hsla(120,100%,50%,1)',
        hslaObject: { h: 120, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'blue',
        rgb: 'rgb(0,0,255)',
        rgbObject: { r: 0, g: 0, b: 255 },
        rgba: 'rgba(0,0,255,1)',
        rgbaObject: { r: 0, g: 0, b: 255, a: 1 },
        hex: '#0000FF',
        hexObject: { r: '0x00', g: '0x00', b: '0xFF' },
        hexa: '#0000FFFF',
        hexaObject: { r: '0x00', g: '0x00', b: '0xFF', a: '0xFF' },
        hsl: 'hsl(240,100%,50%)',
        hslObject: { h: 240, s: 100, l: 50 },
        hsla: 'hsla(240,100%,50%,1)',
        hslaObject: { h: 240, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'magenta',
        rgb: 'rgb(255,0,255)',
        rgbObject: { r: 255, g: 0, b: 255 },
        rgba: 'rgba(255,0,255,1)',
        rgbaObject: { r: 255, g: 0, b: 255, a: 1 },
        hex: '#FF00FF',
        hexObject: { r: '0xFF', g: '0x00', b: '0xFF' },
        hexa: '#FF00FFFF',
        hexaObject: { r: '0xFF', g: '0x00', b: '0xFF', a: '0xFF' },
        hsl: 'hsl(300,100%,50%)',
        hslObject: { h: 300, s: 100, l: 50 },
        hsla: 'hsla(300,100%,50%,1)',
        hslaObject: { h: 300, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'white',
        rgb: 'rgb(255,255,255)',
        rgbObject: { r: 255, g: 255, b: 255 },
        rgba: 'rgba(255,255,255,1)',
        rgbaObject: { r: 255, g: 255, b: 255, a: 1 },
        hex: '#FFFFFF',
        hexObject: { r: '0xFF', g: '0xFF', b: '0xFF' },
        hexa: '#FFFFFFFF',
        hexaObject: { r: '0xFF', g: '0xFF', b: '0xFF', a: '0xFF' },
        hsl: 'hsl(0,0%,100%)',
        hslObject: { h: 0, s: 0, l: 100 },
        hsla: 'hsla(0,0%,100%,1)',
        hslaObject: { h: 0, s: 0, l: 100, a: 1 }
    },
    {
        keyword: 'black',
        rgb: 'rgb(0,0,0)',
        rgbObject: { r: 0, g: 0, b: 0 },
        rgba: 'rgba(0,0,0,1)',
        rgbaObject: { r: 0, g: 0, b: 0, a: 1 },
        hex: '#000000',
        hexObject: { r: '0x00', g: '0x00', b: '0x00' },
        hexa: '#000000FF',
        hexaObject: { r: '0x00', g: '0x00', b: '0x00', a: '0xFF' },
        hsl: 'hsl(0,0%,0%)',
        hslObject: { h: 0, s: 0, l: 0 },
        hsla: 'hsla(0,0%,0%,1)',
        hslaObject: { h: 0, s: 0, l: 0, a: 1 }
    },
    {
        keyword: 'gray',
        rgb: 'rgb(128,128,128)',
        rgbObject: { r: 128, g: 128, b: 128 },
        rgba: 'rgba(128,128,128,1)',
        rgbaObject: { r: 128, g: 128, b: 128, a: 1 },
        hex: '#808080',
        hexObject: { r: '0x80', g: '0x80', b: '0x80' },
        hexa: '#808080FF',
        hexaObject: { r: '0x80', g: '0x80', b: '0x80', a: '0xFF' },
        hsl: 'hsl(0,0%,50%)',
        hslObject: { h: 0, s: 0, l: 50 },
        hsla: 'hsla(0,0%,50%,1)',
        hslaObject: { h: 0, s: 0, l: 50, a: 1 }
    }
];

export const HEX3 = [
    {
        keyword: 'red',
        hex: '#F00',
        hexObject: { r: '0xF', g: '0x0', b: '0x0' },
        hexa: '#F00F',
        hexaObject: { r: '0xF', g: '0x0', b: '0x0', a: '0xF' },
        hexObjectPercent: { r: '100%', g: '0%', b: '0%' },
        rgbPercent: 'rgb(100%,0%,0%)',
        rgbaPercent: 'rgb(100%,0%,0%,1)',

        rgb: 'rgb(255,0,0)',
        rgbObject: { r: 255, g: 0, b: 0 },
        rgba: 'rgba(255,0,0,1)',
        rgbaObject: { r: 255, g: 0, b: 0, a: 1 },
        hsl: 'hsl(0,100%,50%)',
        hslObject: { h: 0, s: 100, l: 50 },
        hsla: 'hsla(0,100%,50%,1)',
        hslaObject: { h: 0, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'lime',
        hex: '#0F0',
        hexObject: { r: '0x0', g: '0xF', b: '0x0' },
        hexa: '#0F0F',
        hexaObject: { r: '0x0', g: '0xF', b: '0x0', a: '0xF' },
        hexObjectPercent: { r: '0%', g: '100%', b: '0%' },
        rgbPercent: 'rgb(0%,100%,0%)',
        rgbaPercent: 'rgb(0%,100%,0%,1)',

        rgb: 'rgb(0,255,0)',
        rgbObject: { r: 0, g: 255, b: 0 },
        rgba: 'rgba(0,255,0,1)',
        rgbaObject: { r: 0, g: 255, b: 0, a: 1 },
        hsl: 'hsl(120,100%,50%)',
        hslObject: { h: 120, s: 100, l: 50 },
        hsla: 'hsla(120,100%,50%,1)',
        hslaObject: { h: 120, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'blue',
        hex: '#00F',
        hexObject: { r: '0x0', g: '0x0', b: '0xF' },
        hexa: '#00FF',
        hexaObject: { r: '0x0', g: '0x0', b: '0xF', a: '0xF' },
        hexObjectPercent: { r: '0%', g: '0%', b: '100%' },
        rgbPercent: 'rgb(0%,0%,100%)',
        rgbaPercent: 'rgb(0%,0%,100%,1)',

        rgb: 'rgb(0,0,255)',
        rgbObject: { r: 0, g: 0, b: 255 },
        rgba: 'rgba(0,0,255,1)',
        rgbaObject: { r: 0, g: 0, b: 255, a: 1 },
        hsl: 'hsl(240,100%,50%)',
        hslObject: { h: 240, s: 100, l: 50 },
        hsla: 'hsla(240,100%,50%,1)',
        hslaObject: { h: 240, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'fuchsia',
        hex: '#F0F',
        hexObject: { r: '0xF', g: '0x0', b: '0xF' },
        hexa: '#F0FF',
        hexaObject: { r: '0xF', g: '0x0', b: '0xF', a: '0xF' },
        hexObjectPercent: { r: '100%', g: '0%', b: '100%' },
        rgbPercent: 'rgb(100%,0%,100%)',
        rgbaPercent: 'rgb(100%,0%,100%,1)',

        rgb: 'rgb(255,0,255)',
        rgbObject: { r: 255, g: 0, b: 255 },
        rgba: 'rgba(255,0,255,1)',
        rgbaObject: { r: 255, g: 0, b: 255, a: 1 },
        hsl: 'hsl(300,100%,50%)',
        hslObject: { h: 300, s: 100, l: 50 },
        hsla: 'hsla(300,100%,50%,1)',
        hslaObject: { h: 300, s: 100, l: 50, a: 1 }
    },
    {
        keyword: 'white',
        hex: '#FFF',
        hexObject: { r: '0xF', g: '0xF', b: '0xF' },
        hexa: '#FFFF',
        hexaObject: { r: '0xF', g: '0xF', b: '0xF', a: '0xF' },
        hexObjectPercent: { r: '100%', g: '100%', b: '100%' },
        rgbPercent: 'rgb(100%,100%,100%)',
        rgbaPercent: 'rgb(100%,100%,100%,1)',

        rgb: 'rgb(255,255,255)',
        rgbObject: { r: 255, g: 255, b: 255 },
        rgba: 'rgba(255,255,255,1)',
        rgbaObject: { r: 255, g: 255, b: 255, a: 1 },
        hsl: 'hsl(0,0%,100%)',
        hslObject: { h: 0, s: 0, l: 100 },
        hsla: 'hsla(0,0%,100%,1)',
        hslaObject: { h: 0, s: 0, l: 100, a: 1 }
    },
    {
        keyword: 'black',
        hex: '#000',
        hexObject: { r: '0x0', g: '0x0', b: '0x0' },
        hexa: '#000F',
        hexaObject: { r: '0x0', g: '0x0', b: '0x0', a: '0xF' },
        hexObjectPercent: { r: '0%', g: '0%', b: '0%' },
        rgbPercent: 'rgb(0%,0%,0%)',
        rgbaPercent: 'rgb(0%,0%,0%,1)',

        rgb: 'rgb(0,0,0)',
        rgbObject: { r: 0, g: 0, b: 0 },
        rgba: 'rgba(0,0,0,1)',
        rgbaObject: { r: 0, g: 0, b: 0, a: 1 },
        hsl: 'hsl(0,0%,0%)',
        hslObject: { h: 0, s: 0, l: 0 },
        hsla: 'hsla(0,0%,0%,1)',
        hslaObject: { h: 0, s: 0, l: 0, a: 1 }
    }
];

export const CMYK = [
    {
        rgb: '#F00',
        cmyk: 'cmyk(0%,100%,100%,0%)',
        cmykint: 'cmyk(0,1,1,0)',
        cmykObject: {c: '0%', m: '100%', y: '100%', k: '0%'},
        cmykIntObject: {c: 0, m: 1, y: 1, k: 0},
        cmykIntObject100: {c: 0, m: 100, y: 100, k: 0}
    },
    {
        rgb: '#0F0',
        cmyk: 'cmyk(100%,0%,100%,0%)',
        cmykint: 'cmyk(1,0,1,0)',
        cmykObject: {c: '100%', m: '0%', y: '100%', k: '0%'},
        cmykIntObject: {c: 1, m: 0, y: 1, k: 0},
        cmykIntObject100: {c: 100, m: 0, y: 100, k: 0}
    },
    {
        rgb: '#00F',
        cmyk: 'cmyk(100%,100%,0%,0%)',
        cmykint: 'cmyk(1,1,0,0)',
        cmykObject: {c: '100%', m: '100%', y: '0%', k: '0%'},
        cmykIntObject: {c: 1, m: 1, y: 0, k: 0},
        cmykIntObject100: {c: 100, m: 100, y: 0, k: 0}
    },
    {
        rgb: '#0FF',
        cmyk: 'cmyk(100%,0%,0%,0%)',
        cmykint: 'cmyk(1,0,0,0)',
        cmykObject: {c: '100%', m: '0%', y: '0%', k: '0%'},
        cmykIntObject: {c: 1, m: 0, y: 0, k: 0},
        cmykIntObject100: {c: 100, m: 0, y: 0, k: 0}
    },
    {
        rgb: '#FF0',
        cmyk: 'cmyk(0%,0%,100%,0%)',
        cmykint: 'cmyk(0,0,1,0)',
        cmykObject: {c: '0%', m: '0%', y: '100%', k: '0%'},
        cmykIntObject: {c: 0, m: 0, y: 1, k: 0},
        cmykIntObject100: {c: 0, m: 0, y: 100, k: 0}
    },
    {
        rgb: '#F0F',
        cmyk: 'cmyk(0%,100%,0%,0%)',
        cmykint: 'cmyk(0,1,0,0)',
        cmykObject: {c: '0%', m: '100%', y: '0%', k: '0%'},
        cmykIntObject: {c: 0, m: 1, y: 0, k: 0},
        cmykIntObject100: {c: 0, m: 100, y: 0, k: 0}
    }
];

export const FUNCTIONS = {
    rgb: { name: 'RGB CSS', func: ct.toRGB, css: true },
    rgbObject: { name: 'RGB object', func: ct.toRGB, css: false },
    rgba: { name: 'RGBA CSS', func: ct.toRGBA, css: true },
    rgbaObject: { name: 'RGBA object', func: ct.toRGBA, css: false },
    hex: { name: 'HEX CSS', func: ct.toHEX, css: true },
    hexObject: { name: 'HEX object', func: ct.toHEX, css: false },
    hexa: { name: 'HEXA CSS', func: ct.toHEXA, css: true },
    hexaObject: { name: 'HEXA object', func: ct.toHEXA, css: false },
    hsl: { name: 'HSL CSS', func: ct.toHSL, css: true },
    hslObject: { name: 'HSL object', func: ct.toHSL, css: false },
    hsla: { name: 'HSLA CSS', func: ct.toHSLA, css: true },
    hslaObject: { name: 'HSLA object', func: ct.toHSLA, css: false },
    cmyk: { name: 'CMYK CSS', func: ct.toCMYK, css: true },
    cmykObject: { name: 'CMYK object', func: ct.toCMYK, css: false }
};

export const ADDITIVE_MIXES = [
    {
        colors: ['#FF0000', '#0000FF'],
        mix: '#FF00FF'
    },
    {
        colors: ['#FF0000', '#00FF00'],
        mix: '#FFFF00'
    },
    {
        colors: ['#00FF00', '#0000FF'],
        mix: '#00FFFF'
    },
    {
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        mix: '#FFFFFF'
    }
];

export const SUBTRACTIVE_MIXES = [

    {
        colors: ['#FFFF00', '#FF0000'],
        mix: '#FF7F00'
    },
    {
        colors: ['#FF0000', '#0000FF'],
        mix: '#7F00FF'
    },
    {
        colors: ['#0000FF', '#FFFF00'],
        mix: '#00FF00'
    },
    {
        colors: ['#FFFF00', '#FF0000', '#0000FF'],
        mix: '#000000'
    }

];

export const ColorTranslator = ct;