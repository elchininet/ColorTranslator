import { ColorTranslator } from '../src';

describe('conversion from a LCH color', () => {

    const TEST_CASES = [
        {
            input: 'lch(54.291734 106.838999 40.852613 / 0.5)',
            expect: '#FF0000'
        },
        {
            input: 'lch(87.818128 113.339731 134.391246 / 0.5)',
            expect: '#00FF00'
        },
        {
            input: 'lch(29.567573 131.207085 301.368541 / 50%)',
            expect: '#0000FF'
        },
        {
            input: 'lch(60.169696 111.407731 327.109357 / 50%)',
            expect: '#FF00FF'
        }
    ];

    TEST_CASES.forEach((testCase) => {

        it(`input ${testCase.input} should be ${testCase.expect}`, () => {

            const instance = new ColorTranslator(testCase.input);
            expect(instance.HEX).toBe(testCase.expect);
            expect(instance.HEXA).toBe(`${testCase.expect}80`);

        });

    });

});