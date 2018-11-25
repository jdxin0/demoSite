define('js/common/music.js', function(require, exports, module){

/**
 * @fileoverview MUSIC 音乐底层库类
 * @author MUSICWebGroup
 * @version 1.0
 */
var w = window, MUSIC = {};
var $ = require("js/common/music/jquery.js");

window.$ = $;
window.jQuery = $;
//检测是不是低版本浏览器，是的话升级
setTimeout(function(){
	require.load("//stdl.qq.com/stdl/qb/js/qblog.js?max_age=2592000&v=20180702", function(){
		require.load("//stdl.qq.com/stdl/qqbrowser/floatlayer/yqq.js?max_age=2592000&v=20180702", function(){
			try{
				if (!!$.qbRecommand){
					$.qbRecommand({title:'QQ音乐',minVersion:9,qrHref:"https://y.qq.com/portal/yqqImg.png"});
				}
			}
			catch (e){
			}
		});

	});
}, 500);
var lazyload = require("js/common/music/jquery.lazyload.js"),
    json2 = require("js/common/music/json2.js"),
    jstorage = require("js/common/music/jstorage.js"),
    statistics = require("js/common/statastic.js"),
    cookie = require("js/common/music/cookie.js"),
    user = require("js/common/user.js"),
    player = require("js/common/player.js"),
	SPD = require("js/common/spd.js");
MUSIC.$ = $;	
MUSIC.jQueryAjax = require('js/common/jQueryAjax.js');
MUSIC.config = require('js/common/config.js');
MUSIC.popup = require('js/common/popup.js');
MUSIC.userAgent = require('js/common/userAgent.js');

MUSIC.statistics = statistics;
MUSIC.widget = MUSIC.widget || {};
MUSIC.widget.Storage = require('js/common/music/storage.js');
MUSIC.cookie = cookie;
MUSIC.widget.user = user;
var g_storage =  MUSIC.widget.Storage;
var g_user = MUSIC.widget.user;
MUSIC.getACSRFToken = cookie.getACSRFToken;
MUSIC.user = {};
MUSIC.user.getUin = user.getUin;
window.setStatCookie = function(){
	MUSIC.cookie.set('yqq_stat', 1);
}
//本地缓存歌曲操作类
MUSIC.player_storage = player.storage;

/**
* MUSIC 播放器操作类
* 
* @namespace MUSIC.player
* @author lunardai
* @description 解析单曲信息
*/
MUSIC.player = player;


/**
   * FormSender通信器类,建议写操作使用
   */
w.MUSIC = w.MUSIC || {};
MUSIC.FormSender = require("js/common/music/formsender.js");

MUSIC.dom = MUSIC.dom || {};
MUSIC.dom.createNamedElement = function(type, name, doc) {
	var _doc = doc || document,
		element;

	try {
		element = _doc.createElement('<' + type + ' name="' + name + '">');
	} catch (ign) {}

	if (!element) {
		element = _doc.createElement(type);
	}

	if (!element.name) {
		element.name = name;
	}
	return element;
}


/**
 * 通用扩展接口
 *
 * @namespace 通用扩展接口
 */
 
var getType = function (obj){return obj===null?'null':(obj===undefined?'undefined':Object.prototype.toString.call(obj).slice(8,-1).toLowerCase());};
MUSIC.util = {
	/**
	 * 当前IE8 不允许在回调中访问 window.location.href
	 * @type {string}
	 */
	gLocation : "",//window.location.href,

	/**
	 * 使用一个uri串制作一个类似location的对象
	 *
	 * @param {String} s 所需字符串
	 *
	 * @return MUSIC.util.URI
	 * @see MUSIC.util.URI
	 */
	buildUri : function(s) {
		return new MUSIC.util.URI(s);
	},

	/**
	 * 使用一个uri串制作一个类似location的对象
	 *
	 * @param {String} s 所需字符串
	 * @class URI 引擎，可以把一个uri字符串转换成类似location的对象
	 * @constructor
	 */
	URI : function(s) {
		
		if (!(getType(s) == "string")) {
			return null;
		}
		if (s.indexOf("://") < 1) {
			s = location.protocol + "//" + location.host + (s.indexOf("/") == 0 ? "" : location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1)) + s;
		}
		var depart = s.split("://");
		if (getType(depart) == "array" && depart.length > 1 && (/^[a-zA-Z]+$/).test(depart[0])) {
			this.protocol = depart[0].toLowerCase();
			var h = depart[1].split("/");
			if (getType(h) == "array") {
				this.host = h[0];
				this.pathname = "/" + h.slice(1).join("/").replace(/(\?|\#).+/i, ""); // 修正pathname的返回错误
				this.href = s;
				var se = depart[1].lastIndexOf("?"), ha = depart[1].lastIndexOf("#");
				this.search = (se >= 0) ? depart[1].substring(se+1) : "";
				this.hash = (ha >= 0) ? depart[1].substring(ha+1) : "";
				if (this.search.length > 0 && this.hash.length > 0) {
					if (ha < se) {
						this.search = "";
					} else {
						this.search = depart[1].substring(se, ha);
					}
				}
				return this;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	/**
	 * 将一个http参数序列变为hash表
	 *
	 * @param {String} s 源字符串
	 * @return {Object} 结果
	 * @example
	 * 			MUSIC.util.splitHttpParamString(s);
	 */
	splitHttpParamString : function(s) {
		return MUSIC.util.commonDictionarySplit(s, "&");
	},

	/**
	 * 将一个参数序列变为hash表
	 *
	 * @param {String} s 源字符串
	 * @param {String} esp 项分隔符
	 * @param {String} vq 值封套
	 * @return {Object} 结果
	 * @example
	 * 			MUSIC.util.commonDictionarySplit(s,esp,vq);
	 */
	commonDictionarySplit : function(s, esp, vq, eq) {
		var res = {};
		if(!s || typeof(s) != "string"){
			return res;
		}
		if (typeof(esp) != 'string') {
			esp = "&";
		}
		if (typeof(vq) != 'string') {
			vq = "";
		}
		if (typeof(eq) != 'string') {
			eq = "=";
		}

		var l = s.split(vq + esp),
			len = l.length,
			tmp,
			t = eq + vq,
			p;

		if(vq){
			tmp = l[len - 1].split(vq);
			l[len - 1] = tmp.slice(0, tmp.length - 1).join(vq);
		}

		for (var i = 0, len; i < len; i++) {
			if(eq){
				tmp = l[i].split(t);
				if (tmp.length > 1) {
					res[tmp[0]] = tmp.slice(1).join(t);
					continue;
				}
			}
			res[l[i]] = true;
		}

		return res;
	},
	/**
	 * 获取当前页url参数
	 *
	 * @return {Object} 结果
	 * @example
	 * 			MUSIC.util.getUrlParam();
	 *
	 */
	getUrlParams : function(url) {
		var res = {},
			uri = this.buildUri(url||window.location.href);
		$.extend(res, this.splitHttpParamString(uri.hash));
		$.extend(res, this.splitHttpParamString(uri.search));
		return res;
	},
	getParameterNew : function(name){
		var url = window.location.href;
		var r = new RegExp("(\\?|#|&)" + name + "=([^&#\\?]*)(&|#|$|\\?)");
		var m = url.match(r);
		if ((!m || m == "")){
			m = window.location.href.match(r);
		}
		return (!m ? "" : m[2]);
	},
	/**
	 * 构造url参数
	 * @parem {Object} 参数映射 args
	 * @return {String} 结果
	 */
	buildArgs : function(args) {
		var buf = [];
		for(var key in args){
			var value = args[key];
			if(typeof value == 'string'){
				buf.push(key+'='+value);
			}
		}
		return buf.join('&');
	},/**
	 * hashchange 初始化
	 * @param {String} replaceUrl 替换默认上报的页面url，默认为不替换
	*/
	 hashChangeInit : function (replaceUrl, callback){
		setTimeout(function(){
			if (typeof(replaceUrl) === "function") {
				callback = replaceUrl;
				replaceUrl = undefined;
			}
			replaceUrl = replaceUrl || undefined;
			//replaceUrl && player.saveUrl(3, replaceUrl, 1);

			var curHash = window.location.hash;
			function getHashParams() {
				return MUSIC.util.getUrlParams(window.location.href);
			}
			if ('onhashchange' in window){
				window.onhashchange = function(){
					var obj = getHashParams();
					callback(obj);
				};
			} else {
				var intv = setInterval(function() {
					if (window.location.hash != curHash){
						var obj = getHashParams();
						callback(obj);
						curHash = window.location.hash;
					}
				}, 100);
			}
		}, 0);
	},
  /*
   * 更新页面hash
   *
   * @parem {Object} hash值映射 mapValue
   */
  updateHash : function(hash_value) {
	var url = window.location.href.replace(new RegExp("(#)+.*"), "")
		, curHash = window.location.hash.replace("#", "")
		, r = undefined;

	if (!$.isPlainObject(hash_value) || JSON.stringify(hash_value) == "{}") {
		return;
	}

	$.each(hash_value, function(h, v){
		r = new RegExp(h + "=[^&]+", "i");
		if (curHash.indexOf(h) < 0&&v!='') {
			curHash  = [h, "=", v, "&"].join("") + curHash;
		}
		if (v=='')
		{
		curHash = curHash.replace(r, '');
		}else
		curHash = curHash.replace(r, [h, "=", v].join(""));
	});
	//cs.p(curHash);
	window.location.hash = curHash;
	window.location.replace(url + "#" + curHash);

  },
	/**
	 * 将Date对象格式化 YYYY-MM-DD 格式的字符串
	 */
	toYMDString: function (dateVal) {
		if (!dateVal) {
			return '';
		}
		dateVal = new Date(dateVal);
		if (dateVal == 'Invalid Date') {
			return '0000-00-00';
		}
		var y = dateVal.getFullYear();
		var m = dateVal.getMonth() + 1;
		var d = dateVal.getDate();
		return (y + "-" + (m < 10 ? ("0" + m) : m) + "-" + (d < 10 ? ("0" + d) : d));
	},
  /**
   * 格式化时间串
   *
   * @param {String} iTime 源时间戳
   * @param {String} esp 项分隔符
   * @param {String} vq 值封套
   * @return {Object} 结果
   * @example
   *      MUSIC.util.commonDictionarySplit(s,esp,vq);
   */
  formatTime : function(dateVal){
		if (!dateVal) {
			return '';
		}
		dateVal = new Date(dateVal);
		if (dateVal == 'Invalid Date') {
			return '';
		}
		var y = dateVal.getFullYear();
		var m = dateVal.getMonth() + 1;
		var d = dateVal.getDate();
		return (y + "年" + (m) + "月" + (d)+"日");
  },
	
	/**
	 * 获取mid图片路径
	 *	op = {
	 *		mid : albummid,
	 *		type :尺寸, //58 68 90 120 126 150 180 300 500 800
	 *      page : album\singer
	 *	}
	*/
	getMidPic : function(op){
		op = op || {};
		var url = '//y.gtimg.cn/mediastyle/macmusic_v4/extra/default_cover.png?max_age=31536000' , type = op.page, size = op.type, mid = op.mid;
		if (window.devicePixelRatio&&parseInt(window.devicePixelRatio)>1)
		{
			if (size == 150)
			{
				size = 300;
			}
			if (size == 68 || size == 90)
			{
				size = 150;
			}
		}
		//mid
		/*if (typeof(mid) !== 'undefined' && mid !== "" && mid !== "0") {
			s1 = mid.substr(mid.length-2, 1);
			s2 = mid.substr(mid.length-1, 1);
			picRtn = '//i.gtimg.cn/music/photo/mid_'+(op.page || 'album')+'_'+(op.type || 150)+'/'+s1+'/'+s2+'/'+mid+'.jpg'
		}*/
		if (typeof mid == 'string' && mid.length>=14) { //字符串mid 走photo_new新逻辑
			type = (type=='album'?'T002':(type=='singer'?'T001':type));
			url = '//y.gtimg.cn/music/photo_new/'+type+'R'+(size || 68)+'x'+(size || 68)+'M000'+mid+'.jpg?max_age=2592000';
		}else if(mid>0){ //数字id
			url='//y.gtimg.cn/music/photo/'+type+'_'+ (size || 68) +'/'+(mid%100)+'/'+ (size || 68) +'_'+type+'pic_'+mid+'_0.jpg?max_age=2592000';
		}
		
		return url;
	},
	/**
	 * 获取专辑mid图片路径
	 *	op = {
	 *		mid : albummid,
	 *		type :尺寸
	 *	}
	*/
	getAlbumPic : function(op){
		op.page = 'album';
		return MUSIC.util.getMidPic(op);
	},
	/**
	 * 获取singermid图片路径
	 *	op = {
	 *		mid : singermid,
	 *		type :尺寸
	 *	}
	*/
	getSingerPic : function(op){
		op.page = 'singer';
		return MUSIC.util.getMidPic(op);
	},
	getPageTarget : function(){
		var url = window.location.href;
		if (window.location.href.indexOf('player.html')!=-1||window.location.href.indexOf('player_radio.html')!=-1)
		{
			return '_blank';
		}else return '_self';
	},
	getProtocol : function(){
		return window.location.protocol;
	},
	gotoSinger : function(opt){
		var url = '//y.qq.com/n/yqq/singer/'+opt.singermid+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		if (opt.singerid>0)
		{
			url = '//y.qq.com/n/yqq/singer/'+opt.singerid+'_num.html'+(!!opt.stat?('#stat='+opt.stat):'')
		}
		if (opt.tab in {'song':1, 'album':1, 'mv':1})
		{
			url = url+(url.indexOf('#')==-1?'#':'&')+'tab='+opt.tab
		}
		url = MUSIC.util.getProtocol()+url;
		if ((!opt.singermid||!!opt.singermid&&opt.singermid=='0032fmHO2UDnV3')&&opt.singerid<=0)
		{
			return false;
		}
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);} var w = window.open(url, opt.target||MUSIC.util.getPageTarget());if(w)w.opener = null;
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	getSingerUrl : function(opt){
		var mid = opt.singermid||opt.mid, id=opt.singerid||opt.id;
		var url = '//y.qq.com/n/yqq/singer/'+mid+'.html';
		if (!(mid)&&(id>0))
		{
			url = '//y.qq.com/n/yqq/singer/'+(id)+'_num.html'
		}
		if ((!mid||!!mid&&mid=='0032fmHO2UDnV3')&&id<=0)
		{
			return "javascript:;";
		}
		url = MUSIC.util.getProtocol()+url;
		return url;
	},
	getMvUrl : function(vid, type){
		if (!type){
			return MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/mv/v/'+vid+'.html';
		}else {
			return MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/mv/m/'+vid+'.html';
		}
	},
	getPlaylistUrl : function(id, playsquare){
		if (!!playsquare){
			return MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/playsquare/'+id+'.html';
		}else
		return MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/playlist/'+id+'.html';
	},
	getToplistUrl : function(id){
		return MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/toplist/'+id+'.html';
	},
	gotoToplist : function(opt){
		var url = '//y.qq.com/n/yqq/toplist/'+opt.id+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		url = MUSIC.util.getProtocol()+url;
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}var w = window.open(url, MUSIC.util.getPageTarget());if(w)w.opener = null;
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	gotoAlbum : function(opt){
		var url = '//y.qq.com/n/yqq/album/'+opt.albummid+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		url = MUSIC.util.getProtocol()+url;
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}var w = window.open(url, opt.target||MUSIC.util.getPageTarget());if(w)w.opener = null;
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	getAlbumUrl : function(opt){
		var url = MUSIC.util.getProtocol()+'//y.qq.com/n/yqq/album/'+opt.albummid+'.html';
		return url;
	},
	gotoSongdetail : function(opt){
		var url = '';
		opt.mid = opt.songmid ||opt.mid;opt.songmid = opt.mid;
		if (!opt.songmid&&!opt.id||opt.id>1000000000000000||opt.songtype == 5)//!opt.songmid&&!opt.songid||opt.songid>1000000000000000||opt.songtype == 5
		{
			return false;
		}else {
			!!opt.songmid&&(url = '//y.qq.com/n/yqq/song/'+opt.songmid+'.html'+(!!opt.stat?('#stat='+opt.stat):''));
			!opt.songmid&&!!opt.songid && (url = '//y.qq.com/n/yqq/song/'+opt.songid+'_num.html');
			opt.songtype&&(opt.songtype!=1&&opt.songtype!=11&&opt.songtype!=13&&opt.songtype!=3)&&(url = '//y.qq.com/n/yqq/song2/'+opt.songtype+'/'+(opt.songmid||opt.id)+'.html'+(!!opt.stat?('#stat='+opt.stat):''))
			opt.songtype&&(opt.songtype==111||opt.songtype==112||opt.songtype==113)&&(url = '//y.qq.com/n/yqq/song2/'+opt.songtype+'/'+(opt.songmid||opt.id)+'.html'+(!!opt.stat?('#stat='+opt.stat):''))
			opt.disstid&&opt.songtype&&(url = '//y.qq.com/n/yqq/song3/'+opt.songtype+'/'+opt.disstid+'/'+(opt.songmid||opt.id)+'.html'+(!!opt.stat?('#stat='+opt.stat):''));
		//	opt.songtype&&(url += ('&songtype='+opt.songtype));
		//	opt.shareuin&&(url += ('&shareuin='+opt.shareuin));
		//	opt.disstid&&(url += ('&disstid='+opt.disstid));
			url = MUSIC.util.getProtocol()+url;
			if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}var w = window.open(url, opt.target||MUSIC.util.getPageTarget());if(w)w.opener = null;
			MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
			return false;
		}
	},
	getSongUrl : function(opt){
		var url = '';
		if (!opt.songmid&&!opt.songid||opt.songid>1000000000000000||opt.songtype == 5)
		{
			return 'javascript:;';
		}else {
			!!opt.songmid&&(url = '//y.qq.com/n/yqq/song/'+opt.songmid+'.html');
			!opt.songmid&&!!opt.songid && (url = '//y.qq.com/n/yqq/song/'+opt.songid+'_num.html');
			opt.songtype&&(opt.songtype!=1&&opt.songtype!=11&&opt.songtype!=13&&opt.songtype!=3)&&(url = '//y.qq.com/n/yqq/song2/'+opt.songtype+'/'+opt.songid+'.html');
			opt.songtype&&(opt.songtype==111||opt.songtype==112||opt.songtype==113)&&(url = '//y.qq.com/n/yqq/song2/'+opt.songtype+'/'+opt.songid+'.html');
			opt.disstid&&opt.songtype&&(url = '//y.qq.com/n/yqq/song3/'+opt.songtype+'/'+opt.disstid+'/'+opt.songid+'.html');
			url = MUSIC.util.getProtocol()+url;
			return url;
		}
	},
	getUserUrl : function(opt){
		var url = MUSIC.util.getProtocol()+"//y.qq.com/portal/profile.html?uin="+opt.uin+(!!opt.stat?('#stat='+opt.stat):'');
		return url;
	},
	gotoMvdetail : function(opt){
		var url = '//y.qq.com/n/yqq/mv/v/'+opt.vid+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		if (opt.cid)
		{
			url = '//y.qq.com/n/yqq/mv/c/'+opt.cid+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		}else if(!!opt.type){
			url = '//y.qq.com/n/yqq/mv/m/'+opt.vid+'.html'+(!!opt.stat?('#stat='+opt.stat):'');
		}
		url = MUSIC.util.getProtocol()+url;
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}var w= window.open(url, opt.target||"_blank");if(w)w.opener = null;
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	gotoTaogedetail : function(opt){
		var url = '//y.qq.com/n/yqq/playlist/'+opt.disstid+'.html';
		if (!!opt.dirid)
		{
			url += '?dirid='+opt.dirid;
		}
		url = MUSIC.util.getProtocol()+url;
		url = url +(!!opt.stat?('#stat='+opt.stat):'')
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}var w = window.open(url, opt.target||MUSIC.util.getPageTarget());if(w)w.opener = null;
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	gotoUser : function(opt){
		if(!!opt.stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}
		if (!!opt.target&&opt.target=='_blank')
		{
			var w = window.open(MUSIC.util.getProtocol()+"//y.qq.com/portal/profile.html?uin="+opt.uin+(!!opt.stat?('#stat='+opt.stat):''), MUSIC.util.getPageTarget());if(w)w.opener = null;
		}else {
			location.href=MUSIC.util.getProtocol()+"//y.qq.com/portal/profile.html?uin="+opt.uin+(!!opt.stat?('#stat='+opt.stat):'');
		}
		MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		return false;
	},
	gotoprofile : function(tab, stat){
		if(!!stat){MUSIC.cookie.set('yqq_stat', 1);}else{MUSIC.cookie.set('yqq_stat', 0);}
		if (location.href.indexOf('profile.html')!=-1&&(!(MUSIC.util.getUrlParams().uin)||(MUSIC.util.getUrlParams().uin) == (g_user.getUin()+'')))
		{
			$('#'+tab+'_tab').click();
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
		}else {
			location.replace(MUSIC.util.getProtocol()+"//y.qq.com/portal/profile.html?tab="+tab+(!!stat?("#stat="+stat):''));
			MUSIC.userAgent.ie==8&&$('a').attr('href', 'javascript:;');
		}
		return false;
	},
	getTarget : function(e){
		var targ = null;
		if(e.target){
			targ=e.target;
		}else if(e.srcElement){
			targ=e.srcElement;
		};
		return targ;
	},
	supportCss3 : function(style) { 
		var prefix = ['webkit', 'Moz', 'ms', 'o'], i, humpString = [], htmlStyle = document.documentElement.style, 
		_toHumb = function (string) { 
			return string.replace(/-(\w)/g, function ($0, $1) { 
				return $1.toUpperCase(); 
			}); 
		}; 
		for (i in prefix) 
			humpString.push(_toHumb(prefix[i] + '-' + style)); 
		 
		humpString.push(_toHumb(style)); 
		 
		for (i in humpString) 
			if (humpString[i] in htmlStyle) return true; 
		 
		return false; 
	},
	convertUrl : function(url, cb){
		MUSIC.jQueryAjax.jsonp({
			url : MUSIC.util.getProtocol()+'//c.y.qq.com/rsc/fcgi-bin/fcg_url_convert.fcg',
			data : {
				cid : 205361801,
				reqtype : 0,
				qrcode : 1,
				needimage : 0,
				size : 200,
				margin : 1,
				url : url
			},
			charset : 'utf-8',
			success : function(d) {
				if (d&&d.code == 0&&d.data)
				{
					cb&&cb(d.data);
				}else 
					cb&&cb({url:'', qrcode:''});
			},
			error : function(){
					cb&&cb({url:'', qrcode:''});
			}
		});
	},
	str2TimeStamp : function(datestr){
		if(typeof(datestr) != 'string'){
			//alert('时间格式错误！');
			return 0;
		}
		var new_str = datestr.replace(/:/g,"-");
		new_str = new_str.replace(/ /g,"-");
		var arr = new_str.split("-");
		if(arr.length != 6){
			//alert('时间格式错误！');
			return 0;
		}
		var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5]));

		return Math.round(datum.getTime()/1000);
	},
	checkFlash : function(){
		if(!!MUSIC.userAgent.ie){
			try{
				var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				return true;
			}
			catch(e){
				return false;
			}
		}
		else {
			try{
				var swf2 = navigator.plugins['Shockwave Flash'];
				if(swf2 == undefined){
					return false;
				}
				else {
					return true;
				}
			}
			catch(e){
				return false;
			}
		}
	},
	
	/**
	 * @method fixUrl
	 * @desc 补齐链接协议
	 * @return 图片地址
	 */
	fixUrl : function(url) {
		
		if (url && Object.prototype.toString.call(url) === "[object String]") {
			if (/^http(s?):\/\//i.test(url)) {
				url = url.replace(/^http(s?):/i, '');
			}
			
			url = url.replace(/imgcache.qq.com|imgcache.gtimg.cn/g,'y.gtimg.cn');

			if (/\.(jpg|png|gif|css|js)$/i.test(url)) {
				url += "?max_age=2592000";
			}
		}
		
		return url;
	}
};

/**
 * @method fixUrl
 * @desc 补齐链接协议
 * @return 图片地址
 */
MUSIC.fixUrl = MUSIC.util.fixUrl;


/**
 * @namespace MUSIC String 封装接口。
 * @type
 */
MUSIC.string = {
	RegExps: {
		trim: /^\s+|\s+$/g,
		ltrim: /^\s+/,
		rtrim: /\s+$/,
		nl2br: /\n/g,
		s2nb: /[\x20]{2}/g,
		URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g,
		escHTML: {
			re_amp: /&/g,
			re_lt : /</g,
			re_gt : />/g,
			re_apos : /\x27/g,
			re_quot : /\x22/g
		},
		
		escString: {
			bsls: /\\/g,
			nl: /\n/g,
			rt: /\r/g,
			tab: /\t/g
		},
		
		restXHTML: {
			re_amp: /&amp;/g,
			re_lt: /&lt;/g,
			re_gt: /&gt;/g,
			re_apos: /&(?:apos|#0?39);/g,
			re_quot: /&quot;/g
		},
		
		write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g,
		isURL : /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i,
		cut: /[\x00-\xFF]/,
		
		getRealLen: {
			r0: /[^\x00-\xFF]/g,
			r1: /[\x00-\xFF]/g
		},
		format: /\{([\d\w\.]+)\}/g
	},
	
	/**
	 * 通用替换
	 *
	 * @ignore
	 * @param {String} s 需要进行替换的字符串
	 * @param {String/RegExp} p 要替换的模式的 RegExp 对象
	 * @param {String} r 一个字符串值。规定了替换文本或生成替换文本的函数。
	 * @example
	 * 			MUSIC.string.commonReplace(str + "", MUSIC.string.RegExps.trim, '');
	 * @return {String} 处理结果
	 */
	commonReplace : function(s, p, r) {
		return s.replace(p, r);
	},
	
	/**
	 * 通用系列替换
	 *
	 * @ignore
	 * @param {String} s 需要进行替换的字符串
	 * @param {Object} l RegExp对象hashMap
	 * @example
	 * 			MUSIC.string.listReplace(str,regHashmap);
	 * @return {String} 处理结果
	 */
	listReplace : function(s, l) {
		if (MUSIC.lang.isHashMap(l)) {
			for (var i in l) {
				s = MUSIC.string.commonReplace(s, l[i], i);
			}
			return s;
		} else {
			return s+'';
		}
	},
	
	/**
	 * CstringEscape
	 *
	 * @param {String} str 目标串
	 * @return {String} 结果
	 */
	escString: function(str){
		var t = MUSIC.string.RegExps.escString,
			h = MUSIC.string.RegExps.escHTML;
		return MUSIC.string.listReplace((str + ""), {
			/*
			 * '\' must be
			 * escape first
			 */
			'\\\\' : t.bsls,
			'\\n' : t.nl,
			'' : t.rt,
			'\\t' : t.tab,
			'\\\'' : h.re_apos,
			'\\"' : h.re_quot
		});
	},
	
	
	/**
	 * 是否是一个可接受的URL串
	 *
	 * @param {String} s 目标串
	 * @return {Boolean} 结果
	 */
	isURL: function(s){
		return MUSIC.string.RegExps.isURL.test(s);
	},
	
	
	
	/**
	 * 计算字符串的真实长度
	 *
	 * @param {String} s 源字符串
	 * @param {Boolean} [isUTF8=false] 标示是否是utf-8计算
	 * @return {Number} 结果长度
	 */
	getRealLen: function(s, isUTF8){
		if (typeof(s) != 'string') {
			return 0;
		}
		
		if (!isUTF8) {
			return s.replace(MUSIC.string.RegExps.getRealLen.r0, "**").length;
		} else {
			var cc = s.replace(MUSIC.string.RegExps.getRealLen.r1, "");
			return (s.length - cc.length) + (encodeURI(cc).length / 3);
		}
	}
};


/**
 * 扩展String类的原型方法
 */
$.extend(String.prototype, {
	trim : function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	},
	escapeHTML : function() {
		var div = document.createElement('div');
		var text = document.createTextNode(this);
		div.appendChild(text);
		return div.innerHTML;
	},
	unescapeHTML : function() {
		var div = document.createElement('div');
		div.innerHTML = this;
		return div.innerText || div.textNode || '';
	},
	/**
	 * 用制定长度切割给定字符串
	 *
	 * @param {Number} bl 期望长度(字节长度)
	 * @param {String} tails 增加在最后的修饰串,比如"..."
	 * @return {String} 结果串
	 */
	cut: function(bitLen, tails){
		str = this;
		bitLen -= 0;
		tails = tails || '...';
		if (isNaN(bitLen)) {
			return str;
		}
		var len = str.length,
			i = Math.min(Math.floor(bitLen / 2), len),
			cnt = MUSIC.string.getRealLen(str.slice(0, i));

		for (; i < len && cnt < bitLen; i++) {
			cnt += 1 + (str.charCodeAt(i) > 255);
		}
		return str.slice(0, cnt > bitLen ? i - 1 : i) + (i < len ? tails : '');
	},
	/**
	 * js模板填充
	 * 
	 * @param {Object}
	 *            替代命名空间 ns
	 */
	jstpl_format : function(ns){
		function fn(w, g) {
			if (g in ns)
				return ns[g];
			return '';
		};
		return this.replace(/%\(([A-Za-z0-9_|.]+)\)/g, fn);
	},
	/**
	 * 实体替换，把经过html等编码的字符串还原
	 * 
	 * @return {String}
	 */
	entityReplace : function(){
		return this.replace(/&#38;?/g,"&amp;").replace(/&amp;/g,"&").replace(/&#(\d+);?/g,function(a,b){return String.fromCharCode(b)}).replace(/´/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&acute;/gi,"'").replace(/&nbsp;/g," ").replace(/&#13;/g,"\n").replace(/(&#10;)|(&#x\w*;)/g,"").replace(/&amp;/g,"&");
	},
	/**
	 * 对字符串中的单引号和双引号转换成对应的中文字符
	 * 
	 * @return {String}
	 */
	myEncode : function(){
		return this.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\/,"＼").replace(/\'/g,"’").replace(/\"/g,"“").replace(/&#39;/g,"’").replace(/&quot;/g,"“").replace(/&acute;/g,"’").replace(/\%/g,"％").replace(/\(/g,"（").replace(/\)/g,"）").replace(/\n/g,"");
	},

	HtmlEncode : function()
	{
		
		/**
		 * 转义
		 * @method encodeHTML
		 * @desc  在String原型上扩展了方法encodeHTML 对字符串进行HTML编码  即:把<>"'/\变成&#xx格式
		 * @example 
			var str='<"';
			str.encodeHTML();
			alert(str);
		 */
		function encodeHTML(str) {
			var rtstr='';
			for (var i=0; i<str.length; i++) {
				if (/\W/.test(str[i]) && str.charCodeAt(i)<256) {
					rtstr+='&#'+str.charCodeAt(i)+';'
				}else {
					rtstr+=str[i]
				}
			}
			return rtstr;
		}

		/**
		 * 转义
		 * @method decodeHTML
		 * @desc  在String原型上扩展了方法decodeHTML 对字符串进行HTML解码  即:把&#xx格式变成<>"'/\
		 * @example 
			var str='&#68';
			str.decodeHTML();
			alert(str);
		 */
		function decodeHTML(str) {
			return  str.replace(/&amp;/g,"&#38;")
						.replace(/&lt;/g,"&#60;")
						.replace(/&gt;/g,"&#62;")
						.replace(/&quot;/g,"&#34;")
						.replace(/&apos;/g,"&#39;")
						.replace(/&nbsp;/g,"&#160;")
						.replace(/&#(\d+);?/g,function(a,b){return String.fromCharCode(b)});
		}
		return encodeHTML(decodeHTML(this));
		//return this.unescapeHTML().entityReplace().replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/\"/g,"&quot;").replace(/\'/g,"&#39;");
		//return this.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/\"/g,"&quot;").replace(/\'/g,"&#39;");
	},
	parseEmoji : function () {
		return this.replace(/\[em(?:2)?\]e(\d{1,8})(?:,\d{1,3},\d{1,3})?\[\/em(?:2)?\]/gi, function (_0, _1) {
			return "<img src='//y.gtimg.cn/qzone/em/e" + _1 + ".gif' />";
		})
	}
});
$.extend(Number.prototype, {
	HtmlEncode : function(s){
		return (s+'').HtmlEncode();
	}
});
//前端模板预编译后, 会用到 _.escape 作为encode函数, 这里指向到music.myEncode
if (typeof _ == 'undefined' || !_.escape) {
    window._ = {escape:function(s){
		if (typeof(s) != "string")
		{
			s = s + '';
		}
		return s.HtmlEncode();
		}};
}
if (window.location.href.indexOf('/headline/')!=-1||window.location.href.indexOf('/public/')!=-1||window.location.href.indexOf('/new_ugc/')!=-1||window.location.href.indexOf('/mv/mv_upload')!=-1||window.location.href.indexOf('/audio/')!=-1||window.location.href.indexOf('/vip/')!=-1)
{
	$(document).off('click', '.js_logout').on('click', '.js_logout', function(){
		var $this = $(this);
		MUSIC.widget.user.loginOut(function(){
			var stat= $this.data('stat')||'';
			if (!!stat)
			{
				window.location.href = window.location.href+((window.location.href.indexOf('#')==-1)?'#':'&')+'stat='+stat;
				window.location.reload();
			}else window.location.reload();
		});//(function(){showTopInfo();});
	}).off('click', '.js_login').on('click', '.js_login', function(){
		MUSIC.widget.user.openLogin();
		var stat= $(this).data('stat')||'';!!stat&&statistics.pgvClickStat(stat);
	})
	return MUSIC;
}

/**
 * 使Firefox支持innerText
 */
(function doFireForxInnerText() {
	if (!MUSIC.userAgent.ie) { // firefox innerText define
		HTMLElement.prototype.__defineGetter__("innerText", function() {
					var anyString = "";
					var childS = this.childNodes;

					for (var i = 0; i < childS.length; i++) {
						if (childS[i].nodeType == 1) {
							anyString += childS[i].tagName == "BR"
									? '\n'
									: childS[i].innerText;
						} else if (childS[i].nodeType == 3) {
							anyString += childS[i].nodeValue;
						}
					}

					return anyString;
				});

		HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
					this.textContent = sText;
				});

	}
})();



$(document).on('click', 'body', function(e){
	var _target = MUSIC.util.getTarget(e);
	if ($(_target).parents('.mod_operate_menu').length==0&&!$(_target).hasClass('mod_operate_menu'))
	{
		$('.mod_operate_menu').hide();
		$('.songlist__item--current').removeClass('songlist__item--current');
		$('.playlist__item--current').removeClass('playlist__item--current');
	}
})

/*返回顶部 begin*/
if (window.location.href.indexOf('pop_login.html')==-1&&!MUSIC.util.getUrlParams().nototop)
{
	if (window.location.href.indexOf('/headline/')!=-1||window.location.href.indexOf('/public/')!=-1||window.location.href.indexOf('/new_ugc/')!=-1||window.location.href.indexOf('/mv/mv_upload')!=-1||window.location.href.indexOf('/audio/')!=-1||window.location.href.indexOf('/vip/')!=-1||window.location.href.indexOf('/player.html')!=-1||window.location.href.indexOf('/player_radio.html')!=-1)
	{
	$('body').append('<a href="javascript:;" class="btn_bottom_feedback js_btn_feedback" style="display:none;"></a>');
	}else
	$('body').append('<a href="javascript:;" class="btn_bottom_feedback js_btn_feedback">反馈</a><a href="javascript:;" class="btn_bottom_player sprite_before js_openplayer"><span class="icon_txt">播放器</span></a>');
}
var AISEE = (function(){
	var url = {
		submit : '',//'https://feedback.kf0309.3g.qq.com/pc/submit?appId=900016894&data=byXc1qD6K13SvhEe8%2FO9E6RxtxzjVBor54T4roGaQH%2FBF9fevuPOe56mDfBAk8FP7epkZlBL%2FewAavTGrMuCpPt7V%203G1DpEthaUKX2QzW1R46n5YFwTqnky9GRUTnFEosPQkYnF5q9luJD9iGFNBoJfOspPrME6V7nDYQWi0ZA%2Fp0518C9PwIX%20G%2FvNTzWjZRgkPKwOW%2FCt7Nydr8SJ8u5sPsvIDIIwaZNagCi4xHXnHpPLIa%20UFnGmCqdbHsnNHfB47L1mfpm%20MzU9Mp34W2EG2BM8uYcmMC0C1Z0KDBjV3Ob3gYziU7Q3vZr%2F%20BqZUxaqGRkUuf4HVNgm3SKLbQ%3D%3D&pid=2',
		feedbacks : ''//'https://feedback.kf0309.3g.qq.com/pc/feedbacks?appId=900016894&data=byXc1qD6K13SvhEe8%2FO9E6RxtxzjVBor54T4roGaQH%2FBF9fevuPOe56mDfBAk8FP7epkZlBL%2FewAavTGrMuCpPt7V%203G1DpEthaUKX2QzW1R46n5YFwTqnky9GRUTnFEosPQkYnF5q9luJD9iGFNBoJfOspPrME6V7nDYQWi0ZA%2Fp0518C9PwIX%20G%2FvNTzWjZRgkPKwOW%2FCt7Nydr8SJ8u5sPsvIDIIwaZNagCi4xHXnHpPLIa%20UFnGmCqdbHsnNHfB47L1mfpm%20MzU9Mp34W2EG2BM8uYcmMC0C1Z0KDBjV3Ob3gYziU7Q3vZr%2F%20BqZUxaqGRkUuf4HVNgm3SKLbQ%3D%3D&pid=2'
	};
	function loadUrl(cb){
		if (!!url.submit)
		{
			cb&&cb();
			return false;
		}
		var _url = location.protocol+'//c.y.qq.com/base/fcgi-bin/fcg_aisee_entry.fcg';
		MUSIC.jQueryAjax.jsonp({
			url : _url,
			charset : 'utf-8',
			data : {
				cid : '205362489',
				uin : g_user.getUin(),
				ct : 24,
				reqtype : 2
			},
			success : function(data) {
				if (data.code == 0)
				{
					url.feedbacks = data.target.replace('http://', 'https://').replace(/\/submit\?/gi, '/feedbacks?');
					url.submit = data.target.replace('http://', 'https://').replace(/\/feedbacks\?/gi, '/submit?');
					cb&&cb();
				}else if (data.code == 1000)
				{
					g_user.openLogin(true, function(){
						showTopInfo();
						AISEE.show();
					});
				}
			},
			error : function(){
			}
		});
	}
	function show(){
		loadUrl(function(){
			require.async('js/common/dialog.js', function(dialog){
				dialog.hide();
				dialog.show({
					mode : "iframe",
					dialogclass : 'popup_aisee',
					title : '<a href="javascript:;" class="popup__tit_item current js_iframe_aisee" data-type="submit">我要反馈</a><a href="javascript:;" class="popup__tit_item js_iframe_aisee" data-type="feedbacks">反馈历史</a>',
					url : url.submit,
					objArg : {}
				});
				dialog.onReady( 0, 420);
			});
		});
		deleteRed();
		$(document).off('click', '.js_iframe_aisee').on('click', '.js_iframe_aisee', function(){
			if ($(this).hasClass('current'))
			{
				return false;
			}
			$('.js_iframe_aisee').removeClass('current');$(this).addClass('current');
			var type = $(this).data('type');
			if (type == 'submit')
			{
				$('#frame_tips').attr('src', url.submit).attr('height', '420px');
			}else if (type == 'feedbacks')
			{
				$('#frame_tips').attr('src', url.feedbacks).attr('height', '380px');
			}
		});
		
	}
	function showTips(){
		MUSIC.jQueryAjax.jsonp({
			url : MUSIC.util.getProtocol()+'//c.y.qq.com/tips/fcgi-bin/fcg_music_red_dota.fcg',
			data : {
				ct:24,
				qq:g_user.getUin(),
				cid:205360410,
				reqtype:1,
				from:2
			},
			charset : 'utf-8',
			success : function(d) {
				if (d&&d.code == 0&&d.data&&d.data.items&&d.data.items.length>0&&d.data.items[0].from == 2&&d.data.items[0].msg_num>0)
				{
					$('body').append(['<div class="popup_data_detail aisee">',
									'	<div class="popup_data_detail__cont js_btn_feedback">',
									'		<p>有新的反馈消息</p>',
									'	</div>',
									'	<i class="popup_data_detail__arrow"></i>',
									'</div>'].join(''));
				}
			},
			error : function(){
			}
		});
	}
	
	function deleteRed(){
		if ($('div.aisee').length==0)
		{
			return false;
		}
		MUSIC.jQueryAjax.jsonp({
			url : MUSIC.util.getProtocol()+'//c.y.qq.com/tips/fcgi-bin/fcg_music_red_dota.fcg',
			data : {
				ct:24,
				qq:g_user.getUin(),
				cid:205360410,
				reqtype:2,
				from:2
			},
			charset : 'utf-8',
			success : function(d) {
				if (d&&d.code == 0)
				{
					$('div.aisee').remove();
				}
			},
			error : function(){
			}
		});
	}
	return {
		show : show,
		showTips : showTips
	}
})();
window.AISEE = AISEE;
if (!(MUSIC.userAgent.ie && MUSIC.userAgent.ie < 10)&&window.location.href.indexOf('//y.qq.com/vip/daren_recruit/')==-1&&!!g_user.getUin())
{
	AISEE.showTips();
}
$(document).off('click', '.js_btn_feedback').on('click', '.js_btn_feedback', function(){
	statistics.pgvClickStat("y_new.footer.feedback");
	if (!(MUSIC.userAgent.ie && MUSIC.userAgent.ie < 10))
	{
		if (!MUSIC.widget.user.getUin())
		{
			g_user.openLogin(true, function(){
				showTopInfo();
				AISEE.show();
			});
		}else {
			AISEE.show();
		}
	}else {
		var  url = $(this).data('href');
		if (url)
		{
		var w = window.open(url, '_blank');if(w)w.opener = null;
		}else {
		var w = window.open('//support.qq.com/discuss/602_1.shtml', '_blank');if(w)w.opener = null;
		}
	}
	/**/
}).off('click', '.js_goto_old').on('click', '.js_goto_old', function(){
	statistics.pgvClickStat("y_new.footer.goto_oldportal");
}).off('click', '.js_openplayer').on('click', '.js_openplayer', function(){
	MUSIC.player.checkAndOpenPlayer();
	statistics.pgvClickStat("y_new.player.openplayer");
}).off('click', '.js_nav_click').on('click', '.js_nav_click', function(){
	var stat = $(this).data('stat');
	if (!!stat)
	{
		statistics.pgvClickStat(stat);
	}
});
function getToTop(){
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
	var tpl = '<a href="javascript:;" class="btn_bottom_top sprite_before js_btn_top"><span class="icon_txt">返回顶部</span></a>';
	if (scrollTop>150)
	{
		if ($('.js_btn_top').length<=0)
		{
			$(document).off('click', '.js_btn_top').on('click', '.js_btn_top', function(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
					
				$('.mod_search').removeClass('mod_search--top');
				statistics.pgvClickStat("y_new.footer.goto_top");
			});
			if ($('.js_btn_feedback').css('display') != 'none'){
				$('.js_btn_feedback').before(tpl);
			}
		}
		$('.js_btn_top').show();
	}else $('.js_btn_top').hide();
}
if (!document.addEventListener)
{
	document.attachEvent("onmousewheel",function(){
		getToTop();
	});
}else
document.addEventListener("scroll",function(){
	getToTop();
});
/*返回顶部 end*/
/*出浮层*/
$.fn.popupmore = function(){
	var $obj = $(this),
		target = $obj.data('target'),
		left = parseInt($obj.data('left')),
		top = (parseInt($obj.data('top'))-50)||0;		
	$(document).on('click', 'body', function(e){
		var _target = MUSIC.util.getTarget(e);
		if ($(_target).parents('.mod_operate_menu').length==0&&$(_target).parents('.popup_upload_cover').length==0&&$(_target).attr('id')!='js_sosopopup'&&$(_target).parents('.popup_data_detail').length==0&&!$(_target).hasClass('mycard__qrcode'))
		{
			$('.js_menu_box').hide();$('#'+target).hide();
			$('#popup_phone_qrcode').hide();
		}
	})
	$obj.off('click', '').on('click', '', function(e){
		e.preventDefault();
		e.stopPropagation();
		if (!left)
		{
			if (!$obj.data('top'))
			{
				$('#'+target).show();
			}else
			$('#'+target).css({
				top : (e.pageY+top)+'px'
			}).show();
		}else{
			if (!$obj.data('top')){
				$('#'+target).css({
					left : (e.pageX+left)+'px'
				}).show();
			}else{
				$('#'+target).css({
					top : (e.pageY+top)+'px',
					left : (e.pageX+left)+'px'
				}).show();
			}
		}
		var stat = $(this).data('stat')||'';
		if (!!stat)
		{
			statistics.pgvClickStat(stat);
		}
	})
			
};

/*smartbox*/
setTimeout(function(){
	if (window.location.href.indexOf('search.html')==-1)
	{
		require.async("js/common/smartbox.js", function(pager){
			$(".js_smartbox").smartbox({
				container : "div.mod_top_search",
				ns : 'mod_top_search',
				num : 10,
				callback : function(key) {
					var w = window.open(MUSIC.util.getProtocol()+'//y.qq.com/portal/search.html#searchid=1&remoteplace=txt.yqq.top&t=song&w='+encodeURIComponent(key), '_self');if(w)w.opener = null;//search.go(key);
				}
			});

		});
	}
}, 500);
/*
* 统计上报Map
* 
*/
MUSIC.reportMap = {
	searchsong : 10051,
	searchalbum : 10052,
	searchgedan : 10053,
	songlist : 2,
	song : 3,
	album : 4,
	playlist : 5
};
window.emopr = function(s){return s};
function showUserInfo(){
	if (!g_user.isLogin()) {
		$('.js_login').show();
		$('.js_logined').html('').hide();
		$('.popup_user').html('').removeClass('drop');
		return;
	}
	g_user.getVipInfo(function(data){
		var loginFlag = false, opentitle = "开通绿钻豪华版", openmusictitle = '开通付费包', openmusictitle2 = '开通|付费音乐包', vipend = '', musicend = '';
		(data.eight == 1||data.twelve == 1) && (openmusictitle = '续费付费包');
		data.eight == 1 && (openmusictitle2 = '续费|付费音乐包')&&(musicend = data.eightEnd.substr(0, 10));
		data.twelve == 1 && (openmusictitle2 = '续费|豪华付费包')&&(musicend = data.twelveEnd.substr(0, 10));
		if (data.vip == 1)
		{
			loginFlag = true;
			if (data.svip == 1)
			{
				opentitle = "续费绿钻豪华版";
				vipend = data.send.substr(0, 10);
			}else {
				opentitle = "升级绿钻豪华版";
				vipend = data.end.substr(0, 10);
			}
		}else if (data.vip == 2)
		{
			loginFlag = true;
		}
		
		var icon_str = '';
		if (data.vip == 1)
		{
			icon_str='<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/portal/vipportal/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (data.yearFlag == 1 ? 'n' : '') + (data.svip == 1 ? 's' : '') + 'vip'+(data.CurrentLevel||1)+'.png" alt="绿钻'+(data.CurrentLevel||1)+'级" class="popup_user_data__lv_icon"></a>';
		}else {
			if (data.score > 0) {
				icon_str +=  '<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/portal/vipportal/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/' + (data.yearFlag == 1 ? 'n' : '') + 'svip'+(data.CurrentLevel||1)+'_g.png" alt="绿钻'+(data.CurrentLevel||1)+'级" class="popup_user_data__lv_icon"></a>';
			} else {
				icon_str += '<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/portal/vipportal/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/svip_g.png" alt="绿钻" class="popup_user_data__lv_icon"></a>';
			}
		}
		data.ffbScore = parseInt(data.ffbScore);
		if (data.eight == 1||data.twelve == 1) {	// 付费音乐包				
			var buylevel = data.ffbLevel;		
			icon_str +=  data.twelve == 0 ? ('<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/'+(data.yearFfb==1?'n':'')+'sui'+buylevel+'.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>') : ('<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/'+(data.yearFfb==1?'n':'')+'ssui'+buylevel+'.png?max_age=2592000" alt="豪华付费音乐包" class="popup_user_data__lv_icon"/></a>');

		} else {	//普通用户
			if (data.ffbScore > 0) {
				icon_str +=  '<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/'+(data.yearFfb==1?'n':'')+'sui'+data.ffbLevel+'_g.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>';
			} else {
				icon_str += '<a href="'+MUSIC.util.getProtocol()+'//y.qq.com/vip/fufeibao/index.html" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img src="//y.gtimg.cn/music/icon/v1/pc/sui_g.png?max_age=2592000" alt="付费音乐包" class="popup_user_data__lv_icon"/></a>';
			}
		}
		if (data.xingzuanVip == 1) {
			var icon_star = data.xingzuanScore > 0 ? 'xzlv' + data.xingzuanLevel : 'xz';
			icon_star += data.xingzuanVip == 1 ? (data.yearXingzuanVip == 1 ? '_n' : '') : '_g';
			if (data.xingzuanScore>0)
			{
				icon_str += ('<a href="http://xing.qq.com/" class="js_vip_jump" data-stat="y_new.top.pop.vip_icon" rel="noopener" target="_blank"><img class="popup_user_data__lv_icon" src="//y.gtimg.cn/qz-proj/qz-super/img/icon/'+icon_star+'.png"></a>');
			}
		}
		data.nickname = (data.nickname);//emopr
		var user_template = '<img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="top_login__cover js_user_img"  />';//alt="'+(data.nickname!=""?data.nickname:g_user.getUin())+'"
		
		var popupuser_template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\t\t<div class="popup_user_data';
if(!data.icon_str){
__p+=' popup_user_data--nolv';
}
__p+='">\r\n                        <a href="//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_pic" class="popup_user_data__cover_link" onclick="setStatCookie&&setStatCookie();">\r\n                            <img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\\\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\\\';this.onerror=null;" class="popup_user_data__cover js_user_img"  />\r\n\t\t\t    ';
if(parseInt(MUSIC.cookie.get('login_type'))!=2){
__p+='\r\n\t\t\t\t<img src="//y.gtimg.cn/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="popup_user_data__icon">\r\n\t\t\t    ';
}else{
__p+='\r\n\t\t\t\t<img src="//y.gtimg.cn/mediastyle/yqq/img/login_wechat.png?max_age=2592000" class="popup_user_data__icon">\r\n\t\t\t    ';
}
__p+='\r\n                        </a>\r\n                        <!-- 自动垂直居中 -->\r\n                        <div class="popup_user_data__cont">\r\n                            <div class="popup_user_data__name">\r\n\t\t\t\t<a href="//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_nickname" onclick="setStatCookie&&setStatCookie();" class="js_emopr" onclick="setStatCookie();">';
if(data.nickname!=""){
__p+=''+
((__t=( data.nickname ))==null?'':__t)+
'';
}else{
__p+=''+
((__t=( g_user.getUin() ))==null?'':__t)+
'';
}
__p+='</a>\r\n                            </div>\r\n                            <div class="popup_user_data__lv">\r\n                                '+
((__t=( data.icon_str ))==null?'':__t)+
'\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class="popup_user_toolbar">\r\n\t\t    <!--绿钻-->\r\n                        <div class="popup_user_toolbar__item">\r\n                            <div class="popup_user_toolbar__tit"><a href="//y.qq.com/portal/vipportal/index.html" target="_blank" rel="noopener">绿钻豪华版</a>\r\n                            </div>\r\n                            <div class="popup_user_toolbar__desc c_tx_thin">\r\n\t\t\t    ';
if(data.vipend){
__p+='\r\n\t\t\t\t'+
((__t=( data.vipend ))==null?'':__t)+
' 到期\r\n\t\t\t    ';
}else {
__p+='\r\n\t\t\t    ';
if(data.opentitle.indexOf('续费')!=-1){
__p+='续费';
}else {
__p+='开通';
}
__p+='立即赠送付费音乐包\r\n\t\t\t    ';
}
__p+='\r\n\t\t\t    </div>\r\n                            <a class="mod_btn_green popup_user_toolbar__btn_vip js_openvip" href="javascript:;" ';
if(data.svip==0&&data.vip==1){
__p+='data-aid="music.pc.20319.newyqqhover" data-stat="music.20319.btnclick.pc"';
}else{
__p+='data-aid="music.pc.20318.newyqqhover" data-stat="music.20318.btnclick.pc"';
}
__p+='>';
if(data.opentitle.indexOf('续费')!=-1){
__p+='续费';
}else {
__p+='开通';
}
__p+='</a>\r\n                        </div>\r\n\r\n\t\t    <!--付费包-->\r\n\t\t\t';
if(!(data.svip==1&&data.vip==1)){
__p+='\r\n                        <div class="popup_user_toolbar__item">\r\n                            <div class="popup_user_toolbar__tit"><a href="//y.qq.com/vip/fufeibao/index.html" target="_blank" rel="noopener">'+
((__t=( data.openmusictitle2.split('|')[1] ))==null?'':__t)+
'</a>\r\n                            </div>\r\n                            <div class="popup_user_toolbar__desc c_tx_thin">\r\n\t\t\t    ';
if(!(data.svip==1&&data.vip==1||data.musicend=='')){
__p+='\r\n\t\t\t\t'+
((__t=( data.musicend ))==null?'':__t)+
' 到期\r\n\t\t\t    ';
}else{
__p+='\r\n\t\t\t    畅享千万包月曲库\r\n\t\t\t    ';
}
__p+='\r\n\t\t\t    </div>\r\n                            <a class="mod_btn_green popup_user_toolbar__btn_vip js_openmusic" href="javascript:;" data-aid="music.pc.20320.newyqqhover" data-stat="music.20320.btnclick.pc">'+
((__t=( data.openmusictitle2.split('|')[0] ))==null?'':__t)+
'</a>\r\n                        </div>\r\n\t\t\t';
}
__p+='\r\n                        <div class="popup_user_toolbar__item">\r\n                            <div class="popup_user_toolbar__tit js_msgcenterdiv"><a href="//y.qq.com/portal/msg_center.html#stat=y_new.top.pop.msg_center" onclick="setStatCookie&&setStatCookie();">评论通知</a>\r\n                            </div>\r\n                        </div>\r\n                        <div class="popup_user_toolbar__item">\r\n                            <div class="popup_user_toolbar__tit"><a href="javascript:;" class="js_logout" data-stat="y_new.top.pop.logout">退出';
if(parseInt(MUSIC.cookie.get('login_type'))!=2){
__p+='QQ';
}else{
__p+='微信';
}
__p+='登录</a>\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>';
return __p;
}({
			icon_str : icon_str,
			nickname : data.nickname,
			svip : data.svip,
			vip : data.vip,
			opentitle : opentitle,
			openmusictitle2 : openmusictitle2,
			musicend : musicend,
			vipend : vipend
		});/*[
          '          <div class="popup_user_data'+(icon_str==''?' popup_user_data--nolv':'')+'">',
          '              <a href="'+MUSIC.util.getProtocol()+'//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_pic" class="popup_user_data__cover_link" onclick="setStatCookie&&setStatCookie();"><img src="//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="popup_user_data__cover js_user_img"  />'+(parseInt(MUSIC.cookie.get('login_type'))!=2?'<img src="//y.gtimg.cn/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="popup_user_data__icon">':'<img src="//y.gtimg.cn/mediastyle/yqq/img/login_wechat.png?max_age=2592000" class="popup_user_data__icon">')+'</a>',
          '              <div class="popup_user_data__name"><a href="'+MUSIC.util.getProtocol()+'//y.qq.com/portal/profile.html#stat=y_new.top.pop.user_nickname" onclick="setStatCookie&&setStatCookie();" class="js_emopr" onclick="setStatCookie();">'+(data.nickname!=""?data.nickname:g_user.getUin())+'</a></div>',
          '              <div class="popup_user_data__lv">',icon_str,
          '              </div>',
          '              <a href="javascript:;" class="popup_user_data__out js_logout" data-stat="y_new.top.pop.logout">[退出]</a>',
          '          </div>',
          '          <ul class="mod_user_statistic">',
          '              <li class="user_statistic__item">',
          '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.gedan" data-tab="create"><strong class="user_statistic__number js_create"></strong><span class="user_statistic__tit">歌单</span></a>',
          '              </li>',
          '              <li class="user_statistic__item">',
          '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.focus" data-tab="focus"><strong class="user_statistic__number js_focus"></strong><span class="user_statistic__tit">关注</span></a>',
          '              </li>',
          '              <li class="user_statistic__item user_statistic__item--last">',
          '                  <a href="javascript:;" class="js_profile_tab" data-stat="y_new.top.pop.fans" data-tab="fans"><strong class="user_statistic__number js_fans"></strong><span class="user_statistic__tit">粉丝</span></a>',
          '              </li>',
          '          </ul>',
          '          <div class="popup_user__toolbar">',
          '              <a class="mod_btn_green popup_user__btn1 js_openvip" '+(data.svip==0&&data.vip==1?'data-aid="music.pc.20319.newyqqhover" data-stat="music.20319.btnclick.pc"':'data-aid="music.pc.20318.newyqqhover" data-stat="music.20318.btnclick.pc"')+' href="javascript:;">'+opentitle+'</a>',
          '              <div class="popup_user_data__time" style="display:'+(vipend==''?'none':'')+';">'+vipend+' 到期</div>',
          '              <a class="mod_btn popup_user__btn2 js_openmusic" href="javascript:;" data-aid="music.pc.20320.newyqqhover" data-stat="music.20320.btnclick.pc" style="display:'+(data.svip==1&&data.vip==1?'none':'')+';">'+openmusictitle2+'</a>',
          '              <div class="popup_user_data__time" style="display:'+((data.svip==1&&data.vip==1||musicend=='')?'none':'')+';">'+musicend+' 到期</div>',
          '              <div class="popup_top_login__tips"><a class="js_openvip" '+(data.svip==0&&data.vip==1?'data-aid="music.yyw.index.2" data-stat="music.20319.btnclick.pc"':'data-aid="music.yyw.index.2" data-stat="music.20318.btnclick.pc"')+' href="javascript:;">赠送会员</a>    <a href="https://pay.qq.com/service/ask_v3.shtml?sid=xxzxhh&aid=pay.music.yyw.index2" rel="noopener" target="_blank">索要会员</a></div>',
          '         </div>'].join('');*/
		if (loginFlag)
		{
			if (window.location.href.indexOf('player.html')!=-1||window.location.href.indexOf('player_radio.html')!=-1)
			{
				$('#player_login').show();
				$('.player_login__link--unlogin,.js_opts_unlogin').hide();//alt="'+(data.nickname!=""?data.nickname:g_user.getUin())+'"
				var url = location.protocol + '//c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg';//'//c.y.qq.com/rsc/fcgi-bin/3g_profile_homepage?coverurl=1&callback=' + jsonpCallback + '&cid=316&sin=0&ein=1&nolist=1&rettype=19&type=0&id='+g_user.getUin()+'&qq='+g_user.getUin()+'&'+(new Date().getTime());
				MUSIC.jQueryAjax.jsonp({
					url : url,
					data : {
						cid: 205360838,
						ct: 20,
						userid: g_user.getUin(),
						reqfrom: 1,
						reqtype: 0
					},
					charset : 'utf-8',
					success : function(d) {
						if (d.code!=0) {
							return false;
						}
						d = d.data;
						$('#player_login .player_login__link:eq(0)').html('<img src="'+d.creator.headpic+'" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null;" class="player_login__cover js_user_img" ><span class="player_login__txt js_emopr">'+(data.nickname!=""?data.nickname:g_user.getUin())+'</span>').attr('href', MUSIC.util.getProtocol()+'//y.qq.com/portal/profile.html#stat=y_new.player.header.user_pic').attr('target', '_blank').on('click', function(){setStatCookie&&setStatCookie();});
						
						$('.player_login__link .player_login__icon').remove();
						var logout_h = $('.js_logout').html();
						if (parseInt(MUSIC.cookie.get('login_type'))!=2)
						{
							$('.js_user_img').after('<img src="//y.gtimg.cn/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="player_login__icon">');
						}else {
							$('.js_user_img').after('<img src="//y.gtimg.cn/mediastyle/yqq/img/login_wechat.png?max_age=2592000" class="player_login__icon">');
						}

					},
					error : function(){}
				});
			}else{
				var inpop = false, inicon = false;
				$('.js_logined').show().html(user_template);
				$('.mod_top_login .js_openvip').html(opentitle);
				$('.mod_top_login .js_openmusic').html(openmusictitle);
				$('.js_login').hide();
				$('.popup_user').html(popupuser_template);
				$('.top_login__link').on('mouseenter', function(){
					inicon = true;
					$('.popup_user').addClass('drop');
					/*曝光上报*/
					if ($('.popup_user .js_openvip[data-stat="music.20318.btnclick.pc"]').length>0)
					{
						statistics.pgvClickStat('music.20318.btnshow.pc');
					}
					if ($('.popup_user .js_openvip[data-stat="music.20319.btnclick.pc"]').length>0)
					{
						statistics.pgvClickStat('music.20319.btnshow.pc');
					}
					if ($('.popup_user .js_openmusic[data-stat="music.20320.btnclick.pc"]').length>0&&data.eight == 1&&!(data.svip==1&&data.vip==1))
					{
						statistics.pgvClickStat('music.20320.btnshow.pc');
					}
					if ($('.popup_user .js_openmusic[data-stat="music.20320.btnclick.pc"]').length>0&&data.twelve == 1&&!(data.svip==1&&data.vip==1))
					{
						statistics.pgvClickStat('music.20321.btnshow.pc');
					}
					/**/
					$('.popup_user').on('mouseenter', function(){
						inpop = true;
					}).on('mouseleave', function(){
					setTimeout(function(){
						if (!inicon)
						{
							$('.popup_user').removeClass('drop');//$('.popup_user').hide();
						}
					}, 300);
						inpop = false;
					});
				}).on('mouseleave', function(){
					inicon = false;
					setTimeout(function(){
						if (!inpop)
						{
							$('.popup_user').removeClass('drop');//$('.popup_user').hide();
						}
					}, 300);
				});
				$(document).on('click', '.js_vip_jump', function(){
					var stat = $(this).data('stat')||'';
					if (!!stat)
					{
						statistics.pgvClickStat(stat);
					}
				})
				var url = location.protocol + '//c.y.qq.com/rsc/fcgi-bin/fcg_get_profile_homepage.fcg';//'//c.y.qq.com/rsc/fcgi-bin/3g_profile_homepage?coverurl=1&callback=' + jsonpCallback + '&cid=316&sin=0&ein=1&nolist=1&rettype=19&type=0&id='+g_user.getUin()+'&qq='+g_user.getUin()+'&'+(new Date().getTime());
				MUSIC.jQueryAjax.jsonp({
					url : url,
					data : {
						cid: 205360838,
						ct: 20,
						userid: g_user.getUin(),
						reqfrom: 1,
						reqtype: 0
					},
					charset : 'utf-8',
					success : function(d) {
						if (d.code!=0) {
							return false;
						}
						d = d.data;
						$('.js_user_img').attr('src', d.creator.headpic);
						$('.popup_user .js_create').html(d.mydiss.num);
						$('.popup_user .js_focus').html(d.creator.nums.follownum);
						$('.popup_user .js_fans').html(d.creator.nums.fansnum);
						$('.popup_user .js_profile_tab').on('click', function(){
							var tab = $(this).data('tab'), stat = $(this).data('stat');
							MUSIC.util.gotoprofile(tab, stat);
						})
					},
					error : function(){}
				});
			}
			
			$('.top_login__icon').remove();
			var logout_h = $('.js_logout').html();
			if (!!logout_h)
			{
				if (parseInt(MUSIC.cookie.get('login_type'))!=2)
				{
					$('.top_login__link .js_user_img').after('<img src="//y.gtimg.cn/mediastyle/yqq/img/login_qq.png?max_age=2592000" class="top_login__icon">');
					if (logout_h.indexOf('[')!=-1)
					{
						$('.js_logout').html(logout_h.replace('退出', '退出QQ登录'));
					}
				}else {
					$('.top_login__link .js_user_img').after('<img src="//y.gtimg.cn/mediastyle/yqq/img/login_wechat.png?max_age=2592000" class="top_login__icon">');
					if (logout_h.indexOf('[')!=-1){
						$('.js_logout').html(logout_h.replace('退出', '退出微信登录'));
					}
				}
			}
		}
		/*if (!g_user.isWeiXin())
		{
			g_user.getQQUserImage(g_user.getUin(), function(img){
				$('.js_user_img').attr('src', img);
			});
		}*/
		function r(){
			var js_emopr = $('.js_emopr');
			$.each(js_emopr, function(idx, item){
				var h = $(item).html();
				$(item).html(emopr(h.unescapeHTML()));
				$(item).removeClass('js_emopr');
			});
		}
		require.load("//y.gtimg.cn/music/portal/emoticons/emoji.js?max_age=2592000", function(pager){
			r();
		});
		if (!(window.location.href.indexOf('/headline/')!=-1||window.location.href.indexOf('/public/')!=-1||window.location.href.indexOf('/new_ugc/')!=-1||window.location.href.indexOf('/mv/mv_upload')!=-1||window.location.href.indexOf('/audio/')!=-1||window.location.href.indexOf('/vip/')!=-1||window.location.href.indexOf('/player.html')!=-1||window.location.href.indexOf('/player_radio.html')!=-1)){
			msgCenterInfo.init();//红点
		}
		$(document).off('click', '.js_into_comment').on('click', '.js_into_comment', function(){
			var stat = $(this).data('stat');
			if (!!stat){
				statistics.pgvClickStat(stat);
			}
		});
	}, function(){
		//g_user.openLogin();
	});

	
}

