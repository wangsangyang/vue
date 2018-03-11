import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/page/home.vue';
import album from '../components/page/album.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        component: home,
    },
    {
        path: '/album',
        component: album,
    },
];

let router = new VueRouter({
    routes
});

export default router;

