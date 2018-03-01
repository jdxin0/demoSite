define(["jquery"],function() {
	console.log($.ajax.prototype);
    //counter在IIFE函数体内部，外部不能直接访问
    var counter = 0;
    //直接返回了匿名对象,所以外部需要通过前缀testModule才能访问
    return {
        printCurrentCounter: function() {
            console.log(counter);
        },
        incrementCounter: function() {
            //由于变量作用域的原因，这里能够访问上一级的变量counter
            //实际counter在这里就形成了常说的闭包,
            //变相延长了counter的作用域
            return ++counter;
        },
        resetCounter: function() {
            console.log('counter的值将被清空,现在的值是:' + counter);
            counter = 0;
        }
    };
})
