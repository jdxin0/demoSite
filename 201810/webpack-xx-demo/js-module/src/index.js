import { square, add } from './mod.js';
import { hidePhoneNum, toThousands, formatDate, getUrlParam } from '@luojianet/utility';

var result1 = square(10);
var result2 = add(10, 20);
console.log(result1, result2);
var a = hidePhoneNum(15889570062);
var b = toThousands(4897568);
var c = formatDate({fmt: 'yyyy年MM月dd日 hh点mm分ss秒',date: new Date('2018/08/05 12:23:45')});
var d = getUrlParam('referfrom');
console.log(a, b, c, d);