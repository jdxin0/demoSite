define('js/common/module/lrcHandler.js', function(require, exports, module){

/********************************************************************
	@created:	2012/02/06
	@author:	pauldeng
	
	@purpose:	JS读取和解析lyric歌词文件
	@namespace MUSIC.channel.lrcHandler	( g_lrcHandlerChn )
	
	@modified:
	
	使用方法：
	1、根据当前播放时间值通过g_lrcHandlerChn.getLyricLineItemByLineIndex 接口获得当前需要显示的歌词项；（优先实现）
	2、如果还需要显示该行前的或后的行的歌词，则可以通过函数g_lrcHandlerChn.getLyricLineItemByPlayTime 带出的索引值index，
	   向前或向后通过g_lrcHandlerChn.getLyricLineItemByLineIndex 函数获取歌词项，来显示；
*********************************************************************/
var MUSIC = require("js/common/music.js");
var g_coder = require("js/common/module/coder.js");
var ua = MUSIC.userAgent;
var delay = 1000/60*12;//滚动帧频调整为默认的1/12；防止CPU占用率过高
MUSIC.module.lrcHandler = (function(){
	/**
	 * 静态变量及方法定义
	 * 
	 */
	function sortFunc(obj1, obj2) {
		return (g_lrcHandlerChn.compare(obj1.time, obj2.time)?-1:1);
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
		_this.reqFlag = -1; //加载歌词标志，1表示加载完成
		_this.haveLrc = false; //是否加载过歌词
		_this.txtLrc = false; //txt歌词
		_this.lyricData = ''; //歌词数据
		_this.lrcItem = {
			time : '00:00.00', //时间点
			context : '' //歌词行数据
		};
		_this.lrcItemIndex = 0; //当前歌词项索引
		_this.preLrcItemIndex = -1; //前一条歌词项索引
		_this.lrcList = []; //解析到的歌词列表
		_this.artist = ''; // [ar:艺人名]
		_this.songTitle = ''; // [ti:曲名]
		_this.album = ''; // [al:专辑名]
		_this.byBody = ''; // [by:编辑者]
		_this.offset = 0; //
		
		_this.playingSong = 0;
		_this.playingSongInfo = null;
		
		/**
		 * 初始化函数
		 *
		 */
		_this.init = function(songinfo){
			var songMId = songinfo.songMId;
			_this.clearLrcInfo();
			_this.playingSongInfo = songinfo;
			_this.playingSong = songMId;
			//加载歌词
			_this.loadLyricBySongId(songMId, _this.dealLrcXmlSucc, _this.dealLrcXmlFail);
		};
		/**
		 * 通过歌曲ID获取歌词数据
		 *
		 * @param {String|Number} songMId 歌曲MID
		 * @param {Function} succCallback 加载歌词成功回调
		 * @param {Function} errCallback 加载歌词失败回调
		 * 
		 */
		_this.loadLyricBySongId = function(songMId, succCallback, errCallback) {
			if (typeof errCallback !== 'Funciton') {
				errCallback = _this.dealLrcXmlFail;
			}
			try {
				(!top['qqmusic_lyrics_lrc'+songMId]) && (top['qqmusic_lyrics_lrc'+songMId] = null);
			} catch (e){
			
			}
			var _data = null;
			try {
				_data = top['qqmusic_lyrics_lrc' + songMId];
			} catch (e){
				_data = null;
			}
			if (!!_data) {
				_this.reqFlag = 1;
				_this.haveLrc = true;
				if (_data == 'no-lyrics') { //无歌词，不再重复请求cgi
					errCallback();
					return;
				}
				_data = g_coder.Base64.decode(_data);
				var trans = g_coder.Base64.decode(top['qqmusic_lyrics_trans' + songMId]);
				succCallback(_data, trans);
				return;
			}
			_this.reqFlag = 0; //正在加载歌词...
			var _url = "//c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?callback=MusicJsonCallback_lrc&pcachetime="+(new Date().getTime()),
				_jMode = (!!ua.safari || !!ua.chrome || !!ua.isiPad || !!ua.isiPhone || !!ua.firefox)?true:false;
			if (typeof(songMId) !== "string") {
				_url += "&musicid=" + songMId;
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
				jsonpCallback : 'MusicJsonCallback_lrc',
				success : function(data) {
					_this.clearLrcInfo();
					if (!!data && data.retcode == 0) {
						if (data.type != 3) {
							//LRC歌词
							_this.reqFlag = 1;
							_this.haveLrc = true;
							_data = data.lyric;
							try {
								top['qqmusic_lyrics_lrc'+songMId] = _data;
								top['qqmusic_lyrics_trans'+songMId] = data.trans;
							} catch (e){
							
							}
							_data = g_coder.Base64.decode(_data);
							var trans = g_coder.Base64.decode(data.trans);
							//alert("解密后歌词："+_data);
							succCallback(_data, trans);
						} else {
							errCallback();
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
		 * @param {Object} xmlHttp 歌词xmlHttp对象
		 *
		 * @return {String} _this.lyricData
		 */
		_this.dealLrcXmlSucc = function(xmlHttp, trans) {
            var _originLyric = xmlHttp;
            if(!!_originLyric){
				if (!!trans)
				{
					$('.js_trans_btn').css({'display':''});
				}else $('.js_trans_btn').css({'display':'none'});
                _this.lyricData = _originLyric.replace(new RegExp("\\n", "g"),"_!!_").trim();
				_this.parseLyricData(trans.replace(new RegExp("\\n", "g"),"_!!_").trim());
            }
			
			if (g_lrcHandlerChn.haveLrc)
			{
				var _lrcLines = g_lrcHandlerChn.printLrcLines();
				if (_lrcLines == '') { //非正常的lrc歌词（纯文本歌词）
					g_lrcHandlerChn.haveLrc = false;
					g_lrcHandlerChn.txtLrc = true;
					$('.qrc_ctn').html('');$('.qrc_ctn').html('<p>'+_originLyric.replace(/&#10;/g, "</p><p>").replace(new RegExp("\\n", "g"),"</p><p>")+'</p>');
					//$('.qrc_ctn').html('<p>&nbsp;</p><p><a href="//support.qq.com/write.shtml?fid=602" target="_blank">该单曲暂无歌词，点击这里进行反馈</a></p>');
				}else{
					g_lrcHandlerChn.txtLrc = false;
					$('.qrc_ctn').html('');$('.qrc_ctn').html('<p data-id="line_null">&nbsp;</p>' + _lrcLines);
					g_lrcHandlerChn.startAnimFrame('qrc_ctn');
				}
				if ($('.js_trans_btn').hasClass('btn_lang--select'))
				{
					$('.js_trans_line').show();
				}else{
					$('.js_trans_line').hide();
				}
			}
		};
		/**
		 * 加载歌词失败处理
		 *
		 */
		_this.dealLrcXmlFail = function() {
			g_lrcHandlerChn.reqFlag = 1;
			g_lrcHandlerChn.haveLrc = false;
			try {
				top['qqmusic_lyrics_lrc'+_this.playingSong] = null;
			} catch (e){
				
			}
		};
		
		/**
		 * 解析歌词数据
		 *
		 */
		_this.parseLyricData = function(trans){
			var _lrcData = _this.lyricData, _tmpList = [], i = 0, _len = 0, _cache;
			_tmpList = _lrcData.split('_!!_');
			//MUSIC.console.print('歌词文件总行数：' + _tmpList.length);
			var arr = trans.split('_!!_'), _trans_map = {};
			var it = 0;
			for(_len = arr.length; i < _len; i ++) {
				//console.log(_tmpList[i]);
				_cache = arr[i];
				//在_cache中查找"]",一行标签中可以含有多个时间标签
				var _rIndex = _cache.lastIndexOf(']'),
					_lSubstr = _cache.substring(0, _rIndex + 1/*保留]*/), //时间标签子串
					_rSubstr = _cache.substring(_rIndex + 1), //歌词内容子串
					_tmpTimes = _lSubstr.replace(new RegExp("\\[", "g"), "").split(']'), //分割时间标签
					_tLen = _tmpTimes.length,
					j = _tLen - 1,
					_tmpTag = '',
					_pointPos = 0;
				while (j--) {
					//处理每一个时间标签
					_tmpTag = _tmpTimes[j];
					//MUSIC.console.print("时间标签：" + _tmpTag);
					if (_tmpTag.indexOf('al:') != -1) { // album
					} else if (_tmpTag.indexOf('ar:') != -1) { // artist
					} else if (_tmpTag.indexOf('ti:') != -1) { // title
					} else if (_tmpTag.indexOf('by:') != -1) { // by body
					} else if (_tmpTag.indexOf('offset:') != -1) {
					} else { // 歌词时间标签,添加歌词到列表
						_tmpTag = (_tmpTag.indexOf(".") != -1) ? _tmpTag : _tmpTag + ".00";
						_rSubstr = _rSubstr.trim()==''? '' : _rSubstr.trim();
						var _t = parseInt((_this.playTime2ms(_tmpTag)-_this.offset), 10);
						_tmpTag = _this.ms2playTime(_t);
						if (_rSubstr!='')
						{
							_trans_map[it] = _rSubstr;
							it++;
						}
					}
				}
			}
			it = 0;
			for(_len = _tmpList.length, i = 0; i < _len; i ++) {
				//console.log(_tmpList[i]);
				_cache = _tmpList[i];
				//在_cache中查找"]",一行标签中可以含有多个时间标签
				var _rIndex = _cache.lastIndexOf(']'),
					_lSubstr = _cache.substring(0, _rIndex + 1/*保留]*/), //时间标签子串
					_rSubstr = _cache.substring(_rIndex + 1), //歌词内容子串
					_tmpTimes = _lSubstr.replace(new RegExp("\\[", "g"), "").split(']'), //分割时间标签
					_tLen = _tmpTimes.length,
					j = _tLen - 1,
					_tmpTag = '',
					_pointPos = 0;
				while (j--) {
					//处理每一个时间标签
					_tmpTag = _tmpTimes[j];
					//MUSIC.console.print("时间标签：" + _tmpTag);
					if (_tmpTag.indexOf('al:') != -1) { // album
						_pointPos = _tmpTag.indexOf(':');
						_this.album = _tmpTag.substring(_pointPos + 1);
					} else if (_tmpTag.indexOf('ar:') != -1) { // artist
						_pointPos = _tmpTag.indexOf(':');
						_this.artist = _tmpTag.substring(_pointPos + 1);
					} else if (_tmpTag.indexOf('ti:') != -1) { // title
						_pointPos = _tmpTag.indexOf(':');
						_this.songTitle = _tmpTag.substring(_pointPos + 1);
					} else if (_tmpTag.indexOf('by:') != -1) { // by body
						_pointPos = _tmpTag.indexOf(':');
						_this.byBody = _tmpTag.substring(_pointPos + 1);
					} else if (_tmpTag.indexOf('offset:') != -1) {
						_pointPos = _tmpTag.indexOf(':');
						_this.offset = _tmpTag.substring(_pointPos + 1);
					} else { // 歌词时间标签,添加歌词到列表
						//_this.lrcItem.time = _tmpTag;
						//_this.lrcItem.context = _rSubstr;
						_tmpTag = (_tmpTag.indexOf(".") != -1) ? _tmpTag : _tmpTag + ".00";
						_rSubstr = _rSubstr.trim()==''? '' : _rSubstr.trim();
						var _t = parseInt((_this.playTime2ms(_tmpTag)-_this.offset), 10);
						_tmpTag = _this.ms2playTime(_t);
						if (_rSubstr!='')
						{
							if (!!_trans_map[it]&&_trans_map[it]!='//')
							{
								_rSubstr = _rSubstr +"<br/><span class=\"js_trans_line\">"+ _trans_map[it]+'</span>';
							}
							_this.lrcList.push({time:_tmpTag, context:_rSubstr});
							it++;
						}
					}
				}
			}
			//按时间标签从小到大排序
			_this.sortLrcList();
		};
		/**
		 * 对歌词列表按时间顺序从小到大排序
		 *
		 */
		_this.sortLrcList = function(){
			_this.lrcList.sort(sortFunc);
		};
		/**
		 * 按行输出所有的歌词数据
		 *
		 */
		_this.printLrcLines = function(){
			var _list = _this.lrcList;
			if (!!_list) {
				var _len = _list.length,
					i = 0,
					_html = [];
				for (; i < _len; i ++) {
					_html.push('<p data-id="line_'+i+'">'+_list[i].context+'</p>');
				}
				//MUSIC.console.print(_html.join(''));
				return _html.join('');
			}
			return '';
		};
		/**
		 * 清空上次解析的歌词数据
		 *
		 */
		_this.clearLrcInfo = function(){
			_this.haveLrc = false;  // 没有歌词
			// 清空list内容
			_this.lrcList = [];
			// 清空其他内容
			_this.lyricData = '';
			_this.artist = '';
			_this.songTitle = '';
			_this.album = '';
			_this.byBody = '';
			_this.offset = 0;
			// 重置歌词项index
			_this.preLrcItemIndex = -1;
			_this.lrcItemIndex = 0;
			
			_this.reqFlag = -1;
			//停止歌词滚动
			_this.stopAnimFrame();
		};
		/**
		 * 清空歌词行项
		 *
		 */
		_this.clearLrcItem = function(){
			_this.lrcItem = {
				time : '00:00.00', //时间点
				context : '' //歌词行数据
			};
		};
		/**
		 * 根据lineIndex获取歌词项
		 * 
		 * @param {Number} lineIndex 歌词项索引，从0开始
		 *
		 */
		_this.getLyricLineItemByLineIndex = function(lineIndex) {
			var _len = _this.lrcList.length;
			// 参数有效性
			if (lineIndex < 0 || lineIndex >= _len) {
				return false;
			}
			// 得到该项
			_this.clearLrcItem();
			(_this.lrcItemIndex<lineIndex)&&(_this.preLrcItemIndex = _this.lrcItemIndex);
			_this.lrcItemIndex = lineIndex;
			_this.lrcItem = _this.lrcList[_this.lrcItemIndex];
			return true;	
		};
		/**
		 * 根据时间值得到歌词项(时间格式分钟、秒、毫秒)
		 *
		 * @param {Number} minutes 分钟
		 * @param {Number} seconds 秒
		 * @param {Number} mSecond 毫秒
		 *
		 */
		_this.getLyricLineItemByTimes = function(minutes, seconds, mSecond) {
			// 参数有效性
			if (minutes < 0 || seconds < 0 || mSecond < 0){
				return false;
			}
			// 得到该项
			_this.clearLrcItem();
			var _curPlayTime = minutes + ':' + seconds + '.' + mSecond; // 当前歌词项对应时间
			return _this.getLyricLineItemByPlayTime(_curPlayTime);
		};
		/**
		 * 根据时间获得当前播放的歌词项 
		 *
		 * @param {String} playTime 歌曲播放时间字符串，格式必须为mm:ss.ff，也就是(分钟:秒.毫秒)
		 *
		 */
		_this.getLyricLineItemByPlayTime = function(playTime) {
			// 得到该项
			_this.clearLrcItem();
			var _curPlayTime = playTime, // 当前歌词项对应时间
				_lrcItemCount = _this.lrcList.length,
				_lineIndex = 0,
				i = 0;
			if (_lrcItemCount <= 0) {
				return false;
			}
			//找出符合条件的歌词项（去除了最后一项）
			for (; i < _lrcItemCount - 1; i ++) {
				if (0 == i && _this.compare(_curPlayTime, _this.lrcList[i].time, '<')) {
					return _this.getLyricLineItemByLineIndex(0);
				}
			
				var _startItem = _this.lrcList[i],
					_endItem = _this.lrcList[i+1];
				if (_this.compare(_startItem.time, _curPlayTime, '<=') && _this.compare(_curPlayTime, _endItem.time, '<')) {
					_lineIndex = i;
					//_this.lrcItem = _this.lrcList[_lineIndex];
					//_this.lrcItemIndex = _lineIndex;
					return _this.getLyricLineItemByLineIndex(_lineIndex);
					//return true;
				}
			}
			//没有找到符合条件的歌词，查看最后一项
			if (_this.compare(_this.lrcList[_lrcItemCount-1].time, _curPlayTime)) {
				_lineIndex = _lrcItemCount-1;
				//_this.lrcItem = _this.lrcList[_lineIndex];
				//_this.lrcItemIndex = _lineIndex;
				return _this.getLyricLineItemByLineIndex(_lineIndex);
				//return true;
			}
			
			//_this.lrcItem = _this.lrcList[_lineIndex];
			//没找到合适的
			return false;
		};
		/**
		 * 将PlayTime转换为毫秒
		 * 
		 * @param {String} playTime 格式为mm:ss.ff
		 *
		 */
		_this.playTime2ms = function (playTime) {
			var _minutes = parseInt(playTime.substring(0,playTime.indexOf(':')), 10) * 60 * 1000,
				_seconds = parseInt(playTime.substring(playTime.indexOf(':')+1, playTime.indexOf('.')), 10) * 1000,
				_mSecond = parseInt(playTime.substring(playTime.indexOf('.')+1), 10);
			return (_minutes + _seconds + _mSecond);
		};
		/**
		 * 将毫秒转换为PlayTime (格式:mm:ss.ff)
		 * 
		 * @param {String} ms
		 *
		 */
		_this.ms2playTime = function (ms) {
			var _minutes = parseInt(ms/60000, 10),
				_seconds = parseInt((ms/1000)%60, 10),
				_mSecond = ms - _minutes*60000 - _seconds*1000;
			return (_minutes>9?'':'0') +_minutes + ":" + (_seconds>9?'':'0') + _seconds + "." + (_mSecond>9?'':'0') + _mSecond;
		};
		/**
		 * 比较两个PlayTime的大小
		 * 
		 * @param {String} pt1 格式为mm:ss.ff
		 * @param {String} pt2 格式为mm:ss.ff
		 * @param {String} opt 比较选项 "<", "<=" ">" ">="; 例如opt="<=", 则表示如果param1小于或等于param2，返回true，否则返回false
		 *
		 */
		_this.compare = function (pt1, pt2, opt) {
			opt = opt || "<=";
			if ("<" == opt) {
				return ( _this.playTime2ms(pt1) < _this.playTime2ms(pt2) );
			} else if ("<=" == opt) {
				return ( _this.playTime2ms(pt1) <= _this.playTime2ms(pt2) );
			} else if (">" == opt) {
				return ( _this.playTime2ms(pt1) > _this.playTime2ms(pt2) );
			} else if (">=" == opt) {
				return ( _this.playTime2ms(pt1) >= _this.playTime2ms(pt2) );
			}
		};
		
		/**
		 * 歌词行向上滚动动画研究
		 *
		 */
		_this.scrollLine = function(element) {
			var $elem = (typeof element == 'string')? $('.'+element) : $(element);
			$.each($elem, function(idx, item){
				elem = $(item)[0];
				var mod = parseInt($(item).data('mod'));
				var boxClassName = {1:'js_full_box', 2:'js_simp_box'}[mod];
				if ($('.'+boxClassName).css('display') != 'none'){
					var max = parseInt(elem.scrollHeight-(mod==1?72:0)),
						_top = $(elem).parent('.js_lyric_box').scrollTop(),
						_line_height = ($('p[data-id="line_'+g_lrcHandlerChn.lrcItemIndex+'"]', $(item)).length>0)?$('p[data-id="line_'+g_lrcHandlerChn.lrcItemIndex+'"]', $(item))[0].offsetHeight:24,
						stop = false,
						_idx = g_lrcHandlerChn.lrcItemIndex || 0,
						heights = 0,
						_times = parseInt(_line_height/6, 10),
						_off = _line_height%6;
					//console.log("_line_height = " + _idx);
					//经历过的歌词行总高度
					while (_idx-- > (mod==1?1:3)) {
						heights += ($('p[data-id="line_'+_idx+'"]', $(item)).length>0)?$('p[data-id="line_'+_idx+'"]', $(item))[0].offsetHeight:24;
					}
					stop = (_top==heights);
					if (!stop) {
						if ((heights-_top<=0&&!window.getlyricflag)||(heights-_top >= _line_height*(mod==1?2:4))){
							
							var height = (heights+((mod==1?(980-$(window).height())/5:(980-$(window).height())/4)));
							if (height<0)
							{
								height = 0;
							}
							if (MUSIC.util.supportCss3('-webkit-transition')&&MUSIC.util.supportCss3('-webkit-transform'))
							{
								elem.style.webkitTransition = "-webkit-transform 0.1s ease-out";
								elem.style.webkitTransform = "translateY("+(-1*height)+"px)";
							}else if (MUSIC.util.supportCss3('transition')&&MUSIC.util.supportCss3('transform'))
							{
								elem.style.transition = "transform 0.1s ease-out";
								elem.style.transform = "translateY("+(-1*height)+"px)";
							}else $(elem).parent('.js_lyric_box').scrollTop(height);
						}else {
							var _diff = heights-_top;
							if (_diff > _line_height){
								_diff -= _line_height;
							}
							var _t = (_diff>=_times)?_times:_off;
							
							var height = (_top + _t +((mod==1?(980-$(window).height())/5:(980-$(window).height())/4)));
							if (height<0)
							{
								height = 0;
							}
							
							if (MUSIC.util.supportCss3('-webkit-transition')&&MUSIC.util.supportCss3('-webkit-transform'))
							{
								elem.style.webkitTransition = "-webkit-transform 0.1s ease-out";
								elem.style.webkitTransform = "translateY("+(-1*height)+"px)";
							}else if (MUSIC.util.supportCss3('transition')&&MUSIC.util.supportCss3('transform'))
							{
								elem.style.transition = "transform 0.1s ease-out";
								elem.style.transform = "translateY("+(-1*height)+"px)";
							}else $(elem).parent('.js_lyric_box').scrollTop(height);
						}
					}
				}
			});
			//(!stop && elem.scrollTop < max) && (elem.scrollTop += 4);
			//if (g_lrcHandlerChn.aniFrame != null) {
			g_lrcHandlerChn.startAnimFrame(element);
			//}
		};
		/**
		 * 滚动动画相关变量及接口
		 *
		 */
		//动画帧句柄
		_this.aniFrame = null;
		//动画帧接口
		_this.lrcAnimFrame = function(cb, delay){
			return window.requestTimeout(cb, delay);
		};
		//动画帧启动函数
		_this.startAnimFrame = function(elem){
			g_lrcHandlerChn.aniFrame = g_lrcHandlerChn.lrcAnimFrame(function(){g_lrcHandlerChn.scrollLine(elem);}, delay);
		};
		//动画帧停止函数
		_this.stopAnimFrame = function(){
			if (g_lrcHandlerChn.aniFrame != null) {
				window.cancelRequestAnimFrame(g_lrcHandlerChn.aniFrame);
			}
			g_lrcHandlerChn.aniFrame = null;
		};
		//动画帧重新启动函数
		_this.restartAnimFrame = function(elem){
			g_lrcHandlerChn.stopAnimFrame();
			g_lrcHandlerChn.startAnimFrame(elem);
		};
	}
})();

var g_lrcHandlerChn = new MUSIC.module.lrcHandler();
return g_lrcHandlerChn;
//g_lrcHandlerChn.init('655808');

});