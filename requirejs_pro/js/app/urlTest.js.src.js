define(['require'],function(require){
	var url = require.toUrl("tools/lottery");
	// var lottery = require("./js/tools/lottery.js");
	// var lottery = require(url);
	return url||"lottery module have load";
});