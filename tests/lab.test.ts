import { ColorTranslator } from '../src';
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

    });

});

describe('L*a*b with alpha', (): void => {

    it('Alpha by default should be 1 if not specified', () => {
        expect(
            ColorTranslator.toCIELabA('rgb(255 0 0)', { decimals: 1 }).endsWith('/ 1)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toCIELabAObject('rgb(255 0 0)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            1
        );
    });

    it('Alpha with a number should be maintained', () => {
        expect(
            ColorTranslator.toCIELabA('rgb(255 0 0 / 0.5)', { decimals: 1 }).endsWith('/ 0.5)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toCIELabAObject('rgb(255 0 0 / 0.5)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            0.5
        );
    });

    it('Alpha with a percentage should be maintained', () => {
        expect(
            ColorTranslator.toCIELabA('rgb(255 0 0 / 50%)', { decimals: 1 }).endsWith('/ 50%)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toCIELabAObject('rgb(255 0 0 / 50%)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            0.5
        );
    });

    it('Alpha should not be present in non-alpha methods', () => {
        expect(
            ColorTranslator.toCIELab('rgb(255 0 0 / 1)', { decimals: 1 }).endsWith('/ 1)')
        ).toBe(
            false
        );
        expect(
            ColorTranslator.toCIELabObject('rgb(255 0 0 / 0.5)', { decimals: 1 })
        ).not.toHaveProperty(
            'A'
        );
    });

});