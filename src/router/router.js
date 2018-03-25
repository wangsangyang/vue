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
        linkActiveClass: 'mui-active',
        component: album,
    },
    {
        path: '/tools',
        meta:{title: '工具箱'},
        component: tools,
    },
    {
        path: '/personal',
        meta:{title: '个人中心'},
        component: personal,
    },
    {
        path: '/login',
        meta:{title: '登录'},
        component: login,
    },
];

let router = new VueRouter({
    routes,
});

router.beforeEach((to,from,next) => {
    console.log(to);
    //console.log(from);
    document.title = to.meta.title;
    next();
});

export default router;

