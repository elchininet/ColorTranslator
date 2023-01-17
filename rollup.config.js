import pkg from './package.json';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

export default {
    plugins: [
        ts(),
        terser({
            output: {
                comments: false
            }
        })
    ],
    input: 'src/index.ts',
    output: [
        {
            file: 'web/colortranslator.js',
            format: 'iife',
            name: 'colortranslator'
        },
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' }
    ]
};