var colortranslator=function(t){"use strict";var e=function(){return e=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},e.apply(this,arguments)};function n(t,e,n){if(n||2===arguments.length)for(var r,i=0,o=e.length;i<o;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))}var r,i,o,a;!function(t){t.HEX="HEX",t.RGB="RGB",t.HSL="HSL",t.CMYK="CMYK"}(r||(r={})),t.Harmony=void 0,(i=t.Harmony||(t.Harmony={})).ANALOGOUS="ANALOGOUS",i.COMPLEMENTARY="COMPLEMENTARY",i.SPLIT_COMPLEMENTARY="SPLIT_COMPLEMENTARY",i.TRIADIC="TRIADIC",i.TETRADIC="TETRADIC",i.SQUARE="SQUARE",t.Mix=void 0,(o=t.Mix||(t.Mix={})).ADDITIVE="ADDITIVE",o.SUBTRACTIVE="SUBTRACTIVE",function(t){t.black="#000000",t.silver="#C0C0C0",t.gray="#808080",t.white="#FFFFFF",t.maroon="#800000",t.red="#FF0000",t.purple="#800080",t.fuchsia="#FF00FF",t.green="#008000",t.lime="#00FF00",t.olive="#808000",t.yellow="#FFFF00",t.navy="#000080",t.blue="#0000FF",t.teal="#008080",t.aqua="#00FFFF",t.orange="#FFA500",t.aliceblue="#F0F8FF",t.antiquewhite="#FAEBD7",t.aquamarine="#7FFFD4",t.azure="#F0FFFF",t.beige="#F5F5DC",t.bisque="#FFE4C4",t.blanchedalmond="#FFEBCD",t.blueviolet="#8A2BE2",t.brown="#A52A2A",t.burlywood="#DEB887",t.cadetblue="#5F9EA0",t.chartreuse="#7FFF00",t.chocolate="#D2691E",t.coral="#FF7F50",t.cornflowerblue="#6495ED",t.cornsilk="#FFF8DC",t.crimson="#DC143C",t.cyan="#00FFFF",t.darkblue="#00008B",t.darkcyan="#008B8B",t.darkgoldenrod="#B8860B",t.darkgray="#A9A9A9",t.darkgreen="#006400",t.darkgrey="#A9A9A9",t.darkkhaki="#BDB76B",t.darkmagenta="#8B008B",t.darkolivegreen="#556B2F",t.darkorange="#FF8C00",t.darkorchid="#9932CC",t.darkred="#8B0000",t.darksalmon="#E9967A",t.darkseagreen="#8FBC8F",t.darkslateblue="#483D8B",t.darkslategray="#2F4F4F",t.darkslategrey="#2F4F4F",t.darkturquoise="#00CED1",t.darkviolet="#9400D3",t.deeppink="#FF1493",t.deepskyblue="#00BFFF",t.dimgray="#696969",t.dimgrey="#696969",t.dodgerblue="#1E90FF",t.firebrick="#B22222",t.floralwhite="#FFFAF0",t.forestgreen="#228B22",t.gainsboro="#DCDCDC",t.ghostwhite="#F8F8FF",t.gold="#FFD700",t.goldenrod="#DAA520",t.greenyellow="#ADFF2F",t.grey="#808080",t.honeydew="#F0FFF0",t.hotpink="#FF69B4",t.indianred="#CD5C5C",t.indigo="#4B0082",t.ivory="#FFFFF0",t.khaki="#F0E68C",t.lavender="#E6E6FA",t.lavenderblush="#FFF0F5",t.lawngreen="#7CFC00",t.lemonchiffon="#FFFACD",t.lightblue="#ADD8E6",t.lightcoral="#F08080",t.lightcyan="#E0FFFF",t.lightgoldenrodyellow="#FAFAD2",t.lightgray="#D3D3D3",t.lightgreen="#90EE90",t.lightgrey="#D3D3D3",t.lightpink="#FFB6C1",t.lightsalmon="#FFA07A",t.lightseagreen="#20B2AA",t.lightskyblue="#87CEFA",t.lightslategray="#778899",t.lightslategrey="#778899",t.lightsteelblue="#B0C4DE",t.lightyellow="#FFFFE0",t.limegreen="#32CD32",t.linen="#FAF0E6",t.magenta="#FF00FF",t.mediumaquamarine="#66CDAA",t.mediumblue="#0000CD",t.mediumorchid="#BA55D3",t.mediumpurple="#9370DB",t.mediumseagreen="#3CB371",t.mediumslateblue="#7B68EE",t.mediumspringgreen="#00FA9A",t.mediumturquoise="#48D1CC",t.mediumvioletred="#C71585",t.midnightblue="#191970",t.mintcream="#F5FFFA",t.mistyrose="#FFE4E1",t.moccasin="#FFE4B5",t.navajowhite="#FFDEAD",t.oldlace="#FDF5E6",t.olivedrab="#6B8E23",t.orangered="#FF4500",t.orchid="#DA70D6",t.palegoldenrod="#EEE8AA",t.palegreen="#98FB98",t.paleturquoise="#AFEEEE",t.palevioletred="#DB7093",t.papayawhip="#FFEFD5",t.peachpuff="#FFDAB9",t.peru="#CD853F",t.pink="#FFC0CB",t.plum="#DDA0DD",t.powderblue="#B0E0E6",t.rosybrown="#BC8F8F",t.royalblue="#4169E1",t.saddlebrown="#8B4513",t.salmon="#FA8072",t.sandybrown="#F4A460",t.seagreen="#2E8B57",t.seashell="#FFF5EE",t.sienna="#A0522D",t.skyblue="#87CEEB",t.slateblue="#6A5ACD",t.slategray="#708090",t.slategrey="#708090",t.snow="#FFFAFA",t.springgreen="#00FF7F",t.steelblue="#4682B4",t.tan="#D2B48C",t.thistle="#D8BFD8",t.tomato="#FF6347",t.turquoise="#40E0D0",t.violet="#EE82EE",t.wheat="#F5DEB3",t.whitesmoke="#F5F5F5",t.yellowgreen="#9ACD32",t.rebeccapurple="#663399"}(a||(a={}));var u,c,s=Object.keys(a),d={HEX:["r","g","b","a"],RGB:["r","g","b","a"],HSL:["h","s","l","a"],CMYK:["c","m","y","k","a"]},l={BGR:r.RGB,ABGR:r.RGB,HLS:r.HSL,AHLS:r.HSL,CKMY:r.CMYK,ACKMY:r.CMYK};!function(t){t.NUMBER="number",t.BOOLEAN="boolean"}(u||(u={}));var f,h=((c={})[r.HEX]=/^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i,c[r.RGB]=/^rgba?\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,c[r.HSL]=/^hsla?\s*\(\s*(?:(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)%(?:\s*,\s*((?:\d*\.)?\d+))?|(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*((?:\d*\.)?\d+)%\s*((?:\d*\.)?\d+)%(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,c[r.CMYK]=/^(?:device-cmyk|cmyk)\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/,c),p=/^(-?(?:\d*\.)?\d+)((?:deg|grad|rad|turn)?)$/,g=/^(\d+(?:\.\d+)?|\.\d+)%$/,b=/^0x([a-f\d]{1,2})$/i,m=/\{(\d+)\}/g,A="The provided string color doesn't have a correct format",y="The provided color object doesn't have the proper keys or format";!function(t){t.NONE="none",t.DEGREES="deg",t.GRADIANS="grad",t.RADIANS="rad",t.TURNS="turn"}(f||(f={}));var E,F,v,H,B,S,C={decimals:6,legacyCSS:!1,spacesAfterCommas:!1,anglesUnit:f.NONE},M=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},R=function(t){return+"".concat(t).replace(g,"$1")},O=function(t){return g.test("".concat(t))?R(t):Math.min(+t,100)},D=function(t){return 1===t.length&&(t+=t),parseInt(t,16)},L=function(t){var e=X(t,0).toString(16).toUpperCase();return 1===e.length?"0x0".concat(e):"0x".concat(e)},G=function(t,e){return void 0===e&&(e=!1),!e&&g.test(t)?Math.min(255*R(t)/100,255):b.test(t)?(3===t.length&&(t+=t.slice(-1)),e?X(t)/255:X(t)):Math.min(+t,e?1:255)},j=function(t){return Math.min(g.test(t)?R(t)/100:+t,1)},k=function(t){return n([],t,!0).sort().join("").toUpperCase()},X=function(t,e){void 0===e&&(e=6);var n=Math.pow(10,e);return Math.round(+t*n)/n},I=function(t,e,n){return Math.max(e,Math.min(t,n))},Y=360,x=function(t){if("string"==typeof t){var e=t.match(p),n=+e[1];switch(e[2]){case f.RADIANS:t=X(180*n/Math.PI);break;case f.TURNS:t=X(n*Y);break;case f.GRADIANS:t=X(.9*n);break;case f.DEGREES:default:t=n}}return(t>360||t<0)&&(t-=Math.floor(t/Y)*Y),t},K=function(t,e){var n;switch(e){case f.RADIANS:n=X(function(t){return t*Math.PI/180}(t));break;case f.TURNS:n=X(t/Y);break;case f.GRADIANS:n=X(10/9*t);break;case f.DEGREES:case f.NONE:default:n=t}return n},T=function(t,e,n){return X(K(t,e),n)},N=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=e.filter((function(t){return"string"==typeof t})),i=r.filter((function(t){return h.HSL.test(t)})).map((function(t){var e=t.match(h.HSL),n=(e[1]||e[5]).match(p)[2];return""===n?f.NONE:n})),o={legacyCSS:0,spacesAfterCommas:0,anglesUnit:0};return r.forEach((function(t){if(t.includes(",")){o.legacyCSS++;var e=t.match(/,( +|\d+)/g);1===new Set(e).size&&/ +/.test(e[0].slice(1))&&o.spacesAfterCommas++}})),{decimals:typeof t.decimals===u.NUMBER?t.decimals:C.decimals,legacyCSS:typeof t.legacyCSS===u.BOOLEAN?t.legacyCSS:Boolean(r.length&&o.legacyCSS===r.length)||C.legacyCSS,spacesAfterCommas:typeof t.spacesAfterCommas===u.BOOLEAN?t.spacesAfterCommas:Boolean(r.length&&o.spacesAfterCommas===r.length)||C.spacesAfterCommas,anglesUnit:t.anglesUnit?t.anglesUnit:1===new Set(i).size?i[0]:C.anglesUnit}},P=function(t,e,n){return n<0&&(n+=6),n>=6&&(n-=6),X(n<1?255*((e-t)*n+t):n<3?255*e:n<4?255*((e-t)*(4-n)+t):255*t)},w=function(t,e,n){e/=100;var r=(n/=100)<=.5?n*(e+1):n+e-n*e,i=2*n-r;return{r:P(i,r,(t/=60)+2),g:P(i,r,t),b:P(i,r,t-2)}},U=function(t,e,n,r){return{r:X(255*(1-t)*(r=1-r)),g:X(255*(1-e)*r),b:X(255*(1-n)*r)}},V=function(t,e,n){t/=255,e/=255,n/=255;var r=1-Math.max(t,e,n),i=1-r,o=i&&(i-e)/i,a=i&&(i-n)/i;return{c:X(100*(i&&(i-t)/i)),m:X(100*o),y:X(100*a),k:X(100*r)}},q=function(t,e,n,r){void 0===r&&(r=1),t/=255,e/=255,n/=255,r=Math.min(r,1);var i=Math.max(t,e,n),o=Math.min(t,e,n),a=i-o,u=0,c=0,s=(i+o)/2;if(0!==a){switch(i){case t:u=(e-n)/a%6;break;case e:u=(n-t)/a+2;break;case n:u=(t-e)/a+4}(u=X(60*u))<0&&(u+=360),c=a/(1-Math.abs(2*s-1))}return{h:u,s:X(100*c),l:X(100*s),a:r}},$=function(t,e){if(t<0&&(t+=360),t>360&&(t-=360),360===t||0===t)return t;var n=[[0,120],[120,180],[180,240],[240,360]],r=[[0,60],[60,120],[120,240],[240,360]],i=e?r:n,o=0,a=0,u=0,c=0;return(e?n:r).find((function(e,n){return t>=e[0]&&t<e[1]&&(o=e[0],a=e[1],u=i[n][0],c=i[n][1],!0)})),u+(c-u)/(a-o)*(t-o)},_=function(t){return t?", ":","},z=function(t,e){void 0===e&&(e=!1);var n=k(Object.keys(t));return d[l[n]].reduce((function(n,r){var i,o,a=t[r];return void 0!==a&&(e?n.push((i=X(a,0),1===(o=X(i,0).toString(16).toUpperCase()).length&&(o="0".concat(o)),o)):n.push(a)),n}),[])},Q=function(t,e){return t.replace(m,(function(t,n){return"".concat(e[+n-1])}))},J=((E={})[r.HEX]=function(t){var e=z(t,!0),n=4===e.length?"#{1}{2}{3}{4}":"#{1}{2}{3}";return Q(n,e)},E[r.RGB]=function(t,e){var n=e.legacyCSS,r=e.spacesAfterCommas,i=_(r),o=z(t),a=n?4===o.length?"rgba({1}".concat(i,"{2}").concat(i,"{3}").concat(i,"{4})"):"rgb({1}".concat(i,"{2}").concat(i,"{3})"):4===o.length?"rgb({1} {2} {3} / {4})":"rgb({1} {2} {3})";return Q(a,o)},E[r.HSL]=function(t,e){var n=e.legacyCSS,r=e.spacesAfterCommas,i=e.anglesUnit,o=_(r),a=z(t),u=i===f.NONE?"":i,c=n?4===a.length?"hsla({1}".concat(u).concat(o,"{2}%").concat(o,"{3}%").concat(o,"{4})"):"hsl({1}".concat(u).concat(o,"{2}%").concat(o,"{3}%)"):4===a.length?"hsl({1}".concat(u," {2}% {3}% / {4})"):"hsl({1}".concat(u," {2}% {3}%)");return Q(c,a)},E[r.CMYK]=function(t,e){var n=e.legacyCSS,r=e.spacesAfterCommas,i=_(r),o=z(t),a=n?5===o.length?"device-cmyk({1}%".concat(i,"{2}%").concat(i,"{3}%").concat(i,"{4}%").concat(i,"{5})"):"device-cmyk({1}%".concat(i,"{2}%").concat(i,"{3}%").concat(i,"{4}%)"):5===o.length?"device-cmyk({1}% {2}% {3}% {4}% / {5})":"device-cmyk({1}% {2}% {3}% {4}%)";return Q(a,o)},E),W=function(t){return"string"==typeof t&&(t=g.test(t)?R(t)/100:+t),isNaN(+t)||t>1?1:X(t)},Z=function(r,i,o){return i.reduce((function(i,a){return n(n([],i,!0),[e(e({},r),{h:o===t.Mix.ADDITIVE?x(r.h+a):x($($(r.h,!1)+a,!0))})],!1)}),[e({},r)])},tt=function(t,e){return Z(t,[30,-30],e)},et=function(t,e){return Z(t,[180],e)},nt=function(t,e){return Z(t,[150,-150],e)},rt=function(t,e){return Z(t,[120,-120],e)},it=function(t,e){return Z(t,[60,-120,180],e)},ot=function(t,e){return Z(t,[90,-90,180],e)},at=function(t){return"string"==typeof t?function(t){var e;if(Object.keys(r).some((function(n){if(h[n].test(t))return e=n,!0})),!e&&~s.indexOf(t)&&(e=r.HEX),!e)throw new Error(A);return e}(t):function(t){var e,n=!1,i=k(Object.keys(t));if(l[i]&&(e=l[i]),e&&e===r.RGB){var o=Object.entries(t).some((function(t){return!b.test("".concat(t[1]))})),a=Object.entries(t).some((function(t){return!(g.test("".concat(t[1]))||!b.test("".concat(t[1]))&&!isNaN(+t[1])&&+t[1]<=255)}));o&&a&&(n=!0),o||(e=r.HEX)}if(!e||n)throw new Error(y);return e}(t)},ut=((F={})[r.HEX]=function(t){var e=(~s.indexOf(t)?a[t]:t).match(h.HEX),n={r:D(e[1]||e[5]),g:D(e[2]||e[6]),b:D(e[3]||e[7])},r=e[4]||e[8];return void 0!==r&&(n.a=D(r)/255),n},F[r.RGB]=function(t){var e=t.match(h.RGB),n=G(e[1]||e[5]),r=G(e[2]||e[6]),i=G(e[3]||e[7]),o=e[4]||e[8],a={r:Math.min(n,255),g:Math.min(r,255),b:Math.min(i,255)};return void 0!==o&&(a.a=W(o)),a},F[r.HSL]=function(t){var e=t.match(h.HSL),n=x(e[1]||e[5]),r=O(e[2]||e[6]),i=O(e[3]||e[7]),o=e[4]||e[8],a=w(n,r,i);return void 0!==o&&(a.a=W(o)),a},F[r.CMYK]=function(t){var e=t.match(h.CMYK),n=j(e[1]||e[6]),r=j(e[2]||e[7]),i=j(e[3]||e[8]),o=j(e[4]||e[9]),a=e[5]||e[10],u=U(n,r,i,o);return void 0!==a&&(u.a=W(a)),u},F),ct=((v={})[r.HEX]=function(t){var e={r:G("".concat(t.r)),g:G("".concat(t.g)),b:G("".concat(t.b))};return M(t,"a")&&(e.a=Math.min(G("".concat(t.a),!0),1)),e},v[r.RGB]=function(t){return this.HEX(t)},v[r.HSL]=function(t){var e=O("".concat(t.s)),n=O("".concat(t.l)),r=w(x(t.h),e,n);return M(t,"a")&&(r.a=W(t.a)),r},v[r.CMYK]=function(t){var e=j("".concat(t.c)),n=j("".concat(t.m)),r=j("".concat(t.y)),i=j("".concat(t.k)),o=U(e,n,r,i);return M(t,"a")&&(o.a=W(t.a)),o},v),st=function(t,e){return void 0===e&&(e=at(t)),"string"==typeof t?ut[e](t):ct[e](t)},dt=((H={})[r.HEX]=function(t){return{r:L(t.r),g:L(t.g),b:L(t.b)}},H.HEXA=function(t){var e=dt.HEX(t);return e.a=M(t,"a")?L(255*t.a):"0xFF",e},H[r.RGB]=function(t,e){return M(t,"a")&&delete t.a,pt(t,e)},H.RGBA=function(t,e){return t.a=M(t,"a")?X(t.a):1,pt(t,e)},H[r.HSL]=function(t,e){var n=q(t.r,t.g,t.b);return delete n.a,gt(n,e)},H.HSLA=function(t,e){var n=e.decimals,r=dt.HSL(t,e);return r.a=M(t,"a")?X(t.a,n):1,r},H[r.CMYK]=function(t,e){return bt(V(t.r,t.g,t.b),e)},H.CMYKA=function(t,e){var n=e.decimals,r=dt.CMYK(t,e);return r.a=M(t,"a")?X(t.a,n):1,r},H),lt=function(t,n,i,o){var a=at(t),u="string"==typeof t,c=st(t,a),s="string"==typeof t&&M(c,"a")||"string"!=typeof t&&M(t,"a"),d=q(c.r,c.g,c.b,c.a);s||delete d.a;var l=i?d.l/(n+1):(100-d.l)/(n+1),f=Array(n).fill(null).map((function(t,n){return e(e({},d),{l:d.l+l*(n+1)*(1-2*+i)})}));switch(a){case r.HEX:default:return f.map((function(t){var n=w(t.h,t.s,t.l);return s&&(n.a=t.a),u?s?J.HEX(pt(e(e({},n),{a:X(255*n.a)}),o)):J.HEX(pt(n,o)):s?dt.HEXA(n):dt.HEX(n)}));case r.RGB:return f.map((function(t){var e=w(t.h,t.s,t.l);return s&&(e.a=t.a),u?J.RGB(pt(e,o),o):s?dt.RGBA(e,o):dt.RGB(e,o)}));case r.HSL:return f.map((function(t){return u?J.HSL(gt(t,o),o):s?dt.HSLA(e(e({},w(t.h,t.s,t.l)),{a:t.a}),o):dt.HSL(w(t.h,t.s,t.l),o)}))}},ft=((B={buildHarmony:function(t,e,n,i){var o=at(t),a=st(t,o),u=q(a.r,a.g,a.b,a.a),c="string"==typeof t&&M(a,"a")||"string"!=typeof t&&M(t,"a"),s="string"==typeof t;switch(o){case r.HEX:default:return c?this.HEXA(gt(u,null),e,n,s):this.HEX(gt(u,null),e,n,s);case r.HSL:return c?this.HSLA(u,e,n,s,i):this.HSL(u,e,n,s,i);case r.RGB:return c?this.RGBA(u,e,n,s,i):this.RGB(u,e,n,s,i)}}})[r.HEX]=function(t,e,n,r){return e(t,n).map((function(t){return r?J.HEX(w(t.h,t.s,t.l)):dt.HEX(w(t.h,t.s,t.l))}))},B.HEXA=function(t,n,r,i){return n(t,r).map((function(t){return i?J.HEX(e(e({},w(t.h,t.s,t.l)),{a:255*W(t.a)})):dt.HEXA(e(e({},w(t.h,t.s,t.l)),{a:W(t.a)}))}))},B[r.RGB]=function(t,e,n,r,i){return e(t,n).map((function(t){return r?J.RGB(pt(w(t.h,t.s,t.l),i),i):dt.RGB(w(t.h,t.s,t.l),i)}))},B.RGBA=function(t,n,r,i,o){return n(t,r).map((function(t){return i?J.RGB(pt(e(e({},w(t.h,t.s,t.l)),{a:W(t.a)}),o),o):dt.RGBA(e(e({},w(t.h,t.s,t.l)),{a:W(t.a)}),o)}))},B[r.HSL]=function(t,e,n,r,i){return e(t,n).map((function(t){return r?J.HSL(gt({h:t.h,s:t.s,l:t.l},i),i):dt.HSL(w(t.h,t.s,t.l),i)}))},B.HSLA=function(t,n,r,i,o){return n(t,r).map((function(t){return i?J.HSL(gt(e(e({},t),{a:W(t.a)}),o),o):dt.HSLA(e(e({},w(t.h,t.s,t.l)),{a:W(t.a)}),o)}))},B),ht=((S={mix:function(n,r){var i,o,a,u,c,s,d,l,f,h,p,g,b,m,A,y=n.map((function(t){var e=at(t);return st(t,e)})),E=r===t.Mix.SUBTRACTIVE?y.map((function(t){var e,n,r,i,o,a,u,c,s,d,l,f,h,p,g=(e=t.r,n=t.g,r=t.b,i=Math.min(e,n,r),o=Math.min(255-e,255-n,255-r),a=e-i,u=n-i,c=r-i,s=Math.min(a,u),d=a-s,l=(u+s)/2,f=(c+u-s)/2,h=Math.max(d,l,f)/Math.max(a,u,c),p=isNaN(h)||h===1/0||h<=0?1:h,{r:d/p+o,y:l/p+o,b:f/p+o});return M(t,"a")&&(g.a=t.a),g})):null;function F(n){var i=r===t.Mix.ADDITIVE?{r:0,g:0,b:0,a:0}:{r:0,y:0,b:0,a:0};return n.reduce((function(n,i){var o=M(i,"a")?i.a:1,a={r:Math.min(n.r+i.r*o,255),b:Math.min(n.b+i.b*o,255),a:1-(1-o)*(1-n.a)},u="g"in n?n.g:n.y,c="g"in i?i.g:i.y;return e(e({},a),r===t.Mix.ADDITIVE?{g:Math.min(u+c*o,255)}:{y:Math.min(u+c*o,255)})}),i)}if(r===t.Mix.ADDITIVE)i=F(y);else{var v=F(E);o=v.r,a=v.y,u=v.b,c=Math.min(o,a,u),s=Math.min(255-o,255-a,255-u),d=o-c,l=a-c,f=u-c,h=Math.min(l,f),p=d+l-h,g=l+h,b=2*(f-h),m=Math.max(p,g,b)/Math.max(d,l,f),A=isNaN(m)||m===1/0||m<=0?1:m,(i={r:p/A+s,g:g/A+s,b:b/A+s}).a=v.a}return{r:X(i.r),g:X(i.g),b:X(i.b),a:I(i.a,0,1)}}})[r.HEX]=function(t,e,n){var r=this.mix(t,e);return delete r.a,n?J.HEX(r):dt.HEX(r)},S.HEXA=function(t,e,n){var r=this.mix(t,e);return r.a=n?255*W(r.a):W(r.a),n?J.HEX(r):dt.HEXA(r)},S[r.RGB]=function(t,e,n,r){var i=this.mix(t,e);return delete i.a,n?J.RGB(i,r):dt.RGB(i,r)},S.RGBA=function(t,e,n,r){var i=this.mix(t,e);return n?J.RGB(i,r):dt.RGBA(i,r)},S[r.HSL]=function(t,e,n,r){var i=this.mix(t,e),o=q(i.r,i.g,i.b);return delete i.a,delete o.a,n?J.HSL(o,r):dt.HSL(i,r)},S.HSLA=function(t,e,n,r){var i=this.mix(t,e),o=q(i.r,i.g,i.b,i.a);return n?J.HSL(o,r):dt.HSLA(i,r)},S),pt=function(t,n){var r=n.decimals;return e({r:X(t.r,r),g:X(t.g,r),b:X(t.b,r)},M(t,"a")?{a:X(t.a,r)}:{})},gt=function(t,n){var r=n?n.decimals:0,i=n?n.anglesUnit:f.NONE;return e({h:T(t.h,i,r),s:X(t.s,r),l:X(t.l,r)},M(t,"a")?{a:X(t.a,r)}:{})},bt=function(t,e){var n=e.decimals;return{c:X(t.c,n),m:X(t.m,n),y:X(t.y,n),k:X(t.k,n)}},mt=function(t,e,n,r){var i=N(n,t);return r(st(t,e),i)},At=function(t,e,n,r,i){var o=N(r,t,e);n<1&&(n=5);var a=function(t,e,n){var r=n-1,i=(e.r-t.r)/r,o=(e.g-t.g)/r,a=(e.b-t.b)/r,u=W(t.a),c=(W(e.a)-u)/r;return Array(n).fill(null).map((function(n,s){return 0===s?t:s===r?e:{r:X(t.r+i*s),g:X(t.g+o*s),b:X(t.b+a*s),a:X(u+c*s)}}))}(st(t),st(e),n);return a.map((function(t){return i(t,o)}))},yt=function(){function r(t,e){void 0===e&&(e={}),this._options=N(e,t),this.rgb=st(t),this.updateHSL(),this.updateCMYK()}return r.prototype.updateRGB=function(){this.rgb=e(e({},w(this.hsl.h,this.hsl.s,this.hsl.l)),{a:this.hsl.a})},r.prototype.updateRGBFromCMYK=function(){this.rgb=e(e({},U(this.cmyk.c,this.cmyk.m,this.cmyk.y,this.cmyk.k)),{a:this.rgb.a})},r.prototype.updateHSL=function(){this.hsl=q(this.rgb.r,this.rgb.g,this.rgb.b,this.rgb.a)},r.prototype.updateCMYK=function(){this.cmyk=V(this.rgb.r,this.rgb.g,this.rgb.b)},r.prototype.updateRGBAndCMYK=function(){return this.updateRGB(),this.updateCMYK(),this},r.prototype.updateHSLAndCMYK=function(){return this.updateHSL(),this.updateCMYK(),this},r.prototype.updateRGBAndHSL=function(){return this.updateRGBFromCMYK(),this.updateHSL(),this},r.prototype.setOptions=function(t){return void 0===t&&(t={}),this._options=e(e({},this._options),t),this},r.prototype.setH=function(t){return this.hsl.h=x(t),this.updateRGBAndCMYK()},r.prototype.setS=function(t){return this.hsl.s=I(t,0,100),this.updateRGBAndCMYK()},r.prototype.setL=function(t){return this.hsl.l=I(t,0,100),this.updateRGBAndCMYK()},r.prototype.setR=function(t){return this.rgb.r=I(t,0,255),this.updateHSLAndCMYK()},r.prototype.setG=function(t){return this.rgb.g=I(t,0,255),this.updateHSLAndCMYK()},r.prototype.setB=function(t){return this.rgb.b=I(t,0,255),this.updateHSLAndCMYK()},r.prototype.setA=function(t){return this.hsl.a=this.rgb.a=I(t,0,1),this},r.prototype.setC=function(t){return this.cmyk.c=I(t,0,100),this.updateRGBAndHSL()},r.prototype.setM=function(t){return this.cmyk.m=I(t,0,100),this.updateRGBAndHSL()},r.prototype.setY=function(t){return this.cmyk.y=I(t,0,100),this.updateRGBAndHSL()},r.prototype.setK=function(t){return this.cmyk.k=I(t,0,100),this.updateRGBAndHSL()},Object.defineProperty(r.prototype,"options",{get:function(){return this._options},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"H",{get:function(){return X(this.hsl.h,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"S",{get:function(){return X(this.hsl.s,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"L",{get:function(){return X(this.hsl.l,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"R",{get:function(){return X(this.rgb.r,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"G",{get:function(){return X(this.rgb.g,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"B",{get:function(){return X(this.rgb.b,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"A",{get:function(){return X(this.hsl.a,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"C",{get:function(){return X(this.cmyk.c,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"M",{get:function(){return X(this.cmyk.m,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"Y",{get:function(){return X(this.cmyk.y,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"K",{get:function(){return X(this.cmyk.k,this.options.decimals)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HEXObject",{get:function(){return dt.HEX(this.rgb)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HEXAObject",{get:function(){return dt.HEXA(this.rgb)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"RGBObject",{get:function(){return{r:this.R,g:this.G,b:this.B}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"RGBAObject",{get:function(){return e(e({},this.RGBObject),{a:this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HSLObject",{get:function(){return{h:this.H,s:this.S,l:this.L}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HSLAObject",{get:function(){return e(e({},this.HSLObject),{a:this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"CMYKObject",{get:function(){return{c:this.C,m:this.M,y:this.Y,k:this.K}},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"CMYKAObject",{get:function(){return e(e({},this.CMYKObject),{a:this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HEX",{get:function(){return J.HEX({r:this.R,g:this.G,b:this.B})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HEXA",{get:function(){return J.HEX({r:this.R,g:this.G,b:this.B,a:255*this.A})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"RGB",{get:function(){return J.RGB({r:this.R,g:this.G,b:this.B},this.options)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"RGBA",{get:function(){return J.RGB({r:this.R,g:this.G,b:this.B,a:this.A},this.options)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HSL",{get:function(){return J.HSL({h:T(this.hsl.h,this.options.anglesUnit,this.options.decimals),s:this.S,l:this.L},this.options)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"HSLA",{get:function(){return J.HSL({h:T(this.hsl.h,this.options.anglesUnit,this.options.decimals),s:this.S,l:this.L,a:this.A},this.options)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"CMYK",{get:function(){return J.CMYK({c:this.C,m:this.M,y:this.Y,k:this.K},this.options)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"CMYKA",{get:function(){return J.CMYK({c:this.C,m:this.M,y:this.Y,k:this.K,a:this.A},this.options)},enumerable:!1,configurable:!0}),r.toHEXObject=function(t){var e=at(t);return mt(t,e,{decimals:0},dt.HEX)},r.toHEX=function(t){return J.HEX(r.toHEXObject(t))},r.toHEXAObject=function(t){var e=at(t);return mt(t,e,{decimals:0},dt.HEXA)},r.toHEXA=function(t){return J.HEX(r.toHEXAObject(t))},r.toRGBObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.RGB)},r.toRGB=function(t,e){return void 0===e&&(e={}),J.RGB(r.toRGBObject(t,e),N(e,t))},r.toRGBAObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.RGBA)},r.toRGBA=function(t,e){return void 0===e&&(e={}),J.RGB(r.toRGBAObject(t,e),N(e,t))},r.toHSLObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.HSL)},r.toHSL=function(t,e){return void 0===e&&(e={}),J.HSL(r.toHSLObject(t,e),N(e,t))},r.toHSLAObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.HSLA)},r.toHSLA=function(t,e){return void 0===e&&(e={}),J.HSL(r.toHSLAObject(t,e),N(e,t))},r.toCMYKObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.CMYK)},r.toCMYK=function(t,e){return void 0===e&&(e={}),J.CMYK(r.toCMYKObject(t,e),N(e,t))},r.toCMYKAObject=function(t,e){void 0===e&&(e={});var n=at(t);return mt(t,n,e,dt.CMYKA)},r.toCMYKA=function(t,e){return void 0===e&&(e={}),J.CMYK(r.toCMYKAObject(t,e),N(e,t))},r.getBlendHEXObject=function(t,e,n){return void 0===n&&(n=5),At(t,e,n,{decimals:0},dt.HEX)},r.getBlendHEX=function(t,e,n){return void 0===n&&(n=5),r.getBlendHEXObject(t,e,n).map((function(t){return J.HEX(t)}))},r.getBlendHEXAObject=function(t,e,n){return void 0===n&&(n=5),At(t,e,n,{decimals:0},dt.HEXA)},r.getBlendHEXA=function(t,e,n){return void 0===n&&(n=5),r.getBlendHEXAObject(t,e,n).map((function(t){return J.HEX(t)}))},r.getBlendRGBObject=function(t,e,n,r){return void 0===n&&(n=5),void 0===r&&(r={}),At(t,e,n,r,dt.RGB)},r.getBlendRGB=function(t,e,n,i){return void 0===n&&(n=5),void 0===i&&(i={}),r.getBlendRGBObject(t,e,n,i).map((function(n){return J.RGB(n,N(i,t,e))}))},r.getBlendRGBAObject=function(t,e,n,r){return void 0===n&&(n=5),void 0===r&&(r={}),At(t,e,n,r,dt.RGBA)},r.getBlendRGBA=function(t,e,n,i){return void 0===n&&(n=5),void 0===i&&(i={}),r.getBlendRGBAObject(t,e,n,i).map((function(n){return J.RGB(n,N(i,t,e))}))},r.getBlendHSLObject=function(t,e,n,r){return void 0===n&&(n=5),void 0===r&&(r={}),At(t,e,n,r,dt.HSL)},r.getBlendHSL=function(t,e,n,i){return void 0===n&&(n=5),void 0===i&&(i={}),r.getBlendHSLObject(t,e,n,i).map((function(n){return J.HSL(n,N(i,t,e))}))},r.getBlendHSLAObject=function(t,e,n,r){return void 0===n&&(n=5),void 0===r&&(r={}),At(t,e,n,r,dt.HSLA)},r.getBlendHSLA=function(t,e,n,i){return void 0===n&&(n=5),void 0===i&&(i={}),r.getBlendHSLAObject(t,e,n,i).map((function(n){return J.HSL(n,N(i,t,e))}))},r.getMixHEXObject=function(e,n){return void 0===n&&(n=t.Mix.ADDITIVE),ht.HEX(e,n,!1)},r.getMixHEX=function(e,n){return void 0===n&&(n=t.Mix.ADDITIVE),ht.HEX(e,n,!0)},r.getMixHEXAObject=function(e,n){return void 0===n&&(n=t.Mix.ADDITIVE),ht.HEXA(e,n,!1)},r.getMixHEXA=function(e,n){return void 0===n&&(n=t.Mix.ADDITIVE),ht.HEXA(e,n,!0)},r.getMixRGBObject=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.RGB(e,r,!1,N.apply(void 0,n([i],e,!1)))},r.getMixRGB=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.RGB(e,r,!0,N.apply(void 0,n([i],e,!1)))},r.getMixRGBAObject=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.RGBA(e,r,!1,N.apply(void 0,n([i],e,!1)))},r.getMixRGBA=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.RGBA(e,r,!0,N.apply(void 0,n([i],e,!1)))},r.getMixHSLObject=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.HSL(e,r,!1,N.apply(void 0,n([i],e,!1)))},r.getMixHSL=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.HSL(e,r,!0,N.apply(void 0,n([i],e,!1)))},r.getMixHSLAObject=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.HSLA(e,r,!1,N.apply(void 0,n([i],e,!1)))},r.getMixHSLA=function(e,r,i){return void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),ht.HSLA(e,r,!0,N.apply(void 0,n([i],e,!1)))},r.getShades=function(t,e,n){return void 0===n&&(n={}),lt(t,e,!0,N(n,t))},r.getTints=function(t,e,n){return void 0===n&&(n={}),lt(t,e,!1,N(n,t))},r.getHarmony=function(e,n,r,i){return void 0===n&&(n=t.Harmony.COMPLEMENTARY),void 0===r&&(r=t.Mix.ADDITIVE),void 0===i&&(i={}),function(e,n,r,i){var o;return(o={},o[t.Harmony.ANALOGOUS]=ft.buildHarmony(n,tt,r,i),o[t.Harmony.COMPLEMENTARY]=ft.buildHarmony(n,et,r,i),o[t.Harmony.SPLIT_COMPLEMENTARY]=ft.buildHarmony(n,nt,r,i),o[t.Harmony.TRIADIC]=ft.buildHarmony(n,rt,r,i),o[t.Harmony.TETRADIC]=ft.buildHarmony(n,it,r,i),o[t.Harmony.SQUARE]=ft.buildHarmony(n,ot,r,i),o)[e]}(n,e,r,N(i,e))},r}();return t.ColorTranslator=yt,t}({});
