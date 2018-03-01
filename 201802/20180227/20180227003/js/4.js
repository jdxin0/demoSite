define(function(){
	var d = "4.js";
	function printD(){
		return d;
	}
	printD.nickName = "函数对象";
	printD.Hi = function(){
		console.log("函数方法");
		return this.nickName;
	}
	return printD;
});