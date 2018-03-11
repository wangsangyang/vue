import htmlfontsize from '../js/htmlfontsize.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/page/home.vue';
import router from '../router/router.js';

let page = new Vue({
    el: '#app',
    router,
    components: {
        home
    }
});


