define('js/common/music/pager.js', function(require, exports, module){

/**
 * 前端分页组件
 * @author: lunardai
 * @lastModified: 2016/3/30
 * @fileoverview:
 *
 * @example:
 *     1、以JQUERY插件形式创建分页组件对象
 *        $("pagerSelector").pager({
 *          container : "containerSelector",    //包含分页对象及分页内容的容器选择器
 *          total : 100,                        //总记录数
 *          per : 20,                           //分页大小
 *          cur : 1,                            //当前页码
 *          index : 5,                          //显示数字索引的数目，0-表示不显示索引
 *          ns : SomeObj,                       //callback函数的名字空间对象
 *          callback : callback                 //分页回调
 *        });
 *     2、以new形式创建分页组件对象，默认以container中动态插入分页dom对象，也可以通过配置参数传入
 *        new Pager({
 *          container : "containerSelector",    //包含分页对象及分页内容的容器选择器
 *          page : "pagerSelector",             //分页dom容器选择器（注：可选项）
 *          total : 100,                        //总记录数
 *          per : 20,                           //分页大小
 *          cur : 1,                            //当前页码
 *          index : 5,                          //显示数字索引的数目，0-表示不显示索引
 *          ns : SomeObj,                       //callback函数的名字空间对象
 *          callback : callback                 //分页回调
 *        });
 */

var music = require('js/common/music.js'),
	$ = music.$,
	BASE = require('js/common/music/lib/base.js')
    , $ = music.$;
    /**
     * 前端分页组件对象
     *
     */
    var Pager = BASE.extend({
        attrs : {
            $container : null,
            $pager : null,
            total : 0,
            per : 100,
            cur : 1,
            pages : 1,
            index : 5,
            ns : null,
            callback : $.noop
        },
        initialize : function(config){
            var _this = this
                , _conf = {}
                , $container = $(config.container)
                , $pager = $(config.page)
                , pages = config.total / config.per;
            if ($pager.length == 0) {
                $container.append('<div class="mod_page_nav js_pager"></div>');
                $pager = $(".js_pager", $container);
            }

            if (pages > parseInt(pages, 10)) {
                pages = parseInt(pages, 10) + 1;
            } else {
                pages = parseInt(pages, 10);
            }

            $.extend(_conf, config, {
                $container : $container,
                $pager : $pager,
                pages : pages
            });

            //把当前实例缓存起来，便于新创建实例时，可以将其destroy掉
            $container.data("pager", _this);

            Pager.superclass.initialize.call(_this, _conf);

            _this.bindPagerEvents();
            _this.renderPager();
        },
        bindPagerEvents : function(){
            var _this = this
                , $container = _this.get("$container");
            $container.off("click", ".js_pageindex").on("click", ".js_pageindex", function(evt){
                var $t = $(this)
                    , idx = $t.data("index");
                _this.goPage(idx);

                //music.pgvClickStat("spaframe.pager", null, "");
                return false;
            });
        },
        renderPager : function(){
            this.get("$pager").html(this.getPagerHtml());
        },
        getPagerHtml : function(){
            var _this = this
                , $container = _this.get("$container")
                , $pager = _this.get("$pager")
                , curPage = parseInt(_this.get("cur"), 10)
                , pages = parseInt(_this.get("pages"), 10)
                , showIndex = _this.get("index")
                , _index = Math.round(showIndex / 2)
                , i = 1
                , start = 0
                , end = 0
                , beforeMore = false
                , tailMore = false
                , pageHtml = [];
            showIndex <= 1 && (_index = 0);

            if (pages == 1) {
                return "";
            }

            //是否需要展示“上一页”
            if (curPage > 1) {
                pageHtml.push('<a href="javascript:;" class="prev js_pageindex" data-index="'+(curPage - 1)+'" title="上一页" hidefocus><span>&lt;</span></a>');
            }

            //页码部分
            if (pages <= 2 * showIndex) {
                for (i = 1; i <= pages; i ++) {
                    if (i == curPage) {
                        pageHtml.push('<strong class="current">'+i+'</strong>');
                    } else {
                        pageHtml.push('<a href="javascript:;" class="js_pageindex" data-index="'+i+'" hidefocus>'+i+'</a>');
                    }
                }
            } else {
                start = curPage - _index < 1? 1 : (curPage - _index);
                end = curPage + _index > pages? pages : (curPage + _index);
                if (end - start < showIndex) {
                    end = (start + showIndex > pages)? pages : (start + showIndex);
                }
                if (end - start < showIndex) {
                    start = (end - showIndex < 1)? 1 : (end - showIndex);
                }

                for (i = start; i <= end; i ++) {
                    //需要在页码前端展示更多（...）
                    if (start >= 2 && !beforeMore) {
                        pageHtml.push('<a href="javascript:;" class="js_pageindex" data-index="'+1+'" hidefocus>'+1+'</a>');
                        start > 2 && pageHtml.push('<strong class="more">...</strong>');
                        beforeMore = true;
                    }

                    if (i == curPage) {
                        pageHtml.push('<strong class="current">'+i+'</strong>');
                    } else {
                        pageHtml.push('<a href="javascript:;" class="js_pageindex" data-index="'+i+'" hidefocus>'+i+'</a>');
                    }
                }

                //需要在页码后端展示更多（...）
                if (pages - end > 1 && !tailMore) {
                    pageHtml.push('<strong class="more">...</strong>');
                    tailMore = true;
                }

                if (pages - end >= 1) {
                    //始终显示最后一页
                    pageHtml.push('<a href="javascript:;" class="js_pageindex" data-index="'+pages+'" hidefocus>'+pages+'</a>');
                }
            }

            //是否需要展示“下一页”
            if (pages != curPage) {
				
                pageHtml.push('<a href="javascript:;" class="next js_pageindex" data-index="'+(curPage + 1)+'" title="下一页" hidefocus><span>&gt;</span></a>');
            }

            //cs.p("分页html：", pageHtml.join(""));
            return pageHtml.join("");
        },
        goPage : function(idx){
            var _this = this
                , pages = _this.get("pages");
            idx = idx < 1? 1 : idx;
            idx = idx > pages? pages : idx;

            _this.get("callback").call(_this.get("ns"), idx);
            //_this.remove();
            $(window).off("removePager").on("removePager", (function(p){
                return function(evt){
                    try {
                        p && p.remove();
                    } catch (exp) {
                        //
                    }
                };
            })(_this));
        },
        remove : function(){
            var _this = this
                , $container = _this.get("$container")
                , $pager = _this.get("$pager");
            //
            try {
                $container.data("pager", null);
                $container.off("click", ".js_pageindex");
                $pager.remove();
                _this.destroy();
                //CollectGarbage();
            } catch (exp) {}
        },
        Statics : {
            init : function(config){
                try {
                    $(window).trigger("removePager");
                    //new一个新的Pager实例之前，先把之前的实例给destroy掉，防止内存泄漏
                    var p = $(config.container).data("pager");
                    p && p.remove && p.remove();
                    p = null;
                } catch (exp) {};

                return new Pager(config);
            }/*,
            prev_tpl : '<a href="javascript:;" class="prev js_pageindex" data-index="<%= idx%>" title="上一页" hidefocus><span>&lt;</span></a>',
            next_tpl : '<a href="javascript:;" class="next js_pageindex" data-index="<%= idx%>" title="下一页" hidefocus><span>&gt;</span></a>',
            pager_tpl : '<a href="javascript:;" class="js_pageindex" data-index="<%= idx%>" hidefocus><%= idx%></a>',
            current_tpl : '<strong class="current"><%= idx%></strong>',
            more_html : '<strong class="more">...</strong>'*/
        }
    });

    $.fn.pager = function(args){
        if ($.type(args) === "string") {
            //
        } else if ($.type(args) === "object") {
            //var _conf = $.extend(args, {page : $(this)});
            Pager.init(args);
        } else {
            throw "Initialize Pager Failed!";
        }
    };

    return Pager;



});