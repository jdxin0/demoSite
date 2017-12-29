$(document).ready(function(){
	$.ajax({
		url:"http://test.scpoo.com/myTools/public/index.php/base/getList?source=sz_yi_test_user",
		dataType:"json",
		success:function(rs){
			if (rs.ret==200) {
				var data=rs.data;
				var tplArr=[];
				for(var x=0;x<data.length;x++){
					tplArr.push(['<li>',
					'	<div>',
					'		<div>',
					'			<a href="javascript:;"><img src="'+data[x].pic+'"></a>',
					'		</div>',
					'		<div class="prize_b">',
					'			<div class="b_left">',
					'				<p class="title">'+data[x].name+'</p>',
					'				<p><span class="price_s">'+data[x].num+'票</span></p>',
					'			</div>',
					'			<div class="b_right"><a href="javascript:;">投票</a></div>',
					'		</div>',
					'	</div>',
					'	<div class="top_left">'+data[x].id+'</div>',
					'</li>'].join(""));
				};
				$(".picture_wrap").find("ul").html(tplArr.join(""));
			}
		}
	});
});