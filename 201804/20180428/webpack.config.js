var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode:'none',
  externals: {
    lodash: "_"
  },
  plugins:[
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};