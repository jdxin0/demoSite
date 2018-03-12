function getRealCookie(name) {
    var bool = null == document.cookie.match(new RegExp("(^" + name + "| " + name + ")=([^;]*)"));
    try {
        return bool ? "" : decodeURIComponent(RegExp.$2)
    } catch (e) {
        return bool ? "" : unescape(RegExp.$2)
    }
}

function setRealCookie(name, value, hours, isBaseDomain) {
	if (arguments.length > 2) {
		var expireDate = new Date(new Date().getTime() + hours * 3600000);
		if (isBaseDomain != undefined && isBaseDomain == 1) {
			document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=xunlei.com; expires=" + expireDate.toGMTString();
		} else {
			document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=help.xunlei.com; expires=" + expireDate.toGMTString();
		}
	} else {
		document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=help.xunlei.com";
	}
}

function getCookie(name) {
	var val = getRealCookie(name);
	if (val.trim() == '') {
		var helpCookie = getRealCookie('helpCookie');
		if (helpCookie.trim() == '') {
			return '';
		}
		var cookies = helpCookie.split('&');
		for (var i = 0; i < cookies.length; i++) {
			ary = cookies[i].split('=');
			if (ary.length > 1 && ary[0] == name) {
				return decodeURIComponent(ary[1]);
			}
		}
		return '';
	} else {
		return val.trim(); //如果cookie中有该值，优先使用该值
	}
}

function setCookie(name, value, hours, isBaseDomain) {
	value = value + '';
	if (isBaseDomain != undefined && isBaseDomain == 1) {
		setRealCookie(name, value, hours, 1);
	} else {
		var helpCookie = getRealCookie('helpCookie');
		if (value.trim() == '') { //删除cookie
			if (helpCookie != '') {
				var check = getCookie(name);
				if (check != '') {
					var cookies = helpCookie.split('&');
					var newcookie = new Array;
					for (var i = 0; i < cookies.length; i++) {
						ary = cookies[i].split('=');
						if (ary.length > 1 && ary[0] != name) {
							newcookie.push(cookies[i]);
						}
					}
					helpCookie = newcookie.join('&');
				}
			}
		} else { //添加cookie
			//删除原生cookie中的此值
			setRealCookie(name, '', 0);
			if (helpCookie == '') {
				helpCookie = name.trim() + '=' + encodeURIComponent(value);
			} else {
				//check if has the same item , if so , replace it , otherwise add it.
				var check = getCookie(name);
				if (check != '') {
					var cookies = helpCookie.split('&');
					for (var i = 0; i < cookies.length; i++) {
						ary = cookies[i].split('=');
						if (ary.length > 1 && ary[0] == name) {
							cookies[i] = name + '=' + encodeURIComponent(value);
							break;
						}
					}
					helpCookie = cookies.join('&');
				} else {
					helpCookie = helpCookie + '&' + name.trim() + '=' + encodeURIComponent(value);
				}
			}
		}
		if (hours != undefined) {
			setRealCookie('helpCookie', helpCookie, hours);
		} else {
			setRealCookie('helpCookie', helpCookie);
		}
	}
}

function cookie(key, value, maxage, domain) {
    if(typeof value === 'undefined') {
        var re = new RegExp("(^" + key + "| " + key + ")=([^;]*)");
        return re.test(document.cookie) ? RegExp.$2 : ''
    } else {
        if(maxage) {
        	maxage = '; max-age=' + maxage;
        } else {
        	maxage = '';
        }
        if(domain) {
        	domain = '; domain = xunlei.com';
        } else {
        	domain = '';
        }
        return document.cookie = key + '=' + encodeURIComponent(value) + '; path=/' + domain + maxage;
    }
}

