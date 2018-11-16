## demo
* link

    http://demo.xuliehaonet.com/201811/addone-demo/
* html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="/js/jquery-1.12.4.js"></script>
</head>
<body>
    <h1>数量加1动画</h1>
    <button id="zanBtn">+1</button>
</body>
</html>
```
* js
```
var addone = require('addone');
document.getElementById('zanBtn').onclick=function(){
    addone(this);
};
```
* use
````
function (node,options){}
options = $.extend({
    obj: obj || null, // jq对象，要在那个html标签上显示
    str: '+1', // 字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
    startSize: '12px', // 动画开始的文字大小
    endSize: '20px', // 动画结束的文字大小
    interval: 600, // 动画时间间隔
    color: '#EE0000', // 文字颜色
    weight: 'bold', // 文字
    callback: function() {} // 回调函数
}, options);
```