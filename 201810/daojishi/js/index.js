function countDown() {
    var nowTime = new Date(); //当前时间
    var endTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), 23, 59, 59); //到当天的12点
    var resultTime = Math.floor(endTime - nowTime) / 1000; //两个时间相减,得到的是毫秒ms,变成秒
    setInterval(function() { //倒计时
        if (resultTime > 1) {
            resultTime = resultTime - 1;
            var second = Math.floor(resultTime % 60);
            var minite = Math.floor((resultTime / 60) % 60);
            var hour = Math.floor((resultTime / 3600) % 24);
            second = second < 10 ? ('0' + second) : second;
            minite = minite < 10 ? ('0' + minite) : minite;
            hour = hour < 10 ? ('0' + hour) : hour;
            console.log(`${hour}:${minite}:${second}`);
        } else if (resultTime > 0) {
            location.reload();
        }
    }, 1000);
}
countDown();
