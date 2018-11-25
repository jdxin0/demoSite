define('js/common/music/scroller.js', function(require, exports, module){

var music = require('js/common/music.js'),
	drag	= require('js/common/music/drag.js')
	$ = music.$,
	Base = require('js/common/music/lib/base.js');
	
$.fn.scrollbar = function(config, args){
	return this.each(function(){
		/**
		 * 默认配置，第一个scrollable对象应该有自己独立的默认配置
		 *
		 */
		/* this.defaultConfig = {
			overviewElement : ".sb_overview",		//内容区域jQuery选择器，支持多个
			barElement : ".sb",	//滚动条jQuery选择器，支持多个
			minThumbSize : 100, //滚动条滑块的最小尺寸
			//skin : undefined,	//滚动条皮肤样式，暂不考虑支持
			hScroll : false,	//是否需要水平滚动条
			vScroll : true,		//是否需要竖直滚动条
			updateOnWindowResize : true,	//改变窗口大小时，是否自动更新滚动条
			dragSpeed : 20,     //滚动条拖动速度
			wheelSpeed : 50,	//滚轮滚动速度（抖动倍数）配置项，此值不能等于0
			wheelPropagation : true,	//是否允许内层区域滚轮事件冒泡到外层可滚动区域，默认不允许
			onScrolled : undefined,	//自定义滚动事件回调
			preventDoBefore : true,	//默认为true, 不执行Scrollable.beforeEvtHandler
			preventDoAfter : false		//默认为false, 为true时，不执行Scrollable.afterEvtHandler
		}; */

		if (typeof(config) == "string") {
			var scrollable = $(this).data("scrollable");
			if (!!scrollable) {
				//this[config] = scrollable[config](args);
				scrollable[config](args);
			}
		} else if (typeof(config) == "object") {
			config.boxDiv = this;
			new Scroller(config);
		} else {
			throw "Init Scroller Exp:Invalid type of config!";
		}
	});
};
	
	
var Scroller = Base.extend({
	//静态属性和方法
	Statics : {
		beforeEvtHandler : music.emptyFn,	//onscrolled事件句柄之前需要执行的操作（默认不做任何事情）
		afterEvtHandler : music.emptyFn	//onscrolled事件句柄之后需要执行的操作（默认不做任何事情）
	},
	attr : {
		scrollToBottom: false,
		boxDiv: null,
		scrollcont: '.sb_overview',
		scrollarea: '.sb',
		scrollbar: '.sb_thumb',
		//scrolling: '.sb_thumb',
		scrollbarbg: '.sb_bg',
		scrollbarbginner: '.sb_bg_cont',
		scrollbarinner:'.sb_thumb_cont',
		vScroll : true,
		barElement : '.sb',
		overviewElement : '.sb_overview',
		updateOnWindowResize : true,
		wheelPropagation : true,
		//onScrolled : music.emptyFn,
		preventDoBefore : true,	//默认为true, 不执行Scrollable.beforeEvtHandler
		preventDoAfter : false,		//默认为false, 为true时，不执行Scrollable.afterEvtHandler
		minHeight: 457
	},
	initialize : function(options){
		var opts = {};
		$.extend(opts, {
			scrollcont: '.sb_overview',
			scrollarea: '.sb',
			scrollbar: '.sb_thumb',
			//scrolling: '.sb_thumb',
			scrollbarbg: '.sb_bg',
			scrollbarbginner: '.sb_bg_cont',
			scrollbarinner:'.sb_thumb_cont',
			vScroll : true,
			onScrolled : music.emptyFn,
			preventDoBefore : true,
			preventDoAfter : false,
			updateOnWindowResize : true,
			wheelPropagation : true,
			minHeight: 457
		}, options);

		var boxDiv = $(opts.boxDiv);
		if (!boxDiv) {
			return;
		}
		this.onScrolled = opts.onScrolled;
		Scroller.superclass.initialize.call(this, opts);
		var _this = this;
		_this.$element = boxDiv;
		_this.$element.addClass("scrollable");

		_this.addScrollBarComponents();
		if (this.get("vScroll")) {
			_this.initScrollbar();
		}
		_this.$element.data("scrollable", _this);
		
		if (window.jQueryQMScrollbars == undefined) {
			window.jQueryQMScrollbars = [];
		}
		_this.addToScrollbarsHierarchy();
	},
	//添加相关滚动条组件
	addScrollBarComponents : function(){
		var _this = this,
			$element = $(_this.get("boxDiv")),
			viewport = ".sb_viewport",
			overview = _this.get("scrollcont");
		_this.assignOverview();
		if (_this.$overview.length == 0) {
			_this.$element.find(_this.get("overviewElement")).addClass(overview.substring(1));
			_this.assignOverview();
		}

		_this.assignViewPort();
		if (_this.$viewPort.length == 0) {
			_this.$overview.parent().addClass(viewport.substring(1));
			_this.assignViewPort();
		}

		_this.addScrollBar("vertical", "append");
		//_this.addScrollBar("horizontal", "append");
	},
	//设置viewport
	assignViewPort : function(){
		var _this = this,
			viewport = ".sb_viewport";
		_this.$viewPort = _this.$overview.parent(viewport);
	},
	//设置overview
	assignOverview : function(){
		var _this = this,
			overview = _this.get("scrollcont");
		_this.$overview = _this.$element.find(overview).first();
	},
	//如果没有滚动条div，则添加滚动条div
	addScrollBar : function(orientation, fun){
		var _this = this
			, $bararea = _this.$element.find(_this.get("barElement")).last()
			, $barbg
			, $bar;
		if ($bararea.length > 0) {
			$bararea.addClass("sb").addClass(orientation);
			$bar = $bararea.find(".scroll_bar").addClass("sb_thumb");
			$bar.find(".scroll_bar_cont").length > 0 && $bar.find(".scroll_bar_cont").addClass("sb_thumb_cont");
			$barbg = $bararea.find(".scroll_bg").addClass("sb_bg");
			$barbg.find(".scroll_bg_cont").length > 0 && $barbg.find(".scroll_bg_cont").addClass("sb_bg_cont");
		} else {
			//没传进来，就动态插入一个
			if (_this.$element.find(".sb." + orientation).length == 0) {
				_this.$element[fun]('<div class="scroll_area sb ' + orientation + '" style="display: none;"><div class="scroll_bg sb_bg"><div class="scroll_bg_cont sb_bg_cont"></div></div><div class="scroll_bar sb_thumb"><div class="scroll_bar_cont sb_thumb_cont"></div></div></div>');
			}
		}
	},
	initScrollbar : function(){
		var that = this,
			self = that.$element,
			scrollcont,scrollarea,scrollbox,scrollbar,scrollbarbg,scrollbarbginner,scrollbarinner,overviewElement;

		scrollbox = that.$viewPort//scrollcont.closest(that.get("scrollbox"));
		scrollcont = that.$overview//self.find(that.get("scrollcont"));
		
		//防重复绑定
		if(self.data('scrollBoxEventBind') && scrollcont.data('scrollContEventBind')){
			scrollcont.trigger('updateScroll');
			return;
		}
		self.data('scrollBoxEventBind',true);
		
		scrollarea = self.find(that.get("scrollarea"));
		scrollbar = self.find(that.get("scrollbar"));
		//scrolling		= scrollbar.find(that.get("scrolling"));
		scrollbarbg = scrollbar.prev(that.get("scrollbarbg"));
		scrollbarbginner = scrollbarbg.find(that.get("scrollbarbginner"));
		scrollbarinner	= scrollbar.find(that.get("scrollbarinner"));
		overviewElement = self.find(that.get("overviewElement"));
		that.scrollPercent = 0;
		//scrollarea.css({'height':scrollcont.height() + 'px'});
		if (that.get("scrollToBottom")) {
			scrollcont.scrollTop(999999);
			that.scrollPercent = 1;
		}
		
		if (that.get("hoverFunc") && that.get("hoverFunc").length) {
			$(scrollbox).on('mouseenter',that.get("scrollbar"),function(){
				opt.hoverFunc[0](scrollbar,scrollbarinner);
			}).on('mouseleave',that.get("scrollbar"),function(){
				opt.hoverFunc[1](scrollbar,scrollbarinner);
			});
		}
		
		//滚动事件
		scrollbox.on('DOMMouseScroll mousewheel',function(e){
			var self = $(this).find(that.get("scrollcont")),
				multiple = 0,
				now	= new Date().getTime(),
				start,end,
				lastMousewheelTime = self.data('lastMousewheelTime') || 0;
				lastMousemoveTime = $(window).data('lastMousemoveTime') || 0;
				lastScrollTime = $(window).data('lastScrollTime') || 0;
				undefined;
			
			start = self.scrollTop();
			
			//计算滚动倍数
			if (e.originalEvent.wheelDelta) {
				multiple = parseInt(e.originalEvent.wheelDelta / -120);
			} else if (e.originalEvent.detail) {
				multiple = parseInt(e.originalEvent.detail / 3);
			}
			
			if (that.shouldPreventDefault(0, multiple)) {
				e.preventDefault();
			}
			
			var scrollables = window.jQueryQMScrollbars
				, cur_scrollElem = scrollbox.get(0);
			//cs.p("mousedown:", scrollables.length, scrollables[0].$element.get(0) == cur_scrollElem);
			if (scrollables.length > 1 && scrollables[0].$element.get(0) != cur_scrollElem) {
				e.stopPropagation();
			}
			
			var _stop = self.scrollTop() + multiple * 90;
			self.scrollTop(_stop);
			
			setTimeout(function(){
			end = self.scrollTop();
			
			if (end === start) {
				if (multiple < 0) {
					self.trigger('afterScrollHitTop');
				} else {
					self.trigger('afterScrollHitBottom');
				}
			} else {
				self.data('lastMousewheelTime',now);
				lastMousewheelTime = now;
			}
			
			if (self.data('lastMousemoveTime') !== lastMousemoveTime) {
				self.data('lastMousemoveTime',lastMousemoveTime);
				self.data('lastMousewheelTime',now);
				lastMousewheelTime = now;
			}
			
			//触发页面滚动条
			if (end === start && start === 0 && self.data('noScrolling')) {
				return;
			}
			
			//最后操作是移动鼠标
			if (lastMousemoveTime > lastScrollTime) {
				//延迟1秒滚动页面
				if (now - lastMousewheelTime < 1000) {
					return false;
				}
			}
			}, 10);
		});
		
		//滚动时设置自定义滚动条高度
		scrollcont.on('scroll updateScroll',function(e){
			var scrollcont	= $(this),//.find(that.get("scrollcont")),
				contentLast	= scrollcont.find('>:visible:last'),
				scrollTop	= scrollcont.scrollTop()||10,
				height		= {
					content: /* scrollcont.outerHeight(true) */contentLast.size() && (contentLast.offset().top
						+ scrollTop 
						+ contentLast.outerHeight()
						+ (parseInt(contentLast.css('margin-bottom')) || 0)
						- scrollcont.offset().top)
						- (parseInt(scrollcont.css('padding-top')) || 0),
					scrollbox: scrollcont.height(),
					scrollarea: scrollarea.height()-220,
					scrollbar: scrollbar.height()
				},
				scrollbarHeight,
				scrollbarTop,
				firstBind = scrollcont.data("scrollBoxEventBind"),
				undefined;
			height.content = parseInt(height.content, 10);
			
			//记录scrollcont已绑定事件
			scrollcont.data('scrollContEventBind',true);
			
			if (contentLast.size() === 0) {
				height.content = 0;
			}
			
			//dragging
			if (scrollbar.data('dragging')) {
				return;
			}
			
			
			//隐藏滚动条
			if ( height.content <= height.scrollbox ) {
				scrollarea.hide();
				/* scrollbox.find('>b.grc-overlay-top').hide();
				scrollbox.find('>b.grc-overlay-bottom').hide(); */
				scrollcont.data('noScrolling',true);
				that.$element[0].hasScroll = false;
				return;
			} else {
				scrollarea.show();
				scrollcont.data('noScrolling',false);
				firstBind && that.iframeScrollParent();
				that.$element[0].hasScroll = true;
			}
			
			//滚动条高度
			scrollbarHeight = height.scrollbox / height.content * height.scrollarea;
			
			//滚动条最小高度
			if(scrollbarHeight < 60){
				scrollbarHeight = 60;
			}

			//滚动条位置
			scrollbarTop = ((scrollTop ) / (height.content - height.scrollbox)) * (height.scrollarea - scrollbarHeight);
			var oldScrollPercent = that.scrollPercent;
			var _sbHeight = Math.ceil(scrollbarHeight);
			scrollbar.css({
				height: _sbHeight,
				top: Math.round(scrollbarTop)
			});
			
			scrollbarinner.length > 0 && scrollbarinner.css({height: _sbHeight});
            scrollbarbg.length > 0 && scrollbarbg.css({height: height.scrollarea - 5});
            scrollbarbginner.length > 0 && scrollbarbginner.css({height: height.scrollarea - 5});
			
			that.scrollPercent = scrollbarTop / (height.scrollarea - scrollbarHeight);
			
			oldScrollPercent != that.scrollPercent && that.triggerCustomScroll(oldScrollPercent);
			return false;
		}).trigger('updateScroll');
		
		if (that.onScrolled) {
			//仅在指定需要绑定onscrolled事件时，绑定该事件
			that.$element.off("scrolled").on("scrolled", function(evt, data){
				that.onScrolled(evt, data);
			});

			if (!that.get("preventDoAfter")) {
				that.after("onScrolled", function(returned, evt, data){
					//Scroller.afterEvtHandler(that, returned, evt, data);
				});
			}
		}
		
		//拖动滚动条
		scrollbar.on('mousedown.drag',function(e){
			var scrollbar	= $(this),
				contentLast	= scrollcont.find('>:visible:last'),
				scrollbarTop= parseInt(scrollbar.css('top'), 10),
				scrollTop	= scrollcont.scrollTop(),
				height		= {
					content: /* scrollcont.outerHeight(true) */contentLast.size() && (contentLast.offset().top 
						+ scrollTop 
						+ contentLast.outerHeight()
						+ (parseInt(contentLast.css('margin-bottom')) || 0)
						- scrollcont.offset().top),
					scrollbox: scrollcont.height(),
					scrollarea: scrollarea.height()-220,
					scrollbar: scrollbar.height()
				},
				scrollbarHeight,
				//scrollbarTop,
				undefined;
			
			if (contentLast.size() === 0) {
				height.content = 0;
			}
			
			e.preventDefault();
			
			//确定是鼠标左键
			if( e.which !== 1){
				return;
			}
			
			drag({
				event: e,
				target: scrollbar,
				start: function(e,opt,xy){
					var range = opt.range;
					//调整可拖动范围
					range.yMin = e.clientY - scrollbarTop;
					range.yMax = e.clientY + (height.scrollarea - height.scrollbar - scrollbarTop);
					
					//记录页面原鼠标样式
					opt._oldHtmlCss = {
						cursor: $('html').css('cursor')
					};
				
					$('html').css({cursor: 'default'});
					
					scrollbar.data('dragging',true);
					scrollbar.addClass('gs-scrolling-hover');
					
					return false;
				},
				move: function(e,opt,xy,dxy){
					
					var scrollTop,scrollbarTop;
					
					if(dxy.dy === 0 && dxy.dx !== 0){
						return false;
					}
					
					scrollbar.css({
						top : dxy.dy > 0 ? '+=' + dxy.dy : '-=' + (0 - dxy.dy)
					});
					
					scrollbarTop = parseInt(scrollbar.css('top')),
					
					//计算滚动位置
					scrollTop = ((scrollbarTop ) / (height.scrollarea - height.scrollbar)) * (height.content - height.scrollbox);
					scrollcont.scrollTop(scrollTop);
					
					if(dxy.dy === 0){
						if(scrollbarTop === 0){
							scrollcont.trigger('afterScrollHitTop');
							//scrollbox.find('>b.grc-overlay-top').hide();
						}else{
							scrollcont.trigger('afterScrollHitBottom');
							//scrollbox.find('>b.grc-overlay-bottom').hide();
						}
					}else{
						//scrollbox.find('>b.grc-overlay-top').css('display','');
						//scrollbox.find('>b.grc-overlay-bottom').css('display','');
					}
					
					return false;
					
				},
				stop: function(e,opt){
					//还原页面鼠标样式
					$('html').css(opt._oldHtmlCss);
					
					scrollbar.data('dragging',false);
					scrollbar.removeClass('gs-scrolling-hover');
					scrollbar.trigger('afterDragging');
					scrollcont.trigger('updateScroll');
					
					return false;
				}
			});
			
			return false;
		});
		// 窗口大小改变
		if (this.get("updateOnWindowResize")) {
			function _resize() {
				if (overviewElement.length > 0) {
					var h = Math.max(that.get('minHeight'), $(window).height() - overviewElement.offset().top - parseInt(overviewElement.css('padding-top') || 0, 10) - parseInt(overviewElement.css('padding-bottom') || 0, 10));
					overviewElement.css('height', h-200 + 'px');
					scrollarea.length > 0 && scrollarea.css('height', (h + 10) + 'px');
				}
				that.$overview.trigger("updateScroll");
			};
			$(window).on('resize', function(){
				_resize();
			});
			_resize();
		}
	},
	hasScroll : function(){
		return $(this.$overview).data("noScrolling");
	},
	resize : function(){
		//this.$viewPort.trigger("updateScroll");
		this.$overview.trigger("updateScroll");
	},
	scrollToY : function(y){
		//this.$viewPort.scrollTop(y);
		this.$overview.scrollTop(y);
	},
	scrollByY : function(dy){
		var scrollbar = this.$element.find(this.get("scrollbar")),
			top = parseInt(scrollbar.css("top"), 10) || 0;
		this.scrollToY(top + dy);
	},
	//elem是否嵌套在wrappingElement之内
	isInside : function(elem, wrappingElement){
		var _this = this
			, $element = $(elem)
			, $wrappingElement = $(wrappingElement)
			, elementOffset = $element.offset()
			, wrappingElementOffset = $wrappingElement.offset();

		return ((elementOffset.left >= wrappingElementOffset.left) &&
			(elementOffset.left + $element.width() <= wrappingElementOffset.left + $wrappingElement.width()) &&
			(elementOffset.top >= wrappingElementOffset.top) &&
			(elementOffset.top + $element.height() <= wrappingElementOffset.top + $wrappingElement.height()));
	},
	//添加一个嵌套的可滚动对象
	addNested : function(otherScrollable){
		var _this = this;
		if (_this.addNestedToOneFromList(otherScrollable, _this.nestedScrollbars)) {
			return true;
		} else if (_this.isInside(otherScrollable.$viewPort, _this.$overview)) {
			_this.nestedScrollbars.push(otherScrollable);
			return true;
		}

		return false;
	},
	//将scrollbar添加到全局滚动条层级队列
	addToScrollbarsHierarchy : function(){
		var _this = this;
		_this.nestedScrollbars = [];
		//cs.p("need to add one nested: ", _this.addNestedToOneFromList(_this, window.jQueryQMScrollbars));
		if (!_this.addNestedToOneFromList(_this, window.jQueryQMScrollbars)) {
			//cs.p("add a nested scrollbar!!!");
			window.jQueryQMScrollbars.push(_this);
		}
	},
	//根据已有可滚动对象对表，添加一个可滚动对象到已有列表
	addNestedToOneFromList : function(scrollable, list){
		var _this = this;
		for (var i = 0, sb; (sb = list[i ++]); ) {
			if (sb.addNested(scrollable)) {//scrollbar is inside of sb【内部新增】
				//cs.p("in, ", i);
				list[i] = scrollable;
				return true;
			} else if (scrollable.addNested(sb)) {//sb is inside of scrollbar【外部新增】
				//cs.p("out, ", i);
				list[i - 1] = scrollable;
				return true;
			}
		}
		return false;
	},
	//触发自定义的滚动事件
	triggerCustomScroll : function(oldScrollPercent){
		var _this = this
			, data = {
				scrollAxis : "Y",
				direction : oldScrollPercent > _this.scrollPercent? "up" : "down",
				scrollPercent : Math.ceil(_this.scrollPercent * 100)
			};
		if (_this.$element.length > 1) {
			_this.$element.trigger("scrolled", data);
		} else {
			_this.$element.triggerHandler("scrolled", data);
		}
	},
	//检查滚轮事件是否需要跨层级冒泡，即在当前层次滚动滚轮时，是否需要阻止上层滚动事件默认行为
	shouldPreventDefault : function(deltaX, deltaY){
		var _this = this
			, scrollarea = _this.$element.find(_this.get("scrollarea"))
			, scrollbar = _this.$element.find(_this.get("scrollbar"))
			, thumbPosition = parseInt(scrollbar.css("top"), 10)
			, delta = deltaY;
		return true;
	},
	//暴露一个接口给外部，重新绑定子页面滚动top滚动条事件
	reflushScrollParent : function(axis){
		var _this = this;
		axis = axis || "Y";
		axis == "Y" && _this.iframeScrollParent();
	},
	iframeScrollParent : function(){
		var _this = this
			, $iframe = $("iframe");
		//if ($iframe.length > 0) {
		$iframe.off("scrollParent").on("scrollParent", function(evt, data){
			var by = data? data.by : 0;
			by != 0 && _this.scrollByY(by);
		});

		window.triggerScroll = function(data){
			$iframe.trigger("scrollParent", data);
		};
		//}
	}
});

return Scroller;

});