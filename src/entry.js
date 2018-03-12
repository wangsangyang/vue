import htmlfontsize from '../static/js/htmlfontsize.js';
import Vue from 'vue';
import router from '../src/router/router.js';
import app from '../src/components/page/app.vue';

new Vue({
    el: '#app',
    router,
    render: h=>h(app),
});


