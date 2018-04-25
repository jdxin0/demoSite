var JQ = require("jquery/dist/jquery.min.js");
function jsonp() {
    JQ.ajax({
        url: "http://www.xuliehaonet.com/interface/jsonp.php",
        data: {
        	a:1,
        	b:2
        },
        dataType: "jsonp",
        success: function(rs) {
            console.log(rs.msg);
        },
        error: function() {

        }
    });
}
function time(){
	console.log(new Date());
}
module.exports = {
	jsonp:jsonp,
	time:time
}