<template>
    <div class="page page-album bgcolor">
        <h3 class="p-title"></h3>
        <div class="content">
            <ul class="box">
                <li class="list" v-for="img in imgArray" v-if="img.thumb">
                    <dl>
                        <dt><img v-bind:src="img.thumb"></dt>
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
            console.log('相册页');
            const that = this;
            const url = 'http://route.showapi.com/819-1';
            const paramObj = {};
            paramObj.showapi_timestamp = formatterDateTime();
            paramObj.showapi_appid = '58966';
            paramObj.showapi_sign = 'f2c87a1f55c345ccbd46923e10ab344f';
            paramObj.type = '35';
            paramObj.page = '1';
            paramObj.rows = '20';
            $.ajax({
                type: 'post',
                url: url,
                data: paramObj,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    console.log(result.showapi_res_body);
                    if(result.showapi_res_error==''){
                        that.imgArray = result.showapi_res_body;
                    }
                    loading.close();
                },
                error: function (XmlHttpRequest,textStatus) {
                    console.log('错误');
                    console.log(XmlHttpRequest);
                    console.log(textStatus);
                }
            });
        }
    }
</script>

