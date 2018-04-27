var path = require('path');
module.exports = {
  entry: './src/index.js',
  mode:'none',
  externals: {
    lodash: "_"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};