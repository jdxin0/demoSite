var slider = {
    init: function() {
        this.event();
    },
    event:function(){
        var ele=document.getElementById('slider');
        if ('ontouchstart' in window) {
            ele.addEventListener('touchstart',this.EventListener,false);
            ele.addEventListener('touchmove',this.EventListener,false);
            ele.addEventListener('touchend',this.EventListener,false);
        }
    },
    EventListener: {
        index: 0, //显示元素的索引
        isScrolling:0,
        startPos:{},
        endPos:{},
        ele: document.getElementById('slider'), //this为slider对象
        icons: document.getElementById('icons'),
        icon: this.icons.getElementsByTagName('span'),
        handleEvent: function(event) {
            if (event.type == 'touchstart') {
                this.touchstart(event);
            } else if (event.type == 'touchmove') {
                this.touchmove(event);
            } else if (event.type == 'touchend') {
                this.touchend(event);
            }
        },
        //滑动开始
        touchstart: function(event) {
            var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
            this.startPos = {
                x: touch.pageX,
                y: touch.pageY,
                time: +new Date
            };
            this.isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
        },
        //移动
        touchmove: function(event) {
            //当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            var touch = event.targetTouches[0];
            this.endPos = {
                x: touch.pageX - this.startPos.x,
                y: touch.pageY - this.startPos.y
            };
            this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
            if (this.isScrolling === 0) {
                event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
                this.ele.className = 'cnt';
                this.ele.style.left = -this.index * 414 + this.endPos.x + 'px';
            }
        },
        //滑动释放
        touchend: function(event) {
            var duration = +new Date - this.startPos.time; //滑动的持续时间
            if (this.isScrolling === 0) { //当为水平滚动时
                this.icon[this.index].className = '';
                // console.log(Number(duration));
                if (Number(duration) > 100) {//500ms
                    //判断是左移还是右移，当偏移量大于30时执行
                    if (this.endPos.x > 30) {
                        if (this.index !== 0) this.index -= 1;
                    } else if (this.endPos.x < -30) {
                        if (this.index !== this.icon.length - 1) this.index += 1;
                    }
                }
                this.icon[this.index].className = 'curr';
                this.ele.className = 'cnt f-anim';
                this.ele.style.left = -this.index * 414 + 'px';
            }
        }
    }
};
slider.init();