<template>
    <div id="entry"><router-view></router-view></div>
</template>

<script>
    import home from '../page/home.vue';
    export default {
        created:function () {
            console.log(123123);
        }
    };
</script>