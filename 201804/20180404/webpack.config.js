var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

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
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            appMountHtmlSnippet: ['<div class="animateBox cf">',
                '    <div class="banner-steps animated fadeInLeft">',
                '        <ul>',
                '            <li>',
                '                <i class="steps-img step01"></i>',
                '                <p>开通会员</p>',
                '            </li>',
                '            <li>',
                '                <i class="steps-img step02"></i>',
                '                <p>京东金融扫码</p>',
                '            </li>',
                '            <li>',
                '                <i class="steps-img step03"></i>',
                '                <p>1分钱支付</p>',
                '            </li>',
                '            <li class="last">',
                '                <i class="steps-img step04"></i>',
                '                <p>抽iPhone X</p>',
                '            </li>',
                '        </ul>',
                '    </div>',
                '    <pre id="appenBox" class="animated fadeInDown"></pre>',
                '    <div></div>',
                '</div>',
                '<p class="jsonDataDiv"></p>',
                '<div class="xmlDataDiv"></div>'].join(""),
            title: "HtmlWebpackPlugin",
            meta: [{
                name: 'description',
                content: 'A better default template for html-webpack-plugin.'
            }],
            filename: '20180404001.html'
        }), // Generates default index.html
        new HtmlWebpackPlugin({ // Also generate a test.html
            filename: '20180404002.html',
            template: './20180404002.html'
        }),
        new ExtractTextPlugin({
            filename: "css/[name].css?[hash]",
            ignoreOrder: false
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    output: {
        filename: '[name].js?[hash]',
        path: path.resolve(__dirname, "dist")
    }
}