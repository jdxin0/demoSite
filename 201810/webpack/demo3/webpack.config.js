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
            use:{
                loader:'babel-loader',
                options:{
                   presets:'env',
                   plugins:["transform-runtime"]
                }
            },
            exclude:/node_modules/
        }]
    }
}