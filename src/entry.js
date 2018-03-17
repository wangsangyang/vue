
import '../static/css/reset.css';
import '../static/css/transform.css';
import '../static/js/htmlfontsize.js';
import $ from 'jquery';
/*import mui from '../static/mui/js/mui.min.js';*/
/*import '../static/js/wui.js';*/
/*import wui from '../static/js/wui.js';*/
import wui from 'wui'; //引用config里面的wui名称


import Vue from 'vue';
import router from '../src/router/router.js';
import app from '../src/components/page/app.vue';

new Vue({
    el: '#app',
    router,
    render: h=>h(app),
});


