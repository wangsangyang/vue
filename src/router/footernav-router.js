import Vue from 'vue';
import vueRouter from 'vue-router';
import home from '../components/home/index.vue';



let routes = [
    {
        path: '/home',
        components: home,
        beforeEnter: (to, from, next) => {
            next();
        },
    },
    {
        path: '/pic',
        components: home,
        beforeEnter: (to, from, next) => {

        },
        beforeLeave: (to, from, next) => {
            console.log(12);
        },
    },
    {
        path: '/self',
        components: home,
        children: [{
            path: ':id',
        }]
    },
];

export default {
    routes
}

