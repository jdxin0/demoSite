var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
btn.onclick = function(){
	require.ensure([], function(require) {
		var dynamicModule = require("./dynamic.js");
		dynamicModule.jsonp();
		dynamicModule.time();
	}, "dynamic");
}