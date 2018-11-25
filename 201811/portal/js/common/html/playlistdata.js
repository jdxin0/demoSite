define('js/common/html/playlistdata.js', function(require, exports, module){

/**
 * 歌单页JS，同时作为各个有歌单页面的歌单控件，通过传递不同参数进行重载
 * 
 * @namespace mac {init:初始化页面函数}
 * @component object : 
 * {
 *   songList : 歌单组件    	
 * }
 * 
 * @description 实例化每个组件都会返回对应组件的View层对象，组件间通过观察者observer对象进行通信
 *
 */
var MUSIC = require("js/common/music.js");
var $ = MUSIC.$;
var g_user = MUSIC.user;
//用于辅助的全局变量
var 
	/**
	 * @ namespace mac  
	 */
	mac = {
		
		/*
		*	@ method init
		*	@ params {object} args
		*		param详见上面的config 
				hostFlag:是否是主人态
		*/
		init : function (op, callback, hostFlag, params) {
			Playlist.getSongList(op, callback, hostFlag, params);	
			
		},
		getPlaylistInfo : function(op, callback, hostFlag, params){
			Playlist.getPlaylistInfo(op, callback, hostFlag, params);	
		}
	},
	_cache = {}
	;


var Playlist = (function () {
	
		function getInfo(id,callback, hostFlag, params){
			hostFlag = hostFlag || false;
			/*if (!!_cache[id])
			{
				!!callback && callback(_cache[id]);
			}else*/
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid='+ id +'&format=jsonp'+(hostFlag?'&ctx=1':''),
				charset : 'utf-8',
				data : params||{},
				jsonpCallback : 'playlistinfoCallback',
				success : function(data) {
					if(data.code == 0){
						_cache[id] = data;
						!!callback && callback(data);
					}else callback&&callback(null);
				},
				error : function(e){
					callback&&callback(null);
				}
			});
		}
		
		/* @ instance of Model 歌曲列表Model层
		*  @ description 播放时，需要传歌曲列表给客户端
		*  @ method 
		*		getSonglist {获取歌曲列表数据}
		*/
		
		function getSongList(id,callback, hostFlag, params){
			hostFlag = hostFlag || false;
			getInfo(id, function(data){
				if (!!data)
				{
					if(data.code == 0){
						if (!!data.subcode&&data.subcode == 4000){
							!!callback && callback(data);
							return false;
						}
						var _data = MUSIC.player.formatMusics(data.cdlist[0].songlist);
						require.async("js/common/fav.js", function(fav){
							fav.combineData(_data, function(list){
								!!callback && callback(list);
							});
						});
					}else callback&&callback([]);
				}else callback&&callback([]);
			}, hostFlag, params);
		}
		
		return {
			/*
			*	@ method 
			*	@ descriptin 设置歌单的id
			*	@ attention  这里是另一个重载,如果页面有传数据过来，表示不是歌单页，单面不需要setDir
			*/
			getSongList : getSongList,
			getPlaylistInfo : getInfo
		};
})();

	return mac;

});