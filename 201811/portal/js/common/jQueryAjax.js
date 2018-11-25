define('js/common/jQueryAjax.js', function(require, exports, module){


var $ = require("js/common/music/jquery.js"),
	returnCode = require('js/common/music/returncode.js'),
    cookie = require("js/common/music/cookie.js");
	

function isWeiXin () {
	// 判断是否是有openId 来判断是否是微信用户
	var openId = cookie.get("wxuin")||cookie.get("lwxuin");
	return !!openId;
}
/**
	 * 获取登录QQ号
	 * 
	 * @return {Integer}
	 */
function getUin() {
	if (isWeiXin())
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
}

var jQueryAjax = {
	_opts : {
		url : '',
		data : {
			loginUin :  getUin() || 0,	//登录用户QQ号码
			hostUin : 0,						//被访者QQ号码
			format : 'jsonp',					//cgi返回数据格式：jsonp, json, xml, fs(formsender请求)
			inCharset : 'utf8',				//前台提交数据的字符编码集
			outCharset : 'GB2312',				//指定cgi返回的数据字符编码集
			notice : 0,							//前台是否弹出失败提示信息，0：不需要，1需要
			platform : 'yqq',			//请求来源 （客户端: 'client' 乐库: 'miniportal' yqq: 'yqq' 
												//音乐盒: 'musicbox' 绿钻官网: 'musicvip' 活动: 'activity' 
												//mac QQ音乐：'mac' 电台：'fm' 微音乐: 'weibo' 
												//朋友音乐: 'pengyou' 合作: 'cooperate' 
												//移动终端: 'ios'(ios系统)，andriod(安卓系统) 其他: 'other'）
			//jsonp格式返回时调用的函数名			待确认
			needNewCode : 0 					//是否要返回统一返回码标志0——否（默认），1——是
		},
		jsonpCallback : 'MusicJsonCallback',
		charset : 'GB2312',
		reportRate : 10, // 成功时返回码上报频率
		timeout : 10000	// 超时设置,默认5秒钟
	},
	
	jsonp : function(opts) {
		opts.data = opts.data || {};		
		this._opts.jsonpCallback = 'MusicJsonCallback' + (Math.random() + '').replace('0.', '');
		var prot = $.extend(true, {}, this._opts, opts),
			url = prot.url;
		if(typeof(url) == "string"){
			if(url.indexOf("g_tk=") < 0){
				var jsRE = /\.(js|json)$/i,
					sw, 
					pn;
				pn = (sw = (url.indexOf("?") > -1)) ? url.split('?')[0] : url;
				if(jsRE.lastIndex = 0, !jsRE.test(pn)){
					url += (sw ? "&" : "?") + "g_tk=" + cookie.getACSRFToken();
				}
			}
		}
		prot.url = location.host == 'bk.i.y.qq.com' ? url.replace('i.y.qq.com', 'bk.i.y.qq.com') : url;
		prot.data.outCharset = prot.charset;
		prot.data.format = /json/.test(prot.data.format)? prot.data.format : 'jsonp';
		prot.startTime = +new Date();
		prot.endTime = 0;
		
        // 返回码上报及重试
        var anchor = document.createElement("a");
        anchor.href = prot.url || "";
        var rd = {
            domain: anchor.hostname,
            cgi: anchor.protocol + "//" + anchor.host + anchor.pathname,
            retry: true // 双中心重试
        };
        anchor = null;
        // 非 c.y.qq.com 域名不进行重试
        if (rd.retry) {
            rd.retry = /^(?:sz|sh)?c.y.qq.com$/.test(rd.domain);
        }
		var params = {
			url : prot.url,
			data : prot.data,
			type : "get",
			dataType : "jsonp",
			cache : true,
			scriptCharset : prot.charset,
			jsonp : 'jsonpCallback',
			jsonpCallback : prot.jsonpCallback,
			timeout : prot.timeout
		};
		params.success = function(data){
				prot.endTime = +new Date();
				if (data) {
					rd.code = data.code != null ? data.code : data.retcode;
				}
				// 第一次查询且返回码小于0时进行重试
				if (rd.retry && rd.code < 0 && (!rd.retry_sh || !rd.retry_sz)) {
					rd.needRetry = 1;
				} else {
					typeof prot.success == 'function' && prot.success(data);
					prot.resultArgs = [data];
				}				
			};
		params.error = function(jqXHR, textStatus, errorThrown){
				prot.endTime = +new Date();
				
				// 如果可以重试就先不执行回调
				if (rd.retry && (!rd.retry_sh || !rd.retry_sz)) {
					rd.needRetry = 1;
				} else {
					typeof prot.error == 'function' && prot.error(jqXHR, textStatus, errorThrown);//超时处理通过在error中对textStatus == 'timeout' 情况处理即可
				}
			};
		params.complete = function(jqXHR, textStatus) {
				
				if (rd.retry) {
					// 根据后台返回的area值进行重试，如果没有拿到area值，就随机选一个进行重试
					if (/sh/.test(rd.domain)) {
						rd.area = "sh";
					} else if (/sz/.test(rd.domain)) {
						rd.area = "sz";
					} else {
						rd.area = jqXHR.getResponseHeader && jqXHR.getResponseHeader("area");
					}

					// 双中心重试
					if (rd.needRetry) {
						if (/^sh|sz$/.test(rd.area)) { // 标记已经请求的中心
							rd["time_" + rd.area] = rd.endTime - rd.startTime;
							rd["code_" + rd.area] = rd.code;
							rd["retry_" + rd.area] = 1;
							rd.area = rd.area == "sh" ? "sz" : "sh"; // 切换到另一个中心重试
						} else {
							rd.area = Math.random() < .5 ? "sh" : "sz"; // 获取不到地区时随机选一个重试
						}
						rd["retry_" + rd.area] = 1;
						rd.domain = rd.area + "c.y.qq.com";
						params.url = params.url.replace(/(?:sz|sh)?c.y.qq.com/, rd.domain);

						delete rd.needRetry;
						delete params.beforeSend; // 避免重试时重复触发beforeSend回调
						rd.startTime = + new Date();
						$.ajax(params);
						return;
					}
				}
				// textStatus : "success", "notmodified", "error", "timeout", "abort", or "parsererror"
				var errorCodeMap = {// 自定义error code映射
					'abort' : 601,			//请求中断
					'error' : 602,			//网络链接或服务端错误
					'parsererror' : 603,	//解析错误或4xx 5xx
					'timeout' : 604			//网络连接超时
				};
				prot.statusCode = prot.code = errorCodeMap[textStatus] || 200;
				if (prot.statusCode == 200) {
					prot.code = prot.resultArgs && prot.resultArgs[0] && prot.resultArgs[0].code;
				}
				prot.endTime == 0 && (prot.endTime = +new Date());
				returnCode.report(prot);
			}
		$.ajax(params);
	},
	
	json : function(opts) {
		opts.data = opts.data || {};
		!opts.data.platform && (opts.data.platform = 'yqq.json');
		var prot = $.extend(true, {}, this._opts, opts);
		prot.data.outCharset = prot.charset;
		prot.data.format = 'json';		
		prot.startTime = +new Date();
		prot.endTime = 0;
		prot.url = location.host == 'bk.i.y.qq.com' ? prot.url.replace('i.y.qq.com', 'bk.i.y.qq.com') : prot.url;
		if(typeof(prot.url) == "string"){
			if(prot.url.indexOf("g_tk=") < 0){
				var jsRE = /\.(js|json)$/i,
					sw, 
					pn;
				pn = (sw = (prot.url.indexOf("?") > -1)) ? prot.url.split('?')[0] : prot.url;
				if(jsRE.lastIndex = 0, !jsRE.test(pn)){
					prot.url += (sw ? "&" : "?") + "g_tk=" + cookie.getACSRFToken();
				}
			}
		}
		$.ajax({
			url : prot.url,
			data : prot.data,
			type : "get",
			dataType : "json",
			cache : true,
			xhrFields: {
				withCredentials: true
			},
			timeout : prot.timeout,
			success : function(data){
				prot.endTime = +new Date();
				typeof prot.success == 'function' && prot.success(data);
				prot.resultArgs = [$.extend(data, {code:data["code"]||0, subcode:data["subcode"]||0})];
			},
			error : function(jqXHR, textStatus, errorThrown) {
				prot.endTime = +new Date();
				typeof prot.error == 'function' && prot.error(jqXHR, textStatus, errorThrown);
			},
			complete : function(jqXHR, textStatus) {
				// textStatus : "success", "notmodified", "error", "timeout", "abort", or "parsererror"
				prot.endTime == 0 && (prot.endTime = +new Date());
				prot.statusCode = prot.code = jqXHR.status;				
				if (/* textStatus == 'success' ||  */textStatus == 'notmodified') {
					prot.code = 0;
					prot.resultArgs = [{code:0, subcode:0}];
				}
				if (prot.statusCode == 200) {
					prot.code = prot.resultArgs && prot.resultArgs[0] && prot.resultArgs[0].code;
				}
				returnCode.report(prot);
			}
		});		
	},
	
	post : function(opts) {
		opts.data = opts.data || {};
		!opts.data.platform && (opts.data.platform = 'yqq.post');
		var prot = $.extend(true, {}, this._opts, opts);
		prot.data.outCharset = prot.charset;
		prot.data.format = 'json';		
		prot.data.g_tk = cookie.getACSRFToken();
		prot.startTime = +new Date();
		prot.endTime = 0;
		prot.url = location.host == 'bk.i.y.qq.com' ? prot.url.replace('i.y.qq.com', 'bk.i.y.qq.com') : prot.url;
		prot.url = prot.url+(prot.url.indexOf('?') > -1 ? '&' : '?') + 'g_tk=' + cookie.getACSRFToken();
		$.ajax({
			url : prot.url,
			data : prot.data,
			type : "post",		
			timeout : prot.timeout,
			xhrFields: {
				withCredentials: true
			},
            crossDomain: true,
			success : function(data){
				prot.endTime = +new Date();
				typeof prot.success == 'function' && prot.success(data);
				prot.resultArgs = [$.extend(data, {code:data["code"]||0, subcode:data["subcode"]||0})];
			},
			error : function(jqXHR, textStatus, errorThrown) {
				prot.endTime = +new Date();
				typeof prot.error == 'function' && prot.error(jqXHR, textStatus, errorThrown);
			},
			complete : function(jqXHR, textStatus) {
				// textStatus : "success", "notmodified", "error", "timeout", "abort", or "parsererror"
				prot.endTime == 0 && (prot.endTime = +new Date());
				prot.statusCode = prot.code = jqXHR.status;				
				if (/* textStatus == 'success' ||  */textStatus == 'notmodified') {
					prot.code = 0;
					prot.resultArgs = [{code:0, subcode:0}];
				}
				if (prot.statusCode == 200) {
					prot.code = prot.resultArgs && prot.resultArgs[0] && prot.resultArgs[0].code;
				}
				returnCode.report(prot);
			}
		});		
	},
	iePost : function(opts){
		var name = "yqqcomproxy_iframe";
		opts.data = opts.data || {};
		!opts.data.platform && (opts.data.platform = 'yqq.post');
		var prot = $.extend(true, {}, this._opts, opts);
		prot.data.outCharset = prot.charset;
		prot.data.format = 'json';		
		prot.data.g_tk = cookie.getACSRFToken();
		prot.startTime = +new Date();
		prot.endTime = 0;
		prot.url = location.host == 'bk.i.y.qq.com' ? prot.url.replace('i.y.qq.com', 'bk.i.y.qq.com') : prot.url;
		prot.url = prot.url+(prot.url.indexOf('?') > -1 ? '&' : '?') + 'g_tk=' + cookie.getACSRFToken();
		if (prot.url.indexOf('http://')==-1&&prot.url.indexOf('https://')==-1)
		{
			prot.url = location.protocol+prot.url;
		}
		
		if(location.href.indexOf('//y.qq.com')!=-1){
			document.domain = 'y.qq.com';
		}else {
			document.domain = 'www.qqmusic.com';
		}
		
		var sender = null, durl=/:\/\/([^\/]+)\//i, ma = prot.url.match(durl);
		if ($('#yqqcomproxy_iframe').length<=0)
		{
			sender = document.createElement("iframe");
			
			sender.id = sender.name = name;
			sender.style.cssText = "width:0;height:0;border-width:0;display:none;";
			document.body.appendChild(sender);
		}else sender = document.getElementById(name);
		if (ma.length>1)
		{
			sender.src=location.protocol+'//'+ma[1]+'/proxy.html';
		}
		function onloadCallback(){
			
			document.getElementById(name).contentWindow.$.ajax({
				url : prot.url,
				data : prot.data,
				type : "post",		
				timeout : prot.timeout,
				success : function(data){
					prot.endTime = +new Date();
					typeof prot.success == 'function' && prot.success(data);
					prot.resultArgs = [$.extend(data, {code:data["code"]||0, subcode:data["subcode"]||0})];
				},
				error : function(jqXHR, textStatus, errorThrown) {
					prot.endTime = +new Date();
					typeof prot.error == 'function' && prot.error(jqXHR, textStatus, errorThrown);
				},
				complete : function(jqXHR, textStatus) {
					// textStatus : "success", "notmodified", "error", "timeout", "abort", or "parsererror"
					prot.endTime == 0 && (prot.endTime = +new Date());
					prot.statusCode = prot.code = jqXHR.status;				
					if (/* textStatus == 'success' ||  */textStatus == 'notmodified') {
						prot.code = 0;
						prot.resultArgs = [{code:0, subcode:0}];
					}
					if (prot.statusCode == 200) {
						prot.code = prot.resultArgs && prot.resultArgs[0] && prot.resultArgs[0].code;
					}
					returnCode.report(prot);
				}
			});	
		}
		if (!document.addEventListener)
		{
			sender.attachEvent("onload",function(){
				onloadCallback();
			});
		}else
		sender.onload = function(){
			onloadCallback();
		}
	}
	
};
return jQueryAjax;

});