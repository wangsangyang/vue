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
            $('#wui-ajaxerror').on('touchend click',function () {
                callback();
            });
        }
    }



