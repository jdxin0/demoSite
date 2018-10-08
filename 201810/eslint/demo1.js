/*global Vue $ thunder CountUp haslogin login vip_tplpay msgbox Promise*/
thunder(function() {
	window.msgbox = this.msgbox;
	var user = this.user;
	var main = this.main;
	var isExchangingPrize = false;
	this.tj('pageid_505');
	this.share({
		title: '会砍价的人，iPhone XS 只要1块钱！',
		desc: 'iPhone XS贵出天际？迅雷会员寻找砍价王，只要1元就能抱走，速来围观>',
		imgUrl: 'http://act.vip.xunlei.com/m/vip/2018/nationalday/images/share.png'
	});
	var Data = {
		haslogin: haslogin() ? 1 : 0,
		isSuperVip: false,
		joinTimes: 0,
		paytimes: 0,
		lotterytimes: 1,
		totalMoney: 0,
		prizeList: [],
		lineList: [],
		stationList: [],
		prizeStatus: [],
		lightLine: '',
		changingTotalMoney: 0
	};
	main.onInit(function(data) {
		Data.joinTimes = data.joinTimes;
		Data.prizeList = data.prizeList;
		setTimeout(function() {
			$('#slide').textSlider({
				direction: 'up',
				speed: 800,
				wait: 1000,
				line: 1,
				per: 1,
				child: 'ul'
			});
		}, 0);
	});

	main.onLoginInit(function(data) {
		Data.haslogin = 1;
		Data.paytimes = data.paytimes;
		Data.lotterytimes = data.lotterytimes - 0;
		Data.totalMoney = data.totalMoney;
		Data.lineList = data.lineList;
		Data.stationList = data.stationList;
		Data.prizeStatus = data.prizeStatus;
		Data.isSuperVip = user.isSuperVip();
	});

	window.app = new Vue({
		el: '#app',
		data: Data,
		watch: {
			totalMoney: function(end, start) {
				new CountUp(this.$refs.countup, start, end, 0, 1, {
					useEasing: true,
					useGrouping: true,
					separator: '',
					formattingFn: $.proxy(function(num) {
						this.changingTotalMoney = num;
					}, this)
				}).start();
			}
		},
		computed: {
			payId: function() {
				if (0 === this.paytimes) {
					if (this.isSuperVip) {
						return { payBtn1: 'vip2018iphonexs_s1', payBtn2: 'vip2018iphonexs_b1' };
					} else {
						return { payBtn1: 'vip2018iphonexs_b1', payBtn2: 'vip2018iphonexs_s1' };
					}
				} else {
					if (this.isSuperVip) {
						return { payBtn1: 'vip2018iphonexs_s2', payBtn2: 'vip2018iphonexs_b2' };
					} else {
						return { payBtn1: 'vip2018iphonexs_b2', payBtn2: 'vip2018iphonexs_s2' };
					}
				}
			},
			splitJoinTimes: function() {
				return this.toThousands(this.joinTimes);
			},
			cutedList: function() {
				var cutedList = String(this.changingTotalMoney).split('');
				while (cutedList.length < 4) {
					cutedList.unshift('0');
				}
				return cutedList;
			},
			progress: function() {
				if (this.totalMoney < 2000) {
					return '0%';
				} else if (this.totalMoney >= 2000 && this.totalMoney < 3200) {
					if (this.totalMoney == 2000) {
						return '0%';
					} else {
						return '17%';
					}
				} else if (this.totalMoney >= 3200 && this.totalMoney < 4200) {
					if (this.totalMoney == 3200) {
						return '33%';
					} else {
						return '48%';
					}
				} else if (this.totalMoney >= 4200 && this.totalMoney < 8698) {
					if (this.totalMoney == 4200) {
						return '66%';
					} else {
						return '82%';
					}
				} else if (this.totalMoney == 8698) {
					return '100%';
				}
			},
			title: function() {
				if (this.lotterytimes == 1 && this.paytimes == 0) {
					return '送1次免费砍价机会 1元领iPhone';
				} else {
					return '开会员送砍价机会 1元领iPhone';
				}
			}
		},
		methods: {
			toThousands: function(num) {
				var result = [],
					counter = 0;
				num = (num || 0).toString().split('');
				for (var i = num.length - 1; i >= 0; i--) {
					counter++;
					result.unshift(num[i]);
					if (!(counter % 3) && i != 0) {
						result.unshift(',');
					}
				}
				return result.join('');
			},
			openBtnHandler: function() {
				if (!this.haslogin) {
					login();
					return;
				} else {
					this.payBtnHandler(this.payId);
				}
			},
			payBtnHandler: function(pidObj) {
				vip_tplpay.tplPay({
					payId: pidObj['payBtn1'],
					payId2: pidObj['payBtn2'],
					container: '#actTplPay',
					client: 'm',
					showPayFn: function() {
						msgbox.show('actTplPay');
					},
					closePayFn: function() {
						msgbox.exit();
					},
					paySuccessFn: function() {
						main.loginInit();
					}
				});
			},
			lotteryFn: function() {
				$('.lottery').lottery({
					giftItem: 'span',
					fastSpeed: 180,
					slowSpeed: 400,
					context: this,
					sort: [0, 1, 2, 3, 4, 5, 6, 9, 7, 10, 8],
					startBtn: '.lotteryBtn',
					before: function() {
						// this.lineList = [];
						// this.stationList = [];
					},
					after: function(rs) {
						this.lightLine = rs.data.line;
						this.handleLotteryAfter(rs);
						return false;
					}
				});
			},
			handleLotteryAfter: function(rs) {
				// 线路点亮动画
				var that = this;
				var lineon = $('.mapline span.on');
				new Promise(function(resolve) {
					lineon.animate({
						'opacity': '0'
					}, 200, function() {
						resolve();
					});
				}).then(function() {
					return new Promise(function(resolve) {
						lineon.animate({
							'opacity': '1'
						}, 200, function() {
							resolve();
						});
					});
				}).then(function() {
					return new Promise(function(resolve) {
						lineon.animate({
							'opacity': '0'
						}, 200, function() {
							resolve();
						});
					});
				}).then(function() {
					return new Promise(function(resolve) {
						lineon.animate({
							'opacity': '1'
						}, 200, function() {
							resolve();
						});
					});
				}).then(function() {
					return new Promise(function() {
						setTimeout(function() {
							that.lightLine = '';
							that.lineList = rs.data.lineList;
							that.stationList = rs.data.stationList;

							that.prizeStatus = rs.data.prizeStatus;
							that.totalMoney = rs.data.totalMoney;
							that.lotterytimes = rs.data.lotterytimes - 0;
						}, 200);
					});
				});
			},
			lotteryBtnHandler: function() {
				if (!this.haslogin) {
					login();
					return;
				} else if (this.lotterytimes == 0) {
					if (this.paytimes == 0) {
						msgbox.showErrorMsg('主人，您没有砍价机会咯，开会员送2次机会，砍到1元即可1元抱走iPhone XS！', {
							btn_title: '立即开通',
							btn_href: 'javascript:app.payBtnHandler(app.payId);;send_web_pv(\'click\',{clickid:\'acti_1yuan_xs_w2_1\'});;'
						});
					} else {
						msgbox.showErrorMsg('您没有砍价机会咯，继续砍价，砍到1元iPhone XS就是你的，更有50元红包+500元京东卡等你拿！', {
							btn_title: '继续砍价',
							btn_href: 'javascript:app.payBtnHandler(app.payId);;send_web_pv(\'click\',{clickid:\'acti_1yuan_xs_w2_2\'});;'
						});
					}
				} else {
					$('.lotteryBtn').trigger('click');
				}
			},
			exchangePrize: function(prize) {
				if (!this.haslogin) {
					login();
					return;
				} else if (prize == 'iphonexs' && 0 == this.prizeStatus[prize]) { //领取iPhone XS按钮逻辑
					if (1 == this.lotterytimes && 0 == this.paytimes) {
						msgbox.showErrorMsg('送您的1次免费砍价机会，您还没用呢，快去砍价有机会1元拿走iPhone XS！', {
							btn_title: '立即砍价',
							btn_href: 'javascript:;send_web_pv(\'click\',{clickid:\'acti_1yuan_xs_w3_1\'});msgbox.exit()'
						});
					} else {
						msgbox.showErrorMsg('砍到1元iPhone XS就是你的，开会员送2次砍价机会，超高机会赢iPhone XS，更有50元红包+500元京东卡等你拿！', {
							btn_title: '立即开通',
							btn_href: 'javascript:app.payBtnHandler(app.payId);;send_web_pv(\'click\',{clickid:\'acti_1yuan_xs_w3_2\'});'
						});
					}
				} else if (0 == this.prizeStatus[prize]) { //领取生活福利按钮逻辑
					msgbox.showErrorMsg('您还没有开通哦，开通可免费领3大生活福利，快去开通吧', {
						btn_title: '立即开通',
						btn_href: 'javascript:app.payBtnHandler(app.payId);;send_web_pv(\'click\',{clickid:\'acti_1yuan_xs_w4_1\'});'
					});
					// this.payBtnHandler(this.pids.btn2);
				} else if (1 == this.prizeStatus[prize]) {
					this.exchangePrizeFn(prize);
				}
			},
			exchangePrizeFn: function(prize) {
				if (isExchangingPrize) { return; }
				isExchangingPrize = true;
				$.ajax({
					url: 'https://dyactive2-vip-ssl.xunlei.com/iface/?action=getPrize&actid=vip2018iphonexs',
					data: {
						prize: prize
					},
					dataType: 'jsonp',
					context: this,
					success: function(rs) {
						if (0 == rs.result) {
							this.prizeStatus = rs.data.prizeStatus;
							msgbox.showErrorMsg('恭喜您获得' + rs.data.tname + '，可在我的奖品中查看');
						} else {
							msgbox.showErrorMsg(rs.msg);
						}
					},
					error: function() {
						msgbox.showErrorMsg('服务器错误，请联系客服');
					},
					complete: function() {
						isExchangingPrize = false;
					}
				});
			}
		},
		mounted: function() {
			this.lotteryFn();
		}
	});
});