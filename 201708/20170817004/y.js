<script>
/**
 * 图片上传
 */
var jcropApiIns, // 图片裁剪实例
    jcropSelectPos, $img_box_replacer, afterSelectImgCallback, img_box_scrollTimer, img_box_inputTimer;

$('#img-crop-target').Jcrop({
  boxWidth : $('.img-crop-scope').width(),
  boxHeight: $('.img-crop-scope').height(),
  aspectRatio: 1/1,
  onSelect: function(){
    jcropSelectPos = jcropApiIns.tellSelect();
  },
  onChange: function(c){
    var $tracker = $('.jcrop-tracker');
    $('.img-crop-width-input').val(Math.round(c.w));
    $('.img-crop-height-input').val(Math.round(c.h));
  }
}, function(){
  jcropApiIns = this;
  jcropApiIns.setSelect([0, 0, 100, 100]);
});

$('#webapp-img-box').on('click', '.webapp-box-header-ul li', function(){
  // 我的图片/图片库 切换
  if($(this).hasClass('active')) { return; }
  var index = $(this).index(),
      $content = $('#webapp-img-box .box-resource-content').eq(index),
      $li = $content.find('.webapp-content-tab li'),
      $subCate;

  $(this).addClass('active').siblings().removeClass('active');
  $content.show().siblings('.box-resource-content').hide();
  if (!$li.filter('.active').length){
    $li.eq(0).trigger('click');
  } else {
    $li.filter('.active').trigger('click');
  }
  if($(this).hasClass('system-img-library')){
    if($('body').attr('data-admin') || $('body').attr('admin')){
      $('#webapp-img-box .content-top-operation').show();
    }else {
      $('#webapp-img-box .content-top-operation').hide();
    }
  } else {
    $('#webapp-img-box .content-top-operation').show();
  }
  $('#webapp-img-box .group-edit-cancel:visible').trigger('click');
}).on('click', '.webapp-box-close', function(){
// 关闭资源框
  $('#webapp-img-box, #webapp-img-box-bg').addClass('animate-hide').removeClass('animate-show');

}).on('click', '.webapp-content-tab li', function(){
// 一级菜单切换
  var index = $(this).index(),
      $content = $(this).parent().siblings('.resource-list-wrap').eq(index),
      $subCate;

  $(this).addClass('active').siblings('.active').removeClass('active');
  $content.show().siblings('.resource-list-wrap').hide();
  $('#webapp-img-box .resource-list .selected').removeClass('selected');
  $('.resource-select-num').text(0);

  if( ($subCate = $(this).parent().siblings('.webapp-sub-cate[data-href='+$(this).attr('data-id')+']')).length){
  // 如果有一级菜单下有二级菜单时 展示二级菜单, data-page为1 表示该列表没有请求过数据 点击二级菜单请求数据
    $subCate.show().siblings('.webapp-sub-cate').hide();
    if ($(this).attr('data-page') == 1) {
      $(this).attr('data-page', 2);
      $subCate.children().eq(0).trigger('click');
    }
  } else {
  // 没有二级菜单 直接点击一级菜单请求数据
    $('.webapp-sub-cate').hide();
    if ($(this).attr('data-page') == 1) {
      getImgResource('image', $(this), $content.find('.resource-list'));
    }
  }
}).on('click', '.webapp-sub-cate > span', function(){
// 二级菜单切换
  $(this).attr('data-page', 1).addClass('active').siblings('.active').removeClass('active');
  $('#webapp-img-box .resource-list-wrap:visible').off('scroll').on('scroll', function(){
    webappImgBoxScroll($(this));
  });
  getImgResource('image', $(this), $('.resource-list:visible'));

}).on('click', '.resource-list li', function(){
  // 选中图片
  if($(this).hasClass('resource-uploading')){ return; }
  if($('#box-img-batch:visible').length){
    $(this).toggleClass('selected');
    $('.resource-select-num').text($('#webapp-img-box .resource-list li.selected').length);
  } else {
    var $img = $(this).find('img'),
        imgsrc = $img.attr('src'),
        ratio  = $img.width()/$img.height();

    $('#webapp-img-box .selected').removeClass('selected');
    $(this).addClass('selected');
    $('#img-crop-target').attr({
      'src': imgsrc,
      'data-id': $(this).attr('data-id')
    });

    $('.img-crop-width-input, .img-crop-height-input').val('');
    jcropApiIns.setImage(imgsrc);
    jcropApiIns.setOptions({ aspectRatio:ratio });
    setTimeout(function(){
      jcropApiIns.setSelect([0,0,300,300]);
    }, 300);
    $('.img-crop-body-left').find('input').eq(0).prop('checked', true).attr('data-ratio', ratio);
    $('#img-crop-box, #img-crop-box-bg').removeClass('animate-hide').addClass('animate-show');
  }

}).on('click', '.box-operation-menu li', function(){
  // 点击我的图片界面操作按钮 展示对应操作
  var $this = $(this),
    selector;

  if(!$('#webapp-img-box .system-img-library').hasClass('active') && 
    $(this).hasClass('cannot-operate-default') && !$this.hasClass('img-batch') && 
    $('#default-img-group:visible').hasClass('active')){
    alertTip('不能删除、编辑默认分组');
    return;
  }
  if(selector = $this.attr('data-href')) {
    $('#img-box-group-create .group-name-input').val('');
    $(selector).removeClass('box-hide').siblings().addClass('box-hide');
  }
  // 编辑组名
  if($this.hasClass('edit-img-group')) {
    $('#img-box-group-edit .group-name-input').val($('#webapp-img-box .webapp-content-tab:visible .active').text());
    return;
  }
  // 批量处理
  if($this.hasClass('img-batch')) {
    var select = '';
    $('#webapp-img-box .webapp-content-tab:visible li').each(function(i, li){
      select += '<option value="'+$(li).attr('data-id')+'">'+$(li).text()+'</option>'
    });
    $('#webapp-img-box .resource-group-select').html(select);
    $('#webapp-img-box .resource-list .selected').removeClass('selected');
    $('#webapp-img-box .resource-select-num').text(0);
    // $('#webapp-img-box .img-box-confirm').hide();
  }

}).on('click', '.group-edit-cancel', function(){
// 点击操作组取消按钮
  $(this).parent().addClass('box-hide');
  $('#webapp-img-box .box-operation-menu').removeClass('box-hide');
  $('#webapp-img-box li.selected').removeClass('selected');
  // $('#webapp-img-box .img-box-confirm').show();

}).on('click', '#img-box-group-edit .group-edit-confirm', function(){
// 确定修改组名
  var $this     = $(this),
      groupName = $this.siblings('.group-name-input').val(),
      $li       = $('#webapp-img-box .webapp-content-tab:visible .active'),
      groupId   = $li.attr('data-id'),
      data      = {
        tag: groupName
        ,tag_id: groupId
      };

  $('#webapp-img-box .system-img-library').hasClass('active') ? (data.admin = 1) : (data.user = 1);
  $.ajax({
    url : '/index.php?r=pc/UserTag/updateTag', 
    type: 'get',
    data: data, 
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      $li.text(groupName);
      $this.siblings('.group-edit-cancel').trigger('click');
    }
  });
}).on('click', '#img-box-group-edit .delete-img-group', function(){
// 删除组
  var $this   = $(this),
      $li     = $('#webapp-img-box .webapp-content-tab:visible .active'),
      groupId = $li.attr('data-id'),
      $content= $li.parent().siblings('.resource-list-wrap').eq($li.index()),
      data = {
        tag_id: groupId
      };

  if(!confirm('删除分组后分组里的图片不会删除，您确定要删除当前组？')) { return; }
  $('#webapp-img-box .system-img-library').hasClass('active') ? (data.admin = 1) : (data.user = 1);
  $.ajax({
    url : '/index.php?r=pc/UserTag/removeTag',
    type: 'get',
    data: data,
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      $li.siblings('li').eq(0).trigger('click');
      $li.remove();
      $content.remove();
      $this.siblings('.group-edit-cancel').trigger('click');
    }
  });
}).on('click', '#img-box-group-create .group-edit-confirm', function(){
// 确定创建分组
  var $this     = $(this),
      groupName = $this.siblings('.group-name-input').val(),
      url       = '/index.php?r=pc/UserTag/addTag', 
      para = {
        tag   : groupName
        ,user : $('#webapp-img-box .system-img-library').hasClass('active') ? 0 : 1
        ,type : 0
      };

  $.ajax({
    url: url,
    type: 'get',
    data: para,
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      var li = '<li data-page="1" data-id="'+data.data+'">'+data.title+'</li>';
      $('#webapp-img-box .webapp-content-tab:visible').append(li).parent()
        .append('<div class="resource-list-wrap"><ul class="resource-list"></ul></div>');
      $this.siblings('.group-edit-cancel').trigger('click');
    }
  });

}).on('click', '#box-img-batch .group-edit-confirm', function(){
// 确定批量移动
  var $this     = $(this),
      imgId     = [],
      imgs      = $('.resource-list:visible .selected'),
      oldGroupId  = $('#webapp-img-box .webapp-content-tab:visible .active').attr('data-id'),
      newGroupId  = $('#webapp-img-box .resource-group-select:visible').val();

  if(oldGroupId == newGroupId) { return; }
  imgs.length && imgs.each(function(index, au){
    imgId.push($(au).attr('data-id'));
  });
  $.ajax({
    url : '/index.php?r=pc/UserTag/moveImg',
    type: 'get',
    data: {
      tag_id: newGroupId
      ,img_arr: imgId
      ,user : $('#webapp-img-box .system-img-library').hasClass('active') ? 0 : 1
    },
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      if($('#webapp-img-box .webapp-content-tab:visible .active').attr('data-id') == 0){
        $('#webapp-img-box .webapp-content-tab:visible .selected').removeClass('selected');
      }else {
        imgs.remove();
      }
      $('#webapp-img-box .webapp-content-tab:visible [data-id="'+newGroupId+'"]').attr('data-page', 1);
      $this.siblings('.group-edit-cancel').trigger('click');
    }
  });
}).on('click', '.delete-select-img', function(){
// 确定批量删除
  var $this = $(this),
      imgs  = $('#webapp-img-box .resource-list:visible .selected'),
      imgId;

  if(!imgs.length) { return; }
  if(!confirm('确定删除所有选中的图片')) { return; }
  imgId = [];

  imgs.each(function(index, au){
    imgId.push($(au).attr('data-id'));
  });
  $.ajax({
    url : '/index.php?r=pc/UserTag/removeImg',
    type: 'post',
    data: {
      tag_id: $('#webapp-img-box .webapp-content-tab:visible .active').attr('data-id')
      ,img_arr: imgId
      ,user: $('#webapp-img-box .system-img-library').hasClass('active') ? 0 : 1
    }, 
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      imgs.remove();
      $this.siblings('.group-edit-cancel').trigger('click');
    }
  });

}).on('click', '.img-operate [data-role="delete"]', function(e){
// 删除图片
  e.stopPropagation();
  var $this = $(this);
  if(!confirm('确定要删除图片？')){ return; }
  $.ajax({
    url: '/index.php?r=pc/UserTag/removeImg',
    type: 'post',
    data: {
      tag_id: $('#webapp-img-box .webapp-content-tab:visible .active').attr('data-id')
      ,img_arr: [$this.closest('li').attr('data-id')]
      ,user: $('#webapp-img-box .system-img-library').hasClass('active') ? 0 : 1
    }, 
    dataType: 'json',
    success: function(data){
      if (data.status !==0) { alertTip(data.data); return; }
      $this.closest('li').remove();
    }
  });

});

