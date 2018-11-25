define('js/common/statastic.js', function(require, exports, module){

/**
 * 焦点图轮播组件
 * @author: lunardai
 * @lastModified: 2016/6/16
 * @fileoverview:
 *
 */

var music = require('js/common/music.js'),
	ping = require('js/common/music/ping.js'),
	$ = music.$;
var statistics = {
	gLocation : location.href,
	useropt_stat_fcg_url : '//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_useropt_stat.fcg',
	useropt_stat2_fcg_url : '//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_useropt_stat2.fcg',
	musicportal_stat2_fcg_url : '//c.y.qq.com/portalcgi/fcgi-bin/statistic/cgi_musicportal_stat2.fcg',
	search_src_map : {
		't=100' : 'zong',// 综合
		't=0' : 'music',// 单曲
		't=7' : 'lyric',// 歌词
		't=8' : 'album',// 专辑
		't=12' : 'mv'// MV
	},
	//上报来源
	stat_src_map : [
		{k : /\/toplist\//, v : 'TOPLIST'},	// 排行榜
		{k : /\/album\//, v : 'ALBUM'},	// 专辑
		{k : /\/singerlist\.html/, v : 'SINGERLIST'},	// singer list
		{k : /\/mv\//, v : 'MV'},	// mv
		{k : /\/playlist\//, v : 'PLAYLIST'},	// playlist
		{k : /\/profile\.html/, v : 'PROFILE'},	// 个人主页
		{k : /\/search\.html/, v : 'SEARCH'},	// 搜索
		{k : /\/player\.html/, v : 'PLAYER'},	// 播放器
		{k : /\/singer\//, v : 'SINGER'}	//歌手
	],
	
	/**
	 * PV上报
	 * 
	 */
	
	getVirtualUrl : function(url){
		
		if (url!='')
		{
			return url;
		}else return window.location.href;
	},
	/**
	*动态pv上报
	*
	*/
	doPvg : function(url){
		var domain = "y.qq.com";

		//过滤非法url
		url = (url||"").toString();
		if(!url) {
			return;
		}
		
		url = url.replace(/(http:|https:)\/\/y.qq.com/i, "");
	
		if ((/(http:|https:)\/\//i).test(url)){
			url = url.replace(/http:\/\//i, "");
			domain = url.substring(0, url.indexOf("/"));
			url = url.substring(url.indexOf("/"), url.length);
		}
		url = url.replace(/(\?|#).+/g, "");

		/*var referer = decodeURIComponent(music.util.getUrlParams().referer||"");
		
		if(!!referer) {
			url += "?ADTAG=yqq." + this.getStatSource(referer);
		} else if(/qm_gopage/i.test(document.referrer)) {
			url += "?ADTAG=MUSICCLIENT";
		}*/
if (url=='/')
{
	url = '/portal/index.html'
}
		setTimeout(function(){
			ping.pgvMain("", {
				repeatApplay: "true", 
				virtualURL: url, 
				virtualDomain: domain, 
				reserved2: ("")
			});
		}, 200);
	}, 
	getStatSource : function(url){
		var reg_map = statistics.stat_src_map;

        url = url || window.location.href.replace(/(\?|#).+/g, "").replace(/http:\/\//i, "").replace(/https:\/\//i, "");

		var source = 'OTHER';
		$.each(reg_map, function(i, map) {		
			if (url.search(map.k) > 0) {
				source = map.v;
				return false;
			}
		});
		if (url=='y.qq.com/')
		{
			source = 'INDEX'
		}

		return source;
	},
	/*
	 * 热点按钮点击上报
	 *
	 * @param {String}
	 *			type 按钮代码
	 * @param {String}
	 *			source 频道来源，为空时，接口内部获取
	 * @param {String}
	 *			subSource 频道内部来源
	 */
	pgvClickStat : function(type, source, subSource) {
		if(!type || type == ""){
			return;
		}
		
		source = source || '';
		subSource = subSource || '';
		try {
			if(arguments.length >= 2 && (!source || source == '')){
				source = statistics.getStatSource();
			}

			var hottag = [type.toUpperCase()];
			source && source != '' && hottag.push(source.toUpperCase());
			subSource && subSource != '' && hottag.push(subSource.toUpperCase());
			
			setTimeout(function(){
				ping.pgvSendClick({hottag:hottag.join('.'), virtualDomain:'y.qq.com'});
			}, 200);
		}catch(ign){
		}
	}
};

return statistics;




});