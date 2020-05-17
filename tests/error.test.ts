import { ColorTranslator } from './data/data';
import { ColorInput } from '../src/@types';
import { ERRORS } from '../src/constants';

describe('Wrong inputs', (): void => {

    it('Wrong string', (): void => {

        expect(() => {
            ColorTranslator.toHEX('AAA');
        }).toThrowError(ERRORS.NOT_ACCEPTED_STRING_INPUT);

    });

    it('Wrong object', (): void => {

        expect(() => {
            ColorTranslator.toHEX({p: 100, h: 20, t: 360} as unknown as ColorInput);
        }).toThrowError(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);

    });

    it('Mixed object', (): void => {

        expect(() => {
            ColorTranslator.toHEX({r: '0x25', g: 20, b: '0xFF'} as unknown as ColorInput);
        }).toThrowError(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);

    });

    it('Wrong hex', (): void => {

        expect(() => {
            ColorTranslator.toHEX({r: '0x255', g: '0x128', b: '0xFFF'} as unknown as ColorInput);
        }).toThrowError(ERRORS.NOT_ACCEPTED_OBJECT_INPUT);

    });

});