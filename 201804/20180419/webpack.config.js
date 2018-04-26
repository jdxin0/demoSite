var path = require('path');
var htmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var commonConfig = {
    entry: './src/app.js',
    mode: 'none', //production,development
    plugins:[
        new htmlWebpackPlugin({
            title: "Code Spliting",
            template: 'template.html'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[id].js'
    }
};
function getProConfig() {
    var productionConfig = null;
    var config = {
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },{
              test: require.resolve('zepto'),
              loader: 'exports-loader?window.Zepto!script-loader'
            }]
        },
        plugins: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        beautify: false,
                        comments: false
                    },
                    ie8:true
                }
            })
        ],
    };
    var productionConfig = Object.assign({}, commonConfig, config);
    return productionConfig;
}
function getDevConfig() {
    var developmentConfig = null;
    var config = {
        externals: {
          'jquery/dist/jquery.min.js': 'jQuery'
        },
        devServer: {
            contentBase:path.join(__dirname, "dist"),
            port: 8081,
            open: false,
            hot: true
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.HashedModuleIdsPlugin({
              hashFunction: 'sha256',
              hashDigest: 'hex',
              hashDigestLength: 20
            })
        ],
        output:{
            pathinfo: true
        }
    };
    var developmentConfig = Object.assign({}, commonConfig, config);
    return developmentConfig;
}

module.exports = function(env, argv) {
    if (env == 'development') {
        return getDevConfig();
    } else if (env == 'production') {
        return getProConfig();
    } else {
        return commonConfig;
    }
}