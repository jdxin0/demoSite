define('js/common/module/flashplayer.js', function(require, exports, module){

/**
 @fileoverview MUSIC.module.webPlayer.qFlash播放控件操作类
 * @author MUSICWebGroup
 * @version 1.0
 */

var MUSIC = require("js/common/music.js");
var g_webplayer = require("js/common/module/webplayer.js");
var g_webPlayer = g_webplayer.interFace;
var g_player = MUSIC.module.webPlayer;
var g_playerList = g_player.playerList;
var g_playerStatus = g_player.playStatus;
var g_playerCallback = g_player.eventCallback;
var g_playerStat = g_player.stat;
var ua = MUSIC.userAgent;

window.g_flashPlayer = window.g_flashPlayer || {};
g_flashPlayer.swfReady = false;
g_flashPlayer.swfInitComplete = function(){
	g_flashPlayer.swfReady = true;
};

var	cs ={
		p : function() {
			try{
				window.console && console.log(([].slice.call(arguments)).join('\t'));
			}catch(e){
			}
		}
	};
/**
 * 动态加载flash播放控件
 * @author pauldeng
 * @description 创建并返回的flash控件操作对象
 */
MUSIC.module.webPlayer.qFlash = function(fromTag){
	var $T = top
		, $ = MUSIC
		, $D = $.dom
		, $E = $.event;
		
	var S_UNDEFINE = 0,
		S_STOP = 1,
		S_PAUSE = 2,
		S_PLAYING = 3,
		S_BUFFERING = 4,
		S_PLAYBEGIN = 5,
		S_PLAYEND = 6,
		S_WAITING = 7,
		S_MEDIAEND = 8;
	
	// 停止：0;    开始播放：1;    播放中：2;   暂停：3;	缓冲中：4;  播放完毕：5;
	var flashPlayState = {
		0 : S_STOP,
		1 : S_PLAYBEGIN,
		2 : S_PLAYING,
		3 : S_PAUSE,
		4 : S_BUFFERING,
		5 : S_PLAYEND
	};

	/**
	 * 增强对flash等多媒体控件的处理
	 *
	 * @namespace media
	 */
	var media = {
		flashVersion : null,

		/**
		 * 生成flash的描述HTML
		 *
		 * @param {Object} flashArguments 以hashTable描述的flash参数集合,flashUrl请用"src"
		 * @param {media.SWFVersion} requiredVersion
		 *            所需要的flashPlayer的版本，media.SWFVersion的实例
		 * @param {String} flashPlayerCID flash在IE中使用的classID,可选
		 * @return {String} 生成的HTML代码
		 * @example
		 * 			var swf_html = media.getFlashHtml({
		 *									"src" :"your flash url",
		 *									"width" : "100%",
		 *									"height" : "100%",
		 *									"allowScriptAccess" : "always",
		 *									"id" : "avatar",
		 *									"name" : "avatar",
		 *									"wmode" : "opaque",
		 *                                  "noSrc" : false
		 *						});
		 */
		getFlashHtml : function(flashArguments, requiredVersion, flashPlayerCID){
			var attrs = [],
				params = [];

			for (var k in flashArguments) {
				switch (k) {
					case "noSrc" :
					case "movie" :
						continue; //这里是不处理的特性
						break;
					case "id" :
					case "name" :
					case "width" :
					case "height" :
					case "style" :
						if (typeof(flashArguments[k]) != 'undefined') {
							attrs.push(' ', k, '="', flashArguments[k], '"');
						}
						break;
					case "src" :
						if (ua.ie) {
							params.push('<param name="movie" value="', (flashArguments.noSrc ? "" : flashArguments[k]), '"/>');
						} else {
							attrs.push(' data="', (flashArguments.noSrc ? "" : flashArguments[k]), '"');
						}
						break;
					default :
						params.push('<param name="', k, '" value="', flashArguments[k], '" />');
				}
			}
			
			if (ua.ie) {
				attrs.push(' classid="clsid:', flashPlayerCID || 'D27CDB6E-AE6D-11cf-96B8-444553540000', '"');
			}else{
				attrs.push(' type="application/x-shockwave-flash"');
			}
			
			if (requiredVersion && (requiredVersion instanceof media.SWFVersion)) {
				//当没有安装并且应用没有刻意指定的时候，走Codebase路线
				attrs.push(' codeBase="//fpdownload.macromedia.com/get/flashplayer/current/swflash.cab#version=', requiredVersion, '"');
			}

			return "<object" + attrs.join("") + ">" + params.join("") + "</object>";
		},
		/**
		 * flash版本号显示器
		 *
		 * @param {Number} arguments...
		 *            可变参数，一系列数字，前4个是flash的四段版本号，也可以单数组传入，也可以只使用一个整数表示主版本号
		 *
		 */
		SWFVersion : function(){
			var a;
			if (arguments.length > 1) {
				a = Array.prototype.slice.apply(arguments);
			} else if (arguments.length == 1) {
				if (typeof(arguments[0]) == "object") {
					a = arguments[0];
				} else if (typeof arguments[0] == 'number') {
					a = [arguments[0]];
				} else {
					a = [];
				}
			} else {
				a = [];
			}

			this.major = parseInt(a[0], 10) || 0;
			this.minor = parseInt(a[1], 10) || 0;
			this.rev = parseInt(a[2], 10) || 0;
			this.add = parseInt(a[3], 10) || 0;
		}
	};
	/**
	 * 动态创建Flash播放对象
	 *
	 * @return {Object} 创建好的flash object对象
	 *
	 */
	var insertFlashPlayer = function(){
		return (function(){
			var playerDiv =  (function(id){
				var e = document.getElementById(id);
				if (!e){
					e = document.createElement("div");
					e.id = id;
				   document.body.appendChild(e);
				}

				return e;
			})("qqmusic_flash_media_container");

			playerDiv.innerHTML = media.getFlashHtml({
				width : 1,
				height : 1,
				src : "//y.gtimg.cn/music/portal/TPFmMusicPlayer.swf",
				quality:'high',
				//play : 'true',
				//loop : 'true',
				//scale : 'showall',
				wmode : "transparent",
				id : "flashmusicplayer",
				name : "flashmusicplayer",
				allowScriptAccess : "always"
			}, '7,0,0,0');
			//document.body.appendChild(playerDiv);
			return playerDiv.firstChild;
		})();
	};
	var createFlashPlayer = function(){
		return insertFlashPlayer();
	};

	//当前播放器状态
	var mPlayerState = g_playerStatus.S_UNDEFINE;
	var mPlayerName = "";	//object对象
	var mUinCookie = 12345678;
	var mKeyCookie = "12345678";
	var mFromTag = fromTag;
	var mIsInit = false;
	var mSetedCookie = false;
	var mClientPlatform = false;
	var mVisible = true;
	var mInstall = true;
	var mDownloadProgress = 0;
	var bereload = false;
	//当前播放的url
	var mPlayUrl = "";
	var mPlayType = "";
	//当前播放开始的时间
	var mPlayBeginTime = 0;
	var setCookieCount = 0;
	var setCookieMax = 10;

	var setUserIdent = function(iUin, sKey, iFromTag){
		mUinCookie = iUin;
		mKeyCookie = sKey;
		//mFromTag = iFromTag + "";
	};

	var realSetMusicCookie = function(){
		//cs.p("realSetMusicCookie 0");
		var uin = '';
		var key = '';
		var type = "mp3";
		if (uin == "") {
			uin = MUSIC.cookie.get("uin").replace(/[^\d]/g, "");
		};
		if (key == "") {
			key = MUSIC.cookie.get("skey");
		};
		//cs.p("realSetMusicCookie 1: [uin, key]: " + [uin, key].join(","));
		setUserIdent(uin != "" ? uin : '12345678', key != "" ? key	: '12345678', mFromTag);
		//cs.p("realSetMusicCookie 2");
		MUSIC.cookie.set("qqmusic_fromtag",mFromTag,"qq.com","/");
		
		mSetedCookie = true;
	}

	var setMusicCookie = function(){
		if (g_flashPlayer.swfReady) {
			if (window.idSetMusicCookie) {
				clearTimeout(window.idSetMusicCookie);
				window.idSetMusicCookie = null;
			}
			realSetMusicCookie();
		} else {
			if (setCookieCount < setCookieMax) {
				setCookieCount ++;
				window.idSetMusicCookie = setTimeout(function(){
					setMusicCookie();
				}, 500);
			} else {
				if (window.idSetMusicCookie) {
					clearTimeout(window.idSetMusicCookie);
					window.idSetMusicCookie = null;
				}
			}
		}
	};

	var checkPlayer = function(dl) {
		var obj = mPlayerName;
		if (!obj) {
			return false;
		}
		return true;
	};

	var createActiveX = function(bv, bi, name, w, h, uincn, keycn, dl) {
		mPlayerName = createFlashPlayer();
		//mPlayerSrc = mPlayerName.getElementsByTagName("source")[0];
		//mVisible = bv;
		mInstall = bi;
		//UinCookieName = uincn;
		//mKeyCookieName = keycn;
		//mDLLink = dl;
		return "";
	};
	
	var initialize = function(){
		try {
			//alert("initialize 1");
			if (!checkPlayer()) {
				if (mInstall) {
					alert("对不起，您的浏览器不支持flash音频播放！");
				}
				return false;
			}
			//alert("initialize 2");
			setMusicCookie();
			//alert("initialize 3");
			mIsInit = true;
			try {
				//setVolumn(80);
			} catch (e) {
				//alert("setVolumn:"+e.message);
			};
			//alert("initialize 4");
			bindPlayEvent();//绑定播放器事件
			//alert("initialize 5");
			return true;
		} catch(e) {
			if (debugMode) {
				alert("flashplayer.initialize exp: "+e.message);
			}
			return false;
		}
	};

	var setPlayURL = function() {
		//cs.p("setPlayURL 0: " + g_flashPlayer.swfReady + "; " + mSetedCookie);
		if (g_flashPlayer.swfReady && mSetedCookie) {
			if (window.idRunPlayer) {
				clearTimeout(window.idRunPlayer);
				window.idRunPlayer = null;
			}
			//cs.p("setPlayURL 1");
			realSetPlayURL();
		} else {
			//cs.p("setPlayURL 2");
			if (setCookieCount >= setCookieMax) {
				//cs.p("setPlayURL 5");
				if (window.idRunPlayer) {
					clearTimeout(window.idRunPlayer);
					window.idRunPlayer = null;
				}
			} else {
				//cs.p("setPlayURL 3");
				setCookieCount ++;
				window.idRunPlayer = setTimeout(function(){
					//cs.p("setPlayURL 4: " + setCookieCount + "; " + mPlayUrl);
					setPlayURL();
				}, 500);
			}
		}

		return;
	};
	var realSetPlayURL = function() {
		if (!mIsInit) {
			return;
		}
		var _obj =  g_webPlayer.getSongInfoObj();//歌曲信息
		g_webPlayer.getSongUrl(_obj, function(ul){
			var type = "mp3"
			//cs.p("realSetPlayURL 1: ul=" + ul);
			bereload = true;
			if (isPause() && mPlayUrl == ul) {
				//cs.p("realSetPlayURL 2");
				bereload = false;
			} else if ((ul != null) && (ul != "")) {
				//cs.p("realSetPlayURL 3: ul=" + ul);
				if (ul.indexOf(".m4a") >= 0) {
					type = "m4a";
				}
				mPlayerName.swfPlayMusic(ul, 5, type);
			}
			
			try {
				//cs.p("realSetPlayURL 4: ul=" + ul);
				mPlayUrl = ul;
				mPlayBeginTime = +new Date();
			} catch(e) {
				cs.p("realSetPlayURL 5 exp: " + e.message);
			}
		
			startPlayer();
		});
		return;
	};

	var isInitialize = function() {
		return mIsInit;
	};

	var getStatus = function() {
		if (!mIsInit) {
			return -1;
		}
		//自定义属性
		return flashPlayState[mPlayerName.swfGetPlayStat()];
	};

	var bindPlayEvent = function() {
		/*
		g_flashPlayer.soundStatChange(dataObj:Object)：声音文件状态监听，当状态发生改变时候会接收到此消息。
		dataObj包含playStat（播放状态）、position（播放位置）属性。
		 停止：0;    开始播放：1;    播放中：2;   暂停：3;	缓冲中：4;  播放完毕：5;
		*/
		window.g_flashPlayer = window.g_flashPlayer || {};
		g_flashPlayer.soundStatChange = function(dataObj){
			//cs.p("soundStatChange: mSetedCookie:" + mSetedCookie + "; mPlayUrl:" + mPlayUrl + "; dataObj.playStat" + dataObj.playStat);

			//播放操作事件，state:2，首次缓冲完毕，播放控件开始播放歌曲
			dataObj.playStat==1 && g_playerCallback.OnStateChanged(flashPlayState[2]);			
			g_playerCallback.OnStateChanged(flashPlayState[dataObj.playStat]);
		};
		/*
		g_flashPlayer.soundData(dataObj:Object)：声音数据文件消息，每秒更新一次。
		dataObj包含playStat（播放状态）、position（播放位置,秒数）、progress（下载进度百分比，精确到小数点1位）属性。
		*/
		g_flashPlayer.soundData=function(dataObj){
			g_playerCallback.OnPlayProgress(dataObj.position, mPlayerName.swfGetTotalTime());
			g_playerCallback.OnDownloadProgress(0,dataObj.progress);
		};
		/*
		g_flashPlayer.soundIOError(msg:String)：声音文件IO错误。msg错误消息
		*/
		g_flashPlayer.soundIOError = function(msg){
			//cs.p("soundIOError: msg = " + msg + "; mSetedCookie:" + mSetedCookie + "; mPlayUrl:" + mPlayUrl);
			g_playerCallback.OnStateChanged(g_playerStatus.S_STOP);
			g_playerCallback.OnPlayError(100, msg);
		};
	};

	function isPlaying(){
		//判断播放是否正在进行
		if(!mIsInit){
			return false;
		}
		var _s = getStatus();
		return ((_s == g_playerStatus.S_PLAYING)||(_s == g_playerStatus.S_BUFFERING) ||(_s == g_playerStatus.S_PLAYBEGIN));
	};

	function isPause(){
		//判断播放是否被暂停
		if(!mIsInit){
			return false;
		}
		var _s = getStatus();
		return (_s == g_playerStatus.S_PAUSE);
	};

	function isStop(){
		//判断播放是否被中断
		if(!mIsInit) {
			return false;
		}
		var _s = getStatus();
		return ((_s == g_playerStatus.S_STOP) || (_s == g_playerStatus.S_PLAYEND));
	};

	function startPlayer(){
		//开始播放
		if (!mIsInit) {
			return false;
		}
		try {
			mPlayerName.swfPlayMusic();
		} catch(e) {
			cs.p("e 11 " + e.message);
		}	
		return false;
	};

	function stopPlayer(){
		//停止播放
		if(!mIsInit) {
			return false;
		}
		if ((!isPlaying()) && (!isPause())) {
			return false;
		}
		try {
			mPlayerName.swfStopMusic();
		} catch(e) {
			cs.p("e 12 " + e.message);
		}
		return false;
	};

	function pausePlayer(){
		if (!mIsInit) {
			return false;
		}
		try {
			mPlayerName.swfPauseMusic();
		} catch (e) {
			cs.p("e 13 " + e.message);
		}
		return true;
	};

	function setMute(isMute){
		//false:未设置静音   true:设置静音
		if(!mIsInit) {
			return false;
		}
		isMute = isMute || false;
		if (!isMute && mPlayerName.swfGetMute()) {
			mPlayerName.swfSetMute(false);
		} else {
			mPlayerName.swfSetMute(true);
		}
		return true;
	};

	function getVolumn(){
		if(!mIsInit) {
			return 0;
		}
		return mPlayerName.swfGetVolume();
	};

	function setVolumn(vol) {
		if(!mIsInit) {
			return false;
		}
		if(mPlayerName.swfGetMute()) {
			return false;
		}
		if(vol > 100) {
			vol = 100;
		}
		if(vol < 0) {
			vol = 0;
		}
		if(vol >= 0 && vol <= 100) {
			mPlayerName.swfSetVolume(vol);
		}

		return true;
	};
	
	function setPlayProgress(curtime) {
		if(!mIsInit) {
			return false;
		}
		try {
			var duration = mPlayerName.swfGetTotalTime();
			if (curtime <= 0) {
				curtime = 0;
			}
			if (curtime >= duration) {
				curtime = duration;
			}
			mPlayerName.swfSeekMusic(curtime);
		} catch (e) {
			//ignore!
		}
	};
	
	function setDownloadProgress(progress){
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
	};
	
	function getDownloadProgress(){
		if(!mIsInit) {
			return false;
		}
		return mDownloadProgress||0;
	};

	function setPlayerState(status){
		mPlayerState = status;
	};

	return ({
		createActiveX : createActiveX,
		initialize : initialize,
		setPlayURL : setPlayURL,
		startPlayer : startPlayer,
		stopPlayer : stopPlayer,
		pausePlayer : pausePlayer, 
		setMute : setMute,
		getVolumn : getVolumn,
		setVolumn : setVolumn,
		setPlayerState : setPlayerState,
		setPlayProgress : setPlayProgress,
		setDownloadProgress : setDownloadProgress,
		getDownloadProgress : getDownloadProgress
	});
};
return MUSIC.module.webPlayer.qFlash;

});