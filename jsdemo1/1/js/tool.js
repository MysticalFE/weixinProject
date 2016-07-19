window.Tool = {
	store: function(namespace, data, remove){
		//存储内容
		//namespace: 命名空间
		//data： 存储的数据对象
		//利用多态去处理
		if(arguments.length > 2) {
			localStorage.removeItem(namespace);
		}else if(arguments.length > 1){
			localStorage.setItem(namespace, JSON.stringify(data));
		}else {
			var strobj = localStorage.getItem(namespace);
			return (strobj && JSON.parse(strobj)) || {};
		}
	},
	getPosition: function(){
			//通过微信定位得到地理位置信息
		//alert('得到定位');
		var lat, lng;
		/*wx.ready(function () {
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
		});	*/	 	
	}

}
/*
localStorage.setItem('person', data);


localStorage.getItem('person');

function setData(key, data){
	localStorage.setItem(key, data);
}

function getData(key){
	localStorage.getItem(key);
}

setData('person', data);

getData('person');

store(1, 2) //--?存数据
store(1) //--?取数据
//现在我们学到的编程中的一些高大上的概念：
//1.继承，2.面向对象。 3.重载

//现在我们即将引入另外一个非常高大上的概念： 
//编程中的多态性

//多态： 用同一个api，去实现不同方法*/

