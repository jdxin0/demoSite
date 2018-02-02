Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var timeLine = {
    init: function() {
        this.timer();
    },
    timer:function(){
        this.initVar();
        this.whatTime();
        return;
        var _this = this;
        this.data.timer = setInterval(function(){
            _this.initVar();
            _this.whatTime();
        },1000);
    },
    initVar: function() {
        //今天的6个时间节点
        this.data.timeArr = [" 00:00:00", " 02:59:59", " 03:00:00", " 13:59:59", " 14:00:00", " 23:59:59"];
        //今天的6个时间节点对应的时间戳
        this.data.timeStampArr = [];
         //当前时间
        this.data.nowYearMonthDay = new Date("2018/02/10 00:00:00").Format("yyyy/MM/dd");
        this.data.nowDateTime = new Date("2018/02/10 00:00:00").getTime();
        this.data.nowDate = new Date("2018/02/10 00:00:00").getDate();
        //红包雨开始时间
        this.data.startDateTime = new Date("2018/02/09 00:00:00").getTime();
        this.data.startDate = new Date("2018/02/09 00:00:00").getDate();
        //红包雨结束时间
        this.data.endDateTime = new Date("2018/02/24 23:59:59").getTime();
        this.data.endDate = new Date("2018/02/24 23:59:59").getDate();

        for (var key in this.data.timeArr) {
            var timeStamp = new Date(this.data.nowYearMonthDay + this.data.timeArr[key]).getTime();
            var arr=[];
            arr.push(timeStamp);
            this.data.timeStampArr=arr;
        }
    },
    whatTime: function() {
        if (this.data.nowDateTime <= this.data.startDateTime) {
            //活动开始前
            this.timeLineObj = {
                timeLineStage: "bd-timeline ",
                barActive: "0%",
                barEnd: "0%",
                redBage: {
                    redBage1: {
                        class: "first nearly",
                        text: "02." + this.data.startDate + " 即将发放"
                    },
                    redBage2: {
                        class: "",
                        text: "02." + (this.data.startDate + 1) + " 等待开抢"
                    },
                    redBage3: {
                        class: "disabled",
                        text: "02." + (this.data.startDate + 2) + " 等待开抢"
                    },
                    redBage4: {
                        class: "last disabled",
                        text: "02." + this.data.endDate + " 最后一波"
                    }
                }
            };
            this.renderTimeLine();
        } else if (this.data.nowDateTime >= this.data.endDateTime) {
            //活动结束后
            this.timeLineObj = {
                timeLineStage: "bd-timeline stage01 stage02 stage03",
                barActive: "0%",
                barEnd: "55%",
                redBage: {
                    redBage1: {
                        class: "first end",
                        text: "02." + this.data.startDate + " 已抢完"
                    },
                    redBage2: {
                        class: "end",
                        text: "02." + (this.data.endDate - 2) + " 已抢完"
                    },
                    redBage3: {
                        class: "end",
                        text: "02." + (this.data.endDate - 1) + " 已抢完"
                    },
                    redBage4: {
                        class: "last end",
                        text: "02.24 已抢完"
                    }
                }
            };
            this.renderTimeLine();
            clearInterval(this.data.timer);
        } else {
            this.getTimeLineObj();
            this.renderTimeLine();
        }
    },
    data: {
        timer:null,
        timeArr: [],
        timeStampArr: [],
        nowYearMonthDay: "",
        nowDateTime: "",
        nowDate: "",
        startDateTime: "",
        endDateTime: "",
        startDate: "",
        endDate: "",

    },
    timeLineObj: {
        timeLineStage: "",
        barActive: "",
        barEnd: "",
        redBage: {
            redBage1: {
                class: "",
                text: ""
            },
            redBage2: {
                class: "",
                text: ""
            },
            redBage3: {
                class: "",
                text: ""
            },
            redBage4: {
                class: "",
                text: ""
            }
        }
    },
    curDayStatus: function() {
        if (this.data.nowDate == this.data.startDate) {
            if (this.data.nowDateTime >= this.data.timeStampArr[4] && this.data.nowDateTime <= this.data.timeStampArr[5]) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (this.data.nowDateTime >= this.data.timeStampArr[0] && this.data.nowDateTime <= this.data.timeStampArr[1] || this.data.nowDateTime >= this.data.timeStampArr[4] && this.data.nowDateTime <= this.data.timeStampArr[5]) {
                return 1;
            } else {
                return 0;
            }
        }
    },
    getTimeLineObj: function() {
        if (this.data.nowDate == this.data.startDate) {
            if (this.curDayStatus()) {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline ",
                    barActive: "20%",
                    barEnd: "0%",
                    redBage: {
                        redBage1: {
                            class: "first active",
                            text: "02." + this.data.startDate + " 正在发放"
                        },
                        redBage2: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage3: {
                            class: "disabled",
                            text: "02." + (this.data.nowDate + 2) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02." + this.data.endDate + " 最后一波"
                        }
                    }
                };
            } else {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline ",
                    barActive: "0%",
                    barEnd: "0%",
                    redBage: {
                        redBage1: {
                            class: "first nearly",
                            text: "02." + this.data.startDate + " 即将发放"
                        },
                        redBage2: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage3: {
                            class: "disabled",
                            text: "02." + (this.data.nowDate + 2) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02." + this.data.endDate + " 最后一波"
                        }
                    }
                };
            }
        } else if (this.data.nowDate >= this.data.startDate + 1 && this.data.nowDate <= this.data.endDate - 3) {
            if (this.curDayStatus()) {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01",
                    barActive: "20%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "active",
                            text: "02." + this.data.nowDate + " 正在发放"
                        },
                        redBage3: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02.24 最后一波"
                        }
                    }
                };
            } else {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01",
                    barActive: "20%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "nearly",
                            text: "02." + this.data.nowDate + " 即将发放"
                        },
                        redBage3: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02.24 最后一波"
                        }
                    }
                };
            }
        } else if (this.data.nowDate == this.data.endDate - 2) {
            if (this.curDayStatus()) {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02",
                    barActive: "20%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "active",
                            text: "02." + this.data.nowDate + " 正在发放"
                        },
                        redBage3: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02.24 最后一波"
                        }
                    }
                };
            } else {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02",
                    barActive: "0%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "nearly",
                            text: "02." + this.data.nowDate + " 即将开抢"
                        },
                        redBage3: {
                            class: "",
                            text: "02." + (this.data.nowDate + 1) + " 等待开抢"
                        },
                        redBage4: {
                            class: "last disabled",
                            text: "02.24 最后一波"
                        }
                    }
                };
            }
        } else if (this.data.nowDate == this.data.endDate - 1) {
            if (this.curDayStatus()) {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02 stage03",
                    barActive: "45%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "end",
                            text: "02." + (this.data.endDate - 2) + " 已抢完"
                        },
                        redBage3: {
                            class: "active",
                            text: "02." + (this.data.endDate - 1) + " 正在发放"
                        },
                        redBage4: {
                            class: "last",
                            text: "02.24 等待开抢"
                        }
                    }
                };
            } else {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02 stage03",
                    barActive: "0%",
                    barEnd: "25%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "end",
                            text: "02." + (this.data.endDate - 2) + " 已抢完"
                        },
                        redBage3: {
                            class: "nearly",
                            text: "02." + (this.data.endDate - 1) + " 即将开抢"
                        },
                        redBage4: {
                            class: "last",
                            text: "02.24 等待开抢"
                        }
                    }
                };
            }

        } else if (this.data.nowDate == this.data.endDate) {
            if (this.curDayStatus()) {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02 stage03",
                    barActive: "0%",
                    barEnd: "55%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "end",
                            text: "02." + (this.data.endDate - 2) + " 已抢完"
                        },
                        redBage3: {
                            class: "end",
                            text: "02." + (this.data.endDate - 1) + " 已抢完"
                        },
                        redBage4: {
                            class: "last active",
                            text: "02.24 正在发放"
                        }
                    }
                };
            } else {
                this.timeLineObj = {
                    timeLineStage: "bd-timeline stage01 stage02 stage03",
                    barActive: "0%",
                    barEnd: "55%",
                    redBage: {
                        redBage1: {
                            class: "first end",
                            text: "02." + this.data.startDate + " 已抢完"
                        },
                        redBage2: {
                            class: "end",
                            text: "02." + (this.data.endDate - 2) + " 已抢完"
                        },
                        redBage3: {
                            class: "end",
                            text: "02." + (this.data.endDate - 1) + " 已抢完"
                        },
                        redBage4: {
                            class: "last nearly",
                            text: "02.24 即将开抢"
                        }
                    }
                };
            }

        }
    },
    renderTimeLine: function() {
        var tpl = [];
        $("#timeLineStage").attr("class", this.timeLineObj.timeLineStage);
        $("#barActive").css("width", this.timeLineObj.barActive);
        $("#barEnd").css("width", this.timeLineObj.barEnd);
        for (var key in this.timeLineObj.redBage) {
            tpl.push(['<li class="' + this.timeLineObj.redBage[key].class + '">', '	<i class="icon-hb"></i>', '	<i class="icon-cir"></i>', '	<p>' + this.timeLineObj.redBage[key].text + '</p>', '</li>'].join(""));
        }
        $("#redBage ul").html(tpl.join(""));
    }
}
timeLine.init();
