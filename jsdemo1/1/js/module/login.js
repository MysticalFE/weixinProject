window.loginModule = Object.create(baseModule);
//每个对象互相独立---》简称继承
(function(){
	var selfModule = {
		el: $('#login'),
		teldom: $(".input-tel"),
		codedom: $(".input-code"),
		checkdom: $(".check-code"),
		submitDom: $(".login-btn"),
		name: '我是表单页',
		renderContent: function(){
			/*this.el.html('我是登录的模块')*/
			console.log('我是登录的模块');
		},
		bindEvent: function(){
			var me = this;
			$("input").on('input', function(e) {
				me.checkValidForm();
			});
			this.submitDom.bind("click", function(){
				Tool.store('login_person', {
					name: me.teldom.val(),
					login_dateTime: new Date().getTime()
				});
				location.href = '#/formbus'
			})
		},
		checkValidForm: function() {
		    var flag = false;
		    var telvalue = this.teldom.val();
		    var codevalue = this.codedom.val();

		    if(telvalue === '' || !/^\d{11}$/.test(telvalue)) {
		    	flag = true;
		    	this.checkdom.removeClass('active')
		    }else {
		    	this.checkdom.addClass('active');
		    }
		    if(codevalue === '' || !/^\d{4}$/.test(codevalue)) {
		    	console.log('验证码不对');
		    	this.submitDom.removeClass('active')
		    	flag = true;
		    }
		    if(!flag) {
		    	console.log('通过了检验');
		    	this.submitDom.addClass('active');

		    }
		},
		submitForm: function() {
		    
		}
	}
	$.extend(loginModule,selfModule);
})();




