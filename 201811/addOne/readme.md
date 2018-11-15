## demo
* demo addr
    

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
