# A标签的事件
* A标签的事件顺序
	* onclick>addEventListener>href
* href="javascript:statement;"
	* 语句的作用域是window,this===window
	* arguments is not defined
* `<a href="" onclick="statement">`
	* onclick="statement; return false"
	* 可以阻止href事件(默认事件),不能阻止addEventListener事件
	* 可以读取this,arguments,event。
	* event===arguments[0] ,event instanceof MouseEvent
* `<a href="" id="link1">`
	* `link1.onclick = function(){return false}`可以阻止href事件
	* `link1.addEventListener("click",function(){return false})`不能阻止href事件
# event.stopPropagation()和event.preventDefault()，return false的区别
1.event.stopPropagation()方法

这是阻止事件的冒泡方法，不让事件向documen上蔓延，但是默认事件任然会执行，当你掉用这个方法的时候，如果点击一个连接，这个连接仍然会被打开，

2.event.preventDefault()方法

这是阻止默认事件的方法，调用此方法是，连接不会被打开，但是会发生冒泡，冒泡会传递到上一层的父元素；

3.return false  ；

这个方法比较暴力，他会同事阻止事件冒泡也会阻止默认事件；写上此代码，连接不会被打开，事件也不会传递到上一层的父元素；可以理解为return false就等于同时调用了event.stopPropagation()和event.preventDefault()