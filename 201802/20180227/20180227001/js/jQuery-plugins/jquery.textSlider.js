$.fn.textSlider = function(set) {
    var config = $.extend({
        direction: 'top',
        speed: 2000,
        wait : 1000,
        child: 'ul',
        line: 1,
        per: 1
    }, set);
    return this.each(function() {
        $.fn.textSlider.scllor($(this), config);
    });
};
$.fn.textSlider.scllor = function($this, config) {
    var wrap = $this.find(config.child).eq(0);
    var timer;
    var sub = wrap.children();
    if(sub.length === 0) {
        return;
    }
    var auto = true;
    config.sub = sub.get(0).tagName.toLocaleString();
    var liHight, upHeight, liWigth, leftWidth;
    var ing = false;
    var scrollUp = function() {
        liHight = 0;
        upHeight = 0;
        for (var i = 0; i < config.line; i++) {
            liHight = wrap.children().eq(i * config.per).outerHeight(true);
            upHeight = upHeight - liHight;
        }
        ing = true;
        wrap.animate({
            marginTop: upHeight
        }, config.speed, function() {
            wrap.find(config.sub + ':lt(' + config.per * config.line + ')').appendTo(wrap);
            wrap.css({
                marginTop: 0
            });
            ing = false;
            auto && (timer = setTimeout(scrollUp, config.wait));
        });
    };

    var scrollLeft = function() {
        liWigth = 0;
        leftWidth = 0;
        for (var i = 0; i < config.line; i++) {
            liWigth = wrap.children().eq(i * config.per).outerWidth(true);
            leftWidth = leftWidth - liWigth;
        }
        ing = true;
        wrap.animate({
            marginLeft: leftWidth
        }, config.speed, function() {
            wrap.find(config.sub + ':lt(' + config.per * config.line + ')').appendTo(wrap);
            wrap.css({
                marginLeft: 0
            });
            ing = false;
            auto && (timer = setTimeout(scrollLeft, config.wait));
        });
    };

    var bottom = function() {
        liWigth = 0;
        leftWidth = 0;
        var all = wrap.children().length;
        var _top = 0;
        $.each(wrap.children(), function() {

        })
        for (var i = 0; i < config.line; i++) {
            liWigth = wrap.children().eq(i * config.per).outerWidth(true);
            leftWidth = leftWidth - liWigth;
        }
        ing = true;
        wrap.animate({
            marginLeft: leftWidth
        }, config.speed, function() {
            wrap.find(config.sub + ':lt(' + config.per * config.line + ')').appendTo(wrap);
            wrap.css({
                marginLeft: 0
            });
            ing = false;
            auto && (timer = setTimeout(scrollLeft, config.wait));
        });
    };
    var fn;
    switch(config.direction) {
        case 'left':
            fn = scrollLeft;
            break;
        case 'bottom':
            fn = bottom;
            break;
        default:
            fn = scrollUp;
    }
    var autoPlay = function() {
        auto = true;
        if(!ing) {
            timer = setTimeout(fn, config.wait);
        }
    };
    var autoStop = function() {
        auto = false;
        clearTimeout(timer);
    };
    if(!('ontouchstart' in window)) {
        $this.hover(autoStop, autoPlay);
    }
    fn();
};