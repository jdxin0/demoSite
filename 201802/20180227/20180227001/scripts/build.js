 // node r.js -o build.js
 ({
     dir: './dist',
     modules: [{
         name: './main'
     }],
     fileExclusionRegExp: /^(require|i18n|r|build)\.js$/,
     optimize:'uglify',//uglify|none
     optimizeCss: 'standard',
     // removeCombined: false,
     paths: {
         domReady: 'helper/domReady',
         text: 'helper/text',
         review: 'helper/review.txt',
         jQuery: 'helper/jquery.min',
         Util: 'helper/util',
         exclamation: 'helper/exclamation',
     },
     shim: {
         'jQuery': {
             exports: 'jQuery'
         }
     }
 })