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
    var a = hidePhoneNum(15927572994);
    console.log(a);
})();