window.$ = jQuery;

// $(document).pjax('a[target!=_blank]', '#pjax-container', {
//     fragment: '#pjax-container',
//     timeout: 5000,
// });


function lightMode() {
    document.body.classList.remove('nice-dark-mode');
    $('.logo-dark').removeClass('d-inline-block')
    $('.logo-dark').addClass('d-none')
    $('.logo-light').removeClass('d-none')
    $('.logo-light').addClass('d-inline-block')
}
function darkMode() {
    document.body.classList.add('nice-dark-mode');
    $('.logo-dark').removeClass('d-none')
    $('.logo-dark').addClass('d-inline-block')
    $('.logo-light').removeClass('d-inline-block')
    $('.logo-light').addClass('d-none')
}

// 根据时间来判断是否启动夜间模式
(function () {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        if (new Date().getHours() >= 19 || new Date().getHours() < 7) {
            darkMode()
            document.cookie = "night=1;path=/";
            // console.log('夜间模式开启');
        } else {
            lightMode()
            document.cookie = "night=0;path=/";
            // console.log('夜间模式关闭');
        }
    } else {
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
            lightMode()
            // console.log('1-夜间模式关闭');
        } else if (night == '1') {
            darkMode()
            // console.log('2-夜间模式开启');
        }
    }
})();


