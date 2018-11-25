define('js/common/music/cookie.js', function(require, exports, module){


/**
 * @fileoverview MUSIC cookie数据处理
 * @author MUSICWebGroup
 * @version 1.0
 */
var config = require('js/common/config.js');
/**
 * cookie类,cookie类可以让开发很轻松得控制cookie，我们可以随意增加修改和删除cookie，也可以轻易设置cookie的path, domain, expire等信息
 *
 * @namespace MUSIC.cookie
 */
var cookie = {
	/**
	 * 设置一个cookie,还有一点需要注意的，在qq.com下是无法获取qzone.qq.com的cookie，反正qzone.qq.com下能获取到qq.com的所有cookie.
	 * 简单得说，子域可以获取根域下的cookie, 但是根域无法获取子域下的cookie.
	 * @param {String} name cookie名称
	 * @param {String} value cookie值
	 * @param {String} domain 所在域名
	 * @param {String} path 所在路径
	 * @param {Number} hour 存活时间，单位:小时
	 * @return {Boolean} 是否成功
	 * @example
	 *  MUSIC.cookie.set('value1',MUSIC.dom.get('t1').value,"qzone.qq.com","/v5",24); //设置cookie
	 */
	set : function(name, value, domain, path, hour) {
		if (hour) {
			var expire = new Date();
			expire.setTime(expire.getTime() + 3600000 * hour);
		}
		document.cookie = name + "=" + escape(value) + "; " + (hour ? ("expires=" + expire.toGMTString() + "; ") : "") + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.DCCookieDomain + ";"));
		return true;
	},

	/**
	 * 获取指定名称的cookie值
	 *
	 * @param {String} name cookie名称
	 * @return {String} 获取到的cookie值
	 * @example
	 * 		MUSIC.cookie.get('value1'); //获取cookie
	 */
	get : function(b) {
		//ryan
		//var s = ' ' + document.cookie + ';', pos;
		//return (pos = s.indexOf(' ' + name + '=')) > -1 ? s.slice(pos += name.length + 2, s.indexOf(';', pos)) : '';
		
		//var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"), m = document.cookie.match(r);
		//return (!m ? "" : unescape(m[1]));
		var filterXSS = function(e) {

				if (!e) return e;

				for (; e != unescape(e);) e = unescape(e);

				for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);

				return e

	   };

         var a;

         return filterXSS((a=document.cookie.match(RegExp("(^|;\\s*)"+b+"=([^;]*)(;|$)")))?unescape(a[2]):'')
	},

	/**
	 * 删除指定cookie,复写为过期
	 *
	 * @param {String} name cookie名称
	 * @param {String} domain 所在域
	 * @param {String} path 所在路径
	 * @example
	 * 		MUSIC.cookie.del('value1'); //删除cookie
	 */
	del : function(name, domain, path) {
		document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? ("path=" + path + "; ") : "path=/; ") + (domain ? ("domain=" + domain + ";") : ("domain=" + config.DCCookieDomain + ";"));
	},
	getACSRFToken : function(){
		function _DJB(str) {
			var hash = 5381;

			for(var i = 0, len = str.length; i < len; ++i){
				hash += (hash << 5) + str.charCodeAt(i);
			}

			return hash & 0x7fffffff;
		}
		return _DJB(cookie.get("p_skey") || cookie.get("skey") || cookie.get("p_lskey") || cookie.get("lskey"));
	}
};
return cookie

});