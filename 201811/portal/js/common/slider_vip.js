define('js/common/slider_vip.js', function(require, exports, module){

/**
 * Created by yokibai on 2017/6/11.
 */
var music = require('js/common/music.js'),
    $ = music.$;

$.fn.slider=function(options){
    var defaults={
        animateTime:300,
        delayTime:5000
    }
    var setting=$.extend({},defaults,options);

    return this.each(function(){
        $obj=$(this);
        var o=setting.animateTime;
        var d=setting.delayTime;
        var $oban=$obj.find(".slider__item");
        var _len=$oban.length;
        var $nav=$obj.find(".slider_control__item");
        var $pager = $obj.find(".js_slider_pager");
        var _index=0;
        var timer;

        function init(){
            if(!$(".slider__item:first").first().hasClass("slider__item--current")) {
                $(".slider__item:first").first().addClass("slider__item--current");
            }
            if(!$(".slider_control__item:first").first().hasClass("slider_control__item--current")) {
                $(".slider_control__item:first").first().addClass("slider_control__item--current");
            }
        }

        //图片轮换
        function showImg(n){
            $oban.eq(n).addClass("slider__item--current").siblings().removeClass("slider__item--current");
            $nav.eq(n).addClass("slider_control__item--current").siblings().removeClass("slider_control__item--current");
        }
        //自动播放
        function player(){
            timer=setInterval(function(){
                var _index=$obj.find(".slider_control").find(".slider_control__item--current").index();
                showImg((_index+1)%_len);
            },d);
        }
        //
        $nav.click(function(){
            if(!($oban.is(":animated"))){
                _index=$(this).index();
                showImg(_index);
            }
        });
        $pager.on('click', function(){
            if(!($oban.is(":animated"))){
                _index =  _index + parseInt($(this).data('direct'), 10);
                _index < 0 && (_index = $oban.length - 1);
                _index >= $oban.length && (_index = 0);
                showImg(_index);
            }
        });
        //
        $oban.hover(function(){
            clearInterval(timer);
        },function(){
            player();
        });
        init();
        player();
    });
};

});