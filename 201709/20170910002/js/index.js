$(document).ready(function(){
			var toLiveRoom = {
			    init: function() {
			        this.runApi();
			        // this.event();
			    },
			    initEvents: function(Events) {
			    	var key, keyArr, delElems, elems;
			    	var spiltElems = function(elems) {
			    		return elems.split('&').join(',');
			    	}
			    	for (key in Events) {
			    		keyArr = key.split('|');
			    		switch (keyArr.length) {
			    			case 3:
			    				delElems = spiltElems(keyArr[0]);
			    				elems = spiltElems(keyArr[1]);
			    				events = spiltElems(keyArr[2]);
			    				if (delElems.indexOf('document') != -1) {
			    					delElems = document;
			    				}
			    				$(delElems).on(events, elems, Events[key]);
			    				break;
			    			case 2:
			    				elems = spiltElems(keyArr[0]);
			    				events = spiltElems(keyArr[1]);
			    				$(elems).on(events, Events[key]);
			    				break;
			    			default:
			    				break;
			    		}
			    	}
			    },
			    event: function() {
			        var Events = {
			            'document|.openUrl|click': function() {
			            	client.ui.openUrl({
			            		title:'hello',
			            		url:'http://act.vip.xunlei.com/m/vip/2017/weizhong/',
			            		openType:1
			            	});
			            }
			        }
			        this.initEvents(Events);
			    },
			    runApi: function() {
			    	// client.ui.showLoadingView();
			        // this.conLogClientInterface();
			        // this.conLogApp();
			        // this.conLogOpenClientPage();
			        // this.conLogDevice();
			        // this.conLogUi();
			        // this.conLogCall();
			        // this.conLogData();
			        // this.pay();
			    },
			    conLogClient:function(){
			        console.log(client);
			    },
			    conLogApp:function(){
					client.app.checkAppInstalled({
						appSchemes: ['com.tencent.mm', 'com.tencent.mobileqq', 'com.eg.android.AlipayGphone'] // ['mqq', 'weixin'] appSchemes参数必须数组
					}, function(data) {
						// alert(JSON.stringify(data))
						if (data['com.tencent.mobileqq']) {
							client.app.openApp({
								openType: 0,
								name: 'com.tencent.mobileqq'
							})
						}
					})
			    },
			    conLogOpenClientPage:function(){
			    	/**
			    	 * ios手雷购买
			    	 * @param {String} params.selectedTabIndex 0代表白金 1代表超级
			    	 * @param {String} params.purchaseType 0 代表开通 1代表升级
			    	 * @param {String} params.refer 页面统计码
			    	 */
			    	 /**
			    	             * iOS 5.19+, Android 5.18+
			    	             * 这个接口iOS和Android看到的效果不一样。iOS是打开会员支付页面，Android是打开支付宝或微信，或支付页面
			    	             *
			    	             * 下面Android参数，目前iOS不需要传任何参数
			    	             * @param {Object} params 参数
			    	             * @param {Number} params.payType 0=弹出本地支付方式选择框（暂不支持）；1=直接打开微信支付；2=直接打开支付宝支付 3=跳转支付页面支付
			    	             * @param {String} params.reportRefer (required) 用于支付统计 
			    	             * @param {Number} params.monthOrTDays 月份或者天数。如果是升级，则是升级的天数。否则，为月份（迅雷会员可选1-12）
			    	             * @param {Number} params.orderType 订单类型：0为购买/续费，1为升级 默认为购买/续费
			    	             * @param {Number} params.vasType 支付类型：0、4 钻石会员；2 普通会员；3 白金会员；101 网游加速会员；102 高级网游加速会员 201
			    	             *                  迅雷影视会员；202 迅雷阅读点；203 迅雷阅读会员；204 迅雷快鸟会员
			    	             * @param {String} params.orderExtraParam 订单购物车附加参数，当vasType=206,夺宝币支付时：购物车下单参数，json格式，为空表示夺宝币充值操作（其他业务可空）
			    	             * @param {String} params.orderVoucher    订单抵用金额，当vasType=206 夺宝币支付时：红包金额（其他业务可空）
			    	             *
			    	             * @param callback 回调函数
			    	             * @param callback.data 回调函数自带的数据
			    	             *
			    	             * Android 5.18+开始使用, iOS 5.19+开始使用
			    	             * @param callback.data.internalError 错误日志
			    	             * @param callback.data.internalError.errorCode 错误代码
			    	             * @param callback.data.internalError.errorMsg 错误信息
			    	             */
			    	  client.ui.pay({
		                    payType: 3,
		                    reportRefer: "12"
		                });
			    	 client.data.xlGoToMemberPurchasePage({
			    	 	    selectedTabIndex: 0,
			    	 	    purchaseType: 1,
			    	 	    refer: "12"
			    	 	});
			    	
			    	// clinet.call(xlOpenClientPage)
			    	// alert(JSON.stringify(client.ui.xlOpenClientPage))
			    	// client.ui.xlOpenClientPage({});
			    },
			    conLogDevice:function(){
			    	client.device.getAppMetaData(function(rs){
				    	alert(JSON.stringify(rs))
			    	})
			    	/*client.device.getNetworkInfo(function(rs){
			    		alert(JSON.stringify(rs));
			    	});*/

			    },
			    conLogUi:function(){
			    	client.ui.showToast("显示showToast",1);
			    	
			    	client.ui.showLoadingView();
			    	// client.ui.hideLoadingView();
			    	/*client.ui.openUrl({
			    		title:'test',
			    		url:'http://www.yanhu.com/201709/20170910002/20170910002.html',
			    		openType:1
			    	});*/
			    	/*client.ui.startSniff({
						"keyword": "大圣归来", // 搜索的关键字
						"suffix": "mp4", // mp4, thunder 等
						"autoSniffer": true, // 是否自动弹出嗅探
						"from": "search_result" // 来源 比如：search_result(搜索结果页), yingshi(长视频)
					});*/
					/*client.ui.videoPlay({
						url:'http://qiniu.luojianet.com/videoh264_800k_mp4.mp4',
						title:'旅途.mp4'
					});*/
					/*client.ui.openLocalPage({
						openType:'1',
						vodType:1
					})*/
					/*client.ui.pay({
	                    'payType': '3',
	                    'reportRefer': '123'
	                });*/
			    },
			    conLogCall:function(){
			    	client.call('xlOpenClientPage',{
                        'clientPageName':'xlliveRoom',
                        'roomInfo':'{"userid":"667448096","status":1,"title":"转角遇到我😀","image":"http:\/\/cdn.live.xunlei.com\/cdn\/avatar\/6\/522cbc7fbc08a202ade1b39f1344dcd1.jpg","stream_server":2,"start_time":"2017-09-15 09:46:39","end_time":"0000-00-00 00:00:00","play_url":"","play_hls_url":"","platform":1,"current_point":3150,"current_income":1280,"current_user":4509,"record_file":0,"record_status":1,"appos":"android","appver":"2.13.96.0","uuid":"32786312","roomid":"6573_667448096","stream_pull":"rtmp:\/\/rtmp.stream2.show.xunlei.com\/live\/6573_667448096","stream_hls_pull":"http:\/\/hls.stream2.show.xunlei.com\/live\/6573_667448096\/playlist.m3u8","stream_flv_pull":"http:\/\/pull.stream2.show.xunlei.com\/live\/6573_667448096.flv","isvcaccept":1,"model":"","osver":"7.0"}',
                        'from':''
                    },function(rs){
                        $.ajax({
                        	url:"http://www.xuliehaonet.com/interface/jsonp.php",
                        	dataType:"jsonp",
                        	success:function(){

                        	}
                        })
                    })
			    },
			    conLogData:function(){
			    	client.data.getUserInfo({
			    		forceLogin:1
			    	},function(rs){
			    		alert(rs.userInfo.userID)
			    		alert(rs.userInfo.sessionID)
			    		// alert(JSON.stringify(rs))
			    	});
			    },
			    pay:function(){
			    	client.ui.pay({
			    	    payType: 3,
			    	    reportRefer: 123
			    	});
			    }
			}
			toLiveRoom.init();
		})