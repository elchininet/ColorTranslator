import { ColorTranslator } from '../src';
import {
    COLORS,
    CMYK_COLORS,
    LAB_AND_LCH_COLORS
} from './tests.constants';

const options = { decimals: 0 };
const legacyOptions = { ...options, legacyCSS: true };

COLORS.forEach((color): void => {

    let instance: ColorTranslator;
    let legacyInstance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator instance properties for ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, options);
            legacyInstance = new ColorTranslator(colorValue, legacyOptions);

            // HEX
            it(`HEX property => ${color.HEX}`, () => {
                expect(instance.HEX).toBe(color.HEX);
            });

            // HEXA
            it(`HEXA property => ${color.HEXA}`, () => {
                expect(instance.HEXA).toBe(color.HEXA);
            });

            // HEXObject
            it(`HEXObject property => ${JSON.stringify(color.HEXObject)}`, () => {
                expect(instance.HEXObject).toEqual(color.HEXObject);
            });

            // HEXAObject
            it(`HEXAObject property => ${JSON.stringify(color.HEXAObject)}`, () => {
                expect(instance.HEXAObject).toEqual(color.HEXAObject);
            });

            // RGB
            it(`RGB property => ${color.RGB}`, () => {
                expect(instance.RGB).toBe(color.RGB);
                expect(legacyInstance.RGB).toBe(color.RGBLegacy);
            });

            // RGBA
            it(`RGBA property => ${color.RGBA}`, () => {
                expect(instance.RGBA).toBe(color.RGBA);
                expect(legacyInstance.RGBA).toBe(color.RGBALegacy);
            });

            // RGBObject
            it(`RGBObject property => ${JSON.stringify(color.RGBObject)}`, () => {
                expect(instance.RGBObject).toEqual(color.RGBObject);
            });

            // RGBAObject
            it(`RGBAObject property => ${JSON.stringify(color.RGBAObject)}`, () => {
                expect(instance.RGBAObject).toEqual(color.RGBAObject);
            });

            // HSL
            it(`HSL property => ${color.HSL}`, () => {
                expect(instance.HSL).toBe(color.HSL);
                expect(legacyInstance.HSL).toBe(color.HSLLegacy);
            });

            // HSLA
            it(`HSLA property => ${color.HSLA}`, () => {
                expect(instance.HSLA).toBe(color.HSLA);
                expect(legacyInstance.HSLA).toBe(color.HSLALegacy);
            });

            // HSLObject
            it(`HSLObject property => ${JSON.stringify(color.HSLObject)}`, () => {
                expect(instance.HSLObject).toEqual(color.HSLObject);
            });

            // HSLAObject
            it(`HSLAObject property => ${JSON.stringify(color.HSLAObject)}`, () => {
                expect(instance.HSLAObject).toEqual(color.HSLAObject);
            });

            // HWB
            it(`HWB property => ${color.HWB}`, () => {
                expect(instance.HWB).toBe(color.HWB);
                expect(legacyInstance.HWB).toBe(color.HWB);
            });

            // HWBA
            it(`HWBA property => ${color.HWBA}`, () => {
                expect(instance.HWBA).toBe(color.HWBA);
                expect(legacyInstance.HWBA).toBe(color.HWBA);
            });

            // HWBObject
            it(`HWBObject property => ${JSON.stringify(color.HWBObject)}`, () => {
                expect(instance.HWBObject).toEqual(color.HWBObject);
            });

            // HWBAObject
            it(`HWBAObject property => ${JSON.stringify(color.HWBAObject)}`, () => {
                expect(instance.HWBAObject).toEqual(color.HWBAObject);
            });

            // H
            it(`H property => ${color.HSLObject.H}`, () => {
                expect(instance.H).toBe(color.HSLObject.H);
                expect(instance.H).toBe(color.HWBObject.H);
            });

            // S
            it(`S property => ${color.HSLObject.S}`, () => {
                expect(instance.S).toBe(color.HSLObject.S);
            });

            // L
            it(`L property => ${color.HSLObject.L}`, () => {
                expect(instance.L).toBe(color.HSLObject.L);
            });

            // Whiteness
            it(`Whiteness property => ${color.HWBObject.W}`, () => {
                expect(instance.Whiteness).toBe(color.HWBObject.W);
            });

            // Blackness
            it(`Blackness property => ${color.HWBObject.B}`, () => {
                expect(instance.Blackness).toBe(color.HWBObject.B);
            });

            // R
            it(`R property => ${color.RGBObject.R}`, () => {
                expect(instance.R).toBe(color.RGBObject.R);
            });

            // G
            it(`G property => ${color.RGBObject.G}`, () => {
                expect(instance.G).toBe(color.RGBObject.G);
            });

            // B
            it(`B property => ${color.RGBObject.B}`, () => {
                expect(instance.B).toBe(color.RGBObject.B);
            });

            // A
            it(`A property => ${color.RGBAObject.A}`, () => {
                expect(instance.A).toBe(color.RGBAObject.A);
            });

        });

    });

});

