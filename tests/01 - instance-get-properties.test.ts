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

    describe('Colors properties round trip', () => {

        it('HEX round trip', () => {
            const instance = new ColorTranslator(color.HEX);
            const instanceAlpha = new ColorTranslator(color.HEXA);
            const instanceObject = new ColorTranslator(color.HEXObject);
            const instanceAlphaObject = new ColorTranslator(color.HEXAObject);

            expect(instance.HEX).toBe(color.HEX);
            expect(instanceAlpha.HEXA).toBe(color.HEXA);
            expect(instanceObject.HEXObject).toEqual(color.HEXObject);
            expect(instanceAlphaObject.HEXAObject).toEqual(color.HEXAObject);
        });

        it('RGB round trip', () => {
            const instance = new ColorTranslator(color.RGB);
            const instanceAlpha = new ColorTranslator(color.RGBA);
            const instanceObject = new ColorTranslator(color.RGBObject);
            const instanceAlphaObject = new ColorTranslator(color.RGBAObject);
            const legacyInstance = new ColorTranslator(color.RGBLegacy);
            const legacyInstanceAlpha = new ColorTranslator(color.RGBALegacy);

            expect(instance.RGB).toBe(color.RGB);
            expect(instanceAlpha.RGBA).toBe(color.RGBA);
            expect(instanceObject.RGBObject).toEqual(color.RGBObject);
            expect(instanceAlphaObject.RGBAObject).toEqual(color.RGBAObject);
            expect(legacyInstance.RGB).toBe(color.RGBLegacy);
            expect(legacyInstanceAlpha.RGBA).toBe(color.RGBALegacy);
        });

        it('HSL round trip', () => {
            const instance = new ColorTranslator(color.HSL);
            const instanceAlpha = new ColorTranslator(color.HSLA);
            const instancePercentages = new ColorTranslator(color.HSLAInPercentages);
            const instanceObject = new ColorTranslator(color.HSLObject);
            const instanceAlphaObject = new ColorTranslator(color.HSLAObject);
            const legacyInstance = new ColorTranslator(color.HSLLegacy);
            const legacyInstanceAlpha = new ColorTranslator(color.HSLALegacy);

            expect(instance.HSL).toBe(color.HSL);
            expect(instanceAlpha.HSLA).toBe(color.HSLA);
            expect(instancePercentages.HSLA).toBe(color.HSLAInPercentages);
            expect(instanceObject.HSLObject).toEqual(color.HSLObject);
            expect(instanceAlphaObject.HSLAObject).toEqual(color.HSLAObject);
            expect(legacyInstance.HSL).toBe(color.HSLLegacy);
            expect(legacyInstanceAlpha.HSLA).toBe(color.HSLALegacy);
        });

        it('HWB round trip', () => {
            const instance = new ColorTranslator(color.HWB);
            const instanceAlpha = new ColorTranslator(color.HWBA);
            const instanceAlphaPercentage = new ColorTranslator(color.HWBAInPercentage);
            const instanceObject = new ColorTranslator(color.HWBObject);
            const instanceAlphaObject = new ColorTranslator(color.HWBAObject);

            expect(instance.HWB).toBe(color.HWB);
            expect(instanceAlpha.HWBA).toBe(color.HWBA);
            expect(instanceAlphaPercentage.HWBA).toBe(color.HWBAInPercentage);
            expect(instanceObject.HWBObject).toEqual(color.HWBObject);
            expect(instanceAlphaObject.HWBAObject).toEqual(color.HWBAObject);
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

    describe('CMYK colors properties round trip', () => {

        it('CMYK round trip', () => {
            const instance = new ColorTranslator(color.CMYK);
            const instanceAlpha = new ColorTranslator(color.CMYKWithAlpha);
            const instanceAlphaPercentages = new ColorTranslator(color.CMYKWithAlphaInPercentages);

            const instanceInt = new ColorTranslator(color.CMYKInt);
            const instanceIntAlpha = new ColorTranslator(color.CMYKIntWithAlpha);
            const instanceIntAlphaPercentages = new ColorTranslator(color.CMYKIntWithAlphaInPercentages);
            
            const instanceLegacy = new ColorTranslator(color.CMYKLegacy);
            const instanceLegacyAlpha = new ColorTranslator(color.CMYKLegacyWithAlpha);

            const instanceIntLegacy = new ColorTranslator(color.CMYKIntLegacy);
            const instanceIntLegacyAlpha = new ColorTranslator(color.CMYKIntLegacyWithAlpha);
            const instanceIntLegacyAlphaPercentages = new ColorTranslator(color.CMYKIntWithAlphaInPercentages);

            const instanceObject = new ColorTranslator(color.CMYKObject);
            const instanceIntObject = new ColorTranslator(color.CMYKIntObject);
            const instanceInt100Object = new ColorTranslator(color.CMYKIntObject100);
            const instanceIntAlphaObject = new ColorTranslator(color.CMYKIntObjectWithAlpha);
            const instanceInt100AlphaObject = new ColorTranslator(color.CMYKIntObject100WithAlpha);

            expect(instance.CMYK).toBe(color.CMYK);
            expect(instanceAlpha.CMYKA).toBe(color.CMYKWithAlpha);
            expect(instanceAlphaPercentages.CMYKA).toBe(color.CMYKWithAlphaInPercentages);

            expect(instanceInt.CMYK).toBe(color.CMYKInt);
            expect(instanceIntAlpha.CMYKA).toBe(color.CMYKIntWithAlpha);
            expect(instanceIntAlphaPercentages.CMYKA).toBe(color.CMYKIntWithAlphaInPercentages);

            expect(instanceLegacy.CMYK).toBe(color.CMYKLegacy);
            expect(instanceLegacyAlpha.CMYKA).toBe(color.CMYKLegacyWithAlpha);

            expect(instanceIntLegacy.CMYK).toBe(color.CMYKIntLegacy);
            expect(instanceIntLegacyAlpha.CMYKA).toBe(color.CMYKIntLegacyWithAlpha);
            expect(instanceIntLegacyAlphaPercentages.CMYKA).toBe(color.CMYKIntWithAlphaInPercentages);
            
            // The round-trips for objects should go always to int 100
            expect(instanceObject.CMYKObject).toEqual(color.CMYKIntObject100);
            expect(instanceIntObject.CMYKObject).toEqual(color.CMYKIntObject100);
            expect(instanceInt100Object.CMYKObject).toEqual(color.CMYKIntObject100);
            expect(instanceIntAlphaObject.CMYKAObject).toEqual(color.CMYKIntObject100WithAlpha);
            expect(instanceInt100AlphaObject.CMYKAObject).toEqual(color.CMYKIntObject100WithAlpha);
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

    describe('CIELab and LCH round trip', () => {

        it('CIELab round trip', () => {
            const instance = new ColorTranslator(color.CIELab);
            const instancePercentages = new ColorTranslator(color.CIELabInPrcentage);
            const instanceAlpha = new ColorTranslator(color.CIELabA);
            const instanceAlphaPercentages = new ColorTranslator(color.CIELabAInPrcentage);
            const instanceObject = new ColorTranslator(color.CIELabObject);
            const instanceAlphaObject = new ColorTranslator(color.CIELabAObject);

            expect(instance.CIELab).toBe(color.CIELab);
            expect(instancePercentages.CIELab).toBe(color.CIELabInPrcentage);
            expect(instanceAlpha.CIELabA).toBe(color.CIELabA);
            expect(instanceAlphaPercentages.CIELabA).toBe(color.CIELabAInPrcentage);
            expect(instanceObject.CIELabObject).toEqual(color.CIELabObject);
            expect(instanceAlphaObject.CIELabAObject).toEqual(color.CIELabAObject);
        });

        it('LCH round trip', () => {
            const instance = new ColorTranslator(color.LCH);
            const instancePercentages = new ColorTranslator(color.LCHInPercentage);
            const instanceAlpha = new ColorTranslator(color.LCHA);
            const instanceAlphaPercentages = new ColorTranslator(color.LCHAInPercentage);
            const instanceObject = new ColorTranslator(color.LCHObject);
            const instanceAlphaObject = new ColorTranslator(color.LCHAObject);

            expect(instance.LCH).toBe(color.LCH);
            expect(instancePercentages.LCH).toBe(color.LCHInPercentage);
            expect(instanceAlpha.LCHA).toBe(color.LCHA);
            expect(instanceAlphaPercentages.LCHA).toBe(color.LCHAInPercentage);
            expect(instanceObject.LCHObject).toEqual(color.LCHObject);
            expect(instanceAlphaObject.LCHAObject).toEqual(color.LCHAObject);
        });

    });

});