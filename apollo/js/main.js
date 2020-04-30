((function () {
    var callbacks = [],
        timeLimit = 50,
        open = false;
    // setInterval(loop, 1);
    return {
        addListener: function (fn) {
            callbacks.push(fn);
        },
        cancleListenr: function (fn) {
            callbacks = callbacks.filter(function (v) {
                return v !== fn;
            });
        }
    }

    function loop() {
        var startTime = new Date();
        debugger;
        if (new Date() - startTime > timeLimit) {
            if (!open) {
                callbacks.forEach(function (fn) {
                    fn.call(null);
                });
            }
            open = true;
            window.stop();
            alert('dalao,憋扒了！');
            document.body.innerHTML = "";
        } else {
            open = false;
        }
    }

})()).addListener(function () {
    window.location.reload();
});



window.$ = jQuery;

// 使用pjax
$('body').pjax('a[target!=_blank]', {
    container: '#pjax-container',
    fragment: '#pjax-container',
    timeout: 8000
}).on('pjax:send', function () {
    // $('.loader').css('opacity', '1');
    // $('.loader').css('z-index', '10001');
    inner_loading()
}).on('pjax:complete', function () {
    init();
    // AOS.init();
    toggleSidebar();
    tocBot();
    shrinkAuthor();
    // Annie_NiceScroll();
    setInterval(function () {
        $("#site_run_time").html(run_date("2018/3/24"));
    }, 1000);
    const dplayer = document.querySelectorAll(".dplayer");
    dplayer && initDPlayer(dplayer);
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
    //启动 mermaid
    document.querySelectorAll('pre.mermaid').forEach(() => {
        mermaid.init();
    });
    if ($('div').hasClass('poem-wrap')) {
        getpoem()
    }
}).on('pjax:end', function () {
    // theiaStickySidebar - 右侧侧边栏
    $('.sidebar').theiaStickySidebar({
        additionalMarginTop: 20,
        additionalMarginBottom: 20
    });
    // theiaStickySidebar - author页左侧侧边栏
    $('.sidebar-author').theiaStickySidebar({
        additionalMarginTop: 100,
        additionalMarginBottom: 20
    });
    // $('.loader').css('opacity', '0');
    // $('.loader').css('z-index', '-1');
    inner_loaded();
})



/****************************
 * 博客初始化
 *****************************/
function init() {
    // theiaStickySidebar - 右侧侧边栏
    $('.sidebar').theiaStickySidebar({
        additionalMarginTop: 20,
        additionalMarginBottom: 20
    });
    // theiaStickySidebar - author页左侧侧边栏
    $('.sidebar-author').theiaStickySidebar({
        additionalMarginTop: 100,
        additionalMarginBottom: 20
    });
    // * owl.carousel 幻灯片
    $(function () {
        $('#owl-banner').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayHoverPause: true
        });
    });
    var pointHeight = $('#pjax-container').height();
    $('.points').css('height', pointHeight);
    if ($('#rainbowPoint').attr('data') == 'off') {
        $('body').find('.points').hide();
    } else {
        $('body').find('.points').show();
    }
    if ($('#heartOffOn').attr('data') == 'off') {
        $('body').find('#red-heart').hide();
    } else {
        $('body').find('#red-heart').show();
    }
    //初始化Archive Page 每月文章数量
    $('.al_mon').each(function () {
        var num = $(this).next().children('li').length;
        $(this).find('#post-num').text(num);
    })
    //初始化valine 评论
    if ($('#vc-block').length > 0) {
        new Valine({
            av: AV,
            el: '#vcomments',
            emoticon_url: 'https://cloud.panjunwen.com/alu',
            emoticon_list: ["吐.png", "喷血.png", "狂汗.png", "不说话.png", "汗.png", "坐等.png", "献花.png", "不高兴.png", "中刀.png", "害羞.png", "皱眉.png", "小眼睛.png", "中指.png", "尴尬.png", "瞅你.png", "想一想.png", "中枪.png", "得意.png", "肿包.png", "扇耳光.png", "亲亲.png", "惊喜.png", "脸红.png", "无所谓.png", "便便.png", "愤怒.png", "蜡烛.png", "献黄瓜.png", "内伤.png", "投降.png", "观察.png", "看不见.png", "击掌.png", "抠鼻.png", "邪恶.png", "看热闹.png", "口水.png", "抽烟.png", "锁眉.png", "装大款.png", "吐舌.png", "无奈.png", "长草.png", "赞一个.png", "呲牙.png", "无语.png", "阴暗.png", "不出所料.png", "咽气.png", "期待.png", "高兴.png", "吐血倒地.png", "哭泣.png", "欢呼.png", "黑线.png", "喜极而泣.png", "喷水.png", "深思.png", "鼓掌.png", "暗地观察.png"],
            app_id: 'JJ622U1oUpMeJpbCgps1EwV9-MdYXbMMI',
            app_key: 'FtBjhGaTWOgLi7C8Rtk6UvTK',
            placeholder: '你是我一生只会遇见一次的惊喜 ：）',
            notify: false,
            verify: false
        });
    }

}
init();

