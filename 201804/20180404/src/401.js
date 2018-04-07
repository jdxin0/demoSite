import "../css/normalize.css";
import "../css/style.css";
import txt from "../assets/poem.txt";
import data from "../assets/data.json";

var ele = document.getElementById("appenBox");
// var poem = document.createTextNode(txt);
ele.innerHTML=txt;
var dataArr = [];
for(var x in data){
	dataArr.push(x);
}
document.querySelector(".jsonDataDiv").innerHTML = dataArr.join(" ");