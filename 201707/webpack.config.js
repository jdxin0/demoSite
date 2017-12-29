module.exports = {
	// devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
	// devtool: 'source-map',

	entry: {
		'main':__dirname+ "/js/main",// 主播的名义
	},

	output: {
		publicPath: 'http://images.client.vip.xunlei.com/newvip/dist/',
		path: __dirname + "/dist", //打包后的文件存放的地方
		filename: "[name].js" //打包后输出文件的文件名
			// filename: "[name]-[hash].js" //打包后输出文件的文件名
			// filename: "[name]-[chunkhash:6].js" //打包后输出文件的文件名
	},

	devServer: {
		contentBase: "./dist", //本地服务器所加载的页面所在的目录
		colors: true, //终端中输出结果为彩色
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},

	module: {
		loaders: [{
				//es6语法转换
				// test: path.join(__dirname, 'es6'),
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
                test:/\.(png|jpe?g|svg|gif)(\?\S*)?$/,
                loader:'file-loader',
                query:{
                    name:'[name].[ext]?[hash]'      //还有这里
                }
            },
			//  {
			// 	test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
			// 	loaders: [
			// 		// 小于10KB的图片会自动转成dataUrl
			// 		'url?limit=10240&name=img/[hash:8].[name].[ext]',
			// 		'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
			// 	]
			// },
			{
				//load css
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png)|(jpg)$/,
				loader: "url?limit=50000&name=img/[hash:8].[name].[ext]"
			}
		]
	}
}