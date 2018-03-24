import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/page/home.vue';
import album from '../components/page/album.vue';
import tools from '../components/page/tools.vue';
import personal from '../components/page/personal.vue';
import login from '../components/page/login.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        meta:{title: '首页'},
        component: home,
    },
    {
        path: '/album',
        name: 'album',
        meta:{title: '相册'},
        component: album,
    },
    {
        path: '/tools',
        component: tools,
    },
    {
        path: '/personal',
        component: personal,
    },
    {
        path: '/login',
        component: login,
    },
];

let router = new VueRouter({
    routes
});

export default router;

