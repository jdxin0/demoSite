const path = require('path');
module.exports={
    devtool:"source-map",
    entry:"./src/main.js",
    output:{
        path:path.resolve('dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use: 'babel-loader',
            exclude:/node_modules/
        }]
    }
}