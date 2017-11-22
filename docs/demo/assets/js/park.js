define([
    'jquery',
    'framework/third/echarts/echarts.min'
], function ($, echarts) {
    'use strict';

    var getParkInfos = function (parkName, cb) {
        $.req({
            url: 'getParkingLot.json',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                cb(data);
            }
        });
    };

    var curPostion;
    var getPosition = function (cb, isRe) {
        if (!isRe && curPostion) {
            cb(curPostion);
        } else {
            getLBS(cb);
        }
    };
    var getLBS = function (cb) {
        setTimeout(function () {
            cb(curPostion = {
                latitude: 32.3333,
                longitude: 12.1111
            });
        }, 1000);
    };

    var searchSection = function () {
        var obj = {
            searchInfo: '您附近的停车场',
            showSearchTips: function (index) {
                var item = obj.searchArr[index] || {};
                var freeText = '收费', freeStyle = 'cancel', fullText = '有位', fullStyle = 'warn';
                if (item.is_free) {
                    freeText = '免费';
                    freeStyle = 'success';
                }
                if (item.num_available === '0') {
                    fullText = '已满';
                    fullStyle = 'info';
                }
                return '<span class="tips tip-' + freeStyle + '">' + freeText + '</span><span class="tips tip-' + fullStyle + '">' + fullText + '</span>';
            },
            showDetail: function (index) {          
                var item = obj.searchArr[index] || {};
                A.Controller.section('detail_section.html?id=' + item.id);
                return false;
            },
            searchArrFilter: function (index, item) {
                item.distance = $.util.getFlatternDistance(item.latitude, item.longitude, curPostion.latitude, curPostion.longitude, 0);
            },
            searchArr: [],
            seachValue : '',
            doSearch : function(){
                $.util.sync(
                    function (cb) {
                        getParkInfos(obj.seachValue, cb);
                    },
                    function (cb) {
                        getPosition(cb, true);
                    },
                    function (result, position) {
                        obj.seachValue = '';
                        obj.searchArr = result.data;
                    }
                );
            }
        };

        $('#search_section').render(obj);

        obj.doSearch();


        var detailObj = detailSection();
    };


    var detailSection = function () {
        var obj = {
            parkShowDetail: function () {
                $(this).addClass('active').siblings('.active').removeClass('active');
            },
            parks: []
        };

        $('#detail_section').on('sectionshow', function () {
            var params = A.Component.params(this);
            obj.parks = [];
            $.req({
                url: 'getParkingLotInfo.json',
                data: 'id=' + params.id,
                dataType: 'json',
                success: function (result) {
                    obj.parks = result.data;
                    var data = {
                        num_available : 0,
                        num_unavailable : 0,
                        num_kuan : 0,
                        num_chong : 0
                    };
                    $.util.each(obj.parks, function(i, item){
                        for(var k in data){
                            data[k] += (+ item[k]);
                        }
                    });
                    drawCanvas(data);
                }
            });
        }).render(obj);

        return obj;
    };

    var drawCanvas = function (data) {
        var myChart = echarts.init(document.getElementById('bi_canvas'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                show: false,
                text: '',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#fce051', '#147C7C', '#AFA9FE', '#FE8080'],
            legend: {
                show: false,
                x: 'center',
                y: 'bottom',
                data: []
            },
            toolbox: {
                show: false,
                feature: {
                    mark: { show: false },
                    dataView: { show: true, readOnly: false },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: { show: false },
                    saveAsImage: { show: false }
                }
            },
            calculable: true,
            series: [
                {
                    name: '车位概览',
                    type: 'pie',
                    radius: [0, 100],
                    roseType: 'area',
                    data: [
                        { value: data.num_available, name: '空位' },
                        { value: data.num_chong, name: '充电车位' },
                        { value: data.num_kuan, name: '超宽车位' },
                        { value: data.num_unavailable, name: '已停车位' }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    };


    searchSection();
});
