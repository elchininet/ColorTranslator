import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
                ...globals.browser,
                ...globals.node,
                ...globals.es2020
            }
        }
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['web']
    },
    {
        rules: {
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],
            indent: ['error', 4, { SwitchCase: 1 }],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'no-trailing-spaces': ['error'],
            '@typescript-eslint/no-duplicate-enum-values': 'off',
            '@typescript-eslint/no-var-requires': 'off'
        }
    },
    {
        files: ['tests/*.test.ts'],
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off'
        }
    }
];