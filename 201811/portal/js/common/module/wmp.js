define('js/common/module/wmp.js', function(require, exports, module){

/**
 * @fileoverview MUSIC module wmPlayer操作类
 * @author MUSICWebGroup
 * @version 1.0
 */


/**
 * 动态加载WindowsMediaPlayer控件
 * @author peterpeng
 * @description 创建并返回的wmPlayer操作对象
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
MUSIC.module.webPlayer.wmPlayer = function(fromTag){
	var $T = top,
		$ = MUSIC, 
		$D = $.dom, 
		$E = $.event;
	//当前播放器状态
	var mPlayerState = g_playerStatus.S_UNDEFINE;
	var mPlayerName = "";	//object对象
	var mUinCookie = 12345678;
	var mKeyCookie = "12345678";
	var mFromTag = fromTag;
	var mIsInit = false;
	var mSetedCookie = false;

	var checkPlayerTimer = null;		//wmp控件进度和状态改变调节
	var isFirstPlaying = true;
	
	var mBufferedStart = 0;	//缓冲记录开始时间
	var mBufferedEnd = 0;	//缓冲记录结束时间
	var mBufferedRecord = false;	//是否已标记缓冲
	var mBufferedFirst = true;		//首次缓冲
	
	var mDownloadProgress = 0; //歌曲下载进度, 0-100
	
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
		checkPlayerTimer = setTimeout(checkPlayer, 500);
	}

	//只在歌曲状态或播放时间改变时进行检查，模拟播放开始，结束事件回调
	function checkPlayer(){
		try {
			//console.log(mPlayerName.playState);
			switch (mPlayerName.playState) {
				case 1 : // 如果播放停止
					clearCheckPlayer();
					g_playerCallback.OnStateChanged(g_playerStatus.S_STOP);
					isFirstPlaying = true;
					//g_playerCallback.OnPlayProgress(mPlayerName.controls.currentPosition, mPlayerName.currentMedia.duration);
					break;
				case 2 :// 如果播放暂停
					clearCheckPlayer();
					g_playerCallback.OnStateChanged(g_playerStatus.S_PAUSE);
					isFirstPlaying = true;
					break;
				case 3 :// 正在播放
					loopCheckPlayer();
					if (isFirstPlaying){
						g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYING);
						isFirstPlaying = false;
					}
					g_playerCallback.OnPlayProgress(mPlayerName.controls.currentPosition, mPlayerName.currentMedia.duration);
					if (mPlayerName.currentMedia.duration - mPlayerName.controls.currentPosition < 0.6){
						clearCheckPlayer();
						isFirstPlaying = true;
						stopPlayer();
						g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYEND);
					}
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
					g_playerCallback.OnDownloadProgress(mPlayerName.controls.currentPosition, mPlayerName.network.downloadProgress);
					break;
				case 4 : // 向前
				case 5 : // 向后
				case 6 : // 缓冲中
					if (!mBufferedRecord && !mBufferedFirst){
						mBufferedStart = new Date();
						mBufferedRecord = true;
					}
				case 7 : // 等待中
				case 8 : // 播放结束
				case 9 : // 通信中
				case 11 : // 重新连接
				case 10 : // 准备就绪
					loopCheckPlayer();
					break;
				default :
					loopCheckPlayer();
					break;
			}
		} catch (e) {
			window.status = "PLAYER ERROR:" + e.message;
		}	
	}



	/**
	 * 动态创建windowsMediaPlayer
	 *
	 * @param {Object}  args属性列表对象
	 * @return {Object} 创建好的wmp对象
	 */
	function insertMediaPlayer(args) {

		var params = {};
		var objAttrs = {};
		for (var k in args)
		{
			switch (k)
			{
				case "style":
				case "height":
				case "width":
				case "id":
				case "src":
					objAttrs[k] = args[k];
					break;
				default:
					params[k] = args[k];
			}
		}
		if (args["src"]) {
			params["src"] = args["src"];
		}
		var str = [];
		str.push('<object ');
		if (ua.ie){
			str.push('classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" ');
		} else {
			str.push('type="application/x-ms-wmp" ');
		}
		for (var i in objAttrs){
			str.push(i);str.push('="');str.push(objAttrs[i]);str.push('" ');
		}
		str.push('>');
		if (ua.ie){
			for (var i in params){
				str.push('<param name="');str.push(i);str.push('" value="');str.push(params[i]);str.push('" /> ');
			}
		}
		str.push('</object>');
		var playerDiv = $D.createElementIn("div","wm_control");
		playerDiv.innerHTML = str.join("");
		
		return playerDiv.firstChild;
	}
	/**
	 * 动态创建windowsMediaPlayer播放对象
	 *
	 */
	 function createPlayer(){
		return insertMediaPlayer({
			id : 'wmplayer',
			height : 0,
			width : 0,
			autoStart : 'false',
			invokeURLs : 'false',
			uiMode : 'invisible',
			enablePositionControls : 'true',
			canScan : 'true',
			canSeek : 'true'//,
			//src : 'http://qzone-music.qq.com/fcg-bin/fcg_set_musiccookie.fcg?fromtag='+mFromTag+'&p='+Math.random()
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
		
		mIsInit = true;

		
		
		mPlayerName.invokeURLs = false;
		mPlayerName.settings.volume = 75;
		/*
		startPlayer();
		setTimeout(function(){
			mSetedCookie = true;
		}, 1000);*/
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
			//var sid = parseInt(_obj.mid) + 12000000;
			//var playUrl = g_webPlayer.wmaurl_tpl.jstpl_format({stream:_obj.mstream, sid:sid});
			/*var sid = parseInt(_obj.mid) + 30000000;
			var playUrl = g_webPlayer.wmaurl_tpl.jstpl_format({stream:parseInt(_obj.mstream)+10, sid:sid});*/
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
					return ;
				}
				// cs.p("wmp play");
				mPlayerName.URL = playUrl;
				//g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYBEGIN);
				g_playerCallback.OnStateChanged(g_playerStatus.S_UNDEFINE);
				isFirstPlaying = true;
				startPlayer();
				g_playerCallback.OnStateChanged(g_playerStatus.S_PLAYBEGIN);
				loopCheckPlayer();
				
				mBufferedStart = new Date();
				mBufferedFirst = true;
				mBufferedRecord = true;
			});
		} else {
			setTimeout(setPlayURL, 500);
		}
		
		//startPlayer();
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
		return(mPlayerState == g_playerStatus.S_PAUSE );
	}
	function isStop(){
		//判断播放是否被中断
		if(!mIsInit) {
			return false;
		}

		return((mPlayerState == g_playerStatus.S_STOP) || (mPlayerState == g_playerStatus.S_PLAYEND) );
	}

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
			mPlayerName.controls.play();
			isFirstPlaying = true;
			loopCheckPlayer();
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
		if((!isPlaying())&&(!isPause())) {
			return false;
		}
		try
		{
			mPlayerName.controls.stop()
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
		if (!isPlaying()) {
			return false;
		}
		try {
			mPlayerName.controls.pause();
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
		var bSet = (mPlayerName.settings.mute == true ? false:true);
		mPlayerName.settings.mute = bSet;
		return bSet;
	}

	function getVolumn(){
		if(!mIsInit) {
			return 0;
		}
		return mPlayerName.settings.volume;
	}

	function setVolumn(vol) {
		if(!mIsInit) {
			return false;
		}
		if(mPlayerName.settings.mute) {
			return false;
		}
		if(vol > 100) {
			vol = 100;
		}
		if(vol < 0) {
			vol = 0;
		}
		if(vol >= 0 && vol <= 100) {
			mPlayerName.settings.volume = vol;
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
		if (curtime <= 0) {
			curtime = 0;
		}
		if (curtime >= mPlayerName.currentMedia.duration) {
			curtime = mPlayerName.currentMedia.duration;
		}
		
		mPlayerName.controls.currentPosition = curtime;
		
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

return MUSIC.module.webPlayer.wmPlayer;







});