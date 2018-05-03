<template>
    <footer class="footer-nav" id="footer-nav">
        <ul class="nav">
            <li @click="isRefresh($event)" data-count="0">
                <router-link to="/home">
                    <span class="icon icon-home"></span>
                    <span class="text">首页</span>
                </router-link>
            </li>
            <li>
                <router-link to="/news" data-count="0">
                    <span class="icon icon-news"></span>
                    <span class="text">新闻</span>
                </router-link>
            </li>
            <li>
                <router-link to="/tools" data-count="0">
                    <span class="icon icon-tools"></span>
                    <span class="text">工具</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'album', query:{type:35} }" title="小清新" data-count="0">
                    <span class="icon icon-album"></span>
                    <span class="text">相册</span>
                </router-link>
            </li>
            <li>
                <router-link to="/personal">
                    <span class="icon icon-personal"></span>
                    <span class="text">我的</span>
                </router-link>
            </li>
        </ul>
    </footer>
</template>

<style>
    /*    .footer-nav{ position: fixed; bottom: 0; left: 0; width: 100%; background-color: #f4f4f4; z-index: 99; }
        .footer-nav .nav{ display: flex; }
        .footer-nav .nav li{ flex: 1; }
        .footer-nav .nav a{ display: block; height: 1rem; color: #333; text-align: center; }
        .footer-nav .nav span{ display: block; }
        .footer-nav .nav .icon{ display: inline-block; width: 0.5rem; height: 0.5rem; background-position: center; background-repeat: no-repeat; background-size: 100% auto; margin-top: 0.1rem; }
        .footer-nav .nav .text{ font-size: 0.24rem; margin-top: -0.05rem; }
        .footer-nav .nav .router-link-active{ color: #ff9400; }
        .footer-nav .nav .icon-home{ background-image: url(../../../static/images/icon-home.png); }
        .footer-nav .nav .icon-album{ background-image: url(../../../static/images/icon-album.png); }
        .footer-nav .nav .router-link-active .icon-home{ background-image: url(../../../static/images/icon-home-active.png); }
        .footer-nav .nav .router-link-active .icon-album{ background-image: url(../../../static/images/icon-album-active.png); }*/
</style>

<script>
    export default {
        name: 'footerNav',
        data(){
            return {};
        },
        methods:{
            isRefresh: function (event) {
                console.log(event);
                console.log(event.target);
                var count = $(event.target).attr('data-count');
                console.log(count);
            }
        }
    }
</script>

