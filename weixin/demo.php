<?php
//这里的jssdk.php是官方网站示例代码的源码， import进来就好
require_once "jssdk.php";
// 这里的配置好自己微信测试号的appId和appsecret
$jssdk = new JSSDK("wx709e99ad0b187d7a", "03c087492d5ab6e303514da87c48a669");
$signPackage = $jssdk->GetSignPackage();
?>
<html lang="en" manifest="/cache.manifest">
<head>
	<meta charset="UTF-8" />
	<script src="weixin.js"></script>
	<title>前端心得分享</title>
</head>
<body>
	<h1 style="
	    font-size: 74px;
	    text-align: center;
	">这是我第一个微信公众号</h1>
	<img src="img/qrcode.jpg" height="530" width="530" alt="" style="margin: 0 auto;text-align: center;position: relative;left: 50%;margin-left: -265px;">
	<p id="myaddr" style="
    color: red;
    font-size: 74px;
    text-align: center;
">查看我的位置</p>
<p style="
    text-align: right;
    padding-right: 40px;
    font-size: 42px;
    color: blue;
">作者：龚一峰</p>
	<script>
		var latitude;
        var longitude;
		wx.config({
			debug: false,
			appId: '<?php echo $signPackage["appId"];?>',
			timestamp: '<?php echo $signPackage["timestamp"];?>',
			nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			signature: '<?php echo $signPackage["signature"];?>',
			url: '<?php echo $signPackage["url"];?>',
		    jsApiList: [
				'getLocation',
				'openLocation',
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		document.getElementById("myaddr").onclick = function() {
	        wx.openLocation({
              latitude: latitude,
              longitude: longitude,
              name: '你的位置',
              address: '详细地址是：xxx',
              scale: 14,
              infoUrl: 'http://weixin.qq.com'
            });
		}
		wx.ready(function () {
		  	//wx.hideOptionMenu();// 在这里调用 API
			wx.getLocation({
			    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			    success: function (res) {
					latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			        var speed = res.speed; // 速度，以米/每秒计
			        var accuracy = res.accuracy; // 位置精度
			        // 这里是拿到用户的当前位置， 也可以调用其他接口， 具体参考官方文档
			    }
			});
		});
	</script>
	<script src="index.js"></script>
</body>
</html>