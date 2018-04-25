var path = require("path");
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: { app: "./src/app.js" },
    mode: "none",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: require.resolve('zepto'),
            loader: 'exports-loader?window.Zepto!script-loader'
        }]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Code Spliting",
            template: 'index.html'
        }),
        new CleanWebpackPlugin(["dist"]),
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    beautify: false,
                    comments: false
                },
                ie8: true
            }
        })
    ],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist")
    }
}