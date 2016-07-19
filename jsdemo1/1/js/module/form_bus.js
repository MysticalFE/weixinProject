window.form_busModule = Object.create(baseModule);
//每个对象互相独立---》简称继承
(function(){
	var selfModule = {
		el: $('#form_bus'),
		selcity: $(".selcity"),
		homeinput: $("input[name=home_addr]"),
		workinput: $("input[name=work_addr]"),
		submitdom: $(".collect-submit"),
		name: '我是表单页',
		morning: false,
		evening: false,
		renderContent: function(){
			//this.el.html('我是表单页的模块')
			console.log('我是表单页的模块');
		},
		changeCityName: function(cityname){
			this.selcity.html(cityname);
			//这样做 可观性、维护性、解耦性、扩展性得到了飞跃性提高	 	
		},
		bindEvent: function(){
			var me = this;
			//this.getPosition();
			$(EventCenter).bind('morning_change', function(event, hour){
				console.log('上班时间发生了改变');
				me.morning = true;
				$("input[name=morning_time]").val(hour);
				me.checkValidForm();
			});
			$(EventCenter).bind('evening_change', function(event, hour){
				console.log('下班时间发生了改变');
				me.evening = true;
				$("input[name=evening_time]").val(hour);
				me.checkValidForm();
			});
			$(EventCenter).trigger('datePicker_Init');
			this.selcity.click(function(event){
				location.href="#/citylist";
			})
			this.homeinput.bind("input", function(event){
				me.checkValidForm();	
			});
			this.workinput.bind("input", function(event){
				me.checkValidForm();	
			});
			this.submitdom.bind('click', function(){
				if(me.submitdom.hasClass('active')) {
					var $form = $('.formbus form');
					var formData = $form.serializeArray();
					var obj = {};
					for(var i =0 ; i< formData.length; i++) {
						var item = formData[i];
						var key = formData[i].name;
						obj[key] = formData[i].value;
					}
					Tool.store('busform', obj);
					if(EventCenter.islogin) {
						location.href="#/rank";
					}else {
						location.href="#/login";
					}
				}
			});
		},
		checkValidForm: function(){
			//检查表单内容是否填写完成
			var flag = false;
			if(this.homeinput.val() === '') {
				flag = true;
			}
			if(this.workinput.val() === '') {
				flag = true;
			}
			if(!this.morning) {
				flag = true;
			}
			if(!this.evening) {
				flag = true;
			}

			if(!flag) {
				console.log('你通过检验');
				this.submitdom.addClass('active');
			}else {
				console.log('你没有通过检验');
				this.submitdom.removeClass('active');
			}
		},
		enter: function(){
			this.el.show();
			var userInfo = Tool.store('login_person');
			if(userInfo.name) {
				EventCenter.islogin = true;
				//代表这个时候是登陆状态
				console.log('我已经登陆');
				var formInfo = Tool.store('busform');
				this.workinput.val(formInfo.work_addr);
				this.homeinput.val(formInfo.home_addr);
				this.morning = true;
				this.evening = true;
				$(".mor_time").html(formInfo.morning_time);
				$(".eve_time").html(formInfo.evening_time);
				$("input[name=morning_time]").val(formInfo.morning_time);
				$("input[name=evening_time]").val(formInfo.evening_time);
				this.submitdom.addClass('active');
			}
		}
	}
	$.extend(form_busModule, selfModule);
})();