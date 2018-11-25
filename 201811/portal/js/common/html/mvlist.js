define('js/common/html/mvlist.js', function(require, exports, module){

/**
 * mv列表JS
 * @author lunardai 2016/4/27
 * @description 生成MV列表 并进行事件绑定
 *
 */
var MUSIC = require("js/common/music.js");
var $ = MUSIC.$,
	statistics = MUSIC.statistics;

//用于辅助的全局变量
var g_user = MUSIC.user,
	config = {
		specilData : null, 		 //用私有数据，而不是用cgi请求的情况
		specialTpl : null			 //用私有模板，即重载模板
	},
	reportType,//那个页面传过来的数据,用于上报用


	/**
	 * @ namespace mac  
	 */
	mac = {
		
		/*
		*	@ method init
		*	@ params {object} args
		*		param详见上面的config
		*/
		init : function (args, callback) {
			
			//将参数跟config合并
			$.extend(config,args);

			//上报的参数配置 
			reportType = args.reportType;
				
			//生成列表
			mvlist.show();	
			config.callback&&config.callback();
		}
	};
var mvlist = {
	getVid : function(event, name){
		name = name || 'vid';
		var targ = MUSIC.util.getTarget(event);
		var $dom = $(targ).parents('li');
		return $dom.data(name)||'';
	},
	play : function(event){
		event.preventDefault();
		event.stopPropagation();
		var that = this;
		
		var vid = mvlist.getVid(event);
		var type = mvlist.getVid(event, 'type')||0;
		//window.open('//y.qq.com/portal/mv_'+vid+'.html', '_blank');
		MUSIC.util.gotoMvdetail({vid:vid, type: type});
		return false;
	},
	jump : function(event){
		event.preventDefault();
		event.stopPropagation();
		
		var targ = MUSIC.util.getTarget(event);
		var $a = $(targ);
		if (targ.tagName!='A')
		{
			$a = $a.parents('a');
		}
		var albummid = $a.data("albummid"),
			singermid = $a.data("singermid");
		var stat = $a.data('stat')||'', p = {};
		var _linkTar = '';
		if (!!stat)
		{
			p.stat = stat;
		}
		if (!!albummid)
		{
			p.albummid = albummid;
			MUSIC.util.gotoAlbum(p);
		}else if (!!singermid)
		{
			p.singermid = singermid;
			MUSIC.util.gotoSinger(p);
		}
	},
	bindEvents : function(){
		config.container.off('click', '.js_mv').on('click', '.js_mv', function(e, a){
			var stat = $(this).data('stat')||'';
			if (!!stat)
			{
				statistics.pgvClickStat(stat);
			}
			mvlist.play(e);
		}).off('click', 'a.js_album').on('click', 'a.js_album', function(e, a){
			mvlist.jump(e);
		}).off('click', 'a.js_singer').on('click', 'a.js_singer', function(e, a){
			var stat = $(this).data('stat')||'';
			mvlist.jump(e, stat);
		})
		;
	},
	show : function(){
		var template = function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n                    <div class="mod_mv_list">\r\n                        <ul class="mv_list__list">\r\n\t\t\t';
 var list = data.list;for (i = 0; i < list.length; i ++){var mv = list[i]; 
__p+='\r\n                            <li class="mv_list__item" data-vid="'+
((__t=( mv.v_id ))==null?'':__t)+
'" data-id="'+
((__t=( mv.mv_id ))==null?'':__t)+
'">\r\n                                <div class="mv_list__item_box">\r\n                                    <a href="javascript:;" class="mv_list__cover mod_cover js_mv" data-vid="'+
((__t=( mv.v_id ))==null?'':__t)+
'" data-id="'+
((__t=( mv.mv_id ))==null?'':__t)+
'" hidefocus="true">\r\n                                        <img class="mv_list__pic" src="'+
((__t=( mv.mv_pic_url))==null?'':__t)+
'" alt="'+
((__t=( mv.mv_name))==null?'':_.escape(__t))+
'">\r\n                                        <i class="mod_cover__icon_play"></i>\r\n                                    </a>\r\n                                    <h3 class="mv_list__title"><a href="javascript:;" class="js_mv" data-vid="'+
((__t=( mv.v_id ))==null?'':__t)+
'" data-id="'+
((__t=( mv.mv_id ))==null?'':__t)+
'" title="'+
((__t=( mv.mv_name))==null?'':_.escape(__t))+
'">'+
((__t=( mv.mvName_hilight ))==null?'':__t)+
'</a></h3>\r\n                                    <p class="mv_list__singer"><a href="javascript:;" class="js_singer" data-singermid='+
((__t=( mv.singerMID))==null?'':__t)+
' data-singerid="'+
((__t=( mv.singerid))==null?'':__t)+
'" title="'+
((__t=( mv.singer_name ))==null?'':_.escape(__t))+
'">'+
((__t=( mv.singerName_hilight ))==null?'':__t)+
'</a></p>\r\n                                </div>\r\n                            </li>\r\n\t\t\t';
 } 
__p+='\r\n                        </ul>\r\n                    </div>';
return __p;
},
			_html = (config.specialTpl || template)({
				list : config.specilData
			});
		config.container
			.html(_html).find('img').lazyload();	
		mvlist.bindEvents();
	}
};


return mac;

});