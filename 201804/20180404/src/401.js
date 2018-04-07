import "../css/normalize.css";
import "../css/style.css";
import txt from "./poem.txt";

var ele = document.getElementById("appenBox");
// var poem = document.createTextNode(txt);
ele.innerHTML=txt;