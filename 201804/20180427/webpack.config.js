var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode:'none',
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'numbers-convert.js',
    library: 'numbersConvert',//string,{root: "numbersConvert",amd: "webpack-Numbers",commonjs: "webpack-cmd-Numbers"}
    libraryTarget: 'umd'//jsonp,amd,commonjs2,commonjs,global,window,this,var,umd,assign
  }
};