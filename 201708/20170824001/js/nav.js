
// 菜单鼠标悬浮移动效果
var pow = Math.pow,
	PI = Math.PI,
	c1 = 1.70158,
	c3 = c1 + 1;
(function(){
	$.fn.moveline = function(options,callback){
			var _this = this;
			var $this = $(this);
			var defaultValue = {
			height:2,
			position:'',
			color:'#ffb300',
			animateTime:30,
			animateType:function (x) {return 1 + c3 * pow( x - 1, 3 ) + c1 * pow( x - 1, 2 );},
			zIndex:'0',
			top:54,
			customTop:true,
			randomColor:false,
			randomOpacity:1,
			click:function(){},
		}

		var opt = $.extend(defaultValue,options || {});		$this.css({			position:'relative',		});
	
		var li_width = $this.children().outerWidth();

		var li_height = opt.position === 'inner'? $this.children().outerHeight() - opt.height : $this.children().outerHeight();

		var li_left = $this.children().position().left;

		var li_marginLeft = Number($this.children().css('margin-left').replace(/[^0-9]+/g, ''));

		var randomColor = function(){var opacity = opt.randomOpacity || 1;var r=Math.floor(Math.random()*256);var g=Math.floor(Math.random()*256);var b=Math.floor(Math.random()*256);return "rgba("+r+','+g+','+b+','+opacity+")";
		};

		var color = opt.randomColor? randomColor() : opt.color;
		if(opt.customTop) li_height = opt.top;
		var zIndex = opt.height > 5 ? '-1':opt.zIndex;
		_this.moveLineDiv = $('<div class="nav_line"></div>').css({
			'position': 'absolute',
	    	'height': opt.height,
	    	'background': color,
	    	'top':li_height,
	    	'z-index':zIndex,
		}).appendTo($this);
		for(var i  = 0; i<$this.children().length;i++){
			if ($this.children().eq(i).hasClass('active')) {
				li_left = $this.children().eq(i).position().left;
				li_width = $this.children().eq(i).outerWidth();
			}
		}
		_this.moveLineDiv.stop().animate({
			width:li_width,
			left:li_left + li_marginLeft
		}, opt.animateTime,opt.animateType);
		$this.children().hover(function(){
			var li_marginLeft = Number($this.children().css('margin-left').replace(/[^0-9]+/g, ''));
			var li_width = $(this).outerWidth();
			var li_left = $(this).position().left;
			_this.moveLineDiv.stop().animate({
				width:li_width,
				left:li_left + li_marginLeft
				}, opt.animateTime,opt.animateType);
			},function(){
			for(var i  = 0; i<$this.children().length;i++){
				if ($this.children().eq(i).hasClass('active')) {
					li_left = $this.children().eq(i).position().left;
					li_width = $this.children().eq(i).outerWidth();
				}
			}
			_this.moveLineDiv.stop().animate({
				width:li_width,
				left:li_left + li_marginLeft
			}, opt.animateTime);
		});
		$this.children().on('click',function(){
			var ret = {
				ele:$(this),
				index:$(this).index(),
			}
			opt.click(ret);
		});
		return _this;
	}
})(jQuery);

function enter(x){
	x.setAttribute("src","http://testfe.zhichiwangluo.com/static/pc/index/img/message_new.png");
}
function leave(x){
	x.setAttribute("src","http://testfe.zhichiwangluo.com/static/pc/index/img/message_enter.png");
}

$(".nav-logo-img").click(function(){
	window.location.href = "/index.php?r=pc/index/AppHome";
});
if(window.location.href.replace(window.location.origin, '') == '/'  || window.location.href.replace(window.location.origin, '') == '/index.php?r=pc/index/AppHome'){
	pathname = '/index.php?r=pc/index/AppHome';
}else{
	pathname = window.location.href.replace(window.location.origin, '').split('?')[0]
}

// $('a[href="'+pathname+'"]').closest('.menu-one').addClass('active');
// $('.menu-one.check_login[data="'+pathname+'"]').addClass('active');
// $('.menu-two.check_login[data="'+pathname+'"]').closest('.menu-one').addClass('active');
// // $('#massageImg[data="'+pathname+'"]').css(".nav_line").hide('active');
// $('#massageImg[data="'+pathname+'"]').closest('.menu-one').removeClass('active');
// $('.top-menu').moveline();
 function testHref(){
    var _href = window.location.pathname + window.location.search;
    // console.log(_href)
    $.each($("li.menu-one,li.menu-one a,li.menu-one li"),function(item,index){
      var aHref = $(this).attr("href") || $(this).attr("data");
      if(_href == "/" && aHref == "/index.php?r=pc/index/AppHome"){
      	$(this).closest(".menu-one").addClass("active");
      	$('.top-menu').moveline();
      	return;
      };
      if(aHref){
      	aHref = aHref.replace("?","\\?");
	      var reg = new RegExp("^"+aHref);
	      // console.log(reg)
	      if(reg.test(_href)){
	      	if($(this).hasClass("menu-one")){
	      		$(this).addClass("active").css("color","#ffb300");
	      		$('.top-menu').moveline();
	      		return;
	      	}
	      	$(this).parents(".menu-one").addClass("active");
	      	$('.top-menu').moveline();
	      	return;
	      }
      }
    });
  }
  testHref();