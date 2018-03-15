<template>
    <transition name="linkpage">
        <div class="page page-login">
            <div class="content">

                <section class="section-head">
                    请登录
                </section>

                <section class="section-input">
                    <ul>
                        <li class="username"><i class="icon"></i><input class="input" type="text" placeholder="用户名"></li>
                        <li class="password"><i class="icon"></i><input class="input" type="password" placeholder="密码"></li>
                    </ul>
                    <article class="btns-group"><a class="btn" href="#">登 录</a></article>
                </section>

            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'login',
        data: function () {
            return {};
        },
        beforeCreate: function () {
        },
        created: function () {


        }
    }
</script>