import * as d3 from "d3";
import "../css/normalize.css";
import "../css/style.css";
import txt from "../assets/poem.txt";
import data from "../assets/data.json";
import * as xml from "../assets/data.xml";

var ele = document.getElementById("appenBox");
// var poem = document.createTextNode(txt);
ele.innerHTML=txt;
var dataArr = [];
for(var x in data){
	dataArr.push(x);
}
document.querySelector(".jsonDataDiv").innerHTML = dataArr.join(" ");

// d3.select("body").style("background-color", "black");  // 直接选择 ->并设置属性
d3.selectAll("p").style("color", function() { // 选择 -> 动态设置属性
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
window.xml = xml;
console.log(xml)