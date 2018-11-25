define('js/common/userAgent.js', function(require, exports, module){

/**
 * 浏览器判断引擎，给程序提供浏览器判断的接口
 * @namespace 浏览器判断引擎
 * @name userAgent
 * @memberOf MUSIC
 */
var ua = {}, agent = navigator.userAgent, nv = navigator.appVersion, r, m, optmz;

/**
 * 调整浏览器的默认行为，使之优化
 * @deprecated 已经不建议显式调用了，由MUSIC初始化时调用
 * @function
 * @static
 * @name adjustBehaviors
 * @memberOf MUSIC.userAgent
 */
ua.adjustBehaviors = function(){};

if (window.ActiveXObject || window.msIsStaticHTML) {//ie (document.querySelectorAll)
	/**
	 * IE版本号，如果不是IE，此值为 NaN
	 * @field
	 * @type number
	 * @static
	 * @name ie
	 * @memberOf MUSIC.userAgent
	 */
	ua.ie = 6;

	/*if(window.XMLHttpRequest || (agent.indexOf('MSIE 7.0') > -1)){(ua.ie = 7);}
	if((agent.indexOf('Trident/4.0') > -1) || (agent.indexOf('MSIE 8.0') > -1)){ (ua.ie = 8);}else
	if(agent.indexOf('Trident/5.0') > -1 || (agent.indexOf('MSIE 9.0') > -1)) { (ua.ie = 9);}
	else if(agent.indexOf('Trident/6.0') > -1 || (agent.indexOf('MSIE 10.0') > -1)) { (ua.ie = 10);}
	else if(agent.indexOf('Trident/7.0') > -1 || 'undefined' == typeof attachEvent) { (ua.ie = 11);}*/
	function IETester(userAgent){
		var UA =  userAgent || navigator.userAgent;
		if(/msie/i.test(UA)){
			return UA.match(/msie (\d+\.\d+)/i)[1];
		}else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
			return UA.match(/rv:(\d+\.\d+)/)[1];
		}
		return false;
	}
	ua.ie = IETester();
	ua.ie = ua.ie?parseInt(ua.ie):6;
	/**
	 * 当前的IE浏览器是否为beta版本
	 * @field
	 * @type boolean
	 * @static
	 * @name isBeta
	 * @memberOf MUSIC.userAgent
	 */
	ua.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf('beta') > -1;

	//一些浏览器行为矫正
	if (ua.ie < 7) {//IE6 背景图强制cache
		try {
			document.execCommand('BackgroundImageCache', false, true);
		} catch (ign) {}
	}

	//创建一个document引用
	ua._doc = document;

	//扩展IE下两个setTime的传参能力
	optmz = function(st){
			return function(fns, tm){
					var aargs;
					if(typeof fns == 'string'){
						return st(fns, tm);
					}else{
						aargs = Array.prototype.slice.call(arguments, 2);
						return st(function(){
								fns.apply(null, aargs);
							}, tm);
					}
				};
		};
	ua._setTimeout = optmz(window.setTimeout);
	ua._setInterval = optmz(window.setInterval);

} else if (document.getBoxObjectFor || typeof(window.mozInnerScreenX) != 'undefined') {
	r = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;

	/**
	 * FireFox浏览器版本号，非FireFox则为 NaN
	 * @field
	 * @type number
	 * @static
	 * @name firefox
	 * @memberOf MUSIC.userAgent
	 */
	ua.firefox = parseFloat((r.exec(agent) || r.exec('Firefox/3.3'))[1], 10);
} else if (!navigator.taintEnabled) {//webkit
	m = /AppleWebKit.(\d+\.\d+)/i.exec(agent);

	/**
	 * Webkit内核版本号，非Webkit则为 NaN
	 * @field
	 * @type number
	 * @static
	 * @name webkit
	 * @memberOf MUSIC.userAgent
	 */
	ua.webkit = m ? parseFloat(m[1], 10) : (document.evaluate ? (document.querySelector ? 525 : 420) : 419);
	
	if ((m = /Chrome.(\d+\.\d+)/i.exec(agent)) || window.chrome) {

		/**
		 * Chrome浏览器版本号，非Chrome浏览器则为 NaN
		 * @field
		 * @type number
		 * @static
		 * @name chrome
		 * @memberOf MUSIC.userAgent
		 */
		ua.chrome = m ? parseFloat(m[1], 10) : '2.0';
	} else if ((m = /Version.(\d+\.\d+)/i.exec(agent)) || window.safariHandler) {

		/**
		 * Safari浏览器版本号，非Safari浏览器则为 NaN
		 * @field
		 * @type number
		 * @static
		 * @name safari
		 * @memberOf MUSIC.userAgent
		 */
		ua.safari = m ? parseFloat(m[1], 10) : '3.3';
	}

	/**
	 * 当前页面是否为air client
	 * @field
	 * @type boolean
	 * @static
	 * @name air
	 * @memberOf MUSIC.userAgent
	 */
	ua.air = agent.indexOf('AdobeAIR') > -1 ? 1 : 0;

	/**
	 * 是否为iPad客户端页面
	 * @field
	 * @type boolean
	 * @static
	 * @name isiPad
	 * @memberOf MUSIC.userAgent
	 */
	ua.isiPad = agent.indexOf('iPad') > -1;

	/**
	 * 是否为iPhone客户端页面
	 * @field
	 * @type boolean
	 * @static
	 * @name isiPhone
	 * @memberOf MUSIC.userAgent
	 */
	ua.isiPhone = agent.indexOf('iPhone') > -1;
} else if (window.opera) {//opera

	/**
	 * Opera浏览器版本号，非Opera则为 NaN
	 * @field
	 * @type number
	 * @static
	 * @name opera
	 * @memberOf MUSIC.userAgent
	 */
	ua.opera = parseFloat(window.opera.version(), 10);
} else {//默认IE6吧
	ua.ie = 6;
}	
//搜狗
ua.sougou = agent.indexOf('SE 2.X') > -1?1:0;
/**
 * 是否为MacOS
 * @field
 * @type boolean
 * @static
 * @name macs
 * @memberOf MUSIC.userAgent
 */
if (!(ua.macs = agent.indexOf('Mac OS X') > -1)) {

	/**
	 * Windows操作系统版本号，不是的话为NaN
	 * @field
	 * @type number
	 * @static
	 * @name windows
	 * @memberOf MUSIC.userAgent
	 */
	ua.windows = ((m = /Windows.+?(\d+\.\d+)/i.exec(agent)), m && parseFloat(m[1], 10));

	/**
	 * 是否Linux操作系统，不是的话为false
	 * @field
	 * @type boolean
	 * @static
	 * @name linux
	 * @memberOf MUSIC.userAgent
	 */
	ua.linux = agent.indexOf('Linux') > -1;
	/**
	 * 是否Android操作系统，不是的话为false
	 *
	 * @field
	 * @type boolean
	 * @static
	 * @name android
	 */
	ua.android = agent.indexOf('Android') > -1;
}
/**
 * 是否iOS操作系统，不是的话为false
 *
 * @field
 * @type boolean
 * @static
 * @name iOS
 */
ua.iOS = agent.indexOf('iPhone OS') > -1;
!ua.iOS && (m = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(agent), ua.iOS = m && m[1] ? true : false);
return ua;

});