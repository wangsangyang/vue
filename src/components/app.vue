<template>

    <!-- 缓存组件方法：第一种 -->
<!--
    <span>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </span>
-->

    <!-- 缓存组件方法：第二种 -->
    <keep-alive include="home,news,newsdetail,newsindex,tools,personal,login">
        <router-view></router-view>
    </keep-alive>

</template>

<script>
    export default {

    };
</script>