// 内部load动画（启动）
function inner_loading() {
    var w = window.innerWidth;
    var css = '<style class="loaderstyle" id="loaderstyle' + w + '">' +
        '@-moz-keyframes loader' + w + '{100%{background-position:' + w + 'px 0}}' +
        '@-webkit-keyframes loader' + w + '{100%{background-position:' + w + 'px 0}}' +
        '.loader' + w + '{-webkit-animation:loader' + w + ' 3s linear infinite;-moz-animation:loader' + w + ' 3s linear infinite;}' +
        '</style>';
    $('.loaderstyle').remove()
    $('head').append(css)
    $('#load-inner').removeClass().addClass('loader' + w).show()
}
// 内部load动画（结束）
function inner_loaded() {
    $('#load-inner').removeClass().hide()
}

// 今日诗词
function getpoem() {
    jinrishici.load(function (result) {
        var sentence = document.querySelector("#poem");
        var info = document.querySelector("#poem_info");
        sentence.innerHTML = result.data.content;
        info.innerHTML = '《' + result.data.origin.title + '》' + '—【' + result.data.origin.dynasty + '】' + result.data.origin.author;
    });
}
if ($('div').hasClass('poem-wrap')) {
    getpoem()
}

// 夜间模式(换了素锦logo法，所以不需要下面那4行了)
function lightMode() {
    document.body.classList.remove('nice-dark-mode');
    // $('.logo-dark').removeClass('d-inline-block')
    // $('.logo-dark').addClass('d-none')
    // $('.logo-light').removeClass('d-none')
    // $('.logo-light').addClass('d-inline-block')
}
function darkMode() {
    document.body.classList.add('nice-dark-mode');
    // $('.logo-dark').removeClass('d-none')
    // $('.logo-dark').addClass('d-inline-block')
    // $('.logo-light').removeClass('d-inline-block')
    // $('.logo-light').addClass('d-none')
}

// 根据时间来判断是否启动夜间模式
(function () {
    // 第一次打开网页，根据时间来确认模式并设置cookie
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() >= 19 || new Date().getHours() < 7) {
            darkMode()
            document.cookie = "night=1;path=/";
            // console.log('夜间模式开启');
            // ks.notice("夜间模式开启", {
            //     color: "blue",
            //     time: 1500
            // });
        } else {
            lightMode()
            document.cookie = "night=0;path=/";
            // console.log('夜间模式关闭');
            // ks.notice("夜间模式关闭", {
            //     color: "yellow",
            //     time: 1500
            // });
        }
    } else {    //第n次打开则根据存储的cookie来确认模式
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
            lightMode()
        } else if (night == '1') {
            darkMode()
        }
    }
})();


// 按钮切换夜间模式
function toggleDarkMode() {
    $('body').toggleClass('nice-dark-mode')
    if (!$('body').hasClass('nice-dark-mode')) {
        document.cookie = "night=0;path=/";
        // $('.logo-dark').removeClass('d-inline-block')
        // $('.logo-dark').addClass('d-none')
        // $('.logo-light').removeClass('d-none')
        // $('.logo-light').addClass('d-inline-block')
    } else {
        document.cookie = "night=1;path=/";
        // $('.logo-dark').removeClass('d-none')
        // $('.logo-dark').addClass('d-inline-block')
        // $('.logo-light').removeClass('d-inline-block')
        // $('.logo-light').addClass('d-none')
    }
}





