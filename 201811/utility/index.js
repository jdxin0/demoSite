module.exports = {
    hidePhoneNum: function (num) {
        return String(num).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    hideEmailSec: function (email) {
        return String(email).replace(/(.{2}).+(.{2}@.+)/, '$1****$2');
    },
    deepCopy: function (source, des) {
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
    },
    toThousands: function (num) {
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
    getNowFormatDate: function () {
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
    },
    getDataType: function (obj) {
        let rst = Object.prototype.toString.call(obj);
        rst = rst.replace(/\[object\s(\w+)\]/, '$1'); // [object Xxx]
        return rst.toLowerCase();
    }
};