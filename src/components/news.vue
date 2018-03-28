<template>
    <div class="page page-newslist">
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ name: 'newsdetail', query: {type:34} }" :class="{highlight:$route.query.type==34}">段子</router-link></li>
                <li class="menu"><router-link :to="{ name: 'newsdetail', query: {type:35} }" :class="{highlight:$route.query.type==35}">视频</router-link></li>
            </ul>
        </div>
        <div class="content">
            <router-view>
                <ul>
                    <li>
                        <h3></h3>
                        <div class="imgs"></div>
                        <div class="source">
                            <span class="author"></span>
                            <span class="time"></span>
                        </div>
                    </li>
                </ul>
            </router-view>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from './public/footer-nav.vue';
    import 'muicss';
    import mui from 'mui';

    export default {
        name: 'news',
        data: function () {
            return {};
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
        },
        created: function () {

        },
        mounted: function () {

            //console.log(this.$route);
            console.log('新闻页');
            const that = this;
            const url = 'http://route.showapi.com/255-1';//百思不得姐查询接口
            const paramObj = {};
            paramObj.showapi_timestamp = wui.formatDateTime();
            paramObj.showapi_appid = wui.getKey().showapi_appid;
            paramObj.showapi_sign = wui.getKey().showapi_sign;
            paramObj.type = 29 ;
            paramObj.title = '';
            paramObj.rows = 10;
            paramObj.page = 0;

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
                paramObj.page += 1;
                $.ajax({
                    type: 'post',
                    url: url,
                    data: paramObj,
                    dataType: 'json',
                    success: function (result) {
                        console.log(result);
                        //console.log(result.showapi_res_body);
                        if(result.showapi_res_error==''){
                            $.each(result.showapi_res_body,function (index,item) {
                                //console.log(index,item);
                                //that.imgArray.push(item);
                            });
                        }else{

                        }
                        //mui('#refreshContainer').pullRefresh().endPullupToRefresh();

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

        },
    }
</script>