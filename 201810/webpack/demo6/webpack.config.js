var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module:{
        rules: []
    },
    plugins: [],
    devServer:{
        contentBase: path.resolve('dist')
    }
};