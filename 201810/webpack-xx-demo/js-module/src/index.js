import { square, add } from './mod.js';
import { hidePhoneNum, toThousands, getNowFormatDate, getUrlParam } from './mod2.js';

var result1 = square(10);
var result2 = add(10, 20);
console.log(result1, result2);
var a = hidePhoneNum(15927572994);
var b = toThousands(4897568);
var c = getNowFormatDate();
var d = getUrlParam('referfrom');
console.log(a, b, c, d);