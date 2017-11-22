(function () {
    require.config({
        //配置基准地址，请按照实际情况配置
        baseUrl: (document.currentScript.src.split('assets')[0]) + 'assets',
        paths: {
            //配置要引入的第三方类库，地址相对于baseUrl
            jqm: 'framework/third/jquery/jquery.mobile.custom',
            iscroll: 'framework/third/iscroll/iscroll-probe',
            agile: 'framework/agile/js/agile'
        }
    });

    // 定义jquery，以供jqm使用，否则会报错
    define("jquery", function () {
        window.template = $.template;
		return $;
	});

    require(['jqm', 'iscroll'], function (jqm, iscroll) {
        if (!window.IScroll) window.IScroll = iscroll;
        require(['agile'], function () {
            //引入agile后再进行扩展组件和控制器的添加

            A.event.add({
                beforeunload: function () {
                    $(document).on('beforeunload', function () {
                        history.go(-1);
                    });
                }
            });
            //最后启动AL
            A.launch({
                //readyEvent设置为空串即立即启动
                readyEvent: '', //触发ready的事件，在ExMobi中为plusready;由于使用了requirejs，ready事件和plusready事件已失效，AL应立即启动
                backEvent: 'backmonitor'
            });
            var entry = $('script[data-main]').attr('data-entry');
            if(entry) require([entry]);
        });
    });

    // 封装网络请求
    $.req = function(opts){
        var cacheCallback = {};

        if(!opts.url.match(/^http[s]?\:/)){
            opts.url = './' + opts.url;
        }

        cacheCallback.success = opts.success;
        opts.success = function(data){
            if(typeof data==='object'&&data.ret!=='0'){
                opts.error&&opts.error.apply(arguments);
                return;
            }
            cacheCallback.success&&cacheCallback.success.apply(null, arguments);
        };

        cacheCallback.error = opts.error;
        opts.error = function(data){
            A.showToast((data&&data.msg)||'请求错误');
            cacheCallback.error&&cacheCallback.error.apply(null, arguments);
        };
        $.ajax(opts);
    };

})();

(function(){
    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    function getRad(d){
        return d*PI/180.0;
    }
    /**
     * approx distance between two points on earth ellipsoid
     * @param {Object} lat1
     * @param {Object} lng1
     * @param {Object} lat2
     * @param {Object} lng2
     */

    $.util.getFlatternDistance = function(lat1,lng1,lat2,lng2, len){
        lat1 = +lat1;
        lng1 = +lng1;
        var f = getRad((lat1 + lat2)/2);
        var g = getRad((lat1 - lat2)/2);
        var l = getRad((lng1 - lng2)/2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s,c,w,r,d,h1,h2;

        var a = EARTH_RADIUS;

        var fl = 1/298.257;

        sg = sg*sg;
        sl = sl*sl;
        sf = sf*sf;

        s = sg*(1-sl) + (1-sf)*sl;
        c = (1-sg)*(1-sl) + sf*sl;
        w = Math.atan(Math.sqrt(s/c));
        r = Math.sqrt(s*c)/w;
        d = 2*w*a;
        h1 = (3*r -1)/2/c;
        h2 = (3*r +1)/2/s;

        var ret = d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
        if(typeof len==='number'){
            var pow = Math.pow(10,len);
            ret = Math.floor(ret*pow)/pow;
        }
        return ret;
    };
})();