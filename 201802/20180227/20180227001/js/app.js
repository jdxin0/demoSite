var requireOne = require.config({
    baseUrl: "./js",
    //1、入口文件通过data-main形式加载，同时设置了bashUrl
    //2、通过 RequireJS config设置bashUrl
    //3、非如上两种，bashUrl是引用requireJS的html路径
    shim: {
        'jQueryMigrate':{
            deps:['jquery'],
            exports:'jQuery.migrateVersion'
        },
        'jquery.pagination':{
            deps:['jquery'],
            exports:'jQuery.fn.pagination'
        },
        'Modernizr':{
            exports:'Modernizr'
        },
        'console':{
            exports:'console'
        },
        'requirejs':{
            exports:'requirejs'
        }
    },
    paths: {//module IDs map with path
        "bluebird":"lib/bluebird",
        "requirejs":"require-2.3.5",
        "jquery": "lib/jquery-1.12.4",
        "underscore": "lib/underscore",
        "jQueryMigrate": "lib/jquery-migrate-1.4.1",
        "domReady": "RequireJS-plugins/domReady",
        "text": "RequireJS-plugins/text",
        "console": "common/console",
        "jquery.pagination": "tools/jquery.pagination",
        "Modernizr":"tools/Modernizr",
        "CountUp": "tools/countUp",
        "loop": "tools/loop",
        "exclamation": "app/exclamation",
        "review": "app/review.txt",
        "tpl": "app/template.html",
        "Util": "app/util"
    }
});
//requireJS插件列表https://github.com/requirejs/requirejs/wiki/Plugins
require([ 
    'bluebird',
    'requirejs',
    'Util', 
    'exclamation', 
    'text!review', 
    'text!tpl',
    'Modernizr',
    'domReady', 
    'jquery',
    'console',
    'jQueryMigrate',
    'jquery.pagination',
    'tools/addbook',
    'tools/ball',
    'CountUp',
    'loop',
    'underscore'], function( 
        Promise,
        requirejs,
        util, 
        exclamation, 
        txt,
        tpl,
        Modernizr,
        domReady, 
        $,
        console,
        jQueryMigrate,
        pagination,
        addbook,
        ball,
        CountUp,
        loop,
        _) {
    domReady(function() {
        console.log("%c document ready 1", "color:red");
        console.log($.fn.jquery);
    });
    domReady(function() {
        console.log("%c document ready 2", "color:red");
        console.log("util模块");
        util.incrementCounter();
        util.printCurrentCounter();
        util.resetCounter();
    });
    domReady(function() {
        console.log("%c document ready 3", "color:red");
        console.log("exclamation模块");
        console.log(exclamation.prototype);
    });
    domReady(function() {
        console.log("%c document ready 4", "color:red");
        console.log("text模块");
        console.log(tpl);
        $("#poem").html(txt);
    });
    domReady(function(){
        console.log("%c document ready 5", "color:red");
        console.log("Modernizr");
        console.log(Modernizr);
        console.log(Modernizr.canvas);
    });
    domReady(function(){
        console.log("%c document ready 6", "color:red");
        console.log("pagination");
        //这是一个非常简单的demo实例，让列表元素分页显示
        //回调函数的作用是显示对应分页的列表项内容
        //回调函数在用户每次点击分页链接的时候执行
        //参数page_index{int整型}表示当前的索引页
        var initPagination = function() {
            var num_entries = $("#hiddenresult div.result").length;
            // 创建分页
            $("#Pagination").pagination(num_entries, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: pageselectCallback,
                items_per_page:1 //每页显示1项
            });
         }();
         
        function pageselectCallback(page_index, jq){
            var new_content = $("#hiddenresult div.result:eq("+page_index+")").clone();
            $("#Searchresult").empty().append(new_content); //装载对应分页的内容
            return false;
        }
    });
    domReady(function(){
        //此demo通过Ajax加载分页元素
            var initPagination = function() {
                var num_entries = $("#hiddenresult div.result").length;
                // 创建分页
                $("#AJAXPagination").pagination(num_entries, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page: 1, //每页显示1项
                    prev_text: "前一页",
                    next_text: "后一页"
                });
             };
             
            function pageselectCallback(page_index, jq){
                var new_content = $("#AJAXhiddenresult div.result:eq("+page_index+")").clone();
                $("#AJAXSearchresult").empty().append(new_content); //装载对应分页的内容
                return false;
            }
            //ajax加载
            $("#AJAXhiddenresult").load("js/app/load.html", null, initPagination);
    });
    domReady(function(){
        console.log("%c document ready 7", "color:red");
        console.log("addbook");
        //绑定按钮
        $("#btn_addbook").click(function() {
          addbook.init({'title':'RequireJS模块化','url':'http://http://www.yanhu.com/201802/20180227/20180227001/index.html','content':'请按Ctrl+D将本页面放入收藏夹，RequireJS模块化！'})
          addbook.add();
          return false;
        });
    });
    domReady(function(){
        console.log("%c document ready 8", "color:red");
        console.log("ball");
        if (Modernizr.canvas) {
            ball.ballPlay();
            setTimeout(function(){
                ball.ballBack();
            },3000)
        }else{
            console.log("浏览器不支持");
        }
        
    })
    domReady(function(){
        console.log("%c document ready 9", "color:red");
        console.log("CountUp");
        console.log(CountUp);
        new CountUp('myTargetElement',10,1888,0,1,{
            useEasing: false,
            useGrouping: false,
            formattingFn: function(num) {
                var html = '';
                $.each(("00000" + num.toString()).slice(-5).split(''), function(key, value) {
                    html += "<em>" + value + "</em>";
                });
                return html;
            }
        }).start();
    });
    domReady(function(){
        if (Modernizr.canvas) {
            loop();
        }else{
            console.log("浏览器不支持");
        }
    });
    domReady(function(){
        console.log("%c document ready 10", "color:red");
        console.log("underscore");
        console.log(_.template)
    });
    domReady(function(){
        console.log("%c document ready 11", "color:red");
        console.log("Promise");
        new Promise(function(resolve,reject){
            setTimeout(function(){
                console.log(1);
                resolve();
            },3000);
        }).then(function(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    console.log(2);
                    resolve();
                },3000);
            });
        }).then(function(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    console.log(3);
                    resolve();
                },3000);
            });
        }).then(function(){
            setTimeout(function(){
                console.log("Promise End!")
            },3000);
        });
    });
})
/*requirejs.onResourceLoad = function (context, map, depArray) {
    console.log(map);
}*/
// require(["http://www.xuliehaonet.com/interface/jsonp.php?callback=define"],
//     function (data) {
//         //The data object will be the API response for the
//         //JSONP data call.
//         console.log(data);
//     }
// );
