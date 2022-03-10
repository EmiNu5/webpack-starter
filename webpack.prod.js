const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser  = require('terser-webpack-plugin');

module.exports = {
    mode: 'production', 
    output:{
        clean: true,
        filename: 'main.[contenthash].js',
    },
    module: {
        rules: [
            {
                test:/\.html$/, 
                loader: 'html-loader',
                options:{
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/i, 
                use: ['style-loader','css-loader']
            },
            { 
                test: /styles.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options:{
                    esModule: false,
                    name: 'assets/img/[name].[ext]'
                },
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Mi webpack App',

            template: './src/index.html' 
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ]
}