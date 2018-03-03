require.config({
	shim: {
        'jQuery': {
            exports: 'jQuery'
        }
    },
	baseUrl: "scripts/helper/",
    paths: {
    	"domReady":"domReady",
    	"text":"text",
    	"review":"review.txt",
        "jQuery": "jquery.min",
        "Util": "util",
        "exclamation":"exclamation"
    }
});
//requireJS插件列表https://github.com/requirejs/requirejs/wiki/Plugins
require(['domReady','Util','exclamation','text!review','jQuery'],function(domReady,util,exclamation,txt,$){
	domReady(function(){
		console.log("document ready 1");
		console.log($.fn.jquery);
	});
	domReady(function(){
		console.log("document ready 2");
		console.log("util模块");
		util.incrementCounter();
		util.printCurrentCounter();
		util.resetCounter();
	});
	domReady(function(){
		console.log("document ready 3");
		console.log("exclamation模块");
		console.log(exclamation.prototype);
	});
	domReady(function(){
		console.log("document ready 4");
		console.log("text模块");
		$("body").html(txt);
	});
})