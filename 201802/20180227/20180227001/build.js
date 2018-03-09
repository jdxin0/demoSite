//node js/r.js -o 201802/20180227/20180227001/build.js
// node r.js -v
({
    //压缩文件放置目录
    //build.js文件的相对路径
    dir: './dist',
    // "uglify：使用 UglifyJS 压缩代码，默认值；
    // "uglify2"：使用 2.1.2+ 版本进行压缩；
    // "closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
    // "closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
    // "none"：不做压缩合并；
    optimize: 'uglify2',
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
    // "standard"：标准的压缩方式；
    // "standard.keepLines"：保留换行；
    // "standard.keepComments"：保留注释；
    // "standard.keepComments.keepLines"：保留换行；
    // "none"：不压缩；
    optimizeCss: 'standard',
    removeCombined: false,
    fileExclusionRegExp: /^(i18n|r|build)\.js$/,
    baseUrl: "./js",//build.js文件的相对路径
    modules: [{
        name: './app'
    }],
    shim: {
        'jQuery': {
            exports: 'jQuery'
        },
        'Modernizr':{
            exports:'Modernizr'
        },
        'console':{
            exports:'console'
        },
        'requirejs':{
            exports:'requirejs'
        }
    },
    paths: {
        "requirejs":"require-2.3.5",
        "jQuery": "lib/jquery.min",
        "domReady": "lib/domReady",
        "Modernizr":"lib/Modernizr",
        "text": "lib/text",
        "console": "lib/console",
        "review": "app/review.txt",
        "tpl": "app/template.html",
        "Util": "app/util",
        "exclamation": "app/exclamation"
    }
})