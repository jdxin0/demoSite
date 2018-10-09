/** * MyClass类 
* @class MyClass 
* @constructor 
*/
function MyClass() {
	/**	 * a属性	 * @property a 	 * @type int	 **/
	var a = 0;
	/**	获得A的值	
	@memberof MyClass	
	@method getA 	
	@param returnType {int} 要设置的值	
	@example   ele.setReturnType('0000');	 
	*/
	function setA(a) {
		this.a = a;
	}
	/**	设置A的值	@memberof MyClass	@method getA 	@param returnType {int} 要设置的值	@example   ele.setReturnType('0000');	 **/
	function getA() {
		return a;
	}
}