// 按钮切换夜间模式
function toggleDarkMode() {
    $('body').toggleClass('nice-dark-mode')
    if (!$('body').hasClass('nice-dark-mode')) {
        document.cookie = "night=0;path=/";
        $('.logo-dark').removeClass('d-inline-block')
        $('.logo-dark').addClass('d-none')

        $('.logo-light').removeClass('d-none')
        $('.logo-light').addClass('d-inline-block')
    } else {
        document.cookie = "night=1;path=/";
        $('.logo-dark').removeClass('d-none')
        $('.logo-dark').addClass('d-inline-block')
        $('.logo-light').removeClass('d-inline-block')
        $('.logo-light').addClass('d-none')
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
}
jQuery(document).ready(function ($) {
    toggleSidebar();

    $(window).scroll(function () {
        var $window = $(window),
            $window_width = $window.width();

        if ($(this).scrollTop() > 200 && $window_width >= 1024) {
            $('#scroll_to_top').filter(':hidden').fadeIn('fast');
        } else {
            $('#scroll_to_top').filter(':visible').fadeOut('fast');
        }
    });
    $('#scroll_to_top').on('click',
        function () {
            $('html, body').animate({
                scrollTop: 0
            },
                'slow');
            return false;
        });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 60)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
        $('.tooltip').addClass('animated fadeIn');
    })

    // theiaStickySidebar
    $('.sidebar').theiaStickySidebar({
        additionalMarginTop: 20,
        additionalMarginBottom: 20
    });
    // theiaStickySidebar
    $('.sidebar-author').theiaStickySidebar({
        additionalMarginTop: 100,
        additionalMarginBottom: 20
    });
    if ($(".main-menu li").hasClass("menu-item-has-children")) {
        $('.main-menu .menu-item-has-children').prepend('<span class="icon-sub-menu"><i class="iconfont icon-arrow-down-s-line"></i></span>')
    };
    $('.mobile-sidebar-menu .menu-item-has-children > a').append('<div class="dropdown-sub-menu"><span class="iconfont icon-arrow-drop-down-fill"></span></div>'),
        $('.dropdown-sub-menu').on("click",
            function () {
                $(this).parents('li').children('.sub-menu').slideToggle(),
                    $(this).parents('li').children('.dropdown-sub-menu').toggleClass('current')
            });

    // 幻灯片插件
    // carousel
    // var owl = $('.list-banner .owl-carousel');
    // if (owl.length > 0) {
    //     owl.owlCarousel({
    //         items: 1,
    //         loop: true,
    //         margin: 10,
    //         smartSpeed: 1000,
    //         autoplay: true,
    //         autoplayTimeout: 5000,
    //         autoplayHoverPause: true,
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1,
    //                 margin: 10,
    //                 nav: false,
    //             },
    //             768: {
    //                 nav: true,
    //                 navText: ['<i class="iconfont icon-left"></i>', '<i class="iconfont icon-right"></i>'],
    //             },
    //             992: {
    //                 nav: true,
    //                 navText: ['<i class="iconfont icon-left"></i>', '<i class="iconfont icon-right"></i>'],
    //             }
    //         }
    //     });
    // }




    //分类 按钮
    // $(document).on('click', '.list-ajax-nav button', function (event) {
    //     event.preventDefault();
    //     var t = $(this);
    //     if (!t.hasClass('current')) {
    //         $('.list-ajax-nav button').attr('class', 'btn btn-sm btn-link');
    //         t.removeClass('btn-link');
    //         t.addClass('btn-primary current');

    //         var cid = t.data('cid');
    //         if (cid) {
    //             $('.dposts-ajax-load').data('tabcid', cid);
    //         } else {
    //             $('.dposts-ajax-load').removeData('tabcid');
    //         }
    //         $('.dposts-ajax-load').data('paged', 1);
    //         $('.' + $('.dposts-ajax-load').data().append).html('');
    //         // disable button when loading
    //         $('.dposts-ajax-load').addClass('loading').text(__.load_more);
    //         $('.list-ajax-nav button').attr('disabled', true)
    //         ajax_load_posts($('.dposts-ajax-load').data(), function () {
    //             $('.list-ajax-nav button').removeAttr('disabled')
    //         });
    //     }
    // });



    // function ajax_load_comments(data) {
    //     var buttonDOM = $('#comments-next-button');
    //     buttonDOM.hide();

    //     $.ajax({
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: data,
    //     })
    //         .done(function (response) {
    //             if (response) {
    //                 if (data.commentspage == 'newest') {
    //                     buttonDOM.data('paged', data.paged * 1 - 1);
    //                 } else {
    //                     buttonDOM.data('paged', data.paged * 1 + 1);
    //                 }
    //                 $('.' + data.append).append(response);
    //                 buttonDOM.show();
    //             } else {
    //                 buttonDOM.hide();
    //             }

    //         })
    // }

    // $(document).on('click', '#comments-next-button', function (event) {
    //     event.preventDefault();
    //     ajax_load_comments($('#comments-next-button').data());
    // });

    // $(document).on("click", '.btn-like[data-action="like"]', function () {
    //     event.preventDefault();
    //     var $this = $('.btn-like');
    //     var id = $(this).data("id");

    //     if ($this.hasClass('requesting')) {
    //         return false;
    //     }

    //     $this.addClass('requesting');
    //     $.ajax({
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: { action: 'pandapro_like', id, like_action: 'like' },
    //     })
    //         .done(function (data) {
    //             $this.addClass('current');
    //             $this.attr('data-action', 'unlike');
    //             ncPopupTips(1, __.thank_you)
    //             $('.like-count').html(data.trim());
    //             isApollo && apolloAjaxPostLikeSection(id);
    //         })
    //         .always(function () {
    //             $this.removeClass('requesting');
    //         });
    //     return false;
    // });


    // $(document).on("click", '.btn-like[data-action="unlike"]', function () {
    //     event.preventDefault();
    //     var $this = $('.btn-like');
    //     var id = $(this).data("id");

    //     if ($this.hasClass('requesting')) {
    //         return false;
    //     }

    //     $this.addClass('requesting');

    //     $this.removeClass('current');

    //     $.ajax({
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: { action: 'pandapro_like', id, like_action: 'unlike' },
    //     })
    //         .done(function (data) {
    //             $this.removeClass('current');
    //             $this.attr('data-action', 'like');
    //             ncPopupTips(0, __.cancelled)
    //             $('.like-count').html(data.trim());
    //             isApollo && apolloAjaxPostLikeSection(id);
    //         })
    //         .always(function () {
    //             $this.removeClass('requesting');
    //         });
    //     return false;
    // });

    // function apolloAjaxPostLikeSection(id) {
    //     $.ajax({
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: {
    //             action: 'ajax_apollo_userlike_section',
    //             id: id
    //         },
    //     })
    //         .done(function (response) {
    //             $('#apollo-postlike-section').length > 0 && $('#apollo-postlike-section').remove();
    //             if (response.trim()) {
    //                 $('#post-share-section').after(response)
    //             }
    //         })
    // }



    //点击打开二维码页面
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

    // $(document).on('click', '.refresh-random-post', function (event) {
    //     event.preventDefault();
    //     var $this = jQuery(this)

    //     $.ajax({
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: {
    //             action: 'ajax_refresh_random_post',
    //             id: $this.data().id
    //         },
    //     })
    //         .done(function (response) {
    //             if (response.trim()) {
    //                 $this.parents('.Single_Post_Card').html(response.trim())
    //             }
    //         })
    // });

    $(document).on('click', '.nav-switch-dark-mode', function (event) {
        var f = $('body').hasClass('nice-dark-mode') === true ? 'off' : 'on';
        // console.log(f);
        toggleDarkMode();

        // event.preventDefault();
        // $.ajax({
        //     url: globals.ajax_url,
        //     type: 'POST',
        //     dataType: 'html',
        //     data: {
        //         toggle_action: $('body').hasClass('nice-dark-mode') === true ? 'off' : 'on',
        //         action: 'pandapro_toggle_dark_mode'
        //     },
        // })
        // .done(function(response) {
        //     toggleDarkMode()
        // })
    });


    // 原分享
    // $(document).on('click', '.link-post-share', function (event) {
    //     event.preventDefault();
    //     $(this).parent().toggleClass('show');
    //     $('body').toggleClass('modal-open');
    //     $('.mobile-overlay').addClass('active');
    // });
    // if ($('.content-share').hasClass('show') === false) {
    //     $(document).on('click', '.nice-dropdown .weixin, .mobile-overlay', function (event) {
    //         event.preventDefault();
    //         $('.content-share').removeClass('show');
    //         $('body').removeClass('modal-open');
    //         $('.mobile-overlay').removeClass('active');
    //     });
    // }
    // $(document).on('click', '.dposts-ajax-load', function (event) {
    //     event.preventDefault();
    //     var $this = jQuery(this)
    //     if ($('.list-ajax-load').hasClass('loading') === false) {
    //         $('.list-ajax-load').addClass('loading');
    //         ajax_load_posts($this.data());
    //     }
    // });
    // 现分享
    $(document).on('click', '.btn-share-toggler', function (event) {
        event.preventDefault();
        ncPopup('middle', $('#single-share-template').html());
    });



    // 加载更多 按钮
    // function ajax_load_posts(data, callback = function () { }) {
    //     $('.ajax-loading').show();

    //     var loadButton = $('.dposts-ajax-load')
    //     var listAjaxLoad = $('.list-ajax-load')
    //     loadButton.hide();

    //     $.ajax({
    //         // url: '/page/2/',
    //         url: globals.ajax_url,
    //         type: 'POST',
    //         dataType: 'html',
    //         data: data,
    //     })
    //         .done(function (response) {
    //             callback();
    //             loadButton.removeAttr('disabled');
    //             if (response.trim()) {
    //                 loadButton.data('paged', data.paged * 1 + 1)
    //                 $('.' + data.append).append(response);
    //                 listAjaxLoad.removeClass('loading').show();
    //             } else {
    //                 loadButton.attr('disabled', 'disabled');
    //                 loadButton.addClass('btn-nostyle')
    //                 loadButton.text(__.reached_the_end).show();
    //             }
    //         })
    //         .fail(function () {
    //             $('.ajax-loading').hide();
    //         })
    //         .always(function () {
    //             $('.ajax-loading').hide();
    //             loadButton.show();
    //         });
    // }


});