// mobile Sidebar
function toggleSidebar() {
    $('.sidebar-close, .mobile-overlay').on('click', function () {
        $('body').removeClass('modal-open');
        $('.mobile-sidebar').removeClass('active');
        $('.mobile-overlay').removeClass('active');
    });
    $('#sidebarCollapse').on('click', function () {
        $('body').addClass('modal-open');
        $('.mobile-sidebar').addClass('active');
        $('.mobile-overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    var nav = $('.mobile-sidebar'),
        navLinks = nav.find('a.menu_link');
    navLinks.on('click', function () {
        $('body').removeClass('modal-open');
        $('.mobile-sidebar').removeClass('active');
        $('.mobile-overlay').removeClass('active');
    });
}

//文章目录合集控制
$(document).on('click', '.btn-post-toc', function () {
    $('#toc').addClass('active');
    $('#topic').removeClass('active');
    $('#toc').css('display', 'block');
    $('#topic').css('display', 'none');
    $('.btn-post-toc').addClass('sidebar-nav-active');
    $('.btn-topic-toc').removeClass('sidebar-nav-active');
});
$(document).on('click', '.btn-topic-toc', function () {
    $('#toc').removeClass('active');
    $('#topic').addClass('active');
    $('#toc').css('display', 'none');
    $('#topic').css('display', 'block');
    $('.btn-post-toc').removeClass('sidebar-nav-active');
    $('.btn-topic-toc').addClass('sidebar-nav-active');
});


// 版权信息
function copyright() {
    if ($('.post').length > 0) {
        document.body.addEventListener('copy', function (e) {
            if (window.getSelection().toString() && window.getSelection().toString().length > 200) {
                setClipboardText(e);
                ks.notice("复制成功！本文内容仅供学习浏览，禁止一切形式的转载", {
                    color: "green",
                    time: 3000
                });
            }
        });
        function setClipboardText(event) {
            var clipboardData = event.clipboardData || window.clipboardData;
            if (clipboardData) {
                event.preventDefault();
                var htmlData = '' + '著作权归原作者所有。<br>'
                    + '本文内容仅供学习浏览，禁止一切形式的转载。<br>'
                    + '作者:' + ' 叶凡' + '<br>'
                    + '链接:' + window.location.href + '<br>'
                    + '来源:' + ' 若邪' + '<br><br>' + window.getSelection().toString();
                var textData = '' + '著作权归原作者所有。\n'
                    + '本文内容仅供学习浏览，禁止一切形式的转载。\n'
                    + '作者:' + ' 叶凡' + '\n'
                    + '链接: ' + window.location.href + '\n'
                    + '来源:' + ' 若邪' + '\n\n' + window.getSelection().toString();
                clipboardData.setData('text/html', htmlData);
                clipboardData.setData('text/plain', textData);
            }
        }
    }
}
copyright();


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



jQuery(document).ready(function ($) {
    toggleSidebar();

    // 第二次原‘至顶’
    $(window).scroll(function () {
        var $window = $(window),
            $window_width = $window.width(),
            $window_height = $window.height(),
            scroll = $window.scrollTop(),
            startPoint = $window_height / 1.5,
            scrTopBtn = $("#nice-back-to-top");
        //iPad及以上都能召唤
        if (scroll >= startPoint && $window_width >= 1024) {
            scrTopBtn.addClass('active');
        } else if (scroll >= 200 && $window_width >= 768 && $window_width < 1024) {
            scrTopBtn.addClass('active');
        } else {
            scrTopBtn.removeClass('active');
        }
    });
    $("#nice-back-to-top").on('click',
        function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        }
    );

    (function () {
        'use strict';
        var handler = () => {
            var scrollTop = $(window).scrollTop(),
                docHeight = $(document).height(),
                winHeight = $(window).height(),
                scrollPercent = (scrollTop) / (docHeight - winHeight),
                scrollPercentRounded = Math.round(scrollPercent * 100);
            $('#progress-ball').find('.percentage').html(scrollPercentRounded + '%');
            $('#progress-ball').find('.flow').css('height', scrollPercentRounded + '%');
        };
        window.addEventListener('scroll', handler, false);
    })();

    // 一键到最底,按钮在header setting盒子
    $("#go-to-bottom").on('click', function () {
        backToBottom()
    });

    // 一键到最底
    function backToBottom() {
        var H = $('body').height(),
            bottom = H - $(window).height();
        $('html, body').animate({
            scrollTop: bottom
        }, 'slow');
        return false;
    }




    //原 back to top
    // $(window).scroll(function () {
    //     var $window = $(window),
    //         $window_width = $window.width();

    //     if ($(this).scrollTop() > 200 && $window_width >= 1024) {
    //         $('#scroll_to_top').filter(':hidden').fadeIn('fast');
    //     } else {
    //         $('#scroll_to_top').filter(':visible').fadeOut('fast');
    //     }
    // });
    // $('#scroll_to_top').on('click',
    //     function () {
    //         $('html, body').animate({
    //             scrollTop: 0
    //         },
    //             'slow');
    //         return false;
    //     });

    // Smooth scrolling using jQuery easing
    // $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //         var target = $(this.hash);
    //         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //         if (target.length) {
    //             $('html, body').animate({
    //                 scrollTop: (target.offset().top - 60)
    //             }, 1000, "easeInOutExpo");
    //             return false;
    //         }
    //     }
    // });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
        $('.tooltip').addClass('animated fadeIn');
    })




    if ($(".main-menu li").hasClass("menu-item-has-children")) {
        $('.main-menu .menu-item-has-children').prepend('<span class="icon-sub-menu"><i class="iconfont icon-arrow-down-s-line"></i></span>')
    };
    $('.mobile-sidebar-menu .menu-item-has-children > a').append('<div class="dropdown-sub-menu"><span class="iconfont icon-arrow-drop-down-fill"></span></div>'),
        $('.dropdown-sub-menu').on("click",
            function () {
                $(this).parents('li').children('.sub-menu').slideToggle(),
                    $(this).parents('li').children('.dropdown-sub-menu').toggleClass('current')
            });

    //文章二维码
    $(document).on('click', '.qrcode-popup', function (event) {
        event.preventDefault();
        var title = $(this).data("title");
        var desc = $(this).data("desc");
        var html = '<div class="text-center"><h6 class="py-1">' + title + '</h6>\
                    <div class="text-muted text-sm mb-2" > '+ desc + ' </div>\
                    <div id="qr"></div>\
                    </div>';
        ncPopup('small', html);
        $('#qr').qrcode({ width: 200, height: 200, text: location.href });
    });


    $(document).on('click', '.single-popup', function (event) {
        event.preventDefault();
        var img = $(this).data("img");
        var title = $(this).data("title");
        var desc = $(this).data("desc");
        var html = '<div class="text-center"><h6 class="py-1">' + title + '</h6>\
                    <div class="text-muted text-sm mb-2" > '+ desc + ' </div>\
                    <img src="' + img + '" alt="' + title + '" style="width:100%;height:auto;">\
                    </div>'
        ncPopup('small', html)
    });
    $(document).on('click', '.plus-power-popup', function (event) {
        event.preventDefault();
        var $this = $('#plus-power-popup-wrap');
        ncPopup('no-padding', $this.html())
    });
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    function givenElementInViewport(el, fn) {
        return function () {
            if (isElementInViewport(el)) {
                fn.call();
            }
        }
    }
    function addViewportEvent(el, fn) {
        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', givenElementInViewport(el, fn), false);
            addEventListener('load', givenElementInViewport(el, fn), false);
            addEventListener('scroll', givenElementInViewport(el, fn), false);
            addEventListener('resize', givenElementInViewport(el, fn), false);
        } else if (window.attachEvent) {
            attachEvent('DOMContentLoaded', givenElementInViewport(el, fn));
            attachEvent('load', givenElementInViewport(el, fn));
            attachEvent('scroll', givenElementInViewport(el, fn));
            attachEvent('resize', givenElementInViewport(el, fn));
        }
    }

    if ($('.list-ajax-load').length > 0) {
        addViewportEvent(document.querySelector('.list-ajax-load'), function () {
            if ($('.dposts-ajax-load').data('comments') == 'comments') {
                return false;
            }

            if ($('.list-ajax-load').hasClass('loading') === false) {
                var data = $('.dposts-ajax-load').data();
                if ($('.dposts-ajax-load').data('paged') <= 3) {
                    $('.list-ajax-load').addClass('loading');
                    ajax_load_posts($('.dposts-ajax-load').data());
                }

            }

        });
    }


    $(document).on('click', '.nav-switch-dark-mode', function (event) {
        // var f = $('body').hasClass('nice-dark-mode') === true ? 'off' : 'on';
        // 添加昼夜切换转场动画 start
        $('<div class="dark-mode-sky"><div class="dark-mode-planet"></div></div>').appendTo($("body"));
        setTimeout(function () {
            toggleDarkMode();
            setTimeout(function () {
                $(".dark-mode-sky").fadeOut(1000, function () {
                    $(this).remove()
                })
            }, 2000);
        }, 50);
        // 添加昼夜切换转场动画 end
    });
    // 现分享
    $(document).on('click', '.btn-share-toggler', function (event) {
        event.preventDefault();
        ncPopup('middle', $('#single-share-template').html());
    });

});




