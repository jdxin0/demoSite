const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        home:'./src/js/home',
        user:'./src/js/user'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist'
    }
}