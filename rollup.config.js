import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

export default {
    plugins: [
        typescript(),
        terser({
            output: {
                comments: false
            }
        })
    ],
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/web/colortranslator.js',
            format: 'iife',
            name: 'colortranslator'
        },
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' }
    ]
};