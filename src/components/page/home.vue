<template>
    <div class="page page-home bgcolor">
        <h3 class="p-title">笑话大全</h3>
        <div class="content">
            <ul class="box">
                <li class="list" v-for="text in textArray">
                    <dl>
                        <dd class="dl-title">{{text.title}}</dd>
                        <dt class="dl-cont">{{ text.text.replace(/(\<)br\s?\/>/gi,'') }}</dt>
                        <dd class="dl-time">{{text.ct}}</dd>
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
        name: 'home',
        data: function () {
            return {
                textArray: []
            }
        },
        components: {
            footerNav
        },        beforeCreate: function () {
            loading.open();
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
            $.ajax({
                type: 'post',
                url: url,
                data: paramObj,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    console.log(result.showapi_res_body);
                    if(result.showapi_res_error==''){
                        that.textArray = result.showapi_res_body.contentlist;
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