<template>
    <div class="page page-personal bgcolor">
        <div class="content">

            <section class="section-personal">
                <dl>
                    <dt class="portrait"><span class="icon"><img src="../../static/images/icon-portrait.png" alt="头像"/></span></dt>
                    <dd class="link-login" v-if="!islogin">
                        <router-link to="/login">点击登录</router-link>
                    </dd>
                    <dd class="username" v-if="islogin">{{username}}</dd>
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
    import footerNav from './public/footer-nav.vue';

    export default {
        name: 'personal',
        data: function () {
            return {
                islogin: false,
                username: ''
            }
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
        },
        created: function () {
        },
        mounted: function () {
            console.log(123);
        },
        watch: {
            '$route' (to, from) {
                console.log(to);
                if(to.params.username){
                    this.username = to.params.username;
                    this.islogin = true;
                }
            },
        },
    }
</script>