function cnvs_getCoordinates(e) {
    x = e.clientX;
    y = e.clientY;
    document.getElementById("xycoordinates").innerHTML = "Coordinates: (" + x + "," + y + ")";
}
function cnvs_clearCoordinates() {
    document.getElementById("xycoordinates").innerHTML = "";
}

var c = document.getElementById("myCanvas");
var cxt = c.getContext("2d");
cxt.moveTo(10, 10);
cxt.lineTo(150, 50);
cxt.lineTo(10, 50);
cxt.lineTo(10, 10);
cxt.stroke();