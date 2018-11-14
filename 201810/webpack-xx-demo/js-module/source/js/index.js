import { formatDate} from '@luojianet/utility';
var dateStr = formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
document.getElementById('timer').innerText = dateStr;
document.getElementById('timer').style.color='blue';
var a=1,b=2;
console.log(`${a},${b}`);
console.log(Object.assign({},{a:1},{b:2}));
