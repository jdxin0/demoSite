require.config({
    shim: {
        'jQuery': {
            exports: 'jQuery'
        }
    },
    baseUrl: "js/scripts/",
    paths: {
        "jQuery": "lib/jquery",
        "domReady": "lib/domReady",
        "text": "lib/text",
        "review": "app/review.txt",
        "tpl": "app/template.html",
        "Util": "app/util",
        "exclamation": "app/exclamation"
    }
});
//requireJS插件列表https://github.com/requirejs/requirejs/wiki/Plugins
require(['domReady', 'jQuery', 'Util', 'exclamation', 'text!review', 'text!tpl'], function(domReady, $, util, exclamation, txt,tpl) {
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
        $("body").html(txt);
    });
})
requirejs.onResourceLoad = function (context, map, depArray) {
    console.log(map);
}
require(["http://www.xuliehaonet.com/interface/jsonp.php?callback=define"],
    function (data) {
        //The data object will be the API response for the
        //JSONP data call.
        console.log(data);
    }
);
