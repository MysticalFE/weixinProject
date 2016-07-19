window.rankModule = Object.create(baseModule);
//每个对象互相独立---》简称继承
(function(){
	var selfModule = {
		el: $('#rank'),
		name: '我是排名页',
		listel: $(".js-ranklist"),
		getlayer_content: function(){
			str =   '<div class="layer_content">' +
					'	<div class="rule_content">' +
					'		<div class="rule_head">' +
					'			活动规则' +
					'		</div>' +
					'		<div class="rule_body">' +
					'			滴滴巴⼠将奔赴各城,填写您的乘车需求,参战城市排位战,城市排名靠前的城市就有可能第⼀时间坐到滴滴巴士,获取免费上下班的机会!' +
					'		</div>' +
					'		<div class="rule_submit">' +
					'			我要参战' +
					'		</div>' +
					'	</div>' +
					'</div>'
			return str;		 	
		},
		init: function(){
			this.getData();
			this.bindEvent();
			console.log('我在getData后面');
			console.log('我是重载的init方法');		 	
		},
		enter: function(){
			this.el.show();
			$(EventCenter).trigger('returnTop'); 	
		},
		renderContent: function(obj){
			str = "";
			var targetNum = null;
			var count = 0;
			for(var key in obj) {
				if(count === 0) {
					targetNum = obj[key];
				}
				var LEFT_OFFSET_REM = 9.5;
				var dotted_num = LEFT_OFFSET_REM/targetNum;
				var left = dotted_num * obj[key];
				if(left < 3) {
					left = 3 + left;
				}
				count++;
				str += '<li>' +
						'	<div class="left_pane inl">' +
						'		<div class="rank_number inl">' + count + '</div>' +
						'		<div class="rank_name inl">' + key + '</div>' +
						'	</div>' +
						'	<div data-left="' + left + '" class="right_pane inl">' +
						'		<div class="bus_info">' +
						'			' + obj[key] + '人' +
						'		</div>' +
						'	</div>' +
						'	<div class="barline"></div>' +
						'	<div class="citybar" style="animation:runcity '+ (3 - obj[key]/targetNum ) +'s infinite linear both 1.5s;-webkit-animation:runcity '+ (3 - obj[key]/targetNum ) +'s infinite linear both 1.5s;"></div>' +
						'</li>';
			}
			this.listel.html(str);
			setTimeout(function(){
				$(".right_pane").each(function(index, val){
				   val.style.left = val.dataset.left + 'rem';
				});	 	
			}, 1000)
			//IScroll 就是iscroll.js暴露出的全局变量
		},
		bindEvent: function(){
			var me = this;
			this.el.find(".submit_button").click(function(){
				location.href = "#/formbus";
			});
			this.el.find(".rule_submit").click(function(){
				location.href = "#/formbus"; 	
			});
			this.el.find('.rule_desc').click(function(){
				$(EventCenter).trigger('layer', me.getlayer_content());
				//Layer.init();
			})
		},
		getData: function(){
			var me = this;
			$.ajax({
				url: "js/data.json",
				type: 'get',
				success:function(res){
					console.log('异步代码');
					if(typeof res === "string") {
						res = JSON.parse(res)
					}else {
						res = res;
					}
					me.renderContent(res);
					$(EventCenter).trigger('iscroll_load');
					console.log(res);
				},
				error: function(res){
					console.log(res); 	
				}
			})
		}
	}
	$.extend(rankModule,selfModule);
})();