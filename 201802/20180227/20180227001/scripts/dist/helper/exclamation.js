define(function(){
	var private="私有属性";
	function exclamation(){
		console.log("exclamation Object");
	}
	exclamation.load = function(){
		console.log("exclamation 静态方法");
	}
	return exclamation;
});