/* ----
# Kico Style 弹窗

** Array的pop原型原代码是remove。结果跟评论功能冲突了，遂改为pop，若哪一天再起冲突，就把pop改成更难撞车的名，同时下面那一处的原型调用也要修改
---- */
Array.prototype.pop = function (value) {
    var index = this.indexOf(value);
    if (index > -1) this.splice(index, 1);
};

(function (global, setting) {
    var KStyle = function (a, b) {
        return KStyle.fn.init(a, b);
    };

    KStyle.fn = KStyle.prototype = {
        construtor: KStyle,
        init: function (a, b) {
            a = KStyle.selectAll(a);

            a.each = function (fn) {
                return KStyle.each(a, fn);
            };

            return a;
        }
    };

    // 批量处理
    KStyle.each = function (data, fn) {
        for (var i = 0; i < data.length; i++) {
            fn(data[i], i, data);
        }
    };

    // 创建对象
    KStyle.create = function (tag, prop) {
        var obj = document.createElement(tag);

        if (prop) {
            if (prop.id) obj.id = prop.id;
            if (prop.href) obj.href = prop.href;
            if (prop.class) obj.className = prop.class;
            if (prop.text) obj.innerText = prop.text;
            if (prop.html) obj.innerHTML = prop.html;

            if (prop.child) {
                if (prop.child.constructor === Array) {
                    KStyle.each(prop.child, function (i) {
                        obj.appendChild(i);
                    });
                }
                else {
                    obj.appendChild(prop.child);
                }
            }

            if (prop.parent) prop.parent.appendChild(obj);
        }

        return obj;
    };

    // 选择对象
    KStyle.select = function (obj) {
        switch (typeof obj) {
            case "object": return obj; break;
            case "string": return document.querySelector(obj); break;
        }
    };

    KStyle.selectAll = function (obj) {
        switch (typeof obj) {
            case "object": return obj; break;
            case "string": return document.querySelectorAll(obj); break;
        }
    };

    // 弹窗
    var notice = {
        wrap: KStyle.create("notice"),
        list: []
    };

    KStyle.notice = function (content, attr) {
        var item = KStyle.create("div", { class: "ks-notice", html: "<span class='content'>" + content + "</span>", parent: notice.wrap });

        notice.list.push(item);

        if (!document.querySelector("body > notice")) document.body.appendChild(notice.wrap);

        if (attr && attr.time) {
            setTimeout(notice_remove, attr.time);
        }
        else {
            var close = KStyle.create("span", { class: "ks-close", parent: item });

            close.onclick = notice_remove;
        }

        if (attr && attr.color) {
            item.classList.add(attr.color);
        }

        function notice_remove() {
            item.classList.add("remove");
            notice.list.pop(item);

            setTimeout(function () {
                try {
                    notice.wrap.removeChild(item);
                    item = null;
                }
                catch (err) { }

                if (document.querySelector("body > notice") && notice.list.length === 0) {
                    document.body.removeChild(notice.wrap);
                }
            }, 300);
        }
    };

    global.ks = KStyle;

})(window);











//图片错误处理（重刷新就会失效，不知为何）
// document.addEventListener("error", function (e) {
//     var elem = e.target;
//     if (elem.tagName.toLowerCase() == 'img') {
//         elem.src = "/images/image-error.jpg";
//         elem.onerror = null;
//     }
// }, true);

// 鼠标点击爱心特效from小尾巴
$("body").click(function (e) {
    var gcd = new Array("♥", "♥", "♥");
    var n = Math.floor(Math.random() * gcd.length);
    var $i = $("<span/>").text(gcd[n]);
    var x = e.pageX,
        y = e.pageY;
    $i.css({
        "z-index": 9999,
        "top": y - 30,
        "left": x - 12,
        "position": "absolute",
        "color": "#FF706C",
        "animation": 'heartbeat .25s infinite .15s'
    });
    $("body").append($i);
    $i.animate({
        "opacity": 0
    }, 1500, function () {
        $i.remove()
    });
    // e.stopPropagation()
});

