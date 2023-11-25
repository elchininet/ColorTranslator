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
| `rgb(255 0 255)`                      | Functional RGB notation                                                                                            |
| `rgb(100% 0% 100%)`                   | Functional RGB notation with values in percentages                                                                 |
| `rgb(255 0 255 / 0.5)`                | Functional RGB notation with alpha                                                                                 |
| `rgb(255 0 255 / 50%)`                | Functional RGB notation CSS with alpha in percenatages                                                             |
| `rgb(100% 0% 100% / 0.5)`             | Functional RGB notation with values in percentages and alpha                                                       |
| `rgb(100% 0% 100% / 50%)`             | Functional RGB notation with values and alpha in percentages                                                       |
| `rgb(255, 0, 255)`                    | Functional RGB notation (CSS Colors 3 comma-separated)                                                             |
| `rgba(255, 0, 255, 0.5)`              | Functional RGB notation with alpha (CSS Colors 3 comma-separated)                                                  |
| `hsl(300 100% 50%)`                   | Functional HSL notation                                                                                            |
| `hsl(300deg 100% 50%)`                | Functional HSL notation with hue in degrees                                                                        |
| `hsl(270grad 100% 50%)`               | Functional HSL notation with hue in gradians                                                                       |
| `hsl(5.24rad 100% 50%)`               | Functional HSL notation with hue in radians                                                                        |
| `hsl(0.83turn 100% 50%)`              | Functional HSL notation with hue in turns                                                                          |
| `hsl(300 100% 50% / 0.5)`             | Functional HSL notation with alpha                                                                                 |
| `hsl(300 100% 50% / 50%)`             | Functional HSL notation with alpha in percentages                                                                  |
| `hsl(300, 100%, 50%)`                 | Functional HSL notation (Colors 3 comma-separated)                                                                 |
| `hsl(300deg, 100%, 50%)`              | Functional HSL notation with hue in degrees (CSS Colors 3 comma-separated)                                         |
| `hsl(270grad, 100%, 50%)`             | Functional HSL notation with hue in gradians (CSS Colors 3 comma-separated)                                        |
| `hsl(5.24rad, 100%, 50%)`             | Functional HSL notation with hue in radians (CSS Colors 3 comma-separated)                                         |
| `hsl(0.83turn, 100%, 50%)`            | Functional HSL notation with hue in turns (CSS Colors 3 comma-separated)                                           |
| `hsla(300, 100%, 50%, 0.5)`           | Functional HSL notation with alpha (CSS Colors 3 comma-separated)                                                  |
| `device-cmyk(0% 100% 100% 0%)`        | Device-dependent functional CMYK notation with percentages                                                         |
| `device-cmyk(0% 100% 100% 0% / 1)`    | Device-dependent functional CMYK notation with percentages and alpha                                               |
| `device-cmyk(0% 100% 100% 0% / 100%)` | Device-dependent functional CMYK notation with percentages and alpha in percentages                                |
| `device-cmyk(0%, 100%, 100%, 0%)`     | Device-dependent functional CMYK notation with percentages (CSS Colors 3 comma-separated)                          |
| `device-cmyk(0%, 100%, 100%, 0%, 1)`  | Device-dependent functional CMYK notation with percentages and alpha (CSS Colors 3 comma-separated)                |
| `device-cmyk(0 1 1 0)`                | Device-dependent functional CMYK notation with numbers                                                             |
| `device-cmyk(0 1 1 0 / 1)`            | Device-dependent functional CMYK notation with numbers and alpha                                                   |
| `device-cmyk(0 1 1 0 / 100%)`         | Device-dependent functional CMYK notation with numbers and alpha in percentages                                    |
| `device-cmyk(0, 1, 1, 0)`             | Device-dependent functional CMYK notation with numbers (CSS Colors 3 comma-separated)                              |
| `device-cmyk(0, 1, 1, 0, 1)`          | Device-dependent functional CMYK notation with numbers and alpha (CSS Colors 3 comma-separated)                    |
| `cmyk(0% 100% 100% 0%)`               | Functional CMYK notation with percentages                                                                          |
| `cmyk(0% 100% 100% 0% / 1)`           | Functional CMYK notation with percentages and alpha                                                                |
| `cmyk(0% 100% 100% 0% / 100%)`        | Functional CMYK notation with percentages and alpha in percentages                                                 |
| `cmyk(0 1 1 0)`                       | Functional CMYK notation with numbers                                                                              |
| `cmyk(0 1 1 0 / 1)`                   | Functional CMYK notation with numbers and alpha                                                                    |
| `cmyk(0 1 1 0 / 100%)`                | Functional CMYK notation with numbers and alpha in percentages                                                     |
| `cmyk(0%, 100%, 100%, 0%)`            | Functional CMYK notation with percentages (CSS Colors 3 comma-separated)                                           |
| `cmyk(0%, 100%, 100%, 0%, 1)`         | Functional CMYK notation with percentages and alpha (CSS Colors 3 comma-separated)                                 |
| `cmyk(0, 1, 1, 0)`                    | Functional CMYK notation with numbers (CSS Colors 3 comma-separated)                                               |
| `cmyk(0, 1, 1, 0, 1)`                 | Functional CMYK notation with numbers and alpha (CSS Colors 3 comma-separated)                                     |


