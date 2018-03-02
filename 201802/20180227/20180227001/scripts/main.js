require.config({
	shim: {
        'JQ': {
            exports: '$'
        }
    },
	baseUrl: "scripts/helper",
    paths: {
        "JQ": "jquery",
        "Util": "util",
        "test":"exclamation"
    }
});
require(['domReady','JQ','Util','test','text!review.txt'],function(domReady,$,util,test,txt){
	console.log(0);
	domReady(function(){
		console.log(1);
	});
	domReady(function(){
		console.log(2);
	})
	console.log($.fn.jquery);
	util.incrementCounter();
	util.printCurrentCounter();
	util.resetCounter();
})