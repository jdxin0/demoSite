$(function(){
	$('#slides').slidesjs({
		width: $(window).width(),
		height: $(window).width()/1920*296,
		navigation:{
			active: false,
			effect: 'fade'
		},
		pagination:{
			active:true,
			effect: 'fade'
		},
		play:{
			active: true,
			effect: 'fade',
			interval: 3000,
			auto: true,
			swap: false,
			pauseOnHover: false,
			restartDelay: 2500
		},
		effect:{
			slide:{speed: 500},
			fade: {
        speed: 500,
          // [number] Speed in milliseconds of the fade animation.
        crossfade: true
          // [boolean] Cross-fade the transition.
      }
		}
	})
	// 轮播图
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay : 3000,
		speed:300,
		// 如果需要分页器
		pagination: '.swiper-pagination',
		// 如果需要前进后退按钮
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});

	$(".banner-wrap").height(window.innerWidth * 430 / 2732);

	var pages = [1],
		col = parseInt((+$('body').width() * 0.8 < 750 ? 750 : +$('body').width() * 0.8) / 227),
		_template = '<li data-id="${app_id}" data-desc="${description}" data-logo="${logo}" class="js-tpl" data-tp="${ori_price}">${price}<img class="cover" src="${cover}" onerror="errorWeiyeCover(this)">${isFree}'
              + '<div class="code-mask"><img class="code" src="${qrcode}" alt="">'
              + '${btn}<span class="select-btn js-preview-btn">预览</span></div></li> ',
      _cataData = {},
      _appData = {},
      cdnUrl="http://cdn.jisuapp.cn/zhichi_frontend";
	//getCategory();
	// 绑定事件
	$('body').on("click",".scrollTop",function(){
		$(window).scrollTop(0);
	}).on('click', '#first-navs span', function(event) {
	
		$(this).addClass('active').siblings('.active').removeClass('active');
		var cate = $(this).attr("data-cate"),
		    index = $(this).index(),
		    isFree = $(".tpl-pay-select .active").index(),
		    sec_cate = "";
		    if(index==0){
		    	sec_cate = $(".tpl-sec-navs span.active").attr("data-cate") || 0;
		    }else{
		    	sec_cate =0;
		    }
		    var search = "?a="+cate+"&b="+sec_cate+"&c="+isFree;
		    if($(this).index() == 0){
		    	search = "";
		    }
		    window.location.href = window.location.origin+"/make/"+search;
	}).on('click','.tpl-sec-navs span' ,function(event) {
	
		$(this).addClass('active').siblings('.active').removeClass('active');
		var cate = $(this).attr("data-cate"),
		    isFree = $(".tpl-pay-select .active").index(),
		    first_cate = $('#first-navs span.active').attr("data-cate");
		    var search = "?a="+first_cate+"&b="+cate+"&c="+isFree;
		    if($('#first-navs span.active').index() == 0 && $(this).index() == 0){
		    	search = "";
		    }
		    window.location.href = window.location.origin+"/make/"+search;
	}).on('click', '.choose-btn', function(event) {
		// var appId = $(this).parent().parent().attr('data-id');
		// if($(this).hasClass('js-preview-btn')){
			// initialPreview(appId);
			// $('#preview-tpl-dialog').show('slow');
			// $('#add-app-dialog').attr('data-id', appId).attr('data-color', '');
		// }else{
			// $('#add-app-dialog').attr('data-id', appId).attr('data-color', '').show('slow');
		// }

		var $li = $(this).closest('li'),
			param = {
				app_name : $li.children('.name').text(),
				description: '' ,
				logo : cdnUrl + '/static/invitation/images/logo.png',
				cover: cdnUrl + '/static/webapp/images/share_feng.jpg' ,
				f_app_id : $li.attr("data-id")
			};
		addApp($(this) , param);
		event.stopPropagation();
	}).on('click', '.buy-btn', function(event) {
		var appId = $(this).closest('li').attr('data-id'),
				appPrice = $(this).closest('li').attr('data-tp'),
			priceText = $(this).closest('li').find('.item-price').text();
		$ajax('/index.php?r=pc/Order/AddOrder',
			'get',
			{
				app_id: appId,
				obj_id: 17
			},
			'json',
			function(data){
				var dialogContent = '<div class="payment-item"><span>付款金额：</span><span class="price" >'+ data.price +'</span> 元<del style="margin-left: 5px;">原价'+appPrice+'元</del></div><div style="margin-left: 90px;"><span class="upgrade-tip">(升级会员，享受更多优惠)</span><a class="upgrade-btn" href="/index.php?r=pc/Index/appVipPacket">去升级&gt;&gt;</a></div>'
									+'<div class="payment-item"><span>订单号：</span><span>'+ data.order_id +'</span></div>'
									+'<div class="payment-third-text">选择支付平台</div>'
									+'<div class="payment-third"><div class="payment-alipay"><img src="'+ cdnUrl +'/static/pc2/vippacket/images/alipay.png" />'
									+'<a target="_blank" id="alipay-pay-btn" href="/index.php?r=pc/order/AliPay&order_id='+ data.order_id +'">点击去支付</a></div>'
									+'<div class="payment-wechat"><img src="'+ cdnUrl +'/static/pc2/vippacket/images/wecharpay.png" />'
									+'<div id="wechat-pay-btn">点击去支付</div></div>'
									+'<div class="payment-wechat-qrcode"><img id="wechar-pay-qrcode-img" src="" /><div class="payment-wechat-qrcode-tip"><img src="'+ cdnUrl +'/static/pc2/common/images/wechat.jpg"/>微信扫码支付</div></div></div>';
				app_default_modal_dialog('购买模板', dialogContent);
				// 检查订单状态
				var checkTime = 0;
				function checkOrder(order_id){
					clearInterval(checkTime);
					checkTime = setInterval(function(){
						$.ajax({
							url:'/index.php?r=pc/Order/CheckOrder',
							data:{order_id: order_id},
							dataType:'json',
							type:'post',
							success:function(data){
								if (data.status != 0) {
									alertTip(data.data);
									return;
								}
								switch(data.data.status) {
									case '0':  // 订单未支付
										break;
									case '1': // 订单支付完成
										alertTip('订单支付完成');
										clearInterval(checkTime);
										$('.dialog-close-btn').trigger('click');
										window.location.reload();
										break;
									case '2': // 订单取消
										break;
								}
							},
							error:function(data){
							}
						})
					}, 3000);
				}
				setTimeout(function(){
					checkOrder(data.order_id);
				}, 3000);
				$('.dialog-close-btn').on('click', function(){
					clearInterval(checkTime);
				})
				//微信支付二维码生成
				$.ajax({
					url:'/index.php?r=pc/order/WeixinCodePay', 
					type:'get', 
					data:{
						order_id: data.order_id
					}, 
					dataType:'json', 
					success:function(data) {
						var qr = qrcode(10, 'L');
						qr.addData(data.data);
						qr.make();
						$('#wechar-pay-qrcode-img').attr('src', $(qr.createImgTag()).attr('src'));
						$('#wechat-pay-btn').on('click', function(){
							$('.payment-wechat').hide();
							$('.payment-wechat-qrcode').css({"display":"inline-block"});
						})
					}
				});
			},function(data){

			}
		);
		event.stopPropagation();
	}).on('click', '.code-mask', function(event) {
		var appId = $(this).closest('li').attr('data-id');
		//window.open('/index.php?r=pc/Webapp/preview&id=' + appId +'&f_tpl=1');
		window.open('/make/' + appId +'.html');
	}).on('click', '.empty-tpl', function(event) {
		// var appId = $(this).attr('data-id');
		// $('#add-app-dialog').attr('data-id', appId).attr('data-color', '').show('slow');
		var $li = $(this).closest('li'),
			param = {
				app_name : '我的应用',
				description: '',
				logo : cdnUrl + '/static/invitation/images/logo.png',
				cover: cdnUrl + '/static/webapp/images/share_feng.jpg'
			};
		addApp($(this) , param);
	}).on('click', '.tpl-pay-select span', function(event) {
	
		$(this).addClass('active').siblings().removeClass('active');
		var index = $('#first-navs span.active').index(),
		    isFree = $(this).index(),
		    first_cate = $('#first-navs span.active').attr("data-cate"),
		    sec_cate = "";
		    if(index==0){
		    	sec_cate = $(".tpl-sec-navs span.active").attr("data-cate") || 0;
		    }else{
		    	sec_cate =0;
		    }
		    var search = "?a="+first_cate+"&b="+sec_cate+"&c="+isFree;
		    if($('#first-navs span.active').index() == 0 && $(".tpl-sec-navs span.active").index() == 0 && $(this).index() == 0){
		    	search = "";
		    }
		   window.location.href = window.location.origin+"/make/"+search;
	});
	// 书签
	$("#add-label-span").on('click', function(event) {
		$("#add-label").show();
	});
	$("#add-label").on('click', '.labelClose', function(event) {
		$("#add-label").hide();
	});
	// 企业高级版申请
	$(".advanced-label-btn").on('click',function(event){
		if($('.webapp').attr('is_login') != 0){
				$("#advanced-container").show();
	}else{
				$('.lr').eq(0).addClass('show').siblings('.show').removeClass('show');
		loginFunc();
		$('.lr-mask').fadeIn(500);
		}
	})
 //     var page=2;
	// $(window).scroll(function(event) {
	// 	var $content = $('.tpl-content.active'),
	// 		$container = $content.find('.tpl-container');
	// 	if ($container.hasClass('js-requesting') || $container.hasClass('js-no-more')) {
	// 		return;
	// 	}
	// 	var dataCate=$('.tpl-sec-navs span.active').attr('data-cate');
	// 	if(dataCate!=0){
	// 		return;
	// 	}
	// 	var ifRequest = $(document).height()-($(window).height()+$(this).scrollTop()) < 10;

	// 	if(ifRequest){
	// 		var index = $('#first-navs > .active').index(),
	// 			// cate = $content.find('.tpl-sec-navs .active').attr('data-cate') || $('#first-navs > .active').attr('data-cate'),
	// 			cate=$('#first-navs >span.active').attr('data-cate'),
	// 			isFree = $(".tpl-pay-select .active").index();
	// 			console.log(cate)
	// 		$container.addClass('js-requesting');
			
	// 		getTpls({page:page++,page_size:20,type:0,is_free:0},1,cate, index, isFree);
	// 	}
	// });
   // //懒加载
   
   $("img.lazy").lazyload({effect: "fadeIn"});
	// 获取类别
	function getCategory(){
		$ajax('/index.php?r=pc/AppData/AppCategoryList','get',{type : 0},'json',
			function(data){
				if (data.status === 0) {
					var categorys = data.data,
					contentsStr = '',
					firstCateStr = '';
					if(categorys.length){
						$(categorys).each(function(index, item) {
							var secCates = item.cate,
									contentStr = '<div class="tpl-content '+(index==0 ? 'active' : '')+'">',
									secCatesStr = '';

							if(secCates.length > 0){
								secCatesStr += '<div class="tpl-sec-navs"><span data-cate="'+item.id+'" class="active">全部</span>';
								$(secCates).each(function(index, el) {
									secCatesStr += '<span data-cate="'+el.id+'">'+el.name+'</span>';
								});
								secCatesStr = secCatesStr + '</div>';
							}

							firstCateStr += '<span data-cate="'+item.id+'" class="'+(index==0 ? 'active' : 'js-uninitial')+'">'+item.name+'</span>'
							contentStr += secCatesStr + '<ul class="tpl-container"><li class="empty-tpl" data-id="-1"><div class="note-icon"></div><p class="name">空白模板</p></li></ul></div>';
							contentsStr += contentStr;
							pages.push(1);
						});

						$('#first-navs').append(firstCateStr);
						$('body').append(contentsStr);
						if (window.location.hash == '#single') {
							// 线上data-cate = 12
							$('#first-navs span[data-cate="12"]').trigger('click');
						};
						//getTpls({type: 0, page: 1, page_size: 1}, 1, categorys[0].id , 0);
					}else{
						// 没有分类时
						$('#first-navs span').eq(0).trigger('click');
					}
				}else{
					alertTip(data.data);
				}
			},function(data){
				alertTip(data.data);
		});
	}

	// 获取模板数据
	function getTpls(param, isreset, cate, index, isFree ){
		var $container = $('.tpl-container').eq(index);
			// param = {type: 0, page: page, page_size: 1};

		if(cate == -1){
			param.user = 1;
		}else{
			param.cate_id = cate;
		}
		param.is_free = isFree || 0;
		$ajax('/index.php?r=pc/AppData/AppTplList','get',param,'json',
			function(data){
				if (data.status === 0) {
					var tpls = data.data;
					tpls.length && dealData(tpls, $container, index);

					pages[index]++;
					if(data.is_more == 0){
						$container.addClass('js-no-more');
					}
				}else{
					alertTip(data.data);
				}
				$container.removeClass('js-requesting');
			},
			function(data){
				alertTip(data.tpls);
				$container.removeClass('js-requesting')
		});
	}

	function dealData(tpls, $container, index){
		$container.find('.filler').remove();

		var content = '',
			addAmount = tpls.length,
			curAmount = $container.find('.js-tpl').length,
			temp = (addAmount+curAmount)%col,
			fillerAmount = ( temp ? col : 0 ), // 需要增加的filler个数
			shadowLis = '';

		$.each(tpls, function(i, item){
			content += ' ' + parseTemplate(item, index);
		});
		for(var i=0; i<fillerAmount; i++){
			shadowLis += ' <li class="filler">&nbsp;</li>';
		}
		content += shadowLis;

		$container.append(content);
	}

	// 拼接请求到的数据内容
	function parseTemplate(data , index){
		var html = _template.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'isFree':
					if (parseFloat(data.price) == 0) {
						return '<p class="name">'+ data.app_name +'</p>';
					} else {
						return '<div class="item-info"><span class="item-name">'+ data.app_name +'</span><span class="item-price">'+ data.price +'元</span></div>';
					}
					break;
				case 'btn':
					// if(index==0){
					// 	return '<span class="select-btn choose-btn">复制</span>';
					// }else{
						// return '<span class="select-btn choose-btn">选择</span>';
					// }
					if (parseFloat(data.price) != 0 && parseInt(data.is_paid) == 0) {
						return '<span class="select-btn buy-btn">购买</span>';
					} else {
						return '<span class="select-btn choose-btn">使用</span>';//修改
					}
					break;
				case 'price':
				     if(data.price && data.price != 0){
						var priceStr = +data.is_paid ? '已买' : data[$1]+'元';
						return '<div class="price"><span>'+priceStr+'</span></div>'
				  }
				  break;
				case 'ori_price':
					return data.ori_price;
					break;
				default :
					return data[$1];
			}
		});
		return html;
	}


	function setColor(color){
		var _color = new String(color),
				appId = $('#add-app-dialog').attr('data-id');
		$('#add-app-dialog').attr('data-color', _color);
		$('#preview-iframe').attr('src', '/app?_app_id='+appId+'&style_color='+encodeURIComponent(_color));
	}

	function initialPreview(appId){
		// 预览时
		var $preview = $('#preview-iframe');
		$preview.attr('src', '/app?_app_id='+appId);

		$ajax('/index.php?r=pc/AppData/detail','get',{app_id: appId},'json',function(data){
			if (data.status === 0) {
				var info = data.data;

				_cataData = typeof info.cata_data === 'string'  ? JSON.parse(info.cata_data) : info.cata_data;
				_appData = typeof info.app_data === 'string'  ? JSON.parse(info.app_data) : info.app_data;

				parseCata();
			}else{
				alertTip(data.data);
			}

		});
	}
	function parseCata(router){
		var cataStr = '',
				targetRouter = router || 'page00',
				cataDataContent = _cataData.data;
		for(var cata in cataDataContent) {
			if(cataDataContent[cata]){
				var pages = cataDataContent[cata].pages,
						i = 0;
				cataStr += '<li class="group-page-nav active" data-index="'+cataDataContent[cata].index+'"><p class="group-nav">'+cataDataContent[cata].group+'</p><ul class="page-navs">';
				for(var item in pages){
					i++;
					cataStr += parsePageNavStr(pages[item].router, pages[item].title, pages[item].name);
				}
				if(i<=0){
					cataStr += '<p class="empty-group-tip">此分组暂无页面</p>';
				}

				cataStr += '</ul></li>';
			}
		};
		$('#group-page-container').empty().append(cataStr);
		$('#group-page-container .page-nav[data-router="'+targetRouter+'"]').addClass('active');
	}
	function parsePageNavStr (router, title, name){
		var str = '<li class="page-nav" data-router="'+router+'" data-title="'+title+'" data-name="'+name+'"><span class="js-page-name">'+name+'</span></li>';
		return str;
	}

	function addApp($btn , param){
		if($btn.hasClass('requesting')){
			return;
		}
		// var name = $('#app-name').val(),
		//     description = $('#app-description').val(),
		//     logo = $('#app-logo').attr('src'),
		//     cover = $('#app-cover').attr('src');

		// if(name.length<=0){
		// 	alertTip('请输入应用名');
		// 	$('#app-name').focus();
		// 	return;
		// }

		// if(description.length<=0){
		// 	alertTip('请输入应用描述');
		// 	$('#app-description').focus();
		// 	return;
		// }
		// if(logo===cdnUrl+'/static/invitation/images/logo.png'){
		// 	alertTip('请上传logo');
		// 	return;
		// }
		// if(cover===cdnUrl+'/static/webapp/images/share_feng.jpg'){
		// 	alertTip('请上传封面');
		// 	return;
		// }

		// var appId = $('#add-app-dialog').attr('data-id'),
		// 		color = $('#add-app-dialog').attr('data-color'),
		// 		param = {
		// 			app_name : name,
		// 			description: description,
		// 			logo : logo,
		// 			cover: cover,
		// 			style_color: color
		// 		};

		// if(appId!='-1'){
		// // appId=='-1'的话 表示没有选择模版
		// 	param.f_app_id = appId;
		// }
		// if(color){
		// // 预览模版，有选择风格颜色并确定使用该模版时，需要把app里相关的组件变化做处理，并把修改后的app_data发给后台保存
		// 	setAppData(color);
		// 	param.app_data = JSON.stringify(_appData);
		// }

		$btn.addClass('requesting');
		$ajax('/index.php?r=pc/AppData/add','post', param,'json',function(data){
				$btn.removeClass('requesting');
				if (data.status === 0) {
					window.location.href = '/index.php?r=pc/Webapp/edit&id='+data.data;
				}else if (data.status === 2) {
					loginFunc();
					$('.lr-mask').show('slow');
				} else if (data.status === 3){
					confirmTip({
					text : data.data,
					ConfirmText:'立即升级',
					CancelText: '暂不升级',
					ConfirmFunction : function(){
						window.open('/index.php?r=pc/Index/appVipPacket');
					},
					CancelFunction : function(){
						
					},
					CloseFunction :  function(){
						
					}
				})
				} else {
					alertTip(data.data);
				}
			},
			function(data){
				$btn.removeClass('requesting');
				alertTip(data.data);
		});
	}

	function setAppData(color){
		for(var router in _appData){
			var eles = _appData[router].eles;
			setAppEles(eles, color);
		}
	}
	function setAppEles(eles, color){
		$(eles).each(function(index, ele) {
			switch(ele.type){
				case 'top-nav':
				case 'bottom-nav':
				case 'button':
						ele.style = ele.style || {};
				    ele.style['background-color'] = color;
				    break;
				case 'classify':
						ele.customFeature = ele.customFeature || {};
				    ele.customFeature['selectedColor'] = color;
				    break;
				case 'breakline':
						ele.style = ele.style || {};
				    ele.style['border-color'] = color;
				    break;
				case 'title-ele':
						ele.customFeature = ele.customFeature || {};
				    ele.customFeature['markColor'] = color;
				    break;
				case 'static-vessel':
				case 'free-vessel':
				case 'list-vessel':
				case 'dynamic-vessel':
				case 'form-vessel':
					setAppEles(ele.content, color);
					break;
				case 'layout-vessel':
					setAppEles(ele.content.leftEles, color);
					setAppEles(ele.content.rightEles, color);
					break;
			}
		});
	}

	// app-默认-模态框
	function app_default_modal_dialog(title, content) {
		var dialogHtml = '<style>.dialog-mask{display:block;position:fixed;z-index: 99999;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);}.dialog-panel{width: 600px;height: 370px;background-color: #fff;border-radius: 5px;color: #78809f;position: absolute;left: 50%;top: 50%;margin-left: -300px;margin-top: -185px;overflow: hidden;}.dialog-title{background-color:#ebad02;line-height:50px;padding-left: 20px;font-size: 18px;color: #fff;}.dialog-close-btn{display: inline-block;width: 35px;height: 35px;text-align: center;line-height: 35px;cursor: pointer;position: absolute;top: 7px;right: 7px;font-size: 35px;}.dialog-content{padding: 0 50px;}</style>'
			+'<div class="dialog-mask"><div class="dialog-panel"><div class="dialog-title">'+title+'<span class="dialog-close-btn">×</span></div><div class="dialog-content">'+content+'</div></div></div>';

		dialogHtml = $(dialogHtml);

		$(dialogHtml).find('.dialog-close-btn').click(function(event){
			$(dialogHtml).remove();
		});
		$('body').append(dialogHtml);
	}


});
	//底部导航
	$(".nav_top").on("mouseover",".nav_help",function(){
		$('.help_con').show();
	}).on("mouseout",".nav_help",function(){
		$('.help_con').hide();
	}).on("mouseover",".nav_video",function(){
		$('.video_con').show();
	}).on("mouseout",".nav_video",function(){
		$('.video_con').hide();
	})
	