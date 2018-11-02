var UglifyJS = require('uglify-js');
var result = UglifyJS.minify('./src/main.js');
console.log(result.error); // runtime error, or `undefined` if no error
console.log(result.code);  // minified output: function add(n,d){return n+d}