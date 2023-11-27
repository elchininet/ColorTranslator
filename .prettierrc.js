/** @type {import("prettier").Config} */
module.exports = {
    singleQuote: true,
    quoteProps: 'consistent',
    useTabs: false,
    tabWidth: 4,
    semi: true,
    trailingComma: 'none',
    printWidth: 110,
    overrides: [
        {
            files: '**/*.md',
            options: {
                tabWidth: 2
            }
        }
    ]
};
