define('js/common/showMsg.js', function(require, exports, module){


/**
 * 根据歌曲数据 展示受阻消息
 * @method showMsg
 * @desc  消息提示逻辑:
    付费歌曲受阻提示用 alertid  能试听 提示用pc_p  不能试听  提示用pc_p_u   用弹框提示
    非付费歌曲 受阻提示用 msgid    用tips提示  自动消失那种
    如果歌曲能播放完整版 不弹提示

 * @param {object} song 单曲数据
 * @param {string} type 受阻类型  'play':播放受阻   'down':下载受阻
 * @example
    showMsg(musiclist[0],'play');


 */


var music = require('js/common/music.js'),
	$ = music.$,
	MUSIC = music,
	g_user = MUSIC.widget.user,
    jQueryAjax = music.jQueryAjax,
    dialog = require('js/common/dialog.js');
var msgData=null;


function getMsgData(callback) {
    callback=callback||function () {};
    if (msgData) {
        callback(msgData);
        return ;
    }
    var url = '//c.y.qq.com/musichall/fcgi-bin/fcg_alert_info?ids=all&cid=486&rnd=' + Math.random();
    jQueryAjax.jsonp({
        url : url,
        charset : 'utf-8',
        success : function(data) {
            if (data && data.code==0) {
                msgData=data.data;
                callback(msgData)
            }
        },
        error : function(){
        }
    });
}


function getmsg(song,type,callback) {
    callback=callback||function () {};

    getMsgData(function (data) {

        var id = song.alertid || song.msgid;
        var msg='';
        type = type || ((song.tryPlay ) ?'pc_p':'pc_p_u');

        if (song.alertid) {
            if (!data['alertinfo'] || !data['alertinfo'][id]) {
                return ;
            }

            msg=$.extend({},data['alertinfo'][id][type]);

            msg.desc = (msg.desc || '该歌曲暂不支持下载该品质！').replace(/\{%singername\}/g,song.singer[0].name)
                            .replace(/\{%albumname\}/g,song.albumname)
                            .replace(/\{%songname\}/g,song.songname)
                            .replace(/\{%songprice\}/g,song.pay.paytrackprice)
                            .replace(/\{%albumprice\}/g,song.pay.payalbumprice);
            msg.btn = (msg.btn || '').replace(/\{%singername\}/g,song.singer[0].name)
                           .replace(/\{%albumname\}/g,song.albumname)
                           .replace(/\{%songname\}/g,song.songname);
            msg.url = (msg.url || '').replace(/\{%songid\}/g,song.songid)
                           .replace(/\{%albumid\}/g,song.albumid);
        }else if (song.msgid) {
            msg=data['msginfo'][id];
        }

        callback(msg);
    })
}

function stat(optcode, tryplay, alertid, songid){
	var uin = g_user.getUin();
	var base_url = location.protocol+'//stat.y.qq.com/pc/fcgi-bin/fcg_val_report.fcg'

	
	tryplay = tryplay || 0;
	alertid = alertid || '';
	songid = songid || '';

	optcode > 0 && (new Image().src = [base_url, 
										'?data_type=252',
										// '&uin=', uin,
										'&data=', optcode,
										'&data2=', tryplay,
										'&reserve7=', alertid,
										'&reserve8=', songid/* ,
										'&data3=', (+new Date()) */].join(''));
}

function showMsg(song, type, showFunc, specialFunction) {

    if (song.alertid<=0 && song.msgid<=0) {
        return ;
    }
	if (specialFunction)
	{
		getmsg(song,type,function (msg) {
			specialFunction(msg);
		});
	}else

    getmsg(song,type,function (msg) {

        if (!msg) {
            return ;
        }
		type = type || ((song.tryPlay ) ?'pc_p':'pc_p_u');
		var mapTypeId = {
				'pc_p' : 1,
				'pc_p_u' : 2,
				'pc_d' : 3, 
				'pc_d_hq' : 4,
				'pc_d_sq' : 5,
				'pc_d_sq' : 5		
			},
			typeId = mapTypeId[type] || 0;
        
		function fn() {
			if (msg.btn && msg.url) {
				stat('264',typeId,song.alertid,song.songid);
				var flag = '';
				if (/^(http:|https:)\/\//.test(msg.url)) {
                    var w = window.open(msg.url);if(w)w.opener = null;
				}else if (/^pcqqmusic:\/\//.test(msg.url)) {
					var cmd=msg.url.match(/^pcqqmusic:\/\/(\w+)/);
                    //alert(JSON.stringify(cmd));
					
					if (cmd && cmd[1]) {
						switch (cmd[1]) {
							case 'buygreen':
								g_user.openVip(msg.aid+'$songid'+song.songid);
								break;
							case 'buysupergreen':
								g_user.openVip(msg.aid+'$songid'+song.songid);
								break;
							case 'buy8yuan':
								g_user.openPayMusic(msg.aid+'$songid'+song.songid);
								break;
							case 'buy12yuan':
								g_user.openPayMusic(msg.aid+'$songid'+song.songid);
								break;
                            case 'buydigitalalbum':
                                var uin = g_user.getUin();
                                if (uin < 10001) {
                                    g_user.openLogin();
                                    return;
                                }
								flag = 'buydigitalalbum';
                               g_user.buyAlbum({
                                    title: '购买数字专辑',
                                    albumid: song.albumid,
                                    actid: 0,
                                    frompage: 'zwsharezuduan'
                                });
                                break;
						}
					}
				}
				if (flag != 'buydigitalalbum')
				{
					dialog.show({
						mode : "common",
						title : "QQ音乐",
						icon_type : 1,
						sub_title : '如果您已支付成功，请点击“确认支付”按钮。',
						button_info1 : {
							highlight : 1,
							title : '确认支付',
							fn : function(e){
								g_user.clearCache();
								setTimeout(function() {
									location.reload();
								}, 200);
							}
						},
						button_info2 : {
							highlight : 0,
							title : "取消",
							fn : function(e){
								g_user.clearCache();
								setTimeout(function() {
									location.reload();
								}, 200);
							}
						}
					});
				}
				
			}
		}

        //付费歌曲 并且 alertid大于0  弹框受阻
        if (song.alertid>0) {//弹框
            stat('263',typeId,song.alertid,song.songid);
			if (showFunc) {
				showFunc({
					type : 1,
					icon : 'icon_hint_warn',
					desc : msg.desc,
					strbtn : msg.btn||'关闭',
					btnfunc : function() {
						fn();
					}
				});
			}else {
				window._buydigitalalbum_timer = null;
				var buydigitalalbum_count = 5;
				if (window.location.href.indexOf('//y.qq.com/portal/headline/insert.html') != -1)
				{
					top.window.MUSIC.popup.show(msg.desc, 3000, 1);
					return false;
				}
				function closeTimer (){
					if (window._buydigitalalbum_timer)
					{
						clearInterval( window._buydigitalalbum_timer ); 
						window._buydigitalalbum_timer = null; 
					}
				}
				function startTimer(){
					if ( !window._buydigitalalbum_timer ) { 
							window._buydigitalalbum_timer = setInterval(function(){ 
								if (buydigitalalbum_count>0)
								{
									buydigitalalbum_count--;
									$('#buydigitalalbum_time').html(buydigitalalbum_count+'秒后');
								}else {
									closeTimer();
									MUSIC.util.gotoAlbum({albummid:song.albummid});
								}
							}, 1000 ); 
					} 
				}
				var cmd=msg.url.match(/^pcqqmusic:\/\/(\w+)/);
				if (cmd && cmd[1] && cmd[1]=='buydigitalalbum')
				{
					startTimer();
				}
				dialog.show({
					mode : "common",
					title : "QQ音乐",
					icon_type : 1,
					sub_title : msg.desc,
	                desc : (cmd && cmd[1] && cmd[1]=='buydigitalalbum' && window.location.href.indexOf(song.albummid)==-1)?('<span class="popup_txt_highlight" id="buydigitalalbum_time">'+buydigitalalbum_count+'秒后</span>，将自动跳转到专辑售卖页。'):' ', //占位
					close_func : function(){
						closeTimer();
					},
					button_info1 : {
						highlight : 1,
						title : msg.btn||'关闭',
						fn : function(e){
							dialog.hide();                      
							fn();	
							closeTimer();
						}
					},
					button_info2 : {
						highlight : 0,
						title : "取消",
						fn : function(e){
							dialog.hide();
							closeTimer();
						}
					}
				});
			}

        }else if(song.msgid){//  非付费歌曲

            if(!!song.disabled &&!!song.vid&& song.vid != ""){
                dialog.show({
                    mode : "common",
                    title : "QQ音乐",
                    icon_type : 1,
                    sub_title : msg + '，但可以去看MV哦',
                    button_info1 : {
                        highlight : 1,
                        title : '播放MV',
                        fn : function(e){
                            MUSIC.util.gotoMvdetail({vid:song.vid})
                            dialog.hide();
                        }
                    },
                    button_info2 : {
                        highlight : 0,
                        title : "取消",
                        fn : function(e){
                            dialog.hide();
                        }
                    }
                });
            }else{
                MUSIC.popup.show(msg, 2000, 1);
            }
        }
    });

}

return showMsg;


});