// tune
window.AudioContext = window.AudioContext || window.webkitAudioContext;
(function () {
    if (!window.AudioContext) {
        // alert('当前浏览器不支持Web Audio API');
        return;
    }
    var audioCtx = new AudioContext();
    //天空之城
    var arrFrequency = '880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 659 698 659 698 1046 659 1046 1046 1046 987 698 698 987 987 880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 698 1046 987 1046 1174 1174 1174 1046 1046 880 987 784 880 1046 1174 1318 1174 1318 1567 1046 987 1046 1318 1318 1174 784 784 880 1046 987 1174 1046 784 784 1396 1318 1174 659 1318 1046 1318 1760 1567 1567 1318 1174 1046 1046 1174 1046 1174 1567 1318 1318 1760 1567 1318 1174 1046 1046 1174 1046 1174 987 880 880 987 880'.split(' ');
    var start = 0, direction = 1;
    var musicFont = '♩ ♪ ♫ ♬ ♭ ♮ ♯'.split(' ');
    var play = false;
    $('.spirit-sakura').mouseenter(function (e) {
        var frequency = arrFrequency[start];
        if (!frequency) {
            start = 0;
            frequency = arrFrequency[start];
        }
        start = start + direction;
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        oscillator.start(audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
        oscillator.stop(audioCtx.currentTime + 1);
        play = true;
        if (play) {
            var n = Math.round(Math.random() * 7);
            var $i = $("<b/>").text(musicFont[n]);
            var x = e.pageX, y = e.pageY - 5;
            $i.css({
                "z-index": 99999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "color": "#65dbfb"
            });
            $('body').append($i);
            $i.animate(
                { "top": y - 180, "opacity": 0 },
                1500,
                function () { $i.remove(); }
            );
            e.stopPropagation();
        }
        play = false;
    })
})();

/* ---------------------------------------------- /*
	* POPUP 
/* ---------------------------------------------- */
if (typeof jQuery != 'undefined') {
    var $ = jQuery.noConflict();
}

function ncPopupTips(type, msg) {
    var ico = type ? '<span class="d-block h1 text-success mb-2"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1553065772988" class="icon w-56" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2922" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M666.272 472.288l-175.616 192a31.904 31.904 0 0 1-23.616 10.4h-0.192a32 32 0 0 1-23.68-10.688l-85.728-96a32 32 0 1 1 47.744-42.624l62.144 69.6 151.712-165.888a32 32 0 1 1 47.232 43.2m-154.24-344.32C300.224 128 128 300.32 128 512c0 211.776 172.224 384 384 384 211.68 0 384-172.224 384-384 0-211.68-172.32-384-384-384" p-id="2923"></path></svg></span>' : '<span class="d-block h1 text-danger mb-2"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1553065784656" class="icon w-56" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3053" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M544 576a32 32 0 0 1-64 0v-256a32 32 0 0 1 64 0v256z m-32 160a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m0-608C300.256 128 128 300.256 128 512s172.256 384 384 384 384-172.256 384-384S723.744 128 512 128z" p-id="3054"></path></svg></span>';
    var c = type ? 'tips-success' : 'tips-error';
    var html = '<section class="nice-tips ' + c + ' nice-tips-sm nice-tips-open">' +
        '<div class="nice-tips-overlay"></div>' +
        '<div class="nice-tips-body text-center">' +
        '<div class="nice-tips-content px-5">' + ico +
        '<div class="text-sm text-muted">' + msg + '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
    var tips = $(html);
    $('body').append(tips);
    $('body').addClass('modal-open');
    if (typeof lazyLoadInstance !== "undefined") {
        lazyLoadInstance.update();
    }

    setTimeout(function () {
        $('body').removeClass('modal-open');
        tips.removeClass('nice-tips-open');
        tips.addClass('nice-tips-close');

        setTimeout(function () {
            tips.removeClass('nice-tips-close');
            setTimeout(function () {
                tips.remove();
            }, 200);
        }, 400);
    }, 1200);
}

function ncPopup(type, html, maskStyle, btnCallBack) {

    var maskStyle = maskStyle ? 'style="' + maskStyle + '"' : '';

    var size = '';

    if (type == 'big') {
        size = 'nice-tips-lg';
    } else if (type == 'no-padding') {
        size = 'nice-tips-nopd';
    } else if (type == 'cover') {
        size = 'nice-tips-cover nice-tips-nopd';
    } else if (type == 'full') {
        size = 'nice-tips-xl';
    } else if (type == 'scroll') {
        size = 'nice-tips-scroll';
    } else if (type == 'middle') {
        size = 'nice-tips-md';
    } else if (type == 'small') {
        size = 'nice-tips-sm';
    }

    var template = '\
	<div class="nice-tips ' + size + ' nice-tips-open">\
		<div class="nice-tips-overlay" ' + maskStyle + '></div>\
		<div class="nice-tips-body">\
			<div class="nice-tips-content">\
				'+ html + '\
			</div>\
			<div class="btn-close-tips">\
				<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1553064665406" class="icon w-32" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3368" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M512 12C235.9 12 12 235.9 12 512s223.9 500 500 500 500-223.9 500-500S788.1 12 512 12z m166.3 609.7c15.6 15.6 15.6 40.9 0 56.6-7.8 7.8-18 11.7-28.3 11.7s-20.5-3.9-28.3-11.7L512 568.6 402.3 678.3c-7.8 7.8-18 11.7-28.3 11.7s-20.5-3.9-28.3-11.7c-15.6-15.6-15.6-40.9 0-56.6L455.4 512 345.7 402.3c-15.6-15.6-15.6-40.9 0-56.6 15.6-15.6 40.9-15.6 56.6 0L512 455.4l109.7-109.7c15.6-15.6 40.9-15.6 56.6 0 15.6 15.6 15.6 40.9 0 56.6L568.6 512l109.7 109.7z" p-id="3369"></path></svg>\
			</div>\
		</div>\
	</div>\
	';

    var popup = $(template);
    $('body').append(popup);
    $('body').addClass('modal-open');
    if (typeof lazyLoadInstance !== "undefined") {
        lazyLoadInstance.update();
    }

    var close = function () {
        $('body').removeClass('modal-open');
        $(popup).removeClass('nice-tips-open');
        $(popup).addClass('nice-tips-close');
        setTimeout(function () {
            $(popup).removeClass('nice-tips-close');
            setTimeout(function () {
                popup.remove();
            }, 200);
        }, 600);
    }

    $(popup).on('click touchstart', '.btn-close-tips, .nice-tips-overlay', function (event) {
        event.preventDefault();
        close();
    });


    if (typeof btnCallBack == 'object') {
        Object.keys(btnCallBack).forEach(function (key) {

            $(popup).on('click touchstart', key, function (event) {

                var ret = btnCallBack[key](event, close);

            });

        });
    }
    return popup;
}

/* ---------------------------------------------- /*
	* qrcode 二维码
/* ---------------------------------------------- */
(function (r) {
    r.fn.qrcode = function (h) {
        var s;
        function u(a) {
            this.mode = s;
            this.data = a
        }
        function o(a, c) {
            this.typeNumber = a;
            this.errorCorrectLevel = c;
            this.modules = null;
            this.moduleCount = 0;
            this.dataCache = null;
            this.dataList = []
        }
        function q(a, c) {
            if (void 0 == a.length)
                throw Error(a.length + "/" + c);
            for (var d = 0; d < a.length && 0 == a[d];)
                d++;
            this.num = Array(a.length - d + c);
            for (var b = 0; b < a.length - d; b++)
                this.num[b] = a[b + d]
        }
        function p(a, c) {
            this.totalCount = a;
            this.dataCount = c
        }
        function t() {
            this.buffer = [];
            this.length = 0
        }
        u.prototype = {
            getLength: function () {
                return this.data.length
            },
            write: function (a) {
                for (var c = 0; c < this.data.length; c++)
                    a.put(this.data.charCodeAt(c), 8)
            }
        };
        o.prototype = {
            addData: function (a) {
                this.dataList.push(new u(a));
                this.dataCache = null
            },
            isDark: function (a, c) {
                if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c)
                    throw Error(a + "," + c);
                return this.modules[a][c]
            },
            getModuleCount: function () {
                return this.moduleCount
            },
            make: function () {
                if (1 > this.typeNumber) {
                    for (var a = 1, a = 1; 40 > a; a++) {
                        for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e = 0; e < c.length; e++)
                            b += c[e].dataCount;
                        for (e = 0; e < this.dataList.length; e++)
                            c = this.dataList[e],
                                d.put(c.mode, 4),
                                d.put(c.getLength(), j.getLengthInBits(c.mode, a)),
                                c.write(d);
                        if (d.getLengthInBits() <= 8 * b)
                            break
                    }
                    this.typeNumber = a
                }
                this.makeImpl(!1, this.getBestMaskPattern())
            },
            makeImpl: function (a, c) {
                this.moduleCount = 4 * this.typeNumber + 17;
                this.modules = Array(this.moduleCount);
                for (var d = 0; d < this.moduleCount; d++) {
                    this.modules[d] = Array(this.moduleCount);
                    for (var b = 0; b < this.moduleCount; b++)
                        this.modules[d][b] = null
                }
                this.setupPositionProbePattern(0, 0);
                this.setupPositionProbePattern(this.moduleCount - 7, 0);
                this.setupPositionProbePattern(0, this.moduleCount - 7);
                this.setupPositionAdjustPattern();
                this.setupTimingPattern();
                this.setupTypeInfo(a, c);
                7 <= this.typeNumber && this.setupTypeNumber(a);
                null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                this.mapData(this.dataCache, c)
            },
            setupPositionProbePattern: function (a, c) {
                for (var d = -1; 7 >= d; d++)
                    if (!(-1 >= a + d || this.moduleCount <= a + d))
                        for (var b = -1; 7 >= b; b++)
                            -1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] = 0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
            },
            getBestMaskPattern: function () {
                for (var a = 0, c = 0, d = 0; 8 > d; d++) {
                    this.makeImpl(!0, d);
                    var b = j.getLostPoint(this);
                    if (0 == d || a > b)
                        a = b,
                            c = d
                }
                return c
            },
            createMovieClip: function (a, c, d) {
                a = a.createEmptyMovieClip(c, d);
                this.make();
                for (c = 0; c < this.modules.length; c++)
                    for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) {
                        var e = 1 * b;
                        this.modules[c][b] && (a.beginFill(0, 100),
                            a.moveTo(e, d),
                            a.lineTo(e + 1, d),
                            a.lineTo(e + 1, d + 1),
                            a.lineTo(e, d + 1),
                            a.endFill())
                    }
                return a
            },
            setupTimingPattern: function () {
                for (var a = 8; a < this.moduleCount - 8; a++)
                    null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                for (a = 8; a < this.moduleCount - 8; a++)
                    null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
            },
            setupPositionAdjustPattern: function () {
                for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++)
                    for (var d = 0; d < a.length; d++) {
                        var b = a[c]
                            , e = a[d];
                        if (null == this.modules[b][e])
                            for (var f = -2; 2 >= f; f++)
                                for (var i = -2; 2 >= i; i++)
                                    this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                    }
            },
            setupTypeNumber: function (a) {
                for (var c = j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                    var b = !a && 1 == (c >> d & 1);
                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
                }
                for (d = 0; 18 > d; d++)
                    b = !a && 1 == (c >> d & 1),
                        this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
            },
            setupTypeInfo: function (a, c) {
                for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
                    var e = !a && 1 == (d >> b & 1);
                    6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
                }
                for (b = 0; 15 > b; b++)
                    e = !a && 1 == (d >> b & 1),
                        8 > b ? this.modules[8][this.moduleCount - b - 1] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e;
                this.modules[this.moduleCount - 8][8] = !a
            },
            mapData: function (a, c) {
                for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 < i; i -= 2)
                    for (6 == i && i--; ;) {
                        for (var g = 0; 2 > g; g++)
                            if (null == this.modules[b][i - g]) {
                                var n = !1;
                                f < a.length && (n = 1 == (a[f] >>> e & 1));
                                j.getMask(c, b, i - g) && (n = !n);
                                this.modules[b][i - g] = n;
                                e--;
                                -1 == e && (f++,
                                    e = 7)
                            }
                        b += d;
                        if (0 > b || this.moduleCount <= b) {
                            b -= d;
                            d = -d;
                            break
                        }
                    }
            }
        };
        o.PAD0 = 236;
        o.PAD1 = 17;
        o.createData = function (a, c, d) {
            for (var c = p.getRSBlocks(a, c), b = new t, e = 0; e < d.length; e++) {
                var f = d[e];
                b.put(f.mode, 4);
                b.put(f.getLength(), j.getLengthInBits(f.mode, a));
                f.write(b)
            }
            for (e = a = 0; e < c.length; e++)
                a += c[e].dataCount;
            if (b.getLengthInBits() > 8 * a)
                throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
            for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;)
                b.putBit(!1);
            for (; !(b.getLengthInBits() >= 8 * a);) {
                b.put(o.PAD0, 8);
                if (b.getLengthInBits() >= 8 * a)
                    break;
                b.put(o.PAD1, 8)
            }
            return o.createBytes(b, c)
        }
            ;
        o.createBytes = function (a, c) {
            for (var d = 0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
                var n = c[g].dataCount
                    , h = c[g].totalCount - n
                    , b = Math.max(b, n)
                    , e = Math.max(e, h);
                f[g] = Array(n);
                for (var k = 0; k < f[g].length; k++)
                    f[g][k] = 255 & a.buffer[k + d];
                d += n;
                k = j.getErrorCorrectPolynomial(h);
                n = (new q(f[g], k.getLength() - 1)).mod(k);
                i[g] = Array(k.getLength() - 1);
                for (k = 0; k < i[g].length; k++)
                    h = k + n.getLength() - i[g].length,
                        i[g][k] = 0 <= h ? n.get(h) : 0
            }
            for (k = g = 0; k < c.length; k++)
                g += c[k].totalCount;
            d = Array(g);
            for (k = n = 0; k < b; k++)
                for (g = 0; g < c.length; g++)
                    k < f[g].length && (d[n++] = f[g][k]);
            for (k = 0; k < e; k++)
                for (g = 0; g < c.length; g++)
                    k < i[g].length && (d[n++] = i[g][k]);
            return d
        }
            ;
        s = 4;
        for (var j = {
            PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (a) {
                for (var c = a << 10; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);)
                    c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15);
                return (a << 10 | c) ^ j.G15_MASK
            },
            getBCHTypeNumber: function (a) {
                for (var c = a << 12; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G18);)
                    c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18);
                return a << 12 | c
            },
            getBCHDigit: function (a) {
                for (var c = 0; 0 != a;)
                    c++,
                        a >>>= 1;
                return c
            },
            getPatternPosition: function (a) {
                return j.PATTERN_POSITION_TABLE[a - 1]
            },
            getMask: function (a, c, d) {
                switch (a) {
                    case 0:
                        return 0 == (c + d) % 2;
                    case 1:
                        return 0 == c % 2;
                    case 2:
                        return 0 == d % 3;
                    case 3:
                        return 0 == (c + d) % 3;
                    case 4:
                        return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                    case 5:
                        return 0 == c * d % 2 + c * d % 3;
                    case 6:
                        return 0 == (c * d % 2 + c * d % 3) % 2;
                    case 7:
                        return 0 == (c * d % 3 + (c + d) % 2) % 2;
                    default:
                        throw Error("bad maskPattern:" + a);
                }
            },
            getErrorCorrectPolynomial: function (a) {
                for (var c = new q([1], 0), d = 0; d < a; d++)
                    c = c.multiply(new q([1, l.gexp(d)], 0));
                return c
            },
            getLengthInBits: function (a, c) {
                if (1 <= c && 10 > c)
                    switch (a) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case s:
                            return 8;
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + a);
                    }
                else if (27 > c)
                    switch (a) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case s:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + a);
                    }
                else if (41 > c)
                    switch (a) {
                        case 1:
                            return 14;
                        case 2:
                            return 13;
                        case s:
                            return 16;
                        case 8:
                            return 12;
                        default:
                            throw Error("mode:" + a);
                    }
                else
                    throw Error("type:" + c);
            },
            getLostPoint: function (a) {
                for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++)
                    for (var e = 0; e < c; e++) {
                        for (var f = 0, i = a.isDark(b, e), g = -1; 1 >= g; g++)
                            if (!(0 > b + g || c <= b + g))
                                for (var h = -1; 1 >= h; h++)
                                    0 > e + h || c <= e + h || 0 == g && 0 == h || i == a.isDark(b + g, e + h) && f++;
                        5 < f && (d += 3 + f - 5)
                    }
                for (b = 0; b < c - 1; b++)
                    for (e = 0; e < c - 1; e++)
                        if (f = 0,
                            a.isDark(b, e) && f++,
                            a.isDark(b + 1, e) && f++,
                            a.isDark(b, e + 1) && f++,
                            a.isDark(b + 1, e + 1) && f++,
                            0 == f || 4 == f)
                            d += 3;
                for (b = 0; b < c; b++)
                    for (e = 0; e < c - 6; e++)
                        a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e + 2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40);
                for (e = 0; e < c; e++)
                    for (b = 0; b < c - 6; b++)
                        a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40);
                for (e = f = 0; e < c; e++)
                    for (b = 0; b < c; b++)
                        a.isDark(b, e) && f++;
                a = Math.abs(100 * f / c / c - 50) / 5;
                return d + 10 * a
            }
        }, l = {
            glog: function (a) {
                if (1 > a)
                    throw Error("glog(" + a + ")");
                return l.LOG_TABLE[a]
            },
            gexp: function (a) {
                for (; 0 > a;)
                    a += 255;
                for (; 256 <= a;)
                    a -= 255;
                return l.EXP_TABLE[a]
            },
            EXP_TABLE: Array(256),
            LOG_TABLE: Array(256)
        }, m = 0; 8 > m; m++)
            l.EXP_TABLE[m] = 1 << m;
        for (m = 8; 256 > m; m++)
            l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8];
        for (m = 0; 255 > m; m++)
            l.LOG_TABLE[l.EXP_TABLE[m]] = m;
        q.prototype = {
            get: function (a) {
                return this.num[a]
            },
            getLength: function () {
                return this.num.length
            },
            multiply: function (a) {
                for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++)
                    for (var b = 0; b < a.getLength(); b++)
                        c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)));
                return new q(c, 0)
            },
            mod: function (a) {
                if (0 > this.getLength() - a.getLength())
                    return this;
                for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++)
                    d[b] = this.get(b);
                for (b = 0; b < a.getLength(); b++)
                    d[b] ^= l.gexp(l.glog(a.get(b)) + c);
                return (new q(d, 0)).mod(a)
            }
        };
        p.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
        p.getRSBlocks = function (a, c) {
            var d = p.getRsBlockTable(a, c);
            if (void 0 == d)
                throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
            for (var b = d.length / 3, e = [], f = 0; f < b; f++)
                for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++)
                    e.push(new p(g, j));
            return e
        }
            ;
        p.getRsBlockTable = function (a, c) {
            switch (c) {
                case 1:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                case 0:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                case 3:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 2];
                case 2:
                    return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
            }
        }
            ;
        t.prototype = {
            get: function (a) {
                return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
            },
            put: function (a, c) {
                for (var d = 0; d < c; d++)
                    this.putBit(1 == (a >>> c - d - 1 & 1))
            },
            getLengthInBits: function () {
                return this.length
            },
            putBit: function (a) {
                var c = Math.floor(this.length / 8);
                this.buffer.length <= c && this.buffer.push(0);
                a && (this.buffer[c] |= 128 >>> this.length % 8);
                this.length++
            }
        };
        "string" === typeof h && (h = {
            text: h
        });
        if ($('body').hasClass('nice-dark-mode')) {
            h = r.extend({}, {
                render: "canvas",
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#383E43",
                foreground: "#8da4e8"
            }, h);
        } else {
            h = r.extend({}, {
                render: "canvas",
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#fff",
                foreground: "#17a2b8"
            }, h);
        }
        return this.each(function () {
            var a;
            if ("canvas" == h.render) {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                var c = document.createElement("canvas");
                c.width = h.width;
                c.height = h.height;
                for (var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++)
                    for (var i = 0; i < a.getModuleCount(); i++) {
                        d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
                        var g = Math.ceil((i + 1) * b) - Math.floor(i * b)
                            , j = Math.ceil((f + 1) * b) - Math.floor(f * b);
                        d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
                    }
            } else {
                a = new o(h.typeNumber, h.correctLevel);
                a.addData(h.text);
                a.make();
                c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background);
                d = h.width / a.getModuleCount();
                b = h.height / a.getModuleCount();
                for (e = 0; e < a.getModuleCount(); e++) {
                    f = r("<tr></tr>").css("height", b + "px").appendTo(c);
                    for (i = 0; i < a.getModuleCount(); i++)
                        r("<td></td>").css("width", d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
                }
            }
            a = c;
            jQuery(a).appendTo(this)
        })
    }
}
)(jQuery);



