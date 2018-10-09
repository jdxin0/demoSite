/**
ok类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book(title, author) {
	this.title = title;
	this.author = author;
}
Book.prototype = {
	/**
	 * 获取书本的标题
	 * @returns {string|*} 1
	 */
	getTitle: function() {
		return this.title;
	},
	/**
	 * 设置书本的页数
	 * @param {number} pageNum 页数
	 * @returns {number} 123
	 */
	setPageNum: function(pageNum) {
		this.pageNum = pageNum;
	}
};