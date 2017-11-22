define([
    'jquery'
], function ($) {
    'use strict';

    var sectionContainer = function () {
        var obj = {
            clearBox : function(){
                for(var i=0, len=obj.orderArr.length;i<len;i++){
                    if(obj.orderArr[i].buy) obj.orderArr[i].buy = 0;
                }
            },
            detail: {
                id: '1',
                title: '烤鸭',
                cover: 'assets/img/main/kaoya.png',
                sale: '2201',
                zan: '345',
                price: 55,
                unit: '元/斤',
                buy: 0,
                desc: '烤鸭 赠送热汤+米饭'
            },
            orderArr: [
                {
                    id: '1',
                    title: '烤鸭',
                    cover: 'assets/img/main/kaoya.png',
                    sale: '2201',
                    zan: '345',
                    price: 55,
                    unit: '元/斤',
                    buy: 0,
                    desc: '烤鸭 赠送热汤+米饭'
                },
                {
                    id: '2',
                    title: '盐水鸭',
                    cover: 'assets/img/main/yanshuiya.png',
                    sale: '2231',
                    zan: '131',
                    price: 32,
                    unit: '元/斤',
                    buy: 2,
                    desc: '烤鸭 赠送热汤+米饭'
                },
                {
                    id: '3',
                    title: '烧鸡',
                    cover: 'assets/img/main/shaoji.png',
                    sale: '3421',
                    zan: '22',
                    price: 44,
                    unit: '元/斤',
                    buy: 0,
                    desc: '烤鸭 赠送热汤+米饭'
                },
                {
                    id: '4',
                    title: '烤鸭',
                    cover: 'assets/img/main/kaoya.png',
                    sale: '2201',
                    zan: '345',
                    price: 55,
                    unit: '元/斤',
                    buy: 4,
                    desc: '烤鸭 赠送热汤+米饭'
                },
                {
                    id: '5',
                    title: '盐水鸭',
                    cover: 'assets/img/main/yanshuiya.png',
                    sale: '2231',
                    zan: '131',
                    price: 32,
                    unit: '元/斤',
                    buy: 0,
                    desc: '烤鸭 赠送热汤+米饭'
                },
                {
                    id: '6',
                    title: '烧鸡',
                    cover: 'assets/img/main/shaoji.png',
                    sale: '3421',
                    zan: '22',
                    price: 44,
                    unit: '元/斤',
                    buy: 0,
                    desc: '烤鸭 赠送热汤+米饭'
                }
            ]
        };

        $('#section_container').render(obj);
    };

    sectionContainer();
});