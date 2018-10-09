(function(rcu){
	/**
     * Creates a new Person.
     * @class
     */
	function Person(){
	}
    
	Person.prototype = {
		/**
         * 获取书本的标题
         * @returns {string|*} 返回书本的标题
         */
		getTitle:function(){
			return this.title;
		},
		/**
         * 设置书本的页数
         * @param {number} pageNum 页数
         * @returns {undefined} 无返回值
         */
		setPageNum:function(pageNum){
			this.pageNum=pageNum;
		}
	};

	rcu.Person = Person;
})(window.util);