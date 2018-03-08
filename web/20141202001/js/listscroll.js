// JavaScript Document
var ListScroll=function(options){
	this._init(options);
	if(this.box&&this.len&&this.width){
		this._setHTML();
	}
}
ListScroll.prototype={
	_init:function(options){
		this.options={
			box:null, //容器
			len:0, //显示数量
			width:0, //单位宽度
			duration:500, //动画持续时间
			btnpre:null, //向左按钮
			btnnext:null, //向右按钮
			isLoop:false, //是否循环
			isInterval: false, //是否自动
			intervalTime:4000 //计时器时间
		}
		this.options=jQuery.extend(this.options,options||{});
		this.box=this.options.box;
		this.len=this.options.len;
		this.width=this.options.width;
		this.boxWidth=this.len * this.width;
		this.duration=this.options.duration;
		this.btnpre=this.options.btnpre;
		this.btnnext=this.options.btnnext;
		this.isLoop=this.options.isLoop;
		this.isInterval=this.options.isInterval;
		this.intervalTime=this.options.intervalTime;
		this.left=0;
		this.maxLeft=0;
		this.lock=false;
	},
	_setHTML:function(){
		var box = this.box , len = this.len , width = this.width;
		var lis = box.children('li');
		if(lis.length > len){
			if(this.isLoop){
				var last = lis.detach().slice(lis.length-len).clone(),<!--重构HTML-->
					first = lis.slice(0,len).clone();
				this.maxLeft = (lis.length + len) * width;
				this.preLeft = len * width;
				this.left = box.position().left - this.preLeft;
				box.append(lis).prepend(last).append(first).css('left',this.left);
			}else{
				this.maxLeft = (Math.ceil(lis.length / len) - 1) * len * width;
				box.css('left',this.left)
			}
			this._bind();
		}else{
			this.btnpre.hide();
			this.btnnext.hide();
		}
	},
	_toPre:function(){<!--复位-->
		var _this=this;
		if(this.isLoop){
			this.lock = true;
			this.left = this.left + this.boxWidth;
			if(this.left < -this.preLeft){
				this.box.animate({left:this.left},this.duration,'',function(){
					_this.lock=false;
				});
			}else{
				this.box.animate({left:this.left},this.duration,'',function(){
					_this.left = _this.left - _this.maxLeft + _this.preLeft;
					_this.box.css('left',_this.left);
					_this.lock=false;
				});
			}
		}else if(this.left !== 0){
			this.lock = true;
			this.left = this.left + this.boxWidth;
			this.box.animate({left:this.left},this.duration,'',function(){
				_this.lock=false;
			});
		}
		
	},
	_toNext:function(){
		var _this=this;
		if(this.isLoop){
			this.lock = true;
			this.left = this.left - this.boxWidth;
			if(this.left > -this.maxLeft+this.preLeft){
				this.box.animate({left:this.left},this.duration,'',function(){
					_this.lock=false;
				});
			}else{
				this.box.animate({left:this.left},this.duration,'',function(){
					_this.left = _this.left + _this.maxLeft - _this.preLeft;
					_this.box.css('left',_this.left);
					_this.lock=false;
				});
			}
		}else if(this.left !== -this.maxLeft){
			this.lock = true;
			this.left = this.left - this.boxWidth;
			this.box.animate({left:this.left},this.duration,'',function(){
				_this.lock=false;
			});
		}
	},
	_bind:function(){
		var _this=this;
		this.btnpre.click(function(){
			if(!_this.lock){
				_this._toPre();
			}
			return false;
		})
		this.btnnext.click(function(){
			if(!_this.lock){
				_this._toNext();
			}
			return false;
		})
		if(this.isLoop && this.isInterval){<!--取消自动滚动-->
			this.timer=setInterval(function(){_this._toNext.call(_this)},_this.intervalTime);
			this.box.add(this.btnpre).add(this.btnnext).hover(
				function(){
					clearInterval(_this.timer);			  	
				},
				function(){
					_this.timer=setInterval(function(){_this._toNext.call(_this)},_this.intervalTime);
				}
			)
		}
	}
}
$(function(){
	var listscroll1=new ListScroll({
		box:$("#scrollul_1"),
		len:3,
		width:280,
		btnpre:$("#top_pre_1"),
		btnnext:$("#top_next_1"),
	})
	
	var listscroll2=new ListScroll({
		box:$("#scrollul_2"),
		len:3,
		width:280,
		btnpre:$("#top_pre_2"),
		btnnext:$("#top_next_2"),
		isLoop:true,
		isInterval:true,
		intervalTime:4000
	})
})