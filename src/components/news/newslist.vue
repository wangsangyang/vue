<template>
    <div class="page page-news">
        <div class="top-toolbar">
            <ul class="box">
                <li class="menu"><router-link :to="{ name: 'newsdetail', query: {type:34} }" :class="{highlight:$route.query.type==34}">大胸妹</router-link></li>
                <li class="menu"><router-link :to="{ name: 'newsdetail', query: {type:35} }" :class="{highlight:$route.query.type==35}">小清新</router-link></li>
                <li class="menu"><router-link :to="{ name: 'newsdetail', query: {type:37} }" :class="{highlight:$route.query.type==37}">性感妹</router-link></li>
            </ul>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
        <footer-nav></footer-nav>

    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';
    import newsdetail from '../news/detail.vue';
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


        }
    }
</script>