import pkg from './package.json';
import ts from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import terser from '@rollup/plugin-terser';

export default [
    {
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
    },
    {
        plugins: [
            tsConfigPaths(),
            dts()
        ],
        input: 'src/index.ts',
        output: [
            { file: 'index.d.ts', format: 'cjs' },
            { file: 'esm/index.d.ts', format: 'es' }
        ]
    }
];