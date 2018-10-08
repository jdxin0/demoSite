/*global Vue $ thunder haslogin login msgbox xla*/
thunder(function() {
	// console.log(haslogin());
	var _ = this._;
	user = this.user;
	var template = this.template;
	msgbox = this.msgbox;
	var main = this.main;
	//var util = this.util;
	var U = this.util;
	var ismove = false;
	pay = this.pay;
	pay.after(function() {
		location.reload();
	});
	this.tj('pageid_497');
	var Data = {
		haslogin: haslogin() ? 1 : 0,
		usertype: 0, //用户类型  0：非会员 1：新开会员 2：老用户会员
		goodslistObj: {},
		goodsList: [],
		prize: [],
		details: '',
		tips: {
			tipsMsg: '',
			btnText: '',
			url: '',
			type: 0 //_blank是链接，false是事件
		}
	};

	function initTJdata() {
		(function() {
			xla.push({
				type: 'globalExtData',
				data: {
					platform: 'pc',
					pageid: 'hygw_fltq_newviptq',
					userid: getCookie('userid') || '',
					is_vip: parseInt(getCookie('vip_isvip')) || '',
					usertype: parseInt(getCookie('vas_type')) || '',
					is_year: parseInt(getCookie('vip_isyear')) || 0,
					is_login: Data.haslogin,
					ed: {
						platform: 'pc',
						pageid: 'hygw_fltq_newviptq',
						userid: getCookie('userid') || '',
						is_vip: parseInt(getCookie('vip_isvip')) || '',
						usertype: parseInt(getCookie('vas_type')) || '',
						is_year: parseInt(getCookie('vip_isyear')) || 0,
						is_login: Data.haslogin
					}
				}
			});
			xla.push({
				type: 'event',
				category: 'hygw_fltq',
				action: 'page_show',
				extdata: {
					is_login: Data.haslogin,
					referfrom: U.getUrlParam(location.href, 'referfrom')
				}
			});
		})();
	}
	main.onInit(function(data) {
		Data.goodslistObj = data.goodslistObj;
		Data.goodsList = data.goodslist;
		initTJdata();
		console.log(1);
		if(data){
		}
	});

	main.onLoginInit(function(data) {
		Data.haslogin = 1;
		Data.usertype = data.usertype;
		Data.prize = data.prize;
		initTJdata();
	});
	Vue.filter('cutDescript', function(input) {
		return input.substring(0, 22).concat('...');
	});
	app = new Vue({
		el: '#app',
		data: Data,
		computed: {
			haveGetPrize: function() {
				return Boolean(this.prize.length);
			},
			mainTips: function() {
				if (Data.haslogin == 1) {
					return '您不是新开迅雷会员，<a href="javascript:login();">开通超级会员享优惠&gt;&gt;</a>';
				} else if (this.haveGetPrize) {
					return '新会员福利限领一次，您已领取过了，<a href="https://act-vip-ssl.xunlei.com/pc/vip/2018/xntq/index.html?referfrom=v_pc_hygw_hytq_fllife" target="_blank">去看看其他特权吧&gt;&gt;</a>';
				} else if (this.usertype == 2) { //未过期老会员，过期老会员
					return '本福利是新会员专属，专属给您的福利已准备好，<a href="https://act-vip-ssl.xunlei.com/pc/vip/2018/xntq/index.html?referfrom=v_pc_hygw_hytq_fllife" target="_blank">去看看吧&gt;&gt;</a>';
				} else if (this.usertype == 0) { //非会员、赠送会员
					return '您不是新开迅雷会员，<a href="javascript:pay(\'vip2018shfl_cj01\', { \'vip2018shfl_cj01\': \'超级会员\', \'vip2018shfl_bj01\': \'白金会员\' });">开通超级会员享优惠&gt;&gt;</a>';
				} else if (this.usertype == 1) {
					//目标用户，不展示提示
				}
			}
		},
		methods: {
			qttqBtnMaidian: function() {
				xla.push({
					type: 'event',
					category: 'hygw_fltq',
					action: 'qttq_pop_click',
					extdata: {
						type: this.haveGetPrize ? 'ylqg' : 'bklq'
					}
				});
			},
			checkGetRecord: function() {
				if (!Data.haslogin) {
					login();
					return;
				}
				if (this.haveGetPrize) {
					msgbox.show('getPrizeSuccessTips');
					xla.push({
						type: 'event',
						category: 'hygw_fltq',
						action: 'jhmggk_pop_show',
						extdata: {
							type: 'lqjl'
						}
					});
				} else {
					msgbox.showErrorMsg('还未领取任何激活码，快去逛逛吧', { title: '知道了' });
					xla.push({
						type: 'event',
						category: 'hygw_fltq',
						action: 'wlq_pop_show',
						extdata: {

						}
					});
				}
				xla.push({
					type: 'event',
					category: 'hygw_fltq',
					action: 'lqjl_click',
					extdata: {}
				});
			},
			mainTipsMaidian: function() {
				if (this.haveGetPrize) {
					xla.push({
						type: 'event',
						category: 'hygw_fltq',
						action: 'sfpd_click',
						extdata: {
							type: 'yjlq'
						}
					});
				} else if (this.usertype == 2) { //未过期老会员，过期老会员
					xla.push({
						type: 'event',
						category: 'hygw_fltq',
						action: 'sfpd_click',
						extdata: {
							type: 'wfxs'
						}
					});
				} else if (this.usertype == 0) { //非会员、赠送会员
					xla.push({
						type: 'event',
						category: 'hygw_fltq',
						action: 'sfpd_click',
						extdata: {
							type: 'ktch'
						}
					});
				} else if (this.usertype == 1) {
					//目标用户，不需要上报
				}
			},
			seeDetailsHandler: function(item) {
				this.details = item.descript;
				msgbox.show('seeDetailsBox');
				xla.push({
					type: 'event',
					category: 'hygw_fltq',
					action: 'yhq_button_click',
					extdata: {
						type: item.prizeid,
						button: 'ckxq'
					}
				});
				xla.push({
					type: 'event',
					category: 'hygw_fltq',
					action: 'pop_show',
					extdata: {
						type: item.prizeid
					}
				});
			},
			getCashHandler: function(item) {
				var that = this;
				if (!this.haslogin) {
					login();
					return;
				} else if (item.remain == 0) {
					//已领完
					return;
				} else if (this.haveGetPrize) {
					this.tips.tipsMsg = '新会员福利限领一次，您已领取过了';
					this.tips.url = 'https://act-vip-ssl.xunlei.com/pc/vip/2018/xntq/index.html?referfrom=v_pc_hygw_hytq_fllife';
					this.tips.btnText = '其他特权';
					this.tips.type = '_blank';
					msgbox.show('canNotGetPrizeTips');
				} else if (this.usertype == 2) { //未过期老会员，过期老会员
					this.tips.tipsMsg = '本福利是新会员专属，专属给您的福利已准备好，去看看吧';
					this.tips.url = 'https://act-vip-ssl.xunlei.com/pc/vip/2018/xntq/index.html?referfrom=v_pc_hygw_hytq_fllife';
					this.tips.btnText = '其他特权';
					this.tips.type = '_blank';
					msgbox.show('canNotGetPrizeTips');
				} else if (this.usertype == 0) { //非会员
					pay('vip2018shfl_cj01', { 'vip2018shfl_cj01': '超级会员', 'vip2018shfl_bj01': '白金会员' });
				} else if (this.usertype == 1) { //目标用户
					$.ajax({
						url: 'https://dyactive2-vip-ssl.xunlei.com/iface/?action=getcode&actid=vip2018shfl',
						data: {
							prizeid: item.prizeid
						},
						dataType: 'jsonp',
						success: function(rs) {
							if (!rs.result) {
								item.remain -= 1;
								that.prize.push({
									prizeid: rs.data.prize,
									keycode: rs.data.keycode
								});
								msgbox.show('getPrizeSuccessTips');
								createScratchCard('.card-scartch', 50, function(f, t) {
									var cardScartch = document.querySelector('.card-scartch canvas');
									fadeOut(cardScartch);
								}, true);
								xla.push({
									type: 'event',
									category: 'hygw_fltq',
									action: 'jhmggk_pop_show',
									extdata: {
										type: 'lqcg'
									}
								});
							} else {
								msgbox.showErrorMsg(rs.msg);
							}
						},
						error: function(err) {
							alert('服务器错误');
						}
					});
				}
				xla.push({
					type: 'event',
					category: 'hygw_fltq',
					action: 'yhq_button_click',
					extdata: {
						type: item.prizeid,
						button: 'ljlq'
					}
				});
			}
		}
	});
});