export default window.wui = {
        getKey: function (showapi_appid='58966',showapi_sign='f2c87a1f55c345ccbd46923e10ab344f') {
            return {
                showapi_appid,
                showapi_sign
            }
        },
        formatDateTime: function () {
            var date=new Date()
            var month=date.getMonth() + 1
            var datetime = date.getFullYear()
                + ""// "年"
                + (month >= 10 ? month : "0"+ month)
                + ""// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
                + ""
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
                + ""
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
                + ""
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
            return datetime;
        },
        loading: function(status){
            if(status==='close'){
                $('#wui-loading').remove();
            }else{
                var $loading = '<div class="wui-loading" id="wui-loading"></div>';
                $('body').append($loading);
            }
            return this;
        },
        ajaxerror: function(status,text){
            var text = text||'请求数据错误，请刷新重试';
            if(status==='close'){
                $('#wui-ajaxerror').remove();
            }else{
                var $ajaxerror = `<div class="wui-ajaxerror" id="wui-ajaxerror"><span class="reset">${text}</span></div>`;
                $('body').append($ajaxerror);
            }
            return this;
        },
        refresh: function (callback) {
            $('#wui-ajaxerror').on('click',function () {
                callback();
            });
            return this;
        },
        updropLoad: function (param) {
            var that = this;
            console.log(param instanceof Object);
            var loading = '<div class="loading"><i class="icon"></i><i class="text">加载中...</i></div>';
            var isloading = true;
            var target = $('.wui-updropload');
            if(param==='reset'){
                isloading = true;
                target.find('.loading').remove();
            }else if(param==='end'){
                isloading = false;
                target.find('.loading').addClass('end').text('没有更多数据了！');
            }else if(param instanceof Object){
                var defaultparam = {
                    target: '.wui-updropload',
                    height: 50,
                    loadingtext: "加载中...",
                    nodata: '没有更多数据了!',
                    callback: function () {}
                };
                var options = Object.assign(defaultparam,param);
                console.log(options);
                target = $(options.target);
                that.target = $(options.target);
                that.height = options.height;
                that.loadingtext = options.loadingtext;
                that.nodata = options.nodata;
                that.callback = options.callback;
            }
            console.log(that.scrolltop);
            that.target.scrollTop(that.scrolltop);
            target.scroll(function () {
                var target_height = target.outerHeight();
                var scroll_height = target.find('.wui-container').height();
                var scrolltop = $(this).scrollTop();
                console.log(scrolltop,target_height,scroll_height);
                if(isloading){
                    that.scrolltop = scrolltop;
                    if(scrolltop+target_height>=scroll_height-50){
                        if( target.find('.loading').length<1 ){
                            target.append(loading);
                        }
                        isloading = false;
                        //options.callback();
                        that.callback();
                    }
                }
            });


        },
    }



