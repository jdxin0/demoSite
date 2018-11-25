define('js/common/smartbox.js', function(require, exports, module){

/**
 * MUSIC 搜索智能提示
 * 
 * @namespace MUSIC.search.smartbox
 * @author lunardai 2016/4/20
 * @description 顶框和搜索结果页的智能提示 
 */

var music = require('js/common/music.js'),
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
    , $ = music.$;
var MUSIC = music;
var g_storage = require('js/common/music/storage.js');
var Smartbox = BASE.extend({
	attrs : {
		$container : null,
		$smartbox : null,
		ns : null,
		num : 5,
		sbindex : -1,
		lrindex : 0,
		callback : function(){}
	},
	initialize : function(config){
		var _this = this
			, _conf = {}
			, $container = $(config.container)
			, $smartbox = $(config.page);
		if ($smartbox.length == 0) {
			$container.append('<div class="js_smartbox"></div>');
			$smartbox = $(".js_smartbox", $container);
		}

		$.extend(_conf, config, {
			$container : $container,
			$smartbox : $smartbox
		});

		//把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
		$container.data("smartbox", _this);

		Smartbox.superclass.initialize.call(_this, _conf);

		_this.bindPagerEvents();
		_this.showRecom(false);
	},
	showSmartBox : function(keyword){
		$('.search_result__item--current').removeClass('search_result__item--current');;
		var _this = this
			, $container = _this.get("$container");
		var $recom = $('.js_smartbox>.mod_search_other', $container);
		var $smart = $('.js_smartbox .mod_search_result', $container);
		if ($smart.length==0)
		{
			$('.js_smartbox', $container).append('<div class="mod_search_result" style=""></div>');
			$smart = $('.js_smartbox>.mod_search_result', $container);
		}
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&key='+keyword,
			charset : 'utf-8',
			jsonpCallback : 'SmartboxKeysCallback'+ _this.get("ns")+parseInt(10000*Math.random()),
			success : function (json) {
				if (json.code==0&&json.data&&(json.data.song&&json.data.song.count>0||json.data.album&&json.data.album.count>0||json.data.mv&&json.data.mv.count>0||json.data.singer&&json.data.singer.count>0))
				{
					$smart.html(Smartbox.smartbox_tpl({list:json.data, keyword:keyword, num:_this.get("num")}));
					$smart.addClass('drop');
				}else $smart.removeClass('drop');//$smart.hide();
			},
			error : function() {}
		});
		$recom.removeClass('drop');//$recom.hide();
	},
	hotkey : [],
	showRecom : function(show){
		$('.search_result__item--current').removeClass('search_result__item--current');;
		var _this = this
			, $container = _this.get("$container");
		var $recom = $('.js_smartbox>.mod_search_other', $container);
		var $smart = $('.js_smartbox .mod_search_result', $container);
		if ($recom.length == 0) {
			$('.js_smartbox', $container).append('<div class="mod_search_other" style=""></div>');
			$recom = $('.js_smartbox>.mod_search_other', $container);
			MUSIC.jQueryAjax.jsonp({
				url : '//c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
				charset : 'utf-8',
				jsonpCallback : 'hotSearchKeys'+ _this.get("ns"),
				success : function (json) {
					if (json.code==0)
					{
						$container.data("special_key", json.data.special_key);
						//MUSIC.cookie.set('hotsearch', json.data.special_key, 'y.qq.com', '/', 1);
						if (MUSIC.util.getUrlParams().w)
						{
							$('input', $container).val(decodeURIComponent(MUSIC.util.getUrlParams().w));
						}else if (!!json.data.special_key)
						{
							if (!document.addEventListener){
								$('input', $container).val(json.data.special_key);
							}else $('input', $container).attr('placeholder', '搜索音乐、MV、歌单、用户');//$('input', $container).attr('placeholder', json.data.special_key);
						}else $('input', $container).attr('placeholder', '搜索关键字');
						g_storage.get('portal_keyword', function(data){
							var historySearch = [];
							if (!!data)
							{
								historySearch = data.split('||').reverse();
							}
							_this.hotkey = json.data.hotkey;
							if ($container.hasClass('mod_search'))
							{
								if (json.data.hotkey.length>0)
								{
									var str = [];
									for (var i = 0, l = json.data.hotkey.length; i<l&&i<5; i++)
									{
										var item = json.data.hotkey[i];
										str.push('<a href="javascript:;" href="javascript:;" class="search_tips__item js_smartbox_search" data-name="'+$.trim(item.k)+'">'+$.trim(item.k).HtmlEncode()+'</a>');
									}
									$('.mod_search_input', $container).after('<div class="mod_search_tips">热门搜索：'+str.join('')+'</div>');
								}
								$recom.html(Smartbox.recom_tpl({historySearch:historySearch, hotkey:[], num:_this.get("num")}));
							}else $recom.html(Smartbox.recom_tpl({historySearch:historySearch, hotkey:json.data.hotkey, num:_this.get("num")}));
						});
					}else $('input', $container).attr('placeholder', '搜索关键字');
					if (show)
					{
						$smart.removeClass('drop');//$smart.hide();
						$recom.addClass('drop');
					}
				},
				error : function() {}
			});
		}else {
			if (show)
			{
				g_storage.get('portal_keyword', function(data){
					var historySearch = [];
					if (!!data)
					{
						historySearch = data.split('||').reverse();
					}
					if ($container.hasClass('mod_search'))
					{
					$recom.html(Smartbox.recom_tpl({historySearch:historySearch, hotkey:[], num:_this.get("num")}));
					}else 
					$recom.html(Smartbox.recom_tpl({historySearch:historySearch, hotkey:_this.hotkey, num:_this.get("num")}));
				});
				$smart.removeClass('drop');//$smart.hide();
				$recom.addClass('drop');
			}
		}
	},
	closeSmartbox : function(){
		var _this = this
			, $container = _this.get("$container");
		var $recom = $('.js_smartbox>.mod_search_other', $container);
		var $smart = $('.js_smartbox .mod_search_result', $container);
		$smart.removeClass('drop');//$smart.hide();
		$recom.removeClass('drop');//$recom.hide();
		_this.set('sbindex', -1);
		_this.set('lrindex', 0);
	},
	doCallback : function(v){
		var _this = this
			, $container = _this.get("$container");
		if ($.trim(v)=='')
		{
			v = $container.data("special_key");
		}
		if ($.trim(v)=='')
		{
			return;
		}
		var cbfn = _this.get("callback");
		cbfn && cbfn(v);
		$('input.search_input__input').val(v);
		$('input.search_input__input', $container).blur();
	},
	hotOrSmart : function(){//0:hot 1:smart
		var _this = this
			, $container = _this.get("$container");
		var $other = $('.mod_search_other', $container);
		if (!$other.hasClass('drop'))
		{
			return 1;
		}else return 0;
	},
	bindPagerEvents : function(){
		var _this = this
			, $container = _this.get("$container")
			, sbindex = _this.get("sbindex")
			, lrindex = _this.get("lrindex")
			, hot_map = ['js_left', 'js_right'];
		function showCurrentLine(v){
			var hot = _this.hotOrSmart()==0, len = 0, $box = null;
			if (lrindex<0)//左右做循环
			{
				lrindex = 1;
			}
			if (lrindex>1)
			{
				lrindex = 0
			}
			if (!hot)//普通smartbox
			{
				len = $('.mod_search_result a', $container).length;
				$box = $('.mod_search_result a', $container);
			}else {//热门推荐
				len = $('.mod_search_other .'+hot_map[lrindex], $container).length;
				$box = $('.mod_search_other .'+hot_map[lrindex], $container);
			}
			if (sbindex<-1)//-1是输入框，上下做循环，到了最下面再下就是输入框
			{
				sbindex = len-1;
			}
			if (sbindex>len)
			{
				sbindex = 0;
			}
			$('a', $container).removeClass('search_result__item--current');
			if (sbindex == -1)
			{
				$('input', $container).val(v);
			}else {
				$($box[sbindex]).addClass('search_result__item--current');
				$('input', $container).val($($box[sbindex]).attr('data-name'));
			}
			_this.set('lrindex', lrindex);
			_this.set('sbindex', sbindex);
		}
		$container.off('focus keyup propertychange', 'input.search_input__input').on('focus keyup propertychange', 'input.search_input__input', function(e){
			
			var v = $(this).val(), $box = null;
			if (_this.hotOrSmart()!=0)//普通smartbox
			{
				$box = $('.mod_search_result a', $container);
			}else {//热门推荐
				$box = $('.mod_search_other .'+hot_map[lrindex], $container);
			}
			sbindex = _this.get("sbindex");lrindex = _this.get("lrindex");
			//if ($container.data("special_key")==v)
			//{
			//	$(this).val('');
			//}
			v = $(this).val();
			switch (e.keyCode)
			{
			case 13:
				if (sbindex>-1)
				{
					$($box[sbindex]).click();
				}else 
				_this.doCallback(v);
				break;
			case 38://up
				_this.set('sbindex', sbindex--);
				showCurrentLine(v);
				break;
			case 40://down
				_this.set('sbindex', sbindex++);
				showCurrentLine(v);
				break;
		/*	case 37://left
				if (_this.hotOrSmart()==1)
				{
					return false;
				}
				_this.set('lrindex', lrindex--);
				showCurrentLine(v);
				break;
			case 39://right
				if (_this.hotOrSmart()==1)
				{
					return false;
				}
				_this.set('lrindex', lrindex++);
				showCurrentLine(v);
				break;*/
			default:
				if ($(this).parents('.mod_search--top').length==0)
				{
					if ($.trim(v)!=''){
						_this.showSmartBox(v);
					}else 
						_this.showRecom(true);
					break;
				}
			}
			
		}).off('click', 'a.js_smartbox_song').on('click', 'a.js_smartbox_song', function(e){
			var mid = $(this).attr('data-mid');
			var song = {mid:mid};
			MUSIC.util.gotoSongdetail(song);
		}).off('click', 'a.js_smartbox_singer').on('click', 'a.js_smartbox_singer', function(e){
			var mid = $(this).attr('data-mid');
			MUSIC.util.gotoSinger({singermid:mid});
		}).off('click', 'a.js_smartbox_album').on('click', 'a.js_smartbox_album', function(e){
			var mid = $(this).attr('data-mid');
			MUSIC.util.gotoAlbum({albummid:mid});
		}).off('click', 'a.js_smartbox_mv').on('click', 'a.js_smartbox_mv', function(e){
			var vid = $(this).attr('data-vid');
			MUSIC.util.gotoMvdetail({vid:vid});
		}).off('click', 'a.js_smartbox_search').on('click', 'a.js_smartbox_search', function(e){
			var name = $(this).attr('data-name');
			_this.doCallback(name);
		}).off('click', 'button.search_input__btn').on('click', 'button.search_input__btn', function(e){
			var v = $('input', $container).val();
			_this.doCallback(v);
		}).off('click', '.js_smartbox_delete').on('click', '.js_smartbox_delete', function(e){
			var key = $(this).data('name');
			g_storage.get('portal_keyword', function(data){
				var historySearch = [], arr = [];
				if (!!data)
				{
					historySearch = data.split('||');
				}
				$.each(historySearch, function(idx, item){
					if (item!=''&&item!=key)
					{
						arr.push(item);
					}
				});
				g_storage.set('portal_keyword',arr.join('||'));
			});
			_this.showRecom(true);
			setTimeout(function(){
				$('input.search_input__input', $container).focus();
			}, 300);
		}).off('click', '.js_smartbox_delete_all').on('click', '.js_smartbox_delete_all', function(e){
			g_storage.set('portal_keyword','');
			_this.showRecom(true);
			setTimeout(function(){
				$('input.search_input__input', $container).focus();
			}, 300);
		}).off('blur', 'input.search_input__input').on('blur', 'input.search_input__input', function(e){
			var v = $(this).val();
			if ($.trim(v)==''&&$container.data("special_key")!=''){
				if (!document.addEventListener){
					$(this).val($container.data("special_key"));
				}else $('input', $container).attr('placeholder', '搜索音乐、MV、歌单、用户');//$(this).attr('placeholder', $container.data("special_key"));
			}else $('input', $container).attr('placeholder', '搜索关键字');
			setTimeout(function(){
				_this.closeSmartbox();
			}, 200);
		});
	},
	remove : function(){
		var _this = this
			, $container = _this.get("$container")
			, $smartbox = _this.get("$smartbox");
		//
		try {
			$container.data("smartbox", null);
			$container.off("click", ".js_pageindex");
			$smartbox.remove();
			_this.destroy();
			//CollectGarbage();
		} catch (exp) {}
	},
	Statics : {
		init : function(config){
			try {
				$(window).trigger("removeSmartbox");
				//new一个新的实例之前，先把之前的实例给destroy掉，防止内存泄漏
				var p = $(config.container).data("smartbox");
				p && p.remove && p.remove();
				p = null;
			} catch (exp) {};

			return new Smartbox(config);
		},
		sessionIdGenerator : {
			bigMul: function(num1, num2) {	//大整数相乘
				var numArr1 = ('' + num1).split('').reverse(),
					numArr2 = ('' + num2).split('').reverse(),
					retArr = [],
					len1 = numArr1.length,
					len2 = numArr2.length;

				for (var i = 0, len = len1 + len2 - 1; i <= len; i++) {
					retArr[i] = 0;	
				} 
				for (i = 0; i< len2; i++) {
					for(var d = 0; d < len1; d++) {
						retArr[d + i] += numArr1[d] * numArr2[i];
						retArr[d + 1 + i] += Math.floor(retArr[d + i] / 10);
						retArr[d + i] = retArr[d + i] % 10;
					}            
				}
				retArr.reverse();
				if (retArr[0] == 0) {
					retArr.shift();
				} 
				return retArr.join('');
			},
			bigAdd: function(num1, num2) {	//大整数相加
				var numArr1 = ('' + num1).split('').reverse(),
					numArr2 = ('' + num2).split('').reverse(),
					len1 = numArr1.length,
					len2 = numArr2.length,
					carry = 0,
					bit1 = 0, 
					bit2 = 0,
					bitSum = 0;

				for (var i = 0, len = Math.max(len1, len2); i < len; i++) {
					bit1 = i < len1 ? numArr1[i] : 0;
					bit2 = i < len2 ? numArr2[i] : 0;
					bitSum = Math.round(bit1) + Math.round(bit2) + carry
					numArr1[i] = '' + bitSum % 10;
					carry = bitSum >= 10 ? 1 : 0;
				}
				if ( 1 == carry ) {
					numArr1.push(1);
				}
				return numArr1.reverse().join('');
			},
			get: function(entryId) {	//session id生成方法
				var bin_22 = '4194304',           //2^22
					bin_32 = '4294967296',       //2^32
					bin_54 = '18014398509481984', //2^54
					sid = '',
					dateObj;
			
				entryId = this.bigMul(entryId, bin_54);//入口id
				randNum = this.bigMul(Math.round(Math.random() * bin_22), bin_32); //22位随机数
				//计算距离当天00:00:00毫秒数    
				dateObj = new Date();
				timeStamp = (dateObj.getHours() * 3600 + dateObj.getMinutes() * 60 + dateObj.getSeconds()) * 1000 + dateObj.getMilliseconds();
			
				sid = this.bigAdd( this.bigAdd(entryId, randNum), timeStamp);
				return sid;
			}
		},
		recom_tpl : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n            <div class="search_hot">\r\n                <dl class="search_hot__list" aria-labelledy="search_hot__tit">\r\n                    <dt class="search_hot__tit">热门搜索</dt>\r\n                    <dd>\r\n\t\t\t\t\t\t';
 var hotkey = data.hotkey; for(var i = 0, l = hotkey.length;i<5&&i<l;i++){ var item = hotkey[i]; 
__p+='\r\n                        <a href="javascript:;" class="search_hot__link js_smartbox_search js_left" data-name="'+
((__t=( $.trim(item.k) ))==null?'':__t)+
'">\r\n                            <span class="search_hot__number">'+
((__t=( (i+1)))==null?'':__t)+
'</span>\r\n                            <span class="search_hot__name">'+
((__t=( $.trim(item.k) ))==null?'':__t)+
'</span>\r\n                            <span class="search_hot__listen">'+
((__t=( parseInt(item.n, 10) >= 10000 ? ((item.n/10000).toFixed(1) + "万").replace(".0万", "万") : item.n ))==null?'':__t)+
'</span>\r\n                        </a>\r\n\t\t\t\t\t\t';
}
__p+='\r\n                    </dd>\r\n                </ul>\r\n            </div>\r\n\r\n            <div class="search_history">\r\n                <dl class="search_history__list">\r\n                    <dt class="search_history__tit">搜索历史<a href="javascript:;" class="search_history__clear js_smartbox_delete_all"><i class="icon_history_clear"></i><span class="icon_txt">清空</span></a></dt>\r\n\t\t';
 var historySearch = data.historySearch; for(var i = 0, l = historySearch.length;i<5&&i<l;i++){ var item = historySearch[i]; 
__p+='\r\n                    <dd class="search_history__item">\r\n                        <a href="javascript:;" class="search_history__link js_smartbox_search js_left" data-name="'+
((__t=( item ))==null?'':_.escape(__t))+
'">'+
((__t=( item ))==null?'':_.escape(__t))+
'</a>\r\n                        <a href="javascript:;" class="search_history__delete js_smartbox_delete" data-name="'+
((__t=( item ))==null?'':_.escape(__t))+
'" title="删除"><i class="search_history__icon_delete"></i><span class="icon_txt">删除</span></a>\r\n                    </dd>\r\n\t        ';
}
__p+='\r\n                </dl>\r\n            </div>';
return __p;
},
		smartbox_tpl : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 var keyword = data.keyword, data = data.list;
	function setKeywordHeigth(input){
		input = (input).unescapeHTML();
		var thisKeyword = keyword;
		var formKeyword = input.toLowerCase();
		var formThisKeyword = thisKeyword.toLowerCase();
		var index = formKeyword.indexOf(formThisKeyword);
		if (index!=-1)
		{
		var arr = [];
		arr.push(input.substring(0, index));
		arr.push('<span class="search_result__keyword">');
		arr.push(input.substring(index, index+thisKeyword.length));
		arr.push('</span>');
		arr.push(input.substring(index+thisKeyword.length, input.length));
		return arr.join('');
		}else return input;
	}

__p+='\r\n\t';
if(data.song&&data.song.count>0){
__p+='\r\n            <!--单曲区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_song"></i>单曲</h4>\r\n                <ul class="search_result__list">\r\n\t\t';
for(var songindex = 0; songindex<data.song.count; songindex++){ var song = data.song.itemlist[songindex];
__p+='\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_song" data-docid="'+
((__t=( song.docid ))==null?'':__t)+
'" data-id="'+
((__t=( song.id ))==null?'':__t)+
'" data-mid="'+
((__t=( song.mid ))==null?'':__t)+
'" data-name="'+
((__t=( song.name ))==null?'':_.escape(__t))+
'">\r\n                            <span class="search_result__name">'+
((__t=( setKeywordHeigth(song.name) ))==null?'':__t)+
'</span>-\r\n                            <span class="search_result__singer">'+
((__t=( setKeywordHeigth(song.singer) ))==null?'':__t)+
'</span>\r\n                        </a>\r\n                    </li>\r\n\t\t';
}
__p+='\r\n                </ul>\r\n            </div>\r\n            <!--单曲区域_E-->\r\n\t ';
}
__p+='\r\n\t';
if(data.singer&&data.singer.count>0){
__p+='\r\n            <!--歌手区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_singer"></i>歌手</h4>\r\n                <ul class="search_result__list">\r\n\t\t';
for(var singerindex = 0; singerindex<data.singer.count; singerindex++){ var singer = data.singer.itemlist[singerindex];
__p+='\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_singer" data-docid="'+
((__t=( singer.docid ))==null?'':__t)+
'" data-id="'+
((__t=( singer.id ))==null?'':__t)+
'" data-mid="'+
((__t=( singer.mid ))==null?'':__t)+
'" data-name="'+
((__t=( singer.name ))==null?'':_.escape(__t))+
'">\r\n                            <span class="search_result__name">'+
((__t=( setKeywordHeigth(singer.name)))==null?'':__t)+
'</span>\r\n                        </a>\r\n                    </li>\r\n\t\t';
}
__p+='\r\n                </ul>\r\n            </div>\r\n            <!--歌手区域_E-->\r\n\t ';
}
__p+='\r\n\t';
if(data.album&&data.album.count>0){
__p+='\r\n            <!--专辑区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_album"></i>专辑</h4>\r\n                <ul class="search_result__list">\r\n\t\t';
for(var albumindex = 0; albumindex<data.album.count; albumindex++){ var album = data.album.itemlist[albumindex];
__p+='\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_album" data-docid="'+
((__t=( album.docid ))==null?'':__t)+
'" data-id="'+
((__t=( album.id ))==null?'':__t)+
'" data-mid="'+
((__t=( album.mid ))==null?'':__t)+
'" data-name="'+
((__t=( album.name ))==null?'':_.escape(__t))+
'">\r\n                            <span class="search_result__name">'+
((__t=( setKeywordHeigth(album.name)))==null?'':__t)+
'</span>\r\n                            <span class="search_result__singer">'+
((__t=( setKeywordHeigth(album.singer)))==null?'':__t)+
'</span>\r\n                        </a>\r\n                    </li>\r\n\t\t';
}
__p+='\r\n                </ul>\r\n            </div>\r\n            <!--专辑区域_E-->\r\n\t ';
}
__p+='\r\n\t';
if(data.mv&&data.mv.count>0){
__p+='\r\n            <!--MV区域_S-->\r\n            <div class="search_result__sort">\r\n                <h4 class="search_result__tit"><i class="search_result__icon_mv"></i>MV</h4>\r\n                <ul class="search_result__list">\r\n\t\t';
for(var mvindex = 0; mvindex<data.mv.count; mvindex++){ var mv = data.mv.itemlist[mvindex];
__p+='\r\n                    <li>\r\n                        <a href="javascript:;" class="search_result__link js_smartbox_mv" data-docid="'+
((__t=( mv.docid ))==null?'':__t)+
'" data-id="'+
((__t=( mv.id ))==null?'':__t)+
'" data-mid="'+
((__t=( mv.mid ))==null?'':__t)+
'" data-name="'+
((__t=( mv.name ))==null?'':_.escape(__t))+
'" data-vid="'+
((__t=( mv.vid ))==null?'':__t)+
'">\r\n                            <span class="search_result__name">'+
((__t=( setKeywordHeigth(mv.name)))==null?'':__t)+
'</span>-\r\n                            <span class="search_result__singer">'+
((__t=( setKeywordHeigth(mv.singer)))==null?'':__t)+
'</span>\r\n                        </a>\r\n                    </li>\r\n\t\t';
}
__p+='\r\n                </ul>\r\n            </div>\r\n            <!--MV区域_E-->\r\n\t ';
}
__p+='';
return __p;
}
	}
});
if (!$)
{
	$ = require("js/common/music/jquery.js");
}
$.fn.smartbox = function(args){
	if ($.type(args) === "string") {
	} else if ($.type(args) === "object") {
		Smartbox.init(args);
	} else {
		throw "Initialize smartbox Failed!";
	}
};

return Smartbox;

});