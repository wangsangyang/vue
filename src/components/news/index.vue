<template>
    <div class="page page-newsindex bgcolor">
        <header class="header-toolbar">
            <ul class="box">
                <li class="left back" @click="backPrepage"><i class="fa fa-angle-left"></i></li>
                <li class="main">{{title}}</li>
                <li class="right"></li>
            </ul>
        </header>
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Tech'}, replace:true }" :class="{highlight:$route.query.category=='Tech'}" replace>科技</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Entertainment'}, replace:true }" :class="{highlight:$route.query.category=='Entertainment'}" replace>娱乐</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Sport'}, replace:true }" :class="{highlight:$route.query.category=='Sport'}" replace>体育</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Military'}, replace:true }" :class="{highlight:$route.query.category=='Military'}" replace>军事</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Finance'}, replace:true }" :class="{highlight:$route.query.category=='Finance'}" replace>财经</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Politics'}, replace:true }" :class="{highlight:$route.query.category=='Politics'}" replace>时政</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'World'}, replace:true }" :class="{highlight:$route.query.category=='World'}" replace>国际</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Society'}, replace:true }" :class="{highlight:$route.query.category=='Society'}" replace>社会</router-link></li>
                <li class="menu"><router-link :to="{ path: 'newsindex', query: {category:'Living'}, replace:true }" :class="{highlight:$route.query.category=='Living'}" replace>生活</router-link></li>
            </ul>
        </div>
        <div class="content">
            <div id="muiRefresh" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="newsbox">

                        <li class="list" v-for="news in newsArray">
                            <!--<router-link :to="{path: 'newsdetail',query:{url: news.url}}">-->
                            <router-link :to="{path: 'newsdetail',query:{url: news.url}}">
                                <!-- 有0张图片或者3张图片的时候 -->
                                <dl v-if="news.thumbnail_img.length>=3||news.thumbnail_img.length<=0">
                                    <dd class="dl-header">
                                        <h3 class="main">{{news.title}}</h3>
                                    </dd>
                                    <dd class="dl-imgs" v-if="news.thumbnail_img.length>=3">
                                        <span class="img" v-for="img in news.thumbnail_img"><img v-bind:src="img"></span>
                                    </dd>
                                    <dd class="dl-footer">
                                        <span class="category">[{{news.category[0]}}]</span>
                                        <span class="source">{{news.source}}</span>
                                        <span class="time">{{news.gmt_publish|fromNow}}</span>
                                    </dd>
                                </dl>
                                <!-- 有1张图片或者2张图片的时候 -->
                                <dl class="dl-col-2" v-else>
                                    <dd class="dl-header">
                                        <h3 class="main">{{news.title}}</h3>
                                        <div class="dl-footer">
                                            <span class="category">[{{news.category[0]}}]</span>
                                            <span class="source">{{news.source}}</span>
                                            <span class="time">{{news.gmt_publish|fromNow}}</span>
                                        </div>
                                    </dd>
                                    <dt class="dl-imgs">
                                        <span class="img"><img v-bind:src="news.thumbnail_img[0]"></span>
                                    </dt>
                                </dl>
                            </router-link>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    //import 'muicss';
    //import mui from 'mui';
    import md5 from 'md5';
    import moment from 'moment';
    moment.locale('zh-cn');

    export default {
        name: 'newsindex',
        data: function () {
            return {
                newsArray: [],
                category: '',
                title: '',
                categoryUrl: ''
            }
        },
        components: {

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
            this.title = this.$route.query.title;
            this.category = this.$route.query.category;
            this.categoryUrl = this.$route.query.categoryUrl;
            //console.log(this.category);
            this.loadmore();
        },
        methods: {
            backPrepage: function () {
                this.$router.back(-1);
            },
            loadmore: function () {
                const that = this;
                const url = 'http://60.205.217.133/news/news';//API接口
                let paramObj = {};
                paramObj.url = this.categoryUrl;
                paramObj.size = 20;
                paramObj.access_key = wui.apiKey().access_key;
                let last_id = '';
                initLoad();

                //上拉加载
                mui.init({
                    pullRefresh: {
                        container: '#muiRefresh',
                        up: {
                            height: 50,
                            contentrefresh: "加载中...",
                            contentnomore: '没有更多数据了!',
                            callback: pullupRefresh
                        }
                    }
                });

                function pullupRefresh() {
                    initLoad('up');
                }

                function initLoad(direction) {
                    paramObj.timestamp = wui.timestamp();
                    paramObj.signature = md5(wui.apiKey().secret_key + wui.timestamp() + wui.apiKey().access_key);
                    paramObj.category = that.category;
                    paramObj.last_id = last_id;
                    console.log(paramObj);
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: paramObj,
                        dataType: 'json',
                        success: function (result) {
                            //console.log(result);
                            //console.log(result.data);
                            if(result.success){
                                if(direction=='up'){//如果是上拉加载
                                    that.newsArray = that.newsArray.concat(result.data.news);
                                }else{
                                    that.newsArray = result.data.news;
                                    mui('#muiRefresh').pullRefresh().scrollTo(0, 0, 0);//mui下拉刷新滚动条回到顶部
                                }
                                last_id = result.data.last_id;
                                console.log(last_id);
                            }else{
                                wui.ajaxerror('发生了未知的错误！');
                            }
                            if(paramObj){
                                //wui.updropLoad('reset');
                            }else{
                                //wui.updropLoad('end');
                            }
                            mui('#muiRefresh').pullRefresh().endPullupToRefresh(false);

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
            '$route' (to, from) {
                if(to.query.title){
                    this.title = to.query.title;
                    this.categoryUrl = to.query.categoryUrl;
                    this.loadmore();
                }
            },
        },
        beforeRouteEnter (to, from, next) {
            //console.log('进入组件时');
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