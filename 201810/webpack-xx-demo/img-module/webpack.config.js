var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: '1024',
                    outputPath: 'asset',
                    fallback: 'file-loader',
                    name: '[folder]/[name].[ext]?v=[hash:8]'
                }
            }]
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: false,
                collapseBooleanAttributes: true,
                removeComments: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            hash: true,
            title: 'Custom template',
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};