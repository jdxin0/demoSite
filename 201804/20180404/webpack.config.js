var path = require("path");

module.exports = {
	entry: {
		"first": path.resolve(__dirname, "src/401.js"),
		"second": path.resolve(__dirname, "src/402.js")
	},
	mode: "none",
	module: {
		rules: [{
			test: /\.css$/,
			use: [
			{
				loader:"style-loader",
				options:{
					attrs:{
						title:"gogo",
						class:"styleForSelector"
					},
					insertAt:{
						before:'#title'
					},//'top', 'bottom', or Object.
					singleton: true
				}
			},
			{
				loader:"css-loader",
				options:{
					minimize:false,
					sourceMap: true
				}
			}
			]
		}, {
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use:[{
			  loader: 'file-loader',
			  options: {
			    name: '[path][name].[ext]'
			  }  
			}]
		}]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, "dist")
	}
}