###### Object inputs

| Example of object inputs                       | Description                               |
| ---------------------------------------------- | ----------------------------------------- |
| `{R: "0xFF", G: "0x00", B: "0xFF"}`            | Hexadecimal color                         |
| `{R: "0xF", G: "0x0", B: "0xF"}`               | Shorthand hexadecimal color               |
| `{R: "0xFF", G: "0x00", B: "0xFF", A: "0x80"}` | Hexadecimal color with alpha              |
| `{R: "0xF", G: "0x0", G: "0xF", G: "0xF"}`     | Shorthand hexadecimal color with alpha    |
| `{R: 255, G: 0, B: 255}`                       | RGB notation                              |
| `{R: 255, G: 0, G: 255, A: 0.5}`               | RGB notation with alpha                   |
| `{H: 300, S: "100%", L: "50%"}`                | HSL notation using percentages            |
| `{H: 300, S: 100, L: 50}`                      | HSL notation using numbers                |
| `{H: 300, S: "100%", L: "50%", A: 0.5}`        | HSL notation with alpha using percentages |
| `{H: 300, S: 100, L: 50, A: 0.5}`              | HSL notation with alpha using numbers     |
| `{C: "0%", M: "100%", Y: "100%", K: "0%"}`     | CMYK notation using percentages           |
| `{C: 0, M: 1, Y: 1, K: 0}`                     | CMYK notation using numbers               |

#### Class instantiation

```javascript
ColorTranslator(color: ColorInput, options?: Options)
```

It is possible to instantiate the class using any of the previous inputs.

###### Options object

```typescript
interface Options {
  decimals?: number;  // defaults to 6
  legacyCSS?: boolean; // defaults to false 
  spacesAfterCommas?: boolean; // defaults to false
  anglesUnit?: 'none' | 'deg' | 'grad' | 'rad' | 'turn'; // defaults to 'none'
  rgbUnit?: 'none' | 'percent'; // defaults to 'none'
  cmykUnit?: 'none' | 'percent'; // defaults to 'percent'
  alphaUnit?: 'none' | 'percent'; // defaults to 'none'
  cmykFunction?: 'device-cmyk' | 'cmyk'; // defaults to 'device-cmyk'
}
```

| Option            | Only for CSS output | Description                                                                                                    |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------------------------------- |
| decimals          | no                  | This option sets what is the maximum number of decimals for the outputs                                        |
| legacyCSS         | yes                 | This option decides if the CSS output should be CSS Level 3 (legacy) or CSS Level 4                           |
| spacesAfterCommas | yes                 | This option only takes place if `legacyCSS` is set to true. It decides if the comas should have a space after |
| anglesUnit        | yes                 | This option only takes place if the output is an HSL CSS output. It sets the degrees units of the HSL hue angle. If `none` is used, the output will not have any unit but its value will be the `deg` one (degrees) |
| rgbUnit           | yes                 | This option only takes place if the output is an RGB CSS output. It sets the color units of the RGB and RGBA CSS outputs. If `none` is used the color values will be decimal between `0` and `255`. If `percent` is used, the color values will be decimal with percentages between `0%` and `100%`. |
| cmykUnit          | yes                 | This option sets the color units of the CMYK and CMYKA CSS outputs. If `none` is used the color values will be decimal between `0` and `1`. If `percent` is used, the color values will be decimal with percentages between `0%` and `100%`. |
| alphaUnit         | yes                 | This option only takes place if the output is a CSS Level 4 output (`legacyCSS` has not been set, or it has been set to `false` or it has been autodetected as `false`). This option sets the alpha units of the CSS Level 4 outputs. If `none` is used the alpha values will be decimal between `0` and `1`. If `percent` is used, the alpha values will be decimal with percentages between `0%` and `100%`. |
| cmykFunction      | yes                 | This option sets the cmyk function of the CMYK and CMYKA CSS outputs.                                       |