// 裁剪
$('#img-crop-box').on('click', '.img-crop-confirm', function(){
// 确定裁剪
  var $this = $(this),
      $targetImg = $('#img-crop-target'),
      target_url = $targetImg.attr("src"),
      target_id  = $targetImg.attr("data-id");

  if(/\.gif/.test(target_url)){
    alertTip("GIF格式的图片无法裁剪");
    return;
  }
  if($this.hasClass('disabled')) { return; }
  $this.addClass('disabled').text("提交中..");
  $.ajax({
    url: '/index.php?r=pc/UserTag/CropImage',
    type: 'post',
    dataType: 'json',
    data: {
      id: target_id,
      orig_file: target_url,
      width: Math.round(jcropSelectPos.w),
      height:Math.round(jcropSelectPos.h),
      x:Math.round(jcropSelectPos.x),
      y:Math.round(jcropSelectPos.y)
    },
    success: function(data){
      $this.removeClass('disabled').text("确定");
      if(data.status !== 0){ alertTip(data.data); return; }
      var info = data.data,
          imgStr = '<li data-id='+info.id+' data-src='+info.img_thumb
                 + '><a href="javascript:;" title="" class="thumbnail"><img src='
                 + info.img_thumb +' alt=""></a><div class="img-operate">'
                 // + '<a href="javascript:;"'
                 // + ' title="移动到其他分组" data-role="move"><span class="glyphicon '
                 // + 'glyphicon-move"></span></a>'
                 // + '<a href="javascript:;" title="裁剪尺寸" data-role="truncate">'
                 // + '<span class="glyphicon glyphicon-edit">裁剪</span></a>'
                 + '<a href="javascript:;" title="删除" data-role="delete"><span class="glyphicon'
                 + ' glyphicon-trash">删除</span></a></div></li>';
      
      $('.resource-list:visible').prepend(imgStr);
      if($img_box_replacer){
        $img_box_replacer.attr('src', info.img_thumb);
      }
      $.isFunction(afterSelectImgCallback) && afterSelectImgCallback(info.img_thumb);
      $('#img-crop-box .webapp-box-close, #webapp-img-box .webapp-box-close').trigger('click');
    },
    error: function() {
      $this.removeClass('disabled').text("确定");
      alertTip('请求出错');
    }
  });

}).on('click', '.img-crop-cancel', function(){
// 不裁剪
  var imgUrl = $('#webapp-img-box .resource-list:visible .selected img').attr('src');
  if($img_box_replacer){
    $img_box_replacer.attr('src', imgUrl);
  }
  $.isFunction(afterSelectImgCallback) && afterSelectImgCallback(imgUrl);
  $('#img-crop-box .webapp-box-close, #webapp-img-box .webapp-box-close').trigger('click');

}).on('blur', '.img-crop-width-input, .img-crop-height-input', function(e){
// 输入裁剪宽高
  // var keycode = e.keyCode;
  // console.log(keycode);
  // if ((48 <= keycode && keycode <= 57) || (96 <= keycode && keycode <= 105) || keycode == 8 || keycode == 46 ){
    var x = jcropSelectPos.x,
        y = jcropSelectPos.y,
        width = +$('.img-crop-width-input').val()+x,
        height= +$('.img-crop-height-input').val()+y;

    // img_box_inputTimer && clearTimeout(img_box_inputTimer);
    $('.img-box-ui-radio').last().prop('checked', true);
    jcropApiIns.setOptions({aspectRatio: 0});
    // img_box_inputTimer = setTimeout(function(){
      jcropApiIns.setSelect([x, y, width, height]);
  //   }, 1000);

  // } else {
  //   e.preventDefault();
  // }
}).on('click', '.webapp-box-close, .img-crop-return', function(){
// 关闭剪裁框
  $('#img-crop-box, #img-crop-box-bg').addClass('animate-hide').removeClass('animate-show');

}).on('click', '.img-crop-body-left input', function(){
// 修改裁剪比例
  jcropApiIns.setOptions({aspectRatio: eval($(this).attr('data-ratio'))});
});

