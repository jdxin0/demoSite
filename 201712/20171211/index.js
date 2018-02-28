var obj = {lastNums:0};
var initValue = 15.6;
Object.defineProperty(obj, "totalNums", {
    get: function() {
        //当获取值的时候触发的函数
        $(".lastNums").text(lastNums);
        return initValue;
    },
    set: function(value) {
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        $(".lastNums").text(lastNums);
        initValue = value;
    }
});
obj.new