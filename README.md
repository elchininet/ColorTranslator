<p align="center">
    <a href="https://elchininet.github.io/ColorTranslator/">
        <img src="https://raw.githubusercontent.com/elchininet/ColorTranslator/master/src/%40demo/images/logo.png" width="500" title="ColorTranslator" />
    </a>
    <br>
    A JavaScript library, written in TypeScript, to convert among different color models
</p>

[![Deployment Status](https://github.com/elchininet/ColorTranslator/actions/workflows/deploy.yaml/badge.svg)](https://github.com/elchininet/ColorTranslator/actions/workflows/deploy.yaml) &nbsp; [![Coverage Status](https://coveralls.io/repos/github/elchininet/ColorTranslator/badge.svg?branch=master)](https://coveralls.io/github/elchininet/ColorTranslator?branch=master) &nbsp; [![npm version](https://badge.fury.io/js/colortranslator.svg)](https://badge.fury.io/js/colortranslator)

## Demo 

https://elchininet.github.io/ColorTranslator/

## Installation

#### Using NPM

```javascript
npm install colortranslator
```

#### Using Yarn

```javascript
yarn add colortranslator
```

#### In the browser

It is possible to include a compiled version of the package directly in an HTML file. It will create a global `colortranslator` object containing all the exported modules that can be accessed from anywhere in your JavaScript code.

1. Copy the JavaScript file `colortranslator.js`, located in the `dist/web/` folder
2. Put it in the folder that you prefer in your web server
3. Include it in your HTML file

```html
<script src="wherever/you/installed/colortranslator.js"></script>
```

```javascript
/* There will be a global variable named colortranslator containing all the modules */
colortranslator.ColorTranslator;
colortranslator.Harmony;
colortranslator.Mix;
```

#### Importing using CommonJS

```javascript
const { ColorTranslator, Harmony, Mix } = require('colortranslator');
```

#### Importing using ES6 modules

```javascript
import { ColorTranslator, Harmony, Mix } from 'colortranslator';
```

## Scripts

#### build

`npm run build`

Transpiles the TypeScript code and creates three bundles in the `dist` folder (`index.js` for commonjs, `esm/index.js` for ESM, and `web/colortranslator.js` to use directly in the browser).

#### test

`npm run test`

Runs multiple dynamic tests converting from / to all the color models available (excepting CMYK) using a table of colors.

#### lint

`npm run lint`

Runs eslint in source files.

#### demo

`npm run demo`

Opens a development server that provides live reloading using [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Some demo examples located in the `@demo` folder will be shown. You can modify the code of the demos and the changes will be live reloaded in the browser.

## API

> **Note:** The conversion to a CMYK color is made taking a random value of black as a base (in this case, taking the greater value from red, green or blue). When a value of black is assumed, the rest of the colors can be calculated from it. The result will be visually similar to the original light color, but if you try to convert it back you will not obtain the same original value.

#### Input

The most wonderful thing about `colortranslator` is that you don‘t need to specify the input that you are using, the library will recognise it automatically. The input can be a CSS string or an object:

###### CSS string inputs

| Example of CSS string inputs          | Description                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `fuchsia`                             | Color keyword                                                                                                      |
| `#FF00FF`                             | Hexadecimal color                                                                                                  |
| `#F0F`                                | Shorthand hexadecimal color                                                                                        |
| `#FF00FF80`                           | Hexadecimal color with alpha                                                                                       |
| `#F0FF`                               | Shorthand hexadecimal color with alpha                                                                             |
| `rgb(255, 0, 255)`                    | Functional RGB notation                                                                                            |
| `rgba(255, 0, 255, 0.5)`              | Functional RGB notation with alpha                                                                                 |
| `rgb(255 0 255)`                      | Functional RGB notation (CSS Colors 4 space-separated)                                                             |
| `rgba(255 0 255 / 0.5)`               | Functional RGB notation with alpha (CSS Colors 4 space-separated)                                                  |
| `rgba(255 0 255 / 50%)`               | Functional RGB notation CSS with alpha in percenatages (Colors 4 space-separated)                                  |
| `hsl(300, 100%, 50%)`                 | Functional HSL notation                                                                                            |
| `hsl(300grad, 100%, 50%)`             | Functional HSL notation with hue in grads                                                                          |
| `hsl(300deg, 100%, 50%)`              | Functional HSL notation with hue in degrees                                                                        |
| `hsl(5.24rad, 100%, 50%)`             | Functional HSL notation with hue in radians                                                                        |
| `hsl(0.83turn, 100%, 50%)`            | Functional HSL notation with hue in turns                                                                          |
| `hsla(300, 100%, 50%, 0.5)`           | Functional HSL notation with alpha                                                                                 |
| `hsl(300 100% 50%)`                   | Functional HSL notation (CSS Colors 4 space-separated)                                                             |
| `hsla(300 100% 50% / 0.5)`            | Functional HSL notation with alpha (CSS Colors 4 space-separated)                                                  |
| `hsla(300 100% 50% / 50%)`            | Functional HSL notation with alpha in percentages (CSS Colors 4 space-separated)                                   |
| `cmyk(0%, 100%, 100%, 0%)`            | Functional CMYK notation with percentages                                                                          |
| `cmyk(0%, 100%, 100%, 0%, 1)`         | Functional CMYK notation with percentages and alpha                                                                |
| `cmyk(0% 100% 100% 0%)`               | Functional CMYK notation with percentages (CSS Colors 4 space-separated)                                           |
| `cmyk(0% 100% 100% 0% / 1)`           | Functional CMYK notation with percentages and alpha (CSS Colors 4 space-separated)                                 |
| `cmyk(0% 100% 100% 0% / 100%)`        | Functional CMYK notation with percentages and alpha in percentages (CSS Colors 4 space-separated)                  |
| `cmyk(0, 1, 1, 0)`                    | Functional CMYK notation with numbers                                                                              |
| `cmyk(0, 1, 1, 0, 1)`                 | Functional CMYK notation with numbers and alpha                                                                    |
| `cmyk(0 1 1 0)`                       | Functional CMYK notation with numbers (CSS Colors 4 space-separated)                                               |
| `cmyk(0 1 1 0 / 1)`                   | Functional CMYK notation with numbers and alpha (CSS Colors 4 space-separated)                                     |
| `cmyk(0 1 1 0 / 100%)`                | Functional CMYK notation with numbers and alpha in percentages (CSS Colors 4 space-separated)                      |
| `device-cmyk(0%, 100%, 100%, 0%)`     | Device-dependent functional CMYK notation with percentages                                                         |
| `device-cmyk(0%, 100%, 100%, 0%, 1)`  | Device-dependent functional CMYK notation with percentages and alpha                                               |
| `device-cmyk(0% 100% 100% 0%)`        | Device-dependent functional CMYK notation with percentages (CSS Colors 4 space-separated)                          |
| `device-cmyk(0% 100% 100% 0% / 1)`    | Device-dependent functional CMYK notation with percentages and alpha (CSS Colors 4 space-separated)                |
| `device-cmyk(0% 100% 100% 0% / 100%)` | Device-dependent functional CMYK notation with percentages and alpha in percentages (CSS Colors 4 space-separated) |
| `device-cmyk(0, 1, 1, 0)`             | Device-dependent functional CMYK notation with numbers                                                             |
| `device-cmyk(0, 1, 1, 0, 1)`          | Device-dependent functional CMYK notation with numbers and alpha                                                   |
| `device-cmyk(0 1 1 0)`                | Device-dependent functional CMYK notation with numbers (CSS Colors 4 space-separated)                              |
| `device-cmyk(0 1 1 0 / 1)`            | Device-dependent functional CMYK notation with numbers and alpha (CSS Colors 4 space-separated)                    |
| `device-cmyk(0 1 1 0 / 100%)`         | Device-dependent functional CMYK notation with numbers and alpha in percentages (CSS Colors 4 space-separated)     |


###### Object inputs

| Example of object inputs                       | Description                               |
| ---------------------------------------------- | ----------------------------------------- |
| `{r: "0xFF", g: "0x00", b: "0xFF"}`            | Hexadecimal color                         |
| `{r: "0xF", g: "0x0", b: "0xF"}`               | Shorthand hexadecimal color               |
| `{r: "0xFF", g: "0x00", b: "0xFF", a: "0x80"}` | Hexadecimal color with alpha              |
| `{r: "0xF", g: "0x0", b: "0xF", a: "0xF"}`     | Shorthand hexadecimal color with alpha    |
| `{r: 255, g: 0, b: 255}`                       | RGB notation                              |
| `{r: 255, g: 0, b: 255, a: 0.5}`               | RGB notation with alpha                   |
| `{h: 300, s: "100%", l: "50%"}`                | HSL notation using percentages            |
| `{h: 300, s: 100, l: 50}`                      | HSL notation using numbers                |
| `{h: 300, s: "100%", l: "50%", a: 0.5}`        | HSL notation with alpha using percentages |
| `{h: 300, s: 100, l: 50, a: 0.5}`              | HSL notation with alpha using numbers     |
| `{c: "0%", m: "100%", y: "100%", k: "0%"}`     | CMYK notation using percentages           |
| `{c: 0, m: 1, y: 1, k: 0}`                     | CMYK notation using numbers               |

#### Class instantiation

It is possible to instantiate the class using any of the previous inputs:

###### Class instantiation examples

```javascript
const keyword = new ColorTranslator('deeppink');

const hex = new ColorTranslator('#FF00FF');

const rgb = new ColorTranslator('rgb(255, 0, 0)');

const hsl = new ColorTranslator('hsl(50, 20%, 90%)');

const hsla = new ColorTranslator({ r: 115, g: 200, b: 150, a: 0.5 });

const cmyk = new ColorTranslator({ c: 100, m: 100, y: 0, k: 0 });
```

#### Class public methods

There are 11 chainable public methods and all of them accept a number as input:

| Public methods | Input           | Description                                        |
| -------------- | --------------- | -------------------------------------------------- |
| setH           | 0 ≤ input ≤ 360 | Set the color hue                                  |
| setS           | 0 ≤ input ≤ 100 | Set the color saturation percentage                |
| setL           | 0 ≤ input ≤ 100 | Set the color lightness percentage                 |
| setR           | 0 ≤ input ≤ 255 | Set the red value of the color                     |
| setG           | 0 ≤ input ≤ 255 | Set the green value of the color                   |
| setB           | 0 ≤ input ≤ 255 | Set the blue value of the color                    |
| setC           | 0 ≤ input ≤ 100 | Set the CMYK cyan percentage value of the color    |
| setM           | 0 ≤ input ≤ 100 | Set the CMYK magenta percentage value of the color |
| setY           | 0 ≤ input ≤ 100 | Set the CMYK yellow percentage value of the color  |
| setK           | 0 ≤ input ≤ 100 | Set the CMYK black percentage value of the color   |
| setA           | 0 ≤ input ≤ 1   | Set the alpha value of the color                   |

###### Class public methods examples

You can also consult the [demo 1](https://elchininet.github.io/ColorTranslator/#demo1) and the [demo 2](https://elchininet.github.io/ColorTranslator/#demo2) to check the use of the public methods.

```javascript
const color = new ColorTranslator('#FF00FF');

color
  .setH(120)
  .setS(80)
  .setA(0.5);

color
  .setR(255)
  .setG(150)
  .setA(0.25);
```

#### Class public readonly properties

There are 7 properties to get the CSS representation of the color:

| Property | Description                                         |
| -------- | --------------------------------------------------- |
| HEX      | Get the the object hex representation of the color  |
| HEXA     | Get the the object hexa representation of the color |
| RGB      | Get the the object rgb representation of the color  |
| RGBA     | Get the the object rgba representation of the color |
| HSL      | Get the the object hsl representation of the color  |
| HSLA     | Get the the object hsla representation of the color |
| CMYK     | Get the the object cmyk representation of the color |

There are 7 properties to get the object representation of the color:

| Property   | Description                                         |
| ---------- | --------------------------------------------------- |
| HEXObject  | Get the the object hex representation of the color  |
| HEXAObject | Get the the object hexa representation of the color |
| RGBObject  | Get the the object rgb representation of the color  |
| RGBAObject | Get the the object rgba representation of the color |
| HSLObject  | Get the the object hsl representation of the color  |
| HSLAObject | Get the the object hsla representation of the color |
| CMYKObject | Get the the object cmyk representation of the color |

There are 11 properties to get the individual color values:

| Property | Description                                        |
| -------- | -------------------------------------------------- |
| H        | Get the color hue                                  |
| S        | Get the color saturation percentage                |
| L        | Get the color lightness percentage                 |
| R        | Get the red value of the color                     |
| G        | Get the green value of the color                   |
| B        | Get the blue value of the color                    |
| C        | Get the CMYK cyan percentage value of the color    |
| M        | Get the CMYK magenta percentage value of the color |
| Y        | Get the CMYK yellow percentage value of the color  |
| K        | Get the CMYK black percentage value of the color   |
| A        | Get the alpha value of the color                   |

###### Class public properties examples

You can also consult the [demo 1](https://elchininet.github.io/ColorTranslator/#demo1) and the [demo 2](https://elchininet.github.io/ColorTranslator/#demo2) to check the use of the public properties.

```javascript
const color = new ColorTranslator('#FF00FF');

color.R; // 255
color.G; // 0
color.B; // 255
color.RGB; // rgb(255,0,255)
color.HSLA; // hsla(300,100%,50%,1)
```

#### Class static methods

For the static methods, it is not needed to specify the input color model, the API will detect the format automatically. It is only needed to specify to which color model one wants to convert calling the specific static method.

There are 22 static methods available, 7 of them to convert colors, 6 to create color blends, one to get shades, one to get tints, 6 to mix colors, and one to create color harmonies.

###### Color conversion static methods

The static methods to convert colors accept any of the mentioned inputs as the first parameter. The second parameter is optional and it specifies if the output should be a CSS string or an object:

```typescript
convertColorStaticMethod(
  color: string | object,
  css: boolean = true
)
```
###### Color conversion static methods description

| Static method | Description                                    |
| ------------- | ---------------------------------------------- |
| toHEX         | Convert to an hexadecimal notation             |
| toHEXA        | Convert to an hexadecimal notation with alpha  |
| toRGB         | Convert to an RGB notation                     |
| toRGBA        | Convert to an RGB notation with alpha          |
| toHSL         | Convert to an HSL notation                     |
| toHSLA        | Convert to an HSL notation with alpha          |
| toCMYK        | Convert to a CMYK notation                     |

###### Color conversion static methods examples

```javascript
ColorTranslator.toHEX('gold'); // #FFD700

ColorTranslator.toRGB('#FF00FF'); // rgb(255,0,255)

ColorTranslator.toRGBA('hsl(50, 20%, 90%)'); // rgba(235,233,224,1)

ColorTranslator.toHSL('rgb(255, 0, 0)'); // hsl(0,100%,50%)

ColorTranslator.toHSLA('rgba(0, 255, 255, 0.5)'); // hsla(180,100%,50%,0.5)

ColorTranslator.toCMYK('#F0F', false); // {c: 0, m: 100, y: 0, k: 0}

ColorTranslator.toCMYK('#F0F'); // cmyk(0%,100%,0%,0%)

ColorTranslator.toRGB({ h: 115, s: '70%', l: '45%' }); // rgb(48,195,34)

ColorTranslator.toHSLA({ r: 115, g: 200, b: 150, a: 0.5 }); // hsla(145,44%,62%,0.5)
```

You can also consult the [demo 3](https://elchininet.github.io/ColorTranslator/#demo3), and the [demo 4](https://elchininet.github.io/ColorTranslator/#demo4) to check the use of these static methods.

###### Color blends static methods

The static methods to create color blends accept any of the mentioned inputs as the first and second parameter, the third parameter is optional and it is the number of steps of the blending, and the fourth parameter is also optional and it specifies if the output colors should be CSS strings or objects:

```typescript
getBlendColorsStaticMethod(
  fromColor: string | object,
  toColor: string | object,
  steps: number = 5,
  css: boolean = true
)
```

###### Color blends static methods description

| Static method | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| getBlendHEX   | Create an array relative to the blend between two colors in hexadecimal notation            |  
| getBlendHEXA  | Create an array relative to the blend between two colors in hexadecimal notation with alpha |
| getBlendRGB   | Create an array relative to the blend between two colors in RGB notation                    |
| getBlendRGBA  | Create an array relative to the blend between two colors in RGB notation with alpha         |
| getBlendHSL   | Create an array relative to the blend between two colors in HSL notation                    |
| getBlendHSLA  | Create an array relative to the blend between two colors in HSL notation with alpha         |

###### Color blends static methods examples

```javascript
ColorTranslator.getBlendHEX('#FF0000', '#0000FF', 5);

// [
//   "#FF0000",
//   "#BF003F",
//   "#7F007F",
//   "#3F00BF",
//   "#0000FF"
// ]

ColorTranslator.getBlendHSLA('#FF000000', '#0000FFFF', 3);

// [
//   "hsla(0,100%,50%,0)",
//   "hsla(300,100%,25%,0.5)",
//   "hsla(240,100%,50%,1)"
// ]

ColorTranslator.getBlendRGBA('#F000', 'rgba(0,0,255,1)', 5, false);

// [
//   {r: 255, g: 0, b: 0, a: 0},
//   {r: 191.25, g: 0, b: 63.75, a: 0.25},
//   {r: 127.5, g: 0, b: 127.5, a: 0.5},
//   {r: 63.75, g: 0, b: 191.25, a: 0.75},
//   {r: 0, g: 0, b: 255, a: 1}
// ]
```

You can also consult the [demo 5](https://elchininet.github.io/ColorTranslator/#demo5) to check the use of these static methods.

###### Color shades and color tints static methods

The static methods to get [shades or tints of a color](https://en.m.wikipedia.org/wiki/Tints_and_shades) accept any of the mentioned inputs as the first parameter, and a second parameter that specifies the number of shades or tints that should be returned. This method will return the colors in the same format that was sent as input:

```typescript
getShades(
  color: string | object,
  shades: number
)

getTints(
  color: string | object,
  tints: number
)
```

###### Color shades and color tints static methods description

| Static method | Description                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------- |
| getShades     | Get shades of a colour (mix the color with black increasing its darkness)                   |  
| getTints      | Get tints of a colour (mix the color with white increasing its lightness)                   |


###### Color shades and color tints static methods examples

```javascript
ColorTranslator.getShades('#FF0000', 5);

// [
//   "#D40000",
//   "#AA0000",
//   "#800000",
//   "#550000",
//   "#2A0000"
// ]

ColorTranslator.getTints({r: 255, g: 0, b: 0, a: 0.5}, 5);

// [
//   {r: 255, g: 43, b: 43, a: 0.5},
//   {r: 255, g: 85, b: 85, a: 0.5},
//   {r: 255, g: 128, b: 128, a: 0.5},
//   {r: 255, g: 170, b: 170, a: 0.5},
//   {r: 255, g: 213, b: 213, a: 0.5}
// ]
```

You can also consult the [demo 6](https://elchininet.github.io/ColorTranslator/#demo6) to check the use of these static methods.

###### Color mix static methods

The static methods to mix colors accept an array of any of the mentioned inputs as the first parameter. The second parameter is optional and specifies the mixing mode (by default it will be `Mix.ADDITIVE`). The third parameter is also optional and it specifies if the output should be a CSS string or an object:

> **Note:** The subtractive mix simulates the mixing of pigments, to achieve this, the rgb colors are converted to ryb color model, the addition is performed in this mode and at the end the result is converted back to rgb. The result is OK most of the time, but as this is not a real mix of pigments, sometimes the result could differ from the reality.

```typescript
getMixColorsStaticMethod(
  colors: [string | object][],
  mode: Mix = Mix.ADDITIVE,
  css: boolean = true
)
```

###### Color mix static methods description

| Static method | Description                                                        |
| ------------- | -------------------------------------------------------------------|
| getMixHEX     | Get the mix of the input colors in hexadecimal notation            |  
| getMixHEXA    | Get the mix of the input colors in hexadecimal notation with alpha |
| getMixRGB     | Get the mix of the input colors in RGB notation                    |
| getMixRGBA    | Get the mix of the input colors in RGB notation with alpha         |
| getMixHSL     | Get the mix of the input colors in HSL notation                    |
| getMixHSLA    | Get the mix of the input colors in HSL notation with alpha         |

###### Color mix static methods examples

```javascript
ColorTranslator.getMixHEX(['#FF0000', '#0000FF']);

// #FF00FF

ColorTranslator.getMixHSL(['rgba(255, 0, 0, 1)', '#00FF00']);

// hsl(60,100%,50%)

ColorTranslator.getMixHEXA(['#F00', 'rgb(0, 0, 255)'], Mix.ADDITIVE, true);

// { r: '0xFF', g: '0x00', b: '0xFF', a: '0xFF' }

ColorTranslator.getMixHEX(['#FF0', '#F00'], Mix.SUBTRACTIVE);

// #FF7F00
```

You can also consult the [demo 7](https://elchininet.github.io/ColorTranslator/#demo7) and [demo 8](https://elchininet.github.io/ColorTranslator/#demo8) to check the use of these static methods.

###### Color harmonies static method

The static method to create color harmonies accepts three parmeters, the first one could be any of the mentioned inputs, the second one is optional and it is to specify the kind of harmony (by default it will be `Harmony.COMPLEMENTARY`), and the third one is also optional and it specifies if the returned harmony is based on additive or subtractive colors (by default it will be `Mix.ADDITIVE`). This method will return the colors in the same format that was sent as input:

```typescript
getHarmony(
  color: string | object
  harmony: Harmony = Harmony.COMPLEMENTARY,
  mode: Mix = Mix.ADDITIVE
)
```

###### Color harmonies static method description

| Static method | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| getHarmony    | Return an array of colors representing the harmony requested. The color output will be the same that was sent as input |

###### Available armonies

| Harmony             | Description                                                              | Returned colors |
| ------------------- | ------------------------------------------------------------------------ | --------------- |
| ANALOGOUS           | Returns the same color plus the two relative analogous colours           | 3               |
| COMPLEMENTARY       | Returns the same color plus the relative complementary color             | 2               |
| SPLIT_COMPLEMENTARY | Returns the same color plus the two relative split complementary colours | 3               |
| SQUARE              | Returns the same color plus the three relative evenly square colours     | 4               |
| TETRADIC            | Returns the same color plus the three relative tetradic colours          | 4               |
| TRIADIC             | Returns the same color plus the two relative evenly triadic colors       | 3               |

###### Color harmonies static method examples

```javascript
ColorTranslator.getHarmony('#FF00FF');

// ["#FF00FF", "#00FF00"]

ColorTranslator.getHarmony('rgba(0, 255, 255, 0.5)', Harmony.ANALOGOUS);

// [
//   "rgba(0,255,255,0.5)",
//   "rgba(0,128,255,0.5)",
//   "rgba(0,255,128,0.5)"
// ]

ColorTranslator.getHarmony({ r: 115, g: 200, b: 150, a: 0.5 }, Harmony.COMPLEMENTARY);

// [
//   {r: 115, g: 201, b: 151, a: 0.5},
//   {r: 201, g: 115, b: 165, a: 0.5}
// ]

ColorTranslator.getHarmony('#FF0000', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE);

// ["#FF0000", "#00FF00"]

```

You can also consult the [demo 9](https://elchininet.github.io/ColorTranslator/#demo9) and [demo 10](https://elchininet.github.io/ColorTranslator/#demo10) to check the use of this static method.

## TypeScript Support

The package has its own type definitions, so it can be used in a `TypeScript` project without any issues. The next interfaces are exposed and can be imported in your project:

###### HEXObject

This type is returned by the `HEXObject`, and `HEXAObject` properties, the `toHEX`, `toHEXA`, `getBlendHEX`, `getBlendHEXA`, `getMixHEX`, and `getMixHEXA` methods (when the `css` property is `false`), and the `getHarmony` method (when the input is an `HEXObject`).

```typescript
interface HEXObject {
    r: string;
    g: string;
    b: string;
    a?: string;
}
```

###### RGBObject

This type is returned by the `RGBObject`, and `RGBAObject` properties, the `toRGB`, `toRGBA`, `getBlendRGB`, `getBlendRGBA`, `getMixRGB`, and `getMixRGBA` methods (when the `css` property is `false`), and the `getHarmony` method (when the input is an `RGBObject`).

```typescript
interface RGBObject {
    r: number;
    g: number;
    b: number;
    a?: number;
}
```

###### HSLObject

This type is returned by the `HSLObject`, and `HSLAObject` properties, the `toHSL`, `toHSLA`, `getBlendHSL`, `getBlendHSLA`, `getMixHSL`, and `getMixHSLA` methods (when the `css` property is `false`), and the `getHarmony` method (when the input is an `HSLObject`).

```typescript
interface HSLObject {
    h: number;
    s: number;
    l: number;
    a?: number;
}
```

###### CMYKObject

This type is returned by the `CMYKObject` property, and the `toCMYK` method.

```typescript
interface CMYKObject {
    c: number;
    m: number;
    y: number;
    k: number;
}
```