/* ---------------------------------------------- /*
	*  tocbot.js
/* ---------------------------------------------- */
!function (e) {
    function t(o) {
        if (n[o])
            return n[o].exports;
        var l = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(l.exports, l, l.exports, t),
            l.l = !0,
            l.exports
    }
    var n = {};
    t.m = e,
        t.c = n,
        t.d = function (e, n, o) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: o
            })
        }
        ,
        t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e.default
            }
                : function () {
                    return e
                }
                ;
            return t.d(n, "a", n),
                n
        }
        ,
        t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        t.p = "",
        t(t.s = 0)
}([function (e, t, n) {
    (function (o) {
        var l, i, r;
        !function (n, o) {
            i = [],
                l = o(n),
                void 0 !== (r = "function" == typeof l ? l.apply(t, i) : l) && (e.exports = r)
        }(void 0 !== o ? o : this.window || this.global, function (e) {
            "use strict";
            function t() {
                for (var e = {}, t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n)
                        m.call(n, o) && (e[o] = n[o])
                }
                return e
            }
            function o(e, t, n) {
                t || (t = 250);
                var o, l;
                return function () {
                    var i = n || this
                        , r = +new Date
                        , s = arguments;
                    o && r < o + t ? (clearTimeout(l),
                        l = setTimeout(function () {
                            o = r,
                                e.apply(i, s)
                        }, t)) : (o = r,
                            e.apply(i, s))
                }
            }
            var l, i, r = n(2), s = {}, c = {}, a = n(3), u = n(4);
            if ("undefined" != typeof window) {
                var d, f = !!e.document.querySelector && !!e.addEventListener, m = Object.prototype.hasOwnProperty;
                return c.destroy = function () {
                    try {
                        document.querySelector(s.tocSelector).innerHTML = ""
                    } catch (e) {
                        console.warn("Element not found: " + s.tocSelector)
                    }
                    document.removeEventListener("scroll", this._scrollListener, !1),
                        document.removeEventListener("resize", this._scrollListener, !1),
                        l && document.removeEventListener("click", this._clickListener, !1)
                }
                    ,
                    c.init = function (e) {
                        if (f && (s = t(r, e || {}),
                            this.options = s,
                            this.state = {},
                            s.scrollSmooth && (c.scrollSmooth = n(5).initSmoothScrolling({
                                duration: s.scrollSmoothDuration
                            })),
                            l = a(s),
                            i = u(s),
                            this._buildHtml = l,
                            this._parseContent = i,
                            c.destroy(),
                            null !== (d = i.selectHeadings(s.contentSelector, s.headingSelector)))) {
                            var m = i.nestHeadingsArray(d)
                                , h = m.nest;
                            return l.render(s.tocSelector, h),
                                this._scrollListener = o(function (e) {
                                    l.updateToc(d);
                                    var t = e && e.target && e.target.scrollingElement && 0 === e.target.scrollingElement.scrollTop;
                                    (e && (0 === e.eventPhase || null === e.currentTarget) || t) && (l.enableTocAnimation(),
                                        l.updateToc(d),
                                        s.scrollEndCallback && s.scrollEndCallback(e))
                                }, s.throttleTimeout),
                                this._scrollListener(),
                                document.addEventListener("scroll", this._scrollListener, !1),
                                document.addEventListener("resize", this._scrollListener, !1),
                                this._clickListener = o(function (e) {
                                    s.scrollSmooth && l.disableTocAnimation(e),
                                        l.updateToc(d)
                                }, s.throttleTimeout),
                                document.addEventListener("click", this._clickListener, !1),
                                this
                        }
                    }
                    ,
                    c.refresh = function (e) {
                        c.destroy(),
                            c.init(e || this.options)
                    }
                    ,
                    e.tocbot = c,
                    c
            }
        })
    }
    ).call(t, n(1))
}
    , function (e, t) {
        var n;
        n = function () {
            return this
        }();
        try {
            n = n || Function("return this")() || (0,
                eval)("this")
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }
    , function (e, t) {
        e.exports = {
            tocSelector: ".js-toc",
            contentSelector: ".js-toc-content",
            headingSelector: "h1, h2, h3",
            ignoreSelector: ".js-toc-ignore",
            linkClass: "toc-link",
            extraLinkClasses: "",
            activeLinkClass: "is-active-link",
            listClass: "toc-list",
            extraListClasses: "",
            isCollapsedClass: "is-collapsed",
            collapsibleClass: "is-collapsible",
            listItemClass: "toc-list-item",
            collapseDepth: 0,
            scrollSmooth: !0,
            scrollSmoothDuration: 420,
            scrollEndCallback: function (e) { },
            headingsOffset: 1,
            throttleTimeout: 50,
            positionFixedSelector: null,
            positionFixedClass: "is-position-fixed",
            fixedSidebarOffset: "auto",
            includeHtml: !1,
            onClick: !1
        }
    }
    , function (e, t) {
        e.exports = function (e) {
            function t(e, n) {
                var i = n.appendChild(o(e));
                if (e.children.length) {
                    var r = l(e.isCollapsed);
                    e.children.forEach(function (e) {
                        t(e, r)
                    }),
                        i.appendChild(r)
                }
            }
            function n(e, n) {
                var o = l(!1);
                n.forEach(function (e) {
                    t(e, o)
                });
                var i = document.querySelector(e);
                if (null !== i)
                    return i.firstChild && i.removeChild(i.firstChild),
                        i.appendChild(o)
            }
            function o(t) {
                var n = document.createElement("li")
                    , o = document.createElement("a");
                return e.listItemClass && n.setAttribute("class", e.listItemClass),
                    e.onClick && (o.onclick = e.onClick),
                    e.includeHtml && t.childNodes.length ? u.call(t.childNodes, function (e) {
                        o.appendChild(e.cloneNode(!0))
                    }) : o.textContent = t.textContent,
                    o.setAttribute("href", "#" + t.id),
                    o.setAttribute("class", e.linkClass + h + "node-name--" + t.nodeName + h + e.extraLinkClasses),
                    n.appendChild(o),
                    n
            }
            function l(t) {
                var n = document.createElement("ol")
                    , o = e.listClass + h + e.extraListClasses;
                return t && (o += h + e.collapsibleClass,
                    o += h + e.isCollapsedClass),
                    n.setAttribute("class", o),
                    n
            }
            function i() {
                var t = document.documentElement.scrollTop || f.scrollTop
                    , n = document.querySelector(e.positionFixedSelector);
                "auto" === e.fixedSidebarOffset && (e.fixedSidebarOffset = document.querySelector(e.tocSelector).offsetTop),
                    t > e.fixedSidebarOffset ? -1 === n.className.indexOf(e.positionFixedClass) && (n.className += h + e.positionFixedClass) : n.className = n.className.split(h + e.positionFixedClass).join("")
            }
            function r(t) {
                var n = document.documentElement.scrollTop || f.scrollTop;
                e.positionFixedSelector && i();
                var o, l = t;
                if (m && null !== document.querySelector(e.tocSelector) && l.length > 0) {
                    d.call(l, function (t, i) {
                        if (t.offsetTop > n + e.headingsOffset + 10) {
                            return o = l[0 === i ? i : i - 1],
                                !0
                        }
                        if (i === l.length - 1)
                            return o = l[l.length - 1],
                                !0
                    });
                    var r = document.querySelector(e.tocSelector).querySelectorAll("." + e.linkClass);
                    u.call(r, function (t) {
                        t.className = t.className.split(h + e.activeLinkClass).join("")
                    });
                    var c = document.querySelector(e.tocSelector).querySelector("." + e.linkClass + ".node-name--" + o.nodeName + '[href="#' + o.id + '"]');
                    c.className += h + e.activeLinkClass;
                    var a = document.querySelector(e.tocSelector).querySelectorAll("." + e.listClass + "." + e.collapsibleClass);
                    u.call(a, function (t) {
                        var n = h + e.isCollapsedClass;
                        -1 === t.className.indexOf(n) && (t.className += h + e.isCollapsedClass)
                    }),
                        c.nextSibling && (c.nextSibling.className = c.nextSibling.className.split(h + e.isCollapsedClass).join("")),
                        s(c.parentNode.parentNode)
                }
            }
            function s(t) {
                return -1 !== t.className.indexOf(e.collapsibleClass) ? (t.className = t.className.split(h + e.isCollapsedClass).join(""),
                    s(t.parentNode.parentNode)) : t
            }
            function c(t) {
                var n = t.target || t.srcElement;
                "string" == typeof n.className && -1 !== n.className.indexOf(e.linkClass) && (m = !1)
            }
            function a() {
                m = !0
            }
            var u = [].forEach
                , d = [].some
                , f = document.body
                , m = !0
                , h = " ";
            return {
                enableTocAnimation: a,
                disableTocAnimation: c,
                render: n,
                updateToc: r
            }
        }
    }
    , function (e, t) {
        e.exports = function (e) {
            function t(e) {
                return e[e.length - 1]
            }
            function n(e) {
                return +e.nodeName.split("H").join("")
            }
            function o(t) {
                var o = {
                    id: t.id,
                    children: [],
                    nodeName: t.nodeName,
                    headingLevel: n(t),
                    textContent: t.textContent.trim()
                };
                return e.includeHtml && (o.childNodes = t.childNodes),
                    o
            }
            function l(l, i) {
                for (var r = o(l), s = n(l), c = i, a = t(c), u = a ? a.headingLevel : 0, d = s - u; d > 0;)
                    a = t(c),
                        a && void 0 !== a.children && (c = a.children),
                        d--;
                return s >= e.collapseDepth && (r.isCollapsed = !0),
                    c.push(r),
                    c
            }
            function i(t, n) {
                var o = n;
                e.ignoreSelector && (o = n.split(",").map(function (t) {
                    return t.trim() + ":not(" + e.ignoreSelector + ")"
                }));
                try {
                    return document.querySelector(t).querySelectorAll(o)
                } catch (e) {
                    return console.warn("Element not found: " + t),
                        null
                }
            }
            function r(e) {
                return s.call(e, function (e, t) {
                    return l(o(t), e.nest),
                        e
                }, {
                    nest: []
                })
            }
            var s = [].reduce;
            return {
                nestHeadingsArray: r,
                selectHeadings: i
            }
        }
    }
    , function (e, t) {
        function n(e) {
            function t(e) {
                return "a" === e.tagName.toLowerCase() && (e.hash.length > 0 || "#" === e.href.charAt(e.href.length - 1)) && (n(e.href) === r || n(e.href) + "#" === r)
            }
            function n(e) {
                return e.slice(0, e.lastIndexOf("#"))
            }
            function l(e) {
                var t = document.getElementById(e.substring(1));
                t && (/^(?:a|select|input|button|textarea)$/i.test(t.tagName) || (t.tabIndex = -1),
                    t.focus())
            }
            !function () {
                document.documentElement.style
            }();
            var i = e.duration
                , r = location.hash ? n(location.href) : location.href;
            !function () {
                function e(e) {
                    !t(e.target) || e.target.className.indexOf("no-smooth-scroll") > -1 || "#" === e.target.href.charAt(e.target.href.length - 2) && "!" === e.target.href.charAt(e.target.href.length - 1) || (e.preventDefault(),
                        o(e.target.hash, {
                            duration: i,
                            callback: function () {
                                l(e.target.hash)
                            }
                        }))
                }
                document.body.addEventListener("click", e, !1)
            }()
        }
        function o(e, t) {
            function n(e) {
                r = e - i,
                    window.scrollTo(0, c.easing(r, s, u, d)),
                    r < d ? requestAnimationFrame(n) : o()
            }
            function o() {
                window.scrollTo(0, s + u),
                    "function" == typeof c.callback && c.callback()
            }
            function l(e, t, n, o) {
                return (e /= o / 2) < 1 ? n / 2 * e * e + t : (e--,
                    -n / 2 * (e * (e - 2) - 1) + t)
            }
            var i, r, s = window.pageYOffset, c = {
                duration: t.duration,
                offset: t.offset || 0,
                callback: t.callback,
                easing: t.easing || l
            }, a = document.querySelector('[id="' + e.split("#").join("") + '"]'), u = "string" == typeof e ? c.offset + (e ? a && a.getBoundingClientRect().top || 0 : -(document.documentElement.scrollTop || document.body.scrollTop)) : e, d = "function" == typeof c.duration ? c.duration(u) : c.duration;
            requestAnimationFrame(function (e) {
                i = e,
                    n(e)
            })
        }
        t.initSmoothScrolling = n
    }
]);

