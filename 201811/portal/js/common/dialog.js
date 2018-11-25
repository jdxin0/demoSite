define('js/common/dialog.js', function(require, exports, module){

/**
 * tips类
 * 
 * @description tips提示类浮出提示消息
 */

var music = require('js/common/music.js'),
	$ = music.$,
	Base = require('js/common/music/lib/base.js')
    , $ = music.$
	doc = document,
	Tips = require("js/common/music/tips.js");

/**
 * dialog类
 * 
 * @description 对话框提示类
 *
 * //普通模式对话框
 * @example dialog.show({
 *			mode : "common",			//模式， common：普通模式，iframe：加载页面，默认common
 *			title : "",					//标题，必填
 *			icon_type : -1,				//图标类型，取值0-2[0：成功，1：警告，2：帮助]
 *			sub_title : "",				//小标题，common模式下有效
 *			desc : "",					//描述，common模式下有效
 *			button_info1 : null,		//按钮1，common模式下有效，{highlight : 是否高亮,onclick : "绑定按钮事件",title : "按钮标题"}
 *			button_info2 : null,		//按钮2
 *		});
 *
 * //iframe模式对话框，子页面可以获取中间变量dialog.objArg，必须回调dialog.onReady(width, height)
 * @example dialog.show({			
 *			mode : "iframe",			//模式， common：普通模式，iframe：加载页面，默认common
 *			title : "",					//标题，必填
 *			url : "",					//iframe模式下有效，子页面url
 *			objArg : null				//iframe模式下有效，中间变量
 *		});
*/

var Dialog = Tips.extend({
	attrs : {
		id : Tips.guid('divdialog_'),		//浮层id
		_dialog_tpl : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
if(data.mode != "iframe"){
__p+='\r\n\t<div class="popup__hd">\r\n\t\t<h2 class="popup__tit">'+
((__t=( data.title ))==null?'':__t)+
'</h2>\r\n\t\t<a href="javascript:;" class="popup__close" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n\t</div>\r\n';
}else{
__p+='\r\n\t<div class="popup__hd">\r\n\t\t<h2 class="popup__tit">'+
((__t=( data.title ))==null?'':__t)+
'</h2>\r\n\t</div>\r\n\t<a href="javascript:;" class="popup__close" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n';
}
__p+='\r\n\t<div class="popup__bd '+
((__t=( data.popup__bd_class ))==null?'':__t)+
'" id="dialogbox">\r\n\t\t'+
((__t=( data.content ))==null?'':__t)+
'\r\n\t</div>\r\n';
if(data.mode != "iframe" && data.mode != "bigpage"){
__p+='\r\n\t<div class="popup__ft">\r\n\t\t'+
((__t=( data.outtips ))==null?'':__t)+
'\r\n\t</div>\r\n';
}
__p+='';
return __p;
},
		_content_tpl : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\t<div class="popup__bd_inner">\r\n\t\t<div class="popup__icon_tips '+
((__t=( data.class_icon ))==null?'':__t)+
'"></div>\r\n\t\t<h3 class="popup__subtit '+
((__t=( data.class_single ))==null?'':__t)+
'">'+
((__t=( data.sub_title ))==null?'':__t)+
'</h3>\r\n\t\t<p class="popup__desc">'+
((__t=( data.desc ))==null?'':__t)+
'</p>\r\n\t</div>';
return __p;
},
		tpl_outtips : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\t<button style="display:'+
((__t=( data.button_display1 ))==null?'':__t)+
';" class="'+
((__t=( data.button_class1 ))==null?'':__t)+
' upload_btns__item js-button1">'+
((__t=( data.button_title1 ))==null?'':__t)+
'</button>\r\n\t<button style="display:'+
((__t=( data.button_display2 ))==null?'':__t)+
';" class="'+
((__t=( data.button_class2 ))==null?'':__t)+
' upload_btns__item js-button2">'+
((__t=( data.button_title2 ))==null?'':__t)+
'</button>';
return __p;
},
		_timerScroll : null,
		_timerTips : null,
		objArg : null
	}, 
	/**
	 * 初始化Dialog浮层
	 *
	 * @param {Object}
	 *			opts 属性
	 */
	initialize: function(opts) {
		Dialog.superclass.initialize.call(this, opts);
		Tips.getElementInBody(this.get('id'));//, {'class':, 'data-aria':'popup'});
	},
	/**
	 * 弹出对话框
	 *
	 * @param {Object}	opts 选项
	 * 
	 * @example dialog.show({
	 *	title : "",					//标题，必填
	 *	sub_title : "",				//小标题，common模式下有效
	 *	desc : "",					//描述，common模式下有效
 	 *	icon_type : 0,				//图标类型，取值0-2[0：成功，1：警告，2：帮助],默认0:成功
 	 *	mode : "common",			//模式， common：普通模式，iframe：加载页面，bigpage：大页面，默认common
	 *	width : 420,				//宽度，默认420
	 *	button_info1 : null,		//按钮1，common模式下有效，{highlight : 是否高亮, fn : "绑定按钮事件",title : "按钮标题"}
	 *	button_info2 : null,		//按钮2
	 *	url : "",					//iframe模式下有效，子页面url
	 *	objArg : null				//iframe模式下有效，中间变量	
	 *
	 * });
	 */
	show : function(opts){
		$('body').css({'overflowY':'hidden'});
		/*if (opts.width)
		{
			opts.width = 520;
		}*/
		var _this = this;
		
		var dialog_class = 'mod_popup'+(!!opts.dialogclass?(' '+opts.dialogclass):'');
		Tips.getElementInBody(this.get('id'), {'class':dialog_class, 'data-aria':'popup'});
		var _opt = {
			mode : "common",			//模式， common：普通模式，iframe：加载页面，bigpage：大页面，默认common
			title : "",					//标题，必填
			icon_type : 0,				//图标类型，取值0-2[0：成功，1：警告，2：帮助]
			sub_title : "",				//小标题，common模式下有效
			desc : "",					//描述，common模式下有效
			width : 520,				//宽度，默认420
			button_info1 : null,		//按钮1，common模式下有效，{highlight : 是否高亮, fn : "绑定按钮事件", title : "按钮标题"}
			button_info2 : null,		//按钮2
			url : "",					//iframe模式下有效，子页面url
			objArg : null,				//iframe模式下有效，中间变量
			timeout : null				//多长时间后提示消失（毫秒数，默认不消失）
		},
		t = this;
		if ($('.mod_popup_mask').length<=0)
		{
			$('body').append('<div class="mod_popup_mask"></div>');
		}else $('.mod_popup_mask').show();
		

		$.extend(_opt, opts || {});
	//	Tips._insertCss(function(){

			var _e = Tips.getElementInBody(_this.get('id'));
			
			_e.html("");
			_e.css({position:"fixed",zIndex:"100000",top:"-1000px",margin:'10px'});
			
			
			var _data = {},
				_content = "";
			if (_opt.mode == "iframe") {
				_content = !!_opt.url?('<iframe id="frame_tips" frameborder="0" width="100%" '+(_opt.url.indexOf('aisee.qq.com')!=-1?'height="420px;" scrolling="auto"':'height="380px;" scrolling="no"')+' src="about:blank;"></iframe>'):'';
				_this.set('objArg', _opt.objArg);
			} else if(_opt.mode == "bigpage") {
				_content = _opt.desc;
			} else {
				//margin-left:-60%;margin-top:-40%;
			
				if (_opt.icon_type >= 0 && _opt.icon_type <= 2) {
					_data.class_icon = _this.get('class_icon_list')[_opt.icon_type];
				}
				_data.sub_title = _opt.sub_title || "";
				_data.desc = _opt.desc || "";
				_data.class_single = '';
				if (_data.desc == '')
				{
					_data.class_single = ' popup__subtit--single';
				}
	
				for(var i = 1, button_info = ""; i < 3; i++){
					button_info = "button_info" + i;
					if (_opt[button_info]) {
						_data["button_class" + i] = _opt[button_info].highlight ? "mod_btn_green" : "mod_btn";
						_data["button_onclick" + i] = _opt[button_info].fn || "";
						_data["button_title" + i] = _opt[button_info].title || "";
					} else {
						_data["button_display" + i] = "none";
					}

				}
				
				_content = _opt.content||(_this.get('_content_tpl'))(_data);
				_data["close_func"] = _opt['close_func'] || "";
			}
			
			_e.html(_this.get('_dialog_tpl')({
				title : _opt.title,
				content : _content,
				popup__bd_class : _opt.popup__bd_class||'',
				dialogclass : _opt.dialogclass,
				mode : _opt.mode,
				outtips : (_this.get('tpl_outtips'))(_data)
			}));
			_e.off();
			_e.on("click","a.popup__close ",function(ev){
				var fn = _data["close_func"];
				$.isFunction(fn) && fn.call(this, ev);
				_this.hide()
			});
			_e.on("click",".js-button1",function(ev){
				var fn = _data["button_onclick1"];
				$.isFunction(fn) && fn.call(this, ev)
			});
			_e.on("click",".js-button2",function(ev){
				var fn = _data["button_onclick2"];
				$.isFunction(fn) && fn.call(this, ev)
			});

			if (_opt.mode == "iframe") {
				if (!!_opt.url)
				{
					doc.getElementById("frame_tips").src = _opt.url;
					setTimeout(function(){
						var ifr = doc.getElementById("frame_tips");//window.frames["frame_tips"];
						if (ifr.contentWindow) {
							ifr.contentWindow.focus();
						} else if (ifr.contentDocument && ifr.contentDocument.documentElement) {
							ifr.contentDocument.documentElement.focus();
						}
					}, 0);
				}else {
				_e.css({width : _opt.width && _opt.width > 0 ? _opt.width : 420, height: _opt.height && _opt.height > 0 ? _opt.height : 'auto'});
				}

            } else {
				if (!_opt.dialogclass||opts.width)
				{
					_e.css({width : _opt.width && _opt.width > 0 ? _opt.width : 420});
				}
				_e.css({height: _opt.height && _opt.height > 0 ? _opt.height : 'auto'});
				
				_e.show();
				
				//$('.mod_popup', _e).css({'marginLeft':'-60%', 'marginTop':'-40%'});
				Tips.fix_elem(_e);
			}

			if (_opt.timeout) {
				_timerTips = setTimeout($.proxy(_this.hide, _this), _opt.timeout);
			}
	//	});
	}, 
	/**
	 * 隐藏小提示
	 *
	*/
	hide : function(){
		$('body').css({'overflowY':'scroll'});
		$('.mod_popup_mask').hide();
		$('#frame_tips').blur().remove();		// 先删除iframe，解决ie下父页面失去焦点问题
		$('#'+this.get('id')).off().remove();
		var _timerScroll = this.get('_timerScroll'),
			_timerTips = this.get('_timerTips');
		
		if (_timerScroll != null) {
			clearTimeout(_timerScroll);
			this.set('_timerScroll', null);
		}
		
		if (_timerTips != null) {
			clearTimeout(_timerTips);
			this.set('_timerTips', null);
		}

	}, 
	/*
	 * 调整iframe宽高
	 * 供浮出层子页面加载完后调用
	 *
	 * @param {Integer}
	 *			width 宽度
	 * @param {Integer}
	 *			height 高度
	*/
	onReady : function(width, height) {
		var _e = $('#'+this.get('id')),
			elm = $("#frame_tips");
		if(_e.length < 1) {
			return;
		}
		if (width>0)
		{
			if (elm.length > 0) {
				elm.css({width : width + 'px', height : height + 'px'});
			}
			_e.css({visibility : "visible", width : width + 2 + 'px'});
			$("#dialogbox").css({height : height + 'px'});
		}
		

		Tips.fix_elem(_e);
	},
	getID : function(){
		return this.get('id');
	},
	/**
	 * 获取中间变量
	 *
	*/
	getArg : function(){
		return this.get('objArg');
	}
});

var dialog = new Dialog();

window.dialog = dialog;
	 
return {
	Dialog : Dialog,
	dialog : dialog,
	show : $.proxy(dialog.show, dialog),
	hide : $.proxy(dialog.hide, dialog),
	onReady : $.proxy(dialog.onReady, dialog),
	id : $.proxy(dialog.getID, dialog)
};

/** test:
	 dialog.show({
		 width:420,
		 title:'提示',
         sub_title:'test2',
		 desc:'teststet',
		 icon_type:1,
		 button_info1:{
			 title:'确定',
			 highlight:true,
			 fn:function(evt){
				 alert(this.className)
			 }
		 },
		 button_info2:{
			 title:'取消',
			 highlight:false,
			 fn:function(evt){
				 alert('取消');
				 dialog.hide()
			 }
		 }
	});
});
 
*/


});