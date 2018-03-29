;(function(){
	var PromiseObj = {
		init:function(){
			// this.promiseThen();
			// this.promiseCatch();
			// this.promiseFinally();
			// this.promiseAll();
			// this.promiseRace();
			// this.promiseResolve();
			// this.promiseReject();
		},
		promiseThen:function(){
			new Promise(function(resolve,reject){
				resolve("luojianet");
			}).then(function(val){
				console.log(val);
			})
		},
		promiseCatch:function(){
			new Promise(function(resolve,reject){
				reject("error");
			}).then(function(val){
				console.log(val);
			}).catch(function(err){
				console.log(err);
			});
		},
		promiseFinally:function(){
			new Promise(function(resolve,reject){
				if (false) {
					resolve("luojianet");
				}else{
					reject("error");
				}
			}).then(function(val){
				console.log(val);
			}).catch(function(err){
				console.log(err);
			}).finally(function(){
				console.log("finally");
			});
		},
		promiseAll:function(){
			const promiseArr = [2, 3, 5, 7].map(function(id) {
			    return new Promise(function(resolve, reject) {
			        (function(mm) {
			            setTimeout(function() {
			            	resolve(mm);
			            	console.log(mm);
			            }, mm * 1000)
			        })(id);
			    });
			});
			Promise.all(promiseArr).then(function(posts) {
			    console.log(posts);
			}).catch(function(reason) {
			    console.log("promise.all.then.reject");
			});
		},
		promiseRace:function(){
			const promiseArr = [2, 3, 5, 7].map(function(id) {
			    return new Promise(function(resolve, reject) {
			        (function(mm) {
			            setTimeout(function() {
			            	resolve(mm);
			            	console.log(mm);
			            }, mm * 1000)
			        })(id);
			    });
			});
			Promise.race(promiseArr).then(function(posts){
				console.log(posts);
			}).catch(function(){

			});;
		},
		promiseResolve:function(){
			var defferAjax = $.ajax({
			    url: "http://www.xuliehaonet.com/interface/jsonp.php",
			    data: {
			        a: 1,
			        b: 2
			    },
			    dataType: "jsonp",
			    success: function() {
			        console.log("1");
			    },
			    error: function() {
			        console.log("2");
			    }
			});
			Promise.resolve(defferAjax).then(function(rs) {
			    console.log(rs);
			});
		},
		promiseReject:function(){
			Promise.reject(new Error("xxx")).catch(function(err){
				console.log(err);
			})
		}
	}
	PromiseObj.init();
})()