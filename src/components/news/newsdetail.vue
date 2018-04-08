<template>
    <transition name="linkpage">
        <div class="page page-newsdetail">
            <div class="content">
                <iframe v-bind:src="$route.query.url" id="iframe" style="width: 100%;height: 100%;" frameborder="no"></iframe>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'newsdetail',
        data: function () {
            return {
                url: ''
            };
        },
        components: {
        },
        beforeCreate: function () {
            //wui.loading();
        },
        created: function () {
        },
        mounted: function () {
            //console.log(this.$route);
            //this.url = this.$route.query.url;
            wui.loading('close');
        },
        beforeRouteEnter (to, from, next) {
            console.log('新闻详情组件进入时');
/*            setTimeout(function () {
                wui.loading('close');
            },500);*/
            next();
        },
/*        watch: {
            '$route' (to, from) {
                this.url = this.$route.query.url;
            }
        }*/
    }
</script>