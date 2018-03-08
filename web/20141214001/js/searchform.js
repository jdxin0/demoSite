$(document).ready(function(){
	if($("#serch_text")[0].value==""){
		$("#serch_text")[0].value="Please enter keywords";
		$("#serch_text").focus(function(){
			$("#serch_text")[0].value="";
		});
	}
	if($("#serch_text")[0].value=="Please enter keywords"){
		$("#serch_text").focus(function(){
			$("#serch_text")[0].value="";
		});
	}
});
//搜索表单校验
$(document).ready(function(){
	
    $("#serch").submit(function () {
		if($("#serch_text")[0].value==""){
			alert("Please enter keywords");
			return false;
		}
		return true;
	});
}); 