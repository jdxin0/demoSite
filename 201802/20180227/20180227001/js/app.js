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
        'textSlider':{
            deps:['jquery'],
            exports:'jQuery.fn.textSlider'
        },
        'Modernizr':{
            exports:'Modernizr'
        },
        'console':{
            exports:'console'
        },
        'requirejs':{
			deps:['console'],
            exports:'requirejs'
        },
        'multipleGlobalFun':{
            init:function(){//暴露多个全局变量
                console.log(this);
                return {
                    multipleGlobalFun1:multipleGlobalFun1,
                    multipleGlobalFun2:multipleGlobalFun2
                }
            },
            exports:'multipleGlobalFun1'//当 exports 与 init 同时存在的时候， exports 将被忽略。
        },
        'jquery.path':{
            deps:['jquery'],
            init:function(){
                return {
                    bezier:$.path.bezier,
                    arc:$.path.arc
                }
            }
        },
        'qrcode':{
            exports:'QRCode'
        }
    },
    paths: {//module IDs map with path
        "bluebird":"lib/bluebird",
        "requirejs":"require-2.3.5",
        "jquery": ["https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery","lib/jquery-1.12.4"],//这里cdn多了个后缀.js会报错，会加载本地jquery
        "underscore": "lib/underscore",
        "jQueryMigrate": "jQuery-plugins/jquery-migrate-1.4.1",
        "domReady": "RequireJS-plugins/domReady",
        "text": "RequireJS-plugins/text",
        "console": "common/console",
        "jquery.pagination": "jQuery-plugins/jquery.pagination",
        "Modernizr":"tools/Modernizr",
        "CountUp": "tools/countUp",
        "loop": "tools/loop",
        "textSlider":"jQuery-plugins/jquery.textSlider",
        "jquery.path":"jQuery-plugins/jquery.path",
        "qrcode":"tools/qrcode",
        "exclamation": "app/exclamation",
        "review": "app/review.txt",
        "tpl": "app/template.html",
        "Util": "app/util",
        "urlTest":"app/urlTest",
        "multipleGlobalFun":"app/multipleGlobalFun",
        "testAnim":"app/animate.css"
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
    'underscore',
    'urlTest',
    'multipleGlobalFun',
    'textSlider',
    'testAnim',
    'jquery.path',
    'qrcode'], function( 
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
        _,
        urlTest,
        multipleGlobalFun,
        txtSlid,
        testAnim,
        path,
        QRCode) {
    domReady(function() {
        console.log("require.s.contexts._.config:",require.s.contexts._.config);
        console.log("require.s.contexts._.defined:",require.s.contexts._.defined);
        console.log("require.s.contexts._.urlFetched:",require.s.contexts._.urlFetched);
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
        $("#poem").append(txt);
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
        var flag=1;
        $(".ballplayBtn").click(function(){
            if (Modernizr.canvas&&flag==1) {
                ball.ballPlay();
                flag=0;
                setTimeout(function(){
                    ball.ballBack();
                    flag=1;
                },3000)
            }else if (flag==0) {
                console.log("ballplaying");
            }else{
                console.log("浏览器不支持");
            }
        });
    })
    domReady(function(){
        console.log("%c document ready 9", "color:red");
        console.log("CountUp");
        $(".myTargetElementBtn").click(function(){
            new CountUp('myTargetElement',10,88888,0,1,{
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
        var prizeList=[{"money":12000,"nickname":"\u534a\u6e05\u9192***d","ctime":"02-08 08:20"},{"nickname":"\u9b54***\u5c0a","ctime":"02-07 11:09","money":10000},{"money":18000,"nickname":"\u90a3\u4e00\u6cab***\u70e7","ctime":"02-06 21:18"},{"nickname":"\u65ed\u65e5\u79be***\u98ce","ctime":"02-06 02:48","money":18000},{"money":5000,"nickname":"\u62b9\u4e0d\u6389***\u8ff9","ctime":"02-06 02:47"},{"money":18000,"nickname":"sun***\u3002","ctime":"02-05 09:48"},{"nickname":"183***0","ctime":"02-04 15:47","money":18000},{"money":18000,"nickname":"\u5e74\u5c11\u75f4***\u3002","ctime":"02-04 10:21"}]
        var tpl = '<li><%= list.ctime %>恭喜<em class="name col-in-yel"><%= list.nickname %></em>获得<em><%= list.money %>元</em></li>';
        var html = '';
        for (var i = 0, len = prizeList.length; i < len; i++) {
            html += _.template(tpl)({
                list: prizeList[i]
            });
        }
        $('#sliderLeft ul').html(html);
        $('#sliderUp ul').html(html);
        $('#sliderLeft').textSlider({
            direction: 'left',
            speed: 1000,
            wait: 1000,
            line: 1,
            per: 1,
            child: 'ul'
        });
        $('#sliderUp').textSlider({
            direction: 'top',
            speed: 1000,
            wait: 1000,
            line: 1,
            per: 1,
            child: 'ul'
        });
        
    });
    domReady(function(){
        console.log("%c document ready 11", "color:red");
        console.log("Promise");
        return //跳过promise代码
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
    domReady(function(){
        console.log("%c document ready 12", "color:red");
        console.log("urlTest");
        console.log(urlTest);
    });
    domReady(function(){
        console.log("%c document ready 13", "color:red");
        console.log("multipleGlobalFun");
        console.log(multipleGlobalFun);
    })
    domReady(function(){
        console.log("%c document ready 14", "color:red");
        console.log("Animation.CSS");
        $('.js--triggerAnimation').click(function(e){
          e.preventDefault();
          var anim = $('.js--animations').val();
          testAnim(anim);
        });

        $('.js--animations').change(function(){
          var anim = $(this).val();
          testAnim(anim);
        });
    })
    domReady(function(){
        console.log("%c document ready 15", "color:red");
        console.log("$.path.bezier");
        var mpath = new $.path.bezier({
            start: {
                x: 0,
                y: 430,
                angle: 300,
                length: 1,
                opacity: 1
            },
            end: {
                x: 895,
                y: 430,
                angle: 0,
                length: 0,
                opacity: 0
            }
        });
        $(".animatePathBtn").click(function(){
            $(".moneyfly").animate({
                path: mpath,
                opacity: 1,
                // zoom: '0.8'
            }, 1000, function() {

            });
        });
    })
    domReady(function(){
        new QRCode(document.getElementById("QRCode"), {
            text: document.URL,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        setTimeout(function() {
            $("#QRCode").css("visibility", "visible")
        }, 0);
    })
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
