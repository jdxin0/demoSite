/**
 * @constructor Person
 */
var Person = function() {
	this.say = function() {
		return "I'm an instance.";
	}

	function say() {
		return "I'm inner.";
	}
}
Person.say = function() {
	return "I'm static.";
}
var p = new Person();
p.say(); // I'm an instance. 实例
Person.say(); // I'm static. 静态
// 这里无法直接访问内部函数 there is no way to directly access the inner function from here