//首页模块

window.homeModule = Object.create(baseModule);
//每个对象互相独立---》简称继承

//这里的继承使用的是 原型继承
/*
homeModule.el = $('#home');

homeModule.renderContent = function(){
	//这时候我们就在代码设计用到一个非常非常专业方法
	//函数重载
	console.log('代码设计中的重载就是如此');
}*/
(function(){
	//利用自执行函数，对我们变量进行保护，不随意污
	//染全局环境，否则会导致变量冲突。
	var selfModule = {
		el: $('#home'),
		name: '我是首页',
		renderContent: function(data){
			
		},
		bindEvent: function(){
			this.el.click(function(){
				//hash值 是url中#后面的内容
				var $home_logo = $(".header_logo");
		        var $right_pane = $(".header_title");
		        var $home_bus = $(".middle_bus");
		        var $home_city = $(".wrap_city");
		        var $people = $(".bottom_page");
		        $home_logo.addClass("go_home_logo");
		        $right_pane.addClass("go_home_title");
		        $home_bus.addClass("go_home_bus");
		        $home_city.addClass("go_home_city");
		        $people.addClass("go_people");
		        setTimeout(function() {
		            $home_logo.removeClass("go_home_logo");
		            $right_pane.removeClass("go_home_title");
		            $home_bus.removeClass("go_home_bus");
		            $home_city.removeClass("go_home_city");
		            $people.removeClass("go_people");
					location.href = "#/rank";
		        }, 1500);
			});
		}
	}
	$.extend(homeModule,selfModule) //两个对象之间的合并	 	
})();
