var colortranslator = (function (t) {
    'use strict';
    var e = function () {
        return (
            (e =
                Object.assign ||
                function (t) {
                    for (var e, n = 1, r = arguments.length; n < r; n++)
                        for (var i in (e = arguments[n]))
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t;
                }),
            e.apply(this, arguments)
        );
    };
    function n(t, e, n) {
        if (n || 2 === arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
                (!r && i in e) || (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
        return t.concat(r || Array.prototype.slice.call(e));
    }
    var r, i, o, a;
    !(function (t) {
        (t.HEX = 'HEX'), (t.RGB = 'RGB'), (t.HSL = 'HSL'), (t.CIELab = 'CIELab'), (t.CMYK = 'CMYK');
    })(r || (r = {})),
        (t.Harmony = void 0),
        ((i = t.Harmony || (t.Harmony = {})).ANALOGOUS = 'ANALOGOUS'),
        (i.COMPLEMENTARY = 'COMPLEMENTARY'),
        (i.SPLIT_COMPLEMENTARY = 'SPLIT_COMPLEMENTARY'),
        (i.TRIADIC = 'TRIADIC'),
        (i.TETRADIC = 'TETRADIC'),
        (i.SQUARE = 'SQUARE'),
        (t.Mix = void 0),
        ((o = t.Mix || (t.Mix = {})).ADDITIVE = 'ADDITIVE'),
        (o.SUBTRACTIVE = 'SUBTRACTIVE'),
        (function (t) {
            (t.black = '#000000'),
                (t.silver = '#C0C0C0'),
                (t.gray = '#808080'),
                (t.white = '#FFFFFF'),
                (t.maroon = '#800000'),
                (t.red = '#FF0000'),
                (t.purple = '#800080'),
                (t.fuchsia = '#FF00FF'),
                (t.green = '#008000'),
                (t.lime = '#00FF00'),
                (t.olive = '#808000'),
                (t.yellow = '#FFFF00'),
                (t.navy = '#000080'),
                (t.blue = '#0000FF'),
                (t.teal = '#008080'),
                (t.aqua = '#00FFFF'),
                (t.orange = '#FFA500'),
                (t.aliceblue = '#F0F8FF'),
                (t.antiquewhite = '#FAEBD7'),
                (t.aquamarine = '#7FFFD4'),
                (t.azure = '#F0FFFF'),
                (t.beige = '#F5F5DC'),
                (t.bisque = '#FFE4C4'),
                (t.blanchedalmond = '#FFEBCD'),
                (t.blueviolet = '#8A2BE2'),
                (t.brown = '#A52A2A'),
                (t.burlywood = '#DEB887'),
                (t.cadetblue = '#5F9EA0'),
                (t.chartreuse = '#7FFF00'),
                (t.chocolate = '#D2691E'),
                (t.coral = '#FF7F50'),
                (t.cornflowerblue = '#6495ED'),
                (t.cornsilk = '#FFF8DC'),
                (t.crimson = '#DC143C'),
                (t.cyan = '#00FFFF'),
                (t.darkblue = '#00008B'),
                (t.darkcyan = '#008B8B'),
                (t.darkgoldenrod = '#B8860B'),
                (t.darkgray = '#A9A9A9'),
                (t.darkgreen = '#006400'),
                (t.darkgrey = '#A9A9A9'),
                (t.darkkhaki = '#BDB76B'),
                (t.darkmagenta = '#8B008B'),
                (t.darkolivegreen = '#556B2F'),
                (t.darkorange = '#FF8C00'),
                (t.darkorchid = '#9932CC'),
                (t.darkred = '#8B0000'),
                (t.darksalmon = '#E9967A'),
                (t.darkseagreen = '#8FBC8F'),
                (t.darkslateblue = '#483D8B'),
                (t.darkslategray = '#2F4F4F'),
                (t.darkslategrey = '#2F4F4F'),
                (t.darkturquoise = '#00CED1'),
                (t.darkviolet = '#9400D3'),
                (t.deeppink = '#FF1493'),
                (t.deepskyblue = '#00BFFF'),
                (t.dimgray = '#696969'),
                (t.dimgrey = '#696969'),
                (t.dodgerblue = '#1E90FF'),
                (t.firebrick = '#B22222'),
                (t.floralwhite = '#FFFAF0'),
                (t.forestgreen = '#228B22'),
                (t.gainsboro = '#DCDCDC'),
                (t.ghostwhite = '#F8F8FF'),
                (t.gold = '#FFD700'),
                (t.goldenrod = '#DAA520'),
                (t.greenyellow = '#ADFF2F'),
                (t.grey = '#808080'),
                (t.honeydew = '#F0FFF0'),
                (t.hotpink = '#FF69B4'),
                (t.indianred = '#CD5C5C'),
                (t.indigo = '#4B0082'),
                (t.ivory = '#FFFFF0'),
                (t.khaki = '#F0E68C'),
                (t.lavender = '#E6E6FA'),
                (t.lavenderblush = '#FFF0F5'),
                (t.lawngreen = '#7CFC00'),
                (t.lemonchiffon = '#FFFACD'),
                (t.lightblue = '#ADD8E6'),
                (t.lightcoral = '#F08080'),
                (t.lightcyan = '#E0FFFF'),
                (t.lightgoldenrodyellow = '#FAFAD2'),
                (t.lightgray = '#D3D3D3'),
                (t.lightgreen = '#90EE90'),
                (t.lightgrey = '#D3D3D3'),
                (t.lightpink = '#FFB6C1'),
                (t.lightsalmon = '#FFA07A'),
                (t.lightseagreen = '#20B2AA'),
                (t.lightskyblue = '#87CEFA'),
                (t.lightslategray = '#778899'),
                (t.lightslategrey = '#778899'),
                (t.lightsteelblue = '#B0C4DE'),
                (t.lightyellow = '#FFFFE0'),
                (t.limegreen = '#32CD32'),
                (t.linen = '#FAF0E6'),
                (t.magenta = '#FF00FF'),
                (t.mediumaquamarine = '#66CDAA'),
                (t.mediumblue = '#0000CD'),
                (t.mediumorchid = '#BA55D3'),
                (t.mediumpurple = '#9370DB'),
                (t.mediumseagreen = '#3CB371'),
                (t.mediumslateblue = '#7B68EE'),
                (t.mediumspringgreen = '#00FA9A'),
                (t.mediumturquoise = '#48D1CC'),
                (t.mediumvioletred = '#C71585'),
                (t.midnightblue = '#191970'),
                (t.mintcream = '#F5FFFA'),
                (t.mistyrose = '#FFE4E1'),
                (t.moccasin = '#FFE4B5'),
                (t.navajowhite = '#FFDEAD'),
                (t.oldlace = '#FDF5E6'),
                (t.olivedrab = '#6B8E23'),
                (t.orangered = '#FF4500'),
                (t.orchid = '#DA70D6'),
                (t.palegoldenrod = '#EEE8AA'),
                (t.palegreen = '#98FB98'),
                (t.paleturquoise = '#AFEEEE'),
                (t.palevioletred = '#DB7093'),
                (t.papayawhip = '#FFEFD5'),
                (t.peachpuff = '#FFDAB9'),
                (t.peru = '#CD853F'),
                (t.pink = '#FFC0CB'),
                (t.plum = '#DDA0DD'),
                (t.powderblue = '#B0E0E6'),
                (t.rosybrown = '#BC8F8F'),
                (t.royalblue = '#4169E1'),
                (t.saddlebrown = '#8B4513'),
                (t.salmon = '#FA8072'),
                (t.sandybrown = '#F4A460'),
                (t.seagreen = '#2E8B57'),
                (t.seashell = '#FFF5EE'),
                (t.sienna = '#A0522D'),
                (t.skyblue = '#87CEEB'),
                (t.slateblue = '#6A5ACD'),
                (t.slategray = '#708090'),
                (t.slategrey = '#708090'),
                (t.snow = '#FFFAFA'),
                (t.springgreen = '#00FF7F'),
                (t.steelblue = '#4682B4'),
                (t.tan = '#D2B48C'),
                (t.thistle = '#D8BFD8'),
                (t.tomato = '#FF6347'),
                (t.turquoise = '#40E0D0'),
                (t.violet = '#EE82EE'),
                (t.wheat = '#F5DEB3'),
                (t.whitesmoke = '#F5F5F5'),
                (t.yellowgreen = '#9ACD32'),
                (t.rebeccapurple = '#663399');
        })(a || (a = {}));
    var u,
        c,
        s = Object.keys(a),
        d = {
            HEX: ['R', 'G', 'B', 'A'],
            RGB: ['R', 'G', 'B', 'A'],
            HSL: ['H', 'S', 'L', 'A'],
            CIELab: ['L', 'a', 'b', 'A'],
            CMYK: ['C', 'M', 'Y', 'K', 'A']
        },
        l = {
            BGR: r.RGB,
            ABGR: r.RGB,
            HLS: r.HSL,
            AHLS: r.HSL,
            LAB: r.CIELab,
            ALAB: r.CIELab,
            CKMY: r.CMYK,
            ACKMY: r.CMYK
        };
    !(function (t) {
        (t.NUMBER = 'number'), (t.BOOLEAN = 'boolean');
    })(u || (u = {}));
    var f,
        h,
        b,
        p =
            (((c = {})[r.HEX] =
                /^#(?:([a-f\d])([a-f\d])([a-f\d])([a-f\d])?|([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/i),
            (c[r.RGB] =
                /^rgba?\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/),
            (c[r.HSL] =
                /^hsla?\s*\(\s*(?:(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*,\s*((?:\d*\.)?\d+)%\s*,\s*((?:\d*\.)?\d+)%(?:\s*,\s*((?:\d*\.)?\d+))?|(-?(?:\d*\.)?\d+(?:deg|grad|rad|turn)?)\s*((?:\d*\.)?\d+)%\s*((?:\d*\.)?\d+)%(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/),
            (c[r.CIELab] =
                /^lab\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*(-?(?:\d*\.)?\d+%?)\s*(-?(?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/),
            (c[r.CMYK] =
                /^(?:device-cmyk|cmyk)\s*\(\s*(?:((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)\s*,\s*((?:\d*\.)?\d+%?)(?:\s*,\s*((?:\d*\.)?\d+))?|((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)\s*((?:\d*\.)?\d+%?)(?:\s*\/\s*((?:\d*\.)?\d+%?))?)\s*\)$/),
            c),
        A = /^(-?(?:\d*\.)?\d+)((?:deg|grad|rad|turn)?)$/,
        E = /^(-?\d+(?:\.\d+)?|-?\.\d+)%$/,
        m = /^0x([a-f\d]{1,2})$/i,
        g = /\{(\d+)\}/g,
        C = /,( +|\d+)/g,
        L = / +/,
        v = "The provided string color doesn't have a correct format",
        y = "The provided color object doesn't have the proper keys or format";
    !(function (t) {
        (t.NONE = 'none'),
            (t.DEGREES = 'deg'),
            (t.GRADIANS = 'grad'),
            (t.RADIANS = 'rad'),
            (t.TURNS = 'turn');
    })(f || (f = {})),
        (function (t) {
            (t.NONE = 'none'), (t.PERCENT = 'percent');
        })(h || (h = {})),
        (function (t) {
            (t.DEVICE_CMYK = 'device-cmyk'), (t.CMYK = 'cmyk');
        })(b || (b = {}));
    var B,
        H,
        F,
        R,
        S,
        M,
        I = {
            decimals: 6,
            legacyCSS: !1,
            spacesAfterCommas: !1,
            anglesUnit: f.NONE,
            rgbUnit: h.NONE,
            labUnit: h.NONE,
            cmykUnit: h.PERCENT,
            alphaUnit: h.NONE,
            cmykFunction: b.DEVICE_CMYK
        },
        G = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        },
        O = function (t) {
            return +''.concat(t).replace(E, '$1');
        },
        D = function (t) {
            return E.test(''.concat(t)) ? O(t) : Math.min(+t, 100);
        },
        j = function (t) {
            return 1 === t.length && (t += t), parseInt(t, 16);
        },
        Y = function (t) {
            var e = x(t, 0).toString(16).toUpperCase();
            return 1 === e.length ? '0x0'.concat(e) : '0x'.concat(e);
        },
        k = function (t, e) {
            return (
                void 0 === e && (e = !1),
                !e && E.test(t)
                    ? Math.min((255 * O(t)) / 100, 255)
                    : m.test(t)
                      ? (3 === t.length && (t += t.slice(-1)), e ? x(t) / 255 : x(t))
                      : Math.min(+t, e ? 1 : 255)
            );
        },
        K = function (t) {
            return E.test(t) ? N((125 * O(t)) / 100, -125, 125) : N(+t, -125, 125);
        },
        X = function (t) {
            return Math.min(E.test(t) ? O(t) / 100 : +t, 1);
        },
        T = function (t) {
            return n([], t, !0).sort().join('').toUpperCase();
        },
        x = function (t, e) {
            void 0 === e && (e = 6);
            var n = Math.pow(10, e);
            return Math.round(+t * n) / n;
        },
        N = function (t, e, n) {
            return Math.max(e, Math.min(t, n));
        },
        P = 360,
        U = function (t) {
            if ('string' == typeof t) {
                var e = t.match(A),
                    n = +e[1];
                switch (e[2]) {
                    case f.RADIANS:
                        t = x((180 * n) / Math.PI);
                        break;
                    case f.TURNS:
                        t = x(n * P);
                        break;
                    case f.GRADIANS:
                        t = x(0.9 * n);
                        break;
                    case f.DEGREES:
                    default:
                        t = n;
                }
            }
            return (t > 360 || t < 0) && (t -= Math.floor(t / P) * P), t;
        },
        w = function (t, e) {
            var n;
            switch (e) {
                case f.RADIANS:
                    n = x(
                        (function (t) {
                            return (t * Math.PI) / 180;
                        })(t)
                    );
                    break;
                case f.TURNS:
                    n = x(t / P);
                    break;
                case f.GRADIANS:
                    n = x((10 / 9) * t);
                    break;
                case f.DEGREES:
                case f.NONE:
                default:
                    n = t;
            }
            return n;
        },
        V = function (t) {
            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            for (
                var r = [],
                    i = [],
                    o = [],
                    a = [],
                    c = [],
                    s = [],
                    d = Object.values(f),
                    l = Object.values(h),
                    m = Object.values(b),
                    g = { legacyCSS: 0, spacesAfterCommas: 0, cmykFunction: 0 },
                    v = 0,
                    y = e;
                v < y.length;
                v++
            ) {
                var B = y[v];
                if ('string' == typeof B) {
                    if ((r.push(B), B.includes(','))) {
                        g.legacyCSS++;
                        var H = B.match(C);
                        1 === new Set(H).size && L.test(H[0].slice(1)) && g.spacesAfterCommas++;
                    }
                    if (B.match(p.HSL)) {
                        var F = (K = B.match(p.HSL))[1] || K[5],
                            R = K[8],
                            S = F.match(A)[2];
                        i.push('' === S ? f.NONE : S), s.push(E.test(R));
                        continue;
                    }
                    if (p.RGB.test(B)) {
                        var M = (K = B.match(p.RGB))[1] || K[5],
                            G = K[2] || K[6],
                            O = K[3] || K[7],
                            D = K[8];
                        o.push(E.test(M) && E.test(G) && E.test(O)), s.push(E.test(D));
                        continue;
                    }
                    if (p.CIELab.test(B)) {
                        var j = (K = B.match(p.CIELab))[1],
                            Y = K[2],
                            k = K[3];
                        D = K[4];
                        a.push(E.test(j) && E.test(Y) && E.test(k)), s.push(E.test(D));
                        continue;
                    }
                    if (B.match(p.CMYK)) {
                        var K,
                            X = (K = B.match(p.CMYK))[1] || K[6],
                            T = K[2] || K[7],
                            x = K[3] || K[8],
                            N = K[4] || K[9];
                        D = K[10];
                        c.push(E.test(X) && E.test(T) && E.test(x) && E.test(N)),
                            B.startsWith('cmyk') && g.cmykFunction++,
                            s.push(E.test(D));
                    }
                }
            }
            return {
                decimals: typeof t.decimals === u.NUMBER ? t.decimals : I.decimals,
                legacyCSS:
                    typeof t.legacyCSS === u.BOOLEAN
                        ? t.legacyCSS
                        : Boolean(r.length && g.legacyCSS === r.length) || I.legacyCSS,
                spacesAfterCommas:
                    typeof t.spacesAfterCommas === u.BOOLEAN
                        ? t.spacesAfterCommas
                        : Boolean(r.length && g.spacesAfterCommas === r.length) || I.spacesAfterCommas,
                anglesUnit:
                    t.anglesUnit && d.includes(t.anglesUnit)
                        ? t.anglesUnit
                        : 1 === new Set(i).size
                          ? i[0]
                          : I.anglesUnit,
                rgbUnit:
                    t.rgbUnit && l.includes(t.rgbUnit)
                        ? t.rgbUnit
                        : 1 === new Set(o).size && o[0]
                          ? h.PERCENT
                          : I.rgbUnit,
                labUnit:
                    t.labUnit && l.includes(t.labUnit)
                        ? t.labUnit
                        : 1 === new Set(a).size && a[0]
                          ? h.PERCENT
                          : I.labUnit,
                cmykUnit:
                    t.cmykUnit && l.includes(t.cmykUnit)
                        ? t.cmykUnit
                        : 1 !== new Set(c).size || c[0]
                          ? I.cmykUnit
                          : h.NONE,
                alphaUnit:
                    t.alphaUnit && l.includes(t.alphaUnit)
                        ? t.alphaUnit
                        : 1 === new Set(s).size && s[0]
                          ? h.PERCENT
                          : I.alphaUnit,
                cmykFunction:
                    t.cmykFunction && m.includes(t.cmykFunction)
                        ? t.cmykFunction
                        : c.length && c.length === g.cmykFunction
                          ? b.CMYK
                          : I.cmykFunction
            };
        },
        q = [
            [0.4360747, 0.3850649, 0.1430804],
            [0.2225045, 0.7168786, 0.0606169],
            [0.0139322, 0.0971045, 0.7141733]
        ],
        $ = [
            [3.1338561, -1.6168667, -0.4906146],
            [-0.9787684, 1.9161415, 0.033454],
            [0.0719453, -0.2289914, 1.4052427]
        ],
        _ = q.map(function (t) {
            return t.reduce(function (t, e) {
                return t + e;
            }, 0);
        }),
        z = function (t, e, n) {
            return (
                n < 0 && (n += 6),
                n >= 6 && (n -= 6),
                x(
                    n < 1
                        ? 255 * ((e - t) * n + t)
                        : n < 3
                          ? 255 * e
                          : n < 4
                            ? 255 * ((e - t) * (4 - n) + t)
                            : 255 * t
                )
            );
        },
        Q = function (t) {
            return t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
        },
        W = function (t) {
            return t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
        },
        J = function (t, e, n, r) {
            var i = [0, 0, 0],
                o = [t, e, n];
            return (
                r.forEach(function (t, e) {
                    t.forEach(function (t, n) {
                        i[e] += t * o[n];
                    });
                }),
                i
            );
        },
        Z = function (t, e, n) {
            e /= 100;
            var r = (n /= 100) <= 0.5 ? n * (e + 1) : n + e - n * e,
                i = 2 * n - r;
            return {
                R: z(i, r, (t /= 60) + 2),
                G: z(i, r, t),
                B: z(i, r, t - 2)
            };
        },
        tt = function (t, e, n, r) {
            void 0 === r && (r = 1), (t /= 255), (e /= 255), (n /= 255), (r = Math.min(r, 1));
            var i = Math.max(t, e, n),
                o = Math.min(t, e, n),
                a = i - o,
                u = 0,
                c = 0,
                s = (i + o) / 2;
            if (0 !== a) {
                switch (i) {
                    case t:
                        u = ((e - n) / a) % 6;
                        break;
                    case e:
                        u = (n - t) / a + 2;
                        break;
                    case n:
                        u = (t - e) / a + 4;
                }
                (u = x(60 * u)) < 0 && (u += 360), (c = a / (1 - Math.abs(2 * s - 1)));
            }
            return { H: u, S: x(100 * c), L: x(100 * s), A: r };
        },
        et = function (t, e, n) {
            var r,
                i,
                o,
                a,
                u,
                c,
                s = [t / 255, e / 255, n / 255].map(Q),
                d = J(s[0], s[1], s[2], q),
                l =
                    ((r = d[0]),
                    (i = d[1]),
                    (o = d[2]),
                    (u = (a = function (t) {
                        return t > Math.pow(6 / 29, 3)
                            ? Math.cbrt(t)
                            : t / (3 * Math.pow(6 / 29, 2)) + 4 / 29;
                    })(r / _[0])),
                    [116 * (c = a(i / _[1])) - 16, 500 * (u - c), 200 * (c - a(o / _[2]))]);
            return { L: l[0], a: l[1], b: l[2] };
        },
        nt = function (t, e, n) {
            var r = (function (t, e, n) {
                    var r = function (t) {
                            return t > 6 / 29 ? Math.pow(t, 3) : 3 * Math.pow(6 / 29, 2) * (t - 4 / 29);
                        },
                        i = (t + 16) / 116,
                        o = e / 500,
                        a = n / 200;
                    return [_[0] * r(i + o), _[1] * r(i), _[2] * r(i - a)];
                })(t, e, n),
                i = J(r[0], r[1], r[2], $).map(W);
            return {
                R: N(255 * i[0], 0, 255),
                G: N(255 * i[1], 0, 255),
                B: N(255 * i[2], 0, 255)
            };
        },
        rt = function (t, e, n, r) {
            return {
                R: x(255 * (1 - t) * (r = 1 - r)),
                G: x(255 * (1 - e) * r),
                B: x(255 * (1 - n) * r)
            };
        },
        it = function (t, e, n) {
            (t /= 255), (e /= 255), (n /= 255);
            var r = 1 - Math.max(t, e, n),
                i = 1 - r,
                o = i && (i - e) / i,
                a = i && (i - n) / i;
            return {
                C: x(100 * (i && (i - t) / i)),
                M: x(100 * o),
                Y: x(100 * a),
                K: x(100 * r)
            };
        },
        ot = function (t, e) {
            if ((t < 0 && (t += 360), t > 360 && (t -= 360), 360 === t || 0 === t)) return t;
            var n = [
                    [0, 120],
                    [120, 180],
                    [180, 240],
                    [240, 360]
                ],
                r = [
                    [0, 60],
                    [60, 120],
                    [120, 240],
                    [240, 360]
                ],
                i = e ? r : n,
                o = 0,
                a = 0,
                u = 0,
                c = 0;
            return (
                (e ? n : r).find(function (e, n) {
                    return (
                        t >= e[0] && t < e[1] && ((o = e[0]), (a = e[1]), (u = i[n][0]), (c = i[n][1]), !0)
                    );
                }),
                u + ((c - u) / (a - o)) * (t - o)
            );
        },
        at = function (t) {
            return t ? ', ' : ',';
        },
        ut = function (t, e) {
            var n = T(Object.keys(t));
            return d[l[n]].reduce(function (n, r, i) {
                var o = t[r];
                return void 0 !== o && n.push(e(o, i)), n;
            }, []);
        },
        ct = function (t, e) {
            return t.replace(g, function (t, n) {
                return ''.concat(e[+n - 1]);
            });
        },
        st = function (t, e, n) {
            void 0 === n && (n = !1);
            var r = e.alphaUnit,
                i = e.legacyCSS,
                o = e.decimals;
            return r !== h.PERCENT || (i && !n) ? x(t, o) : ''.concat(x(100 * t, o), '%');
        },
        dt =
            (((B = {})[r.HEX] = function (t) {
                var e = ut(t, function (t) {
                        return (
                            (e = x(t)),
                            1 === (n = x(e, 0).toString(16).toUpperCase()).length && (n = '0'.concat(n)),
                            n
                        );
                        var e, n;
                    }),
                    n = 4 === e.length ? '#{1}{2}{3}{4}' : '#{1}{2}{3}';
                return ct(n, e);
            }),
            (B[r.RGB] = function (t, e) {
                var n = e.decimals,
                    r = e.legacyCSS,
                    i = e.spacesAfterCommas,
                    o = e.rgbUnit,
                    a = at(i),
                    u = ut(t, function (t, r) {
                        return o === h.PERCENT && r < 3
                            ? ''.concat(
                                  (function (t, e) {
                                      return x((t / 255) * 100, e);
                                  })(t, n),
                                  '%'
                              )
                            : 3 === r
                              ? st(t, e)
                              : x(t, n);
                    }),
                    c = r
                        ? 4 === u.length
                            ? 'rgba({1}'.concat(a, '{2}').concat(a, '{3}').concat(a, '{4})')
                            : 'rgb({1}'.concat(a, '{2}').concat(a, '{3})')
                        : 4 === u.length
                          ? 'rgb({1} {2} {3} / {4})'
                          : 'rgb({1} {2} {3})';
                return ct(c, u);
            }),
            (B[r.HSL] = function (t, e) {
                var n = e.decimals,
                    r = e.legacyCSS,
                    i = e.spacesAfterCommas,
                    o = e.anglesUnit,
                    a = at(i),
                    u = ut(t, function (t, r) {
                        if (0 === r && o !== f.NONE) {
                            var i = x(w(t, o), n);
                            return ''.concat(i).concat(o);
                        }
                        return 3 === r ? st(t, e) : x(t, n);
                    }),
                    c = r
                        ? 4 === u.length
                            ? 'hsla({1}'.concat(a, '{2}%').concat(a, '{3}%').concat(a, '{4})')
                            : 'hsl({1}'.concat(a, '{2}%').concat(a, '{3}%)')
                        : 4 === u.length
                          ? 'hsl({1} {2}% {3}% / {4})'
                          : 'hsl({1} {2}% {3}%)';
                return ct(c, u);
            }),
            (B[r.CIELab] = function (t, e) {
                var n = e.decimals,
                    r = e.labUnit,
                    i = ut(t, function (t, i) {
                        if (0 === i) {
                            var o = x(D(t), n);
                            return r === h.PERCENT ? ''.concat(o, '%') : ''.concat(o);
                        }
                        return i < 3
                            ? r === h.PERCENT
                                ? ''.concat(
                                      (function (t, e) {
                                          return x((t / 125) * 100, e);
                                      })(t, n),
                                      '%'
                                  )
                                : x(t, n)
                            : st(t, e, !0);
                    }),
                    o = 4 === i.length ? 'lab({1} {2} {3} / {4})' : 'lab({1} {2} {3})';
                return ct(o, i);
            }),
            (B[r.CMYK] = function (t, e) {
                var n = e.decimals,
                    r = e.legacyCSS,
                    i = e.spacesAfterCommas,
                    o = e.cmykUnit,
                    a = e.cmykFunction,
                    u = at(i),
                    c = ut(t, function (t, r) {
                        return o === h.PERCENT && r < 4
                            ? ''.concat(x(t, n), '%')
                            : 4 === r
                              ? st(t, e)
                              : x(t / 100, n);
                    }),
                    s = r
                        ? 5 === c.length
                            ? ''
                                  .concat(a, '({1}')
                                  .concat(u, '{2}')
                                  .concat(u, '{3}')
                                  .concat(u, '{4}')
                                  .concat(u, '{5})')
                            : ''.concat(a, '({1}').concat(u, '{2}').concat(u, '{3}').concat(u, '{4})')
                        : 5 === c.length
                          ? ''.concat(a, '({1} {2} {3} {4} / {5})')
                          : ''.concat(a, '({1} {2} {3} {4})');
                return ct(s, c);
            }),
            B),
        lt = function (t) {
            return 'string' == typeof t && (t = E.test(t) ? O(t) / 100 : +t), isNaN(+t) || t > 1 ? 1 : x(t);
        },
        ft = function (r, i, o) {
            return i.reduce(
                function (i, a) {
                    return n(
                        n([], i, !0),
                        [
                            e(e({}, r), {
                                H: o === t.Mix.ADDITIVE ? U(r.H + a) : U(ot(ot(r.H, !1) + a, !0))
                            })
                        ],
                        !1
                    );
                },
                [e({}, r)]
            );
        },
        ht = function (t, e) {
            return ft(t, [30, -30], e);
        },
        bt = function (t, e) {
            return ft(t, [180], e);
        },
        pt = function (t, e) {
            return ft(t, [150, -150], e);
        },
        At = function (t, e) {
            return ft(t, [120, -120], e);
        },
        Et = function (t, e) {
            return ft(t, [60, -120, 180], e);
        },
        mt = function (t, e) {
            return ft(t, [90, -90, 180], e);
        },
        gt = function (t) {
            return 'string' == typeof t
                ? (function (t) {
                      var e;
                      if (
                          (Object.keys(r).some(function (n) {
                              if (p[n].test(t)) return (e = n), !0;
                          }),
                          !e && ~s.indexOf(t) && (e = r.HEX),
                          !e)
                      )
                          throw new Error(v);
                      return e;
                  })(t)
                : (function (t) {
                      var e,
                          n = !1,
                          i = T(Object.keys(t));
                      if ((l[i] && (e = l[i]), e && e === r.RGB)) {
                          var o = Object.entries(t).some(function (t) {
                                  return !m.test(''.concat(t[1]));
                              }),
                              a = Object.entries(t).some(function (t) {
                                  return !(
                                      E.test(''.concat(t[1])) ||
                                      (!m.test(''.concat(t[1])) && !isNaN(+t[1]) && +t[1] <= 255)
                                  );
                              });
                          o && a && (n = !0), o || (e = r.HEX);
                      }
                      if (!e || n) throw new Error(y);
                      return e;
                  })(t);
        },
        Ct =
            (((H = {})[r.HEX] = function (t) {
                var e = (~s.indexOf(t) ? a[t] : t).match(p.HEX),
                    n = {
                        R: j(e[1] || e[5]),
                        G: j(e[2] || e[6]),
                        B: j(e[3] || e[7])
                    },
                    r = e[4] || e[8];
                return void 0 !== r && (n.A = j(r) / 255), n;
            }),
            (H[r.RGB] = function (t) {
                var e = t.match(p.RGB),
                    n = k(e[1] || e[5]),
                    r = k(e[2] || e[6]),
                    i = k(e[3] || e[7]),
                    o = e[4] || e[8],
                    a = {
                        R: Math.min(n, 255),
                        G: Math.min(r, 255),
                        B: Math.min(i, 255)
                    };
                return void 0 !== o && (a.A = lt(o)), a;
            }),
            (H[r.HSL] = function (t) {
                var e = t.match(p.HSL),
                    n = U(e[1] || e[5]),
                    r = D(e[2] || e[6]),
                    i = D(e[3] || e[7]),
                    o = e[4] || e[8],
                    a = Z(n, r, i);
                return void 0 !== o && (a.A = lt(o)), a;
            }),
            (H[r.CIELab] = function (t) {
                var e = t.match(p.CIELab),
                    n = D(e[1]),
                    r = K(e[2]),
                    i = K(e[3]),
                    o = e[4],
                    a = nt(n, r, i);
                return void 0 !== o && (a.A = lt(o)), a;
            }),
            (H[r.CMYK] = function (t) {
                var e = t.match(p.CMYK),
                    n = X(e[1] || e[6]),
                    r = X(e[2] || e[7]),
                    i = X(e[3] || e[8]),
                    o = X(e[4] || e[9]),
                    a = e[5] || e[10],
                    u = rt(n, r, i, o);
                return void 0 !== a && (u.A = lt(a)), u;
            }),
            H),
        Lt =
            (((F = {})[r.HEX] = function (t) {
                var e = {
                    R: k(''.concat(t.R)),
                    G: k(''.concat(t.G)),
                    B: k(''.concat(t.B))
                };
                return G(t, 'A') && (e.A = Math.min(k(''.concat(t.A), !0), 1)), e;
            }),
            (F[r.RGB] = function (t) {
                return this.HEX(t);
            }),
            (F[r.HSL] = function (t) {
                var e = D(''.concat(t.S)),
                    n = D(''.concat(t.L)),
                    r = Z(U(t.H), e, n);
                return G(t, 'A') && (r.A = lt(t.A)), r;
            }),
            (F[r.CIELab] = function (t) {
                var e = D(''.concat(t.L)),
                    n = K(''.concat(t.a)),
                    r = K(''.concat(t.b)),
                    i = nt(e, n, r);
                return G(t, 'A') && (i.A = lt(t.A)), i;
            }),
            (F[r.CMYK] = function (t) {
                var e = X(''.concat(t.C)),
                    n = X(''.concat(t.M)),
                    r = X(''.concat(t.Y)),
                    i = X(''.concat(t.K)),
                    o = rt(e, n, r, i);
                return G(t, 'A') && (o.A = lt(t.A)), o;
            }),
            F),
        vt = function (t, e) {
            return void 0 === e && (e = gt(t)), 'string' == typeof t ? Ct[e](t) : Lt[e](t);
        },
        yt =
            (((R = {})[r.HEX] = function (t) {
                return { R: Y(t.R), G: Y(t.G), B: Y(t.B) };
            }),
            (R.HEXA = function (t) {
                var e = yt.HEX(t);
                return (e.A = G(t, 'A') ? Y(255 * t.A) : '0xFF'), e;
            }),
            (R[r.RGB] = function (t, e) {
                var n = Rt(t, e);
                return G(n, 'A') && delete n.A, n;
            }),
            (R.RGBA = function (t, e) {
                var n = yt.RGB(t, e);
                return (n.A = G(t, 'A') ? x(t.A) : 1), n;
            }),
            (R[r.HSL] = function (t, e) {
                var n = tt(t.R, t.G, t.B);
                return delete n.A, St(n, e);
            }),
            (R.HSLA = function (t, e) {
                var n = yt.HSL(t, e);
                return (n.A = G(t, 'A') ? x(t.A, e) : 1), n;
            }),
            (R[r.CIELab] = function (t, e) {
                var n = et(t.R, t.G, t.B);
                return Mt(n, e);
            }),
            (R.CIELabA = function (t, e) {
                var n = yt.CIELab(t, e);
                return (n.A = G(t, 'A') ? x(t.A, e) : 1), n;
            }),
            (R[r.CMYK] = function (t, e) {
                return It(it(t.R, t.G, t.B), e);
            }),
            (R.CMYKA = function (t, e) {
                var n = yt.CMYK(t, e);
                return (n.A = G(t, 'A') ? x(t.A, e) : 1), n;
            }),
            R),
        Bt = function (t, n, i, o) {
            var a = gt(t),
                u = 'string' == typeof t,
                c = vt(t, a),
                s = ('string' == typeof t && G(c, 'A')) || ('string' != typeof t && G(t, 'A')),
                d = tt(c.R, c.G, c.B, c.A);
            s || delete d.A;
            var l = i ? d.L / (n + 1) : (100 - d.L) / (n + 1),
                f = Array(n)
                    .fill(null)
                    .map(function (t, n) {
                        return e(e({}, d), {
                            L: d.L + l * (n + 1) * (1 - 2 * +i)
                        });
                    });
            switch (a) {
                case r.HEX:
                default:
                    return f.map(function (t) {
                        var n = Z(t.H, t.S, t.L);
                        return (
                            s && (n.A = t.A),
                            u
                                ? s
                                    ? dt.HEX(e(e({}, n), { A: x(255 * n.A) }))
                                    : dt.HEX(n)
                                : s
                                  ? yt.HEXA(n)
                                  : yt.HEX(n)
                        );
                    });
                case r.RGB:
                    return f.map(function (t) {
                        var e = Z(t.H, t.S, t.L);
                        return (
                            s && (e.A = t.A),
                            u ? dt.RGB(e, o) : s ? yt.RGBA(e, o.decimals) : yt.RGB(e, o.decimals)
                        );
                    });
                case r.HSL:
                    return f.map(function (t) {
                        return u
                            ? dt.HSL(t, o)
                            : s
                              ? yt.HSLA(e(e({}, Z(t.H, t.S, t.L)), { A: t.A }), o.decimals)
                              : yt.HSL(Z(t.H, t.S, t.L), o.decimals);
                    });
                case r.CIELab:
                    return f.map(function (t) {
                        var n = Z(t.H, t.S, t.L);
                        return u
                            ? dt.CIELab(s ? yt.CIELabA(n, o.decimals) : yt.CIELab(n, o.decimals), o)
                            : s
                              ? yt.CIELabA(e(e({}, n), { A: t.A }), o.decimals)
                              : yt.CIELab(n, o.decimals);
                    });
            }
        },
        Ht =
            (((S = {
                buildHarmony: function (t, e, n, i) {
                    var o = gt(t),
                        a = vt(t, o),
                        u = tt(a.R, a.G, a.B, a.A),
                        c = ('string' == typeof t && G(a, 'A')) || ('string' != typeof t && G(t, 'A')),
                        s = 'string' == typeof t;
                    switch (o) {
                        case r.HEX:
                        default:
                            return c ? this.HEXA(St(u, 0), e, n, s) : this.HEX(St(u, 0), e, n, s);
                        case r.HSL:
                            return c ? this.HSLA(u, e, n, s, i) : this.HSL(u, e, n, s, i);
                        case r.RGB:
                            return c ? this.RGBA(u, e, n, s, i) : this.RGB(u, e, n, s, i);
                        case r.CIELab:
                            return c ? this.CIELabA(u, e, n, s, i) : this.CIELab(u, e, n, s, i);
                    }
                }
            })[r.HEX] = function (t, e, n, r) {
                return e(t, n).map(function (t) {
                    return r ? dt.HEX(Z(t.H, t.S, t.L)) : yt.HEX(Z(t.H, t.S, t.L));
                });
            }),
            (S.HEXA = function (t, n, r, i) {
                return n(t, r).map(function (t) {
                    return i
                        ? dt.HEX(e(e({}, Z(t.H, t.S, t.L)), { A: 255 * lt(t.A) }))
                        : yt.HEXA(e(e({}, Z(t.H, t.S, t.L)), { A: lt(t.A) }));
                });
            }),
            (S[r.RGB] = function (t, e, n, r, i) {
                return e(t, n).map(function (t) {
                    return r ? dt.RGB(Z(t.H, t.S, t.L), i) : yt.RGB(Z(t.H, t.S, t.L), i.decimals);
                });
            }),
            (S.RGBA = function (t, n, r, i, o) {
                return n(t, r).map(function (t) {
                    return i
                        ? dt.RGB(e(e({}, Z(t.H, t.S, t.L)), { A: lt(t.A) }), o)
                        : yt.RGBA(e(e({}, Z(t.H, t.S, t.L)), { A: lt(t.A) }), o.decimals);
                });
            }),
            (S[r.HSL] = function (t, e, n, r, i) {
                return e(t, n).map(function (t) {
                    return r ? dt.HSL({ H: t.H, S: t.S, L: t.L }, i) : yt.HSL(Z(t.H, t.S, t.L), i.decimals);
                });
            }),
            (S.HSLA = function (t, n, r, i, o) {
                return n(t, r).map(function (t) {
                    return i
                        ? dt.HSL(e(e({}, t), { A: lt(t.A) }), o)
                        : yt.HSLA(e(e({}, Z(t.H, t.S, t.L)), { A: lt(t.A) }), o.decimals);
                });
            }),
            (S[r.CIELab] = function (t, e, n, r, i) {
                return e(t, n).map(function (t) {
                    var e = Z(t.H, t.S, t.L);
                    return r ? dt.CIELab(et(e.R, e.G, e.B), i) : yt.CIELab(e, i.decimals);
                });
            }),
            (S.CIELabA = function (t, n, r, i, o) {
                return n(t, r).map(function (t) {
                    var n = Z(t.H, t.S, t.L);
                    return i
                        ? dt.CIELab(e(e({}, et(n.R, n.G, n.B)), { A: lt(t.A) }), o)
                        : yt.CIELabA(e(e({}, n), { A: lt(t.A) }), o.decimals);
                });
            }),
            S),
        Ft =
            (((M = {
                mix: function (n, r) {
                    var i,
                        o,
                        a,
                        u,
                        c,
                        s,
                        d,
                        l,
                        f,
                        h,
                        b,
                        p,
                        A,
                        E,
                        m,
                        g = n.map(function (t) {
                            var e = gt(t);
                            return vt(t, e);
                        }),
                        C =
                            r === t.Mix.SUBTRACTIVE
                                ? g.map(function (t) {
                                      var e,
                                          n,
                                          r,
                                          i,
                                          o,
                                          a,
                                          u,
                                          c,
                                          s,
                                          d,
                                          l,
                                          f,
                                          h,
                                          b,
                                          p =
                                              ((e = t.R),
                                              (n = t.G),
                                              (r = t.B),
                                              (i = Math.min(e, n, r)),
                                              (o = Math.min(255 - e, 255 - n, 255 - r)),
                                              (a = e - i),
                                              (u = n - i),
                                              (c = r - i),
                                              (s = Math.min(a, u)),
                                              (d = a - s),
                                              (l = (u + s) / 2),
                                              (f = (c + u - s) / 2),
                                              (h = Math.max(d, l, f) / Math.max(a, u, c)),
                                              (b = isNaN(h) || h === 1 / 0 || h <= 0 ? 1 : h),
                                              {
                                                  R: d / b + o,
                                                  Y: l / b + o,
                                                  B: f / b + o
                                              });
                                      return G(t, 'A') && (p.A = t.A), p;
                                  })
                                : null;
                    function L(n) {
                        var i =
                            r === t.Mix.ADDITIVE ? { R: 0, G: 0, B: 0, A: 0 } : { R: 0, Y: 0, B: 0, A: 0 };
                        return n.reduce(function (n, i) {
                            var o = G(i, 'A') ? i.A : 1,
                                a = {
                                    R: Math.min(n.R + i.R * o, 255),
                                    B: Math.min(n.B + i.B * o, 255),
                                    A: 1 - (1 - o) * (1 - n.A)
                                },
                                u = 'G' in n ? n.G : n.Y,
                                c = 'G' in i ? i.G : i.Y;
                            return e(
                                e({}, a),
                                r === t.Mix.ADDITIVE
                                    ? { G: Math.min(u + c * o, 255) }
                                    : { Y: Math.min(u + c * o, 255) }
                            );
                        }, i);
                    }
                    if (r === t.Mix.ADDITIVE) i = L(g);
                    else {
                        var v = L(C);
                        (o = v.R),
                            (a = v.Y),
                            (u = v.B),
                            (c = Math.min(o, a, u)),
                            (s = Math.min(255 - o, 255 - a, 255 - u)),
                            (d = o - c),
                            (l = a - c),
                            (f = u - c),
                            (h = Math.min(l, f)),
                            (b = d + l - h),
                            (p = l + h),
                            (A = 2 * (f - h)),
                            (E = Math.max(b, p, A) / Math.max(d, l, f)),
                            (m = isNaN(E) || E === 1 / 0 || E <= 0 ? 1 : E),
                            ((i = {
                                R: b / m + s,
                                G: p / m + s,
                                B: A / m + s
                            }).A = v.A);
                    }
                    return { R: x(i.R), G: x(i.G), B: x(i.B), A: N(i.A, 0, 1) };
                }
            })[r.HEX] = function (t, e, n) {
                var r = this.mix(t, e);
                return delete r.A, n ? dt.HEX(r) : yt.HEX(r);
            }),
            (M.HEXA = function (t, e, n) {
                var r = this.mix(t, e);
                return (r.A = n ? 255 * lt(r.A) : lt(r.A)), n ? dt.HEX(r) : yt.HEXA(r);
            }),
            (M[r.RGB] = function (t, e, n, r) {
                var i = this.mix(t, e);
                return delete i.A, n ? dt.RGB(i, r) : yt.RGB(i, r.decimals);
            }),
            (M.RGBA = function (t, e, n, r) {
                var i = this.mix(t, e);
                return n ? dt.RGB(i, r) : yt.RGBA(i, r.decimals);
            }),
            (M[r.HSL] = function (t, e, n, r) {
                var i = this.mix(t, e),
                    o = tt(i.R, i.G, i.B);
                return delete i.A, delete o.A, n ? dt.HSL(o, r) : yt.HSL(i, r.decimals);
            }),
            (M.HSLA = function (t, e, n, r) {
                var i = this.mix(t, e),
                    o = tt(i.R, i.G, i.B, i.A);
                return n ? dt.HSL(o, r) : yt.HSLA(i, r.decimals);
            }),
            (M[r.CIELab] = function (t, e, n, r) {
                var i = this.mix(t, e),
                    o = et(i.R, i.G, i.B);
                return delete i.A, n ? dt.CIELab(o, r) : yt.CIELabA(i, r.decimals);
            }),
            (M.CIELabA = function (t, e, n, r) {
                var i = this.mix(t, e),
                    o = et(i.R, i.G, i.B);
                return G(i, 'A') && (o.A = i.A), n ? dt.CIELab(o, r) : yt.CIELabA(i, r.decimals);
            }),
            M),
        Rt = function (t, n) {
            var r = x(t.R, n),
                i = x(t.G, n),
                o = x(t.B, n);
            return e({ R: r, G: i, B: o }, G(t, 'A') ? { A: x(t.A, n) } : {});
        },
        St = function (t, n) {
            return e({ H: x(t.H, n), S: x(t.S, n), L: x(t.L, n) }, G(t, 'A') ? { A: x(t.A, n) } : {});
        },
        Mt = function (t, e) {
            return { L: x(t.L, e), a: x(t.a, e), b: x(t.b, e) };
        },
        It = function (t, e) {
            return { C: x(t.C, e), M: x(t.M, e), Y: x(t.Y, e), K: x(t.K, e) };
        },
        Gt = function (t, e, n, r) {
            return r(vt(t, e), n);
        },
        Ot = function (t, e, n, r, i) {
            n < 1 && (n = 5);
            var o = (function (t, e, n) {
                var r = n - 1,
                    i = (e.R - t.R) / r,
                    o = (e.G - t.G) / r,
                    a = (e.B - t.B) / r,
                    u = lt(t.A),
                    c = (lt(e.A) - u) / r;
                return Array(n)
                    .fill(null)
                    .map(function (n, s) {
                        return 0 === s
                            ? t
                            : s === r
                              ? e
                              : {
                                    R: x(t.R + i * s),
                                    G: x(t.G + o * s),
                                    B: x(t.B + a * s),
                                    A: x(u + c * s)
                                };
                    });
            })(vt(t), vt(e), n);
            return o.map(function (t) {
                return i(t, r);
            });
        },
        Dt = (function () {
            function r(t, e) {
                void 0 === e && (e = {}),
                    (this._options = V(e, t)),
                    (this.rgb = vt(t)),
                    this.updateHSL(),
                    this.updateLab(),
                    this.updateCMYK();
            }
            return (
                (r.prototype.updateRGB = function () {
                    this.rgb = e(e({}, Z(this.hsl.H, this.hsl.S, this.hsl.L)), {
                        A: this.hsl.A
                    });
                }),
                (r.prototype.updateRGBFromCMYK = function () {
                    this.rgb = e(e({}, rt(this.cmyk.C, this.cmyk.M, this.cmyk.Y, this.cmyk.K)), {
                        A: this.rgb.A
                    });
                }),
                (r.prototype.updateRGBFromLab = function () {
                    this.rgb = e(e({}, nt(this.lab.L, this.lab.a, this.lab.b)), { A: this.rgb.A });
                }),
                (r.prototype.updateHSL = function () {
                    this.hsl = tt(this.rgb.R, this.rgb.G, this.rgb.B, this.rgb.A);
                }),
                (r.prototype.updateLab = function () {
                    this.lab = e(e({}, et(this.rgb.R, this.rgb.G, this.rgb.B)), { A: this.rgb.A });
                }),
                (r.prototype.updateCMYK = function () {
                    this.cmyk = it(this.rgb.R, this.rgb.G, this.rgb.B);
                }),
                (r.prototype.setOptions = function (t) {
                    return void 0 === t && (t = {}), (this._options = e(e({}, this._options), t)), this;
                }),
                (r.prototype.setH = function (t) {
                    return (this.hsl.H = U(t)), this.updateRGB(), this.updateLab(), this.updateCMYK(), this;
                }),
                (r.prototype.setS = function (t) {
                    return (
                        (this.hsl.S = N(t, 0, 100)),
                        this.updateRGB(),
                        this.updateLab(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setL = function (t) {
                    return (
                        (this.hsl.L = N(t, 0, 100)),
                        this.updateRGB(),
                        this.updateLab(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setR = function (t) {
                    (this.rgb.R = N(t, 0, 255)), this.updateHSL(), this.updateLab(), this.updateCMYK();
                }),
                (r.prototype.setG = function (t) {
                    return (
                        (this.rgb.G = N(t, 0, 255)),
                        this.updateHSL(),
                        this.updateLab(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setB = function (t) {
                    return (
                        (this.rgb.B = N(t, 0, 255)),
                        this.updateHSL(),
                        this.updateLab(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setCIEL = function (t) {
                    return (
                        (this.lab.L = N(t, 0, 100)),
                        this.updateRGBFromLab(),
                        this.updateHSL(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setCIEa = function (t) {
                    return (
                        (this.lab.a = N(t, -125, 125)),
                        this.updateRGBFromLab(),
                        this.updateHSL(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setCIEb = function (t) {
                    return (
                        (this.lab.b = N(t, -125, 125)),
                        this.updateRGBFromLab(),
                        this.updateHSL(),
                        this.updateCMYK(),
                        this
                    );
                }),
                (r.prototype.setA = function (t) {
                    return (this.hsl.A = this.rgb.A = N(t, 0, 1)), this;
                }),
                (r.prototype.setC = function (t) {
                    return (
                        (this.cmyk.C = N(t, 0, 100)),
                        this.updateRGBFromCMYK(),
                        this.updateHSL(),
                        this.updateLab(),
                        this
                    );
                }),
                (r.prototype.setM = function (t) {
                    return (
                        (this.cmyk.M = N(t, 0, 100)),
                        this.updateRGBFromCMYK(),
                        this.updateHSL(),
                        this.updateLab(),
                        this
                    );
                }),
                (r.prototype.setY = function (t) {
                    return (
                        (this.cmyk.Y = N(t, 0, 100)),
                        this.updateRGBFromCMYK(),
                        this.updateHSL(),
                        this.updateLab(),
                        this
                    );
                }),
                (r.prototype.setK = function (t) {
                    return (
                        (this.cmyk.K = N(t, 0, 100)),
                        this.updateRGBFromCMYK(),
                        this.updateHSL(),
                        this.updateLab(),
                        this
                    );
                }),
                Object.defineProperty(r.prototype, 'options', {
                    get: function () {
                        return this._options;
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'H', {
                    get: function () {
                        return x(this.hsl.H, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'S', {
                    get: function () {
                        return x(this.hsl.S, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'L', {
                    get: function () {
                        return x(this.hsl.L, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIEL', {
                    get: function () {
                        return x(this.lab.L, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIEa', {
                    get: function () {
                        return x(this.lab.a, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIEb', {
                    get: function () {
                        return x(this.lab.b, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'R', {
                    get: function () {
                        return x(this.rgb.R, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'G', {
                    get: function () {
                        return x(this.rgb.G, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'B', {
                    get: function () {
                        return x(this.rgb.B, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'A', {
                    get: function () {
                        return x(this.hsl.A, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'C', {
                    get: function () {
                        return x(this.cmyk.C, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'M', {
                    get: function () {
                        return x(this.cmyk.M, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'Y', {
                    get: function () {
                        return x(this.cmyk.Y, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'K', {
                    get: function () {
                        return x(this.cmyk.K, this.options.decimals);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HEXObject', {
                    get: function () {
                        return yt.HEX(this.rgb);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HEXAObject', {
                    get: function () {
                        return yt.HEXA(this.rgb);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'RGBObject', {
                    get: function () {
                        return { R: this.R, G: this.G, B: this.B };
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'RGBAObject', {
                    get: function () {
                        return e(e({}, this.RGBObject), { A: this.A });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HSLObject', {
                    get: function () {
                        return { H: this.H, S: this.S, L: this.L };
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HSLAObject', {
                    get: function () {
                        return e(e({}, this.HSLObject), { A: this.A });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIELabObject', {
                    get: function () {
                        return { L: this.CIEL, a: this.CIEa, b: this.CIEb };
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIELabAObject', {
                    get: function () {
                        return e(e({}, this.CIELabObject), { A: this.A });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CMYKObject', {
                    get: function () {
                        return { C: this.C, M: this.M, Y: this.Y, K: this.K };
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CMYKAObject', {
                    get: function () {
                        return e(e({}, this.CMYKObject), { A: this.A });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HEX', {
                    get: function () {
                        return dt.HEX({ R: this.R, G: this.G, B: this.B });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HEXA', {
                    get: function () {
                        return dt.HEX({
                            R: this.R,
                            G: this.G,
                            B: this.B,
                            A: 255 * this.A
                        });
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'RGB', {
                    get: function () {
                        return dt.RGB({ R: this.R, G: this.G, B: this.B }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'RGBA', {
                    get: function () {
                        return dt.RGB({ R: this.R, G: this.G, B: this.B, A: this.A }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HSL', {
                    get: function () {
                        return dt.HSL({ H: this.H, S: this.S, L: this.L }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'HSLA', {
                    get: function () {
                        return dt.HSL({ H: this.H, S: this.S, L: this.L, A: this.A }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIELab', {
                    get: function () {
                        return dt.CIELab({ L: this.CIEL, a: this.CIEa, b: this.CIEb }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CIELabA', {
                    get: function () {
                        return dt.CIELab(
                            {
                                L: this.CIEL,
                                a: this.CIEa,
                                b: this.CIEb,
                                A: this.A
                            },
                            this.options
                        );
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CMYK', {
                    get: function () {
                        return dt.CMYK({ C: this.C, M: this.M, Y: this.Y, K: this.K }, this.options);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(r.prototype, 'CMYKA', {
                    get: function () {
                        return dt.CMYK(
                            {
                                C: this.C,
                                M: this.M,
                                Y: this.Y,
                                K: this.K,
                                A: this.A
                            },
                            this.options
                        );
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (r.toHEXObject = function (t) {
                    var e = gt(t);
                    return Gt(t, e, 0, yt.HEX);
                }),
                (r.toHEX = function (t) {
                    return dt.HEX(r.toHEXObject(t));
                }),
                (r.toHEXAObject = function (t) {
                    var e = gt(t);
                    return Gt(t, e, 0, yt.HEXA);
                }),
                (r.toHEXA = function (t) {
                    return dt.HEX(r.toHEXAObject(t));
                }),
                (r.toRGBObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.RGB);
                }),
                (r.toRGB = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.RGB);
                    return dt.RGB(i, r);
                }),
                (r.toRGBAObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.RGBA);
                }),
                (r.toRGBA = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.RGBA);
                    return dt.RGB(i, r);
                }),
                (r.toHSLObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.HSL);
                }),
                (r.toHSL = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.HSL);
                    return dt.HSL(i, r);
                }),
                (r.toHSLAObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.HSLA);
                }),
                (r.toHSLA = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.HSLA);
                    return dt.HSL(i, r);
                }),
                (r.toCIELabObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.CIELab);
                }),
                (r.toCIELab = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.CIELab);
                    return dt.CIELab(i, r);
                }),
                (r.toCIELabAObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.CIELabA);
                }),
                (r.toCIELabA = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.CIELabA);
                    return dt.CIELab(i, r);
                }),
                (r.toCMYKObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.CMYK);
                }),
                (r.toCMYK = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.CMYK);
                    return dt.CMYK(i, r);
                }),
                (r.toCMYKAObject = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t);
                    return Gt(t, n, e.decimals, yt.CMYKA);
                }),
                (r.toCMYKA = function (t, e) {
                    void 0 === e && (e = {});
                    var n = gt(t),
                        r = V(e, t),
                        i = Gt(t, n, 6, yt.CMYKA);
                    return dt.CMYK(i, r);
                }),
                (r.getBlendHEXObject = function (t, e, n) {
                    return void 0 === n && (n = 5), Ot(t, e, n, 0, yt.HEX);
                }),
                (r.getBlendHEX = function (t, e, n) {
                    return (
                        void 0 === n && (n = 5),
                        r.getBlendHEXObject(t, e, n).map(function (t) {
                            return dt.HEX(t);
                        })
                    );
                }),
                (r.getBlendHEXAObject = function (t, e, n) {
                    return void 0 === n && (n = 5), Ot(t, e, n, 0, yt.HEXA);
                }),
                (r.getBlendHEXA = function (t, e, n) {
                    return (
                        void 0 === n && (n = 5),
                        r.getBlendHEXAObject(t, e, n).map(function (t) {
                            return dt.HEX(t);
                        })
                    );
                }),
                (r.getBlendRGBObject = function (t, e, n, r) {
                    return void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.RGB);
                }),
                (r.getBlendRGB = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5),
                        void 0 === r && (r = {}),
                        Ot(t, e, n, 6, yt.RGB).map(function (n) {
                            return dt.RGB(n, V(r, t, e));
                        })
                    );
                }),
                (r.getBlendRGBAObject = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.RGBA)
                    );
                }),
                (r.getBlendRGBA = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5),
                        void 0 === r && (r = {}),
                        Ot(t, e, n, 6, yt.RGBA).map(function (n) {
                            return dt.RGB(n, V(r, t, e));
                        })
                    );
                }),
                (r.getBlendHSLObject = function (t, e, n, r) {
                    return void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.HSL);
                }),
                (r.getBlendHSL = function (t, e, n, r) {
                    void 0 === n && (n = 5), void 0 === r && (r = {});
                    var i = V(r, t, e);
                    return Ot(t, e, n, 6, yt.HSL).map(function (t) {
                        return dt.HSL(t, i);
                    });
                }),
                (r.getBlendHSLAObject = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.HSLA)
                    );
                }),
                (r.getBlendHSLA = function (t, e, n, r) {
                    void 0 === n && (n = 5), void 0 === r && (r = {});
                    var i = V(r, t, e);
                    return Ot(t, e, n, 6, yt.HSLA).map(function (t) {
                        return dt.HSL(t, i);
                    });
                }),
                (r.getBlendCIELabObject = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.CIELab)
                    );
                }),
                (r.getBlendCIELab = function (t, e, n, r) {
                    void 0 === n && (n = 5), void 0 === r && (r = {});
                    var i = V(r, t, e);
                    return Ot(t, e, n, 6, yt.CIELab).map(function (t) {
                        return dt.CIELab(t, i);
                    });
                }),
                (r.getBlendCIELabAObject = function (t, e, n, r) {
                    return (
                        void 0 === n && (n = 5), void 0 === r && (r = {}), Ot(t, e, n, r.decimals, yt.CIELabA)
                    );
                }),
                (r.getBlendCIELabA = function (t, e, n, r) {
                    void 0 === n && (n = 5), void 0 === r && (r = {});
                    var i = V(r, t, e);
                    return Ot(t, e, n, 6, yt.CIELabA).map(function (t) {
                        return dt.CIELab(t, i);
                    });
                }),
                (r.getMixHEXObject = function (e, n) {
                    return void 0 === n && (n = t.Mix.ADDITIVE), Ft.HEX(e, n, !1);
                }),
                (r.getMixHEX = function (e, n) {
                    return void 0 === n && (n = t.Mix.ADDITIVE), Ft.HEX(e, n, !0);
                }),
                (r.getMixHEXAObject = function (e, n) {
                    return void 0 === n && (n = t.Mix.ADDITIVE), Ft.HEXA(e, n, !1);
                }),
                (r.getMixHEXA = function (e, n) {
                    return void 0 === n && (n = t.Mix.ADDITIVE), Ft.HEXA(e, n, !0);
                }),
                (r.getMixRGBObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.RGB(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixRGB = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.RGB(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixRGBAObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.RGBA(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixRGBA = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.RGBA(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixHSLObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.HSL(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixHSL = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.HSL(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixHSLAObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.HSLA(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixHSLA = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.HSLA(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixCIELabObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.CIELab(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixCIELab = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.CIELab(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixCIELabAObject = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.CIELabA(e, r, !1, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getMixCIELabA = function (e, r, i) {
                    return (
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        Ft.CIELabA(e, r, !0, V.apply(void 0, n([i], e, !1)))
                    );
                }),
                (r.getShades = function (t, e, n) {
                    return void 0 === n && (n = {}), Bt(t, e, !0, V(n, t));
                }),
                (r.getTints = function (t, e, n) {
                    return void 0 === n && (n = {}), Bt(t, e, !1, V(n, t));
                }),
                (r.getHarmony = function (e, n, r, i) {
                    return (
                        void 0 === n && (n = t.Harmony.COMPLEMENTARY),
                        void 0 === r && (r = t.Mix.ADDITIVE),
                        void 0 === i && (i = {}),
                        (function (e, n, r, i) {
                            var o;
                            return ((o = {}),
                            (o[t.Harmony.ANALOGOUS] = Ht.buildHarmony(n, ht, r, i)),
                            (o[t.Harmony.COMPLEMENTARY] = Ht.buildHarmony(n, bt, r, i)),
                            (o[t.Harmony.SPLIT_COMPLEMENTARY] = Ht.buildHarmony(n, pt, r, i)),
                            (o[t.Harmony.TRIADIC] = Ht.buildHarmony(n, At, r, i)),
                            (o[t.Harmony.TETRADIC] = Ht.buildHarmony(n, Et, r, i)),
                            (o[t.Harmony.SQUARE] = Ht.buildHarmony(n, mt, r, i)),
                            o)[e];
                        })(n, e, r, V(i, e))
                    );
                }),
                r
            );
        })();
    return (t.ColorTranslator = Dt), t;
})({});
