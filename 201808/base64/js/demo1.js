function setImage(obj) {
    // for ie6、ie7、ie8
    if (!/Trident/.test(navigator.userAgent) && /MSIE [6-8]\.0.*Windows NT 5\./.test(navigator.userAgent)) return "";
    //for ie9 or later、FireFox 、chrome 、Opera
    var html = document.firstChild.nodeValue;
    var reg = new RegExp("--imagedata\\s*[\\r\\n]+Content-Type:\\s*(image\\/\\w+)\s*[\\r\\n\\s]+Content-Location:\\s*" + obj + "\\s*Content-Transfer-Encoding:\\s*base64\\s*[\\r\\n\\s]+([a-zA-Z0-9\\/\\+\\r\\n=]+)", "g");
    var codePart = reg.exec(html);
    document.getElementById(obj).style.backgroundImage = "url(data:" + codePart[1] + ";base64," + codePart[2] + ")";
}
setImage("showimg");
setImage("img2");
document.getElementById("useragent").innerHTML = navigator.userAgent;