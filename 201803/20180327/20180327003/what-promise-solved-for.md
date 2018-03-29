# Promise解决什么问题
## 例子1
```javascript
 // 抽中路线闪烁
var lineon = $('.mapline span.on');
lineon.animate({
    'opacity': '0'
},200, function() {
    lineon.animate({
        'opacity': '1'
    },200, function() {
        lineon.animate({
            'opacity': '0'
        },200, function() {
            lineon.animate({
                'opacity': '1'
            },200);
        });
    });
});
```
## 例子2
```javascript
setTimeout(function() {
    //doSomething
    setTimeout(function(){
        //doSomething
        setTimeout(function(){
            //doSomething
            setTimeout(function(){
                //doSomething
                setTimeout(function(){
                    //doSomething
                });
            },1000);
        },1000);
    },1000)
},1000);	
```
## 例子3
```javascript
$.ajax({
    url: "http://www.xuliehaonet.com/interface/jsonp.php",
    data: {
    },
    dataType: "jsonp",
    success: function(rs1) {
        $.ajax({
            url: "http://www.xuliehaonet.com/interface/jsonp2.php",
            data: {
                need:rs1.tojsonp2
            },
            dataType: "jsonp",
            success: function(rs2) {
                //doSomeThing
            },
            error: function() {
            }
        });
    },
    error: function() {
    }
});
```