>Note: the library tries to detect some options automatically if you don‘t send them in the options object. These are the rules for this autodetection:
>
> * `legacyCSS`: if this option is set, then its value prevails, if it is not set, and the CSS input is provided in CSS Level 3, then this option will be `true`, otherwise it will take its default value which is `false`.
> * `spacesAfterCommas`: if this option is set, then its value prevails, if it is not set, and the CSS input is provided with spaces after the commas, then this option will be `true`. If the input is not consistent in this aspect, then it will take its default value which is `false` (This option only takes place if `legacyCSS` is `true` or it has been autodetected as `true`)
> * `anglesUnit`: if this option is set, then its value prevails, if it is not set, and the HSL CSS input is provided with an angle unit, then it will take that value, otherwise it will use the default one wich is `none`.
> * `rgbUnit`: if this option is set, then its value prevails, if it is not set, and the RGB CSS input is provided with percentages in its color values, then it will take the `pcent` value, otherwise it will use the default one wich is `none`.
> * `cmykUnit`: if this option is set, then its value prevails, if it is not set, and the CMYK CSS input is provided without percentages in its color values, then it will take the `none` value, otherwise it will use the default one wich is `percent`.
> * `alphaUnit`: if this option is set, then its value prevails, if it is not set, and the CSS input (must be CSS Level 4) is provided with percentages in its alpha value, then it will take the `percent` value, otherwise it will use the default one wich is `none`.
> * `cmykFunction`: if this option is set, then its value prevails, if it is not set, and the CMYK CSS input is provided using the `cmyk` function, then it will take the `cmyk` value, otherwise it will use the default one wich is `device-cmyk`.

###### Class instantiation examples

```javascript
const keyword = new ColorTranslator('deeppink');

const hex = new ColorTranslator('#FF00FF');

const rgb = new ColorTranslator('rgb(255, 0, 0)');

const hsl = new ColorTranslator('hsl(50 20% 90% / 0.5)');

const hsla = new ColorTranslator({ R: 115, G: 200, B: 150, A: 0.5 });

const cmyk = new ColorTranslator({ C: 100, M: 100, Y: 0, K: 0 });
```

###### Configuration options examples

