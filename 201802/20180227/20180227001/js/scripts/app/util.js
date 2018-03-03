define(["jQuery"],function($) {
    var counter = 0;
    return {
        printCurrentCounter: function() {
            console.log("printCurrentCounter:",counter);
        },
        incrementCounter: function() {
            return console.log("incrementCounter:",++counter);
        },
        resetCounter: function() {
            console.log('counter的值将被清空,现在的值是:' + counter);
            counter = 0;
        },
        setBGblack:function(){
            $("html").css("background","#ccc");
        },
        setBGgreen:function(){
            $("html").css("background","green");
        }
    };
})