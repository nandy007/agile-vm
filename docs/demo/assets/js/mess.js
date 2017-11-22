define([
    'jquery',
], function($) {
    'use strict';

    var listSection = function(){
        var obj = {
            starFilter : function(index, item){
                var arr = ['推荐指数：'];
                for(var i=0;i<5;i++){
                    arr.push('<i class="icon icon-fav'+(i<item.star?' full':'')+'"></i>');
                }
                item.starText = arr.join('');
            },
            starLength : [{},{},{},{},{}],
            messArr : [
                {
                    id : 1,
                    title : '周一菜单',
                    star : 2,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 345,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 2,
                    title : '周二菜单',
                    star : 1,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 221,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 3,
                    title : '周三菜单',
                    star : 0,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 342,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 4,
                    title : '周四菜单',
                    star : 5,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 666,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 5,
                    title : '周五菜单',
                    star : 2,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 213,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 6,
                    title : '周六菜单',
                    star : 2,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 123,
                    cover : 'assets/img/main/mess_temp.jpg'
                },
                {
                    id : 7,
                    title : '周日菜单',
                    star : 3,
                    desc : '糖醋排骨、北京烤鸭、红烧狮子头、地三鲜',
                    zan : 435,
                    cover : 'assets/img/main/mess_temp.jpg'
                }
                
            ]
        };

        $('#list_section').render(obj);
    };


    listSection();
    
});