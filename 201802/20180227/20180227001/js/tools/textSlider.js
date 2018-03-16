var $ = jQuery = require('jquery');
$.fn.textSlider = function(set) {
    settings = $.extend({
        speed: "normal",
        line: 1,
        timer: 3000,
        child: 'ul',
        per: 1,
        max: 8
    }, set);
    return this.each(function() {
        $.fn.textSlider.scllor($(this), settings);
    });
};
$.fn.textSlider.scllor = function($this, settings) {
    settings.wrap = settings['child'];
    var wrap = $(settings.wrap + ":eq(0)", $this);
    var timerID;
    var sub = wrap.children();
    if (sub.length < settings.max) return;
    settings.sub = sub.get(0).tagName.toLocaleString();
    settings.per = $this.attr('per') ? $this.attr('per') : settings.per;
    var liHight = 0;
    var upHeight = 0;
    var liWigth = 0;
    var leftWidth = 0;
    for (i = 0; i < settings.line; i++) {
        liHight = $(sub[i * settings.per]).outerHeight();
        upHeight = upHeight - liHight;
        liWigth = $(sub[i * settings.per]).outerWidth();
        leftWidth = leftWidth - liWigth;
    }
    var scrollUp = function() {
        wrap.animate({ marginTop: upHeight }, settings.speed, function() {
            getSub('first').appendTo(wrap);
            wrap.css({ marginTop: 0 });
        });
    };
    var scrollDown = function() {
        wrap.css({ marginTop: upHeight });
        getSub('last').prependTo(wrap)
        wrap.animate({ marginTop: 0 }, settings.speed, function() {
            _btnDown.bind("click", scrollDown); //Shawphy:绑定向上按钮的点击事件
        });
    };

    var scrollLeft = function() {
        wrap.animate({ marginLeft: leftWidth }, settings.speed, function() {
            getSub('first').appendTo(wrap);
            wrap.css({ marginLeft: 0 });
        });
    };
    var scrollRight = function() {
        wrap.css({ marginTop: leftWidth });
        getSub('last').prependTo(wrap)
        wrap.animate({ marginLeft: 0 }, settings.speed, function() {
            _btnDown.bind("click", scrollRight); //Shawphy:绑定向上按钮的点击事件
        });
    };

    function getSub(type) {
        var len = wrap.find(settings.sub).length;
        switch (type) {
            case 'first':
                //console.log(settings.per*settings.line);
                return wrap.find(settings.sub + ':lt(' + settings.per * settings.line + ')');
                break;
            case 'last':
                return wrap.find(settings.sub + ':gt(' + (len - settings.per) * settings.line + ')');
                break;
            default:
                break;
        }
    };
    var autoPlay = function() {
        if (settings.direction == 'vertical') {
            timerID = window.setInterval(scrollUp, settings.timer);
        } else {
            timerID = window.setInterval(scrollLeft, settings.timer);
        }

        //alert(settings.timer);
    };
    var autoStop = function() {
        window.clearInterval(timerID);
    };
    //事件绑定
    wrap.hover(autoStop, autoPlay).mouseout();
};
if ($('#act_slider, .act_slider, [name=act_slider]').length) {
    if (!$.isFunction(window.ACTCONFIG.initSliderList)) {
        $('#act_slider, .act_slider, [name=act_slider]').each(function() {
            var $this = $(this);
            var per = $this.attr('per') || 1;
            var max = $this.attr('max');
            var child = $this.attr('child') || 'ul';
            var direction = $this.attr('direction') || 'vertical'; //默认垂直
            var set = {
                per: per,
                child: child,
                max: max,
                direction: direction
            }
            $this.textSlider(set);
        })
    }
}