  /*换屏*/
  var $pages = $(".page_box");
  var $pageBtns = $(".page_btns a");
  var pageLen = $pages.length;
  var pageCur = 0;
  var changeTime = 500;
  var isChanging = false;
  var aniClass = "top_to_mid mid_to_top bot_to_mid mid_to_bot";

  function isCss3() {
    var style = document.createElement("div").style;
    for (var k in style) {
      if (k.toLowerCase().indexOf("animation") != -1) {
        return true;
      }
    }
    return false;
  };

  function changeCallback(idx) {
    $pages.eq(pageCur).removeClass("show");
    pageCur = idx;
    isChanging = false;
  }

  function pageChange(idx) {
    if (idx == pageCur) return;
    if (!isChanging) {
      isChanging = true;
      $pages.eq(idx).addClass("show");
      $pageBtns.removeClass("cur").eq(idx).addClass("cur");
      if (isCss3) {
        $pages.eq(idx).removeClass(aniClass);
        $pages.eq(pageCur).removeClass(aniClass);
        if (idx < pageCur) {
          $pages.eq(idx).addClass("top_to_mid");
          $pages.eq(pageCur).addClass("mid_to_bot");
        } else if (idx > pageCur) {
          $pages.eq(idx).addClass("bot_to_mid");
          $pages.eq(pageCur).addClass("mid_to_top");
        }
      } else {
        if (idx < pageCur) {
          $pages.eq(idx).css("top", "-100%").animate({
            top: "0"
          }, changeTime);
          $pages.eq(pageCur).css("top", "0").animate({
            top: "100%"
          }, changeTime);
        } else if (idx > pageCur) {
          $pages.eq(idx).css("top", "100%").animate({
            top: "0"
          }, changeTime);
          $pages.eq(pageCur).css("top", "0").animate({
            top: "-100%"
          }, changeTime);
        }
      }
      setTimeout(function(idx) {
        return function() {
          changeCallback(idx)
        };
      }(idx), changeTime);
    }
  }
  $(document).on("mousewheel DOMMouseScroll", function(event) {
    var sd = event.originalEvent.wheelDelta || event.originalEvent.detail * -1;
    if (sd > 0) {
      if (pageCur > 0) {
        pageChange((pageCur + pageLen - 1) % pageLen);
      }
    } else {
      pageChange((pageCur + 1) % pageLen);
    }
  });
  $(".pop_feedback").on("mousewheel DOMMouseScroll", function(event) {
    event.stopPropagation();
  });

  $pageBtns.on("mouseenter", function() {
    pageChange($pageBtns.index($(this)));
  });

  $(".ic_pagearr").click(function() {
      pageChange(1);
    })
    //导航事件

  var $moreNav = $("#more_nav");
  $(".nav_list").on("mouseenter", function() {
    $moreNav.addClass("show");
  }).on("mouseleave", function() {
    $moreNav.removeClass("show");
  });