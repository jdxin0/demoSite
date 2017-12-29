$(document).ready(function() {
	$.ajax({
		type: "get",
		url:"http://hxb.scpoo.com/api/universal_table_behavior.php?op=entered_places",
		data: '',
		dataType: "jsonp",
		success: function(rs){
			if(rs.ret==100){
				$(".remain").html(rs.data.places);
			}else {
				alert(rs.msg);
			}
		},
		error: function(rs){
			// console.log("网络错误！");
		}
	 });
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

	$(document).on("click",".verifyAc",function(){
		var num=60;
		var phoneNum=$(".phone").val();
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!myreg.test(phoneNum)) 
		{ 
		    alert('请输入有效的手机号码！'); 
		    return false; 
		} 
		$.ajax({
			type: "get",
			url:"http://www.top100.hk/web19/bd.php?phone="+phoneNum,
			data: '',
			dataType: "jsonp",
			success: function(rs){

			},
			error: function(rs){

			}
		});

		// $(this).removeClass("verifyAc").addClass("verifyGray").html("重新获取（60）");
		// var tmIn = setInterval(function(){
		// 	num--;
		// 	if (num>0) {
		// 		$(".verifyGray").html("重新获取（"+num+"）");
		// 	}else {
		// 		$(".verifyGray").removeClass("verifyGray").addClass("verifyAc").html("重新获取");
		// 		clearInterval(tmIn);
		// 	}
		// },1000)
	});
	$(".submit").click(function(){
		var phoneNum=$(".phone").val();
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!myreg.test(phoneNum)) 
		{ 
		    alert('请输入有效的手机号码！'); 
		    return false; 
		} else if($(".nickname").val()==''){
			alert('昵称不可为空'); 
			return false; 
		}else if ($(".school").val()=='') {
			alert('学校不可为空'); 
			return false; 
		}
		$.ajax({
			type: "get",
			url:"http://hxb.scpoo.com/api/universal_table_behavior.php?op=entered_table",
			data: {
				phone:$(".phone").val(),
				// verify:$(".verify").val(),
				nickname:$(".nickname").val(),
				school:$(".school").val()
			},
			dataType: "jsonp",
			success: function(rs){
				if(rs.ret==100){
					var remain	= rs.data.places;
					$('.remain').html(remain);
					alert("申请成功")
				}else{
					alert(rs.msg)
				}
			},
			error: function(){
				alert("网络错误！")
			}
		});
	});
	
});