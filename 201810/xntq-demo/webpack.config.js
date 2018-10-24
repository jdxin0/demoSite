const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:'./src/js/index.js',
    output:{
        path : path.resolve('dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader']
        },{
            test:/\.vue$/,
            use:'vue-loader'
        }]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.BannerPlugin('[@luojianet](http://www.xuliehaonet.com)'),
        new ExtractTextPlugin('css/style.css'),
        new CleanWebpackPlugin('dist'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            minify: { //https://github.com/kangax/html-minifier
                removeAttributeQuotes: false,
                removeComments: false,
                collapseWhitespace: true,
                removeScriptTypeAttributes: true
            },
            hash: false,
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};
