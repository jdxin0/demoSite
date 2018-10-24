const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry:'./src/js/index.js',
    output:{
        path : path.resolve('dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','vue-style-loader','css-loader']
        },{
            test:/\.vue$/,
            use:'vue-loader'
        }]
    },
    plugins:[new VueLoaderPlugin()]
};
