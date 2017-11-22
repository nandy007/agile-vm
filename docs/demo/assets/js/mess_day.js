define([
    'jquery',
], function($) {
    'use strict';

    var id;
    location.href.replace(/id\=([\w]+)/, function(s, s1){
        id = s1;
    });

    var titles = ['周一菜单', '周二菜单', '周三菜单', '周四菜单', '周五菜单', '周六菜单', '周日菜单'];
    
    var daySection = function(){
        var obj = {
            title : titles[id-1],
            menuArr : [
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : '<span class="menu_tuijian">推荐</span>'
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : '<span class="menu_renqi">人气</span>'
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                },
                {
                    title: '北京烤鸭',
                    cover: 'assets/img/main/temp.png',
                    time : '9:00-12:30',
                    desc : '配料：鸭子、葱丝、黄瓜丝、甜面酱、薄饼卷',
                    tagType : ''
                }
            ]
        };

        $('#day_section').render(obj);
    };

    daySection();
});