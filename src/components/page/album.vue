<template>
    <div class="page page-album bgcolor">
        <h3 class="p-title">花瓣福利</h3>
        <div class="content">
            <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="box">
                        <li class="list" v-for="img in imgArray" v-if="img.thumb">
                            <dl>
                                <dt><img v-bind:src="img.thumb"></dt>
                                <dd>{{img.title}}</dd>
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
        name: 'album',
        data: function () {
            return {
                imgArray: []
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
            console.log('相册页');
            const that = this;
            const url = 'http://route.showapi.com/819-1';//花瓣福利api
            const paramObj = {};
            paramObj.showapi_timestamp = wui.formatDateTime();
            paramObj.showapi_appid = wui.getKey().showapi_appid;
            paramObj.showapi_sign = wui.getKey().showapi_sign;
            paramObj.type = '35';
            paramObj.page = 1;
            paramObj.rows = 20;

            pullupRefresh();

            //上拉加载
            mui.init({
                pullRefresh: {
                    container: '#refreshContainer',
                    up: {
                        height: 50,
                        contentrefresh: "加载中...",
                        contentnomore: '没有更多数据了!',
                        callback: pullupRefresh
                    }
                }
            });

            function pullupRefresh() {
                console.log('下拉刷新，相册');
                paramObj.page += 1;
                $.ajax({
                    type: 'post',
                    url: url,
                    data: paramObj,
                    dataType: 'json',
                    success: function (result) {
                        //console.log(result);
                        //console.log(result.showapi_res_body);
                        if(result.showapi_res_error==''){
                            $.each(result.showapi_res_body,function (index,item) {
                                //console.log(index,item);
                                that.imgArray.push(item);
                            });
                        }else{
                            wui.ajaxerror('发生了未知的错误！');
                        }
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                        wui.loading('close');
                    },
                    error: function (XmlHttpRequest,textStatus) {
                        console.log('错误');
                        console.log(XmlHttpRequest);
                        console.log(textStatus);
                        wui.loading('close');
                        wui.ajaxerror().refresh(pullupRefresh);

                    }
                });
            }
        }

    }
</script>

