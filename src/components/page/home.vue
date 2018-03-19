<template>
    <div class="page page-home bgcolor">
        <h3 class="p-title">笑话大全
            <span class="s1"></span>/
            <span class="s2"></span>/
            <span class="s3"></span>/
        </h3>
        <div class="content">
            <div id="refreshContainer" class="wui-updropload">
                <div class="wui-container">
                    <ul class="box">
                        <li class="list" v-for="text in textArray">
                            <dl>
                                <dd class="dl-title">{{text.title}}</dd>
                                <dt class="dl-cont">{{ text.text.replace(/(\<)br\s*\/*>/gi,'') }}</dt>
                                <dd class="dl-time">{{text.ct}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';
    import '../../../static/mui/css/mui.min.css';
    import mui from '../../../static/mui/js/mui.min.js';

    export default {
        name: 'home',
        data: function () {
            return {
                textArray: []
            }
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
            wui.loading();
        },
        created: function () {

        },
        mounted: function () {

            var loadmore = function () {
                var target = document.querySelector('#refreshContainer .wui-scroll');
                var startY = 0;
                var top = 0;
                var moveYtimeStamp = [];
                var moveYArray = [];

                var istouch = false;
                target.ontouchstart = function (event) {
                    console.log(event);
                    istouch = true;
                    top = target.style.top?target.style.top.replace('px',''):0;
                    top = parseFloat(top);
                    console.log(top);
                    $('.p-title .s1').text(top);
                    var touch = event.touches[0];
                    startY = touch.pageY;
                    console.log(startY);
                }
                target.ontouchmove = function (event) {
                    $('.p-title .s3').text(istouch);
                    if(istouch){
                        var touch = event.touches[0];
                        var moveY = touch.pageY;
                        moveYtimeStamp.length = 0;
                        moveYArray.length = 0;
                        moveYtimeStamp.push( event.timeStamp );
                        moveYArray.push( moveY);
                        //console.log(moveY);
                        target.style.top = moveY - startY + top + 'px';
                        if(moveY<startY){
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
                target.ontouchend = function (event) {
                    console.log(event);
                    var endY = event.changedTouches[0].pageY;
                    var first_moveYArray = moveYArray[0];
                    var last_moveYtimeStamp = moveYtimeStamp[moveYtimeStamp.length-1];

                    console.log(event.timeStamp-last_moveYtimeStamp);
                    console.log(endY,startY);
                    if( (event.timeStamp-last_moveYtimeStamp)<1000&& Math.abs(endY-startY)>200 ){
                        target.style.top = (endY - startY + top)*3 + 'px';
                    }

                    istouch = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
                target.ontouchcancel = function (event) {
                    istouch = false;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }

            //loadmore();


            console.log('首页');
            const that = this;
            const url = 'http://route.showapi.com/341-1';//笑话大全api
            const paramObj = {};
            paramObj.showapi_timestamp = wui.formatDateTime();
            paramObj.showapi_appid = wui.getKey().showapi_appid;
            paramObj.showapi_sign = wui.getKey().showapi_sign;
            paramObj.page = 0;
            paramObj.maxResult = 10;

            pullupRefresh();

            function pullupRefresh() {
                //wui.loading()
                console.log('下拉刷新，首页');
                paramObj.page += 1;
                //console.log(paramObj);
                $.ajax({
                    type: 'post',
                    url: url,
                    data: paramObj,
                    dataType: 'json',
                    success: function (result) {
                        console.log(result);
                        //console.log(result.showapi_res_body);
                        if(result.showapi_res_error==''){
                            //that.textArray = that.textArray.concat(result.showapi_res_body.contentlist);
                            that.textArray = that.textArray.concat(result.showapi_res_body.contentlist);
                        }else{
                            wui.ajaxerror('发生了未知的错误！');
                        }
                        //mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        if(paramObj.page<=5){
                            wui.updropLoad('reset');
                        }else{
                            wui.updropLoad('end');
                        }

                    },
                    error: function (XmlHttpRequest,textStatus) {
                        console.log('错误');
                        console.log(XmlHttpRequest);
                        console.log(textStatus);
                        wui.ajaxerror().refresh(pullupRefresh);
                    },
                    complete: function () {
                        wui.loading('close');
                    }
                });
            }


            var loadmore1 = function (end) {
                var target = $('#refreshContainer');
                var loading = '<div class="loading"><i class="icon"></i><i class="text">加载中...</i></div>';
                var isloading = true;
                if(end==='end'){
                    isloading = true;
                    target.find('.loading').remove();
                }
                target.scroll(function () {
                    if(isloading){
                        var target_height = parseFloat(target.outerHeight(true));
                        var scroll_height = parseFloat(target.find('.wui-scroll').height());
                        var scrolltop = parseFloat($(this).scrollTop());
                        console.log(scrolltop,target_height,scroll_height);
                        if(scrolltop+target_height>=scroll_height-50){
                            if( target.find('.loading').length<1 ){
                                target.append(loading);
                            }
                            isloading = false;
                            pullupRefresh();
                        }
                    }
                });
            }

            //loadmore1();

            wui.updropLoad(
                {
                    target: '#refreshContainer',
                    callback: pullupRefresh
                }
            );


        }
    }
</script>