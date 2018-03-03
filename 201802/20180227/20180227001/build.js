 // node r.js -o build.js
 ({
     dir: './dist',
     modules: [{
         name: './main'
     }],
     fileExclusionRegExp: /^(i18n|r|build)\.js$/,
     optimize: 'uglify', //uglify|none
     optimizeCss: 'standard',
     // removeCombined: false,
     baseUrl: "scripts/",
     paths: {
         "jQuery": "lib/jquery",
         "domReady": "lib/domReady",
         "text": "lib/text",
         "review": "app/review.txt",
         "Util": "app/util",
         "exclamation": "app/exclamation"
     },
     shim: {
         'jQuery': {
             exports: 'jQuery'
         }
     }
 })