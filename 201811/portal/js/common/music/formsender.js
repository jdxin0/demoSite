define('js/common/music/formsender.js', function(require, exports, module){

/**
 * @fileoverview MUSIC Form Submit Class
 * @author MUSICWebGroup
 * @version 1.0
 */

/**
 * FormSender通信器类,建议写操作使用
 *
 * @param {String} actionURL 请求地址
 * @param {String} [method] 发送方式，除非指明get，否则全部为post
 * @param {Object} [data] hashTable形式的字典
 * @param {String} [charset="gb2312"] 于后台数据交互的字符集
 * @constructor
 * @namespace FormSender
 *
 * cgi返回模板: <html><head><meta http-equiv="Content-Type" content="text/html;
 * charset=gb2312" /></head> <body><script type="text/javascript">
 * document.domain="qq.com"; frameElement.callback({JSON:"Data"}); </script></body></html>
 * @example
 * 		var fs = new FormSender(APPLY_ENTRY_RIGHT,"post",{"hUin": getParameter("uin"),"vUin":checkLogin(),"msg":$("msg-area").value, "rd": Math.random()}, "utf-8");
 *		fs.onSuccess = function(re) {};
 *		fs.onError = function() {};
 *		fs.send();
 *
 */

var $ = require("js/common/music/jquery.js"),
    returnCode = require('js/common/music/returncode.js'),
	ua = require('js/common/userAgent.js'),
	Base = require('js/common/music/lib/base.js'),
	emptyFn = function(){},
	cookie = require('js/common/music/cookie.js'),
	w = window,
	doc = document,
	FSHelperPage = location.protocol+"//imgcache.qq.com/music/miniportal_v4/tool/html/fp_gbk.html";

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
var removeElement = function(elem) {
		if (elem) {
			if(ua.ie > 8 && elem.tagName == "SCRIPT"){
				elem.src = "";
			}
			elem.removeNode ? elem.removeNode(true) : (elem.parentNode && elem.parentNode.removeChild(elem));
		}
		return elem = null;
	};
var FormSender = Base.extend({
	attrs : {
		_tag : 'FormSender'
	},
	
	initialize: function(actionURL, method, data, charset) {
		/**
		 * form的名称，默认为 _fpInstence_ + 计数
		 *
		 * @type string
		 */
		this.name = "_fpInstence_" + FormSender.counter;
		FormSender.instance[this.name] = this;
		FormSender.counter++;

		var c = String(charset).toLowerCase();
		charset = (c == 'utf-8' || c == 'gbk' || c == 'gb2312' || c == 'gb18030') ? c : 'gb2312';
		/**
		 * 数据参数表
		 *
		 * @type object
		 */
		var default_data = {
			loginUin :  getUin(),	//登录用户QQ号码
			hostUin : 0,						//被访者QQ号码
			format : 'fs',						//cgi返回数据格式：jsonp, json, xml, fs(formsender请求)
			inCharset : 'GB2312',				//前台提交数据的字符编码集
			outCharset : 'GB2312',				//指定cgi返回的数据字符编码集
			notice : 0,							//前台是否弹出失败提示信息，0：不需要，1需要
			platform : 'yqq',			//请求来源 （客户端: 'client' 乐库: 'miniportal' yqq: 'yqq' 
												//音乐盒: 'musicbox' 绿钻官网: 'musicvip' 活动: 'activity' 
												//mac QQ音乐：'mac' 电台：'fm' 微音乐: 'weibo' 
												//朋友音乐: 'pengyou' 合作: 'cooperate' 
												//移动终端: 'ios'(ios系统)，andriod(安卓系统) 其他: 'other'）
			needNewCode : 0, 					//是否要返回统一返回码标志0——否（默认），1——是
			g_tk : cookie.getACSRFToken()        //反CSRF token
		}
		$.extend(default_data, FormSender._data);
		if ($.isPlainObject(data)) {	
			$.extend(default_data, data);
		} else if ($.type(data) == "string"){
			var map = {},
				arr = data.split('&');
			for (var i = 0, l = arr.length; i < l; i++) {
				var kv = arr[i].split('=');
				map[kv[0]] = kv[1];
			}		

			$.extend(default_data, map);
		}
		default_data.outCharset = charset;
		(charset == "utf-8") && (default_data.utf8 = 1,default_data.outCharset = 'utf8');
		default_data.inCharset.toLowerCase().indexOf("utf") > -1 && (default_data.inCharset = 'utf8');
		this.charset = charset;
		//FormSender.superclass.initialize.call(this, opts);
		/**
		 * 数据请求地址
		 * 
		 * @type string
		 */
		this.uri = actionURL;
		/**
		 * 数据发送方式
		 * 
		 * @type string
		 */
		this.method = method || "POST";
		this.data = default_data;

		this.proxyURL = (c == "utf-8")
				? FSHelperPage.replace(/_gbk/, "_utf8")
				: FSHelperPage;

		this._sender = null;

		/**
		 * 服务器正确响应时的处理
		 *
		 * @event
		 */
		this.onSuccess = emptyFn;

		/**
		 * 服务器无响应或预定的不正常响应处理
		 *
		 * @event
		 */
		this.onError = emptyFn;
		this.startTime = +new Date;
		
		/**
		 * 返回码上报频率
		 */
		this.reportRate = 1;

	},
	/**
	 * 发送请求
	 *
	 * @return {Boolean} 是否成功
	 */
	send : function() {
		doc.domain = "qq.com";
		//这个检查意义不大，想发空POST就发吧
		/*if (this.method == 'POST' && this.data == null) {
			return false;
		}
		*/ 
		if (this._sender === null || this._sender === void(0)) {
			var timer,
				sender = doc.createElement("iframe");

			sender.id = sender.name = "_fp_frm_" + this.name;
			sender.style.cssText = "width:0;height:0;border-width:0;display:none;";

			sender.callback = (function(th) {
				return function(){
					th.resultArgs = arguments;
					th.msg = 'ok';
					th.onSuccess.apply(th, arguments);
					FormSender._clear(th);
				}
			}) (this);

			var errcallback = (function (th) {
				var f = function () {
					th.resultArgs = arguments;
					th.msg = FormSender._errCodeMap[999].msg;
					FormSender._pluginsRunner('onErrorHandler', th);
					FormSender._clear(th);
					th.onError();
				};
				return function () {
					// th.resultArgs存在则已触发成功回调了
					// ie下如果src没设上则证明是初始化的
					// 非ie如果进入这里则已经证明其出错了
					if (typeof th.resultArgs == 'object') {
						return;
					}
					if (this.readyState == 'complete' || typeof this.readyState == 'undefined') {
						if ('sended'.indexOf(this.state) > -1) {
							this.onload = this.onreadystatechange = null;
							f();
						}
					}
				}
			}) (this);
			
			document.body.appendChild(sender);
			sender.errorCallback = errcallback;
			sender.onload = sender.onreadystatechange = errcallback;
			sender.state = 'initing';
			this._sender = sender;
		}

		
		var t = this, ie = ua.ie, ifrurl, ifrHTML, data = t.data;
		//t.setReportRate && t.setReportRate(1);
		ifrHTML = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + t.charset + '" /><meta charset="' + t.charset + '" />';
		//cs.p("ifrHTML:",ifrHTML);
		if (ie) {
			ifrurl = 'javascript:document.open();document.domain="' + doc.domain + '";var me=parent.MUSIC.FormSender.instance["' + t.name + '"];document.write(me.ifrHTML);document.close();';
		}
		ifrHTML = ifrHTML + '<script type="text/javascript">' + (ie && ('document.charset="' + t.charset + '"')||'') + ';document.domain="' + doc.domain + '";frameElement.submited=void(0);frameElement.state="sending";<\/script><\/head><body>';
		ifrHTML = ifrHTML + '<form action="'+ t.uri + (t.uri.indexOf('?') > -1 ? '&' : '?') + 'g_tk=' + cookie.getACSRFToken() + '" accept-charset="' + t.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + t.charset + '" method="post">';
		ifrHTML = ifrHTML + '<input type="hidden" name="qzreferrer" id="qzreferrer" />';
		ifrHTML = ifrHTML + '<\/form><script type="text/javascript">var me=parent.MUSIC.FormSender.instance["' + t.name + '"],doc=document,f=doc.getElementById("p"),d=me.jsonData,fg=doc.createDocumentFragment();if(typeof d=="string"){var l=d.split("&");for(var i=0;i<l.length;i++){var kv=l[i].split("=");var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=kv[0];ipt.value=decodeURIComponent(kv[1]);fg.appendChild(ipt);}}else{for(var i in d){var ipt=doc.createElement("input");ipt.type="hidden";ipt.name=i;ipt.value=d[i];fg.appendChild(ipt);}}f.appendChild(fg);doc.getElementById("qzreferrer").value=parent.location.href;f.submit();frameElement.submited=true;frameElement.state="sended";<\/script><\/body><\/html>';
		t.ifrHTML = ifrHTML;
		t.ifrurl = ifrurl;
		t.jsonData = data;
		ie ? setTimeout((function (th) {
				return function() {
					th._sender.state = 'inited';
					th._sender.src = (ie > 8 && doc.documentMode > 8)? th.ifrurl : th.proxyURL;
					// th._sender.src = th.proxyURL; // win10下存在乱码问题而ua又不准确，故临时全改为代理方式，
				}
			}) (t), 10) : (sender.src = t.proxyURL);

		

		//this._sender.src = this.proxyURL;
		
		return true;
	},
	//静态属性和方法
	Statics : {
		_data : {
			loginUin :  getUin(),	//登录用户QQ号码
			platform : 'yqq'			//请求来源 （客户端: 'client' 乐库: 'miniportal' yqq: 'yqq' 
												//音乐盒: 'musicbox' 绿钻官网: 'musicvip' 活动: 'activity' 
												//mac QQ音乐：'mac' 电台：'fm' 微音乐: 'weibo' 
												//朋友音乐: 'pengyou' 合作: 'cooperate' 
												//移动终端: 'ios'(ios系统)，andriod(安卓系统) 其他: 'other'）		
		},
		instance : {},
		counter : 0,
		_errCodeMap : {
			999 : {
				msg : 'Connection or Server error'
			}
		},
		pluginsPool : {
			"formHandler" : [],
			"onErrorHandler" : [],
			"onRequestComplete" : []
		},
		_pluginsRunner : function(pType, data){
			var _s = FormSender,
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
		_clear : function(o){
			o._sender = o._sender.callback = o._sender.errorCallback = null;

			if (ua.safari || ua.opera) {
				//setTimeout('MUSIC.dom.removeElement(document.getElementById("_fp_frm_' + o.name + '"))', 50);
				setTimeout(function(){removeElement(doc.getElementById('_fp_frm_' + o.name))}, 50);
			} else {
				removeElement(doc.getElementById("_fp_frm_" + o.name));
			}
			// 完成了一次请求
			o.endTime = +new Date;
			FormSender._pluginsRunner('onRequestComplete', o);
			o.instanceForm = null;
		}
		
	}
});
	
(function(){
	var t = FormSender;
	if(t && t.pluginsPool){
		t.pluginsPool.formHandler.push(function(fm){
			if(fm){
				if(fm.action.indexOf('g_tk') < 0){
					var a = $.trim(fm.action);
					a += (a.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + cookie.getACSRFToken();
					fm.action = a;
				}
			}

			return fm;
		});
	}
})();

returnCode.attachTo(FormSender);

return FormSender;



});