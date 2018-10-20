var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: './src/js/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.js$/,
			use: 'babel-loader',
			include: path.resolve('src'),
			exclude: /(node_modules|bower_components)/
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	],
	devServer: {
		contentBase: path.resolve('dist')
	}
};