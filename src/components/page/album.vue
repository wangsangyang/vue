<template>
    <div class="page page-album">
        <h3 class="p-title">图片来源于美图api</h3>
        <div class="content">
            <ul class="box">
                <li class="list" v-for="img in imgArray">
                    <dl>
                        <dt><img v-bind:src="img.imgurl"></dt>
                        <dd>{{img.title}}</dd>
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
            const url = 'http://route.showapi.com/1208-2';
            const paramObj = {};
            paramObj.showapi_timestamp = formatterDateTime();
            paramObj.showapi_appid = '58966';
            paramObj.showapi_sign = 'f2c87a1f55c345ccbd46923e10ab344f';
            paramObj.type = '1';
            paramObj.page = '1';
            paramObj.rows = '20';
            $.ajax({
                type: 'post',
                url: url,
                data: paramObj,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if(!result.showapi_res_error){
                        that.imgArray = result.showapi_res_body.data;
                    }
                    loading.close();
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

