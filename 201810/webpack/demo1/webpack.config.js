var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var UglifyPlugin = require('uglifyjs-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');
var CopyPlugin = require('copy-webpack-plugin');
var publicPath = '';
if (process.env.NODE_ENV == "production") {
	publicPath = 'http://www.yanhu.com/201810/webpack/demo1/dist/';
} else {
	publicPath = 'http://127.0.0.1/201810/webpack/demo1/dist/'
}

module.exports = {
	// devtool: "source-map",
	// externals:{
	// 	$:'jQuery',
	// 	Vue:'vue'
	// },
	entry: {
		entry: './src/js/entry.js',
		list: './src/js/list.js',
		jquery:'jquery',
		vue:'vue'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		publicPath: publicPath
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use:[{
					loader:'css-loader',
					options:{
						importLoaders:1
					}
				},"postcss-loader"]
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader", "less-loader"]
			})
		}, {
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 15000,
					name: '[hash:8].[name].[ext]',
					outputPath: 'images/'
				}
			}]
		}, {
			test: /\.html$/,
			use: ['html-loader']
		}, {
			test: /\.js$/,
			use: {
				loader: "babel-loader"
			},
			exclude: /node_modules|test/
		}]
	},
	plugins: [
		new UglifyPlugin({
			sourceMap: false
		}),
		new HtmlPlugin({
			minify: { //https://github.com/kangax/html-minifier
				removeAttributeQuotes: false,
				collapseWhitespace: false,
				removeComments: false,
				removeScriptTypeAttributes: false
			},
			hash: true,
			template: './src/index.html'
		}),
		new ExtractTextPlugin('css/index.css'),
		new PurifyCSSPlugin({
			paths: glob.sync(path.resolve(__dirname, 'src/*.html')),
		}),
		new webpack.ProvidePlugin({
			$:'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['jquery','vue'],
			filename: "lib/[name].min.js",
			minChunks: 2
		}),
		new CopyPlugin([{
			from:path.resolve(__dirname+'/src/static'),
			to: 'static'
		}])
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		host: 'www.yanhu.com',
		compress: true,
		port: 8080
	}
}