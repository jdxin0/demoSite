define('js/common/html/toplistdata.js', function(require, exports, module){

/**
 * 排行榜播放接口
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
var 
	reportType = '',
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
			TOPLIST.getToplistSongList(op, callback);	
			
		}
	},
	_cache = {};


var TOPLIST = (function () {
	//播放排行榜
	function play(rid, play){
		MUSIC.player.checkPlayerWindow();
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?page=detail&tpl=macv4&type=top&topid='+ rid,
			charset : 'utf-8',
			jsonpCallback : 'MusicJsonCallback',
			success : function(data) {
				if(data.songlist.length > 0){
						var _data = MUSIC.player.formatMusics(data.songlist);
						require.async("js/common/fav.js", function(fav){
							fav.combineData(_data, function(list){
								if (MUSIC.player.checkSonglistRight(list)){
									var playdata = 't_'+rid+'_'+(!!play?'1':'0')+('_'+reportType);
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
		
	}
		/* @ instance of Model 歌曲列表Model层
		*  @ description 播放album时，需要传歌曲列表给客户端
		*  @ method 
		*		getSonglist {获取歌曲列表数据}
		*/
		
		function getToplistSongList(op,callback){
			if (!!op.play && !!op.topId){
				play(op.topId, op.play);
				!!callback && callback(null);
				return false;
			}
			
			if (!!_cache[op.topId+'_'+op.topType])
			{
				var list = _cache[op.topId+'_'+op.topType+(op.date?('_'+op.date):'')];
				if (!!op.play)
				{
					if (list.length>0)
					{
						MUSIC.player.play(list, 1, null, null, reportType);//排行榜播放
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
				url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?page=detail&tpl=macv4'+'&type='+['top','global', 'special'][op.topType]+'&topid='+ op.topId+(op.date?('&date='+op.date):''),
				charset : 'utf-8',
				jsonpCallback : 'MusicJsonCallback',
				success : function(data) {
					if(data.songlist.length > 0){
							var _data = MUSIC.player.formatMusics(data.songlist);
							require.async("js/common/fav.js", function(fav){
								fav.combineData(_data, function(list){
									if (!!op.play){
										if (list.length>0){
											MUSIC.player.play(list, 1, null, null, reportType);//排行榜播放
										}else {
											MUSIC.popup.show('无可播放单曲！', 3000, 1);
										}
									}
									if (parseInt(op.topId)>0&&list.length>0){
										_cache[op.topId+'_'+op.topType+(op.date?('_'+op.date):'')] = list;
									}
									!!callback && callback(list);
								});
							});
							
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
			getToplistSongList : getToplistSongList
		};
})();

	return mac;

});