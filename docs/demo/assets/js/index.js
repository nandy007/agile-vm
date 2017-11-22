define([
    'jquery'
], function ($) {
    // do sth.

    var indexSection = function () {
        // 数据注入
        var obj = {
            userinfo: {
                avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1733071988,3600838707&fm=26&gp=0.jpg"></img></span><span class="weather_area_username',
                nikename: '莹莹萧山'
            },
            tuijianArr: [
                {
                    title: '食堂|本周特色推荐',
                    cover: 'assets/img/main/temp.png',
                    desc: '大厨杰克',
                    good: 305
                },
                {
                    title: '食堂|本周特色推荐',
                    cover: 'assets/img/main/temp.png',
                    desc: '大厨杰克',
                    good: 305
                },
                {
                    title: '食堂|本周特色推荐',
                    cover: 'assets/img/main/temp.png',
                    desc: '大厨杰克',
                    good: 305
                }
            ]
        };
        $('#index_section').render(obj);
    };


    indexSection();

});