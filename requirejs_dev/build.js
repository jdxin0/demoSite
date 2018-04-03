//node js/r.js -o requirejs_dev/build.js
//RequireJS进阶:模块的优化及配置的详解https://segmentfault.com/a/1190000002403806#articleHeader3
// node r.js -v
({
    //压缩文件放置目录
    //build.js文件的相对路径
    appDir: './',
    dir: '../requirejs_pro',
    // dir: './dist',
    generateSourceMaps: false,//设置为true会引起screw_ie8为true
    // out:'./dist/app.min.js',
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
    name: './app',
    include:"requireLib",
    baseUrl: "./js",
    //1、入口文件通过data-main形式加载，同时设置了bashUrl
    //2、通过 RequireJS config设置bashUrl
    //3、非如上两种，bashUrl是引用requireJS的html路径
    //4、对于的baseUrl，它是相对于APPDIR。如果没有appDir，那么baseUrl是相对于build.js文件
    shim: {
        'jQueryMigrate': {
            deps: ['jquery'],
            exports: 'jQuery.migrateVersion'
        },
        'jquery.pagination': {
            deps: ['jquery'],
            exports: 'jQuery.fn.pagination'
        },
        'textSlider': {
            deps: ['jquery'],
            exports: 'jQuery.fn.textSlider'
        },
        'Modernizr': {
            exports: 'Modernizr'
        },
        'console': {
            exports: 'console'
        },
        'requirejs': {
            deps: ['console'],
            exports: 'requirejs'
        },
        'multipleGlobalFun': {
            init: function() { //暴露多个全局变量
                console.log(this);
                return {
                    multipleGlobalFun1: multipleGlobalFun1,
                    multipleGlobalFun2: multipleGlobalFun2
                }
            },
            exports: 'multipleGlobalFun1' //当 exports 与 init 同时存在的时候， exports 将被忽略。
        },
        'jquery.path': {
            deps: ['jquery'],
            init: function() {
                return {
                    bezier: $.path.bezier,
                    arc: $.path.arc
                }
            }
        },
        'qrcode': {
            exports: 'QRCode'
        }
    },
    paths: { //module IDs map with path
        "requireLib":"require-2.3.5.min",
        "bluebird": "lib/bluebird",
        "requirejs": "require-2.3.5.min",
        "jquery": "lib/jquery-1.12.4.min", //这里cdn多了个后缀.js会报错，会加载本地jquery
        "underscore": "lib/underscore-min",
        "jQueryMigrate": "jQuery-plugins/jquery-migrate-1.4.1.min",
        "domReady": "RequireJS-plugins/domReady",
        "text": "RequireJS-plugins/text",
        "console": "common/console",
        "jquery.pagination": "jQuery-plugins/jquery.pagination",
        "Modernizr": "tools/Modernizr",
        "CountUp": "tools/countUp.min",
        "loop": "tools/loop",
        "textSlider": "jQuery-plugins/jquery.textSlider",
        "jquery.path": "jQuery-plugins/jquery.path",
        "qrcode": "tools/qrcode.min",
        "danmu": "tools/danmu",
        "exclamation": "app/exclamation",
        "review": "app/review.txt",
        "tpl": "app/template.html",
        "Util": "app/util",
        "urlTest": "app/urlTest",
        "multipleGlobalFun": "app/multipleGlobalFun",
        "testAnim": "app/animate.css"
    }
})