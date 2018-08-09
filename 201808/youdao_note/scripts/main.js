/**
 * Created by jinmin on 2016/5/31.
 */
$(function() {
    var keyfrom = getParameterByName('keyfrom'),
        vendor = getParameterByName('vendor'),
        downloadUrl = 'http://note.youdao.com/device.html';
    var ua = navigator.userAgent;
    var isIOS = /(?:ipad|iphone)/i.test(ua);
    var isAndroid = /(?:android)/i.test(ua);
    var isWeixin = /(micromessenger)/i.test(ua);
    var isWindowPhone = /(?:windows phone)/i.test(ua);
    var isYiXin = /(?:yixin)/i.test(ua);
    var isMobile = isIOS || isAndroid || isWindowPhone || isWeixin || isYiXin;

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var vendorUrl = {
        'union76' : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.note&ckey=CK1311024030981',
        'union77' : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.note&ckey=CK1311023308781',
        'union79' : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.note&ckey=CK1311874564516',
        'union80' : 'http://codown.youdao.com/note/youdaonote_union80.apk',
        'union81' : 'http://codown.youdao.com/note/youdaonote_union81.apk',
        'union82' : 'http://codown.youdao.com/note/youdaonote_union82.apk',
        'xunfei': 'http://codown.youdao.com/note/youdaonote_union66.apk'
    };

//ynote analyzer
    var Analyzer = {
        event: function (action) {
            var query = [];
            query.push(
                ['method', 'officialweb'],
                ['keyfrom', 'web'],
                ['user_id', JSON.parse(localStorage.getItem('yn:internal:uid'))],
                ['Browser', UAParser().browser.name + UAParser().browser.version],
                ['os', UAParser().os.name + UAParser().os.version],
                ['subCategory', 'ydoc'],
                ['attr', JSON.stringify([{ 'LogAction': action }])]
            );
            var params = query.map(function (kv) {
                return kv.join('=')
            }).join('&');
            $.ajax({
                method: 'POST',
                url: '/yws/api/personal/log?' + params
            });
        }
    };

    function joinUrl() {
        if (keyfrom && !vendor) {
            return downloadUrl + '?keyfrom=' + keyfrom;
        } else if (vendorUrl[vendor]) {
            return vendorUrl[vendor];
        } else {
            return keyfrom ? downloadUrl + '?vendor=' + vendor + '&keyfrom=' + keyfrom : downloadUrl + '?vendor=' + vendor;
        }
    }

    // function changeDownloadUrl() {
    //     if (!isWeixin) {
    //         if (keyfrom || vendor) {
    //             $('.dl').attr('href',joinUrl());
    //         }
    //     } else {
    //         if (vendor && (vendor == 'union76' || vendor == 'union77' || vendor == 'union79')) {
    //             $('.dl').attr('href',joinUrl());
    //         }
    //     }
    // }
    // if (isAndroid) {
    //     changeDownloadUrl();
    // }

    function analyze(s) {
        if (keyfrom) {
            Analyzer.event('website-wap'+'_btn_'+ s +'_keyfrom_' + keyfrom)
            window._hmt.push(['_trackEvent', 'keyfrom', 'keyfrom-'+ keyfrom, s+'-keyfrom-'+ keyfrom]);
        }
        if (vendor) {
            Analyzer.event('website-wap' + '_btn_' + s + '_vendor_' + vendor)
            window._hmt.push(['_trackEvent', 'vendor', 'vendor-'+ vendor, s+'-vendor-'+ vendor]);
        } else {
            Analyzer.event('website-wap' + '_btn_' + s + '_normal')
            window._hmt.push(['_trackEvent', 'normal', s+'-normal']);
        }
    }

    $('.header_dl').click(function() {
        analyze('header-dl');
    });
    $('.dl_btn.top').click(function() {
        analyze('top-dl');
    });
    $('.dl_btn.bottom').click(function() {
        analyze('bottom-dl');
    });
});