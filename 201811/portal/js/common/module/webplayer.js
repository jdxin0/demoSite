define('js/common/module/webplayer.js', function(require, exports, module){

/**
 * @fileoverview MUSIC module WebPlayer
 * @author MUSICWebGroup
 * @version 1.0
 */
var MUSIC = require("js/common/music.js");
var $ = MUSIC.$;
var g_user = MUSIC.user;
var ua = MUSIC.userAgent;
var debugMode=false,
	m = MUSIC || {},
	cs ={
		p : function() {
			try{
				window.console && console.log(([].slice.call(arguments)).join('\t'));
			}catch(e){
			}
		}
	};

function isArray(arr) 
{ 
	return arr instanceof Array; 
}
var getType = function (obj){return obj===null?'null':(obj===undefined?'undefined':Object.prototype.toString.call(obj).slice(8,-1).toLowerCase());};
function isHashMap(o) {
	return getType(o) == "object";
}
var m_r_r_s = "";
function m_r_GetRUin(){
	var curMs;
	if(m_r_r_s.length>0){return m_r_r_s;}
	var u = MUSIC.cookie.get("pgv_pvid");
	if(!!u && u.length>0){
		m_r_r_s = u;
		return m_r_r_s;
	}
	curMs = (new Date()).getUTCMilliseconds();
	m_r_r_s = (Math.round(Math.random()* 2147483647)*curMs) % 10000000000;
	document.cookie = "pgv_pvid="+m_r_r_s+"; Expires=Sun, 18 Jan 2038 00:00:00 GMT; PATH=/; DOMAIN=qq.com;";
	return m_r_r_s;
};
m.useIpv6 = 0;
m.isIpv6 = 0;
m.expType = 2;
m.playerArr = [{3:100},{4:100},{5:100},{6:100},{7:100}];
m.expCdnArr = [];//[{'cdn':'dl','expType':10,'t':0}];//按竞速时间t1<t2排序{'cdn':'cc','expType':1,'t':0},{'cdn':'ws','expType':2,'t':0},
m.expTestUrl = '';
m.expIdx = 0;
m.rateSpeed = true;
window.g_JData = window.g_JData || {};
window.g_vkey = window.g_vkey || {};//2. 缓存中的vkey有效期为30分钟，每次刷新缓存时删除过期缓存；以防过期 25分钟就更换 key:item.filename value:{songmid:sssssss,filename:sjsjsj.mp4, vkey:shshshs, date:3030303}
function getVkey(o, cb){
	var songtypes = [], songmids = [], jsonpCallback = 'MusicJsonCallback' + (Math.random() + '').replace('0.', ''), nowTime = (new Date()).getTime(), maxTime = 25*60*1000;//expiration=80400
	$.each(o, function(idx, item){
		if (((!!((item.songmid) in g_vkey) && (nowTime-g_vkey[item.songmid].date)>=item.expiration)||!((item.songmid) in g_vkey)) && !!item.songmid)
		{
			songtypes.push(item.songtype);
			songmids.push(item.songmid);
		}
	});
	if (songmids.length>0)
	{
		var o = {
			"req" : {
				"module": "CDN.SrfCdnDispatchServer",
				"method": "GetCdnDispatch",
				"param": {
					"guid": ""+_getGuid(),
					"calltype": 0,
					"userip": ''
				}
			},
			"req_0": {
				"module": "vkey.GetVkeyServer",
				"method": "CgiGetVkey",
				"param": {
					"guid": ""+_getGuid(),
					"songmid": songmids,
					"songtype": songtypes,
					"uin": (g_user.getUin()+''),
					"loginflag": 1,
					"platform": "20"
				}
			},
			"comm": {
				//"g_tk": 1639783671,
				"uin": g_user.getUin(),
				"format": "json",
				"ct": 20,
				"cv": 0
			}
		};
		if (m.expCdnArr.length > 0&&!m.rateSpeed){
			delete o.req;
		}
	
		var jcb = 'getplaysongvkey'+(Math.random() + '').replace('0.', '');
		MUSIC.jQueryAjax.jsonp({
			url : '//u.y.qq.com/cgi-bin/musicu.fcg?callback='+jcb,
			data : {data:JSON.stringify(o)},
			jsonpCallback : jcb,
			charset : 'utf-8',
			success : function (ret) {
				
				if (ret&&ret.req_0&&ret.code == 0&&ret.req_0.data&&ret.req_0.data.midurlinfo&&ret.req_0.data.midurlinfo.length>0)
				{
					$.each(ret.req_0.data.midurlinfo, function(idx, item){
						if (!!item.purl)
						{
							item.date = (new Date()).getTime();
							item.expiration = ret.req_0.data.expiration;
							g_vkey[item.songmid] = item;
						}
					});
					if ((m.expCdnArr.length==0||m.rateSpeed)&&ret.req&&ret.req.data&&ret.req.data.sip){
						$.each(ret.req.data.sip, function(idx, item){
							m.expCdnArr.push({'cdn':item,'expType':0,'t':0});
						});
						if (!!ret.req.data.testfilewifi){
							m.expTestUrl = ret.req.data.testfilewifi;
							m.rateSpeed = false;
						}
					}
				}
				cb&&cb();
			},
			error : function() {
				cb&&cb();
			}
		});
	}else {
		cb&&cb();
	}
}
/**
 * 加载json数据
 * 
 * @param {String or Number} x
 * @param {String} url
 * @param {Function} cb
 * @param {Function} ecb
 * @param {Boolean} refresh
 * @param {String} c
 * @param {String} f
 */
function loadJsonData(x, u, cb, ecb, r, c, f){
	var	s,
		d = window.g_JData;
	if (d[x] && !r && !d[x].error){
		cb(d[x]);
		return;
	}
	c = c || "GB2312";
	f = f || "JsonCallback";
	
	MUSIC.jQueryAjax.jsonp({
		url : u,
		charset : c,
		jsonpCallback : f,
		success : function(o) {
			try{
				cb(d[x] = o);
			}catch(e){
			}
		},
		error : function(){
			ecb&&ecb();
		}
	});
};
m.OZ = {
	baseSpeed : 0,
	pingSender : function(url){
		(new Image()).src = url;
	},
	speedSet : function (f2, f3, id, value, basetime, baseSpeed) {
		var key = f2 + '_' + f3,
			startTime,
			endTime,
			speed;
		
		baseSpeed = baseSpeed || m.OZ.baseSpeed;
		!this[key] && (this[key] = []);
		startTime = basetime || this[key][0];
		endTime = value || (+new Date());
		(id !== 0 && startTime !== undefined && startTime !== null) && (speed = endTime - startTime);
		(id === 0) && (speed = endTime - 1 + 1);
		(speed !== undefined && speed > baseSpeed) && (this[key][id] = speed);
		cs.p("speedSet,flag1=170,flag2=",f2,",flag3=",f3,",id=",id,",speed=",speed);
	},
	speedSend : function (f2, f3, rate) {
		rate = rate || 1;
		if(!(typeof(rate)=="number" && rate>0 && ((+new Date())%rate==0))){
			return;
		}
		
		var key = f2 + '_' + f3,
			data = this[key],
			_arr = [],
			url;
		if (!data || data.length <= 0) {
			return false;
		}
		for (var i = 1; i < data.length; i++) {
			data[i] && (_arr.push(i + '=' + data[i]));
		}
		url = (location.protocol == 'https:' ? 'https://huatuospeed.weiyun.com' : 'http://isdspeed.qq.com') + "/cgi-bin/r.cgi?flag1=170&flag2=" + f2 + "&flag3=" + f3 + "&" + _arr.join("&");
		cs.p('speed report:',url,";_arr.length:",_arr.length,";data.length:",data.length);
		_arr.length > 0 && this.pingSender(url);
		this[key] = [];
	},
	/**
	 * 把对象转化成url的参数
	 * 
	 * @param {Object} data map对象
	 * @return {String}
	 */
	build_args : function(d){
		var buf = [];
		for(var n in d){
			buf.push(n+'='+d[n]);
		}
		return buf.join('&');
	},
	errorSend : function(f2,f3,data){
		if (getType(data) != "object") {
			return 0;
		}
		
		url = (location.protocol == 'https:' ? 'https://huatuospeed.weiyun.com' : 'http://isdspeed.qq.com') + "/cgi-bin/r.cgi?flag1=170&flag2=" + f2 + "&flag3=" + f3 + "&" +this.build_args(data);
		cs.p('errorSend:',url);
		this.pingSender(url);
	},
	/*
	 * mm返回码上报统计
	 http://tapd.oa.com/v3/Mobile_monitor/wikis/view/mm%2525E6%25258E%2525A5%2525E5%252585%2525A5%2525E6%25258C%252587%2525E5%2525BC%252595
	 *
	 * @param {object}
	 *			opt = { 
							commandid : 'gdtad',//命令字或uri 需要做翻译注册 http://habo.oa.com/app/appCommand.php?appid=1000217
							resultcode : 0,//返回码 0,1,998等等需要做翻译注册 http://habo.oa.com/app/appCode.php?appid=1000217
							tmcost : now - startTime,//请求耗时 单位是ms
							detail : '',//返回详细信息
							frequency : 1 //上报值为分母，主要用于还原访问次数，成功量按1/20抽样（填20），失败量全量上报（填1）
						}
	 */
	errorSendToMM : function(opt){
		var url = "http://wspeed.qq.com/w.cgi?appid=1000217&releaseversion=yqq1&commandid=" + (opt.commandid||'') +"&resultcode=" + (opt.resultcode||0) + "&touin="+(g_user.getUin()||0)+"&tmcost=" + (opt.tmcost||0) + "&frequency=" + (opt.frequency||1) + "&detail=" + (opt.detail||'') + "&rmd=" + (+new Date());
		cs.p('errorSend:',url);
		this.pingSender(url);
	}
};
MUSIC.module = {};

m.OZ.simplePingSender = function(url, t, opts){
	if(!url){
		return;
	}
	var _s = m.OZ.simplePingSender,
		iid,
		img;
	opts = opts || {};
	//h5 audio
	var audio = document.createElement('audio');
	var _h5Support = !!(audio && audio.canPlayType);
	if (_h5Support) {
		iid = "sndImg_" + _s._sndCount++;
		_s._sndPool[iid] = audio;
		audio.iid = iid;
		audio.oncanplay=function(e){
			if (typeof(opts['load']) == 'function'){
				var ref = e.target;
				opts['load']({ 'type' : 'load', 'duration' : ((new Date()).getTime() - ref._s_) , 'url' : ref.src});
				m.OZ.simplePingSender._clearFn(e, ref);
			}
		}
		audio.onerror=(function(ref){
			return function(){
				if (typeof(opts['error']) == 'function'){
					opts['error']({ 'type' : 'error', 'duration' : ((new Date()).getTime() - ref._s_) , 'url' : ref.src});
					m.OZ.simplePingSender._clearFn(null, ref);
				}
			};
		})(audio);
		(typeof(opts.timeout) == 'function') && setTimeout(function(){
					$.each(_s._sndPool, function(idx, item){
						var ref = item;
						opts['timeout']({ 'type' : 'timeout', 'duration' : 1000000000 , 'url' : ref.src});
						m.OZ.simplePingSender._clearFn(null, ref);
					});
				}, (typeof(opts.timeoutValue) == 'number' ? Math.max(100, opts.timeoutValue) : 10000));
		setTimeout(function(){
			audio._s_ = (new Date()).getTime();
			audio.src = url;
			audio.autoplay = "autoplay";
			audio.preload="load"
			$('body')[0].appendChild(audio);
			audio.play();
		}, (t = Math.max(0, t)));
	} else {
		


		
		iid = "sndImg_" + _s._sndCount++;
		img = _s._sndPool[iid] = new Image();
		img.iid = iid;
		img.onload = img.onerror = img.ontimeout = (function(t){
			return function(evt){
				evt = evt || window.event || { type : 'timeout' };
				void(typeof(opts[evt.type]) == 'function' ? setTimeout(
					(function(et, ti, url){
						return function(){
							opts[et]({ 'type' : 'load'/*et*/, 'duration' : ((new Date()).getTime() - ti) , 'url' : url});
						};
					})(evt.type, t._s_, $(evt.target).attr('src'))
					, 0) : 0);
				m.OZ.simplePingSender._clearFn(evt, t);
			};
		})(img);

		(typeof(opts.timeout) == 'function') && setTimeout(function(){
						img.ontimeout && img.ontimeout({ type : 'timeout' });
					}, (typeof(opts.timeoutValue) == 'number' ? Math.max(100, opts.timeoutValue) : 10000));

		void((typeof(t) == 'number') ? setTimeout(function(){
			img._s_ = (new Date()).getTime();
			img.src = url;
		}, (t = Math.max(0, t))) : (img.src = url));
	}
	
};

m.OZ.simplePingSender._sndPool = {};

m.OZ.simplePingSender._sndCount = 0;

m.OZ.simplePingSender._clearFn = function(evt, ref){
	//evt = evt || window.event;
	var _s = m.OZ.simplePingSender;
	if(ref){
		_s._sndPool[ref.iid] = ref.onload = ref.onerror = ref.ontimeout = ref._s_ = null;
		delete _s._sndPool[ref.iid];
		_s._sndCount--;
		ref = null;
	}
};

/**
 * MUSIC 网页播放器操作类
 * 
 * @namespace MUSIC.module.webPlayer
 * @author peterpeng
 * @description 网页播放器操作类用于提供在网页中播放歌曲，根据浏览器加载相应的VQQPlayer控件、html5 audio、wmp。
 */
MUSIC.module.webPlayer = {
	
};
//播放器7种状态
MUSIC.module.webPlayer.playStatus = {
	S_UNDEFINE : 0,
	S_STOP : 1,
	S_PAUSE : 2,
	S_PLAYING : 3,
	S_BUFFERING : 4, 
	S_PLAYBEGIN : 5,
	S_PLAYEND : 6
};
/**
 * webplayer播放统一接口
 * @description 
 */
MUSIC.module.webPlayer.interFace = (function(){
	var VQQPlayer = null;		//QQ音乐播放控件
	var MediaPlayer = null;		//wmp
	var VH5Player = null;		//html5 audio
	var VFlashPlayer = null;	//flash
	var webPlayer = null;
	var playerList = null;	
	//var mFromTag = 29;			//流媒体文件校验fromtag，默认为QQ音乐电台
	var musicInitReady = false;		//是否初始化控件
	var isLoading = false;			//是否正在初始化，防止重复生成播放控件
	var songDuration = 0;			//歌曲长度
	var curPostion = 0;				//当前时间
	var mIsLoop = false;			//当列表播放时是否循环播放
	
	var mIsH5Mp3 = true;			//html5是否支持mp3
	var mPlayerType = 0;			//1：QQ音乐播放控件，2：wmp，3：h5audio, 4: flash
	var mOption = {					//配置
		//客户端控件上报fromtag，默认电台29
		fromtag : 30,				
		fromtagvkey : 66,				
		//web前端上报来源，1为空间音乐盒，2为y.qq.com，3为soso，4为腾讯微博，5为qq音乐电台，6 朋友网，7 QQ音乐官网
		statFromtag : 0,
		//控件加载出错提示
		errorTips : function(title, text) {
			alert(title + "</br>" + text);
		}
	};
	//流媒体文件格式
	//wma: stream1-10.qqmusic.qq.com/12000000 + id .wma
	//mp3: stream11-20.qqmusic.qq.com/30000000 + id.mp3
	//var wmaurl_tpl = 'http://stream%(stream).qqmusic.qq.com/%(sid).wma';
	var wmaurl_tpl = '//stream%(stream).qqmusic.qq.com/%(sid).mp3';
	var wmaurl_tpl2 = '//stream%(stream).qqmusic.qq.com/%(sid).wma';
	var mp3url_tpl = '//stream%(stream).qqmusic.qq.com/%(sid).mp3';
	var tpturl_tpl = '//tpt.music.qq.com/%(sid).tpt';
	//歌曲信息
	var songInfoObj = {
		//mId : -1,
		mstream : 0,
		murl : '',
		//mTorrentURL : '',
		//mDuration : '',
		msong : '',
		msinger : '',
		mQzoneKey : '',
		mid : 0,
		mSongType : 0
	};
	//设置fromtag
	/*function setFromtag(fromtag){
		mFromTag = fromtag;
	}*/
	//初始化函数
	function init(opt) {
		$.extend(mOption, opt || {});
	}
	
	function getOption() {
		return mOption;
	}
	function getWebPlayer(){
		return webPlayer;
	}
	//设置当前播放位置
	function setCurPostion(cp, duration){
		curPostion = cp;
		songDuration = duration;
	}
	//获取当前播放位置
	function getCurPostion(){
		return curPostion;
	}
	
	//获取当前播放的歌曲长度
	function getSongDuration(){
		return songDuration;
	}
	//获取当前播放歌曲的索引
	function getPostion() {
		return playerList.getPostion();
	}
	//设置当前播放歌曲的索引
	function setPostion(pos) {
		return playerList.setPostion(pos);
	}
	function initSongInfoObj(){
		songInfoObj = {
			//mId : -1,
			mstream : 0,
			murl : '',
			//mTorrentURL : '',
			//mDuration : '',
			msong : '',
			msinger : '',
			mQzoneKey : '',
			mid : 0,
			mSongType : 0
		};
	}
	//设置当前播放歌曲信息
	function setSongInfoObj(obj){
		initSongInfoObj();
		$.extend(songInfoObj, obj || {});
		
		g_playerStat.add(songInfoObj);
	}
	//返回当前歌曲信息对象引用
	function getSongInfoObj(){
		return songInfoObj;	
	}
	//加载wmp
	function loadWmPlayer(callback){
		require.async('js/common/module/wmp.js', function(wmp){
			try
			{
				MediaPlayer = g_player.wmPlayer(mOption.fromtag);
				MediaPlayer.createActiveX();
				MediaPlayer.initialize();
			}
			catch (e)
			{
				//alert("exception:"+e.message);
				if(/win/.test(navigator.platform.toLowerCase()) && (!!ua.firefox || !!ua.ie) && typeof(g_dialog) != "undefined"){
					g_dialog.show({
						mode : "common",			//模式， common：普通模式，iframe：加载页面，默认common
						title : "您使用的是旧版音乐控件，请进行更新。或检查浏览器是否禁用了控件。",					//标题，必填
						icon_type : 1,				//图标类型，取值0-2[0：成功，1：警告，2：帮助]
						button_info1 : {
							highlight : 1,
							onclick : "var w = window.open('http://dl_dir.qq.com/music/clntupate/QzoneMusicInstall.exe');if(w)w.opener = null;g_dialog.hide();",
							title : "立即更新"
						},
						button_info2 : {
							highlight : 0,
							onclick : "g_dialog.hide();",
							title : "关闭"
						}
					});
				} else {
					mOption.errorTips('播放歌曲失败！', '您没有安装WindowsMediaPlayer插件或该插件被禁用。');
				}
				return false;
			}
			musicInitReady = true;
			isLoading = false;
			webPlayer = MediaPlayer;
			mPlayerType = 2;
			EventUtil(window,"unload",g_playerCallback.OnUnitialized);
			if (callback){
				callback();
			}
		});
		/*var jsloader = new MUSIC.JsLoader();
		jsloader.onload = function(){
			
		};
		jsloader.onerror = function(){
			mOption.errorTips('播放歌曲失败！', '加载wmp播放控件失败，请稍后重试。');
		};
		jsloader.load("//y.gtimg.cn/music/portal_v3/js/wmp.js", null, "utf-8");*/
	}
	
	//加载FlashPlayer
	function loadFlashPlayer(callback){
		require.async('js/common/module/flashplayer.js', function(flashplayer){
			try {
				VFlashPlayer = g_player.qFlash(mOption.fromtag);
				VFlashPlayer.createActiveX();
				VFlashPlayer.initialize();
			} catch (e) {
				alert("exception:"+e.message);
			}
			musicInitReady = true;
			isLoading = false;
			webPlayer = VFlashPlayer;
			mPlayerType = 4;
			EventUtil(window,"unload",g_playerCallback.OnUnitialized);
			if (callback){
				callback();
			}
		});
		/*var jsloader = new MUSIC.JsLoader();
		jsloader.onload = function(){
			try {
				VFlashPlayer = g_player.qFlash(mOption.fromtag);
				VFlashPlayer.createActiveX();
				VFlashPlayer.initialize();
			} catch (e) {
				alert("exception:"+e.message);
			}
			musicInitReady = true;
			isLoading = false;
			webPlayer = VFlashPlayer;
			mPlayerType = 4;
			EventUtil(window,"unload",g_playerCallback.OnUnitialized);
			if (callback){
				callback();
			}
		};
		jsloader.onerror = function(){
			mOption.errorTips('播放歌曲失败！', '加载Flash播放控件失败，请稍后重试。');
		};
		jsloader.load("//y.gtimg.cn/music/portal_v3/js/flashplayer.js", null, "utf-8");*/
	};
	function loadH5AudioPlayer(callback){
		MUSIC.useIpv6 = 1;
		require.async('js/common/module/h5audio.js', function(songlist){
			try
			{
				VH5Player = g_player.h5Audio(mOption.fromtag);
				VH5Player.createActiveX();
				VH5Player.initialize();
			}
			catch (e)
			{
				alert("exception:"+e.message);
			}
			
			musicInitReady = true;
			isLoading = false;
			webPlayer = VH5Player;
			mPlayerType = 3;
			var audio = document.createElement('audio');
			//if(!!audio.canPlayType && !!audio.canPlayType('audio/mpeg')){
			if(!!audio.canPlayType){
				//支持mp3播放
				
			} else {
				//可能不支持mp3播放，转换成wma格式文件
				mIsH5Mp3 = false;
				mOption.errorTips('播放歌曲失败！', '该功能目前不支持您的浏览器，请使用chrome，高版本safari，firefox或者IE进行播放。');
			}
			EventUtil(window,"unload",g_playerCallback.OnUnitialized);
			if (callback){
				callback();
			}
		});
		/*var jsloader = new MUSIC.JsLoader();
		jsloader.onload = function(){
			
		};
		jsloader.onerror = function(){
			mOption.errorTips('播放歌曲失败！', '加载html5 audio失败，请稍后重试。');
		};
		jsloader.load("//y.gtimg.cn/music/portal_v3/js/h5audio_action.js", null, "utf-8");*/
	};
	
	//初始化播放器控件，根据浏览器加载相应的播放控件
	function initMusic(callback){
		//var ie11 = (!!ua.ie && (ua.ie >= 11 || document.documentMode >= 11));
		//alert(JSON.stringify(g_webPlayer.getSongInfoObj() || {}));
		var _music = g_webPlayer.getSongInfoObj() || {msongurl:""};
		if (!!ua.ie && /share\.weiyun\.qq\.com/i.test(_music.msongurl)) {
			//IE下audio不能播放微云链接，改用Flash
			!VFlashPlayer && (g_webPlayer.stopPlayer(), VH5Player = null, musicInitReady = false);
		}
		
		if (!musicInitReady){
			if (!isLoading){
				//return ;
			}
			isLoading = true;
			EventUtil(window, "unload", function(){
				g_playerStat.add();
			});

			//统一换成h5 audio或者flash
			var _audio = document.createElement('audio'),
				_h5Support = !!(_audio && _audio.canPlayType);
			if (_h5Support && !(!!ua.ie && /share\.weiyun\.qq\.com/i.test(_music.songurl))) {
				loadH5AudioPlayer(callback);
			} else {
				loadFlashPlayer(callback);
			}
		}
		else {
			if (callback){
				callback();
			}
		}
	}
	/*
	 * 歌曲播放开始时调用，需要使用则重新覆盖函数
	 * @param {Object} songinfo 歌曲信息对象，设置播放列表时传入
	 * @param {int} index 当前歌曲在播放列表中的位置
	 * @param {int} total 播放列表总数
	 */
	function OnSongPlayBegin(songinfo, index, total){
		
	}
	/*
	 * 歌曲播放结束时调用，需要使用则重新覆盖函数
	 * @param {Object} songinfo 歌曲信息对象，设置播放列表时传入
	 * @param {int} index 当前歌曲在播放列表中的位置
	 * @param {int} total 播放列表总数
	 */
	function OnSongPlayEnd(songinfo, index, total){
		
	}
	/*
	 * 歌曲播放时调用，每秒内更新播放时间进度，需要使用则重新覆盖函数
	 * @param {int} lCurPos 当前播放进度，单位为秒
	 * @param {int} lTotal 歌曲总时长，单位为秒
	 */
	function OnSongPlaying(lCurPos, lTotal){
		
	}
	/*
	 * 歌曲下载时调用
	 * @param {int} progress 百分比
	 */
	function OnSongDownloading(progress){
		
	}
	//播放暂停回调
	function OnPlayPause(){
		
	}
	//播放停止回调
	function OnPlayStop(){
		
	}
	//播放中回调
	function OnPlaying(){
		
	}
	//播放失败回调
	function OnPlayError(songinfo, index){
	}
	
	//暂停或停止后恢复播放
	function startPlayer(){
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		!!webPlayer && webPlayer.startPlayer();
	}
	//暂停播放
	function pausePlayer(){
		!!webPlayer && webPlayer.pausePlayer();
	}
	//停止播放
	function stopPlayer(){
		!!webPlayer && webPlayer.stopPlayer();
	}
	function lastPlayer(){
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		playerList.lastPostion();
		playList();
		return true;
	}
	//歌曲首次播放或跳到下一首播放
	function nextPlayer(){
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		//if (getSongInfoObj().mid != 0){
			g_webPlayer.OnSongPlayEnd(getSongInfoObj(), playerList.getPostion('auto'), playerList.getCount());
			
		//}
		
		playerList.nextPostion();
		playList('auto');
		return true;
	}
	//自动播放跳到下一首
	function autoNextPlayer(){
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		//if (getSongInfoObj().mid != 0){
			g_webPlayer.OnSongPlayEnd(getSongInfoObj(), playerList.getPostion('auto'), playerList.getCount());
			
		//}
		
		if (playerList.autoNextPostion()){
			playList('auto');
		} else {
			stopPlayer();
		}
		
		return true;		
	}
	function playAnyPos(pos) {
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		playerList.setPostion(pos);
		playList();
		return true;
	}
	/*
	 * 增加列表歌曲
	 * @param {Object} list 歌曲信息列表对象数组，库内歌曲必须包含mid、mstream，非库内歌曲包含msongurl
	 * @param {Boolean} isPlay true为设置了歌曲信息立即播放，false为设置了歌曲信息不播放
	 */
	function addSong(list, isPlay) {
		if (!playerList || playerList.getCount() <= 0){
			return false;
		}
		var pos = playerList.getCount();
		playerList.addSongList(list);
		if (isPlay) {
			playerList.setPostion(pos);
			playList();
		}
	}
	//向播放列表中删除歌曲
	function delSong(pos) {
		if (!!playerList)
		{
			var curPos = playerList.getPostion();
			playerList.delSong(pos);
			if (pos == curPos) {
				if (!playerList || playerList.getCount() <= 0){
					stopPlayer();
					return false;
				}
				
				if(curPos >= (playerList.getCount() - 1)) {
					playerList.setPostion(playerList.getCount() - 1);
				}
				
				playList();
			}
		}
		return true;
	}
	
	//播放列表中插入歌曲
	function insertSong(pos, songinfo){
		if (!playerList){//未初始化歌曲列表时插入忽略
			return false;
		}
		playerList.insertSong(pos, songinfo);
		return true;
	}
	
	//设置静音或恢复静音
	function mutePlayer(){
		!!webPlayer && webPlayer.setMute();
	}
	//获取音量
	function getVolumn(){
		if (!webPlayer){
			return 0;
		}
		return webPlayer.getVolumn();
	}
	//设置播放音量，默认为75（0<=vol<=100）
	function setVolumn(vol){
		!!webPlayer && webPlayer.setVolumn(vol);
	}
	function setPlayerState(status){
		!!webPlayer && webPlayer.setPlayerState(status);
	}
	//设置播放进度
	function setPlayProgress(curtime){
		!!webPlayer && webPlayer.setPlayProgress(curtime);
	}
	//设置下载进度
	function setDownloadProgress(progress){
		!!webPlayer && webPlayer.setDownloadProgress(progress);
	}
	//获取歌曲下载进度
	function getDownloadProgress(){
		if (!webPlayer){
			return 0;
		}
		return webPlayer.getDownloadProgress();
	}
	//歌曲单首播放
	function playSong(obj){
		//alert('playsong!');
		if (typeof obj != "object"){
			mOption.errorTips('歌曲信息错误！', "");
			return;
		}
		if (!obj.stream || !obj.songid){
			mOption.errorTips('歌曲信息错误！', "");
			return;
		}
		MUSIC.expIdx = 0;
		setSongInfoObj(obj);
		initMusic(function(){
			webPlayer.setPlayURL();
		});
	}
	/*
	 * 设置播放列表信息
	 * @param {Boolean} isPlay true为设置了歌曲信息立即播放，false为设置了歌曲信息不播放
	 * @arr {Object} arr 歌曲信息列表对象数组，库内歌曲必须包含mid、mstream，非库内歌曲包含msongurl
	 * @param {int} mdoe 播放模式，1：单曲循环（默认），2：顺序播放，3：列表循环，4：随机播放
	 */
	function setPlayerList(isPlay, arr, mode){
		!!playerList || (playerList = g_playerList());
		playerList.setPlayerList(arr, mode);
		
		
		if (isPlay){
			nextPlayer();
		}
	}
	function setSongsFavStatus (mids, flag){
		!!playerList || (playerList = g_playerList());
		playerList.setSongsFavStatus(mids, flag);
	}
	//设置播放模式
	function setMode(mode){
		if (!playerList){
			return false;
		}
		playerList.setMode(mode);
		return true;
	}
	//当循环到列表最后一首歌曲时回调callback
	function playList(auto){
		!!playerList || (playerList = g_playerList());
		MUSIC.expIdx = 0;
		//alert('playlist!');
		setSongInfoObj(playerList.getSongInfoObj(auto));
		playBegin(auto);
		if (!(!!ua.isiPad || !! ua.isiPhone)){
			setTimeout(function(){
				initMusic(function(){
					webPlayer.setPlayURL();
					//playBegin();
					//OnSongPlayBegin(getSongInfoObj(), playerList.getPostion(), playerList.getCount());
					//if (playerList.isLastPlayer()){
						//listCallBcak();
					//}
				});
			},0);
		} else {
			initMusic(function(){
				webPlayer.setPlayURL();
				//playBegin();
				//OnSongPlayBegin(getSongInfoObj(), playerList.getPostion(), playerList.getCount());
				//if (playerList.isLastPlayer()){
					//listCallBcak();
				//}
			});
		}
	}
	function playBegin(auto){
		if (!playerList){
			return ;
		}
		var _obj = getSongInfoObj();
		MUSIC.OZ.errorSendToMM({
			"commandid" : 'play_error_yqq',
			"resultcode" : 0,
			"detail" : 'OnPlayBegin,songid=' + (_obj.songid||_obj.id||0) + '. '
		});
		g_webPlayer.OnSongPlayBegin(getSongInfoObj(), playerList.getPostion('auto'), playerList.getCount());
	}
	function getPlayerSource(){
		if (!!VQQPlayer){
			return VQQPlayer.getPlayerSource();
		}
		
	}
	//当前播放源
	function getCurrentPlayerSource(){
		if (!!VQQPlayer){
			return VQQPlayer.getCurrentPlayerSource();
		}
	}
	function setCurrentPlayerSource(args){
		!!VQQPlayer && VQQPlayer.setCurrentPlayerSource(args);
	}
	
	//清空播放列表
	function clearPlayerList(){
		if (!playerList){
			return ;
		}
		playerList.clearPlayerList();
		stopPlayer();
	}
	//判断是否是库内正版歌曲
	function isQusicSong(songobj){
		return (isHashMap(songobj) && !!songobj.songid && !!songobj.songmid && songobj.mtype == 'qqmusic');
	}
	/**
	 *获取歌曲在蓝汛CDN或网宿CDN的播放URL,如果有callback参数，则是异步回调模式获取播放url，否则是同步方式返回播放url
	 *
	 * @param {Object} songobj 歌曲信息对象
	 * @param {Function} callback 回调函数
	 * @param {Object} option 配置选项 {cdn:'cc'} 或者{cdn:'ws'},不传该参数的时候默认是{cdn:'cc'}
	 *
	 * @return {String} url 同步模式下返回播放链接
	 */
	 //统一换成48KB m4a http://cc.stream.qqmusic.qq.com/M500002o6NS63bbZpM.mp3?vkey=4BB0F8512312776A1277004A8C653F6AFC9578DE26EC6C0318C4528B591091E7&guid=2074864569
	function getPlayUrl(songobj, callback, option){
		var url = '',
			sid = 0,
			mp3_mid_tpl = {"48":"C200%(mid)","96":"C400%(mid)","128":"M500%(mid)","320":"M800%(mid)"},
			songtypelist = {111:'C4L0%(mid)',112:'R400%(mid)',113:'KC40%(mid)'},
			try_mid_tpl = {"48":"L200%(mid).m4a","96":"L400%(mid).m4a","128":"L500%(mid).mp3"},
			// rate = "128",
			mid = "",
			tryFile = "",
			expPlayUL = function(){
				var t = +new Date();
				try{
					m.OZ.errorSend(118, 4, m.playerArr[mPlayerType]);
					m.OZ.speedSet(118,4,0,t);
					m.getExp = 1;
					m.expType = (option.cdn == 'cc' ? 1 : option.cdn == 'dl'? 10 : 2);
					m.useExp = (option.cdn == 'cc' || option.cdn == 'dl' ? 1 : 0);
					
					var vd = [{
						songmid : songobj.songmid,
						songtype : songobj.songtype
					}];
					getVkey(vd, function(){
						var vd_data = vd[0];
						//url = 'http://'+option.cdn+'.stream.qqmusic.qq.com/'+mid+'.m4a?vkey='+(!!((vd_data.filename) in g_vkey)?g_vkey[vd_data.filename].vkey:'')+"&guid="+m_r_GetRUin() +"&uin="+g_user.getUin() + "&fromtag="+(!!((vd_data.filename) in g_vkey)?mOption.fromtagvkey:mOption.fromtag);
						//url = 'http://isure.stream.qqmusic.qq.com/'+mid+'.m4a?vkey='+(!!((vd_data.filename) in g_vkey)?g_vkey[vd_data.filename].vkey:'')+"&guid="+m_r_GetRUin() +"&uin="+g_user.getUin() + "&fromtag="+(!!((vd_data.filename) in g_vkey)?mOption.fromtagvkey:mOption.fromtag);
						url = option.cdn+g_vkey[vd_data.songmid].purl;
						MUSIC.cookie.set("qqmusic_fromtag", (!!((vd_data.songmid) in g_vkey)?mOption.fromtagvkey:mOption.fromtag), "qq.com");
						cs.p("expPlayUL 3,url:",url);
						callback(songobj.playUrl = url);
					});

					if(!m.tExp){
						m.tExp = 1;
						setTimeout(function(){m.getExp = 0;m.tExp = 0;},7200000);
					}
				}catch(e){
					cs.p("expPlayUL exp:" + e.message);
				}
				//cs.p("expPlayUL 7,url:",url);
				//return url;
			};
		if (isQusicSong(songobj)){
			if(callback){
				if(!m.getExp){
					cs.p("m.getExp 0");
				}else{
					cs.p("m.getExp 1");
				}
				expPlayUL();//loadJsonData("express", m.expul, expPlayUL, expPlayUL, 1, "GB2312", "jsonCallback");
			}
		} else if (!!songobj.songurl){
			url = songobj.songurl;
			callback && callback(url);
		} else {
			cs.p("getSongUrl 2,url:"+url);
			callback && callback(url);
		}
		return url;
	}
	
	//统一获取播放url接口，首次先竞速
	function getSongUrl(songobj, callback){
		if (m.expIdx >= m.expCdnArr.length && m.expCdnArr.length>0) {
			//g_webPlayer.nextPlayer();
			return;
		}
		
		var playUL = function(songobj, callback){
				if (m.expIdx >= m.expCdnArr.length) {
					m.expIdx = 0;
					return;
				}
				var expCdn = m.expCdnArr[m.expIdx];
				getPlayUrl(songobj,callback,expCdn);
			},
			expCb = function(o){
				(o.type == "error" || o.type == "timeout") && (o.duration = o.duration + 10000);
				var arrCdn = o.url.split(m.expTestUrl), cdn = arrCdn.length>0?arrCdn[0]:'';
				var flag = true;
				var list = [];
				$.each(m.expCdnArr, function(i, item){
					if (cdn == item.cdn){
						m.expCdnArr[i].t = o.duration || 1;
					}
					if (m.expCdnArr[i].t == 0){
						flag = false;
					}
				});
				if(!!flag){
					var list = [];
					$.each(m.expCdnArr, function(i, item){
						if (!(item.type == "error" || item.type == "timeout")){
							list.push(item);
						}
					});
					m.expCdnArr = list;
					cs.p(m.expCdnArr);
					m.tExp = 1;
					m.expCdnArr.sort(function(_a,_b){return _a.t - _b.t});
					cs.p(m.expCdnArr);
					
					playUL(songobj, callback);
				}
			},
			expPlayUL = function(){
				m.getExp = 1;
				
				/*if(!isHashMap(d) || d.code != 0 || !d.sip || !d.key){
					cs.p("expPlayUL 2");
					m.useExp = 0;
					m.expType = 2;
					playUL(songobj, callback);
					return;
				}*/
				if (!m.tExp && m.expCdnArr.length >= 2 && !!m.expTestUrl||m.rateSpeed) {
					$.each(m.expCdnArr, function(ti, titem){
						m.OZ.simplePingSender(titem.cdn+m.expTestUrl+'&r='+(Math.random() + '').replace('0.', ''),0, {error:expCb,load:expCb,timeout:expCb});
					});
					//m.OZ.simplePingSender(d.sip[0]+d.testfilewifi+"?fromtag="+mOption.fromtag+"&vkey="+d.key+"&guid="+m_r_GetRUin()+"&p="+r,0,{error:expCb1,load:expCb1,timeout:expCb1});
					//m.OZ.simplePingSender(d.sip[1]+d.testfilewifi+"?fromtag="+mOption.fromtag+"&vkey="+d.key+"&guid="+m_r_GetRUin()+"&p="+r,0,{error:expCb2,load:expCb2,timeout:expCb2});
					//m.OZ.simplePingSender(d.sip[3]+d.testfilewifi+"?fromtag="+mOption.fromtag+"&vkey="+d.key+"&guid="+m_r_GetRUin()+"&p="+r,0,{error:expCb3,load:expCb3,timeout:expCb3});
				} else {
					playUL(songobj, callback);
				}
			};
		
		var r = (+new Date());
		
		if (isQusicSong(songobj)) {
			var vd = [{
				songmid : songobj.songmid,
				songtype : songobj.songtype
			}];
			getVkey(vd, function(){
				expPlayUL();
			});
		} else {
			getCcUrl(songobj, callback);
		}
	}
	
	//获取蓝汛CDN歌曲URL(支持IP V6),如果有callback参数，则是异步回调模式获取播放url，否则是同步方式返回播放url
	function getCcUrl(songobj, callback){
		//return getPlayUrl(songobj,callback,{cdn:'dl'});
		return getPlayUrl(songobj,callback,{cdn:'cc'});
	};
	//获取网宿CDN歌曲URL(蓝汛CND播放失败时获取),如果有callback参数，则是异步回调模式获取播放url，否则是同步方式返回播放url
	function getWsUrl(songobj, callback){
		return getPlayUrl(songobj,callback,{cdn:'ws'});
	}
	//获取帝联CDN歌曲URL(网宿CND播放失败时获取),如果有callback参数，则是异步回调模式获取播放url，否则是同步方式返回播放url
	//暂时先默认从蓝汛分一部分流量过来灰度测试
	function getDlUrl(songobj, callback){
		return getPlayUrl(songobj,callback,{cdn:'dl'});
	}
	
	function getTptUrl(songobj){
		var url = '';
		if (isQusicSong(songobj)){
			var sid = parseInt(songobj.songid) + 30000000;
			url = tpturl_tpl.jstpl_format({sid:sid});
		}
		return url;
	}
	
	function isSupportMp3(){
		return mIsH5Mp3;
	}
	function getPlayerType() {
		return mPlayerType;
	}
	return {
		wmaurl_tpl : wmaurl_tpl,
		wmaurl_tpl2 : wmaurl_tpl2,
		mp3url_tpl : mp3url_tpl,
		tpturl_tpl : tpturl_tpl,
		setSongInfoObj : setSongInfoObj,
		getSongInfoObj : getSongInfoObj,
		getWebPlayer : getWebPlayer,
		initMusic : initMusic,
		startPlayer : startPlayer,
		pausePlayer : pausePlayer,
		stopPlayer : stopPlayer,
		lastPlayer : lastPlayer,
		nextPlayer : nextPlayer,
		autoNextPlayer : autoNextPlayer,
		playAnyPos : playAnyPos,
		addSong : addSong,
		delSong : delSong,
		insertSong : insertSong,
		mutePlayer : mutePlayer,
		getVolumn : getVolumn,
		setVolumn : setVolumn,
		setPlayProgress : setPlayProgress,
		setDownloadProgress : setDownloadProgress,
		getDownloadProgress : getDownloadProgress,
		playSong : playSong,
		setPlayerState : setPlayerState,
		setCurPostion : setCurPostion,
		getCurPostion : getCurPostion,
		getSongDuration : getSongDuration,
		getPostion : getPostion,
		setPostion : setPostion,
		setPlayerList : setPlayerList,
		playList : playList,
		//listCallBcak : listCallBcak,
		//setFromtag : setFromtag,
		OnSongPlayBegin : OnSongPlayBegin,
		OnSongPlayEnd : OnSongPlayEnd,
		OnSongPlaying : OnSongPlaying,
		OnPlayPause : OnPlayPause,
		OnPlayStop : OnPlayStop,
		OnPlayError : OnPlayError,
		OnSongDownloading : OnSongDownloading,
		playBegin : playBegin,
		OnPlaying : OnPlaying,
		getPlayerSource : getPlayerSource,//只在QQ音乐控件可用
		getCurrentPlayerSource : getCurrentPlayerSource,//只在QQ音乐控件可用
		setCurrentPlayerSource : setCurrentPlayerSource,//只在QQ音乐控件可用
		setMode : setMode,
		clearPlayerList : clearPlayerList,
		isQusicSong : isQusicSong,
		getSongUrl : getSongUrl,
		getWsUrl : getWsUrl,
		getDlUrl : getDlUrl,
		getTptUrl : getTptUrl,
		isSupportMp3 : isSupportMp3,
		getPlayerType : getPlayerType,
		init : init,
		getOption : getOption,
		setSongsFavStatus : setSongsFavStatus
	}
})();
/**
 * 播放文件列表
 * @description 只有使用列表播放方式该对象才被创建
 */
MUSIC.module.webPlayer.playerList = function(){
	var mPostion = -1;
	var mMode = 1;//播放模式，1：单曲循环（默认），2：顺序播放，3：列表循环，4：随机播放，5：自定义播放模式
	var mpList = [], randomPlaylistIndex = [];
	//打乱播放列表顺序
	function randomSort(count) {  
		var arr = [];
		for (var i = 0; i<count; i++){
			arr.push(i);
		}
		// 对数组进行随机打乱,  
		// return大于0则交换位置,小于等于0就不交换  
		// 由于Math.random()产生的数字为0-1之间的数  
		// 所以0.5-Math.random()的是否大于0是随机结果  
		// 进而实现数组的随机打乱  
		var array = arr.slice();  
		array.sort(function () {  
			return 0.5 - Math.random();  
		}); 
		// 在控制台输出结果  
		randomPlaylistIndex = array;  
	} 
	//获取列表中歌曲数量
	function getCount(){
		return mpList.length;
	}
	//上一首歌曲位置
	function lastPostion(){
		mPostion = (mPostion - 1 + mpList.length) % mpList.length;
		return mPostion;
	}
	//下一周歌曲位置
	function nextPostion(){
		/*if (mMode == 4){//随机播放
			var rnd = parseInt(Math.random()*100000) % getCount();
			if (rnd == mPostion){
				rnd = (rnd + 1) % getCount();
			}
			mPostion = rnd;
		} else {
			mPostion = (mPostion + 1) % getCount();
		}*/
		mPostion = (mPostion + 1) % getCount();
		if (isLastPlayer()){
			randomSort(getCount());
		}
		if (mMode == 4 && randomPlaylistIndex.length == getCount()){//随机播放
			//mPostion = randomPlaylistIndex[mPostion];
		}
		
		return mPostion;
	}
	//自动跳转到下一首歌曲位置
	function autoNextPostion(){
		if (mMode == 1){//单曲循环，当前播放位置不变
			if (mPostion < 0 || mPostion >= getCount()){
				mPostion = 0;
			}
		} else if (mMode == 2){//顺序播放
			//console.log('最后一首'+isLastPlayer());
			if (isLastPlayer()){
				return false;
			}
			mPostion = (mPostion + 1) % getCount();
		} else if (mMode == 3){//列表循环
			mPostion = (mPostion + 1) % getCount();
		} else if (mMode == 4){//随机播放
			mPostion = (mPostion + 1) % getCount();
			if (isLastPlayer()){
				randomSort(getCount());
			}
			if (randomPlaylistIndex.length == getCount()){//随机播放
				//mPostion = randomPlaylistIndex[mPostion];
			}
		}
		return true;
	}
	//设置播放模式
	function setMode(mode){
		if (mode < 1 || mode > 5){
			mode = 1;
		}
		mMode = mode;
		if (mode == 4){
			randomSort(getCount());
		}
	}
	//设置播放位置
	function setPostion(pos){
		if (pos >= 0 && pos < mpList.length) {
			mPostion = pos;
		}
	}
	//获取当前播放为位置
	function getPostion(auto){
		if (mMode == 4 && randomPlaylistIndex.length == getCount() && !!auto&&auto=='auto'){
			return randomPlaylistIndex[mPostion];
		}
		return mPostion;
	}
	//当前歌曲是否列表中最后一首歌曲
	function isLastPlayer(){
		return (mPostion + 1) == mpList.length;
	}
	//返回歌曲引用
	function getSongInfoObj(auto){
		if (mMode == 4 && randomPlaylistIndex.length == getCount() && !!auto&&auto=='auto'){
			return mpList[randomPlaylistIndex[mPostion]];
		}
		return mpList[mPostion];
	}
	//设置播放列表中单曲的fav状态
	function setSongsFavStatus(mids, flag){
		var _map = {};
		$.each(mids, function(idx, item){
			_map[item] = item;
		});
		var arr = [];
		$.each(mpList, function(idx, item){
			if (item.songid in _map)
			{
				item.fav = flag;
			}
			arr.push(item);
		});
		mpList = arr;
	}
	//设置播放列表歌曲信息，参数为对象数组
	function setPlayerList(arr, mode){
		if (typeof arr != "object"){
			return false;
		}
		clearPlayerList();
		for (var i = 0, len = arr.length; i < len; i++){
			if (typeof arr[i] == "object"){
				//if ((arr[i].mstream && arr[i].mid) || (arr[i].mid == 0 && arr[i].msongurl)){
					mpList.push(arr[i]);
				//}
				
			}
		}
		var index = parseInt(MUSIC.cookie.get('yq_index'))||0;
		mPostion = index-1;
		if (typeof mode == 'undefined'){//兼容旧接口参数，考虑修改
			setMode(2);
		} else {
			setMode(mode);
		}
	}
	//添加歌曲
	function addSongList(list){
		for (var i = 0, len = list.length; i < len; i++){
			if (typeof list[i] == "object"){
				//if ((list[i].mstream && list[i].mid) || list[i].msongurl){
					mpList.push(list[i]);
				//}
			}
		}
	}
	//删除歌曲
	function delSong(pos){
		if (pos >= 0 && pos < mpList.length){
			mpList.splice(pos, 1);
		}
		if (pos < mPostion){
			mPostion--;
		}
		if (mPostion >= mpList.length){
			mPostion = mpList.length - 1;
		}
		if (mpList.length == 0){
			mPostion = -1;
		}
	}
	
	//插入歌曲
	function insertSong(pos, songinfo){
		if (pos >= 0 && pos < mpList.length){
			mpList.splice(pos, 0, songinfo);
		}
		if (pos <= mPostion){
			mPostion++;
		}
	}
	//清理列表
	function clearPlayerList(){
		for (var i = 0, len = mpList.length; i < len; i++){
			delete mpList[i];
		}
		mpList = [];
		mPostion = -1;
	}
	return {
		getCount : getCount,
		isLastPlayer : isLastPlayer,
		lastPostion : lastPostion,
		nextPostion : nextPostion,
		autoNextPostion : autoNextPostion,
		setPostion : setPostion,
		getPostion : getPostion,
		getSongInfoObj : getSongInfoObj,
		setPlayerList : setPlayerList,
		addSongList : addSongList,
		delSong : delSong,
		clearPlayerList : clearPlayerList,
		setMode : setMode,
		insertSong : insertSong,
		setSongsFavStatus : setSongsFavStatus
	};
};
/**
 * 动态加载QQ音乐播放控件
 * @description 创建并返回的QQ音乐播放控件操作对象
 */
MUSIC.module.webPlayer.qqPlayer = function(fromTag){
	var $T = top,
		$ = MUSIC, 
		$D = $.dom, 
		$E = $.event;
	//QQplayer配置
	var mQQPlayerConfig = {
		REP_PLAYURL_IP_ARRAY : ["121.14.73.62", "121.14.73.48", "58.60.9.178", "58.61.165.54"],
		REP_PLAYURL_PORT : 17785, 
		//p2p服务器设置
		P2P_UDP_SVR_IP_ARRAY : ["119.147.65.30", "58.61.166.180", "pdlmusic.p2p.qq.com"],		
		P2P_UDP_SVR_PORT : 8000, 
		P2P_TCP_SVR_IP_ARRAY : ["119.147.65.30", "58.61.166.180", "pdlmusic.p2p.qq.com"],
		P2P_TCP_SVR_PORT : 433,
		
		P2P_STUN_SVR_IP : "stun-a1.qq.com", 
		P2P_STUN_SVR_PORT : 8000, 
		P2P_TORRENT_URL : "http://219.134.128.55/", 
		P2P_CACHE_SPACE : 100,
		
		//上报服务器设置
		STAT_REPORT_SVR_IP : "219.134.128.41", 
		STAT_REPORT_SVR_PORT : 17653,
		
		REP_PLAYSONG_IP_ARRAY : ["pclistening.music.qq.com"/* "58.60.11.85","121.14.96.113","58.61.165.50","121.14.95.82" */],
		REP_PLAYSONG_PORT : 8000,
		REP_SONGLIST_IP_ARRAY : ["121.14.94.181","121.14.94.183"],
		REP_SONGLIST_PORT : 8000
	};
	var mPlayerSource = "";
	//当前控件播放源
	var mCurPlaySrc = "";
	//当前播放器状态
	var mPlayerState = g_playerStatus.S_UNDEFINE;
	var mPlayerName = "";	//object对象
	var mUinCookie = 12345678;
	var mKeyCookie = "12345678";
	var mFromTag = fromTag;		
	var mIsInit = false;
	var plv = "0";
	var playerSrcSeted = false; 
	//防止qq控件缓冲时间过程,调用isStop函数始终返回9
	var lastBufTime = 0;
	var mDownloadProgress = 0; //歌曲下载进度, 0-100
	//新版播放控件不支持
	function setPlayList()
	{
	};	
	//新版播放控件不支持
	function resetCache()
	{
		//清空p2p cache数据
	};	
	function setPlayParams(iMusicId,sul){
		mPlayerName.SetCookie("qqmusic_fromtag",mFromTag);
		//iMusicId = iMusicId - 2000000;
		var tiMusicId = ""+iMusicId;
		mPlayerName.SetCookie("qqmusic_musicid",tiMusicId);
		mPlayerName.SetCookie("qqmusicchkkey_key",mKeyCookie);
		mPlayerName.SetCookie("qqmusicchkkey_url",sul);
	}
	function setPlayerVersion(version){
		plv = version;
	}
	function getPlayerSource(){
		return mPlayerSource;
	}
	//当前播放源
	function getCurrentPlayerSource(){
		return mCurPlaySrc;
	}
	function setCurrentPlayerSource(args){
		mCurPlaySrc = args;
	}
	function insertQQPlayer(args){
		var isIE = window.ActiveXObject? true : false;
		if (isIE){
			var params = {};
			var objAttrs = {};
			for (var k in args)
			{
				switch (k)
				{
					case "classid":
					case "style":
					case "name":
					case "height":
					case "width":
					case "id":
						objAttrs[k] = args[k];
						break;
					default:
						params[k] = args[k];
				}
			}
			var str = [];
			str.push('<object ');
			for (var i in objAttrs){
				str.push(i);str.push('="');str.push(objAttrs[i]);str.push('" ');
			}
			str.push('>');
			for (var i in params){
				str.push('<param name="');str.push(i);str.push('" value="');str.push(params[i]);str.push('" /> ');
			}
			str.push('</object>');
			var playerDiv = $D.createElementIn("div","musicproxy");
			playerDiv.innerHTML = str.join("");
			
			return playerDiv.firstChild;
		} else {
			var playerDiv = $D.createElementIn("div","musicproxy");
			playerDiv.style.cssText="height:0px;overflow:hidden";
			playerDiv.innerHTML = '<embed id="QzoneMusic" type="application/tecent-qzonemusic-plugin" width="0px" height="0px" />';
			var QzonePlayer = document.getElementById('QzoneMusic');
			var qmpVer = "";
			try
			{
				qmpVer = QzonePlayer.GetVersion(4);
			}
			catch (e)
			{
				throw new Error("NeedUpdateQzoneMusic");
				return false;
			}
			if(!(qmpVer >= "7.69"))
			{
				throw new Error("NeedUpdateQzoneMusic");
				return false;
			}
			QzonePlayer.CreateAX("QzoneMusic.dll");
			for (var k in args)
			{
				switch (k)
				{	
					case "classid":
					case "style":
					case "name":
					case "height":
					case "width":
					case "id":
					case "UsedWhirl":
						continue;
					break;
					default:
						QzonePlayer.setAttribute(k, args[k]);
				}
			}
			try{
				QzonePlayer.UsedWhirl = "0";
			}
			catch(e){
			}
			if (QzonePlayer.GetVersion(5) >= "3.2"){
				QzonePlayer.setAttribute("P2PUDPServ_IP","pdlmusic.p2p.qq.com");
				QzonePlayer.setAttribute("P2PTCPServ_IP","pdlmusic.p2p.qq.com");
			}
			return QzonePlayer;
		}
	}
	function createPlayer(){
		var ttii =(parseInt(Math.random()*1000)) % mQQPlayerConfig.REP_PLAYSONG_IP_ARRAY.length;
		var ttii2 =(parseInt(Math.random()*1000)) % mQQPlayerConfig.REP_SONGLIST_IP_ARRAY.length;
		var ttii3 =(parseInt(Math.random()*1000)) % mQQPlayerConfig.REP_PLAYURL_IP_ARRAY.length;
		var ttii4 = (new Date()).getTime() % 2;
		if (plv >= "3.2"){
			ttii4 = 2;
		}
		return insertQQPlayer(
		{
			classid:'CLSID:E05BC2A3-9A46-4A32-80C9-023A473F5B23', id:'QzonePlayer', height:0, width:0, PlayerType:2,
			CacheSize:mQQPlayerConfig.P2P_CACHE_SPACE,	ValidDomain:'qq.com',EnableSyncListen:1,UploadStatCount:10,ExitDelayTime:5,
			UsedWhirl:0,RestrictHttpStartInterval:1,RestrictHttpStopInterval:100,
			P2PUDPServ_IP:mQQPlayerConfig.P2P_UDP_SVR_IP_ARRAY[ttii4],P2PUDPServ_Port:mQQPlayerConfig.P2P_UDP_SVR_PORT,
			P2PTCPServ_IP:mQQPlayerConfig.P2P_TCP_SVR_IP_ARRAY[ttii4],P2PTCPServ_Port:mQQPlayerConfig.P2P_TCP_SVR_PORT,
			P2PStunServ_IP:mQQPlayerConfig.P2P_STUN_SVR_IP,P2PStunServ_Port:mQQPlayerConfig.P2P_STUN_SVR_PORT,
			RepPlaySong_IP:mQQPlayerConfig.REP_PLAYSONG_IP_ARRAY[ttii],RepPlaySong_Port:mQQPlayerConfig.REP_PLAYSONG_PORT,
			RepSongList_IP:mQQPlayerConfig.REP_SONGLIST_IP_ARRAY[ttii2],RepSongList_Port:mQQPlayerConfig.REP_SONGLIST_PORT,
			RepPlayURL_IP:mQQPlayerConfig.REP_PLAYURL_IP_ARRAY[ttii3],RepPlayURL_Port:mQQPlayerConfig.REP_PLAYURL_PORT
		});
	}
	//bv,bi,bp2p,name,w,h,uincn,keycn,dl
	function createActiveX(){
		try
		{
			mPlayerName = createPlayer();
			if(!mPlayerName){
				return false;
			}
			mPlayerSource = "web_player_"+new Date().getTime();
			mCurPlaySrc = mPlayerSource;
			
			//mCurPlaySrc = mPlayerSource;
		}
		catch(e)
		{
			if(debugMode)
			{
				alert("e 7 "+e.message);
			}
			throw new Error("NeedUpdateQzoneMusic");
			return false;
		}
		return true;
	}
	function initialize(){
		try
		{
			if(!mPlayerName){
				return false;
			}
			/*
			setCookie("qqmusic_fromtag", mFromTag, "qq.com");
			*/
			//showMsgbox("initialize 5");
			/*
			// 播放器初始化结果回调，调用Initialize方法即会收到该回调
			//	[id(1), helpstring("method OnInitialized")] HRESULT OnInitialized(BOOL bSucceed);
			this.mPlayerName.attachEvent("OnInitialized", OnInitialized);
			// 播放器反初始化结果回调，调用Uninitialize方法即会收到该回调
			//	[id(2), helpstring("method OnUninitialized")] HRESULT OnUninitialized();
			this.mPlayerName.attachEvent("OnUninitialized", OnUnitialized);
			// 播放状态改变回调，只有当前正在播放的播放源会收到该回调，QzoneMusic Crash会返回状态0。
			//	[id(3), helpstring("method OnStateChanged")] HRESULT OnStateChanged (long lNewState);
			this.mPlayerName.attachEvent("OnStateChanged", OnStateChanged);
			// 播放进度回调，只有当前正在播放的播放源会收到该回调
			//	[id(4), helpstring("method OnPlayProgress")] HRESULT OnPlayProgress(long nCurPos, long nTotal);
			this.mPlayerName.attachEvent("OnPlayProgress", OnPlayProgress);
			// 播放错误回调，只有当前正在播放的播放源会收到该回调
			//	[id(5), helpstring("method OnPlayError")] HRESULT OnPlayError(long nErrorCode, BSTR bstrErrorDesc);
			this.mPlayerName.attachEvent("OnPlayError", OnPlayError);
			// 歌曲下载进度回调，只有当前正在播放的播放源会收到该回调，nProgress为下载百分比（0到100）
			//	[id(6), helpstring("method OnDnldProgress")] HRESULT OnDnldProgress(long nErrorCode, long nProgress);
			//this.mPlayerName.attachEvent("OnDnldProgress", OnDownloadProgress);
			// 播放器静音和音量属性改变回调，所有播放源都可以收到。
			//	[id(7), helpstring("method OnPlayerPropChanged")] HRESULT OnPlayerPropChanged(BOOL bMute, long nVolume);
			//this.mPlayerName.attachEvent("OnPlayerPropChanged", OnPlayerPropChanged);
			// 播放源改变回调，只有新旧两个播放源可以收到。
			//	[id(8), helpstring("method OnPlaySrcChanged")] HRESULT OnPlaySrcChanged(BSTR bstrNewPlaySrc, BSTR bstrOldPlaySrc);
			this.mPlayerName.attachEvent("OnPlaySrcChanged", OnPlaySrcChanged);
			//this.mPlayerName.SetParameter("CacheSize",P2P_CACHE_SPACE);
			*/
			EventPlayer(mPlayerName,"OnInitialized", g_playerCallback.OnInitialized);
			EventPlayer(mPlayerName,"OnUninitialized", g_playerCallback.OnUnitialized);
			//$E.addEvent(mPlayerName,"StateChanged", g_playerCallback.OnStateChanged);
			EventPlayer(mPlayerName,"OnStateChanged", g_playerCallback.OnStateChanged);
			EventPlayer(mPlayerName,"OnPlayProgress", g_playerCallback.OnPlayProgress);
			EventPlayer(mPlayerName,"OnPlayError", g_playerCallback.OnPlayError);
			EventPlayer(mPlayerName,"OnDnldProgress", g_playerCallback.OnDownloadProgress);
			//EventPlayer(this.mPlayerName,"OnPlayerPropChanged", OnPlayerPropChanged);
			EventPlayer(mPlayerName,"OnPlaySrcChanged", g_playerCallback.OnPlaySrcChanged);
			mPlayerName.Initialize();
			mPlayerName.Volume=75;
		}
		catch(e)
		{
			if(debugMode)
			{
				alert("e 8 "+e.message);
			}
			return false;
		}	
		mIsInit = true;
		return true;
	}
	function unInitialize(){
		//释放播放器所占用资源
		try
		{
			EventPlayerRemove(mPlayerName,"OnInitialized", g_playerCallback.OnInitialized);
			EventPlayerRemove(mPlayerName,"OnUninitialized", g_playerCallback.OnUnitialized);
			EventPlayerRemove(mPlayerName,"OnStateChanged", g_playerCallback.OnStateChanged);
			EventPlayerRemove(mPlayerName,"OnPlayProgress", g_playerCallback.OnPlayProgress);
			EventPlayerRemove(mPlayerName,"OnPlayError", g_playerCallback.OnPlayError);
			EventPlayerRemove(mPlayerName,"OnDnldProgress", g_playerCallback.OnDownloadProgress);
			EventPlayerRemove(mPlayerName,"OnPlaySrcChanged", g_playerCallback.OnPlaySrcChanged);
			if(mPlayerName.Uninitialize()){
				mIsInit = false;
				g_playerCallback.OnUnitialized();
				return true;
			}
			g_playerCallback.OnUnitialized();
		}
		catch(e)
		{	
			if(debugMode)
			{
				alert("e 9 "+e.message);
			}
			g_playerCallback.OnUnitialized();
			return false;	
		}
	}
	function setPlayerSrc(){
		if (!playerSrcSeted){
			mPlayerName.PlaySrc = mPlayerSource;
			playerSrcSeted = true;
		}
	}
	//id,ul,stpt,iDuration,sSong,sSinger,sQzKey,iSongId,iSongType
	function setPlayURL(){//##########此处需要修改
		if (MUSIC.cookie.get("qqmusic_fromtag")==""){
			MUSIC.cookie.set("qqmusic_fromtag", mFromTag, "qq.com");
		}
		var _obj = g_webPlayer.getSongInfoObj();//歌曲信息
		if(!mIsInit){
			return;
		}

		g_webPlayer.getSongUrl(_obj,function(playUrl){
			if (playUrl == ''){
				//alert('歌曲链接错误！');
				var index = g_webPlayer.getPostion();
				g_webPlayer.OnPlayError(_obj, index);
				return ;
			}
		
		
			setPlayerSrc();//设置播放源
			var sid = 0;//此后网络歌曲也有sid
			var torrentUrl = g_webPlayer.getTptUrl(_obj);
			setPlayParams(sid, playUrl);
			mPlayerName.SetPlayURL(sid, playUrl, torrentUrl);
		});
		return;
	}
	function isPlaying(){
		//判断播放是否正在进行
		if(!mIsInit){
			return false;
		}
		return((mPlayerState == g_playerStatus.S_PLAYING)||(mPlayerState == g_playerStatus.S_BUFFERING) ||(mPlayerState == g_playerStatus.S_PLAYBEGIN));
	}
	function isPause(){
		//判断播放是否被暂停
		if(!mIsInit){
			return false;
		}
		return(mPlayerState == g_playerStatus.S_PAUSE);
	}
	//新控件不支持，修改实现方式
	function isStop(){
		//判断播放是否被中断
		if(!mIsInit) {
			return false;
		}
		//var _s = this.getStatus();
		var _s = mPlayerState;
		//只在缓冲时间段在20-60秒时候,返回true
		//if(_s==S_TRANSITION)
		if(_s == g_playerStatus.S_BUFFERING) {
			var cur = new Date().getTime();
			if(cur - lastBufTime > 1000*60)	{
				lastBufTime = new Date().getTime();
			}
			if(cur - lastBufTime > 1000*20)	{
				lastBufTime = new Date().getTime();
				return true;
			}
		} else {
			lastBufTime = 0;
		}
		return((_s == g_playerStatus.S_STOP) || (_s == g_playerStatus.S_PLAYEND));
	}
	/*
	function SetPrepareSong(){
		if(Browser.isIE){
			var strPatch = /qqmusic.qq.com/i;
			var tpos = mPlayingPos+1;
			if(tpos > 0 && tpos < mPlayList.getCount()){
				if(mPlayList.getObject(tpos).mPlayURL.search(strPatch)){
					mPlayerName.SetPrepareSong(mPlayList.getObject(tpos).mPlayURL, mPlayList.getObject(tpos).mTorrentURL);
				}
			}
		}
	}*/
	function startPlayer(){
		//开始播放
		if(!mIsInit){
			return false;
		}
		if (isPlaying()){
			return false;
		}
		try
		{
			mPlayerName.Play();
			return true;
		}
		catch(e)
		{
			if(debugMode)
			{
				alert("e 11 "+e.message);
			}
		}	
		return false;
	}
	function stopPlayer(){
		//停止播放
		if(!mIsInit) {
			return false;
		}
		/*if((!isPlaying())&&(!isPause())) {
			return false;
		}*/
		try
		{
			mPlayerName.Stop();
			return true;
		}
		catch(e)
		{
			if(debugMode) {
				alert("e 12 "+e.message);
			}
		}
		return false;
	}
	function pausePlayer(){
		//暂停播放
		if(!mIsInit) {
			return false;
		}
		
		if(!isPlaying()) {
			return false;
		}
		
		try
		{
			mPlayerName.Pause();	
		}
		catch(e)
		{
			if(debugMode) {
				alert("e 13 "+e.message);
			}
		}
	}
	function setMute(){
		//false:未设置静音   true:设置静音
		if(!mIsInit) {
			return false;
		}
		var bSet;
		var isIE = window.ActiveXObject? true : false;
		if (isIE){
			bSet = (mPlayerName.Mute == 0 ? 1:0);
		} else {
			bSet = (mPlayerName.Mute ? false:true);
		}
		mPlayerName.Mute = bSet;
		return bSet;
	}
	function getVolumn(){
		if(!mIsInit) {
			return 0;
		}
		return mPlayerName.Volume;
	}
	function setVolumn(vol) {
		if(!mIsInit) {
			return false;
		}
		if(mPlayerName.Mute==1) {
			return false;
		}
		if(vol > 100) {
			vol = 100;
		}
		if(vol < 0) {
			vol = 0;
		}
		if(vol >= 0 && vol <= 100) {
			mPlayerName.Volume = vol;
		}
		return true;
	}
	function setPlayerState(status){
		mPlayerState = status;
	}
	
	function setPlayProgress(curtime) {
		if(!mIsInit) {
			return false;
		}
		if (isNaN(curtime)) {
			return false;
		}
		if (curtime <= 0) {
			curtime = 0;
		}
		if (curtime >= g_webPlayer.getSongDuration()) {
			curtime = g_webPlayer.getSongDuration();
		}
		
		mPlayerName.CurPos = curtime;
		//MUSIC.console.print("mPlayerName.CurPos : " + mPlayerName.CurPos);
		return true;
	}
	
	function setDownloadProgress(progress) {
		if(!mIsInit) {
			return false;
		}
		
		if (progress <= 0) {
			progress = 0;
		}
		
		if (progress >= 100) {
			progress = 100
		}
		
		mDownloadProgress = progress;
	}
	
	function getDownloadProgress(){
		if(!mIsInit) {
			return false;
		}
		return mDownloadProgress||0;
	}
	
	return {
		createActiveX : createActiveX,
		setPlayerVersion : setPlayerVersion,
		initialize : initialize,
		unInitialize : unInitialize, 
		setPlayURL : setPlayURL,
		setPlayList : setPlayList,
		resetCache : resetCache,
		startPlayer : startPlayer,
		stopPlayer : stopPlayer,
		pausePlayer : pausePlayer, 
		setMute : setMute,
		getVolumn : getVolumn,
		setVolumn : setVolumn,
		setPlayerState : setPlayerState, 
		getPlayerSource : getPlayerSource,
		getCurrentPlayerSource : getCurrentPlayerSource,
		setCurrentPlayerSource : setCurrentPlayerSource,
		setPlayProgress : setPlayProgress,
		setDownloadProgress : setDownloadProgress,
		getDownloadProgress : getDownloadProgress
	};
};
//注册事件方法，此处要修改
function EventPlayer(oTarget,sEventType,fnHandler)
{
	if(oTarget.attachEvent)
	{
		oTarget.attachEvent(sEventType,fnHandler);
	}
	else if(oTarget.addEventListener)
	{
		oTarget.addEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget[sEventType]=fnHandler;
	}
}
function EventPlayerRemove(oTarget,sEventType,fnHandler)
{
	if(oTarget.detachEvent)
	{
		oTarget.detachEvent(sEventType,fnHandler);
	}
	else if(oTarget.removeEventListener)
	{
		oTarget.removeEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget[sEventType]=null;
	}
}
function EventUtil(oTarget,sEventType,fnHandler)
{
	if(oTarget.attachEvent)
	{
		oTarget.attachEvent("on"+sEventType,fnHandler);
	}
	else if(oTarget.addEventListener)
	{
		oTarget.addEventListener(sEventType,fnHandler,false);
	}
	else
	{
		oTarget["on"+sEventType]=fnHandler;
	}
}
//播放器事件回调
MUSIC.module.webPlayer.eventCallback = (function(){
	//初始化完毕时回调
	var $T = top,
	$ = MUSIC, 
	$D = $.dom, 
	$E = $.event;
	function OnInitialized(bSucc){
		if(bSucc){
			//alert("webPlayer initialize succ");
		} else{
			alert("webPlayer initialize faied");
		}
	}
	//反初始化完毕时回调
	function OnUnitialized(){
		//alert("OnUnitialized");
	}
	function OnStateChanged(lNewState){
		if(debugMode){
			alert('OnStateChanged:'+lNewState);
		}
		if (lNewState >= 0 && lNewState <= 6){
			g_webPlayer.setPlayerState(lNewState);
		}
		//alert(lNewState);
		//console.log(lNewState);
		switch(lNewState)
		{
			case 0:
				g_webPlayer.setPlayerState(g_playerStatus.S_UNDEFINE);
				//$D.get('status').innerHTML += "未定义<br/>";
				break;
			case 1:
				g_webPlayer.setPlayerState(g_playerStatus.S_STOP);
				g_webPlayer.OnPlayStop();
				//$D.get('status').innerHTML += "停止<br/>";
				break;
			case 2:
				g_webPlayer.setPlayerState(g_playerStatus.S_PAUSE);
				//$D.get('status').innerHTML += "暂停<br/>";
				g_webPlayer.OnPlayPause();
				break;
			case 3:
				g_webPlayer.setPlayerState(g_playerStatus.S_PLAYING);
				g_webPlayer.OnPlaying();
				//$D.get('status').innerHTML += "播放中<br/>";
				break;
			case 4:
				g_webPlayer.setPlayerState(g_playerStatus.S_BUFFERING);
				//$D.get('status').innerHTML += "缓冲中<br/>";
				break;
			case 5:
				g_webPlayer.setPlayerState(g_playerStatus.S_PLAYBEGIN);
				
				MUSIC.OZ.speedSet(118,4,MUSIC.expType,+new Date);				
				MUSIC.OZ.speedSend(118,4,1);
				//g_webPlayer.playBegin();
				//$D.get('status').innerHTML += "播放开始<br/>";
				break;
			case 6:
				g_webPlayer.setPlayerState(g_playerStatus.S_PLAYEND);
				//$D.get('status').innerHTML += "播放结束<br/>";
				/*
				if (!g_webPlayer.nextPlayer()){//非列表播放
					playSong();
				}*/
				g_webPlayer.autoNextPlayer();
				break;
			default:break;
		}
		
		//g_webPlayer.setPlayerState
		
		//if(!!VQQPlayer)
		{
			//VQQPlayer.autoRandomPlay(VQQPlayer,true,VQQPlayer.mRandomPlay);
		}
	}
	//播放进度改变时回调，只有当前正在播放的播放源会收到该回调
	function OnPlayProgress(lCurPos, lTotal){
		var _h5 = (!!ua.safari||!!ua.chrome||!!ua.isiPad||!!ua.isiPhone);
		lCurPos = _h5?parseInt(lCurPos*1000):parseInt(lCurPos);
		//lCurPos = parseInt(lCurPos*1000);
		//MUSIC.console.print(lCurPos);
		lTotal = parseInt(lTotal);
		g_webPlayer.setCurPostion(lCurPos, lTotal);
		//MUSIC.dom.get("progress").innerHTML = lCurPos + ' / ' + lTotal;
		g_webPlayer.OnSongPlaying(lCurPos, lTotal);
		if(debugMode)
		{
			alert("PlayProgress,curPos:"+lCurPos+",total:"+lTotal);
		}
	}
	//播放错误回调，只有当前正在播放的播放源会收到该回调
	function OnPlayError(lErrCode,sErrDesc){
		cs.p("g_playerCallback.OnPlayError 1");
		var _obj = g_webPlayer.getSongInfoObj();
		var index = g_webPlayer.getPostion();
		cs.p("g_playerCallback.OnPlayError 2,_obj:",_obj,"index:",index);
		
		;(function(){
			cs.p("g_playerCallback.OnPlayError 4");
			if (g_webPlayer.isQusicSong(_obj)) {
				_obj.err = 100;
				g_webPlayer.setSongInfoObj(_obj);
				cs.p("g_playerCallback.OnPlayError 5");
				MUSIC.OZ.errorSend(118,4,{8:100});
				MUSIC.OZ.errorSendToMM({
					"commandid" : 'play_error_yqq',
					"resultcode" : 100,
					"detail" : 'OnPlayError,songid=' + (_obj.songid||_obj.id||0) + ',soso=true. ' + (sErrDesc||'')
				});
				
				// _obj.mcdn = 'ws';
				m.rateSpeed = true;
				m.expIdx ++;
				g_webPlayer.getWebPlayer().setPlayURL();//按照竞速的结果重试2018/9/5
			} else {
				g_webPlayer.getOption().errorTips('歌曲播放失败！', '您添加的网络歌曲，地址出错或被主人删除。');
			}
		})();
		if (m.expIdx >= m.expCdnArr.length && m.expCdnArr.length>0){//所有的url重试后都不能播放，就自动播放下一首2018/9/5
			g_webPlayer.OnPlayError(_obj, index);
			cs.p("g_playerCallback.OnPlayError 3");
			//console.log(" or,ErrCode:"+lErrCode+",ErrDesc:"+sErrDesc);
			if(debugMode){
				alert("playError,ErrCode:"+lErrCode+",ErrDesc:"+sErrDesc);
			}
		}
	}
	//播放源改变回调，只有新旧两个播放源可以收到。
	function OnPlaySrcChanged(sNewPlaySrc,sOldPlaySrc){
		//alert("PlaySrcChanged,NewPlaySrc:"+sNewPlaySrc+",OldPlaySrc:"+sOldPlaySrc);
		//if(!!VQQPlayer)
		//{
			//VQQPlayer.mCurPlaySrc=sNewPlaySrc;
		//}
		//alert(sNewPlaySrc + '-' +sOldPlaySrc);
		//g_webPlayer.pausePlayer();
		g_webPlayer.setCurrentPlayerSource(sNewPlaySrc);
		if (g_webPlayer.getCurrentPlayerSource() != g_webPlayer.getPlayerSource()){
			g_webPlayer.setPlayerState(g_playerStatus.S_PAUSE);
			g_webPlayer.OnPlayPause();
		}
	}
	
	//歌曲下载进度回调，只有当前正在播放的播放源会收到该回调，nProgress为下载百分比（0到100）
	function OnDownloadProgress(curPos, downloadProgress){
		g_webPlayer.setDownloadProgress(downloadProgress);
		g_webPlayer.OnSongDownloading(downloadProgress);
		//console.log(downloadProgress);
	}
	
	return {
		OnInitialized : OnInitialized,
		OnUnitialized : OnUnitialized,
		OnStateChanged : OnStateChanged,
		OnPlayProgress : OnPlayProgress,
		OnPlayError : OnPlayError,
		OnPlaySrcChanged : OnPlaySrcChanged,
		OnDownloadProgress : OnDownloadProgress
	};
})();
//发送读统计状态请求
// @param {string} url
// @param {int} t 超时时间(ms)
function statImgSend(url,t)
{
	if (!window.tmpMusicStat)
	{
		window.tmpMusicStat=[];
	}
	var l = window.tmpMusicStat.length;
	window.tmpMusicStat[l] = new Image();
	with(window.tmpMusicStat[l])
	{
		onload=onerror=new Function('this.ready=true;this.onload=this.onerror=null;statImgClean();');
	}
	window.setTimeout("window.tmpMusicStat["+l+"].src = '"+url+"';",t);
}
//清理统计状态请求所使用的图片
function statImgClean()
{
	for(var i=0,l=window.tmpMusicStat.length;i<l;i++)
	{
		if(!!window.tmpMusicStat[i] && !!window.tmpMusicStat[i].ready)
		{
			delete window.tmpMusicStat[i];
		}
	}
}
window.statImgClean = statImgClean;
//播放上报函数
var _guid = "";			//听歌用户guid混存
function _getGuid () {
	if(_guid.length > 0){
		return _guid;
	}
	var u = MUSIC.cookie.get("pgv_pvid");
	if(!!u && u.length>0)
	{
		_guid = u;
		return _guid;
	}
	var curMs=(new Date()).getUTCMilliseconds();
	_guid=(Math.round(Math.random()* 2147483647)*curMs)%10000000000;
	document.cookie = "pgv_pvid="+_guid+"; Expires=Sun, 18 Jan 2038 00:00:00 GMT; PATH=/; DOMAIN=qq.com;";
	return _guid;
}
MUSIC.module.webPlayer.stat = (function(){
	var _fromtag1 = 0,		//大来源，1为空间音乐盒，2为y.qq.com，3为soso，4为腾讯微博，5为qq音乐电台，6 朋友网，7 QQ音乐官网
		_num = 5,			//多少首上报一次
		_statList = [];		//听歌流水缓存
	function add(songobj) {
		var o = {
			id : 0,				//歌曲ID
			type : 0,			//歌曲类型 2，3，4：乐库歌曲；1：盗链；5：本地上传歌曲
			playtime : 0,		//听歌时长
			starttime : 0,		//听歌开始时间
			fromtag2 : 0		//子模块来源类型
		};
		var len = _statList.length;
		if (len > 0) {
			var _h5 = (!!ua.safari||!!ua.chrome||!!ua.isiPad||!!ua.isiPhone);
			var ptime = g_webPlayer.getCurPostion();
			var song = g_webPlayer.getSongInfoObj();
			//cs.p('MUSIC.module.webPlayer.stat, song.err:' + song.err || 0);
			
			if (_h5){
				ptime = ptime / 1000;
			}
			_statList[len - 1].playtime = parseInt(ptime);
			_statList[len - 1].err = 0;//song.err || 0;
		}
		if (typeof(songobj) == "object" && songobj != null && !songobj.err) {
			if (len >= _num) {
				submit();
			}
			o.id = songobj.songid;
			if (!songobj.toptype){
				o.fromtag1 = 10050;//songobj.msource || g_webPlayer.getOption().statFromtag * 100;
				o.fromtag2 = songobj.songid; //songobj.msource || g_webPlayer.getOption().statFromtag * 100;
			}else {
				o.fromtag1 = songobj.toptype||'';//songobj.msource || g_webPlayer.getOption().statFromtag * 100;
				o.fromtag2 = songobj.parentid||''; //songobj.msource || g_webPlayer.getOption().statFromtag * 100;
			}
			if (!!songobj.songmid && !!songobj.mtype == 'qqmusic') {
				o.type = 3;
			} else {
				o.type = 1;
			}
			o.starttime = parseInt((new Date()).getTime() /1000, 10);
			_statList.push(o);
		} else {
			submit(true);
		}
	}
	function submit (noTimeout) {
		noTimeout = noTimeout || false;
		var o = null,
			id = [],
			type = [],
			playtime = [],
			starttime = [],
			fromtag1 = [],
			fromtag2 = [],
			err = [];
			_playerType = g_webPlayer.getPlayerType();
		var count = _statList.length;
		for(var i = 0 ; i < count ; i++) {
			o = _statList[i];
			id.push((parseInt(o.id||0) < 1 ? 0 : (o.id||0)));
			type.push(o.type || 0);
			playtime.push(o.playtime || 0);
			starttime.push(o.starttime || 0);
			fromtag1.push(o.fromtag1 || 0);
			fromtag2.push(o.fromtag2 || 0);
			err.push(o.err || 0);
		}
		if(count > 0) {
			var statUrl='//stat.y.qq.com/pc/fcgi-bin/cgi_music_webreport.fcg?Count='+count
				+'&Fqq='+g_user.getUin()+'&Fguid='+_getGuid()
				+'&Ffromtag1='+fromtag1.join(",")+'&Ffromtag2='+fromtag2.join(",")
				+'&Fsong_id='+id.join(",")+'&Fplay_time='+playtime.join(",")
				+'&Fstart_time='+starttime.join(",")+'&Ftype='+type.join(",")
				+'&Fversion='+_playerType+'&Fid1=' + err.join(",");
			if(noTimeout) {
				_img=new Image();
				_img.src = statUrl;
			} else {
				statImgSend(statUrl,0);
			}
		}
		id = null;
		type = null;
		playtime = null;
		starttime = null;
		fromtag1 = null;
		fromtag2 = null;
		_statList = [];
	}
	return {
		/**
		 *
		 * 添加统计
		 * @param {Boolean}
		 *			isSubmit 是否立即提交统计
		 */
		add : add
	};
})();
(function(){
	if(!!ua)
	{
		ua.tt = (function(){
		var vtt = NaN;
		var agent = (/(?:(?:TencentTraveler|QQBrowser).(\d+\.\d+))/).exec(navigator.userAgent);
		if (agent) 
		{
			vtt = agent[1] ? parseFloat(agent[1]) : NaN;
		}
		else
		{
			vtt = NaN;
		}
		return vtt;
		})();
	}
})();

var g_player = MUSIC.module.webPlayer;
var g_webPlayer = g_player.interFace;
var g_playerList = g_player.playerList;
var g_playerStatus = g_player.playStatus;
var g_playerCallback = g_player.eventCallback;
var g_playerStat = g_player.stat;
return MUSIC.module.webPlayer;

});