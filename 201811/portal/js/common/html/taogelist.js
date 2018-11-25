define('js/common/html/taogelist.js', function(require, exports, module){

/**
 * 歌单列表JS
 * @author lunardai 2016/4/27
 * @description 生成歌单列表 并进行事件绑定
 *
 */
var MUSIC = require("js/common/music.js");
var $ = MUSIC.$,
	statistics = MUSIC.statistics;

//用于辅助的全局变量
var g_user = MUSIC.user,
	config = {
		lazyload : true,
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
			taogelist.show();	
			config.callback&&config.callback();
		}
	};
	
function setCurrentSongs($obj){
	$('.playlist__item').removeClass('playlist__item--current');
	$obj.addClass('playlist__item--current');
	$('.mod_operate_menu').hide();
}
var taogelist = {
	getMid : function(event){
		var targ = MUSIC.util.getTarget(event);
		var $dom = $(targ).parents('li');
		return $dom.data("disstid");
	},
	getDirid : function(event){
		var targ = MUSIC.util.getTarget(event);
		var $dom = $(targ).parents('li');
		return parseInt($dom.data("dirid"));
	},
	getUin : function(event){
		var targ = MUSIC.util.getTarget(event);
		var $dom = $(targ).parents('li');
		return $dom.data("uin");
	},
	play : function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		var mid = taogelist.getMid(event);
		var dirid = taogelist.getDirid(event);
		MUSIC.player.checkPlayerWindow();
		//如果是专辑，调用getSonglist接口,
		if (!(dirid==205||dirid==206||dirid==201)){
			require.async('js/common/html/playlistdata.js', function(playlistdata){
				playlistdata.init(mid,function (data) {
					if (data.length != 0) {
						if (MUSIC.player.checkSonglistRight(data)){
							
							var playdata = 'p_'+mid+'_1'+('_'+reportType);
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
					}else {
						MUSIC.popup.show('无可播放单曲！', 3000, 1);
					}
				});
			});
			
		}else{
			if (dirid==205||dirid==206)
			{
				var _uin = taogelist.getUin(event);
				require.async('js/common/fav.js', function(fav){
					fav.getDetail(_uin, dirid, function(info){
						if (info.list.length != 0) {
							MUSIC.player.play(info.list,1, null, null, reportType);
						}else {
							MUSIC.popup.show('无可播放单曲！', 3000, 1);
						}
					});
				});
			}else 
			require.async('js/common/html/playlistdata.js', function(playlistdata){
				playlistdata.init(mid,function (data) {
					if (data.length != 0) {
						MUSIC.player.play(data,1, null, dirid==201&&data.length>=100?'已为你添加了前100首至播放器':'', mac.reportType, reportType);
					}else {
						MUSIC.popup.show('无可播放单曲！', 3000, 1);
					}
				}, null, dirid == 201?{
						song_begin : 0,
						song_num : 1000
					}:{});
			});
		}
		return false;
	},
	jump : function(event, stat){
		event.preventDefault();
		event.stopPropagation();
		var targ = MUSIC.util.getTarget(event);
		var $a = $(targ);
		if (targ.tagName!='A')
		{
			$a = $a.parents('a');
		}
		var albummid = $a.data("albummid"),
			singermid = $a.data("singermid"),
			p = null;
		var _linkTar = '';
		if (!!albummid)
		{
			p = {albummid:albummid};
			if (stat)
			{
				p.stat = stat;
			}
			MUSIC.util.gotoAlbum(p);
		}else if (!!singermid)
		{
			p = {singermid:singermid};
			if (stat)
			{
				p.stat=stat;
			}
			MUSIC.util.gotoSinger(p);
		}
	},
	jumpUser : function(event, stat){
		event.preventDefault();
		event.stopPropagation();
		
		var targ = MUSIC.util.getTarget(event);
		var $a = $(targ);
		if (targ.tagName!='A')
		{
			$a = $a.parents('a');
		}
		var uin = $a.data("uin");
		var p = {uin:uin, target:'_blank'};
		if (stat)
		{
			p.stat = stat;
		}
		MUSIC.util.gotoUser(p);
	},
	share : function(e){
		e.preventDefault();
		e.stopPropagation();
		var that = this;
		
		var mid = taogelist.getMid(e);
		require.async("js/common/share.js", function(share){
			share.show({
				sharetype : 2,
				dirid : mid
			}, e);
		});
	},
	fav : function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var mid = taogelist.getMid(event);
		var dirid = taogelist.getDirid(event);
		require.async('js/common/html/playlistdata.js', function(playlistdata){
			playlistdata.init(mid,function (data) {
				require.async("js/common/fav.js", function(fav){
					fav.show({
						play_type : 'p_'+mid+'_0',
						songs : data,
						fromDir : dirid
					}, event);
				});
			}, null, dirid == 201?{
					song_begin : 0,
					song_num : 1000
				}:{});
		});
	},
	down : function(event, id){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var mid = taogelist.getMid(event);
		var dirid = taogelist.getDirid(event);
		require.async('js/common/html/playlistdata.js', function(playlistdata){
			playlistdata.init(mid,function (data) {
				if (data.length>0)
				{
					require.async("js/common/download.js", function(download){
						download.show(data, dirid);
					});
				}else {
					MUSIC.popup.show('无可下载单曲！');
				}
			}, null, dirid == 201?{
					song_begin : 0,
					song_num : 1000
				}:{});
		});
	},
	/*showMenu : function(event,deleteFlag){
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
		
		$("#playlist_menu").off('click', '.js_menu_share').on('click', '.js_menu_share', function(e, a){
			e.preventDefault();
			e.stopPropagation();
			taogelist.share(_e);
		}).off('click', '.js_menu_fav').on('click', '.js_menu_fav', function(e, a){
			e.preventDefault();
			e.stopPropagation();
			taogelist.fav(_e);
		}).off('click', '.js_menu_down').on('click', '.js_menu_down', function(e, a){
			taogelist.down(_e);
		}).off('click', 'a.js_menu_delete').on('click', 'a.js_menu_delete', function(e, a){
			//taogelist.jumpUser(e);
		})
		;
	},*/
	bindEvents : function(){
		config.container.off('click', '.js_play').on('click', '.js_play', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			taogelist.play(e);
			var stat = $(this).data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
		}).off('click', 'a.js_user').on('click', 'a.js_user', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			var stat = $(this).data('stat')||'';
			taogelist.jumpUser(e, stat);
		}).off('click', 'a.js_singer').on('click', 'a.js_singer', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			var stat = $(this).data('stat')||'';
			taogelist.jump(e, stat);
		}).off('click', 'a.js_playlist').on('click', 'a.js_playlist', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			var stat = $(this).data('stat')||'', p = {disstid:$(this).data('disstid'),dirid:$(this).data('dirid')};
			if (!!stat)
			{
				p.stat = stat;
			}
			MUSIC.util.gotoTaogedetail(p);
		}).off('click', '.playlist__item').on('click', '.playlist__item', function(e, a){
			setCurrentSongs($(this));
		}).off('click', '.js_share').on('click', '.js_share', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			taogelist.share(e);
		}).off('click', '.js_fav').on('click', '.js_fav', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			taogelist.fav(e);
		}).off('click', '.js_down').on('click', '.js_down', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			taogelist.down(e);
		})/*.off('click', '.js_more').on('click', '.js_more', function(e, a){
			setCurrentSongs($(this).parents('.playlist__item'));
			taogelist.showMenu(e, parseInt($(this).data('delete')));
		})*/
		;
		if ($('.js_playlist_more_dirid').length>0)
		{
			var type = $('.js_playlist_more_dirid').data('type');
			if (parseInt(type, 10) == 4)
			{
				require.async("js/common/menu.js", function(fav){
					$('.js_playlist_more_dirid').menu({content:['fav', 'down'] ,type:4});
				});
			}
		}
		if ($('.js_playlist_more').length>0)
		{
			require.async("js/common/menu.js", function(fav){
				$('.js_playlist_more').menu({content:['fav', 'share', 'down', 'edit'] ,type:3});
			});
		}
	},
	show : function(){
		var template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n                    <div class="mod_playlist_text">\r\n                        <ul class="playlist__header">\r\n                            <li class="playlist__header_name">歌单</li>\r\n                            <li class="playlist__header_author">编辑</li>\r\n                            <li class="playlist__header_count">收听</li>\r\n                        </ul>\r\n                        <ul class="playlist__list">\r\n\t\t\t';
 var list = data.list;for (i = 0; i < list.length; i ++){var album = list[i]; 
__p+='\r\n                            <li class="playlist__item" data-disstid="'+
((__t=( album.dissid ))==null?'':__t)+
'" onmouseover="this.className=\'playlist__item playlist__item--hover\'" onmouseout="this.className=\'playlist__item\'">\r\n                                <div class="playlist__cover"><a href="javascript:;" class="js_playlist" data-disstid="'+
((__t=( album.dissid ))==null?'':__t)+
'"><img src="'+
((__t=( album.imgurl ))==null?'':__t)+
'" alt="'+
((__t=( album.dissname ))==null?'':_.escape(__t))+
'" class="playlist__pic"/></a></div>\r\n                                <h4 class="playlist__title"><span class="playlist__title_txt"><a href="javascript:;" class="js_playlist" data-disstid="'+
((__t=( album.dissid ))==null?'':__t)+
'" title="'+
((__t=( album.dissname ))==null?'':_.escape(__t))+
'">'+
((__t=( album.dissname ))==null?'':_.escape(__t))+
'</a></span></h4>\r\n                                <div class="mod_list_menu">\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__play js_play" title="播放">\r\n                                        <i class="list_menu__icon_play"></i>\r\n                                        <span class="icon_txt">播放</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__add js_fav" title="添加到歌单">\r\n                                        <i class="list_menu__icon_add"></i>\r\n                                        <span class="icon_txt">添加到歌单</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__down js_down" title="下载">\r\n                                        <i class="list_menu__icon_down"></i>\r\n                                        <span class="icon_txt">下载</span>\r\n                                    </a>\r\n                                    <a href="javascript:;" class="list_menu__item list_menu__share js_share" title="分享">\r\n                                        <i class="list_menu__icon_share"></i>\r\n                                        <span class="icon_txt">分享</span>\r\n                                    </a>\r\n                                </div>\r\n                                <div class="playlist__author">\r\n\t\t\t\t';
if(album.creator.singermid!=''){
__p+='\r\n                                    <a href="javascript:;" class="js_singer" data-singermid="'+
((__t=( album.creator.singermid ))==null?'':__t)+
'" title="'+
((__t=( album.creator.name ))==null?'':_.escape(__t))+
'">'+
((__t=( album.creator.name ))==null?'':_.escape(__t))+
'</a>\r\n\t\t\t\t';
}else{
__p+='\r\n                                    <a href="javascript:;" class="js_user" data-uin="'+
((__t=( album.creator.qq ))==null?'':__t)+
'" title="'+
((__t=( album.creator.name ))==null?'':_.escape(__t))+
'">'+
((__t=( album.creator.name ))==null?'':_.escape(__t))+
'</a>\r\n\t\t\t\t';
}
__p+='\r\n                                </div>\r\n                                <div class="playlist__other">\r\n                                    '+
((__t=( album.listennum ))==null?'':__t)+
'\r\n                                </div>\r\n                            </li>\r\n\t\t\t';
 } 
__p+='\r\n                        </ul>\r\n                    </div>';
return __p;
},
			_html = (config.specialTpl || template)({
				list : config.specilData
			});
		if (config.lazyload)
		{
			config.container
				.html(_html).find('img').lazyload();	
		}else {
			config.container
				.html(_html);
		}
		taogelist.bindEvents();
	}
};


return mac;

});