CMYK_COLORS.forEach((color) => {

    let instance: ColorTranslator;
    let legacyInstance: ColorTranslator;

    Object.values(color).forEach((colorValue) => {

        const colorValueStr = JSON.stringify(colorValue);

        describe(`ColorTranslator CMYK instance properties ${colorValueStr}`, () => {

            instance = new ColorTranslator(colorValue, options);
            legacyInstance = new ColorTranslator(colorValue, legacyOptions);

            // CMYK
            it(`CMYK property => ${color.CMYK}`, () => {
                expect(instance.CMYK).toBe(color.CMYK);
                expect(legacyInstance.CMYK).toBe(color.CMYKLegacy);
            });

            // CMYKA
            it(`CMYKA property => ${color.CMYKWithAlpha}`, () => {
                expect(instance.CMYKA).toBe(color.CMYKWithAlpha);
                expect(legacyInstance.CMYKA).toBe(color.CMYKLegacyWithAlpha);
            });

            // CMYKObject
            it(`CMYKObject property => ${JSON.stringify(color.CMYKIntObject100)}`, () => {
                expect(instance.CMYKObject).toEqual(color.CMYKIntObject100);
            });

            // CMYKAObject
            it(`CMYKAObject property => ${JSON.stringify(color.CMYKIntObject100WithAlpha)}`, () => {
                expect(instance.CMYKAObject).toEqual(color.CMYKIntObject100WithAlpha);
            });

            // C
            it(`C property => ${color.CMYKIntObject100.C}`, () => {
                expect(instance.C).toBe(color.CMYKIntObject100.C);
            });

            // M
            it(`M property => ${color.CMYKIntObject100.M}`, () => {
                expect(instance.M).toBe(color.CMYKIntObject100.M);
            });

            // Y
            it(`Y property => ${color.CMYKIntObject100.Y}`, () => {
                expect(instance.Y).toBe(color.CMYKIntObject100.Y);
            });

            // K
            it(`K property => ${color.CMYKIntObject100.K}`, () => {
                expect(instance.K).toBe(color.CMYKIntObject100.K);
            });

        });

    });

});

LAB_AND_LCH_COLORS.forEach((color) => {

    const { KEYWORD } = color;

    const options = { decimals: 0 };
    const instanceKeyword = new ColorTranslator(KEYWORD, options);
    const instanceKeywordPercentages = new ColorTranslator(
        KEYWORD,
        {
            ...options,
            labUnit: 'percent',
            lchUnit: 'percent',
            alphaUnit: 'percent'
        }
    );

    describe(`CIELab color tests for ${ KEYWORD }`, () => {

        it(`CIELab property => ${ color.CIELab }`, () => {
            expect(instanceKeyword.CIELab).toBe(color.CIELab);
        });

        it(`CIELabA property => ${ color.CIELabA }`, () => {
            expect(instanceKeyword.CIELabA).toBe(color.CIELabA);
        });

        it(`CIELab property in percentages => ${ color.CIELabInPrcentage }`, () => {
            expect(instanceKeywordPercentages.CIELab).toBe(color.CIELabInPrcentage);
        });

        it(`CIELabA property in percentages => ${ color.CIELabAInPrcentage }`, () => {
            expect(instanceKeywordPercentages.CIELabA).toBe(color.CIELabAInPrcentage);
        });

        it(`CIELabObject property => ${ JSON.stringify(color.CIELabObject) }`, () => {
            expect(instanceKeyword.CIELabObject).toEqual(color.CIELabObject);
        });

        it(`CIELabAObject property => ${ JSON.stringify(color.CIELabAObject) }`, () => {
            expect(instanceKeyword.CIELabAObject).toEqual(color.CIELabAObject);
        });

        it(`CIEL property => ${ color.CIELabObject.L }`, () => {
            expect(instanceKeyword.CIEL).toBe(color.CIELabObject.L);
        });

        it(`CIEa property => ${ color.CIELabObject.a }`, () => {
            expect(instanceKeyword.CIEa).toBe(color.CIELabObject.a);
        });

        it(`CIEb property => ${ color.CIELabObject.b }`, () => {
            expect(instanceKeyword.CIEb).toBe(color.CIELabObject.b);
        });

    });

    describe(`LCH color tests for ${ KEYWORD }`, () => {

        it(`LCH property => ${ color.LCH }`, () => {
            expect(instanceKeyword.LCH).toBe(color.LCH);
        });

        it(`LCHA property => ${ color.LCHA }`, () => {
            expect(instanceKeyword.LCH).toBe(color.LCH);
        });

        it(`LCH property in percentages => ${ color.LCHInPercentage }`, () => {
            expect(instanceKeywordPercentages.LCH).toBe(color.LCHInPercentage);
        });

        it(`LCHA property in percentages => ${ color.LCHAInPercentage }`, () => {
            expect(instanceKeywordPercentages.LCHA).toBe(color.LCHAInPercentage);
        });

        it(`LCHObject property => ${ JSON.stringify(color.LCHObject) }`, () => {
            expect(instanceKeyword.LCHObject).toEqual(color.LCHObject);
        });

        it(`LCHAObject property => ${ JSON.stringify(color.LCHAObject) }`, () => {
            expect(instanceKeyword.LCHAObject).toEqual(color.LCHAObject);
        });

        it(`LCHL property => ${ color.LCHObject.L }`, () => {
            expect(instanceKeyword.LCHL).toBe(color.LCHObject.L);
        });

        it(`LCHC property => ${ color.LCHObject.C }`, () => {
            expect(instanceKeyword.LCHC).toBe(color.LCHObject.C);
        });

        it(`LCHH property => ${ color.LCHObject.H }`, () => {
            expect(instanceKeyword.LCHH).toBe(color.LCHObject.H);
        });

    });

});