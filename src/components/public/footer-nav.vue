<template>
    <footer class="footer-nav" id="footer-nav">
        <ul class="nav">
            <li><router-link to="/home">首页</router-link></li>
            <li><router-link to="/album">相册</router-link></li>
            <li><a href="#">视频</a></li>
        </ul>
    </footer>
</template>

<script>
    import home from '../page/home.vue';
    import album from '../page/album.vue';
    export default {
        name: 'footerNav',
    }
</script>

<style>
    .footer-nav{ position: fixed; bottom: 0; left: 0; width: 100%; background-color: #f4f4f4; }
    .footer-nav .nav{ display: flex; }
    .footer-nav .nav li{ flex: 1; }
    .footer-nav .nav li a{ display: block; height: 1rem; line-height: 1rem; color: #333; text-align: center; }
    .footer-nav .nav .router-link-active{ color: #00a000; }
</style>