var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode:'none',
  externals: {
    lodash: '_'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers',//string,{root: "webpackNumbers",amd: "webpack-Numbers",commonjs: "webpack-cmd-Numbers"}
    libraryTarget: 'umd'//jsonp,amd,commonjs2,commonjs,global,window,this,var,umd,assign
  }
};