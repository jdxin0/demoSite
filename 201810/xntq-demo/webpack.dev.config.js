/*global __dirname */
var webpack = require('webpack');
var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'js/[name].min.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'postcss-loader'
                }]
            })
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[folder]/[name].[ext]?v=[hash:8]'
                }
            }]
        }, {
            test: /\.js$/,
            use: ['babel-loader', 'eslint-loader'],
            exclude: /node_modules/
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin('[@luojianet](http://www.xuliehaonet.com)'),
        new ExtractTextPlugin('css/style.css'),
        new CleanWebpackPlugin('dest'),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
