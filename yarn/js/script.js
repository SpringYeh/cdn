document.body.addEventListener('touchstart', function () { });
(function ($, window) {

	var App = App ||
	{
		init: function () {
			// 搜索
			$('.js-toggle-search').on('click', function () {
				$('.js-search').toggleClass('is-visible');
			});

			// 文章页面下图片 fancybox
			$('.js-gallery').find('a').each(function () {
				if ($(this).children('img').length) {
					$(this).attr('rel', 'gallery');
				}
			}).end().magnificPopup({
				delegate: '[rel="gallery"]',
				type: 'image',
				mainClass: 'mfp-with-zoom', // this class is for CSS animation below
				gallery: {
					enabled: true
				},

				zoom: {
					enabled: true,
					duration: 300, // duration of the effect, in milliseconds
					easing: 'ease-in-out', // CSS transition easing function
					opener: function (openerElement) {
						return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				}
			});

			// ajax加载后续文章（也已废弃）
			// $('.js-next a').on('click', function (e) {
			// 	$(infinite_scroll.contentSelector).infinitescroll(infinite_scroll);

			// 	var $body = $(document);
			// 	$body.scrollTop($body.scrollTop() - 2);
			// 	e.preventDefault();
			// })
		}
	};

	var EventUtil = {
		addHandler: function (element, type, handler) {
			if (element.addEventListener)
				element.addEventListener(type, handler, false);
			else if (element.attachEvent)
				element.attachEvent("on" + type, handler);
			else
				element["on" + type] = handler;
		},
		removeHandler: function (element, type, handler) {
			if (element.removeEventListener)
				element.removeEventListener(type, handler, false);
			else if (element.detachEvent)
				element.detachEvent("on" + type, handler);
			else
				element["on" + type] = handler;
		},
		/**
		 * 监听触摸的方向
		 * @param target            要绑定监听的目标元素
		 * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
		 * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
		 * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
		 * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
		 * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
		 */
		listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
			this.addHandler(target, "touchstart", handleTouchEvent);
			this.addHandler(target, "touchend", handleTouchEvent);
			this.addHandler(target, "touchmove", handleTouchEvent);
			var startX;
			var startY;
			function handleTouchEvent(event) {
				switch (event.type) {
					case "touchstart":
						startX = event.touches[0].pageX;
						startY = event.touches[0].pageY;
						break;
					case "touchend":
						var spanX = event.changedTouches[0].pageX - startX;
						var spanY = event.changedTouches[0].pageY - startY;

						if (Math.abs(spanX) > Math.abs(spanY)) {      //认定为水平方向滑动
							if (spanX > 30) {         //向右
								if (rightCallback)
									rightCallback();
							} else if (spanX < -30) { //向左
								if (leftCallback)
									leftCallback();
							}
						} else {                                    //认定为垂直方向滑动
							if (spanY > 30) {         //向下
								if (downCallback)
									downCallback();
							} else if (spanY < -30) {//向上
								if (upCallback)
									upCallback();
							}
						}

						break;
					case "touchmove":
						//阻止默认行为
						if (isPreventDefault)
							event.preventDefault();
						break;
				}
			}
		}
	};

	$(document).ready(function () {		// 原菜单（已废弃）
		//给菜单加hover事件
		// if($('.main-navigation #primary-menu>li.current_page_item:nth-child(1)').length){
		// 	$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/1.jpg')")
		// }
		// if($('.main-navigation #primary-menu>li.current_page_item:nth-child(2)').length){
		// 	$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/2.jpg')")
		// }
		// if($('.main-navigation #primary-menu>li.current_page_item:nth-child(3)').length){
		// 	$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/3.jpg')")
		// }
		// if($('.main-navigation #primary-menu>li.current_page_item:nth-child(4)').length){
		// 	$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/4.jpg')")
		// }
		$('.main-navigation #primary-menu>li:nth-child(1)').hover(
			function () {
				$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/1.jpg')")
			}
		)
		$('.main-navigation #primary-menu>li:nth-child(2)').hover(
			function () {
				$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/2.jpg')")
			}
		)
		$('.main-navigation #primary-menu>li:nth-child(3)').hover(
			function () {
				$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/3.jpg')")
			}
		)
		$('.main-navigation #primary-menu>li:nth-child(4)').hover(
			function () {
				$('.menu-bg').css('background-image', "url('https://cinzano.oss-cn-shanghai.aliyuncs.com/Yarn/bg/4.jpg')")
			}
		)

		//给评论框增加限高隐藏
		// $('.comment .body>:last-child').each(function () {
		// 	if ($(this).height() > 102) {
		// 		$(this).addClass('expand');
		// 	}
		// });
		// $('.comment .body').on('click', '.expand', function () {
		// 	$(this).removeClass('expand');
		// });

		//增加菜单点击作用域（原菜单）
		$('#primary-menu>li').click(function () {
			$("a", this)[0].click();
		});
		if ($(document).width() <= 760) {
			$('#primary-menu>li').unbind();
			$('.Yarn_Background, .p-header .p-image').css({
				'-moz-background-size': 'cover',
				'-o-background-size': 'none',
				'-webkit-background-size': 'none',
				'background-size': 'none',
				'overflow': 'hidden'
			});

		}
		var changeIcon = setInterval(function () {
			if ($('img[title="iPhone"]').length != 0) {
				$('img[title="iPhone"]').width(15);
			} else {
				clearInterval(changeIcon);
			};
		}, 1000);
		var arr;
		var obj;
		//修改 ua
		$('img[title="WebView"]').css('width', '15px');
		$('img[title="MIUI Browser"]').css('width', '14px');
		//滚动页面的高度到326时改变汉堡包的颜色
		var p = 0, t = 0, d_h = $(document).height(), w_h = $(window).height(), isImgLoad = false;
		$('img').load(function () {
			isImgLoad = true;
		})

		// 文章页面里左右两边上下文章书签（出现与隐藏）
		$(document).on("scroll touchmove", function (e) {
			//用 window.requestAnimationFrame（）让读操作和写操作分离，把所有的写操作放到下一次重新渲染。
			p = $(this).scrollTop();
			if (t <= p) { //下滚
				if ($(window).scrollTop() > 326) {
					$('.bt-nav .line').addClass('bt-nav-scroll');
					$('.music').addClass('music-scroll');
					// 			$('.js-toggle-search').addClass('bt-search-scroll ');
					// 			$('.bt-nav').addClass('scrolled');
				}
				if ($(window).scrollTop() > 200) {
					$('#NextPrevPosts').addClass('out');
				}
				if (isImgLoad && ((d_h - w_h) - $(this).scrollTop() < 16)) {
					$('#NextPrevPosts').removeClass('out');
				}
			} else { //上滚
				$('#NextPrevPosts').removeClass('out');
				if ($(window).scrollTop() < 326) {
					$('.bt-nav .line').removeClass('bt-nav-scroll');
					$('.music').removeClass('music-scroll');
					// 			$('.js-toggle-search').removeClass('bt-search-scroll ');
					// 			$('.bt-nav').removeClass('scrolled');
				}
			}
			setTimeout(function () {
				t = p;
			}, 0);
		});


		//up, right, down, left为四个回调函数，分别处理上下左右的滑动事件
		EventUtil.listenTouchDirection(
			document,
			false,
			function up() {
				$('#NextPrevPosts').removeClass('out');
			},
			false,
			function down() {
				if ($(window).scrollTop() > 200) {
					$('#NextPrevPosts').addClass('out');
				}
			},
			false
		);
		//设置文章标题动画效果 1







		POWERMODE.colorful = true; // ture 为启用礼花特效
		POWERMODE.shake = false; // false 为禁用震动特效
		document.body.addEventListener('input', POWERMODE);

		App.init();

		// animate
		AOS.init(/* {
		offset: 200,
		duration: 400,
		easing: 'ease-in-sine',
		delay: 100,
		} */);

		// Menu	scrolled
		$(window).scroll(function () {
			var mask = $('.bt-nav');

			if ($(this).scrollTop() > 1) {
				mask.addClass("scrolled");
			}
			else {
				mask.removeClass("scrolled");
			}
		});

		// Menu	pc view
		$('.navi').addClass('open');

		// $('.bt-nav').click(function () {
		// 	if ($(this).parent().hasClass('open') && $(this).parent().hasClass('close')) {
		// 		$('.navi').css('height', '12%');
		// 		$('.navi').css('width', '20%');
		// 		$('#main-menu>div').css('display', 'none');
		// 		$('#primary-menu').css('display', 'none');
		// 	}
		// 	else {
		// 		$('.navi').css('height', '100%');
		// 		$('.navi').css('width', '100%');
		// 		$('#main-menu>div').css('display', 'block');
		// 		$('#primary-menu').css('display', 'block');
		// 	}
		// 	$(this).parent().toggleClass(function () {
		// 		if ($(this).hasClass('open')) {
		// 			return 'close';
		// 		} else
		// 			if ($(this).hasClass('close')) {
		// 				return 'open';
		// 			}
		// 	});
		// });

		// Menu mobile view
		$('.main-navigation li.page_item_has_children, .main-navigation li.menu-item-has-children').prepend('<span class="menu-dropdown"><i class="iconfont">&#xe619;</i></span>');
		// Mobile nav button functionality
		$('.menu-dropdown').bind('click', function () {
			$(this).parent().toggleClass('open-page-item');
		});

		// Comments open botton
		$('.btn-slide').click(function () {
			$('#panel').slideToggle("slow");
			$(this).toggleClass("active"); return false;
		});

		// Social share open botton
		$("#social-share").click(function () {
			$("#social").toggleClass("visible").slideToggle(200);
		});

		// Ajaxnvai
		$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		$('#comments-navi a').live('click', function (e) {
			e.preventDefault();
			$.ajax({
				type: "GET",
				url: $(this).attr('href'),
				beforeSend: function () {
					$('#comments-navi').remove();
					$('ul.commentwrap').remove();
					$('#loading-comments').slideDown();
					$body.animate({ scrollTop: $('#comments-list-title').offset().top - 65 }, 800);
				},
				dataType: "html",
				success: function (out) {
					result = $(out).find('ul.commentwrap');
					nextlink = $(out).find('#comments-navi');
					$('#loading-comments').slideUp('fast');
					$('#loading-comments').after(result.fadeIn(500));
					$('ul.commentwrap').after(nextlink);
				}
			});
		});

		if ($('.welcome')[0]) {
			$('.author-info').hide();
			$('span.info-edit').click(function () {
				$('.author-info').toggle(200);
			});
		}

		// Make Ajax Search
		var input_search = $("#search-input");
		function makeAjaxSearch(result) {
			if (result.length == 0) {
				$("#search_filtered").empty().show().append('<li><a href="javascript:vold(0)"><strong> search none</strong></a></li>');
			} else {
				$("#search_filtered").empty().show();
				for (var i = 0; i < result.length; i++) $("#search_filtered").append('<li><a href="' + result[i]["url"] + '">' + result[i]["title"] + '</a></li>');
			}
		}

		var delaySearch; function startSearch() {
			$.ajax({
				type: "GET",
				url: home_url,
				data: "s=" + input_search.val(),
				dataType: 'json',
				success: function (result) {
					makeAjaxSearch(result);
					console.log(result);
				}
			});
		}

		var event_ajax_search = {
			bind_event: function () {
				input_search.bind('keyup', function (e) {
					if (input_search.val() != "" && e.keyCode != 40) {
						if (delaySearch) {
							clearTimeout(delaySearch)
						}
						delaySearch = setTimeout(startSearch, 200);
					}
					if (e.keyCode == 40) {
						search_filtered.moveable();
					}
				})
			},
			unbind_event: function () {
				input_search.unbind('keyup');
			}
		};

		var search_filtered = {
			moveable: function () {
				var current = 0;
				$('#search_filtered').find('a').eq(current).focus();
				$(document).bind("keydown.search_result", function (e) {
					if (e.keyCode == 40) {
						if (current >= $('#search_filtered').find('a').size()) {
							current = 0;
						} $('#search_filtered').find('a').eq(++current).focus();
						e.preventDefault();
					}
					if (e.keyCode == 38) {
						if (current < 0) {
							current = $('#search_filtered').find('a').size() - 1;
						} $('#search_filtered').find('a').eq(--current).focus();
						e.preventDefault();
					}
				});
			},
			hide: function () {
				$(document).unbind("keyup.search_result");
				$('#search_filtered').fadeOut();
			}
		};
		input_search.focus(function () {
			event_ajax_search.bind_event();
		}).blur(function () {
			event_ajax_search.unbind_event();
		});

		$(document).click(function (event) {
			var _con = $('#search-container');
			if (!_con.is(event.target) && _con.has(event.target).length === 0) {
				$('#search_filtered').slideUp('fast');
			}
		});

		// CollagePlus Plugin for gallery
		collage();

		function collage() {
			$('.gallery.gallery-columns-1').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 800 }
			); $('.gallery.gallery-columns-2').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 700 }
			); $('.gallery.gallery-columns-3').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 520 }
			); $('.gallery.gallery-columns-4').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 480 }
			); $('.gallery.gallery-columns-5').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 360 }
			); $('.gallery.gallery-columns-6').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 280 }
			); $('.gallery.gallery-columns-7').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 200 }
			); $('.gallery.gallery-columns-8').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 100 }
			); $('.gallery.gallery-columns-9').removeWhitespace().collagePlus({ 'fadeSpeed': 1000, 'targetHeight': 80 }
			)
		}

		// browser window is resized
		var resizeTimer = null;
		$(window).bind('resize', function () {
			$('.gallery .gallery-item').css("opacity", 0.5);
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(collage, 100)
		});



		// lazyload
		// $(function () {
		// 	// 在图片距离屏幕100px时提前载入
		// 	$('img').lazyload({ threshold: 180, effect: "fadeIn" });
		// });


		//scrollbar（from 素锦）
		$(window).on('scroll', function () {
			if ($('.scrollbar').length) {
				var wt = $(window).scrollTop(),
					tw = $('#main-container').width(),
					dh = document.body.scrollHeight,
					wh = $(window).height();
				var width = tw / (dh - wh) * wt;
				$('.scrollbar').width(width);
			}
		});

		//lab data-aos [left,right]
		!function () {
			$('.laboratory-page-step').each(function (index) {
				var div = $(this).children('.laboratory-page-img');
				if (index % 2 == 0) {
					div.attr('data-aos', 'fade-right');
				} else {
					div.attr('data-aos', 'fade-left');
				}
			})
		}();

	});


	// nav （from 行者的故事）
	$(document).ready(function () {
		var navToggle = $('.bt-nav'),
			nav = $('nav'),
			navLinks = nav.find('a');

		navToggle.on('click', function () {
			$(this).parent().toggleClass(function () {
				if ($(this).hasClass('open')) {
					return 'close';
				} else
					if ($(this).hasClass('close')) {
						return 'open';
					}
			});
			navToggle.toggleClass('active');
			nav.toggleClass('open');
			return false;
		});

		navLinks.on('click', function () {
			navToggle.toggleClass('active');
			nav.toggleClass('open');
		});

		$(document).on('click', function () {
			if (nav.hasClass('open')) {
				navToggle.toggleClass('active');
				nav.toggleClass('open');

				navToggle.parent().toggleClass(function () {
					if ($(this).hasClass('open')) {
						return 'close';
					} else
						if ($(this).hasClass('close')) {
							return 'open';
						}
				});
			}
		});
	});

	// load (标题文字特效和Yarn折扇 在load完成后再出现效果较好)
	window.addEventListener('load', function () {
		//loader
		$('body').removeClass('loader');

		//设置文章标题动画效果 2
		function textTitle(parameter) {
			var typewriter = {
				id: parameter.id,
				str: parameter.str,
				effect: parameter.effect,
				speed: parameter.speed
			}
			arr = [];
			for (var i = 0; i < typewriter.str.length; i++) {
				arr[i] = typewriter.str[i];
				/* 下面是原版代码 */
				// if(typewriter.str[i] == ' '){
				// 	arr[i] = '&nbsp;';
				// }else{
				// 	arr[i] = typewriter.str[i];
				// }
			}
			var num = 0;
			$(parameter.id).text('');
			obj = setInterval(function () {
				var randomN = Math.floor(Math.random() * 3) + 1;
				var eff = null;
				if (randomN === 1) {
					eff = "fadeInRightBig";
				}
				if (randomN === 2) {
					eff = "fadeInLeftBig";
				}
				// if (randomN === 3) {
				//     eff = "fadeInUpBig";
				// }
				if (randomN === 3) {
					eff = "fadeInDownBig";
				}
				if (typewriter.effect === "normal") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip">' + arr[num] + '</span>');
				} else if (typewriter.effect === "rightBig") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInRightBig">' + arr[num] + '</span>');
				} else if (typewriter.effect === "right") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInRight">' + arr[num] + '</span>');
				} else if (typewriter.effect === "leftBig") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInLeftBig">' + arr[num] + '</span>');
				} else if (typewriter.effect === "left") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInLeft">' + arr[num] + '</span>');
				} else if (typewriter.effect === "downBig") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInDownBig">' + arr[num] + '</span>');
				} else if (typewriter.effect === "down") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInDown">' + arr[num] + '</span>');
				} else if (typewriter.effect === "upBig") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInUpBig">' + arr[num] + '</span>');
				} else if (typewriter.effect === "up") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated fadeInUp">' + arr[num] + '</span>');
				} else if (typewriter.effect === "random") {
					$(parameter.id).append('<span style="display: inline-block;" class="tip animated ' + eff + '">' + arr[num] + '</span>');
				}
				num++
				if (num === arr.length) {
					clearInterval(obj);
				}
			}, typewriter.speed);
		}
		if ($('.post_title').text()) {
			textTitle({
				id: '.post_title',
				str: $('.post_title').text(),
				effect: 'random',
				speed: 150,
			});
		}
		if ($('.blog-description p').text()) {
			textTitle({
				id: '.blog-description p',
				str: $('.blog-description p').text(),
				effect: 'right',
				speed: 150,
			});
		}

		// Waypoints  ： Yarn 折扇特效控制
		waypointsInit();

		// Init waypoints for header and footer animations
		function waypointsInit() {
			$('#masthead').waypoint(function (direction) {
				$(this).addClass('animation-on');
			});

			$('#main').waypoint(function (direction) {
				$('#masthead').toggleClass('animation-on');
			});

			$('#footer').waypoint(function (direction) {
				$(this).addClass('animation-on');
			}, { offset: 'bottom-in-view' });
		}

		$(document).on('scroll', function () {
			if ($(document).height() - $(window).height() - $(window).scrollTop() < 30) {
				$('#footer').addClass('animation-on');
			} else {
				$('#footer').removeClass('animation-on');
			}
		});

		//music
		!function () {
			var p = $('#Diaspora-audio');
			if (!p.length) {
				$('.icon-play').css({
					'color': '#dedede',
					'cursor': 'not-allowed'
				})
				return
			}
			var sourceSrc = $("#Diaspora-audio source").eq(0).attr('src')
			if (sourceSrc == '' && p[0].src == '') {
				audiolist = $('#audio-list li');
				mp3 = audiolist.eq([Math.floor(Math.random() * audiolist.size())])
				p[0].src = mp3.data('url')
			}
			if (p.eq(0).data("autoplay") == true) {
				p[0].play();
			}
			p.on({
				// 'timeupdate': function () {
				// 	p[0].volume = 0;
				// 	var progress = p[0].currentTime / p[0].duration * 100;
				// 	// $('.bar').css('width', progress + '%');
				// 	if (progress / 5 <= 1) {
				// 		p[0].volume = progress / 5;
				// 	} else {
				// 		p[0].volume = 1;
				// 	}
				// },
				'ended': function () {
					$('.icon-pause').css('display', 'none');
					$('.icon-play').css('display', 'block');
				},
				'playing': function () {
					$('.icon-play').css('display', 'none');
					$('.icon-pause').css('display', 'block');
				}
			})
		}();
		$('body').on('click', function (e) {
			var tag = $(e.target).attr('class') || '';
			// audio play
			if (tag.indexOf('icon-play') != -1) {
				$('#Diaspora-audio')[0].play()
				$('.icon-play').css('display', 'none');
				$('.icon-pause').css('display', 'block');
			}
			// audio pause
			if (tag.indexOf('icon-pause') != -1) {
				$('#Diaspora-audio')[0].pause()
				$('.icon-pause').css('display', 'none');
				$('.icon-play').css('display', 'block');
			}
		});

	});


}(jQuery, window));



// window.addEventListener("load", () => {


// 	loadIns(error => {
// 		console.log(error)
// 	}, datas => {
// 		insImages = datas
// 		// insImages.forEach((item, index) => {
// 		// 	insList.appendChild(createInsItem(item, index))
// 		// })
// 	}, () => {
// 		// loading.remove()
// 		// loading = null
// 	})


// })

// function loadIns(error, success, done) {
// 	// 原生AJAX对象
// 	const request = new (window.XMLHttpRequest || window.ActiveXObject)()
// 	request.open("GET", "")
// 	console.log(request)
// 	request.onload = () => success(JSON.parse(request.responseText))
// 	request.onerror = err => error(err)
// 	request.onloadend = () => done()
// 	request.send()
// }