$(document).ready(function () {
    clickTreeDirectory();
    serachTree();
    showArticleIndex();
    switchTreeOrIndex();
});




function showArticleIndex() {
    // 先刷一遍文章有哪些节点，把 h1 h2 h3 加入列表，等下循环进行处理。
    // 如果不够，可以加上 h4 ,只是我个人觉得，前 3 个就够了，出现第 4 层就目录就太长了，太细节了。
    var h1List = h2List = h3List = [];
    var labelList = $("#article").children();
    for (var i = 0; i < labelList.length; i++) {
        if ($(labelList[i]).is("h1")) {
            h2List = new Array();
            h1List.push({ node: $(labelList[i]), id: i, children: h2List });
        }

        if ($(labelList[i]).is("h2")) {
            h3List = new Array();
            h2List.push({ node: $(labelList[i]), id: i, children: h3List });
        }

        if ($(labelList[i]).is("h3")) {
            h3List.push({ node: $(labelList[i]), id: i, children: [] });
        }
    }

    // 闭包递归，返回树状 html 格式的文章目录索引
    function show(tocList) {
        var content = "<ul>";
        tocList.forEach(function (toc) {
            toc.node.before('<span class="anchor" id="_label' + toc.id + '"></span>');
            if (toc.children == 0) {
                content += '<li><a href="#_label' + toc.id + '">' + toc.node.text() + '</a></li>';
            }
            else {
                content += '<li><a href="#_label' + toc.id + '">' + toc.node.text() + '</a>' + show(toc.children) + '</li>';
            }
        });
        content += "</ul>"
        return content;
    }

    // 最后组合成 div 方便 css 设计样式，添加到指定位置
    $("aside #toc").empty();
    $("aside #toc").append(show(h1List));

    // 点击目录索引链接，动画跳转过去，不是默认闪现过去
    $("#toc a").on("click", function (e) {
        e.preventDefault();
        // 获取当前点击的 a 标签，并前触发滚动动画往对应的位置
        var target = $(this.hash);
        $("body, html").animate(
            { 'scrollTop': target.offset().top },
            500
        );
    });

    // 监听浏览器滚动条，当浏览过的标签，给他上色。
    $(window).on("scroll", function (e) {
        var anchorList = $(".anchor");
        anchorList.each(function () {
            var tocLink = $('#toc a[href="#' + $(this).attr("id") + '"]');
            var anchorTop = $(this).offset().top;
            var windowTop = $(window).scrollTop();
            if (anchorTop <= windowTop + 50) {
                tocLink.addClass("read");
            }
            else {
                tocLink.removeClass("read");
            }
        });
    });
}



