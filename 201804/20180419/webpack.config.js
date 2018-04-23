var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        first: "./src/first.js",
        second: "./src/second.js"
    },
    mode: "none",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Code Spliting"
        }),
        new CleanWebpackPlugin(["dist"])
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist")
    }
}