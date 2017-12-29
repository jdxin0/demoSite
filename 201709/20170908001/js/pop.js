$(document).ready(function(){
	$(".submitBtn").click(function(){
		var data=$("#applayCarrForm").serialize();
		console.log(data);
	});
});