//消息中心小红点
var msgCenterInfo = (function(){
	var template = '<div class="popup_user_toolbar__desc js_topnewmsg"><a href="//y.qq.com/portal/msg_center.html#stat=y_new.top.pop.msg_center" onclick="setStatCookie&&setStatCookie();" class="c_tx_thin"><span class="popup_user_toolbar__user">%(nick)</span>%(title)</a></div><div class="popup_user_toolbar__notice js_topnewmsg">%(num)</div>',
		num = 0,
		title = '',
		nick = '';
	function getUCGI(o, callback, errorCallback){
		var jcb = 'getUCGI'+(Math.random() + '').replace('0.', '');
		MUSIC.jQueryAjax.jsonp({
			//url : (!MUSIC.cookie.get('FIS_DEBUG')?'//u':'//ud')+'.y.qq.com/cgi-bin/musicu.fcg?callback='+jcb,
			url : '//u.y.qq.com/cgi-bin/musicu.fcg?callback='+jcb,
			data : {data:JSON.stringify(o)},
			jsonpCallback : jcb,
			charset : 'utf-8',
			success : function (r) {
				//r = JSON.parse(r);		
				callback&&callback(r);
			},
			error : function() {
				errorCallback&&errorCallback(null);
			}
		});
	}
	function getnum(){
		getUCGI({
			"messageNum":{
				"module":"MessageCenter.MessageCenterServer",
				"method":"GetMessage",
				"param":{
					"uin":g_user.getUin(),
					"red_dot":[         //#获取红点状态#0-小秘书 1-评论 2-系统消息
						{
							"msg_type":1
						}
					]
				}
			},
			"GlobalCommentMessageReadServer": {
				"module": "GlobalComment.GlobalCommentMessageReadServer",
				"method": "GetMessage",
				"param": {
					"uin": ""+g_user.getUin(),              // 用户UIN
					"page_num": 0,        // 请求第几页数据，从0开始
					"page_size": 1,       // 每页请求多少条
					"last_msg_id": "",     // 上一页中最后一条消息ID，第0页时传空
					"type": 0                 // 0:评论通知消息 1 评论点赞消息
				}
			}
		}, function(d){
			if (d.code == 0&&d.messageNum&&d.messageNum.code == 0&&d.messageNum.data&&d.messageNum.data.dot_list&&d.messageNum.data.dot_list.length>0&&d.messageNum.data.dot_list[0].msg_type==1&&d.messageNum.data.dot_list[0].msg_num>0){
				num = d.messageNum.data.dot_list[0].msg_num;
				if (num > 99){
					num = "99+";
				}
				if (d.code == 0&&d.GlobalCommentMessageReadServer&&d.GlobalCommentMessageReadServer.code == 0&&d.GlobalCommentMessageReadServer.data&&d.GlobalCommentMessageReadServer.data.messages&&d.GlobalCommentMessageReadServer.data.messages.length>0){
					title = d.GlobalCommentMessageReadServer.data.messages[0].message.title;
					if (d.GlobalCommentMessageReadServer.data.messages[0].message.type == 1){//评论消息
						title = '评论了你的'+d.GlobalCommentMessageReadServer.data.messages[0].comment.main_title;
					}else if(d.GlobalCommentMessageReadServer.data.messages[0].message.type == 2){
						title = '回复了你的评论';					
					}else if(d.GlobalCommentMessageReadServer.data.messages[0].message.type == 5 || d.GlobalCommentMessageReadServer.data.messages[0].message.type == 6){
						title = '赞了你的评论';							
					}
					nick = d.GlobalCommentMessageReadServer.data.messages[0].message.nick;
				}
				$('.js_msgcenterdiv').after(template.replace('%(nick)', nick.HtmlEncode()).replace('%(title)', title).replace('%(num)', num));
				$('.top_login__link').append('<span class="top_login__notice js_topnewmsg">'+num+'</span>');
			}
		}, function(){});
	}
	return {
		init : function(){
			getnum();
		}
	}
})();
function initFooter(){
	$(document).off('click', '.js_footer_more').on('click', '.js_footer_more', function(){
		var $ul = $(this).parents('.footer_link_list');
		$ul.addClass('footer_link_list--show');
		$('.js_last').show();
		$(this).parents('.footer_link_list__item').remove();

	}).off('click', '.js_other_link').on('click', '.js_other_link', function(){
		var stat = $(this).data('stat')||'';
		if (!!stat)
		{
			statistics.pgvClickStat(stat);
		}

	});
	var jsonpCallback = 'MusicJsonCallback',
		url = '//y.qq.com/download/download.js';
	MUSIC.jQueryAjax.jsonp({
		url : url,
		charset : 'utf-8',
		jsonpCallback : jsonpCallback,
		success : function(d) {
			var data = d.data, _map = {'pc':0, 'mac':1, 'andriod':3, 'iphone':2};
			window.download_pc = data[0].Flink1;
			window.download_mac = data[1].Flink1;
			$(document).off('click', '.js_footer_down').on('click', '.js_footer_down', function(){
				var type = $(this).data('type');
				switch (type)
				{
				case 'pc':
				case 'mac':
					var w = window.open(data[_map[type]].Flink1);if(w)w.opener = null;
					break;
				case 'andriod':
				case 'iphone':
					require.async("js/common/dialog.js", function(dialog){
						dialog.show({
							mode : "common",
							title : data[_map[type]].Ftitle + ' ' + data[_map[type]].Fversion,
							popup__bd_class : 'popup_download__bd',
							dialogclass : 'popup_download',
							width : 590,
							height : 280,
							content : ['<div class="popup_download__btns">',
									'		<a href="'+data[_map[type]].Flink1+'" class="popup_download__btn_down'+(type == 'iphone'?'':' popup_download__btn_single')+'"> ',
									'			<i class="popup_download__icon_down"></i> ',
									'			下载安装包',
									'		</a>',
									(type == 'iphone'?['		<a href="'+data[_map[type]].Flink2+'" rel="noopener" target="_blank" class="popup_download__btn_ios_store">',
									'			<i class="popup_download__icon_phone"></i> ',
									'			去iTunes Store 下载',
									'		</a>'].join(''):''),
									'	</div>',
									'	<div class="qr_code">',
									'		<h4 class="qr_code__tit">扫描二维码下载</h4>',
									'		<img src="'+data[_map[type]].Fcode+'" class="qr_code__pic">',
									'	</div>'].join('')
						});
					});
					break;
				
				}
				var stat = $(this).data('stat')||'';
				if (!!stat)
				{
					statistics.pgvClickStat(stat);
				}
				return false;
			});
		},
		error : function(){}
	});
}
function showTopInfo(){
	var mapMenu = {
		'profile.html' : [1, -1],
		'mymusic.html' : [1, -1],
		'songlist_import.html' : [1, -1],
		'list_recover.html' : [1, -1],
		'mymusic_edit.html' : [1, -1],
		'y.qq.com/index.html' : [0, 0],
		'y.qq.com/portal/index.html' : [0, 0],
		'search.html' : [-1, -1],
		'/song/' : [0, -1],
		'/playlist/' : [0, -1],
		'/album/' : [0, -1],
		'/album_lib.html' : [0, 2],
		'/album_mall.html' : [0,7],
		'/piao_wu.html' : [0,8],
		'/singer/' : [0, -1],
		'/singerlist.html' : [0, 1],
		'/singer_list.html' : [0, 1],
		'/toplist/' : [0, 3],
		'/mv/v/' : [0, -1],
		'/mv/c/' : [0, -1],
		'/playlist.html' : [0, 4],
		'/radio.html' : [0, 5],
		'/mv_lib.html' : [0, 6],
		'/mv_toplist.html' : [0, 3],
		'/mv/mv_upload.html' : [0, -1],
		'/mv/mv_upload_system.html' : [1, -1],
		'/company_detail.html' : [0, -1]
	};
	var menu = [-1, -1];
	for (var i in mapMenu)
	{
		if (window.location.href.indexOf(i)!=-1)
		{
			menu = mapMenu[i];
		}
	}
	if (window.location.pathname == '/'||window.location.pathname == '/index.html')
	{
		menu = [0, 0];
	}
	if (window.location.pathname == '/portal/'||window.location.pathname == '/portal'||window.location.pathname == '/portal/index.html')
	{
		menu = [0, 0];
	}
	if (menu[0]!=-1)
	{
		$('.mod_top_subnav:eq('+menu[0]+')').show();
		$('.top_nav__link:eq('+menu[0]+')').addClass('top_nav__link--current');
	}else 
		$('.top_nav__link').removeClass('top_nav__link--current');
	if (menu[1]!=-1)
	{
		$('.top_subnav__link:eq('+menu[1]+')').addClass('top_subnav__link--current');
	}else 
		$('.top_subnav__link').removeClass('top_subnav__link--current');
	showUserInfo();
	initFooter();
	$(document).off('click', '.js_openvip').on('click', '.js_openvip', function(){
		var aid= $(this).data('aid')||'';
		var type = $(this).html().indexOf('升级')==-1;
		var stat= $(this).data('stat')||'';
		MUSIC.widget.user.openVip(aid, type, stat);
	}).off('click', '.js_openmusic').on('click', '.js_openmusic', function(){
		var aid= $(this).data('aid')||'';
		var stat= $(this).data('stat')||'';
		MUSIC.widget.user.openPayMusic(aid, stat);
	}).on('click', '.js_buy_album', function() {
		MUSIC.widget.user.buyAlbum({
			title: '购买数字专辑',
			albumid: $(this).data('albumid')||'',
			actid: $(this).data('actid')||0,
			frompage: 'zwsharezuduan'
		});
		return false;
	}).off('click', '.js_logout').on('click', '.js_logout', function(){
		var $this = $(this);
		MUSIC.widget.user.loginOut(function(){
			var stat= $this.data('stat')||'';
			if (!!stat)
			{
				window.location.href = window.location.href+((window.location.href.indexOf('#')==-1)?'#':'&')+'stat='+stat;
				window.location.reload();
			}else window.location.reload();
		});//(function(){showTopInfo();});
	}).off('click', '.js_login').on('click', '.js_login', function(){
		MUSIC.widget.user.openLogin();
		var stat= $(this).data('stat')||'';!!stat&&statistics.pgvClickStat(stat);
	})
}
window.showTopInfo = showTopInfo;
showTopInfo();

