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
        })
    ],
    optimization:{
    	splitChunks:{
    		
    	}
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist")
    }
}