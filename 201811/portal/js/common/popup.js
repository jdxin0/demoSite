define('js/common/popup.js', function(require, exports, module){


var $ = require("js/common/music/jquery.js"),
    cookie = require("js/common/music/cookie.js");
var popup = {
	/**
	 * type : 1:worning
	*/
	show : function(msg, timeout, type){
		//require.load('//y.gtimg.cn/mediastyle/yqq/popup.css?max_age=25920000', function(){
			timeout = timeout || 3000;
			if ($('#popup').length<1)
			{
				$('body').append('<div class="mod_popup_tips" id="popup" style="z-index:10000000000000000001;display:none;"><i class="popup_tips__icon'+((!!type&&type==1)?' popup_tips__icon_warn':'')+'"></i><h2 class="popup_tips__tit">'+msg+'</h2></div>');
				require.async('js/common/music/tips.js', function(Tips){
					$('#popup').show();
					Tips.fix_elem($('#popup'));
				});
			}else {
				if (!!type&&type==1)
				{
					if (!$('#popup i').hasClass('popup_tips__icon_warn'))
					{
						$('#popup i').addClass('popup_tips__icon_warn');
					}
				}else {
					if ($('#popup i').hasClass('popup_tips__icon_warn'))
					{
						$('#popup i').removeClass('popup_tips__icon_warn');
					}
				}
				$('#popup h2').html(msg);
				require.async('js/common/music/tips.js', function(Tips){
					$('#popup').show();
					Tips.fix_elem($('#popup'));
				});
			}
			setTimeout(function(){
				$('#popup').fadeOut();
			}, timeout);
		//});
	},
	hide : function(){
		$('#popup').fadeOut();
	}
};
return popup;

});