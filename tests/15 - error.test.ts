import { ColorTranslator } from '../src';
import { ColorInput } from '../src/@types';
import { ERRORS } from '../src/constants';

describe('Wrong inputs', (): void => {

    it('Wrong string', (): void => {

        expect(() => {
            ColorTranslator.toHEX('AAA');
        }).toThrow(ERRORS.NOT_ACCEPTED_INPUT);

    });

    it('Wrong object', (): void => {

        expect(() => {
            ColorTranslator.toHEX({P: 100, H: 20, T: 360} as unknown as ColorInput);
        }).toThrow(ERRORS.NOT_ACCEPTED_INPUT);

    });

    it('Mixed object', (): void => {

        expect(() => {
            ColorTranslator.toHEX({R: '0x25', G: 20, B: '0xFF'} as unknown as ColorInput);
        }).toThrow(ERRORS.NOT_ACCEPTED_INPUT);

    });

    it('Wrong hex', (): void => {

        expect(() => {
            ColorTranslator.toHEX({R: '0x255', G: '0x128', B: '0xFFF'} as unknown as ColorInput);
        }).toThrow(ERRORS.NOT_ACCEPTED_INPUT);

    });

});