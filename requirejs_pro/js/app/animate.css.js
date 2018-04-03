define(function(){
	function testAnim(x) {
	  $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	    $(this).removeClass();
	  });
	};
	return testAnim
});