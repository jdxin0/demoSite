var setTimeoutShowObj = {
	init:function(){
		// this.tradition();
		// this.newWay();
		this.ajaxDemo();
	},
	tradition:function(){
		setTimeout(function() {
			console.log("tradition1");
			setTimeout(function() {
				console.log("tradition2")
				setTimeout(function() {
					console.log("tradition3")
				}, 1000)
			}, 1000);
		}, 1000);
	},
	newWay:function(){
		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				console.log("newWay1");
				resolve();
			}, 1000)
		}).then(function(val) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					console.log("newWay2");
					resolve();
				}, 1000)
			})
		}).then(function(val) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					console.log("newWay3");
				}, 1000)
			})
		}).then(function(val) {
			console.log(val)
		});
	},
	ajaxDemo:function(){
		var p = new Promise(function(resolve, reject) {
			$.ajax({
				type: "post",
				cache: false,
				url: "http://www.xuliehaonet.com/interface/jsonp.php",
				dataType: "jsonp",
				context: document.body,
				success: function(rs) {
					resolve(rs.data.places);
				}
			});
		}).then(function(val) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					type: "post",
					cache: false,
					url: "http://www.xuliehaonet.com/interface/music.php",
					dataType: "jsonp",
					context: document.body,
					success: function(rs) {
						resolve(rs.data.music[val])
					}
				});
			});
		}).then(function(val) {
			console.log(val);
		});
	}
}
setTimeoutShowObj.init();