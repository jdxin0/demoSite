define('js/common/imgEdit.js', function(require, exports, module){

/**
 * 图片处理浮层组件
 * @author: lunardai
 * @lastModified: 2016/11/29
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	$ = music.$,
	Position = require("js/common/music/lib/position.js"),
	MUSIC = music,
	BASE = require('js/common/music/lib/base.js')
	,statistics = music.statistics
	, g_user = MUSIC.widget.user
    , $ = music.$, 
	g_submitCgi = "//c.y.qq.com/splcloud/fcgi-bin/fcg_upload_image.fcg";
var imgEdit = BASE.extend({
	attrs : {
		_date : new Date
	},
	confirm : function(img, opts, confirmCallback){
		var _this = this;
		var  _width = _this.get('width')||1
			, imgTips = _this.get('imgTips')
			, _height = _this.get('height')||1;
		
		if (opts.width<_width||opts.height<_height)
		{
			MUSIC.popup.show(imgTips.join(' '));
			return false;
		}
		_this.uploadFile({
			crop : 1,
			x : opts.x,
			y : opts.y,
			width : opts.width,
			type : opts.type,
			submitCgi : opts.submitCgi||g_submitCgi,
			height : opts.height,
			uploadPicCallback : function(o){
				if (typeof _this.get("confirmCallback") == 'string')
				{
					window[$('#popup_upload_cover').data('confirmCallback')]( o, $('#popup_upload_cover').data('clickTarget'));
					console.log('stringcallback:', o.imageurl);
				}else {
					_this.get("confirmCallback").call(_this.get("$container"), o.imageurl, $('#popup_upload_cover').data('clickTarget'));
					console.log('functioncallback:', o.imageurl);
				}
			}
		});
		return true;
	},
	uploadFile : function(opts){
		opts = opts || {};
		var filetype = '';
		var ua = music.userAgent;
		var bFileSizeOK = true;
		function checkPicType(){
			var uploadEle = document.getElementById("filename");

			if(uploadEle){
				var filename = $.trim(uploadEle.value);

				if(filename != ""){ 			
					filetype = filename.substring(filename.lastIndexOf(".")+1).toLowerCase();
					if( filetype != "jpg" && filetype != "jpeg" && filetype != "png"){//filetype != "gif" &&
						MUSIC.popup.show("请选择正确的图片文件", 1000, 1);
						return false;
					} else {
						return true;
					}

				} else {
					MUSIC.popup.show("请选择上传的图片文件", 1000, 1);
					return false;
				}
			}
			return false;
		}
		if(checkPicType() && bFileSizeOK){
			var _frm = document.getElementById("cgiCall");
			_frm.callback = function(o){
				$('#popup').hide();
				opts.uploadPicCallback&&opts.uploadPicCallback(o);
			}
			if ( ua.ie && ua.ie < 10 && typeof _frm.onreadystatechange != 'undefined') {
				_frm.onreadystatechange = function(){
					if( ( _frm.readyState == 'complete' || _frm.readyState == 'loaded' )// &&  !isSucc 
						){
						MUSIC.popup.show('网络繁忙或图片大小超过5M');
						//cancel();
					}
				};
			} else {
				_frm.onload = function(){ 
					//if(!isSucc){
					//	alert('网络繁忙或图片大小超过1M');
						//cancel();
					//}
				};
			}
			if (opts.x<0)
			{
				opts.x = 0;
			}
			if (opts.y<0)
			{
				opts.y = 0;
			}
			var _blog_upload = document.getElementById("blog_upload");
			_blog_upload.action = opts.submitCgi||g_submitCgi;
			document.getElementById("_uin").value = g_user.getUin();
			document.getElementById("_fileid").value = g_user.getUin()+'_'+(new Date).getTime();
			document.getElementById("_crop").value = opts.crop || 0;
			document.getElementById("_x").value = opts.x || 0;
			document.getElementById("_y").value = opts.y || 0;
			document.getElementById("_width").value = opts.width || 0;
			document.getElementById("_height").value = opts.height || 0;
			document.getElementById("_origin_size").value = opts.origin_size || 0;
			document.getElementById("_png").value = filetype == 'png'?1:0;
			if (!!opts.type)
			{
				document.getElementById("_picformat").value = opts.type || 'jpg';
			}
			document.getElementById("blog_upload").submit();
			if (opts.origin_size || 0)
			{
			MUSIC.popup.show('图片正在处理……', 10000);
			}else 
			MUSIC.popup.show('图片正在上传……', 10000);
		}
		
		return false;
	},
	bindEvents : function(){
		var _this = this
			, _date = _this.get('_date')
			, _width = _this.get('width')||1
			, _submitCgi = _this.get('submitCgi')||g_submitCgi
			, _height = _this.get('height')||1
			, $startIcon = _this.get('$startIcon')
			, initUrl = _this.get('initUrl')
			, type = _this.get('type')
			, $container = _this.get("$container")
			, showCallback =  _this.get("showCallback")
			, closeCallback =  _this.get("closeCallback")
			, confirmCallback =  _this.get("confirmCallback")
			, imgTips = _this.get('imgTips');
		var ua = music.userAgent;
		var isSucc = false, originalWidth = $('#uploaded_img div.js_upload_demo__window').width(), originalHeight = $('#uploaded_img div.js_upload_demo__window').height(), picWidth = 260, picHeight = 260;
		function uploadPicCallback(o){
			if (o.width<_width||o.height<_height)
			{
				MUSIC.popup.show(imgTips.join(' '));
				return false;
			}
			originalWidth = $('#uploaded_img div.js_upload_demo__window').width();
			originalHeight = $('#uploaded_img div.js_upload_demo__window').height();
			if (!o || typeof(o) != "object") {
				MUSIC.popup.show("网络繁忙或图片大小超过5M"); 
			} else if (o.retcode != 0) {
				MUSIC.popup.show("网络繁忙，请稍候再试！");
			} else {
				//changeFlag = true;
				picWidth = o.width || 1000;
				picHeight = o.height || 1000;
				$('img', '#uploaded_img').attr('src', o.imageurl.replace('/600', '/'));
				$('.js_slider').css({
					width : '0%'
				}).attr('aria-valuenow', 0);
				$('#uploaded_img,.js_img_edit').show()
				$('#upload_area', '#popup_upload_cover').hide();
				$('img', '#uploaded_img').off('load').on('load', function(){
					if ((picWidth/_width*_height)>picHeight)
					{
						$('img', '#uploaded_img').css({
							height : originalHeight+'px',
							width : originalHeight/picHeight*picWidth+'px'
						});
						setImgPosition();
					}else {
						$('img', '#uploaded_img').css({
							width : originalWidth+'px',
							height : originalWidth/picWidth*picHeight+'px'
						});
						setImgPosition();
					}
				});
			}
		}
		function startClick(){
			if (window.location.href.indexOf('/headline/') != -1)
			{
				if ($('.mod_popup_mask').length<=0)
				{
					$('body').append('<div class="mod_popup_mask"></div>');
				}else $('.mod_popup_mask').show();
			}
			$('.js_slider').css({
				width : '0%'
			}).attr('aria-valuenow', 0);
			$('#uploaded_img,.js_img_edit').hide();
			$('#upload_area', '#popup_upload_cover').show();
			if ($('#popup_upload_cover').length == 0)
			{
				$container.append(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n        \r\n\t\t\t\t<div class="mod_popup popup_upload_cover" id="popup_upload_cover" data-aria="popup" style="z-index:10000000000000000000;">\r\n\t\t\t\t\t<div class="popup__hd">\r\n\t\t\t\t\t\t<h2 class="popup__tit">上传封面</h2>\r\n\t\t\t\t\t\t<a href="javascript:;" class="popup__close" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div class="popup__bd">\r\n\t\t\t\t\t\t<div class="upload_demo" id="uploaded_img" style="display:none;">\r\n\t\t\t\t\t\t\t<img src="//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000" style="">\r\n\t\t\t\t\t\t\t<div class="upload_demo__window js_upload_demo__window"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="upload_area"  id="upload_area">\r\n\t\t\t\t\t\t\t<button class="mod_btn mod_btn--white upload_area__btn" for="upload">选择本地图片</button>\r\n\t\t\t\t\t\t\t<form id="blog_upload" name="blog_upload" action="//c.y.qq.com/splcloud/fcgi-bin/fcg_upload_image.fcg" method="post" enctype="multipart/form-data" target="cgiCall" style="display:none;">\r\n\t\t\t\t\t\t\t\t<input name="data" id="filename" size="40" type="file" />\r\n\t\t\t\t\t\t\t\t<input name="auth_appid" id="_auth_appid" type="hidden" value="music_cover"/>\r\n\t\t\t\t\t\t\t\t<input name="parentid" id="_parentid" type="hidden" value="/">\r\n\t\t\t\t\t\t\t\t<input name="fileid" id="_fileid" type="hidden" value="">\r\n\t\t\t\t\t\t\t\t<input name="uin" id="_uin" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="crop" id="_crop" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="x" id="_x" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="y" id="_y" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="width" id="_width" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="height" id="_height" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="origin_size" id="_origin_size" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="png" id="_png" type="hidden" value="0">\r\n\t\t\t\t\t\t\t\t<input name="picformat" id="_picformat" type="hidden" value="jpg">\r\n\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t\t<iframe width="0" height="0" frameborder="0" name="cgiCall" id="cgiCall"></iframe>\r\n\t\t\t\t\t\t\t<div class="upload_area__tips">\r\n\t\t\t\t\t\t\t\t';
 for (var i = 0; i < data.imgTips.length; i++) {
__p+='\r\n\t\t\t\t\t\t\t\t<p>'+
((__t=( data.imgTips[i]))==null?'':__t)+
'</p>\r\n\t\t\t\t\t\t\t\t';
 }
__p+='\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="upload_slider js_img_edit" style="display:none;">\r\n\t\t\t\t\t\t\t<div class="upload_slider__slider js_slider" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="缩放图片" tabindex="0" style="width:0%;"><i class="upload_slider__btn js_drag_icon" aria-labelledby="upload_slider__btn_txt"><span class="icon_txt">缩放图片按钮</span></i></div>\r\n\t\t\t\t\t\t\t<i class="upload_slider__icon upload_slider__left"></i>\r\n\t\t\t\t\t\t\t<i class="upload_slider__icon upload_slider__right"></i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="upload_btns js_img_edit" style="display:none;">\r\n\t\t\t\t\t\t\t<button class="mod_btn_green upload_btns__item" id="confirmImg">确定</button><button class="mod_btn upload_btns__item" id="resetImg">重选图片</button>\r\n\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t<a class="upload_law" href="javascript:;" title="请用户确保上传的图片不含有任何违法内容，并且也未侵犯他人任何权利，包括但不限于著作权、名誉权、肖像权等，由此引发的法律问题由用户自行解决并承担相应法律责任。">法律声明</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>';
return __p;
}({imgTips: imgTips || ''}));
			}else $('#popup_upload_cover').show();
			$('#uploaded_img div.js_upload_demo__window').css({
				'width' :  '266px',
				'height' :  '266px'
			});
			originalWidth = $('#uploaded_img div.js_upload_demo__window').width();
			originalHeight = $('#uploaded_img div.js_upload_demo__window').height();
			$('#uploaded_img div.js_upload_demo__window').css({
				'height' : originalHeight*_height/_width
			});
			$('#uploaded_img').css({
				'height' : originalHeight*_height/_width
			});
			$('#popup_upload_cover').css({
				'height' : originalHeight*_height/_width + 220
			});
			$('#popup_upload_cover').data('confirmCallback', confirmCallback);
			$('#popup_upload_cover').data('clickTarget', _this.get('$target'));
			Position.center($('#popup_upload_cover'));
			showCallback&&showCallback();
		}
		function stackCanvasImage(img, opts, confirmCallback)
		{	
			if (opts.width<_width||opts.height<_height)
			{
				MUSIC.popup.show(imgTips.join(' '));
				return false;
			}
			var img = document.getElementById( 'imgTest' );
			var w = img.naturalWidth;
			var h = img.naturalHeight;
			if ($('#imgTest_canvas').length==0)
			{
				$('body').append('<div style="display:none;"><canvas id="imgTest_canvas"></canvas></div>');
			}
			var canvas = document.getElementById( 'imgTest_canvas' );
			  
			canvas.style.width  = w + "px";
			canvas.style.height = h + "px";
			canvas.width = w;
			canvas.height = h;
			var context = canvas.getContext("2d");
			context.clearRect( 0, 0, w, h );
			context.drawImage( img, 0, 0 );

			
			var data = canvas.toDataURL('image/png');
			
			//window.open(data);
			//return;
			
			data = data.split(',')[1];
			data = window.atob(data);
			var ia = new Uint8Array(data.length);
			for (var i = 0; i < data.length; i++) {
				ia[i] = data.charCodeAt(i);
			};
			
			var blob = new Blob([ia], {type:"image/png"});

			var fd = new FormData();
			fd.append('data', blob);
			fd.append('auth_appid', 'music_cover');
			fd.append('uin', g_user.getUin());
			fd.append('fileid', g_user.getUin() + '_' + (+new Date()));
			fd.append('parentid', '/');
			fd.append('crop', '1');
			fd.append('x', opts.x);
			fd.append('y', opts.y);
			fd.append('width', opts.width);
			fd.append('height', opts.height);
			if (!!opts.type)
			{
				fd.append('picformat', opts.type);
			}
			
			var xhr = new XMLHttpRequest();
			xhr.withCredentials = true;
			xhr.open("post", _submitCgi||g_submitCgi, true);
			xhr.addEventListener('load', function (e) {
				$('#popup').hide();
				try {
					var response = e.target.response.replace('<!DOCTYPE html><html lang="zh-cn"><head><meta charset="utf-8" /><title></title></head><body><script type="text/javascript">document.domain = "qq.com";(parent.picSubmitCallback||frameElement.callback)(', '').replace(');</script></body></html>', '');
					var json = eval('('+response+')'),
						link = json.url,
						picLink = link;
						if (!!link)
						{
							if (typeof confirmCallback == 'string')
							{
								window[confirmCallback]( json);
							}else {
								confirmCallback.call($container, link);
							}
							$startIcon.off('click');
						}
				} catch (er) {
				}
			});
			xhr.send(fd);
			return true;
			/*$.ajax({
				type: 'post',
				url: _submitCgi||g_submitCgi,
				data : fd,
				withCredentials : true,
				processData: false,  
				contentType: false,
				success: function(data){
					if (data.code == 0) {						
						if (typeof confirmCallback == 'string')
						{
							window[$('#popup_upload_cover').data('confirmCallback')]( data.imageurl);
						}else {
							confirmCallback.call($container, data.imageurl);
						}
					} else {
						alert('上传失败，请稍后再试！code: ' + data.code);
					}
				},
				error : function() {
					alert('上传失败，请稍后再试！');
				}
			});*/
		}
		$startIcon.off('click').on('click', function(e){
			_this.set('$target',$(e.target));
			startClick();
			/*if ($('.mod_popup_mask').length<=0)
			{
				$('body').append('<div class="mod_popup_mask"></div>');
			}else $('.mod_popup_mask').show();
			$('.js_slider').css({
				width : '0%'
			}).attr('aria-valuenow', 0);
			$('#uploaded_img,.js_img_edit').hide();
			$('#upload_area', '#popup_upload_cover').show();
			if ($('#popup_upload_cover').length == 0)
			{
				$container.append(__inline("/js_tpl/editimg/edit_img.tpl")());
			}else $('#popup_upload_cover').show();
			$('#uploaded_img div.upload_demo__window').css({
				'width' :  '266px',
				'height' :  '266px'
			});
			originalWidth = $('#uploaded_img div.upload_demo__window').width();
			originalHeight = $('#uploaded_img div.upload_demo__window').height();
			$('#uploaded_img div.upload_demo__window').css({
				'height' : originalHeight*_height/_width
			});
			$('#uploaded_img').css({
				'height' : originalHeight*_height/_width
			});
			$('#popup_upload_cover').css({
				'height' : originalHeight*_height/_width + 220
			});
			$('#popup_upload_cover').data('confirmCallback', confirmCallback);
			Position.center($('#popup_upload_cover'));*/
		})
		$container.off('click', '.popup__close').on('click', '.popup__close', function(){			
			closeCallback&&closeCallback();
			//!closeCallback&&$startIcon.off('click');
			$('#popup_upload_cover').remove();!closeCallback&&$('.mod_popup_mask').hide();
		}).off('click', 'button.upload_area__btn').on('click', 'button.upload_area__btn', function(e){
			e.preventDefault();
			e.stopPropagation();
			$('#filename').remove();
			$('#blog_upload').prepend('<input name="data" id="filename" size="40" type="file" />');
			$('#filename').off('change').on('change', function(){
				_this.uploadFile({
					uploadPicCallback : uploadPicCallback,
					origin_size : 1,
					type : type,
					submitCgi : _submitCgi
				});
			})
			$('#filename').click();
		}).off('click', '#resetImg').on('click', '#resetImg', function(){
			$('#uploaded_img img').attr('src', '//y.gtimg.cn/mediastyle/global/img/playlist_300.png?max_age=31536000').css({
				width : originalWidth+'px',
				height : originalHeight+'px'
			});
			$('#uploaded_img,.js_img_edit').hide();
			$('#upload_area', '#popup_upload_cover').show();
		}).off('click', '#confirmImg').on('click', '#confirmImg', function(){
			var img = $('img', '#uploaded_img').attr('src');var ret = false;
			if (!!initUrl)
			{
				ret = stackCanvasImage(img, getCropInfo(), confirmCallback);
				if (ret){
					MUSIC.popup.show('图片正在处理请稍候……', 10000);
					$('#popup_upload_cover').hide();$('.mod_popup_mask').hide();
				}
			}else {
				ret = _this.confirm(img, getCropInfo(), confirmCallback);
				if (ret){
					$('#popup_upload_cover').hide();$('.mod_popup_mask').hide();
				}
			}
		}).off("click", '.upload_slider').on("click", '.upload_slider', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var _pos = $('.js_img_edit'),
				_mousex = event.pageX;
				_change_vol = parseInt((_mousex - _pos.offset().left) * 100 / _pos.width(), 10);
			_update(_change_vol);
		}).off("mousedown", '.js_drag_icon').on("mousedown", '.js_drag_icon', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var $body = $('.upload_slider', $('#popup_upload_cover'));
			$body.on("mousemove", _move);
			$body.on("mouseup", function(){
				$body.off("mousemove");
			});
			$body.on("mouseleave", function(e){
				$body.off("mousemove");
			});
		}).off("mousedown", '#uploaded_img img').on("mousedown", '#uploaded_img img', function(event) {
			event.preventDefault();
			event.stopPropagation();
			var $body = $(this),
				x = event.pageX,
				y = event.pageY,
				oleft = parseInt($body.css('marginLeft'), 10),
				otop = parseInt($body.css('marginTop'), 10);
			$body.on("mousemove", function(e){
				var tx = e.pageX, ty = e.pageY, width = $('img', '#uploaded_img').width(), height = $('img', '#uploaded_img').height(), moveX = oleft+(tx-x), moveY = otop+(ty-y);
				if (moveX<(width-originalWidth/2)*-1)
				{
					moveX = (width-originalWidth/2)*-1;
				}
				if (moveX>(originalWidth/2)*-1)
				{
					moveX = (originalWidth/2)*-1;
				}
				if (moveY<(height-originalHeight/2)*-1)
				{
					moveY = (height-originalHeight/2)*-1;
				}
				if (moveY>(originalHeight/2)*-1)
				{
					moveY = (originalHeight/2)*-1;
				}
				//console.log('moveX='+moveX+';moveY='+moveY);
				$body.css({
					marginLeft : moveX+'px',
					marginTop : moveY+'px'
				});
			});
			$body.on("mouseup", function(){
				$body.off("mousemove");
			});
			$body.on("mouseout", function(e){
				$body.off("mousemove");
			});
		});
		function getCropInfo(){
			var opts = {
				type : type,
				x : 0,
				y : 0,
				width : 0,
				height : 0
			};
			var width = $('img', '#uploaded_img').width(), height = $('img', '#uploaded_img').height();
			var marginTop = Math.abs(parseInt($('img', '#uploaded_img').css('marginTop'), 10)), marginLeft = Math.abs(parseInt($('img', '#uploaded_img').css('marginLeft'), 10));
			var rate = picWidth/width;
			originalWidth = $('#uploaded_img div.js_upload_demo__window').width();
			originalHeight = $('#uploaded_img div.js_upload_demo__window').height();
			if (rate*originalWidth>picWidth || rate*originalHeight>picHeight)
			{
				rate = picHeight/height;
			}
			opts.x = rate*(marginLeft - originalWidth/2);
			opts.y = rate*(marginTop - originalHeight/2);
			opts.width = rate*originalWidth;
			opts.height = rate*originalHeight;

			//宽高如果比原图大的话，后台就不做剪切了~~2017/12/8
			if (picWidth<opts.width){
				opts.height = picWidth*opts.height/opts.width;
				opts.width = picWidth;
			}
			if (picHeight<opts.height){
				opts.width = picHeight*opts.width/opts.height;
				opts.height = picHeight;
			}
			opts.submitCgi = _submitCgi||g_submitCgi;
			return opts;
		}
		function setImgPosition(){
			var width = $('img', '#uploaded_img').width(), height = $('img', '#uploaded_img').height();
			$('img', '#uploaded_img').css({
				marginTop : -1*(height)/2,
				marginLeft : -1*(width)/2
			});
		}
		function _update(percent){
			if (percent<0)
			{
				percent = 0;
			}else if (percent>100)
			{
				percent = 100;
			}
			$('.js_slider').css({
				width : percent+'%'
			}).attr('aria-valuenow', percent);
			percent = percent/6;
			if ((picWidth/_width*_height)>picHeight)
			{
				$('img', '#uploaded_img').css({
					height : originalHeight+picWidth*(percent/100)*5+'px',
					width : (originalHeight+picWidth*(percent/100)*5)/picHeight*picWidth+'px'
				});
				setImgPosition();
			}else {
				$('img', '#uploaded_img').css({
					height : (originalWidth+picHeight*(percent/100)*5)/picWidth*picHeight+'px',
					width : originalWidth+picHeight*(percent/100)*5+'px'
				});
				setImgPosition();
			}
		}
		function _move(event) {
			event.preventDefault();
			event.stopPropagation();
			var _pos = $('.js_img_edit'),
				_mousex = event.pageX;
				_change_vol = parseInt((_mousex - _pos.offset().left) * 100 / _pos.width(), 10);
			_update(_change_vol);
		}
		if (!!initUrl)
		{
			if ($('#imgTest').length>0)
			{
				$('#imgTest').remove();
			}
			window.imgEdit_initUrl = function(o){
				startClick();
				uploadPicCallback({
					"retcode":0,
					"imageurl":initUrl,
					"url":initUrl,
					"width":$(o).width(),
					"height":$(o).height()
				});
			}
			$('body').append('<img src="'+initUrl+'" crossOrigin="anonymous" id="imgTest" style="display:none;" onload="imgEdit_initUrl(this);" />');
		}
	},
	initialize : function(opts){
		var _this = this, _conf = {}
			, $container = opts.$container
			, $startIcon = opts.$startIcon
			, initUrl = opts.initUrl
			, type = opts.type
			, height = opts.height||1
			, width = opts.width||1
			, submitCgi = opts.submitCgi||g_submitCgi
			, confirmCallback = opts.confirmCallback
			, showCallback = opts.showCallback
			, closeCallback = opts.closeCallback
		$.extend(_conf, opts, {
			$container : opts.$container,
			$startIcon : opts.$startIcon,
			initUrl : opts.initUrl,
			type : opts.type,
			submitCgi : submitCgi,
			confirmCallback : opts.confirmCallback,
			showCallback : opts.showCallback,
			closeCallback : opts.closeCallback,
			imgTips: opts.imgTips || ['支持JPG、PNG、小于5MB', '清晰的图片更容易被推荐']
		});

		//把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
		$container.data("imgEdit", _this);

		imgEdit.superclass.initialize.call(_this, _conf);
		
		_this.bindEvents();

	},
	Statics : {
		init : function(config){
			try {
				//new一个新的imgEdit实例之前，先把之前的实例给destroy掉，防止内存泄漏
				var p = $(config.container).data("imgEdit");
				p && p.remove && p.remove();
				p = null;
			} catch (exp) {};

			return new imgEdit(config);
		}
	}
});

    $.fn.imgEdit = function(args){
        if ($.type(args) === "object") {
			args.$startIcon = $(this);
            imgEdit.init(args);
        } else {
            //var _conf = $.extend(args, {page : $(this)});
            imgEdit.init({$container : $(this)});
        }
    };
return imgEdit;



});