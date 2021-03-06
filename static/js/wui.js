export default window.wui = {
        apiKey: function (access_key='CjPEeIhTiQ98cjZ6',secret_key='ca1395a95bcb45bc9b70f925f09ed9e7') {
            return {
                access_key,
                secret_key
            }
        },
        formatDateTime: function () {
            var date=new Date()
            var month=date.getMonth() + 1;
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
        timestamp: function () {
            return new Date().getTime();
        },
        loading: function(status){
            if(status==='close'){
                $('.wui-loading').remove();
            }else if(status==='full'){
                var $loading = '<div class="wui-loading full"></div>';
                $('body').append($loading);
            }else{
                var $loading = '<div class="wui-loading"></div>';
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
        getScrollBehavior(from, selector='.scrollBehavior'){
            var $scrollBehavior = document.querySelector(selector);
            if($scrollBehavior){
                var sessionKey = `${from.name}-scrolltop`;
                var scrollTop = $scrollBehavior.scrollTop;
                sessionStorage.setItem(sessionKey,scrollTop);
            }
        },
        setScrollBehavior(to, selector='.scrollBehavior'){
            var $scrollBehavior = document.querySelector(selector);
            //console.log($scrollBehavior);
            if($scrollBehavior){
                var sessionKey = `${to.name}-scrolltop`;
                var scrollTop = sessionStorage.getItem(sessionKey)||0;
                $scrollBehavior.scrollTop = scrollTop;
            }
        },
/*        updropLoad: function (param) {
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

        },*/
    }



