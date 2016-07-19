//这是我们项目中，执行全局初始化的一个文件

//routeModule.router('home'); //告诉页面，首页发生了变化

//routeModule -->核心路由器模块对象

window.EventCenter = {};  //-->全局事件中心
//alert('初始化');
//Tool.getPosition();
$.ajax({
	url: "http://gc.ditu.aliyun.com/regeocoding?l=39.938133,116.395739&amp;type=001&nbsp;",
	type: "jsonp",
	success: function(res){
		console.log(res);	 	
	}
});
$(EventCenter).bind('iscroll_load', function(){
	var myScroll = new IScroll('.rank_list', {
       scrollbars: true,
       probeType: 2, //滚动条的灵敏性设置
       bounce:true
    });
});
$(EventCenter).bind('city_change', function(event, cityname){
	form_busModule.changeCityName(cityname); 	
});
$(EventCenter).bind('layer', function(event, str){
	//遮罩层初始化代码
	Layer.init(str);
	//vex.open({})
})
$(EventCenter).bind('loading', function(){
	Loading.loading();
});

$(EventCenter).bind('loaded', function(){
	Loading.loaded();
});

$(EventCenter).bind('datePicker_Init', function(){
	datePickter.init();
});

Pace.on('done', function(){
		new Router({
			'/:hashName': function (hashName) {
					//执行对应的路由变化
					routeModule.router(hashName);
			}.bind(this)
		}).init('/home'); 	
})

//第三方插件会暴露一个全局Router变量，
//专门负责监听hash值的变化
/*new Router({
	'/:hashName': function (hashName) {
			//执行对应的路由变化
			routeModule.router(hashName);
	}.bind(this)
}).init('/home');*/