var loginModel={
	login_callbacks:$.Callbacks('unique memory'),
	logout_callbacks:$.Callbacks('unique memory')
}

$.ajax({
  url: "http://www.xuliehaonet.com/interface/jsonp.php",
  data: {},
  dataType: "jsonp",
  timeout: 4000,
  success: function(rs) {
    try {
        loginModel.login_callbacks.fire();
    } catch (e) {
        loginModel.login_callbacks();
    };
  }
});
loginModel.login_callbacks.add(function(){
	console.log("init");
});
loginModel.login_callbacks.add(function(){
	console.log("LoginInit");
});
