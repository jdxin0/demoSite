require("es5-shim");
require("promise-polyfill");
var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
btn.onclick = function(){
	require.ensure([], function(require) {
		var dynamicModule = require("./dynamic.js");
		dynamicModule.jsonp();
		dynamicModule.time();
	}, "dynamic");
}
btn2.onclick = function(){
	import(/* webpackChunkName: "dynamic" */ "./dynamic.js").then(function(dynamicModule){
		dynamicModule.jsonp();
		dynamicModule.time();
	});
}