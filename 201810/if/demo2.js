function handlePayBtn() {
    !hasLogin && login();
    return;
    isChild && msgBox.show("child");
    return;
    isStopUser && msgBox.show('stopVip');
    return;
    !isSuperVIp && msgBox.show("不是超级会员");
    return;
    (seat == 3 || seat == 2) && legouApi();
    return;
    seat == 1 && rongYaoApi();
}
function legouApi() {
    if (isBout) {
        msgBox("本月已购买过");
        return;
    }
    if (haveNoPayOrder) {
        msgBox("存在未支付订单");
        return;
    }
    //展示下单浮层
}
