var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
		},{
            test:/\.(png|jpg|gif)$/,
            use:[{
                loader:'file-loader',
                options:{
                    name:'[name].[ext]'
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
		})
	],
	devServer: {
		contentBase: path.resolve('dist')
	}
};