require("es5-shim");
require("promise-polyfill");
var btn = document.getElementById("btn");
btn.onclick = function(){
	import(/* webpackChunkName: "dynamic" */ "./dynamic.js").then(function(dynamicModule){
		dynamicModule.jsonp();
		dynamicModule.time();
	});
}