$(document).ready(function() {
	var curNum = 0;
	var curNum2 = 0;
	var liNums = $(".bannerbox .banner").length-1;
	$(".bannerbox .banner").eq(0).css("left", "50%");
	$(".bannerbox").hover(function(){
		$(".leftB,.rightB").css("display","block");
	},function(){
		$(".leftB,.rightB").css("display","none");
	});
	$(".leftB").click(function() {
		$(".banner").finish();
		var temp = curNum;
		curNum--;
		if (curNum == -1) {
			curNum = liNums;
		}
		$(".banner").eq(curNum).css("left", "150%").animate({left: "50%"});
		$(".banner").eq(temp).animate({left: "-150%"});
		$(".focusBox li").eq(curNum).addClass("cur").siblings().removeClass("cur");
	});
	$(".rightB").click(function(){
		$(".banner").finish();
		var temp=curNum;
		curNum++;
		if(curNum==$(".bannerbox .banner").length){
			curNum=0;
		}
		$(".banner").eq(curNum).css("left","-50%").animate({left:"50%"});
		$(".banner").eq(temp).animate({left:"250%"});
		$(".focusBox li").eq(curNum).addClass("cur").siblings().removeClass("cur");
	});
	function autoScroll(){
		$(".banner").finish();
		var temp = curNum;
		curNum--;
		if (curNum == -1) {
			curNum = liNums;
		}
		$(".banner").eq(curNum).css("left", "150%").animate({left: "50%"});
		$(".banner").eq(temp).animate({left: "-150%"});
		$(".focusBox li").eq(curNum).addClass("cur").siblings().removeClass("cur");
	};
	var clearIn=setInterval(autoScroll, 3000);
	$(".bannerbox").hover(function(){
		clearInterval(clearIn);
	},function(){
		clearIn=setInterval(autoScroll, 3000);
	});
	for(var x=0;x<$(".bannerbox .banner").length;x++){
		if(x==0){
			$(".focusBox").append("<li class='cur'></li>");
		}else{
			$(".focusBox").append("<li></li>");
		}
	}
	$(".focusBox li").hover(function(){
		$(".banner").finish();
		$(".focusBox li").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
		curNum2=$(this).index();
		if(curNum==curNum2){
			return;
		}else if(curNum<curNum2){
			$(".banner").eq(curNum2).css("left", "150%").animate({left: "50%"});
			$(".banner").eq(curNum).animate({left: "-150%"});
		}else if(curNum>curNum2){
			$(".banner").eq(curNum2).css("left","-50%").animate({left:"50%"});
			$(".banner").eq(curNum).animate({left:"250%"});
		}
		curNum=curNum2;
		curNum2="";
	},function(){

	})

	$(".t_window .close").click(function(){
		$(".t_window").hide();
	});
	$(".t_window .speci").click(function(){
		$(".tcselector").show();
	});
	$(".sm_window  a.close").click(function(){
		$(".tcselector").hide();
	});
	// $.ajax({
	// 	url:xxx,
		// data:{
			// fas:asdfa,
			// safd:sadfa,
			// asdfasdf:sdf,
			// sadfasd:asdf
		// },
	// 	dataType:jsonp,
	// 	success:function(rs){
	// 		if(rs.result==0){
	// 			var nums=rs.data.nums;
	// 			$(".xx").html(nums);
	// 		}
	// 	}
	// })
});