import { square, add } from './mod.js';
import { hidePhoneNum, toThousands, getNowFormatDate, getUrlParam } from '@luojianet/utility';

var result1 = square(10);
var result2 = add(10, 20);
console.log(result1, result2);
var a = hidePhoneNum(15889570062);
var b = toThousands(4897568);
var c = getNowFormatDate();
var d = getUrlParam('referfrom');
console.log(a, b, c, d);