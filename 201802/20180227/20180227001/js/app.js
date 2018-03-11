require.config({
    baseUrl: "./js",
    //1、入口文件通过data-main形式加载，同时设置了bashUrl
    //2、通过 RequireJS config设置bashUrl
    //3、非如上两种，bashUrl是引用requireJS的html路径
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
    paths: {//module IDs map with path
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
});
//requireJS插件列表https://github.com/requirejs/requirejs/wiki/Plugins
require([ 'requirejs','Util', 'exclamation', 'text!review', 'text!tpl','Modernizr','domReady', 'jQuery','console'], function( requirejs,util, exclamation, txt,tpl,M,domReady, $,C) {
    domReady(function() {
        console.log("document ready 1");
        console.log($.fn.jquery);
    });
    domReady(function() {
        console.log("document ready 2");
        console.log("util模块");
        util.incrementCounter();
        util.printCurrentCounter();
        util.resetCounter();
    });
    domReady(function() {
        console.log("document ready 3");
        console.log("exclamation模块");
        console.log(exclamation.prototype);
    });
    domReady(function() {
        console.log("document ready 4");
        console.log("text模块");
        console.log(tpl);
        $("#poem").html(txt);
    });
    domReady(function(){
        console.log("document ready 5");
        console.log("Modernizr");
        console.log(M.json);
    });
})
requirejs.onResourceLoad = function (context, map, depArray) {
    console.log(map);
}
// require(["http://www.xuliehaonet.com/interface/jsonp.php?callback=define"],
//     function (data) {
//         //The data object will be the API response for the
//         //JSONP data call.
//         console.log(data);
//     }
// );