//滚动条美化插件
var Annie_NiceScroll = function () {
    if (screen.width > 1024) {
        var niceScrollId = 'body, .local-search-popup',
            niceScrollSetting = $(niceScrollId).niceScroll({
                cursorborder: "none",
                autohidemode: true
            });

        // PLUGIN: js/resizediv.js已加到nicescroll.js后面
        $(niceScrollId).resize(function (event) {
            setTimeout(function () {
                niceScrollSetting.resize();
            }, 2);
        });
    }
};
// Annie_NiceScroll();



// 萌萌哒计时
function add_zero(num) {   //分钟、秒等数字 单位时补零
    return (num.toString().length < 2) ? '0' + num : num;
}
function run_date(date) {
    var created = Date.parse(date);
    var now = new Date().getTime();
    var cha = now - created;
    var day = cha / 864e5;
    var day_c = Math.floor(day);
    var hour = 24 * (day - day_c);
    var hour_c = Math.floor(hour);
    var min = 60 * (hour - hour_c);
    var min_c = Math.floor(min);
    var sec = Math.floor(60 * (min - min_c));
    return "( •̀ ω •́ ) 已被续 <a>" + day_c + "</a> 天 <a>" + hour_c + "</a> 小时 <a>" + add_zero(min_c) + "</a> 分 <a>" + add_zero(sec) + "</a> 秒";
}
setInterval(function () {
    $("#site_run_time").html(run_date("2018/3/24"));
}, 1000);



