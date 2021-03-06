var wxImg = 'http://nissan.dflgo.com/minisite/tiangao/h5/Top10Campaigns/image/share.jpg'; //微信分享图标

var url_wx = 'http://wx.dflgo.com/wx/weixinservice.php';
var url_info = window.location.href.split("#")[0];//需要分享出去的网页入口；
var _title = '东风日产2016年十佳营销案例';
var _desc = '';
var _img = wxImg;
var info = {
    url: url_info
};
// 微信授权sdk js
$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: 'http://wx.dflgo.com/wx/weixinservice.php?callback=E0124847927DCA6A4A631D1293846AE9',
    data: {"param": JSON.stringify(info)},
    async: false,
    success: function (data) {
        wx.config({
            //debug: true,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow'
            ]
        });


        wx.ready(function () {
            //debugger;
            // 在这里调用 API
            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage({
                title: _title,
                desc: _desc,
                link: url_info,
                imgUrl: _img,
                trigger: function (res) {
                    //alert('用户点击发送给朋友');
                },
                success: function (res) {
                    var data = {ActivityName:'东风日产2016年十佳营销案例',channeltype :'朋友'}
                    $.ajax({
                          type:"POST",
                          dataType: "jsonp",
                          url:"http://nissan.dflgo.com:1762/Ajax/Common/CommonWebService.asmx/ShareData",
                          data: {
                            param: JSON.stringify(data)
                          }
                      }).done(function(){

                    });
                },

                cancel: function (res) {
                    //alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline({
                title: _title,
                desc: _desc,
                link: url_info,
                imgUrl: _img,
                trigger: function (res) {
                    //alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                     var data = {ActivityName:'东风日产2016年十佳营销案例',channeltype :'朋友圈'}
                        $.ajax({
                              type:"POST",
                              dataType: "jsonp",
                              url:"http://nissan.dflgo.com:1762/Ajax/Common/CommonWebService.asmx/ShareData",
                              data: {
                                param: JSON.stringify(data)
                              }
                          }).done(function(){

                        });
                    },

                cancel: function (res) {
                    //alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        }); //end of wx.ready

    }
})
