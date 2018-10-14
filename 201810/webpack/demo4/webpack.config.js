const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/index',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			loaders:ExtractTextPlugin.extract({
				use: 'css-loader?importLoaders=1!postcss-loader'
			})
		}]
	},
	plugins:[
		new ExtractTextPlugin({
			filename:'style.css'
		})
	]
}