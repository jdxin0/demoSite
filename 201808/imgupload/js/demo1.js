$(function() {
    $("#upload").change(function(e) {
        for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files.item(i);
            var freader = new FileReader();
            freader.readAsDataURL(file);
            freader.onload = function(e) {
                var src = e.target.result;
                $("#pic").attr("src", src);
            }
        }
    });
    return;
    $("#pic").click(function() {
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change", function() {
            var objUrl = getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#pic").attr("src", objUrl); //将图片路径存入src中，显示出图片
            }
        });
    });
});
//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { //basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { //mozilla(firefox) 
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { //webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}