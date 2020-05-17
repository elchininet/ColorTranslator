!function(r,t){for(var e in t)r[e]=t[e]}(window,function(r){var t={};function e(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return r[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=r,e.c=t,e.d=function(r,t,o){e.o(r,t)||Object.defineProperty(r,t,{enumerable:!0,get:o})},e.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},e.t=function(r,t){if(1&t&&(r=e(r)),8&t)return r;if(4&t&&"object"==typeof r&&r&&r.__esModule)return r;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:r}),2&t&&"string"!=typeof r)for(var n in r)e.d(o,n,function(t){return r[t]}.bind(null,n));return o},e.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return e.d(t,"a",t),t},e.o=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},e.p="",e(e.s=4)}([function(r,t,e){"use strict";var o,n;Object.defineProperty(t,"__esModule",{value:!0}),function(r){r.HEX="HEX",r.RGB="RGB",r.RGBA="RGBA",r.HSL="HSL",r.HSLA="HSLA",r.CMYK="CMYK"}(n=t.ColorModel||(t.ColorModel={})),function(r){r.ANALOGOUS="ANALOGOUS",r.COMPLEMENTARY="COMPLEMENTARY",r.SPLIT_COMPLEMENTARY="SPLIT_COMPLEMENTARY",r.TRIADIC="TRIADIC",r.TETRADIC="TETRADIC",r.SQUARE="SQUARE"}(t.Harmony||(t.Harmony={})),t.COLORREGS=((o={})[n.HEX]=/^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i,o[n.RGB]=/^rgb\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*\)$/,o[n.RGBA]=/^rgba\s*\(\s*(?:(\d+%)\s*,\s*(\d+%)\s*,\s*(\d+%)|(\d+)\s*,\s*(\d+)\s*,\s*(\d+))\s*,\s*(\d\.?\d*)\s*\)$/,o[n.HSL]=/^hsl\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%s*\)$/,o[n.HSLA]=/^hsla\s*\(\s*(-?\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%\s*,\s*(\d\.?\d*)\s*\)$/,o[n.CMYK]=/^(?:device-cmyk|cmyk)\s*\(\s*(?:(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)\s*,\s*(\d+\.?\d*%)|(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*)\s*,\s*(\d\.?\d*))\s*\)$/,o),t.PCENT=/^(\d+(?:\.\d+)?|\.\d+)%$/,t.HEX=/^0x([a-f\d]{1,2})$/i,t.ERRORS={NOT_ACCEPTED_STRING_INPUT:"The provided string color doesn't have a correct format",NOT_ACCEPTED_OBJECT_INPUT:"The provided color object doesn't have the proper keys"}},function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e(0);t.hasProp=function(r,t){return Object.prototype.hasOwnProperty.call(r,t)},t.percent=function(r){return o.PCENT.test(""+r)?+(""+r).replace(o.PCENT,"$1"):Math.min(+r,100)},t.getDEC=function(r){return 1===r.length&&(r+=r),parseInt(r,16)},t.getHEX=function(r){var t=parseInt(""+r).toString(16).toUpperCase();return 1===t.length?"0x0"+t:"0x"+t},t.toHEX=function(r){var t=parseInt(""+r).toString(16).toUpperCase();return 1===t.length&&(t="0"+t),t},t.getBase255Number=function(r,t){return void 0===t&&(t=!1),!t&&o.PCENT.test(r)?Math.min(255*+r.replace(o.PCENT,"$1")/100,255):o.HEX.test(r)?3===r.length?t?parseInt(r+r.slice(-1))/255:parseInt(r+r.slice(-1)):t?parseInt(r)/255:parseInt(r):Math.min(+r,t?1:255)},t.getCMYKNumber=function(r){return Math.min(o.PCENT.test(r)?+r.replace(o.PCENT,"$1")/100:+r,1)},t.getOrderedArrayString=function(r){return r.sort().join().toUpperCase()},t.round=function(r,t){void 0===t&&(t=0);var e=Math.pow(10,t);return Math.round(+r*e)/e},t.minmax=function(r,t,e){return Math.max(t,Math.min(r,e))}},function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.hueToRGB=function(r,t,e){return e<0&&(e+=6),e>=6&&(e-=6),e<1?Math.round(255*((t-r)*e+r)):e<3?Math.round(255*t):e<4?Math.round(255*((t-r)*(4-e)+r)):Math.round(255*r)},t.hslToRGB=function(r,e,o){r/=60,e/=100;var n=(o/=100)<=.5?o*(e+1):o+e-o*e,u=2*o-n;return{r:t.hueToRGB(u,n,r+2),g:t.hueToRGB(u,n,r),b:t.hueToRGB(u,n,r-2)}},t.cmykToRGB=function(r,t,e,o){return o=1-o,{r:Math.round(255*(1-r)*o),g:Math.round(255*(1-t)*o),b:Math.round(255*(1-e)*o)}},t.rgbToCMYK=function(r,t,e){r/=255,t/=255,e/=255;var o=1-Math.max(r,t,e),n=1-o,u=(n-r)/n,a=(n-t)/n,i=(n-e)/n;return{c:Math.round(100*u),m:Math.round(100*a),y:Math.round(100*i),k:Math.round(100*o)}},t.rgbToHSL=function(r,t,e,o){void 0===o&&(o=1),r/=255,t/=255,e/=255,o=Math.min(o,1);var n=Math.max(r,t,e),u=Math.min(r,t,e),a=n-u,i=0,l=0,s=(n+u)/2;if(0===a)i=0,l=0;else{switch(n){case r:i=(t-e)/a%6;break;case t:i=(e-r)/a+2;break;case e:i=(r-t)/a+4}(i=Math.round(60*i))<0&&(i+=360),l=a/(1-Math.abs(2*s-1))}return{h:i,s:Math.round(100*l),l:Math.round(100*s),a:o}}},function(r,t,e){"use strict";var o;Object.defineProperty(t,"__esModule",{value:!0});var n=e(0),u=e(1);t.CSS=((o={})[n.ColorModel.HEX]=function(r){return"#"+u.toHEX(r.r)+u.toHEX(r.g)+u.toHEX(r.b)+(r.a&&u.toHEX(r.a)||"")},o[n.ColorModel.RGB]=function(r){return"rgb"+(u.hasProp(r,"a")?"a":"")+"("+u.round(r.r)+","+u.round(r.g)+","+u.round(r.b)+(u.hasProp(r,"a")&&","+u.round(r.a,2)||"")+")"},o[n.ColorModel.HSL]=function(r){return"hsl"+(u.hasProp(r,"a")?"a":"")+"("+u.round(r.h)+","+u.round(r.s)+"%,"+u.round(r.l)+"%"+(u.hasProp(r,"a")&&","+u.round(r.a,2)||"")+")"},o[n.ColorModel.CMYK]=function(r){return"cmyk("+u.round(r.c)+"%,"+u.round(r.m)+"%,"+u.round(r.y)+"%,"+u.round(r.k)+"%)"},o)},function(r,t,e){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(r){for(var t,e=1,o=arguments.length;e<o;e++)for(var n in t=arguments[e])Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var n=e(0);t.Harmony=n.Harmony;var u=e(2),a=e(5),i=e(3),l=e(1),s=function(r,t){return"string"==typeof r&&t||"object"==typeof r&&!t},c=function(r,t,e,o,n){var u=o(a.getRGBObject(r,t));return e?n(u):u},d=function(r,t,e,o,n,u){e<1&&(e=5);var i=a.getRGBObject(r),l=a.getRGBObject(t);return a.blend(i,l,e).map((function(r){var t=n(r);return o?u(t):t}))},h=function(){function r(r){this.rgb=a.getRGBObject(r),this.updateHSL(),this.updateCMYK()}return r.prototype.updateRGB=function(){this.rgb=o(o({},u.hslToRGB(this.hsl.h,this.hsl.s,this.hsl.l)),{a:this.hsl.a})},r.prototype.updateRGBFromCMYK=function(){this.rgb=o(o({},u.cmykToRGB(this.cmyk.c,this.cmyk.m,this.cmyk.y,this.cmyk.k)),{a:this.rgb.a})},r.prototype.updateHSL=function(){this.hsl=u.rgbToHSL(this.rgb.r,this.rgb.g,this.rgb.b,this.rgb.a)},r.prototype.updateCMYK=function(){this.cmyk=u.rgbToCMYK(this.rgb.r,this.rgb.g,this.rgb.b)},r.prototype.updateRGBAndCMYK=function(){return this.updateRGB(),this.updateCMYK(),this},r.prototype.updateHSLAndCMYK=function(){return this.updateHSL(),this.updateCMYK(),this},r.prototype.updateRGBAndHSL=function(){return this.updateRGBFromCMYK(),this.updateHSL(),this},r.prototype.setH=function(r){return this.hsl.h=a.normalizeHue(r),this.updateRGBAndCMYK()},r.prototype.setS=function(r){return this.hsl.s=l.minmax(r,0,100),this.updateRGBAndCMYK()},r.prototype.setL=function(r){return this.hsl.l=l.minmax(r,0,100),this.updateRGBAndCMYK()},r.prototype.setR=function(r){return this.rgb.r=l.minmax(r,0,255),this.updateHSLAndCMYK()},r.prototype.setG=function(r){return this.rgb.g=l.minmax(r,0,255),this.updateHSLAndCMYK()},r.prototype.setB=function(r){return this.rgb.b=l.minmax(r,0,255),this.updateHSLAndCMYK()},r.prototype.setA=function(r){return this.hsl.a=this.rgb.a=l.minmax(r,0,1),this},r.prototype.setC=function(r){return this.cmyk.c=l.minmax(r,0,100),this.updateRGBAndHSL()},r.prototype.setM=function(r){return this.cmyk.m=l.minmax(r,0,100),this.updateRGBAndHSL()},r.prototype.setY=function(r){return this.cmyk.y=l.minmax(r,0,100),this.updateRGBAndHSL()},r.prototype.setK=function(r){return this.cmyk.k=l.minmax(r,0,100),this.updateRGBAndHSL()},Object.defineProperty(r.prototype,"H",{get:function(){return l.round(this.hsl.h)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"S",{get:function(){return l.round(this.hsl.s)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"L",{get:function(){return l.round(this.hsl.l)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"R",{get:function(){return l.round(this.rgb.r)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"G",{get:function(){return l.round(this.rgb.g)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"B",{get:function(){return l.round(this.rgb.b)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"A",{get:function(){return l.round(this.hsl.a,2)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"C",{get:function(){return l.round(this.cmyk.c)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"M",{get:function(){return l.round(this.cmyk.m)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"Y",{get:function(){return l.round(this.cmyk.y)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"K",{get:function(){return l.round(this.cmyk.k)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HEXObject",{get:function(){return a.translateColor.HEX(this.rgb)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HEXAObject",{get:function(){return a.translateColor.HEXA(this.rgb)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"RGBObject",{get:function(){var r=o({},this.rgb);return a.translateColor.RGB(r)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"RGBAObject",{get:function(){var r=o({},this.rgb);return a.translateColor.RGBA(r)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HSLObject",{get:function(){return{h:l.round(this.hsl.h),s:l.round(this.hsl.s),l:l.round(this.hsl.l)}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HSLAObject",{get:function(){return{h:l.round(this.hsl.h),s:l.round(this.hsl.s),l:l.round(this.hsl.l),a:l.hasProp(this.hsl,"a")?l.round(this.hsl.a,2):1}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"CMYKObject",{get:function(){return{c:l.round(this.cmyk.c),m:l.round(this.cmyk.m),y:l.round(this.cmyk.y),k:l.round(this.cmyk.k)}},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HEX",{get:function(){var r=this.rgb,t={r:r.r,g:r.g,b:r.b};return i.CSS.HEX(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HEXA",{get:function(){var r=this.rgb,t=r.r,e=r.g,o=r.b,n=r.a,u={r:t,g:e,b:o,a:255*(void 0===n?1:n)};return i.CSS.HEX(u)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"RGB",{get:function(){var r=this.rgb,t={r:r.r,g:r.g,b:r.b};return i.CSS.RGB(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"RGBA",{get:function(){var r=this.rgb,t=r.r,e=r.g,o=r.b,n=r.a,u={r:t,g:e,b:o,a:void 0===n?1:n};return i.CSS.RGB(u)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HSL",{get:function(){var r=this.hsl,t={h:r.h,s:r.s,l:r.l};return i.CSS.HSL(t)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"HSLA",{get:function(){var r=this.hsl,t=r.h,e=r.s,o=r.l,n=r.a,u={h:t,s:e,l:o,a:void 0===n?1:n};return i.CSS.HSL(u)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"CMYK",{get:function(){return i.CSS.CMYK(this.cmyk)},enumerable:!0,configurable:!0}),r.toHEX=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return c(r,e,t,a.translateColor.HEX,i.CSS.HEX)},r.toHEXA=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return c(r,e,t,a.translateColor.HEXA,i.CSS.HEX)},r.toRGB=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return c(r,e,t,a.translateColor.RGB,i.CSS.RGB)},r.toRGBA=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return c(r,e,t,a.translateColor.RGBA,i.CSS.RGB)},r.toHSL=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return e===n.ColorModel.HSL&&s(r,t)?r:c(r,e,t,a.translateColor.HSL,i.CSS.HSL)},r.toHSLA=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return e===n.ColorModel.HSLA&&s(r,t)?r:c(r,e,t,a.translateColor.HSLA,i.CSS.HSL)},r.toCMYK=function(r,t){void 0===t&&(t=!0);var e=a.getColorModel(r);return e===n.ColorModel.CMYK&&s(r,t)?r:c(r,e,t,a.translateColor.CMYK,i.CSS.CMYK)},r.getBlendHEX=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.HEX,i.CSS.HEX)},r.getBlendHEXA=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.HEXA,i.CSS.HEX)},r.getBlendRGB=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.RGB,i.CSS.RGB)},r.getBlendRGBA=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.RGBA,i.CSS.RGB)},r.getBlendHSL=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.HSL,i.CSS.HSL)},r.getBlendHSLA=function(r,t,e,o){return void 0===e&&(e=5),void 0===o&&(o=!0),d(r,t,e,o,a.translateColor.HSLA,i.CSS.HSL)},r.getHarmony=function(r,t){switch(void 0===t&&(t=n.Harmony.COMPLEMENTARY),t){case n.Harmony.ANALOGOUS:return a.colorHarmony.buildHarmony(r,a.analogous);case n.Harmony.SPLIT_COMPLEMENTARY:return a.colorHarmony.buildHarmony(r,a.splitComplementary);case n.Harmony.TRIADIC:return a.colorHarmony.buildHarmony(r,a.triadic);case n.Harmony.TETRADIC:return a.colorHarmony.buildHarmony(r,a.tetradic);case n.Harmony.SQUARE:return a.colorHarmony.buildHarmony(r,a.square);default:return a.colorHarmony.buildHarmony(r,a.complementary)}},r}();t.ColorTranslator=h},function(r,t,e){"use strict";var o,n,u,a,i=this&&this.__assign||function(){return(i=Object.assign||function(r){for(var t,e=1,o=arguments.length;e<o;e++)for(var n in t=arguments[e])Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}).apply(this,arguments)},l=this&&this.__spreadArrays||function(){for(var r=0,t=0,e=arguments.length;t<e;t++)r+=arguments[t].length;var o=Array(r),n=0;for(t=0;t<e;t++)for(var u=arguments[t],a=0,i=u.length;a<i;a++,n++)o[n]=u[a];return o};Object.defineProperty(t,"__esModule",{value:!0});var s=e(0),c=e(1),d=e(2),h=e(3);t.normalizeHue=function(r){return(r>360||r<0)&&(r-=360*Math.floor(r/360)),r},t.normalizeAlpha=function(r){return isNaN(+r)||r>1?1:c.round(r,2)};var f=function(r,e){return e.reduce((function(e,o){return l(e,[i(i({},r),{h:t.normalizeHue(r.h+o)})])}),[i({},r)])};t.analogous=function(r){return f(r,[-30,30])},t.complementary=function(r){return f(r,[180])},t.splitComplementary=function(r){return f(r,[-150,150])},t.triadic=function(r){return f(r,[120,-120])},t.tetradic=function(r){return f(r,[-60,120,180])},t.square=function(r){return f(r,[-90,90,180])};t.getColorModel=function(r){return"string"==typeof r?function(r){var t;if(Object.keys(s.ColorModel).some((function(e){if(s.COLORREGS[e].test(r))return t=e,!0})),!t)throw new Error(s.ERRORS.NOT_ACCEPTED_STRING_INPUT);return t}(r):function(r){var t,e=!1,o=c.getOrderedArrayString(Object.keys(r));if(Object.keys(s.ColorModel).filter((function(r){return r!==s.ColorModel.HEX})).some((function(r){if(c.getOrderedArrayString(r.split(""))===o)return t=r,!0})),t&&t===s.ColorModel.RGB||t===s.ColorModel.RGBA){var n=Object.entries(r).map((function(r){return s.HEX.test(""+r[1])}));e=n.some((function(r,t){return t>0&&r!==n[t-1]})),console.log(r,n,e),!e&&n[0]&&(t=s.ColorModel.HEX)}if(!t||e)throw new Error(s.ERRORS.NOT_ACCEPTED_OBJECT_INPUT);return t}(r)},t.getRGBObjectFromString=((o={})[s.ColorModel.HEX]=function(r){var t=r.match(s.COLORREGS.HEX),e={r:c.getDEC(t[1]||t[5]),g:c.getDEC(t[2]||t[6]),b:c.getDEC(t[3]||t[7])},o=t[4]||t[8];return void 0!==o&&(e.a=c.getDEC(o)/255),e},o[s.ColorModel.RGB]=function(r){var t=r.match(s.COLORREGS.RGB),e=c.getBase255Number(t[1]||t[4]),o=c.getBase255Number(t[2]||t[5]),n=c.getBase255Number(t[3]||t[6]);return{r:Math.min(e,255),g:Math.min(o,255),b:Math.min(n,255)}},o[s.ColorModel.RGBA]=function(r){var e=r.match(s.COLORREGS.RGBA),o=c.getBase255Number(e[1]||e[4]),n=c.getBase255Number(e[2]||e[5]),u=c.getBase255Number(e[3]||e[6]),a=+e[7];return{r:Math.min(o,255),g:Math.min(n,255),b:Math.min(u,255),a:t.normalizeAlpha(a)}},o[s.ColorModel.HSL]=function(r){var e=r.match(s.COLORREGS.HSL),o=t.normalizeHue(+e[1]),n=c.percent(e[2]),u=c.percent(e[3]);return d.hslToRGB(o,n,u)},o[s.ColorModel.HSLA]=function(r){var e=r.match(s.COLORREGS.HSLA),o=t.normalizeHue(+e[1]),n=c.percent(e[2]),u=c.percent(e[3]),a=+e[4],i=d.hslToRGB(o,n,u);return i.a=t.normalizeAlpha(a),i},o[s.ColorModel.CMYK]=function(r){var t=r.match(s.COLORREGS.CMYK),e=c.getCMYKNumber(t[1]||t[5]),o=c.getCMYKNumber(t[2]||t[6]),n=c.getCMYKNumber(t[3]||t[7]),u=c.getCMYKNumber(t[4]||t[8]);return d.cmykToRGB(e,o,n,u)},o),t.getRGBObjectFromObject=((n={})[s.ColorModel.HEX]=function(r){var t={r:c.getBase255Number(""+r.r),g:c.getBase255Number(""+r.g),b:c.getBase255Number(""+r.b)};return t.a=c.hasProp(r,"a")?Math.min(c.getBase255Number(""+r.a,!0),1):1,t},n[s.ColorModel.RGB]=function(r){var t=this.HEX(r);return c.hasProp(t,"a")&&delete t.a,t},n[s.ColorModel.RGBA]=function(r){return this.HEX(r)},n[s.ColorModel.HSL]=function(r){var e=c.percent(""+r.s),o=c.percent(""+r.l);return d.hslToRGB(t.normalizeHue(r.h),e,o)},n[s.ColorModel.HSLA]=function(r){var e=this.HSL(r);return e.a=t.normalizeAlpha(r.a),e},n[s.ColorModel.CMYK]=function(r){var t=c.getCMYKNumber(""+r.c),e=c.getCMYKNumber(""+r.m),o=c.getCMYKNumber(""+r.y),n=c.getCMYKNumber(""+r.k);return d.cmykToRGB(t,e,o,n)},n),t.getRGBObject=function(r,e){return void 0===e&&(e=t.getColorModel(r)),"string"==typeof r?t.getRGBObjectFromString[e](r):t.getRGBObjectFromObject[e](r)},t.translateColor=((u={})[s.ColorModel.HEX]=function(r){return{r:c.getHEX(r.r),g:c.getHEX(r.g),b:c.getHEX(r.b)}},u.HEXA=function(r){var e=t.translateColor.HEX(r);return e.a=c.hasProp(r,"a")?c.getHEX(255*r.a):"0xFF",e},u[s.ColorModel.RGB]=function(r){return c.hasProp(r,"a")&&delete r.a,r},u[s.ColorModel.RGBA]=function(r){return r.a=c.hasProp(r,"a")?c.round(r.a,2):1,r},u[s.ColorModel.HSL]=function(r){var t=d.rgbToHSL(r.r,r.g,r.b);return delete t.a,t},u[s.ColorModel.HSLA]=function(r){var e=t.translateColor.HSL(r);return e.a=c.hasProp(r,"a")?c.round(r.a,2):1,e},u[s.ColorModel.CMYK]=function(r){return d.rgbToCMYK(r.r,r.g,r.b)},u),t.blend=function(r,e,o){var n=o-1,u=(e.r-r.r)/n,a=(e.g-r.g)/n,i=(e.b-r.b)/n,l=t.normalizeAlpha(r.a),s=(t.normalizeAlpha(e.a)-l)/n;return Array(o).fill(null).map((function(t,o){return 0===o?r:o===n?e:{r:c.round(r.r+u*o),g:c.round(r.g+a*o),b:c.round(r.b+i*o),a:c.round(l+s*o,2)}}))},t.colorHarmony=((a={buildHarmony:function(r,e){var o=t.getColorModel(r),n=t.getRGBObject(r,o),u=d.rgbToHSL(n.r,n.g,n.b,n.a),a=Object.prototype.hasOwnProperty.call(n,"a"),i="string"==typeof r;switch(o){case s.ColorModel.HEX:default:return a?this.HEXA(u,e,i):this.HEX(u,e,i);case s.ColorModel.HSL:return this.HSL(u,e,i);case s.ColorModel.HSLA:return this.HSLA(u,e,i);case s.ColorModel.RGB:return this.RGB(u,e,i);case s.ColorModel.RGBA:return this.RGBA(u,e,i)}}})[s.ColorModel.HEX]=function(r,e,o){return e(r).map((function(r){return o?h.CSS.HEX(d.hslToRGB(r.h,r.s,r.l)):t.translateColor.HEX(d.hslToRGB(r.h,r.s,r.l))}))},a.HEXA=function(r,e,o){return e(r).map((function(r){return o?h.CSS.HEX(i(i({},d.hslToRGB(r.h,r.s,r.l)),{a:255*t.normalizeAlpha(r.a)})):t.translateColor.HEXA(i(i({},d.hslToRGB(r.h,r.s,r.l)),{a:255*t.normalizeAlpha(r.a)}))}))},a[s.ColorModel.RGB]=function(r,e,o){return e(r).map((function(r){return o?h.CSS.RGB(d.hslToRGB(r.h,r.s,r.l)):t.translateColor.RGB(d.hslToRGB(r.h,r.s,r.l))}))},a[s.ColorModel.RGBA]=function(r,e,o){return e(r).map((function(r){return o?h.CSS.RGB(i(i({},d.hslToRGB(r.h,r.s,r.l)),{a:t.normalizeAlpha(r.a)})):t.translateColor.RGBA(i(i({},d.hslToRGB(r.h,r.s,r.l)),{a:t.normalizeAlpha(r.a)}))}))},a[s.ColorModel.HSL]=function(r,e,o){return e(r).map((function(r){return o?h.CSS.HSL({h:r.h,s:r.s,l:r.l}):t.translateColor.HSL(d.hslToRGB(r.h,r.s,r.l))}))},a[s.ColorModel.HSLA]=function(r,e,o){return e(r).map((function(r){return o?h.CSS.HSL(i(i({},r),{a:t.normalizeAlpha(r.a)})):t.translateColor.HSLA(i(i({},d.hslToRGB(r.h,r.s,r.l)),{a:t.normalizeAlpha(r.a)}))}))},a)}]));