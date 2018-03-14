import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/page/home.vue';
import album from '../components/page/album.vue';
import personal from '../components/page/personal.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: home,
    },
    {
        path: '/home',
        component: home,
    },
    {
        path: '/album',
        component: album,
    },
    {
        path: '/personal',
        component: personal,
    },
];

let router = new VueRouter({
    routes
});

export default router;

