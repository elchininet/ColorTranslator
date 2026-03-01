import * as Library from '../src';
import { ColorTranslator } from '../src/classes/ColorTranslator';
import { Harmony, Mix } from '../src/constants';

describe('exports from the main package', () => {
    it('@testing should match exports', () => {
        expect(Library).toEqual({
            ColorTranslator,
            Harmony,
            Mix
        });
    });
});