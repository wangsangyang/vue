<template>
    <div class="page page-news bgcolor">
        <div class="content">
            <ul class="box">
                <li class="menu">
                    <router-link :to="{ path: 'home' }">
                        <i class="icon icon-news-shishi"></i>
                        <span class="text">实时新闻</span>
                    </router-link>
                </li>
                <li class="menu">
                    <router-link :to="{ path: 'home' }">
                        <i class="icon icon-news-jingxuan"></i>
                        <span class="text">新闻精选</span>
                    </router-link>
                </li>
                <li class="menu">
                    <router-link :to="{ path: 'home' }">
                        <i class="icon icon-news-hot"></i>
                        <span class="text">热门新闻</span>
                    </router-link>
                </li>
                <li class="menu">
                    <router-link :to="{ path: 'home' }">
                        <i class="icon icon-news-search"></i>
                        <span class="text">新闻搜索</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from './public/footer-nav.vue';

    export default {
        name: 'news',
        components: {
            footerNav
        },
        beforeCreate: function () {
        },
        created: function () {
        },
        mounted: function () {
        },
        watch: {
            '$route' (to, from) {
                wui.loading('close');
            }
        },
    }
</script>