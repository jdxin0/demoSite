//全局变量
var pagearr = [], // 微页代码数组
	myinvitation_id = null , //微页id
	actId = 0, //活动id
	serise = '', //系列模板
	commondata = {},
	itttpl = {}, //模板数据
	cdnUrl = "http://cdn.jisuapp.cn/zhichi_frontend",
	default_page = '<section class="page page-15" id="1071" style="background-image: url(http://img.weiye.me/zcimgdir/album/file_5665544e9742b.jpg); background-size: 100% 100%; background-repeat: no-repeat;">'
				+ '<div class="pageshow">'
				+ '<div class="img animate js-min-zIndex int-animate" isproportion="true" animatename="more_flipInX" el_name="图片1" style="position: absolute; left: 25.9%; top: 17.6%; width: 48.1%; z-index: 200; animation-duration: 1s; animation-timing-function: initial; animation-delay: 0.7s;'
				+ ' animation-iteration-count: 1; animation-direction: initial; animation-fill-mode: initial; animation-name: initial; opacity: 1; display: block;"'
				+ ' animate-arr="{&quot;0&quot;:{&quot;animation-name&quot;:&quot;more_flipInX&quot;,&quot;-webkit-animation-duration&quot;:&quot;1&quot;,&quot;'
				+ 'animation-duration&quot;:&quot;1&quot;,&quot;opacity&quot;:1,&quot;-webkit-animation-iteration-count&quot;:&quot;1&quot;,&quot;animation-iteration-count&quot;:&quot;1&quot;,&quot;'
				+ 'animation-delay&quot;:&quot;0.2&quot;,&quot;-webkit-animation-delay&quot;:&quot;0.2&quot;},&quot;1&quot;:'
				+ '{&quot;animation-name&quot;:&quot;more_rubberJelly&quot;,&quot;-webkit-animation-duration&quot;:&quot;1&quot;,&quot;animation-duration&quot;:&quot;1&quot;,&quot;opacity&quot;:1,&quot;'
				+ '-webkit-animation-iteration-count&quot;:&quot;1&quot;,&quot;animation-iteration-count&quot;:&quot;1&quot;,&quot;animation-delay&quot;:&quot;0.7&quot;,&quot;-webkit-animation-delay&quot;:&quot;0.7&quot;}}"><div class="animate-contain">'
				+ '<img src="http://img.weiye.me/zcimgdir/album/file_56654c504b08f.png" alt="" style="width: 100%;" width="" imgid="127235"></div></div>'
				+ '<div class="animate text-new text_edit bounceInCenter" animatename="bounceInCenter" el_name="文字1" style="position: absolute; left: 36.1%; top: 66.6%; z-index: 201; animation-duration: 2s; animation-delay: 0.4s; opacity: 1; animation-iteration-count: 1; display: block; width: 27.9%; height: 5.4%;" '
				+ 'data-animation-style="{&quot;duration&quot;:&quot;2s&quot;,&quot;delay&quot;:&quot;0.4s&quot;,&quot;iteration-count&quot;:&quot;1&quot;}"><div class="animate-contain" style="color: rgb(255, 255, 255);"><p><span style="font-size: 18px;">咫尺微页</span></p></div></div>'
				+ '<div class="animate text-new text_edit js-max-zIndex int-animate" animatename="more_flipInX" el_name="文字2" style="position: absolute; left: 0.6%; top: 79.9%; z-index: 202; animation-duration: 1s; animation-delay: 0.2s; opacity: 1; animation-iteration-count: 5; display: block; height: 4.6%; width: 100%;" '
				+ 'animate-arr="{&quot;0&quot;:{&quot;animation-name&quot;:&quot;more_flipInX&quot;,&quot;-webkit-animation-duration&quot;:&quot;1&quot;,&quot;animation-duration&quot;:&quot;1&quot;,&quot;opacity&quot;:1,&quot;-webkit-animation-iteration-count&quot;:&quot;1&quot;,&quot;'
				+ 'animation-iteration-count&quot;:&quot;1&quot;,&quot;animation-delay&quot;:&quot;0.7&quot;,&quot;-webkit-animation-delay&quot;:&quot;0.7&quot;},&quot;1&quot;:{&quot;animation-name&quot;:&quot;more_jump_run&quot;,&quot;-webkit-animation-duration&quot;:&quot;1&quot;,&quot;'
				+ 'animation-duration&quot;:&quot;1&quot;,&quot;opacity&quot;:1,&quot;-webkit-animation-iteration-count&quot;:&quot;5&quot;,&quot;animation-iteration-count&quot;:&quot;5&quot;,&quot;animation-delay&quot;:&quot;0.2&quot;,&quot;-webkit-animation-delay&quot;:&quot;0.2&quot;}}">'
				+ '<div class="animate-contain" style="color: rgb(255, 255, 255);"><p style="text-align: center;"><span style="font-size: 18px;">点击画面元素，<span style="line-height: 1.5em;">开始制作微页</span></span></p></div></div></div>'
				+ '</section>'   //默认模板

	,zMaxIndex = 200 //最大层级数
	// 弹幕实例
	,danmuInstance
	,danmuImg = cdnUrl+'/static/pc/invitation/images/default_photo.jpg'
	,danmupara = {
		rowcount: 3
		,danmuHeight: 50
		,danmuArray: [{imgSrc: danmuImg, text:'这是一条弹幕'}
						,{imgSrc: danmuImg, text:'弹幕让你的微页更吸引人'}
						,{imgSrc: danmuImg, text:'弹幕可以展示客户的反馈'}
						,{imgSrc: danmuImg, text:'弹幕可以收集用户的意见'}
						,{imgSrc: danmuImg, text:'这是一条弹幕'}
						,{imgSrc: danmuImg, text:'弹幕让微页更容易被记忆'}
						,{imgSrc: danmuImg, text:'这是一条弹幕'}
						,{imgSrc: danmuImg, text:'这是一条弹幕'}
						,{imgSrc: danmuImg, text:'这是一条弹幕'}
						,{imgSrc: danmuImg, text:'这是一条弹幕'}]
		,content: '<span><img src="${imgSrc}"></span><span>${text}</span>'
	}
	,danmu_id_arr = []
	// 表单数据
	,formData = {}
	,form_id_arr = []
	,form_ele_id_arr = []
	,fix_nav_num = 0 //全局固定的栏目数 
	,_allClasses //链接加的所有类名
	,_allAttrs //链接加的所有属性
	,voteId
	,category_id //分类id
	,uv_count //该微页数据
	;

//权限列表
var pmi_list = {
	admin : false , 
	isadmin : false , 
	isone : false ,
	istuiguang : false ,
	isVip : false,
	isCollectFirst : false,
	industryAgent : false,
	vipLevel : 0 ,
	packageLevel : 0,

	init : function(){
		var isAdmin = GetQueryString('isAdmin'), // 是否以管理员的身份进入 在编辑单页模板的时候需要
			admin = $("body").attr("admin"), //是否管理员
			isone = $("body").attr("isone"), //是否是第一次进入
			industryagent = $("body").attr("industry-agent");

		this.admin = (admin == 1 ? true : false);
		this.isAdmin = (admin == 1 && isAdmin == 1 ? true : false);
		this.isone = (isone == 0 ) ? true : false;
		this.industryAgent = industryagent == 1 ? true : false;

		this.getisVip();

		if(this.industryAgent){
			$("#haoyisheng-div").show();
			$("#haoyisheng-checkbox").prop("checked" , true);
		}
	},
	getisVip : function(){
		var _this = this;
		// $ajax('/index.php?r=pc/InvitationNew/getIsVip','get','','json',function(data){
		$ajax('/index.php?r=pc/InvitationNew/getUserPermission','get','','json',function(data){
			if(data.status==0){
				_this.vipLevel = data.data.vip_group;
				// 0-非VIP 1-个人vip 2-企业基础版 3-企业高级版 4-企业尊享版 5-企业旗舰版
				if(data.data.vip_group > 0){
					$('#redirect-nav .vip-special').removeClass('hide');
					_this.isVip = true;
					$("#effect-vip-tip").hide();
				}else{
					_this.isVip = false;
				}
			}else{
				_this.isVip = false;
			}
		});
	},
	hasCollectAjax : false,
	getisCollectFirst : function(){
		var _this = this;

		if(_this.hasCollectAjax){
			return;
		}

		$ajax('/index.php?r=pc/IndexNew/GetUserMark','get',{mark : 3},'json',function(data){
			if(data.status==0){
				if(data.data == 0 ){
					_this.isCollectFirst = true;
				}else{
					_this.isCollectFirst = false;
				}
				_this.hasCollectAjax = true;
			}
		});
	}
}

//微页数据
var weiyeModule = {
	init : function(){
		myinvitation_id = GetQueryString('id');    // 微页id
		actId = GetQueryString('actId');     // 活动
		serise = GetQueryString("serise") ;

		if( myinvitation_id == null ){
			// 新建
			pagearr = [default_page];   // 默认模板

			pageModule.initPageList(pagearr);  

			$("#ittwrap").html(pagearr[0]);

			tplModule.show();  // 拉出模板
			zMaxIndex = zIndexModule.setZIndex();

			if(pmi_list.isAdmin){
				adminOperate.init();
			}
		}else{
			// 再次编辑  获取微页数据
			this.getWeiyeData( myinvitation_id );
		}


		this.autoSave();  // 10分钟自动保存

	},
	//获取微页数据
	getWeiyeData : function(id){
		var url = '/index.php?r=pc/InvitationData/GetInvitation',
			data = { 
				id: id ,
				single_tpl : pmi_list.isAdmin ? 1 : 0
			},
			successFn = function(data){
				if(data.status == 0){

					weiyeModule.initWeiyeData(data);

					var data = data.data;

					category_id = data.category_id;

					pmi_list.packageLevel = data.level; //单个微页的套餐级别

					if([10,11,12,13,14,15,16].indexOf(+category_id) > -1  && serise ){
						category_id = 0;
					}
					// // 参加比赛
					// if(category_id == 15 || category_id == 16){
					// 	$("#race-checkbox").prop("checked", true).attr("category_id", category_id );
					// }

					$("#share-title").val( data.title );
					$("#share-desc").val( data.description );
					$("#share-cover-img").attr("src" , data.cover_thumb );

					commondata["share-music"] = data.music;

					if(serise != null){
						myinvitation_id = null ;
					}else{
						historyModule.afreshHistory();
					}

					if(pmi_list.isAdmin){
						adminOperate.oldType = data.type;
						adminOperate.init();
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("数据请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	initWeiyeData : function(data){
		var data = data.data ;

		if(data.section_value == null || data.section_value.length == 0){
			pagearr = [default_page];
		}

		pagearr = data.section_value ;

		pageModule.initPageList(pagearr);

		$("#ittwrap").html(pagearr[0]);

		recordModule.removeRecord();
		recordModule.addRecord();

		pageModule.initIttwrap();
		zMaxIndex = zIndexModule.setZIndex();

		weiyeModule.setAside(data.aside_value);

		commondata = data.common_value || {};

		voteId = commondata.vote ? ((commondata.vote.questionId != 'NaN') ? Number(commondata.vote.questionId) : 1) : 1;
		form_id_arr = commondata.form_id_arr && commondata.form_id_arr.length ? switchIdArray(commondata.form_id_arr) : getIdArray('form');
		form_ele_id_arr = commondata.form_ele_id_arr && commondata.form_ele_id_arr.length ? switchIdArray(commondata.form_ele_id_arr) : getIdArray('form-ele');
		danmu_id_arr = commondata.danmu_id_arr && commondata.danmu_id_arr.length ? switchIdArray(commondata.danmu_id_arr) : getIdArray('danmu');
		fix_nav_num = commondata['nav_fix_value'] != '' ? 1 : 0;


		if (!(commondata["advertData"] == undefined)) {
			advertModule["advertData"] = commondata["advertData"];
		}
		uv_count = data.uv_count;

		if (commondata['weizhan-ty']){
			// 用户设置了微站
			if (commondata['weizhan-ty'] === 'close'){
				// 用户关闭微站跳转
				$('#weizhan-open').prop("checked" , false);
				$('#weizhan-wrap').find('.weizhan-a').hide();
			}else{
				$('#weizhan-open').prop("checked" , true);
				$('#weizhan-wrap').find('.weizhan-a').show();
				$('#weizhan-wrap').find('input[data-type="'+commondata['weizhan-ty']+'"]').prop('checked', true);
			}
			$('#weizhan-wrap').attr('weizhan-ty', commondata['weizhan-ty']);
			weizhanModule.isEdit = true;
		} else {
			// 用户未开启过微站
			weizhanModule.initWeizhanTy();
		}
		//自动播放时间
		var time_auto_value = commondata['auto-turn-page'] ? (+commondata['auto-turn-page']['is_on'] ? parseFloat(commondata['auto-turn-page']['time']) : 0 ) : 0;
		if( time_auto_value != 0 ){
			$('#flip-auto-i').prop('checked', true);
			$('#flip-time').css('display','inline-block');
			$('#flip-auto-time').val(time_auto_value);
		}
		$("#flip-direction").val( commondata["flip-direction"] );  // 自动播放方向
		$('#flip-animate').children('.flippage-btn[flip-type='+commondata["flip-type"]+']').addClass('active').siblings().removeClass('active'); // 自动播放动画

		if(commondata['arrow_img']){
			var _img = $("#share-arrow-ul").find('img[src="'+commondata['arrow_img']+'"]'),
				_li ;
			if(_img.length){
				_li = _img.closest('li');
			}else{
				_li = $("#share-arrow-ul").children('.share-arrow-custom');
				_li.children('div').html('<img src="'+commondata['arrow_img']+'" alt="" />');
			}
			_li.addClass('active').siblings().removeClass('active');
		}
		$("#arrow-hide").prop('checked' , commondata['arrow_hide'] ? (commondata['arrow_hide'] == 'true' ? true : false) : false);

		$("#loading-logo").attr("src" , commondata['loading_logo'] || cdnUrl + '/static/invitation-v2/images/logo100.png');
		$("#share-load-hide").prop('checked' , commondata['loading_hide'] ? (commondata['loading_hide'] == 0 ? true : false) : ((pmi_list.packageLevel == 3 || pmi_list.vipLevel >= 3) ? true : false ));

		commondata['vote_activity_settings'] && (photovoteModule.options = commondata['vote_activity_settings']);

		if( photovoteModule.options ){
			photovoteModule.setBgc( photovoteModule.options.common_settings.style );
		}
	},
	setAside : function( asi ){
		$("#aside-ul").prepend( asi );
		var aside_li = '',_http;

		$("#aside-ul").children('li').each(function(index, el) {
			var _el = $(el),
				_href = _el.children("a").attr("href");

			if( ! _el.hasClass('aside-f-li') ){
				if( /tel/.test(_href) ){
					_http = '13523423443';
					_href = _href.slice(4);
				}else{
					_http = 'http://';
				}

				aside_li += '<li class="opt-li"><input class="aside-text com-input" type="text" value="'+_el.children('a').text()
					+'"><input class="aside-href com-input" type="text" placeholder='+_http+' value="'+ _href
					+'"><span class="aside-li-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
			}
		});
		$("#aside-opt-li").append( aside_li );
	},
	isSaveing : false,
	//保存数据
	//sfn-成功函数 ， efn-失败函数 ，preview: 0-点击保存 ， 1-点击生成 ， 2-发布 , 3-自动保存
	saveWeiyeData : function( sfn , efn , preview){

		if(this.isSaveing){
			return ;
		}
		this.isSaveing = true;

		var dsave = preview == 3 ? 1 : 0,
			desccont = $("#share-desc").val() ,
			dtitle = $("#share-title").val(),
			musicurl = commondata["share-music"] ,
			logourl = $("#share-cover-img").attr("src"),
			asideLi = '';

		if(preview == 2 && !dtitle){
			autoTip("请输入标题！");
			return;
		}else{
			dtitle = dtitle || '我的微页';
		}

		var pagedata = pagearr.concat();

		if( preview != 2 ){
			$("#page-list").children('li').each(function(index, el) {
				if($(el).hasClass('one')){
					var _classarr = $(el).prop("className").split(' ');
					var _classname = 'int-hide';
					$.each(_classarr ,function(ind, val) {
						if(/alone\-page/.test(val)){
							_classname += ' ' + val;
						}
					});
					pagedata[index] = $(pagedata[index]).addClass(_classname).removeClass("page").prop("outerHTML");
				}

			});
			
			$("#aside-ul").children('li').each( function(index, el) {
				var _el = $(el);
				if( ! _el.hasClass('aside-f-li') ){
					asideLi += _el.prop("outerHTML");
				}
			});
		}

		commondata["share-desc"] =  escape(desccont);
		commondata["share-img"] = logourl;
		// commondata["share-music"] = musicurl;
		// commondata["musicisloop"] = $("#music-isloop").prop('checked');
		// commondata["musicname"] = musicname;
		commondata["vote"] = {
			"questionId": voteId
		};
		commondata["activity"] = {
			"id": actId ? actId :(commondata.activity ? commondata.activity.id : ''), //活动id
			"isRequestAct":actId ? 1 : (commondata.activity ? commondata.activity.isRequestAct : 0) //活动
		};
		commondata["asidelogo"] = commondata.asidelogo || '';
		commondata["asidelogourl"] = commondata.asidelogourl || '';
		commondata["flip-direction"] = $("#flip-direction").val();   //翻页上下还是左右  false左右  true上下
		commondata["flip-type"] = $("#flip-animate").children('.active').attr('flip-type');   //动画类型
		commondata["auto-turn-page"] = $('#flip-auto-i').prop('checked')   ? {
								"is_on":1,
								"time":parseFloat($("#flip-auto-time").val()) || 2,
							}:{
								"is_on":0,
								"time":'',
							};
		//自动翻页延迟
		//commondata["timer-turn-page"] = $('#flip-auto-i').prop('checked') ? $("#flip-auto-time").val() : 0 ;   //定时翻页时间
		commondata['tab_value'] = '';
		// commondata['tab_value'] = (function(){
		// 									$('.tab-fix-shadow').find('.before-tap-icon').css('display', 'block').siblings('.after-tap-icon').css('display', 'none');
		// 									tabData = $('.tab-fix-shadow').html();
		// 									return tabData;
		// 								})();
		commondata['cre_user_token'] = $('body').attr('creater');
		commondata['danmu_data'] = danmu_id_arr.length ? danmu_id_arr.slice(danmu_id_arr.length - 1) : '';
		commondata['form_id_arr'] = form_id_arr.length ? form_id_arr.slice(form_id_arr.length - 1) : '';
		commondata['form_ele_id_arr'] = form_ele_id_arr.length ? form_ele_id_arr.slice(form_ele_id_arr.length - 1) : '';
		// commondata["high_share_front"] = escape($("#high_share .js-front").val());
		// commondata["high_share_type"] = $("#high_share select").val();
		// commondata["high_share_behind"] = escape($("#high_share .js-behind").val());
		commondata["high_share_front"] = '';
		commondata["high_share_type"] = 'like';
		commondata["high_share_behind"] = '';

		$('#weizhan-wrap').attr('weizhan-ty') && (commondata['weizhan-ty'] = $('#weizhan-wrap').attr('weizhan-ty'));
		commondata['nav_fix_value'] = '';

		commondata['arrow_img'] = $("#share-arrow-ul").children('.active').find('img').attr("src") || '';
		commondata['arrow_hide'] = $("#arrow-hide").prop('checked');
		commondata['loading_hide'] = $("#share-load-hide").prop('checked') ? 0 : 1;
		if( pmi_list.packageLevel != 3 && pmi_list.vipLevel < 3  ){
			delete commondata['loading_hide'];
		}
		var loading_logo = $("#loading-logo").attr("src");
		commondata['loading_logo'] = loading_logo == cdnUrl + '/static/invitation-v2/images/logo100.png' ? '' : loading_logo ;
		commondata["editablecontrol"] = [];
		commondata['vote_activity_settings'] = photovoteModule.options  ;


		var type = actId ? 1 : 0 ,
			type2 = 0,
			castVoteData = {},
			castLikeData = {},
			castDanmuData = {};

		danmu_id_arr = [];
		formData = {};

		$.each( pagedata , function(index, page){
			$page = $(page);

			$page.find('.animate').each(function(j,ele){
				var $ele = $(ele);

				ele.style['-webkit-animation-play-state'] = '';
				ele.style['-webkit-animation-delay'] = ele.style['animation-delay'];
				if($ele.hasClass('int-animate')){
					if(! $ele.attr('animate-arr')){
						$ele.removeClass('int-animate');
					}
					else{
						return '';
					}
				}else if( $ele.attr('data-animation-style')){
					return ;
				}
				var duration = ele.style['animation-duration'] || ele.style['-webkit-animation-duration'],
					delay = ele.style['animation-delay'] || ele.style['-webkit-animation-delay'],
					iteration = ele.style['animation-iteration-count'] || ele.style['-webkit-animation-iteration-count'],
					animation_data = {
						duration:duration,
						delay:delay,
						'iteration-count':iteration,
					};
				$ele.attr('data-animation-style',JSON.stringify(animation_data));
			});

			$page.find('.danmu-container').remove();
			page = $page[0].outerHTML;
			pagedata[index] = page;

			type = type ? type:(($page.find('.form')[0] || $page.find('.form-submit-btn')[0]
								 || $page.find('.cast-like')[0]
								 || $page.find('.barrage-container')[0]
								 || $page.find('.cast-vote')[0]
								 || $page.find('.int-article')[0]
								 // ||$page.find('.act-submit')[0]
								 || $page.find('.group-newpage')[0]
								 || $page.find('.photovote')[0]
								 || $page.find('.int-goods')[0])? 1:0);

			type2 = type2 == 2 ? 2 : (( $page.find('.weixinavatar')[0]
					|| $page.find('.weixinname')[0]
					|| $page.find('.barrage-container')[0]
				) ? 2 : 0);

			var $form = $page.find('.form-ele').not('.form-submit-btn'), //新版表单
				item_id, item_title, key;

			if( $form.length ){
				if ( $page.find('.form-submit-btn').length ) {
					// 新版表单
					key = $page.find('.form-submit-btn').attr('id');
					formData[key] = {};
					$form.find('.form-ele-content-wrap').each(function(i,item){
						item_id 	= $(item).attr('data-id');
						item_title 	= $(item).find('.ittwrap-form-item-title').text();
						formData[key][item_id] = item_title;
					});
				}
			} else {
				// 如果没有新版表单 判断是否有旧版表单
				$form = $page.find('.form');
				if ($form.length) {
					// 旧版表单
					key = $form.attr('id');
					/^f_\d+$/g.test(key) || (key = index +'_'+ key); //兼容最初表单id为页面序号前缀
					formData[key] = {};
					$form.find('.form-ul > li').each(function(i, li){
						item_id 	= $(li).attr('id'),
						item_title 	= $(li).find('.ittwrap-form-item-title').text();
						formData[key][item_id] = item_title;
					});
				}
			}
			// 全局栏目
			if($page.find('.nav[data-role="tab"]').length) {
				commondata['nav_fix_value'] = $page.find('.nav[data-role="tab"]').removeAttr('data-animation-style').prop('outerHTML');
			}

			// 投票 、 点赞
			var $vote = $page.find('.cast-vote'),
				$like = $page.find('.cast-like');
			if($vote.length){
				$vote.each(function(index, el) {
					var _id = $(el).attr("questionid"),
						_title = $(el).children('.animate-contain').children('h2').children('span').text(),
						_num = +$(el).children('.animate-contain').children('h2').attr("num"),
						_optArr = [];

					$(el).find('ul').children('li').each(function(ind, ele) {
						var _opt = $(ele).children('p').eq(0).children('span').eq(0).text();
						_optArr.push(escape(_opt));
					});

					castVoteData[_id] = {
						"title" : escape(_title),
						"num" : _num,
						"opt" : _optArr
					}
				});
			}
			if($like.length){
				$like.each(function(index, el) {
					var _id = $(el).attr("likeid"),
						_name = $(el).attr("el_name");

					castLikeData[_id] = {
						"name" : escape(_name)
					}
				});
			}
			var $danmu = $page.find('.barrage');
			if($danmu.length){
				$danmu.each(function(index, el) {
					var _id = $(el).find('.barrage-container').attr("data-dm-id"),
						_name = $(el).attr("el_name");

					danmu_id_arr.push(_id);
					castDanmuData[_id] = {
						"name" : escape(_name)
					}
				});
			}
			var $edit = $page.find('.texteditbox,.weixinimg,.weixinvoice');
			if($edit.length){
				$edit.each(function(index, el) {
					var _id = $(el).attr('id');

					commondata["editablecontrol"].push(_id);
				});
			}
		});

		commondata["castVoteData"] = castVoteData;
		commondata["castLikeData"] = castLikeData;
		commondata["castDanmuData"] = castDanmuData;

		advertModule.updatePositionPage();
		commondata["advertData"] = advertModule["advertData"];
		commondata["advert_position"] = advertModule["advertData"]["advertInfo"];

		type = type2 == 2 ? 2 : type;

		// //参加比赛
		// if($("#race-checkbox").prop("checked")){
		// 	category_id = $("#race-checkbox").attr("category_id");
		// }
		//好医生
		if($("#haoyisheng-checkbox").prop("checked")){
			category_id = $("#haoyisheng-checkbox").attr("category_id");
		}

		var url = '/index.php?r=pc/InvitationNew/previewInvitation',
			data = {},
			successFn =  function(data){
				weiyeModule.isSaveing = false;
				if(data.status == 0){
					myinvitation_id = data.id;

					weiyeModule.setPushstate(myinvitation_id);

					sfn && sfn(data);
					setTimeout(function(){
						historyModule.afreshHistory();
					}, 100);

					if(preview != 3){
						weiyeModule.autoSave();
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function(data){
				weiyeModule.isSaveing = false;
				efn && efn(data);
			};

		
		if( preview == 1 || preview == 0 || preview == 3){
			data = {
				id: myinvitation_id
				,title: dtitle
				,invitation_data: pagedata
				,cover: logourl
				,desc: desccont
				,music: musicurl
				,aside_data: asideLi
				,is_auto_save: dsave
				,category_id: category_id
				,common_data:commondata
				,param_arr: {}
				,form_data: formData
				,danmu_data: danmu_id_arr
				,type:type
			};
		}else if( preview == 2){
			data = {
				id: myinvitation_id
				,title: dtitle
				,cover: logourl
				,desc: desccont
				,music: musicurl
				,is_auto_save: dsave
				,category_id: category_id
				,common_data:commondata
				,param_arr: {}
				,type:type
				,status: 1
			};
		}

		$ajax( url , "post", data , "json", successFn, errorFn);
	},
	//改变地址栏的链接
	setPushstate : function(id){
		if(! id){return ;}

		var has_id = GetQueryString("id") || '';
			has_serise = GetQueryString("serise") || '';
		if(has_id == '' || has_serise != ''){
			window.history.pushState("", "", "/index.php?r=pc/IndexNew/showInvitation&id=" + id);
			$("#share-title").val('我的微页' + id);
		}
	},
	autoSave : function(){
		var _this = this;
		if (! pmi_list.isAdmin) {
			_this.autoSaveTime && clearInterval(_this.autoSaveTime);
			_this.autoSaveTime = setInterval(function() {
				pageModule.savePage();
				_this.saveWeiyeData(function(data){
					if(data.status != 0){
						autoTip(data.data);
						return ;
					}
					autoTip("自动保存成功!");
				} , function(data){} , 3 );
			}, 600000);
		}
	}
};

var adminOperate = {
	hasInit : false,
	init : function(){
		if(this.hasInit || !pmi_list.isAdmin){
			return ;
		}
		this.hasInit = true;

		var tpleditbtn = $('<button class="com-btn btn-t" id="tpl-edit">编辑</button>');
		$("#tpl-space").children('.tpl-btn-wrap').append(tpleditbtn).children('button').width(110);
		tpleditbtn.on('click', function(event) {
			var id = $("#tpl-wrap").find('li.active').attr("data-id");
			window.location.href = '/index.php?r=pc/IndexNew/showInvitation&isAdmin=1&id=' + id;
		});

		this.getCategory();

		$('#first-tpl-type').change(function(event) {
			var type = $(this).val();
			$('#sec-tpl-type').children('option').removeClass('show');
			$('#sec-tpl-type').children('option[type='+type+']').addClass('show');
			$('#sec-tpl-type').val(type);
		});

		$("#share-tpl").addClass('show');

		$("#page-wrap").children('.page-bottom').addClass('hide');
		$("#page-list").find('.page-li-add').addClass('hide');

		$("#images-e-g").children('.images-add-group').hide();

		$("#music-up-wrap").addClass('show');
		$("#music-space").addClass('canUpload');
		
	},
	oldType : 6,
	saveTplData : function(){
		var url = '/index.php?r=pc/InvitationTemplateNew/previewTpl',
			data = {
				id: myinvitation_id,
				title: $("#share-title").val(),
				invitation_data: pagearr,
				thumb_img: $("#share-cover-img").attr("src"),
				type: $("#sec-tpl-type").val()
			},
			successFn = function(data){
				if(data.status == 0){
					myinvitation_id = data.id;
					$("#share-qcode-img").attr('src' , data.qrcode);
					autoTip('模板制作成功！');
				}
			},
			errorFn = function(){

			};
		$ajax( url , "post", data , "json", successFn, errorFn);
	},
	getCategory : function(){
		var url = '/index.php?r=pc/InvitationData/GetCategory',
			data = {
				type: 3
			},
			successFn = function(data){
				if(data.status == 0){
					var categorys = data.data,
						firstCatesStr = '',
						secCatesStr = '';
					$.each(categorys , function(index, item) {
						firstCatesStr += '<option value="'+item.cate_id+'">'+item.name+'</option>';
						secCatesStr += '<option value="'+item.cate_id+'" type="'+item.cate_id+'">全部</option>';

						$.each( item.cate , function(secindex, val) {
							secCatesStr += '<option value="'+val.cate_id+'" type="'+item.cate_id+'">'+val.name+'</option>';
						});
					});

					$('#first-tpl-type').append(firstCatesStr);
					$('#sec-tpl-type').append(secCatesStr);

					var _type = $('#sec-tpl-type').children('option[type="'+ adminOperate.oldType +'"]').attr("type");
					$('#first-tpl-type').val(_type);
					$('#sec-tpl-type').val(adminOperate.oldType);
				}
			},
			errorFn = function(){

			};
		$ajax( url , "post", data , "json", successFn, errorFn);
	},
	initAdminImgUpload : function(){
		$.each( $('#images-wrap').children('section') , function(index, el) {
			var _el = $(el),
				_type = +_el.attr('type');

			if( _type == 0){
				return true;
			}

			var _dom = $('<div class="images-up" id="images-up-'+_type+'"><p>+</p><p>上传图片</p><p>小于1M</p></div>');
			_el.prepend(_dom);

			imgUploader("#images-up-" + _type);
		});
	},
	initAdminShapeUpload : function(){
		var _dom = $('<div class="shape-up" id="shape-up-0"><p>+</p><p>小于15kb</p></div>');
		$("#shape-wrap").children('section[type="0"]').prepend(_dom);
		svgUploader("#shape-up-0" , 1);
	},
	initAdminSvgUpload : function(){
		var _dom = $('<div class="shape-up" id="svg-up-0"><p>+</p><p>小于15kb</p></div>');
		$("#svg-wrap").children('section[type="0"]').prepend(_dom);
		svgUploader("#svg-up-0" , 0);
	}

};

// 拖拽缩放
function dragElement (de) {
	var start_x,start_y, elcombo ,  elPositoion = [];

	de = de.not('.photovote');

	de.draggable({  //拖拽
		// containment: [165 , 55 , window.innerWidth - 365 , window.innerHeight - 25],
		// containment: "parent",
		cursor: "move",
		cancel: ".tacked",
		// zIndex: 10000,
		start: function( event, ui ){
			start_x = ui.position.left;
			start_y = ui.position.top;

			$(this).css({
				"bottom": "",
				"right": ""
			});

			elcombo = $('#ittwrap .curchange-combo');
			if(elcombo.length > 1){
				elcombo.each(function(index , item){
					elPositoion[index]= $(item).position();
					$(item).css({
						"bottom": "",
						"right": ""
					});
				});
			}
		},
		stop: function( event, ui ) {			
			recordModule.addRecord();
		},
		drag:function( event, ui ) {
			var _this = $(this),
				t = Math.round(ui.position.top),
				l = Math.round(ui.position.left);

			// 上下滑块
			$("#control-up").slider( "value", t );
			$("#control-up-i").val(t);
			// 左右滑块
			$("#control-l").slider( "value", l );
			$("#control-l-i").val(l);

			var offset_x = l - start_x,
				offset_y = t - start_y;

			if(elcombo.length>1){
				$.each( elcombo ,function(index,item){
					if(!( item == _this[0] )){
						$(item).css({
							'left':elPositoion[index].left + offset_x,
							'top':elPositoion[index].top + offset_y
						});
					}
				});
			}
		}
	})
	de.each(function(index, el) {
		var _el = $(el);
		_el.append('<div class="drag-inner"></div>');
		var roz = _el.children('.animate-contain').attr("rotdegz");
		if(! roz){
			roz = 0;
		}
		_el.children('.drag-inner').css({
	        "transform": 'rotateZ('+ roz +'deg)',
	        "-webkit-transform": 'rotateZ('+ roz +'deg)',
	        "-moz-transform": 'rotateZ('+ roz +'deg)',
	        "-ms-transform": 'rotateZ('+ roz +'deg)'
	    });
	});

	de.children('.drag-inner').resizable({  //缩放
		// containment: "parent",
		handles: "n, e, s, w, se, sw, ne, nw",
		alsoResize:'.curchange-combo, .curchange',
		cancel: ".tacked",
		// aspectRatio: true,
		create: function( event, ui ) {
			var _thisp = $(this).parent();
			if(_thisp.hasClass('ele-aspectRatio')){
				var ratio = parseFloat(_thisp.attr('aspectRatio') || 1);
				$(this).resizable( "option", "aspectRatio", ratio );
			}
		},
		start: function(event,ui){
			var _thisp = $(this).parent();

			elcombo = $('#ittwrap .curchange-combo').not(_thisp).add(_thisp);
			elcombo.each(function(index , el){
				
				var data = {},
					_el = $(el);
					_img = _el.children('.animate-contain').children('img');
				data = {
					rstartp : _el.position(),
					rstartw : _el.width(),
					rstarth : _el.height(),
					rstartimgw : _img.width(),
					rstartimgh : _img.height(),
					rstartimgmt : parseFloat(_img.css("margin-top")),
					rstartimgml : parseFloat(_img.css("margin-left"))
				};

				_el.data("rstart" , data);
				
			});
		},
		stop: function( event, ui ) {
			var _this = $(this).parent() ;

			if(_this.hasClass('slide-new')){
				imgplayModule.imgplaySave();
			}
			_this.removeClass('circle');
			$("#set-circle").prop("checked", false);

			recordModule.addRecord();
		},
		resize:function(event , ui) {
			var _this = $(this).parent(),
				w = Math.round(ui.size.width),
				h = Math.round(ui.size.height);


			//宽度
			$("#control-w").slider( "value", w );
			$("#control-w-i").val(w);
			//高度
			$("#control-h").slider( "value", h );
			$("#control-h-i").val(h);

			elcombo.each(function(index , el){
				var _el = $(el),
					oridata = _el.data("rstart");
				
				_el.css({
					top : oridata.rstartp.top + ui.position.top ,
					left : oridata.rstartp.left + ui.position.left
				});

				if(ui.size.height != ui.originalSize.height && _el.hasClass('autoheight')){
					_el.removeClass('autoheight');
					$('#set-autoheight').prop("checked", false);
				}

				var _ani = _el.children('.animate-contain');
				if(_el.hasClass('img') && _ani.hasClass('shape-div')){
					var _img = _ani.children('img'),
						rw = _el.width() / oridata.rstartw,
						rh = _el.height() / oridata.rstarth;
					_img.css({
						width : oridata.rstartimgw * rw ,
						height : oridata.rstartimgh * rh ,
						'margin-top' : oridata.rstartimgmt * rh,
						'margin-left' : oridata.rstartimgml * rw
					});
				}else if(_el.hasClass('img')){
					setImgPostion();
				}else if(_el.hasClass('form-imgupload')){
					var fonts = '18px',
						fmimgupwidth = _el.width(),
						fmimgupheight = _el.height();

					if(fmimgupwidth < 90 || fmimgupheight < 100){
						fonts = '12px';
					}else if(fmimgupwidth < 120 || fmimgupheight < 120){
						fonts = '14px';
					}else if(fmimgupwidth < 150 || fmimgupheight < 140){
						fonts = '16px';
					}
					_el.find('.imgupload-text').css('font-size' , fonts);
				}
			});

		}
	}).rotate({
	    start : function(event, ui) {
	    },
	    rotate : function(event, ui) {
	      // console.log('resize');
	      // console.log(event);
	      // console.log(ui);

	      $(this).parent().children('.animate-contain').css({
	        "transform": 'rotateZ('+ ui.angle +'deg)',
	        "-webkit-transform": 'rotateZ('+ ui.angle +'deg)',
	        "-moz-transform": 'rotateZ('+ ui.angle +'deg)',
	        "-ms-transform": 'rotateZ('+ ui.angle +'deg)'
	      }).attr({
	      	'rotdegx' : 0,
	      	'rotdegy' : 0,
	      	'rotdegz' : ui.angle
	      });

	      $(this).css({
	        "transform": 'rotateZ('+ ui.angle +'deg)',
	        "-webkit-transform": 'rotateZ('+ ui.angle +'deg)',
	        "-moz-transform": 'rotateZ('+ ui.angle +'deg)',
	        "-ms-transform": 'rotateZ('+ ui.angle +'deg)'
	      });
	    },
	    stop : function(event, ui) {
	    }
	});
}

//初始化滑块
function initSlider(di , inp , opt){
	var opt = $.extend({
		value: 0,
		min: 0,
		max: 100,
		step: 0.1 ,
		slide : null ,
		stop : null
	} , opt);
	
	di.slider({
		range: "min",
		value: opt.value,
		min: opt.min ,
		max: opt.max ,
		step:opt.step ,
		slide: function( event, ui ) {
			inp.val(ui.value);
			opt.slide && opt.slide( ui );
		},
		stop: function( event, ui ){
			opt.stop && opt.stop( ui );
		}
	});
	if(inp){
		inp.val(opt.value);
		inp.on('input', function(event) {
			di.slider( "value", $(this).val() );
			var ui = {
				value : $(this).val()
			}
			opt.slide && opt.slide( ui );

		}).spinner({
			min: opt.min ,
			max: opt.max ,
			step: opt.step ,
			spin: function( event, ui ) {
				di.slider( "value", ui.value );
				opt.slide && opt.slide( ui );
			},
			stop: function(event, ui) {
				//ui 对象是空的，这里包含它是为了与其他事件保持一致性。
			}
		});
	}

	inp && opt.stop && inp.on('blur', function(event) {
		var ui = {
			value : $(this).val()
		}
		opt.stop && opt.stop( ui );
	});
}

//数字输入框
function spinnerInput( input , opt){
	var opt = $.extend({
		min: 0,
		max: 100,
		step: 0.1 ,
		spin : null ,
		stop : null
	} , opt);

	input.spinner({
		min: opt.min ,
		max: opt.max ,
		step: opt.step ,
		spin: function( event, ui ) {
			opt.spin && opt.spin.call( this , ui );
		},
		stop: function(event, ui) {
		//ui 对象是空的，这里包含它是为了与其他事件保持一致性。

		}
	}).on('input', function(event) {
		var ui = { value : $(this).val() };

		opt.spin && opt.spin.call( this , ui );
	});

	opt.stop && input.on('blur', function(event) {
		var ui = {
			value : $(this).val()
		}
		opt.stop && opt.stop.call( this , ui );
	});
}

//初始化颜色选择器
$.fn.colorPlugin = function(cl, movefuc , hidefuc){

	$(this).spectrum({
		color: cl || "#fff",
		chooseText: "确定",
		cancelText: "取消",
		showInput: true,
		allowEmpty: true,
		containerClassName: 'full-spectrum',
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		showAlpha: true,
		maxPaletteSize: 10,
		preferredFormat: "hex",
		localStorageKey: "spectrum.demo",
		change: function(color){
			// movefuc && movefuc(color);
		},
		move: function(color){
			movefuc && movefuc(color);
		},
		show: function () {
		},
		beforeShow: function () {
		},
		hide: function (color) {
			movefuc && movefuc(color);
			hidefuc && hidefuc(color);
		},
		palette: [
		["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
		["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
		["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
		["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
		["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
		["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
		["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
		["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","rgba(0,0,0,0)"]
		]
	});
}

//模板模块
var tplModule = {
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.getCategory();
	},
	show : function(){
		this.init();

		$("#ittwrap .animate").each(function(index, el) {
			var _el = $(el),
				_drag = _el.children('.drag-inner');
			if( _el.hasClass( "ui-draggable" ) ){
				_el.draggable( "destroy" );
			}
			if( _drag.hasClass( "ui-resizable" ) ){
				_drag.resizable( "destroy" );
			}
			if( _drag.hasClass( "ui-rotatable" ) ){
				_drag.rotate( "destroy" );
			}
			_drag.remove();
		});

		$("#tpl-space").addClass('show');
		$("#mask-div").addClass('show');

		$("#phone-wrap").addClass('zIndex11');

		imagesModule.hide();
		shapeModule.hide();
		svgModule.hide();
		$("#aside-shadow").removeClass('show');
	},
	hide : function(){
		$("#tpl-space").removeClass('show');
		$("#mask-div").removeClass('show');

		$("#phone-wrap").removeClass('zIndex11');

		$("#tpl-wrap").find('li.active').removeClass('active');
	},
	getCategory : function(){
		var url = '/index.php?r=pc/InvitationData/GetCategory',
			data = { type:3 },
			successFn = function(data){
				if(data.status == 0){
					var a1 = '',
						a2 = '',
						s1 = '';
					$.each( data.data , function(index, el) {
						a1 += '<a type="'+el.cate_id+'">'+el.name+'</a>';

						a2 += '<nav class="com-second-nav" type="'+el.cate_id+'"><a type="'+el.cate_id+'" class="active">全部</a>';
						$.each( el.cate , function(ind, val) {
							a2 += '<a type="'+val.cate_id+'">'+val.name+'</a>';
						});
						a2 +='</nav>';
						s1 +='<section class="tpl-section" type="'+el.cate_id+'"><ul class="tpl-ul"></ul></section>';
					});

					$("#tpl-tab").append(a1);
					$("#tpl-se-tab").append(a2);
					$("#tpl-wrap").append(s1);

					if( pmi_list.industryAgent ){
						tplModule.showTab( 128 );
					}else{
						tplModule.showTab(data.data[0].cate_id);
					}

				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("模板请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#tpl-space"));
		
	},
	tplTemplate : '<li class="tpl-li" data-id="${id}"><img src="${thumb_img}" alt=""><p class="tpl-title">${title}</p>${delete}</li>',
	parseTemplate : function(data , type){
		var html = this.tplTemplate.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'thumb_img' : return data[$1] + '?imageView2/1/w/165/h/260';
	            case 'delete': return (type == 0 || pmi_list.isAdmin) ? '<span class="tpl-delete iconfont icon-remove"></span>' : '' ;
				default : 	return data[$1];
			}
		});
		return html;
	},
	tplpage : {},
	getTpl : function( type ){
		var _this = this,
			_tplpage = _this.tplpage;

		if(!_tplpage[type]){
			_tplpage[type] = {
				page : 1 ,
				loading : false,
				nomore : false
			}
		}
		var _tppage = _tplpage[type];
		if(_tppage.loading || _tppage.nomore){
			return;
		}
		_tppage.loading = true;

		var url = (type == 0 ? 
				'/index.php?r=pc/UserInvitationTemplate/GetInvitationTpl' : 
			    '/index.php?r=pc/InvitationTemplateNew/GetInvitationTpl' ),
			data = { 
				page: _tppage.page ,
				type: type,
				mobile: 2 
			},
			successFn = function(data){
				if(data.status == 0){
					_tppage.page ++ ;

					if(data.is_more == 0){
						_tppage.nomore = true;
					}
					_tppage.loading = false;

					var tpli = '';
					$.each( data.data , function(index, val) {
						itttpl[val.id] = typeof(val.tpl_content) == 'object' ? val.tpl_content[0] : val.tpl_content;
						tpli += _this.parseTemplate(val , type);
					});

					var _wraptype = $("#tpl-se-tab").find('a[type="'+type+'"]').parent().attr("type"),
						_wrap = $("#tpl-wrap").children('section[type="'+_wraptype+'"]').children('ul.tpl-ul');
					if(_tppage.page == 2){
						_wrap.empty();
					}
					_wrap.append(tpli);
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("模板请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#tpl-space"));
	},
	showTab : function( type ){
		$("#tpl-tab").children('a[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		$("#tpl-se-tab").children('nav[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		$("#tpl-wrap").children('.tpl-section[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		var _top = 45 + $("#tpl-se-tab").height();
		$("#tpl-wrap").css("top" , _top );
		if(!this.tplpage[type]){
			this.getTpl(type);
		}
	},
	deleteTpl : function( tli ){
		if( tli.hasClass('loading')){
			return ;
		}
		tli.addClass('loading');

		var id = tli.attr("data-id");
		
		var url = '/index.php?r=pc/UserInvitationTemplate/deleteTpl';
		if( pmi_list.isAdmin && $("#tpl-tab").children('.active').attr("type") != 0 ){
			url = '/index.php?r=pc/InvitationTemplateNew/DeleteTpl';
		}
		var	data = { 
				id : id ,
			},
			successFn = function(data){
				tli.removeClass('loading');
				if(data.status == 0){
					tli.remove();
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				tli.removeClass('loading');
				autoTip("模板删除有问题，请重新删除！");
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#tpl-space"));
	}
};

//音乐模块
var musicModule = {
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.getTag();

		audioUploader('#music-up-local');
	},
	getTag : function(){
		var url = '/index.php?r=pc/UserTag/getTagList',
			data = { type: 1 },
			successFn = function(data){
				if(data.status == 0){
					var a1 = '',
						a2 = '';
					$.each( data.data.sys_list , function(index, el) {
						a1 += '<a type="'+el.id+'">'+el.title+'</a>';
					});
					$.each( data.data.user_list , function(index, el) {
						a2 += '<a type="'+el.id+'">'+el.title+'</a>';
					});

					$("#music-se-tab").children('nav[user="0"]').append(a1);
					$("#music-se-tab").children('nav[user="1"]').append(a2);

					musicModule.getMusic(0 , 0);

					var _top = 80 + $("#music-se-tab").height();
					$("#music-wrap").css("top" , _top );

				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("音乐请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#music-space"));
		
	},
	musicTemplate : '<li class="music-li" id="${id}" data-url="${music}"><label class="music-name">${title}</label>'
					+'<span class="music-check iconfont icon-check4"></span><span class="music-play iconfont icon-play"></span>${ismy}</li>',
	parseTemplate : function(data , user){
		var html = this.musicTemplate.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
	            case 'ismy': return (user == 1 || pmi_list.isAdmin) ? '<span class="music-delete iconfont icon-delete"></span>' : '';
				default : 	return data[$1];
			}
		});
		return html;
	},
	musicpage : {
		0 : {},
		1 : {}
	},
	getMusic : function( user ,  type ){
		var _this = this,
			_musicpage = _this.musicpage[user];

		if(!_musicpage[type]){
			_musicpage[type] = {
				page : 1 ,
				loading : false,
				nomore : false
			}
		}
		var _tppage =  _musicpage[type];
		if(_tppage.loading || _tppage.nomore){
			return;
		}
		_tppage.loading = true;

		var url = '/index.php?r=pc/UserTag/getMusicList' ,
			data = { 
				page : _tppage.page ,
				tag_id : type ,
				user : user ,
				page_size : 20
			},
			successFn = function(data){
				if(data.status == 0){
					_tppage.page ++ ;

					if(data.is_more == 0){
						_tppage.nomore = true;
					}

					var muli = '';
					$.each( data.data , function(index, val) {
						muli += _this.parseTemplate(val , user);
					});

					var _wrap = $("#music-wrap").children('.music-section[user="'+user+'"]').children('.music-ul');
					if(_tppage.page == 2){
						_wrap.empty();
					}
					_wrap.append(muli);
				}else{
					autoTip(data.data);
				}
				_tppage.loading = false;
			},
			errorFn = function( ){
				autoTip("音乐请求有问题，请刷新页面！");
				_tppage.loading = false;
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#music-space"));
	},
	showTab : function( user ){
		$("#music-tab").children('a[user="'+user+'"]').addClass('active').siblings().removeClass('active');
		$("#music-se-tab").children('nav[user="'+user+'"]').addClass('active').siblings().removeClass('active');
		$("#music-wrap").children('.music-section[user="'+user+'"]').addClass('active').siblings().removeClass('active');
		var _top = 80 + $("#music-se-tab").height();
		$("#music-wrap").css("top" , _top );

		if(!this.musicpage[user]['0']){
			this.getMusic(user , 0);
		}
		if(user == 1 || pmi_list.isAdmin){
			$("#music-up-wrap").addClass('show');
			$("#music-space").addClass('canUpload');
		}else{
			$("#music-up-wrap").removeClass('show');
			$("#music-space").removeClass('canUpload');
		}
	},
	deleteMusic : function( idarr , mli , sucf){
		
		var	_user = $("#music-tab").children('.active').attr("user"),
		    _tag = $("#music-se-tab").children('.active').children('.active').attr("type");

		var url = '/index.php?r=pc/UserTag/removeMusic',
			data = { 
				tag_id: _tag ,
				music_arr: idarr ,
				user: _user
			},
			successFn = function(data){
				if(data.status == 0){
					mli.remove();
					sucf && sucf();
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				autoTip("音乐删除有问题，请重新删除！");
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#music-space"));
	},
	confirm : function(){

	},
	//参数 ：当前音乐信息  、 点击确认按钮回调 、 是否是音效
	/* 当前音乐信息格式
		{
			id : ,
			music :  ,
			title : 
		} 
	*/
	show : function( curm , fn , ismef){
		this.init();

		$("#music-space").find('li.active').removeClass('active');
		if(curm && curm.music){
			var name = curm.title;
			curm.title = '当前选择音乐-' + curm.title;
			var curl = this.parseTemplate(curm , 0);
			curl = $(curl).addClass('active music-choice').attr("data-name" , name);
			$("#music-hasselect").empty().append(curl).show();
		}else{
			$("#music-hasselect").empty().hide();
		}
		if(ismef){
			$("#music-effect-opt").addClass('show');
			$("#music-space").addClass('musicEffect');
		}else{
			$("#music-effect-opt").removeClass('show');
			$("#music-space").removeClass('musicEffect');
		}

		this.confirm = fn;
		$("#music-space").addClass('show');
		$("#mask-div").addClass('show');

		shapeModule.hide();
	},
	hide : function(){
		$("#music-space").removeClass('show');
		$("#mask-div").removeClass('show');

		$("#music-space").find('li.active').removeClass('active');
	},
	baiduMusic : {
		page : 1 ,
		loading : false,
		nomore : false
	},
	baiduMusicTpl : '<li class="music-li" id="${song_id}" data-url="baiduMusic-${song_id}"><label class="music-name">${title}</label>'
					+'<span class="music-baiduadd iconfont icon-plus"></span><span class="music-check iconfont icon-check4"></span><span class="music-play iconfont icon-play"></span></li>',
	baiduMusicPTpl : function(data){
		var html = this.baiduMusicTpl.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'title' : return data.author + ' - ' + data.title;
				default : 	return data[$1];
			}
		});
		return html;
	},
	getBaiduMusic : function( word , isempty){
		var _this = this,
			bm = _this.baiduMusic;

		if(! word || bm.loading || bm.nomore){
			return ;
		}
		bm.loading = true;

		var url = '/index.php?r=pc/BaiduMusic/QueryByWord',
			data = { 
				word : word ,
				page : bm.page ,
				page_size : 25
			},
			successFn = function(data){
				if(data.status == 0){
					if(data.data.status == 0){
						autoTip(data.data.data);
						return;
					}
					bm.page ++ ;
					if(data.data.pages.is_more == 0){
						bm.nomore = true;
					}

					var muli = '';
					$.each( data.data.song_list , function(index, val) {
						muli += _this.baiduMusicPTpl(val);
					});

					var _wrap = $("#baiduMusic-wrap").children('.music-ul');
					if(isempty){
						_wrap.empty();
					}
					_wrap.append(muli);
				}else{
					autoTip(data.data);
				}
				bm.loading = false;
			},
			errorFn = function( ){
				autoTip("音乐搜索有问题，请重新搜索！");
				bm.loading = false;
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#music-space"));
	},
	getBaiduMusicUrl : function(li , sfn){
		var murl = li.attr("baidu-url"),
			dataurl = li.attr('data-url');

		if(! dataurl){
			autoTip("这首歌数据获取有问题,请换一首吧！");
			return ;
		}
		var _songid = dataurl.split('-')[1];

		if(murl){
			sfn && sfn(murl);
			return ;
		}

		var url = '/index.php?r=pc/BaiduMusic/GetAudition',
			data = { 
				songid : _songid ,
				bit : 128 
			},
			successFn = function(data){
				if(data.status == 0){
					li.attr("baidu-url" , data.data.file_link);
					sfn && sfn(data.data.file_link);
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function(){
				autoTip("音乐链接获取有问题，请重试！");
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#music-space"));
	},
	showbaidu : function(){
		$("#baiduMusic-wrap").css('top' , 80 + $("#music-se-tab").height() ).addClass('show');
		$("#music-up-wrap").removeClass('show');
		$("#music-wrap").removeClass('show');
	},
	hidebaidu : function(){
		$("#baiduMusic-input").val('');
		if($("#baiduMusic-wrap").hasClass('show')){
			$("#baiduMusic-wrap").removeClass('show');
			$("#music-wrap").addClass('show');
			if($("#music-tab").children('a.active').attr('user') == 1){
				$("#music-up-wrap").addClass('show');
			}
			$("#music-audio")[0].pause();
			$("#music-space").find('.playing').removeClass('playing');
		}
	}
};
// 上传音乐
function audioUploader(id) {
	var fileId, uploader,
		FILE_SIZE_LIMIT = 1024 * 1024 * 1;

	uploader = WebUploader.create({
		accept: {
			extensions: 'mp3,wav',
			mimeTypes: 'audio/*'
		},
		auto: true,
		duplicate: true, //去重，true表示允许重复上传，false表示不许重复上传
		// fileNumLimit: 10,
		fileSingleSizeLimit: FILE_SIZE_LIMIT, //文件大小为1M
		// swf文件路径
		swf: './Uploader.swf',
		// 文件接收服务端。
		server: '/index.php?r=pc/UserTag/addMusic',
		// 允许重复上传
		duplicate: true,
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: id
	});
	uploader.on('error', function(type) {
		if (type === 'Q_TYPE_DENIED') {
			autoTip('请上传 mp3/wav 格式的文件');
		} else if (type === 'Q_EXCEED_NUM_LIMIT') {
			autoTip('选择的文件数目超出限制 超出部分已取消上传');
		} else if (type === 'Q_EXCEED_SIZE_LIMIT ') {
			autoTip('添加的文件总大小超出限制 超出部分已取消上传');
		}
	});
	uploader.on('beforeFileQueued', function(file) {
		if (file.size > FILE_SIZE_LIMIT) {
			autoTip('文件大小超出' + (FILE_SIZE_LIMIT / 1024 / 1024) + 'M限制');
			return false;
		}
	});
	// 当有文件添加进来的时候
	uploader.on('filesQueued', function(files) {
		var list = '';

		$.each(files, function(index, file) {
			list += '<li class="music-li" id=' + file.id + '><label class="music-name" title="' + file.name + '">' + file.name + '</label><span class="progress-bar"><span class="progress-inner"></span></span><span class="upload-fail-tip">上传失败</span></li>';
		});
		$('#music-wrap').children('.music-section.active').children('ul').prepend(list);

	});
	uploader.on('startUpload', function(file, percentage) {
		var user = $('#music-tab').children('.active').attr("user"),
			tag = $("#music-se-tab").children('.active').children('.active').attr("type");

		uploader.option('server', '/index.php?r=pc/UserTag/addMusic&user=' + user + '&type=1&tag_id=' + tag);

	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var fileId = file.id;
		$('#' + fileId + '').find('.progress-inner').width(percentage * 100 + '%');
	});
	uploader.on('uploadSuccess', function(file, response) {
		var fileId = file.id,
			$li = $('#' + fileId),
			user = $li.closest('section').attr("user");

		if (response.status !== 0) {
			$li.find('.upload-fail-tip').show().siblings('.progress-bar').hide();
			return;
		}
		var _muiscli = '<span class="music-check iconfont icon-check4"></span><span class="music-play iconfont icon-play"></span>';
		if (user == 1) {
			_muiscli += '<span class="music-delete iconfont icon-delete"></span>';
		}
		$li.append(_muiscli)
			.attr({
				'id': response.data,
				'data-url': response.music
			})
			.find('.progress-bar, .upload-fail-tip').remove();
	});
	uploader.on('uploadError', function(file) {
		var fileId = file.id,
			$li = $('#' + fileId);

		$li.find('.upload-fail-tip').show().siblings('.progress-bar').hide();
	});
}

//图片模块
var imagesModule = {
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.imagescount = Math.ceil((window.innerHeight - 150) / 95) * 4;

		this.getSysCategory();
		this.getUserCategory();

		imgUploader("#images-up-0");
	},
	isshapecrop : false,
	//参数 ： 确认函数 、取消函数、裁剪比例 、是否是形状裁剪 、颜色函数
	show : function( confimfn , cancelfn , ratio , isshapecrop , colorfn){
		imagesModule.init();

		$("#images-space").show( 50 ,function(){
			$(this).addClass('show');
		});
		this.imageConfirm = confimfn || function(){};
		this.imageCancel = cancelfn || function(){}; 
		this.colorConfirm = colorfn || function(){};
		this.isshapecrop = isshapecrop == undefined ? false : isshapecrop;
		var ra = (Number(ratio) == NaN || Number(ratio) == Infinity) ? 1 : ratio;
		if(this.isshapecrop){
			shapeCropModule.ratio = ra;
		}else{
			cropModule.ratio = ra;
		}
	},
	hide : function(){
		$("#images-space").removeClass('show').hide(1000);
	},
	imageConfirm : function( img ){

	},
	imageCancel : function(img){

	},
	colorConfirm : function(cl){

	},
	getSysCategory : function(){
		var url = '/index.php?r=pc/InvitationData/GetCategory',
			data = { type:2 },
			successFn = function(data){
				if(data.status == 0){
					var a1 = '',
						a2 = '',
						s1 = '';
					$.each( data.data , function(index, el) {
						a1 += '<a type="'+el.cate_id+'">'+el.name+'</a>';

						a2 += '<nav class="com-second-nav" type="'+el.cate_id+'"><a type="'+el.cate_id+'" class="active">全部</a>';
						$.each( el.cate , function(ind, val) {
							a2 += '<a type="'+val.cate_id+'">'+val.name+'</a>';
						});
						a2 +='</nav>';
						s1 +='<section class="images-section" type="'+el.cate_id+'"><ul class="images-ul"></ul></section>';
					});

					$("#images-tab").append(a1);
					$("#images-se-tab").append(a2);
					$("#images-wrap").append(s1);

					if(pmi_list.isone){
						$("#images-tab").children('a[type="7"]').trigger('click');
					}else{
						$("#images-tab").children('a[type="0"]').trigger('click');
					}

					if(pmi_list.isAdmin){
						adminOperate.initAdminImgUpload();
					}

				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("图片请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#images-space"));
		
	},
	getUserCategory : function(){
		var url = '/index.php?r=pc/UserTag/getTagList',
			data = { type: 0 },
			successFn = function(data){
				if(data.status == 0){
					var a1 = '';
					$.each( data.data.user_list , function(index, el) {
						a1 += '<a type="'+el.id+'">'+el.title+'</a>';

					});
					
					$("#images-se-tab").children('nav[type="0"]').append(a1);

					var _top = 45 + $("#images-se-tab").height();
					$("#images-wrap").css("top" , _top );

				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("图片请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#images-space"));
	},
	imagesTemplate : '<li class="images-li" data-id="${id}"><img src="${img_original}" alt="">${delete}</li>',
	parseTemplate : function(data , ptype){
		var html = this.imagesTemplate.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'delete' : return (ptype == 0 || pmi_list.isAdmin) ? '<span class="images-delete iconfont icon-remove"></span>' : '';
				default : 	return data[$1];
			}
		});
		return html;
	},
	imagespage : {},
	imagescount : 24,
	getimages : function( type , ptype){
		var _this = this,
			_imgpage = _this.imagespage;

		if(!_imgpage[type]){
			_imgpage[type] = {
				page : 1 ,
				loading : false,
				nomore : false
			}
		}
		var _tppage = _imgpage[type];
		if(_tppage.loading || _tppage.nomore){
			return;
		}
		_tppage.loading = true;

		var url = '/index.php?r=pc/UserTag/getImgList',
			user = ptype == 0 ? 1 : 0,
			data = { 
				page: _tppage.page ,
				tag_id: type,
				user : user ,
				page_size : _this.imagescount
			},
			successFn = function(data){
				if(data.status == 0){
					_tppage.page ++ ;

					if(data.is_more == 0){
						_tppage.nomore = true;
					}
					_tppage.loading = false;

					var tpli = '';
					$.each( data.data , function(index, val) {
						tpli += _this.parseTemplate(val , ptype);
					});

					var _wrap = $("#images-wrap").children('section[type="'+ptype+'"]').children('.images-ul');
					if(_tppage.page == 2){
						_wrap.empty();
					}
					_wrap.append(tpli);
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("图片请求有问题，请刷新页面！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn, $("#images-space"));
	},
	showTab : function( type ){
		$("#images-tab").children('a[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		$("#images-se-tab").children('nav[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		$("#images-wrap").children('.images-section[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		var _top = 45 + $("#images-se-tab").height();
		$("#images-wrap").css("top" , _top );
		if(!this.imagespage[type]){
			this.getimages(type , type);
		}
	},
	deleteImages : function( idarr , tli , sucf){
		var _type = $('#images-se-tab').children('.active').children('.active').attr("type"),
			_user = $('#images-se-tab').children('.active').attr("type") == 0 ? 1 : 0;

		var url = '/index.php?r=pc/UserTag/removeImg',
			data = { 
				tag_id: _type ,
				img_arr: idarr ,
				user: _user
			},
			successFn = function(data){
				if(data.status == 0){
					tli.remove();
					sucf && sucf();
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				autoTip("图片删除有问题，请重新删除！");
			};

		$ajax( url , "get", data , "json", successFn, errorFn, $("#images-space"));
	},
	addOneImages : function(imgsrc , id){

		if(!this.imagespage[0] && this.imagespage[0] == 2){
			return ;
		}

		var li = this.parseTemplate({
			'img_original' : imgsrc ,
			'id' : id
		} , 0 );

		$("#images-wrap").children('section[type="0"]').children('ul').prepend( li );
	}
};

//图片上传 iscover:  其他不传
function imgUploader( id , iscover) {
	var $up = $(id),
		$containUl = $up.siblings('.images-ul'),
		size = 1 ,
		iscover = iscover || 0;

	var uploader = WebUploader.create({
		// 不压缩image
		// resize: false,
		accept: {
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
		},
		compress: {
			width: 900,
			height: 900,
			// 图片质量，只有type为`image/jpeg`的时候才有效。
			quality: 90,
			// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
			allowMagnify: false,
			// 是否允许裁剪。
			crop: false,
			// 是否保留头部meta信息。
			preserveHeaders: true,
			// 如果发现压缩后文件大小比原来还大，则使用原来图片
			// 此属性可能会影响图片自动纠正功能
			noCompressIfLarger: false,
			// 单位字节，如果图片大小小于此值，不会采用压缩。
			compressSize: 0
		},
		auto: true,
		duplicate:true,  //去重，true表示允许重复上传，false表示不许重复上传
		// fileNumLimit: 2, //只允许上传一个文件
		fileSingleSizeLimit: 1024 * 1024 * size, //文件大小
		// swf文件路径
		swf: './Uploader.swf',
		// 文件接收服务端。
		server: '/index.php?r=pc/UserTag/addimg',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: id
	});
	uploader.on('startUpload', function(file, percentage) {
		// 开始上传流程触发

		var tag = $('#images-se-tab').children('.active').children('.active').attr("type"),
			user = $('#images-se-tab').children('.active').attr("type") == 0 ? 1 : 0;

		uploader.option('server', '/index.php?r=pc/UserTag/addimg&user=' + user + '&tag_id=' + tag);
	});
	uploader.on('error', function(type) {
		if(type=='F_EXCEED_SIZE'){
			tip('请选择1M以下图片!, 你可以去<a class="color-blue" href="http://www.tuhaokuai.com/" target="_blank">http://www.tuhaokuai.com/</a>压缩图片！');
		}else if(type=='F_DUPLICATE'){
			autoTip('图片已经上传了!');
		}else if(type =='Q_TYPE_DENIED'){
			autoTip('请选择图像文件!');
		}
	})
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
		var _li = '<li id="'+file.id+'" class="images-progress"><p class="percentage"></p></li>';
		
		$containUl.prepend(_li);

	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var $li = $('#' + file.id),
			pre = parseInt(percentage * 100)+'%';
		$li.children('.percentage').text(pre);
	});
	uploader.on('uploadError', function(file) {
		$('#' + file.id).children('.percentage').text('上传失败');

	});
	uploader.on('uploadAccept', function(object, ret) {
		if(ret.status==0){
			var _img='<img src="'+ret.data.img_original+'" alt="" >',
				$li = $('#' + object.file.id);
			
			$li.children('.percentage').remove();
			$li.addClass('images-li').removeClass('images-progress')
				.append(_img).append('<span class="images-delete iconfont icon-remove"></span>')
				.attr({"data-id" : ret.data.id}).removeAttr('id');

		}else{
			autoTip(ret.data);
		}
	});
}

// 设置图片位置
function setImgPostion(imgsrc){
	var $ittcur = $('#ittwrap .curchange'),
		_ani = $ittcur.children('.animate-contain'),
		_img = _ani.children('img');

	var _imgwidth,_imgheight,iw,ih,mt,ml;

	if(imgsrc || !_img.data('naturalWidth')){
		var _images = new Image();
		_images.onload = function(){
			_imgwidth = _images.width;
			_imgheight = _images.height;
			_img.data({'naturalWidth': _imgwidth,"naturalHeight" : _imgheight});
			updataImgPostion();
		}
		imgsrc = imgsrc ? imgsrc : _img.attr("src");
		_images.src = imgsrc;
	}else{
		_imgwidth = _img.data('naturalWidth');
		_imgheight = _img.data('naturalHeight');
		updataImgPostion();
	}

	function updataImgPostion(){

		var cw = $ittcur.width(),
			ch = $ittcur.height();

		if($ittcur.attr("isproportion") == "true"){
			$ittcur.height(ch);
			if(cw/ch > _imgwidth/_imgheight){
				iw = '100%';
				ih = '';
				mt = -(_imgheight/_imgwidth * cw - ch) /2 + 'px';
				ml = 0;
			}else{
				iw = '';
				ih = '100%';
				mt = 0;
				ml = -(_imgwidth/_imgheight * ch - cw) /2 + 'px';
			}
			if(imgsrc){
				_img.attr("src",imgsrc);
			}
			_img.attr("width","").css({
				"width": iw,
				"height": ih,
				'margin-top': mt,
				'margin-left':ml
			});
			$ittcur.removeClass('autoheight');
			$("#set-autoheight").prop("checked" , false);
		}else{
			if(imgsrc){
				_img.attr("src",imgsrc);
			}
			if($ittcur.hasClass('autoheight')){
				_img.attr("width","").css({
					"width": '100%',
					"height": '',
					'margin-top': '0px',
					'margin-left':'0px'
				});
				$ittcur.height('');
				var _height = $ittcur.height();
				$("#control-h").slider( "value", _height );
				$("#control-h-i").val(_height);
			}else{
				_img.attr("width","").css({
					"width": '100%',
					"height": '100%',
					'margin-top': '0px',
					'margin-left':'0px'
				});
			}
		}
	}

}
// 形状库模块
var shapeModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.shapecount = Math.ceil((window.innerHeight - 150) / 95) * 4;

		svgUploader("#shape-up-1" , 1);

		this.getSysCategory();

		if(pmi_list.isAdmin){
			adminOperate.initAdminShapeUpload();
		}
	},
	confirm : function(){},
	cancel : function(){},
	show : function(sfn , cfn){
		this.init();
		this.confirm = sfn || function(){};
		this.cancel = cfn || function(){};
		$("#shape-space").show( 50 ,function(){
			$(this).addClass('show');
		});
	},
	hide : function(){
		$("#shape-space").removeClass('show').hide(1000);
	},
	showTab : function( user ){
		$("#shape-tab").children('a[type="'+user+'"]').addClass('active').siblings().removeClass('active');
		$("#shape-se-tab").children('nav[type="'+user+'"]').addClass('active').siblings().removeClass('active');
		$("#shape-wrap").children('.shape-section[type="'+user+'"]').addClass('active').siblings().removeClass('active');
		var _top = 45 + $("#shape-se-tab").height();
		$("#shape-wrap").css("top" , _top );

		var type = user == 0 ? 19678 : 1;
		if(!this.shapepage[user] || !this.shapepage[user][type]){
			this.getShape(user , type);
		}
		
	},
	url : ['/index.php?r=pc/InvitationNew/GetSysSvg'
		  ,'/index.php?r=pc/InvitationNew/GetUserSvg'],
	shapepage : {},
	shapecount : 28,
	// type 获取svg的type类型。在获取用户的库时：形状为1，动画为0
	// user 获取的是用户还是系统 系统-0 用户-1
	getShape : function(user , type ){
		var _this = this,
			_p = _this.shapepage;

		if(!_p[user]){
			_p[user] = {};
		}
		if(!_p[user][type]){
			_p[user][type] = {
				page : 1 ,
				loading : false,
				nomore : false
			}
		}
		var _tppage = _p[user][type];
		if(_tppage.loading || _tppage.nomore){
			return;
		}
		_tppage.loading = true;

		var url = _this.url[user],
			data = { 
				page: _tppage.page,
				page_size: _this.shapecount ,
				type: type
			},
			successFn = function(data){
				if(data.status == 0){
					_tppage.page ++ ;

					if(data.is_more == 0){
						_tppage.nomore = true;
					}
					_tppage.loading = false;

					var tpli = '';
					$.each( data.data , function(index, val) {
						tpli += _this.parseTemplate(val , user);
					});

					var _wrap;
					if(type == 0){
						_wrap = $("#svg-wrap").children('.active').children('ul');
					}else{
						_wrap = $("#shape-wrap").children('.active').children('ul');
					}

					if(user == 0 && type != 0 && _tppage.page == 2){
						_wrap.empty();
					}
					_wrap.append(tpli);
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				autoTip("形状数据请求有问题，请点击刷新重新请求！");
				_tppage.loading = false;
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#shape-space"));
	},
	template : ' <li id="${id}">${svg}${span}</li>',
	parseTemplate : function(data , user){
		var html = this.template.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'svg' :
					var _svg = $(data.content).filter("svg"),
						_div = $('<div></div>');
					_svg.removeAttr('x y id xml:space xmlns:xlink version enable-background').attr({
						'width':"100%",
						'height':"100%",
						"preserveAspectRatio": "none",
						"preserveaspectratio": "none"
					});
					_div.append(_svg);
					return _div.prop("outerHTML");
				case 'span' : 
					if(user == 1 || pmi_list.isAdmin){
						return '<span class="svg-del iconfont icon-remove"></span>';
					}else{
						return '';
					}
				default : 	return data[$1] || '';
			}
		});
		return html;
	},
	deleteSvg : function( li ){

		if( li.hasClass('loading') ){
			return;
		}
		li.addClass('loading');
			
		var url = '/index.php?r=pc/InvitationNew/DeleteUserSvg' ,
			data = { 
				svg_id: li.attr("id")
			},
			successFn = function(data){
				li.removeClass('loading');
				if(data.status == 0){
					li.remove();
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				li.removeClass('loading');
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#shape-space"));
	},
	getSysCategory : function(){
		var _this = this;
		var url = '/index.php?r=pc/InvitationData/GetCategory',
			data = { type: 4 },
			successFn = function(data){
				if(data.status == 0){
					var a1 = '';
					$.each( data.data , function(index, el) {
						a1 += '<a type="'+el.cate_id+'">'+el.name+'</a>';

					});
					$("#shape-se-tab").children('nav[type="0"]').html(a1);

					$("#shape-se-tab").children('nav[type="0"]').children().eq(0).trigger('click');
					// _this.getShape(0 , 3);

					var _top = 45 + $("#shape-se-tab").height();
					$("#shape-wrap").css("top" , _top );
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
					autoTip("svg请求有问题，请重试！");
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn , $("#shape-space"));
	}

};

var svgModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		shapeModule.getShape(0 , 0 );

		svgUploader("#svg-up-1" , 0);

		if(pmi_list.isAdmin){
			adminOperate.initAdminSvgUpload();
		}
	},
	confirm : function(){},
	cancel : function(){},
	show : function(sfn , cfn){
		this.init();
		this.confirm = sfn || function(){};
		this.cancel = cfn || function(){};
		$("#svg-space").show( 50 ,function(){
			$(this).addClass('show');
		});
	},
	hide : function(){
		$("#svg-space").removeClass('show').hide(1000);
	},
	showTab : function( user ){
		$("#svg-tab").children('a[type="'+user+'"]').addClass('active').siblings().removeClass('active');
		$("#svg-wrap").children('.svg-section[type="'+user+'"]').addClass('active').siblings().removeClass('active');

		if(!shapeModule.shapepage[user] || !shapeModule.shapepage[user][0]){
			shapeModule.getShape(user , 0);
		}
		
	},
	svgAniId : {},
	showSVGAnimate : function(ch){
		var _this =this,
			_svg = ch.find(".svg");
		$.each( _svg ,function(index, el) {
			var _el = $(el);
			
			_this.showOneSVGAnimate(_el);
		});
	},
	showOneSVGAnimate : function(el) {
		var _this = this,
			el = $(el);

		var  svgoptions = {
				type: el.attr('timing_type'),
				duration: el.attr('timing_duration'),
				delay: el.attr('timing_delay'),
				speed_type: el.attr('timing_speedtype') || el.attr("pathTimingFunction"),
				dasharray: (el.attr('timing_dasharray') ? el.attr('timing_dasharray') : 100) + "%," + (el.attr('timing_dasharray2') ? el.attr('timing_dasharray2') : 100) +"%",
				loop:el.attr('timing_loop'),
				// ishide: true
			};
		var _id = el.find("svg").attr("id");
		_this.svgAniId[_id] && _this.svgAniId[_id].destroy();
		_this.svgAniId[_id] = $("#" + _id).svgAnimation(svgoptions);

	}
};

//svg上传
//shapeorsvg 当形状时为1 ， 当svg动画时为0
function svgUploader(id , shapeorsvg) {
	var type , user;

	var uploader = WebUploader.create({
		accept: {
			extensions: 'svg',
			mimeTypes: 'image/svg+xml,image/svg'
		},
		auto: true,
		duplicate:true,  //去重，true表示允许重复上传，false表示不许重复上传
		fileSingleSizeLimit: 1024 * 15, //文件大小为15 kb
		swf: './Uploader.swf',
		server: '/index.php?r=Usercenter/UploadSvg',
		pick: id
	});
	uploader.on('startUpload', function(file, percentage) {
		// 开始上传流程触发
		if(shapeorsvg == 0){
			user = $('#svg-tab').children('.active').attr("type");
			type = 0;
		}else{
			user = $('#shape-tab').children('.active').attr("type");
			if(user == 1){
				type = 1;
			}else{
				type = $('#shape-se-tab').children('.active').children('.active').attr("type");
			}
		}

		uploader.option('server', '/index.php?r=Usercenter/UploadSvg&user=' + user + '&type=' + type);
	});
	uploader.on('error', function(type) {
		if (type == 'F_EXCEED_SIZE') {
			tip('请选择15 kb以下SVG文件!');
		} else if (type == 'F_DUPLICATE') {
			tip('该SVG已经上传了!');
		}else if(type =='Q_TYPE_DENIED'){
			tip('请选择svg文件!');
		}
	})
	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {
		
		var _li= $('<li id="' + file.id + '"><div><p class="state">0%</p></div></li>')
		if(shapeorsvg == 0){
			$("#svg-wrap").children('.svg-section.active').children('ul').prepend(_li);
		}else{
			$("#shape-wrap").children('.shape-section.active').children('ul').prepend(_li);
		}
	});
	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var $li = $('#' + file.id);
		$li.find('p.state').text(parseInt(percentage * 100)+'%');
	});
	uploader.on('uploadError', function(file) {
		$('#' + file.id).remove();
	});
	uploader.on('uploadAccept', function(object, ret) {
		if(ret.status==0){
			var _li = $('#' + object.file.id),
				_s = $(ret.content);

			_s.filter("svg").attr({
				'width':"100%",
				'height':"100%",
				"preserveAspectRatio": "none"
			});
			var _span = '';
			if( user == 1 ){
				_span = '<span class="svg-del iconfont icon-remove"></span>';
			}
			_li.children("div").html(_s);
			_li.attr('id',ret.data).append(_span);
		}
	});
}


//页面列表
var pageModule = {
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		var startPos ;
		$("#page-list").sortable({
			axis: "y",
			// containment: "parent",
			cursor: "move",
			revert: true,
			items: "li",
			placeholder:'page-kong',
			delay: 150,
			activate: function(event, ui) {
				startPos = ui.item.index();

			},
			update: function( event, ui ) {
				var endPos = ui.item.index();

				var delPos = (startPos > endPos) ? (startPos + 1) : startPos;
				var insPos = (startPos > endPos) ? endPos : (endPos + 1);
				pagearr.splice(insPos, 0, pagearr[startPos]);
				pagearr.splice(delPos,1);
				
				pageModule.resetNum();
			}
		});
	},
	pageLiTpl : '<li class="page-li ${class}"><div class="page-li-left"><span class="iconfont icon-arrow-up page-li-up" title="上移"></span>'
			+'<span class="page-num">${num}</span><span class="iconfont icon-arrow-down page-li-down" title="下移"></span></div><div class="page-li-bg">'
			+'<div class="page-li-thumb">${bg}</div><div class="one-mask"></div><span class="page-li-add">+</span></div><div class="page-li-right"><span class="iconfont icon-collect page-li-collect" title="收藏"></span>'
			+'<span class="iconfont icon-format page-li-format" title="更换"></span><span class="iconfont icon-copy2 page-li-copy" title="复制"></span>'
			+'</div><span class="iconfont icon-delete page-delete"></span></li>',
	parseTemplate : function( data ){
		var html = this.pageLiTpl.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				default : 	return data[$1] || '';
			}
		});
		return html;
	},
	initPageList : function(pa){
		var _this = this,
			pageli = '';
		$.each( pa , function(index, el) {
			var _p = $(el),
				_bg = _this.getSectionBg( _p ),
				_classname = '',
				_classname2 = '',
				_cln = _p.prop("className").split(' ');

			for (var i = 0; i < _cln.length; i++) {
				var val = _cln[i];

				if (/alone\-page/.test(val)) {
					_classname += ' ' + val;
				}
				if (/topage/.test(val)) {
					_classname2 += ' ' + val;
				}
			};

			if (_p.hasClass('int-hide')) {
				_classname += ' one';
			}

			_classname2 += _classname;

			// pageli += _this.parseTemplate({num : index + 1 , bg : _bg , class: _classname2 });
			pageli += _this.parseTemplate({num : index + 1 , bg : el.replace(/\sid/g , ' data-id') , class: _classname2 });

			_classname += ' ' + 'int-hide';
			pagearr[index] = _p.removeClass(_classname).addClass("page").prop("outerHTML");
		});

		$("#page-list").html(pageli).children('li').eq(0).addClass('active');
	},
	getSectionBg : function(se){

		se = se || $("#ittwrap").children('section');

		var _bg      = se.css('background-image'),
			_bgAnimate = se.children('.background-animate');
		if(_bgAnimate.length > 0){
				_bg = _bgAnimate.find('img').attr("src");
		}else{
			if(/url/.test(_bg)){
				_bg = (_bg.replace(/"/g , '').match(/url\(([\W\w]+)\)/))[1];
			}else{
				_bg = '';
			}
		}

		return _bg ;
	},
	isCanAddPage : function(){
		var _len = $("#page-list").children('li').length;

		if(_len >= 30){
			tip('最多只能添加30个页面。');
			// tip('最多只能添加30个页面<br><a style="text-decoration:underline;" href="http://bbs.zhichiwangluo.com/forum.php?mod=viewthread&tid=1498&extra=" target="_blank">点击制作更多页面</a>');
			return false;
		}

		return true;
	},
	resetNum : function(){
		$("#page-list").children('li').each(function(index, el) {
			$(el).find('.page-num').text(index + 1);
		});
	},
	savePage : function(){
		var _li = $("#page-list").children('.active'),
			_index = $("#page-list").children('.page-li').index(_li);

		rightclickModule.remove();

		imgplayModule.imgplayDestroy();

		var _html = $("#ittwrap").children('section').clone();

		$.each( _html.find('.animate') , function(index, el) {
			var _el = $(el),
				_drag = _el.children('.drag-inner');
			// if( _el.hasClass( "ui-draggable" ) ){
			// 	_el.draggable( "destroy" );
			// }
			// if( _drag.hasClass( "ui-resizable" ) ){
			// 	_drag.resizable( "destroy" );
			// }
			// if( _drag.hasClass( "ui-rotatable" ) ){
			// 	_drag.rotate( "destroy" );
			// }
			_el.removeClass('ui-draggable ui-draggable-handle');
			_drag.remove();
		});

		if (_html.find('.barrage').length){
			// var $danmuIns = $('#ittwrap .barrage .barrage-container').data('danmuInstance');
			// $danmuIns && $danmuIns.stop();
			_html.find('.barrage').find('.barrage-container').empty();
		}
		_html.find('.pop-menu').remove();

		_html.find(".form .form-ul").each(function(index, el) {
			if($( el ).hasClass( "ui-sortable" )){
				// $(el).sortable( "destroy" );
				$(el).removeClass('ui-sortable');
			}
		});
		_html.find(".int-disappear").each(function(index, el) {
			$(el).addClass($(el).attr('animateName')).removeClass('fadeOutCenter');
		});
		//连续动画
		_html.find(".int-animate-disappear").each(function(index, el) {
			$(el).removeClass('fadeOutCenter');
		});

		_html.find(".cont-map").each(function(index, el) {
			$(el).find('.map-wrap').html('').removeAttr('style');	
		});
		// _html.find('.slide-new').children('.animate-contain').children('section').empty();

		_html.find('.photovote').find('.photovote-list').empty();

		_html.find('.trigger-span').remove();
		_html.find('.sound-effect-mark').remove();
		_html.find('.curchange').removeClass('curchange');
		_html.find('.curchange-combo').removeClass('curchange-combo');
		_html.find(".no-animate").removeClass('no-animate');

		pagearr[_index] = _html.prop("outerHTML");
		this.getThumb(_index);
	},
	initIttwrap : function(){
		imgplayModule.imgplayDestroy();

		showAnimate.initMultipleAnimate('#ittwrap'); //初始化动画
        dragElement($("#ittwrap .animate")); //初始化拖拽、缩放、旋转

		$("#ittwrap .cont-map").each(function(index, el) {
			var _el = $(el).find('.map-wrap');
			if(_el.length > 0){
				mapModule.initmap(_el.attr("id"));
			}

		});
		$("#ittwrap .animate.slide , #ittwrap .slide-new").each(function(index, el) {
			imgplayModule.initialSlide( el );
		});

		var _phv = $("#ittwrap .photovote");
		if(_phv.length > 0){
			phvSetModule.setList( _phv , _phv.find('.photovote-list').attr("rownum") || 2 );
		}

		// elModule.initCurchange();

		svgModule.showSVGAnimate($('#ittwrap > .page'));
		textEffectModule.showTextAnimate($('#ittwrap > .page'));

	},
	getThumb : function(index){
		var pagebg = $("#page-list").children().eq(index).find('.page-li-bg');
		// pagebg.children('.page-li-thumb').empty();
		// pagebg.children('img').remove();
		pagebg.children('.page-li-thumb').html( pagearr[index].replace(/\sid/g , ' data-id') );
	}
};

// 动画模块
var animateModule = {
	getElAnimate : function(){
		var _curch = $("#ittwrap .curchange");

		if( _curch.hasClass('int-animate') && _curch.attr('animate-arr') ){
			this.getMultipleAnimate( _curch );
		}else if(_curch.attr('animatename') ){
			this.getSingleAnimate( _curch );
		}else{
			this.getNoneAimate();
		}

	},
	getSingleAnimate : function( ele ){
		var data  = {
			'0' : {
				name : ele.attr('animatename'),
				delay : parseFloat(ele.css('-webkit-animation-delay') || ele.css('animation-delay')) || '0.2',
				duration : parseFloat(ele.css('-webkit-animation-duration') || ele.css('animation-duration')) || '2',
				count : ele.css('-webkit-animation-iteration-count') || ele.css('animation-iteration-count') || 1
			}
		};

		this.showAnimateList(data);
	},
	getMultipleAnimate : function( ele ){
		var animateArr , data = {};
		if(ele.attr('animate-arr')){
			animateArr = JSON.parse(ele.attr('animate-arr'));
		}

		$.each( animateArr , function(index, val) {
			if(val['animation-name']){
				data[index]  = {
					name : val['animation-name'],
					delay : val['animation-delay'],
					duration : val['animation-duration'],
					count : val['animation-iteration-count']
				};
			}
		});

		this.showAnimateList(data);
	},
	getNoneAimate : function(){
		$("#ani-el-list").empty();
	},
	animateDir : ['Center' , 'Left' , 'Right' , 'Up' , 'Down' , 'CenterIn' , 'CenterOut' , 'X' , 'Y' , 'CW' , 'CN'] ,
	matchAnimateDir : function( name ){
		var dir = '';
		$.each( this.animateDir ,function(index, el) {  //匹配出动画的方向
			var _re = new RegExp(el +'$');
			if(_re.test( name )){
				dir = el;
				return false;
			}
		});

		return dir ;
	},
	getAnimateName : function( name ){

		var dir = this.matchAnimateDir(name),
			dirReg = new RegExp(dir +'$'),
			livalue = name.replace(dirReg,"");

		var el = $("#animate-content").find('li[data-value="'+livalue+'"]'),
			text = el.text();

		return { el : el, text : text };
	},
	getAnimateDir : function( name ){
		var dir = this.matchAnimateDir(name),
			el ,
			text = '' ;
		
		if(/rotateIn/.test(name)){
			el = $("#animate-dir").children('.t6[data-value="'+dir+'"]');
		}else{
			el = $("#animate-dir").children('[data-value="'+dir+'"]').eq(0);
		}
		text = el.text();

		return { el : el, text : text };
	},
	showAnimateList : function(data){
		var _this = this,
			ii = 1;

		$("#ani-el-list").empty();
		$.each(data , function( index, val ) {
			var _html = '';
				name_f = _this.getAnimateName(val.name).text,
				name_l = _this.getAnimateDir(val.name).text,
				_name = name_l ? name_f + '-' + name_l : name_f;

			_html = '<li data-d=""><span class="aniel-ind">动画'+ii+'</span><span class="aniel-delete iconfont icon-unie928"></span></li>';
			_html = $(_html);
			_html.data("data-d" , val).attr("data-d" , JSON.stringify(val));
			$("#ani-el-list").append( _html );
			ii ++;
		});
		$("#ani-el-list").children('li').eq(0).trigger('click' , true);

	},
	updateClickAnimate : function( issave ){
		issave = issave == undefined ? true : issave;

		var _curchange = $("#ittwrap .curchange");

        showAnimate.cleanTarget( _curchange );

        var data = this.getAnimateData();

        _curchange.addClass('hide');
        _curchange.addClass( data.name ).css({
			'animation-duration': data.duration + 's',
			'-webkit-animation-duration': data.duration + 's',
			'animation-delay': data.delay + 's',
			'-webkit-animation-delay': data.delay + 's',
			'animation-iteration-count': data.count ,
			'-webkit-animation-iteration-count': data.count 
		});

		setTimeout(function(){
			_curchange.removeClass('hide');
		}, 1 );

		if(issave){
			animateModule.undataList();
			animateModule.updateElAnimate();
		}

	},
	getAnimateData : function(){
		var name_f = $("#animate-content").find('.animate-ul > li.active').attr("data-value"),
			name_l = $("#animate-dir").children('.active').attr("data-value"),
			adata = {
				name : name_f + name_l,
	        	delay : $("#control-ande-i").val(),
	        	duration : $("#control-andu-i").val(),
	        	count : $("#animate-count").val()
	        };

	    return adata ;
	},
	// showAndHideAC : function( st ){
	// 	if(st == "hide"){
	// 		$("#ani-el-wrap").addClass('show');
	// 		$("#animate-content").removeClass('show');
	// 		$("#set-ani-add").addClass('show');
	// 		$("#set-ani-ch").removeClass('show');
	// 	}else{
	// 		$("#ani-el-wrap").removeClass('show');
	// 		$("#animate-content").addClass('show');
	// 		$("#set-ani-add").removeClass('show');
	// 		$("#set-ani-ch").addClass('show');
	// 	}
	// },
	undataList : function(){
		var olddata = animateModule.getAnimateData(),
			li = $("#ani-el-list").children('.active');

		li.data("data-d" , olddata).attr("data-d" , JSON.stringify(olddata));
	},
	updateElAnimate : function(){
		var lis = $("#ani-el-list").children('li'),
			_curch = $("#ittwrap .curchange");

		if(lis.length == 0){
			showAnimate.cleanTarget( _curch );
			_curch.removeClass('int-animate int-animate-disappear int-disappear fadeOutCenter')
				  .removeAttr('animatename animate-arr disappear-animation data-animation-style')
				  .css({
						'animation-duration': '',
						'-webkit-animation-duration': '',
						'animation-delay': '',
						'-webkit-animation-delay': '',
						'animation-iteration-count': '' ,
						'-webkit-animation-iteration-count': '' 
					});
		}else if(lis.length == 1){
			var d = lis.data('data-d'),
				isdisappear = d.name.substr(0,2)=='di';

			d.count = isdisappear ? '1' : d.count
			showAnimate.cleanTarget( _curch );

			_curch.removeClass('int-animate').addClass(d.name).removeAttr('animate-arr').attr({
				'animatename' : d.name ,
				'data-animation-style' : JSON.stringify({
					'duration' : d.duration + 's',
					'delay' : d.delay + 's',
					'iteration-count' : d.count
				})
			}).css({
				'animation-duration': d.duration + 's',
				'-webkit-animation-duration': d.duration + 's',
				'animation-delay': d.delay + 's',
				'-webkit-animation-delay': d.delay + 's',
				'animation-iteration-count': d.count ,
				'-webkit-animation-iteration-count': d.count 
			});

			if(isdisappear){
				_curch.addClass('int-disappear').removeClass('fadeOutCenter int-animate-disappear').attr('disappear-animation', d.name);
			}else{
				_curch.removeClass('int-disappear int-animate-disappear fadeOutCenter').removeAttr('disappear-animation');
			}
		}else{
			var data = {},
				lastIndex = lis.length -1,
				isdisappear = false,
				lastname = '';

			lis.each(function(index, el) {
				var d = $(el).data("data-d");
				data[index] = {
					'animation-name' : d.name,
					'animation-duration' : d.duration,
					'animation-delay' : d.delay ,
					'animation-iteration-count' : d.count
				};
			});
			_curch.addClass('int-animate').attr("animate-arr" , JSON.stringify(data)).removeAttr('data-animation-style');

			lastname = data[lastIndex]['animation-name'];
			isdisappear = lastname.substr(0,2)=='di';
			if (isdisappear) {
				_curch.addClass('int-animate-disappear').removeClass('int-disappear fadeOutCenter').attr('disappear-animation', lastname );
			}else{
				_curch.removeClass('int-animate-disappear int-disappear fadeOutCenter').removeAttr('disappear-animation');
			}

		}
		recordModule.addRecord();
	}
};
// 动画展示
var showAnimate = {
	initSingleAnimate : function( wrap ){
		$.each($(wrap).find('.animate').not('.int-animate'), function(index, val) {
			var style = $(this).data('animation-style');
			style && style.duration && $(this).css({
				'-webkit-animation-duration': style.duration,
				'animation-duration': style.duration,
				'-webkit-animation-delay': style.delay,
				'animation-delay': style.delay,
				'-webkit-animation-iteration-count': style['iteration-count'],
				'animation-iteration-count': style['iteration-count']
			});
		});
	},
	initMultipleAnimate : function( wrap ){
		var _this = this;
		$.each($(wrap).find('.int-animate'), function(index, item) {
			var _item = $(item),
				_ar = $(item).attr('animate-arr');

			if (!_ar) {
				return;
			}
			if (utilities.isEmptyObject(JSON.parse(_ar))) {
				return;
			}
			_item.removeClass('fadeOutCenter');

			var animation = _item.attr('disappear-animation');
			animation ? _item.removeClass(animation) : '';

			_this.ctAnimate(_item);
		});
	},
	ctAnimate : function( el ){
		var showan = this,
			el = $(el);
		//先引入第一个动画，与之前的动画兼容;
		if (! el.attr('animate-arr') ) {
			return ;
		}
		showan.cleanTarget(el);

		var aniJson = JSON.parse(el.attr('animate-arr')),
			first_ani_d = utilities.getFirstObject(aniJson),
			first_ani_n = first_ani_d['animation-name'] || el.attr('animatename'),
			num = 0;

		el.addClass(first_ani_n);
		el.hide();
		setTimeout(function() {
			el.show();
		}, 1);

		el.css({
			'animation-duration': first_ani_d['animation-duration'] + 's' || '1s',
			'-webkit-animation-duration': first_ani_d['animation-duration'] + 's' || '1s',
			'animation-delay': first_ani_d['animation-delay'] + 's' || '1s',
			'-webkit-animation-delay': first_ani_d['animation-delay'] + 's' || '1s',
			'animation-iteration-count': first_ani_d['animation-iteration-count'] || '1',
			'-webkit-animation-iteration-count': first_ani_d['animation-iteration-count'] || '1',
		});
		//开始连续动画
		var name = [],
			duration = [],
			iteration = [],
			delay = [];
		//4个参数
		for (var item in aniJson) {
			if (item != 'undefined') {
				name.push((aniJson[item])['animation-name']);
				duration.push((aniJson[item])['animation-duration']);
				iteration.push((aniJson[item])['animation-iteration-count']);
				delay.push((aniJson[item])['animation-delay']);
			}
		}
		el.on("webkitAnimationEnd animationend", function() {
			num++;
			var _thisel = $(this);
			if (num > name.length - 1) {
				_thisel.unbind('webkitAnimationEnd animationend');
				if ( _thisel.hasClass('int-animate-disappear') && !_thisel.attr('disappear-animation') ) {
					_thisel.addClass('fadeOutCenter');
				} else if ( !_thisel.hasClass('int-animate-disappear') ) {
					_thisel.removeClass(name[num - 1] || first_ani_n);
				} else if ( _thisel.hasClass('int-animate-disappear') ) {
					if ( _thisel.closest("#ittwrap").length == 0 ) {
						 _thisel.hide();
					}
				}
				num = 0;
				return;
			} else {
				_thisel.removeClass(name[num - 1] || first_ani_n);
			}
			_thisel.css({
				'animation-duration': duration[num] + 's',
				'-webkit-animation-duration': duration[num] + 's',
				'animation-delay': delay[num] + 's',
				'-webkit-animation-delay': delay[num] + 's',
				'animation-iteration-count': iteration[num],
				'-webkit-animation-iteration-count': iteration[num],
			});
			if (name[num] == name[num - 1]) {
				_thisel.hide();
				_thisel.show();
			}
			_thisel.addClass(name[num]);
		});
	},
	setAnimate : function(el , data){
		el.css({
			'animation-duration': data.duration + 's',
			'-webkit-animation-duration': data.duration + 's',
			'animation-delay': data.delay + 's',
			'-webkit-animation-delay': data.delay + 's',
			'animation-iteration-count': data.count ,
			'-webkit-animation-iteration-count': data.count ,
		});
	},
	cleanTarget : function( el ) {
		// 连续动画，清除DIV本身附带的动画
		var _el = $(el);

		if( _el.length == 0 ){
			return ;
		}
		var _classar = (_el.attr('class')).split(' ');

		for (var i = 0; i < _classar.length ; i++) {
			var c = _classar[i];

			if(/^(fadeIn|bounceIn|rotateIn|translate|scale|more_|disappear_)[\w]+/.test(c)){
				_el.removeClass(c);
			}
		};
	}
}
//  公共模块
var utilities = {
	//数组元素交换位置
	ArrayExchange : function(arr , index1 , index2){
		if (isNaN(index1) || isNaN(index2) || index1 > arr.length || index2 > arr.length) {
			return false;
		}
		var arra, arrb;

		arra = arr[index1];
		arrb = arr[index2];
		arr[index1] = arrb;
		arr[index2] = arra;
	},
	//数组移除某个值
	ArrayRemoveValue : function(arr , val){
		var index = arr.indexOf(val);
		if (index > -1) {
			arr.splice(index , 1);
		}
	},
	//判断{}是否是空的
	isEmptyObject : function(o) {  
	    var t;  
	    for (var t in o){
	        return false;
	    } 
	    return true;  
	},
	//获取{}的第一个值
	getFirstObject : function(object){
		var index = 0;
		for (var i in object) {
			if (i != 'undefined') {
				return object[i];
			}
	    }
	},
	//获取唯一数
	uniqueNum : function(){
		// var num = (new Date()).valueOf();
		var num = "1" + (Math.random()).toString().substring(2,11);
		// num = parseInt(parseInt(num) + Math.random());
		return num ;
	},
	uniqueNumOrLetter : function(){
		var letarr = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			str = '';

		for(var i = 0 ; i < 9 ; i++){
			str += letarr[Math.floor(Math.random() * 36)];
		}
		return '1' + str;
	},
	getDegBytan : function( x , y){
		var anl = Math.round(Math.atan2( x , y ) * 360 / (2 * Math.PI));
		if(anl < 0){
			anl = anl + 360;
		}
		return anl;
	},
	// 返回时间格式 YY-MM-DD hh:ii
	getTime : function(days){
		var days = days || new Date();

		var m = ('0' + (days.getMonth() + 1) ).slice(-2),
			d = ('0' + days.getDate() ).slice(-2),
			h = ('0' + days.getHours() ).slice(-2),
			i = ('0' + days.getMinutes() ).slice(-2);

		return days.getFullYear() + '-'+ m + '-' + d + ' ' + h + ':' + i;
	}
};

var throttle = function(fn , interval){
	var _self = fn,  //保存需要被延时执行的函数引用
		timer,   //定时器
		firstTime = true;   //是否以第一调用

	return function(){
		var args = arguments,
			_me = this;

		if(firstTime){
			_self.apply(_me , args);
			return firstTime = false;
		}
		if(timer){
			return false;
		}
		timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			_self.apply(_me , args);
		} , interval || 500);
	}
};


function switchIdArray(array){
	for( var i = array.length-1; i >= 0; i--){
		array[i] = Number(array[i]);
	}
	return array;
}
//获取表单id数组
function getIdArray(type){
	var idArr = [],
		id;
	switch(type){
		case 'form':    $(pagearr).each(function(index, page){
							id = /id=["']f_(\d+)["']/g.exec(page);
							id && id[1] && idArr.push(Number(id[1]));
						});
						break;
		case 'form-ele':$(pagearr).each(function(index, page){
							 $(page).find('.form-ele .form-ele-content-wrap').each(function(){
								if ($(this).attr('data-id')){
									idArr.push(Number($(this).attr('data-id')));
								}
								if (id = $(this).find('input[type="radio"]').attr('name')){
									id = /radio_name(\d+)/.exec(id)[1];
									id && idArr.push(Number(id));
								}
							});
						});
						break;
		case 'danmu': 	$(pagearr).each(function(index, page){
							$(page).find('.barrage-container').each(function(){
								if ($(this).attr('data-id')){
									id = $(this).attr('data-id');
									$(this).attr('data-dm-id', id).removeAttr('data-id');
								}
								idArr.push(Number($(this).attr('data-dm-id')));
								$(this).attr('data-count') || $(this).attr('data-count', 3);
							});
						});
						break;

	}

	return idArr.sort(function(pre, next){
		return pre > next;
	});
}
// 避免ID重复 form：表单, danmu：弹幕, form-ele：表单元素
function getValidId(type){
	// var id = 1,
	// 	id_arr;
	// switch(type){
	// 	case 'form'	: id_arr = form_id_arr;
	// 					break;
	// 	case 'danmu': id_arr = danmu_id_arr;
	// 					break;
	// 	case 'form-ele': id_arr = form_ele_id_arr;
	// 					 break;
	// }
	// if(!id_arr){
	// 	autoTip('error type:'+ type);
	// 	return;
	// }
	// id_arr.length && (id = id_arr[id_arr.length-1]+1);
	// if (type === 'danmu' && id <= 10000){
	// 	// 弹幕id兼容老版本
	// 	id += 10000;
	// }
	// id_arr.push(id);
	// return id;
	return utilities.uniqueNum();
}

//      类型       【0选择器             1类名               2文字       3是否要判断长度  】
var typeinfo = {
	'bg'          : [''                 , ''                , '背景'        , 'false'],
	'text'        : ['.text_edit'       , 'text_edit'       , '文字'        , 'true' ],
	'img'         : ['.img'             , 'img'             , '图片'        , 'true' ],
	'btn'         : ['.btn'             , 'btn'             , '按钮'        , 'true' ],
	'aside'       : [''                 , ''                , '侧边栏'      , 'false'],
	'tab'         : [''                 , ''                , '底部栏'      , 'false'],
	'barrage'     : ['.barrage'         , 'barrage'         , '弹幕'        , 'true' ],
	"vote"        : ['.cast-vote'       , 'cast-vote'       , '投票'        , "true" ],
	"map"         : ['.cont-map'        , 'cont-map'        , '地图'        , 'true' ],
	"like"        : ['.cast-like'       , 'cast-like'       , '点赞'        , "true" ],
	"video"       : ['.cont-video'      , 'cont-video'      , '视频'        , "true" ],
	"imgplaynew"  : ['.slide-new'       , 'slide-new'       , '轮播'        , 'true' ],
	"imgplay"     : ['.slide'           , 'slide'           , '轮播'        , 'true' ],
	'form'        : ['.form'            , 'form'            , '表单'        , 'true' ],
	'radio'       : ['.form-radio'      , 'form-radio'      , '单选'        , 'true' ],
	'checkbox'    : ['.form-checkbox'   , 'form-checkbox'   , '多选'        , 'true' ],
	'input'       : ['.form-input'      , 'form-input'      , '输入框'      , 'true' ],
	'select'      : ['.form-select'     , 'form-select'     , '下拉框'      , 'true' ],
	'imgupload'   : ['.form-imgupload'  , 'form-imgupload'  , '图片上传'    , 'true' ],
	'submit'      : ['.form-submit-btn' , 'form-submit-btn' , '提交按钮'    , 'true' ],
	'nav'         : ['.nav'             , 'nav'             , '栏目'        , 'true' ],
	'shape'       : ['.shape'           , 'shape'           , '图形'        , 'true' ],
	'svg'         : ['.svg'             , 'svg'             , 'SVG动画'     , 'true' ],
	'pop'         : [".pop"             , "pop"             , "弹窗"        , 'true' ],
	'advert'	  : ['.advert'			, 'advert'			, '广告'        , 'true' ],
	'photovote'	  : ['.photovote'		, 'photovote'		, '照片投票'    , 'true' ],
	'texteditbox' : ['.texteditbox'		, 'texteditbox'		, '可编辑文本'  , 'true' ],
	'texteditboxbtn':['.texteditboxbtn'	, 'texteditboxbtn'	, '编辑按钮'    , 'true' ],
	'weixinimg'   : ['.weixinimg'		, 'weixinimg'		, '微信图片'    , 'true' ],
	'weixinavatar': ['.weixinavatar'	, 'weixinavatar'	, '微信头像'    , 'true' ],
	'weixinname'  : ['.weixinname'	    , 'weixinname'	    , '微信昵称'    , 'true' ],
	'weixinvoice' : ['.weixinvoice'	    , 'weixinvoice'	    , '微信语音'    , 'true' ],
	'weixinsound' : ['.weixinsound'	    , 'weixinsound'	    , '微信录音'    , 'true' ]
},
typepriority = ['text','img','btn','form','radio','checkbox','input','select','imgupload','submit','nav', 'shape','barrage','svg',"pop",'vote','map','like','video','imgplaynew','imgplay', 'advert' , 'photovote' , 'texteditbox' , 'texteditboxbtn' , 'weixinimg' , 'weixinavatar' , 'weixinname' , 'weixinvoice' , 'weixinsound']; //优先级
// 元素模块
var elModule = {
	getType : function( el ){
		var _type ;
		$.each(typepriority, function(index, val) {
			if (el.hasClass(typeinfo[val][1])) {
				_type = val;
				return false;
			}
		});
		if(_type == "imgplaynew"){
			_type = 'imgplay';
		}
		return _type;
	},
	showWrap : function( type ){

		if(type == 'none'){
			$("#change-none").addClass('active').siblings().removeClass('active');
			$("#set-tab").children('a[type="el"]').text("无");
			return ;
		}

		$("#set-tab").children('a[type="el"]').text(typeinfo[type][2]);
		$("#change-" + type).addClass('active').siblings().removeClass('active');

		if( ['bg' , 'aside' , 'tab' , 'photovote'].indexOf(type) > -1 ){
			$("#set-tab").children('a[type="el"]').addClass('active').siblings().removeClass('active').hide();
			$("#set-content").children('.set-st[type="el"]').addClass('active').siblings().removeClass('active');
			$("#set-b").addClass('show');
			// $("#set-b").children('.set-b-l').addClass('show').siblings().removeClass('show');
		}else{
			$("#set-tab").children('a').css("display" , 'inline-block');
			this.showCommon(type);

			animateModule.getElAnimate();
			this.showGetLink();
		}

		if( ['bg' , 'input' , 'radio' , 'select' , 'checkbox' , 'imgupload' , 'aside' , 'nav' , 'video' , 'map' , 'barrage' ,'pop' , 'vote' , 'like' , 'imgplay', 'advert' , 'photovote' , 'texteditbox' , 'texteditboxbtn' , 'weixinimg' , 'weixinavatar' , 'weixinname', 'weixinvoice' , 'weixinsound'].indexOf(type) > -1 ){
			$("#set-b").addClass('hide');
			$("#set-content").addClass('bottom10');
		}else{
			$("#set-b").removeClass('hide');
			if(!$("#set-tab").children('a[type="animate"]').hasClass('active')){
				$("#set-content").removeClass('bottom10');
			}
		}

		eleObjects[type].show();
	},
	// 显示优先级
	initCurchange : function(){
		$('#ittwrap .curchange').removeClass('curchange');
		var ishasel = false,
			elm = this;
		$.each(typepriority, function(index, val) {
			var _length,_class;
				_class = typeinfo[val][0];
				_length = $("#ittwrap").find(_class).length;
				if(_length > 0){
					$("#ittwrap").find(_class).eq(0).trigger('mousedown');
					// elm.showWrap( val );
					ishasel = true;
					return false;
				}
		});
		if(! ishasel){
			elm.showWrap('none');
		}
	},
	delElement : function( ele ){  //删除单个元素
		var _this = this;
		if(ele.hasClass('form') || ele.hasClass('form-ele')){
			confirmTip({
				text : '表单删除后, 将无法在电脑端查看该表单数据, 确认删除？',
				ConfirmFunction : function(){
					_this.confirmDeleteElement(ele);
				}
			})
		}else if(ele.hasClass('barrage')){
			confirmTip({
				text : '弹幕删除后, 原弹幕数据将丢失, 确认删除？',
				ConfirmFunction : function(){
					_this.confirmDeleteElement(ele);
				}
			})
		}else if (ele.hasClass('nav') && ele.attr('data-role') == 'tab'){
			fix_nav_num--;
			commondata['nav_fix_value'] = '';
			_this.confirmDeleteElement(ele);
		}else if(ele.hasClass('trigger-observer')){
			var _triggerarr = ele.attr("data-trigger-arr");
			$.each( $("#ittwrap .trigger-receiver") ,function(index, el) {
				var _el = $(el),
					_receiver = _el.attr("data-receiver-id").split(',');

				if(_receiver.indexOf( _triggerarr) > -1){
					utilities.ArrayRemoveValue( _receiver , _triggerarr);

					if(_receiver.length > 0){
						_el.attr("data-receiver-id" , _receiver.toString());
					}else{
						_el.removeClass('trigger-receiver').removeAttr('data-receiver-id');
					}
				}
			});
			_this.confirmDeleteElement(ele);

		}else if(ele.hasClass('advert')){
			advertModule.del();
			_this.confirmDeleteElement(ele);
		}else if(ele.hasClass('slide-new')){
			var _id = ele.children('.animate-contain').attr('id');
				_imgplay = imgplayModule.sliderArr[_id];

			_imgplay && _imgplay.destroy();
			delete imgplayModule.sliderArr[_id];

			_this.confirmDeleteElement(ele);
		}else if(ele.hasClass('texteditboxbtn')){
			confirmTip({
				text : '这个按钮删除之后，这页的文本编辑框将无法使用, 确认删除？',
				ConfirmFunction : function(){
					_this.confirmDeleteElement(ele);
				}
			});
		}else if(ele.hasClass('photovote')){
			confirmTip({
				text : '删除该元素后，已有的相应数据将一起并清空，是否确认删除？',
				ConfirmFunction : function(){
					photovoteModule.options = '';
					_this.confirmDeleteElement(ele);
				}
			});
		}else{
			_this.confirmDeleteElement(ele);
		}

		
	},
	confirmDeleteElement : function(ele){
		ele.remove();

		var type = this.getType(ele);
		var typeEl = $("#ittwrap").find(typeinfo[type][0]);
		if(typeEl.length > 0){
			typeEl.eq(0).trigger('mousedown');
		}else{
			this.initCurchange();
		}

		// recordModule.addRecord();
		elListModule.refresh();
		// zMaxIndex = zIndexModule.setZIndex();
	},
	delDuoElement : function(ele){ //删除多个元素
		var nav = ele.filter('.nav'),
			tg = ele.filter('.trigger-observer'),
			imgplay = ele.filter('.slide-new'),
			advert = ele.filter('.advert'),
			photovote = ele.filter('.photovote');

		if(nav.length){
			$.each( nav ,function(index, el) {
				if ($(el).attr('data-role') == 'tab'){
					fix_nav_num--;
					commondata['nav_fix_value'] = '';
				}
			});
		}
		if(tg.length){
			$.each(tg ,function(index, e) {
				var _triggerarr = $(e).attr("data-trigger-arr");
				$.each( $("#ittwrap .trigger-receiver") ,function(i, item) {
					var _el = $(item),
						_receiver = _el.attr("data-receiver-id").split(',');

					if(_receiver.indexOf( _triggerarr) > -1){
						utilities.ArrayRemoveValue( _receiver , _triggerarr);

						if(_receiver.length > 0){
							_el.attr("data-receiver-id" , _receiver.toString());
						}else{
							_el.removeClass('trigger-receiver').removeAttr('data-receiver-id');
						}
					}
				});
			});
		}
		if(imgplay.length){
			$.each( imgplay , function(index, el) {
				var _id = $(el).children('.animate-contain').attr('id');
					_imgplay = imgplayModule.sliderArr[_id];

				_imgplay && _imgplay.destroy();
				delete imgplayModule.sliderArr[_id];
			});
		}
		if(advert.length){
			advertModule.del();
		}
		if(photovote.length){
			photovoteModule.options = '';
		}

		ele.remove();

		elListModule.refresh();
	},
	showCommon : function(type){
		var _curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain');

		var w = _curch.width(),
			h = _curch.height(),
			t = _curch.position().top,
			l = _curch.position().left,
			ra = parseInt(_ani.css("border-top-left-radius")),
			bgc = _ani.css("background-color") || 'rgba(0, 0, 0, 0)',
			fc = _ani.css("color"),
			o = _ani.css("opacity") * 100 ,
			boc = _ani.css("border-color"),
			bow = Math.round(parseFloat(_ani.css("border-width") || 0)),
			bos = _ani.css("border-style"),
			rx = _ani.attr("rotdegx") || 0,
			ry = _ani.attr("rotdegy") || 0,
			rz = _ani.attr("rotdegz") || 0,
			sc , sx , sy , sr ;

		var shadow = _ani.css("box-shadow");
		if(shadow == 'none'){
			sc = "#555";
			sx = 3 ;
			sy = 3 ;
			sr = 8 ;

			$("#shadow-wrap").children('.shadow-s').hide();
			$("#shadow-type").find('input[value="3"]').prop('checked', true);
		}else{
			sc = shadow.match(/rgb[\w]?\(([\W\w]+)\)|#[\d\w]+/)[0];

			var shadowarr = shadow.match(/[\d\.]+px/g);

			sx = parseFloat(shadowarr[0]);
			sy = parseFloat(shadowarr[1]);
			sr = parseInt(shadowarr[2]);

			$("#shadow-wrap").children('.shadow-s').show();
			$("#shadow-type").find('input[value="1"]').prop('checked', true);
		}
		//宽度
		$("#control-w").slider( "value", w );
		$("#control-w-i").val(w);
		//高度
		$("#control-h").slider( "value", h );
		$("#control-h-i").val(h);
		// 圆角
		$("#control-ra").slider( "value", ra );
		$("#control-ra-i").val(ra);
		//背景颜色
		$("#color-bg").spectrum("set", bgc);
		//字体颜色
		$("#color-font").spectrum("set", fc);
		// 透明度滑块
		$("#control-o").slider( "value", o );
		$("#control-o-i").val(o);
		// 上下滑块
		$("#control-up").slider( "value", t );
		$("#control-up-i").val(t);
		// 左右滑块
		$("#control-l").slider( "value", l );
		$("#control-l-i").val(l);
		// $("#st-position").children('span').removeClass('active');

		// 边框粗细滑块
		$("#control-bo").slider( "value", bow );
		$("#control-bo-i").val(bow);
		$("#border-style").val(bos);
		$("#color-bo").spectrum("set", boc);

		// 阴影大小
		var _ss = Math.round(Math.sqrt(sx * sx + sy * sy));
		$("#control-ss").slider( "value", _ss );
		$("#control-ss-i").val(_ss);
		// 阴影模糊
		$("#control-sh").slider( "value", sr );
		$("#control-sh-i").val(sr);
		// 阴影方向
		var _sf = utilities.getDegBytan(sx , sy);
		$("#control-sf").slider( "value", _sf );
		$("#control-sf-i").val(_sf);
		//阴影颜色
		$("#color-sc").spectrum("set", sc);

		// 旋转X轴滑块
		$("#control-tx").slider( "value", rx );
		$("#control-tx-i").val(rx);
		// 旋转Y轴滑块
		$("#control-ty").slider( "value", ry );
		$("#control-ty-i").val(ry);
		// 旋转Z轴滑块
		$("#control-tz").slider( "value", rz );
		$("#control-tz-i").val(rz);

		//是否圆形
		if(_curch.hasClass('circle')){
			$('#set-circle').prop("checked",true);
		}else{
			$('#set-circle').prop("checked", false);
		}
		if(['imgplaynew' , 'advert' , 'photovote' , 'nav' , 'barrage' , 'map' ,'video', 'input' ,'radio','checkbox','imgupload','select' , 'texteditbox' ].indexOf(type) > -1){
			$('#set-circle').prop({
				"checked"  : false ,
				"disabled" : true
			});
		}else{
			$('#set-circle').prop("disabled" , false);
		}
		//是否自适应高度
		if(_curch.hasClass('autoheight')){
			$('#set-autoheight').prop("checked",true);
		}else{
			$('#set-autoheight').prop("checked", false);
		}
		if(['imgplaynew' , 'shape' , 'svg' , 'barrage' , 'video' , 'map' , 'nav' , 'advert' , 'photovote' , 'texteditbox' , 'texteditboxbtn' , 'weixinimg' , 'weixinavatar' , 'weixinname', 'weixinvoice' , 'weixinsound'].indexOf(type) > -1){
			$('#set-autoheight').prop({
				"checked"  : false ,
				"disabled" : true
			});
			_curch.removeClass('autoheight');
		}else{
			$('#set-autoheight').prop("disabled" , false);
		}

		this.showGetTrigger(_curch);

	},
	showGetLink : function(ele){
		var _curch = ele || $("#ittwrap .curchange"),
			_text = '无';
		if (typeof(_curch.attr("href")) == "undefined") {
			if (_curch.hasClass('int-toPage')) {
				var _page = $("#page-list").find('.' + _curch.attr('toPageIndex')).index() + 1;
				_text = '页面跳转（第' + _page + '页）';
			} else if (_curch.hasClass('int-newpage')) {
				if (/act/.test(_curch.attr("type"))) {
					_text = '活动报名';
				} else if (/g/.test(_curch.attr("type"))) {
					_text = '活动圈子';
				} else if(/art/.test(_curch.attr('type'))){
					_text = '讨论区';
				}
			}else if(_curch.hasClass('int-page')){
				var _page = $("#page-list").find('.' + _curch.attr('data-index')).index() + 1;
				_text = '弹出页（第' + _page + '页）';
			}else if(_curch.hasClass('int-iframe')){
				var _src = _curch.attr("data-src");
				_text = '嵌入页（链接：' + _src + '）';
			}else if(_curch.hasClass('int-goods')){
				_text = '商品买卖';
			}
			else if(_curch.hasClass('int-gzh')){
				_text = '快速关注';
			}else if(_curch.hasClass('int-game')){
				_text = '游戏';
			}else if(_curch.hasClass('int-rotate')){
				_text = '大转盘抽奖';
			}
		} else {
			var btnlinkaddress = _curch.attr('href');
			if (/\/s\?id/.test(btnlinkaddress) && !/zhichiwangluo/.test(btnlinkaddress)) {
				var _url = 'http://u100000.jisuapp.cn' + btnlinkaddress;
				_text = '微页（链接：'+ _url + ')';
			}else if (/tel\:/.test(btnlinkaddress)){
				var _url = btnlinkaddress.substr(4);
				_text = '电话（'+ _url + ')';
			}else{
				_text = '网址（'+ btnlinkaddress + ')';
			}
		}
		if(_text != '无'){
			_text = '已有：' + _text;
			$("#s-link-btn").text("修改链接");
		}else{
			$("#s-link-btn").text("添加链接");
		}

		$("#link-has").attr("title" ,_text).text(_text);
	},
	showGetTrigger : function(ele){
		if(ele.hasClass('trigger-observer')){
			$("#add-trigger-btn").text('修改触发');
		}else{
			$("#add-trigger-btn").text('添加触发');
		}
	},
	show : function(){
		// $("#set-space").addClass('show');
		$("#set-space").show( 50 ,function(){
			$(this).addClass('show');
		});
	},
	hide : function(){
		// $("#set-space").removeClass('show');
		$("#set-space").removeClass('show').hide(1000);
	}
}


/*
 *所有外面都套二层div，第一层必须有能识别的这元素的类名和animate这个类名，对元素的mousedown事件绑定在animate这个类名下。拖拽和缩放事件也在这个div上。
 *第二层div的类名是animate-contain，里面放这个元素的真正内容。
 */

function comEle(top){
	this.top = top || 30;
}
comEle.prototype.getTop = function(he){
	var top = this.top,
		hh = he || 30;

	this.top += hh;
	if(this.top > 500 - hh){
		this.top = 30;
	}

	return top;
}

/********
 *图片
 */

function imgEle(){
	comEle.call(this, 110);
	this.html = '<div class="img animate fadeInUp curchange" isproportion="false" animatename="fadeInUp"><div class="animate-contain">'
		+'<img src="http://img.weiye.me/zcimgdir/album/file_57d672a778ec0.jpg" alt="" style="width:100%;height:100%;"></div></div>';
}
imgEle.prototype = new comEle();
imgEle.prototype.add = function(parentel){
	var _img = $(this.html),
		_imgs = $('#ittwrap .img');

	_img.css({
		'position': 'absolute',
		'left': "25%",
		'top': this.getTop(50) + 'px',
		'width': '165px',
		'height': '165px'
	}).attr('el_name' , '图片' + (_imgs.length + 1));
	$(parentel).append(_img);
	dragElement(_img);

	_img.trigger('mousedown');
	$('#img-change').trigger('click');

	return _img ;
}
imgEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange"),
		_img = _curch.children('.animate-contain').children('img');

	var imgurl = _img.attr('src'),
		bgc = _img.css("background-color") || "",
		op = _img.css("opacity");

	if(imgurl){
		$("#img-img").attr('src', imgurl ).css("background-color",bgc);
	}else{
		$("#img-img").attr('src','').css("background-color",bgc);
	}

	if(_curch.attr("isproportion") == "true"){
		$("#img-proportion").prop('checked', true);
	}else{
		$("#img-proportion").prop('checked', false);
	}
	if(_curch.attr('dynamic')){
		$('#img-dynamic').prop('checked', true);
	} else {
		$('#img-dynamic').prop('checked', false);
	}

}

/********
 *广告
 */

function advertEle(type){
	comEle.call(this, 110);
	this.html = '';
}
advertEle.prototype = new comEle();
advertEle.prototype.add = function(parentel, type, page){
	var _this = this,
		_advertData = advertModule.advertData, //广告模块中的存储对象
		advertStyle, //广告样式对应数字
		_advert; //装载的html
	_advertData["mark_id"] = parseInt(_advertData["mark_id"]) + 1;
	switch(type){
		case "bottomAdvert":
			page = 0;//默认尾部广告歌页数为0 
			console.log("暂无底部广告");
			break;
		case "imageAdvert":
			advertStyle = 2;
			_this.html = '<div class="advert ele-aspectRatio animate fadeInUp curchange" isproportion="false" animatename="fadeInUp" aspectRatio="1" advert-position="'+ _advertData["mark_id"] +'">'+
							'<div class="animate-contain">'+
								'<img src="'+cdnUrl+'/static/invitation-v2/images/logo.png" alt="" style="width:100%;height:100%;">'+
							'</div>'+
						'</div>';
			_advert = $(_this.html);
			_advert.css({
				'position': 'absolute',
				'left': "25%",
				'top': this.getTop(50) + 'px',
				'width': '160px',
				'height': '160px'
			}).attr('el_name' , '广告: 页数' + page);
			break;
		case "textAdvert":
			advertStyle = 3;
			_this.html = '<div class="advert animate curchange fadeInUp" animatename="fadeInUp" advert-position="'+ _advertData["mark_id"] +'">'+
							'<div class="animate-contain" style="color: rgb(0, 0, 0);padding: 0;min-height:20px;">'+
								'<p style="font-size: 16px;line-height: 1.5em;">预留给广告主的文字!</p>'+
							'</div>'+
						'</div>';
			_advert = $(_this.html);
			_advert.css({
				'position': 'absolute',
				'left': "0%",
				'top': this.getTop(50) + 'px'
			}).attr('el_name' , '广告: 页数' + page);
			break;
		case "imageTextAdvert":
			advertStyle = 1;
			_this.html = '<div class="advert ele-aspectRatio animate fadeInUp curchange" isproportion="false" animatename="fadeInUp" aspectRatio="1"  advert-position="'+ _advertData["mark_id"] +'">'+
							'<div class="animate-contain">'+
								'<img class="layout-1" src="'+cdnUrl+'/static/invitation-v2/images/logo.png" alt="">'+
								'<p class="layout-1" style="font-size: 16px;line-height: 1.5em;">预留给广告主的文字!</p>'+
							'</div>'+
						'</div>';
			_advert = $(_this.html);
			_advert.css({
				'position': 'absolute',
				'left': "25%",
				'top': this.getTop(50) + 'px',
				'width': '160px',
				'height': '160px'
			}).attr('el_name' , '广告: 页数' + page);
			break;
	}
	// 记录添加信息并显示tab
	if (_advertData["common"] == undefined) {
		_advertData["common"] = {
			"industry": [],
			"area": []
		}
	}
	var name = $("#advert-name").val();
	// 记录广告信息
	var addAdvertInfo = {
		"name": name, // 广告名称
		"front_position_id": _advertData["mark_id"], // 前端生成的位置标识id(页数)
		// "position_page": page, // 位置标识(页数)
		"region_id": _advertData["common"]["industry"], //(区域id 只传省级id过来就行了 数组 如果选择全部 就不用传这个字段)
		"profession_id": _advertData["common"]["area"], //(行业id 就是上面那个接口获取到的数据里的id 传数组 选全部就不传这个字段)
		"style": advertStyle, //广告样式 1-图文 2-图片 3-文字 必填
		"image_ratio": 1 //image_ratio (默认1) 图片比例 1-1:1 2-4:3 3-3:4 4-16:9 如果style是图文或者图片 这一项需要填 如果是文字类型 这项不用传
	};
	$("#advert-name").val(""); //清空广告名称输入框
	if (type == "imageTextAdvert") {
		addAdvertInfo["layout"] = 1;
	}
	if (_advertData["advertInfo"] == undefined) {
		_advertData["advertInfo"] = [];
	}
	_advertData["advertInfo"].push(addAdvertInfo);
	_advertData["advertInfo"].sort(function(object1, object2){
		var value1 = object1["front_position_id"];
		var value2 = object2["front_position_id"];
		return value1 - value2;
	});
	if(_advertData["num"] < 3) {
		_advertData["num"]++;
	}
	$("#page-list>li.active").addClass("advert-position-"+_advertData["mark_id"]);//加类名(后续决定是否改为设属性)
	advertModule.hideAttrSet(); //隐藏广告属性设置
	$(parentel).append(_advert); //装载广告
	dragElement(_advert); //触发拖拽
	_advert.trigger('mousedown'); //触发点击
	return _advert ;
}
advertEle.prototype.show = function(){
	advertModule.init();
}

/********
 *背景
 */

function bgEle(){
	this.html = '';
}
bgEle.prototype.add = function(parentel){
	return ;
}
bgEle.prototype.show = function(){
	var _page = $("#ittwrap .page"),
		_bg , _bgColor = '',
		_bgAnimate = $("#ittwrap").find('.background-animate'),
		_datavalue = '';

	if(_bgAnimate.length > 0){
		_bg = _bgAnimate.find('img').attr("src");
		_datavalue = _bgAnimate.attr("animatename");

		$("#bg-anitime-wrap").removeClass('hide');

		var anitime = _bgAnimate.attr("data-animation-style");
		if(anitime){
			anitime = JSON.parse(anitime);

			var duration = parseFloat(anitime.duration) || 2,
				delay = parseFloat(anitime.delay) || 0.2;

			$("#control-bgde").slider("value" , delay);
			$("#control-bgde-i").val(delay);
			$("#control-bgdu").slider("value" , duration);
			$("#control-bgdu-i").val(duration);
		}

	}else{
		_bg = _page.css("background-image");
		_datavalue = "none";

		if(/url/.test(_bg)){
			_bg = (_bg.replace(/"/g , '').match(/url\(([\W\w]+)\)/))[1];
		}else{
			_bgColor = _page.css("background-color") || "";
			_bg = cdnUrl + '/static/pc/invitation/img/kong.png';
		}

		$("#bg-anitime-wrap").addClass('hide');
	}
	$("#bg-img").attr('src', _bg).css("background-color",_bgColor);

	$("#bg-animate").children('span[data-value="'+ _datavalue +'"]').addClass('active').siblings().removeClass('active');
}

/********
 *文字
 */

function textEle(){
	comEle.call(this, 300);	
	this.html = '<div class="animate text-new text_edit curchange fadeInUp" animatename="fadeInUp"><div class="animate-contain" style="color: rgb(0, 0, 0);padding: 0;min-height:20px;">'
		+'<p style="font-size: 16px;line-height: 1.5em;">编辑你所需要的!</p></div></div>';
}
textEle.prototype = new comEle();
textEle.prototype.add = function(parentel){
	var _text = $(this.html),
		_texts = $('#ittwrap .text_edit');
	_text.css({
		'position': 'absolute',
		'left': "0%",
		'top': this.getTop(50) + 'px'
	}).attr('el_name' , '文字' + (_texts.length + 1));
	$(parentel).append(_text);
	dragElement(_text);

	// var _font = $("#fontvalue").attr("data-value");
	// if(_font != '无'){
	// 	_text.addClass('artfont');
	// 	_text.find('.animate-contain').attr({
	// 		"artfonttext" : _font,
	// 		"artfont" : _text.find('.animate-contain').html()
	// 	}).css({
	// 		"font-family" :  '"' + _font + '"'
	// 	});
	// }

	_text.trigger('mousedown');

	setTimeout(function(){
		textNewrich.edit.focus();
		document.execCommand('selectAll', false, null);
	}, 500);

	return _text;
}
textEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange"),
		_ani = _curch.children('.animate-contain'),
		_html = '';

	_ani.css("padding" , '0');
	$("#fontvalue").val('字体：微软雅黑(默认)').attr('data-value' , "无").removeAttr('accesskey');
	if(_curch.hasClass('artfont')){

		_html = _ani.attr("artfont") || '';
		if(_ani.attr("artfonttype") && _ani.attr("artfonttype") != ''){

			var _li = $("#pcfont-list").find('li[data-type="' +_ani.attr("artfonttype")+ '"]');
			$("#fontvalue").val(_li.find('span').text()).attr("data-value" , _li.attr("data-value"));

		}else if(/weiye/.test(_ani.attr("artfonttext"))){

			var _li = $("#pcfont-list").find('li[data-value="' +_ani.attr("artfonttext")+ '"]');
			$("#fontvalue").val(_li.find('span').text()).attr({
				"data-value" : _li.attr("data-value") ,
				'accesskey' : _li.attr("AccessKey")
			});

		}else{
			$("#fontvalue").val(_ani.attr("artfonttext")).attr("data-value" , _ani.attr("artfonttext"));
		}

	}else if(_curch.hasClass('textanimate')){
		_html = _ani.attr("textcontent");
	}else{
		_html = _ani.html();
	}

	textNewrich.setContent(_html);

}

/********
 *按钮
 */

function btnEle(){
	comEle.call(this, 300);
	this.html = '<div class="sectbtn ${btnc} ${judgeclass} animate curchange fadeInUp" animatename="fadeInUp" el_name="${name}" btnclass="sectbtn ${btnc}" style="top:80%;left:35%;" ${href} ><div class="animate-contain" style="color: rgb(255, 255, 255);">${icon}${text}</div>${outerdiv}</div>';

	this.type = {
		basicbtn : {
			btnc : 'btncss1',
			judgeclass : 'btn',
			href : 'href="tel:12345"',
			icon : '',
			text : '通用按钮',
			name : '按钮',
			outerdiv : ''
		},
		'quick-dial' : {
			btnc : 'btncss9',
			judgeclass : 'btn',
			href : 'href="tel:12345"',
			icon : '<label class="btn-icon"></label>',
			text : '联系我们',
			name : '按钮',
			outerdiv : ''
		},
		'jump-url' : {
			btnc : 'btncss10',
			judgeclass : 'btn',
			href : 'href="http://www.zhichiwangluo.com"',
			icon : '<label class="btn-icon"></label>',
			text : '网站网址',
			name : '按钮',
			outerdiv : ''
		},
		article : {
			btnc : 'btncss15',
			judgeclass : 'btn',
			href : '',
			icon : '<label class="btn-icon2"></label>',
			text : '讨论区',
			name : '讨论区',
			outerdiv : ''
		},
		goods : {
			btnc : 'goods-buy-btn',
			judgeclass : 'btn',
			href : '',
			icon : '<label class="btn-icon2"></label>',
			text : '立即购买',
			name : '商品买卖',
			outerdiv : ''
		},
		gzh : {
			btnc : 'btncss17',
			judgeclass : 'btn',
			href : '',
			icon : '<label class="btn-icon2"></label>',
			text : '关注',
			name : '关注',
			outerdiv : '<div class="btn-focus-animate"><em></em></div>'
		},
		pop : {
			btnc : 'btncss1',
			judgeclass : 'pop',
			href : 'data-pop-text="<p>弹窗内容编辑</p>"',
			icon : '',
			text : '弹窗',
			name : '弹窗',
			outerdiv : ''
		},
		rotate : {
			btnc : 'btncss10',
			judgeclass : 'btn',
			href : '',
			icon : '<label class="btn-icon"></label>',
			text : '大转盘抽奖',
			name : '大转盘抽奖',
			outerdiv : ''
		}
	};
};
btnEle.prototype = new comEle();
btnEle.prototype.add = function(parentel , btntype){
	btntype = btntype || 'basicbtn';
	var _btn = this.parseTemplate( this.type[btntype] ),
		_btns = btntype == 'pop' ? $('#ittwrap .pop') : $('#ittwrap .btn');

	_btn = $(_btn);
	_btn.css({
		'position': 'absolute',
		'left': "0%",
		'top': this.getTop(50) + 'px'
	}).attr('el_name' , _btn.attr("el_name") + (_btns.length + 1));

	dragElement(_btn);
	$(parentel).append(_btn);

	_btn.trigger('mousedown');

	if(btntype == 'quick-dial'){
		$("#s-link-btn").trigger('click');
	}

	return _btn;
}
btnEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");

	$("#btn-text-input").val(_curch.find('.animate-contain').text());

	var _label = _curch.children('.animate-contain').children('label');
	if(_label.length && _label.hasClass('btn-svg')){
		var data_id = _label.find('use').attr("xlink:href");
		if(data_id){
			data_id = data_id.split('#')[1];
		}else{
			data_id = 'icon-' + _label.children('svg').children('title').text();
		}
		
		var _span = $("#btn-svg-wrap").children('span[data-id="'+ data_id +'"]');
		_span.addClass('active').siblings().removeClass('active');
		$("#btn-svg-color").spectrum("set", _label.css("color"));
	}else{
		$("#btn-svg-wrap").children('span').removeClass('active');
		$("#btn-svg-color").spectrum("set", '#fff');
	}

}
btnEle.prototype.parseTemplate = function( data ){
	var html = this.html.replace(/\$\{(\w+)\}/g, function($0, $1){
		switch($1){
			default : 	return data[$1] || '';
		}
	});
	return html;
}

/********
 *侧边栏
 */

function asideEle(){
	this.html = '';
}
asideEle.prototype.add = function(parentel){
	return ;
}
asideEle.prototype.show = function(){
	$("#aside-shadow").addClass('show');
	return ;
}

/********
 *tab
 */
function tabEle(){
	this.html = '';
}
tabEle.prototype.add = function(parentel){
	return ;
}
tabEle.prototype.show = function(){
	

}

/********
 *弹幕
 */
function barrageEle(){
	comEle.call(this, 100);
	this.html = '<div class="barrage animate curchange fadeInUp" animatename="fadeInUp"><div class="animate-contain">'
		+'<div data-dm-id="" class="barrage-container"></div><div class="barrage-bottom"><input '
		+'placeholder="快输入弹幕吧" class="barrage-input">'
		+'<button class="barrage-submit">发表</button></div></div></div>';
}
barrageEle.prototype = new comEle();
barrageEle.prototype.add = function(parentel){
	var id = getValidId('danmu'),
		_barrage = $(this.html);

	_barrage.find('.barrage-container').attr("data-dm-id" , id);
	_barrage.css({
		position: 'absolute'
		,top: this.getTop(180) + 'px'
		,height: 200
		,width: '100%'
	}).attr('el_name' , '弹幕' + id );
	
	dragElement(_barrage);
	$(parentel).append(_barrage);

	danmuInstance = _barrage.find('.barrage-container').danmu(danmupara);
	danmuInstance.start();
	_barrage.find('.barrage-container').data('danmuInstance', danmuInstance).attr('data-count', 3);

	_barrage.trigger('mousedown');
	return _barrage;
}
barrageEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");

	$('#barrage-count').val(_curch.find('.barrage-container').attr('data-count') || 3);
	$('#barrage-text').val(_curch.find('.barrage-input').attr('placeholder'));
	var _datastyle = _curch.find('.barrage-container').attr("data-style") || 'barrage-default';
	$("#barrage-style").children('span[data-style="'+ _datastyle + '"]').addClass('active').siblings().removeClass('active');

	$("#barrage-name").val(_curch.attr('el_name'));
}

/********
 *投票
 */
function voteEle(){
	comEle.call(this, 300);
	this.html = '<div class="control cast-vote animate curchange fadeInUp" animatename="fadeInUp" questionId=""><div class="animate-contain"><h2 num=1><span class="vote-title">你如何评价他的表现？</span><small>(单选)</small></h2>'+
				'<ul><li><p><span class="vote-opt">选项1</span><span class="vote-count"><small></small><small></small></span><b></b></p><p><span></span></p></li>'+
				'<li><p><span class="vote-opt">选项2</span><span class="vote-count"><small></small><small></small></span><b></b></p><p><span></span></p></li></ul>'+
				'<button>投给他</button></div></div>';
}
voteEle.prototype = new comEle();
voteEle.prototype.add = function(parentel){
	var _vote = $(this.html),
		qid = utilities.uniqueNum(),
		_votes = $('#ittwrap .cast-vote');

	_vote.addClass('cast-vote'+ qid ).attr({
		"questionId" : qid ,
		"el_name" : '投票' + (_votes.length + 1)
	}).css({
		top: this.getTop(200) + 'px',
		left: 0,
		width: '100%'
	});

	$(parentel).append(_vote);
	dragElement(_vote);

	_vote.trigger('mousedown');
	return _vote;

}
voteEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange"),
		_ani = _curch.children('.animate-contain');

	$("#vote-name").val(_ani.find("h2>span").text());
	$("#vote-count").val(_ani.children("h2").attr("num"));
	var _list = '';
	$.each(_ani.find("ul>li"), function(index, val) {
		_list += '<li class="opt-li"><label class="st-l4">选项'+ (index + 1)  +'</label><input class="com-input" type="text" value="'+$(val).find("span").eq(0).text()+'">'
			+'<span class="vote-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
	});

	$("#vote-ul").empty().append(_list);

	var _datastyle = _curch.attr("data-style") || "vote-default"; 
	$('#vote-style').children('.option-btn[data-style="'+ _datastyle +'"]').addClass('active').siblings().removeClass('active');

	$('#vote-btn-name').val(_ani.children('button').text());

}

/********
 *地图
 */
function mapEle(){
	comEle.call(this, 200);
	this.html = '<div class="control cont-map animate curchange more_jump_run" animatename="more_jump_run" mapId="">'
		+'<div class="animate-contain"><p class="map-icon"></p><p></p></div></div>';
}
mapEle.prototype = new comEle();
mapEle.prototype.add = function(parentel){
	var _map = $(this.html),
		qid = utilities.uniqueNum(),
		_maps = $('#ittwrap .cont-map');

	_map.addClass('cont-map'+ qid).attr({
		"mapId" : qid ,
		"el_name" : '地图' + (_maps.length + 1)
	}).css({
		top: this.getTop(50),
		left: 0,
		width: '100%'
	});

	$(parentel).append(_map);
	dragElement(_map);

	_map.trigger('mousedown');
	return _map;
}
mapEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");

	$("#map-input").val(_curch.find(".animate-contain p").eq(1).text());

	if(_curch.find('.map-wrap').length > 0){
		$("#map-showmap").prop('checked' , true);
	}else{
		$("#map-showmap").prop('checked' , false);
	}
	mapModule.initSetMap();

	if(_curch.attr("lat")){
		var lat = _curch.attr("lat"),
			lng = _curch.attr("lng");
		mapModule.showGeocoder( lat , lng );
	}else{
		mapModule.searchLocalCity();
	}
}

/********
 *点赞
 */
function likeEle(){
	comEle.call(this, 100);
	this.html = '<div class="control cast-like animate curchange fadeInUp" animatename="fadeInUp" likeId=""><div class="animate-contain">'
	+'<span class="like-svg"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/zhichi_frontend/static/pc/invitation/svg/symbol-btn.svg#icon-love"></use></svg></span><p>0</p></div></div>';
}
likeEle.prototype = new comEle();
likeEle.prototype.add = function(parentel){
	var _like = $(this.html),
		qid = utilities.uniqueNum();

	_like.addClass('cast-like'+ qid).attr({
		"likeId" : qid,
		'el_name': '点赞' + qid
	}).css({
		top: this.getTop(50) + 'px',
		left: '125px',
		width: '80px'
	});

	$(parentel).append(_like);
	dragElement(_like);

	_like.trigger('mousedown');
	return _like;
}
likeEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");

	$('#like-name').val(_curch.attr("el_name"));

	var _span = _curch.children('.animate-contain').children('span');
	if(_span.hasClass('like-svg')){
		var _svgid = _span.find('use').attr("xlink:href").split('#')[1];
		$("#like-style").children('span[data-id="'+ _svgid +'"]').addClass('active').siblings().removeClass('active');
		$("#like-color-be").spectrum("set", _span.attr("data-color-be") || '#9c9c9c');
		$("#like-color-af").spectrum("set", _span.attr("data-color-af") || '#ff0000');
	}else{
		$("#like-style").children('span').removeClass('active');
		$("#like-color-be").spectrum("set", '#9c9c9c');
		$("#like-color-af").spectrum("set", '#ff0000');
	}
	var _datastyle = _curch.attr("data-style") || 'like-lr';
	$("#like-layout").children('span[data-style="'+ _datastyle +'"]').addClass('active').siblings().removeClass('active');

}

/********
 *视频
 */
function videoEle(){
	comEle.call(this, 150);
	this.html = '<div class="control cont-video animate fadeInUp curchange" animatename="fadeInUp"><div class="animate-contain"></div></div>';
}
videoEle.prototype = new comEle();
videoEle.prototype.add = function(parentel){
	var _video = $(this.html),
		_videos = $('#ittwrap .cont-video');

	_video.css({
		top: this.getTop(100) + 'px'
	}).attr("el_name" , "视频" + (_videos.length + 1));

	$(parentel).append(_video);
	dragElement(_video);

	_video.trigger('mousedown');
	return _video;
}
videoEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");
	$("#video-code").val(_curch.find("iframe").prop("outerHTML"));

}

/********
 *图集
 */
function imgplayEle(){
	comEle.call(this, 0);
	this.de_opt = {
		delay: 4000,
		pagination : true,
		transitions:["slide"],
		autoplay:true,
		width : 330,
		height : 156
	};
	this.html = '<div class="control slide-new animate fadeInUp curchange fadeInCenter" style="position:absolute;top:0;left:0;" animatename="fadeInCenter">'
				 + '<div class="animate-contain" id="" data-initial=' +JSON.stringify(this.de_opt)+ '>'
				 + '<section class="flux-slide " data-ele="" '
				 + 'data-src="'+cdnUrl+'/static/pc/invitation/images/sample1.png '+cdnUrl+'/static/pc/invitation/images/sample2.png '+cdnUrl+'/static/pc/invitation/images/sample3.png ">'
				 + '<img src="'+cdnUrl+'/static/pc/invitation/images/sample1.png" alt=""><img src="'+cdnUrl+'/static/pc/invitation/images/sample2.png" alt="">'
				 + '<img src="'+cdnUrl+'/static/pc/invitation/images/sample3.png" alt=""></section></div></div>';
}
imgplayEle.prototype = new comEle();
imgplayEle.prototype.add = function(parentel){
	var _slide = $(this.html),
		len = utilities.uniqueNum(),
		id = 'slide'+ len,
		_slides = $('#ittwrap .slide-new');

	_slide.children('.animate-contain').attr("id" , id).children('section').addClass('id').attr("data-ele",id);
	_slide.attr("el_name" , '图集' + (_slides.length + 1)).css({
		top: this.getTop(150) + 'px',
		width : '100%',
		height : '156px'
	});

	dragElement(_slide);
	$(parentel).append(_slide);

	imgplayModule.sliderArr[id] = new flux.slider(_slide.find('section'), this.de_opt);

	_slide.trigger('mousedown');
	return _slide;
}
imgplayEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		list = _curch.find('ul');

	$('#imgplay-list').children('.imgplay-item').remove();

	var _li ='';
	if(_curch.hasClass('slide-new')){
		var _sc = _curch.children('.animate-contain').children('section'),
			_src = _sc.attr('data-src'),
			_link = _sc.attr('data-link');
		if( _src ){
			var src_arr = _src.trim().split(' '),
				linkarr = _link ? _link.trim().split(' ') : [];
			for (var i = 0; i < src_arr.length; i++) {
				var _l = '';
				if(linkarr != 'none' && linkarr[i] != 'none' && linkarr[i]){
	              _l = 'data-link="'+ linkarr[i] +'"';
	            }
				_li += '<li class="imgplay-item" '+_l+'><img src="' + src_arr[i] + '" alt=""><div class="imgplay-opt"><span class="imgplay-link iconfont icon-link2"></span><span class="imgplay-delete iconfont icon-trash"></span></div></li>'
			}
		}
	} else {
		$.each( list.children('li'), function(index, item) {
			_li += '<li class="imgplay-item"><img src="' + $(item).find('img').attr('src') + '" alt=""><div class="imgplay-opt"><span class="imgplay-link iconfont icon-link2"></span><span class="imgplay-delete iconfont icon-trash"></span></div></li>'
		});
	}
	$('#imgplay-list').append(_li);

	var list_info = _curch.children('.animate-contain').attr('data-initial');
	list_info = JSON.parse(list_info);
	$('#flux-type').val(list_info.transitions ? list_info.transitions[0]:'slide');
	(list_info.autoSwipe || list_info.autoplay) ? $('#imgplay-auto').prop("checked" , true) : $('#imgplay-auto').prop("checked" , false);

	var time = list_info.speed ? list_info.speed/1000 : list_info.delay/1000;
	$("#imgplay-time").slider( "value", time);
	$("#imgplay-time-i").val(time);

	if($('#imgplay-auto').prop('checked')){
		$("#imgplay-time-wrap").removeClass('hide');
	}else{
		$("#imgplay-time-wrap").addClass('hide');
	}

}

/********
 *表单
 */
function formEle(){
	this.html = '';
}
formEle.prototype.add = function(parentel){
	return ;
}
formEle.prototype.show = function(){
	return ;
}

/********
 *表单单选
 */
function radioEle(){
	this.html = '<div class="form-radio form-ele animate curchange fadeInUp" data-ty="radio" animatename="fadeInUp"><div class="animate-contain">'
		+ '<div data-id="${id}" class="form-ele-content-wrap form-necessary-item"><h2><span class="radio-edit ittwrap-form-item-title">单选'
		+ '</span><small> (单选)</small></h2><ul class="added-opt-container"><li class="form-option"><input'
		+ ' name="radio_name${id}" type="radio"><img class="radio-before-select"'
		+ ' src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuang.svg"><img class="radio-after-select"'
		+ ' src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuangyixuan.svg"><label class="radio-edit"'
		+ '>选项1</label></li><li class="form-option"><input name="radio_name${id}" type="radio">'
		+ '<img class="radio-before-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuang.svg">'
		+ '<img class="radio-after-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuangyixuan.svg"><label class="radio-edit"'
		+ '>选项2</label></li></ul></div></div></div>';
}
radioEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;

	var id = getValidId('form-ele'),
		_ra = this.parseTemplate({id:id}),
		_ras = $('#ittwrap .form-radio');

	_ra = $(_ra);

	_ra.css({
		position: 'absolute'
		,left: "20%"
		,top: "30%"
		,width: '60%'
	}).attr("el_name" , '单选' + (_ras.length + 1));

	dragElement(_ra);
	$(parentel).append(_ra);

	istrigger && _ra.trigger('mousedown');
	return _ra;
}
radioEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange');

	$("#radio-title").val(_curch.find('h2 > .radio-edit').text());

	var _li = '';
	_curch.find('.form-option').each(function(index, el) {
		_li += '<li class="opt-li"><label class="st-l4">选项'+(index + 1)+'</label>'
		+'<input class="com-input" type="text" value="'+$(el).children('.radio-edit').text()
		+'"><span class="radio-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
	});

	$("#radio-ul").html( _li );

	var n = $("#change-radio").find('.form-necessary');
	if(_curch.find('.form-ele-content-wrap').hasClass('form-necessary-item')){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}

}
radioEle.prototype.parseTemplate = function( data ){
	var html = this.html.replace(/\$\{(\w+)\}/g, function($0, $1){
		switch($1){
			default : 	return data[$1] || '';
		}
	});
	return html;
}

/********
 *表单多选
 */
function checkboxEle(){
	this.html = '<div class="form-checkbox form-ele animate curchange fadeInUp" data-ty="checkbox" animatename="fadeInUp"><div class="animate-contain">'
		+ '<div data-id="" class="form-ele-content-wrap form-necessary-item"><h2><span class="checkbox-edit ittwrap-form-item-title">多选'
		+ '</span><small data-num="2"> (最多选<b>2</b>项)</small></h2><ul class="added-opt-container"><li class="form-option">'
		+ '<input type="checkbox"><img class="checkbox-before-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuang.svg">'
		+ '<img class="checkbox-after-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuangyixuan.svg"><label class="checkbox-edit"'
		+ '>选项1</label></li><li class="form-option"><input type="checkbox"><img class="checkbox-before-select"'
		+ ' src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuang.svg"><img class="checkbox-after-select"'
		+ ' src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuangyixuan.svg"><label class="checkbox-edit"'
		+ '>选项2</label></li></ul></div></div></div>';
}
checkboxEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;

	var id = getValidId('form-ele'),
		_check = $(this.html),
		_checks = $('#ittwrap .form-checkbox');

	_check.find('.form-ele-content-wrap').attr("data-id" , id);
	_check.css({
		position: 'absolute'
		,left: "20%"
		,top: "50%"
		,width: '60%'
	}).attr("el_name" , '多选' + (_checks.length + 1));

	dragElement(_check);
	$(parentel).append(_check);

	istrigger && _check.trigger('mousedown');
	return _check;
}
checkboxEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		n = $("#change-checkbox").find('.form-necessary'),
		_li = '';

	$("#checkbox-title").val(_curch.find('h2 > .checkbox-edit').text());
	$("#checkbox-count").val(_curch.find('h2').children('small').attr("data-num"));

	_curch.find('.form-option').each(function(index, el) {
		_li += '<li class="opt-li"><label class="st-l4">选项'+(index + 1)+'</label>'
		+'<input class="com-input" type="text" value="'+$(el).children('.checkbox-edit').text()
		+'"><span class="checkbox-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
	});

	$("#checkbox-ul").html( _li );

	if(_curch.find('.form-ele-content-wrap').hasClass('form-necessary-item')){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}
}



/********
 *表单输入框
 */
function inputEle(){
	this.html = '<div class="form-input form-ele animate curchange fadeInUp" data-ty="input" animatename="fadeInUp"><div class="animate-contain">'
		+ '<div data-id="" class="form-ele-content-wrap form-necessary-item"><h2><span class="input-edit ittwrap-form-item-title">'
		+ '输入框</span></h2><input type="text" value="" disabled="disabled"></div><div class="form-ele-mask"></div></div></div>';
}
inputEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;

	var id = getValidId('form-ele'),
		_input = $(this.html),
		_inputs = $("#ittwrap .form-input");

	_input.find('.form-ele-content-wrap').attr("data-id" , id);
	_input.css({
		position: 'absolute'
		,left: "20%"
		,top: "10%"
		,width: '60%'
	}).attr("el_name" , '输入框' + (_inputs.length + 1));

	dragElement(_input);
	$(parentel).append(_input);

	istrigger && _input.trigger('mousedown');
	return _input;
}
inputEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange');

	if(_curch.find('input').length > 0){
		$("#input-type").children('input[data-type="single"]').prop('checked', true);
	}else{
		$("#input-type").children('input[data-type="multiple"]').prop('checked', true);
	}

	$("#input-t").val(_curch.find('.input-edit').text());

	var n = $("#change-input").find('.form-necessary');
	if(_curch.find('.form-ele-content-wrap').hasClass('form-necessary-item')){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}

	$("#input-t-color").spectrum("set", _curch.find('h2').css('color'));
	$("#input-i-color").spectrum("set", _curch.find("input").css('color'));

}

/********
 *表单选择框
 */
function selectEle(){
	this.html = '<div class="form-select form-ele animate curchange fadeInUp" data-ty="select" animatename="fadeInUp"><div class="animate-contain">'
		+ '<div data-id="" class="form-ele-content-wrap form-necessary-item"><select class="added-opt-container">'
		+ '<option class="select-edit ittwrap-form-item-title">下拉框</option>'
		+ '<option class="select-edit form-option">选项1</option>'
		+ '<option class="select-edit form-option">选项2</option></select></div><div class="form-ele-mask"></div></div></div>';
}
selectEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;

	var id = getValidId('form-ele'),
		_select = $(this.html),
		_selects = $("#ittwrap .form-select");

	_select.find('.form-ele-content-wrap').attr("data-id" , id);
	_select.css({
		position: 'absolute'
		,left: "20%"
		,top: "20%"
		,width: '60%'
	}).attr("el_name" , '选择框' + (_selects.length + 1));

	dragElement(_select);
	$(parentel).append(_select);

	istrigger && _select.trigger('mousedown');
	return _select;
}
selectEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		n = $("#change-select").find('.form-necessary'),
		_li = '';

	$("#select-title").val(_curch.find('.ittwrap-form-item-title').text());

	_curch.find('.form-option').each(function(index, el) {
		_li += '<li class="opt-li"><label class="st-l4">选项'+(index + 1)+'</label>'
		+'<input class="com-input" type="text" value="'+$(el).text()
		+'"><span class="select-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
	});

	$("#select-ul").html( _li );

	if(_curch.find('.form-ele-content-wrap').hasClass('form-necessary-item')){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}

}

/********
 *表单图片上传
 */
function imguploadEle(){
	this.html = '<div class="form-imgupload form-ele animate curchange fadeInUp" data-ty="imgupload" animatename="imgupload">'
		+ '<div class="animate-contain"><div data-id="" class="form-ele-content-wrap form-necessary-item">'
		+ '<div class="form-plus-wrap form-plus-wrap-new"><div class="imgupload-text"><p>+</p><h2 class="imgupload-edit ittwrap-form-item-title">上传图片</h2></div><div class="form-img-wrap"><img>'
		+ '<input type="file" accept="image/jpg,image/jpeg, image/gif,image/png, image/bmp, image/jp2, image/x-ms-bmp, image/x-png"></div></div>'
		+ '</div><div class="form-ele-mask"></div></div></div>';
}
imguploadEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;

	var id = getValidId('form-ele'),
		_imgup = $(this.html),
		_imgups = $("#ittwrap .form-imgupload");

	_imgup.find('.form-ele-content-wrap').attr("data-id" , id);
	_imgup.css({
		position: 'absolute'
		,left: '20%'
		,top: '20%'
		,width: 200
		,height: 150
	}).attr("el_name" , '图片上传' + (_imgups.length + 1));

	dragElement(_imgup);
	$(parentel).append(_imgup);

	istrigger && _imgup.trigger('mousedown');
	return _imgup;
}
imguploadEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		n = $("#change-imgupload").find('.form-necessary');

	$("#imgupload-title").val(_curch.find('.imgupload-edit').text());


	if(_curch.find('.form-ele-content-wrap').hasClass('form-necessary-item')){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}

}

/********
 *表单提交按钮
 */
function submitEle(){
	this.html = '<div class="form-submit-btn form-ele animate curchange fadeInUp" id=""'
		+ 'data-ty="submit" animatename="fadeInUp"><div class="animate-contain">提交</div></div>';
}
submitEle.prototype.add = function(parentel , istrigger){
	istrigger = istrigger == undefined ? true : istrigger;
	
	var id = getValidId('form-ele'),
		_submit = $(this.html);

	_submit.attr({
		"id" : 'f_'+id ,
		"el_name" : '提交按钮'
	}).css({
		position: 'absolute'
		,left: "20%"
		,top: "70%"
		,width: '60%'
	});

	dragElement(_submit);
	$(parentel).append(_submit);

	istrigger && _submit.trigger('mousedown');
	return _submit;
}
submitEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		n = $("#change-submit").find('.form-submit');

	$("#submit-title").val(_curch.children('.animate-contain').text());
	$("#submit-t").val(_curch.attr('tip-text') || "");

	if(_curch.attr('data-repeat') == '1'){
		n.prop('checked', true);
	}else{
		n.prop('checked', false);
	}

}
/********
 *表单快速生成
 */
function formtemplateEle(){
	this.html = '';
}
formtemplateEle.prototype.add = function(parentel){
	eleObjects.select.add(parentel , false );
	eleObjects.radio.add(parentel , false );
	eleObjects.checkbox.add(parentel , false);
	eleObjects.submit.add(parentel , false );
	eleObjects.input.add(parentel);
}
formtemplateEle.prototype.show = function(parentel){
	
}


/********
 *栏目
 */
function navEle(){
	this.html = '<div class="nav animate curchange"><div class="animate-contain">'
		+'<div class="nav-links"><a href="javascript:;"><img class="before-tap-icon"'
		+' src="http://img.weiye.me/zcimgdir/album/file_555d8eacbfe10.png">'
		+'<span>栏目1</span></a><a href="javascript:;"><img class="before-tap-icon"'
		+' src="http://img.weiye.me/zcimgdir/album/file_555d8ea7588e5.png">'
		+'<span>栏目2</span></a><a href="javascript:;"><img class="before-tap-icon"'
		+' src="http://img.weiye.me/zcimgdir/album/file_555d8ea03f3b1.png">'
		+'<span>栏目3</span></a></div></div><div class="nav-mask"></div></div>';
}
navEle.prototype.add = function(parentel){
	var _nav = $(this.html),
		_navs = $("#ittwrap .nav");

	_nav.css({
		top: '40%',
		width: '100%',
	}).attr("el_name" , "栏目" + (_navs.length + 1));

	dragElement(_nav);
	$(parentel).append(_nav);

	_nav.trigger('mousedown');
	return _nav;
}
navEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		html = '';

	_curch.find('a').each(function(index, el){
		html += '<li><div class="n-li-div1"><input class="com-input" type="text" value="'+ $(el).children('span').text()
		 +'"></div><div class="n-li-div2"><span><img src="'+$(el).children('.before-tap-icon').attr('src')+'" alt=""></span></div>'
		 +'<div class="n-li-div3">添加链接</div><div class="n-li-div4"><span class="iconfont icon-delete"></span></div></li>';
	});
	$('#nav-ul').html(html);

	if(_curch.attr('data-role')){
		$('#nav-quan').prop('checked' , true);
	}else{
		$('#nav-quan').prop('checked' , false);
	}


}

/********
 *图形
 */
function shapeEle(){
	this.html = '<div class="shape animate fadeInUp curchange" animateName="fadeInUp"><div class="animate-contain"> </div></div>';
}
shapeEle.prototype.add = function(parentel , svg){
	var _shape = $(this.html),
		_shapes = $("#ittwrap .shape");

	_shape.children('.animate-contain').append(svg);
	_shape.css({
		position: 'absolute',
		left: "25%",
		top: "20%",
		width: '30%',
		height: '19%'
	}).attr("el_name" , "图形" + (_shapes.length + 1));

	$(parentel).append(_shape);
	dragElement(_shape);

	_shape.trigger('mousedown');
	return _shape;
}
shapeEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_svg = _curch.children('.animate-contain').children('svg'),
		_path = _svg.find('*').not("g").eq(0);

	var _stroke_width = Math.round(parseFloat(_path.attr('stroke-width'))) || 0,
		_stroke = _path.attr('stroke') || '#000',
		_fill = _path.attr('fill') || '#000';

	$("#control-shape").slider( "value", _stroke_width );
	$("#control-shape-i").val(_stroke_width);

	$("#color-shape").spectrum("set", _fill);
	$("#color-shapebo").spectrum("set", _stroke);
}

/********
 *svg动画
 */
function svgEle(){
	this.html = '<div class="svg animate curchange" ><div class="animate-contain"></div></div>';
}
svgEle.prototype.add = function(parentel , svg){
	var _svg = $(this.html),
		_svgs = $("#ittwrap .svg");

	var _s = $(svg);
	_s.attr("id" , 'svg' + utilities.uniqueNum());

	_svg.children('.animate-contain').append(_s);
	_svg.css({
		"height":'30%'
	}).attr({
		"timing_type":'delayed',
		"timing_duration": '2000',
		"timing_delay": '0',
		"timing_speedtype" : 'Linear',
		"timing_dasharray" : '100',
		"timing_dasharray2" : '100',
		"timing_loop" : false,
		"el_name" : "svg动画" + (_svgs.length + 1)
	});

	$(parentel).append(_svg);
	dragElement(_svg);

	_svg.trigger('mousedown');
	svgModule.showOneSVGAnimate(_svg);

	return _svg;
}
svgEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange");

	$("#svg-type").children('span[data-type="' + _curch.attr("timing_type") + '"]').addClass('active').siblings().removeClass('active');
	$("#svg-path").children('span[data-type="' + _curch.attr("timing_speedtype") + '"]').addClass('active').siblings().removeClass('active');

	var _duration = (3000 / parseInt(_curch.attr('timing_duration'))).toFixed(1),
		_delay = parseInt(_curch.attr('timing_delay')) / 1000,
		_dasharray = _curch.attr('timing_dasharray') || 100,
		_dasharray2 = _curch.attr('timing_dasharray2') || 100,
		_path = _curch.find("svg").find("*").not('g').eq(0),
		_stroke = _path.css("stroke") || _path.attr('stroke') || '#000',
		_strokeWidth = _path.css("stroke-width") || _path.attr('stroke-width') || 4;

	$("#svg-dasharray").slider("value" , _dasharray );
	$("#svg-dasharray-i").val( _dasharray );
	$("#svg-dashspace").slider("value" , _dasharray2 );
	$("#svg-dashspace-i").val( _dasharray2 );

	$("#svg-duration").slider("value" , _duration );
	$("#svg-duration-i").val( _duration );
	$("#svg-delay").slider("value" , _delay);
	$("#svg-delay-i").val(_delay);
	_strokeWidth = parseFloat(_strokeWidth);
	$("#svg-strokewidth").slider("value" , _strokeWidth);
	$("#svg-strokewidth-i").val(_strokeWidth);

	$("#color-svg").spectrum("set", _stroke);

	$("#svg-loop").prop("checked" , (_curch.attr('timing_loop') == "true") );

}

/********
 *弹窗
 */
function popEle(){
	this.html = '';
}
popEle.prototype.add = function(parentel){
	eleObjects.btn.add( parentel , 'pop');
}
popEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange');

	$("#pop-text-input").val(_curch.children('.animate-contain').text());
}

/********
 *照片投票
 */
function photovoteEle(){
	this.html = '<div class="photovote animate"><div class="animate-contain"><div class="photovote-wrap">'
	+ '<section class="photovote-actwrap active" type="act"><div class="photovote-theme"></div>'
	+ '<div class="photovote-a"><h3 class="photovote-h3"></h3><div class="photovote-desc"></div>'
	+ '<div class="photovote-statistics photovote-bgc"><div><p>参赛作品</p><p class="photovote-entries">123</p></div><div><p>累计投票</p><p class="photovote-votes">4567</p></div><div><p>访问次数</p><p class="photovote-Visits">123456</p></div></div>'
	+ '<div class="photovote-starttime"><span class="iconfont icon-time"></span>活动开始时间：<span class="photovote-starttime-span"></span></div>'
	+ '<div class="photovote-endtime"><span class="iconfont icon-time"></span>活动结束时间：<span class="photovote-endtime-span"></span></div>'
	+ '<div class="photovote-rule"><span class="iconfont icon-warning"></span><p class="photovote-rule-p"></p></div>'
	+ '<div class="photovote-search"><input class="photovote-searchbox" type="text" placeholder="请输入作者或者编号" /><button class="photovote-searchbtn photovote-bgc">搜索</button></div>'
	+ '<div class="photovote-list-wrap"><ul class="photovote-list" rownum="2"></ul></div></div></section>'
	+ '<section class="photovote-enrwrap" type="enr"></section>'
	+ '<section class="photovote-ordwrap" type="ord"></section>'
	+'</div><div class="photovote-tab"><a class="active photovote-bgc" type="act">活动</a><a type="enr">报名</a><a type="ord">排名</a></div></div></div>';
}
photovoteEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum();

	_html.attr({
		'id' : _id,
		"el_name" : "照片投票" + _id
	}).css({
		position: 'absolute',
		top: '0',
		left : '0'
	});

	photovoteModule.init( _html );
	phvSetModule.setList(_html , 2);

	$(parentel).append(_html);

	_html.trigger('mousedown');
	return _html;
}
photovoteEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange');

	var optc = photovoteModule.options.common_settings,
		opte = photovoteModule.options.vote_settings;

	$("#photovote-name").val( optc.title );
	$("#photovote-content").val( optc.description );
	$("#photovote-start")[0]._flatpickr.setDate( optc.start_date );
	$("#photovote-end")[0]._flatpickr.setDate( optc.end_date );
	$("#photovote-end").val(optc.end_date);
	$("#photovote-num").spinner( "value",  opte.vote_limit );
	$("#photovote-rl1").prop('checked' , (opte.vote_rule == 1) );
}

/********
 *可编辑文本
 */
function texteditboxEle(){
	comEle.call(this, 100);
	this.html = '<div class="animate texteditbox curchange fadeInUp" animatename="fadeInUp"><div class="animate-contain" style="border: 2px solid #3b99d7;">'
		+'<div class="texteditbox-editbox">在此处编辑内容</div></div></div>';
}
texteditboxEle.prototype = new comEle();
texteditboxEle.prototype.add = function(parentel){
	var _cmmbe = $(this.html),
		_id = utilities.uniqueNum();

	_cmmbe.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '10%',
		width: '80%',
		height : '100px'
	}).attr({
		'id' : 'TEB' + _id,
		"el_name" : "可编辑文本" + _id
	});

	dragElement(_cmmbe);
	$(parentel).append(_cmmbe);

	if( $("#ittwrap .texteditboxbtn").length == 0 ){
		var _btn = eleObjects.texteditboxbtn.add( parentel );
	}

	_cmmbe.trigger('mousedown');
	return _cmmbe;
}
texteditboxEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain');

	var text = _ani.children('.texteditbox-editbox').html(),
		fontsize = parseInt(_ani.css('font-size')),
		color = _ani.css('color'),
		lh = parseFloat(_ani.css('line-height')),
		tl = _ani.css('text-align');

	lh = lh ? (lh / fontsize).toFixed(1) : 1.4

	$("#texteditbox-text").html(text);
	$("#texteditbox-color").spectrum("set", color);
	$("#texteditbox-fontsize").spinner( "value", fontsize );
	$("#texteditbox-lineheight").spinner( "value", lh );
	var _span = $("#texteditbox-align").children('span[type="'+ tl +'"]');
	_span = _span.length ? _span : $("#texteditbox-align").children('span[type="left"]');
	_span.addClass('active').siblings().removeClass('active');
}

/********
 *可编辑文本
 */

function texteditboxbtnEle(){
	comEle.call(this, 220);
	this.html = '<div class="texteditboxbtn animate curchange fadeInUp" animatename="fadeInUp" ><div class="animate-contain" style="color: rgb(255, 255, 255);">我也要编辑</div></div>';
};
texteditboxbtnEle.prototype = new comEle();
texteditboxbtnEle.prototype.add = function(parentel , btntype){
	var _html = $(this.html),
		_id = utilities.uniqueNum();

	_html.css({
		position : 'absolute',
		top: this.getTop() + 'px',
		left : '85px',
		width: '150px',
	}).attr({
		'id' : _id,
		"el_name" : "编辑按钮" + _id
	});

	dragElement(_html);
	$(parentel).append(_html);

	_html.trigger('mousedown');
	return _html;
}
texteditboxbtnEle.prototype.show = function(){
	var _curch = $("#ittwrap .curchange"),
		_ani = _curch.children('.animate-contain');

	var text = _ani.text(),
		tip = _curch.attr("data-tip") || '',
		fontsize = parseInt(_ani.css('font-size'));

	$("#texteditboxbtn-text").val(text);
	$("#texteditboxbtn-tip").val(tip);
	$("#texteditboxbtn-fontsize").spinner( "value", fontsize );
}

/********
 * 微信图片
 */
function weixinimgEle(){
	comEle.call(this, 100);
	this.html = '<div class="weixinimg animate curchange fadeInUp" animatename="fadeInUp">'
		+ '<div class="animate-contain">'
		+ '<div class="weixinimg-con"><img class="weixinimg-img" src="'+ cdnUrl +'/static/invitation-v2/images/weixinimg.png">'
		+ '<input type="file" accept="image/jpeg, image/gif,image/png, image/bmp, image/jp2, image/x-ms-bmp, image/x-png">'
		+ '</div><div class="weixinimg-ele-mask"></div></div></div>';
}
weixinimgEle.prototype = new comEle();
weixinimgEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum();

	_html.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '80px',
		width: '127px',
		height : '200px'
	}).attr({
		'id' : 'WXI' + _id,
		"el_name" : "微信图片" + _id
	});

	dragElement(_html);
	$(parentel).append(_html);

	_html.trigger('mousedown');
	return _html;
}
weixinimgEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain'),
		img = _ani.find('img').attr("src");

	$("#weixinimg-dei").children('img').attr("src" , img);
}

/********
 * 微信头像
 */
function weixinavatarEle(){
	comEle.call(this, 150);
	this.html = '<div class="weixinavatar weixinavatar1 animate curchange fadeInUp" animatename="fadeInUp" data-type="1">'
		+ '<div class="animate-contain"><div class="weixinavatar-con"><img class="weixinavatar-img" src="'+ cdnUrl +'/static/invitation-v2/images/weixinhead.jpg">'
		+ '</div></div></div>';
}
weixinavatarEle.prototype = new comEle();
weixinavatarEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum(),
		_comid = utilities.uniqueNumOrLetter();

	_html.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '110px',
		width: '100px',
		height : '100px'
	}).attr({
		'id' : 'WXA' + _id,
		"el_name" : "微信头像" + _id,
		'data-comid' : _comid
	});

	dragElement(_html);
	$(parentel).append(_html);

	_html.trigger('mousedown');

	var _wxn = eleObjects['weixinname'].add($("#ittwrap > section.page > div.pageshow"));
	_wxn.attr({
		'data-comid' : _comid
	});

	return _html;
}
weixinavatarEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain');

	var type = _curch.attr("data-type"),
		img = _curch.find('img').attr("src");

	$("#weixinavatar-type").val(type);
	$("#weixinavatar-dei").children('img').attr("src" , img);
}

/********
 * 微信昵称
 */
function weixinnameEle(){
	comEle.call(this, 110);
	this.html = '<div class="weixinname weixinname1 animate curchange fadeInUp" animatename="fadeInUp" data-type="1">'
		+ '<div class="animate-contain" style="text-align: center;line-height: 35px;font-weight: bold;font-size: 16px;">我的微信昵称'
		+ '</div></div>';
}
weixinnameEle.prototype = new comEle();
weixinnameEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum();

	_html.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '60px',
		width: '200px',
		height : '35px'
	}).attr({
		'id' : 'WXN' + _id,
		"el_name" : "微信昵称" + _id
	});

	dragElement(_html);
	$(parentel).append(_html);

	_html.trigger('mousedown');
	return _html;
}
weixinnameEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain');

	var text = _ani.text(),
		type = _curch.attr("data-type"),
		fontsize = parseInt(_ani.css('font-size'));

	$("#weixinname-con").val( text );
	$("#weixinname-type").val( type );
	$("#weixinname-fontsize").spinner( "value", fontsize );
}

/********
 * 微信录音
 */
function weixinsoundEle(){
	comEle.call(this, 200);
	this.html = '<div class="weixinsound animate curchange fadeInUp" animatename="fadeInUp">'
		+ '<div class="animate-contain" style="background-color: #fff;border: 1px solid #adadad;border-radius: 4px;color: #444;">按住说话'
		+ '</div></div>';
}
weixinsoundEle.prototype = new comEle();
weixinsoundEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum();

	_html.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '85px',
		width: '150px',
		height : '35px'
	}).attr({
		'id' : 'WXS' + _id,
		"el_name" : "微信录音" + _id
	});

	dragElement(_html);
	$(parentel).append(_html);

	_html.trigger('mousedown');
	return _html;
}
weixinsoundEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain');

	var text = _ani.text();

	$("#weixinsound-con").val( text );
}

/********
 * 微信语音
 */
function weixinvoiceEle(){
	comEle.call(this, 150);
	this.html = '<div class="weixinvoice animate curchange fadeInUp" animatename="fadeInUp" voice-serverId="">'
		+ '<div class="animate-contain" style="background-color: #fff;border: 1px solid #adadad;border-radius: 4px;"><img src="'+ cdnUrl +'/static/invitation-v2/images/voice.png" alt="" />'
		+ '</div></div>';
}
weixinvoiceEle.prototype = new comEle();
weixinvoiceEle.prototype.add = function(parentel){
	var _html = $(this.html),
		_id = utilities.uniqueNum(),
		_comid = utilities.uniqueNumOrLetter();

	_html.css({
		position : 'absolute',
		top: this.getTop(50) + 'px',
		left : '85px',
		width: '150px',
		height : '35px'
	}).attr({
		'id' : 'WXV' + _id,
		"el_name" : "微信语音" + _id,
		'data-comid' : _comid
	});

	dragElement(_html);
	$(parentel).append(_html);

	var _wxn = eleObjects['weixinsound'].add($("#ittwrap > section.page > div.pageshow"));
	_wxn.attr({
		'data-comid' : _comid
	});

	_html.trigger('mousedown');
	return _html;
}
weixinvoiceEle.prototype.show = function(){
	var _curch = $('#ittwrap .curchange'),
		_ani = _curch.children('.animate-contain');

	// var text = _ani.text(),
	// 	type = _curch.attr("data-type");

	// $("#weixinname-con").val( text );
	// $("#weixinname-type").val( type );
}


// 每个控件类
var eleObjects = {
	img : new imgEle(),
	bg  : new bgEle(),
	text: new textEle(),
	btn : new btnEle(),
	aside : new asideEle(),
	tab : new tabEle(),
	barrage : new barrageEle(),
	vote : new voteEle(),
	map : new mapEle(),
	like : new likeEle(),
	video : new videoEle(),
	imgplay : new imgplayEle(),
	form : new formEle(),
	radio : new radioEle(),
	checkbox : new checkboxEle(),
	input : new inputEle(),
	select : new selectEle(),
	imgupload : new imguploadEle(),
	submit : new submitEle(),
	formtemplate : new formtemplateEle(),
	nav : new navEle(),
	shape : new shapeEle(),
	svg : new svgEle(),
	pop : new popEle(),
	advert : new advertEle(),
	photovote : new photovoteEle(),
	texteditbox : new texteditboxEle(),
	texteditboxbtn : new texteditboxbtnEle(),
	weixinimg : new weixinimgEle(),
	weixinavatar : new weixinavatarEle(),
	weixinname : new weixinnameEle(),
	weixinsound : new weixinsoundEle(),
	weixinvoice : new weixinvoiceEle()
}

//元素列表
var elListModule = {
	contain : $("#el-space"),
	show : function(){
		this.showList();
		this.contain.addClass('show');
	},
	hide : function(){
		this.contain.removeClass('show');
	},
	elListHtml : '<li class="el-li ${active}" data-type="${type}" nav-type="${navtype}"><div class="el-hide ${hide}"><span class="iconfont icon-unie980"></span></div><div class="el-tacked ${tacked}"><span class="iconfont icon-unie983"></span></div>'
		+'<div class="el-main"><span class="el-thumb">${thumb}</span><i class="el-name">${name}</i><div class="el-opt">操作<span class="iconfont icon-caret-down"></span>'
		+'<ul class="el-opt-ul"><li class="el-zindex-t"><span class="iconfont icon-zindex-t"></span>置顶</li><li class="el-zindex-b"><span class="iconfont icon-zindex-b"></span>置底</li>'
		+'<li class="el-zindex-shang"><span class="iconfont icon-zindex-shang"></span>上一层</li><li class="el-zindex-xia"><span class="iconfont icon-zindex-xia"></span>下一层</li>'
		+'<li class="el-delete"><span class="iconfont icon-delete2"></span>删除</li></ul></div></div></li>'
	,
	listThumb : {
		img : '<span class="iconfont icon-pop"></span>',
		text : '<span class="iconfont icon-text"></span>',
		imgplay : '<span class="iconfont icon-img-play"></span>',
		btn : '<span class="iconfont icon-btn"></span>',
		pop : '<span class="iconfont icon-pop"></span>',
		barrage : '<span class="iconfont icon-barrage"></span>',
		vote : '<span class="iconfont icon-vote"></span>',
		map : '<span class="iconfont icon-map"></span>',
		like : '<span class="iconfont icon-like"></span>',
		video : '<span class="iconfont icon-video"></span>',
		form : '<span class="iconfont icon-form"></span>',
		radio : '<span class="iconfont icon-radio"></span>',
		checkbox : '<span class="iconfont icon-checkbox"></span>',
		input : '<span class="iconfont icon-input"></span>',
		select : '<span class="iconfont icon-select"></span>',
		imgupload : '<span class="iconfont icon-imgupload"></span>',
		submit : '<span class="iconfont icon-submit"></span>',
		nav : '<span class="iconfont icon-nav"></span>', 
		shape : '<span class="iconfont icon-shape"></span>',
		svg : '<span class="iconfont icon-svg"></span>',
		texteditbox : '<span class="iconfont icon-unie9a9"></span>',
		texteditboxbtn : '<span class="iconfont icon-unie9a9"></span>',
		weixinimg : '<span class="iconfont icon-img"></span>',
		weixinavatar : '<span class="iconfont icon-unie9aa"></span>',
		weixinname : '<span class="iconfont icon-unie9aa"></span>' ,
		weixinvoice : '<span class="iconfont icon-unie9ad"></span>',
		weixinsound : '<span class="iconfont icon-unie9ad"></span>',
		photovote : '<span class="iconfont icon-unie9ab"></span>'
	},
	elList : [],
	showList : function(){
		var _this = this,
			_li = '';

		_this.elList = [];
		$("#el-tab").children('a[type="all"]').addClass('active').siblings().removeClass('active');

		$.each($('#ittwrap .animate'),function(indx,item){
			// var curZindex = item.style.zIndex;
			// _this.elList.push({
			// 	"el":$(item),
			// 	"zIndex":curZindex
			// })
			_this.elList.unshift($(item));
		});
		// _this.elList.sort(function(a,b){return parseInt(b.zIndex) - parseInt(a.zIndex)});

		$.each( _this.elList ,function(index, val) {
			// var el = $(val.el),
			var el = $(val),
				tp = elModule.getType(el),
				name = el.attr("el_name");

			if( ! name){
				name = typeinfo[tp][2] + $("#ittwrap").find(typeinfo[tp][0]).length;
				el.attr("el_name" , name);
			}

			var	opt = {
					active : el.hasClass('curchange') ? 'active' : '',
					type : tp ,
					navtype : tp ,
					name : tp == 'text' ? el.text() : name,
					hide : el.hasClass('hide'),
					tacked : el.hasClass('tacked'),
					thumb : tp == 'img' ? '<img src="'+el.find('img').attr("src")+'" alt="" />' : _this.listThumb[tp]
				};

			_li += _this.parseTemplate(opt);
		});

		$("#el-ul").html(_li);
	},
	parseTemplate : function( data ){
		var html = this.elListHtml.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'hide' : 
					return data.hide ? 'active' : '';
				case 'tacked' :
					return data.tacked ? 'active' : '';
				case 'navtype' : if( ['img' ,'text'].indexOf(data[$1]) > -1 ){
								return data[$1];
							}else if ( ['input' ,'radio' , 'checkbox' , 'select' , 'imgupload' , 'submit'].indexOf(data[$1]) > -1 ) {
								return 'form';
							}else {
								return 'other';
							}
				default : 	return data[$1] || '';
			}
		});
		return html;
	},
	showType : function(type){
		$("#el-tab").children('a[type="'+type+'"]').addClass('active').siblings().removeClass('active');
		if(type == 'all'){
			$("#el-ul").children('li').show();
		}else{
			$("#el-ul").children('li').hide();
			$("#el-ul").children('li[nav-type="'+type+'"]').show();
		}
	},
	showEle : function(ele){
		var elList = this.elList;
		for (var i = 0; i < elList.length; i++) {
			// if(elList[i].el[0] === ele[0]){
			if(elList[i][0] === ele[0]){
				$("#el-ul").children('li').eq(i).addClass('active').siblings().removeClass('active');
			}
		};
	},
	refresh : function(){
		if(this.contain.is(":visible")){
			this.showList();
		}
	}
}

//地图
var getCenterThrottle = throttle(function(){
	mapModule.getmapCity();
});
var mapModule = {
	qqMapMarker : '',
	initTencentMap : function(){  //初始化地图
		var map = new qq.maps.Map(document.getElementById('map-space'), {
				zoom : 12,
				zoomControl: false,
				panControl: false,
				mapTypeControl: false
			});

		var _self = this;

		_self.map = map;
		
		qq.maps.event.addListener(map, 'click', function(e){
			var latLng 		= e.latLng,
				address_lng = latLng.getLng(),
				address_lat = latLng.getLat(),
				geocoder 	= new qq.maps.Geocoder();

			_self.showGeocoder(address_lat , address_lng , function(result){
				var _address = result.detail.address;
				$('#map-input').val(_address);
				
				$("#ittwrap .curchange").attr({
					"lng": address_lng,
					"lat": address_lat,
					'address':  _address
				}).children('.animate-contain').children('p').eq(1).text(_address);

				$("#map-search-ul").hide();
				mapModule.city = result.detail.addressComponents.city;
			});

		});
		 //当地图中心属性更改时触发事件
        qq.maps.event.addListener(map, 'center_changed', function(result) {
            getCenterThrottle();
        });

		var searchService = new qq.maps.SearchService({
				complete : function(results){
						 var pois = results.detail.pois;
				        if(! pois){
				        	autoTip("定位不到地址，请输入更详细地址！")
				        	return ;
				        }

						_self.clearOverlays();
						_self.qqMapMarker = new qq.maps.Marker({
								map: map,
								position: pois[0].latLng
						});

						map.panTo(pois[0].latLng);
						mapModule.map.zoomTo(13);

						$('#ittwrap .cont-map.curchange').attr({
							lng : pois[0].latLng.getLng(),
							lat : pois[0].latLng.getLat()
						});

						$("#map-search-ul").hide();
						mapModule.getmapCity();
				}
		});

		$('#search-btn').on('click', addressSearch);
		$('#map-input').on('keydown', function(event){
			if (event.keyCode==13){
				$('#search-btn').trigger('click');
			}
		});
		function addressSearch(event){
			if(event){
				event.stopPropagation();
			}
			var address = $('#map-input').val().trim();

			if (!address) { return; }
			// searchService.setLocation(region);
			searchService.setPageIndex(0);         //设置检索的特定页数。
			searchService.setPageCapacity(10);   //设置每页返回的结果数量。
			searchService.search(address);
		}
	},
	searchLocalCity : function(){
		var _self = this;
		//设置城市信息查询服务
		var citylocation = new qq.maps.CityService();

		//请求成功回调函数
		citylocation.setComplete(function(result) {
				_self.map.setCenter(result.detail.latLng);
				mapModule.city = result.detail.name;
		});
		//请求失败回调函数
		citylocation.setError(function() {
			_self.map.setCenter(22.534558181947034, 114.06113147735596);
		});
		citylocation.searchLocalCity();
	},
	showGeocoder : function(lat , lng , fn){ //根据坐标设置坐标标记
		var _self = this,
			latLng = new qq.maps.LatLng( lat , lng )
			geocoder = new qq.maps.Geocoder();

		_self.clearOverlays();

		geocoder.getAddress(latLng);
		geocoder.setComplete(function(result){
			_self.qqMapMarker = new qq.maps.Marker({
						position: latLng,
						map: _self.map
				});
			_self.map.panTo(latLng);

			fn && fn(result);
		});
	},
	clearOverlays : function(id){ //清除地图覆盖物
		if(id){ //有id表示控件上的地图，没有id表示设置面板的地图
			this[id].qqMapMarker && this[id].qqMapMarker.setMap(null);
		}else{
			this.qqMapMarker && this.qqMapMarker.setMap(null);
		}
	},
	initmap : function(id){  //在选择显示地图时，初始化控件地图
		var _self = this;

		_self[id] = {};

		_self[id].map = new qq.maps.Map(document.getElementById(id), {
			zoom : 13,
			zoomControl: false,
			panControl: false,
			mapTypeControl: false
		});

		var _curch = $("#" + id).parent().parent(),
			lat = _curch.attr("lat"),
			lng =  _curch.attr("lng");

		mapModule[id].map.zoomTo(parseInt(_curch.attr("mapzoom")) || 13);

		if(lat && lng){
			var latLng = new qq.maps.LatLng( lat , lng );
			_self[id].qqMapMarker = new qq.maps.Marker({
					map: _self[id].map,
					position: latLng
			});
			_self[id].map.setCenter( latLng );
		}else{
			mapModule.map && _self[id].map.setCenter(mapModule.map.center);
		}
	},
	hasmapjs : false , //地图设置地图是否已经初始化
	initSetMap : function() { //初始化设置面板地图
		if(this.hasmapjs){
			return ;
		}
		this.hasmapjs = true;
		this.initTencentMap();
	},
	city : '深圳', //当前地图的城市
	getmapCity : function(){  //获取地图现在所显示的城市
		var geocoder = new qq.maps.Geocoder({
		    complete:function(result){
		        mapModule.city = result.detail.addressComponents.city;
		    }
		});
		var center = mapModule.map.center,
			coord=new qq.maps.LatLng( center.lat , center.lng);
		geocoder.getAddress(coord);
	}
	
}

//图集
var imgplayModule = {
	sliderArr : {},
	imgplaySave : function(){
		var _curch = $('#ittwrap .curchange'),
			current = _curch.children('.animate-contain'),
			option,
			html = '',
			srcarr = [],
			old_timer = current.attr('id');

		current.children('ul').remove();
		current.children('section').remove();
		current.find('.dot').remove();
		$("#imgplay-list").children('.imgplay-item').each(function(index, el) {
			var _src = $(el).children('img').attr("src");
			srcarr.push(_src);
			html +='<img src="'+_src+'" alt="" />';
		});
		option = {
			transitions:[$('#flux-type').val()],
			delay: (parseFloat($('#imgplay-time-i').val()) * 1000) || 4000,
			autoplay:$('#imgplay-auto').prop('checked'),
			width : _curch.width(),
			height : _curch.height()
		};

		this.sliderArr[old_timer] && this.sliderArr[old_timer].destroy();
		current.html('<section class="flux-slide ' + old_timer + '" data-ele="'+ old_timer +'" data-src="'+ srcarr.join(' ') +'"></section>');
		current.attr('data-initial',JSON.stringify(option)).children('section').append(html);
		_curch.addClass('slide-new');

		this.sliderArr[old_timer] = new flux.slider(current.find('section'),option);
		
		this.imgplayLinkSave();
	},
	imgplayLinkSave : function(){
		var _curch = $('#ittwrap .curchange'),
			_ani = _curch.children('.animate-contain'),
			linkarr = [];

		$("#imgplay-list").children('.imgplay-item').each(function(index, el) {
			var _link = $(el).attr("data-link") || 'none';
			linkarr.push(_link);
		});

		_ani.children('section').attr("data-link" , linkarr.join(' '));
	},
	initialSlide : function(el){
		var  _that = $(el),
			option = _that.children('.animate-contain').data('initial'),
			type = _that.hasClass('slide-new') ? 1:'',
			_li = '',
			target, src_arr = [];
		if (type) {
			target =_that.find('.animate-contain').find('section');
			src_arr = target.attr('data-src');
			if(! src_arr){
	            return ;
            }
            src_arr = src_arr.trim().split(' ');

			for (var i = 0; i < src_arr.length; i++) {
				_li += '<img src="' + src_arr[i] + '" alt="图片加载中" />';
			}
			target.children().remove();
			target.append(_li);
			this.sliderArr[target.parent().attr('id')] = new flux.slider(target, option);

		}else {
			option = $.extend({
				callback: function(i) {
					_that.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
				}
			}, option);
			_that.children('.animate-contain').attr('style', '');
			option.continuousScroll ? _that.find('ul').children().first().remove() && _that.find('ul').children().last().remove() : '';
			_that.children('.animate-contain').swipeSlide(option);
		}
	},
	imgplayDestroy : function(){
		var _this = this;
		$.each( _this.sliderArr , function(index, val) {
			val && val.destroy && val.destroy();
		});
	}
};

//裁剪
var cropModule = {
	ratio : 1 ,
	cropConfirm : function( img ){

	},
	cropCancel : function(img){

	},
	show : function( img , confirmfn , cancelfn ){

		if($("#images-space").hasClass('show')){
			$("#crop-no").removeClass('hide');
		}else{
			$("#crop-no").addClass('hide');
		}

		$("#crop-wrap").addClass('show');
		this.cropConfirm = confirmfn || function(){};
		this.cropCancel = cancelfn || function(){}; 

		$("#crop-img").cropper('replace', img).cropper('setAspectRatio' , this.ratio);
		$("#crop-ratio").find('input').eq(0).prop("checked" , true);
	},
	hide : function(){
		$("#crop-wrap").removeClass('show');
	}
};
//形状裁剪
var shapeCropModule = {
	ratio : 1 ,
	cropConfirm : function( img ){

	},
	cropCancel : function(img){

	},
	cropNo : function(){

	},
	shapeCropClass : '',
	removeShapeCrop : function(){
		var _curch = $("#ittwrap .curchange");
		_curch.children('.animate-contain').removeClass(function() {
			var _class = $(this).attr("class").match(/shape-[0-9]{0,2}/g);
		    return _class ? _class.join(' ') : '';
		}).removeClass('shape-div');
		$("#shapeCrop-crop").find('.cropper-view-box').removeClass(function() {
			var _class = $(this).attr("class").match(/shape-[0-9]{0,2}/g);
		    return _class ? _class.join(' ') : '';
		}).removeClass('shape-div');;
	},
	show : function( img , confirmfn , cancelfn , nofn){

		if($("#images-space").hasClass('show')){
			$("#shapeCrop-no").removeClass('hide');
		}else{
			$("#shapeCrop-no").addClass('hide');
		}

		$("#shapeCrop-shape").children('li').removeClass('active');

		$("#shapeCrop-space").show( 50 ,function(){
			$(this).addClass('show');
		});

		this.cropConfirm = confirmfn || function(){};
		this.cropCancel = cancelfn || function(){}; 
		this.cropNo = nofn || function(){}; 

		$("#shapeCrop-img").cropper('replace', img).cropper('setAspectRatio' , this.ratio);

	},
	hide : function(){
		$("#shapeCrop-space").removeClass('show').hide(1000);
	}
};

//美图秀秀
// 美图秀秀
var xiuxiuModule = {
	initMeitu : function(imgsrc){
		if(typeof xiuxiu == "undefined"){
			return;
		}
		/*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
		// xiuxiu.setLaunchVars("cropPresets", imgra);
		xiuxiu.embedSWF("altContent",1,"100%","100%","xiu1");
		xiuxiu.embedSWF("altContent3",3,"100%","560","xiu3");
				 //修改为您自己的图片上传接口
		xiuxiu.setUploadURL("http://www.zhichiwangluo.com/index.php?r=pc/UserTag/addimg&user=1&meitu=1");
		xiuxiu.setUploadType(2);
		xiuxiu.setUploadDataFieldName("upload_file");
			// xiuxiu.setUploadArgs({type:0,meitu:1});
		xiuxiu.onInit = function ()
		{
			xiuxiu.loadPhoto("http://img.weiye.me/zcimgdir/album/file_54bf301e24de6.png");
		}
		xiuxiu.onUploadResponse = function (data , id)
		{
			// console.log(data);
			var data = JSON.parse(data);
			if(data.status == 0){
				if(id == "xiu1"){
					$("#meitu-wrap").removeClass('show');
				}else if(id= "xiu3"){
					$("#meitu-wrap3").removeClass('show');
				}
				xiuxiuModule.successFn( data.data );
			}
		}
		xiuxiu.onDebug = function (data)
		{
			console.log("错误响应" + data);
		}
		xiuxiu.onClose = function(id) {
			setTimeout(function(){
				if(id == "xiu1"){
					$("#meitu-wrap").removeClass('show');
				}else if(id= "xiu3"){
					$("#meitu-wrap3").removeClass('show');
				}
			}, 50);

		}

	},
	setMeituPhoto : function (imgsrc , id , successFn){
		if(typeof xiuxiu == "undefined"){
			return;
		}

		var _this = this;
		xiuxiu.onInit = function ()
		{
			xiuxiu.loadPhoto(imgsrc , false , id);
		}

		_this.successFn = successFn || function(){};
	},
	show : function(type){
		if(typeof xiuxiu == "undefined"){
			return;
		}
		
		if(type == 'xiu1'){
			$("#meitu-wrap").addClass('show');
		}else if(type == 'xiu3'){
			$("#meitu-wrap3").addClass('show');
		}
	}
}

// 链接模块
var linkModule = {
	isAdd : false,
	show : function( type , add){
		$("#link-wrap").addClass('show');

		if(type){
			$("#redirect-nav").children('li[type="'+type+'"]').trigger('click');
		}
		
		this.isAdd = add != undefined ? add : false;
	},
	hide : function(){
		$("#link-wrap").removeClass('show');
	},
	setBasic : function(ht){
		ht = ht ? ht : 'http';

		$("#link-basic").find('input[type="radio"][value="'+ht+'"]').prop('checked', true);

		if(ht == 'http'){
			$("#link-http-input").prop("disabled" , false);
			$("#httpisblank").prop("disabled" , false);
			$("#link-tel-input").prop("disabled" , true).val('');
		}else if(ht == 'tel'){
			$("#link-http-input").prop("disabled" , true).val('');
			$("#httpisblank").prop("disabled" , true);
			$("#link-tel-input").prop("disabled" , false);
		}
	},
	pageVm : (function(){
		return  new Vue({
			  el: '#link-page',
			  data: {
			    items: [ ]
			  }
			});
	})(),
	getbasic : function(){
		var _curch = $("#ittwrap .curchange"),
			href = _curch.attr("href");

		if(/tel/.test(href)){
			$("#link-basic").find('input[type="radio"][value="tel"]').trigger('click');

			href = href.substr(4);
			$("#link-tel-input").val(href);
		}else{
			$("#link-basic").find('input[type="radio"][value="http"]').trigger('click');

			if (/\/s\?id/.test(href) && !/zhichiwangluo/.test(btnlinkaddress)) {
				href = '';
			}
			if (/javascript:;/.test(href)){
				href = '';
			}
			$("#link-http-input").val(href);

			if(_curch.attr("httpisblank") == "false"){
				$("#httpisblank").prop("checked",false);
			}else{
				$("#httpisblank").prop("checked",true);
			}

		}

	},
	getpage : function(){
		var _link = this;
		var pinfo = [];

		$("#page-list").children('li').each(function(index, el) {
			var _class = '',
				_checked = false;
			var toPageClassName = /topage([0-9]{0,3})/.exec($(el).attr('class'));
			if ($(el).hasClass('one')) {
				_class = 'one';
				_checked = true;
			}

			if (toPageClassName) {
				_class += (' ' + toPageClassName[0]);
			}
			pinfo.push({
				class : _class ,
				// img : $(el).find(".page-li-img").attr("src"),
				img : pageModule.getSectionBg($(pagearr[index])),
				checked : _checked
			});
		});

		_link.pageVm.items = pinfo;

		setTimeout(function(){
			var _curch = $("#ittwrap .curchange");
			if(_curch.hasClass("int-toPage")){
				var _pagenum = +/[0-9]+/.exec(_curch.attr("toPageIndex"))[0],
					_target = $('#link-page').children('.'+_curch.attr('toPageIndex'))[0] || $('#link-page').children('li').eq(_pagenum);

				$(_target).addClass('active');
			}
		}, 100);
	},
	weiVm : (function(){
		return  new Vue({
			  el: '#link-wei',
			  data: {
			  	currentid : 0,
			    items: [ ]
			  }
			});
	})(),
	weipage : {
		page : 1 ,
		hasload : false,
		nomore : false ,
		loading : false
	},
	getwei : function(isget){
		var _link = this,
			pp = _link.weipage;

		if(!isget && pp.hasload){
			return ;
		}
		if(pp.loading || pp.nomore){
			return ;
		}
		pp.loading = true;

		var url = '/index.php?r=pc/InvitationData/getList&my_invitation=1',
			data = { 
				page: pp.page ,
				page_size: 12
				},
			successFn = function(data){
				if(data.status == 0){
					_link.weiVm.items = _link.weiVm.items.concat(data.data);

					pp.page ++ ;
					pp.loading = false;
					pp.hasload = true;

					if(data.is_more == 0){
						pp.nomore = true;
					}

				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	gzhVm : (function(){
		return  new Vue({
			  el: '#link-gzh',
			  data: {
			  	currentid : 0,
			    items: [ ]
			  }
			});
	})(),
	gzhpage : {
		page : 1 ,
		hasload : false,
		nomore : false ,
		loading : false
	},
	getgzh : function( isget ){
		var _link = this,
			pp = _link.gzhpage;

		if(!isget && pp.hasload){
			return ;
		}
		if(pp.loading || pp.nomore){
			return ;
		}
		pp.loading = true;

		var url = '/index.php?r=pc/GzhAccount/GetGzhList',
			data = { 
				page: pp.page ,
				page_size: 12
				},
			successFn = function(data){
				if(data.status == 0){
					_link.gzhVm.items = _link.gzhVm.items.concat(data.data);

					pp.page ++ ;
					pp.loading = false;
					pp.hasload = true;

					if(data.is_more == 0){
						pp.nomore = true;
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	articleVm : (function(){
		return  new Vue({
			  el: '#link-article',
			  data: {
			  	currentid : 0,
			    items: [ ]
			  }
			});
	})(),
	articlepage : {
		page : 1 , 
		hasload : false,
		nomore : false ,
		loading : false
	},
	getarticle : function( isget ){
		var _link = this,
			pp = _link.articlepage;

		if(!isget && pp.hasload){
			return ;
		}
		if(pp.loading || pp.nomore){
			return ;
		}
		pp.loading = true;

		var url = '/index.php?r=Article/mall&my_article=1',
			data = { 
				page: pp.page ,
				page_size: 12
				},
			successFn = function(data){
				if(data.status == 0){
					_link.articleVm.items = _link.articleVm.items.concat(data.data);
					
					pp.page ++ ;
					pp.loading = false;
					pp.hasload = true;

					if(data.is_more == 0){
						pp.nomore = true;
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	goodsVm : (function(){
		return  new Vue({
			  el: '#link-goods',
			  data: {
			  	currentid : 0,
			    items: [ ]
			  }
			});
	})(),
	goodspage : {
		page : 1,
		hasload : false,
		nomore : false ,
		loading : false
	},
	getgoods : function( isget ){
		var _link = this,
			pp = _link.goodspage;

		if( !isget && pp.hasload ){
			return ;
		}
		if(pp.loading || pp.nomore){
			return ;
		}
		pp.loading = true;

		var url = '/index.php?r=pc/shop/GoodsList',
			data = { 
				page: pp.page ,
				page_size: 12
				},
			successFn = function(data){
				if(data.status == 0){
					_link.goodsVm.items = _link.goodsVm.items.concat(data.data);
					
					pp.page ++ ;
					pp.loading = false;
					pp.hasload = true;

					if(data.is_more == 0){
						pp.nomore = true;
					}

				}else{
				}
			},
			errorFn = function( ){
				autoTip(data.data);
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	gameVm : (function(){
		return  new Vue({
			  el: '#link-game',
			  data: {
			  	currentid : 0,
			    items: [ ]
			  }
			});
	})(),
	gamepage : {
		hasload : false
	},
	getgame : function(){
		var _link = this;

		if(_link.gamepage.hasload){
			return ;
		}

		var url = '/index.php?r=pc/InvitationData/GameList',
			data = {},
			successFn = function(data){
				if(data.status == 0){
					_link.gameVm.items = _link.gameVm.items.concat(data.data);
					_link.gamepage.hasload = true;
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	// rotateVm : (function(){
	// 	return  new Vue({
	// 		  el: '#link-rotate',
	// 		  data: {
	// 		    items: [ ]
	// 		  }
	// 		});
	// })(),
	// rotatepage : {
	// 	hasload : false
	// },
	// getrotate : function(){
	// 	var _link = this;

	// 	if(_link.rotatepage.hasload){
	// 		return ;
	// 	}

	// 	var url = '/index.php?r=pc/Lottery/List',
	// 		data = {},
	// 		successFn = function(data){
	// 			if(data.status == 0){

	// 				_link.rotateVm.items = _link.rotateVm.items.concat(data.data);
	// 				_link.rotatepage.hasload = true;
	// 			}else{
					// autoTip(data.data);
	// 			}
	// 		},
	// 		errorFn = function( ){
				
	// 		};

	// 	$ajax( url , "get", data , "json", successFn, errorFn);
	// }
};


//特效
var effectModule = {
	hasinit : false ,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.loadImages();

		// 飘落特效滑块
		initSlider($("#control-ebg") , $("#control-ebg-i") ,{ 
			max : 100 ,
			min : 1 ,
			step : 1 ,
			value : 60,
			slide : function(ui){
				
			},
			stop : function(ui){
				effectModule.previewEffect.background();
			}
		});
		//擦除特效滑块
		initSlider($("#control-egg") , $("#control-egg-i") ,{ 
			max : 100 ,
			min : 1 ,
			step : 1 ,
			value : 30,
			slide : function(ui){
				
			},
			stop : function(){
				effectModule.previewEffect.guagua();
			}
		});
		//碎屏特效滑块
		initSlider($("#control-ebr") , $("#control-ebr-i") ,{ 
			max : 30 ,
			min : 1 ,
			step : 1 ,
			value : 15,
			slide : function(ui){
				
			},
			stop : function(ui){
				effectModule.previewEffect.brokenglass();
			}
		});

		$("#effect-vip-tip").on('click', 'a', function(event) {
			VipModule.show();
		});

		$("#effect-type-ul").on('click', 'li', function(event) {
			var _this = $(this),
				type = _this.attr("type");

			if(! pmi_list.isVip && type != 'none'){
				confirmTip({
					text : '您还不是VIP，暂时无法使用该功能。是否升级？',
					ConfirmText : '立即升级',
					ConfirmFunction : function(){
							VipModule.show();
					}
				});
				return ;
			}

			if(_this.hasClass('active') || type == 'none'){
				_this.removeClass('active');
				$("#effect-set").children('div').removeClass('active');
				$("#effect-type-ul").children('li[type="none"]').addClass('active').siblings().removeClass('active');
				$("#effect-set").children('div[type="none"]').addClass('active').siblings().removeClass('active');
			}else{
				_this.addClass('active').siblings().removeClass('active');
				$("#effect-set").children('div[type="'+type+'"]').addClass('active').siblings().removeClass('active');
				effectModule.previewEffect[type]();
			}
		});

		$("#effect-btn-wrap").on('click', '.effect-confirm', function(event) {
		//特效确定
			var ef = $("#effect-type-ul").children('.active'),
				_page = $("#ittwrap").children('section');

			if(ef.length == 0 || ef.attr("type") == "none"){
				_page.removeAttr('data-effect').removeClass('brokenglass');
			}else{
				var _type = ef.attr("type"),
					data = effectModule.getData[_type]();

				_page.attr("data-effect" , JSON.stringify(data));
			}

			effectModule.hide();
			effectModule.previewEffect.backgroundFn.destroy && effectModule.previewEffect.backgroundFn.destroy();
			imagesModule.hide();

		}).on('click', '.effect-concel', function(event) {
		//特效取消
			effectModule.hide();
			effectModule.previewEffect.backgroundFn.destroy && effectModule.previewEffect.backgroundFn.destroy();
			imagesModule.hide();
		});

		//飘落特效图标选择
		$("#background-ul").on('click', 'li', function(event) {
			var _this = $(this);

			if(_this.hasClass('effect-img-add')){
				$("#images-space").addClass('zIndex12');
				imagesModule.show(function( img ){
					_this.children('img').remove();
					_this.append('<img src="'+img+'" alt="" />');
					_this.addClass('active').siblings().removeClass('active');
					_this.children('span').addClass('effect-hasadd').text("更换");
					effectModule.previewEffect.background();
					$("#images-space").removeClass('zIndex12');
				} , function(){
					$("#images-space").removeClass('zIndex12');
				} , 1 , false);
			}else{
				_this.addClass('active').siblings().removeClass('active');
				effectModule.previewEffect.background();
			}
		});

		//擦除特效背景选择
		$("#guagua-ul").on('click', 'li', function(event) {
			var _this = $(this);

			if(_this.hasClass('effect-img-add')){
				$("#images-space").addClass('zIndex12');
				imagesModule.show(function( img ){
					_this.children('img').remove();
					_this.append('<img src="'+img+'" alt="" />');
					_this.attr("data-src" , img);
					_this.addClass('active').siblings().removeClass('active');
					_this.children('span').addClass('effect-hasadd').text("更 换");
					effectModule.previewEffect.guagua();
					$("#images-space").removeClass('zIndex12');
				} , function(){
					$("#images-space").removeClass('zIndex12');
				} , 330/520 , false);
			}else{
				_this.addClass('active').siblings().removeClass('active');
				effectModule.previewEffect.guagua();
			}
		});

		//碎屏特效背景选择
		$("#broken-ul").on('click', 'li', function(event) {
			var _this = $(this);

			if(_this.hasClass('effect-img-add')){
				$("#images-space").addClass('zIndex12');
				imagesModule.show(function( img ){
					_this.children('img').remove();
					_this.append('<img src="'+img+'" alt="" />');
					_this.attr("data-src" , img);
					_this.children('span').addClass('effect-hasadd').text("更 换");
					_this.addClass('active').siblings().removeClass('active');
					effectModule.previewEffect.brokenglass();
					$("#images-space").removeClass('zIndex12');
				} , function(){
					$("#images-space").removeClass('zIndex12');
				} , 330/520 , false);
			}else{
				_this.addClass('active').siblings().removeClass('active');
				effectModule.previewEffect.brokenglass();
			}
			
		});
		//碎屏特效样式图标
		$("#broken-type").on('click', 'li', function(event) {
			var _this = $(this);

			if(_this.hasClass('effect-img-add')){
				$("#images-space").addClass('zIndex12');
				imagesModule.show(function( img ){
					_this.children('img').remove();
					_this.append('<img src="'+img+'" alt="" />');
					_this.children('span').addClass('effect-hasadd').text("更换");
					_this.addClass('active').siblings().removeClass('active');
					effectModule.previewEffect.brokenglass();
					$("#images-space").removeClass('zIndex12');
				} , function(){
					$("#images-space").removeClass('zIndex12');
				} , 1 , false);
			}else{
				_this.addClass('active').siblings().removeClass('active');
				effectModule.previewEffect.brokenglass();
			}
		});
		//碎屏特效音效
		$("#broken-music").on('click', 'li ', function(event) {
			var _this = $(this);

			if(_this.hasClass('effect-img-add')){
				musicModule.show( '' , function(li){
					var musicurl = '',
						musicname = '';
					if(li.length > 0){
						if(li.hasClass('music-choice')){
							musicname = li.attr("data-name");
						}else{
							musicname = li.children('.music-name').text();
						}
						musicurl = li.attr('data-url');
						_this.attr("data-url" , musicurl);
						_this.children('span').addClass('effect-hasadd').text("更 换");

						_this.addClass('active').siblings().removeClass('active');
						effectModule.previewEffect.brokenglass();
					}
				} , false );
			}else{
				_this.addClass('active').siblings().removeClass('active');
				effectModule.previewEffect.brokenglass();
			}
		});


		$('#effect-wrap .effect-img-add').tooltip({
            position: {
                my: "center center",
        		at: "center top-20",
                using: function(position, feedback) {
                    $(this).css({
                        'position': 'fixed',
                        top: position.top,
                        left: position.left
                    }).addClass('title-tip');
                    if (feedback.vertical == "bottom") {
                        $(this).addClass('title-tip-bottom');
                    }else{
                    	$(this).addClass('title-tip-top');
                    }
                }
            }
        });

	},
	show : function(){
		this.init();
		this.showEffect();
		$("#effect-wrap").addClass('show');
	},
	hide : function(){
		$("#effect-wrap").removeClass('show');
	},
	loadImages : function(){
		$("#effect-wrap").find('img').each(function(index, el) {
			var loadsrc = $(el).attr("load-src");
			if(loadsrc){
				el.src = $(el).attr("load-src");
			}
		});
	},
	getData : {
		background : function(){
			return {
				type : 'effect-background',
				image 		: $('#background-ul').children('.active').children('img').attr('src') ,
				snowFlakes 	: parseInt($('#control-ebg-i').val()),
				global 		: false,
				position    :  $("#background-position").find('input:checked').val(),
				rotate      : $('#background-ul').children('.active').attr("data-rotate") || 'false'
			};
		},
		guagua : function(){
			return {
				type : 'effect-guagua',
				background 	  : $('#guagua-ul').children('.active').attr('data-src') ,
				completeRatio : parseInt($('#control-egg-i').val()) / 100,
				text 		  : $('#guagua-text').val(),
			};
		},
		brokenglass : function(){
			return {
				type : 'effect-brokenglass',
				background 	: $('#broken-ul').children('.active').attr('data-src') ,
				effectImg 	: $('#broken-type').children('.active').children('img').attr('src') ,
				effectSound : $('#broken-music').children('.active').attr("data-url") ,
				touchCount 	: parseInt( $('#control-ebr-i').val() ),
				soundIndex  : $('#broken-type').children('.active').index(),
			};
		}
	},
	showEffect : function(){
		var _page = $("#ittwrap").children('section'),
			ef = _page.attr("data-effect"),
			type = 'background';

		if(ef){
			ef = JSON.parse(ef);
			type = ef.type.split('-')[1];

			$("#effect-type-ul").children('li[type="'+type+'"]').addClass('active').siblings().removeClass('active');
			$("#effect-set").children('div[type="'+type+'"]').addClass('active').siblings().removeClass('active');
			this.setData[type](ef);
			this.previewEffect[type]();
		}else{
			$("#effect-type-ul").children('li[type="none"]').addClass('active').siblings().removeClass('active');
			$("#effect-set").children('div[type="none"]').addClass('active').siblings().removeClass('active');
		}

	},
	setData : {
		background : function(data){
			var _li = $('#background-ul').find('img[src="'+data.image+'"]').parent(),
				_add = $('#background-ul').children('.effect-img-add');

			if(_li.length == 0){
				_add.children('img').remove();
				_add.append('<img src="'+data.image+'" alt="" />');
				_add.children('span').addClass('effect-hasadd').text("更换");
				_li = _add;
			}else if(!_li.hasClass('effect-img-add')){
				_add.children('img').remove();
				_add.children('span').removeClass('effect-hasadd').text("+");
			}
			_li.addClass('active').siblings().removeClass('active');

			$('#control-ebg').slider( "value", data.snowFlakes );
			$('#control-ebg-i').val(data.snowFlakes);
			$("#background-position").find('input[value="'+data.position+'"]').prop('checked', true);
		},
		guagua : function(data){
			var _li = $('#guagua-ul').children('li[data-src="'+data.background+'"]'),
				_add = $('#guagua-ul').children('.effect-img-add');

			if(_li.length == 0){
				_add.children('img').remove();
				_add.append('<img src="'+data.background+'" alt="" />');
				_add.attr("data-src" , data.background);
				_add.children('span').addClass('effect-hasadd').text("更 换");
				_li = _add;
			}else if(!_li.hasClass('effect-img-add')){
				_add.children('img').remove();
				_add.children('span').removeClass('effect-hasadd').text("+");
			}
			_li.addClass('active').siblings().removeClass('active');

			var cr = parseFloat(data.completeRatio) * 100;
			$('#control-egg').slider( "value", cr );
			$('#control-egg-i').val(cr);
			$('#guagua-text').val(data.text);
		},
		brokenglass : function(data){
			var _li = $('#broken-ul').children('li[data-src="'+data.background+'"]'),
				_add = $('#broken-ul').children('.effect-img-add'),
				_li2 = $('#broken-type').find('img[src="'+data.effectImg+'"]').parent(),
				_add2 = $('#broken-type').children('.effect-img-add'),
				_li3 = $('#broken-music').children('li[data-url="'+data.effectSound+'"]'),
				_add3 = $('#broken-music').children('.effect-img-add');

			if(_li.length == 0){
				_add.children('img').remove();
				_add.append('<img src="'+data.background+'" alt="" />');
				_add.attr("data-src" , data.background);
				_add.children('span').addClass('effect-hasadd').text("更 换");
				_li = _add;
			}else if(!_li.hasClass('effect-img-add')){
				_add.children('img').remove();
				_add.children('span').removeClass('effect-hasadd').text("+");
			}
			if(_li2.length == 0 ){
				_add2.children('img').remove();
				_add2.append('<img src="'+data.effectImg+'" alt="" />');
				_add2.children('span').addClass('effect-hasadd').text("更换");
				_li2 = _add2;
			}else if(!_li.hasClass('effect-img-add')){
				_add2.children('img').remove();
				_add2.children('span').removeClass('effect-hasadd').text("+");
			}
			if(_li3.length == 0){
				_add3.attr("data-url" , data.effectSound);
				_add3.children('span').addClass('effect-hasadd').text("更 换");
				_li3 = _add3;
			}else if(!_li.hasClass('effect-img-add')){
				_add3.children('span').removeClass('effect-hasadd').text("+");
			}
			_li.addClass('active').siblings().removeClass('active');
			_li2.addClass('active').siblings().removeClass('active');
			_li3.addClass('active').siblings().removeClass('active');
			$('#control-ebr').slider( "value", data.touchCount );
			$('#control-ebr-i').val(data.touchCount);
		}
	},
	previewEffect : {
		backgroundFn : '',
		background : function(){
			var data = effectModule.getData.background();
			data.width = 140;
			data.height = 160;
			data.position = 'front';

			this.backgroundFn.destroy && this.backgroundFn.destroy();
			this.backgroundFn = $("#effect-bg-preview").websnowjq(data);
		},
		guagua : function(){

			var data = effectModule.getData.guagua(),
				id = 'eraser' + utilities.uniqueNum() ,
             	_img = $('<img id="' + id + '" src="'+ data.background +'" style="width: 100%;height: 100%;"/>'),
              	_div = $("#effect-gg-preview");

            if(_div.children('canvas').length){
            	_div.children('canvas').eraser( 'destroy' );
            }

          	_div.append(_img);

			data = $.extend({
				size : 20,
				completeFunction: function() {
					$('#' + id).eraser( 'destroy' );
				},
			}, data);
            _img[0].onload = function(){
                _img.eraser(data);
            }
		},
		brokenglass : function(){
			var data = effectModule.getData.brokenglass();

			data = $.extend({
				effectWidth : 40
			} , data);

			$("#effect-bk-preview").broken("");
			$("#effect-bk-preview").broken(data);
		}
	}

};

// 触发模块
var triggerModule = {
	template: {
		observer: '<div class="trigger-span trigger-ob-span"><span class="iconfont icon-el-m"></span></div>',
		receiver: '<div class="trigger-span trigger-re-span"><span class="iconfont icon-el-c"></span></div>'
	},
	init : function(){
		this.destroy();
		this.setObserverReceiver();

		var _curch = $("#ittwrap .curchange");

		if(_curch.attr('data-trigger-disappear')){
			$("#tg-disappear").prop('checked', true);
		}else{
			$("#tg-disappear").prop('checked', false);
		}

	},
	setObserverReceiver: function() {
		var _this      = this,
			_template  = _this.template,
			_curch     = $('#ittwrap .curchange'),
			name_space = 1,
			sender_id  ;

		$('#ittwrap .trigger-observer').each(function(index, el) {
			var id = parseInt($(el).attr('data-trigger-arr'));
			name_space = (name_space > id ? name_space : id + 1);
		});
		//确定触发器的编号
		if(! _curch.hasClass('trigger-observer')){
			sender_id = name_space.toString();
			_curch.addClass('trigger-observer').attr('data-trigger-arr', sender_id).append(_template.observer);
		}else{
			sender_id = _curch.attr('data-trigger-arr').split(',');
			if(sender_id.length > 0){
				sender_id = Math.max.apply(null, sender_id).toString();
			}
			_curch.attr('data-trigger-arr', sender_id).append(_template.observer);
		}

		//触发接收器的数组字符串化
		$.each($('#ittwrap .trigger-receiver'),function(index,item){
			var item_id = $(item).attr('data-receiver-id').split(',');
			if(item_id.indexOf(sender_id) > -1){
				$(item).append(_template.receiver);
			}
		});

		$('#ittwrap').on('click.trigger', '.animate', function(event) {
			var receiver = $(this);
			var receiver_id = receiver.attr('data-receiver-id');
			receiver_id = receiver_id ? receiver_id.split(',') : [];
			//是否进入触发操作
			if(receiver.find('.trigger-ob-span').length){
				//触发器本身
			}else{
				if (receiver.find('.trigger-span').length) {
					// if(receiver_id.indexOf(sender_id) > -1){
					// 	utilities.ArrayRemoveValue(receiver_id , sender_id);
					// }
					receiver.find('.trigger-re-span').remove();
					// if(receiver_id.length > 0){
					// 	receiver.attr("data-receiver-id" , receiver_id.toString());
					// }else{
					// 	receiver.removeClass('trigger-receiver').removeAttr('data-receiver-id');
					// }
				}else{
					// receiver_id.push(sender_id);
					// receiver.attr("data-receiver-id" , receiver_id.toString()).addClass('trigger-receiver').append(_template.receiver);
					receiver.append(_template.receiver);
				}
			}
			event.stopPropagation();
		});
	},
	show : function(){
		this.init();
		$("#tg-space").addClass('show');
		$("#mask-div").addClass('show');
		$("#phone-wrap").addClass('zIndex11');
	},
	hide : function(){
		this.destroy();
		$("#tg-space").removeClass('show');
		$("#mask-div").removeClass('show');
		$("#phone-wrap").removeClass('zIndex11');
	},
	//清除所有trigger的图标标志
	destroy:function(){
		$('#ittwrap .trigger-span').remove();
		$('#ittwrap').off('.trigger');
	}
};

//历史保存记录
var historyModule = {
	hasinit : false,
	init : function(){
		if( this.hasinit ){
			return ;
		}
		this.hasinit = true;

	},
	afreshHistory : function(){ //重新加载历史保存记录
		this.hpage = {
			nomore : false ,
			loading : false,
			page : 1
		};
		$("#secovery-list").empty();
		this.getHistory();
	},
	hpage : {
		nomore : false ,
		loading : false,
		page : 1
	},
	getHistory : function(){
		var _this = this,
			tp = _this.hpage;

		if( tp.loading || tp.nomore){
			return ;
		}
		tp.loading = true;

		var url = '/index.php?r=pc/InvitationHistory/getInvitationHistory',
			data = {
				inv_id : myinvitation_id ,
				page_size : 20 ,
				page : tp.page
			},
			successFn = function(data){
				if(data.status == 0){
					var html = '';
					if(data.data.length == 0){
						html += '<div class="history-none">暂无历史记录哦</div>';
					}else{
						$.each(data.data, function(index, val) {
							html += _this.parseTemplate(val , index);
						});
					}

					tp.page ++ ;
					if(data.is_more == 0){
						tp.nomore = true;
						html += '<p class="history-nomore">没有了！</p>';
					} 

					$("#secovery-list").append(html);
				}else{
					autoTip(data.data);
				}
				tp.loading = false;
			},
			errorFn = function( ){
				tp.loading = false;
			};

		$ajax( url , "get", data , "json", successFn, errorFn, $("#save-history"));
	},
	template : '<li data-id="${id}"><span class="secovery-name">${name}</span><span class="secovery-time">${create_time}</span>'
	+'<button class="secovery-recovery-btn">恢复</button><button class="secovery-preview-btn">预览</button></li>',
	parseTemplate : function( data , index){
		index = (this.hpage.page - 1) * 20 + index + 1;
		var html = this.template.replace(/\$\{(\w+)\}/g, function($0, $1){
			switch($1){
				case 'name' : 
					return index + '场景保存';
				default : 	return data[$1] || '';
			}
		});
		return html;
	},
	recovery : {
		loading : false,
	},
	recoveryHistory : function( hisId ){
		var _this = this,
			recovery = _this.recovery;
		if(recovery.loading){
			return ;
		}
		recovery.loading = true;

		var url = '/index.php?r=pc/InvitationHistory/recoverHistory',
			data = {
				inv_id     : myinvitation_id,
				history_id : hisId 
			},
			successFn = function(data){
				if(data.status == 0){
					weiyeModule.initWeiyeData(data);
					elModule.hide();
					autoTip('恢复成功!');

				}else{
					autoTip(data.data);
				}
				recovery.loading = false;
			},
			errorFn = function( ){
				recovery.loading = false;
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	}
}

//右键
var rightclickModule = {
	menu : $('<ul class="pop-menu"></ul>'),
	menuList : {
		animation : '<li><a data-type="animation"><span class="iconfont icon-animate"></span>动画</a></li>',
		link : '<li><a data-type="link"><span class="iconfont icon-link2"></span>链接</a></li>',
		sound : '<li><a data-type="sound"><span class="iconfont icon-music-e"></span>音效</a></li>',
		trigger : '<li><a data-type="trigger"><span class="iconfont icon-trigger"></span>触发</a></li>',
		copy : '<li><a data-type="copy"><span class="iconfont icon-copy2"></span>复制</a></li>',
		paste : '<li><a data-type="paste"><span class="iconfont icon-paste2"></span>粘帖</a></li>',
		copyani : '<li><a data-type="copyani"><span class="iconfont icon-copy-animate"></span>复制动画</a></li>',
		pasteani : '<li><a data-type="pasteani"><span class="iconfont icon-past-animate"></span>粘贴动画</a></li>',
		delete : '<li><a data-type="delete"><span class="iconfont icon-delete2"></span>删除</a></li>',
		zIndex : '<li class="pop-menu-bot">'
				+'<a title="上一层" data-type="shang"><span class="iconfont icon-zindex-shang"></span></a>'
				+'<a title="下一层" data-type="xia"><span class="iconfont icon-zindex-xia"></span></a>'
				+'<a title="置最高层" data-type="top"><span class="iconfont icon-zindex-t"></span></a>'
				+'<a title="置最底层" data-type="bottom"><span class="iconfont icon-zindex-b"></span></a>'
				+'</li>'
	},
	add : function(type , target){
		if(type == 'menu'){
			var menuarr = ['animation' , 'link' , 'sound' , 'trigger' , 'copy' , 'paste', 'copyani' , 'pasteani' , 'delete' , 'zIndex'];
			var ele = target.closest('.animate');
			if(ele.length){
				var eltype = elModule.getType(ele);
				// console.log(eltype);
				if(['bg' , 'input' , 'radio' , 'select' , 'checkbox' , 'imgupload' , 'aside' , 'nav' , 'video' , 'map' , 'barrage' ,'pop' , 'vote' , 'like' , 'imgplay', 'advert' , 'photovote' , 'texteditbox' , 'texteditboxbtn' , 'weixinimg' , 'weixinavatar' , 'weixinname', 'weixinvoice' , 'weixinsound'].indexOf(eltype) > -1){
					utilities.ArrayRemoveValue( menuarr , 'link' );
					utilities.ArrayRemoveValue( menuarr , 'trigger' );
				}
				if(['input' , 'radio' , 'select' , 'checkbox' , 'imgupload' ,'submit' , 'weixinvoice' , 'weixinsound' , 'photovote' , 'texteditboxbtn'].indexOf(eltype) > -1){
					utilities.ArrayRemoveValue( menuarr , 'copy' );
				}
				if(! this.operation.copyContent){
					utilities.ArrayRemoveValue( menuarr , 'paste' );
				}
				if(! this.operation.copyAniContent){
					utilities.ArrayRemoveValue( menuarr , 'pasteani' );
				}
			}
			this.menu.empty();
			for (var i = 0; i <= menuarr.length ; i++) {
				this.menu.append(this.menuList[menuarr[i]]);
			};
		}else if(type == 'paste'){
			this.menu.empty().append(this.menuList.paste);
		}else if(type == 'combo'){
			this.menu.empty().append(this.menuList.delete);
		}
		$("#ittwrap").append(this.menu);
	},
	remove : function(){
		this.menu.remove();
	},
	operation : {
		copyContent : null ,
		copy : function(el , ispaste){  //ispaste 是否粘贴
			this.copyContent = null;
			var _curch = el ;
			if (_curch.hasClass('form') || _curch.hasClass('form-ele') || _curch.hasClass('barrage') || _curch.hasClass('slide') || _curch.filter('.nav[data-role="tab"]').length || _curch.hasClass('advert') || _curch.hasClass('weixinvoice') || _curch.hasClass('weixinsound')) {
				autoTip('表单/弹幕/图集/固定栏目/广告/微信语音 不能复制，请在顶部菜单选择添加');
				return false;
			}
			if( _curch.hasClass('photovote') ){
				autoTip("每个微页只能添加一个照片投票！");
				return false;
			}
			this.copyContent = _curch.clone();
			this.copyContent.removeClass('.ui-draggable ui-draggable-handle');
			this.copyContent.children('.drag-inner').remove();

			var _h = _curch.height(),
				_left = _curch.position().left,
				_top = _curch.position().top + _h;
			if ( _top > 520 - _h ) {
				_top = _curch.position().top - _h;
			}
			this.copyContent.css({
				left: _left ,
				top: _top
			});

			if(ispaste){
				this.paste();
			}
			rightclickModule.remove();
			return this.copyContent;
		},
		paste : function(el){
			var copyel = this.copyContent;
			if(! copyel){
				return false;
			}
			if (copyel.hasClass('form') || copyel.hasClass('form-ele') || copyel.hasClass('barrage') || copyel.hasClass('slide') || copyel.filter('.nav[data-role="tab"]').length || copyel.hasClass('advert') || copyel.hasClass('weixinvoice') || copyel.hasClass('weixinsound')) {
				autoTip('表单/弹幕/图集/固定栏目/广告/微信语音 不能复制，请在顶部菜单选择添加');
				return false;
			}
			if( copyel.hasClass('photovote') ){
				autoTip("每个微页只能添加一个照片投票！");
				return false;
			}

			var pasteel = copyel.clone();

			pasteel.css({
				left:'20%',
				top: '50%'
			});

			$('#ittwrap > .page > .pageshow').append(pasteel);
			dragElement(pasteel);

			//修改id
			if(pasteel.hasClass('cast-like')){
				reviseId.reviseLikeId(pasteel);
			}else if(pasteel.hasClass('cast-vote')){
				reviseId.reviseVoteId(pasteel);
			}else if(pasteel.hasClass('svg')) { 
				reviseId.reviseSvgId(pasteel);
			}else if(pasteel.hasClass('cont-map')){
				reviseId.reviseMapId(pasteel);
			}else if(pasteel.hasClass('slide-new')){
				reviseId.reviseImgplayId(pasteel);
			}else if(pasteel.hasClass('texteditbox')){
				reviseId.reviseTexteditboxId(pasteel);
			}else if(pasteel.hasClass('weixinimg')){
				reviseId.reviseWeixinimgId(pasteel);
			}else if(pasteel.hasClass('weixinavatar')){
				reviseId.reviseWeixinavatarId(pasteel);
				pasteel.removeAttr('data-comid');
			}else if(pasteel.hasClass('weixinname')){
				reviseId.reviseWeixinnameId(pasteel);
				pasteel.removeAttr('data-comid');
			}

			pasteel.trigger('mousedown');

			rightclickModule.remove();

			elListModule.refresh();
			recordModule.addRecord();
		},
		//参数 ： el-要删除的元素  ， isdelcombo-是否删除多选元素（true删除，false不删除）
		delete : function(el , isdelcombo){
			isdelcombo = isdelcombo == undefined ? true : isdelcombo;
			var _combo = $('#ittwrap .curchange-combo');
			if(_combo.length && isdelcombo){
				if(_combo.filter( el ).length){
					elModule.delDuoElement(_combo.not( el ));
					elModule.delElement( el );
				}else{
					elModule.delDuoElement(_combo);
				}
			}else{
				elModule.delElement( el );
			}
			elListModule.refresh();
			rightclickModule.remove();
			recordModule.addRecord();
		},
		animation : function(){
			$("#set-tab").children('a[type="animate"]').trigger('click');
		},
		link : function(){
			$("#s-link-btn").trigger('click');
		},
		trigger : function(){
			triggerModule.show();
			rightclickModule.remove();
		},
		shang : function(el){
			zIndexModule.zIndexShang(el);
			elListModule.refresh();
			recordModule.addRecord();
		},
		xia : function(el){
			zIndexModule.zIndexXia(el);
			elListModule.refresh();
			recordModule.addRecord();
		},
		top : function(el){
			zIndexModule.zIndexTop(el);
			elListModule.refresh();
			recordModule.addRecord();
		},
		bottom : function(el){
			zIndexModule.zIndexBottom(el);
			elListModule.refresh();
			recordModule.addRecord();
		},
		sound : function(el){
			var _curch = el,
				data = '';

			if(_curch.hasClass('has-sound-effect')){
				data = {
					id : '',
					music : _curch.attr("musicurl") ,
					title : unescape(_curch.attr("musicname")) || ''
				};
				$("#music-effect-autoplay").prop("checked" , (_curch.attr('musicautoplay') == 'true') );
				$("#music-effect-bgm").prop("checked" , (_curch.attr('musicbgmplay') == 'true') );
			}else{
				$("#music-effect-autoplay").prop("checked" , false );
				$("#music-effect-bgm").prop("checked" , false );
			}

			musicModule.show( data , function(li){
				var musicurl = '',
					musicname = '';

				if(li.length > 0){
					if(li.hasClass('music-choice')){
						musicname = li.attr("data-name");
					}else{
						musicname = li.children('.music-name').text();
					}
					musicurl = li.attr('data-url');
					_curch.addClass('has-sound-effect').attr({
						'musicname': escape(musicname),
						'musicurl': musicurl ,
						'musicautoplay': $("#music-effect-autoplay").prop("checked"),
						'musicbgmplay' : $("#music-effect-bgm").prop("checked")
						// 'musicautoplay': false
					});
				}else{
					_curch.removeClass('has-sound-effect').removeAttr('musicurl musicid musicautoplay musicname musicbgmplay');
				}
				recordModule.addRecord();
				
			} , true );
			rightclickModule.remove();
		},
		copyAniContent : null,
		copyani : function(el){
			var data = {};
			if(el.hasClass('int-animate') && el.attr('animate-arr')){
				data = {
					type : 'duo',
					animateArr : el.attr('animate-arr'),
					isdisappear : el.hasClass('int-animate-disappear'),
					disappearAni : el.attr("disappear-animation")
				}
			}else if(el.attr('animatename')){
				data = {
					type : 'one',
					animateName : el.attr('animatename'),
					animateArr : el.attr("data-animation-style"),
					isdisappear : el.hasClass('int-disappear'),
					disappearAni : el.attr("disappear-animation")
				}
			}else{
				data = {
					type : 'none'
				}
			}
			this.copyAniContent = data;
			
			rightclickModule.remove();
		},
		pasteani : function(el){
			var data = this.copyAniContent;

			showAnimate.cleanTarget( el );
			if(data.type == 'none'){
				el.removeClass('int-animate int-animate-disappear int-disappear fadeOutCenter')
					  .removeAttr('animatename animate-arr disappear-animation data-animation-style')
					  .css({
							'animation-duration': '',
							'-webkit-animation-duration': '',
							'animation-delay': '',
							'-webkit-animation-delay': '',
							'animation-iteration-count': '' ,
							'-webkit-animation-iteration-count': '' 
						});
			}else if(data.type == 'one'){
				data.animateArr = data.animateArr || '{"duration":"1s","delay":"0.2s","iteration-count":"1"}'; 
				var d = JSON.parse(data.animateArr) ; 
				el.removeClass('int-animate').addClass(data.animateName).removeAttr('animate-arr').attr({
					'animatename' : data.animateName ,
					'data-animation-style' : data.animateArr
				}).css({
					'animation-duration': d.duration ,
					'-webkit-animation-duration': d.duration,
					'animation-delay': d.delay,
					'-webkit-animation-delay': d.delay,
					'animation-iteration-count': d['iteration-count'] ,
					'-webkit-animation-iteration-count': d['iteration-count'] 
				});

				if(data.isdisappear){
					el.addClass('int-disappear').removeClass('fadeOutCenter int-animate-disappear').attr('disappear-animation', data.animateName);
				}else{
					el.removeClass('int-disappear int-animate-disappear fadeOutCenter').removeAttr('disappear-animation');
				}
				

			}else if(data.type == 'duo' ){
				el.addClass('int-animate').attr("animate-arr" , data.animateArr ).removeAttr('data-animation-style');

				if (data.isdisappear) {
					el.addClass('int-animate-disappear').removeClass('int-disappear fadeOutCenter').attr('disappear-animation', data.disappearAni );
				}else{
					el.removeClass('int-animate-disappear int-disappear fadeOutCenter').removeAttr('disappear-animation');
				}

			}

			rightclickModule.remove();
			animateModule.getElAnimate();
			recordModule.addRecord();
		}
	}
	
};

//重置元素的id
var reviseId = {
	// 重置投票点赞
	reviseLikeId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _class = el.attr("class");
		_class = _class.match(/cast\-like([0-9]{1,})/g);
		el.removeClass(_class.join(" "));
		var num = utilities.uniqueNum();
		el.attr('likeid' , num).addClass('cast-like' + num);
	},
	// 重置投票点赞
	reviseVoteId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _class = el.attr("class");
		_class = _class.match(/cast\-vote([0-9]{1,})/g);
		el.removeClass(_class.join(" "));
		var num = utilities.uniqueNum();
		el.attr('questionid' , num).addClass('cast-vote' + num);
	},
	// 重置svg点赞
	reviseSvgId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = 'svg' + utilities.uniqueNum();
		el.find('svg').attr("id",_id)
	},
	//重置地图id
	reviseMapId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		if(el.find('.map-wrap').length > 0){
			var _id = 'map' + utilities.uniqueNum();
			el.find('.map-wrap').attr("id" , _id );
		}
	},
	reviseImgplayId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = 'slide' + utilities.uniqueNum();
		el.find('.animate-contain').attr("id" , _id );
		
	},
	// 重置可编辑文本id
	reviseTexteditboxId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = utilities.uniqueNum();
		el.attr({
			"id" : 'TEB' + _id ,
			"el_name" : '可编辑文本' + _id
		});
	},
	// 重置微信图片id
	reviseWeixinimgId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = utilities.uniqueNum();
		el.attr({
			"id" : 'WXI' + _id ,
			"el_name" : '微信图片' + _id
		});
	},
	// 重置微信头像id
	reviseWeixinavatarId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = utilities.uniqueNum();
		el.attr({
			"id" : 'WXA' + _id ,
			"el_name" : '微信头像' + _id
		});
	},
	// 重置微信昵称id
	reviseWeixinnameId : function(el){
		(el instanceof jQuery) ? "" : el = $(el);

		var _id = utilities.uniqueNum();
		el.attr({
			"id" : 'WXN' + _id ,
			"el_name" : '微信昵称' + _id
		});
	},
	//重置投票、点赞、svg动画id
	reviseWrapId : function(){
		var _this = this;
		// 重置点赞的id
		var like = $('#ittwrap').find('.cast-like');
		if(like.length){
			like.each(function(index , el){
				_this.reviseLikeId($(this));
			});
		}
		// 重置投票的id
		var vote = $('#ittwrap').find('.cast-vote');
		if(vote.length){
			vote.each(function(index , el){
				_this.reviseVoteId($(this));
			});
		}
		// 重置svg动画的id
		var svg = $('#ittwrap').find('.svg');
		if(svg.length){
			svg.each(function(index , el){
				_this.reviseSvgId($(this));
			});
		}
		// 重置svg动画的id
		var map = $('#ittwrap').find('.map');
		if(map.length){
			map.each(function(index , el){
				_this.reviseMapId($(this));
			});
		}
		var imgplay = $('#ittwrap').find('.slide-new');
		if(imgplay.length){
			imgplay.each(function(index , el){
				_this.reviseImgplayId($(this));
			});
		}
		// 重置可编辑文本id
		var texteditbox = $('#ittwrap').find('.texteditbox');
		if(texteditbox.length){
			texteditbox.each(function(index , el){
				_this.reviseTexteditboxId($(this));
			});
		}
		// 重置微信图片id
		var weixinimg = $('#ittwrap').find('.weixinimg');
		if(weixinimg.length){
			weixinimg.each(function(index , el){
				_this.reviseWeixinimgId($(this));
			});
		}
		// 重置微信头像id
		var weixinavatar = $('#ittwrap').find('.weixinavatar');
		if(weixinavatar.length){
			weixinavatar.each(function(index , el){
				_this.reviseWeixinavatarId($(this));
			});
		}
		// 重置微信昵称id
		var weixinname = $('#ittwrap').find('.weixinname');
		if(weixinname.length){
			weixinname.each(function(index , el){
				_this.reviseWeixinnameId($(this));
			});
		}

	}
};

// 层级
var zIndexModule = {
	// 初始化层级 从200开始
	setZIndex : function(){
		var elarr = [];
		$.each($('#ittwrap .animate'),function(indx,item){
			var curZindex = parseInt(item.style.zIndex) || indx;
			elarr.push({
				"el":$(item),
				"zIndex":curZindex,
				'index' : indx
			});
		});
		elarr.sort(function(a,b){
			return a.zIndex - b.zIndex;
		});

		var pageshow = $('#ittwrap .pageshow');
		for (var i = 0; i < elarr.length; i++) {
			elarr[i].el.css("z-index" , '');
			pageshow.append(elarr[i].el);
		};
		elarr[elarr.length-1] && elarr[elarr.length-1].el.addClass('js-max-zIndex').siblings().removeClass('js-max-zIndex');
		return '';

	},
	// 设置层级最上一层和最下一层 ，上一层，下一层时层级交换
	exchangeZIndex : function(target ,zi){
		var _curch = target,
			_zd = _curch.css("z-index"),
			_next = _curch.next();

		$.each($('#ittwrap .animate'),function(indx,item){
			var curZindex = $(item).css("z-index");

			if(curZindex == zi){
				$(item).css("z-index" , _zd);
				if(_zd == zMaxIndex){
					$(item).addClass('js-max-zIndex').siblings().removeClass('js-max-zIndex');
				}
			}
		});
		zi = Math.max(200,Math.min(zi,zMaxIndex));
		_curch.css("z-index" , zi);

	},
	zIndexShang : function(target){
		var ne = target.next();
		target.insertAfter(ne);
	},
	zIndexXia : function(target){
		var pr = target.prev();
		target.insertBefore(pr);
	},
	zIndexTop : function(target){
		$('#ittwrap .pageshow').append(target);
	},
	zIndexBottom : function(target){
		$('#ittwrap .pageshow').prepend(target);
	}
};

//微站
var weizhanModule = {
	hasinit : false,
	initWeizhanTy : function(sfn){
		var _this = this;
		if(_this.hasinit){
			return ;
		}
		_this.hasinit = true;

		var url = '/index.php?r=Usercenter/MyPageInfo',
			data = {
			},
			successFn = function(data){
				if(data.status == 0){
					var is_edit_weizhan = !!data.data.is_edit; // 0 表示没有编辑过，1 表示编辑过
					if(is_edit_weizhan){
						_this.isEdit = true;
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
			};

		$ajax( url , "get", data , "json", successFn, errorFn);
	},
	isEdit : false,
	show : function(){
		this.initWeizhanTy();

		if(this.isEdit){
			$("#weizhan-wrap").addClass('show');
		}else{
			confirmTip({
				text : '编辑微站资料后 即可添加微站到微页中',
				ConfirmFunction: function(){
					window.open('/index.php?r=pc/IndexNew/showWeizhanDetail');
				}
			});
		}
	}
};

//多选
var multiModule = {
	hasinit : false ,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		$("#multi-opt").draggable({
			containment: "window"
		});
		$("#multi-opt").on('click', 'span', function(event) {
			var _this = $(this),
				type = _this.attr("type");

			multiModule.operation[type]();

		}).on('click', '.multi-close', function(event) {
			multiModule.hide();
		});
	},
	operation : {
		getElData : function(){
			var _this = this,
				minleft = 330,
				maxright = 0,
				mintop = 520,
				maxbottom = 0,
				centerx = 0,
				centery = 0,
				element = [];

			$.each($('#ittwrap .curchange-combo'),function(index, el){
				var _el = $(el),
					position = _el.position();

				element[index] = {
					item: _el,
					width : _el.outerWidth(),
					height :  _el.outerHeight(),
					left: position.left,
					top:  position.top,
					right:position.left + _el.outerWidth(),
					bottom: position.top  + _el.outerHeight()
				}
				minleft  = element[index].left  < minleft  ? element[index].left  : minleft;
				maxright = element[index].right > maxright ? element[index].right : maxright;
				mintop   = element[index].top   < mintop   ? element[index].top   : mintop;
				maxbottom  = element[index].bottom  > maxbottom  ? element[index].bottom  : maxbottom;
				centerx = (minleft  + maxright ) / 2;
				centery = (mintop   + maxbottom) / 2;

			});
			_this.element = element;
			_this.minleft = minleft;
			_this.maxright = maxright;
			_this.mintop = mintop;
			_this.maxbottom = maxbottom;
			_this.centerx = centerx;
			_this.centery = centery;
		},
		left : function(){  //左对齐
			var _this = this;
			_this.getElData();

			$('#ittwrap .curchange-combo').css({
				'left': _this.minleft + 'px',
				'right':''
			});
			recordModule.addRecord();
		},
		right : function(){  //右对齐
			var _this = this;
			_this.getElData();

			var element = _this.element;
			for(var i=0 ; i < element.length; i++){
				element[i].item.css({
					'left': _this.maxright - element[i].width + 'px',
					'right': ''
				});
			}
			recordModule.addRecord();
		},
		lrcenter : function(){ //左右居中
			var _this = this;
			_this.getElData();

			var element = _this.element;
			for(var i=0 ; i < element.length; i++){
				var offset = (element[i].left + element[i].right) /2 - _this.centerx;
				element[i].item.css({
					'left': element[i].left - offset + 'px',
					'right': ''
				});
			}
			recordModule.addRecord();
		},
		top : function(){  //顶对齐
			var _this = this;
			_this.getElData();

			$('#ittwrap .curchange-combo').css({
				'top': _this.mintop + 'px',
				'bottom':''
			});
			recordModule.addRecord();
		},
		bottom : function(){  //底对齐
			var _this = this;
			_this.getElData();

			var element = _this.element;
			for(var i=0 ; i < element.length; i++){
				element[i].item.css({
					'top': _this.maxbottom - element[i].height + 'px',
					'bottom':''
				});
			}
			recordModule.addRecord();
		},
		udcenter : function(){  //上下对齐
			var _this = this;
			_this.getElData();

			var element = _this.element;
			for(var i=0 ; i < element.length; i++){
				var offset = (element[i].top + element[i].bottom)/2 - _this.centery;
				element[i].item.css({
					'top': (element[i].top - offset) + 'px',
					'bottom': ''
				});
			}
			recordModule.addRecord();
		},
		verEquidistance : function(){  //纵向等距
			var _this = this;
			_this.getElData();

			var element = _this.element,
				totHeight = 0,
				totdistance = 0,
				totdiff = 0,
				diff = 0,
				length = element.length;
			element = element.sort(function(a,b){
					return a.top - b.top;
				});
			var elsortbot = element.concat().sort(function(a,b){
					return a.bottom - b.bottom;
				});

			// console.log(element);
			// console.log(elsortbot);
			for(var i=0 ; i < length; i++){
				totHeight += element[i].height;
			}
			totdistance = elsortbot[length-1].bottom - element[0].top;
			totdiff = totdistance - totHeight;
			diff = totdiff / (length - 1);

			// console.log(totHeight);
			// console.log(totdistance);
			// console.log(totdiff);
			// console.log(diff);

			var offset = element[0].top;
			for(var i=0 ; i < length; i++){
				if(i != 0 && i != length - 1){
					elsortbot[i].item.css({
						'top': offset + 'px',
						'bottom': ''
					});
				}
				offset += elsortbot[i].height + diff;
			}
		},
		horEquidistance : function(){  //横向等距
			var _this = this;
			_this.getElData();

			var element = _this.element,
				totWidth = 0,
				totdistance = 0,
				totdiff = 0,
				diff = 0,
				length = element.length;
			element = element.sort(function(a,b){
					return a.left - b.left;
				});
			var elsortrig = element.concat().sort(function(a,b){
					return a.right - b.right;
				});

			// console.log(element);
			// console.log(elsortrig);
			for(var i=0 ; i < length; i++){
				totWidth += element[i].width;
			}
			totdistance = elsortrig[length-1].right - element[0].left;
			totdiff = totdistance - totWidth;
			diff = totdiff / (length - 1);

			// console.log(totWidth);
			// console.log(totdistance);
			// console.log(totdiff);
			// console.log(diff);

			var offset = element[0].left;
			for(var i=0 ; i < length; i++){
				if(i != 0 && i != length - 1){
					elsortrig[i].item.css({
						'left': offset + 'px',
						'right': ''
					});
				}
				offset += elsortrig[i].width + diff;
			}
		},
		delete : function(){
			var _combo = $('#ittwrap .curchange-combo');

			if(_combo.filter(".curchange").length){
				elModule.delDuoElement(_combo.not(".curchange"));
				elModule.delElement(_combo.filter(".curchange"));
			}else{
				elModule.delDuoElement(_combo);
			}
			recordModule.addRecord();
			multiModule.hide();
		}
	},
	show : function(){
		this.init();
		$("#multi-opt").addClass('show');
	},
	hide : function(){
		$("#multi-opt").removeClass('show');
	}
};

// 前进，后退
var recordModule = {
	record : [] ,
	backwardbtn : $("#backward"),
	forwardbtn : $("#forward"),
	index : 0,
	showState : function(){
		if(this.index > 0){
			this.backwardbtn.removeClass('disabled');
		}else{
			this.backwardbtn.addClass('disabled');
		}
		if(this.index < this.record.length - 1){
			this.forwardbtn.removeClass('disabled');
		}else{
			this.forwardbtn.addClass('disabled');
		}
	},
	getHtml : function(){
		var _html = $("#ittwrap").html();
		_html = $(_html);

		$.each( _html.find('.animate') , function(index, el) {
			var _el = $(el);
			_el.removeClass("ui-draggable ui-draggable-handle ui-resizable ui-rotatable");
			_el.children('.drag-inner').remove();
		});

		_html.find('.pop-menu').remove();

		_html.find('.ui-sortable').removeClass('ui-sortable');

		_html.find(".cont-map").each(function(index, el) {
			$(el).find('.map-wrap').html('').removeAttr('style');	
		});

		return _html.prop("outerHTML");
	},
	addRecord : function(type){
		var _this = this;

		_this.record.splice(_this.index + 1);

		var html = _this.getHtml();
			re = {
				type : type ? type : "change" ,
				html : html 
			}

		_this.record.push(re);
		_this.index = _this.record.length - 1;

		this.showState();
	},
	back : function(){
		if(this.index <= 0){
			return ;
		}
		this.index -- ;

		var length = this.record.length,
			re = this.record[ this.index ];

		$("#ittwrap").html(re.html);
		pageModule.initIttwrap();

		if(this.record[this.index + 1].type == "tpl"){
			// var bg = pageModule.getSectionBg();
			// $("#page-list").children('.active').find('.page-li-bg').children('img').attr("src" , bg);
			$("#page-list").children('.active').find('.page-li-thumb').html(re.html.replace(/\sid/g , ' data-id'));
		}

		this.showState();
	},
	go : function(){
		var length = this.record.length;

		if(this.index >= length - 1){
			return ;
		}
		this.index ++;

		var re = re = this.record[ this.index ]

		$("#ittwrap").html(re.html);
		pageModule.initIttwrap();

		if(re.type == "tpl"){
			// var bg = pageModule.getSectionBg();
			// $("#page-list").children('.active').find('.page-li-bg').children('img').attr("src" , bg);

			$("#page-list").children('.active').find('.page-li-thumb').html(re.html.replace(/\sid/g , ' data-id'));
		}

		this.showState();
	},
	removeRecord : function(){
		this.record = [];
		this.showState();
	}
};

//文字特效
var textEffectModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		// 特效开始时间
		initSlider($("#texte-delay") , $("#texte-delay-i") ,{ 
			max : 10 ,
			min : 0 ,
			step : 0.1 ,
			value : 1 ,
			slide : function(ui){
				var _curch = $("#ittwrap .curchange"),
					_val = ui.value ;

			},
			stop : function(ui){
				textEffectModule.showPreview();
			}
		});
		// 特效持续时间
		initSlider($("#texte-duration") , $("#texte-duration-i") ,{ 
			max : 10 ,
			min : 0 ,
			step : 0.1 ,
			value : 1 ,
			slide : function(ui){
				var _curch = $("#ittwrap .curchange"),
					_val = ui.value ;

			},
			stop : function(ui){
				textEffectModule.showPreview();
			}
		});

		$("#texte-list").on('click', 'li', function(event) {
			var _this = $(this),
			    value = _this.attr("data-value"),
			    dir = _this.attr("data-dir"),
			    textdir = $("#texte-dir");

			if(_this.hasClass('active')){
				textdir.hide();
				_this.removeClass('active');
				return;
			}

			textdir.attr("data-dir" , dir);
			if(dir == 't0'){
				textdir.hide();
			}else{
				textdir.css('display' , 'inline-block');
			}

			_this.addClass('active').siblings().removeClass('active');

			if(! textdir.children('.active').is(":visible")){
	        	textdir.children('.'+ dir).eq(0).addClass('active').siblings().removeClass('active');
	        }

	        textEffectModule.showPreview();
		});

		$("#texte-dir").on('click', 'span', function(event) {
			var _this = $(this),
			    value = _this.attr("data-value");

			_this.addClass('active').siblings().removeClass('active');

			textEffectModule.showPreview();

		});

		$("#texte-b-wrap").on('click', '.texte-comfirm', function(event) {
			var _li = $("#texte-list").children('.active'),
				_curch = $("#ittwrap .curchange"),
				_animate =  _curch.children(".animate-contain");

			if(_li.length <= 0){
				if(_curch.hasClass('textanimate')){
					_curch.removeClass('textanimate').removeAttr('textanimate textduration textdelay');
					_animate.html(_animate.attr("textcontent")).removeAttr('textcontent');
					// $("#text-radio2").prop('checked', false);
				}
			}
			else{
			// 	// $("#text-radio2").prop('checked', true);
				// if($("#fontvalue").attr("data-value") == "无"){
				// 	textEffectModule.setEleEffect();
				// }else{
				// 	confirmTip({
				// 		text : '使用文字特效，特殊字体与字体样式将会失效，是否继续使用？',
				// 		ConfirmFunction: function(){
				// 			textEffectModule.setEleEffect();
				// 			textEffectModule.hide();
				// 		}
				// 	});
				// 	return ;
				// }
				textEffectModule.setEleEffect();
			}

			textEffectModule.hide();
		}).on('click', '.texte-cancel', function(event) {
			textEffectModule.hide();
		});
	},
	show : function(){
		this.init();
		this.getEleEffect();
		$("#text-effect").addClass('show');
	},
	hide : function(){
		$("#text-effect").removeClass('show');
	},
	//预览动画
	showPreview : function(){
		var _li = $("#texte-list").children('.active');

		if(_li.length <= 0){
			return ;
		}

		var _animate = _li.attr("data-value") + $("#texte-dir").children('.active').attr("data-value"),
			// _delay = $("#texte-delay").slider('value'),
			// _duration = $("#texte-duration").slider('value');
			_delay = parseFloat( $("#texte-delay-i").val() ),
			_duration = parseFloat( $("#texte-duration-i").val() );

		$("#texte-preview").html('<p>咫尺微页文字动画</p>');
		$("#texte-preview").children('p').textillate({
			initialDelay: _delay * 1000,
					in: { 
						effect: _animate ,
						duration: _duration
						}
				});
	},
	//保存设置
	setEleEffect : function(){
		var _li = $("#texte-list").children('.active'),
			_curch = $("#ittwrap .curchange"),
			_ani =  _curch.children(".animate-contain"),
			fontSize = $("#text-e-space").find('.richText-fontsize').children('.selecta').text();

		var _text ='',
			_html = textNewrich.getContent();

		$(_html).each(function(index, el) {
			var _el = $(el),
				text = _el.text();
			if(_el.text() == ''){
				return ;
			}
			_text +=  _el.css({'font-size': fontSize}).text(text).prop('outerHTML') ;

		});

		textNewrich.setContent(_text);

		var _animatenmae = _li.attr("data-value") + $("#texte-dir").children('.active').attr("data-value"),
			// _delay = $("#texte-delay").slider('value'),
			// _duration = $("#texte-duration").slider('value');
			_delay = parseFloat( $("#texte-delay-i").val() ),
			_duration = parseFloat( $("#texte-duration-i").val() );

		_ani.html(_text).attr("textcontent", _text).removeAttr('artfont artfonttype artfonttext').css("font-family",'');
		_curch.addClass('textanimate').attr({
			"textanimate": _animatenmae,
			"textduration": _duration,
			"textdelay": _delay * 1000
		}).removeClass('artfont');

		$("#fontvalue").val('微软雅黑(默认)').attr('data-value' , "无").removeAttr('accesskey');

		_ani.find("p").textillate({
			initialDelay: _curch.attr("textdelay"),
			in: { 
				effect:  _curch.attr("textanimate") ,
				duration: _curch.attr("textduration"),
				callback: function (wrap) {
					wrap.html(wrap.children('ul').text());
				}
			}
		});

	},
	// 展示文字动画
	showTextAnimate : function (txt){
		txt.find('.textanimate').each(function(index, el) {
			var _el = $(el),
				_animate = _el.find(".animate-contain"),
				_text = _animate.attr("textcontent"),
				_html = '';
			$(_text).each(function(ind, item) {
				_html += $(item).html($(item).text()).prop("outerHTML");
			});
			_animate.html(_html);
			var dy = parseFloat(_el.attr("textdelay")),
				ey = _el.attr("textanimate"),
				du = parseFloat(_el.attr("textduration"));
			_animate.find("p").textillate({
					initialDelay: dy,
					in: {	
							effect:  ey,
							duration: du,
							callback: function (wrap) {
								wrap.html(wrap.children('ul').text());
							}
						}
				});

		});
	},
	//获取元素的动画
	getEleEffect : function(){
		var _curch = $("#ittwrap .curchange"),
			animatename = '',
			delay = 1 ,
			duration = 1,
			dir = 't0',
			_li ,
			textdir = $("#texte-dir");

		if(_curch.hasClass('textanimate')){
			animatename = _curch.attr("textanimate"),
			delay = parseInt(_curch.attr("textdelay")) / 1000 ,
			duration = _curch.attr("textduration");
		}

		if( animatename == ''){
			$("#texte-list").children('li').removeClass('active');
			dir = 't0';
		}else{
			var _d = this.matchAnimateDir(animatename),
				_r = new RegExp(_d +'$')
				_name = animatename.replace( _r , '');

			_li = $("#texte-list").children('li[data-value="'+_name+'"]');

			if(_li.length > 0){
				_li.addClass('active').siblings().removeClass('active');
				dir = _li.attr("data-dir");
			}else{
				$("#texte-list").children('li').removeClass('active');
				dir = 't0';
			}
			textdir.children('span[data-value="'+_d+'"]').addClass('active').siblings().removeClass('active');
		}

		textdir.attr("data-dir" , dir);
		if(dir == 't0'){
			textdir.hide();
		}else{
			textdir.css('display' , 'inline-block');
		}

		$("#texte-delay").slider('value' , delay);
		$("#texte-delay-i").val( delay );
		$("#texte-duration").slider('value' , duration);
		$("#texte-duration-i").val( duration );
	},
	animateDir : ['Center' , 'Left' , 'Right' , 'Up' , 'Down' , 'DoLe' , 'DoRi' , 'ULe' , 'URi' , 'X' , 'Y' ] ,
	matchAnimateDir : function( name ){//匹配出动画的方向
		var dir = '';
		$.each( this.animateDir ,function(index, el) {
			var _re = new RegExp(el +'$');
			if(_re.test( name )){
				dir = el;
				return false;
			}
		});

		return dir ;
	}
};

//文字字体
var fontModule = {
	trycount : 0 ,
	getPCFont : function(){
		var _this = this;
		try{
			_this.showPCFontList();
		}catch(e){
			// console.log(e);
			_this.trycount ++ ;

			if(_this.trycount < 20){
				setTimeout(function(){
					_this.getPCFont();
				}, 2000);
			}else{
				$("#pcfont-list").children('.loading').text("扫描失败!");

				_this.getyouzikuPreviw();
			}
		}
	},
	showPCFontList : function () {
		var fonts = this.getFontList();
		var selectStr = "",
			fontArr = [];

		for (var i = 0; i < fonts.length; i++) {
			var fontName = fonts[i].fontName;
			if (!(/^[A-Za-z0-9\-\_\s]+$/.test(fontName))) {
				var ff = '';
				if(fonts.length < 500){
					ff = 'font-family:\''+ fontName + '\'';
				}
				selectStr += '<li data-value="' + fontName + '" style="'+ ff +'"><span>' + fontName + '</span></li>';
				fontArr.push(fontName);
			}
		}
		$("#pcfont-list").find('.loading').remove();
		$("#pcfont-list").children('li').eq(1).after(selectStr);

		this.getyouzikuPreviw();

	},
	getFontList : function () {
		var isIE = navigator.appName.indexOf("Microsoft") != -1;
		var ob = (isIE) ? window["fontListFlash"] : document["fontListFlash"];
		var font = ob.getAllFonts();
		return font;
	},
	fontload : function(li, fname , ft){
		li.append('<img class="font_loading" src="' +cdnUrl+ '/static/pc/invitation/images/loading.gif" alt="" />');
		var img = new Image();
		img.onerror = function(e){
			li.attr("data-isload" , 1).find('.font_loading').remove();
			$("#pcfont-list").attr('data-isload' , 0);
			li.append('<i>已缓存</i>');
		}
		img.src = '/zhichi_frontend/ttf_file/' + fname + '.' + ft;
	},
	getFontImg : function (cur , succfunc){
		var _width = cur.width(),
			_height = cur.height(),
			_canvasW, _canvasH , _canvasS;

		if(_height > 300){
			_canvasS = 600 / _height;
		}else if(_height > 200){
			_canvasS = 2;
		}else{
			_canvasS = 3;
		}
		_canvasW = _width * _canvasS;
		_canvasH = _height * _canvasS;

		$("#font-area").css({
			width : _width,
			height : _height,
			'transform': 'scale('+ _canvasS +')',
			'-webkit-transform': 'scale('+ _canvasS +')'
		}).html(cur.find(".animate-contain").prop("outerHTML"));
		$("#font-area").children('.animate-contain').css('background-color','');

		html2canvas($("#font-area")[0], {
			width: _canvasW,
			height: _canvasH,
			onrendered: function(canvas) {
				var _img = canvas.toDataURL("image/png");
				// cur.find(".animate-contain").html('<img src="' + _img + '" alt="" style="width: 100%;">');

				removeLoading();
				showLoading();
				$.ajax({
					url : '/index.php?r=AppData/uploadImg',
					type: 'post',
					data: {img_data: _img , org : 1},
					timeout : 30000,
					dataType: 'json',
					success: function(data){
							removeLoading();
							if(data.status == 0){
								cur.find(".animate-contain").html('<img src="' + data.data + '" alt="" style="width: 100%;">');
								// cur.find(".animate-contain").find('img').attr('src', data.data);
								succfunc && succfunc();
							}
					},
					error: function(jqXHR, textStatus){
					}
				});
			}
		})
	},
	getyouzikuPreviw : function(){
		var entity = {
			tags: []
        },
		weiyefont = $("#pcfont-list").children('.weiyefont');
		
		weiyefont.each(function(index, el) {
			var tag = {
	            Tag: index ,
	            AccessKey: $(el).attr("AccessKey"),
	            Content: $(el).children('span').text() + '咫尺微页'
            };
			entity.tags.push(tag);
		});

		var url = '/index.php?r=YouZiKu/GetBatchWoffFontFace',
			ddata = entity ,
			successFn = function( data ){
				if(data.Code == 200){
					var FontFace = '';
					$.each( data.FontfaceList ,function(index, val ) {
						FontFace += val.FontFace ;
						weiyefont.eq(index).children('span').css("font-family" , val.FontFamily);
					});
					$("head").append("<style>" + FontFace + "</style>");
				}else{
					autoTip(data.ErrorMessage);
				}

			},
			errorFn = function(){
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn);
	},
	getyouzikuFont : function(){
		var text = textNewrich.getText(),
			AccessKey = $("#fontvalue").attr("AccessKey");

		if(! text || !AccessKey){
			return;
		}

		$.ajax({
			url: '/index.php?r=YouZiKu/GetFontFace',
			type: 'get',
			dataType: 'json',
			data: {
				accesskey: AccessKey ,
                content: text 
			},
			success : function(data){
				if(data.Code == 200){
					$("head").append("<style>" + data.FontFace + "</style>");
					$("#ittwrap .curchange").children('.animate-contain').css("font-family" , data.FontFamily);
				}else{
					autoTip(data.ErrorMessage);
				}
			},
			error : function(){

			}
		});
	}
};

// 讨论区添加
var articleModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		$("#customize-article").on('click', '.ctm-art-close', function(event) {
			articleModule.hide();
		}).on('click', '.ctm-art-can', function(event) {
			articleModule.hide();
		}).on('click', '.ctm-art-con', function(event) {
			var _this = $(this),
				title = $("#ctm-art-i").val(),
				content = $("#ctm-art-n").val();

			if( !title ){
				autoTip('请输入标题');
				return ;
			}
			if( !content ){
				autoTip('请输入内容');
				return ;
			}

			if(_this.hasClass('loading')){
				return;
			}
			_this.addClass('loading');

			var url = '/index.php?r=Article/CreateArticle',
				ddata = {
					id: '',
					type: 0,
					title: title,
					description: content,
					tags_title: ['微页讨论区'],
					group_id: '',
				},
				successFn = function( data ){
					if(data.status == 0){
						linkModule.articleVm.items.unshift({
							id : data.id ,
							title : title ,
							description : content
						});
						articleModule.hide();
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading');
				},
				errorFn = function(){
					_this.removeClass('loading');
				};

			$ajax( url , "post", ddata , "json", successFn, errorFn);

		});

	},
	show : function(){
		this.init();
		$("#customize-article").addClass('show');
	},
	hide : function(){
		$("#customize-article").removeClass('show');
		$("#ctm-art-i").val('');
		$("#ctm-art-n").val('');
	}
};

//游戏定制
var gameModule = {
	hasinit : false ,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		var validatorFunc = function(){
			var validator = new Validator();

			validator.add( $("#ctm-game-name").val() , [{
				strategy : 'isNonEmpty',
				errorMsg : '用户名不能为空'
			}]);

			validator.add( $("#ctm-game-phone").val() , [{
				strategy : 'isNonEmpty',
				errorMsg : '手机号码不能为空'
			},{
				strategy : 'isMobile',
				errorMsg : '手机号码格式不正确'
			}]);

			validator.add( $("#ctm-game-qq").val() , [{
				strategy : 'isNonEmpty',
				errorMsg : 'QQ号不能为空'
			},{
				strategy : 'isQQ',
				errorMsg : 'QQ号不正确'
			}]);

			validator.add( $("#ctm-game-d").val() , [{
				strategy : 'isNonEmpty',
				errorMsg : '描述不能为空'
			}]);

			var errorMsg = validator.start();
			return errorMsg;

		};

		$("#customize-game").on('click', '.ctm-game-close', function(event) {
			gameModule.hide();
		}).on('click', '.ctm-game-can', function(event) {
			gameModule.hide();
		}).on('click', '.ctm-game-con', function(event) {
			var _this = $(this),
				name = $("#ctm-game-name").val(),
				phone = $("#ctm-game-phone").val(),
				qq = $("#ctm-game-qq").val(),
				budget = $("#ctm-game-b").val(),
				desc = $("#ctm-game-d").val();

			var errorMsg = validatorFunc();
			if( errorMsg ){
				autoTip( errorMsg );
				return;
			}

			if(_this.hasClass('loading')){
				return;
			}
			_this.addClass('loading');

			var url = '/index.php?r=pc/InvitationNew/AddGameDemand',
				ddata = {
					name: name ,
					phone: phone,
					qq: qq ,
					budget: budget ,
					description: desc
				},
				successFn = function( data ){
					if(data.status == 0){
						gameModule.hide();
						autoTip("您的需求我们已经收到，请等待客服与您联系。");
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading');
				},
				errorFn = function(){
					_this.removeClass('loading');
				};

			$ajax( url , "post", ddata , "json", successFn, errorFn);

		});
	},
	show : function(){
		this.init();

		$("#customize-game").addClass('show');
	},
	hide : function(){
		$("#customize-game").removeClass('show');
		$("#ctm-game-name").val(''),
		$("#ctm-game-phone").val(''),
		$("#ctm-game-qq").val(''),
		$("#ctm-game-b").val(''),
		$("#ctm-game-d").val('');
	}
};

//添加公众号
var gzhModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		$("#customize-gzh").on('click', '.ctm-gzh-qcode', function(event) {
		//公众号上传二维码

			$("#images-space").addClass('zIndex12');
			imagesModule.show(function(img){
				$("#ctm-gzh-qcimg").attr("src" , img);
				$("#images-space").removeClass('zIndex12');
			} , function(){
				$("#images-space").removeClass('zIndex12');
			} , 1 , false);
			
		}).on('click', '.ctm-gzh-thumb', function(event) {
		//公众号上传封面

			$("#images-space").addClass('zIndex12');
			imagesModule.show(function(img){
				$("#ctm-gzh-thimg").attr("src" , img);
				$("#images-space").removeClass('zIndex12');
			} , function(){
				$("#images-space").removeClass('zIndex12');
			} , 1 , false);
		}).on('click', '.ctm-gzh-can', function(event) {
		//公众号添加确定
			var _this = $(this),
				name = $("#ctm-gzh-name").val(),
				id = $("#ctm-gzh-id").val(),
				qcode = $("#ctm-gzh-qcimg").attr("src");

			if( !name ){
				autoTip("请填写公众号名称！");
				return ;
			}
			if( !id ){
				autoTip("请填写公众号原始id！");
				return ;
			}
			if( !qcode ){
				autoTip("请上传公众号二维码！");
				return ;
			}

			if(_this.hasClass('loading')){
				return;
			}
			_this.addClass('loading');

			var url = '/index.php?r=pc/GzhAccount/addGzhAccount',
				ddata = {
					name: name ,
					gzh_id: id ,
					// app_id: ,
					// app_secret: ,
					gzh_qrcode: qcode,
				},
				successFn = function( data ){
					if(data.status == 0){

						linkModule.gzhVm.items.unshift({
							id : data.data ,
							name : name ,
							app_id : '',
							app_secret : '',
							qrcode : qcode
						});

						gzhModule.hide();
						
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading');
				},
				errorFn = function(){
					_this.removeClass('loading');
				};

			$ajax( url , "post", ddata , "json", successFn, errorFn);

		}).on('click', '.ctm-gzh-close', function(event) {
			gzhModule.hide();
		});

	},
	show : function(){
		this.init();

		$("#customize-gzh").addClass('show');
	},
	hide : function(){
		$("#customize-gzh").removeClass('show');

		$("#ctm-gzh-name").val(''),
		$("#ctm-gzh-id").val(''),
		$("ctm-gzh-qcimg").attr("src" , '');
	}
}

// 网格设置
var gridModule = {
	hnum : 24 ,
	vnum : 16 ,
	// grid_off : false,
	initgrid : function(h,v){
		// if(!this.grid_off){
		// 	return;
		// }
		var _hnum = Number(h),
			_vnum = Number(v);
		var conwpW = $("#ittwrap").width();
		var conwpH = $("#ittwrap").height();		
		var _l = conwpW / _vnum,
			_t = conwpH / _hnum,
			grid_html = '';

		// console.log(_l);
		// console.log(_t);
		var _color = $("#grid-color").spectrum("get").toRgbString();
		for (var i = 1; i < _hnum; i++) {
			grid_html += '<div class="grid-h-line" style="top:' + (_t*i + 40 ) + 'px; background-color: ' +_color+ ';"></div>';
		};
		for (var i = 1; i < _vnum; i++) {
			grid_html += '<div class="grid-v-line" style="left:' + (_l*i) + 'px; background-color: ' +_color+ ';"></div>';
		};

		$("#ittwrap").after(grid_html);

		// console.log("test: grid ok");
	},
	show : function(){
		$("#phone-right").addClass('zIndex7');
		$("#grid-set").addClass('show');
		$("#pr-grid").addClass('active');
	},
	hide : function(){
		$("#phone-right").removeClass('zIndex7');
		$("#grid-set").removeClass('show');
		$("#pr-grid").removeClass('active');
	}
};

//新手引导
var guideModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.bindEvent();

		this.loadImages();

		this.setNoOne(2);
	},
	hasbindEvent : false,
	bindEvent : function(){
		if(this.hasbindEvent){
			return ;
		}
		this.hasbindEvent = true;

		$("#guide-space").on('click', '.guide-btn', function(event) {
			var _this = $(this),
				_type = _this.attr("type");

			if(_type == 'next'){
				_this.parent().next().addClass('active').siblings().removeClass('active');
			}else if(_type == 'ok'){
				guideModule.hide();
			}
		});
	},
	loadImages : function(){
		$("#guide-space").find('img').each(function(index, el) {
			el.src = $(el).attr("load-src");
		});
	},
	setNoOne: function(mk){
		var url = '/index.php?r=pc/IndexNew/InvUseMarkNew',
			ddata = {
				mark : mk
			},
			successFn = function( data ){
				if(data.status == 0){
					
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function(){
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn);
	},
	isfirst : [true , true , true],
	show : function(where){
		if(! pmi_list.isone || ! this.isfirst[where]){
			return;
		}
		this.init();
		$("#guide-space").addClass('show');

		var index = 0;
		if(where == 0){ //普通
			index = 0;
		}else if(where == 1){  //元素管理
			index = 8;
		}else if(where == 2){  //生成之后
			index = 7;
		}
		this.isfirst[where] = false;

		$("#guide-space").children().eq(index).addClass('active').siblings().removeClass('active');
	},
	hide : function(){
		$("#guide-space").removeClass('show');
	},
	showCollect : function(){
		if( pmi_list.isCollectFirst ){
			pmi_list.isCollectFirst = false;
			this.setNoOne(3);
			this.bindEvent();
			var page9 = $("#guide-space").children().eq(8);
			page9.addClass('active').siblings().removeClass('active');
			page9.children('img').attr('src' , page9.children('img').attr("load-src"));
			$("#guide-space").addClass('show');
		}
	}
};

// cookie
var cookieModule = {
	getCookie : function(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	},
	setCookie : function (c_name, value, expirehours) {
		var exdate = new Date();
		exdate.setHours(exdate.getHours() + expirehours);
		document.cookie = c_name + "=" + value +
			((expirehours == null) ? "" : "; expires=" + exdate.toGMTString())
	},
	checkCookie : function() {
		var open_id = this.getCookie('open_id'),
			open_id_arr = open_id.split(','),
			iss = GetQueryString("serise");

		if (iss == null && open_id != null && open_id != "" && open_id_arr.indexOf(myinvitation_id) > -1 && myinvitation_id != '') {
			alert("当前微页已经在其他页面编辑，请勿重复打开，以免自动保存将数据覆盖。");
			// window.close();
		} else {
			open_id_arr.push(myinvitation_id);
			open_id = open_id_arr.join();

			if (open_id != null && open_id != "") {
				this.setCookie('open_id', open_id, 12)
			}
		}
	}
};

//VIP 购买
var VipModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		this.getCopyrightComboPrice();
	},
	// vip套餐价格
	getCopyrightComboPrice : function(){
		$.ajax({
			url : '/index.php?r=pc/InvitationData/pricelist',
			type: 'get',
			dataType: 'json',
			success: function(data){
				if(data.status !== 0) {
					autoTip(data.data); 
					return;
				}
				var vip = data.data;

				$.each(vip, function(index, combo){
					if (index <=2) {
						$('#person-vip-version li').eq(index).attr({'data-price': combo.price, 'data-weibi' : combo.integral});
					}else{
						$('#weiye .price').eq(index - 2).attr({'data-price': combo.price,'data-weibi':combo.integral});
					}
				});
				$('#app .price').eq(1).attr({'data-price':vip[5].price,'data-weibi':vip[5].integral});
				$('#person-vip-version').attr('data-html', $('#person-vip-version').html());
				$("#payment-money").text(vip[0].price);
				$("#need-weibi").text(vip[0].integral);
			}
		});
	},
	show : function(){
		this.init();

		var vipInfo = {
				
			},
			param = {
				obj_id: 2,
				type_id: 1
			};
		thirdPayment({
			param:param,
			title : '个人VIP版',
			money : '59元/月',
			isperson: 1,
			onlythird:0,
			callback:  function(){ pmi_list.getisVip(); }
		});
	}
};

// 广告模块
var advertModule = {
	advertData : {
		"num": 0, //后续应删掉，使用advertInfo的长度来代替
		"mark_id": 0,
		"common": {
			"industry": null,
			"area": null
		},
		"positionPage": [],
		"advertInfo": []
	},
	start: function(){
		var _this = this,
			pageShow = $("#ittwrap > section.page > div.pageshow"),
			advertLimitCount = 50000;
		// 判定是否具备启用广告的条件
		if (uv_count == undefined) {
			uv_count = 0;
		}
		uv_count = parseInt(uv_count);
		if (uv_count<advertLimitCount) {
			tip('抱歉,您的微页用户量还没达到<span style="color:#f94a4a">'+advertLimitCount+'</span></br>暂不能使用此功能');
			return false;
		}
		_this.init();//初始化
		// 判定该微页内广告数量
		if (_this.advertData["num"] == 0) {
			$("#advert-industry-all, #advert-area-all").trigger("click");
			$(".advert-add-industry, .advert-add-area").hide();
			_this.showAttrSet();
		} else if (_this.advertData["num"] > 0 && _this.advertData["num"] <= 3) {
			if (pageShow.find(".advert").length == 0) {
				$("#adv-el-list>li").removeClass("active");
				//展开广告管理
				$("#set-tab").children('a[type="el"]').text(typeinfo["advert"][2]);
				$("#change-advert").addClass('active').siblings().removeClass('active');
				$("#set-content").addClass('bottom10');
				$("#set-b").addClass('hide');
				eleObjects["advert"].show();
				elModule.show();
			} else if (pageShow.find(".advert").length > 0) {
				pageShow.find(".advert").trigger('mousedown');
			}
		}
	},
	hasInit: false,
	init: function(){
		var _this = this;
		// 判断是否初次加载
		if (!_this.hasInit) {
			_this.bindEvent();
			_this.getIndustryAreaInfo();
			_this.onloadPositionPage();
			_this.updateTab();
			_this.showAdvertInfo();
			_this.hasInit = true;
		} else {
			_this.updateTab();
			_this.showAdvertInfo();
		}
	},
	showAttrSet: function(){
		$("#advertAttr-space").show( 50 ,function(){
			$(this).addClass('show');
		});
	},
	hideAttrSet: function(){
		$("#advertAttr-space").removeClass("show").hide(1000);
		$("#advert-name").val("");
		$('#advert-add-industry').selectpicker('deselectAll');
		$('#advert-add-area').selectpicker('deselectAll');
		$("#advertAttr-wrap1, #advertAttr-nextBtn").show();
		$("#advertAttr-wrap2, #advertAttr-confirmBtn, #advertAttr-onlyAttr-confirmBtn, #advertAttr-onlyType-confirmBtn").hide();
	},
	bindEvent: function(){
		var _this = this;
		$("#advertAttr-cancelBtn").on("click", function(){
			_this.hideAttrSet();
		});
		$("#advertAttr-nextBtn").on("click", function(){
			if($("#advert-industry-self").is(":checked")) {
				if(!$('#advert-add-industry').val()){
					autoTip("请输入广告的行业类型");
					return false;
				}
			}
			if($("#advert-area-self").is(":checked")) {
				if(!$('#advert-add-area').val()){
					autoTip("请输入广告的区域类型");
					return false;
				}
			}
			$("#advertAttr-wrap1, #advertAttr-nextBtn").hide();
			$("#advertAttr-wrap2, #advertAttr-confirmBtn").show();
		});
		// 选择:广告类型
		$("#advertAttr-wrap2 > div").on("click", function(){
			$(this).addClass("select").siblings().removeClass("select");
		});
		// 确定提交(首次设置广告)
		$("#advertAttr-confirmBtn").on("click", function(){
			if (!$("#advert-name").val()) {
				tip("广告名称不能为空");
				return false;
			}
			if ($("#advertAttr-wrap2 .select").length == 0) {
				tip("必须选择一种广告类型");
				return false;
			}
			if (_this.advertData["common"] == undefined) {
				_this.advertData["common"] = {
					"industry": null,
					"area": null
				}
			}
			if (_this.advertData["common"]["industry"] == undefined) {
				_this.advertData["common"]["industry"] = null;
			}
			if (_this.advertData["common"]["area"] == undefined) {
				_this.advertData["common"]["area"] = null;
			}
			if ($('#advert-add-industry').val()!= null) {
				_this.advertData["common"]["industry"] = $('#advert-add-industry').val();
			}
			if ($('#advert-add-area').val() != null ) {
				_this.advertData["common"]["area"] = $('#advert-add-area').val();
			}
			_this.add();
		});
		// 新增广告
		$("#adv-el-add").on("click", function(){
			var pageShow = $("#ittwrap > section.page > div.pageshow");
			//判定同一页面是否已有广告（可能放到增加广告那里）
			if (pageShow.find(".advert").length > 0) {
				tip("同一页面只能设置一个广告");
				return false;
			}
			//判定该微页是否超过三个广告（可能放到增加广告那里）
			if (_this.advertData["num"] >= 3) {
				tip("一个微页面最多只能设置三个广告");
				return false;
			}
			$("#advertAttr-wrap1, #advertAttr-nextBtn").hide();
			$("#advertAttr-wrap2, #advertAttr-confirmBtn").show();
			_this.showAttrSet();
		});
		// 选择广告进行跳转或删除
		$("#adv-el-list").on("click", ".adv-el-content", function(){
			var page = _this.advertData["advertInfo"][$(this).parent().index()]["front_position_id"];
			$("#page-list >li.advert-position-"+page+" .page-num").trigger("click");
			$("#ittwrap > section.page > div.pageshow").find(".advert").trigger("mousedown");
			_this.updateTab();
			_this.showAdvertInfo();
		}).on("click", ".adv-el-delete", function(){
			elModule.delElement($("#ittwrap > section.page > div.pageshow .advert"));
			recordModule.addRecord();
		});
		// 广告管理:广告类型更改
		$("#change-advert .change-type-btn").on("click", function(){
			$("#advertAttr-wrap1, #advertAttr-nextBtn").hide();
			$("#advertAttr-wrap2, #advertAttr-onlyType-confirmBtn").show();
			_index = $("#adv-el-list>li.active").index(); 
			$("#advert-name").val(_this.advertData["advertInfo"][_index]["name"]);
			$("#advertAttr-wrap2 >div").removeClass("select");
			_this.showAttrSet();
		});
		$("#advertAttr-onlyType-confirmBtn").on("click", function(){
			if (!$("#advert-name").val()) {
				tip("广告名称不能为空");
				return false;
			}
			if ($("#advertAttr-wrap2 .select").length == 0) {
				tip("必须选择一种广告类型");
				return false;
			}
			// elModule.delElement($("#ittwrap > section.page > div.pageshow .advert"));
			// _this.add();
			_this.update();
		});
		// 广告管理: 修改广告属性(整个微页)
		$("#change-advert .change-attr-btn").on("click", function(){
			$("#advertAttr-nextBtn").hide();
			$("#advertAttr-onlyAttr-confirmBtn").show();
			if (_this.advertData["common"] == undefined) {
				_this.advertData["common"] = {
					"industry": null,
					"area": null
				}
			}
			if (_this.advertData["common"]["industry"] == undefined) {
				_this.advertData["common"]["industry"] = null;
			}
			if (_this.advertData["common"]["area"] == undefined) {
				_this.advertData["common"]["area"] = null;
			}
			$(".advert-add-industry, .advert-add-area").hide();
			if (_this.advertData["common"]["industry"] != null && _this.advertData["common"]["industry"] != "") {
				$('#advert-add-industry').selectpicker('val', _this.advertData["common"]["industry"]);
				$("#advert-industry-self").trigger("click");
			}
			if (_this.advertData["common"]["area"] != null && _this.advertData["common"]["area"] != "") {
				$('#advert-add-area').selectpicker('val', _this.advertData["common"]["area"]);
				$("#advert-area-self").trigger("click");
			}
			_this.showAttrSet();
		})
		$("#advertAttr-onlyAttr-confirmBtn").on("click", function(){
			if($("#advert-industry-self").is(":checked")) {
				if(!($('#advert-add-industry').val())){
					autoTip("请输入广告的行业类型");
					return false;
				}
			}
			if($("#advert-area-self").is(":checked")) {
				if(!($('#advert-add-area').val())){
					autoTip("请输入广告的区域类型");
					return false;
				}
			}
			_this.advertData["common"]["industry"] = $('#advert-add-industry').val();
			_this.advertData["common"]["area"] = $('#advert-add-area').val();
			for (var i = 0; i < _this.advertData["advertInfo"].length; i++) {
				_this.advertData["advertInfo"][i]["profession_id"] = $('#advert-add-industry').val();
				_this.advertData["advertInfo"][i]["region_id"] = $('#advert-add-area').val();
			}
			_this.hideAttrSet();
		})
		// 广告管理: 选项 
		$(".advert-info-wrap .option").on("click", function(){
			$(this).addClass("active").siblings().removeClass("active");
		});
		// 广告管理: 选项 图片比例
		$(".advert-image-ratio .option").on("click", function(){
			var _curch = $("#ittwrap .curchange"),
				_index = $("#adv-el-list li.active").index(),
				imageRatio = $(this).attr("data-value"),
				ratioNum = $(this).attr("data-ratio");
			switch(parseInt(imageRatio)){
				case 1:
					_curch.css({
						'height': '160px',
						'width': '160px'
					});
					break;
				case 2:
					_curch.css({
						'height': '120px',
						'width': '160px'
					});
					break;
				case 3:
					_curch.css({
						'height': '160px',
						'width': '120px'
					});
					break;
				case 4:
					_curch.css({
						'height': '90px',
						'width': '160px'
					});
					break;
			}
			_curch.attr("aspectRatio", ratioNum);
			_curch.children('.drag-inner').resizable( "option", "aspectRatio", ratioNum );
			_this.advertData["advertInfo"][_index]["image_ratio"] = imageRatio;
		});
		// 广告管理: 选项 布局
		$(".advert-layout .option").on("click", function(){
			var _curch = $("#ittwrap .curchange"),
				_index = $("#adv-el-list li.active").index(),
				layout = $(this).attr("data-value");
			switch(parseInt(layout)){
				case 1:
					_curch.find("img").removeClass("layout-2").addClass("layout-1");
					_curch.find("p").removeClass("layout-2").addClass("layout-1");
					break;
				case 2:
					_curch.find("img").removeClass("layout-1").addClass("layout-2");
					_curch.find("p").removeClass("layout-1").addClass("layout-2");
					break;
			}
			_this.advertData["advertInfo"][_index]["layout"] = layout;
		});
		// 广告属性：全选/自选
		$("#advert-industry-all").on("click", function(){
			if (_this.advertData["common"] == undefined) {
				_this.advertData["common"] = {
					"industry": null
				}
			}
			_this.advertData["common"]["industry"] = null;
			$('#advert-add-area').selectpicker('val',null);
			$(".advert-add-industry").hide();
		});
		$("#advert-industry-self").on("click", function(){
			$(".advert-add-industry").show();
		});
		$("#advert-area-all").on("click", function(){
			if (_this.advertData["common"] == undefined) {
				_this.advertData["common"] = {
					"area": null
				}
			}
			_this.advertData["common"]["area"] = null;
			$('#advert-add-area').selectpicker('val',null);
			$(".advert-add-area").hide();
		});
		$("#advert-area-self").on("click", function(){
			$(".advert-add-area").show();
		});
		// 文字特效
		$(".advert-text-e-btn").on('click', function(event) {
			confirmTip({
				text : '使用文字特效，特殊字体与字体样式将会失效，是否继续使用？',
				ConfirmFunction: function(){
					textEffectModule.show();
				}
			});
		});
		// 文字格式
		$(".advert-text-e-space").richTextEdit({
			id : 'advert-text-e-e',
			input : function(event , html){
				var _curch = $("#ittwrap .curchange"),
				    _ani = _curch.children('.animate-contain');

				_curch.css("height" , '');
				if(_curch.hasClass('artfont')){
					if( html.replace(/\"/g, "'") != _ani.attr("artfont")){
						_ani.html(html).removeAttr('artfonttype').attr("artfont" , html.replace(/\"/g, "'"));
					}
				}else if(_curch.hasClass('textanimate')){
					_ani.attr("textcontent", html ).html(html);
				}else{
					_ani.html(html);
				}
			},
			keyup : function(event , html){
				var keyCode = event.keyCode || event.which;

				if(keyCode == 13 || keyCode == 32){
					fontModule.getyouzikuFont();
				}
			}
		});
		// 文字颜色
		// var _color = $("#grid-color").spectrum("get").toRgbString();
		$(".advert-text-color").colorPlugin("rgba(238, 238, 238, 0.3)", function(color){
			var rgbcolor = 'rgba(238, 238, 238, 0.3)';
			if(color){
				rgbcolor = color.toRgbString();
			}
			$("#ittwrap .curchange").find("p").css({
				"color": rgbcolor
			});
		});
		// 文字大小
		$(".advert-text-size").on("change", function(){
			var value = $(this).val();
			if (!value) {
				return false;
			}
			$("#ittwrap .curchange").find("p").css({
				"font-size": value + "px",
				"height": value + "px",
				"line-height": value + "px"
			});
		});
		// 文字对齐
		$(".advert-text-align").on("change", function(){
			var value = $(this).val();
			if (!value) {
				return false;
			}
			$("#ittwrap .curchange").find("p").css({
				"text-align": value
			});
		})
	},
	add: function(){
		var pageShow = $("#ittwrap > section.page > div.pageshow"),
			curPage = $("#page-list .active .page-num").text().trim(), //当前页数(以1开始)
			type = $("#advertAttr-wrap2 .select").attr("data-type");
		eleObjects["advert"].add(pageShow, type, curPage);
	},
	del: function(){
		var _this = this,
			_index = $("#adv-el-list li.active").index();
		if (_index == -1) {
			return false;
		}
		if (_this.advertData["num"] > 0) {
			_this.advertData["num"]--;
		}
		$("#page-list>li").removeClass("advert-position-"+_this.advertData["advertInfo"][_index]["front_position_id"]);
		_this.advertData["advertInfo"].splice(_index,1);
		$("#adv-el-list li.active").remove();
	},
	update: function(){
		var _this = this,
			_curch = $("#ittwrap > section.page > div.pageshow .advert"),
			_index = $("#adv-el-list li.active").index(),
			html = '',
			advertStyle = 0,
			advertlayout = 0;
			name = $("#advert-name").val(),
			type = $("#advertAttr-wrap2 .select").attr("data-type");
		switch(type){
			case "imageAdvert":
				advertStyle = 2;
				html = '<img src="'+cdnUrl+'/static/invitation-v2/images/logo.png" alt="" style="width:100%;height:100%;">';
				_curch.addClass("ele-aspectRatio");
				_curch.attr("aspectratio", 1);
				_curch.children('.drag-inner').resizable( "option", "aspectRatio", 1 );
				_curch.css({
					'width': '160px',
					'height': '160px'
				});
				break;
			case "textAdvert":
				advertStyle = 3;
				html = '<p style="font-size: 16px;line-height: 1.5em;">预留给广告主的文字!</p>';
				_curch.removeClass("ele-aspectRatio");
				_curch.removeAttr("aspectratio");
				_curch.children('.drag-inner').resizable( "option", "aspectRatio", false);
				_curch.css({
					'width': '160px',
					'height': '30px'
				});
				break;
			case "imageTextAdvert":
				advertStyle = 1;
				advertLayout = 1;
				html = '<img class="layout-1" src="'+cdnUrl+'/static/invitation-v2/images/logo.png" alt="">'+
							 '<p class="layout-1" style="font-size: 16px;line-height: 1.5em;">预留给广告主的文字!</p>';
				_this.advertData["advertInfo"][_index]["layout"] = advertLayout;
				_curch.addClass("ele-aspectRatio");
				_curch.attr("aspectratio", 1);
				_curch.children('.drag-inner').resizable( "option", "aspectRatio", 1 );
				_curch.css({
					'width': '160px',
					'height': '160px'
				});
				break;
		}
		_this.advertData["advertInfo"][_index]["name"] = name;
		_this.advertData["advertInfo"][_index]["style"] = advertStyle;
		_this.advertData["advertInfo"][_index]["image_ratio"] = 1;
		_curch.find(".animate-contain").html(html);
		_curch.trigger('mousedown')
		_this.hideAttrSet();
	},
	getIndustryAreaInfo: function(){
		//获取行业
	    $.ajax({
	        url:"/index.php?r=pc/InviAdvertisement/GetProfessions",
	        dataType:'json',
	        type:'get',
	        success:function(data){
	            if (data.status==0) {
	                var area="";
	                for (var i = 0; i < data.data.length; i++) {
	                    area=area+'<option value="'+ i +'" >'+data.data[i].name+'</option>';
	                }
	                $("#advert-add-industry").append(area);
	                //填装更新
	                $('#advert-add-industry').selectpicker('val', ['Mustard','Relish']);
	                $('#advert-add-industry').selectpicker('render');
	                $('#advert-add-industry').selectpicker('refresh');
	            }
	        },
	        error:function(data){
	            autoTip(data.data);
	        }
	    })
	    //获取地区  省级
	    $.ajax({
	        url:"/index.php?r=Region/getRegionList",
	        data:{
	            pid:0
	        },
	        dataType:'json',
	        type:'get',
	        success:function(data){
	            if (data.status==0) {
	                var area="";
	                for (var i = 0; i < data.data.length; i++) {
	                    area=area+'<option value="'+ i +'" >'+data.data[i].name+'</option>';
	                }

	                $("#advert-add-area").append(area);
	                //填装更新
	                $('#advert-add-industry').selectpicker('val', ['Mustard','Relish']);
	                $('#advert-add-industry').selectpicker('render');
	                $('#advert-add-area').selectpicker('refresh');
	            }
	        },
	        error:function(data){
	            autoTip(data.data);
	        }
	    })
	},
	onloadPositionPage: function(){
		var _this = this,
			advertInfo = _this.advertData["advertInfo"],
			positionPage = _this.advertData["positionPage"];
		if (positionPage == undefined) {
			return false;
		}
		for (var i = 0; i < positionPage.length; i++) {
			$("#page-list>li").eq(parseInt(positionPage[i])).addClass("advert-position-"+advertInfo[i]["front_position_id"]);
		}
	},
	updatePositionPage: function(){
		var _this = this,
			advertInfo = _this.advertData["advertInfo"];
		_this.advertData["positionPage"] = [];
		if (!advertInfo) {
			return false;
		}
		for (var i = 0; i < advertInfo.length; i++) {
			var pageNum = $("#page-list>li.advert-position-" + advertInfo[i]["front_position_id"]).index();
			advertInfo[i]["position_page"] = pageNum;
			_this.advertData["positionPage"].push(pageNum);
		}
	},
	updateTab: function(){
		var _this = this,
			curPage = $("#page-list .active .page-num").text().trim(),
			advertInfo = _this.advertData["advertInfo"];
		if (advertInfo == undefined) {
			advertInfo = [];
		}
		if (advertInfo.length == 0 ) {
			return false;
		}
		$("#adv-el-list").html("");
		var page,
			addTab;
		for (var i = 0; i < advertInfo.length; i++) {
			page = $("#page-list>li.advert-position-" + advertInfo[i]["front_position_id"]).index() + 1;
			addTab = '<li>'+
			            '<span class="adv-el-content">页数<span>' + page + '</span></span>'+
			            '<span class="adv-el-delete iconfont icon-unie928"></span>'+
			          '</li>';
			$("#adv-el-list").append(addTab);
			if (page == curPage ) {
				$("#adv-el-list>li:eq(" + i + ")").addClass("active");
			}
		}
		if ($("#ittwrap > section.page > div.pageshow").find(".advert").length == 0 && $("#adv-el-list").find(".active").length != 0) {
			var _index = $("#adv-el-list>li.active").index();
			_this.advertData["num"]--;
			_this.advertData["advertInfo"].splice(index,1);
			$("#adv-el-list>li.active").remove();
		}
		_this.updatePositionPage();
	},
	showAdvertInfo: function(){
		var _this = this,
			_index = $("#adv-el-list>li.active").index(); //本微页中第几个广告(从0开始)
		$(".advert-info-wrap>div").hide();
		if (_index == -1) {
			return false;
		}
		var curInfo = _this.advertData["advertInfo"][_index]; //当前广告信息
		if (typeof(curInfo) == undefined) {
			return false;
		}
		switch(parseInt(curInfo["style"])) {
			case 1:
				$("#change-advert .advert-info-imageText .advert-name").text(curInfo["name"]);
				$("#change-advert .advert-info-imageText .advert-layout >span").eq(curInfo["layout"]-1).addClass("active").siblings().removeClass("active");
				$("#change-advert .advert-info-imageText .advert-image-ratio >span").eq(curInfo["image_ratio"]-1).addClass("active").siblings().removeClass("active");
				$("#change-advert .advert-info-imageText .advert-text-size option:eq(0)").prop("selected", true);
				$("#change-advert .advert-info-imageText .advert-text-align option:eq(0)").prop("selected", true);
				$("#change-advert .advert-info-imageText").show();
				break;
			case 2:
				$("#change-advert .advert-info-image .advert-name").text(curInfo["name"]);
				$("#change-advert .advert-info-image .advert-image-ratio >span:eq("+(curInfo["image_ratio"]-1)+")").addClass("active").siblings().removeClass("active");				
				$("#change-advert .advert-info-image").show();
				break;
			case 3:
				$("#change-advert .advert-info-text .advert-name").text(curInfo["name"]);
				$("#change-advert .advert-info-text .advert-text-size option:eq(0)").prop("selected", true);
				$("#change-advert .advert-info-text .advert-text-align option:eq(0)").prop("selected", true);
				$("#change-advert .advert-info-text").show();
				break;
		}
	}
};

// 参加比赛填写手机号
var raceInfoModule = {
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		$("#raceInfo-wrap").on('click', '.raceInfo-con', function(event) {
			var _this = $(this),
				name = $("#raceInfo-name").val(),
				phone = $("#raceInfo-phone").val();

			if(!name){
				autoTip("请填写姓名");
				return ;
			}
			if(!phone && !testPhone(phone)){
				autoTip("请填写正确的手机号码");
				return ;
			}
			if(_this.hasClass('loading')){
				return ;
			}
			_this.addClass('loading');

			var url = '/index.php?r=pc/Race/SaveParticipantInfo',
				ddata = {
					info : { 
						jhh5_name : name ,
						jhh5_phone: phone 
					}
				},
				successFn = function( data ){
					if(data.status == 0){
						raceInfoModule.hide();
						$("#race-checkbox").prop("checked" , true);
						$("#haoyisheng-checkbox").prop('checked', false);
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading');
				},
				errorFn = function(){
					_this.removeClass('loading');
				};

			$ajax( url , "post", ddata , "json", successFn, errorFn);

		}).on('click', '.raceInfo-can', function(event) {
			$("#race-checkbox").prop("checked" , false);
			raceInfoModule.hide();
		});

	},
	getInfo : function(){
		var url = '/index.php?r=pc/Race/GetParticipantInfo',
			ddata = {
				user_token : $("body").attr("creater")
			},
			successFn = function( data ){
				if(data.status == 0){
					$("#raceInfo-name").val(data.data.jhh5_name),
					$("#raceInfo-phone").val(data.data.jhh5_phone);
				}else{
					// autoTip(data.data);
				}
			},
			errorFn = function(){
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn);
	},
	show : function(){
		this.getInfo();
		this.init();
		$("#raceInfo-wrap").addClass('show');
	},
	hide : function(){
		$("#raceInfo-wrap").removeClass('show');
	}
};

// 照片投票设置
var photovoteModule = {
	options : '',
	init : function(ele){
		this.options = {
		    "common_settings": {
		        "title": "请输入活动标题",    //活动标题
		        "description": "请输入活动介绍",     //活动介绍
		        "unfolded_options": "",   //默认展开
		        "start_date": utilities.getTime() ,    //开始时间:格式Y-m-d,比如2016-12-05
		        "end_date": utilities.getTime( new Date().fp_incr(10) ) ,     //结束时间:格式Y-m-d,比如2016-12-05
		        "style": "#013061",    //风格设置
		        "order_by": "newest",   //显示排序（值为hottest,或者 newest),默认为 newest
		        "columns_count": 2 ,  //每行显示个数,默认为2
		        "picture": "",  //主题图片
		        "bottom_text": ""  //底部文字
		    },
		    "vote_settings": {
		        "enable_vote": 1 ,   //是否开启投票,1为开启,2为不开启,默认为1
		        "vote_rule": 2 ,   //投票规则：1为每位用户每天可以重复投票,2为不可重复投票,默认为1
		        "vote_limit": 1   //每个用户最多可投的票数,默认为1
		    },
		    "enroll_settings": {
		        "enable_enroll": 1 ,  //是否开启报名,1为开启,2为不开启,默认为1
		        // "photo": "",    //报名照片
		        // "works_name": "",  //报名作品名称
		        // "description": "",  //报名介绍说明
		        // "creator_name": "",   //报名作者姓名
		        // "phone": "",   //报名作者手机号码
		        "available_fields": ['photo', 'works_name', 'description', 'creator_name', 'phone'],   //记录被选择使用的字段，就是上面那几个，数组，比如['photo', 'works_name', 'description', 'creator_name', 'phone']
		        "custom_fields": [],  //所有自定义字段 是数组
		        "enroll_limit":  phvSetModule.getEnrollLimit() ,   //报名限额数
		        "enroll_code":""   //报名邀请码
		    }
		};

		var optc = this.options.common_settings;
		ele.find('.photovote-h3').text( optc.title );
		ele.find('.photovote-desc').text(optc.description);
		ele.find('.photovote-starttime-span').text(optc.start_date);
		ele.find('.photovote-endtime-span').text(optc.end_date);

		this.ruleText(ele);

	},
	ruleText : function(ele){
		var _curch = ele || $("#ittwrap .curchange");

		var voteset = this.options.vote_settings,
			txt = '投票规则：每人可投' + voteset.vote_limit + '票。';

		txt += voteset.vote_rule == 1 ? '隔天可以再次参与投票。' : '';

		_curch.find('.photovote-rule-p').text( txt );
	},
	setBgc : function(color){
		$("#phv-bgc-style").remove();
			$('head').append('<style id="phv-bgc-style" type="text/css">.photovote .photovote-bgc{background-color: '+color+' !important;}</style>');
	}

};

// 照片投票报名设置弹窗
var phvSetModule ={
	hasinit : false,
	init : function(){
		if(this.hasinit){
			return ;
		}
		this.hasinit = true;

		var enrollLimit = this.getEnrollLimit();
		this.enrollLimit = enrollLimit ;

		spinnerInput($("#phv-entries-count") , {
			min: 1 ,
			max: enrollLimit == 'unlimited' ? '' : enrollLimit ,
			step: 1 ,
			value : enrollLimit == 'unlimited' ? '' : enrollLimit ,
			spin: function( ui ) {

			},
			stop: function(ui) {
				var val = Math.abs(parseInt(ui.value)) || '';

				if( pmi_list.vipLevel >= 4 && (val == "" || val > enrollLimit)){
					val = enrollLimit;
				}

				$(this).val( val );
			}
		});

		if(enrollLimit == 'unlimited'){
			$("#phv-entry-tip").hide();
		}else{
			$("#phv-entry-tip").html('<i class="m-r5 color-red">*</i>最多不能超过'+enrollLimit+'个，需要更多<a class="phv-entry-vippacket" href="./index.php?r=pc/Index/VipPacket" target="_blank">立即升级</a>');
		}

		$("#phv-tab").on('click', 'a', function(event) {
			var _type = $(this).attr("type");
			$(this).addClass('active').siblings().removeClass('active');
			$("#phv-content").children('div[type="'+_type+'"]').addClass('active').siblings().removeClass('active');
		});

		$("#phv-btn-wrap").on('click', '.phv-con', function(event) {
			var _curch = $("#ittwrap .curchange"),
				theme = $("#phv-theme").children('img').attr("src");

			var optc = photovoteModule.options.common_settings,
				opte = photovoteModule.options.enroll_settings;
			if(theme){
				_curch.find('.photovote-theme').html('<img src="'+theme+'" alt="" />');
				optc.picture = theme ;
			}else{
				_curch.find('.photovote-theme').empty();
				optc.picture = "";
			}
			// optc.style = $("#phv-style").children('.active').attr("type");
			optc.style = $("#phv-styleColor").spectrum("get") ? $("#phv-styleColor").spectrum("get").toRgbString() : '#013061';
			_curch.children('.animate-contain').attr("data-style" ,optc.style );
			optc.order_by = $("#phv-order").find('input:checked').val();
			optc.columns_count = $("#phv-rownum").find('input:checked').val();
			_curch.find('.photovote-list').attr("rownum" , optc.columns_count );
			phvSetModule.setList( _curch , optc.columns_count );
			// optc.bottom_text = $("#phv-bottomtext").val();

			opte.enable_enroll = $("#phv-voteable").prop('checked') ? 1 : 2;
			opte.enroll_limit = $("#phv-entries-count").val();
			opte.enroll_limit = opte.enroll_limit == '' ? 'unlimited' : opte.enroll_limit;
			opte.enroll_code = $("#phv-iscode").prop("checked") ? ($("#phv-code").text() == "点击生成" ? "" : $("#phv-code").text()) : '';
			opte.available_fields = [];
			$.each( $('#phv-enroll').find('input[type="checkbox"]:checked') ,function(index, el) {
				opte.available_fields.push( $(el).val() );
			});
			opte.custom_fields = [];
			$.each( $('#phv-enroll').children('.phv-enroll-addli') ,function(index, el) {
				var val = $(el).children('input').val();
				if(val){
					opte.custom_fields.push( val );
				}
			});

			photovoteModule.setBgc(optc.style);

			phvSetModule.hide();

		}).on('click', '.phv-can', function(event) {

			phvSetModule.hide();
			
		});

		// $("#phv-style").on('click', ' > span', function(event) {
		// 	$(this).addClass('active').siblings().removeClass('active');
		// });
		$("#phv-styleColor").colorPlugin("#013061", function(color){
			var rgbcolor = '#013061';
			if(color){
				rgbcolor = color.toRgbString();
			}
		});

		$("#phv-theme").on('click', function(event) {
			var _this = $(this),
			oldimg = _this.children('img').attr("src"),
			_curch = $("#ittwrap .curchange"),
			rat = _curch.width() / _curch.height();

			$("#images-space").addClass('zIndex12');
			imagesModule.show(function( img ){
				_this.children('img').attr("src" , img);
				$("#images-space").removeClass('zIndex12');
			} , function(){
				_this.children('img').attr("src" , oldimg);
				$("#images-space").removeClass('zIndex12');

			} , NaN , false);
		});
		$("#phv-theme-del").on('click', function(event) {
			$("#phv-theme").children('img').attr("src" , '');
		});

		$("#phv-enroll").on('click', '.phv-enroll-add', function(event) {
			var _ul = $(this).parent(),
				_li = ' <li class="phv-enroll-addli"><span class="phv-enroll-reduce iconfont icon-unie9b2 m-r5"></span><input class="com-input" type="text" /></li>';
			if(_ul.children('.phv-enroll-addli').length >= 3 ){
				autoTip("最多只能自定义3项！");
				return;
			}	
			_ul.append(_li);
		}).on('click', '.phv-enroll-reduce', function(event) {
			$(this).parent().remove();
		});
		$("#phv-enroll").sortable({
			// axis: "y",
			containment: "parent",
			cursor: "move",
			revert: true,
			items: " > li.phv-enroll-li",
			// placeholder:'el-kong',
			delay: 100,
			activate: function(event, ui) {
			},
			update: function( event, ui ) {
			}
		});

		$("#phv-iscode").on('click', function(event) {
			var _this = $(this);
			if( ! pmi_list.isVip &&　_this.prop('checked')){
				_this.prop('checked', false);
				confirmTip({
					text : '您还不是VIP，暂时无法使用该功能。是否升级？',
					ConfirmText : '立即升级',
					ConfirmFunction : function(){
							VipModule.show();
					}
				});
				return ;
			}
			if( _this.prop('checked') ){
				$("#phv-code").parent().show();
			}else{
				$("#phv-code").parent().hide();
			}
		});

		var clipboard = new Clipboard('#phv-invcode-copy' , {
		    text: function(trigger) {
		        return $("#phv-code").text();
		    }
		});
		clipboard.on('success', function(e) {
		    autoTip("复制成功！");
		    e.clearSelection();
		});
		clipboard.on('error', function(e) {
		    autoTip('复制失败，请用Ctrl+C复制。');
		});

		$("#phv-code").on('click', function(event) {
			var _this = $(this);
			if( !pmi_list.isVip ){
				confirmTip({
					text : '您还不是VIP，暂时无法使用该功能。是否升级？',
					ConfirmText : '立即升级',
					ConfirmFunction : function(){
							VipModule.show();
					}
				});
				return ;
			}
			if(_this.hasClass('loading') || _this.children('a').length == 0){
				return ;
			}
			_this.addClass('loading');

			var url = '/index.php?r=pc/InvitationVoteData/GenerateEnrollCode',
				data = {
				},
				successFn = function( data ){
					if(data.status == 0){
						_this.text(data.data);
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading');
				},
				errorFn = function(){
					_this.removeClass('loading');
				};

			$ajax( url , "get", data , "json", successFn, errorFn);
		});
	},
	show : function(){
		this.init();

		var optc = photovoteModule.options.common_settings,
			opte = photovoteModule.options.enroll_settings;

		$("#phv-theme").children('img').attr("src" , optc.picture)
		$("#phv-styleColor").spectrum("set" , optc.style);
		// $("#phv-style").children('span[type="'+optc.style+'"]').addClass('active').siblings().removeClass('active');
		$("#phv-order").find('input[value="'+optc.order_by+'"]').prop("checked" , true);
		$("#phv-rownum").find('input[value="'+optc.columns_count+'"]').prop("checked" , true);
		// $("#phv-bottomtext").val( optc.bottom_text );

		$("#phv-voteable").prop('checked' , (opte.enable_enroll == 1) );
		$("#phv-entries-count").spinner('value' , opte.enroll_limit == 'unlimited' ? '' :  opte.enroll_limit );
		if( opte.enroll_code ){
			$("#phv-iscode").prop("checked" , true );
			$("#phv-code").text( opte.enroll_code );
			$("#phv-code").parent().show();
		}else{
			$("#phv-iscode").prop("checked" , false );
			$("#phv-code").parent().hide();
			$("#phv-code").html('<a>点击生成</a>');
		}

		$('#phv-enroll').find('input[type="checkbox"]').prop("checked", false);
		var afields = (opte.available_fields || []).concat().reverse();
		$.each( afields ,function(index, val) {
			var _input = $('#phv-enroll').find('input[type="checkbox"][value="'+val+'"]'),
				_li = _input.closest('li');
			_input.prop("checked", true);
			_li.parent().prepend(_li);
		});
		$('#phv-enroll').children('.phv-enroll-addli').remove();
		var _li = '';
		$.each( opte.custom_fields || [] ,function(index, val) {
			_li += '<li class="phv-enroll-addli"><span class="phv-enroll-reduce iconfont icon-unie9b2 m-r5"></span><input class="com-input" type="text" value="'+val+'"></li> ';
		});
		$('#phv-enroll').append(_li);


		$('#phv-wrap').addClass("show");
	},
	hide : function(){
		$('#phv-wrap').removeClass("show");
	},
	setList : function(ele , num){
		var _ul = ele.find('.photovote-list'),
			_li = '';

		for(var i = 0; i < num ; i++){
			var lastclass = '';
			if( num % i == 0 ){
				lastclass = 'photovote-lilast';
			}
			_li += '<li class="photovote-li '+lastclass+'"><div><img src="'+cdnUrl+'/static/invitation-v2/images/head.jpg" alt="" onload="photovoteLoad(this)" /></div>'
			+'<p>123</p><p>作者：某某某</p><button class="photovote-li-btn photovote-bgc"><span></span>投票</button><p class="photovote-li-votes">已投12345票</p></li>';
		}

		_ul.html(_li);
	},
	getEnrollLimit : function(){
		var limit = 20 ;
		switch( +pmi_list.vipLevel ){
			case 0 : 
				if( $('body').attr('company_id') == 1 ){
					limit = 50;
				}else{
					limit = 20;
				}
				break;
			case 1 : 
				limit = 100;
				break;
			case 2 : 
				limit = 1000;
				break;
			case 3 : 
				limit = 5000;
				break;
			case 4 : 
			case 5 :
				limit = 'unlimited';
				break;
		}
		return limit;
	}
};

function photovoteLoad(img){
	var _w = img.width,
		_h = img.height,
		_div = $(img).parent(),
		_div_w = _div.width(),
		_div_h = _div.height();

	if(_w / _h > _div_w / _div_h){
		img.style.height = '100%';
		img.style.width = 'auto'
		img.style.marginLeft = '-' + (_w - _div_w) / 2 + 'px';
	}else{
		img.style.height = 'auto';
		img.style.width = '100%'
		img.style.marginTop = '-' + (_h - _div_h) / 2 + 'px';
	}
}




$(function(){

	pmi_list.init();

	/*****
	 *  顶部生成菜单
	 */
	$("#toolbar-cen").on('click', 'li', function(event) {
		event.stopPropagation();

		var _this = $(this),
			type = _this.attr("ty");

		if( type === 'goods' && !_this.attr('iscompany') == 1 ){
			confirmTip({
				text : "商品买卖仅对已认证的企业付费会员开放。是否立即升级企业会员？",
				CancelText : '放弃',
				ConfirmText : '升级',
				ConfirmFunction :function(){
					window.open('/index.php?r=pc/IndexNew/showUserInfo&update=1#account');
				}
			});
			return;
		}
		if(! pmi_list.isVip && _this.hasClass('vip_li')){
			// showPointShadow(1);
			confirmTip({
				text : '您还不是VIP，暂时无法使用该功能。是否升级？',
				ConfirmText : '立即升级',
				ConfirmFunction : function(){
						VipModule.show();
				}
			});
			return ;
		}

		if(_this.hasClass('add')){
			eleObjects[type].add($("#ittwrap > section.page > div.pageshow"));
			recordModule.addRecord();
		}else if(_this.hasClass('pbtn')){
			eleObjects['btn'].add($("#ittwrap > section.page > div.pageshow") , type);
			recordModule.addRecord();
		}else if ( type === 'submit' || type === 'formtemplate'){
			if($('#ittwrap .form-submit-btn, #ittwrap .form').length){
				autoTip('同一页只能有一个表单提交按钮');
				return;
			}else{
				eleObjects[type].add($("#ittwrap > section.page > div.pageshow"));
				recordModule.addRecord();
			}
		}else if( type == 'aside' ){
			elModule.showWrap('aside');
			elModule.show();
		}else if( type == 'effects' ){
			effectModule.show();
		}else if( type == 'shape'){
			shapeModule.show(function(svg){
				eleObjects['shape'].add($("#ittwrap > section.page > div.pageshow") , svg);
			});
		}else if( type == 'svganimation'){
			svgModule.show(function(svg){
				eleObjects['svg'].add($("#ittwrap > section.page > div.pageshow") , svg);
			});
		}else if( type == 'weizhan' ){
			weizhanModule.show();
		}else if( type == 'article' || type == 'goods' || type == 'gzh'){
			eleObjects['btn'].add($("#ittwrap > section.page > div.pageshow") , type);
			linkModule.show( type , true);
		}else if( type == 'weixinvoice'){
			confirmTip({
				text : '在微信中浏览时，点击组件可听声音。长按“按住说话”即可录制声音，更换后再分享，朋友就能听到您的声音。组件仅在微信中浏览时有效，分享后的声音可在微信中保留三天；非微信环境浏览时，将不能录制声音和播放声音。',
				ConfirmFunction : function(){
						eleObjects[type].add($("#ittwrap > section.page > div.pageshow"));
						recordModule.addRecord();
				}
			});
		}else if( type == 'photovote'){
			if( photovoteModule.options ){
				autoTip("每个微页只能添加一个照片投票！");
				return ;
			}else{
				eleObjects[type].add($("#ittwrap > section.page > div.pageshow"));
				recordModule.addRecord();
			}
		}


		if(type != 'img'){
			imagesModule.hide();
		}
		tplModule.hide();
		shapeCropModule.hide();
		if(type != 'aside'){
			$("#aside-shadow").removeClass('show');
			$("#set-tab").children('a[type="el"]').trigger('click');
		}
		if(type == 'aside'){
			$("#mask-div").addClass('show');
			$("#phone-wrap").addClass('zIndex11');
			$("#set-space").addClass('zIndex11');
		}
		if(type == 'advert') {
			advertModule.start();
		}

		elListModule.refresh();
	}).on('click', '.help-vip', function(event) {
		event.stopPropagation();
	});

	$("#toolbar-right").on('click', 'li', function(event) {
		var _this = $(this),
			type = _this.attr("ty");

		if(type == 'save'){
			pageModule.savePage();
			weiyeModule.saveWeiyeData(function(data){
				if(data.status != 0){
					autoTip(data.data);
					return ;
				}
				pageModule.initIttwrap();
				autoTip("保存成功！");
			} , function(data){} , 0 );
		}else if( type == 'next_step'){
			pageModule.savePage();
			if(pmi_list.isAdmin){
				$("#share-wrap").addClass('show');
				return ;
			}
			weiyeModule.saveWeiyeData(function(data){
				if(data.status != 0){
					autoTip(data.data);
					return ;
				}
				$("#share-qcode-img").attr('src' , data.qrcode);
				$("#share-wrap").addClass('show');
				guideModule.show(2);
				$("#preview-iframe")[0].src = '/s?nodirect=1&id=' + myinvitation_id;

			} , function(data){} , 1 );
		}
	});

	$("#toolbar-logo").on('click', function(event) {
		pageModule.savePage();
		weiyeModule.saveWeiyeData(function(data){
			if(data.status != 0){
				autoTip(data.data);
				return ;
			}
			window.onbeforeunload = null;
			window.location.href = '/index.php?r=pc/IndexNew/showInvitation&version=1&id=' + myinvitation_id;

		} , function(data){} , 1 );
	});

	/*
	 *  顶部生成菜单 end
	 *****/

	/*****
	 *  手机
	 */

	$("#phone-left").on('click', '.pl-music', function(event) {

		musicModule.show( {
				id : '',
				music : commondata["share-music"] ,
				title : unescape(commondata["musicname"])
			} , function(li){
			var musicurl = '',
				musicname = '';

			if(li.hasClass('music-choice')){
				return;
			}
			if(li.length > 0){
				musicurl = li.attr('data-url');
				musicname = li.children('.music-name').text();
			}
			commondata["share-music"] = musicurl;
			// commondata["musicisloop"] = $("#music-isloop").prop('checked');
			commondata["musicisloop"] = true;
			commondata["musicname"] = escape(musicname);
		});

		imagesModule.hide();
		shapeCropModule.hide();

	}).on('click', '.pl-tpl', function(event) {


		pageModule.savePage();

		tplModule.show();
		elModule.hide();
		advertModule.hideAttrSet();
		shapeCropModule.hide();

	}).on('click', '.pl-bg', function(event) {

		elModule.showWrap('bg');

		elModule.show();
		shapeModule.hide();
		advertModule.hideAttrSet();
		imagesModule.hide();
		shapeCropModule.hide();

	}).on('click', '.pl-el', function(event) {

		elListModule.show();

		guideModule.show(1);
		imagesModule.hide();
		shapeCropModule.hide();
	});

	$("#phone-right").on('click', '.pr-grid', function(event) {
		
		if($(this).hasClass('active')){
			gridModule.hide();
		}else{
			gridModule.show();
		}
	}).on('click', '.pr-preview', function(event) {
		imagesModule.hide();
		shapeModule.hide();
		advertModule.hideAttrSet();

		$("#ittwrap .curchange").removeClass('curchange');
		elModule.hide();
		$("#ittwrap > .page > div").removeClass('pageshow');
		$('#ittwrap').find('.background-animate').hide();
		$("#ittwrap .int-disappear").each(function(index, el) {
			$(el).addClass($(el).attr('animatename')).removeClass('fadeOutCenter');
		});
		showAnimate.initMultipleAnimate('#ittwrap');
		setTimeout(function() {
			$("#ittwrap > .page > div").eq(0).addClass('pageshow');
			$('#ittwrap').find('.background-animate').show();

			svgModule.showSVGAnimate($('#ittwrap > .page'));
			textEffectModule.showTextAnimate($('#ittwrap > .page'));
		}, 100);

	}).on('click', '#backward', function(event) {

		imagesModule.hide();
		shapeModule.hide();
		elModule.hide();
		advertModule.hideAttrSet();

		recordModule.back();

		elListModule.refresh();

	}).on('click', '#forward', function(event) {

		imagesModule.hide();
		shapeModule.hide();
		elModule.hide();
		advertModule.hideAttrSet();

		recordModule.go();

		elListModule.refresh();

	});

	$("#phone-right , #page-list").tooltip({
      position: {
        my: "left+5 center",
        at: "right+5 center",
        using: function( position, feedback ) {
			$(this).css({
				'position' : 'fixed',
				top: position.top,
				left: position.left
			}).addClass('title-tip');

			if(feedback.horizontal == "right"){
				$(this).addClass('title-tip-right');
			}
		}
      }
    });

	//网格设置 事件绑定
	$("#grid-set").on('click', '#grid-switch', function(event) {
		// gridModule.grid_off = true;
		// gridModule.initgrid( gridModule.hnum , gridModule.vnum);
		var _this = $(this),
			hasGrid = _this.prop('checked');
		if (hasGrid) {
			gridModule.initgrid(gridModule.hnum, gridModule.vnum);
		} else {
			$("div.grid-v-line, div.grid-h-line").remove();
		}
	});
	//网格颜色
	$("#grid-color").colorPlugin("rgba(238, 238, 238, 0.3)", function(color){
		var rgbcolor = 'rgba(238, 238, 238, 0.3)';
		if(color){
			rgbcolor = color.toRgbString();
		}
		$("div.grid-h-line").css("background-color", rgbcolor );
		$("div.grid-v-line").css("background-color", rgbcolor );
	});

	$("#ittwrap").on('mousedown', '.animate', function(event) {
		var _this = $(this),
			_curch = $('#ittwrap .curchange');

		if($("#tg-space").is(":visible")){
			return ;
		}
		if($("#tpl-space").hasClass('show')){
			$("#tpl-confirm").trigger('click');
		}

		shapeCropModule.hide();
		imagesModule.hide();
		shapeModule.hide();
		svgModule.hide();
		advertModule.hideAttrSet();

		$("#ittwrap").trigger("focus");

		if($("#el-space").hasClass('show')){
			elListModule.showEle(_this);
		}

		if((! _this.hasClass('curchange')) && _curch.hasClass('artfont')){
			if(_curch.children('.animate-contain').children('img').length == 0){
				fontModule.getFontImg(_curch);
			}
		}

		if(_curch[0] != this && _curch.hasClass('int-disappear')){
			_curch.addClass('fadeOutCenter');
		}else{
			_this.removeClass('fadeOutCenter');
		}

		if( event.ctrlKey ){
			_curch.addClass('curchange-combo');
			_this.hasClass('curchange-combo') ? _this.removeClass('curchange-combo') : _this.addClass('curchange-combo');

			if($('#ittwrap .curchange-combo').length > 1){
				multiModule.show();
			}else{
				multiModule.hide();
			}
			return ;
		}
		if(_this.hasClass('curchange-combo')){
			return ;
		}

		_this.addClass('curchange').siblings().removeClass('curchange');
		var _type = elModule.getType(_this);
		elModule.showWrap(_type);
		elModule.show();

	}).on('mouseenter','.animate',function(){
		// $(this).append('<span class="dele">×</span>');
		var _this = $(this);
		if(_this.hasClass('int-disappear') || _this.hasClass('int-animate-disappear')){
			_this.removeClass('fadeOutCenter');

			var animation = $(this).attr('disappear-animation');
			animation ? $(this).removeClass(animation) : '';
		}

	}).on('mouseleave', '.animate', function(event) {
		// $("#ittwrap .dele").remove();
		var _this = $(this);
		if((_this.hasClass('int-disappear') || _this.hasClass('int-animate-disappear')) && !_this.hasClass('curchange') && _this.attr('animate-arr') != ''){
			var animation = _this.attr('disappear-animation');
			_this.addClass('fadeOutCenter');
		}
	}).on('click', '.animate', function(event) {
		if( event.ctrlKey ){
			return ;
		}
		var _combo = $('#ittwrap .curchange-combo');
		if(_combo.length){
			_combo.removeClass('curchange-combo');
			multiModule.hide();
			$(this).trigger('mousedown');
		}

	}).on('mousedown', '.pageshow', function(event) {
		var _target = $(event.target);

		if(_target.hasClass('pageshow') && !$("#tg-space").hasClass('show')){
			elModule.hide();
			$('#ittwrap .curchange').removeClass('curchange');
			imagesModule.hide();
		}
	});

	$("#ittwrap").on('keydown', function(event) {

		switch(event.keyCode){
			case 8 :
			case 46: //删除
				var _combo = $('#ittwrap .curchange-combo');
				if(_combo.length){
					if(_combo.filter(".curchange").length){
						elModule.delDuoElement(_combo.not(".curchange"));
						elModule.delElement(_combo.filter(".curchange"));
					}else{
						elModule.delDuoElement(_combo);
					}
				}else{
					elModule.delElement($("#ittwrap .curchange"));
				}
				recordModule.addRecord();
				break;
			case 67:  
				if(event.ctrlKey) { 
					rightclickModule.operation.copy($("#ittwrap .curchange")); 
				} 
				break;
			case 86:  
				if(event.ctrlKey) { 
					rightclickModule.operation.paste(); 
				} 
				break;
			case 37:
				var _curch = $('#ittwrap .curchange');
				if(_curch.length && !_curch.hasClass('tacked')){
					var value = parseFloat(_curch.css('left')) - 1;

					_curch.css({'left': value + 'px', "right": ''});
					$("#control-l").slider("value", value);
					$("#control-l-i").val(value);
				}
				var _combo = $('#ittwrap .curchange-combo').not(".curchange,.tacked");
				if(_combo.length > 0){
					_combo.each(function(index, el) {
						var _el = $(el),
							_val = _el.position().left - 1;
						_el.css({'left': _val + 'px',"right": ''});
					});
				}
				break;
			case 38:
				var _curch = $('#ittwrap .curchange');
				if(_curch.length && !_curch.hasClass('tacked')){
					var value = parseFloat(_curch.css("top")) - 1;
					_curch.css({'top': value + 'px',"bottom": ""});

					$("#control-up").slider("value", value);
					$("#control-up-i").val(value);
				}

				var _combo = $('#ittwrap .curchange-combo').not(".curchange,.tacked");
				if(_combo.length > 0){
					_combo.each(function(index, el) {
						var _el = $(el),
							_val = _el.position().top - 1;
						_el.css({'top': _val + 'px',"bottom": ''});
					});
				}
				break;
			case 39:
				var _curch = $('#ittwrap .curchange');

				if(_curch.length && !_curch.hasClass('tacked')){
					var value = parseFloat(_curch.css('left')) + 1;
					_curch.css({'left': value + 'px', "right": ''});
					$("#control-l").slider("value", value);
					$("#control-l-i").val(value);
				}
				var _combo = $('#ittwrap .curchange-combo').not(".curchange,.tacked");
				if(_combo.length > 0){
					_combo.each(function(index, el) {
						var _el = $(el),
							_val = _el.position().left + 1;
						_el.css({'left': _val + 'px',"right": ''});
					});
				}
				break;
			case 40:
				var _curch = $('#ittwrap .curchange');
				if(_curch.length && !_curch.hasClass('tacked')){
					var value = parseFloat(_curch.css("top")) + 1;
					_curch.css({'top': value + 'px',"bottom": ""});

					$("#control-up").slider("value", value);
					$("#control-up-i").val(value);
				}

				var _combo = $('#ittwrap .curchange-combo').not(".curchange,.tacked");
				if(_combo.length > 0){
					_combo.each(function(index, el) {
						var _el = $(el),
							_val = _el.position().top + 1;
						_el.css({'top': _val + 'px',"bottom": ''});
					});
				}
				break;
			case 90: 
				if(event.ctrlKey) { 
					recordModule.back();
				}
				break;
			case 89:
				if(event.ctrlKey) { 
					recordModule.go();
				}
				break;
		}
		event.preventDefault();
		event.stopPropagation();
	});


	/*
	 *  手机 end
	 *****/

	/*****
	 *  页面列表
	 */

	pageModule.init();

	$("#page-list").on('mousedown', 'li', function(event) {
		var _this = $(this),
		    index = $("#page-list").children('.page-li').index(_this);

        pageModule.savePage();

        $("#ittwrap").html(pagearr[index]);

		pageModule.initIttwrap();
		zMaxIndex = zIndexModule.setZIndex();

		if(! _this.hasClass('active')){
			recordModule.removeRecord();
			recordModule.addRecord();
		}

		elListModule.refresh();
		elModule.hide();
		imagesModule.hide();
		shapeModule.hide();
		shapeCropModule.hide();
		advertModule.hideAttrSet();
		$("#aside-shadow").removeClass('show');

       	_this.addClass('active').siblings().removeClass('active');

	}).on('click', '.page-li-add', function(event) {
	//增加新页面
		var _li = $(this).closest('li'),
		    index = $("#page-list").children('.page-li').index(_li);

		pageModule.savePage();

		if(! pageModule.isCanAddPage() ){
			return ;
		}

		tplModule.show();

		var _bg = default_page,
			_curli = pageModule.parseTemplate({num : index + 2 , bg : _bg});

		_curli = $(_curli);
		_li.after( _curli );
		_curli.addClass('active').siblings().removeClass('active');

		$("#ittwrap").html( default_page );
		elModule.hide();

		tplModule.isaddpage = true;

		event.stopPropagation();
	}).on('click', '.page-li-up', function(event) {
	//上移
		var _li = $(this).closest('li'),
			_index = $("#page-list").children('.page-li').index(_li);

		if( _index == 0 ){
			return ;
		}

		utilities.ArrayExchange(pagearr , _index , _index -1 );

		_li.prev().before( _li );

		pageModule.resetNum();

		event.stopPropagation();
	}).on('click', '.page-li-down', function(event) {
	//下移
		var _li = $(this).closest('li'),
			_index = $("#page-list").children('.page-li').index(_li);

		if( _li.is(":last-child") ){
			return ;
		}

		utilities.ArrayExchange(pagearr , _index , _index +1 );

		_li.next().after( _li );

		pageModule.resetNum();

		event.stopPropagation();
	}).on('click', '.page-delete', function(event) {
	//删除
		var _li = $(this).closest('li'),
			_index = $("#page-list").children('.page-li').index(_li),
			_showindex = _index - 1;

		pageModule.savePage();

		confirmTip({
			text : '确认删除这一页？',
			ConfirmFunction : function(){
				_li.remove();

				var oldpage = $(pagearr[_index]);
				if(oldpage.find('.nav[data-role="tab"]').length){
					fix_nav_num = 0;
					commondata['nav_fix_value'] = '';
				}
				if(oldpage.find('.advert').length){
					var advertPosition = oldpage.find('.advert').attr("advert-position");
					var advertInfo = advertModule.advertData["advertInfo"];
					for (var i = 0; i < advertInfo.length; i++) {
						if(advertInfo[i]["front_position_id"] == advertPosition){
							advertModule.advertData["num"]--;
							advertInfo.splice(i, 1);
						}
					}
				}
				if(oldpage.find('.photovote').length){
					photovoteModule.options = '';
				}

				pagearr.splice(_index , 1);

				if(_index == 0){
					_showindex = 0;
				}
				$("#ittwrap").html( pagearr[_showindex] );
				var _lis = $("#page-list").children('li');

				if(_lis.length > 0){
					_lis.eq(_showindex).addClass('active').siblings().removeClass('active');
					pageModule.resetNum();
				}else{
					pagearr = [default_page];

					pageModule.initPageList(pagearr);

					$("#ittwrap").html(pagearr[0]);

				}
				recordModule.removeRecord();
				recordModule.addRecord();
				elModule.hide();

				pageModule.initIttwrap();
				
			}
		});
		event.stopPropagation();
	}).on('click', '.page-li-collect', function(event) {
	//收藏
		var _li = $(this).closest('li'),
			index = $("#page-list").children('.page-li').index(_li),
			// bg = _li.find('.page-li-img').attr("src");
			bg = pageModule.getSectionBg();

		pageModule.savePage();

		pmi_list.getisCollectFirst();

		$("#collect-title").val("收藏");
		$("#collect-wrap").addClass('show');
		$("#collect-img").attr("src" , bg);

		$('#fontpage-thumb').html(pagearr[index]).children().children('.pageshow').show();
		html2canvas($("#fontpage-thumb")[0], {
			width: 330,
			height: 520,
			logging : false,
			// allowTaint : true,
			useCORS : true,
			proxy : 'http://www.zhichiwangluo.com/zhichi_frontend/templates/invitation-v2/html2canvasproxy.php',
			onrendered: function(canvas) {
				var _img = canvas.toDataURL("image/png");

				$('#fontpage-thumb').html('');

				removeLoading();
				showLoading();
				$.ajax({
					url : '/index.php?r=AppData/uploadImg',
					type: 'post',
					data: {img_data: _img , org : 1},
					timeout : 30000,
					dataType: 'json',
					success: function(data){
						removeLoading();
						if(data.status == 0){
							bg =  data.data;
						}
						$("#collect-wrap").addClass('show');
						$("#collect-img").attr("src" , bg);
					},
					error: function(jqXHR, textStatus){
						$("#collect-img").attr("src" , bg);
					}
				});
			}
		});
	}).on('click', '.page-li-format', function(event) {
	//更换
		$("#phone-left").children('.pl-tpl').trigger('click');
		event.stopPropagation();
	}).on('click', '.page-li-copy', function(event) {
	//复制
		var _li = $(this).closest('li'),
		    index = $("#page-list").children('.page-li').index(_li);

		if(! pageModule.isCanAddPage() ){
			return ;
		}
		pageModule.savePage();

		// var _bg = _li.find('.page-li-img').attr("src"),
		var _bg = pagearr[index],
			_curli = pageModule.parseTemplate({num : index + 2 , bg : _bg});

		_curli = $(_curli);
		_li.after( _curli );
		_curli.addClass('active').siblings().removeClass('active');
		pageModule.resetNum();

		var copy_target = $(pagearr[index]).clone(),
			el;
		if ((el = copy_target.find('.form, .form-ele, .barrage, .slide, .nav[data-role="tab"], .advert ,.weixinvoice, .weixinsound, .photovote')).length) {
			el.remove();
			autoTip('表单/弹幕/图集/固定栏目/广告/微信语音 组件无法复制, 已过滤', 3000);
		}
		var classNames = copy_target.attr('class').replace(/topage([0-9]{0,3})/g,'');
		copy_target.attr('class',classNames);

		pagearr.splice( index+1 , 0 , copy_target.prop('outerHTML') );

		$("#ittwrap").html( pagearr[index+1] );

		recordModule.removeRecord();
		recordModule.addRecord();
		elModule.hide();

		pageModule.initIttwrap();
		elListModule.refresh();

		reviseId.reviseWrapId();

		event.stopPropagation();
	});
	
	// 阻止mousedown冒泡，防止鼠标这些元素上时可以拖拽
	// 同时也防止触发 page-li 的mousedown事件
	$("#page-list").on('mousedown', '.page-li-add , .page-li-left,.page-delete', function(event) {
		event.stopPropagation();
	});

	$("#page-wrap").on('click', '.page-add', function(event) {
		
		$("#page-list").children('li:last-child').find('.page-li-add').trigger('click');

		$("#page-wrap").children('.page-list-wrap').scrollTop( $("#page-list").height() );
	});

	// 使用psd文件生成页面
	$('#create-with-psd').on('click', function(){
		if(! pageModule.isCanAddPage() ){
			return ;
		}
		pageModule.savePage();
		showPsdBox();
	});

	/*
	 *  页面列表 end
	 *****/

	/*****
	 *  样式
	 */

	$("#set-tab").on('click', 'a', function(event) {
		var _type = $(this).attr("type");

		$(this).addClass('active').siblings().removeClass('active');

		$("#set-content").children('.set-st[type="'+_type+'"]').addClass('active').siblings().removeClass('active');

		if(_type == "animate"){
			$("#set-b").removeClass('show');
			$("#set-content").addClass('bottom10');
		}else{
			$("#set-b").addClass('show');
			if(! $("#set-b").hasClass('hide')){
				$("#set-content").removeClass('bottom10');
			}
		}
	});

	$("#style-content").accordion({ 
		header: "> h4" ,
		active : 0 , 
		collapsible: true,
		heightStyle: "content",
		beforeActivate: function( event, ui ) {

			var head = $(event.currentTarget),
				pannel = head.next(),
				icon = head.children('span');
			if(head.hasClass('ui-accordion-header-active')){
				head.removeClass('ui-accordion-header-active ui-state-active ui-corner-top')
					.addClass('ui-corner-all')
					.attr({
						'aria-selected' : 'false',
						'aria-expanded' : 'false',
						'tabIndex' : -1
					});
				pannel.slideUp('fast' , function(){
					pannel.removeClass('ui-accordion-content-active').attr("aria-hidden" , true);
				});
				icon.addClass('ui-icon-triangle-1-e').removeClass('ui-icon-triangle-1-s');

			}else{
				head.addClass('ui-accordion-header-active ui-state-active ui-corner-top')
					.removeClass('ui-corner-all')
					.attr({
						'aria-selected' : 'true',
						'aria-expanded' : 'true',
						'tabIndex' : 0
					});
				pannel.slideDown('fast' , function(){
					pannel.addClass('ui-accordion-content-active').attr("aria-hidden" , false );
				});
				icon.addClass('ui-icon-triangle-1-s').removeClass('ui-icon-triangle-1-e');
			}

			return false;
		}
	});

	// 宽度滑块
	initSlider($("#control-w") , $("#control-w-i") , { 
		max : 330 ,
		min : 0 ,
		step : 1 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				height = _curch.height(),
				ratio = parseFloat(_curch.attr('aspectRatio') || 1);

			_curch.width( ui.value );
			if(_curch.hasClass('ele-aspectRatio')){
				height = Math.round(ui.value / ratio);
				_curch.height( height );
				$("#control-h").slider("value", height);
				$("#control-h-i").val(height);
			}
			if(_curch.hasClass('circle')){
				_curch.height( height ).removeClass('circle'); //如果是圆形，这去掉圆形
				$("#set-circle").prop("checked" , false);
			}

			if(_curch.hasClass('artfont') && ! _curch.hasClass('autoheight')){
				_curch.height( height );
				_curch.find("img").css({
					'width': '100%',
					'height': '100%'
				});
			}else if(_curch.hasClass('svg') && ! _curch.hasClass('autoheight')){
				_curch.height( height );
				_curch.find('svg')[0].setAttribute("preserveAspectRatio","none");
			}else if(_curch.hasClass('img')){
				setImgPostion();
			}else if(_curch.hasClass('form-imgupload')){
				var fonts = '18px',
					fmimgupwidth = _curch.width(),
					fmimgupheight = _curch.height();

				if(fmimgupwidth < 90 || fmimgupheight < 100){
					fonts = '12px';
				}else if(fmimgupwidth < 120 || fmimgupheight < 120){
					fonts = '14px';
				}else if(fmimgupwidth < 150 || fmimgupheight < 140){
					fonts = '16px';
				}
				_curch.find('.imgupload-text').css('font-size' , fonts);
			}
		},
		stop : function(ui){
			var _curch = $('#ittwrap .curchange');
			if(_curch.hasClass('slide-new')){
				imgplayModule.imgplaySave();
			}
			recordModule.addRecord();
		}
	});
	// 高度滑块
	initSlider($("#control-h") , $("#control-h-i") ,{ 
		max : 520 ,
		min : 0 ,
		step : 1 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				ratio = parseFloat(_curch.attr('aspectRatio') || 1);

			_curch.height( ui.value );
			if(_curch.hasClass('ele-aspectRatio')){
				width = Math.round(ui.value * ratio);
				_curch.width( width );
				$("#control-w").slider("value", width);
				$("#control-w-i").val(width);
			}

			_curch.removeClass('autoheight'); //如果是自适应高度，这去掉自适应高度
			_curch.removeClass('circle'); //如果是圆形，这去掉圆形
			$("#set-autoheight").prop('checked', false);
			$("#set-circle").prop('checked', false);

			if( _curch.hasClass('artfont')){
				_curch.find("img").css({
					'width': '100%',
					'height': '100%'
				});
			}else if(_curch.hasClass('img')){
				setImgPostion();
			}else if(_curch.hasClass('svg')){
				_curch.find('svg')[0].setAttribute("preserveAspectRatio","none");
			}else if(_curch.hasClass('form-imgupload')){
				var fonts = '18px',
					fmimgupwidth = _curch.width(),
					fmimgupheight = _curch.height();

				if(fmimgupwidth < 90 || fmimgupheight < 100){
					fonts = '12px';
				}else if(fmimgupwidth < 120 || fmimgupheight < 120){
					fonts = '14px';
				}else if(fmimgupwidth < 150 || fmimgupheight < 140){
					fonts = '16px';
				}
				_curch.find('.imgupload-text').css('font-size' , fonts);
			}
		},
		stop : function(ui){
			var _curch = $('#ittwrap .curchange');
			if(_curch.hasClass('slide-new')){
				imgplayModule.imgplaySave();
			}
			recordModule.addRecord();
		}
	});
	// 圆角滑块
	initSlider($("#control-ra") , $("#control-ra-i") ,{ 
		max : 150 ,
		min : 0 ,
		step : 1 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				_val = ui.value;

			if(_val > 132){  //如果滑块值大于132则设置圆角值为50%，保证是圆形。
				_val = "50%";
				// _curch.addClass('circle');
				// $("#set-circle").prop("checked", true);
			}else{
				_val = _val + 'px';
				_curch.removeClass('circle');
				$("#set-circle").prop("checked", false);			
			}
			_curch.children('.animate-contain').css("border-radius", _val );
		},
		stop : function(ui){
			recordModule.addRecord();
		}
	});

	// 透明度滑块
	initSlider($("#control-o") , $("#control-o-i") , { 
		max : 100 ,
		min : 0 ,
		step : 1 ,
		value : 100 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				_ani = _curch.children('.animate-contain'),
				_val = ui.value / 100;

			if(_ani.find("img").length > 0){
				_ani.children('img').css("opacity", _val );
				_ani.css('opacity' , _val );
			}else{
				_ani.css('opacity', _val );
			}
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	// 上下滑块
	initSlider($("#control-up") , $("#control-up-i") ,{ 
		max : 520 ,
		min : 0 ,
		step : 1 ,
		value : 0 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				_val = ui.value ;

			// $('#st-position').children('span').removeClass('active');

			_curch.css({ 'top': _val +'px',"bottom":''});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});
	// 左右滑块
	initSlider($("#control-l") , $("#control-l-i") ,{ 
		max : 330 ,
		min : 0 ,
		step : 1 ,
		value : 0 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				_val = ui.value ;

			// $('#st-position').children('span').removeClass('active');

			_curch.css({'left': _val +'px',"right":""});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	// 边框粗细滑块
	initSlider($("#control-bo") , $("#control-bo-i") ,{ 
		max : 20 ,
		min : 0 ,
		step : 1 ,
		value : 3 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				_val = ui.value ;

			_curch.children('.animate-contain').css({"border-width": _val + 'px' });
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	// 阴影大小滑块
	initSlider($("#control-ss") , $("#control-ss-i") ,{ 
		max : 50 ,
		min : 0 ,
		step : 1 ,
		value : 3 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				shs = ui.value ,
				shf = $("#control-sf-i").val(),
				shr = $("#control-sh-i").val(),
				shc = $("#color-sc").spectrum("get").toString();

			shf = (2 * Math.PI)/360 * shf;

			var shx = shs * Math.sin(shf),
				shy = shs * Math.cos(shf);

			_curch.children('.animate-contain').css({"box-shadow":shx + 'px ' + shy + 'px ' + shr + 'px ' +  shc});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});
	// 阴影模糊滑块
	initSlider($("#control-sh") , $("#control-sh-i") ,{ 
		max : 50 ,
		min : 0 ,
		step : 1 ,
		value : 8 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				shr = ui.value ,
				shf = $("#control-sf-i").val(),
				shs = $("#control-ss-i").val(),
				shc = $("#color-sc").spectrum("get").toString();

			shf = (2 * Math.PI)/360 * shf;

			var shx = shs * Math.sin(shf),
				shy = shs * Math.cos(shf);

			_curch.children('.animate-contain').css({"box-shadow":shx + 'px ' + shy + 'px ' + shr + 'px ' +  shc});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});
	// 阴影方向滑块
	initSlider($("#control-sf") , $("#control-sf-i") ,{ 
		max : 360 ,
		min : 0 ,
		step : 1 ,
		value : 45 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				shf = ui.value ,
				shr = $("#control-sh-i").val(),
				shs = $("#control-ss-i").val(),
				shc = $("#color-sc").spectrum("get").toString();

			shf = (2 * Math.PI)/360 * shf;

			var shx = shs * Math.sin(shf),
				shy = shs * Math.cos(shf);

			_curch.children('.animate-contain').css({"box-shadow":shx + 'px ' + shy + 'px ' + shr + 'px ' +  shc});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	// 旋转X轴滑块
	initSlider($("#control-tx") , $("#control-tx-i") ,{ 
		max : 360 ,
		min : 0 ,
		step : 1 ,
		value : 0 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				rx = ui.value ,
				ry = $("#control-ty-i").val(),
				rz = $("#control-tz-i").val(),
				tf = 'perspective(400px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';

			_curch.children('.animate-contain').css({
				"transform":tf ,
				"-webkit-transform":tf,
				"-ms-transform": tf
			}).attr({
				'rotdegx': rx,'rotdegy': ry,'rotdegz': rz
			});

			_curch.children('.drag-inner').css({
				"transform":tf ,
				"-webkit-transform":tf,
				"-ms-transform": tf
			});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	// 旋转Y轴滑块
	initSlider($("#control-ty") , $("#control-ty-i") ,{ 
		max : 360 ,
		min : 0 ,
		step : 1 ,
		value : 0 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				ry = ui.value ,
				rx = $("#control-tx-i").val(),
				rz = $("#control-tz-i").val(),
				tf = 'perspective(400px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';

			_curch.children('.animate-contain').css({
				"transform":tf ,
				"-webkit-transform":tf,
				"-ms-transform": tf
			}).attr({
				'rotdegx': rx,'rotdegy': ry,'rotdegz': rz
			});

			_curch.children('.drag-inner').css({
				"transform":tf ,
				"-webkit-transform":tf,
				"-ms-transform": tf
			});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});
	// 旋转Z轴滑块
	initSlider($("#control-tz") , $("#control-tz-i") ,{ 
		max : 360 ,
		min : 0 ,
		step : 1 ,
		value : 0 ,
		slide : function(ui){
			var _curch = $("#ittwrap .curchange"),
				rz = ui.value ,
				ry = $("#control-ty-i").val(),
				rx = $("#control-tx-i").val(),
				tf = 'perspective(400px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';

			_curch.children('.animate-contain').css({
				"transform": tf,
				"-webkit-transform": tf,
				"-ms-transform": tf
			}).attr({
				'rotdegx': rx,'rotdegy': ry,'rotdegz': rz
			});

			_curch.children('.drag-inner').css({
				"transform":tf ,
				"-webkit-transform":tf,
				"-ms-transform": tf
			});
		},
		stop : function(){
			recordModule.addRecord();
		}
	});

	//背景颜色
	$("#color-bg").colorPlugin( '#fff' , function(color){
		var cl = 'transparent';
		if(color){
			cl = color.toRgbString();
		}
		
		$("#ittwrap .curchange").children('.animate-contain').css("background-color", cl );

	});

	//字体颜色
	$("#color-font").colorPlugin( '#fff' , function(color){
		var cl = '#fff';
		if(color){
			cl = color.toRgbString();
		}

		var _curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain');
		if(_curch.hasClass('text_edit')){
			_ani.css("color", '' );
			var textee = $('#text-e-e');
			textee.find('*').css("color", '' );
			textee.children().css("color", cl );
			textee.trigger('input');
		}else{
			_ani.css("color", cl );
		}
	}, function(){
		if($("#ittwrap .curchange").hasClass('artfont')){
			$('#change-text').children('.text-save').trigger('click');
		}
	});

	//边框颜色
	$("#color-bo").colorPlugin('#000' , function(color){
		var cl = 'transparent';
		if(color){
			cl = color.toRgbString();
		}
		
		$("#ittwrap .curchange").children('.animate-contain').css("border-color", cl);
	});
	//边框样式
	$("#border-style").on('change', function(event) {
		var _val = $(this).val(),
			_ani = $("#ittwrap .curchange").children('.animate-contain');

		_ani.css("border-style", _val);
		if(_val != 'none' && $("#control-bo").slider('value') == 0 ){
			$("#control-bo").slider('value' , 3);
			$("#control-bo-i").val(3);
		}else if(_val == 'none'){
			_ani.css("border-width", '');
			$("#control-bo").slider('value' , 0);
			$("#control-bo-i").val(0);
		}

		recordModule.addRecord();
	});

	//阴影颜色
	$("#color-sc").colorPlugin('#000' , function(color){
		var cl = 'transparent';
		if(color){
			cl = color.toRgbString();
		}
		
		var _curch = $("#ittwrap .curchange"),
			shr = $("#control-sh-i").val(),
			shf = $("#control-sf-i").val(),
			shs = $("#control-ss-i").val(),
			shc = cl;

			shf = (2 * Math.PI)/360 * shf;

			var shx = shs * Math.sin(shf),
				shy = shs * Math.cos(shf);

			_curch.children('.animate-contain').css({"box-shadow":shx + 'px ' + shy + 'px ' + shr + 'px ' +  shc});
	});
	$("#shadow-type").on('click', 'input', function(event) {
		var _type = $(this).val(),
		    _curch = $("#ittwrap .curchange");

		if(_type == '1'){
			var shs = $("#control-ss-i").val(),
				shf = $("#control-sf-i").val(),
				shr = $("#control-sh-i").val(),
				shc = $("#color-sc").spectrum("get").toString();

			shf = (2 * Math.PI)/360 * shf;

			var shx = shs * Math.sin(shf),
				shy = shs * Math.cos(shf);

			_curch.children('.animate-contain').css({"box-shadow":shx + 'px ' + shy + 'px ' + shr + 'px ' +  shc});
			$("#shadow-wrap").children('.shadow-s').show();
		}else if(_type == '3'){
			_curch.children('.animate-contain').css("box-shadow" , '');
			$("#shadow-wrap").children('.shadow-s').hide();
		}

		recordModule.addRecord();
	});

	$("#st-position").on('click', 'span', function(event) {
		var _type = $(this).attr("data-type"),
			_curch = $("#ittwrap .curchange");

		switch(_type){
			case 'top' : 
				_curch.css({
					top: '0',
					bottom: ''
				});
				$("#control-up").slider( "value", 0 );
				$("#control-up-i").val(0);
				break ;
			case 'bottom' : 
				var h = _curch.height(),
					t = 520 - h;
				_curch.css({
					top: t ,
					bottom: ''
				});
				$("#control-up").slider( "value", t );
				$("#control-up-i").val( t );
				break ;
			case 'left' : 
				_curch.css({
					left: '0',
					right: ''
				});
				$("#control-l").slider( "value", 0 );
				$("#control-l-i").val(0);
				break ;
			case 'right' :
				var w = _curch.width(),
					l = 330 - w; 
				_curch.css({
					left: l ,
					right: ''
				});
				$("#control-l").slider( "value", l );
				$("#control-l-i").val( l );
				break ;
			case 'center' : 
				var w = _curch.width(),
					l = (330 - w) / 2;
				_curch.css({
					left: l + 'px',
					right: ''
				});
				$("#control-l").slider( "value", l );
				$("#control-l-i").val(l);
				break ;
		}

		recordModule.addRecord();
	});

	// 设置高度自适应
	$("#set-autoheight").on('click', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_this = $(this);

		if( _this.prop("checked") ){
			_curch.css('height','');
			if(_curch.hasClass('img')){
				_curch.find("img").css({
					'width':'100%',
					'height':'',
					'margin-top':'',
					'margin-left':''
				});
				_curch.attr("isproportion", "false");
				$("#img-proportion").prop("checked", false);
			}else{
				_curch.find("img").css('height','');
			}
			_curch.addClass('autoheight').removeClass('circle');
			var _height = _curch.height() ;
			$("#control-h").slider( "value", _height);
			$("#control-h-i").val(_height);

			$("#set-circle").prop("checked", false);
			if(_curch.hasClass('svg')){
				_curch.find('svg')[0].setAttribute("preserveAspectRatio","xMinYMin meet");
			}

		}else{
			var _height = _curch.height() ;
			_curch.height(_height).removeClass('autoheight');
			$("#control-h").slider( "value", _height);
			$("#control-h-i").val(_height);
			if(_curch.hasClass('svg')){
				_curch.find('svg')[0].setAttribute("preserveAspectRatio","none");
			}
		}
	});

	// 设置圆形
	$("#set-circle").on('click', function(event) {
		var _curch= $("#ittwrap .curchange"),
			_this = $(this);

		if(_this.prop("checked")){
			var _height = _curch.width();
			_curch.addClass('circle').removeClass('autoheight').height(_height);

			$("#control-h").slider( "value", _height);
			$("#control-h-i").val(_height);
			$("#control-ra").slider( "value", 150);
			$("#control-ra-i").val(150);
			$("#set-autoheight").prop("checked", false);

			if(_curch.hasClass('img')){
				setImgPostion();
			}else if(_curch.hasClass('artfont')){
				_curch.find("img").css({
					'height': '100%',
					'width': '100%'
				});
			}else if(_curch.hasClass('svg')){
				_curch.find('svg')[0].setAttribute("preserveAspectRatio","none");
			}
		}else{
			var _height = _curch.height();
			_curch.height(_height).removeClass('circle');
			_curch.find('.animate-contain').css("border-radius", "");

			$("#control-h").slider( "value", _height);
			$("#control-h-i").val(_height);
			$("#control-ra").slider( "value", 0);
			$("#control-ra-i").val(0);
		}
	});

	/*
	 *  样式 end
	 *****/

	/*****
	 *  动画
	 */

	$("#animate-content").accordion({ 
		header: "> h4" ,
		active : 0 , 
		collapsible: true,
		heightStyle: "content",
		beforeActivate: function( event, ui ) {

			// var head = $(event.currentTarget),
			// 	pannel = head.next(),
			// 	icon = head.children('span');
			// if(head.hasClass('ui-accordion-header-active')){
			// 	head.removeClass('ui-accordion-header-active ui-state-active ui-corner-top')
			// 		.addClass('ui-corner-all')
			// 		.attr({
			// 			'aria-selected' : 'false',
			// 			'aria-expanded' : 'false',
			// 			'tabIndex' : -1
			// 		});
			// 	pannel.slideUp('fast' , function(){
			// 		pannel.removeClass('ui-accordion-content-active').attr("aria-hidden" , true);
			// 	});
			// 	icon.addClass('ui-icon-triangle-1-e').removeClass('ui-icon-triangle-1-s');

			// }else{
			// 	head.addClass('ui-accordion-header-active ui-state-active ui-corner-top')
			// 		.removeClass('ui-corner-all')
			// 		.attr({
			// 			'aria-selected' : 'true',
			// 			'aria-expanded' : 'true',
			// 			'tabIndex' : 0
			// 		});
			// 	pannel.slideDown('fast' , function(){
			// 		pannel.addClass('ui-accordion-content-active').attr("aria-hidden" , false );
			// 	});
			// 	icon.addClass('ui-icon-triangle-1-s').removeClass('ui-icon-triangle-1-e');
			// }

			// return false;
		}
	});

	// 动画开始时间
	initSlider($("#control-ande") , $("#control-ande-i") ,{
		value : 0.2 , 
		max : 10 ,
		stop : function(ui){
			
			animateModule.updateClickAnimate();
		}
	});
	// 动画持续时间
	initSlider($("#control-andu") , $("#control-andu-i") ,{
		value : 2 ,
		max : 20 ,
		stop : function(){
			animateModule.updateClickAnimate();
		}
	});

	$("#animate-content").on('click', '.animate-ul > li', function(event) {
		var _this = $(this),
            _dir = _this.attr("data-dir"),
            name_f = _this.attr("data-value"),
            name_l = '';

        $("#animate-content").find('.animate-ul > li').removeClass('active');
        _this.addClass('active');

        $("#animate-dir").attr("data-dir" , _dir);

        if(! $("#animate-dir").children('.active').is(":visible")){
        	$("#animate-dir").children('.'+ _dir).eq(0).addClass('active').siblings().removeClass('active');
        }
        
        animateModule.updateClickAnimate();

	});
	$("#animate-dir").on('click', 'span', function(event) {
		var _this = $(this);
        
        _this.addClass('active').siblings().removeClass('active');

        animateModule.updateClickAnimate();

	});

	$("#animate-count").on('change', function(event) {
		animateModule.updateClickAnimate();
	});

	$("#ani-el-list").on('click', 'li', function(event , istrigger) {
		var _this = $(this),
			data = JSON.parse(_this.attr("data-d"));
        
        var name = data.name ,
        	name_el = animateModule.getAnimateName(name).el ,
        	dir_el = animateModule.getAnimateDir(name).el;

        $("#control-ande").slider( "value" , data.delay);
        $("#control-ande-i").val(data.delay);
	    $("#control-andu").slider( "value" , data.duration );
	    $("#control-andu-i").val(data.duration);
	    $("#animate-count").val( data.count );

	    $("#animate-content").find('.animate-ul > li').removeClass('active');
        name_el.addClass('active');
		dir_el.addClass('active').siblings().removeClass('active');
		$("#animate-dir").attr("data-dir" , name_el.attr("data-dir"));
		$("#animate-content").accordion( "option", "active", +name_el.parent().attr("data-index") );

		_this.addClass('active').siblings().removeClass('active');

		if(!istrigger){
			animateModule.updateClickAnimate(false);
		}

	}).on('click', '.aniel-delete', function(event) {
		event.stopPropagation();

		var _li = $(this).parent(),
			length = $("#ani-el-list").children('li').length,
			index = _li.index();
		_li.remove();

		$.each( $("#ani-el-list").children('li') , function(index, el) {
			var el = $(el);
			el.children('.aniel-ind').text("动画" + (index + 1));
		});

		animateModule.updateElAnimate();

		if(index > 0){
			$("#ani-el-list").children('li').eq(index-1).trigger('click' , true);
		}else if(index == 0 && length > 1){
			$("#ani-el-list").children('li').eq(0).trigger('click' , true);
		}

	});

	$("#ani-el-add").on('click', function(event) {
		var lilen = $("#ani-el-list").children('li').length,
			li = $('<li data-d=""><span class="aniel-ind">动画'+(lilen+1) +'</span><span class="aniel-delete iconfont icon-unie928"></span></li>'),
			val = {
				name: "fadeInUp",
				delay: 0.2, 
				duration: 1, 
				count: "1"
			};

		li.data("data-d" , val).attr("data-d" , JSON.stringify(val));
		$("#ani-el-list").append(li);

		li.trigger('click' , true);

		animateModule.updateElAnimate();
	});

	$("#ani-wrap").on('click', '.animate-save', function(event) {
		animateModule.updateElAnimate();

		var _curch = $("#ittwrap .curchange");
		if(_curch.hasClass('int-animate')){
			showAnimate.ctAnimate(_curch);
		}else{
			_curch.addClass('hide');
			setTimeout(function(){
				_curch.removeClass('hide');
			}, 50 );
		}
		autoTip('保存成功！');
	});

	/*
	 *  动画 end
	 *****/

	/*****
	 *  模板
	 */

	$("#tpl-tab").on('click', 'a', function(event) {
	//模板一级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	tplModule.showTab(_type);
	});
	$("#tpl-se-tab").on('click', '.com-second-nav > a', function(event) {
	//模板二级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	if(tplModule.tplpage[_type]){
	 		tplModule.tplpage[_type].page = 1;
	 		tplModule.tplpage[_type].nomore = false;
	 	}
	 	tplModule.getTpl(_type);

	 	$(this).addClass('active').siblings().removeClass('active');
	});

	$("#tpl-wrap").on('click', '.tpl-li', function(event) {
		var id = $(this).attr("data-id"),
			bgurl ;

		$("#tpl-wrap").find('li.active').removeClass('active');
		$(this).addClass('active');

		bgurl = (id == 1071 ? 'http://img.weiye.me/zcimgdir/album/file_54bcbec17df2a.jpg' : $(this).children('img').attr("src")); //线上
		//bgurl = (id == 140 ? 'http://img.weiye.me/zcimgdir/album/file_54bcbec17df2a.jpg' : $(this).children('img').attr("src")); //线下

		
		var _html = itttpl[id];

		$("#ittwrap").html(_html);

		$("#ittwrap").children('section').attr("id", id );

		// $("#page-list").children('.active').find('img').attr("src" , bgurl)

		showAnimate.initSingleAnimate('#ittwrap'); //初始化单动画
		showAnimate.initMultipleAnimate('#ittwrap'); //初始化多动画

		$("#ittwrap .page > div").eq(0).addClass('pageshow');

		$("#ittwrap .cont-map").each(function(index, el) { //地图id修改
			var _el = $(el).find('.map-wrap');
			if(_el.length > 0){
				var _id = 'map' + uniqueNum();
				_el.attr("id" , _id);
				mapModule.initmap(_id);
			}

		});

		svgModule.showSVGAnimate($('#ittwrap > .page'));
		textEffectModule.showTextAnimate($('#ittwrap > .page'));


	}).on('click', '.tpl-delete', function(event) {
		var _li = $(this).parent();
		confirmTip({
			text : '确认删除这个单页模板？',
			ConfirmFunction : function(){
				tplModule.deleteTpl(_li);
			}
		});
		event.stopPropagation();
	});

	$("#tpl-space").on('click', '#tpl-cancel', function(event) {
	//模板取消
		var _li = $("#page-list").children('.active'),
			index = _li.index();

		if( tplModule.isaddpage ){
			_li.remove();
			$("#page-list").children('li').eq( index - 1 ).addClass('active');

			$("#ittwrap").html( pagearr[index - 1] );
		}else{
			$("#ittwrap").html( pagearr[index] );
			// _li.find('img').attr("src" , pageModule.getSectionBg() );
		}
		tplModule.isaddpage = false;

		pageModule.initIttwrap();

		tplModule.hide();

	}).on('click', '#tpl-confirm', function(event) {
	//模板确定
		var _li = $("#page-list").children('.active'),
			index = _li.index();

		if( tplModule.isaddpage ){
			recordModule.removeRecord();
			pagearr.splice(index , 0 , '' );
		}

		var _phv = $("#ittwrap .photovote");
		if( _phv.length > 0 ){
			if(photovoteModule.options){
				tip("每个微页只能添加一个照片投票！这个模板的照片投票将被删除！");
				_phv.remove();
			}else{
				photovoteModule.init( _phv );
				phvSetModule.setList( _phv , 2);
			}
		}

		tplModule.isaddpage = false;
		pageModule.savePage();

		recordModule.addRecord('tpl');
		pageModule.resetNum();

		pageModule.initIttwrap();
		zMaxIndex = zIndexModule.setZIndex();
		reviseId.reviseWrapId();
		elListModule.refresh();

		tplModule.hide();
	});

	// 滚动加载
	$("#tpl-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('.active'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		var _type = $("#tpl-se-tab").children('nav.active').children('a.active').attr("type");
	 		tplModule.getTpl(_type);
	 	}
	});

	/*
	 *  模板 end
	 *****/

	/*****
	 *  音乐
	 */

	//一级tab切换
	$("#music-tab").on('click', 'a', function(event) {
	 	var _this = $(this),
	 		_user = _this.attr("user");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	musicModule.showTab(_user);
	 	musicModule.hidebaidu();

	 	$("#music-space").removeClass('music-batch');
	 	$("#music-up-wrap").children('.music-ub').show().siblings().hide();
	});
	//二级分类
	$("#music-se-tab").on('click', '.com-second-nav > a', function(event) {
	 	var _this = $(this),
	 		_type = _this.attr("type"),
	 		_user = _this.parent().attr("user");

	 	musicModule.hidebaidu();

	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	var _musicpage = musicModule.musicpage[_user][_type];
	 	if(_musicpage){
	 		_musicpage.page = 1;
	 		_musicpage.nomore = false;
	 	}
	 	musicModule.getMusic(_user , _type );

	 	$("#music-audio")[0].pause();

	 	$(this).addClass('active').siblings().removeClass('active');

	 	if(_type == 0){
	 		$("#music-change-group").hide();
	 	}else{
	 		$("#music-change-group").show();
	 	}
	 	if(_user == 1){
		 	$("#music-up-wrap").children('.music-ub').show().siblings().hide();
		}
	});
	$("#music-wrap").on('click', '.music-li', function(event) {
	 //音乐选择
	 	var _p = $(this),
	 		_batch = $("#music-space").hasClass('music-batch');//当有music-batch 类名是表示处于批量处理状态
		if(_batch){
			if(_p.hasClass('batch-active')){
		 		_p.removeClass('batch-active');
		 	}else{
			 	_p.addClass('batch-active');
			}

		 	$("#music-p-num").text(_p.parent().children('.batch-active').length);
		}else{
		 	if(_p.hasClass('active')){
		 		_p.removeClass('active');
		 	}else{
			 	$("#music-space").find('.music-li.active').removeClass('active');
			 	_p.addClass('active');
			}
		}
	}).on('click', '.music-delete', function(event) {
		var _li = $(this).closest('li'),
		    _id = [_li.attr("id")];
		    
		confirmTip({
			text : '确认删除这一首歌？',
			ConfirmFunction : function(){
				musicModule.deleteMusic( _id , _li);
			}
		});
		event.stopPropagation();
	}).on('click', '.music-play', function(event) {
		var _li = $(this).parent(),
			audio = $("#music-audio")[0];

		if(_li.hasClass('playing')){
			audio.pause();
			_li.removeClass('playing');
		}else{
			$("#music-space").find('.playing').removeClass('playing');
			var murl = _li.attr("data-url");

			if(/baiduMusic\-[0-9]+/.test(murl) && !_li.attr('baidu-url')){
				musicModule.getBaiduMusicUrl( _li , function(mr){
					audio.src = mr;
				    audio.play();
				    _li.addClass('playing');
				});
			}else{
				if(_li.attr('baidu-url')){
					murl = _li.attr('baidu-url');
				}
				if( murl != audio.src){
				    audio.src = murl;
				}
			    audio.play();
			    _li.addClass('playing');
			}
	    }
	    event.stopPropagation();
	});

	$("#music-space").on('click', '#music-cancel', function(event) {
	//音乐取消
		$("#music-audio")[0].pause();
		$("#music-space").find('.playing').removeClass('playing');

		musicModule.hide();
		musicModule.hidebaidu();
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();

	}).on('click', '#music-confirm', function(event) {
	//音乐确定
		var li = $("#music-space").find('li.active');
		
		$("#music-audio")[0].pause();
		$("#music-space").find('.playing').removeClass('playing');

		musicModule.confirm(li);
		musicModule.hide();
		musicModule.hidebaidu();
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();
	});

	// 滚动加载
	$("#music-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('.active'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		var _user = _c.attr("user"),
	 			_type = $("#music-se-tab").children('nav.active').children('a.active').attr("type");
	 		musicModule.getMusic( _user , _type );
	 	}
	});

	$("#music-up-wrap").on('click', '#music-up-link', function(event) {
	//添加外链按钮
		$("#music-up-wrap").children('.music-u-l').show().siblings().hide();
	}).on('click', '.music-upl-con', function(event) {
	//添加外链确定
		var _this = $(this),
			name = $("#music-upl-name").val(),
			link = $("#music-upl-l").val();

		if(!name){
			autoTip("请填写音频名称");
			return ;
		}
		if(!link && !testHttp(link)){
			autoTip("请填写正确的音频链接");
			return ;
		}
		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		var url = '/index.php?r=pc/UserTag/addMusic',
			ddata = {
				user   : $('#music-tab').children('.active').attr("user"),
				tag_id : $("#music-se-tab").children('.active').children('.active').attr("type") || 0,
				url    : link,
				title  : name
			},
			successFn = function( data ){
				if(data.status == 0){
					var _li = musicModule.parseTemplate( {  
							id : data.data ,
							music : data.music ,
							title : name
						} ,  ddata.user);

					$("#music-wrap").children('.active').children('ul').prepend(_li);

					$("#music-up-wrap").children('.music-ub').show().siblings().hide();
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));

	}).on('click', '.music-upl-can', function(event) {
	//添加外链取消
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();
	}).on('click', '.music-duo', function(event) {
	//批量处理
		var _option = '';
		$.each( $("#music-se-tab").children('.active').children() ,function(index, el) {
			var _el = $(el);
			_option += '<option value="'+_el.attr("type")+'">'+_el.text()+'</option>';

		});
		if(pmi_list.isAdmin){
			_option = '';
			$.each( $("#music-se-tab").children('nav') , function(ind, nav) {
				var _nav = $(nav),
				    _sctype = _nav.attr('user');
				$.each( _nav.children() , function(index, el) {
					var _el = $(el),
					    _actype = _el.attr('type'),
					    text = _el.text();
					if(_actype == 0){
						text = $("#music-tab").children('a[user="'+_sctype+'"]').text() + '-' + text;
					}
					_option += '<option value="'+_actype+'">'+text+'</option>';
				});
			});
		}
		$("#music-p-s").html(_option);
		$("#music-p-num").text(0);

		$("#music-space").addClass('music-batch');

		$("#music-up-wrap").children('.music-p').show().siblings().hide();

	}).on('click', '.music-p-con', function(event) {
	//批量处理确定
		var _this = $(this),
			_li = $("#music-wrap").children('.active').children('ul').children('li.batch-active'),
			tag_id = $("#music-p-s").val(),
			old_tag_id = $("#music-se-tab").children('.active').children('.active').attr("type"),
			audioId = [];

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		$.each(_li , function(index, el) {
			audioId.push(el.id);
		});

		var url = '/index.php?r=pc/UserTag/moveMusic',
			ddata = {
				tag_id: tag_id
			    ,music_arr: audioId
			    ,user : $('#music-tab').children('.active').attr("user")
			},
			successFn = function( data ){
				if(data.status == 0){
					if(old_tag_id == 0){
						_li.removeClass('batch-active');
					}else{
						_li.remove();
					}
					$("#music-space").removeClass('music-batch');
					$("#music-p-num").text(0);
					$("#music-up-wrap").children('.music-ub').show().siblings().hide();
					autoTip("移动成功！");
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));

	}).on('click', '.music-p-d', function(event) {
	//批量处理删除
		var _li = $("#music-wrap").children('.active').children('ul').children('li.batch-active'),
		    _id = [];
		
		$.each(_li , function(index, el) {
			_id.push(el.id);
		});

		confirmTip({
			text : '确认删除选中的音频？',
			ConfirmFunction : function(){
				musicModule.deleteMusic( _id , _li , function(){
					$("#music-space").removeClass('music-batch');
					$("#music-p-num").text(0);
					$("#music-up-wrap").children('.music-ub').show().siblings().hide();
				});
			}
		});

	}).on('click', '.music-p-can', function(event) {
	//批量处理取消
		$("#music-wrap").children('.active').children('ul').children('li.batch-active').removeClass('batch-active');
		$("#music-p-num").text(0);
		$("#music-space").removeClass('music-batch');
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();

	}).on('click', '.music-change-group', function(event) {
	//修改分组
		var _a = $("#music-se-tab").children('.active').children('.active');

		$("#music-c-input").val(_a.text());
		$("#music-up-wrap").children('.music-c-n').show().siblings().hide();

	}).on('click', '.music-c-con', function(event) {
	//修改分组确定
		var _this = $(this),
			name = $("#music-c-input").val(),
			_span = $("#music-se-tab").children('.active').children('.active'),
			tag_id = _span.attr("type");

		if(tag_id == 0){
			autoTip("默认分组不能修改组名！");
			return ;
		}
		if(!name){
			autoTip("请填写组名！");
			return ;
		}
		if(stringLength(name) > 10){
			autoTip('组名过长，请重新输入!');
			return ;
		}

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		var url = '/index.php?r=pc/UserTag/updateTag',
			ddata = {
				tag: name ,
        		tag_id: tag_id ,
        		admin : pmi_list.isAdmin ? 1 : ''
			},
			successFn = function( data ){
				if(data.status == 0){
					_span.text(name);
					$("#music-up-wrap").children('.music-ub').show().siblings().hide();
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));

	}).on('click', '.music-c-can', function(event) {
	//修改分组取消
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();

	}).on('click', '.music-d-g', function(event) {
	//修改分组删除分组
		var _this = $(this),
			_span = $("#music-se-tab").children('.active').children('.active'),
			tag_id = _span.attr("type");

		confirmTip({
			text : '当前组内音频会还原到全部分组内。确定要删除当前组？',
			ConfirmFunction : function(){
				if(_this.hasClass('loading')){
					return ;
				}
				_this.addClass('loading');

				var url = '/index.php?r=pc/UserTag/removeTag',
					ddata = {
		        		tag_id: tag_id,
		        		admin : pmi_list.isAdmin ? 1 : ''
					},
					successFn = function( data ){
						if(data.status == 0){
							_span.parent().children().eq(0).trigger('click');
							_span.remove();
							$("#music-up-wrap").children('.music-ub').show().siblings().hide();
						}else{
							autoTip(data.data);
						}
						_this.removeClass('loading');
					},
					errorFn = function(){
						_this.removeClass('loading');
					};

				$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));
				
			}
		});	

	}).on('click', '.music-add-group', function(event) {
	//添加分组
		$("#music-a-input").val("");
		$("#music-up-wrap").children('.music-a-g').show().siblings().hide();
	}).on('click', '.music-a-con', function(event) {
	//添加分组确定
		var _this = $(this),
			name = $("#music-a-input").val();

		if(!name){
			autoTip("请填写组名！");
			return ;
		}
		if(stringLength(name) > 10){
			autoTip('组名过长，请重新输入!');
			return ;
		}

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		var url = '/index.php?r=pc/UserTag/addTag',
			ddata = {
				tag : name
          		,type : 1
          		,user : $('#music-tab').children('.active').attr("user")
			},
			successFn = function( data ){
				if(data.status == 0){
					var _a = '<a type="'+data.data+'">'+name+'</a>';
					$("#music-se-tab").children('.active').append(_a);
					$("#music-up-wrap").children('.music-ub').show().siblings().hide();
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));

	}).on('click', '.music-a-can', function(event) {
	//添加分组取消
		$("#music-up-wrap").children('.music-ub').show().siblings().hide();
	});


	// 百度音乐搜索
	$("#baiduMusic-btn").on('click', function(event) {
		var word = $("#baiduMusic-input").val();
		if(!word){
			return;
		}
		$("#baiduMusic-wrap").children('.music-ul').empty();
		musicModule.baiduMusic = {
			page : 1 ,
			// loading : false,
			nomore : false
		}
		musicModule.getBaiduMusic( word , true );

		musicModule.showbaidu();
	});
	// 百度音乐回车快捷键
	$("#baiduMusic-input").on('keyup', function(event) {
		var keycode = event.keyCode;

		if(keycode == 13){
			$("#baiduMusic-btn").trigger('click');
		}
	});
	// 百度音乐清除搜索
	$("#baiduMusic-clear").on('click', function(event) {
		musicModule.hidebaidu();
	});

	$("#baiduMusic-wrap").on('click', '.music-baiduadd', function(event) {
	// 百度音乐添加到自己的音乐库
		var _li = $(this).parent();

		if(_li.hasClass('loading') || _li.hasClass('hasadd')){
			return ;
		}
		_li.addClass('loading');

		var name = _li.children('.music-name').text();
		var url = '/index.php?r=pc/UserTag/addMusic',
			ddata = {
				user   : 1,
				tag_id :  0,
				url    : 'baiduMusic-' + _li.attr("id"),
				title  : name
			},
			successFn = function( data ){
				if(data.status == 0){
					_li.addClass('hasadd');

					var _tag = $("#music-se-tab").children('nav[user="1"]').children('a[type="0"]'),
						_user = $('#music-wrap').children('section[user="1"]').children('ul');
					if(_tag.hasClass('active') && _user.children().length ){
						var _lihtml = musicModule.parseTemplate( {  
								id : data.data ,
								music : data.music ,
								title : name
							} ,  1);

						_user.prepend(_lihtml);
					}

				}else{
					autoTip(data.data);
				}
				_li.removeClass('loading');
			},
			errorFn = function(){
				_li.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#music-space"));
	}).on('click', '.music-play', function(event) {
	// 百度音乐试听
		var _li = $(this).parent();
		musicModule.getBaiduMusicUrl( _li , function(mr){
			var audio = $("#music-audio")[0];

			if(_li.hasClass('playing')){
				audio.pause();
				_li.removeClass('playing');
			}else{
				$("#music-space").find('.playing').removeClass('playing');
				if( mr != audio.src){
				    audio.src = mr;
				}
			    audio.play();
			    _li.addClass('playing');
		    }
		});
	    event.stopPropagation();
	}).on('click', '.music-li', function(event) {
	// 百度音乐选择
		var _li = $(this);
		if(_li.hasClass('active')){
	 		_li.removeClass('active');
	 	}else{
		 	$("#music-space").find('.music-li.active').removeClass('active');
		 	_li.addClass('active');
		}
	});
	// 百度音乐滚动加载
	$("#baiduMusic-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children(),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		musicModule.getBaiduMusic( $("#baiduMusic-input").val() , false );
	 	}
	});

	/*
	 *  音乐 end
	 *****/

	/*****
	 *  图片库
	 */

	$("#images-tab").on('click', 'a', function(event) {
	//图片一级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	imagesModule.showTab(_type);

	 	if(_type == 0 || pmi_list.isAdmin){
	 		$("#images-e-g").show();
	 		if(pmi_list.isAdmin && $("#images-space").hasClass('images-batch')){
		 		$('#images-wrap').find('li').removeClass('batch-active');
	 		}
	 	}else{
	 		$("#images-e-g").hide();
	 	}
	 	if( _type == 26913 ){
	 		$("#images-e-g").before('<span class="smartimages" style="vertical-align: middle;">更多图片-<a style="color:#3b99d7;" href="http://www.smartimages.cn" target="_blank">灵图视觉</a></span>');
	 		// $("#images-e-g").before('<a class="smartimages" href="http://www.smartimages.cn" target="_blank"><img style="height:30px;vertical-align: middle;" src="http://img.weiye.me/zcimgdir/album/file_58abe4da7b051.jpg" alt="" /></a>');
	 	}else{
	 		$("#images-e-g").prev('.smartimages').remove();
	 	}
	 	$("#images-b-t").children('.images-b-b').show().siblings().hide();
	});
	$("#images-se-tab").on('click', '.com-second-nav > a', function(event) {
	//图片二级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	if(imagesModule.imagespage[_type]){
	 		imagesModule.imagespage[_type].page = 1;
	 		imagesModule.imagespage[_type].nomore = false;
	 	}
	 	var pt = _this.parent().attr("type");
	 	imagesModule.getimages(_type , pt);

	 	$(this).addClass('active').siblings().removeClass('active');

	 	if( _type == pt || pmi_list.isAdmin){
	 		$("#images-change-group").hide();
	 	}else{
	 		$("#images-change-group").show();
	 	}
	 	$("#images-b-t").children('.images-b-b').show().siblings().hide();
	});

	$("#images-wrap").on('click', '.images-li', function(event) {
	//图片选择
		var _this = $(this);
		if($("#images-space").hasClass('images-batch')){
			if(_this.hasClass('batch-active')){
				_this.removeClass('batch-active');
			}else{
				_this.addClass('batch-active');
			}
			$("#images-p-num").text(_this.parent().children('.batch-active').length);
		}else{
			var img = _this.find('img').attr("src");
			if(imagesModule.isshapecrop){
				imagesModule.imageConfirm(img);
				shapeCropModule.show( img ,  function( img ){
					$("#img-img").attr("src" , img);
					recordModule.addRecord();
				}, function(img){
					imagesModule.imageCancel(img);
				}, function(img){
					setImgPostion(img);
					var _curch = $("#ittwrap .curchange"),
						_img = _curch.children('.animate-contain').children('img');
					if(_curch.attr("isproportion") == 'false' ){
						_curch.height('');
						_img.height('');
					}
					$("#img-img").attr("src" , img);
				});
			}else{
				cropModule.show( img , function(img){
					imagesModule.imageConfirm(img);
				} , function(img){
					imagesModule.imageCancel(img);
				});
			}
			
		}

	}).on('click', '.images-delete', function(event) {
	//图片删除
		event.preventDefault();

		var _li = $(this).parent(),
			idarr = [ _li.attr("data-id") ];	

		confirmTip({
			text : '确认删除这张图片？',
			ConfirmFunction : function(){
				imagesModule.deleteImages( idarr , _li );
			}
		});	

		event.stopPropagation();
	});

	$("#images-space").on('click', '#images-cancel', function(event) {
	//图片取消
		imagesModule.imageCancel();
		imagesModule.hide();
		$("#images-b-t").children('.images-b-b').show().siblings().hide();

	}).on('click', '#images-confirm', function(event) {
	//图片确定
		imagesModule.hide();
		$("#images-b-t").children('.images-b-b').show().siblings().hide();
		$("#mask-div").removeClass('show zIndex20');
		$("#hollow-mask").removeClass('show');
	});

	// 滚动加载
	$("#images-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('.active'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		var _type = $("#images-se-tab").children('nav.active').children('a.active').attr("type");
	 		imagesModule.getimages(_type , _c.attr("type"));
	 	}
	});

	//纯色
	$("#images-color").colorPlugin("#fff" , function(color){
		var cl = 'transparent';
		if(color){
			cl = color.toRgbString();
		}

		imagesModule.colorConfirm(cl);
	});

	$("#images-b-t").on('click', '.images-add-group', function(event) {
	//图片添加分组
		$("#images-b-t").children('.images-ga-w').show().siblings().hide();

	}).on('click', '.images-ga-con', function(event) {
	//图片添加分组确定
		var _this = $(this),
			name = $("#images-ga-input").val();

		if(!name){
			autoTip("请填写组名！");
			return ;
		}
		if(stringLength(name) > 10){
			autoTip('组名过长，请重新输入!');
			return ;
		}

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		var url = '/index.php?r=pc/UserTag/addTag',
			ddata = {
				tag : name
          		,type : 0
          		,user : 1
			},
			successFn = function( data ){
				if(data.status == 0){
					var _a = '<a type="'+data.data+'">'+name+'</a>';
					$("#images-se-tab").children('.active').append(_a);
					$("#images-b-t").children('.images-b-b').show().siblings().hide();
					$("#images-ga-input").val('');
					autoTip("添加分组成功！");
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#images-space"));

	}).on('click', '.images-ga-can', function(event) {
	//图片添加分组取消
		$("#images-b-t").children('.images-b-b').show().siblings().hide();

	}).on('click', '.images-change-group', function(event) {
	//图片修改分组
		var _a = $("#images-se-tab").children('.active').children('.active');

		$("#images-c-input").val(_a.text());

		$("#images-b-t").children('.images-c-n').show().siblings().hide();

	}).on('click', '.images-c-con', function(event) {
	//图片修改分组确定
		var _this = $(this),
			name = $("#images-c-input").val(),
			_span = $("#images-se-tab").children('.active').children('.active'),
			tag_id = _span.attr("type");

		if(tag_id == 0){
			autoTip("默认分组不能修改组名！");
			return ;
		}
		if(!name){
			autoTip("请填写组名！");
			return ;
		}
		if(stringLength(name) > 10){
			autoTip('组名过长，请重新输入!');
			return ;
		}

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		var url = '/index.php?r=pc/UserTag/updateTag',
			ddata = {
				tag: name
				,tag_id: tag_id
				,user: 1
			},
			successFn = function( data ){
				if(data.status == 0){
					_span.text(name);
					$("#images-b-t").children('.images-b-b').show().siblings().hide();
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#images-space"));

	}).on('click', '.images-c-can', function(event) {
	//图片修改分组取消
		$("#images-b-t").children('.images-b-b').show().siblings().hide();

	}).on('click', '.images-d-g', function(event) {
	//图片修改分组删除分组
		var _this = $(this),
			_span = $("#images-se-tab").children('.active').children('.active'),
			tag_id = _span.attr("type");

		confirmTip({
			text : '删除分组后分组里的图片会还原到全部分组内。您确定要删除当前组？',
			ConfirmFunction : function(){
				if(_this.hasClass('loading')){
					return ;
				}
				_this.addClass('loading');

				var url = '/index.php?r=pc/UserTag/removeTag',
					ddata = {
		        		tag_id: tag_id ,
		        		user : 1
					},
					successFn = function( data ){
						if(data.status == 0){
							_span.parent().children().eq(0).trigger('click');
							_span.remove();
							$("#images-b-t").children('.images-b-b').show().siblings().hide();
						}else{
							autoTip(data.data);
						}
						_this.removeClass('loading');
					},
					errorFn = function(){
						_this.removeClass('loading');
					};

				$ajax( url , "post", ddata , "json", successFn, errorFn, $("#images-space"));
				
			}
		});	

	}).on('click', '.images-duo', function(event) {
	//图片批量处理
		var _option = '';
		$.each( $("#images-se-tab").children('.active').children() ,function(index, el) {
			var _el = $(el);
			_option += '<option value="'+_el.attr("type")+'" data-user="1">'+_el.text()+'</option>';

		});
		if(pmi_list.isAdmin){
			_option = '';
			$.each( $("#images-se-tab").children('nav') , function(ind, nav) {
				var _nav = $(nav),
				    _sctype = _nav.attr('type');
				$.each( _nav.children() , function(index, el) {
					var _el = $(el),
					    _actype = _el.attr('type'),
					    text = _el.text(),
					    user = _sctype == 0 ? 1 : 0;
					if(_actype == _sctype){
						text = $("#images-tab").children('a[type="'+_actype+'"]').text() + '-' + text;
					}
					_option += '<option value="'+_actype+'" data-user="'+user+'">'+text+'</option>';
				});
			});
		}

		$("#images-p-s").html(_option);
		$("#images-p-num").text(0);
		$("#images-space").addClass('images-batch');
		$("#images-b-t").children('.images-p').show().siblings().hide();

	}).on('click', '.images-p-con', function(event) {
	//图片批量处理确定
		var _this = $(this),
			_li = $("#images-wrap").children('.active').children('ul').children('li.batch-active'),
			tag_id = $("#images-p-s").val(),
			old_tag_id = $("#images-se-tab").children('.active').children('.active').attr("type"),
			imgId = [];

		if(_this.hasClass('loading')){
			return ;
		}
		_this.addClass('loading');

		$.each(_li , function(index, el) {
			imgId.push($(el).attr("data-id"));
		});

		var url = '/index.php?r=pc/UserTag/moveImg',
			ddata = {
				tag_id: tag_id
				,img_arr: imgId
				,user : 1
			},
			successFn = function( data ){
				if(data.status == 0){
					if(old_tag_id == 0){
						_li.removeClass('batch-active');
					}else{
						_li.remove();
					}
					$("#images-p-num").text(0);
					$("#images-space").removeClass('images-batch');
					$("#images-b-t").children('.images-b-b').show().siblings().hide();
					autoTip("移动成功！");
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading');
			},
			errorFn = function(){
				_this.removeClass('loading');
			};

		$ajax( url , "post", ddata , "json", successFn, errorFn, $("#images-space"));

	}).on('click', '.images-p-can', function(event) {
	//图片批量处理取消
		$("#images-wrap").find('li.batch-active').removeClass('batch-active');
		$("#images-p-num").text(0);
		$("#images-space").removeClass('images-batch');
		$("#images-b-t").children('.images-b-b').show().siblings().hide();

	}).on('click', '.images-p-d', function(event) {
	//图片批量处理批量删除
		var _li = $("#images-wrap").children('.active').children('ul').children('li.batch-active'),
		    _id = [];
		
		$.each(_li , function(index, el) {
			_id.push($(el).attr("data-id"));
		});

		confirmTip({
			text : '确认删除选中的图片？',
			ConfirmFunction : function(){
				imagesModule.deleteImages( _id , _li , function(){
					$("#images-p-num").text(0);
					$("#images-space").removeClass('images-batch');
					$("#images-b-t").children('.images-b-b').show().siblings().hide();
				});
			}
		});
	});


	/*
	 *  图片库 end
	 *****/

	/*****
	 *  图片裁剪
	 */

	$('#crop-img').cropper({
		aspectRatio: 16 / 9, //裁剪比例
		zoomable : false, //是否允许缩放
		viewMode : 1,
		autoCropArea : 1 , //默认裁剪的比例 （0-1）
		responsive : false,
		crop: function(e) {

		}
	});

	$("#crop-wrap").on('click', '.crop-no', function(event) {

		var img = $('#crop-img').attr("src");

		cropModule.cropConfirm( img );

		cropModule.hide();
		imagesModule.hide();
		recordModule.addRecord();

	}).on('click', '.crop-can', function(event) {
		
		cropModule.hide();

	}).on('click', '.crop-con', function(event) {
		var cropc = $("#crop-img").cropper('getCanvasData'),
			cropb = $("#crop-img").cropper('getCropBoxData');
		if( cropc.width === cropb.width && cropc.height === cropb.height ){
			$("#crop-wrap").find('.crop-no').trigger('click');
			return ;
		}

		var _this = $(this),
			cimg = $("#crop-img"),
			imgdata = cimg.cropper('getData'),
			iid = cimg.attr("data-id"),
			iurl = cimg.attr("src");

		if(/\.gif/.test(iurl)){
			autoTip("GIF的图片无法裁剪,将默认选择不裁剪！");
			$("#crop-wrap").find('.crop-no').trigger('click');
			return;
		}

		if (_this.hasClass('loading')) {
			return ;
		};
		_this.addClass('loading').text('裁剪中..');

		var url = '/index.php?r=pc/UserTag/CropImage',
			data = {
				id: iid,
				orig_file: iurl,
				width: imgdata.width,
				height: imgdata.height,
				x: imgdata.x < 0 ? 0 : imgdata.x,
				y: imgdata.y < 0 ? 0 : imgdata.y
			},
			successFn = function( data ){
				if(data.status == 0){
					cropModule.cropConfirm( data.data.img_thumb );

					imagesModule.addOneImages( data.data.img_thumb , data.data.id );

					cropModule.hide();
					imagesModule.hide();
					recordModule.addRecord();
				}else{
					autoTip(data.data);
				}
				_this.removeClass('loading').text('裁剪');
			},
			errorFn = function(){
				_this.removeClass('loading').text('裁剪');
			};

		$ajax( url , "get", data , "json", successFn, errorFn);

	});
	
	// 图片裁剪比例
	var imgRatio = [1 , 1 , 1/1 , 4/3 , 3/4 , 16/9 , 330/520 , 330/260 , NaN];
	$("#crop-ratio").on('click', 'input', function(event) {
		var val = $(this).val(),
			rat = 1;
		if( val == 0){
			rat = cropModule.ratio;
		}else if( val == 1 ){
			var imgData = $("#crop-img").cropper('getImageData');

			rat = imgData.aspectRatio ;
		}else{
			rat = imgRatio[val];
		}
		$("#crop-img").cropper('setAspectRatio' , rat );
	});
	

	/*
	 *  图片裁剪 end
	 *****/
	/*****
	 *  形状裁剪
	 */
	$('#shapeCrop-img').cropper({
		aspectRatio: 16 / 9, //裁剪比例
		zoomable : true, //是否允许缩放
		viewMode : 1,
		autoCropArea : 1 , //默认裁剪的比例 （0-1）
		responsive : false,
		crop: function(e) {
			var imageData = $(this).cropper('getImageData'),
				$preview = $("#ittwrap .curchange"),
				previewWidth = $preview.width(),
				previewHeight = $preview.height(),
				imgrw = e.width / previewWidth,
				imgrh = e.height / previewHeight;

			$preview.find('img').css({
				width: imageData.naturalWidth / imgrw,
				height: imageData.naturalHeight / imgrh,
				marginLeft: -e.x / imgrw,
				marginTop: -e.y / imgrh
			});
		},
		built : function(){
			var _class = shapeCropModule.shapeCropClass;
			$("#shapeCrop-crop").find('.cropper-view-box').addClass(_class);

			var r = _class.match(/shape-[0-9]{1,3}/);
			if(r){
				$("#shapeCrop-shape").children('li[type="'+r[0]+'"]').addClass('active');
			}
			var _img = this.src,
				_color = '';
			if(/kong\.png/.test(_img)){
				_color = $("#img-img").css("background-color");
			}else{
				_color = '';
			}
			$("#shapeCrop-crop").find('.cropper-canvas').css("background-color" , _color);
			$("#shapeCrop-crop").find('.cropper-view-box').css("background-color" , _color);

		}
	});

	var shapeRatio = [NaN , 1 , 1/1 , 2/1 , 4/3 , 3/4 ];
	$("#shapeCrop-shape").on('click', 'li', function(event) {
		var type = $(this).attr("type"),
			_curch = $("#ittwrap .curchange");

		shapeCropModule.removeShapeCrop();
		if( type == "crop" ){
			var index = $(this).index(),
				rat = shapeRatio[index];
			if(index == 1){
				rat = shapeCropModule.ratio;
			}
			$("#shapeCrop-img").cropper('setAspectRatio' , rat );
		}else{
			$("#shapeCrop-img").cropper('setAspectRatio' , shapeCropModule.ratio );

			$("#shapeCrop-crop").find('.cropper-view-box').addClass('shape-div').addClass(type);
			_curch.children('.animate-contain').addClass('shape-div').addClass(type);
		}
		$(this).addClass('active').siblings().removeClass('active');
	});

	$("#shapeCrop-btn-wrap").on('click', '.shapeCrop-can',function(event) {

		shapeCropModule.removeShapeCrop();
		shapeCropModule.hide();
		shapeCropModule.cropCancel();

	}).on('click', '.shapeCrop-no', function(event) {
		var img = $('#shapeCrop-img').attr("src");

		shapeCropModule.removeShapeCrop();
		imagesModule.hide();
		shapeCropModule.hide();
		shapeCropModule.cropNo(img);
		recordModule.addRecord();

	}).on('click', '.shapeCrop-con', function(event) {
		if($("#shapeCrop-crop").find('.cropper-view-box').hasClass('shape-div')){
			imagesModule.hide();
			shapeCropModule.hide();
			recordModule.addRecord();
		}else{
			var _this = $(this),
				cimg = $("#shapeCrop-img"),
				imgdata = cimg.cropper('getData'),
				iid = cimg.attr("data-id"),
				iurl = cimg.attr("src");

			if(/kong\.png/.test(iurl)){
				autoTip("这个图片元素是纯色，不需要选择比例裁剪！")
				return;
			}
			if(/\.gif/.test(iurl)){
				autoTip("GIF的图片无法裁剪,将默认选择不裁剪！");
				$("#shapeCrop-btn-wrap").children('.shapeCrop-no').trigger('click');
				return;
			}

			var cropc = $("#shapeCrop-img").cropper('getCanvasData'),
				cropb = $("#shapeCrop-img").cropper('getCropBoxData');
			if( cropc.width === cropb.width && cropc.height === cropb.height ){
				$("#shapeCrop-btn-wrap").children('.shapeCrop-no').trigger('click');
				return ;
			}

			if (_this.hasClass('loading')) {
				return ;
			};
			_this.addClass('loading').text('裁剪中..');

			var url = '/index.php?r=pc/UserTag/CropImage',
				data = {
					id: iid,
					orig_file: iurl,
					width: imgdata.width,
					height: imgdata.height,
					x: imgdata.x < 0 ? 0 : imgdata.x,
					y: imgdata.y < 0 ? 0 : imgdata.y
				},
				successFn = function( data ){
					if(data.status == 0){
						shapeCropModule.cropNo( data.data.img_thumb );

						imagesModule.addOneImages( data.data.img_thumb , data.data.id );

						imagesModule.hide();
						shapeCropModule.hide();
						recordModule.addRecord();
					}else{
						autoTip(data.data);
					}
					_this.removeClass('loading').text('裁剪');
				},
				errorFn = function(){
					_this.removeClass('loading').text('裁剪');
				};

			$ajax( url , "get", data , "json", successFn, errorFn);
		}
	});
	
	/*
	 *  形状裁剪 end
	 *****/
	/*****
	 *  美图秀秀
	 */

	xiuxiuModule.initMeitu();

	$("#meitu3-close").click(function(event) {
		$("#meitu-wrap3").removeClass('show');
	});

	/*
	 *  美图秀秀 end
	 *****/

	/*****
	 *  元素列表
	 */

	$("#el-space").draggable({
		// containment: [-100 , 0 , window.innerWidth - 100, window.innerHeight - 100],
		containment: "window",
		handle: ".el-drag"
	});
	$("#el-space").on('click', '.el-close', function(event) {
		elListModule.hide();
	});
	$("#el-tab").on('click', 'a', function(event) {
		var _this = $(this),
			_type = _this.attr("type");

		elListModule.showType(_type);
	});

	var elListOriIndex = 0;
	$("#el-ul").sortable({
		axis: "y",
		// containment: "parent",
		cursor: "move",
		revert: true,
		items: " > .el-li",
		placeholder:'el-kong',
		delay: 100,
		activate: function(event, ui) {
			elListOriIndex = ui.item.eq(0).index();
		},
		update: function( event, ui ) {
			var elListNewIdex = ui.item.eq(0).index();

			var list = elListModule.elList;

			if(elListOriIndex > elListNewIdex){
				list[elListOriIndex].insertAfter(list[elListNewIdex]);
			}else{
				list[elListOriIndex].insertBefore(list[elListNewIdex]);
			}

			
			elListModule.showList();
		}
	});

	$("#el-ul").on('click', '.el-li', function(event) {
		var _this = $(this);
			index = $('#el-ul').children('.el-li').index(_this);

		_this.addClass('active').siblings().removeClass('active');
		elListModule.elList[index].trigger('mousedown').trigger('mouseenter');

	}).on('click', '.el-hide', function(event) {
		var _this = $(this),
			_li = _this.parent(),
			index = _li.index(),
			_el = elListModule.elList[index];

		if(_this.hasClass('active')){
			_el.removeClass('hide');
			_this.removeClass('active');
		}else{
			_this.addClass('active');
			_el.addClass('hide');
		}
	}).on('click', '.el-tacked', function(event) {
		var _this = $(this),
			_li = _this.parent(),
			index = _li.index(),
			_el = elListModule.elList[index];

		if(_this.hasClass('active')){
			_el.removeClass('tacked');
			_this.removeClass('active');
		}else{
			_this.addClass('active');
			_el.addClass('tacked');
		}
	}).on('click', '.el-zindex-shang', function(event) {
		var _li = $(this).closest('.el-li'),
			index = _li.index();

		if(index == 0){
			return ;
		}

		var list = elListModule.elList;
		rightclickModule.operation.shang( list[index] );
		_li.prev().before(_li);
		utilities.ArrayExchange( list , index , index - 1 );

		event.stopPropagation();
	}).on('click', '.el-zindex-xia', function(event) {
		var _li = $(this).closest('.el-li'),
			index = _li.index();

		if(index == _li.parent().children('li').length - 1){
			return ;
		}
		var list = elListModule.elList;
		rightclickModule.operation.xia( list[index] );
		_li.next().after(_li);
		utilities.ArrayExchange( list , index , index + 1 );

		event.stopPropagation();
	}).on('click', '.el-zindex-b', function(event) {
		var _li = $(this).closest('.el-li'),
			index = _li.index();

		if(index == _li.parent().children('li').length - 1){
			return ;
		}
		rightclickModule.operation.bottom( elListModule.elList[index] );
		elListModule.showList();

		event.stopPropagation();
	}).on('click', '.el-zindex-t', function(event) {
		var _li = $(this).closest('.el-li'),
			index = _li.index();

		if(index == 0){
			return ;
		}

		rightclickModule.operation.top( elListModule.elList[index] );
		elListModule.showList();

		event.stopPropagation();
	}).on('click', '.el-delete', function(event) {
		var _li = $(this).closest('.el-li'),
			index = _li.index();

		rightclickModule.operation.delete( elListModule.elList[index] , false);

		elListModule.showList();

		event.stopPropagation();
	}).on('mouseenter', '.el-opt', function(event) {
		var _this = $(this),
			_ul = _this.children('.el-opt-ul'),
			uloffset = _ul.offset(),
			woffset = $("#el-space").offset();

		if(uloffset.top > woffset.top + 460 - 155){
			_ul.css({"top" : 'auto', 'bottom' : '33px'});
		}else{
			_ul.css({"top" : '33px', 'bottom' : 'auto'});
		}

	});

	/*
	 *  元素列表 end
	 *****/

	/*****
	 *  图片修改
	 */

	$("#img-change").on('click', function(event) {

		var _curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain'),
			_img = _ani.children('img'),
			rat = _curch.width() / _curch.height(),
			imgImg = $("#img-img"),
			oldimg = imgImg.attr("src"),
			issh = _ani.hasClass('shape-div'),
			oldclass = _ani.attr("class"),
			oldimgstyle = _img.attr("style");

		_curch.height( _curch.height() );
		imagesModule.show(function( img ){
			_img.css("background-color" , '').attr("src" , img);
			imgImg.attr("src" , img);

		} , function(){
			_ani.attr("class" , oldclass);
			_img.attr("style" , oldimgstyle);

			_img.attr("src" , oldimg);
			imgImg.attr("src" , oldimg);

		} , rat , true , function( cl ){
			_curch.css({"height": _curch.height()});
			_img.attr("src", cdnUrl + '/static/pc/invitation/img/kong.png').css({
				'width': '100%',
				'height': '100%',
				'margin-left':'',
				'margin-top': '',
				'background-color': cl
			});

			imgImg.attr("src",cdnUrl + '/static/pc/invitation/img/kong.png').css("background-color",cl);

		});
		shapeCropModule.shapeCropClass = oldclass.replace('animate-contain' , '');

	});
	$("#change-img").on('click', '.img-crop', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain'),
			_img = _ani.children('img'),
			imgsrc = _img.attr("src"),
			issh = _ani.hasClass('shape-div'),
			oldclass = _ani.attr("class"),
			oldimgstyle = _img.attr("style"),
			imgImg = $("#img-img");

		_curch.height( _curch.height() );
		shapeCropModule.ratio = _curch.width() / _curch.height();
		shapeCropModule.show( imgsrc ,  function( img ){
			recordModule.addRecord();
		}, function(){
			_ani.attr("class" , oldclass);
			_img.attr("style" , oldimgstyle);
		} , function(img){
			setImgPostion(img);

			if(_curch.attr("isproportion") == 'false' ){
				_curch.height('');
				_img.height('');
			}
			imgImg.attr("src" , img);
		});

		shapeCropModule.shapeCropClass = oldclass.replace('animate-contain' , '');

	}).on('click', '.img-meitu', function(event) {

		var img = $("#img-img").attr("src"),
			type = $(this).attr("data-type");

		xiuxiuModule.setMeituPhoto( img , type ,  function( data ){

			$("#ittwrap .curchange").find('img').attr("src" , data.img_original);
			$("#img-img").attr("src" , data.img_original );

			imagesModule.addOneImages( data.img_original , data.id );

			recordModule.addRecord();
		});

		xiuxiuModule.show( type );

	});

	$("#img-proportion").on('click', function(event) {
		var p = $(this).prop("checked"),
		    _curch = $("#ittwrap .curchange");

		if(_curch.children('.animate-contain').hasClass('shape-div')){
			autoTip("图片使用了形状裁剪之后，形状固定无效！");
			$(this).prop("checked" , false);
			return ;
		}

		if( p ){
			_curch.attr("isproportion", "true");
			setImgPostion();
		}else{
			_curch.attr("isproportion", "false");
			_curch.find("img").css({
				"width": '100%',
				"height": '100%',
				"margin-top":"",
				"margin-left":""
			});
			_curch.removeClass('autoheight');
		}

	});
	$('#img-dynamic').on('click', function(){
		var p = $(this).prop('checked'),
			_curch = $('#ittwrap .curchange');

		if(p){
			_curch.attr('dynamic', 1);
		}else{
			_curch.removeAttr('dynamic');
		}
	});

	/*
	 *  图片修改 end
	 *****/

	/*****
	 *  背景修改
	 */

	//背景图片修改
	$("#bg-change").on('click', function(event) {

		var _page = $("#ittwrap").children('.page'),
			_bgAnimate = _page.children('.background-animate'),
			oldstyle = _page.attr("style"),
			bgimg = $("#bg-img"),
			oldstyle2 = bgimg.attr("style"),
			oldimg = bgimg.attr("src");
			// pageLiImg =  $("#page-list").children('.active').find('.page-li-img');

		// $("#images-color").spectrum("set", bgimg.css("background-color"));
		
		imagesModule.show(function( img ){
			if(_bgAnimate.length > 0){
				_bgAnimate.find('img').attr("src", img);
			}else{
				_page.css({
					"background":'url('+ img +') no-repeat',
					"background-size" :'100% 100%',
					"background-position":"",
				});
			}
			bgimg.attr("src" , img).removeAttr('style');
			// pageLiImg.attr("src" , img).removeAttr('style');
			pageModule.savePage();

		} , function(){
			if(_bgAnimate.length > 0){
				_bgAnimate.find('img').attr("src", oldimg);
			}else{
				_page.attr("style" , oldstyle);
			}
			bgimg.attr({
				"src" : oldimg ,
				"style" : oldstyle2
			});
			// pageLiImg.attr({
			// 	"src" : oldimg ,
			// 	"style" : oldstyle2
			// });
		} ,  330 / 520 , false , function( cl ){
			_page.css({
				"background": cl,
				"background-size" :'100% 100%',
				"background-position":"",
			});
			bgimg.attr("src",cdnUrl + '/static/pc/invitation/img/kong.png' ).css("background-color",cl);
			// pageLiImg.attr("src",'').css("background",cl);
			pageModule.savePage();

			if( _bgAnimate.length > 0){
				_bgAnimate.remove();
				_page.removeClass( "background-scale").removeAttr("animatename");
			}
		});

	});

	$("#change-bg").on('click', '.bg-crop', function(event) {

		cropModule.ratio = 330 / 520;

		var bgimg = $("#bg-img"),
			imgsrc = bgimg.attr("src");
			// pageLiImg =  $("#page-list").children('.active').find('.page-li-img');

		if(!imgsrc || /kong\.png/.test(imgsrc) ){
			autoTip("背景不是图片，不能裁剪！");
			return;
		}

		cropModule.show( imgsrc , function(img){
			$("#ittwrap > .page").css({
				"background":'url('+ img +') no-repeat',
				"background-size" :'100% 100%',
				"background-position":"",
			});
			bgimg.attr("src" , img).removeAttr('style');
			// pageLiImg.attr("src",img );
		} , function(){

		});

	}).on('click', '.bg-meitu', function(event) {

		var img = $("#bg-img").attr("src"),
			type = $(this).attr("data-type"),
			_page = $("#ittwrap").children('.page'),
			_bgAnimate = _page.children('.background-animate');
			// pageLiImg =  $("#page-list").children('.active').find('.page-li-img');

		xiuxiuModule.setMeituPhoto( img , type ,  function( data ){
			if(_bgAnimate.length > 0){
				_bgAnimate.find('img').attr("src", data.img_original);
			}else{
				_page.css({
					"background":'url('+ data.img_original +') no-repeat',
					"background-size" :'100% 100%',
					"background-position":"",
				});
			}
			$("#bg-img").attr("src" , data.img_original).removeAttr('style');
			// pageLiImg.attr("src" , data.img_original).removeAttr('style');

			imagesModule.addOneImages( data.img_original , data.id );
		});

		xiuxiuModule.show( type );

	}).on('click', '.bg-save', function(event) {
		bgAnimateSave();

		var _bgAnimate = $("#ittwrap").find(".background-animate");
		_bgAnimate.removeClass(_bgAnimate.attr("animatename"));
		setTimeout(function() {
			_bgAnimate.addClass(_bgAnimate.attr("animatename"));
		}, 50);

		autoTip("保存成功！");
	});

	function bgAnimateSave(){
		var _bgAnimate = $("#ittwrap").find(".background-animate");

		if (_bgAnimate.length > 0) {
			var duration = $('#control-bgdu-i').val(),
				delay = $('#control-bgde-i').val(),
				data = {
					duration:duration+'s',
					delay:delay+'s',
					iteration:'1',
				};

			_bgAnimate.attr('data-animation-style', JSON.stringify(data)).css({
				'animation-duration': duration + 's',
				'-webkit-animation-duration': duration + 's',
				'animation-delay': delay + 's',
				'-webkit-animation-delay': delay + 's',
			});

		}
	}

	// 背景动画开始时间
	initSlider($("#control-bgde") , $("#control-bgde-i") ,{
		value : 0.2 ,
		max : 20,
		min : 0,
		step : 0.1,
		slide : function(){

		},
		stop : function(){
			bgAnimateSave();
		}
	});
	// 背景动画持续时间
	initSlider($("#control-bgdu") , $("#control-bgdu-i") ,{
		value : 2 ,
		max : 20,
		min : 0,
		step : 0.1,
		slide : function(){
			
		},
		stop : function(){
			bgAnimateSave();
		}
	});

	//背景动画类型
	$("#bg-animate").on('click', 'span', function(event) {

		var _this    = $(this),
			value    = _this.attr('data-value'),
			_section = $('#ittwrap').children('section'),
			_bg      = _section.css('background-image'),
			_bgAnimate = _section.find('.background-animate');

		_this.addClass('active').siblings().removeClass('active');

		_bg = $("#bg-img").attr("src");

		var _img = '<div class="background-animate scaleInCenterSlow" animatename="scaleInCenterSlow"'
				+' style="position: absolute; left: 0%; top: 0%; width: 101%;  display:block; opacity: 1; height: 100%;z-index:-1; -webkit-animation-duration: 5s; -webkit-animation-delay: 0.2s; -webkit-animation-iteration-count: 1;"'
				+' data-animation-style="{&quot;duration&quot;:&quot;5s&quot;,&quot;delay&quot;:&quot;0.2s&quot;,&quot;iteration-count&quot;:&quot;1&quot;}"><div class="animate-contain"><img src="'
				+ _bg +'" alt="" style="width: 100%; height: 100%;"></div></div>';
		_img = $(_img);

		_section.find('.background-animate').remove();
		if(value == "none"){
			_section.removeClass('background-scale').removeAttr('animatename');
			if(_bgAnimate.length > 0){
				_section.css({
					"background":'url('+ _bg +') no-repeat',
					"background-size" :'100% 100%',
					"background-position":"",
				});
			}
			$("#bg-anitime-wrap").addClass('hide');
			return ;
		}else if(value=='scaleInCenterSlow'){
			_section.append(_img).css("background","none").addClass('background-scale').attr('animatename','scaleInCenterSlow');
		}else if(value=='scaleOutCenterSlow'){
			_img.removeClass('scaleInCenterSlow').addClass('scaleOutCenterSlow').attr('animatename','scaleOutCenterSlow');
			_section.append(_img).css("background","none").addClass('background-scale');
		}
		$("#bg-anitime-wrap").removeClass('hide');

		var duration = $('#control-bgdu-i').val(),
			delay = $('#control-bgde-i').val(),
			data = {
				duration:duration+'s',
				delay:delay+'s',
				iteration:'1',
			};

		_img.attr('data-animation-style',JSON.stringify(data)).css({
			'animation-duration':duration+'s',
			'-webkit-animation-duration':duration+'s',
			'animation-delay':delay+'s',
			'-webkit-animation-delay':delay+'s',
		});

	});



	/*
	 *  背景修改 end
	 *****/

	/*****
	 *  按钮修改
	 */
	//按钮图标颜色
	$("#btn-svg-color").colorPlugin("#fff" , function(color){
		var cl = '#fff';
		if(color){
			cl = color.toRgbString();
		}
		var label = $("#ittwrap .curchange .animate-contain label");

		label.css("color" , cl);
	});

	$("#btn-text-input").on('input', function(event) {
		var _this = $(this),
			_label,
			_ani = $("#ittwrap .curchange").children('.animate-contain');

		if(_ani.children('label').length){
			_label = _ani.children('label').clone();
		}
		_ani.text(_this.val());
		if(_label){
			_ani.prepend(_label);
		}
	});

	$("#change-btn").on('click', '.normal-btn > button', function(event) {
		var _curch = $("#ittwrap .curchange");
		
		if (_curch.hasClass('circle')) {
			_curch.removeClass('circle').css("height", "");

			var _h = _curch.height();
			$("#control-h").slider("value", _h);
			$("#control-l-i").val(_h);
		}
		_curch.children('.animate-contain').css('border-radius', '');

		var _class = $(this).attr('class');
		_curch.removeClass(_curch.attr("btnclass")).addClass(_class).attr("btnclass", _class);
		if (_class == "sectbtn btncss2") {
			var _height = _curch.width();

			$("#control-h").slider("value", _height);
			$("#control-l-i").val(_height);

			_curch.css("height", _height + "px").addClass('circle');
		}

	}).on('click', '.btn-save', function(event) {
		
		autoTip("保存成功！");

	}).on('click', '.btn-svg-wrap > span', function(event) {
		var _this  = $(this),
			_curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain');
		
		_this.addClass('active').siblings().removeClass('active');

		if(_this.hasClass('svg-none')){
			_ani.children('label').remove();
		}else if(_ani.children('label').length && _ani.children('label').hasClass('btn-svg')){
			_ani.children('label').html( _this.html() );
		}else{
			_ani.children('label').remove();
			_ani.prepend('<label class="btn-svg">' + _this.html() + '</label> ');
		}
	});

	// 解决按钮图标svg不显示问题
	svg4everybody();

	/*
	 *  按钮修改 end
	 *****/

	/*****
	 *  文字修改
	 */

	$("#text-e-btn").on('click', function(event) {
		// textEffectModule.show();
		var _curch = $("#ittwrap .curchange");

		if(_curch.hasClass('textanimate')){
			textEffectModule.show();
		}else{
			confirmTip({
				text : '使用文字特效，特殊字体与字体样式将会失效，是否继续使用？',
				ConfirmFunction: function(){
					textEffectModule.show();
				}
			});
		}
	});
	var getyouzikuThrottle = throttle(function(){
		fontModule.getyouzikuFont();
	} , 3500);

	var textNewrich = $("#text-e-space").richTextEdit({
		id : 'text-e-e',
		input : function(event , html){
			var _curch = $("#ittwrap .curchange"),
			    _ani = _curch.children('.animate-contain');

			_curch.css("height" , '');
			if(_curch.hasClass('artfont')){
				if( html.replace(/\"/g, "'") != _ani.attr("artfont")){
					_ani.html(html).removeAttr('artfonttype').attr("artfont" , html.replace(/\"/g, "'"));
				}
			}else if(_curch.hasClass('textanimate')){
				_ani.attr("textcontent", html ).html(html);
			}else{
				_ani.html(html);
			}
		},
		keyup : function(event , html){
			var keyCode = event.keyCode || event.which;

			if(keyCode == 13 || keyCode == 32){
				// fontModule.getyouzikuFont();
				getyouzikuThrottle();
			}
		}
	});
	window.textNewrich = textNewrich;


	// 字体
	fontModule.getPCFont();

	var isfontenter = false;
	$("#font-select").on('click', function(event) {
		event.preventDefault();
		// $("#pcfont-list").slideToggle("fast");
		var _curch = $("#ittwrap .curchange");

		if(_curch.hasClass('textanimate') && !$("#pcfont-list").is(":visible")){
			confirmTip({
				text : "使用特殊字体，文字特效将会失效，是否继续使用？",
				ConfirmFunction : function(){
					$("#pcfont-list").slideDown("fast");
					$("#fontvalue").focus();
				},
				CancelFunction : function(){
				}
			});
		}else{
			$("#pcfont-list").slideToggle("fast");
		}
	}).on("click" ,'#pcfont-list > li' , function(event) {
		var _curch = $("#ittwrap .curchange"),
			_this = $(this);
		var _ani = _curch.find('.animate-contain'),
			_val = _this.attr("data-value"),
			_text = _this.children('span').text();

		if(_this.hasClass('disabled')){
			return;
		}
		if(_curch.hasClass('textanimate') && _val != "无"){
			_func();
			// confirmTip({
			// 	text : "更换特殊字体，文字特效将会失效，是否继续使用？",
			// 	ConfirmFunction : function(){
			// 		_func();
			// 	},
			// 	CancelFunction : function(){
			// 		$("#pcfont-list").slideUp("fast");
			// 	}
			// });
		}else if(_curch.hasClass('textanimate') && _val == "无"){
			$("#pcfont-list").slideUp("fast");
		}else{
			_func();
		}
		function _func(){
			if(_ani.find('img').length > 0){
				_ani.html(_ani.attr("artfont"));
			}else if(_curch.hasClass('textanimate')){
				_ani.html(_ani.attr("textcontent"));
			}
			if(_val == "无"){
				_curch.removeClass('artfont');
				_ani.css("font-family" , '').removeAttr('artfont artfonttext artfonttype');
				// $("#text-radio1").prop('checked', false);
			}else{
				_curch.addClass('artfont');
				_ani.css("font-family" , '"'+_val+'"').attr({
					'artfonttext': _val ,
					"artfont" : _ani.html().replace(/\"/g, "'"),
				}).removeAttr('artfonttype textcontent');
				_ani.find('*').css("font-family" , '');
				$('#text-e-e').find('*').css("font-family" , '');
				// $("#text-radio1").prop('checked', true);
			}
			_curch.removeClass('textanimate').removeAttr('textanimate textduration textdelay');
			$("#fontvalue").val(_text).attr("data-value", _val).removeAttr('AccessKey');

			if(_this.hasClass('weiyefont') ){
				$("#fontvalue").attr("AccessKey", _this.attr('AccessKey'));
				fontModule.getyouzikuFont();
			}else if(_val != "无"){
				fontModule.getFontImg(_curch);
			}
			$("#pcfont-list").slideUp("fast");
		}
		event.stopPropagation();
	}).on('mouseenter', '#pcfont-list', function(event) {
		isfontenter = true;
	}).on('mouseleave', '#pcfont-list', function(event) {
		isfontenter = false;
	}).on('blur', '#fontvalue', function(event) {
		if(! isfontenter){
			$("#pcfont-list").slideUp("fast");
		}
	});

	$("#change-text").on('click', '.text-save', function(event) {
		var _curch = $('#ittwrap .curchange'),
			_ani = _curch.children('.animate-contain');

		if($("#fontvalue").attr("data-value") == '无'){
			_ani.css("font-family" , '');
			autoTip("字体保存成功！");
			return ;
		}
		var _html = textNewrich.getContent();
		
		if(_ani.find('img').length > 0){
			_ani.html(_html);
		}else if(_curch.hasClass('textanimate')){
			_ani.html(_html);
		}
		fontModule.getFontImg(_curch, function() {
			autoTip("字体保存成功！");
			_ani.attr({
				"artfont": _html.replace(/\"/g, "'"),
				'artfonttext': $("#fontvalue").attr('data-value')
			}).removeAttr('textcontent');

			_curch.addClass('artfont').removeClass('textanimate').removeAttr('textanimate textduration textdelay');
		});
	});

	/*
	 *  文字修改 end
	 *****/

	/*****
	 *  弹窗修改
	 */

	$("#pop-text-input").on('input', function(event) {
		var _this = $(this),
			_ani = $("#ittwrap .curchange").children('.animate-contain');

		_ani.text( _this.val() );
	});

	$("#change-pop").on('click', '.normal-btn > button', function(event) {
		var _curch = $("#ittwrap .curchange");
		
		if (_curch.hasClass('circle')) {
			_curch.removeClass('circle').css("height", "");

			var _h = _curch.height();
			$("#control-h").slider("value", _h);
			$("#control-l-i").val(_h);
		}
		_curch.children('.animate-contain').css('border-radius', '');

		var _class = $(this).attr('class');
		_curch.removeClass(_curch.attr("btnclass")).addClass(_class).attr("btnclass", _class);
		if (_class == "sectbtn btncss2") {
			var _height = _curch.width();

			$("#control-h").slider("value", _height);
			$("#control-l-i").val(_height);

			_curch.css("height", _height + "px").addClass('circle');
		}

	}).on('click', '.pop-save', function(event) {

		$("#pop-preview").removeClass('show');
		$("#pop-edit-space").removeClass('show');

		autoTip("保存成功！");

	}).on('click', '.pop-edit-btn', function(event) {
		
		var _curch = $("#ittwrap .curchange"),
			_img = _curch.attr("data-pop-img") ? '<img src="'+ _curch.attr("data-pop-img") +'" alt="" />' : '',
			_html = _curch.attr("data-pop-text") || _img || '';

		$("#pop-preview .pop_content").html( _html );
		$("#pop-preview").addClass('show');
		$("#pop-edit-space").addClass('show');
		_curch.attr("data-pop-type" , 1);

		popNewrich.setContent(_html);
		popNewrich.edit.focus();
	});
	$("#close_pop").on('click', function(event) {
		
		$("#change-pop").children('.pop-save').trigger('click');
	});
	
	var popNewrich = $("#pop-e-space").richTextEdit({
		id : 'pop-e-e',
		toolbars : ['fontSize' , 'line' , 'bold' , 'italic' , 'underline' , 'line' , 'color' , 'backgroundColor' , 'line' , 'justify' , 'lineHeight' , 'letterSpacing' , 'insertImage', 'removeFormat'],
		input : function(event , html){
			var _curch = $("#ittwrap .curchange"),
			    _ani = _curch.children('.animate-contain');

			_curch.attr({
				'data-pop-text': html
			});
			$("#pop-preview .pop_content").html( html );
		}
	});
	window.popNewrich = popNewrich;

	/*
	 *  弹窗修改 end
	 *****/

	/*****
	 *  弹幕修改
	 */
	spinnerInput($("#barrage-count") , {
		min: 1 ,
		max: 8 ,
		step: 1 ,
		spin: function( ui ) {
			// var val = parseInt(ui.value) || 1;

			// $(this).val( val );
		},
		stop: function(ui) {
			var val = parseInt(ui.value) || 1;

			if(val <= 0 || val > 8){
				val = 3;
				autoTip('弹幕行数需要在1-8行之间。');
			}

			$(this).val( val );
		}
	});

	$("#barrage-text").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    val = $(this).val();

		_curch.find('.barrage-input').attr('placeholder', val);
	});

	$("#change-barrage").on('click', '.barrage-save', function(event) {
		var danmuCount = $('#barrage-count').val(),
			_curch = $("#ittwrap .curchange");
			curBarrage = _curch.find('.barrage-container');

		_curch.css("height" , parseInt(danmuCount) * 50 + 40);

		danmuInstance = curBarrage.data('danmuInstance');
		danmuInstance && danmuInstance.destroy();
		danmuInstance = curBarrage.danmu($.extend({}, danmupara, {	rowcount:danmuCount,
																	color : curBarrage.attr("data-style") == "barrage-text" ? 'random' : ''
																}));
		danmuInstance.start();
		curBarrage.data('danmuInstance', danmuInstance).attr('data-count', danmuCount);

		autoTip("弹幕保存成功");

	});

	$("#barrage-style").on('click', 'span', function(event) {
		var _this = $(this),
			_curch = $("#ittwrap .curchange");

		_this.addClass('active').siblings().removeClass('active');
		_curch.find('.barrage-container').attr("data-style" , _this.attr("data-style"));
	});

	$("#barrage-name").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    val = $(this).val();

		_curch.attr('el_name', val);
	});

	/*
	 *  弹幕修改 end
	 *****/

	/*****
	 *  地图修改
	 */
	var mapThrottle = throttle(function(keyword , el){
		var city = mapModule.city || '深圳';

		$.ajax({
			url: '/index.php?r=Map/suggestion',
			type: 'get',
			dataType: 'json',
			data: {
				keyword : keyword ,
				region : city
			},
			success: function(data){
				if(data.status == 0){
					var _li = '';
					$.each(data.data ,function(index, el) {
						_li += '<li data-lat="'+el.location.lat+'" data-lng="'+el.location.lng+'"><p class="map-title">'+el.title+'</p><p class="map-address">'+el.address+'</p></li>';
					});
					$("#map-search-ul").html(_li).show();
				}else{
					autoTip(data.data);
				}
				el.removeClass('loading');
			},
			error: function(){
				el.removeClass('loading');
			}
		});
	}, 1500 );

	// 同步地图地址输入框与手机展示的文字
	$("#map-input").on('input', function(event) {
		var _this = $(this),
			_val = _this.val();
			_curch = $("#ittwrap .curchange");
		_curch.children('.animate-contain').children('p').eq(1).text( _val );
		_curch.attr('address', _val );

		if(! _val){
			$("#map-search-ul").html('').hide();
			return;
		}
		if(_this.hasClass('loading')){
			// return ;
		}
		_this.addClass('loading');

		mapThrottle(_val , _this);
	});
	$("#map-search-ul").on('click', 'li', function(event) {
		var _this = $(this),
			address_lng = _this.attr("data-lng"),
			address_lat = _this.attr("data-lat");

		mapModule.showGeocoder(address_lat, address_lng, function(result) {
			mapModule.map.zoomTo(13);
			var _address = result.detail.address;
			$('#map-input').val(_address);

			$("#ittwrap .curchange").attr({
				"lng": address_lng,
				"lat": address_lat,
				'address': _address
			}).children('.animate-contain').children('p').eq(1).text(_address);

			$("#map-search-ul").hide();
		});
	});
	$("#change-map").on('click', '.map-save', function(event) {
		var _curch = $("#ittwrap .curchange"),
		_id = _curch.find('.map-wrap').attr("id");

		if (_id) {
			mapModule.clearOverlays(_id);

			var lat = _curch.attr("lat"),
				lng = _curch.attr("lng"),
				latLng = new qq.maps.LatLng(lat, lng);
			mapModule[_id].qqMapMarker = new qq.maps.Marker({
				map: mapModule[_id].map,
				position: latLng
			});
			mapModule[_id].map.panTo(latLng);
			mapModule[_id].map.zoomTo(mapModule.map.zoom);

			_curch.attr("mapzoom", mapModule.map.zoom);
		}

		autoTip('保存成功');
	}).on('click', '#map-showmap', function(event) {
		var _this = $(this),
			_curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain');
		
		if(_this.prop('checked')){
			_curch.css({
				height : '245px'
			});
			var _id = 'map' + utilities.uniqueNum() ;
			_ani.prepend('<div id="'+_id+'" class="map-wrap"></div><div class="map-wrap-mask"></div>');

			_curch.attr("mapzoom" , mapModule.map.zoom || 13 );
			mapModule.initmap(_id);
		}else{
			_curch.css({
				height : ''
			});
			_ani.children('.map-wrap').remove();
			_ani.children('.map-wrap-mask').remove();
		}
	});

	/*
	 *  地图修改 end
	 *****/

	/*****
	 *  点赞修改
	 */
	//点赞前颜色
	$("#like-color-be").colorPlugin("#9c9c9c" , function(color){
		var _span = $("#ittwrap .curchange").children('.animate-contain').children('span'),
			_color = '#9c9c9c';
		if(color){
			_color = color.toRgbString();
		}
		_span.css({"color": _color }).attr("data-color-be" , _color);
	});
	//点赞后颜色
	$("#like-color-af").colorPlugin("#ff0000" , function(color){
		var _span = $("#ittwrap .curchange").children('.animate-contain').children('span'),
			_color = '#ff0000';
		if(color){
			_color = color.toRgbString();
		}

		_span.css({"color": _color }).attr("data-color-af" , _color);
	}, function(color){
		var _span = $("#ittwrap .curchange").children('.animate-contain').children('span');

		_span.css({"color": $("#like-color-be").spectrum('get').toRgbString() });
	});

	$("#change-like").on('click', '#like-style > span', function(event) {
	//点赞修改样式	
		$(this).addClass('active').siblings().removeClass('active');
		var _curch = $("#ittwrap .curchange"),
			_ani = _curch.children('.animate-contain');

		_ani.children('span').addClass('like-svg').html( $(this).html() );

	}).on( 'input' , "#like-name", function(event) {
	//点赞输入框
		var _curch = $('#ittwrap .curchange'),
			_index = $('#ittwrap .cast-like').index(_curch),
			_val = $(this).val();

		_curch.attr("el_name", _val);

	}).on('click', '#like-layout > span', function(event) {
	//点赞修改布局	
		$(this).addClass('active').siblings().removeClass('active');

		var _curch = $("#ittwrap .curchange"),
			_datastyle = $(this).attr("data-style");

		_curch.attr('data-style' , _datastyle );

		if(_datastyle == 'like-ud'){
			_curch.css({
				width : '60px',
				height : '65px'
			});
		}else if(_datastyle == 'like-lr'){
			_curch.css({
				width : '80px',
				height : '30px'
			});
		}


	}).on('click', '.like-save', function(event) {
	//点赞保存
		autoTip("保存成功！");
	});

	/*
	 *  点赞修改 end
	 *****/

	/*****
	 *  投票修改
	 */
	//可选投票数
	spinnerInput($("#vote-count") , {
		min: 1 ,
		max: 10 ,
		step: 1 ,
		spin: function( ui ) {
			var _h = $("#ittwrap .curchange").find('h2'),
				val = parseInt(ui.value) || 1;

			$(this).val(val);
			if( val == 1){
				_h.children('small').text('(单选)');
			}else{
				_h.children('small').text('(可选'+ val + '项)');
			}
			_h.attr("num", val );
		},
		stop: function(ui) {
			
		}
	});
	

	$("#vote-name").on('input', function(event) {

		$("#ittwrap .curchange h2 span").text($(this).val());

	});
	$("#vote-btn-name").on('input', function(event) {

		var _curch = $("#ittwrap .curchange");
		_curch.children('.animate-contain').children('button').text($(this).val());

	});
	$("#vote-style").on('click', 'span', function(event) {
		var _this = $(this),
			_curch = $("#ittwrap .curchange");

		_this.addClass('active').siblings().removeClass('active');
		_curch.attr("data-style" , _this.attr("data-style"));

	});
	$("#vote-ul").on('input', 'input', function(event) {
		var _this = $(this),
		    val = _this.val(),
		    index = _this.parent().index(),
		    _curch = $("#ittwrap .curchange");

        _curch.find('ul').children('li').eq(index).find('span').eq(0).text( val );
	}).on('click', '.vote-delete', function(event) {
		var _this = $(this),
		    index = _this.parent().index(),
		    _curch = $("#ittwrap .curchange");

        _curch.find('ul').children('li').eq(index).remove();
        _this.parent().remove();
	});

	$("#change-vote").on('click', '.vote-save', function(event) {

		autoTip("保存成功！");

	}).on('click', '.vote-add', function(event) {
		var l = $("#vote-ul").children('li').length,
			_ul = $("#ittwrap .curchange").find('ul');

		if(l >= 10){
			autoTip("最多只能有10个选项！");
			return ;
		}
		$("#vote-ul").append('<li class="opt-li"><label class="st-l4">选项'+(l+1)+'</label><input class="com-input" type="text" value="选项'+(l+1)+'">'
			+'<span class="vote-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>');
		_ul.append('<li><p><span class="vote-opt">选项'+(l+1)+'</span><span class="vote-count"><small></small><small></small></span><b></b></p><p><span></span></p></li>');
	});

	/*
	 *  投票修改 end
	 *****/

	/*****
	 *  图集修改
	 */
	// 图集自动播放时间
	initSlider($("#imgplay-time") , $("#imgplay-time-i") ,{ 
		min: 1, 
		max: 10,
		value : 4 ,
		stop : function(){
			imgplayModule.imgplaySave();
		}
	});

	var isImgPlaySort = false;
	$("#imgplay-list").sortable({
		// axis: "y",
		// containment: "parent",
		cursor: "move",
		revert: true,
		items: " > .imgplay-item",
		placeholder:'imgplay-kong',
		delay: 100,
		activate: function(event, ui) {
			isImgPlaySort = true;
		},
		stop : function(){
			isImgPlaySort = false;
		},
		update: function( event, ui ) {
			imgplayModule.imgplaySave();
		}
	});

	//图集图片修改
	$("#imgplay-list").on('click', '.imgplay-item', function(event) {
		if(isImgPlaySort){
			return ;
		}

		var _this = $(this),
			oldimg = _this.children('img').attr("src"),
			_curch = $("#ittwrap .curchange"),
			rat = _curch.width() / _curch.height();

		imagesModule.show(function( img ){
			_this.children('img').attr("src" , img);

			imgplayModule.imgplaySave();
		} , function(){

			_this.children('img').attr("src" , oldimg);

		} , rat , false);
	}).on('click', '.imgplay-add', function(event) {
		var _li = $('<li class="imgplay-item"><img src="" alt=""><div class="imgplay-opt"><span class="imgplay-link iconfont icon-link2"></span><span class="imgplay-delete iconfont icon-trash"></span></div></li>');
		$("#imgplay-list").append( _li );

		var _curch = $("#ittwrap .curchange"),
			rat = _curch.width() / _curch.height();

		imagesModule.show(function( img ){
			_li.children('img').attr("src" , img);

			imgplayModule.imgplaySave();
		} , function(){

			_li.remove();

			imgplayModule.imgplaySave();

		} , rat , false);

	}).on('click', '.imgplay-delete', function(event) {
		event.stopPropagation();
		var _li = $(this).closest('li');

		if($("#imgplay-list").children('.imgplay-item').length <= 1){
			autoTip("轮播图集图片最少为一张！");
			return ;
		}
		_li.remove();

		imgplayModule.imgplaySave();


	}).on('click', '.imgplay-link', function(event) {
		event.stopPropagation();
		var _li = $(this).closest('li');

		promptTip({
			text: '请输入网址：',
			value : _li.attr("data-link"),
			ConfirmFunction : function(val){
				val = val.trim();
				if(val){
					if(! /^http/.test(val)){
						val = 'http://' + val;
					}
					_li.attr('data-link' , val);
				}else{
					_li.removeAttr('data-link');
				}

				imgplayModule.imgplayLinkSave();
			}
		});
	});

	$("#change-imgplay").on('click', '.imgplay-save', function(event) {
		
		imgplayModule.imgplaySave();

		autoTip("保存成功！");

	}).on('click', '#imgplay-auto', function(event) {

		imgplayModule.imgplaySave();

		if($(this).prop('checked')){
			$("#imgplay-time-wrap").removeClass('hide');
		}else{
			$("#imgplay-time-wrap").addClass('hide');
		}

	});

	$("#flux-type").on('change', function(event) {

		imgplayModule.imgplaySave();

	});

	/*
	 *  图集修改 end
	 *****/

	/*****
	 *  表单输入框
	 */
	$("#input-type").on('click', 'input', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_type = $(this).attr("data-type");

		if(_type == 'single'){
			_curch.find('textarea').replaceWith('<input type="text" disabled="disabled">');
		}else{
			_curch.find('input').replaceWith('<textarea disabled="disabled"></textarea>');
		}
	});
	$("#input-t").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.find('.input-edit').text(_val);
	});

	// 提示颜色
	$("#input-t-color").colorPlugin( '#000' , function(color){
		var cl = '#000';
		if(color){
			cl = color.toRgbString();
		}
		var el = $("#ittwrap .curchange").find("h2");

		el.css("color" , cl);
	});

	//输入颜色
	$("#input-i-color").colorPlugin( '#000' , function(color){
		var cl = '#000';
		if(color){
			cl = color.toRgbString();
		}
		var el = $("#ittwrap .curchange").find("input");

		el.css("color" , cl);
	});

	/*
	 *  表单输入框 end
	 *****/

	//表单是否可以重复提交
	$("input.form-necessary").on('click', function(event) {
		var _curch = $("#ittwrap .curchange");

		if($(this).prop("checked")){
			_curch.find('.form-ele-content-wrap').addClass('form-necessary-item');
		}else{
			_curch.find('.form-ele-content-wrap').removeClass('form-necessary-item');
		}
	});

	/*****
	 *  表单单选
	 */
	$("#radio-title").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.find('h2 > .radio-edit').text(_val);
	});
	$("#radio-ul").on('input', 'input', function(event) {
		var _curch = $("#ittwrap .curchange"),
			index = $(this).parent().index(),
		    _val = $(this).val();

        _curch.find('.form-option').eq(index).children('.radio-edit').text(_val);
	}).on('click', '.radio-delete', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_li = $(this).parent(),
			index = _li.index();

		_curch.find('.form-option').eq(index).remove();
		_li.remove();
	});

	$("#change-radio").on('click', '.radio-add', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_lilen = $("#radio-ul").children('li').length;

		if(_lilen >= 10){
			autoTip("最多只能有10个选项！");
			return;
		}

		$("#radio-ul").append('<li class="opt-li"><label class="st-l4">选项'+(_lilen + 1)
			+'</label><input class="com-input" type="text" value="选项'+(_lilen + 1)+'"><span class="radio-delete opt-delete">'
			+'<b class="iconfont icon-delete"></b></span></li>');

		var w = _curch.find('.added-opt-container'),
			radio_name = w.find('input').attr('name');
		w.append('<li class="added-option form-option"><input name="'+radio_name
				 + '" type="radio"><img class="radio-before-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuang.svg">'
				 + '<img class="radio-after-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-danxuankuangyixuan.svg"><label class="radio-edit"'
				 + '>选项'+(_lilen + 1)+'</label></li>')

	});

	/*
	 *  表单单选 end
	 *****/

	/*****
	 *  表单多选
	 */
	//可选选项数
	spinnerInput($("#checkbox-count") , {
		min: 2 ,
		max: 10 ,
		step: 1 ,
		spin: function( ui ) {
			var _h = $("#ittwrap .curchange").find('h2'),
				val = parseInt(ui.value) || 1;

			$(this).val( val );
			_h.children('small').attr('data-num', val).children('b').text(val);
		},
		stop: function(ui) {
			
		}
	});

	$("#checkbox-title").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.find('h2 > .checkbox-edit').text(_val);
	});

	$("#checkbox-ul").on('input', 'input', function(event) {
		var _curch = $("#ittwrap .curchange"),
			index = $(this).parent().index(),
		    _val = $(this).val();

        _curch.find('.form-option').eq(index).children('.checkbox-edit').text(_val);
	}).on('click', '.checkbox-delete', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_li = $(this).parent(),
			index = _li.index();

		_curch.find('.form-option').eq(index).remove();
		_li.remove();
	});

	$("#change-checkbox").on('click', '.checkbox-add', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_lilen = $("#checkbox-ul").children('li').length;

		if(_lilen >= 10){
			autoTip("最多只能有10个选项！");
			return;
		}

		$("#checkbox-ul").append('<li class="opt-li"><label class="st-l4">选项'+(_lilen + 1)
			+'</label><input class="com-input" type="text" value="选项'+(_lilen + 1)+'"><span class="checkbox-delete opt-delete">'
			+'<b class="iconfont icon-delete"></b></span></li>');

		var w = _curch.find('.added-opt-container');
		w.append('<li class="added-option form-option"><input type="checkbox">'
				 + '<img class="checkbox-before-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuang.svg">'
				 + '<img class="checkbox-after-select" src="'+cdnUrl+'/static/pc/invitation/images/iconfont-duoxuankuangyixuan.svg"><label class="checkbox-edit"'
				 + '>选项'+(_lilen + 1)+'</label></li>')

	});


	/*
	 *  表单多选 end
	 *****/

	/*****
	 *  表单下拉框
	 */
	$("#select-title").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.find('.ittwrap-form-item-title').text(_val);
	});
	$("#select-ul").on('input', 'input', function(event) {
		var _curch = $("#ittwrap .curchange"),
			index = $(this).parent().index(),
		    _val = $(this).val();

        _curch.find('.form-option').eq(index).text(_val);
	}).on('click', '.select-delete', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_li = $(this).parent(),
			index = _li.index();

		_curch.find('.form-option').eq(index).remove();
		_li.remove();
	});

	$("#change-select").on('click', '.select-add', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_lilen = $("#select-ul").children('li').length;

		if(_lilen >= 10){
			autoTip("最多只能有10个选项！");
			return;
		}

		$("#select-ul").append('<li class="opt-li"><label class="st-l4">选项'+(_lilen + 1)
			+'</label><input class="com-input" type="text" value="选项'+(_lilen + 1)+'"><span class="select-delete opt-delete">'
			+'<b class="iconfont icon-delete"></b></span></li>');

		var w = _curch.find('.added-opt-container');
		w.append('<option class="added-option form-option select-edit">选项'+(_lilen + 1)+'</option>');

	});

	/*
	 *  表单下拉框 end
	 *****/

	/*****
	 *  表单图片上传
	 */
	$("#imgupload-title").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.find('.imgupload-edit').text(_val);
	});

	/*
	 *  表单图片上传 end
	 *****/

	/*****
	 *  表单提交按钮
	 */
	$("#submit-title").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.children('.animate-contain').text(_val);
	});
	$("#submit-t").on('input', function(event) {
		var _curch = $("#ittwrap .curchange"),
		    _val = $(this).val();

        _curch.attr('tip-text', _val);
	});
	$("#change-submit").on('click', '.form-submit', function(event) {
		var _curch = $("#ittwrap .curchange");

		if($(this).prop("checked")){
			_curch.attr('data-repeat', '1');
		}else{
			_curch.removeAttr('data-repeat');
		}
	}).on('click', '.submit-l', function(event) {
		$("#s-link-btn").trigger('click');
	});

	/*
	 *  表单提交按钮 end
	 *****/

	/*****
	 *  视频
	 */
	$("#video-code").on('blur' , function(event) {
		var _curch = $("#ittwrap .curchange"),
			_val = $(this).val();

		if(! _val){
			return ;
		}
		if(! /iframe/.test(_val)){
			autoTip("通用代码不对哦！");
			return;
		}
		_curch.find('.animate-contain').html(_val + '<div class="iframe-mask"></div><span class="video-close">关闭</span>');
		_curch.find('iframe').attr({
			'height': '100%',
			'width': '100%'
		}).css({
			'height': '',
			'width': ''
		});
	});

	$("#change-video").on('click', '.video-save', function(event) {
		var _val = $("#video-code").val();
		if(! _val){
			return ;
		}
		if (!/iframe/.test(_val)) {
			autoTip("通用代码不对哦！");
			return;
		}
		$("#video-code").trigger('blur');
		autoTip("视频保存成功");
	});

	/*
	 *  视频 end
	 *****/

	/*****
	 *  栏目
	 */

	$("#nav-ul").on('input', 'input', function(event) {
		var index = $(this).closest('li').index(),
			val = $(this).val(),
			_curch = $("#ittwrap .curchange");

		_curch.find('a').eq(index).children('span').text(val);

	}).on('click', '.n-li-div4', function(event) {
	//删除栏目项
		var _li = $(this).parent(),
			index = _li.index(),
			_curch = $("#ittwrap .curchange");

		_curch.find('a').eq(index).remove();
		_li.remove();

	}).on('click', '.n-li-div2 > span', function(event) {
	//修改图标

		var index = $(this).closest('li').index(),
			_img = $(this).children('img'),
			oldimg = _img.attr("src"),
			_curch = $("#ittwrap .curchange");

		imagesModule.show(function( img ){
			_curch.find('a').eq(index).children('img').attr("src" , img);
			_img.attr("src" , img);
		} , function(){
			_curch.find('a').eq(index).children('img').attr("src" , oldimg);
			_img.attr("src" , oldimg);
		} , 1 , false);

	}).on('click', '.n-li-div3', function(event) {
	//添加链接
		var index = $(this).closest('li').index();
		$('#ittwrap .nav.curchange').find('.nav-links').children('a').eq(index).addClass('current-nav-link').siblings().removeClass('current-nav-link');

		$("#s-link-btn").trigger('click');
	});

	$("#change-nav").on('click', '.nav-add', function(event) {
	//添加栏目
		var length = $("#nav-ul").children('li').length ,
			_curch = $("#ittwrap .curchange");

		if (length >= 5) {
			autoTip('最多只能添加5个导航');
			return ;
		};

		$('#nav-ul').append('<li><div class="n-li-div1"><input class="com-input" type="text" value="栏目'+(length+1)
			+'"></div><div class="n-li-div2"><span><img src="http://img.weiye.me/zcimgdir/album/file_555d8ea03f3b1.png" alt=""></span></div>'
			+'<div class="n-li-div3">添加链接</div><div class="n-li-div4"><span class="iconfont icon-delete"></span></div></li>');

		_curch.find('.nav-links').append('<a href="javascript:;"><img src="http://img.weiye.me/zcimgdir/album/file_555d8ea03f3b1.png" '
			+'class="before-tap-icon"><span>栏目'+(length+1)+'</span></a>');

	}).on('click', '.nav-save', function(event) {
	//栏目保存
		autoTip('保存成功！');
	});

	$("#nav-quan").on('click', function(event) {
	//是否全局固定
		var _curch = $("#ittwrap .curchange"),
			_this = $(this);
		if($(this).prop('checked')){
			if( fix_nav_num　> 0 ) {
				_this.prop('checked' , false);
				autoTip('每个微页只能有一个全局固定的栏目');
				return;
			}

			_curch.attr('data-role', 'tab');
			fix_nav_num++;
		}else{
			_curch.removeAttr('data-role');
			fix_nav_num--;
		}
	});

	/*
	 *  栏目 end
	 *****/

	/*****
	 *  侧边栏
	 */
	$("#aside-add").on('click', '.aside-b', function(event) {
		var _type = $(this).attr("type"),
			_ph = 'http://',
			_text = $(this).children('span').text();

		if( $("#aside-opt-li").children().length >= 5){
			autoTip("不能在添加了！");
			return ;
		}

		if( _type == 'aside-atten' ){
			_ph=13523423443;
		}

		var s_li = '<li class="opt-li"><input class="aside-text com-input" type="text" value="' + _text
					+'"><input class="aside-href com-input" type="text" placeholder='+_ph+' value="'
					+'"><span class="aside-li-delete opt-delete"><b class="iconfont icon-delete"></b></span></li>';
		var p_li = '<li><p class='+_type+'></p><a href="">'+_text+'</a></li>';

		$("#aside-opt-li").append(s_li);
		$("#aside-ul").children('li').last().before(p_li);
	});

	$("#aside-opt-li").on('input', '.aside-text', function(event) {
		var _this = $(this),
		    val = _this.val(),
		    index = _this.parent().index();

		$("#aside-ul").children('li').eq(index).children('a').text( val );

	}).on('blur', '.aside-href', function(event) {
		var _this = $(this),
		    val = _this.val(),
		    index = _this.parent().index(),
		    a_li = $("#aside-ul").children('li').eq(index);

		if( val == ''){
			a_li.children('a').attr("href" , '');
		}else if( _this.attr("placeholder") == '13523423443' ){
			if( ! /tel/.test(val)){
				val = 'tel:' + val;
			}
			a_li.children('a').attr('href' ,  val);
		}else{
			if( ! /http:\/\//.test(val)){
				val = 'http://' + val;
			}
			a_li.children('a').attr('href' , val );
		}
	}).on('click', '.aside-li-delete', function(event) {
		var _this = $(this),
		    val = _this.val(),
		    index = _this.parent().index();

		_this.parent().remove();
		$("#aside-ul").children('li').eq(index).remove();
	});

	$("#change-aside").on('click', '.aside-save', function(event) {
		$("#aside-shadow").removeClass('show');

		$("#mask-div").removeClass('show');
		$("#phone-wrap").removeClass('zIndex11');
		$("#set-space").removeClass('zIndex11');

		elModule.initCurchange();
	});

	/*
	 *  侧边栏 end
	 *****/

	/*****
	 *  svg形状
	 */
	// svg形状描边大小
	initSlider($("#control-shape") , $("#control-shape-i") ,{ 
		min: 1, 
		max: 50,
		value : 0 ,
		step : 1,
		slide : function(ui){
			var _path = $("#ittwrap .curchange").find("svg").find("*").not('g');
			_path.attr('stroke-width', ui.value);

			if(_path.attr('stroke') == undefined){
				_path.attr('stroke', '#000');
			}
		}
	});

	//形状颜色
	$("#color-shape").colorPlugin( '#000' , function(color){
		var cl = '#000';
		if(color){
			cl = color.toRgbString();
		}
		var _svg = $("#ittwrap .curchange").find("svg"),
			_path = _svg.find("*").not('g');

		if(_path.length == 0){
			_svg.children().attr('fill', cl);
		}else{
			$.each(_path, function(index, el) {
				var _el = $(el)
				if(_el.attr("fill") == "none" || _el.css("fill") == "none"){
					_el.attr('stroke', cl );
					if(_el.css("fill") == "none"){
						_el.css("stroke" , "");
					}
				}else{
					_el.attr('fill', cl);
				}
			});
		}
	});

	$("#color-shapebo").colorPlugin( '#000' , function(color){
		var cl = '#000';
		if(color){
			cl = color.toRgbString();
		}
		var _path = $("#ittwrap .curchange").find("svg").find("*").not('g');

		_path.attr('stroke', cl );
	});

	//更换svg
	$("#shape-change-btn").on('click', function(event) {
		var _curch = $("#ittwrap .curchange");
		shapeModule.show(function(svg){
			_curch.find('.animate-contain').html( svg );
		});
	});
	

	/*
	 *  svg形状 end
	 *****/

	/*****
	 *  svg动画
	 */
	// svg动画虚线长度
	initSlider($("#svg-dasharray") , $("#svg-dasharray-i") ,{ 
		min: 1, 
		max: 100,
		value : 100 ,
		step : 1,
		stop : function(ui){
			var _curch = $("#ittwrap .curchange");

			_curch.attr("timing_dasharray", ui.value );

			svgModule.showOneSVGAnimate(_curch);
		}
	});
	// svg动画虚线间隔
	initSlider($("#svg-dashspace") , $("#svg-dashspace-i") ,{ 
		min: 1, 
		max: 100,
		value : 100 ,
		step : 1,
		stop : function(ui){
			var _curch = $("#ittwrap .curchange");

			_curch.attr("timing_dasharray2", ui.value );

			svgModule.showOneSVGAnimate(_curch);
		}
	});
	// svg动画动画速度
	initSlider($("#svg-duration") , $("#svg-duration-i") ,{ 
		min: 0.1, 
		max: 20,
		value : 1,
		stop : function(ui){
			var _curch = $("#ittwrap .curchange");

			_curch.attr("timing_duration", parseInt(1000/ui.value * 3) );

			svgModule.showOneSVGAnimate(_curch);
		}
	});
	// svg动画动画延时
	initSlider($("#svg-delay") , $("#svg-delay-i") ,{ 
		min: 0, 
		max: 5,
		value : 0 ,
		stop : function(ui){
			var _curch = $("#ittwrap .curchange");

			_curch.attr("timing_delay", ui.value*1000 );

			svgModule.showOneSVGAnimate(_curch);
		}
	});
	// svg动画线条粗细
	initSlider($("#svg-strokewidth") , $("#svg-strokewidth-i") ,{ 
		min: 0, 
		max: 30,
		value : 4 ,
		stop : function(ui){
			var _path = $("#ittwrap .curchange").find("svg").find("*").not('g');
			_path.removeAttr('stroke-width').css('stroke-width', ui.value);

		}
	});
	// svg动画线条颜色
	$("#color-svg").colorPlugin( '#000' , function(color){
		var cl = '#000';
		if(color){
			cl = color.toRgbString();
		}
		var _path = $("#ittwrap .curchange").find("svg").find("*").not('g');

		_path.css("stroke", cl );
	});
	
	// 更换svg动画类型
	$("#svg-type").on('click', 'span', function(event) {
		$(this).addClass('active').siblings().removeClass('active');

		var _curch = $("#ittwrap .curchange");

		_curch.attr('timing_type' , $(this).attr("data-type"));

		svgModule.showOneSVGAnimate(_curch);

	});
	// 更换svg动画效果
	$("#svg-path").on('click', 'span', function(event) {
		$(this).addClass('active').siblings().removeClass('active');

		var _curch = $("#ittwrap .curchange");

		_curch.attr('timing_speedtype' , $(this).attr("data-type"));

		svgModule.showOneSVGAnimate(_curch);

	});
	// 动画是否循环
	$("#svg-loop").on('click' , function(event) {
		var _this = $(this),
			_curch = $("#ittwrap .curchange");

		_curch.attr("timing_loop" , _this.prop("checked"));

		svgModule.showOneSVGAnimate(_curch);
	});

	//更换svg
	$("#svg-change-btn").on('click', function(event) {
		var _curch = $("#ittwrap .curchange");
		svgModule.show(function(svg){
			var _oldId = _curch.find('svg').attr("id");
			_curch.find('.animate-contain').html( svg );
			_curch.find('svg').attr("id", _oldId);
			svgModule.showOneSVGAnimate(_curch);
		});
	});

	/*
	 *  svg动画 end
	 *****/

	/*****
	 *  照片投票
	 */
	// 每人每次投票数
	spinnerInput($("#photovote-num") , {
			min: 1 ,
			max: 10 ,
			step: 1 ,
			spin: function( ui ) {
				var val = Math.abs(parseInt(ui.value) || 1);

				if( val > 10){
					val = 10
				}
				$(this).val( val );
				photovoteModule.options.vote_settings.vote_limit = val;
				photovoteModule.ruleText();
			},
			stop: function(ui) {
				var val = Math.abs(parseInt(ui.value) || 1);

				if( val > 10){
					val = 10
				}
				$(this).val( val );
			}
		});

	$("#photovote-rl1").on('click', function(event) {
		var val = $(this).prop("checked") ? 1 : 2;
		photovoteModule.options.vote_settings.vote_rule = val;
		photovoteModule.ruleText();
	});

	// 投票报名设置
	$("#photovote-set").on('click', function(event) {
		phvSetModule.show();
	});
	// 投票名称
	$("#photovote-name").on('input', function(event) {
		var val = $(this).val(),
			_title = $("#ittwrap .curchange").find('h3');

		photovoteModule.options.common_settings.title = val;
		_title.text( val );
	});
	// 投票内容
	$("#photovote-content").on('input', function(event) {
		var val = $(this).val(),
			_desc = $("#ittwrap .curchange").find('.photovote-desc');

		photovoteModule.options.common_settings.description = val;
		_desc.text( val );
	});

	// 开始日期
    $("#photovote-start").flatpickr({
    	enableTime : true,
    	time_24hr : true,
    	locale: "zh",
    	defaultDate : new Date() ,
    	onClose: function(dateObj, dateStr, instance) {
			var _curch = $("#ittwrap .curchange");

			photovoteModule.options.common_settings.start_date = dateStr;
			_curch.find('.photovote-starttime-span').text(dateStr);
		}
	});
	// 结束日期
    $("#photovote-end").flatpickr({
    	enableTime : true,
    	time_24hr : true,
    	locale: "zh" ,
    	minDate: new Date(),
    	defaultDate : new Date().fp_incr(10),
    	onClose: function(dateObj, dateStr, instance) {
			var _curch = $("#ittwrap .curchange");

			photovoteModule.options.common_settings.end_date = dateStr;
			_curch.find('.photovote-endtime-span').text(dateStr);
		}
	});



	/*
	 *  照片投票 end
	 *****/

	/*****
	 *  可编辑文本
	 */

	// 文字内容
	$("#texteditbox-text").on('input', function(event) {
		var val = $(this).html();

		$("#ittwrap .curchange").children('.animate-contain').children('.texteditbox-editbox').html(val);

	});
	// 文字颜色
	$("#texteditbox-color").colorPlugin("#000", function(color){
		var rgbcolor = '#000';
		if(color){
			rgbcolor = color.toRgbString();
		}
		$("#ittwrap .curchange").children('.animate-contain').css({
			"color": rgbcolor
		});
	});
	// 文字大小
	spinnerInput($("#texteditbox-fontsize") , {
		min: 12 ,
		max: 50 ,
		step: 1 ,
		spin: function( ui ) {
			var val = (parseInt(ui.value) || 12) + 'px';

			$("#ittwrap .curchange").children('.animate-contain').css({
				"font-size": val
			});
		},
		stop: function(ui) {
			var val = parseInt(ui.value) || 12;
		}
	});
	// 文字行高
	spinnerInput($("#texteditbox-lineheight") , {
		min: 1 ,
		max: 5 ,
		step: 0.1 ,
		spin: function( ui ) {
			var val = (parseFloat(ui.value) || 1) + 'em';

			$("#ittwrap .curchange").children('.animate-contain').css({
				"line-height": val
			});
		},
		stop: function(ui) {
			var val = parseFloat(ui.value) || 1;
		}
	});
	// 文字对齐方式
	$("#texteditbox-align").on('click', 'span', function(event) {
		var _type = $(this).attr("type");
		$("#ittwrap .curchange").children('.animate-contain').css({
			"text-align": _type
		});
		$(this).addClass('active').siblings().removeClass('active');
	});

	/*
	 *  可编辑文本 end
	 *****/

	/*****
	 *  可编辑文本
	 */

	// 文字内容
	$("#texteditboxbtn-text").on('input', function(event) {
		var val = $(this).val();
		$("#ittwrap .curchange").children('.animate-contain').html(val);

	});
	$("#texteditboxbtn-tip").on('input' , function(event) {
		var val = $(this).val();
		$("#ittwrap .curchange").attr("data-tip" , val);
	});
	// 文字大小
	spinnerInput( $("#texteditboxbtn-fontsize") , {
		min: 12 ,
		max: 50 ,
		step: 1 ,
		spin: function( ui ) {
			var val = (parseInt(ui.value) || 12) + 'px';

			$("#ittwrap .curchange").children('.animate-contain').css({
				"font-size": val
			});
		},
		stop: function(ui) {
			var val = parseInt(ui.value) || 12;
		}
	});

	/*
	 *  可编辑文本 end
	 *****/

	/*****
	 *  微信图片
	 */

	$("#weixinimg-dei").on('click', function(event) {
		var _this = $(this),
			oldimg = _this.children('img').attr("src"),
			_curch = $("#ittwrap .curchange"),
			rat = _curch.width() / _curch.height();

		imagesModule.show(function( img ){
			_this.children('img').attr("src" , img);
			_curch.children('.animate-contain').find('img').attr("src" , img);
		} , function(){
			_this.children('img').attr("src" , oldimg);
			_curch.children('.animate-contain').find('img').attr("src" , oldimg);

		} , rat , false);
	}); 

	/*
	 *  微信图片 end
	 *****/

	/*****
	 *  微信头像
	 */

	$("#weixinavatar-type").change(function(event) {
		var val = $(this).val(),
			_curch = $("#ittwrap .curchange"),
			comid = _curch.attr("data-comid");

		_curch.attr("data-type" , val).removeClass('weixinavatar1 weixinavatar2').addClass('weixinavatar' + val );

		$("#ittwrap .weixinname").filter('[data-comid="'+comid+'"]').attr("data-type" , val).removeClass('weixinname1 weixinname2').addClass('weixinname' + val );

	});

	$("#weixinavatar-dei").on('click', function(event) {
		var _this = $(this),
			oldimg = _this.children('img').attr("src"),
			_curch = $("#ittwrap .curchange"),
			rat = _curch.width() / _curch.height();

		imagesModule.show(function( img ){
			_this.children('img').attr("src" , img);
			_curch.children('.animate-contain').find('img').attr("src" , img);
		} , function(){
			_this.children('img').attr("src" , oldimg);
			_curch.children('.animate-contain').find('img').attr("src" , oldimg);

		} , rat , false);
	});

	/*
	 *  微信头像 end
	 *****/

	/*****
	 *  微信昵称
	 */
	// 默认内容
	$("#weixinname-con").on('input', function(event) {
		var val = $(this).val(),
			_curch = $("#ittwrap .curchange");

		_curch.children('.animate-contain').text(val);
	});
	// 类型
	$("#weixinname-type").change(function(event) {
		var val = $(this).val(),
			_curch = $("#ittwrap .curchange"),
			comid = _curch.attr("data-comid");

		_curch.attr("data-type" , val).removeClass('weixinname1 weixinname2').addClass('weixinname' + val );

		$("#ittwrap .weixinavatar").filter('[data-comid="'+comid+'"]').attr("data-type" , val).removeClass('weixinavatar1 weixinavatar2').addClass('weixinavatar' + val );

	});
	// 文字大小
	spinnerInput($("#weixinname-fontsize") , {
		min: 12 ,
		max: 50 ,
		step: 1 ,
		spin: function( ui ) {
			var val = (parseInt(ui.value) || 12) + 'px';

			$("#ittwrap .curchange").children('.animate-contain').css({
				"font-size": val
			});
		},
		stop: function(ui) {
			var val = parseInt(ui.value) || 12;
		}
	});

	/*
	 *  微信昵称 end
	 *****/

	/*****
	 *  微信录音
	 */

	$("#weixinsound-con").on('input', function(event) {
		var val = $(this).val(),
			_curch = $("#ittwrap .curchange");

		_curch.children('.animate-contain').text(val);
	});

	/*
	 *  微信昵称 end
	 *****/

	/*****
	 *  链接
	 */
	_allClasses = 'int-toPage int-newpage group-newpage int-iframe int-page int-goods int-gzh int-game int-article int-rotate';
	_allAttrs = 'href toPageIndex type typeid data-src data-index goods-id data-gzhObj data-gzhObj-id data-gzhObj-name data-gzhObj-url httpisblank game-url rotate-url';

	function getCurch() {
		var _curch = $("#ittwrap .curchange");

		if (_curch.hasClass('nav') && _curch.find('.current-nav-link').length) {
			return _curch.find('.current-nav-link');
		} else {
			return _curch;
		}
	}
	 // 添加链接
	 function addLink(lk,goal){
		var _goal = goal;
		if(lk == "http://" || lk == ''){
			_goal.removeAttr('href');
			return 0;
		}else{
			if(! testHttp(lk)){
				_goal.removeAttr('href');
				return 1;
			}else{
				if(/http/.test(lk)){
					_goal.attr('href', lk);
				}else{
					_goal.attr('href','http://' + lk );
				}
				return 2;
			}
		}
	 }
	// 添加电话号码
	function addTel(lk,goal){
		var _goal = goal;
		if(lk == "tel://" || lk == ''){
			_goal.removeAttr('href');
			return 0;
		}else{
			if(! testPhone(lk)){
				_goal.removeAttr('href');
				return 1;
			}else{
				if(/tel/.test(lk)){
					_goal.attr('href', lk);
				}else{
					_goal.attr('href','tel:' + lk);
				}
				return 2;
			}
		}
	}

	//链接tab
	$("#redirect-nav").on('click', 'li', function(event) {
		var _this = $(this),
			_type = _this.attr("type");

		_this.addClass('active').siblings().removeClass('active');
		$("#link-main").children('section[type="'+_type+'"]').addClass('active').siblings().removeClass('active');

		linkModule['get' + _type] && linkModule['get' + _type]();

	});

	$("#link-btn-wrap").on('click', '.link-confirm', function(event) {
	//链接确定
		var _type = $("#redirect-nav").children('.active').attr("type"),
			_curch = getCurch();

		_curch.removeClass(_allClasses).removeAttr(_allAttrs);

		switch(_type){
			case 'basic' : 
				var t = $("#link-basic").find('input[name="link-basic-i"]:checked').val();
				if(t == 'http'){
					var h = $("#link-http-input").val();
					if( isEmpty(h) ){
						break ;
					}
					if( !testHttp(h)){
						autoTip("网址输入有误！");
						return ;
					}
					addLink( h , _curch );
					_curch.attr("httpisblank",$("#httpisblank").prop("checked"));

				}else if(t == 'tel'){
					var h = $("#link-tel-input").val();
					if( isEmpty(h) ){
						break ;
					}
					if( !testPhone(h) ){
						autoTip("电话输入有误！");
						return ;
					}
					addTel( h , _curch );
				}
				break;
			case 'page' : 
				var p = $("#link-page").children('.active');

				if(p.length == 0){
					break;
				}else{
					var	_pagenum = p.index(),
						page_target = $(pagearr[_pagenum]),
						classNames = page_target.attr('class'),
						toPageClass= /topage([0-9]{0,3})/.exec(classNames);

					if(toPageClass){
						_curch.addClass('int-toPage').attr("toPageIndex",toPageClass[0]);
						$("#page-list").children('li').eq(_pagenum).addClass(toPageClass[0]);
					}else{
						var num = _pagenum,
							max_index=num,
							flag = false;//判断是否已经存在跳转的页
						$.each(pagearr,function(index,item){
							var temp = /topage([0-9]{1,3})/.exec($(item).attr('class'));
							temp = temp ? +temp[1] : max_index;
							max_index = Math.max(max_index, temp);
							if($(item).hasClass('topage'+_pagenum)){
								flag = true;
							}
						});
						if(flag){
							num = max_index + 1;
						}
						var _class = 'topage' + num;
						_curch.addClass('int-toPage').attr("toPageIndex", _class );
						pagearr[_pagenum] = $(pagearr[_pagenum]).addClass( _class ).prop("outerHTML");

						$("#page-list").children('li').eq(_pagenum).addClass( _class );
					}
				}
				break;
			case 'wei':
				var li = $("#link-wei").children('li.active');
				if(li.length > 0){
					var _id = li.attr("id");
					_curch.attr("href", '/s?id=' + _id);
					_curch.attr("httpisblank",true);
				}
				break;
			case 'article' :
				var li = $("#link-article").children('li.active');
				if(li.length > 0){
					var _id = li.attr("id");
					_curch.addClass('int-article int-newpage').attr({
						"type": 'art'+_id ,
						"typeid": _id
					});
				}
				break;
			case 'gzh' :
				var li = $("#link-gzh").children('li.active');
				if(li.length > 0){
					_curch.addClass('int-gzh').attr({
						"data-gzhObj-id": li.find('.in-li-appid').text(),
						"data-gzhObj-name": li.find('.in-li-title').text(),
						"data-gzhObj-url": li.children('img').attr('src'),
						'typeid':li.attr('id'),
					});
				}
				break ;
			case 'goods' :
				var li = $("#link-goods").children('li.active');
				if(li.length > 0){
					var _id = li.attr("data-id");
					_curch.addClass('int-goods').attr("goods-id", _id);
				}
				break ;
			case 'game':
				var li = $("#link-game").children('li.active');
				if(li.length > 0){
					_curch.addClass('int-game').attr("game-url", li.attr("data-url"));
				}
				break;
		}

		linkModule.hide();
		elModule.showGetLink();
		recordModule.addRecord();

		if(_curch.hasClass('current-nav-link')){
			_curch.removeClass('current-nav-link');
		}

	}).on('click', '.link-concel', function(event) {
	//链接取消
		var _curch = getCurch();
		linkModule.hide();

		if(_curch.hasClass('current-nav-link')){
			_curch.removeClass('current-nav-link');
		}
		if(linkModule.isAdd){
			elModule.delElement($("#ittwrap .curchange"));
		}
		linkModule.isAdd = false;
	});

	//滚动加载
	$("#link-main > .scroll").on('scroll' , function(event) {
		var _this = $(this),
		    ch = _this.height(),
		    st = _this.scrollTop(),
		    ih = _this.children('ul').height(),
		    type = _this.attr("type");

		if( ih < ch + st + 50 ){
			linkModule['get' + type] && linkModule['get' + type](true);
		}

	});

	$("#link-main").on('click', 'li.link-li', function(event) {
		var _this = $(this);

		if(_this.hasClass('active')){
			_this.removeClass('active');
		}else{
			$("#link-main").find('li.active').removeClass('active');
			_this.addClass('active');
		}


	}).on('click', '.link-add', function(event) {
		var _this = $(this);
		if(_this.hasClass('js-goods')){
			if(_this.attr("iscompany") != 1){
				confirmTip({
					text : "商品买卖仅对已认证的企业付费会员开放。是否立即升级企业会员？",
					CancelText : '放弃',
					ConfirmText : '升级',
					ConfirmFunction :function(){
						window.open('/index.php?r=pc/IndexNew/showUserInfo&update=1#account');
					}
				});
				return ;
			}
			window.open('/index.php?r=pc/shop/ShowGoods&add=1');
			$("#link-goods-mask").addClass('show');
		}else if(_this.hasClass('js-gzh')){
			gzhModule.show();
		}else if(_this.hasClass('js-article')){
			articleModule.show();
		}else if(_this.hasClass('add-game')){
			gameModule.show();
		}
	});

	//网址与电话的切换
	$("#link-basic").on('click', 'input[type="radio"]', function(event) {
		var val = $(this).val();

		linkModule.setBasic(val);
	}).on('click', '.link-div', function(event) {
		var val = $(this).find('input[type="radio"]').val();
		linkModule.setBasic(val);
		$(this).find('input[type="text"]').focus();
	});

	//页面是否隐藏
	$("#link-page").on('click', '.pageishide', function(event) {
		var li = $(this).closest('li'),
		    index = li.index();

		if( $(this).prop("checked")){
			li.addClass('one');
			$("#page-list > li").eq(index).addClass('one');
		}else{
			li.removeClass('one');
			$("#page-list > li").eq(index).removeClass('one');

		}
		event.stopPropagation();
	}).on('click', '.l-page-li ', function(event) {
		var _this = $(this);

		var cindex = $("#page-list").children('.active').index(),
			lindex = _this.index();
		if(cindex === lindex && !$('#ittwrap .curchange').hasClass('nav')){
			autoTip("这一页是元素本身所在页面，不能链接到这一页");
			return;
		}
		if(_this.hasClass('active')){
			_this.removeClass('active');
		}else{
			$("#link-main").find('li.active').removeClass('active');
			_this.addClass('active');
		}
	});

	$("#s-link-btn").on('click', function(event) {

		$("#link-main").find('li.active').removeClass('active');
		$("#link-basic").find('input[type="text"]').val('');

		var _curch = getCurch(),
			type = 'basic';

		if (typeof(_curch.attr("href")) == "undefined") {
			if (_curch.hasClass('int-toPage')) {
				type = 'page';
			} else if (_curch.hasClass('int-newpage')) {
				var _t = _curch.attr("type");
				if (/act/.test(_t)) {
					type = 'act';
				} else if (/g/.test(_t)) {
					type = 'group';
				} else if(/art/.test(_t)) {
					type = 'article';

					linkModule.articleVm.currentid = 0 ;
					setTimeout(function(){
						linkModule.articleVm.currentid = _curch.attr("typeid");
					}, 50);
				}
			}else if(_curch.hasClass('int-goods')){
				type = 'goods';

				linkModule.goodsVm.currentid = 0 ;
				setTimeout(function(){
					linkModule.goodsVm.currentid = _curch.attr('goods-id');
				}, 50);
			}else if(_curch.hasClass('int-gzh')){

				type = 'gzh';
				
				linkModule.gzhVm.currentid = 0 ;
				setTimeout(function(){
					linkModule.gzhVm.currentid = _curch.attr("typeid");
				}, 50);
				
			}else if(_curch.hasClass('int-game')){
				type = 'game';

				linkModule.gameVm.currentid = 0 ;
				setTimeout(function(){
					linkModule.gameVm.currentid = _curch.attr("game-url");
				}, 50);

			}else if(_curch.hasClass('int-rotate')){
				type = 'rotate';
			}
		} else {
			var btnlinkaddress = _curch.attr('href');

			if (/\/s\?id/.test(btnlinkaddress) && !/zhichiwangluo/.test(btnlinkaddress)) {

				var regId = new RegExp('id=([\\d]+?)$', 'g');
				var _id = regId.exec(btnlinkaddress);

				linkModule.weiVm.currentid = 0 ;
				setTimeout(function(){
					linkModule.weiVm.currentid = _id[1];
				}, 50);
				type = 'wei';
			}else{
				type = 'basic';
				
			}
		}

		linkModule.show(type);

	});

	//商品添加
	$("#link-goods-mask").on('click', '.link-goods-can', function(event) {
		linkModule.goodspage = {
			page : 1,
			hasload : false,
			nomore : false ,
			loading : false
		};

		linkModule.goodsVm.items = [];
		linkModule.getgoods();

		$("#link-goods-mask").removeClass('show');
	}).on('click', '.link-goods-con', function(event) {
		$("#link-goods-mask").removeClass('show');
	});


	/*
	 *  链接 end
	 *****/

	/*****
	 *  触发
	 */

	$("#add-trigger-btn").on('click', function(event) {

		triggerModule.show();

	});

	$("#tg-space").on('click', '.tg-confirm', function(event) {
		var _curch = $("#ittwrap .curchange"),
			_length = 0,
			sender_id = _curch.attr("data-trigger-arr");

		if ($('#ittwrap .trigger-re-span').length) {
			if ($('#tg-disappear').prop('checked')) {
				_curch.attr('data-trigger-disappear', 'true');
			} else {
				_curch.removeAttr('data-trigger-disappear');
			}
			// _curch.removeClass(_allClasses).removeAttr(_allAttrs);
		} else {
			_curch.removeClass('trigger-observer').removeAttr('data-trigger-arr data-trigger-disappear');
		}
		$('#ittwrap .animate').each(function(index, el) {
			var _el = $(el),
				receiver_id = _el.attr('data-receiver-id');
			receiver_id = receiver_id ? receiver_id.split(',') : [];

			if(_el.children('.trigger-re-span').length){
				if(receiver_id.indexOf(sender_id) < 0){
					receiver_id.push(sender_id);
					_el.attr("data-receiver-id" , receiver_id.toString()).addClass('trigger-receiver');
				}
			}else{
				if(receiver_id.indexOf(sender_id) > -1 ){
					utilities.ArrayRemoveValue(receiver_id , sender_id);
				}
				if(receiver_id.length > 0){
					_el.attr("data-receiver-id" , receiver_id.toString());
				}else{
					_el.removeClass('trigger-receiver').removeAttr('data-receiver-id');
				}
			}
		});
		triggerModule.hide();
		elModule.showGetTrigger(_curch);
		
	}).on('click', '.tg-cancel', function(event) {
		triggerModule.hide();
	});

	/*
	 *  触发 end
	 *****/

	/*****
	 *  svg形状库
	 */

	$("#shape-tab").on('click', 'a', function(event) {
	//svg形状一级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	shapeModule.showTab(_type);
	});
	$("#shape-se-tab").on('click', '.com-second-nav > a', function(event) {
	//svg形状二级分类
	 	var _this = $(this),
	 		_type = _this.attr("type"),
	 		_user = _this.parent().attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	if(shapeModule.shapepage[_user] && shapeModule.shapepage[_user][_type]){
	 		shapeModule.shapepage[_user][_type].page = 1;
	 		shapeModule.shapepage[_user][_type].nomore = false;
	 	}
	 	shapeModule.getShape(_user , _type);

	 	_this.addClass('active').siblings().removeClass('active');
	});
	//形状确定
	$("#shape-confirm").on('click', function(event) {
		var _li = $("#shape-wrap").find('li.active');
		if(_li.length == 0){
			autoTip("您还没有选择形状！");
			return
		}
		var _svg = _li.children('div').html();
		
		shapeModule.confirm(_svg);
		shapeModule.hide();
		recordModule.addRecord();

		elListModule.refresh();
	});
	//形状取消
	$("#shape-cancel").on('click', function(event) {
		shapeModule.cancel();
		shapeModule.hide();
	});
	// 滚动加载
	$("#shape-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('.active'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		var _type = $("#shape-se-tab").children('.active').children('.active').attr("type"),
	 			_user = _c.attr("type");

	 		if(_user == 1){
	 			_type = 1;
	 		}

	 		shapeModule.getShape(_user , _type);
	 	}
	});

	$("#shape-wrap").on('click', 'li', function(event) {
	//形状选择
		var _this = $(this);
		if(_this.hasClass('active')){
			_this.removeClass('active').children('.svg-choose').remove();
		}else{
			$("#shape-wrap").find('li.active').removeClass('active');
			$("#shape-wrap").find('label.svg-choose').remove();
			_this.addClass('active').append('<label class="svg-choose"><span class="iconfont icon-check"></span></label>');
		}
	}).on('click', '.svg-del', function(event) {
	//形状删除
		event.stopPropagation();

		var _li = $(this).parent();

		confirmTip({
			text : '是否删除当前的形状？',
			ConfirmFunction : function(){
				shapeModule.deleteSvg(_li);
			}
		});
	});

	/*
	 *  svg形状库 end
	 *****/

	/*****
	 *  svg动画库
	 */

	$("#svg-tab").on('click', 'a', function(event) {
	//svg一级分类
	 	var _this = $(this),
	 		_type = _this.attr("type");
	 	if(_this.hasClass('active')){
	 		return ;
	 	}
	 	svgModule.showTab(_type);
	});
	//svg确定
	$("#svg-confirm").on('click', function(event) {
		var _li = $("#svg-wrap").find('li.active');
		if(_li.length == 0){
			autoTip("您还没有选择svg！");
			return
		}
		var _svg = _li.children('div').html();

		svgModule.confirm(_svg);
		svgModule.hide();
		recordModule.addRecord();

		elListModule.refresh();
	});
	//svg取消
	$("#svg-cancel").on('click', function(event) {
		svgModule.cancel();
		svgModule.hide();
	});
	// 滚动加载
	$("#svg-wrap").scroll(function(event) {
	 	var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('.active'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){
	 		var _user = _c.attr("type");

	 		shapeModule.getShape(_user , 0);
	 	}
	});

	$("#svg-wrap").on('click', 'li', function(event) {
	//svg选择
		var _this = $(this);
		if(_this.hasClass('active')){
			_this.removeClass('active').children('.svg-choose').remove();
		}else{
			$("#svg-wrap").find('li.active').removeClass('active');
			$("#svg-wrap").find('label.svg-choose').remove();
			_this.addClass('active').append('<label class="svg-choose"><span class="iconfont icon-check"></span></label>');
		}
	}).on('click', '.svg-del', function(event) {
	//svg删除
		event.stopPropagation();

		var _li = $(this).parent();

		confirmTip({
			text : '是否删除当前的svg？',
			ConfirmFunction : function(){
				shapeModule.deleteSvg(_li);
			}
		});
	});

	/*
	 *  svg动画库 end
	 *****/

	/*****
	 *  右键
	 */

	$('#ittwrap').on('contextmenu',function(event){
		if(event.ctrlKey){
			return false;
		}
		// console.log(event);
		var _target = $(event.target),
			_combo = $("#ittwrap .curchange-combo"),
			woffset = $("#ittwrap").offset(),
			left = event.clientX - woffset.left ,
			top = event.clientY - woffset.top,
			type = 'menu',
			ch , cw = 105,
			iscombo = (_combo.filter(_target.closest('.animate')).length > 0 ) ;

		rightclickModule.remove();

		if( !iscombo ){
			_combo.removeClass('curchange-combo');
		}

		if(iscombo && _combo.length){
			type = 'combo';
		}else if(_target.hasClass('pageshow')){
			type = 'paste';

			if(! rightclickModule.operation.copyContent){
				return false;
			}
		}else{
			type = 'menu';
		}

		rightclickModule.add( type , _target );

		ch = rightclickModule.menu.outerHeight();
		if(top + ch > 520){
			top = top - ch;
			top < 0 ?  (top = 0) : '';
		}
		if(left + cw > 330){
			left = left - cw;
		}
		rightclickModule.menu.css({
			top : top ,
			left : left
		});

		return false;
	}).on('click', function(event) {
		rightclickModule.remove();
	});

	$("#ittwrap").on('click', '.pop-menu a', function(event) {
		var _type = $(this).attr("data-type"),
			_ispaste = false;

		if( _type == 'delete'){
			_ispaste = true;
		}

		rightclickModule.operation[_type]($('#ittwrap .curchange') , _ispaste);

		event.stopPropagation();
	});
	

	/*
	 *  右键 end
	 *****/

	/*****
	 *  保存历史记录
	 */

	$("#secovery-list").on('click', '.secovery-recovery-btn', function(event) {
		var li = $(this).parent(),
			h_id = li.attr("data-id"),
			time = li.children('.secovery-time').text();

		confirmTip({
			text : '是否确认恢复到时间为：' + time +'的历史？',
			ConfirmFunction : function(){
				historyModule.recoveryHistory(h_id);
			}
		});
		
	}).on('click', '.secovery-preview-btn', function(event) {
		var h_id = $(this).parent().attr("data-id");
		// window.open('/index.php?r=pc/Index/InvitationPreview&iswhere=3&id=' + myinvitation_id+'&hid=' + h_id);
		window.open('/produce/id-'+myinvitation_id+'-a-3-b-'+h_id+'.html');
	});

	$("#save-history").on('scroll', function(event) {
		var _this = $(this),
	 		_scrolltop = _this.scrollTop(),
	 		_wh = _this.height(),
	 		_c = _this.children('ol'),
	 		_ch = _c.height();

	 	if(_scrolltop > _ch - _wh - 100){

	 		historyModule.getHistory();
	 	}
	});
	

	/*
	 *  保存历史记录 end
	 *****/

	/*****
	 *  收藏
	 */
	$("#collect-wrap").on('click', '.collect-comfirm', function(event) {
	//收藏确认
		var _this = $(this);
		if( _this.hasClass('loading') ){
			return;
		}
		_this.addClass('loading');

		var title = $("#collect-title").val(),
			thumb_img = $("#collect-img").attr("src"),
			pageindex = $("#page-list").children('.active').index(),
			_html = pagearr[pageindex].replace(/topage([0-9]{0,3})/g,'');

			_html = $(_html);
			_html.find('.nav').removeAttr('data-role');

			if(_html.find('.advert')){
				_html.find('.advert').remove();
			}
			
			_html = _html.prop('outerHTML');

		if( title == '' ){
			autoTip('请输入标题。');
			$("#collect-title").focus();
			return;
		}
			
		var url = '/index.php?r=pc/UserInvitationTemplate/publishTpl' ,
			data = { 
				title: title,
				invitation_data: _html,
				thumb_img: thumb_img,
				type: 0
			},
			successFn = function(data){
				_this.removeClass('loading');
				if(data.status == 0){
					autoTip("模板收藏成功！");
					$("#collect-wrap").removeClass('show');

					guideModule.showCollect();

					if(tplModule.tplpage['0']){
						var data = {
							id: data.id,
							tpl_content: [_html],
							thumb_img: thumb_img,
							title: title
						}
						var _li = tplModule.parseTemplate(data , 0);

						itttpl[data.id] = _html;
						$("#tpl-wrap").children('.tpl-section[type="0"]').children('ul').prepend(_li);
					}
				}else{
					autoTip(data.data);
				}
			},
			errorFn = function( ){
				_this.removeClass('loading');
				autoTip("模板收藏失败，请重试");
			};

		$ajax( url , "post", data , "json", successFn, errorFn);

	}).on('click', '.collect-cancel', function(event) {
	//收藏取消
		$("#collect-wrap").removeClass('show');
	}).on('click', '.collect-thumb', function(event) {
	//更换缩略图
		var oldimg = $("#collect-img").attr("src");
		$("#images-space").addClass('zIndex12');
		imagesModule.show(function( img ){
			$("#collect-img").attr("src" , img);
			$("#images-space").removeClass('zIndex12');
		} , function(){
			$("#collect-img").attr("src" , oldimg);
			$("#images-space").removeClass('zIndex12');
		} , 330 / 520 , false);
	});

	/*
	 *  收藏 end
	 *****/


	/*****
	 *  分享设置
	 */

	var iframeContent = $('#preview-iframe')[0],
  		iframeDocument = iframeContent.contentWindow.document;

	iframeContent.onload = function(){
		iframeDocument = iframeContent.contentWindow.document;
		$(iframeDocument).find('body').addClass('preview-body');
		var _flip = $(iframeDocument).find('#flip');
		_flip.find('img').attr('draggable', "false");
		_flip.find('div[href]').each(function(index, el) {
			var _href = $(el).attr("href");
			if(/\/s\?id/.test(_href)){
	            _href += '&nodirect=1';
	            $(el).attr("href" , _href);
			}
		});

		var _pagelength = _flip.children('.page').length,
			_li = '';

		for(var i = 1 ; i <= _pagelength ; i++){
			_li += '<li>'+ i +'</li>';
		}

		$("#share-skip-list").html(_li);
	}

	$("#share-cover").on('click', function(event) {
		var _img = $(this).children('img');

		var _shw = $("#share-weixin"),
			_width = _shw.width(),
			_height = _shw.height(),
			_of = $("#share-weixin").offset();

		$("#hollow-mask").children('div').css({
			'width' : _width ,
			'height' : _height ,
			'top' : _of.top - 1 ,
			'left' : _of.left - 1
		});
		$("#hollow-mask").addClass('show');

		$("#images-space").addClass('images-space-cover');
		imagesModule.show(function(img){
			_img.attr("src" , img);
			$("#images-space").removeClass('images-space-cover');
			$("#hollow-mask").removeClass('show');
		} , function(){
			$("#images-space").removeClass('images-space-cover');
			$("#hollow-mask").removeClass('show');
		} , 1 , false);

	});

	$("#share-p-right").on('click', '.share-p-u', function(event) {
		var _this = $(this);
		if(_this.hasClass('gray')){
			return ;
		}
		_this.addClass('gray');
		setTimeout(function(){
			_this.removeClass('gray');
		}, 1100);
		iframeContent.contentWindow.flipPageConstant.flipPrev();

	}).on('click', '.share-p-d', function(event) {
		var _this = $(this);
		if(_this.hasClass('gray')){
			return ;
		}
		_this.addClass('gray');
		setTimeout(function(){
			_this.removeClass('gray');
		}, 1100);
		iframeContent.contentWindow.flipPageConstant.flipNext();
	});

	//自动翻页时间 
	spinnerInput($("#flip-auto-time") , {
		min: 1 ,
		max: 10 ,
		step: 0.1 ,
		spin: function( ui ) {
			var val = parseInt(ui.value) || 1;

		},
		stop: function(ui) {
			var val = parseInt(ui.value) || 1;
			iframeContent.contentWindow.flipPageConstant.setOption({'autoTurnPage' : val });
		}
	});

	$("#flip-auto-i").on('click', function(event) {
		var _this = $(this);
		if( _this.prop("checked") ){
			$("#flip-time").css('display', 'inline-block');
			iframeContent.contentWindow.flipPageConstant.setOption({'autoTurnPage' : $("#flip-auto-time").val()});
		}else{
			$("#flip-time").css('display', 'none');
			iframeContent.contentWindow.flipPageConstant.setOption({'autoTurnPage' : 0 });
		}
	});

	$("#flip-direction").on('change', function(event) {
		var _val = $(this).val();
		iframeContent.contentWindow.flipPageConstant.setOption({'isVertical' : _val});
	});

	$("#flip-animate").on('click', 'span', function(event) {
		
		$(this).addClass('active').siblings().removeClass('active');

		var _type = $(this).attr("flip-type");
		iframeContent.contentWindow.flipPageConstant.setOption({'type' : _type});
	});

	$("#share-btn-wrap").on('click', '.share-back', function(event) {
		// pageModule.initIttwrap();
		$("#share-wrap").removeClass('show');
		iframeContent.src = '';
	}).on('click', '.share-public', function(event) {
		if(pmi_list.isAdmin){
			adminOperate.saveTplData()
			return;
		}
		weiyeModule.saveWeiyeData(function(data){
			if(data.status != 0){
				autoTip(data.data);
				return ;
			}
			window.onbeforeunload = null;
			autoTip("发布成功！");
			window.location.href = '/index.php?r=pc/IndexNew/showInvitationControl&id='+myinvitation_id+'#5';
		} , function(data){} , 2 );

	});

	$("#share-skip").on('click', 'span', function(event) {
		$("#share-skip").children(".share-skip-inner").toggleClass('show');
	}).on('click', '.share-skip-close', function(event) {
		$("#share-skip").children(".share-skip-inner").removeClass('show');
	});

	$("#share-skip-list").on('click', 'li', function(event) {
		var index = $(this).index();
		iframeContent.contentWindow.flipPageConstant.flipNext(index);
	});

	$("#share-close").on('click', function(event) {
		$("#share-wrap").removeClass('show');
		iframeContent.src = '';
	});

	$("#race-checkbox").on('click', function(event) {
		var _this = $(this);
		if(_this.prop("checked")){
			raceInfoModule.show();
			_this.prop('checked', false);
		}
	});
	$("#haoyisheng-checkbox").on('click', function(event) {
		var _this = $(this);
		if(_this.prop("checked")){
			$("#race-checkbox").prop('checked', false);
		}
	});

	function isAdvancedSetting(){
		if(pmi_list.packageLevel != 3 && pmi_list.vipLevel < 3){
			confirmTip({
					text: '您需要购买单个微页的“版权套餐三”或者升级企业高级版或企业尊享版才能使用！',
					ConfirmText : '购买套餐',
					CancelText : '<span style="display: block;width:100%;height:100%;line-height: 33px;background-color: #03d7a4;">升级会员</span>',
					ConfirmFunction : function(){
							window.open('/index.php?r=pc/IndexNew/showInvitationControl&id='+myinvitation_id+'#4');
					},
					CancelFunction : function(){
							window.open('/index.php?r=pc/Index/VipPacket');
					}
				});
			return false;
		}else{
			return true;
		}
	}

	$("#share-tab").on('click', 'a', function(event) {
		var _type = $(this).attr("type");
		$(this).addClass('active').siblings().removeClass('active');
		$("#share-content").children('div[type="'+_type+'"]').addClass('active').siblings().removeClass('active');
	});
	$("#share-arrow-ul").on('click', 'li', function(event) {
		var _this = $(this);

		if( ! isAdvancedSetting() ){
			return ;
		}

		var arrow = $(iframeDocument).find('#next').children('div');
		if(_this.hasClass('share-arrow-custom')){
			if(_this.children('div').children('img').length && !_this.hasClass('active')){
				_this.addClass('active').siblings().removeClass('active');
				arrow.html('<img src="'+_this.find('img').attr('src')+'" alt="" />');
			}else{
				$("#images-space").addClass('images-space-cover');
				$("#mask-div").addClass('show zIndex20');
				imagesModule.show(function( img ){
					var _div = _this.children('div');
					_div.children('img').remove();
					_div.html('<img src="'+img+'" alt="" />');
					_this.addClass('active').siblings().removeClass('active');
					$("#images-space").removeClass('images-space-cover');
					$("#mask-div").removeClass('show zIndex20');
					arrow.html('<img src="'+img+'" alt="" />');
				} , function(){
					$("#images-space").removeClass('images-space-cover');
					$("#mask-div").removeClass('show zIndex20');
				} , 1 , false);
			}

		}else{
			_this.addClass('active').siblings().removeClass('active');
			arrow.html('<img src="'+_this.find('img').attr('src')+'" alt="" />');
		}
	});
	$("#arrow-hide").on('click', function(event) {

		var arrow = $(iframeDocument).find('#next');
		if($(this).prop("checked")){

			if( ! isAdvancedSetting() ){
				$(this).prop('checked', false);
				return ;
			}
			arrow.hide();
		}else{
			var img = $("#share-arrow-ul").children('.active').find('img').attr("src");
			arrow.show().children('div').html('<img src="'+img+'" alt="" />');
		}
	});
	$("#share-load-logo").on('click', function(event) {
		
		if( ! isAdvancedSetting() ){
			return ;
		}

		var _img = $(this).children('.img-wrap').children('img');

		$("#images-space").addClass('images-space-cover');
		$("#mask-div").addClass('show zIndex20');
		imagesModule.show(function( img ){
			_img.attr("src" , img);

			$("#images-space").removeClass('images-space-cover');
			$("#mask-div").removeClass('show zIndex20');
		} , function(){
			$("#images-space").removeClass('images-space-cover');
			$("#mask-div").removeClass('show zIndex20');
		} , 1 , false);

	}).on('mouseover', function(event) {
		var _img = $(this).children('.img-wrap').children('img');
		$("#loading-lodo-img").attr("src" , _img.attr("src"));
		$("#share-loading").show();
	}).on('mouseout', function(event) {
		$("#share-loading").hide();
	});
	$("#share-load-hide").on('click', function(event) {
		var _this = $(this);

		if( ! isAdvancedSetting() ){
			$(this).prop('checked', false);
			return ;
		}
	});

	/*
	 *  分享设置 end
	 *****/

	/*****
	 *  微站
	 */

	$("#weizhan-wrap").on('click', '.weizhan-comfirm', function(event) {

		if($("#weizhan-open").prop("checked")){
			var type = $("#weizhan-wrap").find('input[type="radio"]:checked').attr("data-type");
			$("#weizhan-wrap").attr("weizhan-ty" ,  type);
		}else{
			$("#weizhan-wrap").attr("weizhan-ty" , 'close');
		}

		$("#weizhan-wrap").removeClass('show');
	}).on('click', '.weizhan-cancel', function(event) {
		$("#weizhan-wrap").removeClass('show');
	});

	$("#weizhan-open").on('click', function(event) {
		if( $(this).prop("checked") ){
			$("#weizhan-wrap").find('.weizhan-a').show();
		}else{
			$("#weizhan-wrap").find('.weizhan-a').hide();
		}
	});

	/*
	 *  微站 end
	 *****/

	/*****
	 *  多选
	 */

	//多选框
	var pageelArr = [] , multi = false , start_x, start_y;
	$('body').on('mousedown', function(event) {
		var _target = $(event.target);

		if (_target.hasClass('pageshow') || _target.closest('.animate').hasClass('tacked')) {
			$('#ittwrap .curchange-combo').removeClass('curchange-combo');
			//拉选的起点
			start_x = event.clientX;
			start_y = event.clientY;
			pageelArr = [];

			$.each($('#ittwrap .animate'),function(index,item){
				var _item = $(item);
				pageelArr[index] = {
					el     : _item,
					center_x : _item.offset().left + (_item.width())/2,
					center_y : _item.offset().top  + (_item.height())/2,
				}
			});
			multi = true;
		}
	}).on('mousemove', function(event) {
		if(! multi ){
			return ;
		}
		var move_x = event.clientX,
			move_y = event.clientY;
		var offset_x = move_x - start_x,
			offset_y = move_y - start_y;
		var position = {
			left: offset_x <= 0 ? move_x : start_x,
			top: offset_y <= 0 ? move_y : start_y,
			width : Math.abs(offset_x),
			height : Math.abs(offset_y)
		}

		$('#multi-area').css(position).addClass('show');

		for(var i = 0; i < pageelArr.length ; i++){
			var pa = pageelArr[i];
			if(pa.center_x >= position.left
				&& pa.center_x <= position.left + position.width
				&& pa.center_y >= position.top
				&& pa.center_y <= position.top + position.height 
				&& !pa.el.hasClass('tacked'))
			{
				pa.el.addClass('curchange-combo');
			}
			else{
				pa.el.removeClass('curchange-combo');
			}
		}
	}).on('mouseup',function(event){
		multi = false;
		$('#multi-area').removeClass('show');

		if($('#ittwrap .curchange-combo').length > 1){
			multiModule.show();
		}else{
			multiModule.hide();
		}
	});

	/*
	 *  多选 end
	 *****/

	/*****
	 *  新手引导
	 */

	guideModule.show(0);


	/*
	 *  新手引导 end
	 *****/

	/*****
	 *  样式、动画设置面板浮动
	 */

	$("#style-float").draggable({
		// containment: [-100 , 0 , window.innerWidth - 100, window.innerHeight - 100],
		containment: "window",
		handle: ".fl-drag"
	});
	$("#animate-float").draggable({
		containment: "window",
		handle: ".fl-drag"
	});

	$("#style-f-s").on('click', function(event) {
		var _this = $(this);

		if(_this.prop("checked")){
			$("#style-wrap").appendTo($("#style-float-con"));
			$("#style-float").addClass('show');
			$("#set-tab").children('a[type="el"]').trigger('click');
			$("#set-tab").children('a[type="style"]').addClass('hide');
		}else{
			$("#style-wrap").appendTo($("#set-content").children('section[type="style"]'));
			$("#style-float").removeClass('show');
			$("#set-tab").children('a[type="style"]').removeClass('hide').trigger('click');
		}
	});

	$("#ani-f-s").on('click', function(event) {
		var _this = $(this);

		if(_this.prop("checked")){
			$("#ani-wrap").appendTo($("#animate-float-con"));
			// $("#set-b-a").appendTo($("#animate-float-btn"));
			$("#animate-float").addClass('show');
			$("#set-tab").children('a[type="el"]').trigger('click');
			$("#set-tab").children('a[type="animate"]').addClass('hide');
		}else{
			$("#ani-wrap").appendTo($("#set-content").children('section[type="animate"]'));
			// $("#set-b-a").appendTo($("#set-b"));
			$("#animate-float").removeClass('show');
			$("#set-tab").children('a[type="animate"]').removeClass('hide').trigger('click');
		}
	});

	$("#style-float").on('click', '.el-close', function(event) {
		$("#style-f-s").trigger('click');
	});
	$("#animate-float").on('click', '.el-close', function(event) {
		$("#ani-f-s").trigger('click');
	});


	/*
	 *  样式、动画设置面板浮动 end
	 *****/

	/*****
	 *  其他
	 */

	$("body").on('click', function(event) {
		var _target = $(event.target);

		if(!_target.closest('.pr-grid').length && !_target.closest('.grid-set').length && $("#grid-set").hasClass('show')){
			gridModule.hide();
		}

		rightclickModule.remove();
	});

	weiyeModule.init();

	window.onbeforeunload = function(event){
		event.returnValue = "*************************************************\n* 即将离开页面, 为确保内容不丢失              *\n* 建议点击右上方的保存按钮保存后再离开    *\n*************************************************";
		// return '';
	};

	cookieModule.checkCookie();

	window.onunload = function(event){
		var open_id = cookieModule.getCookie('open_id'),
			open_id_arr = open_id.split(',');

		var ind = open_id_arr.indexOf(myinvitation_id);
		open_id_arr.splice(ind , 1);

		open_id = open_id_arr.join();

		cookieModule.setCookie('open_id', open_id, 12)
	};

	/*
	 *  其他 end
	 *****/

});
