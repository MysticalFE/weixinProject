window.routeModule = (function() {
	//pageMap --> 页面映射存储关系表
	var pageMap = {
		home: homeModule,
		rank: rankModule,
		login: loginModule,
		citylist: cityListModule,
		formbus: form_busModule
	}
	//我为了控制每个页面进去、离开操作，我引入下面的逻辑

	//缓存页面存储关系表,去判断页面需不需要去重复加载
	var pageCacheMap = {
		//页面有没有被初始化的关系表
	}

	/*var pageObj = {
		//当前页，与前一页关系表
		current_Page: null, //当前页面
		pre_Page: null //页面的前一页
	}*/
	var current_Page = null;
	var pre_Page = null;
	//路由控制函数，它专门负责路由对应的跳转操作
	function routerControl(routeName){
		//routeName --> 传人了hash对应名字
		console.log(routeName + '发生了变化');
		//路由的核心代码
		$(EventCenter).trigger('loading');
		
		if(pageMap[routeName]) {
			var module = pageMap[routeName];
			if(typeof pageCacheMap[routeName] === "undefined") {
				//判断页面有没有被初始化过
				console.log(routeName + '没有被初始化过');
				
				module.init();//执行相应模块初始化操作
				module.enter(); //进入该页面

				pageCacheMap[routeName] = module; //将已经初始化的模块，放入缓存关系表中

				//当前页 与 前一页 进行转换操作
				pre_Page = current_Page; //将前一页
				
				current_Page = module;

				console.log('现在的当前页', current_Page.name);
				if(pre_Page) {
					console.log('现在的前一页', pre_Page.name);
					pre_Page.leave();
				}

			}else {
				console.log(routeName + '我已经被初始化过了');
				module.enter(); //直接把页面展示出来
				pre_Page = current_Page;
				current_Page = module;
				if(pre_Page) {
					pre_Page.leave();
				}
			}

		}else {
			pageMap['home'].init();	
		}
		$(EventCenter).trigger('loaded');
		/*等价于 
		routeName = 'home'
		pageMap['home'].init();*/
	}
	//自执行函数执行完成之后它会返回一个对象
	return {
		router: routerControl
	}
	

})();