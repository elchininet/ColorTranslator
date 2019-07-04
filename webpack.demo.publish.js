/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCconfig = require('./webpack.config')[1];
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
    target: 'web',
    devtool: 'eval-source-map',
    entry: './src/@demo/demo.js',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: WebpackCconfig.resolve.alias
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'scripts/bundle.js',
        libraryTarget: 'window'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'ColorTranslator demo',
            logo: 'images/logo_white.svg',
            favicon: './src/@demo/favicon.png',
            template: 'src/@demo/demo.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css'
        }),
        new CopyWebpackPlugin([{ from: 'src/@demo/images', to: 'images' }])
    ]
};
