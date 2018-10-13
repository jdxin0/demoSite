const path = require('path');
module.exports = {
    entry:'./src/index',
    output:{
        path:path.resolve('dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            test:/\.css$/,//npx webpack --module-bind css=css-loader
            use:['style-loader','css-loader']
        }]
    }
}