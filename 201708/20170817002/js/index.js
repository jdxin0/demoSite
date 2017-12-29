$(document).ready(function(){
	$(".content").html("hello world");
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