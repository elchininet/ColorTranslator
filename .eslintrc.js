module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        quotes: ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
        semi: ['error', 'always'],
        'no-trailing-spaces': ['error'],
        '@typescript-eslint/no-duplicate-enum-values': 'off'
    },
    overrides: [
        {
            files: ['webpack*.js', 'plopfile.js', 'jest.config.js', 'aliases.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        },
        {
            files: ['tests/*.test.ts'],
            rules: {
                '@typescript-eslint/ban-ts-comment': 'off'
            }
        }
    ]
};