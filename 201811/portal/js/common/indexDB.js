define('js/common/indexDB.js', function(require, exports, module){

/**
 * IndexedDB接口
 */
var _DB = {
	// 版本号
	version: 1,
	// 数据库名称
	name: "yqq",
	// 对象仓库名称
	storeName: "cache",
	idb : (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null),
	isSupport : function(){
		return !!this.idb;
	},
	// 打开数据
	open: function(mode, callback){
		var _ = this;
		if (typeof (mode) == 'function') {
			callback = mode;
			mode = null;
		}
		if (!_.idb)
		{
			callback('not surpport');
			return false;
		}
		try {
			var request = _.idb.open(_.name, _.version);
			request.onerror = callback;
			// 版本变更和新建数据库触发的事件
			request.onupgradeneeded = function (e) {
				try {
					var _db = e.target.result,
						names = _db.objectStoreNames,
						name = _.storeName;
					if (!names.contains(name)) {
						// 创建的数据库。
						_db.createObjectStore(name, {
							keyPath: 'id',
							autoIncrement: true
						});
					}
				} catch (ex) {
					error = ex;
				}
			};
			request.onsuccess = function(e) {
				var db, error, store;
				try {
					db = e.target.result;
					db.onerror = callback;
					// 创建事务
					var transaction = db.transaction(_.storeName, mode || "readonly");
					// 获取指定的对象仓库
					store = transaction.objectStore(_.storeName);
				} catch (ex) {
					error = ex;
				}
				callback(error, store, db);
			};
		} catch (ex) {
			callback(ex);
		}
	},
	get: function(key, callback){
		var _ = this;
		_.open(function(error, store, db){
			if (error) {
				callback && callback(error);
			} else {
				try {
					var request = store.get(key);
					request.onsuccess = function(e){ 
						callback && callback(null, e.target.result && e.target.result.data);
						db.close();
					};
				} catch (ex) {
					callback && callback(ex);
				}
			}
		});
	},
	set: function(key, data, callback){
		var _ = this;
		_.open("readwrite", function(error, store, db){
			if (error) {
				callback && callback(error);
			} else {
				try {
					var request = store.put({id: key, data: data});
					request.onsuccess = function(e){
						callback && callback(null, e.target.result);
						db.close();
					};
				} catch (ex) {
					callback && callback(ex);
				}
			}
		});
	}
};
return _DB;

});