import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import album from '../components/album.vue';
import tools from '../components/tools.vue';
import personal from '../components/personal.vue';
import login from '../components/login.vue';
import news from '../components/news.vue';
import newsdetail from '../components/news/newsdetail.vue';
import newsindex from '../components/news/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        meta:{title: '首页'},
        component: home,
    },
    {
        path: '/news',
        name: 'news',
        meta:{title: '新闻'},
        component: news
    },
    {
        path: '/newsdetail',
        name: 'newsdetail',
        meta:{title: '新闻详情'},
        component: newsdetail
    },
    {
        path: '/newsindex',
        name: 'newsindex',
        meta:{title: '新闻列表'},
        component: newsindex
    },
/*    {
        path: '/news',
        meta:{title: '新闻'},
        component: news,
        children: [
            {
                path: 'newsdetail',
                name: 'newsdetail',
                component: newsdetail,
                meta:{title: '新闻详情'}
            }
        ]
    },*/
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
    //console.log(to);
    //console.log(from);
    //console.log(1);
    document.title = to.meta.title;
    next();
});

export default router;

