define(function(require,exports,module){
	exports.done = false;
	var b = require('./b.js');
	console.log('在 a.js 之中，b.done = ', b.done);
	exports.done = true;
	console.log('a.js 执行完毕');
})