$(document).ready(function(){
	$(".inputIn").focus(function(){
	  $(".select").show();
	}).keyup(function(){
		getData($(this).val());
	});;
	$(".select").scroll(function(){
		console.log($(this).scrollTop());
		if($(".select").scrollTop()==$(".select ul").height()-$(".select").height()){
			getData();
		}
	});
	$(".picture a").click(function(){
		getData($(".inputIn").val());
	});
	function getData(keywords){
		$.ajax({
		    type:"GET",
		    data:{k:keywords},
		    url:'http://www.yanhu.com/201707/20170726/20170719.php',
		    dataType:'json',
		    success:function(rs){
		    	var rs={
		    		result:0,
		    		msg:"ok",
		    		data:[
		    				{name:"name1",title:"删除用户信息1"},
		    				{name:"name2",title:"删除用户信息2"},
		    				{name:"name3",title:"删除用户信息3"},
		    				{name:"name4",title:"删除用户信息4"},
		    				{name:"name5",title:"删除用户信息5"},
		    				{name:"name6",title:"删除用户信息6"},
		    				{name:"name7",title:"删除用户信息7"},
		    				{name:"name8",title:"删除用户信息8"},
		    				{name:"name9",title:"删除用户信息9"},
		    				{name:"name10",title:"删除用户信息10"},
		    				{name:"name11",title:"删除用户信息11"},
		    				{name:"name12",title:"删除用户信息12"},
		    				{name:"name13",title:"删除用户信息13"},
		    				{name:"name14",title:"删除用户信息14"},
		    				{name:"name15",title:"删除用户信息15"},
		    				{name:"name16",title:"删除用户信息16"},
		    				{name:"name17",title:"删除用户信息17"},
		    				{name:"name18",title:"删除用户信息18"},
		    				{name:"name19",title:"删除用户信息19"},
		    				{name:"name20",title:"删除用户信息20"},
		    				{name:"name21",title:"删除用户信息21"},
		    				{name:"name22",title:"删除用户信息22"},
		    				{name:"name23",title:"删除用户信息23"},
		    				{name:"name24",title:"删除用户信息24"},
		    				{name:"name25",title:"删除用户信息25"},
		    				{name:"name26",title:"删除用户信息26"},
		    				{name:"name27",title:"删除用户信息27"},
		    				{name:"name28",title:"删除用户信息28"},
		    				{name:"name29",title:"删除用户信息29"},
		    				{name:"name30",title:"删除用户信息30"},
		    			]
		    		};
		    		console.log(rs)
		    		if(rs.result==0){
		    			var data = rs.data;
		    			var searchArr = [];
		    			for (var x in data) {
		    				console.log(data[x].name)
		    			    searchArr.push('<li>&nbsp;&nbsp;<input type="checkbox" name="' + data[x].name + '">&nbsp;&nbsp;&nbsp;' + data[x].title + '</li>');
		    			}
		    			$('.select').find('ul').html(searchArr.join(''));
		    		}
		    },
		    error:function(){
		    	alert("网络错误")
		    }
		})
	}
});