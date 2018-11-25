define('js/common/music/tips.js', function(require, exports, module){

/**
 * tips类
 * 
 * @description tips提示类浮出提示消息
 */

var music = require('js/common/music.js'),
	$ = music.$,
	Base = require('js/common/music/lib/base.js')
    , $ = music.$
	Position = require("js/common/music/lib/position.js"),
	guid = 0,
	isLoaded = false;

var Tips = Base.extend({
	attrs : {
		tpl_outtips : '',
		class_icon_list : ["icon_popup_success", "icon_popup_warn", "icon_popup_note"]
		
	},
	Statics : {
		fix_elem : function(elem, p, r) {
			Position.center(elem, p, r);
		},
		/*
		 * Generate a global unique id.
		 * @param {String} [pre] guid prefix
		 * @return {String} the guid
		 */
		guid : function(pre) {
			return (pre || '') + guid++;
		},
		/**
		 * 获取Dom对象,如果对象不存在则自动在body创建
		 * @param {String} name
		 * @param {Boolean} cancelBubble
		*/
		getElementInBody : function(id, attrs){
			var e = $('#'+id);

			e.length < 1 && ($("<div id=" + id + "></div>").appendTo("body"));
			e = $('#'+id);
			for (var a in attrs)
			{
				e.attr(a, attrs[a]);
			}
			return e;
		}
	}

});



return Tips;
	


});