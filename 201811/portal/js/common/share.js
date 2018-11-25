define('js/common/share.js', function(require, exports, module){

/**
 * 分享组件
 * @author: lunardai
 * @lastModified: 2016/4/20
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
    , $ = music.$
	,MUSIC = music
	,statistics = music.statistics
	, User = music.widget.user
	, Tips = require("js/common/music/tips.js");
    /**
     * 分享组件
     *
     */
var Share = (function(){
	var config = {}, songInfo = null, qqInit = false;
	function getListInfo(callback){
		config.dirUin = config.dirUin || 0;
		var url = '//c.y.qq.com/splcloud/fcgi-bin/fcg_musiclist_getinfo_cp.fcg?utf8=1&fromDir2Diss=1&miniportal=1&uin=' + config.dirUin + '&dirid=' + config.dirid + '&rnd=' + new Date().valueOf();
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'jsonCallback',
			success : function(data) {
				if (data.code == 0){
					callback(data);
				} else if (data.code == 1){//未登录
					User.openLogin();
				} else {
					
				}
			},
			error : function(){
			}
		});
	}
	
	function getTaogeInfo(callback){
		config.dirUin = config.dirUin || 0;
		var url = '//c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&nosign=1&song_begin=0&song_num=1&disstid='+config.dirid;
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'getTaogeInfoCallback',
			success : function(data) {
				if(data.code == 0 && data.cdlist.length ){
					var taoge = data.cdlist[0], 
						nick='';
						
					taoge.type = parseInt(taoge.type);
						
					if(taoge.type ==1 || taoge.type==2){
						nick = taoge.nickname;
					}else{
						nick = taoge.nick;
					}
					taogeData = {
						'DirName' 		: taoge.dissname,
						'name' 		: taoge.dissname,
						'dissid'	: taoge.disstid,
						'PicUrl'  		: taoge.logo,
						'NickName' 	: nick,
						'UserUin'	: taoge.uin,
						'TotalSongNum' 	: taoge.songlist.length
					};
					callback(taogeData);
				}
			},
			error : function(){
			}
		});
	};
	function getOneSongInfo(callback){
		var url = '//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid='+config.mid+'&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback';
		if (parseInt(config.songtype)>0)
		{
			url = '//c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songid='+config.mid+'&songtype='+config.songtype+'&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback';
		}
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'getOneSongInfoCallback',
			success : function(data) {
				if(data.code == 0 && data.data.length ){
					data.data[0] = MUSIC.player.formatMusic(data.data[0]);
					
					if (data.data[0].action.share==0)
					{
						require.async('js/common/showMsg.js', function(showMsg){
							showMsg(data.data[0]);
						});
						return false;
					}
					var 
					songData = {
						id : data.data[0].songid,
						songtype : data.data[0].songtype,
						url : data.url[data.data[0].songid],
						share_url : parseInt(data.data[0].songtype)>0?(location.protocol + '//i.y.qq.com/v8/playsong.html?songid=' + data.data[0].songid + '&songtype='+data.data[0].songtype+'&source=yqq#wechat_redirect'):(location.protocol + '//i.y.qq.com/v8/playsong.html?songid=' + data.data[0].songid + '&source=yqq#wechat_redirect'),
						name : (data.data[0].songname).entityReplace().myEncode(),
						singer : (data.data[0].singer[0].name).entityReplace().myEncode(),
						picUrl : MUSIC.util.getAlbumPic({mid : data.data[0].albummid,type :150})
					};
					callback(songData);
				}
			},
			error : function(){
			}
		});
	};
	function getAlbumInfo(callback){
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?albummid='+config.albummid,
			charset : 'utf-8',
			jsonpCallback : 'getAlbumInfoCallback',
			success : function(data) {
				if(data.code == 0){
					var 
					songData = {
						id : data.data.id,
						share_url : location.protocol + '//y.qq.com/n/m/detail/album/index.html?albumId=' + data.data.id,
						name : '《' + (data.data.name).entityReplace().myEncode() + '》',
						singer : (data.data.singername).entityReplace().myEncode(),
						albummid : data.data.mid,
						picUrl : MUSIC.util.getMidPic({mid : data.data.mid,type :150,page : 'album'})
					};
					callback(songData);
				}
			},
			error : function(e){
			}
		});
	};
	function getSingerInfo(callback){
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?order=listen&begin=0&num=1&songstatus=1&singermid='+config.singermid,
			charset : 'utf-8',
			jsonpCallback : 'getSingerInfoCallback',
			success : function(data) {
				if(data.code == 0){
					var 
					songData = {
						id : data.data.id,
						share_url : location.protocol + '//y.qq.com/n/m/detail/singer/index.html?singerId=' + data.data.singer_id,
						name : '歌手：' + (data.data.singer_name).entityReplace().myEncode(),
						singer : (data.data.singer_name).entityReplace().myEncode(),
						singermid : data.data.singer_mid,
						singerid : data.data.singer_id,
						picUrl : MUSIC.util.getMidPic({mid : data.data.singer_mid,type :150,page : 'singer'})
					};
					callback(songData);
				}
			},
			error : function(e){
			}
		});
	};
	function getToplistInfo(callback){
		var old_map = {4:7,5:2,6:1,3:6,16:9,17:10,18:11,19:12, 2:4, 10:8,124:14,
			157:18,
			155:16,
			108:7,
			123:12,
			106:5,
			107:6,
			105:4,
			117:9,
			114:13,
			113:8,
			104:3,
			102:2,
			101:1}
		var id = parseInt(config.topid),
			type = parseInt(config.toptype);
		MUSIC.jQueryAjax.jsonp({
			url : '//c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?page=detail&tpl=macv4'+'&type='+['top','global', 'special'][type]+'&topid='+ id,
			charset : 'utf-8',
			jsonpCallback : 'MusicJsonCallback',
			success : function(data) {
				if(!!data.topinfo){
					var 
					songData = {
						id : id,
						share_url : location.protocol + '//y.qq.com/n/m/detail/toplist/index.html?id=' + (!(id in old_map)?id:old_map[id])+'&type='+type,
						name : (data.topinfo.ListName).entityReplace().myEncode(),
						singer : (data.topinfo.ListName).entityReplace().myEncode(),
						singermid : '',
						singerid : 0,
						picUrl : data.topinfo.pic_v12
					};
					callback(songData);
				}
			},
			error : function(e){
			}
		});
	};
	
	function getMvInfo(callback){
		if (!config.vid)
		{
			return;
		}
		/*var url = "//c.y.qq.com/mv/fcgi-bin/fcg_get_mvinfolist.fcg?cid=205361527&format=jsonp&vid="+config.vid;
		MUSIC.jQueryAjax.jsonp({
			url : url,
			charset : 'utf-8',
			jsonpCallback : 'jsonpmvinfo',
			success : function(data) {
				if (data.code == 0&&!!data.data)
				{
					data = data.data;
					var 
					songData = {
						id : config.vid,
						share_url : location.protocol + '//y.qq.com/n/m/detail/mv/index.html?vid=' +config.vid,
						name : (data.mvname).entityReplace().myEncode(),
						singer : (data.singer.name).entityReplace().myEncode(),
						singermid : data.singer.mid,
						singerid : data.singer.id,
						picUrl : 'http://shp.qpic.cn/qqvideo_ori/0/'+config.vid+'_360_204/0'
					};
					callback(songData);
				}
			},
			error : function(){
			}
		});*/
		var o = {
			"mvinfo": {
				"module": "video.VideoDataServer",
				"method": "get_video_info_batch",
				"param": {
					"vidlist": [config.vid],
					"required": ["vid","type","sid","cover_pic","duration", "singers", "video_switch", "msg", "name", "desc", "playcnt", "pubdate", "isfav", "gmid"],  // 需要后台返回的字段
				}
			}
		};
		var jcb = 'getmvinfo'+(Math.random() + '').replace('0.', '');
		MUSIC.jQueryAjax.jsonp({
			url : '//u.y.qq.com/cgi-bin/musicu.fcg?callback='+jcb,
			data : {data:JSON.stringify(o)},
			jsonpCallback : jcb,
			charset : 'utf-8',
			success : function (r) {
				if (r.code == 0 && r.mvinfo && r.mvinfo.code == 0 && r.mvinfo.data && (config.vid in r.mvinfo.data))
				{
					var data = r.mvinfo.data[config.vid];
					var 
					songData = {
						id : config.vid,
						share_url : location.protocol + '//y.qq.com/n/m/detail/mv/index.html?vid=' +config.vid,
						name : (data.name).entityReplace().myEncode(),
						singer : (data.singers.length>0?data.singers[0].name:'').entityReplace().myEncode(),
						singermid : data.singers.length>0?data.singers[0].mid:'',
						singerid : data.singers.length>0?data.singers[0].id:0,
						picUrl : 'http://shp.qpic.cn/qqvideo_ori/0/'+config.vid+'_360_204/0'
					};
					callback(songData);
				}
			},
			error : function() {
			}
		});
		
	}
	function shareToQzone(options){
		if (!options.url)
		{
			options.url = "http://y.qq.com";
		}
		if (options.pics.indexOf('http:')!=0)
		{
			options.pics = 'http:'+options.pics;
		}
		var qzoneShareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(options.url)+'&desc='+encodeURIComponent(options.desc)+'&summary='+encodeURIComponent(options.summary)+'&title='+encodeURIComponent(options.title)+'&pics='+encodeURIComponent(options.pics);
		/*window.open(qzoneShareUrl);
		setTimeout(MusicShare.closeWindows, 1000);*/	
		var w = window.open(qzoneShareUrl); if(w)w.opener = null;
	}
	function shareToSina(){
		if(config.sharetype == 7) {
			var sinaUrl = 'http://service.weibo.com/share/share.php?appkey=3328066022&pic=' + config.shareData.picUrl + '&url=&title=' + encodeURIComponent(config.shareData.title + config.shareData.desc);
		} else {
			var content = '♪我正在收听' + songInfo.singer + '的' + ((typeof songInfo.dgType == 'undefined') ? '歌曲' : (songInfo.dgType == 1 ? '专辑' : '歌单'));
			var sname = (typeof songInfo.dgType == 'undefined') ? ('《' + songInfo.name  + '》 ') : songInfo.name;
			if (config.sharetype > 3)
			{
				content = '♪我正在收听 ' + songInfo.singer + ' 的歌';
				sname = '（' + songInfo.name  + '） ';
			}
			content += sname + (songInfo.share_url&&songInfo.songtype==0?songInfo.share_url:window.location.href) + ' （来自@QQ音乐）';						
			var sinaUrl = 'http://service.weibo.com/share/share.php?appkey=3328066022&pic=' + songInfo.picUrl + '&url=&title=' + encodeURIComponent(content);
		}
		
		var w = window.open(sinaUrl, '_blank');if(w)w.opener = null;
	}
	
	/*function loadUrl(callback,error) {
		if (qqInit)
		{
			callback && callback();
			return;
		}
		var url = 'http://connect.qq.com/widget/shareqq/loader/loader.js', charset = 'utf-8';
        setTimeout(function(){
            var node = document.createElement("script")

            if (charset) {
                node.charset = charset;
            }

			$(node).attr('widget', "IFRAME_SHARE_QQ");
            node.onload  = node.onerror = node.onreadystatechange = function() {
				qqInit = true;
                if (/^(?:loaded|complete|undefined)$/.test(node.readyState)) {

                    // Ensure only run once and handle memory leak in IE
                    node.onload = node.onerror = node.onreadystatechange = null

                    // Dereference the node
                    node = null

                    callback && callback()
                }
            }
            node.async = true;
            node.src = url;

            document.getElementsByTagName('head')[0].appendChild(node);
        }, 0);
	}*/
	function shareToQq(){
		if (User.getUin()<10000)
		{
			User.openLogin();
			return;
		}
		var title = '', sname = '', content = '';
		if (config.sharetype == 7) {
			content = songInfo.desc;
			title = songInfo.title;
			sname = songInfo.desc;
		} else {
			content = '♪我正在收听' + songInfo.singer + '的' + ((typeof songInfo.dgType == 'undefined') ? '歌曲' : (songInfo.dgType == 1 ? '专辑' : '歌单'));
			sname = (typeof songInfo.dgType == 'undefined') ? (songInfo.name.indexOf('《')==-1?('《' + songInfo.name  + '》 '):(songInfo.name)) : songInfo.name;
			if (config.sharetype > 3)
			{
				content = '♪我正在收听 ' + songInfo.singer + ' 的歌';
				sname = '（' + songInfo.name  + '） ';
			}
		}
		
		content += ' （来自@QQ音乐）';						
		var url = 'http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(songInfo.share_url || '')+'&desc='+content+'&title=' + title + '&summary='+sname+'&pics='+encodeURIComponent(((songInfo.picUrl.indexOf('http:')!=0&&songInfo.picUrl.indexOf('https:')!=0)?location.protocol:'')+songInfo.picUrl)+'&flash=&site=QQ%E9%9F%B3%E4%B9%90&style=201&width=32&height=32%20target=&showcount=';
		//'http://connect.qq.com/widget/shareqq/index.html?url='+encodeURIComponent(songInfo.share_url || '')+'&site=yqq&iframe=true&showcount=0&desc='+content+'&summary='+sname+'&title=&pics='+encodeURIComponent(((songInfo.picUrl.indexOf('http:')!=0&&songInfo.picUrl.indexOf('https:')!=0)?location.protocol:'')+songInfo.picUrl)+'&style=203&width=19&height=22';
		var w = window.open(url, '_blank');if(w)w.opener = null;/*loadUrl(function(){
			require.async('js/common/dialog.js', function(dialog){
				setTimeout(function(){
					window.initShareWin(document.getElementById(dialog.id()),document.getElementById('frame_tips'), function(){
						dialog.hide();
					});
				}, 1000)

				dialog.show({
					mode : "iframe",
					dialogclass : '',
					title : "分享给QQ好友",
					url : url,
					objArg : {}
				});
				window.share2qq = document.getElementById(dialog.id());
				window.share2qq.iframe = document.getElementById('frame_tips');
				window.share2qq.resizePopup = function (opts){		
					dialog.onReady( 720, opts.height);
				}
				window.share2qq.closePopup = function(){
					dialog.hide();
				};
				setTimeout(function(){					
					dialog.onReady( 720, 470);
				}, 1000);
			});
		}, function(){
		});*/
	}
	function shareToWeixin(){					
		var qrcode_url = '//c.y.qq.com/tplcloud/fcgi-bin/fcg_get_2dcode.fcg?width=200&margin=1&eclevel=4&encode=1&url=' + encodeURIComponent(songInfo.share_url);
		
		require.async("js/common/dialog.js", function(dialog){
			dialog.show({
				mode : "common",
				dialogclass : 'popup_share_wechat',
				content : ['<img src="'+qrcode_url+'" alt="二维码" class="popup_share_wechat__qrcode">',
							'<div class="popup_share_wechat__txt">',
								'<p>微信扫描二维码，点击右上角<img src="//y.gtimg.cn/mediastyle/yqq/extra/share_wechat_btn.png" alt="" class="popup_share_wechat__img">按钮</p>',
								'<p>分享给<span class="popup_txt_highlight">好友</span>或<span class="popup_txt_highlight">朋友圈</span></p>',
							'</div>'].join(''),
				title : "分享到微信"
			});
			hide();
		});
	}
	function bindEvents(stat){
		$(document).off('click', '.js_share_friend').on('click', '.js_share_friend', function(){
			hide();
		})
		.off('click', '.js_share_weixin').on('click', '.js_share_weixin', function(){
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.weixin');
			}
			shareToWeixin();
		})
		.off('click', '.js_share_qzone').on('click', '.js_share_qzone', function(){
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.qzone');
			}
			var share_type = config.sharetype;
			if (share_type == 0)
			{
				shareToQzone({
					title:'分享歌曲《' + songInfo.name + '》',
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收听《' + songInfo.name + '》（来自@QQ音乐）',
					summary:songInfo.singer
				});
			}else if (share_type == 1)
			{
				shareToQzone({
					title:'分享专辑' + songInfo.name ,
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收听' + songInfo.name + '（来自@QQ音乐）',
					summary:'来自'+songInfo.singer+'的专辑'
				});
			}else if (share_type == 2||share_type == 3)
			{
				shareToQzone({
					title:'分享歌单' + songInfo.name,
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收听' + songInfo.name + '（来自@QQ音乐）',
					summary:'来自'+songInfo.singer+'的歌单'
				});
			}else if (share_type == 4)
			{
				shareToQzone({
					title:songInfo.singer,
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收听 ' + songInfo.name + '（来自@QQ音乐）',
					summary:'分享'+songInfo.name
				});
			}else if (share_type == 5)
			{
				shareToQzone({
					title:'分享排行榜《'+songInfo.name+'》',
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收听 《'+songInfo.name+'》（来自@QQ音乐）',
					summary:'来自QQ音乐榜单'
				});
			}else if (share_type == 6)
			{
				shareToQzone({
					title:'分享MV《'+songInfo.name+'》',
					pics:songInfo.picUrl,
					url:songInfo.share_url,
					desc:'♪我正在收看'+songInfo.singer+'的 《'+songInfo.name+'》（来自@QQ音乐）',
					summary:'来自QQ音乐MV'
				});
			}else if (share_type == 7) {
				shareToQzone({
					title:config.shareData.title,
					pics:config.shareData.picUrl,
					url:config.shareData.share_url,
					desc:config.shareData.desc,
					summary:'来自QQ音乐'
				});
			}
			/*shareToQzone({
				title:'♪我正在收听 ' + songInfo.name + ' 的歌',
				pics:songInfo.picUrl,
				url:songInfo.share_url,
				summary:'♪我正在收听 ' + songInfo.name + ' 的歌 （来自@QQ音乐）',
				desc:'♪我正在收听 ' + songInfo.name + ' 的歌 （来自@QQ音乐）'
			});*/
			hide();
		}).off('click', '.js_share_sina').on('click', '.js_share_sina', function(){
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.sina');
			}
			shareToSina();
			hide();
		}).off('click', '.js_share_copy').on('click', '.js_share_copy', function(){
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.copy');
			}
			if (!window.clipboardData) {
				hide();		
				return;
			}
			var text = '', _target = '';
			if (!!(_target = $(this).data('data-clipboard-target')))
			{
				text = $('#'+_target).html();
			}else 
			if (!!($(this).data('data-clipboard-text')))
			{
				text = $(this).data('data-clipboard-text');
			}
			window.clipboardData
					.setData('text', text);
			MUSIC.popup.show("复制成功！", 2000);//data-clipboard-target data-clipboard-text	
		}).off('click', '.js_share_friend').on('click', '.js_share_friend', function(){
			if (!!stat)
			{
				statistics.pgvClickStat(stat+'.qq');
			}
			shareToQq();
			hide();
		});

		if (!window.clipboardData) {
			
			if (!!MUSIC.userAgent.macs||!MUSIC.util.checkFlash())
			{	
				$('.js_share_copy').attr("data-clipboard-action","copy"); $('.js_share_copy').attr("data-clipboard-target","#share_copy_content");
				 require.load(location.protocol + '//y.gtimg.cn/music/h5/lib/js/module/clipboard.js?max_age=604800', function () {
					var clipboard = new Clipboard('.js_share_copy',{
						text: function() {
							return $('#share_copy_content').val();
						}
					});
					
					clipboard.on('success', function(e) {
						MUSIC.popup.show('复制成功')
					});

					clipboard.on('error', function(e) {
						MUSIC.popup.show('暂不支持一键复制', 3000, 1)
					});
				});
			}else{
				
				require.async("js/common/music/ZeroClipboard.js", function(ZeroClipboard){
					var clip = new ZeroClipboard( document.getElementById("share_copy") );
					clip.on("copy", function(e){
						MUSIC.popup.show("复制成功！", 2000);
					});
				});
			}
		}else {
			$(document).off('click', '#share_copy').on('click', '#share_copy', function(){
				var text = $("#share_copy").attr("data-clipboard-text");
				window.clipboardData.setData('text',text); 
				MUSIC.popup.show("复制成功！", 2000);
			});
		}
	}
	function getShareInfo(callback){
			var share_type = config.sharetype;
			if (share_type == 0)
			{
				getOneSongInfo(function(data){
					songInfo = data;
					callback(data);
				});
			}else if (share_type == 1)
			{
				getAlbumInfo(function(data){
					songInfo = data;
					callback(data);
				});
			}else if (share_type == 2)
			{
				getTaogeInfo(function(data){
					songdata = {
						uin : User.getUin(),
						diruin : config.dirUin,
						dirid : config.dirid,
						name : '《' + (data.DirName).entityReplace().myEncode() + '》',
						singer : (data.NickName).entityReplace().myEncode(),
						listNum : data.TotalSongNum,
						picUrl : (data.PicUrl).entityReplace().myEncode(),
						share_url : location.protocol + "//y.qq.com/n/m/detail/taoge/index.html?id=" + config.dirid,
						dgType : 2 //歌单
					};
					songInfo = songdata;
					callback(songdata);
				});
			}else  if (share_type == 3)
			{
				getListInfo(function(data){
					songdata = {
						uin : User.getUin(),
						diruin : config.dirUin,
						dirid : config.dirid,
						name : '《' + (data.Title).entityReplace().myEncode() + '》',
						singer : (data.NickName).entityReplace().myEncode(),
						listNum : data.TotalSongNum,
						picUrl : (data.PicUrl).entityReplace().myEncode(),
						share_url : location.protocol + "//y.qq.com/n/m/detail/taoge/index.html?id=" + data.dissID,
						dgType : 0 //歌单
					};
					songInfo = songdata;
					callback(songdata);
				});
			}else if (share_type == 4)
			{
				getSingerInfo(function(data){
					songInfo = data;
					callback(data);
				});
			}else if (share_type == 5)
			{
				getToplistInfo(function(data){
					songInfo = data;
					callback(data);
				});
			}else if (share_type == 6)
			{
				getMvInfo(function(data){
					songInfo = data;
					callback(data);
				});
			}else if (share_type == 7) {
				setTimeout(function() {
					songInfo = config.shareData;
					callback(config.shareData);
				}, 0)
			}
	}
	function show (opts, e,p, stat){
		if (opts.sharetype == 0&&!opts.mid)
		{
			MUSIC.popup.show('不可分享该单曲！', 3000, 1);
			return false;
		}
		//e.preventDefault();
		//e.stopPropagation();
		var targ = MUSIC.util.getTarget(e);
		if ($("#share_pop").css('display')=='none')
		{
			$('.list_menu__icon_share').data('flag', '0');
			$(targ).data('flag', '0');
		}
		var flag = $(targ).data('flag');
		if (!!flag&&flag == '1')
		{
			$(targ).data('flag', '0');
			$("#share_pop").hide();
			return;
		}
		$('.list_menu__icon_share').data('flag', '0');
		$("#fav_pop").hide();
		$("#share_pop").hide();
		//hide();
		function bindGoBack(){
			$(document).off('click', '.js_back').on('click', '.js_back', function(){
				p.show();
				$('#share_pop').hide();
			})
		}
		$.extend(config ,opts);
		$(targ).data('flag', '1');
		var $share_pop = $('#share_pop'), back_html = '<a href="javascript:;" class="operate_menu__link js_back"><i class="operate_menu__icon_prev_arrow sprite"></i>分享</a>';
		if ($share_pop.length==0)
		{
			$('body').append(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n    <!-- 分享 -->\r\n    <div class="mod_operate_menu" style="position:absolute;display:none;" id="share_pop">\r\n        <div class="operate_menu__cont">\r\n            <ul role="menu" class="operate_menu__list operate_menu__list--no_icon">\r\n                <li><a href="javascript:;" class="operate_menu__link js_share_friend">QQ好友</a></li>\r\n                <li><a href="javascript:;" class="operate_menu__link js_share_weixin">微信好友/朋友圈</a></li>\r\n                <li><a href="javascript:;" class="operate_menu__link js_share_qzone">QQ空间</a></li>\r\n                <li><a href="javascript:;" class="operate_menu__link js_share_sina">新浪微博</a></li>\r\n                <li><a href="javascript:;" class="operate_menu__link js_share_copy share_copy" id="share_copy">复制链接</a></li> \r\n            </ul>\r\n        </div>\r\n\t<input style="display:none;" id="share_copy_content"></a>\r\n    </div> ';
return __p;
}({}));
		}
		if (p)
		{
			bindGoBack();
			if ($("#share_pop a.js_back").length<=0)
			{
				$("#share_pop div.operate_menu__cont").prepend(back_html);
			}
			$("#share_pop ul.operate_menu__list").removeClass('operate_menu__list--no_icon').addClass('operate_menu__top_line');
			
			Tips.fix_elem($("#share_pop"), p, 0);	
			//p.hide();
		}else{
			$("#share_pop ul.operate_menu__list").addClass('operate_menu__list--no_icon').removeClass('operate_menu__top_line');
			$('.js_back').hide();
			$("#share_pop").css({
				left : (e.pageX+12)+'px',
				top : e.pageY+'px',
				'z-index': 9999999
			});	
		}
		getShareInfo(function(data){
			if (p){p.hide();}
			bindEvents(stat);
			$('#share_copy_content').html(data.share_url);
			$('#share_copy_content').val(data.share_url);
			$("#share_pop").show();
			$('#share_copy').attr("data-clipboard-text",data.share_url);
		});
	}
	function hide (){
		$('.songlist__item--current').removeClass('songlist__item--current');
		$('.playlist__item--current').removeClass('playlist__item--current');
		$('#share_pop').hide();
	}
	return {
		show : show,
		hide : hide
	}
})();
return Share;


});