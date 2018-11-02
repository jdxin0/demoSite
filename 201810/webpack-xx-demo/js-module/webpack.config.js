var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            include:path.resolve('node_modules/@luojianet/utility/index.js'),
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Custom template',
            filename: 'index.html'
        })
    ]
};