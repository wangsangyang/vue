<template>
    <div class="page page-album bgcolor">
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ path: 'home', query: {category:'Tech'} }" :class="{highlight:$route.query.category=='Tech'}">科技1</router-link></li>
                <li class="menu"><router-link :to="{ path: 'home', query: {category:'Entertainment'} }" :class="{highlight:$route.query.category=='Entertainment'}">娱乐1</router-link></li>
                <li class="menu"><router-link :to="{ path: 'home', query: {category:'Sport'} }" :class="{highlight:$route.query.category=='Sport'}">体育</router-link></li>
            </ul>
        </div>
        <div class="content">
            <div id="" class="">
                <div class="">
                    <ul class="item">
                    <!--
                        <li class="list">
                            <dl>
                                <dt><img src="../../static/images/1.png"></dt>
                            </dl>
                        </li>
                        <li class="list">
                            <dl>
                                <dt><img src="../../static/images/1.png"></dt>
                            </dl>
                        </li>
                        -->

                        <li class="list" v-for="img in imagesArray">
                            <dl>
                                <dt><img v-bind:src="img.shareUrl"></dt>
                                <dd>{{img.desc}}</dd>
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
    import footerNav from './public/footer-nav.vue';
    //import 'muicss';
    //import mui from 'mui';
    import moment from 'moment';
    moment.locale('zh-cn');

    export default {
        name: 'home',
        data: function () {
            return {
                imagesArray: [],
                category: ''
            }
        },
        components: {
            footerNav
        },
        filters:{
            fromNow: function (el) {
                return moment(el).fromNow();
            },
            format: function (el) {
                return moment(el).format('YYYY年MM月DD HH:MM:SS')
            }
        },
        beforeCreate: function () {
            wui.loading();
        },
        created: function () {
        },
        mounted: function () {
            //console.log('首页');
            this.category = this.$route.query.category;
            //console.log(this.category);
            this.loadmore();
        },
        methods: {
            loadmore: function () {
                const that = this;
                const url = 'http://140.143.10.199/api/images';//API接口
                let paramObj = {};
                //paramObj.url = 'http://image.baidu.com/data/imgs?col=美女&tag=小清新&sort=0&pn=0&rn=20&p=channel&from=1';
                paramObj.url = 'http://image.baidu.com/data/imgs?col=美女&tag=校花&sort=0&pn=0&rn=20&p=channel&from=1';

                paramObj.size = 200;
                paramObj.access_key = wui.apiKey().access_key;
                let last_id = '';
                initLoad();

                //上拉加载
                /*                mui.init({
                                    pullRefresh: {
                                        container: '#muiRefresh',
                                        up: {
                                            height: 50,
                                            contentrefresh: "加载中...",
                                            contentnomore: '没有更多数据了!',
                                            callback: pullupRefresh
                                        }
                                    }
                                });*/

                function pullupRefresh() {
                    initLoad('up');
                }

                function initLoad(direction) {
                    paramObj.timestamp = wui.timestamp();
                    paramObj.category = that.category;
                    paramObj.last_id = last_id;
                    console.log(paramObj);
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: paramObj,
                        dataType: 'json',
                        success: function (result) {
                            console.log(result);
                            //console.log(result.data);
                            if(result.imgs){
                                var images = result.imgs;
                                images.pop();
                                if(direction=='up'){//如果是上拉加载
                                    that.newsArray = that.newsArray.concat(result.data.news);
                                }else{
                                    //console.log(images);
                                    that.imagesArray = images;
                                    //mui('#muiRefresh').pullRefresh().scrollTo(0, 0, 0);//mui下拉刷新滚动条回到顶部
                                }
                                //last_id = result.data.last_id;
                                //console.log(last_id);
                            }else{
                                wui.ajaxerror('发生了未知的错误！');
                            }
                            if(paramObj){
                                //wui.updropLoad('reset');
                            }else{
                                //wui.updropLoad('end');
                            }
                            //mui('#muiRefresh').pullRefresh().endPullupToRefresh(false);
                            wui.loading('close');
                        },
                        error: function (XmlHttpRequest,textStatus) {
                            console.log('错误');
                            console.log(XmlHttpRequest);
                            console.log(textStatus);
                            //wui.ajaxerror().refresh(pullupRefresh);
                        },
                        complete: function () {
                            wui.loading('close');
                        }
                    });

                }
            }
        },
        watch: {
            /*            '$route' (to, from) {
                            console.log(to.query.category,this.category);
                            this.category = to.query.category;
                            if(/\/home/.test(to.path)){
                                this.loadmore();
                            }
                        },*/
        },
        beforeRouteEnter (to, from, next) {
            console.log('进入组件时');
            next();
        },
        beforeRouteUpdate (to, from, next) {
            wui.loading();
            //console.log(to.query.category,this.category);
            this.category = to.query.category;
            this.loadmore();
            console.log('组件被复用时');
            next();
        },
        beforeRouteLeave (to, from, next) {
            //console.log('离开组件时');
            next();
        },
    }
</script>