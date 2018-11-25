define('js/common/module/qrcHandler.js', function(require, exports, module){

/********************************************************************
	@created:	2012/02/08
	@author:	pauldeng
	
	@purpose:	JS读取和解析QRC格式歌词文件
	@namespace  MUSIC.channel.qrcHandler	( g_qrcHandlerChn )
	
	@modified:
	
	使用方法：
	
*********************************************************************/
var MUSIC = require("js/common/music.js");
var g_coder = require("js/common/module/coder.js");
var g_lrcHandlerChn = require("js/common/module/lrcHandler.js");
var ua = MUSIC.userAgent;
var delay = 1000/60*12;//滚动帧频调整为默认的1/12；防止CPU占用率过高
MUSIC.module.qrcHandler = (function(){
	/**
	 * 静态变量及方法定义
	 * 
	 */

	/*
	 * 将XML格式的文本转换成XML文档
	 *
	 */
	function parseTxt2XML(xmlText) {
		var xmlDoc;
		if (typeof xmlText == 'undefined' || '' == xmlText) {
			return;
		}
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(xmlText,"text/xml");
		} else {// Internet Explorer
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(xmlText);
		}
		return xmlDoc;
	}
	
	/*
	 * 获取播放器当前播放时间静态封装
	 *
	 */
	function getTime(){
		return g_webPlayer.getCurPostion();
	}

	return function(){
		/**
		 * 私有变量定义
		 * 
		 */
		var _this = this;
		/**
		 * 公共变量定义
		 * 
		 */
		_this.playingSong = "0"; //当前播放的歌曲MID
		_this.playingSongInfo = null; //当前播放的歌曲MID
		_this.reqFlag = false; //加载歌词标志，true表示加载完成
		_this.haveqrc = false; //是否加载过歌词（或是否有qrc歌词）
		_this.qrcData = ''; //原始歌词数据
		_this.qrcJson = {
			ar : '',
			ti : '',
			al : '',
			by : '',
			offset : '',
			lines : []
		}; //qrc xml格式的歌词内容转换成json格式
		_this.lineItem = {
			timeTag : {
				startTime : 0, //起始时间（毫秒）
				timeLen : 0 //持续时间（毫秒）
			}, //[xxx,xxx] 歌词行时间标签
			context : '', //歌词行纯文本数据
			wordsItem : [] //本行各单词时间表
		}; //歌词行
		_this.wordItem = {
			word : '', // 对应文字
			startTime : 0, //起始时间（毫秒）
			timeLen : 0 //持续时间（毫秒）
		}; //歌词单词
		
		_this.qrcLineIndex = 0; //当前歌词行项索引
		
		//_this.qrcList = []; //解析到的歌词列表
		
		_this.artist = ''; // [ar:艺人名]
		_this.songTitle = ''; // [ti:曲名]
		_this.album = ''; // [al:专辑名]
		_this.byBody = ''; // [by:编辑者]
		_this.offset = 0; // [offset:初始偏移]
		
		_this.qrcContainer = ''; // 歌词容器
		
		/**
		 * 初始化函数
		 * @param {Object} opt {songMId:songMId,songId:songId,qrcContainer:container}
		 */
		_this.init = function(opt){
			_this.playingSongInfo = opt;
			_this.playingSong = (!opt.songMId || opt.songMId === "0")? parseInt(opt.songId) : opt.songMId;
			_this.qrcContainer = opt.qrcContainer;
			_this.clearQrcInfo();
			_this.dealLyricsFail();
			return;
			//_this.stopAnimFrame();
			//加载歌词
			_this.loadLyricsBySongId(opt.songMId, _this.dealLyricsSucc, _this.dealLyricsFail);
		};
		/**
		 * 通过歌曲ID获取歌词数据
		 *
		 * @param {String|Number} songMId 歌曲MID
		 * @param {Function} succCallback 加载歌词成功回调
		 * @param {Function} errCallback 加载歌词失败回调
		 * 
		 */
		_this.loadLyricsBySongId = function(songMId, succCallback, errCallback) {
			if (!songMId || songMId == "0") {
				songMId = _this.playingSong;
			}
		/*
		 *	测试代码，用于定位给定歌词id的歌词内容问题
		 */
			 /*var _url = "http://portalcgi.music.qq.com/fcgi-bin/fcg_query_lyric.fcg?musicid=36765&pcachetime="+(new Date().getTime()),
				_jMode = (!!ua.safari || !!ua.chrome || !!ua.isiPad || !!ua.isiPhone || !!ua.firefox)?true:false;
			var xmlAjax = new MUSIC.JSONGetter(_url,'song_lyrics', null, 'utf-8', _jMode);
			xmlAjax.onSuccess = function(data){
				//MUSIC.console.print(data.retcode);
				if (!!data && data.retcode == 0) {
					if (data.type != 1) {
						//QRC歌词
						_this.reqFlag = false; //加载完成
						_this.haveqrc = true;
						_data = data.lyric;
						top['qqmusic_lyrics_qrc'+songMId] = _data;
						_data = g_coder.Base64.decode(_data);
						console.log("解密后歌词："+_data);
						//succCallback(_data);
					} else {
						//errCallback();
						if (!!data.lyric) {
							//有LYRIC歌词
							//top['qqmusic_lyrics_lrc' + songMId] = data.lyric;
							console.log("解密后歌词："+g_coder.Base64.decode(data.lyric));
						}
					}
				} else {
					errCallback();
				}
			};
			xmlAjax.onTimeout = xmlAjax.onError = errCallback;
			xmlAjax.send("MusicJsonCallback");
			
			return; */
			if (typeof errCallback !== 'Funciton') {
				errCallback = _this.dealLyricsFail;
			}
			try {
				(!top['qqmusic_lyrics_qrc'+songMId]) && (top['qqmusic_lyrics_qrc'+songMId] = '');
			} catch(e){
				
			}
			var _data = null, _lyric = null;
			try {
				_data = top['qqmusic_lyrics_qrc' + songMId];
				_lyric = top['qqmusic_lyrics_lrc' + songMId];
			} catch(e){
				_data = null;
				_lyric = null;
			}
			if (!!_data) {
				//(!!_data) && succCallback(_data);
				_data = g_coder.Base64.decode(_data);
				//console.log("_data:" + _data);
				_this.reqFlag = false; //加载完成
				_this.haveqrc = true;
				succCallback(_data);
				return;
			} else if (!!_lyric) {
				//缓存中已有LYRIC歌词，不再拉QRC歌词
				errCallback();
				return;
			}
			_this.reqFlag = true;
			var _url = "//c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?pcachetime="+(new Date().getTime()),
				_jMode = (!!ua.safari || !!ua.chrome || !!ua.isiPad || !!ua.isiPhone || !!ua.firefox)?true:false;
			if (typeof(songMId) !== "string") {
				_url += "&musicid=" + _this.playingSong;
			} else {
				_url += "&songmid=" + songMId;
			}
			if (_this.playingSongInfo.songtype==111||_this.playingSongInfo.songtype==112||_this.playingSongInfo.songtype==113)
			{
				_url += "&songtype=" + _this.playingSongInfo.songtype;
			}
			
			MUSIC.jQueryAjax.jsonp({
				url : _url,
				charset : 'utf-8',
				jsonpCallback : 'MusicJsonCallback',
				success : function(data) {
					//MUSIC.console.print(data.retcode);
					if (!!data && data.retcode == 0) {
						if (data.type == 3) {
							//QRC歌词
							_this.reqFlag = false; //加载完成
							_this.haveqrc = true;
							_data = data.lyric;
							try {
								top['qqmusic_lyrics_qrc'+songMId] = _data;
							} catch (e){
							
							}
							_data = g_coder.Base64.decode(_data);
							//alert("解密后歌词："+_data);
							succCallback(_data);
						} else {
							errCallback();
							if (!!data.lyric) {
								//有LYRIC歌词
								try {
									top['qqmusic_lyrics_lrc' + songMId] = data.lyric;
								} catch(e){
									
								}
							}
						}
					} else if (!!data && data.retcode == 1) {
						errCallback();
						//无歌词，则不再重复拉取lrc歌词
						try {
							top['qqmusic_lyrics_lrc' + songMId] = "no-lyrics";
						} catch(e){
						
						}
						
					} else {
						errCallback();
					}
				},
				timeout : 3000,
				error : function(jqXHR, textStatus, errorThrown){
					if (textStatus=='timeout')
					{
					}
					errCallback();
				}
			});
			
		};
		/**
		 * 加载歌词成功处理
		 *
		 * @param {String} xmlHttp 歌词xmlHttp对象（）
		 *
		 * @return {String} _this.qrcData
		 */
		_this.dealLyricsSucc = function(xmlHttp) {
		//MUSIC.console.print(xmlHttp);
			//console.log("xmlHttp: " + xmlHttp.text);
			var _xmlDom = parseTxt2XML(xmlHttp);//xmlHttp.xmlDom;
			//if (!_xmlDom) {
				//_xmlDom = parseTxt2XML(xmlHttp.text);
			//}
			if (_xmlDom==undefined||typeof(_xmlDom)=="undefined")
			{
				_this.dealLyricsFail();
                return;
			}
            var _QrcInfo = _xmlDom.getElementsByTagName("LyricInfo");
            var _originQrc = '';
            if(!!_QrcInfo[0]){
                _originQrc = _QrcInfo[0].getElementsByTagName("Lyric_1")[0];
            } else {
                _this.dealLyricsFail();
                return;
            }
            if(!!_originQrc){
                _this.qrcData = _originQrc.getAttribute('LyricContent');
				//console.log("歌词内容：" + _this.qrcData);
				_this.parseQrcData(); //解析QRC歌词文件
            }
			if (g_qrcHandlerChn.haveqrc)
			{
				
				$('.qrc_ctn').html('<p id="line_null" class="on">&nbsp;</p>'+ g_qrcHandlerChn.printQrcLines());
				g_qrcHandlerChn.startAnimFrame('qrc_ctn');
			}
		};
		/**
		 * 加载歌词失败处理
		 *
		 */
		_this.dealLyricsFail = function() {
			(g_lrcHandlerChn.init(g_qrcHandlerChn.playingSongInfo));
			_this.reqFlag = false; //加载完成
			_this.haveqrc = false;
			try {
				top['qqmusic_lyrics_qrc'+_this.playingSong] = null;
			} catch (e){
			
			}
		};
		
		/**
		 * 解析歌词数据
		 *
		 */
		_this.parseQrcData = function(){
			var _qrcData = _this.qrcData, _tmpLineObj = {}, i = 0, _len = 0, _cache = {};
			_tmpLineObj = _this.getLineFlag(_qrcData);
			
			var _reg = new RegExp('_!!_'),
				_tmpList = _tmpLineObj.rQrcStr.trim().split(_reg),//前面会多出一个空项 含歌词内容的文本数组
				_tmpLineTags = _tmpLineObj.lineFlags;
				//MUSIC.console.print('歌词文件总行数：' + _tmpList.length);
				//MUSIC.console.print('歌词文件LineTag总数：' + _tmpLineTags.length);
				//MUSIC.console.print("qrcStr: " + _tmpLineObj.rQrcStr.trim());
				//MUSIC.console.print("_tmpList[6]: " + _tmpList[6] + " == _tmpLineTags[5]: " + _tmpLineTags[5]);
			for(i=1,_len = _tmpList.length; i < _len; i ++) {
				_cache = _tmpList[i]; //歌词第i-1行
				//MUSIC.console.print("第"+i+"行歌词："+_cache);
				//解析lineTags
				_reg = new RegExp('[\\[|\\]]', 'g');
				var _tmpTag = _tmpLineTags[i-1].replace(_reg, ''),_pointPos=0;
				//MUSIC.console.print((i-1)+"时间标签：" + _tmpLineTags[i-1]);
				if (_tmpTag.indexOf('al:') != -1) { // album
					_pointPos = _tmpTag.indexOf(':');
					_this.album = _this.qrcJson.al = _tmpTag.substring(_pointPos + 1);
					//MUSIC.console.print('专辑：' + _this.album);
				} else if (_tmpTag.indexOf('ar:') != -1) { // artist
					_pointPos = _tmpTag.indexOf(':');
					_this.artist = _this.qrcJson.ar = _tmpTag.substring(_pointPos + 1);
					//MUSIC.console.print('歌手：' + _this.artist);
				} else if (_tmpTag.indexOf('ti:') != -1) { // title
					_pointPos = _tmpTag.indexOf(':');
					_this.songTitle = _this.qrcJson.ti = _tmpTag.substring(_pointPos + 1);
					//MUSIC.console.print('歌名：' + _this.songTitle);
				} else if (_tmpTag.indexOf('by:') != -1) { // by body
					_pointPos = _tmpTag.indexOf(':');
					_this.byBody = _this.qrcJson.by = _tmpTag.substring(_pointPos + 1);
					//MUSIC.console.print('编辑：' + _this.byBody);
				} else if (_tmpTag.indexOf('offset:') != -1) {
					_pointPos = _tmpTag.indexOf(':');
					_this.offset = _this.qrcJson.offset = _tmpTag.substring(_pointPos + 1);
					//MUSIC.console.print('偏移：' + _this.offset);
				} else { // 歌词时间标签,添加歌词到列表
					var _tmpTimes = _tmpTag.split(','),
						_tmpObj = _this.getWordFlag(_cache.replace('``````````', ''));
					//MUSIC.console.print("yyy: " + _tmpObj.rLineStr);
					_this.qrcJson.lines.push({
						timeTag:{startTime:parseInt(_tmpTimes[0].trim(), 10)-_this.offset, timeLen:parseInt(_tmpTimes[1].trim(),10)},
						context:(!!_tmpObj)?_tmpObj.rLineStr:'',
						wordsItem:(!!_tmpObj)?_tmpObj.wordFlags:[]
					});
				}
			}
			
			/* for(i=0; i<_this.qrcJson.lines.length; i ++) {
				MUSIC.console.print(i + ".行歌词：" + _this.qrcJson.lines[i].context);
			}
			MUSIC.console.print("歌词行总数：" + _this.qrcJson.lines.length); */
		};
		/**
		 * 按行输出所有的歌词数据
		 *
		 */
		_this.printQrcLines = function(){
			var _json = _this.qrcJson;
			if (!!_json) {
				var _lines = _json.lines,
					_len = _lines.length,
					i = 0,
					_html = [];
				for (; i < _len; i ++) {
					//MUSIC.console.print("xxx: " + _lines[i].context);
					var _h5 = (!!ua.safari || !!ua.chrome || !!ua.isiPad || !!ua.isiPhone); //是否支持h5audio
					if (!!_h5) {
						_html.push('<p id="line_'+i+'">'+_lines[i].context+'</p>');
					} else {
						_html.push('<p id="line_'+i+'">'+_lines[i].context+'</p>');
					}
				}
				//MUSIC.console.print(_html.join(''));
				return _html.join('');
			}
			return '';
		};
		/**
		 * 从原始歌词数据中提取出"[*]"，并将其替换为"_!!_"，返回
		 * @param {String} qrcStr 原始歌词数据字符串
		 *
		 * @return
		 *
		 */
		_this.getLineFlag = function(qrcStr) {
			qrcStr = qrcStr || _this.qrcData;
			var _tmpStr = qrcStr, reg = new RegExp("\\[[a-z|0-9]+\\s*[:|,]\\s*[^\\]]*\\]", "gi"),
				lineFlags = [], rtnObj = {}, rQrcStr = '';
			
			lineFlags = _tmpStr.match(reg);
			rQrcStr = _tmpStr.replace(reg, '``````````_!!_');
			return {lineFlags:lineFlags, rQrcStr:rQrcStr};
		};
		/**
		 * 从一行歌词数据中提取出"(*)"，并将其替换为""，返回
		 * @param {String} lineTxt 原始歌词的一行数据字符串
		 *
		 * @return
		 *
		 */
		 //var arr = str.match(/\([0-9]+,\s*[0-9]+\)/g)
		_this.getWordFlag = function(lineTxt) {
			lineTxt = lineTxt.trim() || '';
			if ('' == lineTxt) {
				return null;
			}
			var _tmpLineTxt = lineTxt, reg = new RegExp('\\([\-0-9]+,\\s*[\-0-9]+\\)', 'g'),
				wordFlags = [], _wordFlag = {}, words = [], rtnObj = {}, rtnWordFlags = [], rtnLineStr = '';
			wordFlags = _tmpLineTxt.match(reg);
			words = _tmpLineTxt.replace(reg, '_!!_').split('_!!_');
			rtnLineStr = _tmpLineTxt.replace(reg, '');
			
			if (wordFlags == null) {
				rtnObj = {
					wordFlags : [],
					rLineStr : rtnLineStr
				};
				return rtnObj;
			}
			
			//MUSIC.console.print("_tmpLineTxt:" + _tmpLineTxt);
			//MUSIC.console.print("rtnLineStr:" + rtnLineStr);
			for (var i=0, _len=wordFlags.length; i < _len; i++) {
				var _tmp = wordFlags[i],
					wordTimes = _tmp.replace(new RegExp('[\\(|\\)]', 'g'), '').split(',');
				_wordFlag = {
					word : words[i],
					startTime : (parseInt(wordTimes[0].trim(), 10) - _this.offset), 
					timeLen : parseInt(wordTimes[1].trim(), 10)
				};
				rtnWordFlags.push(_wordFlag);
				//MUSIC.console.print(_wordFlag.word+','+_wordFlag.startTime+','+_wordFlag.timeLen);
			}
			rtnObj = {
				wordFlags : rtnWordFlags,
				rLineStr : rtnLineStr
			};
			return rtnObj;
		};
		/**
		 * 清空上次解析的歌词数据
		 *
		 */
		_this.clearQrcInfo = function(){
			_this.haveqrc = false;  // 没有歌词
			// 清空list内容
			_this.qrcJson = {
				ar : '',
				ti : '',
				al : '',
				by : '',
				offset : '',
				lines : []
			};
			// 清空其他内容
			_this.qrcLineIndex = 0;
			_this.qrcData = '';
			_this.artist = '';
			_this.songTitle = '';
			_this.album = '';
			_this.byBody = '';
			_this.offset = 0;
			
			_this.reqFlag = false;
			//停止歌词滚动
			_this.stopAnimFrame();
		};
		/**
		 * 清空歌词行项，单词项
		 *
		 */
		_this.clearQrcItem = function(){
			_this.lineItem = {
				timeTag : {
					startTime : 0, //起始时间（毫秒）
					timeLen : 0 //持续时间（毫秒）
				}, //[xxx,xxx] 歌词行时间标签
				context : '', //歌词行纯文本数据
				wordsItem : [] //本行各单词时间表
			}; //歌词行
			_this.wordItem = {
				word : '', // 对应文字
				startTime : 0, //起始时间（毫秒）
				timeLen : 0 //持续时间（毫秒）
			}; //歌词单词
		};
		
		/**
		 * 根据播放时间，获取需要显示的歌词行
		 * 
		 * @param {Number|String} playTime 当前的播放时间（毫秒）
		 *
		 */
		_this.getQrcLineItemByPlayTime = function(playTime) {
			playTime = playTime || 0;
			var _curLineIndex = _this.qrcLineIndex,
				_curLineItem = _this.qrcJson.lines[_curLineIndex],
				i = 0,
				_len = _this.qrcJson.lines.length - 1,
				_line = {};
			
			//清空正在播放的歌词行数据
			_this.clearQrcItem();
			//找出符合条件的歌词行（去除了最后一行）
			for ( ; i < _len ; i ++) {
				_line = _this.qrcJson.lines[i];
				var _start = _line.timeTag.startTime,
					_delay = _line.timeTag.timeLen,
					_dx = playTime - _start;
				if (_dx >= 0 && _dx <= _delay) {
					//i > _this.qrcLineIndex && g_qrcHandlerChn.qrcScrollTop(_this.qrcContainer, _this.qrcLineIndex);
					_this.lineItem = _line;
					_this.qrcLineIndex = i;
					return true;
				}
			}
			//没有找到符合条件的歌词，查看最后一行
			_line = _this.qrcJson.lines[_len];
			_start = _line.timeTag.startTime;
			_delay = _line.timeTag.timeLen;
			_dx = playTime - _start;
			if (_dx >= 0) {
				//_len > _this.qrcLineIndex && g_qrcHandlerChn.qrcScrollTop(_this.qrcContainer, _this.qrcLineIndex);
				_this.lineItem = _line;
				_this.qrcLineIndex = _len;
				return true;
			}
			
			return false;
		};
		
		/**
		 * 根据播放时间及当前行，设置需要高亮显示的单词
		 * 
		 * @param {Number|String} playTime 当前的播放时间（毫秒）
		 * @param {Number} lineIndex 当前的歌词行下标（如果不传，默认为全局的当前行）
		 *
		 */
		_this.getHighlightWords = function(playTime, lineIndex){
			playTime = playTime || 0;
			lineIndex = lineIndex || _this.qrcLineIndex;
			if (playTime < _this.qrcJson.lines[0].timeTag.startTime) {
				//还未到第一行歌词的时间，直接显示歌名，不高亮
				return '';
			}
			var _line = _this.qrcJson.lines[lineIndex],
				_wordsItem = _line.wordsItem,
				_start = _line.timeTag.startTime,
				i = 0,
				_len = _wordsItem.length,
				_delay = 0,
				_word = {},
				_highlightWords = []; //需要高亮显示的单词
			for (; i < _len; i ++) {
				_word = _wordsItem[i];
				_delay += parseInt(_word.timeLen, 10);
				if (_delay > playTime-_start) {
					_highlightWords.push(_word.word);
					return _highlightWords.join('');
				}
				_highlightWords.push(_word.word);
			}
		};
		
		/**
		 * 歌词行滚动算子
		 *
		 */
		_this.scrollLine = function(elem) {
			elem = (typeof elem == 'string')? $('#'+elem)[0] : elem;
			var max = parseInt(elem.scrollHeight-72),
				_top = $(elem).parent('.js_lyric_box').scrollTop(),
				_line_height = (!!$('#line_'+g_qrcHandlerChn.qrcLineIndex)[0])?$('#line_'+g_qrcHandlerChn.qrcLineIndex).height():24,
				stop = false,
				_idx = g_qrcHandlerChn.qrcLineIndex || 0,
				heights = 0,
				_times = parseInt(_line_height/6, 10),
				_off = _line_height%6;
			//console.log("_times = " + _times);
			//console.log("_off = " + _off);
			
			//经历过的歌词行总高度
			while (_idx-- > 1) {
				var _h = (!!$('#line_'+_idx))?$('line_'+_idx).height():24;
				heights += _h;
			}
			//console.log("heights = " + heights);
			stop = (_top==heights);//(_top%_line_height==0)&&
			//console.log("stop = " + stop);
			//console.log("_top = " + _top);
			/*if (_top >= max) {
				//console.log("scollOver!!!");
				g_qrcHandlerChn.stopAnimFrame();
				return;
			}*/
			// && elem.scrollTop < max
			if (!stop) {
				if (heights-_top >= _line_height*2){
					$(elem).parent('.js_lyric_box').scrollTop(heights);
				} /* else if (_line_height > 24) {
					var _t = 
					elem.scrollTop += Math.floor(_line_height/24)*4;
				} */ else {
					var _diff = heights-_top;
					if (_diff > _line_height){
						_diff -= _line_height;
					}
					var _t = (_diff>=_times)?_times:_off;
					//console.log("_t = " + _t);
					//console.log("_top + _t = " + (_top + _t));
					$(elem).parent('.js_lyric_box').scrollTop(_top + _t);
				}
			}
			
			//(!stop && elem.scrollTop < max) && (elem.scrollTop += 4);
			
			//if (g_qrcHandlerChn.aniFrame != null) {
			g_qrcHandlerChn.startAnimFrame(elem);
			//}
		};
		/**
		 * 滚动动画相关变量及接口
		 *
		 */
		//动画帧句柄
		_this.aniFrame = null;
		//动画帧接口
		_this.qrcAnimFrame = function(cb, delay){
			return window.requestTimeout(cb, delay);
		};
		//动画帧启动函数
		_this.startAnimFrame = function(elem){
			g_qrcHandlerChn.aniFrame = g_qrcHandlerChn.qrcAnimFrame(function(){g_qrcHandlerChn.scrollLine(elem);}, delay);
		};
		//动画帧停止函数
		_this.stopAnimFrame = function(){
			if (g_qrcHandlerChn.aniFrame != null) {
				window.cancelRequestAnimFrame(g_qrcHandlerChn.aniFrame);
			}
			g_qrcHandlerChn.aniFrame = null;
		};
		//动画帧重新启动函数
		_this.restartAnimFrame = function(elem){
			g_qrcHandlerChn.stopAnimFrame();
			g_qrcHandlerChn.startAnimFrame(elem);
		};
	}
})();

var g_qrcHandlerChn = new MUSIC.module.qrcHandler();

/**
 * 对浏览器的动画帧（requestAnimationFrame）接口进行封装
 * 默认帧频为60fps，即1000/60 ms
 *
 */
(function(){
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame || 
			function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element){
				window.setTimeout(callback, 1000 / 60);
			};
	})();
	/**
	 * 清除动画帧（requestAnimationFrame）接口
	 * @param {Object} handle 动画帧句柄
	 *
	 */
	window.cancelRequestAnimFrame = function(handle){
		window.cancelAnimationFrame? window.cancelAnimationFrame(handle.value) :
		window.webkitCancelRequestAnimationFrame? window.webkitCancelRequestAnimationFrame(handle.value) :
		window.mozCancelRequestAnimationFrame? window.mozCancelRequestAnimationFrame(handle.value) :
		window.oCancelRequestAnimationFrame? window.oCancelRequestAnimationFrame(handle.value) :
		window.msCancelRequestAnimationFrame? window.msCancelRequestAnimationFrame(handle.value) :
		window.clearTimeout(handle);
	};
	/**
	 * 实现任意帧频的动画帧接口
	 *
	 */
	window.requestTimeout = function(cb, delay) {
		if(!window.requestAnimationFrame && 
			!window.webkitRequestAnimationFrame && 
			!window.mozRequestAnimationFrame && 
			!window.oRequestAnimationFrame && 
			!window.msRequestAnimationFrame) {
				return window.setTimeout(cb, delay);
		}

		var start = (new Date()).getTime(),
			handle = new Object();
			
		function loop(){
			var current = (new Date()).getTime(),
				delta = current - start;
			
			delta >= delay ? cb.call() : handle.value = window.requestAnimFrame(loop);
		};
		
		handle.value = window.requestAnimFrame(loop);
		return handle;
	};
})();
return g_qrcHandlerChn;

});