		$(function(){
			var options = {
		        useEasing : true, 
		        useGrouping : false, 
		        separator : ',', 
		        decimal : '.', 
		    };
			var lk_num = new CountUp("lk-num", 0, 18.18, 2, 1.5, options);

			$('.chb-item .icon-sticker').on('click', function(){
				var $this = $(this);
				$this.parents('.chb-item').removeClass('again');
				$this.parents('.chb-item').addClass('on');
				$('.chb-item .body-lk .num em').attr('id', '');
				$('.chb-item .body-cash .num em').attr('id', '');
				$this.parents('.chb-item').find('.body-lk .num em').attr('id', 'lk-get');
				$this.parents('.chb-item').find('.body-cash .num em').attr('id', 'cash-get');

				var lk_get = new CountUp("lk-get", 0, 1.5, 2, 1.5, options),
					cash_get = new CountUp("cash-get", 0, 3.88, 2, 1.5, options);

				// 如果还有红包未拆
				setTimeout(function(){
					$this.parents('.chb-item').addClass('again');
				},4000);

				// 链克动画演示
				setTimeout(function() {
                    var lk_start_X = $this.parents('.chb-hb').offset().left + 33 ;
                        lk_start_Y = $this.parents('.chb-hb').offset().top + 1;
                        lk_end_X = $('.chb-info .info-data .data-num').offset().left + 50;
                        lk_end_Y = $('.chb-info .info-data .data-num').offset().top - 62;
                        lk = $('<div class="lkfly">8.18</div>');

                    $('.layout-body').append(lk);
                    lk.css({left: lk_start_X, top: lk_start_Y, 'animation': 'none'});

                    setTimeout(function() {
                    	var mpath = new $.path.bezier({
						    start: {x:lk_start_X, y:lk_start_Y, angle: -300, length:1, opacity:1},
						    end:{x:lk_end_X, y:lk_end_Y, angle: 0,length:0, opacity:0}
						});
						lk.animate({
							path: mpath, 
							opacity: '0',
						}, 1000, function(){
							$(this).remove();

                            // 数字增长动画
                            lk_num.start();
						});
                    }, 500);
                },1800);

				// 红包飞动动效演示
                setTimeout(function() {
                    var hb_start_X = $this.parents('.chb-hb').offset().left + 32 ;
                        hb_start_Y = $this.parents('.chb-hb').offset().top + 1;
                        hb_end_X = $('.timenav .hb').offset().left + 50;
                        hb_end_Y = $('.timenav .hb').offset().top - 20;
                        hb = $('<div class="hbfly">8.18</div>');

                    $('.layout-body').append(hb);
                    hb.css({left: hb_start_X, top: hb_start_Y, 'animation': 'none'});

                    setTimeout(function() {
                    	var mpath = new $.path.bezier({
						    start: {x:hb_start_X, y:hb_start_Y, angle: -300, length:1, opacity:1},
						    end:{x:hb_end_X, y:hb_end_Y, angle: 0,length:0, opacity:0}
						});
						hb.animate({
							path: mpath, 
							opacity: '0',
						}, 1000, function(){
							$(this).remove();
							lk_get.start();
							cash_get.start();
						});
                    }, 500);
                },2800);
			});

            // 红包‘再拆一个’动效
            $('.chb-wh .btn02').on('click', function(){
                var $this = $(this);
                $this.parents('.chb-item').addClass('close').removeClass('again');
                setTimeout(function(){
                    $this.parents('.chb-item').removeClass('close on');
                },1400);
            });

            // 刮卡准备动画
            var shuffling = false;  // 是否正在洗牌，防止多重点击
			$('.scpanel .scpanel-act .btn').on('click', function(){
                if(!shuffling){
                    shuffling = true;
                    $('.scpanel .scpanel-bd li').removeClass('active').removeClass('shuffle');
                    $('.scpanel .scpanel-bd li .sc-back').css('display', 'block');
                    $('.scpanel .scpanel-bd').addClass('ready');
                    // 洗牌动画
                    var w = 147, h = 110, m = 4;
                    var mw = w + m, mh = h + m;
                    $('.scpanel .scpanel-bd li').each(function(index, ele){
                        $(ele).children('img').attr('src', 'images/sc/sc' + ($(ele).index() + 1) + '.png');
                        var row = Math.floor(index / 4),
                            col = (index % 4),
                            left = $(ele).position().left,
                            top = $(ele).position().top;
                        $(ele).animate({
                            'top': ((1 - row) * mh + top),
                            'left': ((1.5 - col) * mw + left)
                        }, function(){
                            $(ele).addClass('shuffle');
                        });
                        setTimeout(function(){
                            $(ele).animate({
                                'top': top,
                                'left': left
                            });
                            shuffling = false;
                        },1200);
                    });
                }
			});

            var index = 0;  // 已刮卡的数量
            var scratching = false; // 是否正在刮卡，防止重复刮卡
			$('.scpanel .scpanel-bd li').on('click', function(){
                if(!scratching) {
                    scratching = true;
                    $(this).addClass('active');
                    $(this).children('.sc-back').fadeOut(1000,function(){scratching = false;});
                    index++;
                    // 当刮了6个后，其余自动展开
                    if(index == 6) {
                        setTimeout(function(){
                            $('.scpanel .scpanel-bd li .sc-back').fadeOut(1000);
                            $('.scpanel .scpanel-bd li:not(.active)').each(function(index, ele){
                                $(ele).children('img').attr('src', 'images/sc/sc' + ($(ele).index() + 1) + '-disabled.png');
                            });
                            index = 0;
                        },500);
                    }
                }
			})

		});