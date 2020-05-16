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

});