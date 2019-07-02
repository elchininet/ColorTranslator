import { ColorInput, RGBOutput, HSLOutput, CMYKOutput } from '../../src/@types';
import { colortranslator as ct } from '../../src/colortranslator';

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
    cmyk: ColorInput;
    cmykObject: ColorInput;
};

export interface ColorFunction {
    name: string;
    func: (color: ColorInput, css?: boolean) => RGBOutput | HSLOutput | CMYKOutput;
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
};

export const COLORS = [
    {
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
        hslaObject: { h: 0, s: 100, l: 50, a: 1 },
        cmyk: 'device-cmyk(0%,100%,100%,0%)',
        cmykObject: { c: 0, m: 100, y: 100, k: 0 }
    },
    {
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
        hslaObject: { h: 120, s: 100, l: 50, a: 1 },
        cmyk: 'device-cmyk(100%,0%,100%,0%)',
        cmykObject: { c: 100, m: 0, y: 100, k: 0 }
    },
    {
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
        hslaObject: { h: 240, s: 100, l: 50, a: 1 },
        cmyk: 'device-cmyk(100%,100%,0%,0%)',
        cmykObject: { c: 100, m: 100, y: 0, k: 0 }
    },
    {
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
        hslaObject: { h: 300, s: 100, l: 50, a: 1 },
        cmyk: 'device-cmyk(0%,100%,0%,0%)',
        cmykObject: { c: 0, m: 100, y: 0, k: 0 }
    },
    {
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
        hslaObject: { h: 0, s: 0, l: 100, a: 1 },
        cmyk: 'device-cmyk(0%,0%,0%,0%)',
        cmykObject: { c: 0, m: 0, y: 0, k: 0 }
    },
    {
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
        hslaObject: { h: 0, s: 0, l: 0, a: 1 },
        cmyk: 'device-cmyk(0%,0%,0%,100%)',
        cmykObject: { c: 0, m: 0, y: 0, k: 100 }
    },
    {
        rgb: 'rgb(64,64,64)',
        rgbObject: { r: 64, g: 64, b: 64 },
        rgba: 'rgba(64,64,64,1)',
        rgbaObject: { r: 64, g: 64, b: 64, a: 1 },
        hex: '#404040',
        hexObject: { r: '0x40', g: '0x40', b: '0x40' },
        hexa: '#404040FF',
        hexaObject: { r: '0x40', g: '0x40', b: '0x40', a: '0xFF' },
        hsl: 'hsl(0,0%,25%)',
        hslObject: { h: 0, s: 0, l: 25 },
        hsla: 'hsla(0,0%,25%,1)',
        hslaObject: { h: 0, s: 0, l: 25, a: 1 },
        cmyk: 'device-cmyk(50%,50%,50%,50%)',
        cmykObject: { c: 50, m: 50, y: 50, k: 50 }
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