<?php
class testClass{
	private static $_instance = 123;
	public static function getInstance() {
		if (self::$_instance === null) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public static function printHello() {
		echo "hello world\n";
		self::printThis();
		// $this->printThis();
	}
	public static function printThis(){
		echo "self123456";
	}
}

?>