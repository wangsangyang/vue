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
        meta:{title: '首页',keepAlive:true},
        component: home,
    },
    {
        path: '/news',
        name: 'news',
        meta:{title: '新闻',keepAlive:true},
        component: news
    },
    {
        path: '/newsdetail',
        name: 'newsdetail',
        meta:{title: '新闻详情',keepAlive:true},
        component: newsdetail
    },
    {
        path: '/newsindex',
        name: 'newsindex',
        meta:{title: '新闻列表',keepAlive:true},
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
        meta:{title: '相册',keepAlive:true},
        linkActiveClass: 'mui-active',
        component: album,
    },
    {
        path: '/tools',
        name: 'tools',
        meta:{title: '工具箱',keepAlive:true},
        component: tools,
    },
    {
        path: '/personal',
        name: 'personal',
        meta:{title: '个人中心',keepAlive:true},
        component: personal,
    },
    {
        path: '/login',
        name: 'login',
        meta:{title: '登录',keepAlive:true},
        component: login,
    },
];

let router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: '',
    //mode: 'history',
    hashbang: false,
    history: true,
    root: '/',
    saveScrollPosition: true,
    transitionOnLoad: true,
    scrollBehavior (to, from, savedPosition) {
        //console.log(to);
        //console.log(savedPosition);
        wui.setScrollBehavior(to);
console.log(123);
        if (savedPosition) {
            return savedPosition
        } else {
            //return { x: 0, y: 0 }
        }
    },
});

router.beforeEach((to,from,next) => {
    //beforeEach方法会在任意路由跳转前执行，next一定要记着执行，不然路由不能跳转
    //console.log(to);
    //console.log(from);
    //console.log(1);
    document.title = to.meta.title;
    next();

});

router.afterEach((to, from) => {
    //会在任意路由跳转后执行
});

//需要注意的是，export default routers 必须写在文件底部，而且后面还需要接一空行，否则无法通过 ESlint 语法验证
export default router;

