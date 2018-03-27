$(document).ready(function() {
    var calssFirstObj = {
        init: function() {
            this.prepare();
            this.renderUl();
        },
        data: {
            shareList: ["For In循环IE8下bug和解决方案", "Emmet使用介绍", "ES6 Promise在会员活动中的应用", "MarkDown语法及本地GitHub效果预览"]
        },
        prepare: function() {
            Array.prototype.max = function() {
                return Math.max.apply(Math, this); //max取最大值，min取最小值。还有很多数学运算
            }
            Array.prototype.findIndex = function(predicate) {
                if (this === null) {
                    throw new TypeError('Array.prototype.findIndex called on null or undefined');
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return i;
                    }
                }
                return -1;
            };
        },
        getTpl: function() {
            var tplArr = [];
            for (var key in this.data.shareList) {
                tplArr.push('<li>' + this.data.shareList[key] + '</li>');
            }
            return tplArr.join(" ");
        },
        renderUl: function() {
            var tpl = this.getTpl();
            $("#appShowBox ul").html(tpl);
        }
    };
    calssFirstObj.init();
});