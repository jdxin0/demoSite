thunder(function() {
    this.tj('actid_389');
    window.msgbox = this.msgbox;
    window.pay = this.pay;
    var _ = this._;
    var main = this.main;
    var user = this.user;
    var U = this.util;
    var isInroom = 0;
    var Utilities = {
        isElementInView: function(element, fullyInView) {
            var pageTop = $(window).scrollTop();
            var pageBottom = pageTop + $(window).height();
            var elementTop = $(element).offset().top;
            var elementBottom = elementTop + $(element).height();

            if (fullyInView === true) {
                return ((pageTop < elementTop) && (pageBottom > elementBottom));
            } else {
                return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
            }
        },
        initEvents: function(Events) {
            var key, keyArr, delElems, elems;
            var spiltElems = function(elems) {
                return elems.split('&').join(',');
            }
            for (key in Events) {
                keyArr = key.split('|');
                switch (keyArr.length) {
                    case 3:
                        delElems = spiltElems(keyArr[0]);
                        elems = spiltElems(keyArr[1]);
                        events = spiltElems(keyArr[2]);
                        if (delElems.indexOf('document') != -1) {
                            delElems = document;
                        }
                        $(delElems).on(events, elems, Events[key]);
                        break;
                    case 2:
                        elems = spiltElems(keyArr[0]) === 'window' ? window : spiltElems(keyArr[0]);
                        events = spiltElems(keyArr[1]);
                        $(elems).on(events, Events[key]);
                        break;
                    default:
                        break;
                }
            }
        },
        isMobile:function(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod","MicroMessenger","micromessenger");
            var flag = false;
            var v = 0
            for (v = 0; v < Agents.length; v++) {
              if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
              }
            }
            if (flag) {
                return true;
            }else{
                return false;
            }
        },
        toThousands:function(num) {
            var result = []
              , counter = 0;
            num = (num || 0).toString().split('');
            for (var i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0) {
                    result.unshift(',');
                }
            }
            return result.join('');
        },
        moneyCountUp:function(startMoney, endMoney) {
            new CountUp('myTargetElement',startMoney,endMoney,0,1,{
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
        },
        moneyAni:function(node,prize) {
            var money_start_X = $('.mapnode .' + node + ' .money-msg').offset().left - 9;
            money_start_Y = $('.mapnode .' + node + ' .money-msg').offset().top - 77;
            money_end_X = $('.lottery-award .msg').offset().left + 106;
            money_end_Y = $('.lottery-award .msg').offset().top - 122;
            money = $('<div class="moneyfly">'+prize+'元</div>');

            $('.layout-body').append(money);
            money.css({
                left: money_start_X,
                top: money_start_Y,
                'animation': 'none'
            });

            setTimeout(function() {
                var mpath = new $.path.bezier({
                    start: {
                        x: money_start_X,
                        y: money_start_Y,
                        angle: 300,
                        length: 1,
                        opacity: 1
                    },
                    end: {
                        x: money_end_X,
                        y: money_end_Y,
                        angle: 0,
                        length: 0,
                        opacity: 0
                    }
                });
                money.animate({
                    path: mpath,
                    opacity: '0',
                    // zoom: '0.8'
                }, 1000, function() {});
                money.animate({
                    opacity: '0'
                }, 1000);
            }, 500);
        },
        redEnvelopeAni:function(node) {
            var hb_start_X = $('.mapnode .' + node + ' .ico-hb').offset().left - 21
              , hb_start_Y = $('.mapnode .' + node + ' .ico-hb').offset().top - 74
              , hb_end_X = $('.time-list .time2').offset().left + 50
              , hb_end_Y = $('.time-list .time2').offset().top + 180
              , hb = $('<div class="hbfly"><i></i></div>');
            var hpath = new $.path.bezier({
                start: {
                    x: hb_start_X,
                    y: hb_start_Y,
                    angle: -300,
                    length: 1,
                    opacity: 1
                },
                end: {
                    x: hb_end_X,
                    y: hb_end_Y,
                    angle: 0,
                    length: 0,
                    opacity: 0
                }
            });
            $('.layout-body').append(hb);
            hb.css({
                left: hb_start_X,
                top: hb_start_Y,
                'animation': 'none'
            });
            setTimeout(function() {

                hb.animate({
                    path: hpath,
                    opacity: '0'
                }, 1000, function() {
                    $(this).remove();
                });
            }, 500);
        },
        lotteryCallBack:function(data) {
            var _this = this;
            // 线路点亮动画
            var lineon = $('.mapline span.on');
            var P = new Promise(function(resolve, reject) {
                lineon.animate({
                    'opacity': '0'
                }, 200, function() {
                    resolve();
                });
            }).then(function() {
                return new Promise(function(resolve,reject) {
                    lineon.animate({
                        'opacity': '1'
                    }, 200, function() {
                        resolve();
                    });
                });
            }).then(function() {
                return new Promise(function(resolve,reject) {
                    lineon.animate({
                        'opacity': '0'
                    }, 200, function() {
                        resolve();
                    });
                });
            }).then(function() {
                return new Promise(function(resolve,reject) {
                    lineon.animate({
                        'opacity': '1'
                    }, 200, function() {
                        resolve();
                    });
                });
            }).then(function(){
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        lineon.removeClass("on").addClass("active");
                        isInroom = 0;
                        if (data.hasOwnProperty("redbagInfo")) {
                            $("."+data.end).addClass("active");
                            resolve();
                        }
                    },200);
                });
            }).then(function(){
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        _this.moneyAni(data.end,data.redbagInfo.money);
                        resolve();
                    },1000);
                });
            }).then(function(){
                return new Promise(function(resolve,reject){
                    if (data.end=="station_1"||data.end=="station_end") {
                        if (data.redbagInfo.totalMoney!=Data.totalMoney) {
                            setTimeout(function(){
                                _this.moneyCountUp(data.redbagInfo.totalMoney-data.redbagInfo.money,data.redbagInfo.totalMoney);
                                Data.totalMoney = data.redbagInfo.totalMoney;
                                resolve();
                            },1500)
                        }
                        if (data.end=="station_end") {
                            $(".mapline12").addClass("active");
                        }
                    }else {
                        var PP = new Promise(function(resolve,reject){
                            setTimeout(function(){
                                if (data.redbagInfo.totalMoney!=Data.totalMoney) {
                                    _this.moneyCountUp(data.redbagInfo.totalMoney-data.redbagInfo.money,data.redbagInfo.totalMoney);
                                    Data.totalMoney = data.redbagInfo.totalMoney;
                                    resolve();
                                }
                            },1500)
                        }).then(function(){
                            return new Promise(function(resolve,reject){
                                setTimeout(function(){
                                        _this.redEnvelopeAni(data.end);
                                        resolve();
                                },1000);
                            })
                        }).then(function(){
                            return new Promise(function(resolve,reject){
                                setTimeout(function(){
                                    $(".unpackcnt").text(data.redpacketNum);
                                    Data.redpacketNum = data.redpacketNum;
                                    resolve();
                                },1500);
                            });
                        }).then(function(){
                            resolve();
                        });

                    }
                });
            }).then(function(){
                // console.log("end");
            });
            // 更新数据
            Data.lotterytimes = data.lotterytimes;
            Utilities.lightBtnEvent();
            Utilities.lightBtnDownText();
            Utilities.takeAwayBtnDownText();
        },
        lightBtnEvent:function(){
            if (Data.lotterytimes>0) {
                $(".lotteryBtnSelector").removeClass("noChanceHaveOpen noChanceNoOpen").addClass("lotteryBtn");
            }else{
                if (Data.paytimes>0) {
                    $(".lotteryBtnSelector").removeClass("lotteryBtn noChanceNoOpen").addClass("noChanceHaveOpen");
                }else {
                    $(".lotteryBtnSelector").removeClass("lotteryBtn noChanceHaveOpen").addClass("noChanceNoOpen");
                }
            }
        },
        lightBtnDownText:function(){
            var text = "";
            if (Data.lotterytimes==1&&Data.paytimes==0) {
                text = '首次免费送<em>1次</em>点亮机会';
            }else if (Data.lotterytimes==0&&Data.paytimes==0) {
                text = '已无点亮机会，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktl">开会员送4次点亮机会&gt;&gt;</a>';
            }else if(Data.lotterytimes>0&&Data.paytimes<4){
                text = '还有<em>'+Data.lotterytimes+'次</em>点亮机会，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktl">开会员送1次点亮机会&gt;&gt;</a>';
            }else if (Data.lotterytimes==0&&Data.paytimes<4) {
                text = '已无点亮机会，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktl">开会员再送1次机会&gt;&gt;</a>';
            }else if (Data.lotterytimes>0&&Data.paytimes>3) {
                text = '还有<em>'+Data.lotterytimes+'次</em>点亮机会，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktl">开会员送1次点亮机会&gt;&gt;</a>';
            }else if (Data.lotterytimes==0&&Data.paytimes>3) {
                text = '就差一小段了，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktl">开通再次点亮&gt;&gt;</a>';
            }
            $(".lightBtnDownTextSelector").html(text);
        },
        takeAwayBtnDownText:function(){
            var text = "";
            var str = Data.stationList.join(",");
            if (Data.lotterytimes==1&&Data.paytimes==0) {
                text = '赠送免费机会，快去试试手气吧';
            }else if(Data.paytimes<4&&str.indexOf("station_end")==-1){
                text = '就差1段路就到家了，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktr">继续点亮线路&gt;&gt;</a>';
            }else if(Data.paytimes>3 && str.indexOf("station_end")==-1){
                text = '离家越来越近了，<a href="javascript:;" class="payBtn" clickid="act_vip2017_cjhd1_jxktr">继续点亮线路&gt;&gt;</a>';
            }else if (str.indexOf("station_end")!=-1) {
                text="恭喜您成功到家！"
            }
            $(".takeAwayBtnDownTextSelector").html(text);
        },
        getPrizeTips:function(money){
            var tpl = ['<div class="pop-act" id="getPrizeTips" style="display:none">',
            '    <a class="pop-close" href="javascript:msgbox.exit();"></a>',
            '    <div class="pop-hd">',
            '        <h3>恭喜您</h3>',
            '        <p>获得'+money+'元回家金</p>',
            '    </div>',
            '    <div class="pop-bd">',
            '        <i class="fw fw01"></i>',
            '        <i class="fw fw02"></i>',
            '        <i class="fw fw03"></i>',
            '        <div class="card">',
            '            <p><em>'+money+'</em>元</p>',
            '        </div>',
            '    </div>',
            '    <div class="pop-fd">',
            '        <a href="javascript:;" class="btn act_prize">立即查看</a>',
            '    </div>',
            '</div>'].join("");
            $("#getPrizeTips").remove();
            $("body").append(tpl);
            msgbox.show("getPrizeTips");
        },
        lottery:function(c) {
            var c = c || {};
            var defaultConfig = {
                lotteryBox: '#lotteryBox',
                //整个转盘id选择器
                giftItem: '.giftItem',
                //单个奖品选择器
                sort: [],
                //排序，默认为顺序
                targetClass: 'on',
                //选中时的class，默认on
                fastSpeed: 80,
                //快速阶段的速度(定时器时间间隔)，默认80
                slowSpeed: 400,
                //慢速阶段的速度(定时器时间间隔)，默认400
                startStep: 4,
                //开头的慢速阶段跑几步，默认4
                endStep: 4 //结束的慢速阶段跑几步，默认4
            };
            var config = {};

            var timeIntervalId;
            //定时器
            var isRuning;
            //是否正在抽奖中
            var curStatus;
            //0:停止  1:启动截断 2:中间快速阶段  3:中奖减速阶段
            var giftIndex;
            //抽中奖品的位置,-1表示还没获得
            var curIndex;
            //当前在哪个位置
            var runCount;
            //累计总共跑了几个位置
            var endCallback;
            //用来注册结束时回调的函数
            function reset() {
                config = $.extend(defaultConfig, c);
                timeIntervalId = 0;
                //定时器
                isRuning = false;
                //是否正在抽奖中
                curStatus = 0;
                //0:停止  1:启动截断 2:中间快速阶段  3:中奖减速阶段
                giftIndex = -1;
                //抽中奖品的位置,-1表示还没获得
                curIndex = 0;
                //当前在哪个位置
                runCount = 0;
                //累计总共跑了几个位置
                endCallback = null;
                //用来注册结束时回调的函数
                clearInterval(timeIntervalId);
            }
            reset();

            var $lotteryBox = $(config.lotteryBox);
            var giftCount = $lotteryBox.find(config.giftItem).length;
            //奖品总数

            var idx = 0;
            if (!config.sort || config.sort.length != giftCount) {
                $lotteryBox.find(config.giftItem).each(function() {
                    $(this).attr('sort', idx);
                    idx++;
                });
            } else {
                $lotteryBox.find(config.giftItem).each(function() {
                    $(this).attr('sort', config.sort[idx]);
                    idx++;
                });
            }

            $lotteryBox.find(config.giftItem).unbind('mouseenter').bind('mouseenter', function() {
                $(this).addClass('hover');
            });
            $lotteryBox.find(config.giftItem).unbind('mouseleave').bind('mouseleave', function() {
                $(this).removeClass('hover');
            });

            //开始
            function run() {
                if (isRuning == true) {
                    return;
                }
                reset();

                isRuning = true;
                focusToNext();
                curStatus = 1;
                //开始
                myInterval('slow');
            }

            //设置定时器，私有函数
            function myInterval(speed) {
                clearInterval(timeIntervalId);
                var time = speed == 'fast' ? config.fastSpeed : config.slowSpeed;
                timeIntervalId = setInterval(function() {
                    runCount++;
                    curIndex = runCount % giftCount;
                    focusToNext();
                    stepFunction();
                }, time);
            }

            //设置当前dom状态，私有函数
            function focusToNext() {
                $lotteryBox.find(config.giftItem).removeClass(config.targetClass);
                $lotteryBox.find(config.giftItem + '[sort=' + curIndex + ']').eq(0).addClass(config.targetClass);
            }

            //每跑一步检测当前状态，私有函数
            function stepFunction() {
                if (curStatus == 1 && runCount == config.startStep) {
                    curStatus = 2;
                    //加速
                    //console.debug('---fast---');
                    myInterval('fast');
                }

                if (curStatus == 2 && (runCount >= (config.startStep + giftCount))) {
                    //至少要快速跑一圈
                    if (giftIndex != -1) {
                        var needNum = giftCount - config.endStep - (curIndex - giftIndex);
                        if (needNum == 0 || needNum == giftCount) {
                            curStatus = 3;
                            //中奖减速阶段
                            myInterval('slow');
                        }
                    }
                }

                if (curStatus == 3 && curIndex == giftIndex) {
                    end();
                }
            }

            //结束，私有函数
            function end() {
                clearInterval(timeIntervalId);
                isRuning = false;
                setTimeout(function() {
                    (typeof (endCallback) == 'function') && endCallback();
                }, 200);
            }

            //强制停止结束，清除状态
            function forceEnd(_endCallback) {
                endCallback = _endCallback;
                end();
                $lotteryBox.find(config.giftItem).removeClass(config.targetClass);
            }

            function setGift(_giftIndex, _endCallback) {
                giftIndex = _giftIndex;
                endCallback = _endCallback;
            }

            return {
                'run': run,
                'setGift': setGift,
                'forceEnd': forceEnd
            };
        }
    };
    var lotteryInstance = null;
    var Data = {
        lotterytimes: 0,
        paytimes: 0,
        payid:{},
        lineList:[],
        stationList:[],
        redpacketNum:0,
        prizeStatus:-1,
        totalMoney:'00000',
        lineObj:{
            "line_1":0,
            "line_2":1,
            "line_3":7,
            "line_4":2,
            "line_5":8,
            "line_6":9,
            "line_7":3,
            "line_8":4,
            "line_9":10,
            "line_10":5,
            "line_11":6
        }
    };
    main.onInit(function(data) {
        var Events = {
            //initPage
            'document|.loginBtn|click': function() {
                if (!haslogin()) {
                    login();
                    return false;
                }
            },
            'document|.actEnd2Spring2|click':function(){
                location.href="http://act.vip.xunlei.com/pc/vip/2018/spring2/?referfrom=v_pc_hygw_ggong_cjhd_1qtz";
            },
            'document|.actEndTipsBtn|click': function() {
                msgbox(Data.message, {
                    btn_title: '确定',
                    btn_href: 'javascript:;',
                    btn_fn: function() {
                        msgExit();
                    }
                });
                return;
            },
            'document|.isMobileTipsBtn|click': function() {
                msgbox("亲，请通过PC端参与活动，200万玩客币大赠送哦~", {
                    btn_title: '确定',
                    btn_href: 'javascript:;',
                    btn_fn: function() {
                        msgExit();
                    }
                });
                return;
            },
            //buyObj
            'document|.payBtn|click': function() {
                if (!haslogin()) {
                    login();
                    return false;
                }else {
                    pay(Data.payid['default'],Data.payid.payid);
                }
            },
            'document|.firstNoWKcoin|click': function() {
                msgbox('活动太火爆，玩客币暂时缺货，现开通超级会员，还送最多18Q币+2次赢4999元现金红包的机会！', {
                    btn_title: '立即抢购',
                    btn_href: 'javascript:;',
                    btn_class: 'payBtn'
                });
            },
            'document|.firstNoBothCoin|click': function() {
                msgbox('活动太火爆，玩客币暂时缺货', {
                    btn_title: '确定',
                    btn_href: 'javascript:;',
                    btn_fn: function() {
                        msgExit();
                    }
                });
            },
            'document|.secondHoveQQcoin|click': function() {
                msgbox('您已获得过玩客币(每个用户只有1次机会)。现开通超级会员，还送最多18Q币+2次赢4999元现金红包的机会，继续抢！', {
                    btn_title: '立即抢购',
                    btn_href: 'javascript:;',
                    btn_class: 'payBtn'
                });
            },
            'document|.secondNoQQcoin|click': function() {
                msgbox('您已获得过玩客币(每个用户只有1次机会)。感谢您的参与！', {
                    btn_title: '确定',
                    btn_href: 'javascript:;',
                    btn_fn: function() {
                        msgExit();
                    }
                });
            },
            'document|.locationBtn|click':function(){
                var topHeight = $(".wp-cont").offset().top;
                $("html,body").animate({scrollTop:topHeight},400);
            },
            'document|.noChanceNoOpen|click':function(){
                msgbox('主人，您没有点亮机会咯，开会员，尊享7.8折，送4次点亮机会，赢最高18000元回家！', {
                    btn_title: '立即开通',
                    btn_href: 'javascript:;',
                    btn_class: 'payBtn'
                });
            },
            'document|.noChanceHaveOpen|click':function(){
                msgbox('主人，您没有点亮机会咯，还差一点，就有机会领最高18000元回家金！开会员，送点亮机会，有预感你会中哦！', {
                    btn_title: '立即开通',
                    btn_href: 'javascript:;',
                    btn_class: 'payBtn'
                });
            },
            'document|.lotteryBtn|click':function(){
                var topHeight = $(".wp-cont").offset().top;
                $("html,body").animate({scrollTop:topHeight},400);
                if (isInroom == 1) {
                    return false;
                }
                isInroom = 1;
                $.ajax({
                    url:"http://dyactive2.vip.xunlei.com/iface/",
                    // url:"http://www.xuliehaonet.com/interface/jsonp.php",
                    data:{
                        action:"getLottery",
                        actid:"vip2018spring1"
                    },
                    dataType:"jsonp",
                    success:function(rs){
                        if(rs.result==0){
                            lotteryInstance.run();
                            lotteryInstance.setGift(Data.lineObj[rs.data.line], function(){
                                Utilities.lotteryCallBack(rs.data);
                            });
                        }else {
                            isInroom = 0;
                            msgbox.showErrorMsg(rs.msg);
                        }
                    },
                    error:function(){
                         alert("网络错误，刷新再试！");
                    }
                });
            },
            'document|.takeAwayBtn|click':function(){
                $.ajax({
                    url:"http://dyactive2.vip.xunlei.com/iface/",
                    data:{
                        action:"getPrize",
                        actid:"vip2018spring1"
                    },
                    dataType:"jsonp",
                    success:function(rs){
                        if (rs.result==0) {
                            Utilities.getPrizeTips(rs.data.sendMoney);
                            $(".takeAwayBtnSelector").text("已领取").removeClass("takeAwayBtn").addClass("disabled");
                        }else {
                            if (Data.lotterytimes==1&&Data.paytimes==0) {
                                msgbox('点亮回家线路，即可领取最高18000元回家金哦！免费送您1次点亮机会，快去点亮吧！', {
                                    btn_title: '立即点亮',
                                    btn_href: 'javascript:msgExit();',
                                    btn_class: 'locationBtn'
                                });
                            }else {
                                msgbox('您还没有点亮回家的线路哦，开会员送点亮机会，到家领最高18000元回家金哦！', {
                                    btn_title: '立即开通',
                                    btn_href: 'javascript:;',
                                    btn_class: 'payBtn'
                                });
                            }
                        }
                    },
                    error:function(){
                        alert("网络错误，刷新再试！");
                    }
                });
            }
        };
        var initPage = {
            init: function() {
                // this.rebuild();
                this.lightLantern();
                this.marquee(data.prizeList);
                this.sendMoney();
                // this.showWhichTips();
                this.initLottery();
            },
            lightLantern:function(){
                $(".time1").addClass("on");
            },
            rebuild:function(){
                var img = [],
                    flag = 0,
                    imglist = [
                        'img/card.png',
                        'img/dark.jpg',
                        'img/light.jpg',
                        'img/light.png',
                        'img/spr-banner.png',
                        'img/spr-bg.png',
                        'img/spr-dog.png',
                        'img/spr-firework.png',
                        'img/spr-map.png',
                        'img/spr-pop.png',
                        'img/spr-timenav.png',
                        'img/spr.png'
                    ];
                var len = imglist.length;
                for(var i = 0; i < len; i++){
                    img[i] = new Image();
                    img[i].src = imglist[i];
                    img[i].onload = function(){
                        flag++;
                        if(flag == len) {
                            $('body').addClass('ani');
                            loop();
                            setTimeout(function(){
                                $('.firework').fadeOut(1000);
                            },6000);
                        }
                    }
                }
                setTimeout(function(){
                    if(flag != len){
                        $('body').addClass('ani');
                        loop();
                        setTimeout(function(){
                            $('.firework').fadeOut(1000);
                        },6000);
                    }
                }, 4000);
            },
            showWhichTips:function(){
                var _this = this;
                setTimeout(function(){
                    if(!haslogin()){
                        _this.falseTips();
                    }else{
                        if (Data.lotterytimes==1&&Data.paytimes==0) {
                            _this.congratulationTips();
                        }else {
                            _this.falseTips();
                        }
                    }
                },60000);
            },
            sendMoney:function(){
                $(".sendMoney_selector").text(Utilities.toThousands(data.sendMoney));
            },
            marquee: function(data) {
                var tpl = '<li><%= list.ctime %> <span class="name"><%= list.nickname %></span>成功到家，获得<span class="msg"><%= list.money %>元</span>回家金</li>';
                var html = '';
                for (var i = 0, len = data.length; i < len; i++) {
                    html += _.template(tpl)({
                        list: data[i]
                    });
                }
                $('#slide ul').html(html);
                $('#slide').textSlider({
                    direction: 'top',
                    speed: 1000,
                    wait: 800,
                    line: 1,
                    per: 2,
                    child: 'ul'
                });
            },
            falseTips:function(){
                var tpl = ['<div class="pop-act" id="falseTips" style="display:none">',
                '    <a class="pop-close" href="javascript:msgbox.exit();"></a>',
                '    <div class="pop-hd">',
                '        <h3>恭喜<em>'+data.lotteryUser.nickname+'</em></h3>',
                '        <p>获得'+data.lotteryUser.money+'元回家金</p>',
                '    </div>',
                '    <div class="pop-bd">',
                '        <i class="fw fw01"></i>',
                '        <i class="fw fw02"></i>',
                '        <i class="fw fw03"></i>',
                '        <div class="card">',
                '            <p><em>'+data.lotteryUser.money+'</em>元</p>',
                '        </div>',
                '    </div>',
                '    <div class="pop-fd">',
                '        <a href="javascript:;" class="btn payBtn">立即开通</a>',
                '        <p class="tips">下一个中奖的就是你</p>',
                '    </div>',
                '</div>'].join("");
                $("#falseTips").remove();
                $("body").append(tpl);
                msgbox.show("falseTips");
            },
            congratulationTips:function(){
                var tpl = ['<div class="pop-act" id="congratulationTips" style="display:none">',
                '    <a class="pop-close" href="javascript:msgbox.exit();"></a>',
                '    <div class="pop-hd">',
                '        <h3>送你1次免费点亮机会</h3>',
                '        <p>赢最高18000元回家金</p>',
                '    </div>',
                '    <div class="pop-bd">',
                '        <i class="fw fw01"></i>',
                '        <i class="fw fw02"></i>',
                '        <i class="fw fw03"></i>',
                '        <div class="card">',
                '            <p class="maxnum hide-txt">最高18000元</p>',
                '        </div>',
                '    </div>',
                '    <div class="pop-fd">',
                '        <a href="javascript:msgbox.exit();" class="btn locationBtn">立即点亮</a>',
                '        <p class="tips">快去试试手气吧</p>',
                '    </div>',
                '</div>'].join("");
                $("#congratulationTips").remove();
                $("body").append(tpl);
                msgbox.show("congratulationTips");
            },
            initLottery:function(){
                lotteryInstance = Utilities.lottery({
                    lotteryBox: '#act_lottery_box',
                    //整个转盘id选择器
                    giftItem: 'span',
                    //单个奖品选择器
                    sort: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    //排序，默认为顺序
                    targetClass: 'on',
                    //选中时的class，默认on
                    fastSpeed: 180,
                    //快速阶段的速度(定时器时间间隔)，默认80
                    slowSpeed: 400,
                    //慢速阶段的速度(定时器时间间隔)，默认400
                    startStep: 4,
                    //开头的慢速阶段跑几步，默认4
                    endStep: 4,
                    //结束的慢速阶段跑几步，默认4
                });
            }
        };
        initPage.init();
        U.initEvents(Events);
    });

    main.onLoginInit(function(data) {
        var loginObj = {
            init:function(){
                this.initData();
                this.setHaveGetRedEnvelope();
                this.setHaveGetMoney();
                this.setLightLine();
                this.setLightDog();
                this.lightBtn();
                this.takeAwayBtn();
                this.lightBtnDownText();
                this.takeAwayBtnDownText();
            },
            initData:function(){
                Data.lotterytimes = data.lotterytimes;
                Data.paytimes = data.paytimes;
                Data.payid = data.payid;
                Data.totalMoney = data.totalMoney;
                Data.lineList = data.lineList;
                Data.stationList = data.stationList;
                Data.prizeStatus = data.prizeStatus;
            },
            setHaveGetRedEnvelope:function(){
                $(".unpackcnt").text(data.redpacketNum);
            },
            setHaveGetMoney:function(){
                var html = '';
                $.each(("00000" + data.totalMoney.toString()).slice(-5).split(''), function(key, value) {
                    html += "<em>" + value + "</em>";
                });
                $("#myTargetElement").html(html);
            },
            setLightLine:function(){
                $.each(Data.lineList,function(key,value){
                    $("."+value).addClass("active");
                });
            },
            setLightDog:function(){
                $.each(Data.stationList,function(key,value){
                    $("."+value).addClass("active");
                    if (value=="station_end") {
                        $(".mapline12").addClass("active");
                    }
                });
            },
            lightBtn:function(){
                Utilities.lightBtnEvent();
            },
            takeAwayBtn:function(){
                if (data.prizeStatus==1) {
                    $(".takeAwayBtnSelector").text("已领取").addClass("disabled");
                }else {
                    $(".takeAwayBtnSelector").addClass("takeAwayBtn");
                }
            },
            lightBtnDownText:function(){
                Utilities.lightBtnDownText();
            },
            takeAwayBtnDownText:function(){
                Utilities.takeAwayBtnDownText();
            }
        };
        loginObj.init();
    });
});
