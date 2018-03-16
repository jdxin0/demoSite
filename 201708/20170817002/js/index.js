$(document).ready(function(){
	$(".content").html("<h1>滚动到页面底部会触发事件</h1>");
	$(document).scroll(function(){
		var DOMheight = $(this).height();  
		var scroll_top = $(this).scrollTop();
		var screenHeight = $(window).height();
		console.log(screenHeight+scroll_top);
		if (screenHeight+scroll_top>=DOMheight) {
			console.log("到底了");
		}
	});
});