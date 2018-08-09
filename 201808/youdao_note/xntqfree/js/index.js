thunder(function() {
    this.tj('actid_451');
    window.msgbox = this.msgbox;
    window.pay = this.pay;
    var _ = this._;
    var main = this.main;
    window.user = this.user;
    var U = this.util;
    var isInroom = 0;
    this.share({
        title: '【特权新上线】爱奇艺会员等5折+随机免单！',
        desc: '30元话费邀您免费领>>',
        imgUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntqpre/images/share.jpg'
    });
    var shareObj = this;
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
        isMobile: function() {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "MicroMessenger", "micromessenger");
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
            } else {
                return false;
            }
        },
        toThousands: function(num) {
            var result = [],
                counter = 0;
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
        getUrlParam: function(key) {
            key = key.replace(/\[/g, "%5B");
            key = key.replace(/\]/g, "%5D");
            var query = arguments[1] ? arguments[1] : location.search;
            var reg = "/^.*[\\?|\\&]" + key + "\\=([^\\&]*)/";
            reg = eval(reg);
            var ret = query.match(reg);
            if (ret != null) {
                return decodeURIComponent(ret[1]);
            } else {
                return "";
            }
        },
        getData: function() {
            var prizeArr = ["vip2018jdonecent_p3", "vip2018jdonecent_p4", "vip2018jdonecent_p6", "vip2018jdonecent_p7", "vip2018jdonecent_p8", "vip2018jdonecent_p9", "vip2018jdonecent_p10", "vip2018jdonecent_p11"];
            var i = 7;
            var j = 8;
            return function() {
                return {
                    "result": 0,
                    "msg": "恭喜您获得了微信1元红包，关注迅雷会员微信公众号，输入红包口令，即可获得现金红包~您的现金红包口令是：天使爱美丽爱美丽爱",
                    "data": {
                        "keycode": "天使爱美",
                        "id": 359,
                        "prize": prizeArr[i--],
                        "tname": "微信1元红包",
                        "frontid": "0",
                        "addtime": "2018-03-14 16:44",
                        "fafang": "wxredact",
                        "btn_title": "兑现红包",
                        "btn_class": "show-public",
                        "btn_url": "",
                        "btn_urlwap": "",
                        "lotterytimes": --j
                    }
                }
            };
        }(),
        htmldecode: function(s) {
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.innerText || div.textContent;
        },
        showEndTime: function(secondsData, html, id) {
            function GetRTime(secondsData, html, id) {
                var t = secondsData;
                var dd = '00';
                var hh = '00';
                var mm = '00';
                var ss = '00';
                if (t >= 0) {
                    dd = Math.floor(t / 60 / 60 / 24);
                    hh = Math.floor(t / 60 / 60 % 24);
                    mm = Math.floor(t / 60 % 60);
                    ss = Math.floor(t % 60);

                    dd = dd > 9 ? dd + '' : '0' + dd;
                    hh = hh > 9 ? hh + '' : '0' + hh;
                    mm = mm > 9 ? mm + '' : '0' + mm;
                    ss = ss > 9 ? ss + '' : '0' + ss;
                } else {
                    Data.isbought = 0;
                    Data.tegouOrder = {
                        isLast: 0
                    };
                    DataChangeRenderPage.buyGoodsBtn();
                    $("#payGoodsTips").find(".xl-tab__cont").addClass("disabled");
                    $(".payTypeTab").removeClass("payTypeTab");
                    DataChangeRenderPage.stopCheckOrder();
                    clearInterval(window.payTipsTimer);
                }

                html = _.template(html)({
                    dd: dd,
                    hh: hh,
                    mm: mm,
                    ss: ss
                });
                $(id).html(html);
            }
            window.payTipsTimer = setInterval(function() {
                GetRTime(secondsData--, html, id);
            }, 1000);
        },
        bubbleSort: function(arr) {　　
            var len = arr.length;　　
            for (var i = 0; i < len; i++) {　　　　
                for (var j = 0; j < len - 1 - i; j++) {　　　　　　
                    if (arr[j].order - 0 > arr[j + 1].order - 0) {　　　　　　　　
                        var temp = arr[j + 1];　　　　　　　　
                        arr[j + 1] = arr[j];　　　　　　　　
                        arr[j] = temp;　　　　　　
                    }　　　　
                }　　
            }　　
            return arr;
        },
        isWeixin: function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        payStyle: function() {
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.match(/Alipay/i) == "alipay") {
                return "alipay";
            } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
                return "wechat";
            } else {
                return "other"
            }
        }
    };
    window.Data = {

    };
    window.DataChangeRenderPage = {
        data: {
            timeInter: null
        },
        pcCreatedOrder:function(){
            var tpl = ['<div class="mpop_box" id="pcCreatedOrder">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>此订单是pc页面创建的<br>请在pc端支付或取消订单重新下单</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:;" class="undoOrderBtn">取消订单</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#pcCreatedOrder_cover").remove();
            $("body").append(tpl);
            msgbox.show("pcCreatedOrder");
        },
        noSuperVipTips: function() {
            var tpl = ['<div class="mpop_box" id="noSuperVipTips">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>您还不是超级会员',
                '                    <br>立即开通，即可享受每月五折购</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:;" class="payBtn" payid="vip2018xntq_cj01" seat="1">开通会员</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#noSuperVipTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("noSuperVipTips");
        },
        noYearSuperVipTips: function() {
            var tpl = ['<div class="mpop_box" id="noYearSuperVipTips">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>您当前是超级会员如想购买更多虚拟商品',
                '                    <br>请开通<em>年费</em>超级会员!</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:;" class="payBtn" payid="vip2018xntq_cj02" seat="2">开通年费超级会员</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#noYearSuperVipTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("noYearSuperVipTips");
        },
        haveBuyNoToPay: function() {
            var tpl = ['<div class="mpop_box" id="haveBuyNoToPay">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>您已经购买了' + Data.tegouOrder.name,
                '                    <br>还未支付</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn two">',
                '            <a href="javascript:;" class="btn_cancel undoOrderBtn">取消订单</a>',
                '            <a href="javascript:;" class="payCreatedOrderBtn">去支付</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#haveBuyNoToPay_cover").remove();
            $("body").append(tpl);
            msgbox.show("haveBuyNoToPay");
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'unpay_pop_show',
                extdata: {
                    commodity_id: Data.gid
                }
            });
        },
        haveBuyThisMonth: function(gid) {
            var tpl = ['<div class="mpop_box" id="haveBuyThisMonth">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>本月您已购买过商品，欢迎下月再来!</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:msgbox.exit();">知道了</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#haveBuyThisMonth_cover").remove();
            $("body").append(tpl);
            msgbox.show("haveBuyThisMonth");
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'buied_pop_show',
                extdata: {
                    commodity_id: gid
                }
            });
        },
        createOrder: function() {
            var tpl = ['<div class="mpop_box" id="createOrder">',
                '    <div class="pop_cont">',
                '        <p class="txt_hd">' + Data.item.name + '</p>',
                '        <div class="pop_input">',
                '            <label>充值账号</label>',
                '            <input type="text" class="accountNum" placeholder="' + Data.item.inptitle + '">',
                '            <label>支付面额</label>',
                '            <p class="txt_pay">' + Data.item.sj_price + '元<span class="origin">' + Data.item.yj_price + '元</span></p>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:;" class="toPayOrderBtn">立即支付</a>',
                '        </div>',
                '        <ul class="txt_list">' + Utilities.htmldecode(Data.item.goodsdesc),
                '        </ul>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#createOrder_cover").remove();
            $("body").append(tpl);
            msgbox.show("createOrder");
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'commodity_gm_pop_show',
                extdata: {
                    commodity_id: Data.gid
                }
            });
        },
        payGoodsTipsApi: function(rs) {
            var tpl = ['<div class="mpop_box" id="payGoodsTips">',
                '    <div class="pop_cont">',
                '        <p class="txt_hd">手机扫码充值</p>',
                '        <div class="code_pay">',
                '            <div class="pay_tab">',
                '                <a href="javascript:;" class="payTypeTab cur" payType="zfb_pc">支付宝</a>',
                '                <a href="javascript:;" class="payTypeTab" payType="wx_pc">微信</a>',
                '            </div>',
                '            <div class="pay_img">',
                '                <img id="payQRcode" src="' + rs.data.payData.zfb_pc + '">',
                '            </div>',
                '        </div>',
                '        <ul class="pay_list">',
                '            <li>',
                '                购买商品：' + rs.data.name,
                '            </li>',
                '            <li>',
                '                充值账号：' + rs.data.account,
                '            </li>',
                '            <li>',
                '                支付金额：' + goodsList[rs.data.gid].sj_price + '元',
                '            </li>',
                '        </ul>',
                '        <p class="pay_time">',
                '            还剩<em id="showEndTime">00:00</em>支付时间',
                '        </p>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close stopOrderCheckBtn"></a>',
                '</div>'
            ].join("");
            $("#payGoodsTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("payGoodsTips");
            Utilities.showEndTime((Data.tegouOrder.outTime + 1800000 - Data.serverTime) / 1000, '<%= mm%>:<%= ss%>', '#showEndTime');
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'phone_scan_pop_show',
                extdata: {
                    commodity_id: rs.data.gid,
                    account: rs.data.account
                }
            });
        },
        payGoodsTipsData: function() {
            var tpl = ['<div class="mpop_box" id="payGoodsTips">',
                '    <div class="pop_cont">',
                '        <p class="txt_hd">手机扫码充值</p>',
                '        <div class="code_pay">',
                '            <div class="pay_tab">',
                '                <a href="javascript:;" class="payTypeTab cur" payType="zfb_pc">支付宝</a>',
                '                <a href="javascript:;" class="payTypeTab" payType="wx_pc">微信</a>',
                '            </div>',
                '            <div class="pay_img">',
                '                <img id="payQRcode" src="' + Data.tegouOrder.payData.zfb_pc + '">',
                '            </div>',
                '        </div>',
                '        <ul class="pay_list">',
                '            <li>',
                '                购买商品：' + Data.tegouOrder.name,
                '            </li>',
                '            <li>',
                '                充值账号：' + Data.tegouOrder.account,
                '            </li>',
                '            <li>',
                '                支付金额：' + goodsList[Data.tegouOrder.gid].sj_price + '元',
                '            </li>',
                '        </ul>',
                '        <p class="pay_time">',
                '            还剩<em id="showEndTime">00:00</em>支付时间',
                '        </p>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close stopOrderCheckBtn"></a>',
                '</div>'
            ].join("");
            $("#payGoodsTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("payGoodsTips");
            Utilities.showEndTime((Data.tegouOrder.outTime + 1800000 - Data.serverTime) / 1000, '<%= mm%>:<%= ss%>', '#showEndTime');
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'phone_scan_pop_show',
                extdata: {
                    commodity_id: Data.tegouOrder.gid,
                    account: Data.tegouOrder.account
                }
            });
        },
        paySuccessTips: function() {
            var tpl = ['<div class="mpop_box" id="paySuccessTips">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>恭喜您，购买成功，<em>还有免单机会!</em></p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:;" class="iWantFreeThisOrderBtn">我要免单</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#paySuccessTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("paySuccessTips");
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'buy_success_pop_show',
                extdata: {
                    commodity_id: Data.tegouOrder.gid
                }
            });
        },
        freeThisOrderTips: function() {
            $("#freeThisOrderTips").addClass("show");
            return;
            var tpl = ['<div class="mpop_box" id="freeThisOrderTips">',
                '    <div class="pop_cont">',
                '        <p class="txt_hd">恭喜您，被免单啦!</p>',
                '        <p class="txt_gz">请关注“迅雷会员”微信公众号并绑定迅雷账号',
                '            <br>即可领取返现红包，已付的金额100%全部返还</p>',
                '        <div class="code_img">',
                '            <img src="img/code.jpg">',
                '        </div>',
                '        <p class="txt_code">迅雷会员公众号</p>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#freeThisOrderTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("freeThisOrderTips");
        },
        noFreeThisOrderTips: function() {
            $("#noFreeThisOrderTips").addClass("show");
            return;
            var tpl = ['<div class="mpop_box" id="noFreeThisOrderTips">',
                '    <div class="pop_cont">',
                '        <div class="pop_txt">',
                '            <div class="txt_box">',
                '                <p>很遗憾，本次没有获得免单机会!</p>',
                '            </div>',
                '        </div>',
                '        <div class="pop_btn">',
                '            <a href="javascript:msgbox.exit();">知道了</a>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#noFreeThisOrderTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("noFreeThisOrderTips");
        },
        checkOrderRecorderTips: function(data) {
            var temTpl = [];
            var statusTxt = null;
            if (data.length == 0) {
                temTpl.push('<li style="text-align: center;display: block;">无记录</li>');
            } else {
                for (var key in data) {
                    if (data[key].status == 0) {
                        statusTxt = "下单完成，支付中";
                    } else if (data[key].status == 1) {
                        statusTxt = "取消支付";
                    } else if (data[key].status == 2) {
                        statusTxt = "支付成功，充值中";
                    } else if (data[key].status == 3) {
                        statusTxt = "充值成功";
                    } else if (data[key].status == 4) {
                        statusTxt = "充值失败";
                    }
                    temTpl.push('<li><span>' + data[key].date + '</span><span class="name">' + data[key].goods + '</span><span>' + statusTxt + '</span><span class="account" style="display:none">' + data[key].account + '</span></li>');
                }
            }
            var tpl = ['<div class="mpop_box" id="checkOrderRecorderTips">',
                '    <div class="pop_cont">',
                '        <p class="txt_hd">我的订单!</p>',
                '        <div class="tb_box">',
                '            <p class="tb_tt">',
                '                <span>时间</span>',
                '                <span>商品</span>',
                '                <span>订单状态</span>',
                '            </p>',
                '            <ul class="tb_list">' + temTpl.join(""),
                '            </ul>',
                '        </div>',
                '    </div>',
                '    <a href="javascript:msgbox.exit();;" class="pop_close"></a>',
                '</div>'
            ].join("");
            $("#checkOrderRecorderTips_cover").remove();
            $("body").append(tpl);
            msgbox.show("checkOrderRecorderTips");
            xla.push({
                type: 'event',
                category: 'hygw_xntq',
                action: 'gmjl_pop_show',
                extdata: {}
            });
        },
        mainPayBtn: function() {
            var txt = "";
            if (user.isSuperVip() && user.isYearVip()) {
                txt = "您是年费超级会员，请畅享5折购特权";
            } else if (user.isSuperVip()) {
                txt = "您是超级会员，5折乐购区已为您开启&gt;&gt;";
                $(".mainPayBtnSelector").removeClass("locationLGSection payBtn").addClass("locationLGSection");
            } else {
                txt = "开通超级会员，畅享5折购特权&gt;&gt;";
                $(".mainPayBtnSelector").removeClass("locationLGSection payBtn").addClass("payBtn");
            }
            $(".mainPayBtnSelector").html(txt);
        },
        sectionTxt: function() {
            var lgTxt = "";
            var ryTxt = "";
            if (user.isSuperVip()) {
                if (!!user.isYearVip()) {
                    lgTxt = "该区商品每月限购一款";
                    ryTxt = "该区商品每月限购一款，不与乐购区重复购买";
                } else {
                    lgTxt = "该区商品每月限购一款";
                    ryTxt = "您还不是年费超级会员，<a href='javascript:;' class='payBtn' payid='vip2018xntq_cj02'>开通</a>即可享受每月五折购";
                }
            } else {
                lgTxt = "您还不是超级会员，<a href='javascript:;' class='payBtn' payid='vip2018xntq_cj01'>开通</a>即可享受每月五折购";
                ryTxt = "您还不是年费超级会员，<a href='javascript:;' class='payBtn' payid='vip2018xntq_cj02'>开通</a>即可享受每月五折购";
            }
            $(".lgSection .sectionTxt").html(lgTxt);
            $(".rySection .sectionTxt").html(ryTxt);
        },
        buyGoodsBtn: function() {
            var classList = "noSuperVipTips noYearSuperVipTips payBtn createOrder haveBuyThisMonth haveBuyNoToPay sellOutBtn";
            if (user.isChild()) {
                $(".buyGoodsBtnSelector").removeClass(classList).addClass("isChildBtn");
                return;
            } else if (user.isStopVip()) {
                $(".buyGoodsBtnSelector").removeClass(classList).addClass("isStopVipBtn");
                return;
            } else {
                // 乐购区
                if (user.isSuperVip()) {
                    if (true) { //乐购专区
                        if (Data.tegouOrder.isLast == 1 && Data.isbought == 0) {
                            $(".lgSection .buyGoodsBtnSelector").removeClass(classList).addClass("haveBuyNoToPay");
                        } else {
                            if (Data.isbought == 0) { //未购买 
                                $(".lgSection .buyGoodsBtnSelector").removeClass(classList).addClass("createOrder");
                            } else { //已购买 
                                $(".lgSection .buyGoodsBtnSelector").removeClass(classList).addClass("haveBuyThisMonth");
                            }
                        }
                    }
                    if (!!user.isYearVip()) { //荣耀专区
                        if (Data.tegouOrder.isLast == 1 && Data.isbought == 0) {
                            $(".rySection .buyGoodsBtnSelector").removeClass(classList).addClass("haveBuyNoToPay");
                        } else {
                            if (Data.isbought == 0) { //未购买 
                                $(".rySection .buyGoodsBtnSelector").removeClass(classList).addClass("createOrder");
                            } else { //已购买 
                                $(".rySection .buyGoodsBtnSelector").removeClass(classList).addClass("haveBuyThisMonth");
                            }
                        }
                    } else {
                        $(".rySection .buyGoodsBtnSelector").removeClass(classList).addClass("noYearSuperVipTips");
                    }
                } else {
                    $(".buyGoodsBtnSelector").removeClass(classList).addClass("noSuperVipTips");
                }
                // 荣耀区
                this.reRenderBtnSellOut();
            }
        },
        checkHavePaySuccess: function(id) {
            var _this = this;
            this.data.timeInter = setInterval(function() {
                $.jsonp("https://dynamic-vip-ssl.xunlei.com/iface.php?c=tegouv2&a=getPayStatu&xlorderid=" + id, function(rs) {
                    if (rs.result == 0) {
                        DataChangeRenderPage.stopCheckOrder();
                        $("#otherBrowser_cover").remove();
                        DataChangeRenderPage.paySuccessTips();
                        Data.isbought = 1;
                        DataChangeRenderPage.buyGoodsBtn();
                    }
                });
            }, 5000);
        },
        stopCheckOrder: function() {
            clearInterval(this.data.timeInter);
            // msgbox.exit();
        },
        reRenderBtnSellOut: function() {
            var classList = "noSuperVipTips noYearSuperVipTips payBtn createOrder haveBuyThisMonth haveBuyNoToPay sellOutBtn";
            for (var key in goodsList) {
                if (goodsList[key].remain == 0) {
                    $(".goods" + key + "remain").parents(".item").find(".buyGoodsBtnSelector").removeClass(classList).addClass("sellOutBtn").text("已售罄").parent().addClass("disabled");
                } else {
                    $(".goods" + key + "remain").parents(".item").find(".buyGoodsBtnSelector").text("立即抢购").parent().removeClass("disabled");
                }
            }
        },
        alipay:function(){
            // Data.tegouOrder.payData.zfb_wap
            $("#zfb").html(Data.tegouOrder.payData.zfb_wap);
        },
        wechatPay:function(){
            // Data.tegouOrder.payData.wx_wap
            location.href = decodeURIComponent(Data.tegouOrder.payData.wx_wap);
        },
        otherBrowser:function(){
            var tpl = ['<div class="mpop_box" id="otherBrowser">',
            '    <div class="pop_cont">',
            '        <div class="pop_txt">',
            '            <div class="txt_box">',
            '                <p>请选择支付方式</p>',
            '            </div>',
            '        </div>',
            '        <div class="pop_btn two">',
            '            <a href="javascript:;" class="btn_cancel wechatPayBtn">微信支付</a>',
            '            <a href="javascript:;" class="alipayBtn">支付宝支付</a>',
            '        </div>',
            '    </div>',
            '    <a href="javascript:msgbox.exit();;" class="pop_close stopOrderCheckBtn"></a>',
            '</div>'].join("");
            $("#otherBrowser_cover").remove();
            $("body").append(tpl);
            msgbox.show("otherBrowser");
        }
    };
    var kanjiaObj = {
        init:function(){
            this.isKanjia();
        },
        events:function(){
            var search = location.search.indexOf("seat");
            var xlorderid = Utilities.getUrlParam("xlorderid");
            var seat = Utilities.getUrlParam("seat");
            var gid = Utilities.getUrlParam("gid");
            $(".shoulei_share_pep").click(function(){
                client.data.shareTo({
                    sharePlatform: 1,
                    shareHeadline: '收到一个砍价请求',
                    shareText: '亲们，快来帮我砍一下，马上就要成功了>>',
                    shareImageUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntqpre/images/share.jpg',
                    shareUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntq/index.html?shareno=' + xlorderid+'&gid='+gid+'&referfrom=v_wap_hygw_acti_svip_xzjs_fxyq'

                }, function(rs) {

                });
            });
            $(".shoulei_share_fri").click(function(){
                client.data.shareTo({
                    sharePlatform: 2,
                    shareHeadline: '收到一个砍价请求',
                    shareText: '亲们，快来帮我砍一下，马上就要成功了>>',
                    shareImageUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntqpre/images/share.jpg',
                    shareUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntq/index.html?shareno=' + xlorderid+'&gid='+gid+'&referfrom=v_wap_hygw_acti_svip_xzjs_fxyq'

                }, function(rs) {

                });
            });
            $(".btn_cancel").click(function(){
                $(".shoulei_share").hide();
            });
            $(".wechat_share").click(function(){
                $(this).hide();
            });
            $(".btn_kan").click(function(){
                if (U.isWeixin()) {
                    $(".wechat_share").show();
                } else if (U.isShouLei()) {
                    $(".shoulei_share").show();
                } else {
                    
                }
                
            });
        },
        isKanjia:function(){
            var search = location.search.indexOf("seat");
            var xlorderid = Utilities.getUrlParam("xlorderid");
            var seat = Utilities.getUrlParam("seat");
            var gid = Utilities.getUrlParam("gid");
            if (!U.isWeixin()&&!U.isShouLei()) {
                var clipboard = new ClipboardJS('.btn_kan', {
                    text: function() {
                        return 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntq/index.html?shareno=' + xlorderid+'&gid='+gid+'&referfrom=v_wap_hygw_acti_svip_xzjs_fxyq';
                    }
                });

                clipboard.on('success', function(e) {
                    alert('链接复制成功，快去分享吧');
                });

                clipboard.on('error', function(e) {
                    console.log(e);
                });
            }else{
                this.events();
            }
            if (search!==-1) {
                if (seat==3) {
                    shareObj.share({
                        title: '收到一个砍价请求',
                        desc: '亲们，快来帮我砍一下，马上就要成功了>>',
                        imgUrl: 'https://act-vip-ssl.xunlei.com/m/vip/2018/xntqpre/images/share.jpg',
                        link:'https://act-vip-ssl.xunlei.com/m/vip/2018/xntq/index.html?shareno=' + xlorderid+'&gid='+gid+'&referfrom=v_wap_hygw_acti_svip_xzjs_fxyq'
                    });
                    $("#kanjiaGoodsBox").show();
                    $("#freeOrderBox").hide();
                }else{
                    $("#kanjiaGoodsBox").hide();
                    $("#freeOrderBox").show();
                }
            }
        }
    }
    main.onInit(function(data) {
        $(document).on("click", ".input-wp", function() {
            $(".input-wp .input").focus()
        })
        $(document).on("focus", ".input-wp .input", function() {
            $(".input-wp .place").hide();
        })
        $(document).on("blur", ".input-wp .input", function() {
            if ($(".input-wp .input").val() == '') {
                $(".input-wp .place").show();
            }
        })
        $(document).on("click", "#payGoodsTips .payTypeTab", function() {
            $(this).addClass("cur").siblings().removeClass("cur");
            $("#payQRcode").attr("src", Data.tegouOrder.payData[$(this).attr("payType")]);
        })
        var Events = {
            //initPage
            'document|.loginBtn|click': function() {
                if (!haslogin()) {
                    login();
                    return false;
                }
            },
            'document|.isChildBtn|click': function() {
                msgbox("您当前使用的账号为子账号，暂不可参与此活动。")
            },
            'document|.isStopVipBtn|click': function() {
                msgbox("您当前使用的暂停会员账号，暂不可参与此活动。")
            },
            'document|.sellOutBtn|click': function() {
                msgbox("您当前购买的商品已售罄。")
            },
            //buyObj
            'document|.payBtn|click': function() {
                if (!haslogin()) {
                    login();
                    return false;
                } else {
                    pay($(this).attr("payid"));
                    if ($(this).attr("payid") == "vip2018xntq_cj01") {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'pay_pop_show',
                            extdata: {
                                commodity_id: Data.gid,
                                pop_type: "ktch",
                            }
                        });
                    } else {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'pay_pop_show',
                            extdata: {
                                commodity_id: Data.gid,
                                pop_type: "ktnfch"
                            }
                        });
                    }
                }
            },
            'document|.wechatPayBtn|click': function() {
                DataChangeRenderPage.wechatPay();
            },
            'document|.alipayBtn|click': function() {
                DataChangeRenderPage.alipay();
            },
            'document|.locationLGSection|click': function() {
                var top = $(".goodsBoxSelector").offset().top;
                $("body,html").scrollTop(top);
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
            'document|.haveBuyNoToPay|click': function() {
                Data.gid = $(this).attr("gid");
                Data.item = goodsList[Data.gid];
                DataChangeRenderPage.haveBuyNoToPay();
            },
            'document|.noSuperVipTips|click': function() {
                Data.gid = $(this).attr("gid");
                Data.item = goodsList[Data.gid];
                DataChangeRenderPage.noSuperVipTips();
            },
            'document|.noYearSuperVipTips|click': function() {
                Data.gid = $(this).attr("gid");
                Data.item = goodsList[Data.gid];
                DataChangeRenderPage.noYearSuperVipTips();
            },
            'document|.haveBuyThisMonth|click': function() {
                DataChangeRenderPage.haveBuyThisMonth($(this).gid);
            },
            'document|.createOrder|click': function() {
                Data.gid = $(this).attr("gid");
                Data.item = goodsList[Data.gid];
                DataChangeRenderPage.createOrder();
            },
            'document|.toPayOrderBtn|click': function() {
                if (Data.item.remain > 0) {
                    $.ajax({
                        url: "https://dynamic-vip-ssl.xunlei.com/iface.php",
                        // url: "http://www.xuliehaonet.com/interface/jsonp.php",
                        data: {
                            c: "tegouv2",
                            a: "buyGoods",
                            payway :"wap",
                            gid: Data.gid,
                            account: $(".accountNum").val()
                        },
                        dataType: "jsonp",
                        success: function(rs) {
                            // var rs = JSON.parse('{"result":0,"msg":"ok","data":{"qrCodeUrl":"https://xunlei.h5.fulu.com/Images/QrCode/201711201007272723235.png","orderid":"80368323915FD74025A6","paytype":1,"xlorderid":"103683344323916","isLast":1,"gid":"1002","account":"15679884","name":"腾讯10Q币","outTime":15705}}');
                            if (rs.result == 0) {
                                Data.isbought = 0;
                                Data.tegouOrder = rs.data;
                                DataChangeRenderPage.buyGoodsBtn();
                                // DataChangeRenderPage.payGoodsTipsApi(rs);
                                switch(Utilities.payStyle()){
                                    case "alipay":
                                        DataChangeRenderPage.alipay();
                                        break;
                                    case "wechat":
                                        DataChangeRenderPage.wechatPay();
                                        break;
                                    default:
                                        DataChangeRenderPage.otherBrowser();
                                        break;
                                }
                                goodsList[Data.gid].remain = goodsList[Data.gid].remain - 1
                                goodsListObj.remainRender(Data.gid, goodsList[Data.gid].remain);
                                DataChangeRenderPage.checkHavePaySuccess(rs.data.xlorderid);
                            } else {
                                msgbox.showErrorMsg(rs.msg);
                            }
                        },
                        error: function() {
                            alert("网络错误，刷新再试！");
                        }
                    });
                } else {
                    msgbox.showErrorMsg("商品已售完，请继续关注。")
                }
            },
            'document|.undoOrderBtn|click': function() {
                $.ajax({
                    url: "https://dynamic-vip-ssl.xunlei.com/iface.php",
                    data: {
                        c: "tegouv2",
                        a: "cancelOrder",
                        xlorderid: Data.tegouOrder.xlorderid
                    },
                    dataType: "jsonp",
                    success: function(rs) {
                        if (rs.result == 0) {
                            msgbox.showErrorMsg("已取消订单");
                            goodsList[Data.tegouOrder.gid].remain = goodsList[Data.tegouOrder.gid].remain - 0 + 1;
                            goodsListObj.remainRender(Data.tegouOrder.gid, goodsList[Data.tegouOrder.gid].remain);
                            Data.isbought = 0;
                            Data.tegouOrder = {
                                isLast: 0
                            };
                            DataChangeRenderPage.buyGoodsBtn();
                        }
                    },
                    error: function() {

                    }
                });
            },
            'document|.payCreatedOrderBtn_bak|click': function() {
                DataChangeRenderPage.payGoodsTipsData();
                DataChangeRenderPage.checkHavePaySuccess(Data.tegouOrder.xlorderid);
            },
            'document|.payCreatedOrderBtn|click': function() {
                switch(Utilities.payStyle()){
                    case "alipay":
                        DataChangeRenderPage.alipay();
                        break;
                    case "wechat":
                        DataChangeRenderPage.wechatPay();
                        break;
                    default:
                        DataChangeRenderPage.otherBrowser();
                        break;
                }
                // DataChangeRenderPage.payGoodsTipsData();
                if(Data.tegouOrder.payway=="wap"){
                    DataChangeRenderPage.checkHavePaySuccess(Data.tegouOrder.xlorderid);
                }else{
                    DataChangeRenderPage.pcCreatedOrder();
                }
            },
            'document|.stopOrderCheckBtn|click': function() {
                DataChangeRenderPage.stopCheckOrder();
            },
            'document|.checkOrderRecorderBtn|click': function() {
                if (!haslogin()) {
                    login();
                    return false;
                }
                $.ajax({
                    url: "https://dynamic-vip-ssl.xunlei.com/iface.php",
                    data: {
                        c: "tegouv2",
                        a: "getBuyList"
                    },
                    dataType: "jsonp",
                    success: function(rs) {
                        DataChangeRenderPage.checkOrderRecorderTips(rs.data);
                    },
                    error: function() {

                    }
                });
            },
            'document|.iWantFreeThisOrderBtn|click': function() {
                $.ajax({
                    url: "https://dyactive2-vip-ssl.xunlei.com/iface",
                    data: {
                        action: "lottery",
                        actid: "vip2018xntq",
                        xlorderid: Utilities.getUrlParam("xlorderid")
                    },
                    dataType: "jsonp",
                    success: function(rs) {
                        if (rs.result == 0) {
                            if (rs.data.isfree == 0) { //未中免单
                                DataChangeRenderPage.noFreeThisOrderTips();
                                xla.push({
                                    type: 'event',
                                    category: 'hygw_xntq',
                                    action: 'exemption_pop_show',
                                    extdata: {
                                        exemption_pop_click: Data.tegouOrder.gid,
                                        type: "fail" //succ-免单成功，fail-免单失败
                                    }
                                });
                            } else {
                                DataChangeRenderPage.freeThisOrderTips();
                                xla.push({
                                    type: 'event',
                                    category: 'hygw_xntq',
                                    action: 'exemption_pop_show',
                                    extdata: {
                                        exemption_pop_click: Data.tegouOrder.gid,
                                        type: "succ" //succ-免单成功，fail-免单失败
                                    }
                                });
                            }
                        } else {
                            msgbox.showErrorMsg(rs.msg);
                        }
                    },
                    error: function() {

                    }
                });
            }
        };
        var goodsListObj = {
            init: function() {
                this.getData();
            },
            data: {
                lgTpl: [],
                ryTpl: []
            },
            getData: function() {
                var _this = this;
                $.ajax({
                    url: "https://dyactive2-vip-ssl.xunlei.com/iface/",
                    // url: "http://www.xuliehaonet.com/interface/jsonp.php",
                    data: {
                        action: "goodsList",
                        actid: "vip2018xntq"
                    },
                    dataType: "jsonp",
                    success: function(rs) {
                        // var rs = Utilities.getData();
                        if (rs.result == 0) {
                            window.goodsList = rs.data.glist;
                            kanjiaObj.init();
                            var goodsListArr = [];
                            for (var key in goodsList) {
                                goodsListArr.push(goodsList[key]);
                            }
                            window.orderedGoodsListArr = Utilities.bubbleSort(goodsListArr);
                            for (var key in orderedGoodsListArr) {
                                if (orderedGoodsListArr[key].seat == 1) {
                                    _this.data.lgTpl.push(_this.getTplSnippet(orderedGoodsListArr[key], "vip2018xntq_cj01"));
                                } else {
                                    _this.data.ryTpl.push(_this.getTplSnippet(orderedGoodsListArr[key], "vip2018xntq_cj02"));
                                }
                            }
                            $(".lgSection .list").html(_this.data.lgTpl.join(""));
                            $(".rySection .list").html(_this.data.ryTpl.join(""));
                            _this.data.lgTpl = [];
                            _this.data.ryTpl = [];
                            // 渲染页面ok，do other thing
                            if (haslogin()) {
                                var timer = setInterval(function() {
                                    if (Data.userInfo) {
                                        _this.renderPage();
                                        clearInterval(timer);
                                    }
                                }, 10);
                            }

                        } else {
                            msgbox.showErrorMsg(rs.msg);
                        }
                    },
                    error: function() {
                        alert("网络错误，刷新再试！");
                    }
                });
            },
            getTplSnippet: function(item, payid) {
                var progress = item.remain / (item.total == 0 ? 1 : item.total) * 100;
                var tplSnippet = ['<li class="item">',
                    '    <div class="card_img">',
                    '        <div class="img_box">',
                    '            <img src="' + item.banner_upload + '" alt="">',
                    '        </div>',
                    '        <p class="txt_tt">' + item.title + '</p>',
                    '        <p class="txt_stt">' + item.descript + '</p>',
                    '    </div>',
                    '    <p class="txt_card">' + item.name + '</p>',
                    '    <p class="txt_price">',
                    '        <span class="price">' + item.sj_price + '元<span class="origin">' + item.yj_price + '元</span></span>',
                    '        <span class="yu goods' + item.gid + 'remain">剩余' + item.remain + '个</span>',
                    '    </p>',
                    '    <div class="bar_box">',
                    '        <i class="ic_bar" style="width: ' + progress + '%;"></i>',
                    '    </div>',
                    '    <a href="javascript:;" class="btn_buy loginBtn buyGoodsBtnSelector" payid="' + payid + '" gid="' + item.gid + '" seat="' + item.seat + '">立刻抢购</a>',
                    '</li>'
                ].join("");
                return tplSnippet;
            },
            renderPage: function() {
                DataChangeRenderPage.mainPayBtn();
                // DataChangeRenderPage.sectionTxt();
                DataChangeRenderPage.buyGoodsBtn();
            },
            remainRender: function(gid, remain) {
                $(".goods" + gid + "remain").text(remain);
            }
        };
        var initPage = {
            init: function() {
                this.initData();
                this.followServerTime();
                this.marquee(data.openlist);
            },
            data: {
                serverTime: null,
                timer: null
            },
            initData: function() {
                Data.serverTime = data.serverTime;
            },
            marquee: function(data) {
                var tpl = '<li class="record-item"><%= list.txt %></li>';
                var html = '';
                for (var i = 0, len = data.length; i < len; i++) {
                    html += _.template(tpl)({
                        list: data[i]
                    });
                }
                $('#slide ul').html(html);
                $('#slide').textSlider({
                    direction: 'top',
                    speed: 1800,
                    wait: 1000,
                    line: 1,
                    per: 1,
                    child: 'ul'
                });
            },
            followServerTime: function() {
                var _this = this;
                this.data.serverTime = new Date(data.serverTime);
                var seconds = this.data.serverTime.getSeconds();
                this.data.timer = setInterval(function() {
                    if (seconds == 61) {
                        seconds = 1
                    }
                    _this.data.serverTime.setSeconds(seconds++);
                    Data.serverTime = _this.data.serverTime.getTime();
                }, 1000);
            }
        };
        var dataReport = {
            init: function() {
                // this.loadingTjJS();
                this.maiDian();
            },
            loadingTjJS: function() {
                xla = window.xla = [];
                xla.push({
                    type: 'config',
                    appid: 20009,
                    secret: 'a8d1fc968b2fe1fe21bfe8f2abc4ba3a'
                });
                xla.push({
                    type: 'globalExtData',
                    data: {
                        platform: "wap",
                        pageid: 'hygw_xntq',
                        userid: getCookie("userid") || '',
                        is_vip: parseInt(getCookie("vip_isvip")) || '',
                        usertype: parseInt(getCookie("vas_type")) || '',
                        is_year: parseInt(getCookie("vip_isyear")) || '',
                        ed: {
                            platform: "wap",
                            pageid: 'hygw_xntq',
                            userid: getCookie("userid") || '',
                            is_vip: parseInt(getCookie("vip_isvip")) || '',
                            usertype: parseInt(getCookie("vas_type")) || '',
                            is_year: parseInt(getCookie("vip_isyear")) || ''
                        }
                    }
                });
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://res-etl-ssl.xunlei.com/v1.0.0/xla.min.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            },
            maiDian: function() {
                xla.push({
                    type: 'globalExtData',
                    data: {
                        platform: "wap",
                        pageid: 'hygw_xntq',
                        userid: getCookie("userid") || '',
                        is_vip: parseInt(getCookie("vip_isvip")) || '',
                        usertype: parseInt(getCookie("vas_type")) || '',
                        is_year: parseInt(getCookie("vip_isyear")) || 0,
                        ed: {
                            platform: "wap",
                            pageid: 'hygw_xntq',
                            userid: getCookie("userid") || '',
                            is_vip: parseInt(getCookie("vip_isvip")) || '',
                            usertype: parseInt(getCookie("vas_type")) || '',
                            is_year: parseInt(getCookie("vip_isyear")) || 0
                        }
                    }
                });
                xla.push({
                    type: 'event',
                    category: 'hygw_xntq',
                    action: 'page_show',
                    extdata: {}
                });
                var maiDianEvents = {
                    '#document|.createOrder|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'commodity_ljgm_click',
                            extdata: {
                                commodity_id: $(this).attr("gid"),
                                area: $(this).attr("seat") == 1 ? "ch_lg" : "nfch_ry",
                                position: 1
                            }
                        });
                    },
                    'document|.payBtn|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'pay_pop_click',
                            extdata: {
                                commodity_id: Data.gid,
                                pop_type: $(this).attr("seat") == 1 ? "ktch" : "ktnfch"
                            }
                        });
                    },
                    'document|.toPayOrderBtn|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'commodity_gm_pop_click',
                            extdata: {
                                commodity_id: Data.gid,
                                account: $(".accountNum").val(),
                                botton:"pay_now"
                            }
                        });
                    },
                    'document|.checkOrderRecorderBtn|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'gmjl_wzl_click',
                            extdata: {}
                        });
                    },
                    'document|.haveBuyNoToPay|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'unpay_pop_click',
                            extdata: {
                                commodity_id: $(this).attr("gid")
                            }
                        });
                    },
                    'document|.haveBuyThisMonth|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'buied_pop_click',
                            extdata: {
                                commodity_id: $(this).attr("gid"),
                                botton:"confirm"
                            }
                        });
                    },
                    'document|.iWantFreeThisOrderBtn|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'buy_success_pop_click',
                            extdata: {
                                commodity_id: Data.tegouOrder.gid,
                                button: "exemption"
                            }
                        });
                    },
                    'document|.mainPayBtnSelector|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'ktch_wzl_click',
                            extdata: {}
                        });
                    },
                    'document|.md_focusPic|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'act_event_click',
                            extdata: {
                                act_id: $(this).data('actid')
                            }
                        });
                    },
                    // 超会专区
                    'document|.js_djgtq_md|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'ch_event_djgtq_click',
                            extdata: {}
                        });
                    },
                    'document|.js_yltq_md|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'ch_event_yltq_click',
                            extdata: {}
                        });
                    },
                    'document|.js_dhtq_md|click': function() {
                        xla.push({
                            type: 'event',
                            category: 'hygw_xntq',
                            action: 'ch_event_dhtq_click',
                            extdata: {
                                clickid: $(this).data('clickid')
                            }
                        });
                    }
                }
                Utilities.initEvents(maiDianEvents);
            }
        }
        // 支付浮层，订单查询 逻辑
        initPage.init();
        goodsListObj.init();
        U.initEvents(Events);
        dataReport.init();
    });

    main.onLoginInit(function(data) {
        var loginObj = {
            init: function() {
                this.initData();
                this.loginRender();
            },
            initData: function() {
                Data = data;
            },
            loginRender: function() {
                var timer = setInterval(function() {
                    if (!!window.goodsList) {
                        DataChangeRenderPage.mainPayBtn();
                        DataChangeRenderPage.buyGoodsBtn();
                        clearInterval(timer);
                    }
                }, 10);
            }
        };
        loginObj.init();
    });
});