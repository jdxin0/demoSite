 // node r.js -o build.js
 ({
     dir: './dist',
     modules: [{
         name: './main'
     }],
     fileExclusionRegExp: /^(i18n|r|build)\.js$/,
     optimizeCss: 'standard',
     // removeCombined: true,
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
             exports: '$'
         }
     }
 })