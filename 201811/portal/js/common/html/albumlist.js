define('js/common/html/albumlist.js', function(require, exports, module){

/**
 * 专辑列表JS
 * @author lunardai 2016/4/25
 * @description 生成专辑列表 并进行事件绑定
 *
 */
var MUSIC = require("js/common/music.js");
var statistics = MUSIC.statistics;
var $ = MUSIC.$;

//用于辅助的全局变量
var g_user = MUSIC.user,
	config = {
		specilData : null, 		 //用私有数据，而不是用cgi请求的情况
		specialTpl : null			 //用私有模板，即重载模板
	},
	reportType,//那个页面传过来的数据,用于上报用


	/**
	 * @ namespace mac  
	 */
	mac = {
		
		/*
		*	@ method init
		*	@ params {object} args
		*		param详见上面的config
		*/
		init : function (args, callback) {
			
			//将参数跟config合并
			$.extend(config,args);

			//上报的参数配置 
			reportType = args.reportType;
				
			//生成列表
			albumList.show();	
			config.callback&&config.callback();
		}
	};

function setCurrentSongs($obj){
	$('.playlist__item').removeClass('playlist__item--current');
	$obj.addClass('playlist__item--current');
	$('.mod_operate_menu').hide();
}
var albumList = {
	getMid : function(event){
		var targ = MUSIC.util.getTarget(event);
		var $dom = $(targ).parents('li');
		return $dom.data("albummid");
	},
	play : function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		var mid = albumList.getMid(event);
		MUSIC.player.checkPlayerWindow();	
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+mid,
			charset : 'utf-8',
			jsonpCallback : 'albuminfoCallback',
			success : function(data) {
				if(data.code == 0){
						var _data = MUSIC.player.formatMusics(data.data.list);
						require.async("js/common/fav.js", function(fav){
							fav.combineData(_data, function(list){
								if(MUSIC.player.checkSonglistRight(list)){
										
									var playdata = 'a_'+mid+'_1'+('_'+reportType);
									MUSIC.cookie.set('yq_playdata', playdata);
									MUSIC.cookie.set('yq_playschange', 1);
									
									if (MUSIC.player.isExists()) {
										MUSIC.cookie.set('player_exist', 0);MUSIC.popup.show('已添加至播放器，已过滤付费歌曲。');
										setTimeout(function(){
											var existFlag = parseInt(MUSIC.cookie.get('player_exist'));
											if (!existFlag)
											{
												var w = window.open('//y.qq.com/portal/player.html', '_blank');
												if(w)w.opener = null;
											}
										}, 2000);
									} else {
										MUSIC.popup.show('已添加至播放器，已过滤付费歌曲。');
										var w = window.open('//y.qq.com/portal/player.html', '_blank');
										if(w)w.opener = null;
									}
								}
							});
						});
				}
			},
			error : function(e){
			}
		});
		return false;
	},
	jump : function(event){
		event.preventDefault();
		event.stopPropagation();
		var targ = MUSIC.util.getTarget(event);
		var $a = $(targ);
		if (targ.tagName!='A')
		{
			$a = $(targ).parents('a');
		}
		var albummid = $a.data("albummid"),
			singermid = $a.data("singermid");
		var stat = $a.data('stat')||'', p = {};
		var _linkTar = '';
		if (!!stat)
		{
			p.stat = stat;
		}
		if (!!albummid)
		{
			p.albummid = albummid;
			MUSIC.util.gotoAlbum(p);
		}else if (!!singermid)
		{
			p.singermid = singermid;
			MUSIC.util.gotoSinger(p);
		}
	},
	share : function(event, id){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var mid = albumList.getMid(event);
		require.async("js/common/share.js", function(share){
			share.show({
				sharetype : 1,
				albummid : mid
			}, event);
		});
	},
	fav : function(event, id){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var mid = albumList.getMid(event);
		
		require.async('js/common/html/albumdata.js', function(albumdata){
			albumdata.init({mid:mid, reportID:MUSIC.reportMap.album, play:0},function (data) {
				if (data.length>0)
				{
					require.async("js/common/fav.js", function(fav){
						fav.show({
							play_type : 'a_'+mid+'_0',
							songs : data
						}, event);
					});
				}else {
					MUSIC.popup.show('无可收藏单曲！');
				}
			});
		});
	},
	down : function(event, id){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var mid = albumList.getMid(event);
		
		require.async('js/common/html/albumdata.js', function(albumdata){
			albumdata.init({mid:mid, reportID:MUSIC.reportMap.album, play:0},function (data) {
				if (data.length>0)
				{
					require.async("js/common/download.js", function(download){
						download.show(data);
					});
				}else {
					MUSIC.popup.show('无可下载单曲！');
				}
			});
		});
	},
	/*showMenu : function(event, deleteFlag){
		var _e = event;
		$('.mod_operate_menu').hide();
		event.preventDefault();
		event.stopPropagation();
		if($("#playlist_menu").length<=0){
			$('body').append(__inline("/js_tpl/playlist_menu.tpl")({deleteFlag:deleteFlag}));
		}				
		$("#playlist_menu").css({
			left : (event.pageX+10)+'px',
			top : event.pageY+'px'
		}).show();
		
		$("#playlist_menu").off('mouseover', '.js_menu_share').on('mouseover', '.js_menu_share', function(e, a){
			e.preventDefault();
			e.stopPropagation();
			albumList.share(e);
		}).off('mouseout', '.js_menu_share').on('mouseout', '.js_menu_share', function(e, a){
			e.preventDefault();
			e.stopPropagation();
			require.async("js/common/share.js", function(share){
				share.hide();
			});
		}).off('mouseover', '.js_menu_fav').on('mouseover', '.js_menu_fav', function(e, a){
			e.preventDefault();
			e.stopPropagation();
			albumList.fav(_e);
		}).off('click', '.js_menu_down').on('click', '.js_menu_down', function(e, a){
			albumList.down(_e);
		}).off('click', 'a.js_menu_delete').on('click', 'a.js_menu_delete', function(e, a){
			//taogelist.jumpUser(e);
		})
		;
	},*/
	bindEvents : function(){
		
		config.container.off('click', '.js_play').on('click', '.js_play', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.play(e);
			var stat = $(this).data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
		}).off('click', 'a.js_album').on('click', 'a.js_album', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.jump(e);
		}).off('click', 'a.js_singer').on('click', 'a.js_singer', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.jump(e);
		}).off('click', '.playlist__item').on('click', '.playlist__item', function(e, a){
			setCurrentSongs($(this));
		}).off('click', '.js_albumlist_more').on('click', '.js_albumlist_more', function(e, a){
			setCurrentSongs($(this));
		})/*.off('click', '.js_more').on('click', '.js_more', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.showMenu(e, parseInt($(this).data('delete')));
		})*/.off('click', '.js_share').on('click', '.js_share', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.share(e);
		}).off('click', '.js_fav').on('click', '.js_fav', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.fav(e);
		}).off('click', '.js_down').on('click', '.js_down', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			albumList.down(e);
		})
		;
		
		require.async("js/common/menu.js", function(fav){
			$('.js_albumlist_more').menu({content:['fav', 'share', 'down'] ,type:2});
		});
	},
	show : function(){
		var template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n                    <div class="mod_playlist_text">\r\n                        <ul class="playlist__header">\r\n                            <li class="playlist__header_name">专辑</li>\r\n                            <li class="playlist__header_author">歌手</li>\r\n                            <li class="playlist__header_count">发行时间</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
 var list = data.list;for (i = 0; i < list.length; i ++){var album = list[i]; 
__p+='\r\n                            <li class="playlist__item" data-albummid="'+
((__t=( album.albumMID ))==null?'':__t)+
'" onmouseover="this.className=\'playlist__item playlist__item--hover\'" onmouseout="this.className=\'playlist__item\'">\r\n                                <div class="playlist__cover"><a href="javascript:;" class="js_album" data-albummid="'+
((__t=( album.albumMID ))==null?'':__t)+
'"><img src="//y.gtimg.cn/mediastyle/global/img/album_300.png" alt="'+
((__t=( album.albumName ))==null?'':_.escape(__t))+
'" class="playlist__pic"/></a></div>\r\n                                <h4 class="playlist__title"><span class="playlist__title_txt"><a href="javascript:;" class="js_album" data-albummid="'+
((__t=( album.albumMID ))==null?'':__t)+
'" title="'+
((__t=( album.albumName ))==null?'':_.escape(__t))+
'">'+
((__t=( album.albumName ))==null?'':_.escape(__t))+
'</a></span></h4>\r\n                                <div class="mod_list_menu">\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n                                        <i class="list_menu__icon_play"></i>\r\n                                        <span class="icon_txt">播放</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单">\r\n                                        <i class="list_menu__icon_add"></i>\r\n                                        <span class="icon_txt">添加到歌单</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载">\r\n                                        <i class="list_menu__icon_down"></i>\r\n                                        <span class="icon_txt">下载</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享">\r\n                                        <i class="list_menu__icon_share"></i>\r\n                                        <span class="icon_txt">分享</span>\r\n                                    </a>\r\n                                </div>\r\n                                <div class="playlist__author">\r\n                                    <a href="javascript:;" class="js_singer" data-singermid="'+
((__t=( album.singerMID ))==null?'':__t)+
'" title="'+
((__t=( album.singerName ))==null?'':_.escape(__t))+
'">'+
((__t=( album.singerName ))==null?'':_.escape(__t))+
'</a>\r\n                                </div>\r\n                                <div class="playlist__other">\r\n                                    '+
((__t=( album.publicTime ))==null?'':__t)+
'\r\n                                </div>\r\n                            </li>\r\n\t\t\t';
 } 
__p+='\r\n                        </ul>\r\n                    </div>';
return __p;
},
			_html = (config.specialTpl || template)({
				list : config.specilData
			});
		config.container
			.html(_html).find('img').lazyload();	
		albumList.bindEvents();
	}
};


return mac;

});