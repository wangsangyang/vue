<template>
    <div class="page page-newsdetail">
        <div class="content">
                新闻详情
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';

    export default {
        name: 'newsdetail',
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