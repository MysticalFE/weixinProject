//所有模块的基础模块对象--》简称基类
//首页模块
window.baseModule = {
	el: null,
	init: function(){
		console.log('我是普通的init方法');
		this.render(); //-->渲染自己特有页面的方法
		this.bindEvent();	
		this.el.bind("touchmove", function(event){
			event.stopPropagation();
			event.preventDefault(); 	
		})
	},
	render: function(){
		this.renderContent();
	},
	bindEvent: function(){
		
	},
	renderContent: function(){
		//每个模块的renderContent都不一样	 	
	},
	enter: function(){
		//进入该模块页
		this.el.show();
	},
	leave: function(){
		//离开该模块页
		this.el.hide();
	}
}
//module.exports = baseModule;