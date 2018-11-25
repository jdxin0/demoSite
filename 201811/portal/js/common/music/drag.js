define('js/common/music/drag.js', function(require, exports, module){

/**
 * 有个拖拽（自用）
 * @author pauldeng 
 * @param {jQuery.event} opt.event 事件对象
 * @param {jQuery} opt.target 目标拖拽对象
 * @param {jQuery} opt.self	上下文、自己
 * @param {Function} opt.start 拖拽开始，参数[e,opt,xy]被传入
 * @param {Function} opt.move 拖拽中，参数[e,opt,xy,dxy]被传入
 * @param {Function} opt.stop 拖拽结束，参数[e,opt]被传入
 */
var music = require('js/common/music.js')
	, $ = music.$;
var empty = function(){};
return function(opt){
	var e 		= opt.event,
		dom 	= opt.target,
		self	= opt.self,
		start	= opt.start || empty,
		stop	= opt.stop || empty,
		move	= opt.move || empty,
		undefined;

	dom.stop(true,true);
	document.body.setCapture && document.body.setCapture(true);
	window.captureEvents && window.captureEvents(Event.MOUSEMOVE);
	
	var whenStop = function(dom){
		return function(e){
			document.body.releaseCapture && document.body.releaseCapture();
			window.releaseEvents && window.releaseEvents(Event.MOUSEMOVE);
			$(window).off('blur.drag');
			$(document).off('mousemove.drag mouseup.drag');
			
			//拖动结束时清除选中文字
			try {
				if (document.selection) {//IE ,Opera
					if (document.selection.empty) {
						document.selection.empty();//IE
					} else {//Opera
						document.selection = null;
					}
				} else if (window.getSelection) {//FF,Safari
					window.getSelection().removeAllRanges();
				}
			} catch(err) {}
			
			if(stop(e,opt) !== false){
				$('html').css(opt._oldHtmlCss);
			};
		}
	}(dom);
	
	//拖动结束时...
	$(window).off('blur.drag').on('blur.drag', whenStop);
	$(document).off('mouseup.drag').on('mouseup.drag', whenStop);
	
	//拖动开始...
	$(document).off('mousemove.drag').on('mousemove.drag', (function(dom){
		var xy = null,					//上一次鼠标位置
			t = 0,						//上一次拖动时间
			range = null,				//有效范围
			now = null,					//上一次dom位置
			win = $(window),
			undefined;
		
		//记录起始点
		xy = {
			x : e.clientX,
			y : e.clientY
		};
		
		//计算有效范围
		range = {
			xMin : xy.x + win.scrollLeft() - dom.offset().left,
			xMax : win.width() - dom.outerWidth(),
			yMin : xy.y + win.scrollTop() - dom.offset().top,
			yMax : win.height() - dom.outerHeight()
		};
		
		range.xMax += range.xMin;
		range.yMax += range.yMin;
		
		now = {
			'top':  parseFloat(dom.css('top')) || 0,
			'left': parseFloat(dom.css('left')) || 0
		};
		
		
		opt.range = range;
		
		if (start(e,opt,xy) !== false) {
			opt._oldHtmlCss = {
				cursor: $('html').css('cursor')
			};
			
			$('html').css({cursor: 'move'});
		};
		
		//拖动中...
		return function(e){
			var nt = new Date().getTime(),
				pointer,
				dxy;
				
			if (nt - t < 8) { return false; }
			
			t = nt;
			
			//现在鼠标位置
			pointer = {
				x : e.clientX,
				y : e.clientY
			};
			
			//修正坐标，先修max，再修min顺序不可反
			pointer.x > range.xMax && (pointer.x = range.xMax);
			pointer.x < range.xMin && (pointer.x = range.xMin);
			pointer.y > range.yMax && (pointer.y = range.yMax);
			pointer.y < range.yMin && (pointer.y = range.yMin);
			
			dxy = {
				dx : pointer.x - xy.x,
				dy : pointer.y - xy.y
			}
			
			xy = {
				x: pointer.x,
				y: pointer.y
			}
			
			now = {
				'top':  (dxy.dy + now['top']),
				'left': (dxy.dx + now['left'])
			};
			
			if (move(e,opt,xy,dxy) !== false) {
				dom.css(now);
			}
			
			return false;
		}
	})(dom));
};


});