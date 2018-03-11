<template>
    <div class="page page-album">
        <div class="content">
            相册内容
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';

    export default {
        name: 'album',
        components: {
            footerNav
        },
        created: function () {
            console.log('相册');
        }
    }
</script>