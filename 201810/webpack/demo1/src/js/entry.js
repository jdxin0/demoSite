import css from '../css/index.css';
import css2 from '../css/style.less';
document.getElementById("welcome").innerHTML="Hello webpack!";
var $ = require("jquery");
var Vue = require("vue");
var share = {
	title: '收到一个新会员礼包',
	desc: '迅雷会员送你豪华礼包，快去看看',
	imgUrl: '../static/share.jpg'
};
let str="xl";
function test(a=1){
    console.log(a);
    console.log(str);
}
test(2);
$('#version').html($.fn.jquery);
var app = new Vue({
	el: '#app',
	data:{
		name:'SidYan',
		age:28,
		sex:'Man'
	}
});