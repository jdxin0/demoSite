define('js/common/html/albumdata.js', function(require, exports, module){

/**
 * 专辑播放接口 lunardai 2016/4/25
 * 
 * @namespace mac {init:初始化页面函数}
 * 
 * @description 实例化每个组件都会返回对应组件的View层对象，组件间通过观察者observer对象进行通信
 *
 */
var MUSIC = require("js/common/music.js");
var $ = MUSIC.$;
var g_user = MUSIC.user;
//用于辅助的全局变量
var reportType = '',
	/**
	 * @ namespace mac  
	 */
	mac = {
		
		/*
		*	@ method init
		*	@ params {object} args
		*		param详见上面的config
		*/
		init : function (op, callback) {
			reportType = op.reportType;
			ALBUM.getAlbumSongList(op, callback);	
			
		},
		getAlbumInfo : function(op, callback) {
			reportType = op.reportType;
			ALBUM.getAlbumInfo(op, callback);	
			
		}
	},
	_cache = {};


var ALBUM = (function () {
		//播放\
		function play(mid, play){
			MUSIC.player.checkPlayerWindow();
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+mid,
				charset : 'utf-8',
				jsonpCallback : 'albuminfoCallback',
				success : function(data) {
					if(data.code == 0){
							var _data = MUSIC.player.formatMusics(data.data.list);
							require.async("js/common/fav.js", function(fav){
								fav.combineData(_data, function(list){
									if(MUSIC.player.checkSonglistRight(list)){
										var playdata = 'a_'+mid+'_1'+('_'+reportType);
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
									}
								});
							});
					}
				},
				error : function(e){
				}
			});
			return false;
		}
		/* @ instance of Model 歌曲列表Model层
		*  @ description 播放album时，需要传歌曲列表给客户端
		*  @ method 
		*		getSonglist {获取歌曲列表数据}
		*/
		
		function getAlbumSonglist(op,callback){
			if (!!op.play && !!op.mid){
				play(op.mid, op.play);
				!!callback && callback(null);
				return false;
			}
			if (!!_cache[op.id]||!!_cache[op.mid])
			{
				var list = _cache[op.id]||_cache[op.mid];
				if (!!op.play)
				{
					if (list.length>0)
					{
						MUSIC.player.play(list,1, null, null, reportType);//专辑播放;//MUSIC.client.play(list,-1, op.reportID||MUSIC.reportMap.albumlist,list.length>0?list[0].albumid:0, 3);//专辑播放
					}else {
						/*if (MUSIC.player._windowHandler.location.href=='about:blank')
						{
							MUSIC.player._windowHandler.close();
						}*/
						MUSIC.popup.show('无可播放单曲！', 3000, 1);
					}
				}
				!!callback && callback(list);
			}else 
			MUSIC.jQueryAjax.jsonp({
				url : !op.mid?'//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albumid='+op.id:'//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+op.mid,
				charset : 'utf-8',
				jsonpCallback : 'albuminfoCallback',
				success : function(data) {
					if(data.code == 0){
						
							
							var _data = MUSIC.player.formatMusics(data.data.list);
							require.async("js/common/fav.js", function(fav){
								fav.combineData(_data, function(list){
									
									if (!!op.play)
									{
										if (list.length>0)
										{
											MUSIC.player.play(list,1, null, null, reportType);//专辑播放
										}else{
											/*if (MUSIC.player._windowHandler.location.href=='about:blank')
											{
												MUSIC.player._windowHandler.close();
											}*/
											MUSIC.popup.show('无可播放单曲！', 3000, 1);
										}
									}
									if (parseInt(op.id)>0)
									{
										_cache[op.id] = list;
									}else if (op.mid!='')
									{
										_cache[op.mid] = list;
									}
									!!callback && callback(list);
								});
							});
					}else callback&&callback([]);
				},
				error : function(e){
				}
			});
		}
		
		function getAlbumInfo(op,callback){
			if (!!_cache[op.id]||!!_cache[op.mid])
			{
				var list = _cache[op.id]||_cache[op.mid];
				!!callback && callback(list);
			}else 
			MUSIC.jQueryAjax.jsonp({
				url : !op.mid?'//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albumid='+op.id:'//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+op.mid,
				charset : 'utf-8',
				jsonpCallback : 'albuminfoCallback',
				success : function(data) {
					if(data.code == 0){
						
						if (parseInt(op.id)>0)
						{
							_cache[op.id] = data;
						}else if (op.mid!='')
						{
							_cache[op.mid] = data;
						}
						!!callback && callback(data);
					}else callback&&callback(null);
				},
				error : function(e){
					callback&&callback(null);
				}
			});
		}
		
		return {
			/*
			*	@ method 
			*	@ descriptin 设置歌单的id
			*	@ attention  这里是另一个重载,如果页面有传数据过来，表示不是歌单页，单面不需要setDir
			*/
			getAlbumSongList : getAlbumSonglist,
			getAlbumInfo : getAlbumInfo
		};
})();

	return mac;

});