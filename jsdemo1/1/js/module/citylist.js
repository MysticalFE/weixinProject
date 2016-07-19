window.cityListModule = Object.create(baseModule);
//每个对象互相独立---》简称继承
(function(){
	var selfModule = {
		el: $('#citylist'),
		hotDom:$(".head_city"),
		all_wrapDom: $(".all_wrap"),
		AlphlistDom:$(".allspan"), //城市字母表
		name: '我是表单页',
		init:function(){
			this.getData();		 	
		},
		renderContent: function(){
			//this.el.html('我是城市列表页的模块')
			console.log('我是城市列表页的模块');
		},
		bindEvent: function(){
			var me =this;
			this.AlphlistDom.find("span").bind('click',function(event){
				var str = $(this).text();
				var selector = '[data-target=' + str + ']'; //字符串类型的选择器
				var offsetTop = $(selector).offset().top;
				window.scrollTo(0, offsetTop);
			});
			this.hotDom.find('span').bind('click', function(event){
				//$(".selcity").html($(this).text());
				//上面异常丑陋，想写丑陋代码的参照上面
				var text = $(this).text();
				$(EventCenter).trigger('city_change', text);
				location.href="#/formbus";	
			})
		},
		renderAlphlist:function(obj){
			var str = "";
			for(var key in obj) {
				str += '<span class="city_name">' + key + '</span>'
			}
			this.AlphlistDom.html(str);	 	
		},
		renderHotCity: function(data){
			var str = "";
			for(var i=0; i< data.length; i++) {
				str += '<span class="hot_city">' + data[i].name + '</span>'
			}
			this.hotDom.html(str);
		},
		renderlist:function(data){
			var str = "";
			for(var i=0; i< data.length; i++) {
				str += '<span class="city_name">' + data[i].name + '</span>'
			}	 	
			return str;
		},
		renderALLcityContent: function(obj){
			var str = "";
			for(var key in obj) {
				var itemlist = obj[key]; //对应字母表中的城市列表
				str += '<div class="reset_citylist">' +
						'	<div data-target="'+key+'" class="city_Title city_head">'+ key +'</div>' +
						'	<div class="wrap_citylist city_module_list">' +
								this.renderlist(itemlist) +
						'	</div>' +
						'</div>';
			}
			this.all_wrapDom.html(str);	 	
		},
		getData:function(){
			var me = this;
			$.ajax({
				url: "/js/citydata.json",
				type:"get",
				success: function(res){
					me.renderHotCity(res.city.hot_city);
					me.renderAlphlist(res.city.city_list);
					me.renderALLcityContent(res.city.city_list);
					me.bindEvent();
					console.log('我得到了数据');	 	
				},
				error: function(data){
					console.log('我失败了'); 	
				}
			})
		}
	}
	$.extend(cityListModule, selfModule);
})();