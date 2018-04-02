<template>
    <div class="page page-news bgcolor">
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ name: 'album', query: {type:34} }" :class="{highlight:$route.query.type==34}" typeof="Politics">时政</router-link></li>
                <li class="menu"><router-link :to="{ name: 'album', query: {type:35} }" :class="{highlight:$route.query.type==35}" typeof="Military">军事</router-link></li>
                <li class="menu"><router-link :to="{ name: 'album', query: {type:36} }" :class="{highlight:$route.query.type==36}" typeof="Finance">财经</router-link></li>
                <li class="menu"><router-link :to="{ name: 'album', query: {type:37} }" :class="{highlight:$route.query.type==37}" typeof="Society">社会</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:38} }" :class="{highlight:$route.query.type==38}" typeof="World">国际</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:39} }" :class="{highlight:$route.query.type==39}" typeof="Entertainment">娱乐</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:40} }" :class="{highlight:$route.query.type==40}" typeof="Sport">体育</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:40} }" :class="{highlight:$route.query.type==40}" typeof="Tech">科技</router-link></li>
                <li class="menu"><router-link :to="{ path: '/album', query: {type:40} }" :class="{highlight:$route.query.type==40}" typeof="Living">生活</router-link></li>
            </ul>
        </div>
        <div class="content">
            <div id="muiRefresh" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="newsbox">
                        <!-- 有0张图片或者3张图片的时候 -->
                        <li class="list" v-for="news in newsArray" v-if="news.thumbnail_img.length>=3||news.thumbnail_img.length<=0">
                            <a v-bind:href="news.url">
                                <dl>
                                    <dd class="dl-header">
                                        <h3 class="main">{{news.title}}</h3>
                                    </dd>
                                    <dd class="dl-imgs" v-if="news.thumbnail_img.length>=3">
                                        <span class="img" v-for="img in news.thumbnail_img"><img v-bind:src="img"></span>
                                    </dd>
                                    <dd class="dl-footer">
                                        <span class="category">[{{news.category[0]}}]</span>
                                        <span class="source">{{news.source}}</span>
                                        <span class="time">{{new Date(news.gmt_publish)}}</span>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                        <!-- 有一张图片或者2张图片的时候 -->
                        <li class="list" v-for="news in newsArray" v-if="news.thumbnail_img.length<3&&news.thumbnail_img.length>0">
                            <a v-bind:href="news.url">
                                <dl class="dl-col-2">
                                    <dd class="dl-header">
                                        <h3 class="main">{{news.title}}</h3>
                                        <div class="dl-footer">
                                            <span class="category">[{{news.category[0]}}]</span>
                                            <span class="source">{{news.source}}</span>
                                            <span class="time">{{new Date(news.gmt_publish)}}</span>
                                        </div>
                                    </dd>
                                    <dt class="dl-imgs">
                                        <span class="img"><img v-bind:src="news.thumbnail_img[0]"></span>
                                    </dt>
                                </dl>
                            </a>
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
    import 'muicss';
    import mui from 'mui';
    import md5 from 'md5';

    export default {
        name: 'home',
        data: function () {
            return {
                newsArray: []
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
        mounted: function () {

            console.log('首页');
            const that = this;
            const url = 'http://60.205.217.133/news/news';//API接口
            const paramObj = {};
            paramObj.url = 'http://api.xinwen.cn/news/hot';//热门新闻
            paramObj.category = 'Entertainment';
            paramObj.size = 20;
            paramObj.timestamp = wui.timestamp();
            paramObj.access_key = wui.getKey().access_key;
            paramObj.signature = md5(wui.getKey().secret_key + wui.timestamp() + wui.getKey().access_key);

            pullupRefresh();

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
                console.log(12);
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
                            that.newsArray = that.newsArray.concat(result.data.news);
                            //that.newsArray = result.data.news;
                            paramObj.last_id = result.data.last_id;
                        }else{
                            //wui.ajaxerror('发生了未知的错误！');
                        }
                        if(paramObj.page<=5){
                            //wui.updropLoad('reset');
                        }else{
                            //wui.updropLoad('end');
                        }

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

        },
        watch: {
            '$route' (to, from) {
                wui.loading('close');
            }
        }
    }
</script>