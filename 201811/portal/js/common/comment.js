define('js/common/comment.js', function(require, exports, module){

/**
 * @fileoverview Mac评论组件
 * @author lunardai 2017/10/24
 * @version 1.1
 */


var Music = require("js/common/music.js"),
    Base = require('js/common/music/lib/base.js'),
    $ = Music.$,
    User = Music.widget.user,
	popup = Music.popup,
    jQueryAjax = Music.jQueryAjax,
    replyType,
    gNums = 0,
    gCache = 0, // 缓存当前弹出框数据
    gTopid = 0, // 当前ip
    gReplyDialog = null,
    isEmojiInit = false;
var stat = {
	ct : 24,
	cv : 101010
};
var pgvClickStat = Music.statistics.pgvClickStat;
var Comment = Base.extend({
    attrs: {
        cur_type: 0,// 0是按照最新排序，1是按照热度排序。默认是按照最新
        type: 3,
        topid: 0,// 评论对象ID，如歌单ID，专辑ID等
        cur_page: 0,// 当前评论页
        per_page: 25,// 每页评论数
        total_page: 1,// 总页数
        total_num: 0,
        hot_cur_page: 0,// 当前评论页
        hot_per_page: 10,// 每页评论数
        hot_total_page: 1,// 总页数
        hot_total_num: 0,
        commentid: '',
        lasthotcommentid: '',
        score: 0,
        lastscore: 0,
        container: '.js_cmt_cont',
        outer_container: '.js_layout',
        subSource: "",
        opCallback: $.noop,
        isOnPage: false,
        muscritComment: null,
        muscrittotal: 0,
        hotComment: null,
        hotCommenttotal: 0,
        isMuscritself: 0,
        scrollBar: document,
        auth: 0,
        commentStyle: null, // 默认是在页面上填写，也可以弹窗填写
        replySongName: '' // 评论的歌曲名
    },
    /**
     * 初始化歌曲列表
     *
     * @param {Object} opts
     *            {
	 *				type : 1：单曲  2：专辑  3：歌单  4：排行榜  5：MV,
	 *				topid : 单曲、歌单、专辑id,
	 *				msg_loading : 加载提示信息,
	 *				cur_page	:当前加载的页码，默认第一页为0
	 *				per_page : 每页默认30条评论,
	 *				total_page : 热评总数
	 *				offEvt: 是否先移除绑定在container上的事件, 默认false,适用于一个页面有多个歌曲列表,
	 *				subSource : 公共按钮上报子模块名,
	 *				opCallback : function操作回调
     *              
	 *			}
     */
    initialize: function (opts) {
        var me = this,
            _opts = opts || {};
        
        gNums++;
        $.extend(_opts, opts);

        //把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
        $(opts.container).data("comment", me);

        gTopid = opts.topid;
        Comment.superclass.initialize.call(this, _opts);
        me.setReplyContent();
        me.firstShowComment(_opts.cb);
        me.bindEvents();
        me.initEmojj();
    },
    stringEncode: function (str) {
        return str.replace(/\\n/g,'＼n').HtmlEncode().replace(/\\n|＼n/g,'<br>');
    },
    formatDate: function (unixTime) {
        var curDate = new Date(),
            curDate_y = curDate.getFullYear(),
            curDate_m = curDate.getMonth() + 1,
            curDate_d = curDate.getDate();

        if (unixTime > 0) {
            unixTime = new Date(unixTime * 1000);
            if (unixTime == "Invalid Date") {
                return "";
            }
            var y = unixTime.getFullYear();
            var m = unixTime.getMonth() + 1;
            var d = unixTime.getDate();
            var h = unixTime.getHours();
            var mm = unixTime.getMinutes();
            var str = "";
            if (y != curDate_y) {
                str += y + "年";
            }
            if (y != curDate_y || m != curDate_m || d != curDate_d) {
                str += m + "月" + d + "日 ";
            }
            return str + (h < 10 ? ("0" + h) : h) + ":" + (mm < 10 ? ("0" + mm) : mm);
        } else {
            return ""
        }
    },
    /**
     * 读取评论
     * @param page
     * @param callback
     */
    getCmt: function (opt, callback) {
        var me = this,
            type = me.get('type') || 0;
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
            cid: 205360772,
            reqtype: 2,
            biztype: type,
            topid: me.get('topid') || 0,
            cmd: 8,	// 1-添加；2-查询；3-删除
            needmusiccrit: 0, //是否返回乐评
            pagenum: 0,
            pagesize: opt.cmd == 6?10:(me.get('per_page') || 25),
            lasthotcommentid:opt.cmd == 6?(me.get('lasthotcommentid') || ""): (me.get('lastcommentid') || ""),
			callback : jcb,
            format: 'fs',
            domain: "qq.com"
        };

        $.extend(params, params, opt);
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (o) {
                if (!o || typeof(o) != "object") {
                     popup.show(o.msg, 2000, 1);
                    return false;
                }
				if (!o.uin){
					o.uin = User.getUin();
				}
                callback && callback(o);
            },
            error : function () { 
                popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
    /**
     * 设置翻页数据
     * @param cur_page 当前页码
     * @param firstLoad 首次加载，会加载乐评
     */
    setPager: function (type, page, firstLoad, cb) {
        var me = this,
            per_page = me.get('per_page'),
            total_num = 0,
            cur_page = me.get('cur_page'),
            cur_type = me.get('cur_type'),
            $container = $(me.get('container'));

        if (!firstLoad && type == cur_type && cur_page == page) {
            return;
        }

        // 当tab切换时需要清空当前的lasthotcommentid
        if (cur_type != type) {
            me.set('lasthotcommentid', '');
        }

        me.showPage(type, page, firstLoad, function (res) {
            total_num = me.get('total_num');

            setTimeout(function () {
                if (total_num > per_page) {
					require.async("js/common/music/pager.js", function(pager){
						$(".js_pager_comment").pager({
                            container: ".js_mod_all",
							page : ".js_pager_comment",
                            total: total_num,
                            per: per_page,
                            cur: page + 1,
                            index: 3,
                            ns: 'comment',
                            callback: function (pageno) {
                                me.pgvClickStat('pageturn');
                                me.setPager(type, pageno - 1, false);
                            }
						});

					});
                } else {
                    !!$(".js_pager_comment") && $(".js_pager_comment").hide();
                }
            }, 0);

            me.set('cur_page', page);
            me.set('cur_type', type);

            //require.async('js/common/lib/jquery-plugin/jquery.lazyload.js', function () {
                $("img.js_lazy_comment_pic").lazyload({
                    event: "scroll"
                });
           // });
            
            cb && cb(res);
            if (!firstLoad) {
				$('.js_mod_all')[0].scrollIntoView(true);
            }
        });
    },
    /**
     * 展示某一页数据
     * @param page
     * @param firstLoad
     * @param callback
     */
    showPage: function (type, page, firstLoad, callback) {
        var me = this,
            isAll = false,
            lastscore = 0,
            scrollBar = me.get('scrollBar'),
            $grade = $('.js_reply_grade'),
            $hotTitle = $(".js_hot_title"),
            position = $hotTitle.position(),
            top = (position && position.top) || 0,
            $container = $(me.get('container'));

       // !firstLoad && $(scrollBar) && $(scrollBar).scrollTop(top);

        var opts = {};
        if (firstLoad) {
            // 最新
            opts.cmd = 8;
            opts.needmusiccrit = 0;
        }
        else {
            opts.needmusiccrit = 0;
            if (type == 1) {
                // 最热
                opts.cmd = 9;
            }
        }
        opts.pagenum = page;

        me.getCmt(opts, function (msg) {
            if (msg && msg.comment && msg.comment.commentlist && msg.comment.commentlist.length) {
                var lastCmt = $.extend(true, [], msg.comment.commentlist).pop();
                me.set('lastcommentid', lastCmt && lastCmt.commentid);
                me.set('cur_page', page);
                me.set('cur_type', type);
            }
            if (msg && msg.hot_comment && msg.hot_comment.commentlist && msg.hot_comment.commentlist.length) {
                var lastCmt = $.extend(true, [], msg.hot_comment.commentlist).pop();
                me.set('lasthotcommentid', lastCmt && lastCmt.commentid);
            }

            if(firstLoad){
                lastscore = parseInt(msg.lastscore, 10);
                me.set('auth', msg.auth);
                me.set('blackuin', msg.blackuin);
                me.set('superadmin', msg.superadmin);
                me.set('score', lastscore);
                me.set('lastscore', lastscore);
                $grade.data('cur', lastscore);

                var width = lastscore * 20;
                if (width > 100) {
                    width = 100;
                }
                $grade.width(width + "%");

                if (msg.muscritdouban || msg.muscritzhihu) {
                    me.set('isMuscritself', 0);
                    me.set('muscritComment', $.extend(true, [], msg.muscritdouban || msg.muscritzhihu));
                } else if (msg.muscritself && msg.muscritself.length > 0) {
                    me.set('isMuscritself', 1);
                    me.set('muscritComment', $.extend(true, [], msg.muscritself));
                }

                if (msg.muscrittotal > 0) {
                    me.set('muscrittotal', msg.muscrittotal);
                    me.renderMusicCmt(isAll);
                }

                // 渲染热评
                if (msg.hot_comment && msg.hot_comment.commentlist && msg.hot_comment.commentlist.length > 0) {
                    me.renderHotComment(msg.hot_comment, msg.auth);
                }
            }

            // 渲染全部评论
            me.set('total_num', msg.comment && msg.comment.commenttotal);
            if (msg.comment && msg.comment.commentlist && msg.comment.commentlist.length > 0) {
                me.renderComment(msg.comment, msg.auth);
            }
            else {
                (!$('#js_rule_tip').length) && $container.append('<div class="mod_comment_none">还没有人评论，快来抢沙发吧~</div><p class="comment__rule"><a class="js_rule_btn" href="javascript:;">QQ音乐评论指北</a></p>');
            }
            callback && callback(msg);
        });
    },
    /**
     * 获取用户输入
     * @param params
     * @param callback
     */
    getContent: function (params, callback, errorCallback) {

        function _checkContent(params) {
            var cloneParams = $.extend(true, {}, params),
                nameLength = Music.string.getRealLen(cloneParams.content);
            nameLength = Math.ceil(nameLength / 2);
           
            if (nameLength > 300) {
                err = "超出300字上限";
            } else if (!params.content) {
                err = "请填评论内容";
            }
            if (err) {
                popup.show( err, 2000, 1);
            }
            return err;
        };

        var err = _checkContent(params);
        if (!err) {
            callback && callback(params);
        }else {
			errorCallback && errorCallback();
        }

    },
	checkLogin : function(){
		
        var uin = User.getUin();

        if (!uin) {
            User.openLogin(function(){});
            return false;
        }else {
			return true;
			
        }
	},
    // 发表评论
    sendCmt: function (data, callback, errorCallback) {
		var contentTemp = data.content;
		if ($.trim(contentTemp.replace(/\\n/gi, '')) == ''){
			popup.show("评论不能为空", 2000, 1);
			errorCallback && errorCallback();
			//callback && callback();
			return false;
		}
        var me = this,
            uin = User.getUin();

        if (!uin) {
            User.openLogin(function(){});
            return;
        }

        // data.content = me.stringEncode(data.content);

        function _send(data) {
			var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
            if (!data || data.content == "" || $.trim(data.content) == "期待你的神评论") {
                 popup.show("评论不能为空", 2000, 1);
				 errorCallback && errorCallback();
                return;
            }

            var params = $.extend({
                cid: 205360772,
                cmd: 1,	// 添加评论
                reqtype: 2,// pc客户端传2，以便后台区分平台
                biztype: me.get('type') || 0,
                topid: me.get('topid') || 0,
                format: 'fs',
				callback : jcb,
                domain: "qq.com"
            }, data);
            var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
			$.extend(params, stat);
            jQueryAjax.jsonp({
                url : url,
                data : params,
				jsonpCallback : jcb,
                type : 'post',
                success : function (o) {
                    if (o.code == 0) {
						$('.mod_comment_none').remove();
						if (!!data.commentid){
							Music.popup.show('回复成功！');
						}else {
							Music.popup.show('评论发表成功！');
						}
						params.content = me.stringEncode(params.content);
						o.enable_delete = 1;
						o.uin = uin;
						o.avatarurl = o.avatar;
						o.content = me.stringEncode(data.content);
						o.score = params.score;
						o.commentid = o.newcommentid;
						o.ispraise = 0;
						o.commit_state = typeof o.commit_state == 'undefined'?2:o.commit_state;
						o.is_hot = 1;
						o.praisenum = 0;
						o.praisenum = 0;

						if (data.rootcommentcontent) {
							o.rootcommentcontent = me.parseEmoji(me.stringEncode(data.rootcommentcontent));

							$.each(data.middlecommentcontent,function (i,item) {
								o.middlecommentcontent || (o.middlecommentcontent = []);
								item.subcommentcontent = me.parseEmoji(me.stringEncode(item.subcommentcontent));
								o.middlecommentcontent.push(item);
							});
						}
						else {
							o.rootcommentcontent = me.parseEmoji(me.stringEncode(data.content));
						}

						var timestamp = o.newcommentid.split('_')[3];
						o.time = me.formatDate(timestamp);
						o.loadImmediate = true;
						// 添加到评论列表中
						var $reply = $('.js_cmt_input'),
							$muscrit = $('.js_mod_yueping'),
							$hotCom = $('.js_mod_hot'),
							$allCom = $('.js_mod_all'),
							$target = $reply;

						if ($muscrit.length > 0) {
							$target = $muscrit;
						}

						if ($hotCom.length > 0) {
							$target = $hotCom;
						}
						if ($allCom.length == 0) {
							$target.after(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="mod_all_comment js_mod_all">\r\n\t<div class="comment_type__title c_b_normal">\r\n\t    <h2>最新评论('+
((__t=( data.len ))==null?'':__t)+
')</h2>\r\n\t</div>\r\n    <ul class="comment__list js_all_list">\r\n    </ul>\r\n    ';
if(data.len<=25){
__p+='\r\n    <div class="comment__show_all"><span class="comment__show_all_link c_tx_thin">—— 以上为全部评论 ——</span></div>\r\n    ';
}else{
__p+='\r\n    <div class="mod_page_nav js_pager_comment"></div>\r\n    ';
}
__p+='\r\n</div>';
return __p;
}({len: 1}));$('.js_all_comment_num').html('共1条评论');
						}
						// 渲染评论 不是当前评论
						if (gTopid == me.get('topid')) {
							$('.js_all_list').prepend(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
  var list = data && data.content;
        for (var i = 0, l = list.length; i < l; i++) {
        var item = list[i], isReply = item.middlecommentcontent && item.middlecommentcontent.length > 0, replyText = "";
        item.nick || (item.nick = item.uin);
        item.score = Math.round(item.score);
        
__p+='\r\n<li class="comment__list_item c_b_normal js_cmt_li '+
((__t=( item.enable_delete && data.type == 5 ? ' comment__self' : '' ))==null?'':__t)+
'">\r\n    <a href="javascript:;" class="comment__avatar js_nick" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">\r\n        <img class="js_lazy_comment_pic" data-original="'+
((__t=( Music.fixUrl(item.avatarurl) ))==null?'':__t)+
'" alt="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null" title="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'"';
if (item.loadImmediate) {
__p+=' src="'+
((__t=( item.avatarurl ))==null?'':__t)+
'"';
}
__p+='>\r\n\t';
if(!!item.identity_pic){
__p+='\r\n\t<img class="comment__avatar_icon" src="'+
((__t=( Music.fixUrl(item.identity_pic) ))==null?'':__t)+
'">\r\n\t';
}
__p+='\r\n    </a>\r\n<h4 class="comment__title"><a href="javascript:;" class="c_tx_thin js_nick js_nick_only" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">'+
((__t=( $.trim(item.nick) ))==null?'':_.escape(__t))+
'</a>\r\n    ';
 if (item.vipicon) { 
__p+='\r\n    <span class="vip_icon"><img src="'+
((__t=( Music.fixUrl(item.vipicon) ))==null?'':__t)+
'" alt="绿钻" /></span>\r\n    ';
 } 
__p+='\r\n    ';
 if(item.is_stick){
__p+='\r\n\t<span class="icon_comment icon_comment_top"></span>\r\n    ';
} 
__p+='\r\n</h4>\r\n\r\n';
 if(isReply){ 
__p+='\r\n<p class="c_tx_normal comment__text js_middle js_hot_text">\r\n    ';
 var len = item.middlecommentcontent.length;
    for (var j = 0; j < len; j++) {
    var c = item.middlecommentcontent[j];
    c.replynick || (c.replynick = c.replyuin);
    c.replyednick || (c.replyednick = c.replyeduin);
    var middle = "", second = ""; if(len > 1){ middle = " // "} if(len > 2 && j != len-1){second = " // "}else{second = ""} 
__p+='\r\n    ';
 if( j== 0){ 
__p+='回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a>: <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( middle ))==null?'':__t)+
' ';
 }else{
__p+='\r\n    <a href="javascript:;" class="js_nick js_reply_nick c_tx_current" data-uin="'+
((__t=( c.replyuin ))==null?'':__t)+
'">'+
((__t=( c.replynick ))==null?'':_.escape(__t))+
'</a>  回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a> : <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( second ))==null?'':__t)+
'\r\n    ';
 } }
__p+='\r\n</p>\r\n';
 }else{ 
__p+='\r\n<p class="c_tx_normal comment__text js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n';
 if (isReply) { 
__p+='\r\n<p class="c_tx_normal comment__text c_tx_thin comment__text--history js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n<div class="comment__opt js_comment_opt" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">\r\n    <span class="comment__date c_tx_thin">'+
((__t=( item.time ))==null?'':_.escape(__t))+
'</span>\r\n\t';
 if (item.enable_delete != 1) { 
__p+='\r\n\t<a class="comment__report js_cmt_accusation" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;">举报</a>\r\n\t';
 } 
__p+='\r\n\t';
 if(typeof item.commit_state == 'undefined'){item.commit_state = 2;}
	if (item.commit_state == 0) { 
__p+='\r\n\t<a href="javascript:;" class="comment__link js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">投稿</a>\r\n\t';
}else if( item.commit_state == 1){
__p+='\r\n\t<span class="comment__link c_tx_thin js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">已投稿</span>\r\n\t';
}
__p+='\r\n\r\n    ';
 if (data.superadmin == 1) {
__p+='<a class="comment__good c_tx_thin js_up_comment" href="javascript:;">'+
((__t=( item.is_stick ? '取消置顶' : '置顶'))==null?'':__t)+
'</a>';
}
__p+='\r\n    ';
 if (item.enable_delete == 1) { 
__p+='\r\n    <a class="comment__delete js_cmt_delete icon_comment icon_comment_delete" href="javascript:;">删除</a>\r\n    ';
 } 
__p+='\r\n    \r\n\t';
 if (item.is_hot == 1) { 
__p+='\r\n\t<a class="comment__zan js_cmt_praise '+
((__t=( item.ispraise ? ' done' : '' ))==null?'':__t)+
'" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;"><i class="icon_comment icon_comment_like"></i><span class="js_praise_num">'+
((__t=( item.praisenum ))==null?'':__t)+
'</span></a>\r\n\t<a class="comment__feedback js_feedback icon_comment icon_comment_feedback" href="javascript:;" data-nick="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'" data-cmtid="'+
((__t=( item.commentid ))==null?'':__t)+
'">回复</a>\r\n\t';
}
__p+='\r\n</div>\r\n<div class="js_reply_container"></div>\r\n        </li>\r\n';
 } 
__p+='\r\n';
return __p;
}({content: [o], 'type': me.get('type'), auth: me.get('auth'), uin: User.getUin()}));
						}
						$("img.js_lazy_comment_pic").lazyload({
							event: "scroll"
						});
                        typeof callback == 'function' && callback();
                    } else if (o.code == 1000) {
                        User.openLogin();
                    } else {
                        popup.show(o.msg, 2000, 1);
						errorCallback && errorCallback();
                    }
                },
                error : function () { 
                    popup.show("发表评论失败！网络繁忙，请稍候重试。", 2000, 1);
					errorCallback && errorCallback();
                }
            });
        };

        me.getContent(data, _send, errorCallback);
    },
    // 删除评论
    delCmt: function (commentid) {
        var uin = User.getUin();

        if (!uin) {
            User.openLogin(function(){});
            return;
        }
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
            cid: 205360772,
            cmd: 3,	// 删除评论
            commentid: commentid || '',
			callback : jcb,
            format: 'fs',
            domain: "qq.com"
        };
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (r) {
                if (r.code == 0) {
                    $('.js_comment_opt[data-commentid="' + commentid + '"]').closest('.js_cmt_li').remove();
                    if ($('.js_all_list').children().length == 0) {
                        $('.js_mod_all').remove();
                    }
                    if ($('.js_hot_list').children().length == 0) {
                        $('.js_mod_hot').remove();
                    }

                    popup.show("删除成功", 2000, 300);
                } else if (r.code == 1000) {
                    User.openLogin();
                } else {
                    popup.show(r.msg, 2000, 1);
                }
            },
            error : function () { 
                popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
    // 点赞
    praiseCmt: function (commentid, cmd) {
        var me = this,
            uin = User.getUin();
        if (!uin) {
            User.openLogin(function(){});
            return;
        }
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
            cid: 205360774,
            cmd: cmd,	// 1：赞  2：取消赞 3：选为热评
            reqtype: 2,
            biztype: me.get('type') || 0,
            topid: me.get('topid') || 0,
            commentid: commentid,
            qq: User.getUin(),
			callback : jcb,
            domain: "qq.com"
        };
        me.praiseCmt_sending = true;
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_praise_h5.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (r) {
                if (r.code == 0) {
                    if(r.subcode==15){
                        popup.show(r.msg, 2000, 1);
                    }else{
                        var $o = $('.js_comment_opt .js_cmt_praise[data-commentid="' + commentid + '"]'),
                        $num = $o.find(".js_praise_num").eq(0),
                        num = parseInt($num.text()) + (cmd == 1 ? 1 : -1);
    					$o.html('<i class="icon_comment icon_comment_like"></i><span class="js_praise_num">'+(num > 0 ? num : 0)+'</span>');
                        $o.toggleClass("done", cmd == 1);
                    }
                } else if (r.code == 1000) {
                    User.openLogin();
                } else {
                     popup.show(r.msg, 2000, 1);
                }
                me.praiseCmt_sending = false;
            },
            error : function () {
               me.praiseCmt_sending = false;
               popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
    approveCmt: function (commentid, cmd) {
        var me = this,
            uin = User.getUin();
        if (!uin) {
            User.openLogin(function(){});
            return;
        }
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');

        var params = {
            cmd: cmd,	// 1：赞  2：取消赞 3：选为热评
            comment_id: commentid,
            qq: User.getUin(),
			callback : jcb,
            domain: "qq.com"
        };
        me.approveCmt_sending = true;
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_comment_notice.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (r) {
                if (r.code == 0) {
                    var $o = $('.js_comment_opt[data-commentid="' + commentid + '"] .js_approve');
                    $o.html(cmd == 4 ? '取消通过审核' : '通过审核');
                } else if (r.code == 1000) {
                    User.openLogin();
                } else {
                    popup.show(r.msg, 2000, 1);
                }
                me.approveCmt_sending = false;
            },
            error : function () {
                me.approveCmt_sending = false;
                popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
	//置顶评论
    upCmt: function (commentid, stick_type) {
        var uin = User.getUin(), me = this;

        if (!uin) {
            User.openLogin(function(){});
            return;
        }

        me.upCmt_sending = true;
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
            cid: 205360772,
            cmd: 12,	// 删除评论
            commentid: commentid || '',
			stick_type : stick_type || 1,
			callback : jcb,
            format: 'fs',
            domain: "qq.com"
        };
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (r) {
                if (r.code == 0) {
					//置顶后的一些操作 目前不做操作
                    var $o = $('.js_comment_opt[data-commentid="' + commentid + '"] .js_up_comment');
                    $o.html(stick_type ==  1 ? '取消置顶' : '置顶');
                } else if (r.code == 1000) {
                    User.openLogin();
                } else {
                    popup.show(r.msg, 2000, 1);
                }
				me.upCmt_sending = false;
            },
            error : function () { 
				me.upCmt_sending = false;
                popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
	//举报评论
    reportCmt: function (commentid, title, desc, rptcmd) {
        var uin = User.getUin(), me = this;

        if (!uin) {
            User.openLogin(function(){});
            return;
        }

        me.reportCmt_sending = true;
		var jcb = 'jsoncallback'+(Math.random() + '').replace('0.', '');
        var params = {
            cid: 205360772,
            cmd: 10,	// 举报
            commentid: commentid || '',
			rptcmd : rptcmd || 1,//1. 举报 2. 取消举报 
			rptmsg : title||'其它',
			detailmsg : desc || '',
            format: 'fs',
			callback : jcb,
            domain: "qq.com"
        };
        var url = location.protocol + "//c.y.qq.com/base/fcgi-bin/fcg_global_comment_h5.fcg";
		$.extend(params, stat);
        jQueryAjax.jsonp({
            url : url,
            data : params,
			jsonpCallback : jcb,
            type : 'post',
            success : function (r) {
                if (r.code == 0) {
					//目前不做操作
                   // var $o = $('.js_comment_opt[data-commentid="' + commentid + '"] .js_report_comment');
                  //  $o.html(stick_type ==  1 ? '取消举报' : '举报');
                } else if (r.code == 1000) {
                    User.openLogin();
                } else {
                    popup.show(r.msg, 2000, 1);
                }
				me.reportCmt_sending = false;
            },
            error : function () { 
				me.reportCmt_sending = false;
                popup.show("网络繁忙，请稍候重试。", 2000, 1);
            }
        });
    },
    formatComments: function (commentArr) {
        var me = this,
            item = null;

        for (var i = 0, l = commentArr.length; i < l; i++) {
            item = commentArr[i];
            item.time = me.formatDate(item.time);
        }

        return commentArr || [];
    },
    // 渲染页面
    setReplyContent: function () {
        var me = this,
            container = me.get('container');

        $(container).html(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="part__hd">\r\n        <h2 class="part__tit">评论<span class="c_tx_thin part__tit_desc js_all_comment_num"></span></h2>\r\n    </div>\r\n<div class="mod_comment js_cmt_input">\r\n\r\n<div class="comment__input">\r\n\t<div class="comment__textarea js_comment__textarea  c_bg_normal">\r\n\t\t<div class="comment__textarea_inner">\r\n\t\t\t<!--c_tx_normal-->\r\n                        <!--focus评论框的时候将.comment__textarea_default模块隐藏，同时显示.comment__textarea_input-->\r\n                        <div class="comment__textarea_default c_tx_thin js_reply_text_blur" name="" id="reply_text_blur" contenteditable="true">期待你的神评论……</div>\r\n                        <div class="js_reply_text comment__textarea_input c_tx_normal" name="" id="reply_text" contenteditable="true" style="display:none;"></div>\r\n\t\t</div>\r\n\t\t<!--字数超过后添加comment__tips--warn_tx 去掉c_tx_thin-->\r\n\t\t<div class="comment__tips js_comment_tips c_tx_thin" data-max="300">剩余<span class="c_tx_highlight">300</span>字</div>\r\n\t</div>\r\n\t<a class="comment__face js_cmt_face" href="javascript:;" data-type="reply"><i class="icon_comment icon_comment_face"></i></a>\r\n        <div class="comment__tool"><a href="javascript:;" class="mod_btn_green comment__tool_btn js_send_reply">发表评论</a></div>\r\n\t\r\n</div>\r\n</div>';
return __p;
});
    },
    // 渲染乐评
    renderMusicCmt: function (isAll) {
        var me = this,
            muscritComment = me.get('muscritComment'),
            muscrittotal = me.get('muscrittotal'),
            isMuscritself = me.get('isMuscritself'),
            type = me.get('type'),
            muscritCommentArr = $.extend(true, [], muscritComment) || [],
            $reply = $('.js_cmt_input'),
            $musicFrame = $('.js_mod_yueping'),
            subMuscritComment = [],
            end = 0,
            title = '乐评';

        end = isAll ? muscrittotal : 3;
        subMuscritComment = muscritCommentArr.slice(0, end);
        !isMuscritself && (title = type == 1 ? '知乎乐评' : '豆瓣乐评');

        if ($musicFrame.length == 0) {
            $reply.after(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="mod_yueping js_mod_yueping">\r\n\t<div class="comment_type__title c_b_normal">\r\n\t\t<h2>'+
((__t=( data.title ))==null?'':_.escape(__t))+
'('+
((__t=( data.len ))==null?'':__t)+
')</h2>\r\n\t\t<!-- <a class="comment__control" href="#">管理全部评论&gt;&gt;</a> -->\r\n\t</div>\r\n\t<ul class="comment__list js_yueping_list">\r\n\t</ul>\r\n\t<!-- 展开状态comment__show_all--on -->\r\n\t';
 var allList = "全部乐评(" + data.len + ")"; if(data.len > 3){ 
__p+='\r\n\t<div class="comment__show_all js_all_good_comments">\r\n\t\t<a href="javascript:;" class="comment__show_all_link c_tx_thin">'+
((__t=( allList ))==null?'':_.escape(__t))+
'</a>\r\n\t</div>\r\n\t';
}
__p+='\r\n</div>';
return __p;
}({
                len: muscrittotal,
                isall: isAll,
                title: title
            }));
        }

        for (var i = 0, l = subMuscritComment.length; i < l; i++) {
            subMuscritComment[i].muscritcontent && typeof subMuscritComment[i].muscritcontent == 'string' &&
            (subMuscritComment[i].muscritcontent = me.parseEmoji(me.stringEncode(subMuscritComment[i].muscritcontent)));
        }

        $('.js_yueping_list').html(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 var list = data.content;
for (var i = 0, l = list && list.length; i < l; i++) { var item = list[i]; 
__p+='\r\n<li class="comment__list_item c_b_normal">\r\n\t<div class="comment__avatar">\r\n\t\t<img class="js_lazy_comment_pic"  data-original="'+
((__t=( Music.fixUrl(item.avatarurl) ))==null?'':__t)+
'" alt="'+
((__t=( item.author ))==null?'':_.escape(__t))+
'" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=2592000\';this.onerror=null" title="'+
((__t=( item.author ))==null?'':_.escape(__t))+
'">\r\n\t</div>\r\n\t<h4 class="comment__title c_tx_thin">'+
((__t=( item.title ))==null?'':_.escape(__t))+
'</h4>\r\n\t<p class="comment__text c_tx_normal">'+
((__t=( item.muscritcontent ))==null?'':__t)+
'</p>\r\n\t<p class="comment__more"><a class="c_tx_thin js_show_all" href="javascript:;" data-self="'+
((__t=( data.isMuscritself ))==null?'':__t)+
'" data-detail=\''+
((__t=( data.isMuscritself ? JSON.stringify(item) : item.detailurl ))==null?'':__t)+
'\' data-index="'+
((__t=( i ))==null?'':__t)+
'">查看全文</a>\r\n\t</p>\r\n</li>\r\n';
 } 
__p+='\r\n\r\n';
return __p;
}({
            content: subMuscritComment,
            isMuscritself: isMuscritself
        }));

        //require.async('js/common/lib/jquery-plugin/jquery.lazyload.js', function () {
            $("img.js_lazy_comment_pic").lazyload({
                event: "scroll"
            });
        //});
    },
	//获取更多评论
	getMoreHotComment : function(){
		var me = this;
		me.getCmt({cmd:6, pagesize:me.get("hot_per_page"), pagenum:me.get("hot_cur_page")+1}, function(data){
			$('.js_get_more_hot').data('loading', 0);
			data.comment.more = data.morecomment;
			me.renderHotComment(data.comment, data.auth);
			$("img.js_lazy_comment_pic").lazyload({
                    event: "scroll"
                });
			me.set("hot_cur_page", me.get("hot_cur_page") + 1);
		});
	},
    /**
     *
     * @param comments 评论列表
     * @param auth 是否为当前歌单主人，主人态可以对评论进行通过审核和取消通过审核的操作
     */
    renderHotComment: function (comments, auth) {
        var me = this,
            comment = $.extend(true, [], comments),
            commenttotal = comments.commenttotal,
            commentArr = $.extend(true, [], comments.commentlist) || [],
            $reply = $('.js_cmt_input'),
            $muscrit = $('.js_mod_yueping'),
            $target = $reply,
            $hotCom = $('.js_mod_hot'),
            item = null,
            $container = $(me.get('container'));

        commentArr = me.formatComments(commentArr);

        if ($muscrit.length > 0) {
            $target = $muscrit;
        }
		me.set("hot_total_num", commenttotal);
		var hot_total_num = me.get("hot_total_num"), cur_page = me.get("hot_cur_page"), per_page = me.get("hot_per_page");
        if ($hotCom.length == 0) {
            $target.after(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="mod_comment js_mod_hot">\r\n<div class="mod_hot_comment">\r\n\t<div class="comment_type__title c_b_normal">\r\n\t    <h2>精彩评论('+
((__t=( data.len))==null?'':__t)+
')</h2>\r\n\t</div>\r\n\t<ul class="comment__list js_hot_list">\r\n\t</ul>\r\n        <!-- 展开状态comment__show_all--on -->\r\n        <div class="comment__show_all"><a href="javascript:;" class="comment__show_all_link c_tx_thin js_get_more_hot" style="display:none;">点击加载更多<i class="comment__icon_arrow_down sprite"></i></a> </div>\r\n</div>\r\n</div>';
return __p;
}({len: commenttotal, more:(typeof comments.more == 'undefined')?(hot_total_num>(cur_page+1)*per_page):(comments.more==1)}));
        }
        commenttotal > 0 && me.get('$mod_title') && me.get('$mod_title').text('精彩评论(' + commenttotal + ')');

        var commentShowNum = 0;
        for (var i = 0, l = commentArr.length; i < l; i++) {
            item = commentArr[i];
            if (item.is_hot) {
                commentShowNum++;
            }
            item.rootcommentcontent && typeof item.rootcommentcontent == 'string' && (item.rootcommentcontent = me.parseEmoji(me.stringEncode(item.rootcommentcontent)));
            if (item.middlecommentcontent) {
                for (var j = 0, ll = item.middlecommentcontent.length; j < ll; j++) {
                    var subCmt = item.middlecommentcontent[j].subcommentcontent;
                    subCmt && typeof subCmt == 'string' && (subCmt = me.parseEmoji(me.stringEncode(item.middlecommentcontent[j].subcommentcontent)));
                    item.middlecommentcontent[j].subcommentcontent = subCmt;
                }
            }
        }

        // 渲染评论
        $('.js_hot_list').append(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
  var list = data && data.content;
		for (var i = 0, l = list.length; i < l; i++) {
		var item = list[i], isReply = item.middlecommentcontent && item.middlecommentcontent.length > 0, replyText = "";
		item.nick || (item.nick = item.uin);
		item.score = Math.round(item.score);
		
__p+='\r\n<li class="comment__list_item c_b_normal js_cmt_li '+
((__t=( item.enable_delete && data.type == 5 ? 'comment__self' : '' ))==null?'':__t)+
'">\r\n\t<a href="javascript:;" class="comment__avatar js_nick" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">\r\n\t\t<img class="js_lazy_comment_pic" data-original="'+
((__t=( Music.fixUrl(item.avatarurl) ))==null?'':__t)+
'" alt="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=2592000\';this.onerror=null" title="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'"';
if (item.loadImmediate) {
__p+=' src="'+
((__t=( item.avatarurl ))==null?'':__t)+
'"';
}
__p+='>\r\n\t\t';
if(!!item.identity_pic){
__p+='\r\n\t\t<img class="comment__avatar_icon" src="'+
((__t=( Music.fixUrl(item.identity_pic) ))==null?'':__t)+
'">\r\n\t\t';
}
__p+='\r\n\t</a>\r\n<h4 class="comment__title"><a href="javascript:;" class="c_tx_thin js_nick js_nick_only" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">'+
((__t=( $.trim(item.nick) ))==null?'':_.escape(__t))+
'</a>\r\n\t';
 if (item.vipicon) { 
__p+='\r\n\t<span class="vip_icon"><img src="'+
((__t=( Music.fixUrl(item.vipicon) ))==null?'':__t)+
'" alt="绿钻" /></span>\r\n\t';
 } 
__p+='\r\n\t\r\n    ';
 if(item.is_stick){
__p+='\r\n\t<span class="icon_comment icon_comment_top"></span>\r\n    ';
} 
__p+='\r\n</h4>\r\n\r\n';
 if(isReply){ 
__p+='\r\n<p class="c_tx_normal comment__text js_middle js_hot_text">\r\n\t';
 var len = item.middlecommentcontent.length;
	for (var j = 0; j < len; j++) {
	var c = item.middlecommentcontent[j];
	c.replynick || (c.replynick = c.replyuin);
	c.replyednick || (c.replyednick = c.replyeduin);
	var middle = "", second = ""; if(len > 1){ middle = " // "} if(len > 2 && j != len-1){second = " // "}else{second = ""} 
__p+='\r\n\t';
 if( j== 0){ 
__p+='回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a>: <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( middle ))==null?'':__t)+
' ';
 }else{
__p+='\r\n\t<a href="javascript:;" class="js_nick js_reply_nick c_tx_current" data-uin="'+
((__t=( c.replyuin ))==null?'':__t)+
'">'+
((__t=( c.replynick ))==null?'':_.escape(__t))+
'</a>  回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a> : <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( second ))==null?'':__t)+
'\r\n\t';
 } }
__p+='\r\n</p>\r\n';
 }else{ 
__p+='\r\n<p class="c_tx_normal comment__text js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n';
 if (isReply) { 
__p+='\r\n<p class="c_tx_normal comment__text c_tx_thin comment__text--history js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n<div class="comment__opt js_comment_opt" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">\r\n\t<span class="comment__date c_tx_thin">'+
((__t=( item.time ))==null?'':_.escape(__t))+
'</span>\r\n\t';
 if (item.enable_delete != 1) { 
__p+='\r\n\t<a class="comment__report js_cmt_accusation" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;">举报</a>\r\n\t';
 } 
__p+='\r\n\t';
 if(typeof item.commit_state == 'undefined'){item.commit_state = 2;}
	if (item.commit_state == 0) { 
__p+='\r\n\t<a href="javascript:;" class="comment__link js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">投稿</a>\r\n\t';
}else if( item.commit_state == 1){
__p+='\r\n\t<span class="comment__link c_tx_thin js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">已投稿</span>\r\n\t';
}
__p+='\r\n\r\n\t';
 if (data.superadmin == 1) {
__p+='<a class="comment__good c_tx_thin js_up_comment" href="javascript:;">'+
((__t=( item.is_stick ? '取消置顶' : '置顶'))==null?'':__t)+
'</a>';
}
__p+='\r\n\t';
 if (item.enable_delete == 1) { 
__p+='\r\n\t<a class="comment__delete js_cmt_delete icon_comment icon_comment_delete" href="javascript:;">删除</a>\r\n\t';
 } 
__p+='\r\n\t';
 if (item.is_hot == 1) { 
__p+='\r\n\t<a class="comment__zan js_cmt_praise '+
((__t=( item.ispraise ? ' done' : '' ))==null?'':__t)+
'" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;"><i class="icon_comment icon_comment_like"></i><span class="js_praise_num">'+
((__t=( item.praisenum ))==null?'':__t)+
'</span></a>\r\n\t<a class="comment__feedback js_feedback icon_comment icon_comment_feedback" href="javascript:;" data-nick="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'" data-cmtid="'+
((__t=( item.commentid ))==null?'':__t)+
'">回复</a>\r\n\t';
}
__p+='\r\n</div>\r\n<div class="js_reply_container"></div>\r\n\t\t</li>\r\n';
 } 
__p+='\r\n';
return __p;
}({content: commentArr, 'type': me.get('type'), auth: auth, uin: User.getUin(), blackuin: me.get('blackuin'), superadmin: me.get('superadmin')}));
		if ((typeof comments.more == 'undefined')?(hot_total_num>(cur_page+1)*per_page):(comments.more==1)){
			$('.js_get_more_hot').show();
		}else {
			setTimeout(function(){
				$('.js_get_more_hot').show();
				$('.js_get_more_hot').parent().html('<span class="comment__show_all_link c_tx_thin">精彩评论已加载完毕</span>');
			}, 800);
		}
		
    },
    // 渲染全部评论
    renderComment: function (comments, auth) {
		$('.mod_comment_none').remove();
        var me = this,
            comment = $.extend(true, [], comments),
            commenttotal = comments.commenttotal,
            commentArr = $.extend(true, [], comments.commentlist) || [],
            $reply = $('.js_cmt_input'),
            $muscrit = $('.js_mod_yueping'),
            $hotCom = $('.js_mod_hot'),
            $allCom = $('.js_mod_all'),
            $target = $reply,
            item = null,
            $container = $(me.get('container'));

        if ($muscrit.length > 0) {
            $target = $muscrit;
        }

        if ($hotCom.length > 0) {
            $target = $hotCom;
        }

        commentArr = me.formatComments(commentArr);

        if ($allCom.length == 0) {
            $target.after(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="mod_all_comment js_mod_all">\r\n\t<div class="comment_type__title c_b_normal">\r\n\t    <h2>最新评论('+
((__t=( data.len ))==null?'':__t)+
')</h2>\r\n\t</div>\r\n    <ul class="comment__list js_all_list">\r\n    </ul>\r\n    ';
if(data.len<=25){
__p+='\r\n    <div class="comment__show_all"><span class="comment__show_all_link c_tx_thin">—— 以上为全部评论 ——</span></div>\r\n    ';
}else{
__p+='\r\n    <div class="mod_page_nav js_pager_comment"></div>\r\n    ';
}
__p+='\r\n</div>';
return __p;
}({len: commenttotal}));
			$('.js_all_comment_num').html('共'+commenttotal+'条评论');
        }

        commenttotal > 0 && me.get('$mod_title') && me.get('$mod_title').text('全部评论(' + commenttotal + ')');

        var commentShowNum = 0;
        for (var i = 0, l = commentArr.length; i < l; i++) {
            item = commentArr[i];
            if (item.is_hot) {
                commentShowNum++;
            }
            item.rootcommentcontent && typeof item.rootcommentcontent == 'string' && (item.rootcommentcontent = me.parseEmoji(me.stringEncode(item.rootcommentcontent)));
            if (item.middlecommentcontent) {
                for (var j = 0, ll = item.middlecommentcontent.length; j < ll; j++) {
                    var subCmt = item.middlecommentcontent[j].subcommentcontent;
                    subCmt && typeof subCmt == 'string' && (subCmt = me.parseEmoji(me.stringEncode(item.middlecommentcontent[j].subcommentcontent)));
                    item.middlecommentcontent[j].subcommentcontent = subCmt;
                }
            }
        }

        // 渲染评论
        $('.js_all_list').html(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
  var list = data && data.content;
        for (var i = 0, l = list.length; i < l; i++) {
        var item = list[i], isReply = item.middlecommentcontent && item.middlecommentcontent.length > 0, replyText = "";
        item.nick || (item.nick = item.uin);
        item.score = Math.round(item.score);
        
__p+='\r\n<li class="comment__list_item c_b_normal js_cmt_li '+
((__t=( item.enable_delete && data.type == 5 ? ' comment__self' : '' ))==null?'':__t)+
'">\r\n    <a href="javascript:;" class="comment__avatar js_nick" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">\r\n        <img class="js_lazy_comment_pic" data-original="'+
((__t=( Music.fixUrl(item.avatarurl) ))==null?'':__t)+
'" alt="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" onerror="this.src=\'//y.gtimg.cn/mediastyle/global/img/person_300.png?max_age=2592000\';this.onerror=null" title="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'"';
if (item.loadImmediate) {
__p+=' src="'+
((__t=( item.avatarurl ))==null?'':__t)+
'"';
}
__p+='>\r\n\t';
if(!!item.identity_pic){
__p+='\r\n\t<img class="comment__avatar_icon" src="'+
((__t=( Music.fixUrl(item.identity_pic) ))==null?'':__t)+
'">\r\n\t';
}
__p+='\r\n    </a>\r\n<h4 class="comment__title"><a href="javascript:;" class="c_tx_thin js_nick js_nick_only" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'">'+
((__t=( $.trim(item.nick) ))==null?'':_.escape(__t))+
'</a>\r\n    ';
 if (item.vipicon) { 
__p+='\r\n    <span class="vip_icon"><img src="'+
((__t=( Music.fixUrl(item.vipicon) ))==null?'':__t)+
'" alt="绿钻" /></span>\r\n    ';
 } 
__p+='\r\n    ';
 if(item.is_stick){
__p+='\r\n\t<span class="icon_comment icon_comment_top"></span>\r\n    ';
} 
__p+='\r\n</h4>\r\n\r\n';
 if(isReply){ 
__p+='\r\n<p class="c_tx_normal comment__text js_middle js_hot_text">\r\n    ';
 var len = item.middlecommentcontent.length;
    for (var j = 0; j < len; j++) {
    var c = item.middlecommentcontent[j];
    c.replynick || (c.replynick = c.replyuin);
    c.replyednick || (c.replyednick = c.replyeduin);
    var middle = "", second = ""; if(len > 1){ middle = " // "} if(len > 2 && j != len-1){second = " // "}else{second = ""} 
__p+='\r\n    ';
 if( j== 0){ 
__p+='回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a>: <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( middle ))==null?'':__t)+
' ';
 }else{
__p+='\r\n    <a href="javascript:;" class="js_nick js_reply_nick c_tx_current" data-uin="'+
((__t=( c.replyuin ))==null?'':__t)+
'">'+
((__t=( c.replynick ))==null?'':_.escape(__t))+
'</a>  回复 <a href="javascript:;" class="js_nick js_replyed_nick c_tx_current" data-uin="'+
((__t=( c.replyeduin ))==null?'':__t)+
'">'+
((__t=( c.replyednick ))==null?'':_.escape(__t))+
'</a> : <span class="js_subcomment">'+
((__t=( c.subcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'</span>'+
((__t=( second ))==null?'':__t)+
'\r\n    ';
 } }
__p+='\r\n</p>\r\n';
 }else{ 
__p+='\r\n<p class="c_tx_normal comment__text js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n';
 if (isReply) { 
__p+='\r\n<p class="c_tx_normal comment__text c_tx_thin comment__text--history js_hot_text">';
if(!!item.rootcommentcontent){
__p+=''+
((__t=( item.rootcommentcontent.replace(/\n/gi, '<br>').replace(/\\n/gi, '<br>') ))==null?'':__t)+
'';
}
__p+='</p>\r\n';
 } 
__p+='\r\n<div class="comment__opt js_comment_opt" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">\r\n    <span class="comment__date c_tx_thin">'+
((__t=( item.time ))==null?'':_.escape(__t))+
'</span>\r\n\t';
 if (item.enable_delete != 1) { 
__p+='\r\n\t<a class="comment__report js_cmt_accusation" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;">举报</a>\r\n\t';
 } 
__p+='\r\n\t';
 if(typeof item.commit_state == 'undefined'){item.commit_state = 2;}
	if (item.commit_state == 0) { 
__p+='\r\n\t<a href="javascript:;" class="comment__link js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">投稿</a>\r\n\t';
}else if( item.commit_state == 1){
__p+='\r\n\t<span class="comment__link c_tx_thin js_cmt_contribute" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'">已投稿</span>\r\n\t';
}
__p+='\r\n\r\n    ';
 if (data.superadmin == 1) {
__p+='<a class="comment__good c_tx_thin js_up_comment" href="javascript:;">'+
((__t=( item.is_stick ? '取消置顶' : '置顶'))==null?'':__t)+
'</a>';
}
__p+='\r\n    ';
 if (item.enable_delete == 1) { 
__p+='\r\n    <a class="comment__delete js_cmt_delete icon_comment icon_comment_delete" href="javascript:;">删除</a>\r\n    ';
 } 
__p+='\r\n    \r\n\t';
 if (item.is_hot == 1) { 
__p+='\r\n\t<a class="comment__zan js_cmt_praise '+
((__t=( item.ispraise ? ' done' : '' ))==null?'':__t)+
'" data-commentid="'+
((__t=( item.commentid ))==null?'':__t)+
'" href="javascript:;"><i class="icon_comment icon_comment_like"></i><span class="js_praise_num">'+
((__t=( item.praisenum ))==null?'':__t)+
'</span></a>\r\n\t<a class="comment__feedback js_feedback icon_comment icon_comment_feedback" href="javascript:;" data-nick="'+
((__t=( item.nick ))==null?'':_.escape(__t))+
'" data-uin="'+
((__t=( item.uin ))==null?'':__t)+
'" data-cmtid="'+
((__t=( item.commentid ))==null?'':__t)+
'">回复</a>\r\n\t';
}
__p+='\r\n</div>\r\n<div class="js_reply_container"></div>\r\n        </li>\r\n';
 } 
__p+='\r\n';
return __p;
}({content: commentArr, 'type': me.get('type'), auth: auth, uin: User.getUin(), blackuin: me.get('blackuin'), superadmin: me.get('superadmin')}));
        // 添加评论筛选提示
		$('.js_rule_btn').parent().remove();
        (!$('#js_rule_tip').length) && $container.append('<p class="comment__rule"><a class="js_rule_btn" href="javascript:;">QQ音乐评论指北</a></p>');
        if (commentShowNum > 0) {
            // 如果有 > 0条通过审核的评论，则评论筛选提示文案改成这个
           // $('#js_rule_tip').html('以上评论由QQ音乐筛选后显示');
        }
    },
    firstShowComment: function (cb) {
        var me = this,
            type = me.get('cur_type'),
            page = me.get('cur_page');
        me.setPager(type, page, true, cb);
    },
	lastEditRange : null,
	getCursor : function(){
		return this.lastEditRange?this.lastEditRange.startOffset:0;
	},
	setEmojiCursor : function(edits, emojiInput, beforefunc){
		beforefunc && beforefunc();
		var edit = edits[0];
		var selection = getSelection()
		if (selection.anchorNode.nodeName != '#text') {
			// 如果是编辑框范围。则创建表情文本节点进行插入
			var emojiText = document.createTextNode(emojiInput)
			
			if (edit.childNodes.length > 0) {
				// 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
				for (var i = 0; i < edit.childNodes.length; i++) {
					if (i == selection.anchorOffset) {
						edit.insertBefore(emojiText, edit.childNodes[i])
					}
				}
			} else {
				// 否则直接插入一个表情元素
				edit.appendChild(emojiText)
			}
			// 创建新的光标对象
			var range = document.createRange()
			// 光标对象的范围界定为新建的表情节点
			range.selectNodeContents(emojiText)
			// 光标位置定位在表情节点的最大长度
			range.setStart(emojiText, emojiText.length)
			// 使光标开始和光标结束重叠
			range.collapse(true)
			// 清除选定对象的所有光标对象
			selection.removeAllRanges()
			// 插入新的光标对象
			selection.addRange(range)
		} else{
			// 如果是文本节点则先获取光标对象
			var range = this.lastEditRange||selection.getRangeAt(0)
			// 获取光标对象的范围界定对象，一般就是textNode对象
			var textNode = range.startContainer;
			// 获取光标位置
			var rangeStartOffset = range.startOffset;
			// 文本节点在光标位置处插入新的表情内容
			textNode.insertData(rangeStartOffset, emojiInput)
			// 光标移动到到原来的位置加上新内容的长度
			range.setStart(textNode, rangeStartOffset + emojiInput.length)
			// 光标开始和光标结束重叠
			range.collapse(true)
			// 清除选定对象的所有光标对象
			selection.removeAllRanges()
			// 插入新的光标对象
			selection.addRange(range)
		}
	},
    showTitleNum: function ($text, $tips, hide) {
        var max_num = $tips.data('max');
        var nameLength = Music.string.getRealLen($text.text());
        nameLength = Math.ceil(nameLength / 2);

        if (nameLength <= max_num) {
			$tips.addClass('c_tx_thin');
			$tips.removeClass('comment__tips--warn_tx');
            $tips.html('剩余<span class="c_tx_highlight">' + (max_num - nameLength) + '</span>字');
        } else {
			$tips.removeClass('c_tx_thin');
			$tips.addClass('comment__tips--warn_tx');
            $tips.html('超过<span class="c_tx_highlight">' + (nameLength - max_num) + '</span>字');
        }
		// 获取选定对象
		var selection = getSelection()
		// 设置最后光标对象
		this.lastEditRange = selection.getRangeAt(0);
    },
    showMusicianDetail: function (detail) {
       /* var detailHtml = __inline("/js_tpl/comment/music_cmt_detail.tpl")(detail);

        require.async("js/common/module/ui/dialog.js", function (dialog) {
            dialog.show({
                title: '乐评',
                mode: 'bigpage',
                popup_class: 'mod_popup_yueping',
                width: 528,
                desc: detailHtml
            });
        });*/
		console.log(detailHtml);
    },
    // 模拟confirm
    showConfirm: function (title, desc, btn, cb, cancel) {
		require.async("js/common/dialog.js", function(dialog){
			dialog.show({
				mode : "common",
				title : "QQ音乐",
				icon_type : 2,
				sub_title : title,
				desc : desc,
				button_info1 : {
					highlight : 1,
					title : btn || '确定',
					fn : function() {
						dialog.hide();
						cb && cb();
					}
				},
				button_info2 : {
					highlight : 0,
					title : cancel || "取消",
					fn : function(e){
						dialog.hide();
					}
				}
			});
		});
    },
    parseEmoji : function (val) {
        return val.replace(/&#91;em&#93;e(\d{1,8})(?:,\d{1,3},\d{1,3})?&#91;&#47;em&#93;/gi, function (_0, _1) {
            return "<img src='//y.gtimg.cn/mediastyle/global/emoji/img/e" + _1 + ".png' />";
        }).replace(/\[em(?:2)?\]e(\d{1,8})(?:,\d{1,3},\d{1,3})?\[\/em(?:2)?\]/gi, function (_0, _1) {
            return "<img src='//y.gtimg.cn/mediastyle/global/emoji/img/e" + _1 + ".png' />";
        })
    },
    pgvClickStat: function (type) {
        var me = this;
        pgvClickStat('y_new.'+me.get('subSource') + '.' + type);
    },
    remove : function(){
        var me = this,
            $container = $(me.get("container")),
            $outer_container = $(me.get("outer_container"));

        try {
            $container.data("comment", null);
            $container.remove();
            $outer_container.remove('.js_emoji_dialog');
            me.destroy();
            //CollectGarbage();
        } catch (exp) {}
    },
    initEmojj : function () {
        var emoji_html = '', me = this;
        // 初始化一次。
        if (isEmojiInit) {
            return;
        } 

		emoji_html = (function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='\r\n<!--表情浮层-->\r\n<div class="js_emoji_dialog" style="position:absolute;width:400px;z-index: 999;display:none">\r\n\t<div class="popup_face c_popup">\r\n\t\t<a href="javascript:;" class="popup__close js_emojj_close" title="关闭"><i class="popup__icon_close sprite"></i><i class="icon_txt">关闭</i></a>\r\n\t\t<div class="mod_emoji">\r\n\t\t    <div class="emoji__page">\r\n\t\t    ';
for(var e = 1; e<=66; e++){
__p+='\r\n\t\t\t<a href="javascript:;" class="emoji__item emoji__item'+
((__t=( e ))==null?'':__t)+
' js_emoji" data-key="'+
((__t=( e ))==null?'':__t)+
'"></a>\r\n\t\t    ';
}
__p+='\r\n\t\t    </div>\r\n\t\t</div>\r\n\t</div>\r\n</div>';
return __p;
})({});

		var emoji = {
			"1" : "e400846",//"\uD83D\uDE18",
            "2" : "e400874",//"\uD83D\uDE34",
            "3" : "e400825",//"\uD83D\uDE03",
            "4" : "e400847",//"\uD83D\uDE19",
            "5" : "e400835",//"\uD83D\uDE0D",
            "6" : "e400873",//"\uD83D\uDE33",
            "7" : "e400836",//"\uD83D\uDE0E",
            "8" : "e400867",//"\uD83D\uDE2D",
            "9" : "e400832",//"\uD83D\uDE0A",
            "10" : "e400837",//"\uD83D\uDE0F",
            "11" : "e400875",//"\uD83D\uDE35",
            "12" : "e400831",//"\uD83D\uDE09",
            "13" : "e400855",//"\uD83D\uDE21",
            "14" : "e400823",//"\uD83D\uDE01",
            "15" : "e400862",//"\uD83D\uDE28",
            "16" : "e400844",//"\uD83D\uDE16",
            "17" : "e400841",//"\uD83D\uDE13",
            "18" : "e400830",//"\uD83D\uDE08",
            "19" : "e400828",//"\uD83D\uDE06",
            "20" : "e400833",//"\uD83D\uDE0B",
            "21" : "e400822",//"\uD83D\uDE00",
            "22" : "e400843",//"\uD83D\uDE15",
            "23" : "e400829",//"\uD83D\uDE07",
            "24" : "e400824",//"\uD83D\uDE02",
            "25" : "e400834",//"\uD83D\uDE0C",
            "26" : "e400877",//"\uD83D\uDE37",
            "27" : "e400132",//"\uD83C\uDF49",
            "28" : "e400181",//"\uD83C\uDF7A",
            "29" : "e401067",//"\u2615\uFE0F",
            "30" : "e400186",//"\uD83C\uDF82",
            "31" : "e400343",//"\uD83D\uDC37",
            "32" : "e400116",//"\uD83C\uDF39",
            "33" : "e400126",//"\uD83C\uDF43",
            "34" : "e400613",//"\uD83D\uDC8B",
            "35" : "e401236",//"\u2764\uFE0F",
            "36" : "e400622",//"\uD83D\uDC94",
			"37" : "e400637",//"\uD83D\uDCA3",
            "38" : "e400643",//"\uD83D\uDCA9",
            "39" : "e400773",//"\uD83D\uDD2A",
            "40" : "e400102",//"\uD83C\uDF1B",
            "41" : "e401328",//"\u2600\uFE0F",
            "42" : "e400420",//"\uD83D\uDC4F",
            "43" : "e400914",//"\uD83D\uDE4C",
            "44" : "e400408",//"\uD83D\uDC4D",
            "45" : "e400414",//"\uD83D\uDC4E",
            "46" : "e401121",//"\u270B",
            "47" : "e400396",//"\uD83D\uDC4B",
            "48" : "e400384",//"\uD83D\uDC49",
            "49" : "e401115",//"\u270A",
            "50" : "e400402",//"\uD83D\uDC4C",
            "51" : "e400905",//"\uD83D\uDE48",
            "52" : "e400906",//"\uD83D\uDE49",
            "53" : "e400907",//"\uD83D\uDE4A",
            "54" : "e400562",//"\uD83D\uDC7B",
            "55" : "e400932",//"\uD83D\uDE4F",
            "56" : "e400644",//"\uD83D\uDCAA",
            "57" : "e400611",//"\uD83D\uDC89",
            "58" : "e400185",//"\uD83C\uDF81",
            "59" : "e400655",//"\uD83D\uDCB0",
            "60" : "e400325",//"\uD83D\uDC25",
            "61" : "e400612",//"\uD83D\uDC8A",
            "62" : "e400198",//"\uD83C\uDF89",
            "63" : "e401685",//"\u26A1\uFE0F",
            "64" : "e400631",//"\uD83D\uDC9D",
            "65" : "e400768",//"\uD83D\uDD25",
            "66" : "e400432"//"\uD83D\uDC51"
		};

        // 往前翻
        $('body')

        // 插入图标
        .off('click', '.js_emoji_dialog .js_emoji').on('click', '.js_emoji_dialog .js_emoji', function () {
			//console.log('插入图标'+$(this).data('key'));
			var $comment__input = $(this).parents('.comment__input');
			var word = $(this).data('key');
			if ($('.js_reply_text', $comment__input).length>0) {
				me.setEmojiCursor($('#reply_text'), '[em]' + (word in emoji?emoji[word]:word) + '[/em]', function(){
					$('#reply_text_blur').hide();$('#reply_text').show();$('#reply_text').focus();
				});
				
				me.showTitleNum($('.js_reply_text'), $('.js_comment_tips'));
			}else{
				me.setEmojiCursor($('#replyed_text'), '[em]' + (word in emoji?emoji[word]:word) + '[/em]', function(){
					$('#replyed_text_blur').hide();$('#replyed_text').show();$('#replyed_text').focus();
				});
				me.showTitleNum($('.js_replyed_text'), $('.js_replyed_comment_tips'));
			}
			$('.js_emoji_dialog').hide();
            $('.js_cmt_face').removeClass('comment__face--select');
        })
        
        .on('click', function (e) {
            var $target = $(e.target);
            if ($target.hasClass('js_cmt_face') || $target.parents('.js_cmt_face').length || $target.hasClass('icon_comment_face') || ($target.parents('.js_emoji_dialog').length && !$target.hasClass('js_emojj_close')&&!$target.parents('.js_emojj_close').length)) {
                return;
            }
            $('.js_emoji_dialog').hide();
            $('.js_cmt_face').removeClass('comment__face--select')
        })
        .off("click", ".js_cmt_face").on("click", ".js_cmt_face", function (evt) {
            $(this).addClass('comment__face--select');
			var $comment__input = $(this).parents('.comment__input');
			if ($('.js_emoji_dialog', $comment__input).length==0){
				$(this).after(emoji_html);
			}
			$('.js_emoji_dialog', $comment__input).css({
				top : "152px",
				left : ($comment__input.width()-$('.js_emoji_dialog', $comment__input).width())+'px'
			});
			$('.js_emoji_dialog', $comment__input).show();
        });

        isEmojiInit = true;
    },
    // 初始化事件
    bindEvents: function () {
        var me = this,
            Delegator = me.get('container');
		function blurText($text, cbshow, cbhide){
			if (!!$.trim($text.text())){
				cbshow&&cbshow();
			}else{
				cbhide&&cbhide();
			}
		}
		
		function formatComment($obj){
			var htmls = [];
			$.each($obj.children(), function(idx, item){
				var html = $(item).html();$(item).html(html.replace(/<br><div>/gi, '\\n').replace(/<div>/gi, '\\n').replace(/<\/div>/gi, ''));
				htmls.push($(item).html());
			});
			if ($.trim(htmls.join('\\n')) == ''){
				return $obj.html().replace(/<br><div>/gi, '\\n').replace(/<div>/gi, '\\n').replace(/<\/div>/gi, '');
			}else{
				return $obj.html().split('<div>')[0]+htmls.join('\\n');
			}
		}
        $(Delegator).off("click", ".js_grade_score a").on("click", ".js_grade_score a", function (evt) {
            var score = $(this).data("score") || 0,
                $grade = $(".js_reply_grade"),
                curScore = $grade.data('cur'),
                width = 0;

            width = score * 20;
            if (curScore == score) {
                width = score = 0;
            }

            $grade.data('cur', score);
            me.set('score', parseInt(score, 10));

            if (width > 100) {
                width = 100;
            }
            $grade.width(width + "%");
            me.pgvClickStat('grade');
        }).off("mouseover", ".js_grade_score a").on("mouseover", ".js_grade_score a", function (evt) {
            var score = $(this).data("score") || 0,
                $grade = $(".js_reply_grade"),
                width = 0;

            width = score * 20;
            if (width > 100) {
                width = 100;
            }
            $grade.width(width + "%");
        }).off("mouseout", ".js_grade_score a").on("mouseout", ".js_grade_score a", function (evt) {
            var score = me.get('score') || 0,
                $grade = $(".js_reply_grade"),
                width = 0;

            width = score * 20;
            if (width > 100) {
                width = 100;
            }
            $grade.width(width + "%");
        }).off("click", ".js_nick").on("click", ".js_nick", function (evt) {
            me.pgvClickStat('people');
			MUSIC.util.gotoUser({target: '_blank', uin:$(this).data('uin')});
        }).off("click", ".js_approve").on("click", ".js_approve", function (evt) {
			if (me.checkLogin()){
				var $t = $(this),
					cmtid = $t.parent('.js_comment_opt').data('commentid');
				me.set('commentid', cmtid);
				if (!me.approveCmt_sending) {
					me.approveCmt(cmtid, $t.html() == '通过审核' ? 4 : 5);// cgi的cmd = 4时是选为热评,cmd = 5时是取消选为热评
					me.pgvClickStat('approve');
				}
			}
        }).off("click", ".js_up_comment").on("click", ".js_up_comment", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this),
                cmtid = $t.parent('.js_comment_opt').data('commentid');
			
			me.set('commentid', cmtid);
			if ($t.html() == '取消置顶'){
				if (!me.upCmt_sending) {
					me.upCmt(cmtid, $t.html() == '取消置顶' ? 2 : 1);// 1 ：置顶 2 取消置顶
					me.pgvClickStat('up');
				}
			}else {//title, desc, btn, cb, cancel
				me.showConfirm ('确认置顶此评论？', '置顶后，评论作者将收到通知。', "置顶", function() {
					
					if (!me.upCmt_sending) {
						me.upCmt(cmtid, $t.html() == '取消置顶' ? 2 : 1);// 1 ：置顶 2 取消置顶
						me.pgvClickStat('up');
					}
				}, "关闭");
			}
        }).off("click", ".js_feedback").on("click", ".js_feedback", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this),
                cmtid = $t.data('cmtid'),
                commentStyle = me.get('commentStyle');
            
            me.set('commentid', $t.parent('.js_comment_opt').data('commentid'));

			$('.js_cmt_replyed').remove();

			$t.closest('.js_cmt_li').find('.js_reply_container').html(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class="comment_repeat js_cmt_replyed" data-uin="'+
((__t=( data.uin ))==null?'':__t)+
'" data-cmtid="'+
((__t=( data.cmtid ))==null?'':__t)+
'">\r\n\t<div class="comment__input">\t\t\r\n\t\t\t    <div class="comment__textarea js_comment__textarea c_bg_normal">\r\n\t\t\t\t<div class="comment__textarea_inner">\r\n\t\t\t\t    <!--focus评论框的时候将.comment__textarea_default模块隐藏，同时显示.comment__textarea_input-->\r\n\t\t\t\t    <div class="comment__textarea_default c_tx_thin js_replyed_text_blur" name="" id="replyed_text_blur" contenteditable="true">回复@'+
((__t=( data.nick ))==null?'':_.escape(__t))+
'</div>\r\n\t\t\t\t    <div id="replyed_text" class="js_replyed_text comment__textarea_input c_tx_normal" contenteditable="true" style="display:none;"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class="comment__tips c_tx_thin js_replyed_comment_tips" data-max="300">剩余<span class="c_tx_highlight">300</span>字</div>\r\n\t\t\t    </div>\r\n\t\t<a class="comment__face js_cmt_face" href="javascript:;" data-type="replyed"><i class="icon_comment icon_comment_face"></i></a>\r\n\t\t<div class="comment__tool">\r\n\t\t\t<a class="comment__tool_btn mod_btn_green js_send_replyed" href="javascript:;">回复</a>\r\n\t\t\t<a class="mod_btn comment__tool_btn js_send_cancel" href="javascript:;">取消</a>\r\n\t\t</div>\r\n</div>';
return __p;
}({
				nick: $t.data('nick'),
				uin: $t.data('uin'),
				cmtid: $t.data('cmtid'),
				subSource: me.get('subSource')
			}));
                
        }).off("click", ".js_cmt_praise").on("click", ".js_cmt_praise", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this);

            me.set('commentid', $t.data('commentid'));
            if (!me.praiseCmt_sending) {
                me.praiseCmt(me.get('commentid'), $t.hasClass("done") ? 2 : 1);
                me.pgvClickStat('like');
            }
        }).off("click", ".js_cmt_contribute").on("click", ".js_cmt_contribute", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this);
			if ($t.html().indexOf('已投稿')!=-1){
				popup.show("小编已收到你的投稿啦", 3000, 1);  
				return false;
			}
			var commentid = $t.data('commentid');
            me.set('commentid', commentid);
            
			var o = {};
			o.comment = {
				"method": "UpdateHotComment",
				"module": "GlobalComment.GlobalCommentWriteServer",
				"param": {
					"comment_id": commentid,    // 要操作的评论ID
					"type": 9,                       // 1 选为热评 2 取消热评  3 点赞 4 取消点赞 5. 置顶评论 6 删除评论 7 设置为仅自己可见 8 设置评论ID和手机号绑定 9 评论投稿
					"uin": User.getUin()+''       // 操作者UIN
				}
			  }
			jQueryAjax.post({
				url : '//u.y.qq.com/cgi-bin/musicu.fcg',
				data : JSON.stringify(o),
				charset : 'utf-8',
				success : function (r) {
					r = JSON.parse(r);	
					if (r.code == 0&&r.comment&&r.comment.code==0)
					{
						$t.before('<span class="comment__link c_tx_thin js_cmt_contribute" data-commentid="'+commentid+'">已投稿</span>');	$t.remove();
					}
					popup.show('投稿成功');
				},
				error : function() {
				}
			});
        }).off("click", ".js_cmt_accusation").on("click", ".js_cmt_accusation", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this);
			var commentid = $t.data('commentid');
            me.set('commentid', commentid);
			require.async('js/common/accusation.js', function(accusation){
				accusation.init({
					type : 3,
					msg : commentid
				});
				me.pgvClickStat('report');
			});
        })
		.off("click", ".js_cmt_delete").on("click", ".js_cmt_delete", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
            var $t = $(this);

            me.showConfirm ('确认删除评论？ ', null, "删除", function() {
                me.delCmt($t.parent('.js_comment_opt').data('commentid'));
            },"关闭");
            me.pgvClickStat('delete');
        }).off("click", ".js_all_good_comments").on("click", ".js_all_good_comments", function (evt) {

            var isAll = true;

            me.renderMusicCmt(isAll);
            $('.js_all_good_comments').hide();
            me.pgvClickStat(me.get('isMuscritself') == 1 ? 'qqcriticsall' : (me.get('type') == 1 ? 'zhihucriticsall' : 'doubancriticsall'));
        }).off("click", ".js_show_all").on("click", ".js_show_all", function (evt) {
            var $t = $(this),
                isSelf = $t.data('self'),
                detail = $t.data('detail'),
                newDetail = {};

            if (isSelf) {
                newDetail = $.extend(true, {}, detail);
                if (typeof newDetail.muscritcontent == 'string') {
                    var arr = newDetail.muscritcontent.split(/\r\n/g) || [];
                    newDetail.muscritcontent = $.extend(true, [], arr);
                }
                me.pgvClickStat('qqcritics');
                me.showMusicianDetail(newDetail);
            } else {
                me.pgvClickStat(me.get('type') == 1 ? 'zhihucritics' : 'doubancritics');
                window.location.href=detail;
            }
        }).off("keyup propertychange input", ".js_reply_text").on("keyup propertychange input", ".js_reply_text", function (evt) {
            me.showTitleNum($('.js_reply_text'), $('.js_comment_tips'));
        }).off("keyup propertychange input", ".js_replyed_text").on("keyup propertychange input", ".js_replyed_text", function (evt) {
            me.showTitleNum($('.js_replyed_text'), $('.js_replyed_comment_tips'));
        }).off("keyup propertychange input", ".js_comment__textarea").on("keyup propertychange input", ".js_comment__textarea", function (evt) {
            me.showTitleNum($('.comment__textarea_input', $(this)), $('.comment__tips', $(this)));
        })
		
		.on("click", "", function(e){
			var $target = $(e.target);
				var $p = null;
			if ($target.hasClass('js_comment__textarea')||$target.parents('.js_comment__textarea').length>0) {
				if ($target.hasClass('js_comment__textarea')){
					$p = $target;
				}else {
					$p = $target.parents('.js_comment__textarea')
				}
				$('.comment__textarea_default', $p).hide();$('.comment__textarea_input', $p).show();$('.comment__textarea_input', $p).focus();
				me.showTitleNum($('.comment__textarea_input', $p), $('.comment__tips', $p));
			}else{
				blurText($('.comment__textarea_input'), function(){}, function(){
					$('.comment__textarea_default').show();$('.comment__textarea_input').hide();//$('.js_comment_tips').hide();
				});
			}
			/*if (!$target.hasClass('js_cmt_replyed')&&$target.parents('.js_cmt_replyed').length==0&&!$target.hasClass('js_feedback')){
				$('.js_cmt_replyed').hide();
			}*/
		}).on("blur", ".js_reply_text", function(e){
			blurText($('#reply_text'), function(){}, function(){
				$('#reply_text_blur').show();$('#reply_text').hide();//$('.js_comment_tips').hide();
			});
		}).on("blur", ".js_replyed_text", function(e){
			setTimeout(function(){
				blurText($('#replyed_text'), function(){}, function(){
					$('#replyed_text_blur').show();$('#replyed_text').hide();//$('.js_replyed_comment_tips').hide();
				});
			}, 100);
		}).off("click", ".js_send_reply").on("click", ".js_send_reply", function(){
			if (!me.checkLogin()){
				return false;
			}
			//$('#reply_text_blur').show();$('#reply_text').hide();//$('.js_comment_tips').hide();
			var $text = $('#reply_text');
			$text.html(formatComment($text));
			var text = $text.text(), $this = $text;
			
			var $replyTxt = $('.js_reply_text'), data = {content: text || '', score: me.get('score')};

			me.sendCmt(data, function () {
				$this.html('');
				//me.showTitleNum($this, $('.js_comment_tips'), true);
				$('#reply_text_blur').show();$('#reply_text').hide();//$('.js_comment_tips').hide();
			}, function(){
				$text.html($text.html().replace(/\\n/gi, '<div><br></div>'));
			});
			me.pgvClickStat('comment');
		}).off("click", ".js_send_replyed").on("click", ".js_send_replyed", function (evt) {
			if (!me.checkLogin()){
				return false;
			}
			var $this = $('#replyed_text'), text = $this.text();
			//$('#replyed_text_blur').show();$('#replyed_text').hide();//$('.js_replyed_comment_tips').hide();
			$this.html(formatComment($this));
			
			
			var $t = $this,
				$li = $t.parents('.js_cmt_li'),
				data = {
					content: text || '',
					commentid: $this.parents('.js_cmt_replyed').data('cmtid'),
					score: me.get('score')
				};
			data.middlecommentcontent = [];
			var currNick = $li.find('.js_nick_only').html();
			var currUin = $li.find('.js_nick_only').data('uin');
			var middlecomm = {
				replynick: true,
				replyuin: true,
				replyednick: currNick,
				replyeduin: currUin,
				subcommentcontent: data.content
			};

			data.middlecommentcontent.push(middlecomm);

			if ($li.find('.comment__text--history').length > 0) {
				data.rootcommentcontent = $li.find('.comment__text--history').html();
				var $list = $li.find('.js_middle .js_nick');
				middlecomm = {
					replynick: currNick,
					replyuin: currUin
				};
				$list.each(function(index, elem) {
					if (middlecomm.replynick && middlecomm.replyednick) {
						data.middlecommentcontent.push(middlecomm);
						middlecomm = {};
					}
					if ($(elem).hasClass('js_replyed_nick')) {
						middlecomm.replyednick = $(this).html();
						middlecomm.replyeduin = $(this).data('uin');
						middlecomm.subcommentcontent || (middlecomm.subcommentcontent = $(this).next('.js_subcomment').html());
					}
					else if ($(elem).hasClass('js_reply_nick')) {
						middlecomm.replynick = $(this).html();
						middlecomm.replyuin = $(this).data('uin');
					}
					if (middlecomm.replynick && middlecomm.replyednick) {
						data.middlecommentcontent.push(middlecomm);
						middlecomm = {};
					}
				});
			}
			else {
				data.rootcommentcontent = $li.find('.js_hot_text').html();
			}
			me.sendCmt(data, function () {
				$this.html('');
				//$('#replyed_text_blur').show();$('#replyed_text').hide();//$('.js_replyed_comment_tips').hide();
				//me.showTitleNum($this, $('.js_replyed_comment_tips'), true);
				setTimeout(function () {
					$('#replyed_text_blur').show();$('#replyed_text').hide();//$('.js_replyed_comment_tips').hide();
					$t.closest('.js_cmt_replyed').hide();
				}, 350);
			}, function(){
				$text.html($text.html().replace(/\\n/gi, '<div><br></div>'));
			});

			me.pgvClickStat('reply');
        }).off("mouseover", ".js_cmt_li").on("mouseover", ".js_cmt_li", function (evt) {
            var $t = $(this);
            $t.addClass('hover');
        }).off("mouseout", ".js_cmt_li").on("mouseout", ".js_cmt_li", function (evt) {
            var $t = $(this);
            $t.removeClass('hover');
        }).off("click", ".js_send_cancel").on("click", ".js_send_cancel", function (evt) {
            var $t = $(this);

            $t.closest('.js_cmt_replyed').remove();
            me.pgvClickStat('replycancle');
        }).off('click', '.js_order_type').on('click', '.js_order_type', function () {
            var $t = $(this);
            $('.js_order_type').removeClass('c_tx_current');
            $t.addClass('c_tx_current');
            var type = $t.data('type');
            me.setPager(type, 0, false);
        }).off('click', '.js_get_more_hot').on('click', '.js_get_more_hot', function(){
			var loading = parseInt($(this).data('loading'));
			if (loading == 1){
				return false;
			}
			$(this).data('loading', 1);
			me.getMoreHotComment();
		});

        $(document).off('click', '.js_rule_btn').on('click', '.js_rule_btn', function () {
			/*require.async('js/common/dialog.js', function(dialog){
				dialog.show({
					mode : "iframe",
					dialogclass : 'popup_comment_guide',
					title : 'QQ音乐评论指北',
					url : 'https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=120574&mmkey=',
					objArg : {}
				});
				setTimeout(function(){
					$('#frame_tips').attr({
						height : "460px",
						scrolling : "yes"
					});
					dialog.onReady( 0, 0);
				}, 500);
			});*/
			var w = window.open('https://c.y.qq.com/node/m/client/music_headline/index.html?_hidehd=1&_button=2&zid=120574&mmkey=', '_blank');
			if(w)w.opener = null;
        }).off('click', '.js_close_comment_rule').on('click', '.js_close_comment_rule', function () {
            $('#comment_popup').hide();
        }).on('click', '', function (e) {
			var $target = $(e.target);
			if (!$target.hasClass('js_rule_btn')) {
				$('#comment_popup').hide();
			}
			if (!$target.hasClass('js_report_comment')&&$target.parents('#report_comment_popup').length==0) {
				$('#report_comment_popup').hide();
			}
        }).off("click", ".js_report_comment").on("click", ".js_report_comment", function (evt) {
            var $t = $(this),
                cmtid = $t.parent('.js_comment_opt').data('commentid');
            me.set('commentid', cmtid);
			if ($('#report_comment_popup').length==0){
				$('body').append(function(data){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<!-- 评论举报 -->\r\n    <div class="mod_popup_box" id="report_comment_popup" style="display:none;">\r\n        <div class="mod_popup popup_report c_popup" style="position: absolute;">\r\n            <div class="popup__hd">\r\n                <h2 class="popup__tit">评论举报</h2>\r\n                <a href="javascript:;" class="popup__close js_close_report_comment_popup" title="关闭"><i class="popup__icon_close"></i><i class="icon_txt">关闭</i></a>\r\n            </div>\r\n            <div class="popup__bd">\r\n                <div class="popup__bd_box">\r\n                    <ul class="popup_report_list">\r\n                        <!-- 通过获取radio信息提交 -->\r\n                        <!-- 选中加 check -->\r\n                        <li class="popup_report_list__item">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item1" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item1">无意义的评论</label>\r\n                        </li>\r\n                        <li class="popup_report_list__item">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item2" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item2">色情暴力</label>\r\n                        </li>\r\n                        <li class="popup_report_list__item">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item3" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item3">政治反动</label>\r\n                        </li>\r\n                        <li class="popup_report_list__item">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item4" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item4">恶意谩骂攻击</label>\r\n                        </li>\r\n                        <li class="popup_report_list__item">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item5" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item5">营销广告</label>\r\n                        </li>\r\n                        <li class="popup_report_list__item check">\r\n                            <span class="popup_report_list__radio">\r\n                                <input type="radio" name="wrong" id="item6" class="popup_report_list__input">\r\n                            </span>\r\n                            <label for="item6">其他</label>\r\n                        </li>\r\n                    </ul>\r\n                    <div class="popup_report_write c_popup__disabled">\r\n                        <textarea class="popup_report_write__content" placeholder="请在些说明情况"></textarea>\r\n                        <div class="popup_report_write__num">0/100</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <footer class="popup__ft">\r\n                <button class="mod_btn c_popup__btn_skin js_submit_report_comment_popup" href="javascript:;">确定</button>\r\n                <button class="mod_btn c_popup__btn js_close_report_comment_popup" href="javascript:;">取消</button>\r\n            </footer>\r\n        </div>\r\n    </div>\r\n';
return __p;
}({cmtid:cmtid}));
							
				$('#report_comment_popup textarea').on('keyup input propertychange', function(){
					showReportNum();
				});
			}
			require.load('//y.gtimg.cn/mediastyle/macmusic_v4/popup.css?max_age=25920000&v=20171115', function(){
				$('#report_comment_popup').show();
				var h = evt.clientY-$('#report_comment_popup .c_popup').height()/2+document.body.scrollTop;
				var w = (window.innerWidth/2-$('#report_comment_popup .c_popup').width()/2);
				$('#report_comment_popup .c_popup').css({left:(w>0?w:0)+'px',top:(h>0?h:0)+'px'});//Music.popup.show('show rule');
			});
        }).off('click', '#report_comment_popup input').on('click', '#report_comment_popup input', function () {
			if ($(this).parents('.popup_report_list__item').hasClass('check')){
				return;
			}
            $('#report_comment_popup .popup_report_list__item').removeClass('check');
			$(this).parents('.popup_report_list__item').addClass('check');
        }).off('click', '.js_close_report_comment_popup').on('click', '.js_close_report_comment_popup', function () {
            $('#report_comment_popup').hide();
			$('#report_comment_popup textarea').val('');
            $('#report_comment_popup .popup_report_list__item').removeClass('check');
			$('#item6').parents('.popup_report_list__item').addClass('check');
        }).off('click', '.js_submit_report_comment_popup').on('click', '.js_submit_report_comment_popup', function () {
            var title = $.trim($('#report_comment_popup .check').text());
			var desc = $.trim($('#report_comment_popup textarea').val());
			if (title == '其它'&&!desc){
				Music.popup.show('请正确填写举报内容！', 3000, 1);
				return false;
			}
			if ($('#report_comment_popup .popup_report_write__num').data('over') == 1){
				Music.popup.show('字数超过100字限制', 3000, 1);
				return false;
			}
			$('#report_comment_popup').hide();
			$('#report_comment_popup textarea').val('');
            $('#report_comment_popup .popup_report_list__item').removeClass('check');
			$('#item6').parents('.popup_report_list__item').addClass('check');
			showReportNum();
			me.reportCmt(me.get('commentid'), title, desc);
        }).on('scroll', function(){
			reportCommentShow();
		});
		reportCommentShow();
		function reportCommentShow(now){
			try{
				
				var Delegator = me.get('container');
				var offsetTop = $(Delegator).offset().top, scrollTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset, windowInnerHeight = window.innerHeight;
				if (!window.commentReportShow&&(offsetTop-scrollTop)<windowInnerHeight*2/3){
					if (!now){
						if (!window.commentReportShowStart){
							setTimeout(function(){
								window.commentReportShowStart = true;
								reportCommentShow(true);
							}, 1000);
						}
					}else {
						window.commentReportShow = true;
						me.pgvClickStat('show');
					}
				}
				if (!!now){
					window.commentReportShowStart = false;
				}
			}
			catch (e){
			}
		}
		
		function showReportNum() {
			var max_num = 100,
				$input = $('#report_comment_popup textarea'),
				$text = $('#report_comment_popup .popup_report_write__num');
			var nameLength = Music.string.getRealLen($input.val());				
			nameLength = Math.ceil(nameLength/2);
				$text.html(nameLength+'/'+max_num);				
			if( nameLength > max_num){
				$text.css({color:"red"});$text.data('over', 1);
			}else {
				$text.css({color:""});$text.data('over', 0);
			}
		}
    },
    Statics: {
        /**
         * 初始化歌曲列表
         *
         * @param {Object} opts
         *            {
		 *				container : 评论模块容器，必填,
		 *			    outer_container :评论页面最外层的容器，默认.sb_scrollable
		 *				type : 1：单曲  2：专辑  3：歌单  4：排行榜  5：MV,
		 *				topid : 歌单、专辑的id,
		 *				cur_page : 热评当前的页码
		 *				per_page : 每页热评数量,
		 *			    $mod_title : 评论模块title，选填
		 *				subSource : 统计自来源
		 *			}
         */
        init : function(opts){
            try {
                //new一个新的Comment实例之前，先把之前的实例给destroy掉，防止内存泄漏
                var cmt = $(opts.container).data("comment");
                // ericczzhang修改，不能remove掉。
                // cmt && cmt.remove && cmt.remove();
                cmt = null;
            } catch (exp) {};

            return new Comment(opts);
        }
    }
});

return Comment;

});