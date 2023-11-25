import { ColorTranslator, Mix } from '../src';
import { COLORS } from './tests.constants';

COLORS.forEach((item): void => {

    describe(`CIE L*a*b tests for ${item.HEX}`, (): void => {

        it('Static L*a*b conversion and back from CSS string', () => {

            const lab = ColorTranslator.toCIELab(item.HEX);
            const laba = ColorTranslator.toCIELabA(item.HEX);
            const hex = ColorTranslator.toHEX(lab);
            const hexa = ColorTranslator.toHEXA(laba);
            expect(hex).toBe(item.HEX);
            expect(hexa).toBe(item.HEXA);

        });

        it('Static L*a*b conversion and back from object', () => {

            const lab = ColorTranslator.toCIELabObject(item.HEX);
            const laba = ColorTranslator.toCIELabAObject(item.HEX);
            const hex = ColorTranslator.toHEXObject(lab);
            const hexa = ColorTranslator.toHEXAObject(laba);
            expect(hex).toMatchObject(item.HEXObject);
            expect(hexa).toMatchObject(item.HEXAObject);

        });

        it('legacyCSS should be ignored', () => {

            const lab = ColorTranslator.toCIELab(item.HEX);
            const labLegacy = ColorTranslator.toCIELab(item.HEX, { legacyCSS: true });
            const labLegacyWithAlphaInPercent = ColorTranslator.toCIELabA(item.HEX, { legacyCSS: true, alphaUnit: 'percent' });
            expect(lab).toBe(labLegacy);
            expect(labLegacyWithAlphaInPercent.endsWith('/ 100%)')).toBe(true);

        });

    });

});

describe('L*a*b with percentages', (): void => {

    it('L in percentages should be the same as a number', () => {

        const Lvalues = [0, 25, 50, 75, 100];

        Lvalues.forEach((L: number): void => {

            const x = Math.floor(Math.random() * 125);

            expect(
                ColorTranslator.toHEX(`lab(${L} ${x} ${x})`)
            ).toBe(
                ColorTranslator.toHEX(`lab(${L}% ${x} ${x})`)
            );

        });

    });

    it('a or b in percentages should be the same as a number', () => {

        const values = [
            [-125, '-100%'],
            [-25, '-20%'],
            [-62.5, '-50%'],
            [0, '0%'],
            [25, '20%'],
            [62.5, '50%'],
            [125, '100%'],
        ];

        values.forEach((v): void => {

            const L = Math.floor(Math.random() * 100);
            const x = Math.floor(Math.random() * 125);

            expect(
                ColorTranslator.toHEX(`lab(${L}% ${v[0]} ${x})`)
            ).toBe(
                ColorTranslator.toHEX(`lab(${L}% ${v[1]} ${x})`)
            );

            expect(
                ColorTranslator.toHEX(`lab(${L}% ${x} ${v[0]})`)
            ).toBe(
                ColorTranslator.toHEX(`lab(${L}% ${x} ${v[1]})`)
            );

        });

        console.log( ColorTranslator.toCIELab('#F0F', { decimals: 0 }));
        console.log(ColorTranslator.getMixHEX(['#F00', '#00F'], Mix.ADDITIVE));
        //console.log( ColorTranslator.toCIELab('#F00', { labUnit: 'percent' }));

    });

});