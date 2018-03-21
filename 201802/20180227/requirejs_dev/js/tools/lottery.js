function lottery(c) {
    var c = c || {};
    var defaultConfig = {
        lotteryBox: '#lotteryBox',
        //整个转盘id选择器
        giftItem: '.giftItem',
        //单个奖品选择器
        sort: [],
        //排序，默认为顺序
        targetClass: 'on',
        //选中时的class，默认on
        fastSpeed: 80,
        //快速阶段的速度(定时器时间间隔)，默认80
        slowSpeed: 400,
        //慢速阶段的速度(定时器时间间隔)，默认400
        startStep: 4,
        //开头的慢速阶段跑几步，默认4
        endStep: 4 //结束的慢速阶段跑几步，默认4
    };
    var config = {};

    var timeIntervalId;
    //定时器
    var isRuning;
    //是否正在抽奖中
    var curStatus;
    //0:停止  1:启动截断 2:中间快速阶段  3:中奖减速阶段
    var giftIndex;
    //抽中奖品的位置,-1表示还没获得
    var curIndex;
    //当前在哪个位置
    var runCount;
    //累计总共跑了几个位置
    var endCallback;
    //用来注册结束时回调的函数
    function reset() {
        config = $.extend(defaultConfig, c);
        timeIntervalId = 0;
        //定时器
        isRuning = false;
        //是否正在抽奖中
        curStatus = 0;
        //0:停止  1:启动截断 2:中间快速阶段  3:中奖减速阶段
        giftIndex = -1;
        //抽中奖品的位置,-1表示还没获得
        curIndex = 0;
        //当前在哪个位置
        runCount = 0;
        //累计总共跑了几个位置
        endCallback = null;
        //用来注册结束时回调的函数
        clearInterval(timeIntervalId);
    }
    reset();

    var $lotteryBox = $(config.lotteryBox);
    var giftCount = $lotteryBox.find(config.giftItem).length;
    //奖品总数

    var idx = 0;
    if (!config.sort || config.sort.length != giftCount) {
        $lotteryBox.find(config.giftItem).each(function() {
            $(this).attr('sort', idx);
            idx++;
        });
    } else {
        $lotteryBox.find(config.giftItem).each(function() {
            $(this).attr('sort', config.sort[idx]);
            idx++;
        });
    }

    $lotteryBox.find(config.giftItem).unbind('mouseenter').bind('mouseenter', function() {
        $(this).addClass('hover');
    });
    $lotteryBox.find(config.giftItem).unbind('mouseleave').bind('mouseleave', function() {
        $(this).removeClass('hover');
    });

    //开始
    function run() {
        if (isRuning == true) {
            return;
        }
        reset();

        isRuning = true;
        focusToNext();
        curStatus = 1;
        //开始
        myInterval('slow');
    }

    //设置定时器，私有函数
    function myInterval(speed) {
        clearInterval(timeIntervalId);
        var time = speed == 'fast' ? config.fastSpeed : config.slowSpeed;
        timeIntervalId = setInterval(function() {
            runCount++;
            curIndex = runCount % giftCount;
            focusToNext();
            stepFunction();
        }, time);
    }

    //设置当前dom状态，私有函数
    function focusToNext() {
        $lotteryBox.find(config.giftItem).removeClass(config.targetClass);
        $lotteryBox.find(config.giftItem + '[sort=' + curIndex + ']').eq(0).addClass(config.targetClass);
    }

    //每跑一步检测当前状态，私有函数
    function stepFunction() {
        if (curStatus == 1 && runCount == config.startStep) {
            curStatus = 2;
            //加速
            //console.debug('---fast---');
            myInterval('fast');
        }

        if (curStatus == 2 && (runCount >= (config.startStep + giftCount))) {
            //至少要快速跑一圈
            if (giftIndex != -1) {
                var needNum = giftCount - config.endStep - (curIndex - giftIndex);
                if (needNum == 0 || needNum == giftCount) {
                    curStatus = 3;
                    //中奖减速阶段
                    myInterval('slow');
                }
            }
        }

        if (curStatus == 3 && curIndex == giftIndex) {
            end();
        }
    }

    //结束，私有函数
    function end() {
        clearInterval(timeIntervalId);
        isRuning = false;
        setTimeout(function() {
            (typeof(endCallback) == 'function') && endCallback();
        }, 200);
    }

    //强制停止结束，清除状态
    function forceEnd(_endCallback) {
        endCallback = _endCallback;
        end();
        $lotteryBox.find(config.giftItem).removeClass(config.targetClass);
    }

    function setGift(_giftIndex, _endCallback) {
        giftIndex = _giftIndex;
        endCallback = _endCallback;
    }

    return {
        'run': run,
        'setGift': setGift,
        'forceEnd': forceEnd
    };
}

/*
lotteryInstance = lottery({
    lotteryBox: '#act_lottery_box',
    //整个转盘id选择器
    giftItem: 'span',
    //单个奖品选择器
    sort: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    //排序，默认为顺序
    targetClass: 'on',
    //选中时的class，默认on
    fastSpeed: 180,
    //快速阶段的速度(定时器时间间隔)，默认80
    slowSpeed: 400,
    //慢速阶段的速度(定时器时间间隔)，默认400
    startStep: 4,
    //开头的慢速阶段跑几步，默认4
    endStep: 4,
    //结束的慢速阶段跑几步，默认4
});
lotteryInstance.run();
lotteryInstance.setGift(Data.lineObj[rs.data.line], function(){
    Utilities.lotteryCallBack(rs.data);
});*/