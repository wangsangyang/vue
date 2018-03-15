<template>
    <div class="page page-personal bgcolor">
        <div class="content">

            <section class="section-personal">
                <dl>
                    <dt class="portrait"><span class="icon"><img src="../../../static/images/icon-portrait.png" alt="头像"/></span></dt>
                    <dd class="link-login">
                        <router-link to="/login">点击登录</router-link>
                    </dd>
                </dl>
            </section>

            <section class="ui-view-cell">
                <ul>
                    <li class="view-cell arrow">
                        <a href="#">
                            <dl class="cell">
                                <dt class="row-left">关于我们</dt>
                                <dd class="row-right"></dd>
                            </dl>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';

    export default {
        name: 'personal',
        data: function () {
            return {};
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
        },
        created: function () {
            console.log('首页');
            const that = this;
            const url = 'http://route.showapi.com/341-1';
            const paramObj = {};
            paramObj.showapi_timestamp = formatterDateTime();
            paramObj.showapi_appid = '58966';
            paramObj.showapi_sign = 'f2c87a1f55c345ccbd46923e10ab344f';
            paramObj.page = '1';
            paramObj.maxResult = '20';

        }
    }
</script>