require("es5-shim");
require("bluebird");
var btn = document.getElementById("btn");
btn.onclick = function(){
	import(/* webpackChunkName: "dynamic" */ "./dynamic.js").then(function(dynamicModule){
		dynamicModule.jsonp();
		dynamicModule.time();
	});
}