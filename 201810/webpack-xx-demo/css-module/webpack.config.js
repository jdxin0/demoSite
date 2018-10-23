var path = require('path');
module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    }
}