define('js/common/html/songlist.js', function(require, exports, module){

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
var $ = MUSIC.$,
	statistics = MUSIC.statistics,
	jQueryAjax = MUSIC.jQueryAjax;

var 
	_songmap = {},
	_def = {
		// 错误定义
		ERR_SONG_DATA_INVALID: "歌曲数据无效",
		ERR_SET_PLAY_TIME: "设置currentTime失败",
		ERR_REMOVE_AUDIO: "替换audio对象失败",
		ERR_SETING: "配置有误",
		ERR_GET_SONG_INFO: "获取歌曲信息失败",
		ERR_GET_SONG_VKEY: "获取歌曲vkey失败",

		// 歌曲服务器
		// 2017-03-22 dl域名有问题，临时替换成 isure
		AUDIO_BY_MID: "http://isure.stream.qqmusic.qq.com/C100$songmid.m4a",
		AUDIO_BY_ID: "http://isure.stream.qqmusic.qq.com/$songid.m4a"
	};
function isFunction(f) { return MUSIC.$.isFunction(arr); }
function isArray(arr){ return MUSIC.$.isArray(arr); }
function isObject(obj) { return typeof obj === 'Object'; }
// 将字符串形式的id列表转为数组形式，会自动过滤无效的id
function parseIdList(idlist, noFilterInvalid) {
	if (isArray(idlist)) {
		idlist = idlist.slice(0);
	} else {
		idlist = idlist == null || idlist == "" ? [] : ("" + idlist).split(/\s*,\s*/);
	}
	if (!noFilterInvalid) {
		var _r = [];
		for (var i = 0; i < idlist.length; i++) {
			if (idlist[i] != null && idlist != "") {
				_r.push(idlist[i]);
			}
		}
	}
	return idlist;
}

function getMap(song) {
	if (song) {
		var type = song.type || 0;
		if (_songmap[type]) {
			return _songmap[type][song.mid] || _songmap[type][song.id];
		}
	}
}

function setMap(song, map) {
	if (song) {
		map = map || _songmap;
		var type = song.type || 0;
		if (!map[type]) {
			map[type] = {};
		}
		map[type][song.id] = map[type][song.mid] = map[type + "_" + song.id] = map[type + "_" + song.mid] = map[song.mid] = song;
		if (!map[song.id]) {
			map[song.id] = song;
		}
	}
}
/**
 * 获取歌曲信息
 * @param {Number|String|Array} id 歌曲id/mid
 * @param {Number|String|Array} type 歌曲类型
 * @param {Boolean} force 忽略缓存
 * @param {Function} callback 回调函数 (error, songmap, songlist)
*/
function getSongInfo(_songlist, force, callback) {
	var type = '', id = '', from =   !!_songlist&&_songlist.length>0&&_songlist[0].ix?_songlist[0].ix:0;force = true;
	var sarray = [], tarray = [];
	$.each(_songlist, function(idx, item){
		if (typeof item.type != 'undefined'){
			tarray.push(item.type);
		}else {
			tarray.push('0');
		}
		if (typeof item.songid != 'undefined'){
			sarray.push(item.songid);
		}else {
			sarray.push('0');
		}
	});
	type = tarray.join(',');
	id = sarray.join(',');
	var types = parseIdList(type, true),
		songlist = parseIdList(id, true),
		songinfo = {},
		ids = [],
		idTypes = [],
		mids = [],
		midTypes = [],
		urlMids = [],
		urlMidTypes = [];

	var _cb = function (error, list) {
		//_report(error ? "h5_get_songinfo_error" : "h5_get_songinfo_success", time);
		/*for (var i = 0; i < songlist.length; i++) {
			songlist[i] = getMap(songlist[i]);
		}*/
		var _map = {}, ret = [];
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			_map[item.songtype + '_' + item.songid] = list[i];
		}
		for (var i = 0; i < _songlist.length; i++) {
			var item = _songlist[i];
			var key = (item.songtype + '_' + item.songid);
			if (key in _map){
				ret.push(_map[key]);
			}else {
				ret.push(item
					);
			}
		}
		callback && callback(error, ret);
	};

	// 遍历查找需要查询的id列表
	$.each(songlist, function(i, song) {
		if (song) {
			var type = types[i] > 0 ? parseInt(types[i]) : 0;
			var id, mid;
			if (isObject(song)) {
				mid = song.mid || song.songmid;
				id = song.id || song.songid;
				if (song.type != null) {
					type = song.type;
				}
			} else {
				if (song > 0) {
					id = song;
				} else {
					mid = song;
				}
			}
			songlist[i] = {
				type: type,
				mid: mid,
				id: id
			};
			song = getMap(songlist[i]);

			if (!force && song) { // 有force标记时不从缓存中读数据
				songlist[i] = song;
				setMap(song);
				setMap(song, songinfo);
			} else {
				if (mid) { // mid
					mids.push(mid);
					midTypes.push(type);
				} else { // 数字id
					ids.push(parseInt(id));
					idTypes.push(type);
				}
			}
		}
	});

	if (mids.length || ids.length || urlMids.length) {

		var getSongCgiParams = function (param) {
			return {
				"module": "track_info.UniformRuleCtrlServer",
				"method": "GetTrackInfo",
				"param": param
			}
		};
		var getUrlCgiParams = function (param) {
			var guid = MUSIC.cookie.get("pgv_pvid");
			if (!guid) {
				guid = (new Date()).getUTCMilliseconds();
				guid = "" + (Math.round(Math.random() * 2147483647) * guid) % 10000000000;
			}
			return {
				"module": "vkey.GetVkeyServer",
				"method": "CgiGetVkey",
				"param": {
					"guid": guid,
					"songmid": param.mids,
					"songtype": param.types,
					"uin": "" + MUSIC.widget.user.getUin(),
					"loginflag": MUSIC.widget.user.isLogin() ? 1 : 0,
					"platform": "23"
				}
			}
		};

		var params = {
			"comm":{  // 公共参数部分
			  "uin": MUSIC.widget.user.getUin()+"",
			  "ct": "24",  // ct说明 见 3.2.3 "ct字段说明"
			  "cv": "0",  // 调用方版本号
			  "gzip": "0",  // 抓包如果发现难以阅读，可以将该值改为"0"
			  "mcc": "460",
			  "mnc": "1"
			  }
		};
		var key_mid = "data_mid";
		var key_id = "data_id";

		if (mids.length) {
			params.data_mid = getSongCgiParams({
				"mids": mids,
				"types": midTypes
			});
		}
		if (ids.length) {
			params.data_id = getSongCgiParams({
				"ids": ids,
				"types": idTypes
			});
		}
		if (urlMids.length) {
			params.url_mid = getUrlCgiParams({
				"mids": urlMids,
				"types": midTypes
			});
		}
		var timeStart = new Date(), time;
		function dealWithSuccess(r){
			time = new Date() - timeStart;
				if (!r) {
					r = {};
				}
				var list = [];

				var dealList = function(ret){
					if (ret && ret.code != 0) {
						return true;
					} else if (ret && ret.data) {
						ret = ret.data && ret.data.tracks;
						if (isArray(ret)) {
							list = list.concat(ret);
						}
					}
				};
				var error;
				if (dealList(r.data_id) || dealList(r.data_mid)) {
					error = _def.ERR_GET_SONG_INFO;
				} else if (r.url_mid && r.url_mid.code != 0) {
					error = _def.ERR_GET_SONG_VKEY;
				}

				if (error) {
					_cb(error);
				} else {
					list = MUSIC.player.formatMusics(list, from);

					
					// 查询id歌曲的链接
					_cb(null, list);
				}
		}
		function _lowVersion() {
			var ua = navigator.userAgent.toLowerCase();
			var m = ua.match(/msie ([\d.]+)/);
			return m && parseInt(m[1]) < 10;
		}
		var post = jQueryAjax.post;
		if (_lowVersion()) {
			var jcb = 'getsonglist'+(Math.random() + '').replace('0.', '');
			jQueryAjax.jsonp({
				url : '//u.y.qq.com/cgi-bin/musicu.fcg?callback='+jcb,
				data : {data:JSON.stringify(params)},
				jsonpCallback : jcb,
				charset : 'utf-8',
				success: function (r) {
					dealWithSuccess(r);
				},
				error: function() {
					time = new Date() - timeStart;
					_cb();
				}
			});

		}else {
			post({
				url: "//u.y.qq.com/cgi-bin/musicu.fcg",
				type: "post",
				data: JSON.stringify(params),
				dataType: "json",
				success: function (r) {
					r = JSON.parse(r);
					dealWithSuccess(r);
				},
				error: function() {
					time = new Date() - timeStart;
					_cb();
				}
			});
		}
	} else {
		_cb();
	}
}
//用于辅助的全局变量
var g_user = MUSIC.user,
	uin,
	disstid,
	config = {
		dir : 0,
		container : $('#songlist'),
		tag : 'div',
		isAppend : false,
		specilData : null, 		 //用私有数据，而不是用cgi请求的情况
		byPaging : null, 			 //处理那个damn歌手单曲，按分页来拿数据，这样歌曲可以按需加载
		specialTpl : null,			 //用私有模板，即重载模板
		notJumpSingerDetail : false, //是否禁止跳转到歌手页
		notJumpAlbumDetail : false,	 //是否禁止跳转到专辑页
		removeModels : false			//是否移除旧model数据
	},
	reportType,//那个页面传过来的数据,用于上报用
	showDisabledTips = function(){
		MUSIC.popup.show('暂不提供该服务');
	},


	/**
	 * @ namespace mac  
	 */
	mac = {
		initSongListenCount : function(sl, g_mapCount, _max, cb){
			initSongListenCount(sl, g_mapCount, _max, cb);
		},
		/*
		*	@ method init
		*	@ params {object} args
		*		param详见上面的config
		*/
		init : function (args, callback) {
			//将参数跟config合并
			$.extend(config,args);

			//上报的参数配置 
			reportType = args.reportType || MUSIC.reportMap.songlist;
			
			uin = g_user.getUin();

			
			//生成歌曲列表
			songList.show();	
			callback&&callback();
		},
		getSongInfo : getSongInfo
	};

/**
 * 批量获取单曲收听量
 *
 * @param {Array} idlist 歌曲id列表
 * @param {Function} cb 成功回调
 *
 */
function getSongListenCount(idlist, cb){
	var data = {
			"songmidlist" : idlist.join("|"),
			"utf8" : 1
		};

	var _mapCount = {};
	MUSIC.jQueryAjax.jsonp({
		url : '//c.y.qq.com/splcloud/fcgi-bin/fcg_getsonglistenstatistic.fcg',
		data : data,
		charset : 'utf-8',
		success : function(json) {
			if (!!json && "code" in json && !(json.code)) {
				$(json.songlist).each(function(idx, song){
					_mapCount[song.songmid] = song.count;
				});
			}
			!!cb && cb(_mapCount);
		},
		error : function(){
			!!cb && cb(_mapCount);
		}
	});
};
/**
 * 初始化歌曲收听人数
 *
 *
 */
function initSongListenCount(sl, g_mapCount, _max, cb){
    var midlist = [], retSonglist = [];
    g_mapCount = g_mapCount || {};
	_max = _max || 0;

    $.each(sl, function(idx, item){
        midlist.push(item.songmid);
    });
    if(midlist.length <= 0){
        !!cb && cb({});
        return;
    }
    getSongListenCount(midlist, function(mapCount){
        $.extend(g_mapCount, mapCount);
        $.each(g_mapCount, function(k, v){
            _max = Math.max(_max, v);
        });
        $.each(sl, function(idx, item){
			retSonglist.push($.extend(item, {
				counts : parseInt(g_mapCount[item.songmid] * 5 / _max, 10)
			}));
        });
        !!cb && cb(retSonglist);
    });
};
/* @ constructor 单曲列表控件
*  @ return {function} 控件构造函数	 
*/
var favCache = null;
var songList = (function () {
	var g_songlist = [],
		g_mapSonglist = {},
		playlistModel_got = false,
		template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n<div class="mod_songlist_toolbar">\r\n\t<a href="javascript:;" class="mod_btn js_all_play"><i class="mod_btn__icon_play"></i>播放全部</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_fav"><i class="mod_btn__icon_add"></i>添加到</a>\r\n\t<a href="javascript:;" class="mod_btn js_all_down"><i class="mod_btn__icon_down"></i>下载</a>\r\n\t<a href="javascript:;" class="mod_btn js_batch"><i class="mod_btn__icon_batch"></i>批量操作</a>\r\n</div>\r\n<div class="mod_songlist">\r\n\t<ul class="songlist__header">\r\n\t\t<li class="songlist__header_name">歌曲</li>\r\n\t\t<li class="songlist__header_author">歌手</li>\r\n\t\t<li class="songlist__header_album">专辑</li>\r\n\t\t<li class="songlist__header_time">时长</li>\r\n\t</ul>\r\n\t<ul class="songlist__list">\r\n';
 var list = data.list;for (i = 0; i < list.length; i ++) { 
__p+='\r\n\t<li class="';
if(list[i].grp&&list[i].grp.length>0){
__p+='songlist__child';
}
__p+='" mid="'+
((__t=( list[i].songid ))==null?'':__t)+
'" ix="'+
((__t=( list[i].ix))==null?'':__t)+
'">\r\n\t\t<!-- \r\n\t\thover : songlist__item--hover\r\n\t\t偶数行：songlist__item--even \r\n\t\t-->\r\n\t\t<div class="songlist__item';
 if (!!(list[i].disabled)) {  
__p+=' songlist__item--disable ';
 } 
__p+='" onmouseover="this.className=\'songlist__item songlist__item--hover\'" onmouseout="this.className=\'songlist__item\'">\r\n\t\t    <div class="songlist__edit songlist__edit--check sprite">\r\n\t\t\t<input type="checkbox" class="songlist__checkbox"/>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__songname">\r\n\t\t\t<span class="songlist__songname_txt"><a href="javascript:;" title="'+
((__t=( list[i].songname ))==null?'':_.escape(__t))+
'">'+
((__t=( list[i].songname ))==null?'':_.escape(__t))+
'</a></span>\r\n\t\t\t\t\t    ';
if(list[i].isonly == 1){
__p+='\r\n\t\t\t\t\t\t<i class="songlist__icon songlist__icon_exclusive sprite" title="独家"></i>\r\n\t\t\t\t\t    ';
}
__p+='\r\n\t\t\t\t\t    ';
 if (!!list[i].vid) { 
__p+=' \r\n\t\t\t\t\t\t<a href="'+
((__t=( MUSIC.util.getMvUrl(list[i].vid)))==null?'':__t)+
'" class="songlist__icon songlist__icon_mv sprite" rel="noopener" target="_blank" title="MV"><span class="icon_txt">MV</span></a>\r\n\t\t\t\t\t    ';
 } 
__p+=' \r\n\t\t\t<div class="mod_list_menu">\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n\t\t\t\t<i class="list_menu__icon_play"></i>\r\n\t\t\t\t<span class="icon_txt">播放</span>\r\n\t\t\t    </a>\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_add"></i>\r\n\t\t\t\t<span class="icon_txt">添加到歌单</span>\r\n\t\t\t    </a>\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_down"></i>\r\n\t\t\t\t<span class="icon_txt">下载</span>\r\n\t\t\t    </a>\r\n\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享" aria-haspopup="true">\r\n\t\t\t\t<i class="list_menu__icon_share"></i>\r\n\t\t\t\t<span class="icon_txt">分享</span>\r\n\t\t\t    </a>\r\n\t\t\t</div>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__artist">\r\n\t\t\t';
for(var s = 0, sl = list[i].singer.length; s<sl; s++){ var singer = list[i].singer[s];
__p+='\r\n\t\t\t';
if(s>0){
__p+='/';
}
__p+='\r\n\t\t\t<a href="javascript:;" data-singermid="'+
((__t=( singer.mid ))==null?'':__t)+
'" data-singerid="'+
((__t=( singer.id ))==null?'':__t)+
'" title="'+
((__t=( singer.name ))==null?'':_.escape(__t))+
'" class="singer_name">'+
((__t=( singer.name ))==null?'':_.escape(__t))+
'</a>\r\n\t\t\t';
}
__p+='\r\n\t\t    </div>\r\n\t\t    <div class="songlist__album">\r\n\t\t\t<a data-albummid="'+
((__t=( list[i].albummid ))==null?'':__t)+
'" data-albumid="'+
((__t=( list[i].albumid ))==null?'':__t)+
'" href="javascript:;" title="'+
((__t=( list[i].albumname ))==null?'':_.escape(__t))+
'" class="album_name">'+
((__t=( list[i].albumname ))==null?'':_.escape(__t))+
'</a>\r\n\t\t    </div>\r\n\t\t    <div class="songlist__time">'+
((__t=( list[i].playTime ))==null?'':__t)+
'</div>\r\n\t\t    <div class="songlist__other">\r\n\t\t\t';
if(list[i].action.soso==1){
__p+='\r\n\t\t\t<a href="javascript:;" class="icon_sosomusic sprite">无版权</a>\r\n\t\t\t';
}
__p+='\r\n\t\t\t';
if(list[i].grp&&list[i].grp.length>0){
__p+='\r\n\t\t\t<button class="icon_song_group icon_song_group--up sprite"><span class="icon_txt" title="('+
((__t=( list[i].grp.length))==null?'':__t)+
')">展开</span></button>\r\n\t\t\t';
}
__p+='\r\n\t\t    </div>\r\n\t\t</div>\r\n\t\t';
if(list[i].grp&&list[i].grp.length>0){
__p+='\r\n\t\t<ul class="songlist__list" style="display:none;">\r\n\t\t';
for(var g = 0, gl = list[i].grp.length; g<gl; g++){var group = list[i].grp[g];
__p+='\t\t    <li mid="'+
((__t=( group.songid ))==null?'':__t)+
'" ix="'+
((__t=( group.ix))==null?'':__t)+
'">\r\n\t\t\t<div class="songlist__item';
 if (!!(group.disabled)) {  
__p+=' songlist__item--disable ';
 } 
__p+='" onmouseover="this.className=\'songlist__item songlist__item--hover\'" onmouseout="this.className=\'songlist__item\'">\r\n\t\t\t    <div class="songlist__edit sprite">\r\n\t\t\t\t<input type="checkbox" class="songlist__checkbox"/>\r\n\t\t\t    </div>\r\n\r\n\t\t\t    <div class="songlist__songname">\r\n\t\t\t\t<span class="songlist__songname_txt"><a href="javascript:;" title="'+
((__t=( group.songname ))==null?'':_.escape(__t))+
'">'+
((__t=( group.songname ))==null?'':_.escape(__t))+
'</a></span>\r\n\t\t\t\t<div class="mod_list_menu">\r\n\t\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n\t\t\t\t\t<i class="list_menu__icon_play"></i>\r\n\t\t\t\t\t<span class="icon_txt">播放</span>\r\n\t\t\t\t    </a>\r\n\t\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单" aria-haspopup="true">\r\n\t\t\t\t\t<i class="list_menu__icon_add"></i>\r\n\t\t\t\t\t<span class="icon_txt">添加到歌单</span>\r\n\t\t\t\t    </a>\r\n\t\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载" aria-haspopup="true">\r\n\t\t\t\t\t<i class="list_menu__icon_down"></i>\r\n\t\t\t\t\t<span class="icon_txt">下载</span>\r\n\t\t\t\t    </a>\r\n\t\t\t\t    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享" aria-haspopup="true">\r\n\t\t\t\t\t<i class="list_menu__icon_share"></i>\r\n\t\t\t\t\t<span class="icon_txt">分享</span>\r\n\t\t\t\t    </a>\r\n\t\t\t\t</div>\r\n\t\t\t    </div>\r\n\t\t\t    <div class="songlist__artist">\r\n\t\t\t\t';
for(var s = 0, sl = group.singer.length; s<sl; s++){ var singer = group.singer[s];
__p+='\r\n\t\t\t\t';
if(s>0){
__p+='/';
}
__p+='\r\n\t\t\t\t<a href="javascript:;" data-singermid="'+
((__t=( singer.mid ))==null?'':__t)+
'" data-singerid="'+
((__t=( singer.id ))==null?'':__t)+
'" title="'+
((__t=( singer.name ))==null?'':_.escape(__t))+
'" class="singer_name">'+
((__t=( singer.name ))==null?'':_.escape(__t))+
'</a>\r\n\t\t\t\t';
}
__p+='\r\n\t\t\t    </div>\r\n\t\t\t    <div class="songlist__album">\r\n\t\t\t<a data-albummid="'+
((__t=( group.albummid ))==null?'':__t)+
'" data-albumid="'+
((__t=( group.albumid ))==null?'':__t)+
'" href="javascript:;" title="'+
((__t=( group.albumname ))==null?'':_.escape(__t))+
'" class="album_name">'+
((__t=( group.albumname ))==null?'':_.escape(__t))+
'</a>\r\n\t\t\t    </div>\r\n\t\t\t    <div class="songlist__time">'+
((__t=( list[i].playTime ))==null?'':__t)+
'</div>\r\n\t\t\t    <div class="songlist__other">\r\n\t\t\t\t';
if(group.action.soso==1){
__p+='\r\n\t\t\t\t<a href="javascript:;" class="icon_sosomusic sprite">无版权</a>\r\n\t\t\t\t';
}
__p+='\r\n\t\t\t    </div>\r\n\t\t\t</div>\r\n\t\t    </li>\r\n\t\t    ';
}
__p+='\r\n\t\t</ul>\r\n\t\t';
}
__p+='\r\n\t\t</li>\r\n\t';
 } 
__p+='\r\n\t</ul>\r\n</div>';
return __p;
};
	var favModel = (function(){
		var setFav = function(idList){
			//MUSIC.client.likeSong(idList, 1);
			$(document).trigger("likeSong",idList,0);
		}
		var delFav = function(idList){
			//MUSIC.client.likeSong(idList, 0);
			$(document).trigger("unlikeSong",idList,0);
		}
		/*function combineData(list, callback){
			if (MUSIC.widget.user.getUin()<10000)
			{
				callback&&callback(list);
				return;
			}
			if (list.length>0&&!!list[0].fav){
				callback&&callback(list);
				return;
			}
			if (!!favCache)
			{
				for(var j = 0, jLen = list.length; j < jLen ; j++){
					if (list[j].mid in favCache.map) {
							list[j].fav = "mod_songname_menu__like--liked";		
					}else{
						list[j].fav = "1";
					}
				}
				callback&&callback(list);
				return;
			}
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getmyfav.fcg?callback=getFav&dirid=201&dirinfo=1',
				charset : 'utf-8',
				jsonpCallback : 'getFav',
				success : function(data) {
					if(data.code == 0){
						for(var j = 0, jLen = list.length; j < jLen ; j++){
							if (list[j].mid in data.map) {
									list[j].fav = "mod_songname_menu__like--liked";		
							}else{
								list[j].fav = "1";
							}
						}
					} else if(data.code == 12) {
					}
						callback&&callback(list);

					//等待添加完毕后，总的发布reset事件
					//that.trigger("reset",that);
				},
				error : function(){
					callback&&callback(list);
				}
			});
		}*/
		return {
			//combineData : combineData,
			delFav : delFav,
			setFav : setFav
		}
	})();
	var _cache = {};
	var songlistEvents  = (function () {
		function isArray(arr) 
		{ 
			return arr instanceof Array; 
		} 
		function getSongs(mid){
			var retArray = [];
			if (isArray(mid))
			{
				$.each(mid, function(idx, item){
					if (!!_cache[item]&&_cache[item].songid>0)
					{
						var one = _cache[item];one.ix = parseInt($('li[mid="'+one.songid+'"]', config.container).attr('ix'));
						retArray.push(one);
					}
				});
				return retArray;
			}else {
				if (!!_cache[mid]&&_cache[mid].songid>0)
				{
					var one = _cache[mid];
					one.ix = parseInt($('li[mid="'+one.songid+'"]', config.container).attr('ix'));
					retArray.push(one);
				}
				return retArray;
			}
		}
		function getsongInfo(id){
			return getSongs(id);
		}
		function getBatchSongs(){
			var $songs = $('div.songlist__edit--check', config.container), ids = [];
			$.each($songs, function(idx, item){
				ids.push($(item).parents('li').attr('mid'));
			});
			return getSongs(ids);
		}
		function getBatchAllSongs(){
			var $songs = $('li', config.container), ids = [];
			$.each($songs, function(idx, item){
				ids.push($(item).attr('mid'));
			});
			return getSongs(ids);
		}
		function cutSong(id, type, page){//type 0:play, 1:pause
			getSongInfo(getSongs(id), true, function(error, songlist){
				if (!!page&&page=='player')
				{
					config.actions.play(songlist, type, function(){});
				}else {
					MUSIC.player.play(songlist,1, null, null, reportType);//单曲播放
				}
			});
		}
		function gotoSong(id, stat){//{mid:, songtype:, shareuin:, disstid:}
			if (parseInt(id)>20000000000000)
			{
				cutSong(id);
				return false;
			}
			var songData = getSongs(id)[0], song = {mid:!!songData.songmid?songData.songmid:songData.songid};
			songData.songtype&&(song.songtype = songData.songtype);
			songData.songid&&(song.id = songData.songid);
			songData.shareuin&&(song.shareuin = songData.shareuin);
			songData.disstid&&(song.disstid = songData.disstid);
			!!stat&&(song.stat = stat);
			MUSIC.util.gotoSongdetail(song);
		}
		function share(e, id){
			
			getSongInfo(getSongs(id), true, function(error, songlist){
				if (songlist[0].action.share&&songlist[0].songtype!=5)
				{
					require.async("js/common/share.js", function(share){
							share.show({
								sharetype : 0,
								mid : songlist[0].songtype>0?songlist[0].songid:songlist[0].songmid,
								songtype : songlist[0].songtype
							}, e);
					});
				}else {
					require.async('js/common/showMsg.js', function(showMsg){
							showMsg(songlist[0]);
					});
					return;
				}
			});
		}
		function downloadSong(id){
			
			getSongInfo(getSongs(id), true, function(error, songlist){
				require.async("js/common/download.js", function(download){
					download.show(songlist);
				});
			});
		}
		function deleteSong(id, confirm) {
			var songs = getSongs(id);
			if (songs.length > 0) {
				if (!!confirm){
					showConfirm ('确定要删除该歌曲？ ', null, null, function() {
						var deleteItem = songs;
						afterDeleteRender(deleteItem, function () {
							$(document).trigger('delete', { data: deleteItem });
						});
					});
				}else {
					var deleteItem = songs;
					afterDeleteRender(deleteItem, function () {
						$(document).trigger('delete', { data: deleteItem });
					});
				}
			} else MUSIC.popup.show('请选择操作的单曲', 3000, 1);

		}
		function setFav(event, id){
			getSongInfo(getSongs(id), true, function(error, songlist){
				require.async("js/common/fav.js", function(fav){
					fav.show({
						sharetype : 0,
						songs : songlist
					}, event);
				});
			});
		}
		function chooseSong(id){
			alert('chooseSong'+JSON.stringify(getSongs(id)));
		}
		function gotoSinger(mid, stat){
			MUSIC.util.gotoSinger({singermid:mid, stat:stat});
		}
		function gotoAlbum(mid, stat){
			MUSIC.util.gotoAlbum({albummid:mid, stat:stat});
		}
		function playall(e){
			getSongInfo(getBatchSongs(), true, function(error, songlist){
				MUSIC.player.play(songlist,1, null, null, reportType);//play
			});
		}
		function downloadall(e){
			if (getBatchSongs().length>0)
			{
				getSongInfo(getBatchSongs(), true, function(error, songlist){
					require.async("js/common/download.js", function(download){
						download.show(songlist);
					});
				});
			}else MUSIC.popup.show('请选择操作的单曲', 3000, 1);
		}
		function favall(event){
			if (getBatchSongs().length>0)
			{
				getSongInfo(getBatchSongs(), true, function(error, songlist){
					require.async("js/common/fav.js", function(fav){
						fav.show({
							sharetype : 0,
							songs : songlist
						}, event);
					});
				});
			}else MUSIC.popup.show('请选择操作的单曲', 3000, 1);
		}
		function likeall(event){
			if (getBatchSongs().length>0)
			{
				getSongInfo(getBatchSongs(), true, function(error, songlist){
					require.async("js/common/fav.js", function(fav){
						fav.favToTaoge(songlist, 201, function(){});
					});
				});
			}else MUSIC.popup.show('请选择操作的单曲', 3000, 1);
		}
		
		function afterDeleteRender(deleteSongs, callback){
			//通过模板增加歌曲队列
			var addData = [], anotherCache={}, _map = {};
			$.each(deleteSongs, function(idx, item){
				_map[item.songid] = item.songid;
			});
			for (var i = 0, l = g_songlist.length; i<l; i++)
			{
				var item = g_songlist[i];
				if (!(item.songid in _map))
				{
					addData.push(item);
					anotherCache[item.songid] = item;
				}
			}
			addData = MUSIC.player.formatMusics(addData);
			g_songlist = addData;_cache = anotherCache;
			var _html = (config.specialTpl || template)({
					list : addData
				});
			config.container.html(_html);
			callback&&callback();
			
		}
		function deleteall(event, once) {
			if (getBatchSongs().length > 0 || !!once) {
				event.preventDefault();
				event.stopPropagation();
				var deleteList = getBatchSongs();
				var desc = '确定要删除歌曲？';
				if (once) {
					deleteList = getBatchAllSongs();
					desc = '确定要清空列表？';
				}
				if (deleteList.length > 0) {
					showConfirm(desc, null, null, function () {
						afterDeleteRender(deleteList, function () {
							$(document).trigger('delete', { data: deleteList });
						});
					});
				}
			} else MUSIC.popup.show('请选择操作的单曲', 3000, 1);
		}
		function setCurrentSongs($obj, event){
			if ($obj.hasClass('js_child'))
			{
				event.preventDefault();
				event.stopPropagation();
			}
			$('.songlist__item').removeClass('songlist__item--current');
			$obj.addClass('songlist__item--current');
		}
		return {
			setCurrentSongs : setCurrentSongs,
			cutSong : cutSong,
			gotoSong : gotoSong,
			share : share,
			downloadSong : downloadSong,
			deleteSong : deleteSong,
			setFav : setFav,
			chooseSong : chooseSong,
			gotoSinger : gotoSinger,
			gotoAlbum : gotoAlbum,
			playall : playall,
			downloadall : downloadall,
			favall : favall,
			likeall : likeall,
			deleteall : deleteall,
			getsongInfo : getsongInfo
		}
	})();
	function render(addData){
		//通过模板增加歌曲队列
		var num = config.isAppend?$(config.tag, config.container).length:0,
			_html = (config.specialTpl || template)({
				list : addData
			});
		//attention，这里是另一个重载，不同页面的渲染不一样，这里很关键
		if (config.isAppend) {
			config.container
				.append(_html);	
		}else if(config.isPreAppend){
			config.container
				.prepend(_html);	
		}
		else if(config.specilData && !config.byPaging){
			config.container
				.html(_html);	
		} else {
			config.container.html(_html);
			//MUSIC.client.playSongList(this.playFirstSong);
		} 
		config.callback&&config.callback();
		
	};

	function showSongList() {	
		//attention 注意这里，控件重载的一个地方，如果是从初始化函数传数据进来，就不需要通过cgi去获去	
		if(config.specilData){
			config.specilData = MUSIC.player.formatMusics(config.specilData, config.from==0?0:(config.from||g_songlist.length));
			setTimeout(function(){
				$.each(config.specilData, function(idx, item){
					if (item.songid||item.data.songid)
					{
						_cache[item.songid||item.data.songid] = item.data||item;
						$.each(item.grp, function(idx_grp, item_grp){
							_cache[item_grp.songid] = item_grp;
						});
					}
				});
			}, 0);
			var songData = MUSIC.player.formatMusics(config.specilData, config.from==0?0:(config.from||g_songlist.length));
			//假如登录了，合并我喜欢的歌单数据
			if (g_user.getUin()>10000) {
				require.async("js/common/fav.js", function(fav){
					fav.combineData(songData, function(data){
						if (config.isAppend)
						{
							g_songlist = g_songlist.concat(data);
						}else g_songlist = data;
						$.each(g_songlist, function(index, item){g_mapSonglist[item.songid] = item;})
						render(data);
					});
				});
			} else {
				if (config.isAppend)
				{
					g_songlist = g_songlist.concat(data);
				}else g_songlist = songData;
					$.each(g_songlist, function(index, item){g_mapSonglist[item.songid] = item;})
				render(songData);
			}
			return;
		}
	}
	
	// 模拟confirm
	function showConfirm (title, desc, btn, cb) {
		require.async("js/common/dialog.js", function(dialog){
			dialog.show({
				mode : "common",
				title : "QQ音乐",
				icon_type : 2,
				sub_title : title,
				desc : desc,
				button_info1 : {
					highlight : 1,
					title : btn || '确定',
					fn : function() {
						dialog.hide();
						cb && cb();
					}
				},
				button_info2 : {
					highlight : 0,
					title : "取消",
					fn : function(e){
						dialog.hide();
					}
				}
			});
		});
	};
	function bindEvents(){
		$('.mod_songname_menu__like').length
		var that = this, $songlist = config.container;
		config.container.on('cut', '', function(){
			return false;
		}).on('copy', '', function(){
			/*if (!MUSIC.userAgent.macs)
			{
				return false;
			}*/
		}).off('dblclick', 'li').on('dblclick', 'li', function(e){
			MUSIC.player.checkPlayerWindow();
			var targ = MUSIC.util.getTarget(e);
			if ($(targ).parents('.mod_list_menu').length>0)
			{
				return false;
			}
				var page = $(this).data('page');
				var id = $(this).attr("mid");
				if (!!page&&page=='player')
				{
					songlistEvents.cutSong(id, 0, page);
				}else
				songlistEvents.cutSong(id);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_play').on('click', '.js_play', function(e){
				MUSIC.player.checkPlayerWindow();
				var id = $(this).parents('li').attr("mid");
				var page = $(this).data('page');
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e );
				if (!!page&&page=='player')
				{
					var type = $('.list_menu__icon_pause', $(this)).length>0;
					songlistEvents.cutSong(id, type?1:0, page);
				}else
				songlistEvents.cutSong(id);
				
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_song').on('click', '.js_song', function(e){
				var id = $(this).parents('li').attr("mid");
				var stat = $(this).attr("data-stat");
				var page = $(this).data('page');
				if (!!page&&page=='player'){
					/*if ($(this).parents('div.songlist__item--playing').length==0)
					{
						$('.js_play', $(this).parents('li')).click();
						return false;
					}*/
					return false;
				}else{
					songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
					songlistEvents.gotoSong(id, stat);
				}
				return false;
			}).off('click', '.js_share').on('click', '.js_share', function(e){
				e.preventDefault();
				e.stopPropagation();
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'),e);
				var id = $(this).parents('li').attr("mid");
				songlistEvents.share(e, id);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_song_li').on('click', '.js_song_li', function(e){
				songlistEvents.setCurrentSongs($(this), e);
				return false;
			}).off('click', '.js_down').on('click', '.js_down', function(e){
				var id = $(this).parents('li').attr("mid");
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
				songlistEvents.downloadSong(id);
				
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_delete').on('click', '.js_delete', function(e){
				var id = $(this).parents('li').attr("mid");
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
				var confirm = $(this).data('confirm')||'';
				songlistEvents.deleteSong(id, confirm);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_fav').on('click', '.js_fav', function(e){
				var id = $(this).parents('li').attr("mid");
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
				songlistEvents.setFav(e, id);
				
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.singer_name').on('click', '.singer_name', function(e){
				var singermid = $(this).data("singermid");
				var singerid = $(this).data("singerid");
				var stat = $(this).data("stat");
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
				if (singerid>0)
				{
					songlistEvents.gotoSinger(singermid, stat);
				}
				return false;
			}).off('click', '.album_name').on('click', '.album_name', function(e){
				var albummid = $(this).data("albummid");
				var albumid = $(this).data("albumid");
				var stat = $(this).data("stat");
				songlistEvents.setCurrentSongs($(this).parents('div.songlist__item'), e);
				if (albumid>0)
				{
					songlistEvents.gotoAlbum(albummid, stat);
				}
				return false;
			}).off('click', 'input.songlist__checkbox').on('click', 'input.songlist__checkbox', function(e){
			$(this).parents('.songlist__edit').toggleClass('songlist__edit--check');
			if ($(this).hasClass('js_check_all'))
			{
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				if ($(this).parents('.songlist__edit').hasClass('songlist__edit--check'))
				{
					$('input.songlist__checkbox').parents('.songlist__edit').addClass('songlist__edit--check');
				}else $('input.songlist__checkbox').parents('.songlist__edit').removeClass('songlist__edit--check');
			}else {
				if (!$(this).parents('.songlist__edit').hasClass('songlist__edit--check'))
				{
					$('input.js_check_all').parents('.songlist__edit').removeClass('songlist__edit--check');
				}
			}
			return false;
		});
		$(document).on('cut', '', function(){
			return false;
		}).on('copy', '', function(ev){
			/*var _target = MUSIC.util.getTarget(ev);
			if ($(_target).parents('.mod_comment').length==0){
				if (!MUSIC.userAgent.macs)
				{
					return false;
				}
			}*/
			//
		}).off('click', '.js_all_play').on('click', '.js_all_play', function(e){
				MUSIC.player.checkPlayerWindow();
				songlistEvents.playall(e);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_all_down').on('click', '.js_all_down', function(e){
				songlistEvents.downloadall(e);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_all_fav').on('click', '.js_all_fav', function(e){
				songlistEvents.favall(e);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_all_like').on('click', '.js_all_like', function(e){
				songlistEvents.likeall(e);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_all_delete').on('click', '.js_all_delete', function(e){
				songlistEvents.deleteall(e);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_all_deleted').on('click', '.js_all_deleted', function(e){//一键删除
				songlistEvents.deleteall(e, true);
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				return false;
			}).off('click', '.js_batch').on('click', '.js_batch', function(e){
			var stat = $(this).data('stat')||'';
			!!stat&&statistics.pgvClickStat(stat);
			var $mod_songlist = $('.mod_songlist', config.container);
			if ($mod_songlist.length<=0)
			{
				$mod_songlist = config.container.parents('.mod_songlist');
			}
			$mod_songlist.toggleClass('mod_songlist--edit');
			if ($mod_songlist.hasClass('mod_songlist--edit'))
			{	
				$('.songlist__edit').addClass('songlist__edit--check');
				$('.songlist__edit').show();$('.js_foot_batch').show();
				$(this).html('<i class="mod_btn__icon_batch"></i>取消批量操作');
			}else {
				$('.songlist__edit').hide();$('.js_foot_batch').hide();
				$(this).html('<i class="mod_btn__icon_batch"></i>批量操作');
				$('div.songlist__edit').addClass('songlist__edit--check');
				$('li.js_songlist__child ul.songlist__list div.songlist__edit', config.container).removeClass('songlist__edit--check');
			}
			return false;
		}).off('click', 'input.songlist__checkbox').on('click', 'input.songlist__checkbox', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.songlist__edit').toggleClass('songlist__edit--check');
			if ($(this).hasClass('js_check_all'))
			{
				var stat = $(this).data('stat')||'';
				!!stat&&statistics.pgvClickStat(stat);
				if ($(this).parents('.songlist__edit').hasClass('songlist__edit--check'))
				{
					$('input.songlist__checkbox').parents('.songlist__edit').addClass('songlist__edit--check');
				}else $('input.songlist__checkbox').parents('.songlist__edit').removeClass('songlist__edit--check');
			}else {
				if (!$(this).parents('.songlist__edit').hasClass('songlist__edit--check'))
				{
					$('input.js_check_all').parents('.songlist__edit').removeClass('songlist__edit--check');
				}
			}
			return false;
		}).off('click', '.icon_sosomusic').on('click', '.icon_sosomusic', function(e){
			var id = $(this).parents('li').attr("mid");
			var _this = this;
			var music = songlistEvents.getsongInfo(id)[0];
			function showTips(content){
				if ($('#js_sosopopup').length<=0)
				{
					$('body').append('<div class="popup_data_detail songlist_tips" id="js_sosopopup" style="display:none;position:absolute;"></div>');
				}
				$('#js_sosopopup').html('   <div class="popup_data_detail__cont">'
							   +  '       <p>'+music.songname.HtmlEncode()+'</p>'
							   +content
								+ '   </div>'
							   +  '   <i class="popup_data_detail__arrow"></i>').css({top:e.pageY+15,left:e.pageX-255}).show();
				$(document).on('click', function(ev){
					var _target = MUSIC.util.getTarget(ev);
					if ($(_target).parents('div.popup_data_detail__cont').length>0||$(_target).hasClass('popup_data_detail__cont')||$(_target).hasClass('icon_sosomusic'))
					{
						return false;
					}
					$('#js_sosopopup').hide();
				})
			}
			if (music.msgid == 26)
			{	
				var _d = {};
				$.extend(_d, music);_d.alertid = 0;
				require.async('js/common/showMsg.js', function(showMsg){
					showMsg(_d, null, null, function(m){
						var content = '       <p class="c_tx_thin">来源：'+m+'</p>'
						showTips(content);
					});
				});
			}else 
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/soso/fcgi-bin/music_geturl.fcg?n=1&w='+encodeURIComponent(music.songname + ' ' + music.singer[0].name),
				data : {},
				charset : 'utf-8',
				success : function (data) {
					var baiduMap = {1644649:20752568, 1644638:20752505};
					function getSearchUrl(_data){
						if (!_data.stream) {
							_data.stream = 0;
						}
						var StreamIPLongTail = ["116.28.66.253", "116.28.63.250", "116.28.63.250",
							"116.28.66.253", "121.9.210.27", "121.9.210.27",
							"121.9.210.102", "121.9.210.102", "121.9.210.27",
							"121.9.210.102"];
						_data.stream = parseInt(_data.stream, 10);
						return (_data.stream - 1 < 0 && !/\.weiyun\./.test(_data.mshowurl)) ? _data.mshowurl : "http://" + StreamIPLongTail[_data.stream] + "/" + (parseInt(_data.songid)+30000000) + ".mp3";
					}
					var songurl = '';
					if (parseInt(music.songid) == 1644649 || parseInt(music.songid) == 1644638) {
						songurl = "http://play.baidu.com/?__m=mboxCtrl.playSong&__a="+baiduMap[music.songid]+"&__o=/||newIcon";;
					} else {
						songurl = (data.data && data.data.url) || getSearchUrl(music);
					}
					var content = '<p class="c_tx_thin">来源：'+songurl+'</p>'
								   +  '       <p class="c_tx_thin">该歌曲来自第三方网站</p>'
					showTips(content);
					
				},
				error : function() {
				}
			});
		});
		;
		setTimeout(function(){
			$(document).off('click', '.icon_song_group').on('click', '.icon_song_group', function(e){
				e.preventDefault();
				e.stopPropagation();
				if ($(this).hasClass('icon_song_group--up'))
				{
					$(this).removeClass('icon_song_group--up');
					$(this).addClass('icon_song_group--down');
					$(this).parents('li').addClass('songlist__child');
					$('ul.songlist__list', $(this).parents('li')).show();
				}else {
					$(this).addClass('icon_song_group--up');
					$(this).removeClass('icon_song_group--down');
					$(this).parents('li').removeClass('songlist__child');
					$('ul.songlist__list', $(this).parents('li')).hide();
				}
				return false;
			})
			window.song_group = function(o, e){
				try
				{
					e.preventDefault();
					e.stopPropagation();
				}
				catch (error)
				{
				}
				if ($(o).hasClass('icon_song_group--up'))
				{
					$(o).removeClass('icon_song_group--up');
					$(o).addClass('icon_song_group--down');
					$(o).parents('li').addClass('songlist__child');
					$('ul.songlist__list', $(o).parents('li')).show();
				}else {
					$(o).addClass('icon_song_group--up');
					$(o).removeClass('icon_song_group--down');
					$(o).parents('li').removeClass('songlist__child');
					$('ul.songlist__list', $(o).parents('li')).hide();
				}
				return false;
			};
		}, 800);
		//绑定按需加载 以及 重新定位可视区域高度
		//$(window)
		//	.bind("scroll",this.getMoreData)
		//	.bind("resize",this.getClientHeight);
		//绑定快捷键,以及右键操作
		/*document.body.addEventListener("click",function(e){
			$('.mod_operate_menu').hide();
		});*/
	}
	return {
		/*
		*	@ method 
		*	@ attention  这里是另一个重载,如果页面有传数据过来，表示不是歌单页，单面不需要setDir
		*/
		show : function () {
			bindEvents();
			showSongList();
		}
	};

})();



return mac;

});