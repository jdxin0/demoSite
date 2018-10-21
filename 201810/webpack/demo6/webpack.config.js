var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: './src/js/index.js',
	output: {
		path: path.resolve('dist'),
		filename: './js/bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			include: path.resolve('./src/js'),
			exclude: /(node_modules|bower_components)/
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: path.resolve('./src/css')
		}, {
			test: /\.(png|jpg|jpeg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: '10240',
					fallback: 'file-loader',
					regExp: /\\([a-z0-9]+)\\[a-z-0-9]+\.(png|jpg|jpeg|gif)$/,
					name: '[1]/[name].[ext]?v=[hash:8]',
				}
			}]
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),
		new HtmlWebpackPlugin({
			minify: {
				collapseWhitespace: false,
				removeComments: true,
				quoteCharacter: '\'',
				removeAttributeQuotes: false,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true
			},
			hash: true,
			title: 'Custom template',
			filename: 'index.html',
			template: './src/index.html'
		}),
		new CleanWebpackPlugin('dist')
	],
	devServer: {
		contentBase: path.resolve('dist')
	}
};