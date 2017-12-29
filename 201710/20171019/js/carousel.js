    /*轮播图*/
    var dx;//最小值-1，最大值1
    var startPos={};
    var endPos={};
    var isScrolling = 3;
    var startPageX;//起始焦点的pagex
    var curPage=0;//当前第几张焦点图
    var actBox=document.querySelector(".act_box");// 事件选择器
    var bannerCont=document.querySelector(".act_list");//焦点图容器
    var tagLi=bannerCont.querySelectorAll("li");//焦点图
    var focusPoint=document.querySelectorAll(".act_btns a");//焦点
    var liNums=tagLi.length;//焦点图数量
    var bannerWidth=bannerCont.offsetWidth;//banner图宽度
    actBox.addEventListener("touchstart",function(event){
        // console.log(event.touches[0].pageY)
        // console.log(event.touches[0])
        var touch = event.touches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        startPos = {
            x: touch.screenX,
            y: touch.screenY
        };
        // console.log("start");
        startPageX=event.touches[0].pageX;
        dx=0;
    }, false);
    actBox.addEventListener("touchmove",function(event){
        // console.log(event.touches[0])
        if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.touches[0];
        endPos = {
            x: touch.screenX - startPos.x,
            y: touch.screenY - startPos.y
        };
        isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        // console.log( Math.abs(endPos.x),Math.abs(endPos.y),isScrolling);

        if (isScrolling === 0) {
            event.preventDefault();
            var endPageX = event.touches[0].pageX;
            dx = Math.max(-1, Math.min(Math.round((endPageX - startPageX) / bannerWidth * 100) / 100, 1)); //[-1,1](0.1,0.11,0,23,0.34,0.45,0.56)
            var index = curPage;
            var dxs = dx;
            if (dx <= -0.3) {
                index = (index + 1) % liNums;
                dxs++;
            } else if (dx >= 0.3) {
                index = (index - 1) % liNums;
                dxs--;
            }
            // console.log('\n');
            // console.log('/*********touchmoveBegin********/');
            // console.log(index,dxs);
            setPostion(index,dxs);
        }
            
        
    }, false);
    actBox.addEventListener("touchend", function(event) {

        if (isScrolling === 0) {
            event.preventDefault();
            if (Math.abs(dx) >= 0.3) {
                curPage = (curPage + (dx > 0 ? -1 : 1) + liNums) % liNums;
            }
            if (Math.abs(dx) != 1) {
                openTransition();
            }
            // console.log('/*********touchendBegin********/');
            setPostion(curPage);
        }
        
       
    }, false);
    function setPostion(index,dxs){
        dxs=dxs||0;
        for(var x=-1;x<liNums-1;x++){
            var is=(x+index+liNums)%liNums;
            var rs=Math.max(-1,Math.min(dxs+x,1));
            // console.log("is:",is,",zIndex:",(x==0?1:0),",rs:",rs,",opacity:",(Math.round((1-0.5*Math.abs(rs))*100)/100));
            // console.log("is:",is,",zIndex:",(x==0?1:0),",translateX:",dxs+x);
            // console.log("is:",is,",zIndex:",(x==0?1:0),"rs",rs,",opacity:",Math.round((1-0.5*Math.abs(rs))*100)/100);
            tagLi[is].style.zIndex=(x==0?1:0);
            tagLi[is].style.opacity=Math.round((1-0.5*Math.abs(rs))*100)/100;
            tagLi[is].style.transform=tagLi[is].style.webkitTransform="translate3d("+(dxs+x)*100+"%,0,0) scale("+(Math.round((1-0.1*Math.abs(rs))*100)/100)+")";
        }
        // console.log('/*********End********/');
        for(var i=0;i<focusPoint.length;i++){
            focusPoint[i].className=i==index?"cur":"";
        }
    }
    function openTransition(){
        for(var i=0;i<tagLi.length;i++){
            var styleStr=tagLi[i].style;
            styleStr.transitionDuration="0.3s";
            styleStr.webkitTransitionDuration="0.3s";
            tagLi[i].addEventListener('webkitTransitionEnd', function(){
                this.style.transitionDuration=this.style.webkitTransitionDuration="0s";
                this.removeEventListener('webkitTransitionEnd',arguments.callee);
            }, false);
            tagLi[i].addEventListener('transitionend', function(){
                this.style.transitionDuration=this.style.webkitTransitionDuration="0s";
                this.removeEventListener('transitionend',arguments.callee);
            }, false);
        }
    }