/*下载链接的数据获取*/
function prepareDoanload(){
	
	require.async("js/common/download.js", function(download){
		download.prepareDownload();
	});
}
setTimeout(function(){
	prepareDoanload();
}, 500);

if(MUSIC.userAgent.ie && MUSIC.userAgent._setTimeout && MUSIC.userAgent._setInterval){ //一些浏览器行为矫正
	eval((MUSIC.userAgent.ie < 9 ? "var document = MUSIC.userAgent._doc;" : "") + "var setTimeout = MUSIC.userAgent._setTimeout, setInterval = MUSIC.userAgent._setInterval");
}
if (navigator.userAgent.search(/Windows (NT 5\.|NT 6\.0|XP|2000|2003)/) > -1) { //win7之前版本 默认用宋体（不支持微软雅黑）
	$('body').addClass('os_xp');
}
if (MUSIC.userAgent.macs>-1)
{
	$('body').addClass('os_mac');
}
$(function(){
		function detectZoom (){ 
			  var ratio = 0,
			  screen = window.screen,
			  _ua = navigator.userAgent.toLowerCase();
			 	//mac为视网膜屏幕，ratio为两倍

			  if (window.devicePixelRatio !== undefined && _ua.indexOf('macintosh') < 1 ) {
			      ratio = window.devicePixelRatio;
			  }
			  else if (~_ua.indexOf('msie')) {  
			    if (screen.deviceXDPI && screen.logicalXDPI) {
			      ratio = screen.deviceXDPI / screen.logicalXDPI;
			    }
			  }
			  else if (window.outerWidth !== undefined && window.innerWidth !== undefined ) {
			    ratio = window.outerWidth / window.innerWidth;
			  }
			  if ( _ua.indexOf('macintosh') > 0 ) {
			      ratio = 1;
			  }
			  if (ratio){
			    ratio = Math.round(ratio * 100);
			  }
			   
			   return ratio;
		}
		function show_zoom(zoom){
			return;
			var zoom_warn = $("#zoom_warn");
			if(zoom != 100 && zoom != undefined){
				if(zoom > 100 ){
					$("body").prepend('<div class="popup_top" id="zoom_warn">你的浏览器目前处于放大状态，会导致页面显示不正常，你可以键盘按“Ctrl+数字0“组合键恢复初始状态。<a href="javascript:;" id="stop-remind">不再显示</a></div>');
				}else{
					$("body").prepend('<div class="popup_top" id="zoom_warn">你的浏览器目前处于缩小状态，会导致页面显示不正常，你可以键盘按“Ctrl+数字0“组合键恢复初始状态。<a href="javascript:;" id="stop-remind">不再显示</a></div>');
				}
			}else{
				if (MUSIC.userAgent.ie<8)
				{
					$("body").prepend('<div class="popup_top" id="zoom_warn">使用更高版本的 <a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/" rel="noopener" target="_blank">Chrome</a> 或 <a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" rel="noopener" target="_blank">Internet Explorer</a>，体验更精彩<a href="javascript:;" id="stop-remind">不再显示</a></div>');
				}else
				zoom_warn.remove();
			}
		}

		$("#stop-remind").on('click',function(){
			MUSIC.cookie.set("stop_remind","stop_remind");
			$("#zoom_warn").remove();
		});
		if( !MUSIC.cookie.get("stop_remind") ){
			show_zoom(detectZoom());
		}
		$(window).resize(function(){
			$("#zoom_warn").remove();
				if( !MUSIC.cookie.get("stop_remind") ){
					show_zoom(detectZoom());
				}
		});
	});

