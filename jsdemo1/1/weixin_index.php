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
	<title>busDemo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><!-- 只要是移动端页面，必须加上 -->
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="js/plugin/pace.css">
    <link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="css/common.css"> <!-- 加载公用css代码 -->
	<link rel="stylesheet" href="css/home.css"> <!-- 加载首页css代码 -->
	<link rel="stylesheet" href="css/rank.css">	<!-- 加载排名页css代码 -->
	<link rel="stylesheet" href="css/login.css">
	<link rel="stylesheet" href="css/formbus.css">
	<link rel="stylesheet" href="css/citylist.css">
	<link rel="stylesheet" href="js/plugin/spinwheel.css">
	<link rel="stylesheet" href="js/plugin/vex.css">
</head>
<body>
	<section id="home" style="display:none" class="home">
		<div class="header_page">
			<div class="header_logo">
				
			</div>
			<div class="header_title">
				
			</div>
		</div>
		<div class="middle_page">
			<div class="wrap_city">
				<div class="left_city"></div>
				<div class="middle_city"></div>
				<div class="right_city"></div>
			</div>
			<div class="middle_bus">
				
			</div>
		</div>
		<div class="bottom_page">
			<div class="person_down"></div>
			<div class="person_up"></div>
		</div>
	</section>
	<section style="display:none" id="rank" style="display:block" class="rank">
		<div class="rule_desc">活动规则</div>
		<div class="rank_head">
			<div class="rank_logo"></div>
			<div class="rank_desc">
				全民助力夺榜单<br>免费上班专线抢先坐
			</div>
		</div>
		<div class="rank_list">
			<ul class="list_item js-ranklist">
				
			</ul>
		</div>
		<div class="submit_button">
			
		</div>
	</section>
	<section id="login" style="display:none" class="login">
		<div class="login-logo">
			
		</div>
		<div class="login-title">
			请留下联系方式<br/>您将在第一时间获知夺榜结果
		</div>
		<div class="login-content" data-control="login">
			<p class="login-tel">
				<input type="tel" maxlength="11" class="input-tel" data-tel placeholder="电话">
				<span class="check-code" data-check>验证</span>
			</p>
			<p class="login-code">
				<input maxlength="4" type="tel" class="input-code" data-code placeholder="验证码">
			</p>
			<p class="login-btn" data-login>确认</p>
		</div>
	</section>
	<section id="form_bus" style="display:none" class="formbus">
		<div class="form_head">
			<div class="form_logo">
				
			</div>
			<div class="form_desc">
				请认真填写乘车需求<br>为城市夺榜助力
			</div>
		</div>
		<div class="form_body">
			<div class="line_bar">
				<span class="logo">参战城市：<span class="selcity">北京</span></span>
			</div>
			<form action="" method="post">
				<div class="up_part">
					<div class="home_addr">
						<b></b>
						<input type="text" name="home_addr" class="" placeholder="家庭地址">
					</div>
					<div class="work_addr">
						<b></b>
						<input class="work_addr" type="text" name="work_addr" placeholder="工作地址">
					</div>
				</div>
				<div class="up_part down_part">
					<div class="morning">
						<b></b>
						<div class="time mor_time" data-key="morning" data-tips="上班时间" data-starttime="10" data-datewheel="">什么时候上班</div>
						<input type="hidden" name="morning_time">
					</div>
					<div class="eveing">
						<b></b>
						<div data-key="evening" class="time eve_time" data-tips="下班时间" data-starttime="21" data-datewheel="">什么时候下班</div>
						<input type="hidden" name="evening_time">
					</div>
				</div>
			</form>
		</div>
		<div class="collect-submit contentblock">
			</div>
	</section>
	<section id="citylist" style="display:none" class="citylist">
		<div class="current-city">
			当前定位城市：
			<b>
				无
			</b>
		</div>
		<div class="hot_city">
			<p class="city_head">已开通城市</p>
			<div class="head_city">
				
			</div>
		</div>
		
		<div class="all_city_name">
			<p class="city_head">全部城市</p>
			<div class="allspan">
				
			</div>
		</div>
		<div class="all_wrap">
			
		</div>
	</section>
	<!-- 遮罩层 -->
	<!-- <div class="layer" style="display: block;">
		<div class="layer_mask"></div> 由它負責鎖屏操作
		<div class="layer_content"></div> 負責內容高亮顯示
	</div> -->
	<script src="weixin.js"></script>
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
	<!-- 引用微信jsJDK方法 -->
	<script src="js/rem.js"></script>
	<script src="js/zepto.js"></script>
	<script src="js/plugin/fastclick.js"></script>
	<script src="js/iscroll.js"></script>
	<script src="js/director.js"></script>
	<script src="js/widget/layer/layer.js"></script>
	<script src="js/plugin/pace.js"></script>
	<!-- 进度条插件 -->
	<script src="js/plugin/vex.js"></script>
	<script src="js/plugin/SpinningWheel.js"></script>
	<script src="js/plugin/spinwheel_index.js"></script>
	<script src="js/module/load.js"></script>
	<script src="js/module/baseModule.js"></script>
	<script src="js/module/home.js"></script>
	<script src="js/module/rank.js"></script>
	<script src="js/module/login.js"></script>
	<script src="js/module/form_bus.js"></script>
	<script src="js/module/citylist.js"></script>
	<script src="js/tool.js"></script>
	<script src="js/route.js"></script>
	<script src="js/init.js"></script>
</body>
</html>