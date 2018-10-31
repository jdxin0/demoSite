var imgObj = {
    award01: require('../images/drawawards/award01.png'),
    award02: require('../images/drawawards/award02.png'),
    award03: require('../images/drawawards/award03.png'),
    award04: require('../images/drawawards/award04.png')
};
// var award01 = require('../images/drawawards/award01.png');
// var award02 = require('../images/drawawards/award02.png');
// var award03 = require('../images/drawawards/award03.png');
// var award04 = require('../images/drawawards/award04.png');
var str1 = '<div><img src="' + imgObj.award01 + '"</div>';
var str2 = '<div><img src="' + imgObj.award02 + '"</div>';
var str3 = '<div><img src="' + imgObj.award03 + '"</div>';
var str4 = '<div><img src="' + imgObj.award04 + '"</div>';
document.getElementById('app1').innerHTML = str1;
document.getElementById('app2').innerHTML = str2;
document.getElementById('app3').innerHTML = str3;
document.getElementById('app4').innerHTML = str4;
