/**
 * 加入收藏夹
 * 调用方法：
 * var addbook = require('addbook');
 * addbook.init({'title':'网游加速器','url':'http://act.vip.xunlei.com/jsq/xxx','content':'请按Ctrl+D将本页面放入收藏夹，便捷享受迅雷网游加速器特权！'});
 * or addbook.init();
 * addbook.do();
 */

define(function(require,exports,module){
	var addBook = {},title,url,content;

	addBook.init = function(opts){

		url = (opts && opts.url) || location.href;
		title = (opts && opts.title) || document.title;
		content = (opts && opts.content) || '请按Ctrl+D将本页面放入收藏夹';
	}

	addBook.add = function(){
		try {
			window.external.addFavorite(url, title);
		} catch (e){
			if (window.sidebar) {
				try {
					window.sidebar.addPanel(title, url,"");
				} catch(e) {
					alert(content);
				}

			}else if( window.opera && window.print ) {
				return;
			} else {
				alert(content);
			}
		}
	}

	module.exports = addBook;
});