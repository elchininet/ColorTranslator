const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackCconfig = require('./webpack.config')[1];

module.exports = {
    devtool: 'eval-source-map',
    target: 'web',
    entry: './src/@demo/demo.js',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: []
        }),
        new HtmlWebpackPlugin({
            title: 'ColorTranslator demo',
            logo: 'images/logo_white.svg',
            favicon: './src/@demo/favicon.png',
            template: 'src/@demo/demo.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/styles.css'
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'src/@demo/images', to: 'images' }]            
        })
    ]
};