// 点击搜索旁的按钮，切换目录与索引
function switchTreeOrIndex() {
    var f = true;
    $("#switch-button").on("click", function (e) {
        $("#author_card-2").animate({ height: 'toggle' }, 600);
        if (f) {
            f = false;
            document.getElementById('switch-button').innerHTML = "Expand Author Block";
        } else {
            f = true;
            document.getElementById('switch-button').innerHTML = "Shrink Author Block";
        }

        // $("#sidebar").animate({height:'toggle'},0);
    });
}





// --------首页文章列表按分类筛选，一个不太完美的阉割版，来自erl.im博客方法。-----------------

class CateArchive {
    constructor() {
        this.categories = document.getElementsByClassName("category")
        this.posts = document.getElementsByClassName("post_list_item")

        this.init()

        // Bind click event to every category element.
        let _this = this
        for (let category of this.categories) {
            category.addEventListener("click", function () {
                if (this != _this.current) {
                    _this.change(this)
                }
            })
        }
    }

    /**
     * Get the current category from the link's hash.
     */
    init() {
        let hash = window.location.hash.slice(1)
        this.current = this.categories[0]
        // this.current = document.getElementsByClassName("cat_btn")[0]
        if (hash != "") {
            for (let category of this.categories) {
                let escapedCat = encodeURI(category.getAttribute("data-category"))
                if (hash == escapedCat) {
                    this.change(category)
                    return
                }
            }
        }
    }

    filter(category) {
        for (let post of this.posts) {
            let cat = post.getAttribute("data-category")
            // 符合分类条件或者按钮选为全部时，将该文章列表项设为可见
            if (cat.indexOf(category) > -1 || category == "all") {
                post.style.display = "block"
            } else {
                post.style.display = "none"
            }
        }
    }

    change(category) {
        console.log(this.current.firstElementChild)
        this.current.firstElementChild.classList.remove("btn-primary")
        this.current.firstElementChild.classList.remove("current")
        this.current.firstElementChild.classList.add("btn-link")
        this.current = category
        category.firstElementChild.classList.remove("btn-link")
        category.firstElementChild.classList.add("btn-primary")
        category.firstElementChild.classList.add("current")
        this.filter(category.getAttribute("data-category"))
    }
}

if (document.getElementById("postArchive")) {
    new CateArchive()
}




