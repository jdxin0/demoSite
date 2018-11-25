define('js/common/music/ajax.js', function(require, exports, module){

/**
 * @fileoverview AJAX类
 * @author MUSICWebGroup
 * @version 1.0
 */

/**
 * XMLHttpRequest通信器类
 *
 * @class XHR
 * @constructor
 * @namespace XHR
 * @param {String} actionURI 请求地址
 * @param {String} [cname] 对象实体的索引名，默认是"_xhrInstence_n"，n为序号
 * @param {String} [method] 发送方式，除非指明get，否则全部为post
 * @param {Object} [data] hashTable形式的字典
 * @param {Boolean} [isAsync] 是否异步，除非指明同步false,否则全部为异步true
 * @param {Boolean} [nocache] 是否使用缓存数据，默认为false使用缓存数据,指定true则不使用缓存
 * @param {String} [charset] 字符编码方式，默认"gb2312"
 *
 * @exsample var XHR = require('module/music/ajax');
 *           var ajaxLoader = new XHR(REQUEST_URL, null, "GET", null, true, true, "utf-8");
 *           ajaxLoader.onSuccess = function(data){//成功回调}
 *			 ajaxLoader.onError = function(data){//失败回调}
 *
 */

var MUSIC = require('js/common/music.js'),
	returnCode = require('js/common/music/returncode.js'),
	$ = MUSIC.$,
	BASE = require('js/common/music/lib/base.js');

var XHR =  BASE.extend({
	attrs : {
		_tag : 'XHR',
		_charset : 'GB2312'
	},
	/**
	 * XMLHttpRequest通信器类
	 *
	 * @class XHR
	 * @constructor
	 * @namespace XHR
	 * @param {String} actionURI 请求地址
	 * @param {String} [cname] 对象实体的索引名，默认是"_xhrInstence_n"，n为序号
	 * @param {String} [method] 发送方式，除非指明get，否则全部为post
	 * @param {Object} [data] hashTable形式的字典
	 * @param {Boolean} [isAsync] 是否异步，除非指明同步false,否则全部为异步true
	 * @param {Boolean} [nocache] 是否使用缓存数据，默认为false使用缓存数据,指定true则不使用缓存
	 * @param {String} [charset] 字符编码方式，默认"gb2312"
	 */
	initialize: function(actionURL, cname, method, data, isAsync, nocache, charset) {
		if (!cname) {
			cname = "_xhrInstence_" + (XHR.counter + 1);
		}
		/**
		 * 辅助原型
		 *
		 * @type {XHR}
		 */
		var prot;
		if (XHR.instance[cname] instanceof XHR) {
			prot = XHR.instance[cname];
		} else {
			prot = (XHR.instance[cname] = this);
			XHR.counter++;
		}
		prot._name = cname;
		prot._nc = !!nocache;
		prot._method = ($.type(method) != "string" || method.toUpperCase() != "GET")
				? "POST"
				: (method = "GET");
		prot._isAsync = (!(isAsync === false)) ? true : isAsync;
		prot._uri = actionURL;
		prot._data = ($.type(data) == "object" || $.type(data) == 'string') ? data : {};
		prot._sender = null;
		prot._isHeaderSetted = false;
		prot.data = {platform:'mac'};
		// 对外的接口
		/**
		 * 当成功回调时,跨域请求和同域请求返回的数据不一样
		 *
		 * @event
		 * @memberOf XHR
		 */
		this.onSuccess = function(){};

		/**
		 * 当错误回调时,跨域请求和同域请求返回的数据不一样
		 *
		 * @event
		 * @memberOf XHR
		 */
		this.onError = function(){};

		/**
		 * 使用的编码
		 *
		 * @memberOf XHR
		 * @type string
		 */
		this.charset = charset || "gb2312";

		/**
		 * 参数化proxy的路径
		 * @type string
		 */
		this.proxyPath = "";

		this.startTime = +new Date;

		return prot;
		
	},
	/**
	 * 发送请求
	 *
	 * @return {Boolean} 是否成功
	 */
	send : function() {
		if (this._method == 'POST' && this._data == null) {
			//cs.p("XHR -> {0:q}, can't send data 'null'!", this._name);
			return false;
		}

		var u = new MUSIC.util.URI(this._uri);
		if (u == null) {
			//cs.p("XHR -> {0:q}, bad url", this._name);
			return false;
		}

		this._uri = u.href;

		if($.type(this._data)=="object"){
			this._data = XHR.genHttpParamString(this._data, this.charset);
		}

		if(this._method == 'GET' && this._data){
			this._uri += (this._uri.indexOf("?") < 0 ? "?"  : "&") +  this._data;
		}

		//判断是否需要跨域请求数据
		if (u.host != location.host) {
			return XHR.xsend(this, u);
		}

		if (!this._sender) {

			var sender;

			if(window.XMLHttpRequest){
				sender = new XMLHttpRequest();
			}else if(window.ActiveXObject){
				try{
					!(sender = new ActiveXObject("Msxml2.XMLHTTP")) && (sender = new ActiveXObject("Microsoft.XMLHTTP"));
				}catch(ign){}
			}

			if (!sender) {
				//cs.p("XHR -> {0:q}, create xhr object faild!", this._name);
				return false;
			}

			this._sender = sender;
		}

		try {
			this._sender.open(this._method, this._uri, this._isAsync);
		} catch (err) {
			return false;
		}

		if (this._method == 'POST' && !this._isHeaderSetted) {
			this._sender.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this._isHeaderSetted = true;
		}

		if (this._nc) {
			this._sender.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT');
			this._sender.setRequestHeader('Cache-Control', 'no-cache');
		}

		this._sender.onreadystatechange = $.proxy(function() {
			try {
				if (this._sender.readyState == 4) {
					if (this._sender.status >= 200 && this._sender.status < 300) {
						this.onSuccess({
							text : this._sender.responseText,
							xmlDom : this._sender.responseXML
						});
					} else {
						if ($.type(this._sender.status) == 'undefined') {
							this.onError(XHR._errCodeMap[1002]);
						} else {
							this.onError(XHR._errCodeMap[this._sender.status]);
						}
					}
					delete this._sender;
					this._sender = null;
				}
			} catch (err) {
			}
		},this);

		this._sender.send((this._method == 'POST' ? this._data : void(0)));
		return true;
	},
	/**
	 * XHR对象自毁方法，用法 ins=ins.destroy();
	 *
	 * @return {Object} null用来复写引用本身
	 */
	//这个消毁方法没有使用啊，幸好！ ryan
	//XHR.counter的使用有问题，如果是当ID来用的，就不能--，如果是计数来用的，就不能做为frame的id
	//否则可能导致请求丢掉
	destroy : function() {
		var n = this._name;
		delete XHR.instance[n]._sender;
		XHR.instance[n]._sender = null;
		delete XHR.instance[n];
		XHR.counter--;
		return null;
	},
	Statics : {
		instance : {},
		counter : 0,
		_errCodeMap : {
			400 : {
				msg : 'Bad Request'
			},
			401 : {
				msg : 'Unauthorized'
			},
			403 : {
				msg : 'Forbidden'
			},
			404 : {
				msg : 'Not Found'
			},
			999 : {
				msg : 'Proxy page error'
			},
			1000 : {
				msg : 'Bad Response'
			},
			1001 : {
				msg : 'No Network'
			},
			1002 : {
				msg : 'No Data'
			},
			1003 : {
				msg : 'Eval Error'
			}
		},
		/**
		 * 跨域发送请求
		 *
		 * @private
		 * @return {Boolean} 是否成功
		 */
		xsend : function(o, uri) {
			if (!(o instanceof XHR)) {
				return false;
			}
			if (o._sender === null || o._sender === void(0)) {
				var sender = document.createElement("iframe");
				sender.id = "_xsend_frm_" + o._name;
				sender.style.width = sender.style.height = sender.style.borderWidth = "0";
				document.body.appendChild(sender);
				sender.callback = $.proxy(function(data) {
							o.resultArgs = arguments;
							o.onSuccess(data);
							XHR._clear(o);
						},o);
				sender.errorCallback = $.proxy(function(num) {
							o.resultArgs = [{code:num,subcode:num}];
							o.onError(XHR._errCodeMap[num]);
							XHR._clear(o);
						},o);

				o._sender = sender;
			}
			// 获取proxy页面中js库的位置
			o.GBEncoderPath = "//y.gtimg.cn/qzone/v5/toolpages/";

			o._sender.src = uri.protocol + "://" + uri.host + (o.proxyPath
					? o.proxyPath
					: (o.charset.toLowerCase()=='gb2312'?"/xhr_proxy_gbk.html":"/xhr_proxy_utf8.html"));
			return true;
		},
		_clear : function(obj) {
			try {
				obj._sender = obj._sender.callback = obj._sender.errorCallback = obj._sender.onreadystatechange = null;
			} catch (ignore) {
			}

			//if (ua.safari || ua.opera) {
				setTimeout(function(){$("#_xsend_frm_" + obj._name).remove();}, 50);
			//} else {
			//	$("#_xsend_frm_" + obj._name).remove();
			//}
			// 完成了一次请求
			obj.endTime = +new Date;
			XHR._pluginsRunner('onRequestComplete', obj);
			obj.instanceForm = null;
		},
		pluginsPool : {
			 "onErrorHandler" : [],
			 "onRequestComplete" : []
		},
		_pluginsRunner : function(pType, data){
			var _s = XHR,
				l = _s.pluginsPool[pType],
				t = data,
				len;

			if(l && (len = l.length)){
				for(var i = 0; i < len; ++i){
					if(typeof(l[i]) == "function"){
						t = l[i](t);
					}
				}
			}

			return t;
		},
		genHttpParamString : function(o, cs){
			cs = (cs || "gb2312").toLowerCase();
			var r = [];

			for (var i in o) {
				r.push(i + "=" + ((cs == "utf-8") ? encodeURIComponent(o[i]) : URIencode(o[i])));
			}

			return r.join("&");
		}
	}
});
returnCode.attachTo(XHR);
MUSIC.XHR = XHR;

return XHR;


});