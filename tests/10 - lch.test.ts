import { ColorTranslator } from '../src';
import { COLORS } from './tests.constants';

COLORS.forEach((item): void => {

    describe(`LCH tests for ${item.HEX}`, (): void => {

        it('Static LCH conversion and back from CSS string', () => {

            const lch = ColorTranslator.toLCH(item.HEX);
            const lcha = ColorTranslator.toLCHA(item.HEX);
            const hex = ColorTranslator.toHEX(lch);
            const hexa = ColorTranslator.toHEXA(lcha);
            expect(hex).toBe(item.HEX);
            expect(hexa).toBe(item.HEXA);

        });

        it('Static LCH conversion and back from object', () => {

            const lch = ColorTranslator.toLCHObject(item.HEX);
            const lcha = ColorTranslator.toLCHAObject(item.HEX);
            const hex = ColorTranslator.toHEXObject(lch);
            const hexa = ColorTranslator.toHEXAObject(lcha);
            expect(hex).toMatchObject(item.HEXObject);
            expect(hexa).toMatchObject(item.HEXAObject);

        });

        it('legacyCSS should be ignored', () => {

            const lch = ColorTranslator.toLCH(item.HEX);
            const lchLegacy = ColorTranslator.toLCH(item.HEX, { legacyCSS: true });
            const lchLegacyWithAlphaInPercent = ColorTranslator.toLCHA(item.HEX, { legacyCSS: true, alphaUnit: 'percent' });
            expect(lch).toBe(lchLegacy);
            expect(lchLegacyWithAlphaInPercent.endsWith('/ 100%)')).toBe(true);

        });

    });

});

describe('LCH with percentages', (): void => {

    it('L and C in percentages should be the same as a number', () => {

        const percentages = [0, 25, 50, 75, 100];

        percentages.forEach((value: number): void => {

            const C = 150 * (value / 100);
            const H = Math.floor(Math.random() * 360);

            expect(
                ColorTranslator.toHEX(`lch(${value} ${C} ${H})`)
            ).toBe(
                ColorTranslator.toHEX(`lch(${value}% ${value}% ${H})`)
            );

        });

    });

});

describe('LCH with alpha', (): void => {

    it('Alpha by default should be 1 if not specified', () => {
        expect(
            ColorTranslator.toLCHA('rgb(255 0 0)', { decimals: 1 }).endsWith('/ 1)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toLCHAObject('rgb(255 0 0)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            1
        );
    });

    it('Alpha with a number should be maintained', () => {
        expect(
            ColorTranslator.toLCHA('rgb(255 0 0 / 0.5)', { decimals: 1 }).endsWith('/ 0.5)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toLCHAObject('rgb(255 0 0 / 0.5)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            0.5
        );
    });

    it('Alpha with a percentage should be maintained', () => {
        expect(
            ColorTranslator.toLCHA('rgb(255 0 0 / 50%)', { decimals: 1 }).endsWith('/ 50%)')
        ).toBe(
            true
        );
        expect(
            ColorTranslator.toLCHAObject('rgb(255 0 0 / 50%)', { decimals: 1 })
        ).toHaveProperty(
            'A',
            0.5
        );
    });

    it('Alpha should not be present in non-alpha methods', () => {
        expect(
            ColorTranslator.toLCH('rgb(255 0 0 / 1)', { decimals: 1 }).endsWith('/ 1)')
        ).toBe(
            false
        );
        expect(
            ColorTranslator.toLCHObject('rgb(255 0 0 / 0.5)', { decimals: 1 })
        ).not.toHaveProperty(
            'A'
        );
    });

});