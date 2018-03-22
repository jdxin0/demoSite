/**
 * @license text 2.0.15 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/text/LICENSE
 */


define(["require","exports","module"],function(require,exports,module){var title,url,content,addBook={};addBook.init=function(opts){url=opts&&opts.url||location.href,title=opts&&opts.title||document.title,content=opts&&opts.content||"请按Ctrl+D将本页面放入收藏夹"},addBook.add=function(){try{window.external.addFavorite(url,title)}catch(e){if(window.sidebar)try{window.sidebar.addPanel(title,url,"")}catch(e){alert(content)}else{if(window.opera&&window.print)return;alert(content)}}},module.exports=addBook});
//# sourceMappingURL=addbook.js.map