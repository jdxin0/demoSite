$(function() {
	var arrGrade = new Array(980886, 980666);
    $("#Button1").click(function() {
    	var strHTML = "";
        $.ajax({
            url: "./userInfo.php",
            data: {},
            cache:false,
            dataType: "xml",
            success: function(data) {
                $.each(arrGrade, function(i) {
                    var $strUser = $(data).find("User[grade=" + arrGrade[i] + "]");
                    strHTML += "<h3>年级：" + arrGrade[i] + "</h3>";
                    $strUser.each(function() {
                        strHTML += "姓名：" + $(this).children("name").text() + "<br>";
                        strHTML += "性别：" + $(this).children("sex").text() + "<br>";
                        strHTML += "邮箱：" + $(this).children("email").text() + "<hr>";
                    });
                });
                $("#Tip").html(strHTML);
            }
        });
    })
})