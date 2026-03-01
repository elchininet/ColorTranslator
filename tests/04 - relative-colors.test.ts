import { ColorTranslator } from '../src';
import { ERRORS } from '../src/constants';

describe('Relative colors', () => {

    const TEST_CASES = [
        // RGB
        'rgb(from #FF0000 r g r)',
        'rgb(from #000000 calc(r + 255) g calc(b + 255))',
        'rgb(from hsl(0 100% 50%) r g r)',
        'rgb(from hsl(0 100% 50%) r g calc(((r - 127.5) * 2)) / 1)',
        'rgb(from rgb(0 255 0 / 1) calc(r + g + b) b calc(g / 255 + 254) / calc(alpha / 2))',
        'rgb(from rgb(from #FF0000 r g b / 1) r g calc(g * b + r) / calc(alpha - .5))',

        // HSL
        'hsl(from #000000 300 100% 50%)',
        'hsl(from #FF0000 calc(h + 300) s l)',
        'hsl(from hsl(0 100% 50%) calc(s * 3) s calc((s / 2) * 1))',
        'hsl(from hsl(0 100% 50%) calc(l * 3 + 150) calc(h + 100) calc(s / 4 + 25))',
        'hsl(from rgb(255 0 255 / 1) h s l / calc(alpha / 2))',
        'hsl(from rgb(from #FF0000 r g b / 1) calc(h + 300) s l / calc(alpha - .5))',

        // HWB
        'hwb(from #FF0000 300 w b)',
        'hwb(from #FF0000 calc(h + 300) w b)',
        'hwb(from hsl(0 100% 50%) calc(300 - h) w calc((b * 100) - 0))',
        'hwb(from hsl(0 100% 50%) calc(h + w + b + 600 / 2) calc(w / 2) calc(b / 400))',
        'hwb(from rgb(255 0 255 / 1) h w b / calc(alpha / 2))',
        'hwb(from rgb(from #FF0000 r g b / 1) calc(h + 300) w b / calc(alpha - .5))',

        // Lab
        'lab(from #FF00FF l a b)',
        'lab(from #FF00FF calc(l + 200 / 100 - 2) calc(a * l / l) calc((b + a - a) / 1))',
        'lab(from rgb(from #FF00FF r g b / 1) l a b)',

        // LCH
        'lch(from #FF00FF l c h)',
        'lch(from #FF00FF calc(l - (c - c)) calc(c * (l / l)) calc(h * ((c / c) * 1)))',
        'lch(from rgb(255 0 255 / 1) l c h / 1)'
    ];

    const ALPHA_TEST_CASES = [
        // RGB
        'rgb(from #FF0000 r g r / 0.5)',
        'rgb(from #000000 calc(r + 255) g calc(b + 255) / calc(alpha - 0.5))',
        'rgb(from hsl(0 100% 50%) r g r / calc(alpha / 2))',
        'rgb(from hsl(0 100% 50%) r g calc((r - 127.5) * 2) / calc(r / r / 2))',
        'rgb(from rgb(0 255 0 / 1) calc(r + g + b) b calc(g / 255 + 254) / calc(alpha / 2))',
        'rgb(from rgb(from #FF0000 r g b / 1) r g calc(g * b + r) / calc(alpha - .5))',

        // HSL
        'hsl(from #000000 300 100% 50% / 0.5)',
        'hsl(from #FF0000 calc(h + 300) s l / calc(alpha - 0.5))',
        'hsl(from hsl(0 100% 50%) calc(s * 3) s calc(s / 2) / calc((l / 50) / 2))',
        'hsl(from hsl(0 100% 50% / 0.25) calc(l * 3 + 150) calc(h + 100) calc(s / 4 + 25) / calc(alpha * 2))',
        'hsl(from rgb(255 0 255 / 0.25) h s l / calc((s / 100) / 2))',
        'hsl(from rgb(from #FF0000 r g b / alpha) calc(h + 300) s l / calc(alpha / 2))',

        // HWB
        'hwb(from #FF0000 300 w b / 0.5)',
        'hwb(from #FF0000 calc(h + 300) w b / calc(alpha - 0.5))',
        'hwb(from hsl(0 100% 50%) calc(300 - h) w calc(b * 100) / calc((b + 1) / 2))',
        'hwb(from hsl(0 100% 50% / 0.25) calc(h + w + b + 600 / 2) calc(w / 2) calc(b / 400) / calc(alpha * 2))',
        'hwb(from rgb(255 0 255 / .25) h w b / calc(b + alpha * 2))',
        'hwb(from rgb(from #FF0000 r g b / alpha) calc(h + 300) w b / calc(alpha - .5))',

        // Lab
        'lab(from #FF00FF l a b / calc(alpha / 2))',
        'lab(from #FF00FF calc(l + 200 / 100 - 2) calc( a * l / l) calc(b + a - a) / calc(alpha - 0.5))',
        'lab(from rgb(from #FF00FF r g b / 0.25) l a b / calc(alpha * 2))',

        // LCH
        'lch(from #FF00FF l c h / calc(alpha / 2))',
        'lch(from #FF00FF calc(l - (c - c)) calc(c * (l / l)) calc(h * (c / c)) / calc(alpha - 0.5))',
        'lch(from rgb(255 0 255 / 0.25) l c h / calc(alpha * 2 ))'

    ];

    const buildVariableError = (variable: string, operation: string) => {
        return `Invalid value for ${variable}. ${operation} ${ERRORS.NOT_A_VALID_RELATIVE_COLOR}`;
    };

    const ERROR_TEST_CASES = [
        // RGB
        {
            input: 'rgb(from #FF0000 h s l)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'rgb(from rgb(255 0 0) r g b alpha)',
            error: ERRORS.NOT_ACCEPTED_INPUT

        },
        {
            input: 'rgb(from rgb(255 0 0) r calc(rgb / 2) b)',
            error: buildVariableError('g', 'rgb / 2')
        },
        {
            input: 'rgb(from rgb(255 0 0) r g b / calc(a - 0.5))',
            error: buildVariableError('alpha', 'a - 0.5')
        },
        // HSL
        {
            input: 'hsl(from #FF0000 r g b)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'hsl(from hsl(0 100% 50%) h s l alpha)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'hsl(from hsl(0 100% 50%) h s calc(hsl * 2))',
            error: buildVariableError('l', 'hsl * 2')
        },
        {
            input: 'hsl(from hsl(0 100% 50%) h s l / calc(a - 0.5))',
            error: buildVariableError('alpha', 'a - 0.5')
        },
        // HWB
        {
            input: 'hwb(from #FF0000 h s l)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'hwb(from hwb(0 0% 0%) h w b alpha)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'hwb(from hwb(0 0% 0%) calc(hwb - 50) w b)',
            error: buildVariableError('h', 'hwb - 50')
        },
        {
            input: 'hwb(from hwb(0 0% 0%) h w b / calc(a - 0.5))',
            error: buildVariableError('alpha', 'a - 0.5')
        },
        // Lab
        {
            input: 'lab(from #FF0000 h w b)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'lab(from #FF0000 h w b alpha)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'lab(from #FF0000 l a calc(lab / 2))',
            error: buildVariableError('b', 'lab / 2')
        },
        {
            input: 'lab(from #FF0000 l a b / calc(A - 0.5))',
            error: buildVariableError('alpha', 'A - 0.5')
        },
        // LCH
        {
            input: 'lch(from #FF0000 l a b)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'lch(from #FF0000 l c h alpha)',
            error: ERRORS.NOT_ACCEPTED_INPUT
        },
        {
            input: 'lch(from #FF0000 l c calc(lch / 2))',
            error: buildVariableError('h', 'lch / 2')
        },
        {
            input: 'lch(from #FF0000 l c h / calc(A - 0.5))',
            error: buildVariableError('alpha', 'A - 0.5')
        }
    ];

    describe.each(TEST_CASES)('Test case: %s', (input) => {

        const options = { decimals: 1 };
        const expected = '#FF00FF';
        const rgb = ColorTranslator.toRGB(expected, options);
        const hsl = ColorTranslator.toHSL(expected, options);

        it(`toHEX should return "${expected}"`, () => {
            expect(
                ColorTranslator.toHEX(input)
            ).toBe(expected);
        });

        it(`toRGB should return "${rgb}"`, () => {
            expect(
                ColorTranslator.toRGB(input, options)
            ).toBe(rgb);
        });

        it(`toHSL should return "${hsl}"`, () => {
            expect(
                ColorTranslator.toHSL(input, options)
            ).toBe(hsl);
        });

    });

    describe.each(ALPHA_TEST_CASES)('With alpha test case: %s', (input) => {

        const options = { decimals: 1 };
        const expected = '#FF00FF80';
        const rgba = ColorTranslator.toRGBA(expected, options);
        const hsla = ColorTranslator.toHSLA(expected, options);

        it(`toHEX should return "${expected}"`, () => {
            expect(
                ColorTranslator.toHEXA(input)
            ).toBe(expected);
        });

        it(`toRGB should return "${rgba}"`, () => {
            expect(
                ColorTranslator.toRGBA(input, options)
            ).toBe(rgba);
        });

        it(`toHSL should return "${hsla}"`, () => {
            expect(
                ColorTranslator.toHSLA(input, options)
            ).toBe(hsla);
        });

    });

    describe.each(ERROR_TEST_CASES)('With error test case: $input', ({ input, error }) => {

        it('toHEX should throw an error', () => {
            expect(
                () => ColorTranslator.toHEXA(input)
            ).toThrow(error);
        });

        it('toRGB should throw an error', () => {
            expect(
                () => ColorTranslator.toRGBA(input)
            ).toThrow(error);
        });

        it('toHSL should throw an error', () => {
            expect(
                () => ColorTranslator.toHSLA(input)
            ).toThrow(error);
        });

    });

});