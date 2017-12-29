// 背景音乐
var bgMusic = {
  // 是否初始化
  hasinit : false,
  // 音乐dom
  music : '',
  // 是否暂停
  paused : false,
  // 初始化
  init : function(){
    if(this.hasinit){
      return;
    }
    this.hasinit = true;

    var _t = this;

    var url = $('body').attr('music-url') || '';

    // 'ittsharemusic' 是以前判断是否有音乐的字符，现在的已弃除
    if( url == 'ittsharemusic' || url =='' ){
      this.hasload = false;
      return ;
    }

    $('#music').css('display', 'block');

    _t.hasload = true;
    _t.music = new Audio();

    //判断是否是百度音乐 百度音乐有 'BaiduMusic' 字符
    if(/baiduMusic\-[0-9]+/.test(musicUrl)){
      $("#music").addClass('phone-baiduMusic');
      this.getBaiduMusicUrl(musicUrl , this.setBgMusic , true );
    }else{
      this.setBgMusic(musicUrl);
    }

    //开关音乐
    $('#music').on('click',function(event) {
      var _this = $(this);
      if(!_this.hasClass('phone-baiduMusic')){
        return ;
      }
      if (_this.hasClass('will-paused')) {
         _this.removeClass('will-paused');
      }else{
         _this.addClass('will-paused');

      }
    }).on('click', '.bg-icon', function(event) {
      // var _music = $('#music');
      // if(! _music.hasClass('will-paused') && _music.hasClass('phone-baiduMusic')){
      //   return;
      // }
      if ( _t.paused) {
         _t.play();
      }else{
         _t.pause();
         pauseAllSound();
      }
    });

    document.addEventListener("WeixinJSBridgeReady", function () {
        bgMusic.play();
        $(document).off('touchstart.onetouch');
    }, false);

  },
  // 设置背景音乐相关
  setBgMusic : function (murl){
    var bgm =  bgMusic.music;

    bgMusic.hasload = true;

    bgm.onerror = function(event){
      var code = event.target.error.code;
      if(code == 4){
        alertTip("音乐链接无效！");
      }else if(code == 2){
        alertTip("网络不给力哦，音乐加载错误！");
      }else if(code == 3){
        alertTip("解码错误!");
      }
      bgMusic.hasload = false;

    }
    bgm.onprogress = function(event) {
      var buff = this.buffered,
          bufferPercent = 0;

      if (buff.length > 0) {
          bufferPercent = parseInt(buff.end(buff.length - 1) / this.duration * 100);
      }
      console.log(bufferPercent);
      if (bufferPercent == 100) {
        bgm.onprogress = '';
      };
    }

    bgm.id = 'bg_music';
    bgm.src = murl;
    bgm.preload = 'auto';
    if(commondata.musicisloop == "false"){
      bgm.loop =  false;
    }else{
      bgm.loop = true;
    }
    setTimeout(function(){
      bgm.play();
    }, 200);

    $("#music").append(bgMusic.music);

    $(document).one("touchstart.onetouch",function(){
      bgMusic.play();
    });
    bgMusic.music.onplay = function(event) {
      $(document).off('touchstart.onetouch');
    };
    
  },
  // 获取百度音乐的url
  getBaiduMusicUrl : function(dataid , sfn , isbg){
    var _songid = dataid.split('-')[1];

    var url = 'http://www.zhichiwangluo.com/index.php?r=pc/BaiduMusic/GetAudition',
      data = { 
        songid : _songid ,
        bit : 128 
      };
    $.ajax({
        url : url,
        type: 'get',
        data: data,
        timeout : 30000,
        dataType: 'json',
        success: function(data){
            if(data.status == 0){
              sfn && sfn(data.data.file_link);
              isbg && bgMusic.setBaiduMusic(data.data.web_url);
              
            }else{
              alertTip(data.data);
            }
        },
        error: function(xhr, errorType, error){
            alertTip("音乐链接获取有问题，请重试！");
        }
    });
  },
  // 设置百度音乐的外链，以及屏幕的关于点击收起音乐图标
  setBaiduMusic : function(weburl){
    $("#baidu-a").attr("href" , weburl + '&fr=weiye&zhichi_url=' + encodeURIComponent(window.location.href) );

    // 当触摸屏幕时，音乐图标收起
    $(document).on('touchstart mousedown', function(event) {
      var _music = $('#music'),
          _target = $(event.target);

      if(_music.hasClass('will-paused') && !_target.closest('.phone-music').length){
        _music.removeClass('will-paused');
      }
    });
  },
  // 音乐暂停
  pause : function(){
    $('#music').addClass('toggleMusic paused');
    this.paused = true;
    if(this.hasload){
      this.music.pause();
    }
  },
  // 音乐播放
  play : function(){
    $('#music').removeClass('toggleMusic paused');
    this.paused = false;
    if(this.hasload){
      this.music.play();
    }
  },
  // 音乐暂时暂停
  temporaryPause : function(){
    $('#music').addClass('toggleMusic');
    this.paused = true;
    if(this.hasload){
      this.music.pause();
    }
  },
  // 判断音乐是否是暂时（非用户自己）暂停，是的话就播放
  temporaryPlay : function(){
    if( !$('#music').hasClass('paused')){
      $('#music').removeClass('toggleMusic');
      this.paused = false;
      if(this.hasload){
        this.music.play();
      }
    }
  }
}