setTimeout(function(){
	if (window.location.href.indexOf('mv_toplist.html')==-1&&window.location.href.indexOf('/portal/song')==-1&&window.location.href.indexOf('/portal/singer/')==-1&&window.location.href.indexOf('/portal/album/')==-1&&window.location.href.indexOf('/portal/playlist/')==-1&&window.location.href.indexOf('/portal/mv/c/')==-1&&window.location.href.indexOf('/portal/mv/v/')==-1&&window.location.href.indexOf('/song')==-1&&window.location.href.indexOf('/singer/')==-1&&window.location.href.indexOf('/album/')==-1&&window.location.href.indexOf('/playlist/')==-1&&window.location.href.indexOf('/mv/c/')==-1&&window.location.href.indexOf('/mv/v/')==-1)
	{
		statistics.doPvg(window.location.href.replace(new RegExp("(#)+.*"), ""));
	}
	
	$.getScript('https://tajs.qq.com/stats?sId=58495963', function(){});
}, 1000);

var stat = MUSIC.util.getUrlParams().stat||'';
if (!!stat&&parseInt(MUSIC.cookie.get('yqq_stat')) == 1 )
{
	MUSIC.cookie.set('yqq_stat', 0);
	statistics.pgvClickStat(stat);
	/*if (!MUSIC.userAgent.ie)
	{
		MUSIC.util.updateHash({
			"stat": ''
		});
	}*/
}else {
	MUSIC.cookie.set('yqq_stat', 0);
}



SPD.init&&SPD.init({flag:[1649,5,SPD.getStatSource()]});

try{
	
	if (!(document.all && document.querySelector && !document.addEventListener)&&navigator.serviceWorker) {

		var src = '/portal/sw.js';

		if (location.href.indexOf('c.y.qq.com') > -1 ) {
			src = '/node/yqq/sw.js';
		} else if (location.href.indexOf('y.qq.com/n/') > -1){
			src = '/n/yqq/sw.js';
		}

		navigator.serviceWorker.register(src);

		navigator.serviceWorker.addEventListener('message', function (event) {
			var data = event.data;

			// 更新机制
			$('img[src="'+ data.src.replace(/https:/, '') + '"]').attr('src', URL.createObjectURL(data.blob));
		});
	}
	else {
		//console.log('sw注册失败');
	}
}
catch (e){
}



return MUSIC;

window.MUSIC = MUSIC;


});