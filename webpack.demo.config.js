import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import aliases from './aliases.js';

export default {
    mode: 'development',
    entry: './src/@demo/demo.js',
    output: {
        filename: 'scripts/bundle.js',
        path: path.resolve('docs'),
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
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