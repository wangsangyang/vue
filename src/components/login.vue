<template>
    <transition name="linkpage">
        <div class="page page-login">
            <div class="content">

                <section class="section-head">
                    请登录
                </section>

                <section class="section-input">
                    <ul>
                        <li class="username"><i class="icon"></i><input class="input" type="text" placeholder="用户名" autocomplete="off" v-model="username"></li>
                        <li class="password"><i class="icon"></i><input class="input" type="password" placeholder="密码" autocomplete="off" v-model="password"></li>
                    </ul>
                    <article class="btns-group"><span class="btn" @click="login">登 录</span></article>
                </section>

            </div>
        </div>
    </transition>

</template>


<script>
    import {Toast} from 'mint-ui';
    export default {
        name: 'login',
        data: function () {
            return {
                username: '',
                password: '',
            }
        },
        beforeCreate: function () {
        },
        created: function () {

        },
        mounted: function () {
            wui.loading('close');
        },
        methods: {
            login: function () {
                const that = this;
                if(this.username.length<1){
                    Toast("请输入用户名");
                    return false;
                }
                if(this.password.length<1){
                    Toast("请输入密码");
                    return false;
                }
                console.log(this.$route);
                this.$router.push( {name:'personal', params:{username:this.username, userId:123456789 } });
            }
        }
    }

</script>