function getSearch(key) {
	return new RegExp('[&?]' + key + '=([^&]*)', 'i').test(location.search) ? decodeURIComponent(RegExp.$1) : '';
}
//写会员信息cookie
function getVipUserInfo(callback) {
	var url = 'http://dynamic.vip.xunlei.com/iface.php?c=login&a=asynProxyVip';
	$.ajax({
		type: "GET",
		url: url,
		data: '',
		dataType: 'jsonp',
		success: function(json) {
			var tipcookie = function(cname, name) {
				if (json[name]) {
					setCookie(cname, json[name], 24 * 3600);
				}
			};
			setCookie('vip_sessionid', getCookie('sessionid'));
			tipcookie('vip_nickname' , 'nickname');
			tipcookie('vip_usrname' , 'usrname');
			tipcookie('vip_growvalue' , 'growvalue');
			tipcookie('vip_expiredate' , 'expiredate');
			tipcookie('vip_level' , 'level');
			tipcookie('vip_isyear' , 'isyear');
			tipcookie('vip_paytype' , 'paytype');
			tipcookie('vip_isvip' , 'isvip');
			tipcookie('vip_daily' , 'daily');
			tipcookie('vip_payname' , 'payname');
			tipcookie('vip_is_good_number' , 'is_good_number');
			tipcookie('vip_num_is_open_vip' , 'num_is_open_vip');
			tipcookie('vip_num_due_time' , 'num_due_time');
			tipcookie('vip_safebox' , 'safebox');
			tipcookie('vip_autopay' , 'autopay');
			tipcookie('act_cmb' , 'act_cmb');			
			tipcookie('vas_type' , 'vas_type');
			tipcookie('vip_ischild' , 'ischild');
			tipcookie('jsq_type' , 'jsqtype');
			tipcookie('jsq_isvip' , 'jsq_isvip');
			tipcookie('jsq_level' , 'jsq_level');
			tipcookie('jsq_growvalue' , 'jsq_growvalue');
			tipcookie('jsq_expiredate' , 'jsq_expiredate');
			tipcookie('jsq_paytype' , 'jsq_paytype');
			tipcookie('jsq_score' , 'jsq_score');
			tipcookie('jsq_expiretype' , 'jsq_expiretype');
			tipcookie('jsq_trialvip' , 'jsq_trialvip');
			tipcookie('jsq_trialexpire' , 'jsq_trialexpire');
			tipcookie('red_isvip' , 'red_isvip');
			tipcookie('red_expiredate' , 'red_expiredate');
			tipcookie('history' , 'history');
			if (callback) {callback()};
		}
	});
}
function getVip(fn, err) {
	$.ajax({
		url: "http://dynamic.vip.xunlei.com/iface.php?c=login&a=asynProxyVip",
		dataType: 'jsonp',
		success: function(data) {

			var flag = false;
			for (var x in data) {
				flag = true;
			}
			vip.info = data;
			if (flag) {
				fn && fn(data);
				initHeader(data);
				initNav(data);
			} else {
				err && err();
			}
		}
	});
}

var isThunder = / Thunder/.test(navigator.userAgent);

$(function() {
	if (isThunder) {
		xl9.api.onUserLogout(function() {
			location.reload();
		});
		xl9.api.onUserLogin(function(userId, jumpKey) {
			var jumpURL = 'http://in.xl9.xunlei.com/index.php/user/jumpkey';
			var url = 'http://jump.xunlei.com/jump/?u1=' + encodeURIComponent(jumpURL) + '&jump_key=' + jumpKey;
			$.ajax({
				url: url,
				timeout: 10000,
				dataType: "jsonp",
				success: function(rs) {

				},
				error: function(error, s) {
					getVip();
				}
			})
		});
	} else {
		xlQuickLogin.init({
			loginID: '101',
			registerID: 'act',
			UI_THEME: 'popup',
			// 登录成功后回调函数，当 SET_ROOT_DOMAIN == true 时该项可用
			LOGIN_SUCCESS_FUNC: function() {
				getVipUserInfo();
				location.reload();
			},
			// 注册成功后回调函数，当 SET_ROOT_DOMAIN == true 时该项可用
			REGISTER_SUCCESS_FUNC: function() {
				location.reload();
			},
			// 关闭按钮回调函数，只适用弹窗主题
			POPUP_CLOSE_FUNC: function() {},
			//登出后的回调
			LOGOUT_FUNC: function() {
				location.reload();
			}
		});
	}
});

