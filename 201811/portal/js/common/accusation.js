define('js/common/accusation.js', function(require, exports, module){

/**
 * 举报组件
 * @author: lunardai
 * @lastModified: 2018/8/2
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	MUSIC = music,
	$ = music.$
    , $ = music.$
	, g_user = music.widget.user
	, g_popup = music.popup
	, jQueryAjax = MUSIC.jQueryAjax
	,statistics = music.statistics;

function _lowVersion() {
	var ua = navigator.userAgent.toLowerCase();
	var m = ua.match(/msie ([\d.]+)/);
	return m && parseInt(m[1]) < 10;
}

function checkFileType(file, cb){
	var reader = new FileReader();
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	reader.onload = function(){
		var data = new Uint8Array(reader.result);
		var isJpg = data && data[0] == 0xFF && data[1] == 0xD8;
		var isGif = data && data[0] == 0x47 && data[1] == 0x49 && data[2] == 0x46;
		var isPng = data && data[0] == 0x89 && data[1] == 0x50 && data[2] == 0x4e;
		cb&&cb({
			jpg : isJpg,
			gif : isGif,
			png : isPng
		});
	};
	reader.readAsArrayBuffer(blobSlice.call(file, 0, 10));
}
var accusation = (function(){
	var _opts = null;
	var $container = null;
    function getCompressedImageURL (image) {
           
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 84;
        canvas.height = 150; // 压缩图片到 84*150
        // 绘制图片
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        // 将 canvas 导出为 base64 URL 并返回
        return canvas.toDataURL('image/jpeg',0.3);
    }
    function previewImg(input) {
        var input = $('#js_img').get(0);
        if (input.files && input.files[0]) {
			var file = input.files[0];
			checkFileType(file, function(type){
				if (!type.jpg&&!type.png&&!type.gif){
					return MUSIC.popup.show("仅支持上传JPG、GIF、PNG类型图片", 3000, 1);
				}
				var reader = new FileReader();          
				reader.onload = function(e) {
					var img = new Image();
					img.onload = function(){
						compressedImgUrl = getCompressedImageURL(img);

						if (compressedImgUrl.length > 20 * 1024) {
							//压缩后的图片不超过 20K
							return MUSIC.popup.show("图片大小超出限制", 3000, 1);
						}
					}
					img.src = e.target.result;
					$('#upload_accusation_pic').hide();$('#accusation_pic').show();
					$('#accusation_pic img').attr('src', e.target.result);
				}
			
				reader.readAsDataURL(file);
			});
        }
    }
	/*
	function submitComment(cb){
		var select = $container.find('select').val(), optionValue = $('option[value="'+select+'"]').html();
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
			ct : 24,
			cv : 0,
			uin : g_user.getUin(),
            cid: 205360772,
            cmd: 10,	// 1：赞  2：取消赞 3：选为热评
			rptcmd : 1,
            commentid: _opts.id,
			rptmsg : optionValue,
			callback : jcb,
			detailmsg : $.trim($container.find('textarea').val())
        };
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
        var param = {
            url : url,
            data : params,
			//dataType: 'json',
			jsonpCallback : jcb,
            //type : 'post',
            success : function (r) {
				r = JSON.parse(r);
                if (r.code == 0) {
                    cb&&cb();
				
                } else if (r.code == 1000) {
                    g_user.openLogin();
                } else {
                     g_popup.show(r.msg, 2000, 1);
                }
            },
            error : function () {
               g_popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        };
		
		if (_lowVersion()) {
			param.charset = 'utf-8';
			jQueryAjax.iePost(param);

		} else {
			param.dataType = 'json',
			param.data = JSON.stringify(param.data);
			jQueryAjax.post(param);
		}
	}*/
	
	function submitComment(cb){
		var select = $container.find('select').val(), optionValue = $('option[value="'+select+'"]').html();
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
			ct : 24,
			cv : 0,
			uin : g_user.getUin(),
            cid: 205360772,
            cmd: 10,	// 1：赞  2：取消赞 3：选为热评
            commentid: _opts.msg,
			rptmsg : optionValue,
			callback : jcb,
			detailmsg : $.trim($container.find('textarea').val())
        };
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
        MUSIC.jQueryAjax.jsonp({
            url : url,
            data : params,
			dataType: 'json',
			jsonpCallback : jcb,
            //type : 'post',
            success : function (r) {
                if (r.code == 0) {
                    cb&&cb();
				
                } else if (r.code == 1000) {
                    g_user.openLogin();
                } else {
                     g_popup.show(r.msg, 2000, 1);
                }
            },
            error : function () {
               g_popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
	}
	function submit(cb){
		if ($('#accusation_tips').css('display') != 'none'){
			g_popup.show("举报描述最多可输入100个汉字", 3000, 1);
			return;
		}
		if (_opts.type == 3){
			submitComment(cb)
			return;
		}
		/**
		* 参数说明：
			type：举报种类，表示是举报歌单、举报个人主页，举报评论等不同场景
			eviltype：举报类型，恶意谩骂攻击等
			reason：举报理由
			postuin：举报者uin
			msg：传歌单ID、评论ID等，string类型
			needpic：是否有截图，0表示没有，1表示有
			picurl：base64的图片
			system：ios，android
			imei：手机imei
		*/
		var param = {
			url: location.protocol + "//cgi.kg.qq.com/fcgi-bin/fcg_music_report_recv",
			data: {
				type : _opts.type,
				eviltype : $container.find('select').val(),
				reason : $.trim($container.find('textarea').val()),
				postuin : g_user.getUin(),
				msg : _opts.msg+'',
				needpic : ($('#accusation_pic').css('display') == 'none'||$('#accusation_pic').find('img').attr('src')&&$('#accusation_pic').find('img').attr('src').trim()=='') ? 0 : 1, 
				picurl : $('#accusation_pic').css('display') == 'none'?'':$('#accusation_pic').find('img').attr('src')
			},
			success: function (r) {
				r = r.replace('<html><head><meta http-equiv="Content-Type" content="text/html;charset=gb2312" /></head><body><script type="text/javascript">document.domain="qq.com";frameElement.callback(', '').replace(');</script></body></html>', '');
				r = JSON.parse(r);
				if (r) {
					if (r.code == 0) {
						cb&&cb();
					} else if (r.code == 1000) {
						g_user.openLogin();
					} else {
						g_popup.show("提交失败，错误码：" + r.code, 3000, 1);
					}

				} else {
					g_popup.show("服务器繁忙，请稍候再试", 3000, 1);
				}
			},
			error : function(e, f){
				g_popup.show("服务器繁忙，请稍候再试", 3000, 1);
			}
		};

		
		if (_lowVersion()) {
			param.charset = 'utf-8';
			//jQueryAjax.iePost(param);
			var fs = new MUSIC.FormSender(param.url, "post", param.data, "gb2312");
			fs.onSuccess = function(r) {
				if (r) {
					if (r.code == 0) {
						cb&&cb();
					} else if (r.code == 1000) {
						g_user.openLogin();
					} else {
						g_popup.show("提交失败，错误码：" + r.code, 3000, 1);
					}

				} else {
					g_popup.show("服务器繁忙，请稍候再试", 3000, 1);
				}
			};
			fs.onError = function(){
				g_popup.show("服务器繁忙，请稍候再试", 3000, 1);
			};
			fs.send();

		} else {
			param.dataType = 'json',
			param.data = JSON.stringify(param.data);
			jQueryAjax.post(param);
		}
	};
	function bindEvents(){
		$container.on("change", "#js_img", function(){
			previewImg(this);
		}).on("click", ".js_delete_accusation_pic", function(){
			$('#upload_accusation_pic').show();$('#accusation_pic').hide();
			$('#upload_accusation_pic').html('<span class="popup_inform__form_simulate">添加图片说明</span><input type="file" id="js_img" class="popup_inform__form_upload">');
		});
		
		$container.find('textarea').on('keyup input propertychange', function(e){
			var $this = $(this);
			var max = $(this).data('max');
			var nameLength = MUSIC.string.getRealLen( $this.val() );
			if(nameLength > 0){
				nameLength = Math.ceil(nameLength/2);
			}
			$container.find('.js_count_box').html(nameLength+'/'+max);
			if (nameLength>max){
				$('#accusation_tips').show();
				$container.find('.js_count_box').css({'color':'#F70505'});
			}else {				
				$('#accusation_tips').hide();
				$container.find('.js_count_box').css({'color':'#999'});
			}
		});
	}
	function showDialog(){
		var template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n\r\n<div class="popup_inform__form">\r\n\t<div class="popup_inform__form_grid">\r\n\t    <label class="popup_inform__form_label">举报类型</label>\r\n\t    <div class="popup_inform__form_cont">\r\n\t\t';
if(data.type!=3){
__p+='\r\n\t\t<select class="popup_inform__form_sel">\r\n\t\t\t<option value="1">谩骂造谣</option>\r\n\t\t\t<option value="2">广告传销</option>\r\n\t\t\t<option value="3">抄袭</option>\r\n\t\t\t<option value="4">诈骗</option>\r\n\t\t\t<option value="5">色情</option>\r\n\t\t\t<option value="6">暴力</option>\r\n\t\t\t<option value="7">反动</option>\r\n\t\t\t<option value="8">其他</option>\r\n\t\t</select>\r\n\t\t';
}else{
__p+='\r\n\t\t<select class="popup_inform__form_sel">\r\n\t\t\t<option value="1">无意义的评论</option>\r\n\t\t\t<option value="2">恶意谩骂攻击</option>\r\n\t\t\t<option value="3">营销广告</option>\r\n\t\t\t<option value="4">色情暴力</option>\r\n\t\t\t<option value="5">政治反动</option>\r\n\t\t\t<option value="6">其他</option>\r\n\t\t</select>\r\n\t\t';
}
__p+='\r\n\t\t<i class="popup_inform__form_arr"></i>\r\n\t    </div>\r\n\t</div>\r\n\t';
if(data.type!=3){
__p+='\r\n\t<div class="popup_inform__form_grid">\r\n\t    <label class="popup_inform__form_label">内容截图</label>\r\n\t    <div class="popup_inform__form_cont" id="upload_accusation_pic">\r\n\t\t<span class="popup_inform__form_simulate">添加图片说明</span>\r\n\t\t<input type="file" id="js_img" class="popup_inform__form_upload">\r\n\t    </div>\r\n\t    <div style="display:none;" id="accusation_pic">\r\n\t\t<img class="popup_inform__form_preview">\r\n\t\t<!--span class="popup_inform__form_txt">举报图片.jpg</span-->\r\n\t\t<a href="javascript:;" class="popup_inform__form_link js_delete_accusation_pic">删除</a>\r\n\t    </div>\r\n\t</div>\r\n\t';
}
__p+='\r\n\t<div class="popup_inform__form_grid">\r\n\t    <label class="popup_inform__form_label">举报描述</label>\r\n\t    <div class="popup_inform__form_textarea">\r\n\t\t<textarea placeholder="请输入100字以内的描述" data-max="100"></textarea>\r\n\t\t<span class="popup_inform__form_count js_count_box">0/100</span>\r\n\t    </div>\r\n\t    <p class="popup_inform__form_tips" id="accusation_tips" style="display:none;">举报描述最多可输入100个汉字</p>\r\n\t</div>\r\n</div>';
return __p;
};
		require.async('js/common/dialog.js', function(dialog){
			dialog.show({
				mode : "common",
				title : "举报",
				width : 600,
				dialogclass : 'popup_inform',
				content : template(_opts),
				button_info1 : {
					highlight : 1,
					fn : function(e){
						if ($.trim($container.find('textarea').val()) == ''){
							g_popup.show('请输入问题描述', 3000, 1);
						}else {
							submit(function(){
								g_popup.show("提交成功");
								dialog.hide();
							});
						}
					},
					title : "确定"
				},
				button_info2 : {
					highlight : 0,
					fn : function(){
						dialog.hide();
					},
					title : "取消"
				}
			});
			$container = $('#'+dialog.id());
			if (_opts.type == 3 ||typeof FileReader == 'undefined'){
				$('#upload_accusation_pic').parents('div.popup_inform__form_grid').hide();
			}

			bindEvents();
		});
	}
	return{
		init : function(opts){
			if (!g_user.isLogin()){
				g_user.openLogin();
				return false;
			}
			_opts = opts;
			showDialog();
		}
	}
})();
return accusation;


});