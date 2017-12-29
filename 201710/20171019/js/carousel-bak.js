(function(){
    /*轮播图*/
    var dx;
    var timer;
    var inter;
    var mouseX;
    var curPage=0;
    var actBox=document.querySelector(".act_box");
    var act=document.querySelector(".act_list");
    var imgs=act.querySelectorAll("li");
    var btns=document.querySelectorAll(".act_btns a");
    var len=imgs.length;
    var initWidth=act.offsetWidth;
    var isCan=true;
    var isUser=false;

    if(len==0)return;
    var dl=3-len;
    for(var i=0;i<dl;i++){
        var li=document.createElement("li");
        li.innerHTML=imgs[len-1].innerHTML;
        act.appendChild(li);
        imgs[len]=li;
        len++;
    }

    var setPostion=function(idx,dx){
        dx=dx||0;
        for(var i=-1;i<len-1;i++){
            var is=(i+idx+len)%len;
            var rs=Math.max(-1,Math.min(1,dx+i));
            imgs[is].style.zIndex=i==0?1:0;
            imgs[is].style.opacity=Math.round((1-.5*Math.abs(rs))*100)/100;
            imgs[is].style.transform=imgs[is].style.webkitTransform="translate3d("+(i+dx)*100+"%,0,0) scale("+(Math.round((1-.1*Math.abs(rs))*100)/100)+")";
        }
        for(var i=0;i<btns.length;i++){
            btns[i].className=i==idx?"cur":"";
        }
    }
    setPostion(curPage);

    var openTransition=function(){
        isCan=false;
        var a=[curPage];
        for(var i=0;i<imgs.length;i++){
            var s=imgs[i].style;
            s.transitionDuration=s.webkitTransitionDuration=".3s";
            imgs[i].addEventListener('webkitTransitionEnd', function(){
                this.style.transitionDuration=this.style.webkitTransitionDuration="";
                this.removeEventListener('webkitTransitionEnd',arguments.callee);
                isCan=true;
                if(!timer)
                    inter();
            }, false);
            imgs[i].addEventListener('transitionend', function(){
                this.style.transitionDuration=this.style.webkitTransitionDuration="";
                this.removeEventListener('transitionend',arguments.callee);
                isCan=true;
                if(!timer)
                    inter();
            }, false);
        }
    }


    actBox.addEventListener("touchstart",function(event){
        if(!isCan)
            return;
        clearInterval(timer);
        timer=null;
        event.preventDefault();
        isUser=true;
        mouseX=event.touches[0].pageX;
        dx=0;
    }, false);

    actBox.addEventListener("touchmove",function(event){
        if(!isUser)
            return;
        var x=event.touches[0].pageX;
        dx=Math.max(-1,Math.min(1,Math.round((x-mouseX)/initWidth*100)/100));
        var idx=curPage;
        var dxs=dx;
        if(dx<=-.4){
            idx=(idx+1)%len,dxs++;
        }else if(dx>=.4){
            idx=(idx-1)%len,dxs--;
        }
        setPostion(idx,dxs);
    }, false);

    actBox.addEventListener("touchend",function(event){
        if(!isUser)
            return;
        if(Math.abs(dx)>=.4)
            curPage=(curPage+(dx>0?-1:1)+len)%len;
        if(Math.abs(dx)!=1)
            openTransition();
        setPostion(curPage);
        isUser=false;
    }, false);

    inter=function(){
        timer=setInterval(function(){
            curPage=(curPage+1)%len;
            openTransition();
            setPostion(curPage);
        },3000);
    }
    inter();


})()