<template>
    <transition name="linkpage">
        <div class="page page-newsdetail">
            <header class="header-toolbar">
                <ul class="box">
                    <li class="left back" @click="backPrepage"><i class="fa fa-angle-left"></i></li>
                    <li class="main"></li>
                    <li class="right"></li>
                </ul>
            </header>
            <div class="content">
                <iframe v-bind:src="$route.query.url" id="iframe" style="width: 100%;height: 100%;" frameborder="no"></iframe>
            </div>
        </div>
    </transition>
</template>

<script>
    import fontawesome from 'fontawesome';
    export default {
        name: 'newsdetail',
        data: function () {
            return {
                url: '',
                show: true
            };
        },
        components: {
        },
        beforeCreate: function () {
            //console.log('beforeCreate');
            wui.loading();
        },
        mounted: function () {
            //console.log(this.$route);
            //this.url = this.$route.query.url;
            //console.log('mounted');
            setTimeout(function () {
                wui.loading('close');
            },500);
        },
        methods:{
            backPrepage: function () {
                this.$router.back(-1);
            }
        }
    }
</script>