function webappImgBoxScroll(list_wrap){
  var $this = list_wrap,
      scrollTop, wrapHeight, contentH;

  if(img_box_scrollTimer){ return; }
  img_box_scrollTimer = setTimeout(function(){
    scrollTop  = $this.scrollTop();
    wrapHeight = $this.height();
    contentH   = $this.children('ul').height();
    if(wrapHeight + scrollTop >= contentH){
      getImgResource('image', 
        $('.webapp-sub-cate:visible .active').length 
        ? $('.webapp-sub-cate:visible .active') 
        : $('#webapp-img-box .webapp-content-tab:visible .active'), 
      $('#webapp-img-box .resource-list:visible'));
    }
    img_box_scrollTimer = 0;
  }, 100);
}

// 注册图片上传插件
ImgUploader('#select-local-img');
function ImgUploader(id) {
  var fileId, uploader, $current_progress,
      FILE_SIZE_LIMIT = 1024 * 1024 * 2;

  uploader = WebUploader.create({
    accept: {
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
    },
    compress: {
      width: 1600,
      height: 1600,
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
    // fileNumLimit: 10, // 验证文件总数量, 超出则不允许加入队列
    auto: true,
    fileSingleSizeLimit: FILE_SIZE_LIMIT, //文件大小为2M
    // swf文件路径
    swf: './Uploader.swf',
    // 文件接收服务端。
    server: '/index.php?r=pc/UserTag/addimg',
    // 允许重复上传
    duplicate: true,
    // 选择文件的按钮。可选。
    // 内部根据当前运行时创建，可能是input元素，也可能是flash.
    pick: id
  });
  // 当有文件添加进来的时候
  uploader.on('filesQueued', function(files) {
    var list = '';

    $.each(files, function(index, file){
      list += '<li class="resource-uploading" data-name="'+file.name+'" data-id="'+file.id+'">'
            + '<a href="javascript:;" title="" class="thumbnail"><img></a>'
            // + '<h5 class="img-title">'+file.name+'</h5>'
            + '<div class="img-operate">'
            // + '<a href="javascript:;" title="移动到其他分组" data-role="move"><span class="glyphicon glyphicon-move"></span></a>'
            // + '<a href="javascript:;" title="裁剪尺寸" data-role="truncate"><span class="glyphicon glyphicon-edit">裁剪</span></a>'
            + '<a href="javascript:;" title="删除" data-role="delete"><span class="glyphicon glyphicon-trash">删除</span></a></div>'
            + '<div class="progress-mask"><p class="progress-inner"></p><p class="upload-fail-tip">上传失败</p></div></li>';
    });
    $('.resource-list:visible').prepend(list);
  });
  uploader.on('startUpload', function(file, percentage) {
    // 开始上传流程触发
    var user = $('#webapp-img-box .webapp-box-header-ul .active').hasClass('system-img-library') ? 0 : 1,
        tag = $('#webapp-img-box .webapp-content-tab:visible .active').attr('data-id') || 0;
    uploader.option('server', '/index.php?r=pc/UserTag/addimg&user='+ user +'&tag_id=' + tag);
  });
  uploader.on('uploadStart', function(file){
    $current_progress = $('.resource-list:visible li[data-id="'+file.id+'"] .progress-inner');
  });
  uploader.on('uploadProgress', function(file, percentage) {
    $current_progress.text(Math.round(percentage*100)+'%');
  });
  uploader.on('uploadSuccess', function(file, response) {
    var fileId  = file.id,
        $li     = $('.resource-list:visible li[data-id="'+fileId+'"]');

    if(response.status !== 0) {
      $li.find('.upload-fail-tip').show().siblings('.progress-bar').hide();
      return;
    }
    $li.closest('.resource-list-wrap').scrollTop(0);
    $li.attr({ 'data-id': response.data.id, 'data-src': response.data.img_original })
       .removeClass('resource-uploading')
       .find('.progress-mask').remove();
    $li.find('img').attr('src', response.data.img_original);
  });
  uploader.on('uploadError', function(file) {
    var fileId  = file.id,
      $li   = $('#webapp-img-box .resource-list:visible li[data-id="'+fileId+'"]');

    $li.attr('upload-fail', 1).find('.upload-fail-tip').show().siblings('.progress-inner').hide();
  });
  uploader.on('uploadFinished', function() {
    // 所有文件结束上传
    $('#webapp-img-box .resource-list:visible li[upload-fail="1"]').remove();
  });
  uploader.on('error', function(type) {
    if(type === 'Q_TYPE_DENIED'){
      alert('请上传 gif/jpg/jpeg/bmp/png 格式的文件');
    } else if(type === 'Q_EXCEED_NUM_LIMIT'){
      alert('选择的文件数目超出限制 超出部分已取消上传');
    } else if(type === 'Q_EXCEED_SIZE_LIMIT '){
      alert('添加的文件总大小超出限制 超出部分已取消上传');
    }
  });
  uploader.on('beforeFileQueued', function(file){
    if(file.size > FILE_SIZE_LIMIT){
      alert('文件大小超出'+ (FILE_SIZE_LIMIT/1024/1024) +'M限制');
      return false;
    }
  });
}

function showImgResourceBox(img, afterCallback){
  $img_box_replacer = $(img) || '';
  afterSelectImgCallback = afterCallback || '';

  if($('#webapp-img-box').hasClass('img-resource-loaded')){
    $('#webapp-img-box .resource-list .selected').removeClass('selected');
    $('#webapp-img-box-bg, #webapp-img-box').removeClass('animate-hide').addClass('animate-show');
    return;
  }

  // 第一次打开图片资源框 加载默认分组图片
  $.ajax({
    url: '/index.php?r=pc/UserTag/getTagList', 
    type: 'get',
    data: {
      type: 0
    },
    dataType: 'json',
    success:  function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      var taglist = data.data.user_list,
          tab = content_wrap = '',
          wrap_template = '<div class="resource-list-wrap"><ul class="resource-list"></ul></div>';

      taglist.length && $.each(taglist, function(index, tag){
        tab += '<li data-id="'+tag.id+'" data-page="1">'+tag.title+'</li>';
        content_wrap += wrap_template;
      });
      $('#webapp-my-img .webapp-content-tab').append(tab).parent().append(content_wrap);

      $('#webapp-img-box').addClass('img-resource-loaded');
      $('#webapp-img-box .resource-list .selected').removeClass('selected');
      $('#webapp-img-box-bg, #webapp-img-box').removeClass('animate-hide').addClass('animate-show');
      if (!(list = $('#webapp-img-box .webapp-box-header-ul:visible li')).find('.active').length){
        list.eq(0).trigger('click');
      }

      $.ajax({
        url: '/index.php?r=pc/InvitationData/GetCategory', 
        type: 'get',
        data: { type : 2 },
        dataType: 'json',
        success: function(data) {
          if (data.status !== 0) { alertTip(data.data); return; }
          var subCate = '';

          taglist = data.data;
          tab = content_wrap = '';
          taglist.length && $.each(taglist, function(index, tag){
            tab += '<li data-id="'+tag.cate_id+'" data-page="1">'+tag.name+'</li>';
            if(tag.cate.length) {
              subCate += '<div class="webapp-sub-cate" data-href='+tag.cate_id
                       + '><span data-id='+tag.cate_id+' data-page="1">全部</span>';
              $.each(tag.cate, function(key, cate){
                subCate += '<span data-id='+cate.cate_id+' data-page="1">'+cate.name+'</span>';
              });
              subCate += '</div>';
            }
            content_wrap += wrap_template;
          });
          $('#webapp-system-img .webapp-content-tab').append(tab).after(subCate + content_wrap);
          $('#webapp-img-box .resource-list-wrap').on('scroll', function(){
            webappImgBoxScroll($(this));
          });
        }
      });
    }
  });
}
// 获取资源框内容
function getImgResource(type, $clickTab, $ul){
  var page = Number($clickTab.attr('data-page')),
      para = {
        tag_id: $clickTab.attr('data-id')
        ,page: page
        ,page_size: 20
        ,user: $('#webapp-img-box .system-img-library').hasClass('active') ? 0 : 1
      };

  $.ajax({
    url: '/index.php?r=pc/UserTag/getImgList', 
    type: 'get',
    data: para,
    dataType: 'json',
    success: function(data){
      if(data.status !== 0) { alertTip(data.data); return; }
      var list = data.data,
          html = '';
      list.length && $.each(list, function(i, item){
        if ( type === 'audio'){
          html += '<li data-id="'+item.id+'" data-src="'+item.music+'"><span class="resource-name">'+item.title
              + '</span><div class="audio-play-pause"><i class="resource-audio-play">播放 </i><i class="resource-audio-pause">'
              + '暂停</i></div><div class="resource-remove"><span>×</span><div></li>';
        
        } else if (type === 'image') {
          html += '<li data-id="'+item.id+'" data-src="'+item.img_original+'">'
              + '<a href="javascript:;" title="" class="thumbnail"><img src="'
              + item.img_original +'"></a>'
              // + '<h5 class="img-title">'+item.name+'</h5>'
              + '<div class="img-operate">'
              // + '<a href="javascript:;" title="移动到其他分组" data-role="move"><span class="glyphicon glyphicon-move"></span></a>'
              // + '<a href="javascript:;" title="裁剪尺寸" data-role="truncate"><span class="glyphicon glyphicon-edit">裁剪</span></a>'
              + '<a href="javascript:;" title="删除" data-role="delete"><span class="glyphicon glyphicon-trash">删除</span></a></div></li>';
        }
      });
      page == 1 ? $ul.html(html) : $ul.append(html);
      $clickTab.attr('data-page', ++page);
      if (data.current_page >= data.total_page){
        $ul.parent().off('scroll');
      }
    }
  });
}
</script>