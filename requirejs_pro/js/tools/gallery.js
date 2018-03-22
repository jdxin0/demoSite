/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */


function GALLERY(content,nav,time,startIndex,selectClass,callback){this.content=content,this.nav=nav,this.time=time,this.index=0,this.len=nav.length,this.end=!1,this.inverval="",this.startIndex=startIndex,this.startFlag=!0,this.selectClass=selectClass,this.callback=this.callback,this.addCallback=callback,this.init()}var $=require("jquery");GALLERY.prototype={constructor:GALLERY,init:function(){var context=this,con=context.content,nav=context.nav;if(context.lastIndex=0,!(con.length<=1)){for(var i=0,len=con.length;i<len;i++)$(con[i]).attr("index",i).hover(function(){context.stop()},function(){context.start()}),$(nav[i]).attr("index",i);context.invoke(context.startIndex,1),context.start(),context.navHover()}},prev:function(){var index=this.index,context=this,len=this.len;index<0?index=len-2:index--,context.invoke(index),context.stop(),context.start()},invoke:function(index,flag){var context=this;context.callback.call(null,context,index,flag),context.addCallback&&context.addCallback.call(null,context,index,flag)},next:function(context){var context=this,index=context.index;index>context.len-2?index=0:index++,context.invoke(index),context.stop(),context.start()},start:function(){var context=this;context.inverval=function(){context.next()},context.startFlag?(context.stop(),context.myinterval=setInterval(context.inverval,context.time)):context.myinterval&&context.stop()},stop:function(){var context=this;clearInterval(context.myinterval)},reset:function(){var context=this;context.stop(),context.invoke(0)},confirmEnd:function(index){var context=this;index==context.len-1?context.end=!0:context.end=!1},navHover:function(){var context=this;context.nav.hover(function(){context.stop();var index=$(this).attr("index");context.invoke(index)},function(){context.start()})},navClick:function(){var context=this;context.nav.click(function(){context.stop();var index=$(this).attr("index");context.invoke(index)})},callback:function(context,index,flag){context.content.stop(!0,!0).eq(context.lastIndex).fadeOut(200).end().eq(index).fadeIn(400);var nav=context.nav,cla=context.selectClass;$(nav).removeClass(cla).eq(index).addClass(cla),context.lastIndex=index,context.index=index}},module.exports=GALLERY;
//# sourceMappingURL=gallery.js.map