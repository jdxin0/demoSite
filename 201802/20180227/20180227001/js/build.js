// node r.js -o build.js
// node r.js -v
({
    dir: './dist',
    modules: [{
        name: './app'
    }],
    fileExclusionRegExp: /^(i18n|r|build)\.js$/,
    optimize: 'uglify2', //uglify2|none
    uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            screw_ie8: false,
            beautify: false
        },
        compress: { //压缩器选项
            sequences: true,
            drop_debugger: true,
            screw_ie8: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false //混淆选项
    },
    optimizeCss: 'standard',
    // removeCombined: false,
    baseUrl: "scripts/",
    paths: {
        "requirejs":"require",
        "jQuery": "lib/jquery.min",
        "domReady": "lib/domReady",
        "Modernizr": "lib/Modernizr",
        "text": "lib/text",
        "console": "lib/console",
        "tpl": "app/template.html",
        "review": "app/review.txt",
        "Util": "app/util",
        "exclamation": "app/exclamation"
    },
    shim: {
        'jQuery': {
            exports: 'jQuery'
        },
        'Modernizr': {
            exports: 'Modernizr'
        },
        'console': {
            exports: 'console'
        },
        'requirejs':{
            exports:'requirejs'
        }
    }
})