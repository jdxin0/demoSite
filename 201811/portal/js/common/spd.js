define('js/common/spd.js', function(require, exports, module){


/*
!!!页面的头部最开始的位置必须要增加这么一段 !!!
window.SPD={_timing:[],_render_start:Date.now(),mark:function(a,b){this._timing[a]=a+"="+((b||Date.now())-this._render_start)}};

使用时需要初始化:
SPD.init({flag:[170,141,3]});

测速推荐配置

1. css加载完毕
2. HTML加载完毕 (白屏时间)
3. 外部js加载完毕
4. 页面可用,js初始化完毕.(可交互时间)
5. domready
6. 专辑图加载完毕
7. 歌词加载完毕
8. 歌曲缓冲时间(如果有自动播放的话)
9. onload

使用方式example:
注意: 所有时间点 都从31开始  1~30 已经被占用
SPD.mark(31); //记录时间点, 是基于页面的最开始的时间点 
SPD.mark(32); //记录
SPD.mark(33); //记录

//记录一个时间段 并上报
SPD.markStart(7);
SPD.markEnd(7); //end时会自动上报 不用手动上报


SPD.init({flag:[170,141,3]}); //初始化 只要在SPD.send之前初始化即可   SPD.send默认会在onload后执行



init以后 会自动在onload时上报  
不init 不上报

如果在onload之后又打了点   需要单独调用SPD.send()上报

 */
var $ = require("js/common/music/jquery.js"),
    cookie = require("js/common/music/cookie.js");
window.SPD = window.SPD || {};
$.extend(SPD,{
	sendFlag : false,
	/**
	 * 获取上报来源
	 *
	 */
	getStatSource : function() {
		var reg_map = {
			'i.y.qq.com/v8/fcg-bin/fcg_first_mac.fcg' : 1,// 首页
			'y.qq.com/portal/singer_list.html' : 2,// 歌手列表页
			'y.qq.com/portal/album_lib.html' : 3,// 专辑库
            "y.qq.com/portal/playlist.html" : 4,//分类歌单
			"y.qq.com/portal/mv_lib.html" : 5,//mv库
            "y.qq.com/n/yqq/mv/v/" : 6//mv播放页


		};
		for (var reg in reg_map) {
			var r = new RegExp(reg);
			if (r.test(window.location.href)){
				return reg_map[reg];
			}else if (window.location.pathname == '/')
			{
				return 1;
			}
		}
		return 99; // 其他
	},
    flag:[], //flag1,2,3
	pointTime:{},
    //时间区间统计 比如统计某个cgi的加载时长
	markStart:function (name,time) {
		this.pointTime[name]=  time || new Date();
	},
	markEnd:function (name,time) {
		if(this.pointTime[name]){//同一个东西 只上报一次 上报后置空
            this._timing[name]= (time||new Date()) - this.pointTime[name];
			this.send();
			this.pointTime[name]=0;
		}
	},
    /*
    上报, 
    可以多次上报, 每次上报后会清空 _timeing
    */
	send :  function (times) {
		this.sendFlag = true;
        var _times= times || this._timing;
        if (!this.flag.length || !_times) {
            return false;
        }
        var t = new Image();

        var params={
			appid: 10013,
            speedparams:this.flag.join('&')+'&'+(_times instanceof Array? _times.join('&') : $.param(_times)),
            platform:'other',
            app:'yqq',
			apn:'unknown'
        }
		//if (location.protocol == 'http:')
	//	{
        t.src = location.protocol+'//stat.y.qq.com/sp/r.png?'+$.param(params);
		//}else
      //  t.src = 'https://huatuo.weiyun.com/report.cgi?'+$.param(params);
        t.onload=t.onerror=function () {
            t=null;
        }
        this._timing={}; //上报之后 清空
	},
    /*
    @method init 
    @param {object} opts
    @example
    SPD.init({
        flag:[170,141,3], //flag1 flag2 flag3
    })
    
    */
    init:function (opts) {
        var self = this;

        if (opts && opts.flag instanceof Array) {

            this.flag.push('flag1='+(opts.flag[0]||0));
            this.flag.push('flag2='+(opts.flag[1]||0));
            this.flag.push('flag3='+(opts.flag[2]||0));
            if (opts.flag[3]) {
                this.flag.push('flag4='+opts.flag[3]);
            }

			function doSend(){
				 var timeList = {};
                    if (window.performance && performance.timing) {//上报网络性能performance 只报4个时间段
                        try {
                            var navigationTime = performance.timing;
                            var field = [ "navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd" ];
                            var startTime = navigationTime.navigationStart;
                            for (var i = 1, j = field.length; i < j; i++) {
                                if (typeof navigationTime[field[i]] != "undefined" && navigationTime[field[i]] > 0) {
                                    var timeMs = navigationTime[field[i]] - startTime;
                                    if (timeMs > 0 && timeMs < 1e5) {
                                        timeList[i] = timeMs;
                                        continue;
                                    }
                                }
                                timeList[i] = 0;
                            }
                            self._timing[28]=navigationTime.connectEnd-navigationTime.connectStart;//TCP建立时间
                            self._timing[29]=navigationTime.responseStart-navigationTime.requestStart;//服务器计算时间, cgi执行时间
                            self._timing[30]=navigationTime.responseEnd-navigationTime.responseStart;//网络传输时间
                        } catch (e) {}
                    }

                    $.extend(self._timing,timeList);
                    SPD.send(); //为了保证load时的打点也能上报  这里延迟一下
			}
            $(window).on('load',function () {

                setTimeout(function () {
                   if (!SPD.sendFlag)
					{
						doSend();
					}
                },100)
            })
			setTimeout(function(){
				if (!SPD.sendFlag)
				{
					doSend();
				}
			}, 2000);
        }
        
    }
});
return SPD;

});