var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "first": path.resolve(__dirname, "src/401.js"),
        "second": path.resolve(__dirname, "src/402.js")
    },
    mode: "none",
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                        loader: "css-loader",
                        options: {
                            minimize: false,
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
                ]
            })
        }, {
            test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
            loader: "url-loader",
            options: {
                limit: 10240,
                name: "[path][name].[ext]?[hash]",
                emitFile: true,
                publicPath: "/201804/20180404/dist/" //"http://127.0.0.1:8080/build"
            }
        }, {
            test: /\.txt$/,
            loader: "raw-loader"
        }, {
            test: /\.xml$/,
            loader: "xml-loader",
            options: {
                explicitChildren: true
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // Also generate a test.html
            title: "HtmlWebpackPlugin",
            filename: '20180404001.html',
            template: './20180404001.html'
        }), // Generates default index.html
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: '20180404002.html',
            template: './20180404002.html'
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css?[hash]",
            ignoreOrder: false
        })
    ],
    output: {
        filename: '[name].js?[hash]',
        path: path.resolve(__dirname, "dist")
    }
}