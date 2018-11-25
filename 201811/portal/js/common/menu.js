define('js/common/menu.js', function(require, exports, module){

/**
 * menu浮层组件
 * @author: lunardai
 * @lastModified: 2016/6/22
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
	,statistics = music.statistics
    , $ = music.$;
var menu = BASE.extend({
	attrs : {
		$container : null,
		item_map : {
			'fav' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_fav" data-target="menu_sub_add"><i class="operate_menu__icon_add sprite"></i>添加到<i class="operate_menu__icon_arrow sprite"></i></a>',
					'</li>'].join(''),
			'share' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_share" data-target="menu_sub_share"><i class="operate_menu__icon_share sprite"></i>分享<i class="operate_menu__icon_arrow sprite"></i></a>',
					'</li>'].join(''),
			'down' : [' <li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_down"><i class="operate_menu__icon_down sprite"></i>下载</a>',
					'</li>'].join(''),
			'del' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_del"><i class="operate_menu__icon_delete sprite"></i>删除</a>',
					'</li>'].join(''),
			'batch' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_batch"><i class="operate_menu__icon_batch sprite"></i>批量操作</a>',
					'</li>'].join(''),
			'edit' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_edit"><i class="operate_menu__icon_edit sprite"></i>编辑歌单</a>',
					'</li>'].join(''),
			'accusation' : ['<li class="operate_menu__item">',
					'<a href="javascript:;" class="operate_menu__link js_menu_accusation"><i class="operate_menu__icon_inform sprite"></i>举报</a>',
					'</li>'].join(''),
			'qzone' : ['<li class="operate_menu__item">',
					'<a href="http://user.qzone.qq.com/'+music.widget.user.getUin()+'/305/playlist" rel="noopener" target="_blank" class="operate_menu__link"><i class="operate_menu__icon_qzone sprite"></i>管理背景音乐</a>',
					'</li>'].join('')
		},
		first_template : function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="mod_operate_menu js_menu_box" id="'+
((__t=( data.id ))==null?'':__t)+
'" data-aria="popup" style="display:none;" data-stat="'+
((__t=( data.stat ))==null?'':__t)+
'">\r\n\t<div class="operate_menu__cont">\r\n\t\t<ul role="menu" class="operate_menu__list">\r\n\t\t\t'+
((__t=( data.list ))==null?'':__t)+
'\r\n\t\t</ul>\r\n\t</div>\r\n</div>';
return __p;
}
	},
	showFirstMenu : function(e, stat){
		e.preventDefault();
		e.stopPropagation();
		$('#share_pop').hide();$('#fav_pop').hide();
		var _this = this
			, item_map = _this.get("item_map")
			, first_template = _this.get("first_template")
			, $container = _this.get("$container")
			, content = _this.get("content")
			, type = _this.get("type");
		var list = [];
		for (var i in content)
		{
			list.push(item_map[content[i]]);
		}
		if ($('#first_menu_'+($container.attr('data-type')||'1')).length>0)
		{
			$('#first_menu_'+($container.attr('data-type')||'1')+' ul.operate_menu__list').html(list.join(''));
		}else{
			var p = {list:list.join(''), id:'first_menu_'+($container.attr('data-type')||'1')};
			if (!!stat)
			{
				p.stat = stat;
			}
			$('body').append((first_template)(p));

		}
		$('.js_menu_box').hide();
		$('#first_menu_'+($container.attr('data-type')||'1')).css({
			left : (e.pageX)+'px',
			top : e.pageY+'px'
		}).show().attr('id', 'first_menu_'+($container.attr('data-type')||'1'));
	},
	getSongs : function(type, id, cb, uin, hostFlag){
		if (window.menuSonglist&&window.menuSonglist.length>0){
			cb&&cb(window.menuSonglist);
			return false;
		}
		function getOneSongInfo(mid, songtype, callback){
			var url = '//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid='+mid+'&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback_menu_share';
			if (parseInt(songtype)>0)
			{
				url = '//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songid='+mid+'&songtype='+songtype+'&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback_menu_share';
			}
			MUSIC.jQueryAjax.jsonp({
				url : url,
				charset : 'utf-8',
				jsonpCallback : 'getOneSongInfoCallback_menu_share',
				success : function(data) {
					if(data.code == 0 && data.data.length ){
						data.data[0] = MUSIC.player.formatMusic(data.data[0]);
						callback(data.data);
					}else callback([]);
				},
				error : function(){
					callback([]);
				}
			});
		};
		
		switch (type)
		{
		case 1:
			var mid = id.mid;
			getOneSongInfo(mid, id.songtype, function(songs){
				cb&&cb(songs);
			});
			break;
		case 2:
			var albummid = id;
			require.async('js/common/html/albumdata.js', function(albumdata){
				albumdata.init({mid:albummid, reportID:MUSIC.reportMap.menu, play:0},function (songs) {
					cb&&cb(songs);
				});
			});
			break;
		case 3:
			var disstid = id;
			require.async('js/common/html/playlistdata.js', function(playlistdata){
				playlistdata.init(disstid,function (songs) {
					if (songs.length != 0) {
						cb&&cb(songs);
					}else {
						MUSIC.popup.show('无可操作单曲！');
					}
				}, hostFlag);
			});
			break;
		case 4:
			var _dirid = id;
			
			require.async("js/common/fav.js", function(fav){
				fav.getDetail(uin, _dirid, function(info){
					if (info.list.length != 0) {
						cb&&cb(info.list);
					}else {
						MUSIC.popup.show('无可操作单曲！');
					}
				});
			});
			break;
		
		}
	},
	bindEvents : function(){
		var _this = this
			, $container = _this.get("$container")
			, type = _this.get("type")
			, mid = null
			, id = 0
			, songtype = null
			, content = _this.get("content")
			, hostFlag = _this.get("hostFlag")
			, uin = MUSIC.widget.user.getUin();
		$container.on('click', '', function(e){
			var $p = $(this).parents('.playlist__item');
			var stat = $(this).data('stat')||'';
			if (type==4)
			{
				uin = $(this).data('uin')||MUSIC.widget.user.getUin();
			}
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
			if ($p.length>0)
			{
				$('.playlist__item').removeClass('playlist__item--current');
				$p.addClass('playlist__item--current');
			}
			mid = $(this).data('mid')||$(this).data('id');
			id = parseInt($(this).data('id')|| $(this).data('mid') || 0);
			songtype = $(this).data('songtype')||'';
			
			for (var d in content)
			{
				if (content[d] == 'edit')
				{
					delete content[d];
				}
			}
			if (!!$(this).data('dirid')&&(parseInt($(this).data('dirid'))<201||parseInt($(this).data('dirid'))>206))
			{
				_this.set("dirid", parseInt($(this).data('dirid')));
				content.push('edit');
				_this.set("content", content);
			}else {
				_this.set("content", content);
			}
			var del = $(this).data('delete')||0;
			var _map = {'delcreate_gedan':1, 'delfav_gedan':1, 'delfav_album':1};
			if (del in _map)
			{
				var flag = false;
				for (var d in content)
				{
					if (content[d] == 'del')
					{
						flag = true;
						break;
					}
				}
				if (!flag)
				{
					content.push('del');
					_this.set("content", content);
					_this.set("delete_type", del);
					switch (del)
					{
					case 'delcreate_gedan':
						_this.set("delete_data", {dirid:$(this).data('dirid')});
						break;
					case 'delfav_gedan':
						_this.set("delete_data", {id:$(this).data('id')});
						break;
					case 'delfav_album':
						_this.set("delete_data", {id:$(this).data('id'), mid:$(this).data('mid')});
						break;
					
					}
				}
			}else {
				for (var d in content)
				{
					if (content[d] == 'del')
					{
						delete content[d];
					}
				}
						_this.set("content", content);
			}
			_this.showFirstMenu(e, stat);
		})
		;
		var menu_id= 'first_menu_'+($container.attr('data-type')||'1');
		$(document).off('click', '#'+menu_id+' .js_menu_fav').on('click', '#'+menu_id+' .js_menu_fav', function(e){
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.add');
			}
			var data = mid;
			if (type == 1)
			{
				data = {
					mid : mid,
					songtype : parseInt(songtype)
				};
			}
			_this.getSongs(type, data, function(songs){
				if (songs.length<=0)
				{
					MUSIC.popup.show('没有选择单曲！', 3000, 1);
					return;
				}
				if (songs[0].action.fav)
				{
					require.async("js/common/fav.js", function(fav){
						fav.show({
							sharetype : 0,
							noaddtoplayer : window.location.href.indexOf('portal/player')==-1?0:1,
							songs : songs
						}, e, $('#'+menu_id), stat);
					});
				}else music.popup.show('暂不提供此歌曲服务', 3000, 1);
			}, uin, hostFlag);
		}).off('click', '#'+menu_id+' .js_menu_share').on('click', '#'+menu_id+' .js_menu_share', function(e){
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.share');
			}
			var data = mid;
			if (type == 1)
			{
				data = {
					mid : mid,
					songtype : parseInt(songtype)
				};
			}
			_this.getSongs(type, data, function(songs){
				if (songs.length<=0)
				{
					MUSIC.popup.show('没有选择单曲！', 3000, 1);
					return;
				}
				if (songs[0].action.share)
				{
					require.async("js/common/share.js", function(share){
						var _opts = {};
						switch (type)
						{
						case 1:
							_opts.sharetype = 0;
							_opts.mid = mid;
							_opts.songtype = songtype;
							break;
						case 2:
							_opts.sharetype = 1;
							_opts.albummid = mid;
							break;
						case 3:
							_opts.sharetype = 2;
							_opts.dirid = mid;
							break;
						
						}
						share.show(_opts, e, $('#'+menu_id), stat);
					});
				}else music.popup.show('暂不提供此歌曲服务', 3000, 1);
			}, uin, hostFlag);
		}).off('click', '#'+menu_id+' .js_menu_down').on('click', '#'+menu_id+' .js_menu_down', function(e){
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.download');
			}
			var data = mid;
			if (type == 1)
			{
				data = {
					mid : mid,
					songtype : songtype
				};
			}
			_this.getSongs(type, data, function(songs){
				if (songs.length<=0)
				{
					MUSIC.popup.show('没有需要下载的单曲！', 3000, 1);
					return;
				}
				
				require.async("js/common/download.js", function(download){
					download.show(songs);
					$('.js_menu_box').hide();
				});
			}, uin, hostFlag);
		}).off('click', '#'+menu_id+' .js_menu_del').on('click', '#'+menu_id+' .js_menu_del', function(e){
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.delete');
			}
			$('body').trigger(_this.get("delete_type"), _this.get("delete_data"));
			$('.js_menu_box').hide();//$('#'+menu_id).hide();
		}).off('click', '#'+menu_id+' .js_menu_batch').on('click', '#'+menu_id+' .js_menu_batch', function(e){
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.batch');
			}
			var $mod_songlist = $('.mod_songlist');
			if ($mod_songlist.length<=0)
			{
				return false;
			}
			$mod_songlist.toggleClass('mod_songlist--edit');
			if ($mod_songlist.hasClass('mod_songlist--edit'))
			{	
				$('.songlist__edit').show();$('.js_foot_batch').show();
				$('.js_batch:contains("批量操作")').html('<i class="mod_btn__icon_batch"></i>取消批量操作');
			}else {
				$('.songlist__edit').hide();$('.js_foot_batch').hide();
				$('.js_batch:contains("取消批量操作")').html('<i class="mod_btn__icon_batch"></i>批量操作');
				$('div.songlist__edit').addClass('songlist__edit--check');
				$('li.js_songlist__child ul.songlist__list div.songlist__edit', '.mod_songlist').removeClass('songlist__edit--check');
			}
			$('.js_menu_box').hide();//$('#'+menu_id).hide();
		}).off('click', '#'+menu_id+' .js_menu_edit').on('click', '#'+menu_id+' .js_menu_edit', function(e){
			var dirid = _this.get("dirid");
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			if (!!stat)
			{
				window.location.href = '//y.qq.com/portal/mymusic_edit.html?dirid='+dirid+'&stat='+stat+'.edit';
			}else
			window.location.href = '//y.qq.com/portal/mymusic_edit.html?dirid='+dirid;
		}).off('click', '#'+menu_id+' .js_menu_accusation').on('click', '#'+menu_id+' .js_menu_accusation', function(e){
			var accusation_map = {
				2 : 6,//album
				1 : 5,//song
				3 : 1//歌单
			};
			var type = _this.get("type");
			var stat = $(this).parents('.js_menu_box').data('stat')||'';
			var accusationType = accusation_map[type], 
				params = {
				type : accusationType
			};
			switch (accusationType){
			case 1://playlist
				params.msg = mid;
				break;
			case 5://song
				params.msg = id + '_' + parseInt(songtype);
				break;
			case 6://album
				params.msg = mid;
				break;
			
			}
			
			require.async('js/common/accusation.js', function(accusation){
				accusation.init(params);
				$('.js_menu_box').hide();
			});
		});
	},
	initialize : function(opts){
		var _this = this, _conf = {}
			, $container = opts.$container
		$.extend(_conf, opts, {
			$container : opts.$container,
			content : opts.content,
			hostFlag : opts.hostFlag,
			type : opts.type
		});

		//把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
		$container.data("menu", _this);

		menu.superclass.initialize.call(_this, _conf);
		
		_this.bindEvents();

	},
	Statics : {
		init : function(config){
			try {
				//new一个新的Pager实例之前，先把之前的实例给destroy掉，防止内存泄漏
				var p = $(config.container).data("menu");
				p && p.remove && p.remove();
				p = null;
			} catch (exp) {};

			return new menu(config);
		}
	}
});

    $.fn.menu = function(args){
        if ($.type(args) === "object") {
			args.$container = $(this);
            menu.init(args);
        } else {
            //var _conf = $.extend(args, {page : $(this)});
			var content = $(this).data('content').split('_'),//fav：添加到，down：下载，share：分享，del：删除，batch：批量操作，edit：编辑歌单
				type = $(this).data('type');//1：单曲，2：专辑，3：歌单，
            menu.init({content:content,type:type, $container : $(this)});
        }
    };
return menu;



});