function login() {
	if (isThunder) {
		xl9.api.showLoginDlg(function(err) {});
	} else {
		xlQuickLogin.popup();
	}
}

function haslogin() {
	return !!cookie('sessionid');
}

function logout() {
	if (isThunder) {
		xl9.api.logout(function(err) {});
	} else {
		xlQuickLogin.logout();
	}
}

$(document).on('click', '.login', function() {
	login();
});

$(document).on('click', '.logout', function() {
	logout();
});

function start(fn, err){
	if (haslogin()) {
		var helpCookie = getCookie('helpCookie');
		if (!helpCookie) {
			getVipUserInfo(fn, err);
		} else {
			//客户端登陆重刷
			if (getCookie('sessionid') != getCookie('vip_sessionid')) {
				getVipUserInfo(fn, err);
			} else {
				fn&&fn();
			}
		}
	}else{
		err&&err();
	}
}
function initHeader() {
	$('.btn_log').hide().next().show().find('.nickname').html(getCookie("usernick"))
}
function initNav(){
	getCookie("vip_isvip")==2?$(".activeVip").show():false;
}
$(function() {
	$('.btn-sea').on('click', function() {
		var val = $.trim($('#search').val());
		if(val) {
			window.open('/search.html?keywords=' + encodeURIComponent(val));
			return false;
		}
	});

	$("#search").on("keyup", function(event) {
		var val = $.trim($(this).val());
		if(val && event.keyCode === 13) {
			window.open('/search.html?keywords=' + encodeURIComponent(val));
			return false;
		}
		if (val === this.preval) {
			return;
		}
		this.preval = val;
		if (val) {
			$('.key_list').hide();
			$('.match_box').show();
			if ($.trim(val)) {
				$.ajax({
					url: "http://dynamic.help.xunlei.com/index.php?c=product&a=searchByKeyWords&keywords=" + val,
					dataType: "jsonp",
					success: function(rs) {

						if (rs.result === 0) {
							var product_msg = '<p class="pd_tt">产品：</p><ul class="pd_list">';
							$.each(rs.data.product, function(i, v) {
								product_msg += '<li><a target="_blank" href="/product.html?pid=' + v.pid + '">' + v.cname + '</a></li>';
							});
							product_msg += '</ul>';
							$('.match_pd').html(product_msg);
							if (rs.data.product.length) {
								$('.match_pd').show();
							} else {
								$('.match_pd').hide();
							}
							var question_msg = '';
							$.each(rs.data.question, function(i, v) {
								question_msg += '<li><a target="_blank" href="/question.html?qid=' + v.qid + '">' + v.question + '</a></li>';
							});
							$('.match_list').html(question_msg);
							if(question_msg) {
								$(".key_box").show();
								$('.match_list').show();
							} else {
								$(".key_box").hide();
								$('.match_list').hide();
							}
						}
						$(".key_list").hide();
					},
					error: function(xhr, status, statusText) {

					}
				});
			}
		} else {
			$('.key_list').show();
			$('.match_box').hide();
		}

	}).on("focus", function() {
		$('.key_box').show();
		if ($.trim($(this).val())) {
			$('.key_list').hide();
			$('.match_box').show();
		} else {
			$.ajax({
				url: "http://dynamic.help.xunlei.com/index.php?c=product&a=init",
				dataType: "jsonp",
				success: function(rs) {
					var str = "";
					if(rs.result === 0) {
						var data = rs.data.search;
						for (var i = 0; i < data.length; i++) {
							str += '<li><a href="/search.html?keywords=' + data[i].keyword + '" target="_blank" class="hotsearch">' + data[i].keyword + '</a></li>';
							if (i === 5) {
								break;
							}
						}
						$(".key_list").html(str);
					}

				}
			});
			$('.key_list').show();
			$('.match_box').show();
		}
	}).on("click", function() {
		return false;
	})

	$(document).on('click', function() {
		$('.key_box').hide();
	})
});