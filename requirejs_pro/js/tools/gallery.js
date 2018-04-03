var $ = require('jquery');
function GALLERY(content, nav, time, startIndex, selectClass, callback) {
    this.content = content;
    this.nav = nav;
    this.time = time;
    this.index = 0;
    this.len = nav.length;
    this.end = false;
    this.inverval = '';
    this.startIndex = startIndex;
    this.startFlag = true;
    this.selectClass = selectClass;
    this.callback = this.callback;
    this.addCallback = callback;
    this.init();
}
GALLERY.prototype = {
    constructor: GALLERY,
    init: function() {
        var context = this;
        var con = context.content;
        var nav = context.nav;
        context.lastIndex = 0;
        if (con.length <= 1) return;
        for (var i = 0,
        len = con.length; i < len; i++) {
            $(con[i]).attr('index', i).hover(function() {
                //console.log('stop')
                context.stop();
            },
            function() {
                //console.log('start')
                context.start();
            });
            $(nav[i]).attr('index', i);
        }
        context.invoke(context.startIndex, 1);
        context.start();
        context.navHover();
        //context.navClick();
    },
    prev: function() {
        var index = this.index;
        var context = this;
        var len = this.len;
        index < 0 ? index = len - 2 : index--;
        context.invoke(index);
        context.stop();
        context.start();
    },
    invoke: function(index, flag) {
        // alert('in')
        var context = this;
        context.callback.call(null, context, index, flag);
        if(context.addCallback){
             context.addCallback.call(null,context,index,flag);
        }

    },
    next: function(context) {
        var context = this;
        var index = context.index;
        var len = context.len;
        index > (len - 2) ? index = 0 : index++;
        context.invoke(index);
        context.stop();
        context.start();
    },
    start: function() {
        var context = this;
        context.inverval = function() {
            context.next();
        }
        if (context.startFlag) {
            context.stop();
            context.myinterval = setInterval(context.inverval, context.time);
        } else {
            if (context.myinterval) {
                context.stop();
            }
        }
    },
    stop: function() {
        var context = this;
        clearInterval(context.myinterval);
    },
    reset: function() {
        var context = this;
        context.stop();
        context.invoke(0);
    },
    confirmEnd: function(index) {
        var context = this;
        if (index == context.len - 1) {
            context.end = true;
        } else {
            context.end = false;
        }
    },
    navHover: function() {
        var context = this;
        context.nav.hover(function() {
            context.stop();
            var index = $(this).attr('index');
            context.invoke(index);

        },
        function() {
            context.start();
        })
    },
    navClick: function() {
        var context = this;
        context.nav.click(function() {
            context.stop();
            var index = $(this).attr('index');
            context.invoke(index);
            //context.start();
        })
    },
    callback: function(context, index, flag) {
        var con = context.content;
        con.stop(true, true).eq(context.lastIndex).fadeOut(200).end().eq(index).fadeIn(400);
        var nav = context.nav;

        var cla = context.selectClass;
        // alert(index)
        $(nav).removeClass(cla).eq(index).addClass(cla);
        context.lastIndex = index;
        context.index = index;
    }
};
module.exports = GALLERY;
