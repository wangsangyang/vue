<template>
    <div class="page page-home bgcolor">
        <h3 class="p-title">笑话大全
            <span class="s1"></span>/
            <span class="s2"></span>/
            <span class="s3"></span>/
        </h3>
        <div class="content">
            <div id="refresh" class="wui-updropload">
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

            wui.updropLoad(
                {
                    target: '#refresh',
                    callback: pullupRefresh
                }
            );


        }
    }
</script>