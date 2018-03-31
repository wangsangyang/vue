/**
 * 订单列表js.
 * @author 韩亚辉
 */
var orderList = (function () {
    /**
     * 智能id
     * @type {number}
     */
    var intelligentId = 150;
    /**
     * 担保id
     * @type {number}
     */
    var guaranteeId = 148;
    /**
     * 保姆id
     * @type {number}
     */
    var nannyId = 1;
    /**
     * 合伙人id
     * @type {number}
     */
    var partnerId = 666;
    /**
     * 海外注册id
     * @type {number}
     */
    var abroadId = 447;
    //搜索方法
    /**
     * 搜索
     */
    var search = function () {
        var value = $('.hide-value').val();
        var searchvalue = $('.searchkey').val();
        if ('b' == value) {
            notPay(1);
        } else if ('c' == value) {
            var val = $('.dropMenu .downDown .selected').val();
            if (val) {
                inService(1, val);
            } else {
                inService(1)
            }
        } else if ('d' == value) {
            over(1);
        } else {
            all(1);
        }
        //return false;
    };
    var order = function (pageNo, tab, orderState) {
        console.log(tab)
        var data = common.newData();
        data.method = "queryUserAllTypeOrderList";
        if (common.getUser()) {
            data.identityIde = common.getUser().fuid;
            data.executor = common.getUser().fuid;
        }
        if (common.getParam("userId")) {
            //"5a7234566f6a7855736d6973687334487366677079773d3d"
            data.identityIde = common.getParam("userId");
            data.executor = common.getParam("userId");
        }
        var value = $('.searchkey').val();
        if (value != '') {
            data.vague = value;
        }
        data.pageNo = pageNo;
        data.sort = "desc";
        data.pageSize = 5;
        if ("inService" == tab && orderState) {
            data.orderState = orderState;
        }
        //data.h5Query = common.isRunApp() == true ?  "" : 1;
        data.tab = tab;
        common.post(data, function (result) {
                if (result.data.list != []) {
                    $("#hiddenPage").val(result.data.pages);
                }
                var resultData = result.data.list;
                if (pageNo == 1) {
                    $('.section-orderlist').empty();
                }
                if (resultData.length > 0) {
                    for (var i = 0; i < resultData.length; i++) {
                        var item = resultData[i];
                        var userState = item.userState;
                        //非注册订单使用
                        var notRegisterInfo = {};
                        notRegisterInfo.orderNo = item.payOrderNo;
                        notRegisterInfo.childOrderId = item.bizOrderId;
                        localStorage.setItem("notRegisterInfo",JSON.stringify(notRegisterInfo));
                        //取消订单使用
                        var data = {};
                        data.payOrderNoe = item.payOrderNoe;
                        data.userIde = item.userIde;
                        data.payOrderNo = item.payOrderNo;
                        localStorage.setItem("cancelInfo",JSON.stringify(data));

                        //智能 150  447 担保 148 保姆 1 合伙人暂定为 5
                        var baseProductId = item.baseProductId;
                        var payState = item.payState;
                        var flow2State = item.flow2State;
                        if (!flow2State) {
                            if (payState == 0) {
                                flow2State = 1;
                                flowState = 1;
                            } else {
                                flow2State = 5;
                                flowState = 10;
                            }
                        }
                        var html = '<ul><li class="list">';
                        //搜索函数TODO
                        //根据状态值给LI标签增加点击事件
                        // if(payState != 2){
                        //     html += executeClickLiHtml(baseProductId,flow2State,userState,item);
                        // }
                        //缺少审核不通过原因(通过判断客户确认不通过和流程审核不通过状态，取出不通过的原因)
                        if ((flow2State == 25 && baseProductId != intelligentId && baseProductId != abroadId) || flow2State == 35) {
                            var auditMsg = item.auditMsg;
                            if (!auditMsg) {
                                auditMsg = "审核不通过";
                            } else {
                                auditMsg = "审核不通过:" + auditMsg;
                            }
                            html += '<div class="warning">' + auditMsg + '</div>'
                        }
                        //订单号和时间拼接和代理人
                        html += executeOrderTimeAgentHtml(baseProductId, flow2State, userState, item);
                        //获取订单信息
                        html += executeOrderInfoHtml(baseProductId, item);
                        //拼接按钮信息
                        html += executeButtonHtml(baseProductId, item);

                        html += '</li>';
                        $('.section-orderlist').append(html);
                    }
                } else {
                    var emptyHtml = '<div class="section-noorder"><div class="box">' +
                        '            <img class="img" src="../../images/no-order.png">' +
                        '            <span class="text">您还没有相关订单</span>' +
                        '        </div></div>';
                    $('.mui-pull').hide();
                    $('.section-orderlist').append(emptyHtml);
                }
            }
        )
    };

    var executeClickLiHtml = function (baseProductId, flow2State, userState, item) {
        var html = "";
        if ([intelligentId, abroadId, guaranteeId, nannyId, partnerId].indexOf(baseProductId) >= 0) {
            if (((baseProductId == intelligentId || baseProductId == abroadId))
                || ((baseProductId == guaranteeId || baseProductId == nannyId) && [1, 5, 10].indexOf(flow2State) < 0)
                || (baseProductId == partnerId && [1, 10].indexOf(flow2State) < 0 )) {
                html += '<li class="registerClick ' + item.bizOrderNoe;
                html += '">';
                var clickElement = ".registerClick." + item.bizOrderNoe;
                $("body").on('touchend', clickElement, function () {
                    jumpOrderDetail(item.bizOrderNoe, item.payOrderNoe, item.userIde, item.agentIde);
                });
            } else {
                html += '';
            }
        } else {
            if ([3, 4, 5, 6, 7, 8].indexOf(userState) >= 0 ||(!userState && item.payType == 0)) {
                var orderNo = item.bizOrderNo != "" ? item.bizOrderNo : item.payOrderNo;
                var userId = item.userIde;
                var childOrderId = item.bizOrderId;
                html += '<li class="notRegisterClick ' + orderNo;
                html += '">';
                var clickElement = ".notRegisterClick." + orderNo;
                $("body").on('touchend', clickElement, function () {
                    checkOtherDetails(userId, childOrderId);
                });
            } else {
                html += '';
            }
        }
        return html;
    };

    var executeOrderTimeAgentHtml = function (baseProductId, flow2State, userState, item) {
        var html = "";
        if ([intelligentId, abroadId, guaranteeId, nannyId, partnerId].indexOf(baseProductId) >= 0) {
            var payOrderNo = "";
            if (item.bizOrderNo) {
                payOrderNo = item.bizOrderNo;
            } else {
                payOrderNo = item.payOrderNo;
            }
            html += '<div class="list-top">' +
                '    <span class="ordernumber">' + payOrderNo + '-' + common.subDate(item.createTime) + '</span>';
        } else {
            var payOrderNo = "";
            if (item.bizOrderNo) {
                payOrderNo = item.bizOrderNo;
            } else {
                payOrderNo = item.payOrderNo;
            }
            html += '<div class="list-top">' +
                '    <span class="ordernumber">' + payOrderNo + '-' + common.subDate(item.createTime) + '</span>';
        }
        if (item.payOrderNo && baseProductId != intelligentId && baseProductId != abroadId && item.agentName) {
            //说明是保姆或第三方
            html += '<div class="agentinfo">' +
                '   <a class="call-tel" href="tel:' + item.agentPhone +
                '"   ><i class="icon-phone"></i> ' +
                '   <span class="agentname">代理人：' + item.agentName + '</span>' +
                '   <span class="sign">已认证</span></a>' +
                '</div>';
        }
        //$('.section-orderlist').append(html);
        return html;
    };

    /**
     * 显示产品图标
     * @param item
     * @returns {*}
     */
    var viewProductPic = function (type, item) {
        var pic = "";
        switch (item.productType) {
            case 2:
                pic = "../../images/patent.png";
                break;
            case 3:
                pic = "../../images/copyright.png";
                break;
            case 4:
                pic = "../../images/business.png";
                break;
            default:
                pic = "../../images/brand.png";
        }
        if (type == 1) {
            //订单列表
            if (item.attachmentPic) {
                pic = common.imgPath + item.attachmentPic;
            }
        } else {
            //订单详情
        }
        return pic;
    };

    var executeOrderInfoHtml = function (baseProductId, item) {
        var html = "";
        var flow2StateName = "";
        //用产品ID来判断是走新的逻辑还是旧的逻辑   智能 150 447 担保148  保姆1 合伙人 暂定5
        if ([intelligentId, abroadId, guaranteeId, nannyId, partnerId].indexOf(baseProductId) >= 0) {
            flow2StateName = getStateName(item);
            //如果是专利，版权，创业
        } else {
            flow2StateName = getOtherStateName(item);
        }
        var imagePath = viewProductPic(item.productType, item);
        //未付款的取serviceCharge  officialCharge
        //付完款的取diplomatServiceCharge
        //国内智能注册显示发票费用
        var serviceCharge = 0;
        var officialCharge = 0;
        var flow2State = item.flow2State;
        var flowState = item.flowState;
        var payState = item.payState;
        var userState = item.userState;
        if (!flow2State) {
            if (payState == 0) {
                flow2State = 1;
                flowState = 1;
            } else {
                flow2State = 5;
                flowState = 10;
            }
        }
        if (baseProductId == intelligentId) {
            var invoiceChargge = 0;
            if (item.diplomatTotal == 0) {
                invoiceChargge = item.invoiceCharge;
                serviceCharge = item.serviceCharge;
                officialCharge = item.officialCharge;
            } else {
                invoiceChargge = item.diplomatInvoiceCharge;
                serviceCharge = item.diplomatServiceCharge;
                officialCharge = item.diplomatOfficialCharge;
            }
            var number = 0;
            if (item.groupState == 1) {
                number = item.cNumber;
            } else {
                number = item.number;
            }
            var productName = "";
            if (baseProductId == guaranteeId || baseProductId == nannyId) {
                productName = item.productName;
            } else {
                productName = item.productName + "-" + item.bizName;
            }
            html += '</div>' +
                '<dl class="brandClick" id="'+item.bizOrderNoe +'">' +
                '    <dt><img src="' + imagePath + '"></dt>' +
                '    <dd>' +
                '        <h1>' + productName + '</h1>' +
                '        <span class="status">' + flow2StateName + '</span>' +
                '        <span class="money clearfix"><i>服务费:￥' + transforMoney(serviceCharge) + '</i>' +
                '<i>官费:￥' + transforMoney(officialCharge) + '</i><i>发票费:￥' + transforMoney(invoiceChargge) + '</i></span>' +
                '        <span class="total">' +
                '            <i class="cost">￥' + calculationMoney(item, 0) + '</i>' +
                '        </span>' +
                '    </dd>' +
                '</dl>' +
                '<div class="total-cost">合计：<i>￥<i>' + parseFloat(calculationMoney(item, 0)).toFixed(2) + '</i></i></div>';
            //$('.section-orderlist').append(html);
            if (item.payState != 2) {
                $("body").on('touchend', "#"+item.bizOrderNoe, function () {
                    jumpOrderDetail(item.bizOrderNoe, item.payOrderNoe, item.userIde, item.agentIde);
                });
            }
        } else if (baseProductId == guaranteeId || baseProductId == nannyId || baseProductId == partnerId || baseProductId == abroadId) {
            var number = 0;
            if (item.groupState == 1) {
                number = item.cNumber;
            } else {
                number = item.number;
            }
            var productName = "";
            if (baseProductId == guaranteeId || baseProductId == nannyId) {
                productName = item.productName;
            } else {
                productName = item.productName + "-" + item.bizName;
            }
            if (item.diplomatTotal == 0) {
                officialCharge = item.officialCharge;
                serviceCharge = item.total - item.officialCharge;
            } else {
                officialCharge = item.diplomatOfficialCharge;
                serviceCharge = item.diplomatTotal - item.diplomatOfficialCharge;
            }
            html += '</div>' +
                '<dl class="brandClick" id="'+item.bizOrderNoe+'">' +
                '    <dt><img src="' + imagePath + '"></dt>' +
                '    <dd>' +
                '        <h1>' + productName + '</h1>' +
                '        <span class="status">' + flow2StateName + '</span>' +
                '        <span class="money clearfix"><i>服务费:￥' + transforMoney(serviceCharge) + '</i>' +
                '<i>官费:￥' + transforMoney(officialCharge) + '</i></span>' +
                '        <span class="total">' +
                '            <i class="cost">￥' + calculationMoney(item, 1) + '</i>' +
                '        </span>' +
                '    </dd>' +
                '</dl>' +
                '<div class="total-cost">合计：<i>￥<i>' + parseFloat(calculationMoney(item, 1)).toFixed(2) + '</i></i></div>';
            //$('.section-orderlist').append(html);
            if (item.payState != 2 && ( ((baseProductId == guaranteeId || baseProductId == nannyId) && [1, 5, 10].indexOf(flow2State) < 0)
                    || (baseProductId == partnerId && [10].indexOf(flow2State) < 0 ))) {
                $("body").on('touchend', "#"+item.bizOrderNoe, function () {
                    jumpOrderDetail(item.bizOrderNoe, item.payOrderNoe, item.userIde, item.agentIde);
                });
            }
            //非注册显示
        } else {
            var number = 0;
            if (item.groupState == 1) {
                number = item.cNumber;
            } else {
                number = item.number;
            }
            var productName = item.productName;
            var total = item.diplomatTotal != 0 ? item.diplomatTotal : item.total;

            if (item.diplomatTotal == 0) {
                officialCharge = item.officialCharge;
                serviceCharge = item.total - item.officialCharge;
            } else {
                officialCharge = item.diplomatOfficialCharge;
                serviceCharge = item.diplomatTotal - item.diplomatOfficialCharge;
            }
            var notRegister = {};
            notRegister.userIde = item.userIde;
            var diplomatNoe = item.payOrderNoe;
            if(item.bizOrderNoe){
                diplomatNoe = item.bizOrderNoe;
            }
            notRegister.diplomatNoe = diplomatNoe;

            localStorage.setItem("notRegisterOrderDetail",JSON.stringify(notRegister))
            var orderNo = item.bizOrderNo != "" ? item.bizOrderNo : item.payOrderNo;
            html += '</div>' +
                '<dl class="notRegisterBrand" id="'+orderNo+'">' +
                '    <dt><img src="' + imagePath + '"></dt>' +
                '    <dd>' +
                '        <h1>' + productName + '</h1>' +
                '        <span class="status">' + flow2StateName + '</span>' +
                '        <span class="money clearfix"><i>服务费:￥' + transforMoney(serviceCharge) + '</i>' +
                '<i>官费:￥' + transforMoney(officialCharge) + '</i></span>' +
                '        <span class="total">' +
                '            <i class="cost">￥' + transforMoney(total) + '</i>' +
                '        </span>' +
                '    </dd>' +
                '</dl>' +
                '<div class="total-cost">合计：<i>￥<i>' + transforMoney(total) + '</i></i></div>';
           // $('.section-orderlist').append(html);
            var orderNo = item.payOrderNo;
            if ([3, 4, 5, 6, 7].indexOf(userState) >= 0) {
                var userId = item.userIde;
                var childOrderId = item.bizOrderId;
                $("body").on('touchend', "#"+orderNo, function () {
                    checkOtherDetails(userId, childOrderId,orderNo);
                });
            }
        }

        return html;
    };

    var executeButtonHtml = function (baseProductId, item) {
        var html = "";
        if ([intelligentId, abroadId, guaranteeId, nannyId, partnerId].indexOf(baseProductId) >= 0) {
            if (item.payOrderNo && (baseProductId == intelligentId || baseProductId == abroadId)) {
                //说明是智能订单
                html += intelligentHtml(item);
            } else if (item.payOrderNo && (baseProductId == guaranteeId || baseProductId == nannyId)) {
                //说明是保姆或第三方
                html += thirdHtml(item);
            } else {
                //说明是合伙人
                html += hhrHtml(item);
            }

        } else {
            html += nonRegisterHtml(item);

        }

        return html;
    };
    //非注册的按钮触发的事件处理开始
    //支付
    var goPay = function (item) {
        var orderNo = item.payOrderNo;
        var price = item.total;
        var pBusinessTypeId = item.bizOrderNo;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa4e63112fc16d333" +
                "&redirect_uri=http%3A%2F%2F" + common.linkAddress + "%2FsecondPage%2Fpayment.html%3ForderNo%3D"
                + orderNo + "%26price%3D" + price + "%26sourcePrice%3D" + price + "%26epId%3D" + pBusinessTypeId
                + "&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
        } else {
            window.location.href =
                "../secondPage/payment.html?orderNo=" + orderNo + "&sourcePrice=" + price + "&epId="
                + pBusinessTypeId;
        }
    };
    //取消订单
    var deleteOrder = function (item) {
        var user = common.getUser();
        var orderNo = item.payOrderNo;

        var data = new common.data();
        data.map.orderNo = orderNo;
        data.map.userId = user.fuid;
        data.method = 'deleteOrderByOrderNo';

        common.post(data, function (result) {

        });
    };
    //查看详情
    var viewDetail = function (item) {
        window.location.href = "../../personal/orderdetail.html";
    };
    var cancelOrderModal = function (orderNo, userId, productNo) {
        setTimeout(function () {
            if (isScroll.isTouch) {
                $('.submit').attr('data-user-ide', userId);
                $('.submit').attr('data-order-noe', orderNo);
                $('.submit').attr('data-product-no', productNo);
                $('#cancelOrder').addClass("show");
            }
        }, 100);
    };

    //非注册的按钮触发的事件处理结束

    //如果是非注册类的数据，走这个逻辑显示按钮
    var nonRegisterHtml = function (item) {
        var btnHtml = "";
        var payState = item.payState;
        var userState = item.userState;
        var user2State = item.user2State;
        var groupState = item.groupState;

        var userId = item.userIde;
        var childOrderId = item.bizOrderId;
        var orderNo = item.payOrderNo;
        if (payState == 0) {
            btnHtml += '<div class="btns"><a class="btn" href="javascript:void(0)" ontouchend="orderList.cancelOrderModal(\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.productNo + '\')">取消订单</a>' +
                '<a class="btn btn1" href="javascript:void(0)" ontouchend="common.pay(\'' + item.payOrderNoe + '\',\'' + item.bizOrderNoe + '\',\'' + item.applicantName + '\',\'' + item.contactName + '\',\'' + item.productName + '\',\'' + item.orderBizType + '\',\'' + item.payOrderNo + '\',\'' + item.bizOrderNo + '\',\'' + transforMoney(item.diplomatTotal == 0 ? item.total : item.diplomatTotal) + '\',\'' + transforMoney(item.diplomatInvoiceCharge == 0 ? item.invoiceCharge : item.diplomatInvoiceCharge) + '\',\'' + item.bizName  + '\',\'' + "" + '\',\'' + "" + '\',\''+item.baseProductId+'\')">立即付款</a></div>';
        } else if (3 == userState) {
            btnHtml += '<div class="btns"><span class="btn" ontouchend="orderList.checkOtherDetails(\'' + userId + '\',\'' + childOrderId + '\',\''+orderNo+'\')">确认递交</span></div>';
            //查看订单不可点击
        } else if (4 == userState) {
            btnHtml += '<div class="btns"><span class="btn" ontouchend="orderList.checkOtherDetails(\'' + userId + '\',\'' + childOrderId+ '\',\''+orderNo+'\')">确认回执</span></div>';
            //查看订单不可点击
        } else if (5 == userState) {
            btnHtml += '<div class="btns"><span class="btn" ontouchend="orderList.checkOtherDetails(\'' + userId + '\',\'' + childOrderId + '\',\''+orderNo+'\')">立即评价</span></div>';
            //查看订单不可点击
        }else if (6 == userState) {
            btnHtml += '<div class="btns"><span class="btn" ontouchend="orderList.checkOtherDetails(\'' + userId + '\',\'' + childOrderId + '\',\''+orderNo+'\')">查看详情</span></div>';
            //查看订单不可点击
        }else if ([2, 8].indexOf(userState) >= 0) {
            btnHtml += '<div class="btn cancel">查看订单</div>';
        }

        return btnHtml;
    };

    var checkOtherDetails = function (userId, childOrderId,orderNo) {
        //console.log(userId+childOrderId)
        var url = "../../personal/diplomatsDetail.html?userId=" + userId + "&childOrderId=" + childOrderId+"&orderNo=" + orderNo;
        scrollEndLink(url);
    };
    //如果是非注册类的数据，走这个逻辑取状态数据
    var getOtherStateName = function (item) {
        var flow2StateName = "";
        var userState = item.userState;
        var user2State = item.user2State;
        var payState = item.payState;
        if (payState == 2) {
            flow2StateName = "已退款";
        } else {
            if (userState == 3) {
                flow2StateName = "待确认交官";
            } else if (userState == 4) {
                flow2StateName = "待递交官方";
            } else if (userState == 5) {
                flow2StateName = "待评价";
            } else if (userState == 2 || userState == 8) {
                flow2StateName = "处理中";
            } else if (userState == 0) {
                flow2StateName = "待付款";
            } else if (userState == 6) {
                flow2StateName = "已完成";
            }
        }

        return flow2StateName;
    };

    //交官处于待付款和待代理人处理  有可能没有值，
    // 需要根据订单的支付状态来判断，如果未支付那就是待付款，如果已经支付那就是待代理人处理
    //智能 150 447 担保148  保姆1 合伙人 ：待定
    var getStateName = function (item) {
        var flowState = item.flowState;
        var flow2State = item.flow2State;
        var payState = item.payState;
        var baseProductId = item.baseProductId;
        var errorState = item.errorState;
        var error2State = item.error2State;
        var payState = item.payState;
        if (!flow2State) {
            if (payState == 0) {
                flow2State = 1;
                flowState = 1;
            } else {
                flow2State = 5;
                flowState = 10;
            }
        }
        var flow2StateName = '';
        if (flow2State == 1) {
            flow2StateName = '待付款';
        } else if ((errorState != 210 && (error2State != 10 && error2State != 11)) && payState != 2) {
            if ((flow2State == 5 || flow2State == 35) && (baseProductId == intelligentId || baseProductId == abroadId) ) {
                flow2StateName = '待上传资料';
            } else if((flow2State == 5 || flow2State == 35) && (baseProductId != intelligentId && baseProductId != abroadId) ) {
                flow2StateName = '待代理人处理';
            } else if (flow2State == 10) {
                if (baseProductId == intelligentId || baseProductId == abroadId) {
                    flow2StateName = '待流程审核';
                }
            } else if (flow2State == 15) {
                if (baseProductId != intelligentId && baseProductId != abroadId) {
                    flow2StateName = '待客户确认';
                }
            } else if (flow2State == 20) {
                if (baseProductId != intelligentId && baseProductId != abroadId) {
                    flow2StateName = '待流程审核';
                }
            } else if (flow2State == 25) {
                if (baseProductId != intelligentId && baseProductId != abroadId) {
                    flow2StateName = '待代理人处理';
                }
            } else if (flow2State == 30) {
                flow2StateName = '待流程审核';
            } else if (flow2State == 40) {
                flow2StateName = '待递交官方';
            } else if (flow2State == 45 || flow2State == 55) {
                flow2StateName = '已完成';
            } else if (flow2State == 50 && baseProductId != intelligentId && baseProductId != abroadId) {
                flow2StateName = '待评价';
            }
        } else if ((errorState == 210 && (error2State == 10 || error2State == 11)) || payState == 2) {
            flow2StateName = '已退款';
        }

        return flow2StateName;
    };

    var intelligentHtml = function (item) {
        var html = "";
        var payState = item.payState;
        var flowState = item.flowState;
        var flow2State = item.flow2State;
        var errorState = item.errorState;
        var error2State = item.error2State;
        var payState = item.payState;
        if (!flow2State) {
            if (payState == 0) {
                flow2State = 1;
                flowState = 1;
            } else {
                flow2State = 5;
                flowState = 10;
            }
        }
        if (payState == 2) {

        } else {
            if (flowState == 1 && flow2State == 1) {
                //说明是待付款状态
                //取消订单；查看详情（只有智能单有）；立即付款
                html += '<div class="btns" >' +
                    '    <a class="btn" href="javascript:void(0)" ontouchend="orderList.cancelOrderModal(\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.productNo + '\')">取消订单</a>' +
                    '    <a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + "" + '\')">查看详情</a>' +
                    '   <a class="btn btn1" href="javascript:void(0)" ontouchend="common.pay(\'' + item.payOrderNoe + '\',\'' + item.bizOrderNoe + '\',\'' + item.applicantName + '\',\'' + item.contactName + '\',\'' + item.productName + '\',\'' + item.orderBizType + '\',\'' + item.payOrderNo + '\',\'' + item.bizOrderNo + '\',\'' + transforMoney(item.diplomatTotal == 0 ? item.total : item.diplomatTotal) + '\',\'' + transforMoney(item.diplomatInvoiceCharge == 0 ? item.invoiceCharge : item.diplomatInvoiceCharge) + '\',\'' + item.bizName +  '\',\'' + "" + '\',\'' + "" + '\',\''+item.baseProductId+'\')">立即付款</a>' +
                    '</div>';
            } else if (flowState == 10 && (flow2State == 5 || flow2State == 35) && (errorState != 210 && (error2State != 10 && error2State != 11) && payState != 2)) {
                //说明是待上传材料
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + "" + '\')">上传材料</a>' +
                    '</div>';
            } else if (flow2State != 15 && flow2State != 20 && flow2State != 25) {
                //说明其他状态
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + "" + '\')">查看详情</a>' +
                    '</div>';
            }
        }

        return html;
    };
    var thirdHtml = function (item) {
        var html = "";
        var payState = item.payState;
        var flowState = item.flowState;
        var flow2State = item.flow2State;
        var errorState = item.errorState;
        var error2State = item.error2State;
        var payState = item.payState;
        if (flow2State == null || flow2State == undefined || flow2State == '') {
            if (payState == 0) {
                flow2State = 1;
                flowState = 1;
            } else {
                flow2State = 5;
                flowState = 10;
            }
        }
        if (payState == 2) {

        } else {
            if (flowState == 1 && flow2State == 1) {
                //说明是待付款状态,第三方此状态没有查看详情
                html += '<div class="btns">' +
                    '    <a class="btn" href="javascript:void(0)" ontouchend="orderList.cancelOrderModal(\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.productNo + '\')">取消订单</a>' +
                    '    <a class="btn btn1" href="javascript:void(0)" ontouchend="common.pay(\'' + item.payOrderNoe + '\',\'' + item.bizOrderNoe + '\',\'' + item.applicantName + '\',\'' + item.contactName + '\',\'' + item.productName + '\',\'' + item.orderBizType + '\',\'' + item.payOrderNo + '\',\'' + item.bizOrderNo + '\',\'' + transforMoney(item.diplomatTotal == 0 ? item.total : item.diplomatTotal) + '\',\'' + transforMoney(item.diplomatInvoiceCharge == 0 ? item.invoiceCharge : item.diplomatInvoiceCharge) + '\',\'' + item.bizName + '\',\'' + "" + '\',\'' + "" + '\',\''+item.baseProductId+'\')">立即付款</a>' +
                    '</div>';
            } else if (flowState == 10 && flow2State == 5) {
                //说明是付款完成，但是不可查看详情
                html += '<div class="btns">' +
                    '<a class="btn cancel" disabled="ture" href="javascript:void(0)" ' +
                    'ontouchend="orderList.clickDisabled(this)">查看详情</a>' +
                    '</div>';
            } else if (flowState == 10 && flow2State == 15 && (errorState != 210 && (error2State != 10 && error2State != 11) && payState != 2)) {
                //说明是提交资料待客户确认
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">确认材料</a>' +
                    '</div>';
            } else if (flowState == 30 && flow2State == 50 && (errorState != 210 && (error2State != 10 && error2State != 11) && payState != 2 )) {
                //说明是待评价
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">立即评价</a>' +
                    '</div>';
            } else if (flow2State != 10) {
                var clazz = "btn1";
                //保姆单如果是提交客户确认之前退款的，不可以查看详情//已取消的保姆单不能查看详情
                if ((flowState == 1 && flow2State == 5) || (flowState < 10 && flow2State < 20)) {
                    //说明是待代理人受理，不能查看详情
                    clazz = "disable";
                }
                //说明其他状态
                html += '<div class="btns">' +
                    '<a class="btn ' + clazz + '" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">查看详情</a>' +
                    '</div>';
            }
        }

        return html;
    };

    var hhrHtml = function (item) {
        var html = "";
        var payState = item.payState;
        var flowState = item.flowState;
        var flow2State = item.flow2State;
        var errorState = item.errorState;
        var error2State = item.error2State;
        var partnerEvaluateState = item.partnerEvaluateState;
        var payState = item.payState;
        if (flow2State == null || flow2State == undefined || flow2State == '') {
            if (payState == 0) {
                flow2State = 1;
                flowState = 1;
            } else {
                flow2State = 5;
                flowState = 10;
            }
        }
        if (payState == 2) {

        } else {
            if (flowState == 1 && flow2State == 1) {
                //说明是待付款状态
                html += '<div class="btns">' +
                    '   <a class="btn btn1" href="javascript:void(0)" ontouchend="common.pay(\'' + item.payOrderNoe + '\',\'' + item.bizOrderNoe + '\',\'' + item.applicantName + '\',\'' + item.contactName + '\',\'' + item.productName + '\',\'' + item.orderBizType + '\',\'' + item.payOrderNo + '\',\'' + item.bizOrderNo + '\',\'' + transforMoney(item.diplomatTotal == 0 ? item.total : item.diplomatTotal) + '\',\'' + transforMoney(item.diplomatInvoiceCharge == 0 ? item.invoiceCharge : item.diplomatInvoiceCharge) + '\',\'' + item.bizName + '\',\'' + "" + '\',\'' + "" + '\',\''+item.baseProductId+'\')">确认付款</a>' +
                    '</div>';
            } else if (flowState == 10 && flow2State == 15 && (errorState != 210 && (error2State != 10 && error2State != 11) && payState != 2)) {
                //说明是客户确认，确认提交，可评价
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">确认递交</a>' +
                    '</div>';
                //partnerEvaluateState 如果为1的话，就是已经评价过了，不能再评价了
            } else if (partnerEvaluateState != 1 && flowState == 30 && flow2State == 50 && (errorState != 210 && (error2State != 10 && error2State != 11) && payState != 2)) {
                //说明是待评价
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">立即评价</a>' +
                    '</div>';
            } else if (flow2State != 10) {
                //说明其他状态
                html += '<div class="btns">' +
                    '<a class="btn btn1" href="javascript:void(0)" ' +
                    'ontouchend="orderList.jumpOrderDetail(\'' + item.bizOrderNoe + '\',\'' + item.payOrderNoe + '\',\'' + item.userIde + '\',\'' + item.agentIde + '\')">查看详情</a>' +
                    '</div>';
            }
        }

        return html;
    };

    //全部
    var all = function (pageNo) {
        order(pageNo, "all", "");
    };
    //待付款
    var notPay = function (pageNo) {
        order(pageNo, "notPay", "");
    };
    //服务中
    var inService = function (pageNo, orderState) {
        order(pageNo, "inService", orderState);
    };
    //已完成
    var over = function (pageNo) {
        order(pageNo, "over", "");
    };
    //待评价
    var evaluate = function (pageNo) {
        order(pageNo, "evaluate", "");
    };

    var jumpOrderDetail = function (diplomatNoe, orderNoe, userIde, agentIde) {
        var url = "order-detail.html?orderNoe=" + orderNoe + "&diplomatNoe="
            + diplomatNoe + "&userIde=" + userIde + "&agentIde=" + agentIde;
        scrollEndLink(url);
    };

    /**
     * 代理人给保姆注册订单填写交官文件
     */

    /**
     * 刷新页面
     */
    var refreshPage = function () {
        location.reload();
    };
    var transforMoney = function (moneyNum) {
        var money = 0;
        if (moneyNum) {
            money = parseFloat(moneyNum / 100).toFixed(2);
        }
        return money;
    };
    var calculationMoney = function (item, type) {
        var total = 0;
        if (item) {
            if (item.diplomatTotal == 0) {
                if (item.serviceCharge) {
                    total += item.serviceCharge;
                }
                if (item.officialCharge) {
                    total += item.officialCharge;
                }
                // if(type == 0){
                if (item.invoiceCharge) {
                    total += item.invoiceCharge;
                }
                // }
            } else {
                if (item.diplomatServiceCharge) {
                    total += item.diplomatServiceCharge;
                }
                if (item.diplomatOfficialCharge) {
                    total += item.diplomatOfficialCharge;
                }
                // if(type == 0){
                if (item.diplomatInvoiceCharge) {
                    total += item.diplomatInvoiceCharge;
                }
                // }
            }

        }
        return parseFloat(total / 100).toFixed(2);
    };

    
    var cancelOrder = function (obj) {
        var data = common.newData();
        data.method = "cancelPayOrder";
        data.userIde = $(obj).attr("data-user-ide");
        data.orderNoe = $(obj).attr("data-order-noe");
        data.productNo = $(obj).attr("data-product-no");
        common.post(data, function () {
            location.reload();
        })
    }

    function clickDisabled(obj) {
        if (obj.disabled) {
            return false;
        }
        return true;
    };

    /**
     * 用户审核交官材料,审核通过或者不通过
     */
    function verifyDiplomats(type) {
        var data = common.newData();
        var orderDetailStr = localStorage.getItem("orderDetail");
        var orderDetail;
        if (orderDetailStr) {
            orderDetail = JSON.parse(orderDetailStr);
        }
        data.method = "verifyDiplomats";
        data.userIde = orderDetail.order.userIde;
        data.productNo = orderDetail.diplomats.productNo;
        data.orderNoe = orderDetail.order.orderNoe;
        data.diplomatNoe = orderDetail.diplomats.diplomatNoe;
        data.version = orderDetail.diplomats.version;
        data.confirmType = type;
        if (type == 0) {
            data.auditMsg = $('.audit-msg').text();
        }
        common.post(data, function (result) {
            location.href = "order-list.html";
        });
    };

    return {
        search: search,
        all: all,
        notPay: notPay,
        inService: inService,
        over: over,
        evaluate: evaluate,
        jumpOrderDetail: jumpOrderDetail,
        refreshPage: refreshPage,
        checkOtherDetails: checkOtherDetails,
        clickDisabled: clickDisabled,
        cancelOrder : cancelOrder,
        cancelOrderModal : cancelOrderModal
    }
})();