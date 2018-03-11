<template>
    <div class="page page-home">
        首页
        <router-view></router-view>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';

    export default {
        name: 'home',
        components: {
            footerNav
        },
        created: function () {
            console.log('首页');
        }
    }
</script>