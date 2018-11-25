define('js/common/music/storage.js', function(require, exports, module){


var config = require('js/common/config.js');
var Storage = {
	/**
 	* helper页面，用来解决userdata同一域名下共享数据
 	*/
	helperUrl : config.StorageHelperPage,
	/**
 	* helper页面回调
 	*/
	ifrCallback : null,
	
	instance : null,
	
	/**
	 * 获取建立好的实例
	 */
	getInstance : function(){
		var _ins = this["instance"];
		if(_ins){
			return _ins;
		}
		return null;
	}
};

/**
 * 创建Storage对象
 * @param {function} cb 回调
 * @param {Object} opt 参数
 */
Storage.create = function(cb, opt){
	if(typeof cb != "function"){
		return;
	}
	opt  = opt || {};
	var db 				= null,									//实例引用
		dbname 			= opt.dbname || "music_database",		//数据库名称
		//defaultDomain 	= opt.domain || location.hostname,			//主域名
		defaultDomain 	= opt.domain || document.domain,			//主域名
		helperUrl		= opt.helper || Storage.helperUrl,
		share			= opt.share || false,
		_clientStore = ["globalStorage", "localStorage", "userData"];//openDatabase跨域也可以使用。不安全。放弃
	
	var _cs =Storage;
	
    var createHelper = function(th,type){
        //需要helper页面的情况
        var i = document.createElement("iframe");
        i.id = "userData_iframe_" + dbname;
        i.style.display = "none";
        i.src = helperUrl;
        //给helper页面的回调
        Storage.ifrCallback = function(){
            db = i.contentWindow.create(dbname, type);
            if (db) {
                cb(th);
            }
            else {
                cb(false);
            }
        };
		//setTimeout(function(){
        document.body.appendChild(i);
		//},500);
    };
	var getExpireDate = function(days){
		var d = new Date();
		days = days || 365*3;
        d.setDate(d.getDate()+days);
        return d.toUTCString();
	}
	/**
	 * 各浏览器实现方式
	 */
    var _backend = {};
    /* IE 的userData internet域下，一个document最大128k， 一个domain最大1024kb
     */
    _backend.userData = {
		isSupport:!!window.ActiveXObject,
		type : 1,
        get: function(key, cb){
			//β 保持数据对象的一致性
			db.load(dbname);
            var val = db.getAttribute(key);
            (typeof cb == "function") && cb(val);
            return val;
        },
        set: function(key, value){
            try {
				//β 保持数据对象的一致性
				db.load(dbname);
                db.setAttribute(key, value);
                db.save(dbname);
                return true;
            }catch (ex) {
				//debugAlert(ex);
                return false;//满了
            }
        },
        remove: function(key){
			//β 保持数据对象的一致性
			db.load(dbname);
            db.removeAttribute(key);
            db.save(dbname);
        },
        init: function(){
            //需不需要helper页面
            if (share) {
                createHelper(this, "userData");
                return;
            }
            var el = (document.documentElement || document.body);//document.createElement("div");
            el.addBehavior("#default#userdata");
            el.load(dbname);
            db = el;
            cb(this);
        },
        clear: function(){
			try{
				//β 保持数据对象的一致性
				db.load(dbname);
	            db.expires = new Date(1234567890000).toUTCString();
	            db.save(dbname);
				//β ： 这里要重设一下，否则接下来写入的数据不能保存
				db.load(dbname);
				db.expires = getExpireDate();
	            db.save(dbname);
				return true;
			}catch(ex){
				return false;
			}
        }
    };
    
    //firefox2+ 5000kb
    _backend.globalStorage = {
		isSupport:!!window.globalStorage,
		type : 2,
        get: function(key, cb){
			var v = (v=db.getItem(key)) && v.value ? v.value : v;
            (typeof cb == "function") && cb(v);
            return v;
        },
        set: function(key, value){
            try {
                db.setItem(key, value);
                return true;
            }catch (ex) {
                return false;
            }
        },
        remove: function(key){
            db.removeItem(key);
        },
        init: function(){
            //if (db = window.globalStorage[share?defaultDomain:location.hostname]) {
			if (db = window.globalStorage[share?defaultDomain:document.domain]) {
                cb(this);
            }
            else {
                cb(false);
            }
        },
		clear_flag : false,
		clear_arr : [],
        clear: function(cb){ //β globalstorage 没有提供clear接口，而且读写效率比较低，所以清除时要特殊处理
			var ar = this.clear_arr;
			if(this.clear_flag){
				return;
			}
			this.clear_flag = true;
            for (var k in db) {
                //db.removeItem(k);
				ar.push(k);
            }
			
			var clearXItems = function(x){
				x = x > ar.length ? ar.length : x; //x是每次清除多少个key-value, 5是实验值，太大会导致ff失去响应
				for(var i=0; i<x; i++){
					var k = ar.shift();
					db.removeItem(k);
				}
				if(ar.length > 0){
					//QZFL.console.print(ar.length);
					setTimeout(function(){clearXItems(x);}, 50);
				}else{
					typeof cb == "function" && cb();
				}
			}
			clearXItems(5); 
        }
    };
	
    //ie8+ 10 000kb safari4+ chrome4+ firefox3.5+ opera10.5+ 5000kb
    _backend.localStorage = {
        isSupport:!!window.localStorage,
		type : 3,
        get: _backend.globalStorage.get,
        set: _backend.globalStorage.set,
        remove: _backend.globalStorage.remove,
        init: function(){
			if (share) {
				createHelper(this, "localStorage");
				return;
			}
            if (db = window.localStorage) {
                cb(this);
            }
            else {
                cb(false);
            }
        },
        clear: function(){
            /*var len = db.length;
            while (len--) {
                db.removeItem(db.key(len));
            }*/
			db.clear(); //β 注意，这里的清除，只会清除当前域名下的存储
        }
    };
	
	(function(){
		for (var i = 0, len = _clientStore.length; i < len; i++) {
			if (_backend[_clientStore[i]].isSupport) {//看看支持哪种
				(_cs["instance"] = _backend[_clientStore[i]]).init();//来个初始化
				return;
			}
		}
		//不支持客户端存储
		cb(false);
	})();
};

//封装成MUSIC.widget.Storage.get的形式
(function(qs){
	var isDoing = false,
		queue 	= [],
		opt;
		
	qs.setOptions = function(opts){
		opt = opts;
	};
	
	qs.init = function(){
		var args = arguments;
		if(isDoing){
			queue.push([args[0], args[1]]);
			return;
		}
		queue.push([args[0], args[1]]);
		isDoing = true;
		qs.create(function(ins){
			var t;
			if(ins){
				qs.get 		= ins.get;
				qs.set 		= ins.set;
				qs.remove 	= ins.remove;
				qs.clear 	= ins.clear;
				while(t = queue.pop()){
					ins[t[0]].apply(null, t[1]);
				}
			}else{
				//不支持的话给个回调告诉人家
				/*if(args[0] == "get"){
					args[1][2](null);
				}*/
			}
		}, opt);
	};
	qs.get = function(){
		qs.init("get", arguments);
	};
	qs.set = function(){
		qs.init("set", arguments);
	};
	qs.remove = function(){
		qs.init("remove", arguments);
	};
	qs.clear = function(){
		qs.init("clear", arguments);
	};
})(Storage);
return Storage;


});