/* header 动态隐藏效果 */
window.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const navBar = document.querySelector(".navbar");
    const headerH = 76;
    const getScrollTop = () => {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
    let scroll = getScrollTop();
    window.addEventListener("scroll", function (e) {
        let top = getScrollTop();
        let dir = top - scroll;
        if (top > headerH && !header.classList.contains("fixed")) {
            header.classList.add("fixed");
            navBar.classList.add("shadow");
        }
        if (top <= 0 && header.classList.contains("fixed")) {
            header.classList.remove("fixed");
            header.classList.remove("visible");
            navBar.classList.remove("shadow");
        }
        if (dir < 0 && header.classList.contains("fixed") && !header.classList.contains("visible")) {
            header.classList.add("visible");
        }
        if (dir > 0 && header.classList.contains("fixed") && header.classList.contains("visible")) {
            header.classList.remove("visible");
        }
        scroll = top;
    }, {
        passive: true
    });
});
/* header 动态隐藏效果 end */





//header 菜单切换到哪一页就加上class‘current-menu-item’
function toggleCurrentMenu() {

}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    // clickTreeDirectory();
    // serachTree();
    // articleToc();
    tocBot();
    shrinkAuthor();
});

// 收缩作者卡片
function shrinkAuthor() {
    // var f = true;
    $("#switch-button").on("click", function (e) {
        $("#author_card-2").animate({ height: 'toggle' }, 600);
        // if (f) {
        //     f = false;
        //     document.getElementById('switch-button').innerHTML = "Expand Author Block";
        // } else {
        //     f = true;
        //     document.getElementById('switch-button').innerHTML = "Shrink Author Block";
        // }

        // $("#sidebar").animate({height:'toggle'},0);
    });
}

// tocbot 目录插件（代替下面的articleToc函数）
function tocBot() {
    var id = 1;
    $("#article").children("h1,h2,h3").each(function () {
        var hyphenated = "toc-" + id;
        $(this).attr('id', hyphenated);
        id++;
    });
    //若目录非空，这自动折叠作者图片，以及初始化目录插件
    if (id > 1) {
        $("#author_card-2").animate({ height: 'toggle' }, 900);

        tocbot.init({
            tocSelector: '.toc', // 放置目录的容器
            contentSelector: '#article', // 正文内容所在
            headingSelector: 'h1, h2, h3', // 需要索引的标题级别
            // scrollEndCallback: function (e) { },
        });
    }
}

// 原先的手写目录
function articleToc() {
    // 先刷一遍文章有哪些节点，把 h1 h2 h3 加入列表，等下循环进行处理。
    var h1List = h2List = h3List = [];
    var haveH = false;
    var labelList = $("#article").children();
    for (var i = 0; i < labelList.length; i++) {
        if ($(labelList[i]).is("h1")) {
            haveH = true;
            h2List = new Array();
            h1List.push({ node: $(labelList[i]), id: i, children: h2List });
        }
        if ($(labelList[i]).is("h2")) {
            haveH = true;
            h3List = new Array();
            h2List.push({ node: $(labelList[i]), id: i, children: h3List });
        }
        if ($(labelList[i]).is("h3")) {
            haveH = true;
            h3List.push({ node: $(labelList[i]), id: i, children: [] });
        }
    }

    //若目录非空，这自动折叠作者图片
    if (haveH) {
        $("#author_card-2").animate({ height: 'toggle' }, 900);
    }



    // 闭包递归，返回树状 html 格式的文章目录索引
    function show(tocList) {
        var content = "<ul>";
        tocList.forEach(function (toc) {
            //在文章H标签前加入下面HTML内容
            toc.node.before('<span class="anchor" id="toc-' + toc.id + '"></span>');
            if (toc.children == 0) {
                content += '<li><a href="#toc-' + toc.id + '" class="h-1x"><span>&nbsp;</span>' + toc.node.text() + '</a></li>';
            }
            else {
                content += '<li><a href="#toc-' + toc.id + '" class="h-1x"><span>&nbsp;</span>' + toc.node.text() + '</a>' + show(toc.children) + '</li>';
            }
        });
        content += "</ul>"
        return content;
    }

    // 最后组合成 div 方便 css 设计样式，添加到指定位置
    $("#toc").empty();
    $("#toc").append(show(h1List));

    // 点击目录索引链接，动画跳转过去，不是默认闪现过去
    $("#toc a").on("click", function (e) {
        e.preventDefault();
        // 获取当前点击的 a 标签，并前触发滚动动画往对应的位置
        var target = $(this.hash);
        $("body, html").animate(
            { 'scrollTop': target.offset().top },
            300
        );
    });

    // 监听浏览器滚动条，给当前标签上色。
    $(window).on("scroll", function (e) {
        var anchorList = $(".anchor");
        anchorList.each(function () {
            var notocLink = $('#toc a[href!="#' + $(this).attr("id") + '"]');
            var tocLink = $('#toc a[href="#' + $(this).attr("id") + '"]');
            var current = tocLink.find('span'),
                nocurrent = notocLink.find('span');
            var anchorTop = $(this).offset().top;
            var windowTop = $(window).scrollTop();
            if (anchorTop <= windowTop + 50) {
                tocLink.addClass("read");
                notocLink.removeClass("read");  //把此句去了，就是原来的方案，给浏览过的标签都上色
                current.addClass('current');
                nocurrent.removeClass('current');
            }
            else {
                tocLink.removeClass("read");
            }
        });
    });

    //目录无内容时则隐藏整个block
    if ($('#sidebar').length > 0) {
        if ($('#toc li').html() == null && $('#topic li').html() == null) {
            $('#sidebar').css('opacity', '0');
        }
    }
}


