// 定义data对象
window.data = {}
// 当input元素的值改变时改变data
 document.querySelector('input.binding').addEventListener('input', (e) => {
 	data.inputVal1 = parseInt(e.target.value);
})
Object.defineProperty(data, 'inputVal1', {
    // 从input中读值
  get () {
  	var value = document.querySelector('input.binding').value
  	if(value>10){
  		return data.inputVal1=10;
  	}else {
  		return parseInt(e.target.value);
  	}
    console.log("get:",document.querySelector('input.binding').value);
  },
    // 改变时写入到input
  set (val) {
    document.querySelector('input.binding').value = val
    console.log("set:",val);
  }
})