/////////////////////////////////////////////////////////////////
function clickTreeDirectory() {
    // 判断有 active 的话，就递归循环把它的父目录打开
    var treeActive = $("#tree .active");
    if (treeActive.length) {
        showActiveTree(treeActive, true);
    }

    // 点击目录，就触发折叠动画效果
    $(document).on("click", "#tree a[class='directory']", function (e) {
        // 用来清空所有绑定的其他事件
        event.preventDefault();

        var icon = $(this).children(".fa");
        var iconIsOpen = icon.hasClass("fa-folder-open");
        var subTree = $(this).siblings("ul");

        icon.removeClass("fa-folder-open").removeClass("fa-folder");

        if (iconIsOpen) {
            if (typeof subTree != "undefined") {
                subTree.slideUp({ duration: 100 });
            }
            icon.addClass("fa-folder");
        } else {
            if (typeof subTree != "undefined") {
                subTree.slideDown({ duration: 100 });
            }
            icon.addClass("fa-folder-open");
        }
    });
}

// 循环递归展开父节点
function showActiveTree(jqNode, isSiblings) {
    if (jqNode.attr("id") === "tree") { return; }
    if (jqNode.is("ul")) {
        jqNode.css("display", "block");

        // 这个 isSiblings 是给搜索用的
        // true 就显示开同级兄弟节点
        // false 就是给搜索用的，值需要展示它自己就好了，不展示兄弟节点
        if (isSiblings) {
            jqNode.siblings().css("display", "block");
            jqNode.siblings("a").css("display", "inline");
            jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
        }
    }
    jqNode.each(function () { showActiveTree($(this).parent(), isSiblings); });
}

function serachTree() {
    // 解决搜索大小写问题
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    $("#search input").on("input", function (e) {
        e.preventDefault();

        // 获取 inpiut 输入框的内容
        var inputContent = e.currentTarget.value;

        // 没值就收起父目录，但是得把 active 的父目录都展开
        if (inputContent.length === 0) {
            $(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
            $("#tree ul").css("display", "none");
            if ($("#tree .active").length) {
                showActiveTree($("#tree .active"), true);
            }
            else {
                $("#tree").children().css("display", "block");
            }
        }
        // 有值就搜索，并且展开父目录
        else {
            $(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
            $("#tree ul").css("display", "none");
            var searchResult = $("#tree li").find("a:contains('" + inputContent + "')");
            if (searchResult.length) {
                showActiveTree(searchResult.parent(), false)
            }
        }
    });
}

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
Annie_NiceScroll();


// random img
// var Annie_Random_Img = function() {
//     var randomMax = $('.randombg').attr('data-random-max'),
//         randomNum = 0;

//     randomNum = Math.floor(Math.random() * (randomMax - 1) + 1);
//     var curImgSrc = $('.randombg').attr('data-random-src') + randomNum + '.jpg';
//     console.log(randomNum);
//     var backgroundImg = 'url(' + curImgSrc + ')';
//     $('.randombg').css('background-image', backgroundImg);
// }
// Annie_Random_Img();


/* header 动态隐藏效果 */
window.addEventListener("DOMContentLoaded", function () {
    const navBar = document.querySelector("header");
    const navBarH = 76;
    const getScrollTop = () => {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
    let scroll = getScrollTop();
    window.addEventListener("scroll", function (e) {
        let top = getScrollTop();
        let dir = top - scroll;
        if (top > navBarH && !navBar.classList.contains("fixed")) {
            navBar.classList.add("fixed");
        }
        if (top <= 0 && navBar.classList.contains("fixed")) {
            navBar.classList.remove("fixed");
            navBar.classList.remove("visible");
        }
        if (dir < 0 && navBar.classList.contains("fixed") && !navBar.classList.contains("visible")) {
            navBar.classList.add("visible");
        }
        if (dir > 0 && navBar.classList.contains("fixed") && navBar.classList.contains("visible")) {
            navBar.classList.remove("visible");
        }
        scroll = top;
    }, {
        passive: true
    });
});
/* header 动态隐藏效果 end */


























console.log('\n' + ' %c Hello Hexo, Developed by 叶凡® %c https://cinzano.gitee.io ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0; font-size:18px;', 'background: #fadfa3; padding:5px 0; font-size:18px;');