// /////////////////////////////////////////////////////////////////


// function clickTreeDirectory() {
//     // 判断有 active 的话，就递归循环把它的父目录打开
//     var treeActive = $("#tree .active");
//     if (treeActive.length) {
//         showActiveTree(treeActive, true);
//     }

//     // 点击目录，就触发折叠动画效果
//     $(document).on("click", "#tree a[class='directory']", function (e) {
//         // 用来清空所有绑定的其他事件
//         event.preventDefault();

//         var icon = $(this).children(".fa");
//         var iconIsOpen = icon.hasClass("fa-folder-open");
//         var subTree = $(this).siblings("ul");

//         icon.removeClass("fa-folder-open").removeClass("fa-folder");

//         if (iconIsOpen) {
//             if (typeof subTree != "undefined") {
//                 subTree.slideUp({ duration: 100 });
//             }
//             icon.addClass("fa-folder");
//         } else {
//             if (typeof subTree != "undefined") {
//                 subTree.slideDown({ duration: 100 });
//             }
//             icon.addClass("fa-folder-open");
//         }
//     });
// }

// // 循环递归展开父节点
// function showActiveTree(jqNode, isSiblings) {
//     if (jqNode.attr("id") === "tree") { return; }
//     if (jqNode.is("ul")) {
//         jqNode.css("display", "block");

//         // 这个 isSiblings 是给搜索用的
//         // true 就显示开同级兄弟节点
//         // false 就是给搜索用的，值需要展示它自己就好了，不展示兄弟节点
//         if (isSiblings) {
//             jqNode.siblings().css("display", "block");
//             jqNode.siblings("a").css("display", "inline");
//             jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
//         }
//     }
//     jqNode.each(function () { showActiveTree($(this).parent(), isSiblings); });
// }

// function serachTree() {
//     // 解决搜索大小写问题
//     jQuery.expr[':'].contains = function (a, i, m) {
//         return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
//     };

//     $("#search input").on("input", function (e) {
//         e.preventDefault();

//         // 获取 inpiut 输入框的内容
//         var inputContent = e.currentTarget.value;

//         // 没值就收起父目录，但是得把 active 的父目录都展开
//         if (inputContent.length === 0) {
//             $(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
//             $("#tree ul").css("display", "none");
//             if ($("#tree .active").length) {
//                 showActiveTree($("#tree .active"), true);
//             }
//             else {
//                 $("#tree").children().css("display", "block");
//             }
//         }
//         // 有值就搜索，并且展开父目录
//         else {
//             $(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
//             $("#tree ul").css("display", "none");
//             var searchResult = $("#tree li").find("a:contains('" + inputContent + "')");
//             if (searchResult.length) {
//                 showActiveTree(searchResult.parent(), false)
//             }
//         }
//     });
// }


// 设置开关
$('.skin-setting').click(function () {
    if ($('.skin-setting').attr('data') == 'close') {
        $(".skin-menu").addClass('show');
        $('.skin-setting').attr('data', 'open');
    }
    else if ($('.skin-setting').attr('data') == 'open') {
        $(".skin-menu").removeClass('show');
        $('.skin-setting').attr('data', 'close');
    }
});
// 进度条发生滚动就关闭设置开关
$(window).on("scroll", function () {
    if ($('.skin-setting').attr('data') == 'open') {
        $(".skin-menu").removeClass('show');
        $('.skin-setting').attr('data', 'close');
    }
});
// 点击其他地方也触发隐藏设置开关盒子
document.addEventListener("click", function (e) {
    var targetBox = $('.navbar-nav.align-items-center'),
        targetBox2 = $('.skin-setting');
    if ($('.skin-setting').attr('data') == 'open') {
        var f = (targetBox.find(e.target).is(e.target) == false);
        //targetBox后代中找e.target,找到的是它自己，则表示点了targetBox，此时本函数功能无需启动，故为false时启动
        // 一开始没用is()，只用find()，看返回是否为null，失败了，原因是无论是不是找到都会返回一个对象，只要再加个找到是不是自己的判断，就成功了
        if (f) {
            $(".skin-menu").removeClass('show');
            $('.skin-setting').attr('data', 'close');
        }
    }
});