```javascript
// Decimals
new ColorTranslator('#F43227').HSL; // hsl(3.219512 90.30837% 55.490196%)
new ColorTranslator('#F43227', { decimals: 4 }).HSL; // hsl(3.2195 90.3084% 55.4902%)
new ColorTranslator('#F43227', { decimals: 0 }).HSL; // hsl(3 90% 55%)
new ColorTranslator('#F43227', { decimals: 2 }).HSLObject; // {H: 3.22, S: 90.31, L: 55.49}

// legacyCSS
new ColorTranslator('#FFF').RGBA; // rgb(255 255 255 / 1)
new ColorTranslator('#FFF', { legacyCSS: false }).RGBA; // rgb(255 255 255 / 1)
new ColorTranslator('#FFF', { legacyCSS: true }).RGBA; // rgba(255,255,255,1)
new ColorTranslator('hsla(100,30%,20%,0.5)').RGBA; // rgba(45.9,66.3,35.7,0.5)
new ColorTranslator('hsl(100 30% 20% / 0.5)').RGBA; // rgb(45.9 66.3 35.7 / 0.5)

// spacesAfterCommas
new ColorTranslator('#F00', { legacyCSS: true }).RGB; // rgb(255,0,0)
new ColorTranslator('#F00', { legacyCSS: true, spacesAfterCommas: true }).RGB; // rgb(255, 0, 0)
new ColorTranslator('hsla(100,30%,20%,0.25)').RGB; // rgb(45.9,66.3,35.7)
new ColorTranslator('hsl(100, 30%, 20%, 0.25)').RGB; // rgb(45.9, 66.3, 35.7)

// anglesUnit
new ColorTranslator('#0F0').HSL; // hsl(120 100% 50%)
new ColorTranslator('#0F0', { anglesUnit: 'none' }).HSL; // hsl(120 100% 50%)
new ColorTranslator('#0F0', { anglesUnit: 'deg' }).HSL; // hsl(120deg 100% 50%)
new ColorTranslator('#0F0', { anglesUnit: 'grad' }).HSL; // hsl(133.333333grad 100% 50%)
new ColorTranslator('#0F0', { anglesUnit: 'rad' }).HSL; // hsl(2.094395rad 100% 50%)
new ColorTranslator('#0F0', { anglesUnit: 'turn' }).HSL; // hsl(0.333333turn 100% 50%)
new ColorTranslator('hsl(0.5turn 100% 50% / 0.5)').HSL; // hsl(0.5turn 100% 50%)

// rgbUnit
new ColorTranslator('#0F0').RGB; // rgb(0 255 0)
new ColorTranslator('#0F0', { rgbUnit: 'none' }).RGB; // rgb(0 255 0)
new ColorTranslator('#0F0', { rgbUnit: 'percent' }).RGB; // rgb(0% 100% 0%)
new ColorTranslator('rgb(255 255 51 / 0.5)').RGB; // rgb(255 255 51)
new ColorTranslator('rgb(20% 100% 0% / 0.5)').RGB; // rgb(20% 100% 0%)

// cmykUnit
new ColorTranslator('#0F0').CMYK; // device-cmyk(100% 0% 100% 0%)
new ColorTranslator('#0F0', { cmykUnit: 'percent' }).CMYK; // device-cmyk(100% 0% 100% 0%)
new ColorTranslator('#0F0', { cmykUnit: 'none' }).CMYK; // device-cmyk(1 0 1 0)

// alphaUnit
new ColorTranslator('#0F0').RGBA; // rgb(0 255 0 / 1)
new ColorTranslator('#0F0', { alphaUnit: 'none' }).RGBA; // rgb(0 255 0 / 1)
new ColorTranslator('#0F0', { alphaUnit: 'percent' }).HSLA; // hsl(120 100% 50% / 100%)
new ColorTranslator('hsl(100 50% 20% / 0.25)').RGBA; // rgb(42.5 76.5 25.5 / 0.25)
new ColorTranslator('rgb(0 0 0 / 50%)').HSLA; // hsl(0 0% 0% / 50%)

// cmykFunction
new ColorTranslator('#00F').CMYKA; // device-cmyk(100% 100% 0% 0% / 1)
new ColorTranslator('#00F', { cmykFunction: 'device-cmyk' }).CMYK; // device-cmyk(100% 100% 0% 0%)
new ColorTranslator('#00F', { cmykFunction: 'cmyk' }).CMYKA; // cmyk(100% 100% 0% 0% / 1)
```

#### Class public methods

