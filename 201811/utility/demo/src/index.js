import {formatDate} from '../../index.js';
var formatDateStr = formatDate({fmt :'yyyy年MM月dd日 hh点mm分ss秒',date:new Date('2018/08/05 12:23:45')});
console.log(formatDateStr);