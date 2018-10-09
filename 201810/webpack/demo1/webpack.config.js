var path = require('path');
var Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		entry: './src/entry.js',
		list: './src/list.js'
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
		}]
	},
	plugins: [new Uglify()],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'www.yanhu.com',
		compress: true,
		port: 8080
	}
}