define('js/common/music/returncode.js', function(require, exports, module){

/**
 * returnCode模块,JSONGetter和FormSender类需要引入returnCode
 *
 * @exsample returnCode.attachTo(JSONGetter);returnCode.attachTo(FormSender);
 */

var $ = require("js/common/music/jquery.js"),
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

/**
 * 简单get请求发送器
 * @namespace
 * @param {string} url 请求url
 * @param {number} [t = 0] 请求延迟时延，单位ms
 * @param {object} [opts = {}] 可选参数包
 * @param {function} [opts.success = MUSIC.emptyFn] 成功回调
 *     回调模型
 *          param {object} info 回调信息说明
 *          param {number} info.duration 总延迟时间
 *          param {string} info.type 回调类型 'load', 'error', 'timeout' 成功，错误，超时 三类回调
 *         function(info){
 *         }
 * @param {function} [opts.error = MUSIC.emptyFn] 失败回调
 * @param {function} [opts.timeout = MUSIC.emptyFn] 超时回调
 * @param {number} [opts.timeoutValue = opts.timeout ? 5000 : undefined] 超时时间
 *
 */
function pingSender(url, t, opts){
	var _s = pingSender,
		iid,
		img;

	if(!url){
		return;
	}

	opts = opts || {};
	
	iid = "sndImg_" + _s._sndCount++;
	img = _s._sndPool[iid] = new Image();
	img.iid = iid;
	img.onload = img.onerror = img.ontimeout = (function(t){
		return function(evt){
			evt = evt || window.event || { type : 'timeout' };
			void(typeof(opts[evt.type]) == 'function' ? setTimeout(
				(function(et, ti){
					return function(){
						opts[et]({ 'type' : et, 'duration' : ((new Date()).getTime() - ti) });
					};
				})(evt.type, t._s_)
				, 0) : 0);
			pingSender._clearFn(evt, t);
		};
	})(img);

	(typeof(opts.timeout) == 'function') && setTimeout(function(){
					img.ontimeout && img.ontimeout({ type : 'timeout' });
				}, (typeof(opts.timeoutValue) == 'number' ? Math.max(100, opts.timeoutValue) : 5000));

	void((typeof(t) == 'number') ? setTimeout(function(){
		img._s_ = (new Date()).getTime();
		img.src = url;
	}, (t = Math.max(0, t))) : (img.src = url));
};

pingSender._sndPool = {};
pingSender._sndCount = 0;
pingSender._clearFn = function(evt, ref){
	//evt = evt || window.event;
	var _s = pingSender;
	if(ref){
		_s._sndPool[ref.iid] = ref.onload = ref.onerror = ref.ontimeout = ref._s_ = null;
		delete _s._sndPool[ref.iid];
		_s._sndCount--;
		ref = null;
	}
};
var commurl = 'https://huatuocode.weiyun.com/code.cgi'
		, urlParse = /\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/
		, collector = []
		, timer
		, platform = ''
		, isreportG = Math.random() * 1000 < 1 // jsongetter成功时的抽样上报率
		, isreportP = Math.random() * 10 < 1 // formsender成功时的抽样上报率
		, uin = getUin() || 0
		, duration = 1000
		, startReport = 0;
var mapDomain = {//域名映射
	'c.y.qq.com/portalcgi/'		: 'portalcgi.music.qq.com/',
	'c.y.qq.com/qzone/'	        : 'qzone-music.qq.com/',
	'c.y.qq.com/splcloud/'		: 's.plcloud.music.qq.com/',
	'c.y.qq.com/share/'			: 'share.music.qq.com/',
	'c.y.qq.com/soso/'			: 'soso.music.qq.com/',
	'c.y.qq.com/tplcloud/'		: 't.plcloud.music.qq.com/',
	'c.y.qq.com/lyric/'			: 'lyric.music.qq.com/',
	'c.y.qq.com/qqmusic/'		: 'qqmusic.qq.com/',
	'c.y.qq.com/base/'			: 'base.music.qq.com/',
	'c.y.qq.com/rsc/'			: 'rsc.music.qq.com/'
};

// 公共上报
function valueStat(domain, cgi, type, code, time, rate, uin, exts) {
	if(Math.random() > 1 / rate) 
		return;
	var param = [];
	param.push(
		'uin=' + uin,
		'key=' + 'domain,cgi,type,code,time,rate',
		'r=' + Math.random()
	);
	// 如果是数组
	if (typeof exts.unshift == 'function') {
		var i = 0;
		while (exts.length) {
			if (param.join('&').length > 1000) {
				break;
			}
			var c = exts.shift();
			param.push([i + 1, 1].join('_') + '=' + c[0]);
			param.push([i + 1, 2].join('_') + '=' + c[1]);
			param.push([i + 1, 3].join('_') + '=' + c[2]);
			param.push([i + 1, 4].join('_') + '=' + c[3]);
			param.push([i + 1, 5].join('_') + '=' + c[4]);
			param.push([i + 1, 6].join('_') + '=' + c[5]);
			i++;
		}
	}
	if (domain != '' || i > 0) {
		pingSender &&  pingSender(commurl + '?' + param.join('&'), 1000);	
	}
}

function _r() {
	if (collector.length) {
		valueStat('','','','','','',uin, collector);	
	}
	// 间隔1秒钟进行一次上报
	timer = setTimeout(_r, duration);
	duration *= 1.1;
}
function toabs(id) {
	if (!id)
		return '';
	var ret = id;
	if (id.indexOf('://') == 4 || id.indexOf('://') == 5) {
		ret = id;
	}
	else if (id.indexOf('../') === 0) {
		ret = location.protocol + '//' + location.host +  '/' + id.replace(/(?:\.\.\/)*/, location.pathname.split('/').slice(1, -1 * (id.split('../').length)).join('/') + '/' );
	}
	else if(/^[^\/]+\//.test(id) || id.indexOf('./') === 0) {
		if (id.indexOf('./') === 0) {
			id = id.substring(2);
		}
		ret = location.protocol + '//' + location.host + location.pathname.split('/').slice(0, -1).join('/') + '/' + id;
	}
	else if (id.charAt(0) === '/') {
		ret = location.protocol + '//' + location.host + id;
	}
	return ret;
}

module.exports = {
	report : function(th) {
		var cgiUrl = th.url || th._uri || '';
		if (/\.js/.test(cgiUrl)) {
			return;
		}
		
		for (var k in mapDomain) {
			if (cgiUrl.indexOf(k) > -1) {
				cgiUrl = cgiUrl.replace(k, mapDomain[k]);
				break;
			}
		}
		
		var u = toabs(cgiUrl),
			mtch = u.match(urlParse), 
			url = mtch[2], 
			domain = mtch[1];
		
		platform = th.data.platform || '';
		platform != '' && (url += '?' + platform);
		
		// 出现了网络错误
		if (th.statusCode != 200) {
			var type = 2;
			if (th.statusCode == 604 && (location.href.indexOf('i.y.qq.com') < 0 && location.href.indexOf('c.y.qq.com') < 0)) {
				type = 3;
			}
			
			collector.push([domain, url, type, th.statusCode, +th.endTime - th.startTime, 1]);
			if(!startReport){
				startReport = 1;
				_r();
			}
			// 之前的哈勃上报
			// this.haboReport({
			// 	commandid : domain + url,
			// 	resultcode : th.statusCode,
			// 	tmcost : +th.endTime - th.startTime,
			// 	frequency : 1
			// });
			th.reportRate = 1;
			this.haboReport(th);
			return th;
		}

		var d = th.resultArgs;
		if (d && (d = d[0])) {				
			d.code = typeof d.reportcode == 'undefined' ? d.code : d.reportcode;
			if(d.xmlDom){
				d.code = d.xmlDom.getElementsByTagName('reportcode') || d.xmlDom.getElementsByTagName('code') || [{firstChild:{nodeValue:undefined}}];
				d.code = d.code && d.code[0] && d.code[0].firstChild.nodeValue;
				d.subcode = d.xmlDom.getElementsByTagName('subcode') ||  [{firstChild:{nodeValue:undefined}}];
				d.subcode = d.subcode && d.subcode[0] && d.subcode[0].firstChild.nodeValue;
			}				
			// 没有接入公共返回码系统的可以直接返回
			if (typeof d.code == 'undefined') {
				return th;
			} else if (d.code != 0) {// 失败才上报
				collector.push([domain, url, 3, d.subcode || d.code, +th.endTime - th.startTime, 1]);
				
				// this.haboReport({
				// 	commandid : domain + url,
				// 	resultcode : d.code,
				// 	tmcost : +th.endTime - th.startTime,
				// 	frequency : 1
				// });
				th.reportRate = 1;
				this.haboReport(th);
			} else {//成功按1/1000或1/10上报
				if (th.reportRate) {
					if (th.reportRate == 1 || Math.random() < 1 / th.reportRate) {
						collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate]);
						
						// this.haboReport({
						// 	commandid : domain + url,
						// 	resultcode : d.code,
						// 	tmcost : +th.endTime - th.startTime,
						// 	frequency : th.reportRate
						// });
						this.haboReport(th);	
					}
				} else {
					isreportG && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, 1000]);	
				}
			}
		}
		if(!startReport){
			startReport = 1;
			_r();
		}
		return th;
			
	},
	
	/*
	 * 哈勃系统返回码上报统计
	 http://tapd.oa.com/v3/Mobile_monitor/wikis/view/mm%2525E6%25258E%2525A5%2525E5%252585%2525A5%2525E6%25258C%252587%2525E5%2525BC%252595
	 *
	 * @param {object}
	 *	opt = { 
			commandid : 'gdtad',//命令字或uri 需要做翻译注册 http://habo.oa.com/app/appCommand.php?appid=1000217
			resultcode : 0,//返回码 0,1,998等等需要做翻译注册 http://habo.oa.com/app/appCode.php?appid=1000217
			tmcost : now - startTime,//请求耗时 单位是ms
			detail : '',//返回详细信息
			frequency : 1 //上报值为分母，主要用于还原访问次数，成功量按1/20抽样（填20），失败量全量上报（填1）
		}
	 */
	haboReport : function(opt) {
		// var url = 'http://wspeed.qq.com/w.cgi?appid=1000318' + 
		// 			'&releaseversion=PC_' + music.player.getVersion() + 
		// 			'&commandid=' + (opt.commandid || '') + 
		// 			'&resultcode=' + (opt.resultcode || 0) + 
		// 			'&touin=' + (music.user.getUin() || 0) + 
		// 			'&tmcost=' + (opt.tmcost || 0) + 
		// 			'&frequency=' + (opt.frequency || 1) + 
		// 			'&detail=' + (opt.detail || '') + 
		// 			'&rnd=' + new Date().valueOf();
		opt._url = opt._url || opt.url;
		url = location.protocol + '//stat.y.qq.com/ext/fcgi-bin/fcg_web_access_stat.fcg?pid=3&os=windows' +
				'&cgi=' + encodeURIComponent(opt._url.split('?')[0]) +
				'&code=' + opt.code + 
				'&time=' + (opt.time || (opt.endTime - opt.startTime) ||0) + 
				'&rate=' + (opt.reportRate);

		opt.code_sh && (url +=  '&code_sh=' + opt.code_sh);
		opt.code_sz && (url += '&code_sz=' + opt.code_sz);
		opt.time_sh && (url += '&time_sh=' + opt.time_sz);
		opt.time_sz && (url += '&time_sz=' + opt.time_sz);
		opt.area && (url += '&area=' + opt.area);
		
		pingSender &&  pingSender(url, 1200);
	},
	
	attachTo : function(n){
		n.prototype.setReportRate = function (rate) {
			this.reportRate = rate;
		}
		if (n && n.pluginsPool) {
			if (typeof n.pluginsPool.onRequestComplete == 'undefined') {
				n.pluginsPool.onRequestComplete = [];
			}
			n.pluginsPool.onRequestComplete.push(function (th) {
				var cgiUrl = th._uri || th.uri || '';				
				for (var k in mapDomain) {
					if (cgiUrl.indexOf(k) > -1) {
						cgiUrl = cgiUrl.replace(k, mapDomain[k]);
						break;
					}
				}
				
				var u = toabs(cgiUrl),
					mtch = u.match(urlParse), 
					url = mtch[2], 
					domain = mtch[1],
					reportRate = {"JSONGetter" : 1000, "FormSender" : 10, "XHR" : 1000};
				
				platform = (th.data || th.get('_data')).platform || '';
				platform != '' && (url += '?' + platform);

				// 出现了网络错误统一上报个502的状态码
				if (th.msg && th.msg.indexOf('Connection') > -1) {
					collector.push([domain, url, 2, 502, +th.endTime - th.startTime, 1]);
					return th;
				}
				var d = th.resultArgs;
				if (d && (d = d[0])) {				
					d.code = typeof d.reportcode == 'undefined' ? d.code : d.reportcode;
					if(d.xmlDom){
						d.code = d.xmlDom.getElementsByTagName('reportcode') || d.xmlDom.getElementsByTagName('code') || [{firstChild:{nodeValue:undefined}}];
						d.code = d.code && d.code[0] && d.code[0].firstChild.nodeValue;
						d.subcode = d.xmlDom.getElementsByTagName('subcode') ||  [{firstChild:{nodeValue:undefined}}];
						d.subcode = d.subcode && d.subcode[0] && d.subcode[0].firstChild.nodeValue;
					}				
					// 没有接入公共返回码系统的可以直接返回
					if (typeof d.code == 'undefined') {
						return th;
					}
					// 失败才上报
					else if (d.code != 0) {
						collector.push([domain, url, 3, d.subcode || d.code, +th.endTime - th.startTime, 1]);	
					}
					else {
						//成功按1/1000或1/10上报
						reportRate = reportRate[th.get("_tag")] || 1000;
						if (th.reportRate) {
							(th.reportRate == 1 || Math.random() < 1 / th.reportRate) && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || reportRate]);	
						} else {
							isreportG && collector.push([domain, url, 1, d.subcode || 1, +th.endTime - th.startTime, th.reportRate || reportRate]);	
						}
					}
				}
				return th;
			});
			if(!startReport){
				startReport = 1;
				_r();
			}
		}
	}
};



});