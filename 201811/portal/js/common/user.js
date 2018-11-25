define('js/common/user.js', function(require, exports, module){

/**
 * MUSIC 用户身份位操作类
 * @author: lunardai
 * @lastModified: 2016/8/18
 * @description 身份位处理类，主要用于用户身份位、等级等状态的拉取。用户身份状态、qq号、是否已登录等提供方。
 * @fileoverview:
 *
 */
var music = require("js/common/music.js");
var cookie = require('js/common/music/cookie.js'),
	$ = require("js/common/music/jquery.js"),
    statistics = require("js/common/statastic.js"),
	jQueryAjax = require('js/common/jQueryAjax.js');

var UserInfoLocal = {
	key : 'userinfo_detail_yqq',
	clientStorage : function(cmd, key, value) {
		var ret = '';
		try {
			ret = window.external.ClientStorage(cmd, key || '', value || '') || '';
		} catch(e) {
			return ret;
		}
		return ret;
	},
	set : function(data, userkey) {
		if (!!userkey)
		{
			var sdata = this.get(userkey);
			data = $.extend(sdata, data);
			delete data['uin'];
		}
		var _uin = user.getUin(),
			parts = ['uin=' + _uin];
		$.each(data, function(k, v){
			if(v.constructor != Function){
				parts.push(k + '=' + escape(v));
			}
		});
		try {
			sessionStorage.setItem(userkey||this.key, parts.join(','));
		} catch (e) {
			this.clientStorage('set', userkey||this.key, parts.join(','));				
			cookie.set(userkey||this.key, '1', 'music.qq.com', '/portal/');
		}
	},
	get :function(userkey) {
		try {
			var data = {},
				localData = sessionStorage.getItem(userkey||this.key),
				parts = !!localData ? localData.split(',') : [];
			if (parts.length == 0) {
				return null;
			}
			$.each(parts, function(i, kv) {
				var arr = kv.split('=');
				data[arr[0]] = unescape(arr[1]);
			});
			return data;
		} catch (e) {
			if (cookie.get(userkey||this.key) != 1) {
				return null;
			}
			var data = {},
				localData = this.clientStorage('get', userkey||this.key),
				parts = !!localData ? localData.split(',') : [];
			if (parts.length == 0) {
				return null;
			}	
			$.each(parts, function(i, kv) {
				var arr = kv.split('=');
				data[arr[0]] = unescape(arr[1]);
			});
			return data;
		}
	},
	clear : function(userkey) {
		try {
			sessionStorage.removeItem(userkey||this.key);
			this.clientStorage('remove', userkey||this.key);
			cookie.del(userkey||this.key);
		} catch (e) {
			
		}
	}
};
function getParameter(name){
	var url = window.location.href;
	var r = new RegExp("(\\?|#|&)" + name + "=([^&#\\?]*)(&|#|$|\\?)");
	var m = url.match(r);
	if ((!m || m == "")){
		m = window.location.href.match(r);
	}
	return (!m ? "" : m[2]);
}
	/**
	 * 删除url参数
	 * @method delParam
	 * @param {string} name 需要删除的url参数名
	 * @param {string} url  需要解析的url
	 * @return 删除之后的url
	 */
	var delParam = function(name, url){
		var r=new RegExp("(\\?|#|&)("+name+"=.*?)(#|&|$)");
		url=url||location.href;
		var m=url.match(r);
		if(m && (m.length >= 3) && m[2]){
			var matchstr = m[0],
				s = m[2];
			if( matchstr.charAt(0) == '&' ){
				s = '&' + s;
			}
			return url.replace(s, '');
		}else{
			return url;
		}
	};
var user = {
	UserInfoLocal : UserInfoLocal,
	/**
	 * 判断是否是微信用户
	 */
	isWeiXin : function () {
		// 判断是否是有openId 来判断是否是微信用户
		var openId = cookie.get("wxuin")||cookie.get("lwxuin");
		return !!openId;
	},
	/**
	 * 获取登录QQ号
	 * 
	 * @return {Integer}
	 */
	getUin : function() {
		if (user.isWeiXin())
		{
			var _u = cookie.get("wxuin")||cookie.get("lwxuin");
			if (_u.indexOf('o') == 0) {
				_u = _u.substring(1, _u.length);
			}
			if (!(/^[\d]{5,}$/).test(_u)) {
				_u = 0;
			}
			return _u;
		}
		var _puin = cookie.get("p_uin")||cookie.get("uin")||cookie.get("luin")||cookie.get("p_luin"),
			_uin = 0;
		if (_puin == "") {
			return _uin;
		}
		if (_puin.indexOf('o') == 0) {
			_uin = parseInt(_puin.substring(1, _puin.length), 10);
		} else {
			_uin = parseInt(_puin, 10);
		}
		return _uin;
	},
	/**
	 * 是否已登录
	 * 
	 * @return {Boolean}
	 */
	isLogin : function() {
		return user.getUin() > 10000 ? true : false;
	},
	/**
	 * 登录后回调，在self模式下有效
	 * 
	 * 
	 */
	_loginCallback : null, 
	/**
	 * 登录浮层关闭回调
	 * 
	 * 
	 */
	_closeCallback : null, 
	qq_login_url : location.protocol+'//xui.ptlogin2.qq.com/cgi-bin/xlogin?daid=384&pt_no_auth=1&style=11&appid=1006102&s_url='+ encodeURIComponent(window.location.href) +'&low_login=1&hln_css=&hln_title=&hln_acc=&hln_pwd=&hln_u_tips=&hln_p_tips=&hln_autologin=&hln_login=&hln_otheracc=&hide_close_icon=1&hln_qloginacc=&hln_reg=&hln_vctitle=&hln_verifycode=&hln_vclogin=&hln_feedback=',
	wx_login_url : location.protocol+'//open.weixin.qq.com/connect/qrconnect?appid=wx48db31d50e334801&redirect_uri=https%3A%2F%2Fy.qq.com%2Fportal%2Fwx_redirect.html%3Flogin_type%3D2%26surl%3D'+encodeURIComponent(delParam('access_token', delParam('mmkey', location.href)).replace(/\?&+/, "?"))+'&response_type=code&scope=snsapi_login&state=STATE&href=https%3A%2F%2Fy.gtimg.cn%2Fmediastyle%2Fyqq%2Fpopup_wechat.css#wechat_redirect',
	/**
	 * 打开登陆框（由于y.qq.com为框架接口，故3个参数暂时不用）
	 * 
	 * @param {String}
	 *            url 登陆后跳转url，本页面刷新可不填写
	 * @param {String}
	 *            target 刷新页面目标，默认为刷新登陆发起页面  
	 * @param {Function}
	 *            logincallback 登录成功后回调
	 *  @param {string}
	 *           way : qq 登录, wx 微信登录
	 * 
	 */
	openLogin : function(reflash, logincallback,way) {
		
		user.qq_login_url = location.protocol+'//xui.ptlogin2.qq.com/cgi-bin/xlogin?daid=384&pt_no_auth=1&style=40&appid=1006102&s_url='+ encodeURIComponent(window.location.href) +'&low_login=1&hln_css=&hln_title=&hln_acc=&hln_pwd=&hln_u_tips=&hln_p_tips=&hln_autologin=&hln_login=&hln_otheracc=&hide_close_icon=1&hln_qloginacc=&hln_reg=&hln_vctitle=&hln_verifycode=&hln_vclogin=&hln_feedback=';
		user.wx_login_url = location.protocol+'//open.weixin.qq.com/connect/qrconnect?appid=wx48db31d50e334801&redirect_uri=https%3A%2F%2Fy.qq.com%2Fportal%2Fwx_redirect.html%3Flogin_type%3D2%26surl%3D'+encodeURIComponent(delParam('access_token', delParam('mmkey', location.href)).replace(/\?&+/, "?"))+'&response_type=code&scope=snsapi_login&state=STATE&href=https%3A%2F%2Fy.gtimg.cn%2Fmediastyle%2Fyqq%2Fpopup_wechat.css#wechat_redirect';
		//this.wxlogin();return;
		this._loginCallback = logincallback;
		var qq_hide = '', wx_hide = '';
		if(way){
			if(way == 'qq'){
				wx_hide = 'display:none';
			}else if(way == 'wx'){
				qq_hide = 'display:none';
			}
		}
		require.async('js/common/dialog.js', function(dialog){
			
			dialog.show({
				mode : "iframe",
				dialogclass : 'popup_login',
				title : '<a href="javascript:;" class="popup__tit_item current js_iframe_login" data-type="qq" style="'+qq_hide+'">QQ登录</a><a href="javascript:;" class="popup__tit_item js_iframe_login" data-type="wx" style="'+wx_hide+'">微信登录</a>',
				url : !!reflash?'//y.qq.com/portal/pop_login.html':user.qq_login_url,
				objArg : {}
			});

			setTimeout(function(){
				if(way){
					if(way == 'qq'){
						$('#frame_tips').addClass('popup_login_qq');
					}else if(way == 'wx'){
						$('#frame_tips').attr('src', user.wx_login_url);
						$('#frame_tips').after('<div class="wechat_login_tips">QQ与微信帐号的音乐资产、付费特权不互通</div>');
						$('#frame_tips').removeClass('popup_login_qq');
					}
				}else{
					$('#frame_tips').addClass('popup_login_qq');
				}
				dialog.onReady( 0, 0)
			}, 500);
			/*window.ptlogin2_onResize = function(width, height){
				dialog.onReady( 0, 0);
			}
			window.ptlogin2_onClose = function(){
				dialog.hide();
			}*/
			//dialog.onReady( 546, 380);
		});
		
		$(document).off('click', '.js_iframe_login').on('click', '.js_iframe_login', function(){
			if ($(this).hasClass('current'))
			{
				return false;
			}
			$('.js_iframe_login').removeClass('current');$(this).addClass('current');
			var type = $(this).data('type');
			if (type == 'qq')
			{
				$('#frame_tips').attr('src', !!reflash?'//y.qq.com/portal/pop_login.html':user.qq_login_url);
				$('.wechat_login_tips').remove();
				$('#frame_tips').addClass('popup_login_qq');
			}else if (type == 'wx')
			{
				$('#frame_tips').attr('src', user.wx_login_url);
				$('#frame_tips').after('<div class="wechat_login_tips">QQ与微信帐号的音乐资产、付费特权不互通</div>');
				$('#frame_tips').removeClass('popup_login_qq');
			}
		});
		
				

	},
	/**
	 * ptlogin登陆成功回调
	 *
	 */
	onLogin : function() {
		
		
		//执行公共登录信息展现模块 todo
		if (this._loginCallback) {
			this._loginCallback();
			this._loginCallback = null;
		}
		//window.ptlogin2_onClose();
		//g_dialog.hide();
	},
	/**
	 * 退出登陆
	 * 
	 * @param {Function}
	 *            callback 退出后回调，空时直接刷新页面
	 */
	loginOut : function(callback) {
		user.clearAllCookies();
		UserInfoLocal.clear('user_data_yqq');
		if (callback){
			callback();
		} else {
			window.location.reload();
		}
	},
	/**
	 * 清楚用户cookie
	 * 
	 */
	clearAllCookies : function(){
		cookie.del("uin", "qq.com");
		cookie.del("skey", "qq.com");
		cookie.del("p_uin", "y.qq.com");
		cookie.del("p_skey", "y.qq.com");
		cookie.del("luin", "qq.com");
		cookie.del("lskey", "qq.com");
		cookie.del("p_luin", "y.qq.com");
		cookie.del("p_lskey", "y.qq.com");

		cookie.del("qm_keyst", "qq.com");
		cookie.del("wxopenid", "qq.com");
		cookie.del("wxrefresh_token", "qq.com");
		cookie.del("wxunionid", "qq.com");
		cookie.del("login_type", "qq.com");
		cookie.del("wxuin", "qq.com"); 

		cookie.del("qm_keyst", "y.qq.com");
		cookie.del("wxopenid", "y.qq.com");
		cookie.del("wxrefresh_token", "y.qq.com");
		cookie.del("wxunionid", "y.qq.com");
		cookie.del("login_type", "y.qq.com");
		cookie.del("wxuin", "y.qq.com"); 

		cookie.del("lqm_keyst", "y.qq.com");
		cookie.del("lwxuin", "y.qq.com"); 
		UserInfoLocal.clear();
	},
	/**
	 * 清楚用户cookie
	 * 
	 */
	clearCache : function(){
		UserInfoLocal.clear();
	},
	/*微信登陆*/
	wxlogin : function(){
		
				
		require.async('js/common/dialog.js', function(dialog){
			dialog.show({
				mode : "iframe",
				dialogclass : 'popup_login',
				title : '<a href="javascript:;" class="popup__tit_item">QQ登录</a><a href="javascript:;" class="popup__tit_item current">微信登录</a>',
				url : user.wx_login_url,
				objArg : {}
			});
			setTimeout(function(){
				dialog.onReady( 0, 0);
			}, 500);
		});
		$(document).off('click', '.js_iframe_login').on('click', '.js_iframe_login', function(){
			if ($(this).hasClass('current'))
			{
				return false;
			}
			var type = $(this).data('type');
			if (type == 'qq')
			{
				$('#frame_tips').attr('src', !!reflash?'//y.qq.com/portal/pop_login.html':user.qq_login_url);
			}else if (type == 'wx')
			{
				$('#frame_tips').attr('src',user.wx_login_url);
			}
		});
	},
    /**
     * 获取身份位信息，支持回调
     * 
     * @param {Function} callback
     * @param {Function} errCallback
     */
    getVipInfo:function(callback, errCallback){
		var _uin = user.getUin();
		if (_uin < 10001) {
			errCallback && errCallback();
			return;
		}
      
		var _userinfo = UserInfoLocal.get();			
		if (_userinfo != null && _userinfo.uin == this.getUin()) {
			!!callback && callback(_userinfo);
			return;
		}
		UserInfoLocal.clear();
	  
		/**
		 * 修正超过2038年时后台返回日期错误问题
		 * 
		 *  
		 */
		function amendDateTime(strDateTime){
			function add_zero(num){
				return (num < 10 ? '0' + num : '' + num);
			}
			
			if (!strDateTime || strDateTime == '') {
				return strDateTime;
			}

			var strParseTime, timeStamp, newDate;
			//调整格式为Date.parse()函数规定的并兼容各浏览器的时间格式，：MM/dd/yyyy HH:mm:ss
			strParseTime = strDateTime.substr(5, 5).replace(/-/g, '/') + '/' + strDateTime.substr(0, 4) + strDateTime.substr(10);
			
			timeStamp = parseInt(Date.parse(strParseTime), 10) / 1000;
			if (timeStamp >= 0) {	//正确的时间戳，无需修复
				return strDateTime;
			}
			
			//错误时间戳，计算正确的时间戳
			timeStamp = timeStamp >>> 0;
			newDate = new Date(timeStamp * 1000);
			
			var year = newDate.getFullYear(),
				month = add_zero(newDate.getMonth() + 1),
				day = add_zero(newDate.getDate()),		
				hour = add_zero(newDate.getHours()),
				minute = add_zero(newDate.getMinutes()),
				second = add_zero(newDate.getSeconds());
			
			var newDateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			return newDateTime;
		}

		jQueryAjax.jsonp({
			url : '//c.y.qq.com/portalcgi/fcgi-bin/music_mini_portal/fcg_getuser_infoEx.fcg?rnd='+parseInt(new Date().valueOf()/600),
			data : {},
			jsonpCallback: 'MusicJsonCallback'+parseInt(10000*Math.random()),
			charset : 'utf-8',
			success : function(redata) {
				if( !('code' in redata) || redata.code == 0 ){
					var data = redata.data;
					//data.end = '1963-11-01 08:00:00'; //测试用
					//data.yearend = '1969-11-01 08:00:00';
					//------------修正2038年后32位机器返回的日期错误问题-------
					!!data.start && (data.start = amendDateTime(data.start));
					!!data.end && (data.end = amendDateTime(data.end));
					!!data.yearstart && (data.yearstart = amendDateTime(data.yearstart));
					!!data.yearend && (data.yearend = amendDateTime(data.yearend));
					!!data.expire && (data.expire = amendDateTime(data.expire));
					!!data.nowtime && (data.nowtime = amendDateTime(data.nowtime));
					//---------------------------------------------------------
					if (data.vip == 1 || data.vip == 2) {
						UserInfoLocal.set(data);
					}
					!!callback && callback(data);
				} else {
					errCallback && errCallback();
				}
			},
			error : function(){
				errCallback && errCallback();
			}
		});
    },
	codesMap : {
		'buygreen' : 		'XXZXHH',
		'buysupergreen' : 	'XXZXHH',
		'buy8yuan' : 		'qqmsey',
		'buy12yuan' : 		'qqmstw',
		'buysuperstar' :	'cjxzxn',
		'vip_svip' : 'XXZXHH',
		'svip_vip' : 'XXZXHH'
	},
	offeridMap : {
		'buygreen' : 		'1450008186',
		'buysupergreen' : 	'1450008186',
		'buy8yuan' : 		'1450008189',
		'buy12yuan' : 		'1450008190',
		'vip_svip' : '1450008186',
		'svip_vip' : '1450008186'
	},
	codesMapWX : {
		'buygreen' : 		'WXDYHHL',
		'buysupergreen' : 	'WXDYHHL',
		'buy8yuan' : 		'WXDYFFB',
		'buy12yuan' : 		'WXDYFFB',
		'vip_svip' : 'WXDYHHL',
		'svip_vip' : 'WXDYHHL'
	},
	offeridMapWX : {
		'buygreen' : 		'1450008916',
		'buysupergreen' : 	'1450008916',
		'buy8yuan' : 		'1450008608',
		'buy12yuan' : 		'1450008917',
		'vip_svip' : '1450008916',
		'svip_vip' : '1450008916'
	},
		
	// 下载minipay2的组件
	downMinipaycomponent : function(cb) {
		require.load(location.protocol+'//midas.gtimg.cn/midas/minipay_v2/jsapi/cashier.js?max_age=2592000', function () {
			cb && cb();
		});
	},
		
	// 获取微信token值
	getWXtoken : function(cb) {
		jQueryAjax.jsonp({
			url:'//c.y.qq.com/base/fcgi-bin/login_get_musickey.fcg',
			type:'get',
			jsonpCallback:'MusicJsonCallback',
			data : {
				from:'1',
				force_access:'1',
				wxopenid : cookie.get("wxopenid") || user.getUin(),
				wxrefresh_token : cookie.get('wxrefresh_token'),
				musickey:cookie.get('qm_keyst'),
				musicuin:user.getUin(),
				get_access_token:1,
				format:'jsonp',
				ct:1001,
				jsonpCallback:'MusicJsonCallback'
			},
			success: function (data) {
				if (data.code == 0) {
					cb&& cb(data.wxaccess_token);
				}else if (data.code == 1000)
				{
					user.openLogin();
				}
			}
		});
	},
	
	// 包月购买
	buyMonth : function(buyType, aid, num ,pf,cb) {
		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
		var defaultmonth = num || 3, isWeiXin = user.isWeiXin();
		var _pf = isWeiXin ? 'wechat_pc-musicweb.hhlz-website':'qq_pc-musicweb.hhlz-website';
		var pf = pf || _pf;
		// 购买
		function gopay (openkey) {

			openkey = openkey || cookie.get('skey');

			var _data = {
				sandbox : 1,
				appid: isWeiXin ? user.offeridMapWX[buyType] : user.offeridMap[buyType],
				usepay_wxappid:'1',
				buy_quantity:defaultmonth,
				//groupid: isWeiXin ? user.codesMapWX[buyType] : user.codesMap[buyType],
				session_id :  isWeiXin ? 'hy_gameid' : 'uin',
				session_type : isWeiXin ? 'wc_actoken' : 'skey',
				wxappid : isWeiXin ? 'wx48db31d50e334801' : '',
				openid: cookie.get("wxopenid") || user.getUin(),
				openkey : openkey,
				aid : aid,
				price_style:"card",
				price_type:"upgrade",
				pf : pf
			}
			if (defaultmonth == 12) {
				delete _data.price_type
			} 
			if (!cookie.get('FIS_DEBUG')) {
				delete _data.sandbox
			}
			user.downMinipaycomponent(function () {

				var cashier = window.cashier||window.midas.minipay;

				cashier.service({
					//pos:{x:window.innerWidth/2-340,y:window.innerHeight/2-300+scrollTop},
					hideHeader : false,
					title:'开通绿钻',
					methods: {
						onSuccess : function(){
							UserInfoLocal.clear();
							if(getParameter('openminipay')){
								typeof cb == "function" && cb();
							}else{
								window.location.reload();
							}
							
						},
						onNoResult: function () {
						},
						onResize: function (obj) {
						},
						onClose: function () { 
						}
					}
				},_data);
				require.async('js/common/dialog.js', function(dialog){
					dialog.hide();
				});
			});
		}

		// 判断是否是微信购买
		isWeiXin ? user.getWXtoken(gopay) : gopay();

		
	},
	/**
	 * 开通绿钻
	 * 
	 * @param {string} aid 开通来源
	 * @param {string} cm 升级（false）还是普通 ture
	 */
	openVip:function(aid, cm, stat, num,pf,cb){
		cm = cm || true;
		var buyType = 'buysupergreen';
		aid = aid || 'music.yyw.svip.public.1';

		if (!!stat&&stat!='')
		{
			statistics.pgvClickStat(stat);
		}
		
		if (user.isLogin())
		{
			user.buyMonth(buyType, aid, num,pf,cb);
		}else{
			user.openLogin();
		}
		
	},
	/**
	 * 开通付费音乐包
	 * 
	 * @param {string} aid 开通来源
	 */
	openPayMusic:function(aid, stat, num){
		user.getVipInfo(function(userdata){
			var type = 0, buyType = 'buy8yuan';
			if (parseInt(userdata.twelve, 10)==1)
			{
				type = 1;
				aid = aid.replace(/20320/gi, '20321');
				stat = stat.replace(/20320/gi, '20321');
				buyType = 'buy12yuan';
			}
			if (!!stat&&stat!='')
			{
				statistics.pgvClickStat(stat);
			}
			if (user.isLogin())
			{
				user.buyMonth(buyType, aid, num);
			}else{
				user.openLogin();
			}
		}, function(){
			user.openLogin();
		});	

	},
	buyAlbum : function(opt){

		var scrollTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;
		var uin = uin || user.getUin();
		if (uin < 10001) {
			user.openLogin();
			return;
		}

		if (!opt.albumid && !opt.actid) {
				MUSIC.popup.show('参数错误', 3000, 1);
				return;
			}

		user.downMinipaycomponent(function () {
			var buy = function (opt) {
				// 金壳子
				if (opt.actid) {
					opt.url = location.protocol+'//c.y.qq.com/shop/fcgi-bin/fcg_bb_mdm_buy';
					opt.data = $.extend({
						actid: opt.actid,
						appid:1450008610,
						from:2,
						pf:'website',
						num:1
					},opt.data);

				}
				// 银壳子
				else if (opt.albumid) {
					opt.url = location.protocol+'//c.y.qq.com/shop/fcgi-bin/fcg_mdm_buy';
					opt.data = $.extend({
						appid:1450008567,
						from:'pc',
						pf:'website',
						num:1,
						type : 2, 		   //1 单曲 2 专辑
						id: opt.albumid //单曲id 专辑id
					},opt.data);
				}

				// 如果是微信用户
				user.isWeiXin() ? user.getWXtoken(gopay) : gopay();
			},

			// 调用minipay支付按钮
			gopay = function (openkey) { 

				opt.data.openid = cookie.get("wxopenid") || user.getUin();
				opt.data.openkey =  openkey || cookie.get('skey');
				 

				jQueryAjax.jsonp({
					url: opt.url,
					data: opt.data,
					success: function (res) {

						if (res.code == 1000 || res.code == 1004) {
							user.openLogin();
							return;
						}
						if (res.code != 0) {
							MUSIC.popup.show('服务器繁忙，请稍后再试!', 3000, 1);
							return;
						}
						var cashier = window.midas.minipay;
						
						var _data = {
							sandbox : '1',
							appid : opt.data.appid,
							openid : opt.data.openid,
							openkey : openkey ? openkey : cookie.get('skey'),
							session_id :  openkey ? 'hy_gameid' : 'uin',
							session_type : openkey ? 'wc_actoken' : 'skey',
							pf : 'website',
							goodstokenurl : res.data.url_params,
							desc_as_name: 1,
							disableSend: true
						};

						if (!cookie.get('FIS_DEBUG')) {
							delete _data.sandbox
						}

						cashier.buyGoods({
							//pos:{x:window.innerWidth/2-340,y:window.innerHeight/2-300+scrollTop},
							hideHeader : false,
							title : '购买数字专辑',
							methods: {
								onNoResult: function () {
								},
								onResize: function (obj) {
								},
								onClose: function () { 
							 	},
								onSuccess : function(){
									UserInfoLocal.clear();
									window.location.reload();
									
								}
							}
						},_data);
						require.async('js/common/dialog.js', function(dialog){
							dialog.hide();
						});

					},
					error:function(err){
						opt.error && opt.error(err);
					}
				});
			}

			if(opt.albumid){
				jQueryAjax.jsonp({
					url: location.protocol+"//c.y.qq.com/shop/fcgi-bin/fcg_album_get_acturl",
					data: {
						albumid : opt.albumid
					},
					success: function (res) {
						if (res.code == 1000) {
							user.openLogin();
							return;
						}
						if(res.data && res.data.actid){
							opt.actid = res.data.actid;
						}
						buy(opt);
					},
					error:function(err){
						opt.error && opt.error(err);

					}
				});
			}else{
				buy(opt);
			}
		});
		/*var albumParam = opts;
		if (albumParam.albumid>0)
		{
			require.async('js/common/dialog.js', function(dialog){
				dialog.show({
					mode : "iframe",
					dialogclass : 'popup_login',
					title : "QQ音乐",
					width :490
				});//http://fusion.qq.com/fusion_loader?max_age=604800&appid=1450001616&platform=qzone
				require.load(location.protocol+'//fusion.qzone.qq.com/fusion_loader?max_age=604800&appid=1450001616&platform=qzone',function(){
					require.load('//y.gtimg.cn/music/live/module/albumbuy.js', function () {
						window.$ = MUSIC.$;
						albumBuy($.extend({
							container: $('#dialogbox')[0],
							title: '购买数字专辑',
							success: function () {
								dialog.hide();
								window.location.reload();
							},
							error: function (err) {
								if (!!err.code&&err.code == 1000)
								{
									dialog.hide();
									user.openLogin();//
								}else
								window.location.reload();
							}
						}, albumParam));
						setTimeout(function(){
							dialog.onReady( 490, 320);
						}, 500);
					});
				});
			});
		}*/
	},
	/**
	 * 获取乐币，支持回调
	 *
	 * @param {Function} callback
	 * @param {Function} errCallback
	 */
	getYbCount : function(dirty, errCallback){
		var me = this;
		cookie.set("ct", 11, '.qq.com', '/', 1);
		cookie.set("cv", 11, '.qq.com', '/', 1);
		var cachedirty = dirty?1:0;
		var url = "//c.y.qq.com/share/fcgi-bin/dmrp_activity/fcg_get_user_lebi_num.fcg?cachedirty="+cachedirty;
		jQueryAjax.json({
			url : url,
			data : {},
			charset : 'utf-8',
			success : function (res) {
				if( !!res && res.code == 0){
					var ybcount = res.data && res.data.yuebinum;
					if(ybcount){
						$('.js_ybcount').text(ybcount);
						$('.identity_logined__data').show();
						$('.identity_logined__name').removeClass('identity_logined__name--center');

					}else{
						$('.identity_logined__data').hide();
						$('.identity_logined__name').addClass('identity_logined__name--center');
					}
				}
				else if (res.code == 200005|| res.code == 1000) {
					me.openLogin();
				}
				!!errCallback && errCallback();
			},
			error : function() {
				!!errCallback && errCallback();
			}
		});
	},
	/**
	 * 购买乐币
	 */
	buyYB : function(aid,pf){
		var _this = this;
		var isWeiXin = _this.isWeiXin(),
			_pf = isWeiXin ? 'wechat_pc-musicweb.yb-html5':'qq_pc-musicweb.yb-html5',
			aid = aid || 'music.pc.20469.yuebi',
			pf = pf || _pf;

		if (!_this.isLogin()) {
			_this.openLogin();
			return false;
		}

		function doBuy(openkey){
			openkey = openkey || cookie.get('skey');

			require.load(location.protocol + '//midas.gtimg.cn/midas/minipay_v2/jsapi/cashier.js', function(){
				midas.minipay.buyGame({
					title : '购买乐币',
					hideHeader : false,
					methods:{
						onSuccess:function(){
							_this.getYbCount(1);
						},
						onError:function(){

						},
						onNoResult:function(){

						},
						onResize:function(obj){

						}
					}

				},{
					sandbox : cookie.get('FIS_DEBUG')?2:0,
					appid : 1450007342,
					openid: cookie.get("wxopenid") || _this.getUin(),
					openkey : openkey,
					session_id :  isWeiXin ? 'hy_gameid' : 'uin',
					session_type : isWeiXin ? 'wc_actoken' : 'skey',
					pf:pf,
					aid : aid,
					buy_quantity : 60,
					goodstokenurl : '',
					zoneid : 1,
					disableSend:true

				});
				require.async('js/common/dialog.js', function(dialog){
					dialog.hide();
				});

			});

		};

		// 判断是否是微信购买
		_this.isWeiXin() ? _this.getWXtoken(doBuy) : doBuy();

	},
	/*
	 * 用户的qzone头像
	 *
	 * @param {Integer} uin 用户的QQ号码
	 * @param {Integer} size 尺寸，取值50，100
	 * @return {String} 用户头像url
	 */
	getQzoneUserImage : function(uin, size){
		//统一改为QQ头像
		return this.getQQUserImage(uin);
		//
		uin = parseInt(uin,10);
		if(uin<10001){
			return "//y.gtimg.cn/mediastyle/global/img/person_300.png";
		} else {
			//return "//qlogo" + (uin%4+1) +".store.qq.com/qzone/" + (uin) + "/" + (uin) +"/"+size;
			return location.protocol + '//c.y.qq.com/rsc/fcgi-bin/fcg_get_qqhead_image.fcg?jump=1&uin=' + uin + '&g_tk=' + music.getACSRFToken();
		}
	},
	/*
	 * 登录用户的QQ头像（302只支持登录用户）
	 *
	 * @param {Integer} uin 用户的QQ号码
	 * @return {String} 用户头像url
	 */
	getQQUserImage : function(uin, callback) {
		
		uin = parseInt(uin, 10) || user.getUin();
		if (!!callback)
		{
			if (uin < 10001) {
				return callback("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000");
			} else {
				var url = "//c.y.qq.com/rsc/fcgi-bin/fcg_get_qqhead_image.fcg?jump=0&uinlist=" + uin + '&rnd=' + Math.random();
				jQueryAjax.jsonp({
					url : url,
					charset : 'utf-8',
					jsonpCallback : 'qqimgcallback',
					success : function(json) {
						var list = [];
						$.each(json.data.urllist, function(idx, item){
							list.push({
								uin : item.uin,
								url : item.url.replace('http://', window.location.protocol+'//')
							});
						});
						if (list.length>0)
						{
							callback(list[0].url);
						}else callback("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000");
					},
					error : function(){
						callback("//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000");
					}
				});  
			}
		}else {
			if (uin < 10001) {
				return "//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000";
			} else {
				return '//c.y.qq.com/rsc/fcgi-bin/fcg_get_qqhead_image.fcg?jump=1&uin=' + uin + '&g_tk=' + cookie.getACSRFToken();
			}
		}
	}
};
window.g_user = user;
return user;

});