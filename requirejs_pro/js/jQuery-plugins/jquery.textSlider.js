$.fn.textSlider=function(set){var config=$.extend({direction:"top",speed:2e3,wait:1e3,child:"ul",line:1,per:1},set);return this.each(function(){$.fn.textSlider.scllor($(this),config)})},$.fn.textSlider.scllor=function($this,config){var timer,wrap=$this.find(config.child).eq(0),sub=wrap.children();if(0!==sub.length){var auto=!0;config.sub=sub.get(0).tagName.toLocaleString();var liHight,upHeight,liWigth,leftWidth,fn,ing=!1,scrollUp=function(){liHight=0,upHeight=0;for(var i=0;i<config.line;i++)liHight=wrap.children().eq(i*config.per).outerHeight(!0),upHeight-=liHight;ing=!0,wrap.animate({marginTop:upHeight},config.speed,function(){wrap.find(config.sub+":lt("+config.per*config.line+")").appendTo(wrap),wrap.css({marginTop:0}),ing=!1,auto&&(timer=setTimeout(scrollUp,config.wait))})},scrollLeft=function(){liWigth=0,leftWidth=0;for(var i=0;i<config.line;i++)liWigth=wrap.children().eq(i*config.per).outerWidth(!0),leftWidth-=liWigth;ing=!0,wrap.animate({marginLeft:leftWidth},config.speed,function(){wrap.find(config.sub+":lt("+config.per*config.line+")").appendTo(wrap),wrap.css({marginLeft:0}),ing=!1,auto&&(timer=setTimeout(scrollLeft,config.wait))})},bottom=function(){liWigth=0,leftWidth=0;wrap.children().length;$.each(wrap.children(),function(){});for(var i=0;i<config.line;i++)liWigth=wrap.children().eq(i*config.per).outerWidth(!0),leftWidth-=liWigth;ing=!0,wrap.animate({marginLeft:leftWidth},config.speed,function(){wrap.find(config.sub+":lt("+config.per*config.line+")").appendTo(wrap),wrap.css({marginLeft:0}),ing=!1,auto&&(timer=setTimeout(scrollLeft,config.wait))})};switch(config.direction){case"left":fn=scrollLeft;break;case"bottom":fn=bottom;break;default:fn=scrollUp}var autoPlay=function(){auto=!0,ing||(timer=setTimeout(fn,config.wait))},autoStop=function(){auto=!1,clearTimeout(timer)};"ontouchstart"in window||$this.hover(autoStop,autoPlay),fn()}};