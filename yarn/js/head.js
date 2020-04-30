(function ($, window) {
    var Anni = [
        [5, 12],
        [9, 18],
        [12, 13]
    ];
    var d = new Date();
    var nowDay = [d.getMonth() + 1, d.getDate()];
    for (var i = 0; i < Anni.length; i++) {
        if (nowDay[0] == Anni[i][0] && nowDay[1] == Anni[i][1]) {
            $('html').css({
                '-webkit-filter': 'grayscale(100%)',
                '-moz-filter': 'grayscale(100%)',
                '-ms-filter': 'grayscale(100%)',
                '-o-filter': 'grayscale(100%)',
                'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)' //ie
            })
            break;
        }
    }
    //2020清明国家公祭日
    var nowTime = d.getTime();
    var startTime = new Date('2020/04/04 00:00:00').getTime();
    var overTime = new Date('2020/04/05 00:00:00').getTime();
    if (nowTime >= startTime && nowTime < overTime) {
        $('html').css({
            '-webkit-filter': 'grayscale(100%)',
            '-moz-filter': 'grayscale(100%)',
            '-ms-filter': 'grayscale(100%)',
            '-o-filter': 'grayscale(100%)',
            'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)' //ie
        })
    }
}(jQuery, window));