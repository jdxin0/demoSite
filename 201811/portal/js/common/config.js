define('js/common/config.js', function(require, exports, module){


/**
 *  MUSIC配置，用来存储MUSIC一些组件需要的参数
 * @namespace MUSIC配置
 */
var config = {
	/**
	 * 调试等级
	 * @type number
	 * @default 0
	 */
	debugLevel : 0,

	/**
	 * dataCenter中cookie存储的默认域名
	 *
	 * @type string
	 * @default "music.qq.com"
	 */
	DCCookieDomain : "y.qq.com",
	dowbload : {},


	
	/**
	 * Storage的helper page
	 *
	 * @type string
	 * @default "//y.gtimg.cn/music/miniportal_v4/tool/html/fp_gbk.html"
	 */
	StorageHelperPage : "//y.gtimg.cn/music/miniportal_v4/tool/html/storage_helper.html"
};
return config;

});