const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const aliases = require('./aliases');

module.exports = {
    mode: 'development',
    entry: './src/@demo/demo.js',
    output: {
        filename: 'scripts/bundle.js',
        path: path.resolve(__dirname, 'docs'),
        libraryTarget: 'window'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: aliases
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ColorTranslator demo',
            logo: './images/logo_white.svg',
            favicon: './src/@demo/favicon.png',
            template: 'src/@demo/demo.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/@demo/images', to: 'images' }]
        })
    ],
    devServer: {
        compress: true,
        port: 9000
    }
};
