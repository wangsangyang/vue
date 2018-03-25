<template>
    <div class="page page-album bgcolor">
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ name: 'album', query: {type:34} }" :class="{highlight:$route.query.type==34}">大胸妹</router-link></li>
                <li class="menu"><router-link :to="{ name: 'album', query: {type:36} }" :class="{highlight:$route.query.type==36}">文艺范</router-link></li>
                <li class="menu"><router-link :to="{ name: 'album', query: {type:37} }" :class="{highlight:$route.query.type==37}">性感妹</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:38} }" :class="{highlight:$route.query.type==38}">大长腿</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:39} }" :class="{highlight:$route.query.type==39}">黑丝袜</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:40} }" :class="{highlight:$route.query.type==40}">小翘臀</router-link></li>
            </ul>
        </div>
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
                imgArray: [],
                type: 35,
                toolbar: 'highlight'
            }
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
            wui.loading('close');
            wui.loading();
        },
        created: function () {

        },
        methods: {
            loadMore () {
                //console.log(this.$route);
                console.log('相册页');
                const that = this;
                const url = 'http://route.showapi.com/819-1';//花瓣福利api
                const paramObj = {};
                paramObj.showapi_timestamp = wui.formatDateTime();
                paramObj.showapi_appid = wui.getKey().showapi_appid;
                paramObj.showapi_sign = wui.getKey().showapi_sign;
                paramObj.page = 0;
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
                    console.log(that.type);
                    paramObj.type = that.type;
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
        },
        mounted: function () {
            console.log(this.type);
            this.type = this.$route.query.type;
            //console.log();
            this.loadMore(this.type);
        },
        watch: {
            '$route' (to, from) {
                console.log(this.$route);
                mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);
                wui.loading();
                console.log(to);
                //console.log(from);
                this.type = to.query.type;
                console.log(this.type);
                this.imgArray = [];
                this.loadMore(to.query.type);
            }
        }

    }
</script>

