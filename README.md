<p align="center">
    <a href="https://elchininet.github.io/ColorTranslator/">
        <img src="./src/@demo/images/logo.png?raw=true" width="500" title="ColorTranslator" />
    </a>
</p>

A JavaScript library, written in TypeScript, to convert among different color models

# Demo

https://elchininet.github.io/ColorTranslator/

# Installation

<h4>Using NPM</h4>

```
npm install colortranslator
```

<h4>Using Yarn</h4>

```
yarn add colortranslator
```

<h4>In the browser</h4>
It is possible to include a compiled version of the package directly in an HTML file. It will create a global `colortranslator` variable that can be accessed from anywhere in your JavaScript code.

1. Copy the JavaScript file `colortranslator.web.js`, located in the `dist` folder
2. Put it in the folder that you prefer in your web server
3. Include it in your HTML file

```
<script src="wherever/you/instelled/colortranslator.web.js"></script>
```

# Scripts

<h4>build</h4>

`npm run build`

Transpiles the TypeScript code and creates two bundles in the `dist` folder (`colortranslator.node.js` for Node environments and `colortranslator.web.js` to use directly in the browser).

<h4>test</h4>

`npm run test`

Runs multiple dynamic tests converting from / to all the color models available (excepting CMYK) using a table of colors.

<h4>demo</h4>

`npm run demo`

Opens a development server that provides live reloading using [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Some demo examples located in the `@demo` folder will be shown. You can modify the code of the demos and the changes will be live reloaded in the browser.

# API

It is not needed to specify the color model from which you are converting, the API will detect the format. You only need to specify to which color model you want to convert calling the specific method.

<h4>Input</h4>
It is possible to convert from a CSS string or an object.

<h6>CSS string inputs</h6>

| Example of CSS string inputs      | Description                                                |
| --------------------------------- | ---------------------------------------------------------- |
| `#FF00FF`                         | Hexadecimal color                                          |
| `#F0F`                            | Shorthand hexadecimal color                                |
| `#FF00FF80`                       | Hexadecimal color with alpha                               |
| `rgb(255, 0, 255)`                | Functional RGB notation                                    |
| `rgba(255, 0, 255, 0.5)`          | Functional RGB notation with alpha                         |
| `hsl(300, 100%, 50%)`             | Functional HSL notation                                    |
| `hsla(300, 100%, 50%, 0.5)`       | Functional HSL notation with alpha                         |
| `cmyk(0%, 100%, 100%, 0%)`        | Functional CMYK notation with percentages                  |
| `cmyk(0, 1, 1, 0)`                | Functional CMYK notation with numbers                      |
| `device-cmyk(0%, 100%, 100%, 0%)` | Device-dependent functional CMYK notation with percentages |
| `device-cmyk(0, 1, 1, 0)`         | Device-dependent functional CMYK notation with numbers     |

<h6>Object inputs</h6>

| Example of object inputs                       | Description                    |
| ---------------------------------------------- | ------------------------------ |
| `{r: "0xFF", g: "0x00", b: "0xFF"}`            | Hexadecimal color              |
| `{r: "0xF", g: "0x0", b: "0xF"}`               | Shorthand hexadecimal color    |
| `{r: "0xFF", g: "0x00", b: "0xFF", a: "0x80"}` | Hexadecimal color with alpha   |
| `{r: 255, g: 0, b: 255}`                       | RGB notation                   |
| `{r: 255, g: 0, b: 255, a: 0.5}`               | RGB notation with alpha        |
| `{h: 300, s: "100%", l: "50%"}`                | HSL notation                   |
| `{h: 300, s: "100%", l: "50%", a: 0.5}`        | HSL notation with alpha        |
| `{c: "0%", m: "100%", y: "100%", k: "0%"}`     | CMYK notation with percentages |
| `{c: 0, m: 1, y: 1, k: 0}`                     | CMYK notation with numbers     |

<h4>Methods</h4>
There are 7 methods available and all of them accept any of the previous inputs as the first parameter. The second parameter is optional and it specifies if the output should be a CSS string or an object:

```
anyMethod(color: string | object, css: boolean = true)
```

| Available methods | Description                                   |
| ----------------- | --------------------------------------------- |
| toHEX             | Convert to an hexadecimal notation            |
| toHEXA            | Convert to an hexadecimal notation with alpha |
| toRGB             | Convert to an RGB notation                    |
| toRGBA            | Convert to an RGB notation with alpha         |
| toHSL             | Convert to an HSL notation                    |
| toHSLA            | Convert to an HSL notation with alpha         |
| toCMYK            | Convert to a CMYK notation                    |

> **Note:** The conversion to a CMYK color is made taking a random value of black as a base (in this case, taking the greater value from red, green or blue). When a value of black is assumed, the rest of the colors can be calculated from it. The result will be visually similar to the original light color, but if you try to convert it back you will not obtain the same original value.

# Examples

<h4>Importing using CommonJS</h4>

```javascript
const { colortranslator } = require('colortranslator');
```

<h4>Importing using ES6 modules</h4>

```javascript
import { colortranslator } from 'colortranslator';
```

<h4>Example methods</h4>

```javascript
colortranslator.toRGB('#FF00FF'); // rgb(255,0,255)

colortranslator.toRGBA('hsl(50, 20%, 90%)'); // rgba(235,233,224,1)

colortranslator.toHSL('rgb(255, 0, 0)'); // hsl(0,100%,50%)

colortranslator.toHSLA('rgba(0, 255, 255, .5)'); // hsla(180,100%,50%,0.5)

colortranslator.toCMYK('#F0F', false); // {c: 0, m: 100, y: 0, k: 0}

colortranslator.toRGB({ h: 115, s: '70%', l: '45%' }); // rgb(48,195,34)

colortranslator.toHSLA({ r: 115, g: 200, b: 150, a: 0.5 }); // hsla(145,44%,62%,0.5)
```
