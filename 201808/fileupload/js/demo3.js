var upload = document.getElementById('upload');
upload.addEventListener('change', function() {
    var upload = document.getElementById('upload'); //每次要动态获取
    var file = upload.files[0];
    //console.log(file.size);

    //FileReader
    //        var reader = new FileReader();
    //        reader.readAsDataURL(file);
    //        reader.onload = function(e) {
    //          var img = new Image();
    //          img.src = this.result;
    //          console.log(this.result);
    //        };

    //URL.createObjectURL
    //        var url = URL.createObjectURL(file);
    //        var img = new Image();
    //        img.src = url;
    //        img.onload = function(e) {
    //            window.URL.revokeObjectURL(this.src);//销毁
    //        }
    //        console.log(url);

    //利用Blob分割文件
    var start = 0;
    var chunk = 1024 * 10; //10KB
    var end = start + chunk;
    var size = file.size;
    while (start < size) {
        segment(file, start, end);
        start = end;
        end = start + chunk;
        if (end > size) {
            end = size;
        }
    }
    //解决上传相同文件不触发onchange事件  
    //        var clone = upload.cloneNode(true);
    //        clone.onchange = arguments.callee;//克隆不会复制动态绑定事件
    //          clone.value = '';
    //            upload.parentNode.replaceChild(clone, upload);
}, false);

//利用Blob对象，生成可下载文件
var blob = new Blob(["pwstrick"]); //数组中添加DOMString对象
var a = document.createElement("a");
a.href = URL.createObjectURL(blob); //创建URL对象
a.download = "test.txt"; //HTML5新属性
a.textContent = "test";
document.getElementsByTagName('body')[0].appendChild(a);

function segment(file, start, end) {
    var reader = new FileReader();
    reader.onload = function(evt) {
        console.log(['Read bytes: ', start, ' - ', end].join(''));
    };
    var blob = file.slice(start, end);
    reader.readAsBinaryString(blob);
}

function form() {
    var formData = new FormData();
    formData.append("name", "value"); //普通键值对
    formData.append("blob", blob); //传递一个blob对象
    formData.append("file", file); //传递一个file对象
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "http://xx.com");
    oReq.send(formData);
}