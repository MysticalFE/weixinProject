<?php
//这里的jssdk.php是官方网站示例代码的源码， import进来就好
require_once "jssdk.php";
// 这里的配置好自己微信测试号的appId和appsecret
$jssdk = new JSSDK("wx709e99ad0b187d7a", "03c087492d5ab6e303514da87c48a669");
$signPackage = $jssdk->GetSignPackage();
?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微信 phpDemo</title>
	<script src="weixin.js"></script>
</head>
<body>
	<p>微信 phpDemo</p>
	<script>
		wx.config({
			debug: true,
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
		//wx.ready 判断weixin.js是否加载完成，因为weixin.js它是
		//异步加载的，所以要进行判断
		wx.ready(function () {
			alert('微信SDK已经加载完成');
		  	//wx.hideOptionMenu();// 在这里调用 API
			wx.getLocation({
			    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			    success: function (res) {
			    	alert(JSON.stringify(res));
					latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			        var speed = res.speed; // 速度，以米/每秒计
			        var accuracy = res.accuracy; // 位置精度
			        // 这里是拿到用户的当前位置， 也可以调用其他接口， 具体参考官方文档
			    },
			    error: function(res){
			    	alert(JSON.stringify(res)); 	
			    }
			});
		});
	</script>
	<script></script>
	<script></script>
	<script></script>
	<script></script>
</body>
</html>