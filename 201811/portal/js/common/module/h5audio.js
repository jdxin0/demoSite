define('js/common/module/h5audio.js', function(require, exports, module){

/**
 * @fileoverview MUSIC module html5 audio操作类
 * @author MUSICWebGroup
 * @version 1.0
 */


/**
 * 动态加载html5 audio
 * @author peterpeng
 * @description 创建并返回的html5 audio操作对象
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
var playLock = true;
MUSIC.module.webPlayer.h5Audio = function(fromTag){
	var $T = top,
		$ = MUSIC.$;
	//当前播放器状态
	var mPlayerState = g_playerStatus.S_UNDEFINE;
	var mPlayerName = "";	//object对象
	var mUinCookie = 12345678;
	var mKeyCookie = "12345678";
	var mFromTag = fromTag;
	var mIsInit = false;
	var mSetedCookie = false;
	var mClientPlatform = false;
	var isiPadLoad = 0;
	
	
	var checkPlayerTimer = null;
	
	var mBufferedStart = 0;	//缓冲记录开始时间
	var mBufferedEnd = 0;	//缓冲记录结束时间
	var mBufferedRecord = false;	//是否已标记缓冲
	var mBufferedFirst = true;		//首次缓冲
	var mCurrentTime = 0;
	
	var mDownloadProgress = 0; //歌曲下载进度，0-100
	
	function firstBuffered(startTime, endTime){
		//首次缓冲回调
		if (typeof g_fmChn!='undefined' && !!g_fmChn.firstBuffered){
			g_fmChn.firstBuffered(startTime, endTime);
		}
		//console.log("firstBuffered: "+startTime+","+endTime);
	}
	function secondBuffered(startTime, endTime){
		//二次缓冲回调
		if (typeof g_fmChn!='undefined' && !!g_fmChn.secondBuffered){
			g_fmChn.secondBuffered(startTime, endTime);
		}		
		//console.log("secondBuffered: "+startTime+","+endTime);
	}
	
	function clearCheckPlayer(){
		if(checkPlayerTimer){
			clearTimeout(checkPlayerTimer);
			checkPlayerTimer = null;
		}
	}

	function loopCheckPlayer(){
		clearCheckPlayer();
		
		checkPlayerTimer = setTimeout(function(){
			if (parseInt(mPlayerName.currentTime) != 0 && mPlayerName.currentTime == mCurrentTime && !mPlayerName.paused && !mBufferedRecord && !mBufferedFirst){
				mBufferedStart = new Date();
				mBufferedRecord = true;
			}
			mCurrentTime = mPlayerName.currentTime;
			loopCheckPlayer();
		}, 500);
	}	

	function checkClientPlatform(){
		var pl = navigator.platform.toLowerCase();
		var ipad = pl.match(/ipad/);
		if (ipad) {
			mClientPlatform = "ipad";
			return true;
		}
		var iphone = pl.match(/iphone/);
		if (iphone) {
			mClientPlatform = "iphone";
			return true;
		}
		var ipod = pl.match(/ipod/);
		if (ipod) {
			mClientPlatform = "ipod";
			return true;
		}
		var win = pl.match(/win/);
		if(win){
			mClientPlatform = "win";
			return false;
		}
		else
		{
			mClientPlatform = "not win";
			return true;
		}
		
		return false;
	}

	/**
	 * 动态创建html5中的audio标签
	 *
	 * @param {Object} objAttrs 属性列表对象
	 * @return {Object} 创建好的audio对象
	 */
	function insertH5AudioPlayer(objAttrs) {

		var h5audio_media = $('#h5audio_media')[0];
		if (!!h5audio_media){
			return h5audio_media;
		}
		var html = [];
		html.push("<audio ");
		for (var key in objAttrs) {
			html.push(key);
			html.push("='");
			html.push(objAttrs[key]);
			html.push("' ");
		}
		html.push("></audio>");
		if ($('#h5audio_media_con').length>0)
		{
			$('#h5audio_media_con').append(html.join(""));
		}else $('body').append(html.join(""));

		return $('#h5audio_media')[0];
	}
	/**
	 * 动态创建html5中audio播放对象
	 *
	 */
	 function createPlayer(){
		return insertH5AudioPlayer({
			id : 'h5audio_media',
			height : 0,
			width : 0,
			autoplay : 'false'
		});
	}

	function createActiveX(){
		mPlayerName = createPlayer();
		if(!mPlayerName){
			return false;
		}

	}




	function initialize(){
		if(!mPlayerName){
			return false;
		}


		// 开始加载
		$(mPlayerName).on("loadstart", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_BUFFERING);//console.log('loadstart:'+mPlayerName.paused+':'+mPlayerName.duration);
			if ((!!ua.isiPad || !!ua.isiPhone) && isiPadLoad <1){
				isiPadLoad++;
				/*
				var _obj = g_webPlayer.getSongInfoObj();//歌曲信息
				var sid = parseInt(_obj.mid) + 30000000;
				var playUrl = g_webPlayer.mp3url_tpl.jstpl_format({stream:parseInt(_obj.mstream)+10, sid:sid});
				setTimeout(function(){
					mPlayerName.setAttribute("src",playUrl);
					mPlayerName.load();
					startPlayer();
					//console.log('ok:'+mPlayerName.currentTime);
				}, 500);
				var next_play = MUSIC.dom.get('next_play');
				var event = document.createEvent('UIEvents');
				event.initEvent("click", true, true);
				if (next_play){
					next_play.dispatchEvent(event);
				}*/
				//console.log('loadstart:ok');
				g_playerCallback.OnStateChanged(g_playerStatus.S_PAUSE);
				
			}
		});
		//开始播放
		$(mPlayerName).on("play", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYBEGIN);//console.log('play:'+mSetedCookie+':'+mPlayerName.paused+':'+mPlayerName.duration);
			mSetedCookie = true;
		});
		// 播放中
		$(mPlayerName).on("playing", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYING);//console.log('playing:'+mPlayerName.paused+':'+mPlayerName.duration);
			loopCheckPlayer();
		});		
		// 暂停
		$(mPlayerName).on("pause", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_PAUSE);//console.log('pause:'+mPlayerName.paused+':'+mPlayerName.duration);
			clearCheckPlayer();
		});
		//取回媒介数据过程中（延迟）存在错误
		$(mPlayerName).on("stalled", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_STOP);//console.log('stalled:'+mPlayerName.paused+':'+mPlayerName.duration);
		});
		// 加载失败
		$(mPlayerName).on("error", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_STOP);
			//console.log('error:'+mPlayerName.paused+':'+mPlayerName.duration+':error:'+mPlayerName.error.code+':url:'+mPlayerName.src);
			if ((!!ua.isiPad || !! ua.isiPhone) && mPlayerName.error.code == 4){
				mSetedCookie = true;
				g_playerCallback.OnStateChanged(g_playerStatus.S_BUFFERING);
				isiPadLoad=0;
			} else {
				var _obj = g_webPlayer.getSongInfoObj();//歌曲信息
				if (!!_obj.songid && _obj.songid > 0 && !!_obj.songmid && _obj.songmid != "" && (_obj.type == 0 || _obj.type == 3)) {
					//
				} else if (!!_obj.songurl && _obj.type == 1) {
					MUSIC.popup.show('歌曲播放失败！您添加的网络歌曲，地址出错或被主人删除。', 3000,1);
				}
				// var index = g_webPlayer.getPostion();
				var errMap = [
						"",
						"MEDIA_ERR_ABORTED(fetching process aborted by user)",//1
						"MEDIA_ERR_NETWORK(error occurred when downloading)",//2
						"MEDIA_ERR_DECODE(error occurred when decoding)",//3
						"MEDIA_ERR_SRC_NOT_SUPPORTED(audioideo not supported)"//4
					],
					errMsg = mPlayerName.error? errMap[mPlayerName.error.code || 0] : ""
				g_playerCallback.OnPlayError(100, errMsg);
			
			}
		});
		// 播放结束
		$(mPlayerName).on("ended", function(){
			g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYEND);//console.log('ended:'+mPlayerName.paused+':'+mPlayerName.duration);
			clearCheckPlayer();
		});
		//播放时间改变
		$(mPlayerName).on("timeupdate", function(){
			g_playerCallback.OnPlayProgress(mPlayerName.currentTime, mPlayerName.duration);//console.log('timeupdate:'+mPlayerName.currentTime+':'+mPlayerName.duration);
			//缓冲时间检测
			if (mBufferedRecord){
				mBufferedEnd = new Date();
				if (mBufferedFirst){
					mBufferedFirst = false;
					firstBuffered(mBufferedStart, mBufferedEnd);
				} else {
					secondBuffered(mBufferedStart, mBufferedEnd);
				}
				mBufferedRecord = false;
			}
			try {
				//下载进度
				g_playerCallback.OnDownloadProgress(mPlayerName.currentTime, Math.ceil(mPlayerName.buffered.end(0)*100/mPlayerName.duration));
			} catch (e){
				
			}
			//mDownloadProgress = Math.ceil(mPlayerName.buffered.end(0)*100/mPlayerName.duration);
		});
		$(mPlayerName).on("loadedmetadata", function(){
			//console.log('loadedmetadata:'+mPlayerName.paused+':'+mPlayerName.duration);
			if (!!ua.safari && !(!!ua.isiPad || !! ua.isiPhone)){
				mPlayerName.currentTime = 1;
				mPlayerName.play();
				//console.log('currentTime:'+mPlayerName.currentTime);
			}	
		});
		$(mPlayerName).on("loadeddata", function(){
			//console.log('loadeddata:'+mPlayerName.paused+':'+mPlayerName.duration);
			/*if (!!ua.safari || !!ua.isiPad || !! ua.isiPhone){
				mPlayerName.currentTime = 1;
				mPlayerName.play();
				console.log('currentTime:'+mPlayerName.currentTime);
			}*/	
		});
		$(mPlayerName).on("canplay", function(){
			//console.log('canplay:'+mPlayerName.paused+':'+mPlayerName.duration);
			/*if (!!ua.safari || !!ua.isiPad || !! ua.isiPhone){
				mPlayerName.currentTime = 1;
				mPlayerName.play();
				console.log('currentTime:'+mPlayerName.currentTime);
			}*/	
		});

		mIsInit = true;
		try {
			setVolumn(75);
		} catch (e) {
			alert("setVolumn:"+e.message);
		};
		//mSetedCookie = true;


		return true;
	}

	/**
	 * 设置当前播放歌曲URL
	 */
	function setPlayURL(){
		if ( MUSIC.cookie.get("qqmusic_fromtag")==""){
			MUSIC.cookie.set("qqmusic_fromtag", mFromTag, "qq.com");
			mSetedCookie = true;
			
		} else {
			mSetedCookie = true;
		}
		if (mSetedCookie){
			var _obj = g_webPlayer.getSongInfoObj();//歌曲信息
			/*var sid = parseInt(_obj.mid) + 30000000;
			var playUrl = g_webPlayer.mp3url_tpl.jstpl_format({stream:parseInt(_obj.mstream)+10, sid:sid});*/
			g_webPlayer.getSongUrl(_obj,function(playUrl){
				/*
				var playUrl = '';
				if (!!_obj.mid && !!_obj.mstream && _obj.mid>0 && _obj.mstream>0){
					var sid = parseInt(_obj.mid) + 30000000;
					playUrl = g_webPlayer.wmaurl_tpl.jstpl_format({stream:parseInt(_obj.mstream)+10, sid:sid});
				} else if (!!_obj.msongurl){
					playUrl = _obj.msongurl;
				}
				*/
				if (playUrl == ''){
					//alert('歌曲链接错误！');
					var index = g_webPlayer.getPostion();
					g_webPlayer.OnPlayError(_obj, index);
					return ;
				}
				if (!playLock){
					//console.log('lock');
					return ;
				}
				//判断当前播放URL是否需要重新加载
				if ($('source', $(mPlayerName)).length==0||$('source', $(mPlayerName)).attr('src') != playUrl){ //Element has no supported sources 问题修复2017/2/13
					$(mPlayerName).html('<source src="'+playUrl+'">');
					mPlayerName.setAttribute("src",playUrl);
					mPlayerName.load();
					
				} else {
					stopPlayer();
				}
				startPlayer();
				
				mBufferedStart = new Date();
				mBufferedFirst = true;
				mBufferedRecord = true;
			});
		} else {
			setTimeout(setPlayURL, 100);
		}
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
		return(mPlayerState == g_playerStatus.S_PAUSE || mPlayerName.paused);
	}
	function isStop(){
		//判断播放是否被中断
		if(!mIsInit) {
			return false;
		}

		return((mPlayerState == g_playerStatus.S_STOP) || (mPlayerState == g_playerStatus.S_PLAYEND) || mPlayerName.ended);
	}

	function startPlayer(){
		
		//开始播放
		if(!mIsInit){
			return false;
		}//console.log(264);
		/*if (isPlaying()){
			return false;
		}*///console.log(267);
		try
		{
			mPlayerName.play();//console.log(270);
			return true;
		}
		catch(e)
		{
			if(debugMode){
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
			mPlayerName.pause();
			mPlayerName.currentTime = 0;
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
		if (!mIsInit) {
			return false;
		}
		/*if (!isPlaying()) {
			return false;
		}*/
		try {
			mPlayerName.pause();
		} catch (e) {
			if (debugMode) {
				status = ("e 4 " + e.message);
			}
		}
		return true;
	}
	function setMute(){
		//false:未设置静音   true:设置静音
		if(!mIsInit) {
			return false;
		}
		var bSet = (mPlayerName.muted == 1 ? 0:1);
		mPlayerName.muted = bSet;
		return bSet;
	}

	function getVolumn(){
		if(!mIsInit) {
			return 0;
		}
		return mPlayerName.volume * 100;
	}

	function setVolumn(vol) {
		if(!mIsInit) {
			return false;
		}
		if(mPlayerName.muted) {
			return false;
		}
		if(vol > 100) {
			vol = 100;
		}
		if(vol < 0) {
			vol = 0;
		}
		if(vol >= 0 && vol <= 100) {
			mPlayerName.volume = vol / 100;
		}

		return true;
	}
	
	function setPlayProgress(curtime) {
		if(!mIsInit) {
			return false;
		}
		try
		{
			if (curtime <= 0) {
				curtime = 0;
			}
			if (curtime >= mPlayerName.duration) {
				curtime = mPlayerName.duration;
			}
			
			mPlayerName.currentTime = curtime;
		}
		catch (e)
		{
		}
		
		return true;
	}
	
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
	}
	
	function getDownloadProgress(){
		if(!mIsInit) {
			return false;
		}
		return mDownloadProgress||0;
	}

	function setPlayerState(status){
		mPlayerState = status;
	}

	return {
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
	};

};

return MUSIC.module.webPlayer.h5Audio;







});