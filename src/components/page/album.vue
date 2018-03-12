<template>
    <div class="page page-album">
        <h3 class="p-title">图片来源于美图api</h3>
        <div class="content">
            <ul class="box">
                <li class="list" v-for="img in imgArray">
                    <dl>
                        <dt><img v-bind:src="img.url"></dt>
                        <dd>{{img.type}}</dd>
                    </dl>
                </li>
            </ul>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../public/footer-nav.vue';
    export default {
        name: 'album',
        data: function () {
            return {
                imgArray: []
            }
        },
        components: {
            footerNav
        },
        beforeCreate: function () {
            loading.open();
        },
        created: function () {
            console.log('页面初始化');
            const that = this;
            var param = {};
            param.page = 1;
            var str = $.param(param);
            console.log(str);
            var url =  'https://www.apiopen.top/meituApi?'+str;
            $.ajax({
                type: 'get',
                url: url,
                //data: param,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if(result.code===200){
                        that.imgArray = result.data;
                    }
                    setTimeout(function () {
                        loading.close();
                    },1000);
                },
                error: function (a,b) {
                    console.log('错误');
                    console.log(a);
                    console.log(b);
                }
            });

        }
    }
</script>

