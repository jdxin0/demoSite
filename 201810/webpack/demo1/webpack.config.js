var path = require('path');
var Uglify = require('uglifyjs-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		entry: './src/entry.js',
		list:'./src/list.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},{
			test:/\.(png|jpg|gif)$/,
			use:[{
				loader:'url-loader',
				options:{
					limit:15000
				}
			}]
		}]
	},
	plugins: [
		// new Uglify(),
		new HtmlPlugin({
			minify:{//https://github.com/kangax/html-minifier
				removeAttributeQuotes:false,
				collapseWhitespace:false,
				removeComments:false,
				removeScriptTypeAttributes:false
			},
			hash:true,
			template:'./src/index.html'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'www.yanhu.com',
		compress: true,
		port: 8080
	}
}