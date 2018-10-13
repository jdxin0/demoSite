const path = require('path');
module.exports = {
	entry: './src/index',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [require('autoprefixer')({
							browsers: ["defaults", ">0.01%"]
						})]
					}
				}
			]
		}]
	}
}