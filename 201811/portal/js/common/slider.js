define('js/common/slider.js', function(require, exports, module){

/**
 * 焦点图轮播组件
 * @author: lunardai
 * @lastModified: 2016/6/16
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	$ = music.$,
	BASE = require('js/common/music/lib/base.js'),
    statistics = music.statistics,
    $ = music.$;
    /**
     * 焦点图轮播组件对象
	  focus.init(
	  {
		  container : $('.js_vip .focus')
	  }
	  );
     *
     */
var slider = BASE.extend({
	attrs : {
		$container : null,
		$box : null,
		rate : 750,
		//rate : 'px',
		from : 0,
		total : 5,
		timer : 0
	},
	getSlideStep : function(step){
		var _this = this
			, $container = _this.get("$container")
			, callback = _this.get("callback")
			, currentCss = _this.get("currentCss")
			, $box = _this.get("$box")
			, px = _this.get("px")
			, rate = (typeof _this.get("rate") == 'function')?_this.get("rate")():_this.get("rate")
			, left = _this.get("left")
			, right = _this.get("right")
			, from = _this.get("from")
			, total = _this.get("total");
		if (!left&&step<0)
		{
			step = total - 1;
		}else if (!right&&step>=total)
		{
			step = 0;
		}
		 $box.animate({left:((-1*step * rate)+(-1)*(left?rate:0)) +px}, 'slow', null, function(){
			$box.css('left', ((-1*step * rate)+(-1)*(left?rate:0)) +px);
		 });
		 $('.js_switch a:eq('+from+')', $container).removeClass(currentCss||'slide_switch__item--current');
		 $('.js_switch a:eq('+(step>=total?0:step)+')', $container).addClass(currentCss||'slide_switch__item--current');
		 if (right&&step>=(total))
		{
			
			step = 0;
		}
		if (left&&step<0)
		{
			
			step = total - 1;
		}
		_this.set("from", step);
		callback&&callback();
	},
	bindEvents : function(){
		var _this = this
			, $container = _this.get("$container")
			, currentCss = _this.get("currentCss")
			, timer = _this.get("timer")
			, total = _this.get("total");
		$container.off('click', '.js_jump').on('click', '.js_jump', function(e){
			var stat = $(this).data('stat')||'';
			var nowTime = new Date();
			timer = _this.get("timer");
			_this.set("timer", nowTime)
			if ((nowTime-timer)<300)
			{
				return;
			}
			var from = _this.get("from");
			var to = $(this).data('p');
			if (to=='prev')
			{
				_this.getSlideStep(from-1);
			}else if (to=='next')
			{
				_this.getSlideStep(from+1);
			}else {
				_this.getSlideStep(parseInt(to));
			}
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
		})
		;
		var html = [];
		if (total<=1)
		{
			$('.js_switch,.mod_slide_action', $container).hide();
			$('.js_jump', $container).hide();
		}else if (!currentCss)
		{
			$('.js_switch', $container).html(function(){
				var stat = $(this).data('stat')||'';
				for (var s = 0; s<total; s++)
				{
					html.push('<a href="javascript:;" tabindex="-1" class="js_jump slide_switch__item'+(s == 0?' slide_switch__item--current':'')+'" '+((stat == '')?'':' data-stat="'+stat+'"')+' data-p="'+s+'"><i class="slide_switch__bg"></i><i class="icon_txt">'+(s+1)+'</i></a>');
				}
				return html.join('');
			});
		}
	},
	initialize : function(opts){
		var _this = this
			, _conf = {}
			, $container = $(opts.container)
			, callback = opts.callback
			, currentCss = opts.currentCss||''
			, $box = $(opts.box)
			, from = opts.from||0
			, left = opts.left||false
			, right = opts.right||false
			, total = opts.total||5
			, px = opts.px||'px'
			, rate = opts.rate;
		if (left)
		{
			$box.css('left', '-'+((typeof opts.rate == 'function')?opts.rate():opts.rate) +px);
		}else 
			$box.css({left:'0px'});
		$.extend(_conf, opts, {
			$container : $container,
			callback : callback,
			currentCss : currentCss,
			$box : $box,
			left : left,
			right : right,
			from : from,
			total : total,
			px : px,
			rate : rate
		});

		//把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
		$container.data("slider", _this);

		slider.superclass.initialize.call(_this, _conf);
		
		_this.bindEvents();

	},
	Statics : {
		init : function(config){
			try {
				//new一个新的Pager实例之前，先把之前的实例给destroy掉，防止内存泄漏
				var p = $(config.container).data("slider");
				p && p.remove && p.remove();
				p = null;
			} catch (exp) {};

			return new slider(config);
		}
	}
});

    $.fn.slider = function(args){
        if ($.type(args) === "string") {
            //
        } else if ($.type(args) === "object") {
            //var _conf = $.extend(args, {page : $(this)});
            slider.init(args);
        } else {
            throw "Initialize slider Failed!";
        }
    };
return focus;



});