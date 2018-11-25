define('js/common/player.js', function(require, exports, module){


var $ = require("js/common/music/jquery.js"),
    user = require("js/common/user.js"),
	popup = require('js/common/popup.js'),
	userAgent = require('js/common/userAgent.js'),
    cookie = require("js/common/music/cookie.js"),
	g_storage = require('js/common/music/storage.js');
if (top != window && top.window.MUSIC)
{
	popup = top.window.MUSIC.popup;
}
function getParameterNew(name){
		var url = window.location.href;
		var r = new RegExp("(\\?|#|&)" + name + "=([^&#\\?]*)(&|#|$|\\?)");
		var m = url.match(r);
		if ((!m || m == "")){
			m = window.location.href.match(r);
		}
		return (!m ? "" : m[2]);
	}

/**
* MUSIC 播放器操作类
*
* @namespace MUSIC.player
* @author lunardai
* @description 解析单曲信息
*/
var player = (function(){
	function makePlayTime(t){
		var m = parseInt(t / 60, 10)
			, s = t % 60;
		if (m==0&&s==0)
		{
			return '--:--';
		}else
		return (m < 10? ("0" + m) : m) + ":" + (s < 10? ("0" + s) : s);
	}
return {
	storage : {
		_list : null,
		_stoleLinkId : 0,
		get : function (callback){
			//if (!!this._list) {
			//	callback(this._list);
			//	return;
			//}
			var _this = this;
			try {
				g_storage.get("y_playlist", function(data){
					top["y_playlist"] = [];
					if (!!data) {
						if (window.JSON && window.JSON.parse) {
							top["y_playlist"] = JSON.parse(data);
						} else {
							eval('top["y_playlist"] = ' + data);
						}
					}
					//if (window.location.href.indexOf('/portal/player.html')==-1){
						top["y_playlist"] = _this._list = player.formatMusics(top["y_playlist"] );
						callback(_this._list);
					/*}else {
						require.async('js/common/html/songlist.js', function(songList){
							songList.getSongInfo(top["y_playlist"], true, function(error, songlist){
								top["y_playlist"] = _this._list = songlist;
								callback(_this._list);
							});
						});
						
					}*/
				});
			} catch(e) {
				callback([]);
			}
		},

		save : function() {
			var list = [], count = 0, tmplist = [];
			for (var i = 0, len = this._list.length ; i < len ; i++) {
				var tmp = JSON.stringify(this._list[i]);
				count += tmp.length + 3;
				if (i >= 999) {		//只有ie6、ie7有32k限制
					popup.show('超过容量上限，将删除播放列表尾部部分单曲！');
					//g_popup.show(1, "添加歌曲失败！", "超过容量上限，本地电脑最多可以缓存32k的歌曲。", 3000, 200);
					break;
				}
				tmplist.push(this._list[i]);
				list.push(tmp);
			}
			this._list = tmplist;
			g_storage.set("y_playlist", JSON.stringify(this._list));
			return list.length;
		},

		add : function(newlist, order, newPlayer) {//order true:插在后面(一定是add)， false:插在前面 newPlayer:是否是新打开的播放器
			var _this = this;
			this.getAdd(newlist, order, function(arr){
				_this._list = arr;
				return _this.save();
			});
		},
		
		getAdd : function(newlist, order, callback) {//order true:插在后面(一定是add)， false:插在前面 newPlayer:是否是新打开的播放器
			var _list = null, arr = [], _map = {}, _this = this;
			this.get(function(){
				order = order || false;
				var mod = player.getPlayerOptions().mod;

				var index = parseInt(cookie.get('yq_index'))||0;
				/*
				11月9日 补充一个逻辑 olivianchen
					播放模式选择为“下一首播放”，
					A. 未打开播放器 这时新发起听歌：
					若保留播放历史，将新添加的歌曲添加到播放队列第二首，并从第二首开始播（即播放的是新发起的歌）；
					若未保留播放历史，立即播放新发起的歌曲，且歌曲列表 只有这次添加的歌曲。
					B. 已经打开播放器在播歌 这时新发起听歌
					将新发起的歌曲 添加到第二首，并不打断当前播放的歌曲。
				*/

				var splitedArr = [];
				if (mod == 2||mod == 1||order)
				{
					var new_map = {};
					$.each(newlist, function(idx, item){
						if (!!item&&!(item.songid in new_map))
						{
							new_map[item.songid] = 1;
						}
					});
					$.each(_this._list, function(idx, item){
						if (!!item&&!(item.songid in new_map))
						{
							splitedArr.push(item);
						}
						if ((item.songid in new_map) && idx<index)
						{
							index--;
							if (index<0)
							{
								index = 0;
							}
						}
					});
				}else splitedArr = _this._list;
				if ((mod == 2||mod == 1))
				{
					index = 0;
					var flag = false;
					if (splitedArr.length>0)
					{
						$.each(newlist, function(idx, item){
							if(splitedArr[0].songid == item.songid){
								flag = true;
							}
						});
						if (flag)
						{
							cookie.set('yq_index', 0, null, null, 100*24);//
						}else
						cookie.set('yq_index', (mod==2?1:splitedArr.length), null, null, 100*24);//
					}else cookie.set('yq_index', 0, null, null, 100*24);//
				}else if (mod == 0&&!order)
				{
					cookie.set('yq_index', 0, null, null, 100*24);
				}else cookie.set('yq_index', index+1, null, null, 100*24);
				if (!order)
				{
					if (mod == 1)//添加到播放队列尾部
					{
						order = true;
					}
				}
				if (order)
				{
					_list = splitedArr.concat(newlist);
				}else {
					if (mod == 2)//加在当前播放的后面 下一首播放
					{
						_list = splitedArr.slice(0, index+1).concat(newlist).concat(splitedArr.slice(index, splitedArr.length));
					}else _list = newlist.concat(splitedArr);//加在队首 立即播放
				}
				$.each(_list, function(idx, item){
					if (!!item&&!(item.songid in _map))
					{
						arr.push(item);
						_map[item.songid] = 1;
					}
				});
				callback&& callback(arr);
			});
		},
		del : function(index) {
			var _this = this;
			this.get(function(){
				if (index >= 0 && index < _this._list.length) {
					_this._list.splice(index, 1);
					_this.save();
				}
			});
		},
		delBatch : function(arr){
			var _this = this;
			this.get(function(){
				var list = player.storage._list;
				$.each(arr, function(idx, item){
					if (item >= 0 && item < list.length) {
						player.storage._list.splice(item, 1);
					}
				});
				_this.save();
			});
		},
		clear : function(){
			this._list = [];
			this.save();

		},

		insert : function(index, songinfo){
			var _this = this;
			this.get(function(){
				if (index >= 0 && index < _this._list.length) {
					_this._list.splice(index, 0, songinfo);

				}
				return _this.save();
			});
		}
	},

	/**
	* 格式化歌曲数据
	*
	* @param {String|Element} e “|”分隔的字符串数据或者dom节点（歌曲数据在<tag class="data">数据</tag>）
	* return {Object} 歌曲数据对象
	*/
	formatMusic : function (songdata) {
		function formatToOldJson(data) {
			if (!data) {
				return {};
			}
			if (typeof data == 'string') {
				try {
					data = JSON.parse(data);
				} catch (e) {
					return {};
				}
			}
			if (typeof data == 'object') {
				var r = {};
				if(!!data.url||!!data.songurl){
					r.songurl = data.url||data.songurl;
				}
				if (!!data.docid&&!data.id)
				{
					r.songid = data.docid;
				}else
				r.songid = data.id;
				r.songmid = data.mid;
				r.songtype = data.songtype;
				r.songname = data.name;
				r.songtitle = data.title;
				r.songsubtitle = data.subtitle||(data.album&&data.album.subtitle?data.album.subtitle:'')||'';
				r.type = data.type;
				r.songtype = data.type;
				r.cdIdx = data.index_cd;
				r.interval = data.interval;
				r.isonly = data.isonly;

				r.singer = data.singer;
				r.album = data.album;
				r.title = data.title;
				r.title_hilight = data.title_hilight;
				r.subtitle = data.subtitle;
				if (data.album) {
					r.albumid = data.album.id;
					r.albummid = data.album.mid;
					r.albumname = data.album.name;
				}
				if (data.file) {
					r.strMediaMid = data.file.media_mid;
					r.sizeape = data.file.size_ape;
					r.size128 = data.file.size_128||data.file.size_128mp3;
					r.size320= data.file.size_320;
					r.sizeflac = data.file.size_plac;
					r.sizeogg = data.file.size_ogg;
					r.preview = {};
					r.preview.trybegin = data.file.try_begin;
					r.preview.tryend = data.file.try_end;
					r.preview.trysize = data.file.size_try;
					// TODO
				}
				if (data.pay) {
					r.pay = {};
					r.pay.payalbumprice = data.pay.price_album;
					r.pay.paydownload = data.pay.pay_download;
					r.pay.payplay = data.pay.pay_play;
					r.pay.timefree = data.pay.time_free;
				}
				if (data.action) {
					r.msgid = data.action.msgid||data.action.msg;
					r['switch'] = data.action['switch']||data.action['switches'];
					r.alertid = data.action.alert;
				}
				if (data.mv) {
					r.vid = data.mv.vid;
				}else r.vid ='';
				for (var s in r.singer)
				{
					r.singer[s].name = r.singer[s].title;
				}
				//$.extend(r, data);
				r.grp = data.grp;
				return r;

			}
		}
		if (typeof songdata =='string') {
			try {
				songdata=JSON.parse(songdata);
			} catch (e) {
			}
		}
		if (songdata)
		{
			songdata.id = parseInt(songdata.id);
		}
		if(songdata && (songdata.id >0||typeof songdata.id !='undefined') && !(songdata.songid>0 || songdata.songmid)){
			songdata = formatToOldJson(songdata);
		}
		if (songdata.albumid == 8623||!songdata.albumid)
		{
			// 专辑id为0时歌手页需要展示不可点击的专辑名，故新增字段代替
			if (!songdata.albumName) {
				songdata.albumName = songdata.albumname;
			}
			songdata.albumname = '';
		}
		if (typeof songdata == 'object') {

			if (songdata.nodeType==1 || songdata.constructor==$) {
				songdata = JSON.parse(this.getSongData(songdata));
			}

			if (songdata.formatted) {
				return songdata;
			}

			//网络歌曲 前端来初始化权限位
			if ((typeof(songdata['type']) === 'undefined'||songdata.type!=0) && (typeof(songdata['switch']) === 'undefined' || songdata['switch'] == 0)) {
				songdata['switch'] = 403;
			}

			//先转成二进制,然后分成数组
			if (!songdata['switch']){
				songdata['switch'] = 403;
			}
			var song_switch=songdata['switch'].toString(2).split('');
			song_switch.pop();//最后一位是没用的
			song_switch.reverse();//后台传过来的二进制是从右往左的  改成正序

			var actions=[
				'play_lq',  // 普通音质播放权限位 （0：不可以播放 1：可以播放）
				'play_hq',  // HQ音质播放权限位 （0：不可以播放 1：可以播放）
				'play_sq',  // SQ音质播放权限位 （0：不可以播放 1：可以播放）
				'down_lq',  // 普通音质下载权限位 （0：不可以下载 1：可以下载）
				'down_hq',  // HQ音质下载权限位 （0：不可以下载 1：可以下载）
				'down_sq',  // SQ音质下载权限位 （0：不可以下载 1：可以下载）
				'soso',     // 地球展示权限位  （0：库内不展示地球 1：展示地球标志）
				'fav',      // 收藏权限位  （0：无权限 1：有权限）
				'share',    // 分享权限位  （0：无权限 1：有权限）
				'bgm',      // 背景音乐权限位  （0：无权限 1：有权限）
				'ring',     // 铃声设置权限位  （0：无权限 1：有权限）
				'sing',     // 唱这首歌权限位  （0：无权限 1：有权限）
				'radio',    // 单曲电台权限位  （0：无权限 1：有权限）
				'try',      // 试听权限位 （0：不可以试听 1：可以试听）
				'give'      // 赠送权限位 （0：不可以赠送 1：可以赠送）
			];

			songdata.action={};
			for (var i=0; i<actions.length; i++) {
				songdata.action[actions[i]] = parseInt(song_switch[i], 10) || 0;;
			}

			songdata.pay=songdata.pay||{};
			songdata.preview=songdata.preview||{};

			songdata.playTime=makePlayTime(songdata.interval);

			//到底能不能播(不算试听)
			songdata.action.play=0;
			if (songdata.action.play_lq || songdata.action.play_hq || songdata.action.play_sq) {
				songdata.action.play=1;
			}

			//是否能试听
			songdata.tryPlay=0;
			if (songdata.action['try'] && songdata.preview.trysize>0) {
				songdata.tryPlay=1;
			}

			//只要有能播的东西  anyPlay就为true
			songdata.anyPlay=0;
			if (songdata.action.play || songdata.tryPlay) {
				songdata.anyPlay=1;
			}

			songdata.tryIcon=0; //展示试听icon
			songdata.disabled=0; //歌曲置灰
			//这两种都是针对非付费且不能播放的歌曲
			if (!songdata.action.play && !songdata.pay.payplay && !songdata.pay.paydownload) {
				if (songdata.tryPlay) {
					songdata.tryIcon=1;
				}else {
					songdata.disabled=1;
				}
			}

			songdata.sosoFlag=0;//展示地球标志
			//库外歌曲或者权限标记为展现地球的库内歌曲
			if (songdata.action.soso || songdata.type != 0) {
				songdata.sosoFlag=1;
			}

			songdata.formatted=1; //格式化之后加个标记
			songdata.mtype = songdata.type != 0? 'net' : 'qqmusic';

			//展示地球标志的库内歌曲，定义为伪链歌曲
			if (songdata.type == 0 && songdata.action.soso == 1) {
				songdata.type = 3;//定义为伪链歌曲
				songdata.mtype = 'net';
				songdata.songurl = 'http://isure.stream.qqmusic.qq.com/C100' + songdata.songmid + '.m4a?fromtag=0';
			}
			if (songdata.url)
			{
				songdata.songurl = songdata.url;
			}
			if (songdata.mtype == 'qqmusic') {
				songdata.songurl = '';
			}
			/*if (songdata.strMediaMid&&$.trim(songdata.strMediaMid)!=$.trim(songdata.songmid))//替换音档
			{
				songdata.songmid = songdata.strMediaMid;
			}
			*/
			songdata.songtype == 35 && (songdata.songurl += '&fx=.m4a');
			if (!!songdata.docid&&!songdata.songid)
			{
				songdata.songid = songdata.docid;
			}
			songdata.mid=(songdata.songid||0).toString();
			songdata.songname=!!songdata.songname?songdata.songname.entityReplace():'';
			songdata.albumname=!!songdata.albumname?songdata.albumname.entityReplace():'';
			if (!songdata.singer){
				songdata.singer = [];
			}
			for (var i=0; i<songdata.singer.length; i++) {
				songdata.singer[i].name=!!songdata.singer[i].name?songdata.singer[i].name.entityReplace():'';
				if (i == 0)
				{
					songdata.singername=songdata.singer[0].name;
					songdata.singerid=songdata.singer[0].id;
					songdata.singermid=songdata.singer[0].mid;
				}
			}

			songdata.formatted=1; //格式化之后加个标记
			songdata.fav='';

		}

		if (songdata.type>0)
		{
			var item = songdata;
			if(item.type==111||item.type==112||item.type==113){
				songdata.mtype = 'qqmusic';
				//songdata.songurl ='http://isure.stream.qqmusic.qq.com/C1L0'+ (item.strMediaMid||item.songmid) +'.m4a?fromtag=38';
			}else{
				if (1)
				{
					songdata.songurl = 'http://dl.stream.qqmusic.qq.com/C100'+ (item.strMediaMid||item.songmid) +'.m4a?fromtag=38';
				}
			}
		}
		return songdata;
	},
	formatMusics : function (songList, from) {
		from = from || 0;
		var _cacheArr = [],
			_that = this;

		$(songList).each(function(ix) {
			var music = {},
				detail = this;
			if (!detail.data)
			{
			music = player.formatMusic(detail);
			music.grp&&(music.grp = player.formatMusics(music.grp));
			}else
			{
			music = player.formatMusic(detail.data);
			music.grp&&(music.grp = player.formatMusics(music.grp));
			if (!!detail.cur_count)
			{
				music.cur_count = detail.cur_count;
			}
			if (!!detail.old_count)
			{
				music.old_count = detail.old_count;
			}
			if (!!detail.in_count)
			{
				music.in_count = detail.in_count;
			}
			}
			music.ix = ix+from;

			_cacheArr.push(music);
		});

		return _cacheArr;
	},

	/**
	* 格式化歌曲码率
	*
	* @param {Integer} sSize 文件大小
	* @param {Integer} sTime 歌曲播放时长
	* @param {Integer} mrate 歌曲默认码率
	* @return {Integer} 歌曲码率
	*/
	formatSongRate : function(sSize, sTime, mrate) {
		if(/^\d+$/.test(mrate) && mrate > 64000 && mrate < 1000000){
			return  parseInt(mrate/1000,10);
		}

		if(!(/^\d+$/.test(sSize)) || !(/^\d+$/.test(sTime)))
		{
			return "";
		}

		var iCode = parseInt(sSize) / 1024 / parseInt(sTime) * 8;
		if (iCode < 160) {
			return "128";
		}else if (iCode < 224) {
			return "192";
		} else if (iCode < 288) {
			return "256";
		} else {
			return "320";
		}
	},
	getProtocol : function(){
		return window.location.protocol;
	},
	//_existFlag : false,
	_windowName : '_yplaer',
	_windowHandler : null,
	_playerOptions : {
		deleteList : true,	//false:保留列表 true:删除列表
		mod : 0				//0:立即播放，1:添加到播放队列末尾，2:下一首播放
	},
	getPlayerOptions : function(){
		var opts = cookie.get('y_pl_op');
		if (!!opts)
		{
			var arr = opts.split('|');
			if (arr.length>0)
			{
				this._playerOptions.deleteList = (parseInt(arr[0])==1);
			}
			if (arr.length>1)
			{
				this._playerOptions.mod = parseInt(arr[1]);
				if (this._playerOptions.mod <0||this._playerOptions.mod >2)
				{
					this._playerOptions.mod = 0;
				}
			}
		}
		return this._playerOptions;

	},
	setPlayerOptions : function(opts){
		var arr = [];
		$.extend(this._playerOptions, opts);
		if (this._playerOptions.deleteList)
		{
			arr.push(1);
		}else arr.push(0);
		arr.push(this._playerOptions.mod);
		cookie.set('y_pl_op', arr.join('|'), null, null, 100*24);

	},
	openAWindow : function(url, target){
		var ret = window.open(url, target);
		if(!ret)
		{
			//MUSIC.popup.show("播放器页面被浏览器拦截！<br>设置-》高级-》隐私设置和安全性-》内容设置-》弹出窗口，允许本网站的弹出式窗口", 20000, 1);
			MUSIC.popup.hide();
			require.async("js/common/dialog.js", function(dialog){
				dialog.show({
					mode : "common",
					title : "",
					icon_type : 2,
					sub_title : "播放器页面被浏览器拦截！",
					desc : (!userAgent.safari?"设置->高级->隐私设置和安全性->内容设置->弹出窗口->允许本网站的弹出式窗口" : "1.启动Safari浏览器后，单击『Safari』菜单中的『偏好设置』；2.在弹出的『通用』窗口中，单击『安全性』选项卡；3.在『安全性』窗口中，勾选『阻止弹出式窗口』，然后取消勾选『允许WebGL』和『允许插件』；4.单击左上角的『关闭』按钮，关闭安全性窗口"),
					button_info2 : {
						highlight : 1,
						title : "确定",
						fn : function(e){
							dialog.hide();
						}
					}
				});
			});
		}
		return false;
		//console.info("openAWindow");
		/*$('body').append('<a id="openawindow" href="'+url+'" target="'+target+'"></a>');
		$('#openawindow')[0].click();
		setTimeout(function(){
			$('#openawindow').remove();
		}, 500);*/
	},
	openPlayer : function(list, deleteList, order){
		//deleteList = false;
		this.getPlayerOptions();
		if (deleteList&&this._playerOptions.deleteList)
		{
			g_storage.set('y_playlist', '');
			player.storage.clear();
			player.storage.add(list, order);
		}
		var i = 1040
		  , e = 800;
		var g = ["toolbar=0,status=0, menubar=0,location=0,width=", screen.width-10, ",height=", screen.height-30, ",left=0", ",top=0"].join("");//["toolbar=0,status=0,resizeable=0, menubar=0,location=0,width=", i, ",height=", e, ",left=", (screen.width - i) / 2, ",top=", (screen.height - e) / 2].join("");
		/*if (!(this._existFlag))
		{
			if (this._windowHandler&&!player.isExists())
			{
				this._existFlag = true;
				this._windowHandler.location.href = this.getProtocol()+'//y.qq.com/portal/player.html';
			}else
			this._windowHandler = window.open(this.getProtocol()+"//y.qq.com/portal/player.html", player._windowName);
		}else */
		var mids = getParameterNew('mids');
		if (mids||window.location.href.indexOf('player_radio.html')!=-1) {//单曲播放和电台播放页的时候 都在本页面打开
			window.location.href=this.getProtocol()+"//y.qq.com/portal/player.html";
		}else{
			this.openAWindow(this.getProtocol()+"//y.qq.com/portal/player.html", player._windowName);//window.open(this.getProtocol()+"//y.qq.com/portal/player.html", player._windowName);
		}
		MUSIC.cookie.set('yplayer_open', 1);
		/*if (!!userAgent.safari)
		{
			this._windowHandler.focus();
		}*/
	},
	checkPlayerWindow : function(){
		if (!userAgent.chrome&&!userAgent.safari){
			return false;
		}
		if (!this.isExists()) {
			this.getPlayerOptions();
			if (this._playerOptions.deleteList)
			{
				g_storage.set('y_playlist', '');
				player.storage.clear();
			}
			var mids = getParameterNew('mids');
			if (mids) {
				window.location.href=this.getProtocol()+"//y.qq.com/portal/player.html";
			}else{
				this.openAWindow(this.getProtocol()+"//y.qq.com/portal/player.html", player._windowName);//window.open(this.getProtocol()+"//y.qq.com/portal/player.html", player._windowName);
			}
			MUSIC.cookie.set('yplayer_open', 1);
		}
	},
	isExists: function() {
		$.jStorage.reInit();
		return parseInt(cookie.get('yplayer_open'))==1;
	},
	getSimpleSonginfo : function(songlist){
		var ret = [];
		for (var i = 0; i<songlist.length; i++){
			if (!songlist[i].songmid){
				ret.push(songlist[i]);
			}else {
				ret.push({
					type : songlist[i].type,
					songid : songlist[i].songid,
					songtype : songlist[i].songtype,
					ix : 0
				});
			}
		}
		return ret;
	},
	checkSonglistRight : function(e){
		var musiclist = [];
		for(i = 0 ; i < e.length ; i++) {
            var _music = e[i];

            //版权原因 用户无法播放的歌曲
            if (!(_music && _music.action && _music.action.play)) {
                //如果是批量播放的时候  直接跳过不能播放歌曲    如果是单曲播放  直接跳过不能试听的歌曲
                if (e.length>1 || !_music.tryPlay ) {
                    continue;
                }
            }

            //数据异常歌曲
            if ((_music.type == 0 && (_music.size128<=0 || _music.interval<=0))  || (_music.type!=0 && !_music.songurl) ) {
                continue;
            }

            musiclist.push(_music);
        }
		if (e.length == 0){
			popup.show('已过滤付费歌曲，没有可以播放的单曲！');
			return false;
		}
        if (e.length==1) { //单曲

            if (!(e[0] && e[0].action && e[0].action.play)) {//没有播放权限
                if (user.getUin()<1000 && e[0].pay && e[0].pay.payplay) {
                   user.openLogin();
                    return false;
                }

				require.async('js/common/showMsg.js', function(showMsg){
						showMsg(e[0]);
				});
                if (musiclist.length) {//试听
                }else { //不能试听
                    return false;
                }

            }
        }else  { //多首
            if (musiclist.length) {
            }else {
				require.async('js/common/showMsg.js', function(showMsg){
						showMsg(e[0]);
				});
                return false;
            }
        }
		return true;
	},
	getPlaySource : function(){
		var path = window.location.href, id = 0;
		if (path.indexOf('/n/yqq/album') != -1){
			return {
				toptype : 10002
			};
		}else if(/yqq\/playlist\/(\d+)\.html/.test(path)||/yqq\/playsquare\/(\d+)\.html/.test(path)){
			id = RegExp.$1;
			return {
				toptype : 10014,
				parentid : id
			};
		}else if(/yqq\/toplist\/(\d+)\.html/.test(path)){
			id = RegExp.$1;
			return {
				toptype : 10005,
				parentid : id
			};
		}else {
			return {
				toptype : 10050
			};
		}
	},
	play: function(songlist, g, current, tips, reportType) {
		reportType = reportType || '';
		if (current)
		{
			this._windowName = '_yplaer';//'_self';
		}else this._windowName = '_yplaer';
		$('.songlist__item--current').removeClass('songlist__item--current');
		var e = songlist;
		if (typeof e === "number" || typeof e === "string") {
			e = [e]
		}
        var flag_copyright = false;
        var _idlist = [],
            musiclist = [],
            listinfo = {};
        for(i = 0 ; i < e.length ; i++) {
            var _music = e[i];

            //版权原因 用户无法播放的歌曲
            if (!(_music && _music.action && _music.action.play)) {
               /* if(listinfo.playindex > i) {
                    listinfo.playindex--;
                }*/
                flag_copyright = true;
                //如果是批量播放的时候  直接跳过不能播放歌曲    如果是单曲播放  直接跳过不能试听的歌曲
                if (e.length>1 || !_music.tryPlay ) {
                    continue;
                }
            }

            //数据异常歌曲
            if ((_music.type == 0 && (_music.size128<=0 || _music.interval<=0))  || (_music.type!=0 && !_music.songurl) ) {
                /*if(listinfo.playindex > i) {
                    listinfo.playindex--;
                }*/
                continue;
            }

            if(_music.songid > 0) {
                _idlist.push(_music.songid);
            }
          //  _music.playrate = opts.playrate;

            _music.docid = _music.docid || "";
            musiclist.push(_music);
        }
		if (e.length == 0){
			popup.show('已过滤付费歌曲，没有可以播放的单曲！');
			return false;
		}
        if (e.length==1) { //单曲

            if (!(e[0] && e[0].action && e[0].action.play)) {//没有播放权限
                if (user.getUin()<1000 && e[0].pay && e[0].pay.payplay) {
                   user.openLogin();
                    return false;
                }

				require.async('js/common/showMsg.js', function(showMsg){
						showMsg(e[0]);
				});
                if (musiclist.length) {//试听
//                    if (musiclist[0].pay.payplay) { //库内收费歌曲受阻  需要引导
//                        showMsg(musiclist[0]);
//                    }
                }else { //不能试听
//                    showMsg(opts.songlist[0]);
                    return false;
                }

            }
        }else  { //多首
            if (musiclist.length) {
                if (flag_copyright) {
                }
            }else {
				require.async('js/common/showMsg.js', function(showMsg){
						showMsg(e[0]);
				});
                return false;
            }
        }
		e = tips?musiclist.slice(0, 100):musiclist;
		g = g == 1? 1:0;

		player.storage.add(e, (g==0?true:false));
		player.storage.get(function(l){
			if (player.isExists()&&navigator.userAgent.indexOf("WindowsWechat")==-1) {
				$.jStorage.set('addplaylist', {'list':e, 'play':g, report:player.getPlaySource(e)});
				//$.jStorage.set('addplaylist', {'list':e, 'play':g});
				$.jStorage.set('addplaylist_new', {'list':player.getSimpleSonginfo(e), 'play':g, report:player.getPlaySource(e)});
				MUSIC.cookie.set('yq_playschange', 1);MUSIC.cookie.set("yq_playdata", 's_0_'+g+('_'+reportType))
				cookie.set('player_exist', 0);
				/*$.jStorage.publish('addplaylist', {'list':e, 'play':g});*/
				if (flag_copyright) {
					popup.show(tips&&(tips+"，已过滤付费歌曲。")||"已添加至播放器，已过滤付费歌曲。");
				}else popup.show(tips&&(tips+"!")||'已经加入播放器！');
				setTimeout(function(){
					var existFlag = parseInt(cookie.get('player_exist'));
					if (!existFlag)
					{
						//$.jStorage.set('addplaylist', {'list':e, 'play':g});
						player.storage.add(e, (g==0?true:false));
						return player.openPlayer(e, false, (g==0?true:false))
					}else{
					}
				}, 2000);
			} else {
				$.jStorage.set('addplaylist', {'list':e, 'play':g, report:player.getPlaySource(e)});
				if (flag_copyright) {
					popup.show(tips&&(tips+"，已过滤付费歌曲。")||"已添加至播放器，已过滤付费歌曲。");
				}else popup.show(tips&&(tips+"!")||'已经加入播放器！');
				return player.openPlayer(e, true, (g==0?true:false))
			}
		});
	},
	add: function(e, current, tips) {
		return this.play(e, 0, current, tips);
	},
	checkAndOpenPlayer : function(){

		player.storage.get(function(l){
			if (player.isExists()) {
				$.jStorage.publish('focusplayer', {'status':true});
				cookie.set('player_exist', 0);
				setTimeout(function(){
					var existFlag = parseInt(cookie.get('player_exist'));
					if (!existFlag)
					{
						return player.openPlayer([])
					}
				}, 2000);
			} else {
				return player.openPlayer([])
			}
		});
	}
}
})();
return player;

});