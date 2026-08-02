import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import aliases from './aliases.js';

export default {
    devtool: 'eval-source-map',
    target: 'web',
    entry: './src/@demo/demo.js',
    output: {
        filename: 'scripts/bundle.js',
        path: path.resolve('docs'),
        libraryTarget: 'window'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: aliases
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
