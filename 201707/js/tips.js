	var tipsObj = {
		data: {
			setting: {
				text: "",
				delay: 2000,
				callback: function() {

				}
			},
			timeoutID: 0
		},
		show: function(obj) {
			$.extend(this.data.setting, obj);
			clearTimeout(this.data.timeoutID);
			$("#tips").stop().remove();
			var tpl = this.tpl();
			$("body").append(tpl);
			this.css();
			this.alignCenter();
			this.hide();
		},
		hide: function() {
			var _this = this;
			this.data.timeoutID=setTimeout(function() {
				$("#tips").fadeOut("1000", function() {
					$(this).remove();
					_this.callback();
				});
			}, this.data.setting.delay);
		},
		tpl: function() {
			return '<div id="tips">' + this.data.setting.text + '</div>';
		},
		css: function() {
			$("#tips").css({
				backgroundColor: "#000",
				color: "#fff",
				textAlign: "center",
				position: "fixed",
				left: "50%",
				top: "50%",
				zIndex: "13",
				padding: "20px 40px",
				borderRadius: "8px",
				display: "none"
			}).show();
		},
		alignCenter: function() {
			var w = $("#tips").width();
			var h = $("#tips").height();
			$("#tips").css({
				"marginLeft": -Math.floor(w / 2),
				"marginTop": -Math.floor(h / 2)
			});
		},
		callback:function(){
			// if ($.isFunction(this.data.setting.callback)) {
			// 	this.data.setting.callback();
			// }
			$.isFunction(this.data.setting.callback)&&this.data.setting.callback();
		}
	}
	function tips(msg,tims,fn) {
		tipsObj.show({text: msg,delay:tims?tims:2000,callback:$.isFunction(fn)?fn:function(){}});
	}
	module.exports=tips;