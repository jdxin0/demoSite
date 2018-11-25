define('js/common/download.js', function(require, exports, module){

/**
 * 下载组件
 * @author: lunardai
 * @lastModified: 2016/7/13
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	$ = music.$
	, g_popup = music.popup
	, ua = music.userAgent
	,statistics = music.statistics
	, User = music.widget.user;
var g_dialog = require('js/common/dialog.js');
    /**
     * 下载组件
     *
     */
var download = (function(){
	
	function checkIsQQMusicInstall(){
		if (ua.ie)
		{
			try{
				var object = $('#QQMusicHelper').length>0?$('#QQMusicHelper')[0]:null;
				if (!object)
				{
					object = $('body').append('<object id="QQMusicHelper" classid="CLSID:9A80B97F-EE30-40AC-A89F-C6604798ADF3" style="visibility: hidden;"/>');
				}
				var objHelper = new ActiveXObject("QQMusicHelper.Misc");
				var isInstall = objHelper.IsQQMusicInstall();
				return isInstall;
			}
			catch(e)
			{
				return false;
			}
		}else if (ua.firefox||ua.chrome&&parseInt(ua.chrome)<40)
		{
			var em = $('#QQMusicHelper').length>0?$('#QQMusicHelper')[0]:null;
			if (!em)
			{
				em = $('body').append('<embed type="application/tecent-qqmusichelper-plugin" id="QQMusicHelper" height="30" width="40">');
			}
			
			
			try{
				var isInstall = QQMusicHelper.IsQQMusicInstall();
				return isInstall;
			}
			catch(e)
			{
				return false;
			}
		}else if (ua.chrome)
		{			
			try{
				var evt = document.createEvent("CustomEvent");
				evt.initCustomEvent('PageEvent', true, false, {type: 0, 
												   param: {
														cmd: "connect",
														param: {
															message: "com.qq.qqmusichelper"}}});
				document.dispatchEvent(evt);
				var evt2 = document.createEvent("CustomEvent");
				evt2.initCustomEvent('PageEvent', true, false, {type: 1, 
															   param: {
																	cmd: "GetQQMusicVersionStr",//"IsQQMusicInstall",
																	param: {}}});
				
				return document.dispatchEvent(evt2);
			}
			catch(e)
			{
				return false;
			}
		}
		return false;
	}
	function RunQQMusic(tecentURL){
		if (ua.ie)
		{
			try{
				QQMusicHelper.RunQQMusic(tecentURL);
				return true;
			}
			catch(e)
			{
				return false;
			}
		}else if (ua.firefox||ua.chrome&&parseInt(ua.chrome)<40)
		{
			
			try{
				QQMusicHelper.RunQQMusic(tecentURL);
				return true;
			}
			catch(e)
			{
				return false;
			}
		}else if (ua.chrome)
		{			
			try{
				var evt = document.createEvent("CustomEvent");
				evt.initCustomEvent('PageEvent', true, false, {type: 1, 
															   param: {
																	cmd: "RunQQMusic",
																	param: {
																		message: tecentURL}}});
				return document.dispatchEvent(evt);
			}
			catch(e)
			{
				return false;
			}
		}
		return false;
	}
	function prepareDownload(){
		//chrome下监听事件来判断是否安装了插件
		
		window.chromeqqmusic = false;
		if (document.addEventListener)
		{
			document.addEventListener("ContentEvent", function(eventMsg) {
				if (!!eventMsg.detail&&!!eventMsg.detail.param&&!!eventMsg.detail.param.cmd&&eventMsg.detail.param.cmd == 'GetQQMusicVersionStr_result'
				&&!!eventMsg.detail.param.param&&!!eventMsg.detail.param.param.message&&parseInt(eventMsg.detail.param.param.message)>0)
				{
					window.chromeqqmusic = true;
				}	
			}, false);
		}else {
			document.attachEvent("ContentEvent", function(eventMsg) {
				if (!!eventMsg.detail&&!!eventMsg.detail.param&&!!eventMsg.detail.param.cmd&&eventMsg.detail.param.cmd == 'GetQQMusicVersionStr_result'
				&&!!eventMsg.detail.param.param&&!!eventMsg.detail.param.param.message&&parseInt(eventMsg.detail.param.param.message)>0)
				{
					window.chromeqqmusic = true;
				}	
			});
		}
		setTimeout(function(){
			checkIsQQMusicInstall()
		}, 500);
		//chrome下监听事件来判断是否安装了插件
	}
	function show(songInfo, fromDir){
		
		if (songInfo.length==1&&(!(songInfo[0].action.down_lq || songInfo[0].action.down_hq || songInfo[0].action.down_sq))) {
			require.async('js/common/showMsg.js', function(showMsg){
					showMsg(songInfo[0], 'pc_d');
			});
			return;
		}
		if (songInfo.length==1&&(songInfo[0].songtype==5)) {
			MUSIC.popup.show('对不起，本地上传单曲不支持下载！', 3000, 1);
			return;
		}
		
		if (songInfo.length==1&&(songInfo[0].songtype==111||songInfo[0].songtype==112||songInfo[0].songtype==113)) {
			MUSIC.popup.show('可前往QQ音乐客户端下载', 3000, 1);
			return;
		}
		var list = [];
		if (songInfo.length>0) {
			$.each(songInfo, function(idx, item){
				if ((item.action.down_lq || item.action.down_hq || item.action.down_sq)&&(!!item.songmid)&&item.songmid!=''&&item.songtype!=5&&item.songtype!=111&&item.songtype!=112&&item.songtype!=113)
				{
					list.push(item);
				}
			});
			if (songInfo.length == 1 && !songInfo[0].songmid)
			{
				MUSIC.popup.show('此单曲暂时不支持网站下载，请用客户端下载收听', 3000, 1);
				return;
			}
			if (list.length<=0)
			{
				MUSIC.popup.show('此单曲暂时不支持网站下载，请用客户端下载收听', 3000, 1);
				return;
			}
		}
		songInfo = list;
		var songids = [], songtypes = [];
		if (songInfo.length>0&&songInfo[0].songid>0)
		{
			$.each(songInfo, function(idx, item){
				if (item.songid>0)
				{
					songids.push(item.songid);
					songtypes.push(item.songtype);
				}
			});
			if (fromDir == 201){
				songids = songids.slice(0, 100);
				songtypes = songtypes.slice(0, 100);
			}
			if (songids.length>0)
			{
				if (/Mac/i.test(navigator.userAgent)&&songids.length>1)
				{
					g_popup.show('Mac暂不支持下载多首歌曲！', 3000, 1);
					//g_popup.show('Mac暂不支持下载歌曲！', 3000, 1);
				}else
				
				if (ua.chrome&&parseInt(ua.chrome)>=40&&!window.chromeqqmusic||//chrome下监听事件来判断是否安装了插件
					!checkIsQQMusicInstall()||/Mac/i.test(navigator.userAgent))
				{
						statistics.pgvClickStat('y_new.download_popup.show');
						g_dialog.show({
							mode : "common",
							title : '提示',
							sub_title : "下载歌曲需要在QQ音乐客户端操作!",
							icon_type : 2,
							desc : '若没有QQ音乐客户端请先安装', 
							width : 450,
							heigh : 244,
							button_info1: {
								fn : function(e){
									window.open((/Mac/i.test(navigator.userAgent)?'qqmusicmac':'tencent')+'://QQMusic/?version==1173&&from==y.qq.com&&cmd_count==1&&cmd_0==downloadsong&&id_0=='+(songids.join('|'))+'&&songtype_0=='+(songtypes.join('|'))+'&&info_0==&&quality_0==quality', '_self');
									g_dialog.hide();
									statistics.pgvClickStat('y_new.download_popup.open_client');
								},
								title : "打开客户端"
							},
							button_info2: {
								highlight : "1",
								fn : function(e){
									if (/Mac/i.test(navigator.userAgent) && !!window.download_mac){
										window.open(window.download_mac);
									}else
									if (!!window.download_pc)
									{
										window.open(window.download_pc);
									}else{
										var w = window.open('//y.qq.com/download/', '_blank');if(w)w.opener = null;
									}
									g_dialog.hide();
									statistics.pgvClickStat('y_new.download_popup.download_client');
								},
								title : "下载客户端"
							}
						});
				}else {
					if (!RunQQMusic('/tencentprotocol "version==1173&&from==y.qq.com&&cmd_count==1&&cmd_0==downloadsong&&id_0=='+(songids.join('|'))+'&&songtype_0=='+(songtypes.join('|'))+'&&info_0==&&quality_0==0"'))
					{
						window.open('tencent://QQMusic/?version==1173&&from==y.qq.com&&cmd_count==1&&cmd_0==downloadsong&&id_0=='+(songids.join('|'))+'&&songtype_0=='+(songtypes.join('|'))+'&&info_0==&&quality_0==quality', '_self');
					}
				}
			}
		}
		
		$('.songlist__item--current').removeClass('songlist__item--current');
		$('.playlist__item--current').removeClass('playlist__item--current');
	}
	
	return {
		show : show,
		prepareDownload : prepareDownload
	}
})();
return download;


});