/*
* @Author: lungin
* @Date:   2016-11-25 13:42:11
* @Last Modified by:   lungin
* @Last Modified time: 2016-11-25 18:00:01
*/
var ballObj = {};
//创建球构造函数
function ball(ballx,bally) {
    this.r = 20;
    this.x = ballx;
    this.y = bally;
    this.xorigin = this.x;
    this.yorigin = this.y;
    this.speedX = this.rand(10,20)*(this.x%2?1:-1);
    this.speedY = this.rand(20,30)*(this.x%2?1:-1);
    this.width = 0;
    this.height = 0;
    this.rotate = this.rand(0,360);
    this.balltype = this.rand(0,3);
    this.canvas = {};
    this.ballpattern = document.getElementById("spr_lottery");
    this.init();
}
//2.向原型链添加方法
ball.prototype = {
    init:function () {
        var game = document.getElementById('machine');
        this.canvas = game.getContext('2d');
        this.width=game.width;
        this.height=game.height;
    },
    rand:function (min,max) {
        return Math.floor(Math.random() * (max-min+1)+min);
    },
    play:function () {
        this.canvas.beginPath();
        this.canvas.save();
        this.canvas.translate(this.x,this.y);
        this.canvas.rotate(this.rotate*Math.PI/180);
        this.canvas.fillStyle = this.canvas.drawImage(this.ballpattern,this.balltype*50,0,this.r*2,this.r*2,-this.r,-this.r,this.r*2,this.r*2);
        this.canvas.fill();
        this.canvas.restore();
        //this.x += this.speedX;
        //this.y += this.speedY;
        if (this.x + this.speedX > this.width - this.r) {
            this.speedX = -this.speedX;
        }
        if (this.x + this.speedX < this.r) {
            this.speedX = Math.abs(this.speedX);
        }
        if (this.y + this.speedY > this.height - this.r) {
            this.speedY = -this.speedY;
        }
        if (this.y + this.speedY < this.r) {
            this.speedY = Math.abs(this.speedY);
        }
        this.x += this.speedX;
        this.y += this.speedY;
    },
    back:function() {
        var distanceX = this.xorigin-this.x;
        var distanceY = this.yorigin-this.y;
        if (this.x > this.xorigin) {
            if(distanceX>-Math.abs(this.speedX)){
                this.speedX = distanceX;
            }else{
                this.speedX = -Math.abs(this.speedX);
            }
        }else if(this.x < this.xorigin){
            if(distanceX<Math.abs(this.speedX)){
                this.speedX = distanceX;
            }else{
                this.speedX = Math.abs(this.speedX);
            }
        }else{
            this.speedX = 0;
        }
        if (this.y > this.yorigin) {
            if(distanceY>-Math.abs(this.speedY)){
                this.speedY = distanceY;
            }else{
                this.speedY = -Math.abs(this.speedY);
            }
        }else if(this.y < this.yorigin){
            if(distanceY<Math.abs(this.speedY)){
                this.speedY = distanceY;
            }else{
                this.speedY = Math.abs(this.speedY);
            }
        }else{
            this.speedY = 0;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.canvas.beginPath();
        this.canvas.save();
        this.canvas.translate(this.x,this.y);
        this.canvas.rotate(this.rotate*Math.PI/180);
        this.canvas.fillStyle = this.canvas.drawImage(this.ballpattern,this.balltype*50,0,this.r*2,this.r*2,-this.r,-this.r,this.r*2,this.r*2);
        this.canvas.fill();
        this.canvas.restore();
    }
};

//3.创建X个小球
var timePlay,timeStop;
var arr = [];
var ballXArr = [25,35,50,60,80,95,100,120,130,140,150,170,180,190,200,210,220,230,240];
var ballYArr = [90,70,50,90,65,40,90,60,90,50,90,75,50,90,70,40,90,60,90];
var len = ballXArr.length;
for (var i=0;i<len;i++) {
    arr[i] = new ball(ballXArr[i],ballYArr[i]);
    arr[i].play();
}

/*setTimeout(function(){
    arr[0].canvas.clearRect(0,0,500,500);
    for (var i=0;i<arr.length;i++) {
        arr[i].play();
    }
},30);*/

for (var i=0;i<arr.length;i++) {
    arr[i].speedX = arr[i].rand(10,15);
    arr[i].speedY = arr[i].rand(10,15);
}

function loop(){
    arr[0].canvas.clearRect(0,0,500,500);
    for (var i=0;i<arr.length;i++) {
        arr[i].play();
    }
    requestAnimationFrame(loop);
}

ballObj.ballPlay=function(){
    clearInterval(timeStop);
    for (var i=0;i<arr.length;i++) {
        arr[i].speedX = arr[i].rand(10,15);
        arr[i].speedY = arr[i].rand(3,5);
    }
    timePlay = setInterval(function () {
        arr[0].canvas.clearRect(0,0,500,500);
        for (var i=0;i<arr.length;i++) {
            arr[i].play();
        }
    },30);
}

ballObj.ballBack=function(){
    clearInterval(timePlay);
    for (var i=0;i<arr.length;i++) {
        arr[i].speedX = arr[i].rand(15,20);
        arr[i].speedY = arr[i].rand(15,20);
    }
    timeStop = setInterval(function () {
        arr[0].canvas.clearRect(0,0,500,500);
        for (var i=0;i<arr.length;i++) {
            arr[i].back();
        }
    },30);
}
module.exports =  ballObj;
