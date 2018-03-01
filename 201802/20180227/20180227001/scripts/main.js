require.config({
	shim: {
        'JQ': {
            exports: '$'
        }
    },
	baseUrl: "scripts/helper",
    paths: {
        "JQ": "jquery",
        "Util": "util"
    }
});
require(['domReady!','JQ','Util'],function(dom,$,util){
	console.log(dom);
	console.log($.fn.jquery);
	util.incrementCounter();
	util.printCurrentCounter();
	util.resetCounter();
})