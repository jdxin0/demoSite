define('js/common/fav.js', function(require, exports, module){

/**
 * 添加到组件
 * @author: lunardai
 * @lastModified: 2016/5/3
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	MUSIC = music,
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
    , $ = music.$
	, User = music.widget.user
	, g_popup = music.popup
	,statistics = music.statistics
	Tips = require("js/common/music/tips.js");
var ua = music.userAgent;
    /**
     * 分享组件
     *
     */

function parseEmoji(val){
	return val.replace(/\[em(?:2)?\]e(\d{1,8})(?:,\d{1,3},\d{1,3})?\[\/em(?:2)?\]/gi, function (_0, _1) {
		var pic = "", css = "",hd = "", big = '';
		if((_1 >= 100 && _1 <= 204)){
			if(window.devicePixelRatio >= 1.5){
				hd = "@2x";
				css += ' style="zoom:0.4285"';
			}
			big = '/2.0';
			pic = _1 +hd+ ".gif";
		} else {
			if(_1 > 1000000 && window.devicePixelRatio >= 1.5){
				//表示高清屏,_1>1000000才表示快评图片，签到中的动态gif本期没有做
				hd = "@2x";
			}
			pic = _1 +hd+ ".gif";

			if(_1 < 1000000){
			}else{
				css = (window.devicePixelRatio >= 1.5) ? 'style="zoom:0.5"' : "";
			}
		}
		return "<img width='18px' src='"+location.protocol+"//y.gtimg.cn/qzone/em" +big+ "/e" + pic + "' " + css + " />";
	});
};
var Fav = (function(){
	var config = {}, songInfo = null, initFlag = false;
	
	/**
	 * 保存歌单信息
	 * 
	 * @param {Object}
	 *			p : 参数
	 *				{
						uin : 用户QQ,
						moddirids : 歌单ID,
						moddirnames : 歌单名,
						moddesc : 歌单简介,
						moddirshows : 歌单是否可见,
						modFPicUrl : 歌单图片,
						modtagList : 标签列表
					}
	 * @param {Function}
	 *			callback 获取数据成功回调
	 */
	function save(p, callback){
		function _error(){
			g_popup.show("保存歌单失败！当前网络繁忙，请您稍后重试。", 3000, 1);
		}

		var _this = this,//fcg_fav_modsongdirdetail.fcg
			url = "//c.y.qq.com/splcloud/fcgi-bin/fcg_fav_modsongdirdetail.fcg",
			param = {};
		if (p.moddirids <= 0) {		//新建歌单
			initFlag = false;
			$('#fav_pop').remove();
			url = "//c.y.qq.com/splcloud/fcgi-bin/create_playlist.fcg";
			param = {
				uin : p.uin||User.getUin(),
				name : p.moddirnames.replace(/,/g,'，'),
				description : p.moddesc||'',
				show : p.moddirshows||1,
				pic_url : p.modFPicUrl||'',
				tags : p.modtagList||'',
				tagids : p.tagids||''
			};
		} else {
			$.extend(param, p);
			param.source = 103;
			param.modnum = 1;
			
		}
		param.formsender = 1;
		if(0)//if (!!ua.chrome)//暂时不使用post方式 韩文和中文歌单名有问题~！！！
		{
			param.utf8 = 1;
			param.inCharset = 'utf-8';
			param.formsender = 4;
			MUSIC.jQueryAjax.post({
				url : url,
				charset : 'utf-8',
				data:param,
				success : function(data) {
					switch (data.code)
					{
					case 0:
						//g_popup.show(0, "成功保存歌单信息！", "", 1000, 300);
						if (p.moddirids <= 0) {
							callback(data.dirid);
						} else {
							callback(p.moddirids);
						}
						
						break;
					case 1:
					case 2:
					case 1000:
						User.openLogin(null, 'parent');
						break;
					case 4:
						g_popup.show("操作失败！您输入的歌单名称过长！", 3000, 1);
						break;
					case 10:
						g_popup.show("操作失败！您输入的标签文字过多！", 3000, 1);
						break;
					case 11:
						g_popup.show("操作失败！您输入的标签内容非法！", 3000, 1);
						break;
					case 12:
						g_popup.show("操作失败！您输入的歌单名非法！", 3000, 1);
						break;
					case 13:
						g_popup.show("操作失败！您输入的歌单简介内容非法！", 3000, 1);
						break;
					case 21:
						g_popup.show("操作失败！您输入的歌单名称和其他歌单有重复！", 3000, 1);
						break;
					case 24:
						g_popup.show("操作失败！您输入的歌单名称和系统歌单有重复！", 3000, 1);
						break;
					case 30: //歌单达上限
						g_popup.show("操作失败！"+data.msg, 3000, 1);
						break;
					default :
						_error();
						break;
					}
				},
				error : _error
			});
		}else {
			var fs = new MUSIC.FormSender(url, "post", param, "utf-8");
			fs.onSuccess = function(data) {
				switch (data.code)
				{
				case 0:
					//g_popup.show(0, "成功保存歌单信息！", "", 1000, 300);
					if (p.moddirids <= 0) {
						callback(data.dirid);
					} else {
						callback(p.moddirids);
					}
					
					break;
				case 1:
				case 2:
				case 1000:
					User.openLogin(null, 'parent');
					break;
				case 4:
					g_popup.show("操作失败！您输入的歌单名称过长！", 3000, 1);
					break;
				case 10:
					g_popup.show("操作失败！您输入的标签文字过多！", 3000, 1);
					break;
				case 11:
					g_popup.show("操作失败！您输入的标签内容非法！", 3000, 1);
					break;
				case 12:
					g_popup.show("操作失败！您输入的歌单名非法！", 3000, 1);
					break;
				case 13:
					g_popup.show("操作失败！您输入的歌单简介内容非法！", 3000, 1);
					break;
				case 21:
					g_popup.show("操作失败！您输入的歌单名称和其他歌单有重复！", 3000, 1);
					break;
				case 24:
					g_popup.show("操作失败！您输入的歌单名称和系统歌单有重复！", 3000, 1);
					break;
				case 30: //歌单达上限
					g_popup.show("操作失败！"+data.msg, 3000, 1);
					break;
				default :
					_error();
					break;
				}
			};
			fs.onError = _error;
			fs.send();
		}
	}
	/**
	 * 添加歌曲到歌单
	 * 
	 * @param {Object}
	 *			p : 参数
	 *				{
						uin : 用户QQ,
						midlist : 歌曲MID列表(如"000XKJKJF,0233JKDJFL,4322JKDFJL"),
						typelist : 歌曲类型列表(如"1,2,3"，与midlist对应),
						dirid : 歌单ID
					}
	 * @param {Function}
	 *			callback 获取数据成功回调
	 */
	function addSongs2Dir(p, callback){
		function _error(){
			MUSIC.popup.show("收藏失败！当前网络繁忙，请您稍后重试。", 3000);
		}

		p.formsender = 1;
		p.source = 153;
		p.r2 = 0;
		p.r3 = 1;
		p.utf8 = 1;
		var _this = this,
			url = "//c.y.qq.com/splcloud/fcgi-bin/fcg_music_add2songdir.fcg";
		if (!!ua.chrome)
		{
			p.formsender = 4;
			MUSIC.jQueryAjax.post({
				url : url,
				charset : 'utf-8',
				data:p,
				success : function(data) {
					switch (data.code)
					{
					case 0:
						if (!!p.addtype && p.addtype == 'create'){
							g_popup.show("创建歌单成功！"+"您的歌单会同步到云端，登录帐号即可随时随地查看。", 3000);
						} else {
							g_popup.show("添加歌曲到歌单成功！", 1000);
						}
						callback();
						break;
					case 1:
					case 1000:
						User.openLogin();
						break;
					
					case 31: //普通用户，歌曲总数达上限
					case 32: //普通用户，添加歌曲后，歌曲总数达上限
					case 41: //歌单歌曲数达上限
						var t = data.title? data.title : "对不起，操作失败！",
							v = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin="'+p.uin+' rel="noopener" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>',
							msg = data.msg? data.msg : "";
						(!!data.title && msg != "") && (msg += v);
						g_popup.show(t+msg, 3000, 1);
						if (!!p.addtype && p.addtype == 'create') {
							setTimeout(function(){
								alert('goto taogedetail');//!!g_mymusicCommMod && g_mymusicCommMod.jumpAlbum(p.uin, p.dirid);
							}, 1000);
						}
						break;
					default :
						break;
					}
				},
				error : _error
			});
		}else {
			var fs = new MUSIC.FormSender(url, "post", p, "utf-8");
			fs.onSuccess = function(data) {
				switch (data.code)
				{
				case 0:
					if (!!p.addtype && p.addtype == 'create'){
						g_popup.show("创建歌单成功！"+"您的歌单会同步到云端，登录帐号即可随时随地查看。", 3000);
					} else {
						g_popup.show("添加歌曲到歌单成功！", 1000);
					}
					callback();
					break;
				case 1:
				case 1000:
					User.openLogin();
					break;
				
				case 31: //普通用户，歌曲总数达上限
				case 32: //普通用户，添加歌曲后，歌曲总数达上限
				case 41: //歌单歌曲数达上限
					var t = data.title? data.title : "对不起，操作失败！",
						v = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin="'+p.uin+' rel="noopener" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>',
						msg = data.msg? data.msg : "";
					(!!data.title && msg != "") && (msg += v);
					g_popup.show(t+msg, 3000, 1);
					if (!!p.addtype && p.addtype == 'create') {
						setTimeout(function(){
							alert('goto taogedetail');//!!g_mymusicCommMod && g_mymusicCommMod.jumpAlbum(p.uin, p.dirid);
						}, 1000);
					}
					break;
				default :
					break;
				}
			};
			fs.onError = _error;
			fs.send();
		}
	}
	/**
	 * 添加网络歌曲到歌单
	 * 
	 * @param {Object}
	 *			p : 参数
	 *				{
						uin : 用户QQ,
						songtitle : 歌曲名列表(如"1,2,3"),
						singer : 歌手名列表(如"1,2,3"，与songtitle对应),
						url : 播放url列表(如"1,2,3"，与songtitle对应),
						dirid : 歌单ID
					}
	 * @param {Function}
	 *			callback 获取数据成功回调
	 * @param {Bool}
	 *			likeFlag 标记是否是用作喜欢操作
	 */
	function addNetSongs2Dir(p, callback, likeFlag){
		function _error(){
			g_popup.show("收藏失败！当前网络繁忙，请您稍后重试。", 3000, 1);
		}

		p.formsender = 1;
		p.utf8 = 1;

		var _this = this,
			url = "//c.y.qq.com/qzone/fcg-bin/fcg_music_add2fav_url_qqmusic.fcg";
		if (!!ua.chrome)
		{
			p.formsender = 4;
			MUSIC.jQueryAjax.post({
				url : url,
				charset : 'utf-8',
				data:p,
				success : function(data) {
					switch (data.code)
					{
					case 0:
						if (!likeFlag)
						{
							g_popup.show("收藏成功！歌曲已收藏到您指定的歌单。", 3000);
						}
						callback(data);
						break;
					case 2:
					case 1000:
						User.openLogin();
						break;
					/*case 3:
						g_popup.show(1, "收藏失败！", "超过歌曲数上限，您最多只能收藏1000首歌到本歌单。", 3000, 300);
						break;*/
					
					case 31: //普通用户，歌曲总数达上限
					case 32: //普通用户，添加歌曲后，歌曲总数达上限
					case 41: //歌单歌曲数达上限
						var t = data.title? data.title : "收藏失败！",
							v = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin='+p.uin+'" rel="noopener" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>',
							msg = data.msg? data.msg : "";
						(!!data.title && msg != "") && (msg += v);
						g_popup.show(t+msg, 3000, 1);
						break;
						
					case 13: //URL错误
						g_popup.show("单曲链接错误！", 3000, 1);
						break;
					default :
						_error();
						break;
					}
				},
				error : _error
			});
		}else {
			var fs = new MUSIC.FormSender(url, "post", p, "utf-8");
			fs.onSuccess = function(data) {
				switch (data.code)
				{
				case 0:
					if (!likeFlag)
					{
						g_popup.show("收藏成功！歌曲已收藏到您指定的歌单。", 3000);
					}
					callback(data);
					break;
				case 2:
				case 1000:
					User.openLogin();
					break;
				/*case 3:
					g_popup.show(1, "收藏失败！", "超过歌曲数上限，您最多只能收藏1000首歌到本歌单。", 3000, 300);
					break;*/
				
				case 31: //普通用户，歌曲总数达上限
				case 32: //普通用户，添加歌曲后，歌曲总数达上限
				case 41: //歌单歌曲数达上限
					var t = data.title? data.title : "收藏失败！",
						v = '<a href="//pay.qq.com/music/index.shtml?aid=music.bfq.gdsx.1&clientuin='+p.uin+'" rel="noopener" target="_blank" title="开通绿钻，畅享最高25000首的超大空间>>">开通绿钻，畅享最高25000首的超大空间>></a>',
						msg = data.msg? data.msg : "";
					(!!data.title && msg != "") && (msg += v);
					g_popup.show(t+msg, 3000, 1);
					break;
				default :
					_error();
					break;
				}
			};
			fs.onError = _error;
			fs.send();
		}
	}
	function addToPlaylist(play_type){
		if (!!play_type&&(/a_([a-zA-Z0-9]+)_0/.test(play_type)||/p_(\d+)_0/.test(play_type))){
			var playdata = play_type;
			MUSIC.cookie.set('yq_playdata', playdata);
			MUSIC.cookie.set('yq_playschange', 1);
			
			if (MUSIC.player.isExists()) {
				MUSIC.cookie.set('player_exist', 0);MUSIC.popup.show('已添加至播放器，已过滤付费歌曲。');
				setTimeout(function(){
					var existFlag = parseInt(MUSIC.cookie.get('player_exist'));
					if (!existFlag)
					{
						var w = window.open('//y.qq.com/portal/player.html', '_blank');
						if(w)w.opener = null;
					}
				}, 2000);
			} else {
				MUSIC.popup.show('已添加至播放器，已过滤付费歌曲。');
				var w = window.open('//y.qq.com/portal/player.html', '_blank');
				if(w)w.opener = null;
			}
		}else {
			MUSIC.player.add(config.fromDir&&config.fromDir == 201&&config.songs.length>=100?config.songs.slice(0, 100):config.songs, null, config.fromDir&&config.fromDir == 201&&config.songs.length>=100?'已为你添加了前100首至播放器':'');
		}
	}
	function favToTaoge(songs, dirid, callback, addtype){
		if (songs.length==1&&(songs[0].songtype==5)) {
			MUSIC.popup.show('对不起，本地上传单曲不支持添加到我喜欢！', 3000, 1);
			return;
		}
		var netSongs = {songtitle:[], singer:[], url:[]}, qqsongs = {midlist:[], typelist:[]};
		$.each(songs, function(idx, item){
			if (item.songtype !=5)
			{
				if (item.songtype == 111 || item.songtype == 112 || item.songtype == 113)
				{
					qqsongs.midlist.push(item.songmid);
					qqsongs.typelist.push(item.songtype);
				}else
				if (!!item.songmid)
				{
					qqsongs.midlist.push(item.songmid);
					qqsongs.typelist.push(13);
				}else {
					netSongs.songtitle.push(item.songname);
					netSongs.singer.push(item.singer[0].name);
					netSongs.url.push(item.songurl);
				}
			}
		});
		if (qqsongs.typelist.length == 0 && netSongs.url.length == 0)
		{
			MUSIC.popup.show('没有可添加到我喜欢的歌曲！', 3000, 1);
			return;
		}
		function netsong(){
			
			if (netSongs.songtitle.length>0)
			{
				addNetSongs2Dir({
					uin : User.getUin(),
					songtitle : netSongs.songtitle.join(','),
					singer : netSongs.singer.join(','),
					url : netSongs.url.join(','),
					dirid : dirid,
					addtype : addtype||''
				}, function(){
						(dirid==201)&&$(document).trigger('like', {data:songs, flag:1});
						callback && callback();
				});
			}else {
				(dirid==201)&&$(document).trigger('like', {data:songs, flag:1});
				callback&&callback();
			}
		}
		if (qqsongs.midlist.length>0)
		{
			addSongs2Dir({
				uin : User.getUin(),
				midlist : qqsongs.midlist.join(','),
				typelist : qqsongs.typelist.join(','),
				dirid : dirid,
				addtype : addtype||''
			}, function(){
					netsong();
			});
		}else netsong();
	}
	function favToNew(songs, tips){
		
			$(document).on('keyup input propertychange', '#new_playlist_fav', function(){
				showTitleNum();
			});
			function showTitleNum() {
				var max_num = 20,
					$input = $('#new_playlist_fav'),
					$text = $('#name_leftnum_fav');
				var nameLength = MUSIC.string.getRealLen($input.val());				
				nameLength = Math.ceil(nameLength/2);				
				if( nameLength <= max_num){
					$text.html(max_num-nameLength);
					$text.css({'color':'#999'});
				}else{
					$text.html('-'+(nameLength-max_num));
					$text.css({'color':'#F70505'});
				}
			}
			require.async('js/common/dialog.js', function(dialog){
				dialog.show({
					mode : "common",
					width : 520,
					dialogclass : 'popup_new_list',
					content : ['<label class="form__label">歌单名</label>',
							   ' <div class="mod_form_txt">',
								   ' <input type="text" value="" class="form_txt__input" id="new_playlist_fav"><span class="form_txt__tips" id="name_leftnum_fav">20</span>',
								'</div>'].join(''),
					title : "创建新歌单",
					button_info1 : {
						highlight : 0,
						fn : function(e){
                            dialog.hide();
                        },
						title : "取消"
					},
					button_info2 : {
						highlight : 1,
						fn : function(){	
							
							if ($('#new_playlist_fav').val()=='')
							{
								MUSIC.popup.show('请输入歌单名！', 3000, 1);
								return;
							}
							if (parseInt($('#name_leftnum_fav').html())<0)
							{
								MUSIC.popup.show('歌单名最多20个字！', 3000, 1);
								return;
							}
							var p = {moddirnames:$('#new_playlist_fav').val(), moddirids:0};
							save(p, function(dirid){
								
								favToTaoge(songs, dirid, function(){
									MUSIC.popup.show(tips||'已成功添加到新建歌单');
									dialog.hide();
								}, true);
							});
						},
						title : "确定"
					}
				});
			});
	}
	function bindEvents(stat, opts){
		$(document).off('click', '.js_addto_playlist').on('click', '.js_addto_playlist', function(){
				if (!!stat)
				{
					statistics.pgvClickStat(stat+'.playlist');
				}
				addToPlaylist(opts.play_type||'');
				Fav.hide();
			})
			.off('click', '.js_addto_taogelist').on('click', '.js_addto_taogelist', function(){
				if (!!stat)
				{
					statistics.pgvClickStat(stat+'.gedan');
				}
				opts.afterSendCallback&&opts.afterSendCallback();
				favToTaoge(config.fromDir&&config.fromDir == 201&&config.songs.length>=100?config.songs.slice(0, 100):config.songs, $(this).data('dirid'), function(){
					if (opts.successCallback)
					{
						$('#popup').hide();;
						opts.successCallback();
					}else 
					MUSIC.popup.show(config.fromDir&&config.fromDir == 201&&config.songs.length>=100?'已为你成功添加100首到歌单':'已成功添加到歌单');
					Fav.hide();
				});
			})
			.off('click', '.js_addto_new').on('click', '.js_addto_new', function(){
				if (!!stat)
				{
					statistics.pgvClickStat(stat+'.newgedan');
				}
				favToNew(config.fromDir&&config.fromDir == 201&&config.songs.length>=100?config.songs.slice(0, 100):config.songs, config.fromDir&&config.fromDir == 201&&config.songs.length>=100?'已为你成功添加100首到新建歌单':'');
				Fav.hide();
			})
	}
	function getPlaylistInfo(callback){
		if (User.getUin()<10000)
		{
			callback({list:[]});
			return;
		}
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/splcloud/fcgi-bin/songlist_list.fcg?utf8=1&callback=MusicJsonCallBack&uin=' + User.getUin()+"&rnd="+Math.random(),
			charset : 'utf-8',
			jsonpCallback : 'MusicJsonCallBack',
			success : function(data) {
				if(data.retcode == 0){
					//屏蔽掉背景音乐
					var list = [];
					for (var i in data.list) {
						if (!(parseInt(data.list[i].dirid) == 205||parseInt(data.list[i].dirid) == 206||data.list[i].is_ordered==1)) {
							list.push(data.list[i]);//data.list.splice(i,1);
							//break;
						}
					}
					data.list = list;
					callback(data);
				} else {
					callback({list:[]});//User.openLogin();
					return;
				}
			},
			error : function(){
				return {list:[]};//callback(null);
			}
		});
	}
	function show (opts, e, p, stat){
		
		if (opts.songs.length==1&&(opts.songs[0].action.fav==0)) {
			require.async('js/common/showMsg.js', function(showMsg){
					showMsg(opts.songs[0]);
			});
			return;
		}
		if (opts.songs.length==1&&(opts.songs[0].songtype==5)) {
			MUSIC.popup.show('对不起，本地上传单曲不支持收藏到歌单！', 3000, 1);
			return;
		}
		var list = [];
		if (opts.songs.length>0) {
			$.each(opts.songs, function(idx, item){
				if (item.action.fav==1&&item.songtype!=5)
				{
					list.push(item);
				}
			});
			if (list.length<=0)
			{
				MUSIC.popup.show('没有可添加的歌曲！', 3000, 1);
				return;
			}
		}
		opts.songs = list;
		e.preventDefault();
		e.stopPropagation();
		if ($("#fav_pop").css('display')=='none')
		{
			$('.list_menu__icon_add').data('flag', '0');
		}
		var targ = MUSIC.util.getTarget(e), flag = $(targ).data('flag');
		if (!!flag&&flag == '1')
		{
			$(targ).data('flag', '0');
			$("#fav_pop").hide();
			return;
		}
		$('.list_menu__icon_add').data('flag', '0');
		$('#share_pop').hide();
		
		
		function bindGoBack(){
			$(document).off('click', '.js_back').on('click', '.js_back', function(){
				p.show();
				$('#fav_pop').hide();
			})
		}
		function setPosition(){
			
			$(targ).data('flag', '1');$(targ).parents('.songlist__item').addClass('songlist__item--current');
			$("#fav_pop").css({
				display : 'block'
			});
			if (p)
			{
				bindGoBack();
				if ($("#fav_pop a.js_back").length<=0)
				{
					$("#fav_pop div.operate_menu__cont").prepend(back_html);
				}
				Tips.fix_elem($("#fav_pop"), p, 0);p.hide();
			}else {
				$('.js_back').hide();
				$("#fav_pop").css({
					left : (e.pageX+12)+'px',
					top : e.pageY+'px'
				});
			}
		}
		$.extend(config ,opts);
		var $fav_pop = $('#fav_pop'), back_html = '<a href="javascript:;" class="operate_menu__link js_back"><i class="operate_menu__icon_prev_arrow sprite"></i>添加到</a>';
		var disabled_flag = true;
		$.each(opts.songs, function(idx, item){
			if (item.fav == '')
			{
				disabled_flag = false;
			}
		})
		if (1)//!initFlag)
		{
			getPlaylistInfo(function(data){
				if (typeof opts.noaddtoplayer != 'undefined')
				{
					data.noaddtoplayer = opts.noaddtoplayer;
				}else {
					data.noaddtoplayer = 0;
				}
				data.player = window.location.href.indexOf('/portal/player.html')==-1?0:1;
				if ($('#fav_pop').length>0){
					$('#fav_pop').remove();
				}
				$('body').append(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
if(data.list&&data.list.length>0){
__p+='\r\n    <!-- 添加到 -->\r\n    <div class="mod_operate_menu" style="position:absolute;" id="fav_pop">\r\n        <div class="operate_menu__cont">\r\n            <a href="javascript:;" class="operate_menu__link js_addto_playlist" ';
if(data.noaddtoplayer == 1||data.player == 1){
__p+='style="display:none;"';
}
__p+='>播放队列</a>\r\n            <ul role="menu" class="operate_menu__list '+
((__t=( data.player==0?'operate_menu__top_line':'' ))==null?'':__t)+
' operate_menu__bottom_line">\r\n\t    ';
 for(var s=0, sl=data.list.length; s<sl; s++){ var item = data.list[s]; 
__p+='\r\n                <li class="operate_menu__item">\r\n                    <a href="javascript:;" class="operate_menu__link js_addto_taogelist" data-dirid="'+
((__t=( item.dirid ))==null?'':__t)+
'" title="'+
((__t=( item.dirname ))==null?'':_.escape(__t))+
'">';
if(item.dirid==201){
__p+='<i class="operate_menu__icon_like"></i>';
}
__p+=''+
((__t=( item.dirname ))==null?'':_.escape(__t))+
'</a>\r\n                </li>\r\n            ';
 } 
__p+='\r\n\t    </ul>\r\n            <a href="javascript:;" class="operate_menu__link js_addto_new"><i class="operate_menu__icon_add sprite"></i>添加到新歌单</a>\r\n        </div>\r\n    </div> \r\n';
}else{
__p+='\r\n    <div class="mod_operate_menu" style="position:absolute;" id="fav_pop">\r\n        <div class="operate_menu__cont">\r\n            <a href="javascript:;" class="operate_menu__link js_addto_playlist"  ';
if(data.noaddtoplayer == 1||data.player == 1){
__p+='style="display:none;"';
}
__p+='>播放队列</a>\r\n            <ul role="menu" class="operate_menu__list '+
((__t=( data.player==0?'operate_menu__top_line':'' ))==null?'':__t)+
' operate_menu__bottom_line">\r\n                <li class="operate_menu__item">\r\n                    <a href="javascript:;" class="operate_menu__link js_login" title="登录后添加到歌单">登录后添加到歌单</a>\r\n                </li>\r\n\t    </ul>\r\n        </div>\r\n    </div> \r\n';
}
__p+='';
return __p;
}(data));
				if (disabled_flag)
				{
				$('.js_addto_taogelist[data-dirid="201"]').addClass('operate_menu__link--disabled ');
				}else
				$('.js_addto_taogelist[data-dirid="201"]').removeClass('operate_menu__link--disabled ');
				
				setPosition();
				initFlag = true;
			});
		}else {
			
			if (disabled_flag)
			{
			$('.js_addto_taogelist[data-dirid="201"]').addClass('operate_menu__link--disabled ');
			}else
			$('.js_addto_taogelist[data-dirid="201"]').removeClass('operate_menu__link--disabled ');
			setPosition();
		}
		bindEvents(stat, opts);
	}
	function hide (){
		$('.songlist__item--current').removeClass('songlist__item--current');
		$('.playlist__item--current').removeClass('playlist__item--current');
		$('#fav_pop').hide();
	}
	function like(songs, callback){
		favToTaoge(songs, 201, function(){
			callback&&callback();
			MUSIC.popup.show("成功收藏歌曲!", 1000);
		}, '')
	}
	function unlike(songs, callback, dirid){
		var midlist = [], typelist = [];
		$.each(songs, function(idx, item){
			if (item.songtype == 111 || item.songtype == 112 || item.songtype == 113 )
			{
				midlist.push(item.songid);
				typelist.push(item.songtype);
			}else
			if (!!item.songmid)
			{
				midlist.push(item.songid);
				typelist.push(3);
			}else {
				midlist.push(item.songid);
				typelist.push(11);
			}
		});
		var uin = User.getUin(),_callback = callback;
		function _error() {
			g_popup.show("取消喜欢失败！"+"当前网络繁忙，请您稍后重试。", 3000, 1);
		}

		function _succ() {
			//喜欢操作无需成功提醒
		}
		var _this = this;
		var url = "//c.y.qq.com/qzone/fcg-bin/fcg_music_delbatchsong.fcg",
			data = {
				uin : uin,
				dirid : dirid||201,
				ids : midlist.join(','),
				source : 103,
				types : typelist.join(','),
				formsender : 1,
				flag : 2,
				from : 3,
				utf8 : 1
			};
		if (!!ua.chrome)
		{
			data.formsender = 4;
			
			MUSIC.jQueryAjax.post({
				url : url,
				charset : 'utf-8',
				data:data,
				success : function(o) {
					switch (o.code)
					{
					case 0:
						//取消喜欢成功
						_callback();
						$(document).trigger('like', {data:songs, flag:0});
						break;
					case 1:
						_error();
						break;
					default :
						_error();
						break;
					}
				},
				error : _error
			});
		}else {
			var fs = new MUSIC.FormSender(url, "post", data, "utf-8");
			fs.onSuccess = function(o) {
				switch (o.code)
				{
				case 0:
					//取消喜欢成功
					_callback();
					$(document).trigger('like', {data:songs, flag:0});
					break;
				case 1:
					_error();
					break;
				default :
					_error();
					break;
				}
			};
			fs.onError = _error;
			fs.send();
		}
	}
	
	/**
	 * 批量保存
	 * 
	 * @param {Object}
	 *			p : 参数
	 *				{
						uin : 用户QQ,
						delnum : 删除歌单数,
						deldirids : 删除歌单ID列表,
						modnum : 修改歌单数,
						moddirids : 修改歌单ID列表,
						moddirnames : 修改歌单名列表,
						moddirshows : 是否可见
					}
	 * @param {Function}
	 *			callback 获取数据成功回调
	 */
	function saveBatch(p, callback){
		function _error(){
			g_popup.show("操作失败！当前网络繁忙，请您稍后重试。", 3000, 1);
		}

		p.formsender = 1;
		p.source = 103;
		if (!!p.moddirnames){
			p.moddirnames = p.moddirnames.replace(/,/g,'，');
		}
		//p.utf8 = 1;

		var url = "//c.y.qq.com/splcloud/fcgi-bin/fcg_fav_modsongdir.fcg",
			fs = new MUSIC.FormSender(url, "post", p, "gb2312");
		fs.onSuccess = function(data) {
			switch (data.code)
			{
			case 0:
				
				if (!p.checkIsOrdered && p.delnum > 0) {
					g_popup.show("删除歌单成功！", 1000);
					//_this.delCache(p.uin, p.deldirids);
				}
				if(p.modnum>0){
					g_popup.show("修改歌单成功！",1000);
				}
				callback(data);
				break;
			case 1:
			case 2:
			case 1000:
				g_user.openLogin();
				break;
			case 4:
				g_popup.show("歌单标题为空！请填写歌单标题。", 3000, 1);
				break;
			case 6:
				g_popup.show( "歌单标题过长！请重新填写歌单标题。", 3000, 1);
				break;
			case 13:
				g_popup.show("歌单标题存在非法字符！请重新填写歌单标题。", 3000, 1);
				break;
			default :
				_error();
				break;
			}
		};
		fs.onError = _error;
		fs.send();
	}
	function delMymusic(dirid, cb){
		saveBatch({
			uin : User.getUin(),
			delnum : 1,
			deldirids : dirid,
			forcedel : 1
		}, function(){
			cb&&cb();
		});
	}
	function combineData(list, callback){
		if (User.getUin()<10000)
		{
			callback&&callback(list);
		}else{
			if (list.length>0&&!!list[0].fav){
				callback&&callback(list);
				return;
			}
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getmyfav.fcg?dirid=201&dirinfo=1',
				charset : 'utf-8',
				//jsonpCallback : 'getFav',
				success : function(data) {
					if(data.code == 0){
						for(var j = 0, jLen = list.length; j < jLen ; j++){
							if (list[j].songtype == 111 || list[j].songtype == 112 || list[j].songtype == 113){
								if (list[j].mid in data['map_'+list[j].songtype] || parseInt(list[j].mid) in data['map_'+list[j].songtype]) {
									list[j].fav = "mod_songname_menu__like--liked";		
								}else{
									list[j].fav = '1';
								}
							}else if (list[j].songtype>0){
								if (list[j].mid in data.map_daolian || parseInt(list[j].mid) in data.map_daolian) {
										list[j].fav = "mod_songname_menu__like--liked";		
								}else{
									list[j].fav = '1';
								}
							}else 
							if (list[j].mid in data.map || parseInt(list[j].mid) in data.map) {
									list[j].fav = "mod_songname_menu__like--liked";		
							}else{
									list[j].fav = '1';
								}
						}
					}
						callback&&callback(list);
				},
				error : function(){
					callback&&callback(list);
				}
			});
		}
	}
	/**
	 * 获取歌单详细信息
	 * 
	 * @param {Integer}
	 *			uin 用户QQ
	 * @param {Integer}
	 *			dir 歌单目录id
	 * @param {Function}
	 *			callback 获取数据成功回调
	 * @param {Integer}
	 *			isnew 是否更新歌单new标识 1表示更新，否则不更新
	 * @param {Boolean}
	 *			nocache 是否从服务器中拉取
	  * @param {Integer}
	 *			from 歌曲的开始位置
	  * @param {Integer}
	 *			to 歌曲的截至位置
	 * @param {function}
	 *			errCallback 拉取失败回调函数
	 * @param {Integer}
	 *			comPic 为1时表示合成四拼图	 
	 */
	 var _cacheDetail = {};
	function getDetail(uin, dir, callback, isnew, nocache, from, to, errCallback, comPic){
		isnew = isnew || 0;
		from = from || 0;
		to = to || 0;
		comPic = comPic || 0;
		if (dir in _cacheDetail && !nocache) {
			callback(_cacheDetail[dir]);
			return;
		}
		var _this = Fav;
		if (dir == 205) {		//背景音乐歌单
			_this.getBgmusic(uin, function(detail){
				_cacheDetail[detail.DirID] = detail;
				callback(detail);
			});
			return;
		}
		if (dir == 206) {		//本地上传歌单
			_this.getLocalMusic(uin, function(detail){
				_cacheDetail[detail.DirID] = detail;
				callback(detail);
			});
			return;
		}
		function _error(e){
			if(!!errCallback && $.isFunction(errCallback)){
				errCallback();
			} else {
				MUSIC.popup.show("获取用户歌单详情失败！当前网络繁忙，请您稍后重试。", 3000, 1);
			}
		}

		var url = "//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getinfo_cp.fcg?uin="+uin+"&dirid="+dir+"&new="+isnew+"&dirinfo=1&user=qqmusic&miniportal=1&fromDir2Diss=1&comPic="+comPic;
		if (from < to) {
			url += "&from=" + from + "&to=" + to;
		}
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'jsonCallback',
			success : function(data) {
				if (data.code != 0) {
					_error();
					return;
				}
				if (data.code=="-1000" || data.code=="1000"||data.code==1000)
				{
					User.openLogin();
					return;
				}
				/*
					我的最爱 201
					好友分享 202
					点歌     203
					播放列表 204
					背景音乐 205
					本地上传 206
				*/
				var tmp = {};
				tmp.uin = data.uin;
				tmp.NickName = data.NickName;
				tmp.show = data.show;
				tmp.tagList = data.tagList;
				tmp.tags = data.tags;
				tmp.createTime = data.CreateTime;

				tmp.PicUrl = data.PicUrl;
				tmp.DirPicUrl2 = data.DirPicUrl2;

				tmp.Desc = data.Desc;
				tmp.Title = data.Title;

				if (dir == 201) {
					tmp.Title = '我喜欢';
				}
				tmp.DirID = data.DirID;
				tmp.dissID = data.dissID;
				tmp.list = [];
				$.each(data.SongList, function(idx, detail){
					if (detail.type % 10 == 1) {
						detail.data = detail;
					}
					detail.data.song_type = detail.type;
					detail.data.dissID = data.dissID;
					tmp.list.push(MUSIC.player.formatMusic(detail.data));
				});
				
				if(tmp.DirID == 201){
					tmp.Title = '我喜欢';
				} else {
					_cacheDetail[dir] = tmp;		//我喜欢歌单无需缓存
				}
				
				callback(tmp);
			},
			error : _error
		});
	}
	/**
	 * 获取背景音乐详细信息
	 * 
	 * @param {Integer}
	 *			uin 用户QQ
	 * @param {Function}
	 *			callback 获取数据成功回调
	 */
	function getBgmusic(uin, callback){
		function _error(){
			MUSIC.popup.show("获取用户背景音乐失败！当前网络繁忙，请您稍后重试。", 3000, 1);
		}
		var _this = this,
			url = "//c.y.qq.com/qzone/fcg-bin/cgi_playlist_xml_new.fcg?utf8=1&json=1&uin="+uin;
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'jsonCallback',
			success : function(data) {
				if (!data.data.songlist) {
					_error();
					return;
				}
				var tmp = {};
				tmp.uin = uin;
				tmp.NickName = "";
				tmp.show = 1;
				tmp.tagList = "";
				tmp.PicUrl = location.protocol+"//y.gtimg.cn/mediastyle/y/img/cover_qzone.jpg";
				tmp.Desc = "空间背景音乐同步列表";
				tmp.Title = "Qzone背景音乐";
				tmp.DirID = 205;
				tmp.list = [];
				$.each(data.data.songlist, function(idx, detail){
					var music = {};
					if (!detail) {
						return;
					}
					detail.data.type = detail.songtype;
					music = MUSIC.player.formatMusic(detail.data);
					if (music.mtype == 'qqmusic') {
						music.songtype = 13;
					} else {
						music.songtype = music.songtype || 11;
					}
					if (music.songtype == 35) {//K歌歌曲不允许收藏、分享
						music.action.fav = false;
						music.action.share = false;
						music.singer[0].name = parseEmoji(music.singer[0].name);
					}
					tmp.list.push(music);
				});
				callback(tmp);
			},
			error : _error
		});
	}
	/**
	 * 获取本地音乐歌单详细信息
	 * 
	 * @param {Integer}
	 *			uin 用户QQ
	 * @param {Function}
	 *			callback 获取数据成功回调
	 */
	function getLocalMusic(uin, callback){
		function _error(){
			MUSIC.popup.show("获取本地音乐失败！当前网络繁忙，请您稍后重试。", 3000, 1);
		}
		var _this = this,
			url = "//c.y.qq.com/qzone/fcg-bin/fcg_usermusic_info_cp.fcg?uin=" + uin + "&utf8=1&json=1&p=" + Math.random();
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'jsonCallback',
			success : function(data) {
				if (!data) {
					_error();
					return;
				}
				var tmp = {};
				tmp.uin = uin;
				tmp.NickName = "";
				tmp.show = 1;
				tmp.tagList = "";
				tmp.PicUrl = location.protocal+"//y.gtimg.cn/mediastyle/y/img/vip_upload.jpg";
				tmp.Desc = "绿钻贵族本地上传的音乐歌单";
				tmp.Title = "本地上传";
				tmp.DirID = 206;
				tmp.list = [];
				$.each(data.songlist, function(idx, detail){
					if (!detail) {
						return;
					}
					if (!detail.songurl){
						detail['switch'] = 524291;//10000000000000000011
						detail['localtype'] = 'local';
					}
					tmp.list.push(MUSIC.player.formatMusic(detail));
				});
				callback(tmp);
			},
			error : _error
		});
	}
	return {
		favToTaoge : favToTaoge,
		favToNew : save,
		like : like,
		unlike : unlike,
		show : show,
		hide : hide,
		combineData : combineData,
		del : delMymusic,
		getBgmusic : getBgmusic,
		getDetail : getDetail,
		getLocalMusic : getLocalMusic
	}
})();
return Fav;


});