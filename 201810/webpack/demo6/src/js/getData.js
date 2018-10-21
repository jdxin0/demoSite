module.exports = function () {
    var data = {
        'lotterytimes': 0,
        'paytimes': 0,
        'subscribe': 0,
        'user_type': 0,
        'isbought': '2',
        'cutstatus': '2',
        'tegouOrder': {},
        'prizelist': [],
        'vip8price': 100
    };
    var user = {
        isChild: true,
        isStopVip: true,
        isSuperVip: true,
        isYearVip: true,
        vipLevel: true
    };
    var { isbought, cutstatus, vip8price } = data;
    var { isChild, isStopVip } = user;
    var Data = { isbought, cutstatus, vip8price, isChild, isStopVip };
    return Data;
};