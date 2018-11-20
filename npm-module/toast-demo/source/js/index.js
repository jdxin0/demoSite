import '../css/test.css';
var toast = require('@luojianet/toast');
document.getElementById('errBtn').onclick=function(){
    toast.err('error');
};
document.getElementById('sucBtn').onclick=function(){
    toast.suc('success');
};