// 樱花开关
$('#sakuraOffOn').click(function () {
    if ($('#sakuraOffOn').attr('data') == 'off') {
        $('body').find('#sakura-logo').css('visibility', 'visible');
        $('#sakuraOffOn').css('backgroundColor', '#17a2b8');
        $('#sakuraOffOn').attr('data', 'on');
    } else {
        $('body').find('#sakura-logo').css('visibility', 'hidden');
        $('#sakuraOffOn').css('backgroundColor', '#f5f5f5');
        $('#sakuraOffOn').attr('data', 'off');
    }
});
// 彩虹气球开关
$('#rainbowPoint').click(function () {
    if ($('#rainbowPoint').attr('data') == 'off') {
        $('body').find('.points').show();
        $('#rainbowPoint').css('backgroundColor', 'pink');
        $('#rainbowPoint svg').css('color', '#fff');
        $('#rainbowPoint').attr('data', 'on');
    } else {
        $('body').find('.points').hide();
        $('#rainbowPoint').css('backgroundColor', '#f5f5f5');
        $('#rainbowPoint svg').css('color', '#000');
        $('#rainbowPoint').attr('data', 'off');
    }
});
// 雪花开关
$('#snowOffOn').click(function () {
    if ($('#snowOffOn').attr('data') == 'off') {
        $('body').find('#Snow').show();
        $('#snowOffOn').css('backgroundColor', 'pink');
        $('#snowOffOn svg').css('color', '#fff');
        $('#snowOffOn').attr('data', 'on');
    } else {
        $('body').find('#Snow').hide();
        $('#snowOffOn').css('backgroundColor', '#f5f5f5');
        $('#snowOffOn svg').css('color', '#000');
        $('#snowOffOn').attr('data', 'off');
    }
});
// 彩虹气球开关
$('#heartOffOn').click(function () {
    if ($('#heartOffOn').attr('data') == 'off') {
        $('body').find('#red-heart').show();
        $('#heartOffOn').css('backgroundColor', 'pink');
        $('#heartOffOn svg').css('color', '#fff');
        $('#heartOffOn').attr('data', 'on');
    } else {
        $('body').find('#red-heart').hide();
        $('#heartOffOn').css('backgroundColor', '#f5f5f5');
        $('#heartOffOn svg').css('color', '#000');
        $('#heartOffOn').attr('data', 'off');
    }
});
// 设置苹方字体按钮
$('#PF').click(function () {
    if ($('.font-family-controls').attr('data') !== 'PF') {
        var f = $('.font-family-controls').attr('data');
        $('.font-family-controls').attr('data', 'PF');
        $('#' + f).removeClass('select');
        $(this).addClass('select');
        $('body').removeClass(f);
        $('body').addClass('PF');
    }
});
// 设置楷体按钮
$('#kai').click(function () {
    if ($('.font-family-controls').attr('data') !== 'kai') {
        var f = $('.font-family-controls').attr('data');
        $('.font-family-controls').attr('data', 'kai');
        $('#' + f).removeClass('select');
        $(this).addClass('select');
        $('body').removeClass(f);
        $('body').addClass('kai');
    }
});
// 设置隶变按钮
$('#Li').click(function () {
    if ($('.font-family-controls').attr('data') !== 'Li') {
        var f = $('.font-family-controls').attr('data');
        $('.font-family-controls').attr('data', 'Li');
        $('#' + f).removeClass('select');
        $(this).addClass('select');
        $('body').removeClass(f);
        $('body').addClass('Li');
    }
});
// 设置行楷按钮
$('#lastFont').click(function () {
    if ($('.font-family-controls').attr('data') !== 'lastFont') {
        var f = $('.font-family-controls').attr('data');
        $('.font-family-controls').attr('data', 'lastFont');
        $('#' + f).removeClass('select');
        $(this).addClass('select');
        $('body').removeClass(f);
        $('body').addClass('lastFont');
    }
});




// 为背景和图片设置加载完成前为高斯模糊的效果
// $('.media-bg').each(function () {
//     var that = $(this);
//     console.log(that);
//     var bgi = that.css('background-image');
//     $(this).css('background-image', 'url(/img/bg.png)');
//     var imgurl = bgi.split('(')[1].split(')')[0];
//     var img = new Image();
//     img.src = imgurl;
//     console.log(imgurl);
//     img.onload = function () {
//         that.css('background-image', imgurl);
//         that.addClass('complete');
//     }
// })


