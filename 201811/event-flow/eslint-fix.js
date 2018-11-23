var wrapDiv = document.getElementById('wrapDiv');
var innerP = document.getElementById('innerP');
var textSpan = document.getElementById('textSpan');

// 捕获阶段绑定事件
window.addEventListener('click', function (e) {
    console.log('window 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

document.addEventListener('click', function (e) {
    console.log('document 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

document.documentElement.addEventListener('click', function (e) {
    console.log('documentElement 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

document.body.addEventListener('click', function (e) {
    console.log('body 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

wrapDiv.addEventListener('click', function (e) {
    console.log('wrapDiv 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

innerP.addEventListener('click', function (e) {
    console.log('innerP 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

textSpan.addEventListener('click', function (e) {
    console.log('textSpan 捕获', e.target.nodeName, e.currentTarget.nodeName);
}, true);

// 冒泡阶段绑定的事件
window.addEventListener('click', function (e) {
    console.log('window 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

document.addEventListener('click', function (e) {
    console.log('document 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

document.documentElement.addEventListener('click', function (e) {
    console.log('documentElement 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

document.body.addEventListener('click', function (e) {
    console.log('body 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

wrapDiv.addEventListener('click', function (e) {
    console.log('wrapDiv 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

innerP.addEventListener('click', function (e) {
    console.log('innerP 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);

textSpan.addEventListener('click', function (e) {
    console.log('textSpan 冒泡', e.target.nodeName, e.currentTarget.nodeName);
}, false);