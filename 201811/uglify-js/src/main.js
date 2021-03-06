/*global $ CountUp*/
(function () {
    function hidePhoneNum(num) {
        return String(num).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
    function hideEmailSec(email) {
        return String(email).replace(/(.{2}).+(.{2}@.+)/, '$1****$2');
    }
    function deepCopy(source, des) {
        des = des || (Object.prototype.toString.call(source) == '[object Array]' ? [] : {});
        for (var key in source) {
            if (typeof source[key] === 'object') {
                if (source[key].constructor === Array) {
                    des[key] = [];
                } else {
                    des[key] = {};
                }
                this.deepCopy(source[key], des[key]);
            } else {
                des[key] = source[key];
            }
        }
        return des;
    }
    function toThousands(num) {
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
    }
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = '-';
        var seperator2 = ':';
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;//return type 2017-08-28
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds(); //return type 2017-08-28 15:48:36
        return currentdate;
    }
    function getDataType(obj) {
        var rst = Object.prototype.toString.call(obj);
        rst = rst.replace(/\[object\s(\w+)\]/, '$1'); // [object Xxx]
        return rst.toLowerCase();
    }
    function getUrlParam(key) {
        key = key.replace(/\[/g, '%5B');
        key = key.replace(/\]/g, '%5D');
        var query = arguments[1] ? arguments[1] : location.search;
        var reg = '/^.*[\\?|\\&]' + key + '\\=([^\\&]*)/';
        var ret = query.match(reg);
        if (ret != null) {
            return decodeURIComponent(ret[1]);
        } else {
            return '';
        }
    }
    function objectLength(object) {
        var num = 0;
        for (var i in object) {
            if (i != 'undefined') {
                num++;
            }
        }
        return num;
    }
    function setCookie(name, value, Hours) {
        var domain = document.domain;//或document.location.host(域名加端口号);document.location.hostname(域名)
        var date = new Date();
        date.setTime(date.getTime() + Hours * 60 * 60 * 1000);
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; path=/; domain=' + domain + '; expires=' + date.toUTCString();
    }
    function getCookie(name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr != null) return unescape(arr[2]);
        return null;
    }
    function clearCookie(name) {
        document.cookie = encodeURIComponent(name) + '=; path=/; domain=' + document.domain + '; expires=expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
        //return parseInt(Math.random()*(max-min+1)+min,10);
    }
    function getRandomNum1_10() {
        return Math.ceil(Math.random() * 10);
    }

    function getRandomNum0_9() {
        return Math.floor(Math.random() * 10);
    }

    function getRandomNum0or1() {
        return Math.round(Math.random());
    }

    function getRandomNum1_Max(max) {
        return parseInt(Math.random() * max, 10) + 1;
        //return Math.floor(Math.random()*max)+1;
        //return Math.ceil(Math.random()*max);
    }

    function getRandomNum0_Max(max) {
        return parseInt(Math.random() * (max + 1), 10);
        //return Math.floor(Math.random()*(max+1));
    }
    function initEvents(Events) {
        var key, keyArr, delElems, elems, events;
        var spiltElems = function (elems) {
            return elems.split('&').join(',');
        };
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
    }
    function htmlencode(s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    }
    function htmldecode(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    }
    function isShoulei() {
        var ua = navigator.userAgent.toLowerCase();
        if (window.XLJSWebViewBridge || ua.match(/Thunder/i) == 'thunder') {
            return true;
        } else {
            return false;
        }
    }
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    function isIpad() {
        var getUA = navigator.userAgent.toLowerCase();
        return /ipad/i.test(getUA);
    }
    function isIOS() {
        var i = /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/;
        return i.test(navigator.userAgent);
    }
    function isAndroid() {
        var i = /\bAndroid([^;]+)/;
        return i.test(navigator.userAgent);
    }
    function injectStyle(cssHref) {
        var head = document.getElementsByTagName('head')[0];
        var cssURL = cssHref;
        var linkTag = document.createElement('link');
        linkTag.id = 'dynamic-style';
        linkTag.href = cssURL;
        linkTag.setAttribute('rel', 'stylesheet');
        linkTag.setAttribute('media', 'all');
        linkTag.setAttribute('type', 'text/css');
        head.appendChild(linkTag);
    }
    function injectScript(scriptSrc, callBack) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                callBack && callBack();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
            }
        };
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', scriptSrc);
        head.appendChild(script);
    }
    function isElementInView(element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
    function encodeUnicode(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return '\\u' + res.join('\\u');
    }
    function decodeUnicode(str) {
        str = str.replace(/\\/g, '%');
        return unescape(str);
    }
    function thousandsSeparator(num) {
        num = num.toString().split('.');  // 分隔小数点
        var arr = num[0].split('').reverse();  // 转换成字符数组并且倒序排列
        var res = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (i % 3 === 0 && i !== 0) {
                res.push(',');   // 添加分隔符
            }
            res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if (num[1]) {  // 如果有小数的话添加小数部分
            res = res.join('').concat('.' + num[1]);
        } else {
            res = res.join('');
        }
        return res;
    }
    function thousandsSeparator2(num) {
        var res = num.toString().replace(/\d+/, function (n) { // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                return $1 + ',';
            });
        });
        return res;
    }
    function bubbleSort(arr) {
        var temp = null;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    function trim(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/gi, '');
    }
    function moneyCountUp(startMoney, endMoney) {
        new CountUp('myTargetElement', startMoney, endMoney, 0, 1, {
            useEasing: false,
            useGrouping: false,
            formattingFn: function (num) {
                var html = '';
                $.each(('00000' + num.toString()).slice(-5).split(''), function (key, value) {
                    html += '<em>' + value + '</em>';
                });
                return html;
            }
        }).start();
    }
    var a = hidePhoneNum(15927572994);
    var b = toThousands(4897568);
    var c = getNowFormatDate();
    console.log(a, b, c);
})();