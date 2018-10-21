import '../css/style.css';
var data = require('./getData.js')();

document.getElementById('app').innerText = 'Hello Webpack!';
document.getElementById('app').style.color = 'blue';
var time = () => {
    console.log(new Date());
    console.log(data);
};
time();
var images1 = document.getElementById('images1');
images1.onclick = function () {
    var temp = this.src;
    this.src = this.getAttribute('data-src');
    this.setAttribute('data-src', temp);
};
var images2 = document.getElementById('images2');
images2.onclick = function () {
    var temp = this.src;
    this.src = this.getAttribute('data-src');
    this.setAttribute('data-src', temp);
};