There are 12 chainable public methods and 11 of them accept a number as input. The last one accepts an [options object](#options-object):

| Public methods | Input           | Description                                              |
| -------------- | --------------- | -------------------------------------------------------- |
| setH           | 0 ≤ input ≤ 360 | Sets the color hue                                       |
| setS           | 0 ≤ input ≤ 100 | Sets the color saturation percentage                     |
| setL           | 0 ≤ input ≤ 100 | Sets the color lightness percentage                      |
| setR           | 0 ≤ input ≤ 255 | Sets the red value of the color                          |
| setG           | 0 ≤ input ≤ 255 | Sets the green value of the color                        |
| setB           | 0 ≤ input ≤ 255 | Sets the blue value of the color                         |
| setC           | 0 ≤ input ≤ 100 | Sets the CMYK cyan percentage value of the color         |
| setM           | 0 ≤ input ≤ 100 | Sets the CMYK magenta percentage value of the color      |
| setY           | 0 ≤ input ≤ 100 | Sets the CMYK yellow percentage value of the color       |
| setK           | 0 ≤ input ≤ 100 | Sets the CMYK black percentage value of the color        |
| setA           | 0 ≤ input ≤ 1   | Sets the alpha value of the color                        |
| setOptions     | Options         | Sets an object that would work as configuration options  |

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

| Property | Description                                          |
| -------- | ---------------------------------------------------- |
| HEX      | Gets the the object hex representation of the color  |
| HEXA     | Gets the the object hexa representation of the color |
| RGB      | Gets the the object rgb representation of the color  |
| RGBA     | Gets the the object rgba representation of the color |
| HSL      | Gets the the object hsl representation of the color  |
| HSLA     | Gets the the object hsla representation of the color |
| CMYK     | Gets the the object cmyk representation of the color |

There are 7 properties to get the object representation of the color:

| Property   | Description                                          |
| ---------- | ---------------------------------------------------- |
| HEXObject  | Gets the the object hex representation of the color  |
| HEXAObject | Gets the the object hexa representation of the color |
| RGBObject  | Gets the the object rgb representation of the color  |
| RGBAObject | Gets the the object rgba representation of the color |
| HSLObject  | Gets the the object hsl representation of the color  |
| HSLAObject | Gets the the object hsla representation of the color |
| CMYKObject | Gets the the object cmyk representation of the color |

There are 11 properties to get the individual color values:

| Property | Description                                         |
| -------- | --------------------------------------------------- |
| H        | Gets the color hue                                  |
| S        | Gets the color saturation percentage                |
| L        | Gets the color lightness percentage                 |
| R        | Gets the red value of the color                     |
| G        | Gets the green value of the color                   |
| B        | Gets the blue value of the color                    |
| C        | Gets the CMYK cyan percentage value of the color    |
| M        | Gets the CMYK magenta percentage value of the color |
| Y        | Gets the CMYK yellow percentage value of the color  |
| K        | Gets the CMYK black percentage value of the color   |
| A        | Gets the alpha value of the color                   |

And a property to get the options object that acts as a [configuration object](#options-object) for the outputs

| Property | Description                        |
| -------- | ---------------------------------- |
| options  | Get the configuration object value |


###### Class public properties examples

You can also consult the [demo 1](https://elchininet.github.io/ColorTranslator/#demo1) and the [demo 2](https://elchininet.github.io/ColorTranslator/#demo2) to check the use of the public properties.

```javascript
const color = new ColorTranslator('#FF00FF', { decimals: 2 });

color.R; // 255
color.G; // 0
color.B; // 255
color.RGB; // rgb(255 0 255)
color.HSLA; // hsl(300 100% 50% / 1)
color.options; // { decimals: 2 }
```

#### Class static methods

For the static methods, it is not needed to specify the input color model, the API will detect the format automatically. It is only needed to specify to which color model one wants to convert calling the specific static method.

There are 43 static methods available, 16 of them to convert colors, 12 to create color blends, 12 to mix colors, one to get shades, one to get tints, and one to create color harmonies.

>Note: The static methods also count with the options-autodetection feature that was explained in the [options object section](#options-object), but in this case it scans all the inputs that are CSS, and it tries to detect the options in each one of them. If one of the autodetected options is consistent in all the inputs, then it takes the autodetected value, otherwise it will use the default one.

###### Color conversion static methods

The static methods to convert colors accept any of the mentioned inputs as the first parameter, the second parameter is optional and it is an [options object](#options-object) (this second option is not present in the methods to generate HEX colors):

```typescript
convertColorStaticMethod(
  color: string | object,
  options?: Options
)
```
###### Color conversion static methods description

| Static method | Description                                               |
| ------------- | --------------------------------------------------------- |
| toHEX         | Converts to an hexadecimal notation                       |
| toHEXObject   | Converts to an object in hexadecimal notation             |
| toHEXA        | Converts to an hexadecimal notation with alpha            |
| toHEXAObject  | Converts to an object in hexadecimal notation with alpha  |
| toRGB         | Converts to an RGB notation                               |
| toRGBObject   | Converts to an object in RGB notation                     |
| toRGBA        | Converts to an RGB notation with alpha                    |
| toRGBAObject  | Converts to an object in RGB notation with alpha          |
| toHSL         | Converts to an HSL notation                               |
| toHSLObject   | Converts to an object in HSL notation                     |
| toHSLA        | Converts to an HSL notation with alpha                    |
| toHSLAObject  | Converts to an object in HSL notation with alpha          |
| toCMYK        | Converts to a CMYK notation                               |
| toCMYKObject  | Converts to an object in CMYK notation                    |

###### Color conversion static methods examples

```javascript
ColorTranslator.toHEX('gold'); // #FFD700

ColorTranslator.toRGB('#FF00FF'); // rgb(255 0 255)

ColorTranslator.toRGBA(
  'hsl(50, 20%, 90%)',
  { decimals: 0 }
); // rgba(235,233,224,1)

ColorTranslator.toHSL('rgb(255 0 0)'); // hsl(0 100% 50%)

ColorTranslator.toHSLA('rgba(0, 255, 255, 0.5)'); // hsla(180,100%,50%,0.5)

ColorTranslator.toCMYKObject('#F0F'); // {C: 0, M: 100, Y: 0, K: 0}

ColorTranslator.toCMYK('#F0F'); // cmyk(0% 100% 0% 0%)

ColorTranslator.toRGB(
  { h: 115, s: '70%', l: '45%' },
  { decimals: 0 }
); // rgb(48 195 34)

ColorTranslator.toHSLA(
  { r: 115, g: 200, b: 150, a: 0.5 },
  { decimals: 1 }
); // hsl(144.7 43.6% 61.8% / 0.5)

ColorTranslator.toHSLA(
  { r: 95, g: 23, b: 12, a: Math.SQRT1_2 },
  { decimals: 4 }
); // hsl(7.9518 77.5701% 20.9804% / 0.7071)
```

You can also consult the [demo 3](https://elchininet.github.io/ColorTranslator/#demo3), and the [demo 4](https://elchininet.github.io/ColorTranslator/#demo4) to check the use of these static methods.

###### Color blends static methods

The static methods to create color blends accept any of the mentioned inputs as the first and second parameter, the third parameter is optional and it is the number of steps of the blending. And the fourth parameter is also optional and it is an [options object](#options-object) (this fourth option is not present in the methods to generate HEX colors):

```typescript
getBlendColorsStaticMethod(
  fromColor: string | object,
  toColor: string | object,
  steps: number = 5,
  options?: Options
)
```

###### Color blends static methods description

| Static method      | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| getBlendHEX        | Creates an array relative to the blend between two colors in hexadecimal notation                       |
| getBlendHEXObject  | Creates an array of objects relative to the blend between two colors in hexadecimal notation            |
| getBlendHEXA       | Creates an array relative to the blend between two colors in hexadecimal notation with alpha            |
| getBlendHEXAObject | Creates an array of objects relative to the blend between two colors in hexadecimal notation with alpha |
| getBlendRGB        | Creates an array relative to the blend between two colors in RGB notation                               |
| getBlendRGBObject  | Creates an array of objects relative to the blend between two colors in RGB notation                    |
| getBlendRGBA       | Creates an array relative to the blend between two colors in RGB notation with alpha                    |
| getBlendRGBAObject | Creates an array of objects relative to the blend between two colors in RGB notation with alpha         |
| getBlendHSL        | Creates an array relative to the blend between two colors in HSL notation                               |
| getBlendHSLObject  | Creates an array of objects relative to the blend between two colors in HSL notation                    |
| getBlendHSLA       | Creates an array relative to the blend between two colors in HSL notation with alpha                    |
| getBlendHSLAObject | Creates an array of objects relative to the blend between two colors in HSL notation with alpha         |

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
//   "hsl(0 100% 50% / 0)",
//   "hsl(300 100% 25% / 0.5)",
//   "hsl(240 100% 50% / 1)"
// ]

ColorTranslator.getBlendRGBAObject('#F000', 'rgba(0,0,255,1)', 5);

// [
//   {R: 255, G: 0, B: 0, A: 0},
//   {R: 191.25, G: 0, B: 63.75, A: 0.25},
//   {R: 127.5, G: 0, B: 127.5, A: 0.5},
//   {R: 63.75, G: 0, B: 191.25, A: 0.75},
//   {R: 0, G: 0, B: 255, A: 1}
// ]
```

You can also consult the [demo 5](https://elchininet.github.io/ColorTranslator/#demo5) to check the use of these static methods.

###### Color mix static methods

The static methods to mix colors accept an array of any of the mentioned inputs as the first parameter. The second parameter is optional and specifies the mixing mode (by default it will be `Mix.ADDITIVE`). And the third parameter is also optional and it is an [options object](#options-object) (this third option is not present in the methods to generate HEX colors):

> **Note:** The subtractive mix simulates the mixing of pigments, to achieve this, the rgb colors are converted to ryb color model, the addition is performed in this mode and at the end the result is converted back to rgb. The result is OK most of the time, but as this is not a real mix of pigments, sometimes the result could differ from the reality.

```typescript
getMixColorsStaticMethod(
  colors: [string | object][],
  mode: Mix = Mix.ADDITIVE,
  options?: Options
)
```

###### Color mix static methods description

| Static method    | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| getMixHEX        | Gets the mix of the input colors in hexadecimal notation                         |
| getMixHEXObject  | Gets the mix of the input colors in an object in hexadecimal notation            |
| getMixHEXA       | Gets the mix of the input colors in hexadecimal notation with alpha              |
| getMixHEXAObject | Gets the mix of the input colors in an object in hexadecimal notation with alpha |
| getMixRGB        | Gets the mix of the input colors in RGB notation                                 |
| getMixRGBObject  | Gets the mix of the input colors in an object in RGB notation                    |
| getMixRGBA       | Gets the mix of the input colors in RGB notation with alpha                      |
| getMixRGBAObject | Gets the mix of the input colors in an object in RGB notation with alpha         |
| getMixHSL        | Gets the mix of the input colors in HSL notation                                 |
| getMixHSLObject  | Gets the mix of the input colors in an object in HSL notation                    |
| getMixHSLA       | Gets the mix of the input colors in HSL notation with alpha                      |
| getMixHSLAObject | Gets the mix of the input colors in an object in HSL notation with alpha         |

###### Color mix static methods examples

```javascript
ColorTranslator.getMixHEX(['#FF0000', '#0000FF']);

// #FF00FF

ColorTranslator.getMixHSL(['rgba(255, 0, 0, 1)', '#00FF00']);

// hsl(60 100% 50%)

ColorTranslator.getMixHEXAObject(['#F00', 'rgb(0, 0, 255)'], Mix.ADDITIVE);

// { R: '0xFF', G: '0x00', B: '0xFF', A: '0xFF' }

ColorTranslator.getMixHEX(['#FF0', '#F00'], Mix.SUBTRACTIVE);

// #FF8800
```

You can also consult the [demo 7](https://elchininet.github.io/ColorTranslator/#demo7) and [demo 8](https://elchininet.github.io/ColorTranslator/#demo8) to check the use of these static methods.

###### Color shades and color tints static methods

The static methods to get [shades or tints of a color](https://en.m.wikipedia.org/wiki/Tints_and_shades) accept any of the mentioned inputs as the first parameter. The second parameter specifies the number of shades or tints that should be returned and the third parameter is optional and it is an [options object](#options-object). This method will return the colors in the same format that was sent as input:

```typescript
getShades(
  color: string | object,
  shades: number,
  options?: Options
)

getTints(
  color: string | object,
  tints: number,
  options?: Options
)
```

###### Color shades and color tints static methods description

| Static method | Description                                                                |
| ------------- | ---------------------------------------------------------------------------|
| getShades     | Gets shades of a colour (mix the color with black increasing its darkness) |  
| getTints      | Gets tints of a colour (mix the color with white increasing its lightness) |


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
//   {R: 255, G: 42.5, B: 42.5, A: 0.5},
//   {R: 255, G: 85, B: 85, A: 0.5},
//   {R: 255, G: 127.5, B: 127.5, A: 0.5},
//   {R: 255, G: 170, B: 170, A: 0.5},
//   {R: 255, G: 212.5, B: 212.5, A: 0.5}
// ]
```

You can also consult the [demo 6](https://elchininet.github.io/ColorTranslator/#demo6) to check the use of these static methods.

###### Color harmonies static method

The static method to create color harmonies accepts four parmeters, the first one could be any of the mentioned inputs, the second one is optional and it is to specify the kind of harmony (by default it will be `Harmony.COMPLEMENTARY`), the third one is also optional and it specifies if the returned harmony is based on additive or subtractive colors (by default it will be `Mix.ADDITIVE`), and the fourth parameter is also optional and it is an [options object](#options-object). This method will return the colors in the same format that was sent as input:

```typescript
getHarmony(
  color: string | object
  harmony: Harmony = Harmony.COMPLEMENTARY,
  mode: Mix = Mix.ADDITIVE,
  options?: Options
)
```

###### Color harmonies static method description

| Static method | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| getHarmony    | Returns an array of colors representing the harmony requested. The color output will be the same that was sent as input |

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

ColorTranslator.getHarmony('rgba(0 255 255 / 0.5)', Harmony.ANALOGOUS);

// [
//   "rgba(0 255 255 / 0.5)",
//   "rgba(0 127.5 255 / 0.5)",
//   "rgba(0 255 127.5 / 0.5)"
// ]

ColorTranslator.getHarmony(
  { r: 115, g: 200, b: 150, a: 0.5 },
  Harmony.COMPLEMENTARY,
  Mix.ADDITIVE,
  { decimals: 2 }
);

// [
//   {R: 115, G: 200, B: 150, A: 0.5},
//   {R: 200, G: 123.75, B: 115, A: 0.5}
// ]

ColorTranslator.getHarmony('#FF0000', Harmony.COMPLEMENTARY, Mix.SUBTRACTIVE);

// ["#FF0000", "#00FF00"]

```

You can also consult the [demo 9](https://elchininet.github.io/ColorTranslator/#demo9) and [demo 10](https://elchininet.github.io/ColorTranslator/#demo10) to check the use of this static method.

## TypeScript Support

The package has its own type definitions, so it can be used in a `TypeScript` project without any issues. The next interfaces are exposed and can be imported in your project:

###### InputOptions

This is the type of the [options object](#options-object) that can be sent to the class constructor or to the static methods.

```typescript
interface InputOptions {
    decimals?: number;
    legacyCSS?: boolean;
    spacesAfterCommas?: boolean;
    anglesUnit?: 'none' | 'deg' | 'grad' | 'rad' | 'turn';
    rgbUnit?: 'none' | 'percent';
    cmykUnit?: 'none' | 'percent';
    alphaUnit?: 'none' | 'percent';
    cmykFunction?: 'device-cmyk' | 'cmyk';
}
```

###### HEXObject

This type is returned by the `HEXObject`, and `HEXAObject` properties, the `toHEXObject`, `toHEXAObject`, `getBlendHEXObject`, `getBlendHEXAObject`, `getMixHEXObject`, and the `getMixHEXAObject` methods, and the `getHarmony` method (when the input is an `HEXObject`).

```typescript
interface HEXObject {
    R: string;
    G: string;
    B: string;
    A?: string;
}
```

###### RGBObject

This type is returned by the `RGBObject`, and `RGBAObject` properties, the `toRGBObject`, `toRGBAObject`, `getBlendRGBObject`, `getBlendRGBAObject`, `getMixRGBObject`, and the `getMixRGBAObject` methods, and the `getHarmony` method (when the input is an `RGBObject`).

```typescript
interface RGBObject {
    R: number;
    G: number;
    B: number;
    A?: number;
}
```

###### HSLObject

This type is returned by the `HSLObject`, and `HSLAObject` properties, the `toHSLObject`, `toHSLAObject`, `getBlendHSLObject`, `getBlendHSLAObject`, `getMixHSLObject`, and the `getMixHSLAObject` methods, and the `getHarmony` method (when the input is an `HSLObject`).

```typescript
interface HSLObject {
    H: number;
    S: number;
    L: number;
    A?: number;
}
```

###### CMYKObject

This type is returned by the `CMYKObject` property, and the `toCMYKObject` and `toCMYKAObject` methods.

```typescript
interface CMYKObject {
    C: number;
    M: number;
    Y: number;
    K: number;
}
```