//nav 轮播图(已废弃)
// function carouselAnimate(obj, target, callback) {
//     // console.log(callback);  callback = function() {}  调用的时候 callback()
//     // 先清除以前的定时器，只保留当前的一个定时器执行
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function () {
//         // 步长值写到定时器的里面
//         // 把我们步长值改为整数 不要出现小数的问题
//         // var step = Math.ceil((target - obj.offsetLeft) / 10);
//         var step = (target - obj.offsetLeft) / 10;
//         step = step > 0 ? Math.ceil(step) : Math.floor(step);
//         if (obj.offsetLeft == target) {
//             // 停止动画 本质是停止定时器
//             clearInterval(obj.timer);
//             // 回调函数写到定时器结束里面
//             // if (callback) {
//             //     // 调用函数
//             //     callback();
//             // }
//             callback && callback();
//         }
//         // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
//         obj.style.left = obj.offsetLeft + step + 'px';

//     }, 15);
// }
// function SlideImg() {
//     // var arrow_l = document.querySelector('.arrow-l');
//     // var arrow_r = document.querySelector('.arrow-r');
//     var focus = document.querySelector('.carousel');
//     var carousel = $('.carousel');
//     var slideLi = $('.carousel li');
//     var focusWidth = carousel.width(),
//         focusHeight = carousel.height();
//     slideLi.width(focusWidth);
//     slideLi.height(focusHeight);
//     // 鼠标经过focus 就显示隐藏左右按钮
//     focus.addEventListener('mouseenter', function () {
//         // arrow_l.style.display = 'block';
//         // arrow_r.style.display = 'block';
//         clearInterval(timer);
//         timer = null; // 清除定时器变量
//     });
//     focus.addEventListener('mouseleave', function () {
//         // arrow_l.style.display = 'none';
//         // arrow_r.style.display = 'none';
//         timer = setInterval(function () {
//             arrow_r();
//         }, 5000);
//     });
//     var ul = focus.querySelector('ul');
//     var ol = focus.querySelector('ol');
//     for (var i = 0; i < ul.children.length; i++) {
//         // 创建一个小li 
//         var li = document.createElement('li');
//         // 记录当前小圆圈的索引号 通过自定义属性来做 
//         li.setAttribute('index', i);
//         // 把小li插入到ol 里面
//         ol.appendChild(li);
//         // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
//         li.addEventListener('click', function () {
//             // 干掉所有人 把所有的小li 清除 current 类名
//             for (var i = 0; i < ol.children.length; i++) {
//                 ol.children[i].className = '';
//             }
//             // 留下我自己  当前的小li 设置current 类名
//             this.className = 'current';
//             // 5. 点击小圆圈，移动图片 当然移动的是 ul 
//             // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
//             // 当我们点击了某个小li 就拿到当前小li 的索引号
//             var index = this.getAttribute('index');
//             // 当我们点击了某个小li 就要把这个li 的索引号给 num  
//             num = index;
//             // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
//             circle = index;
//             // num = circle = index;

//             carouselAnimate(ul, -index * focusWidth);
//         })
//     }
//     // 把ol里面的第一个小li设置类名为 current
//     ol.children[0].className = 'current';
//     // 6. 克隆第一张图片(li)放到ul 最后面
//     var first = ul.children[0].cloneNode(true);
//     ul.appendChild(first);
//     // 7. 点击右侧按钮， 图片滚动一张
//     var num = 0;
//     // circle 控制小圆圈的播放
//     var circle = 0;
//     // flag 节流阀
//     var flag = true;
//     var arrow_r = function () {
//         if (flag) {
//             flag = false; // 关闭节流阀
//             // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
//             if (num == ul.children.length - 1) {
//                 ul.style.left = 0;
//                 num = 0;
//             }
//             num++;
//             carouselAnimate(ul, -num * focusWidth, function () {
//                 flag = true; // 打开节流阀
//             });
//             // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
//             circle++;
//             // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
//             if (circle == ol.children.length) {
//                 circle = 0;
//             }
//             // 调用函数
//             circleChange();
//         }
//     };

//     // 9. 左侧按钮做法
//     var arrow_l = function () {
//         if (flag) {
//             flag = false;
//             if (num == 0) {
//                 num = ul.children.length - 1;
//                 ul.style.left = -num * focusWidth + 'px';

//             }
//             num--;
//             carouselAnimate(ul, -num * focusWidth, function () {
//                 flag = true;
//             });
//             // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
//             circle--;
//             // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
//             // if (circle < 0) {
//             //     circle = ol.children.length - 1;
//             // }
//             circle = circle < 0 ? ol.children.length - 1 : circle;
//             // 调用函数
//             circleChange();
//         }
//     };

//     function circleChange() {
//         // 先清除其余小圆圈的current类名
//         for (var i = 0; i < ol.children.length; i++) {
//             ol.children[i].className = '';
//         }
//         // 留下当前的小圆圈的current类名
//         ol.children[circle].className = 'current';
//     }
//     // 10. 自动播放轮播图
//     var timer = setInterval(function () {
//         //手动调用点击事件
//         arrow_r();
//     }, 5000);
// }
// if ($('div').hasClass('carousel')) {
//     SlideImg();
// }

