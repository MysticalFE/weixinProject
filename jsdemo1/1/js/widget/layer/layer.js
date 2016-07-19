/*
   author: 龚一峰
   创建时间： 2016.7.01
*/

window.Layer = (function(){

	var cssLoad = false; //代表css有没有被添加
	var instance; //遮罩层

	function init(layerContent){
		if(!cssLoad) {
			//样式没有被添加
			var style_str = ".layer_mask {position: fixed; right: 0; top: 0; bottom: 0; left: 0; background: rgba(0,0,0,.6); z-index: 1; height: 100%; }.layer {position: fixed; right: 0; top: 0; bottom: 0; left: 0; z-index: 99999; height: 100%; display: none; }";
			var style_instance = document.createElement('style');
			style_instance.innerHTML = style_str;
			document.getElementsByTagName('head')[0].appendChild(style_instance);
			cssLoad = true;
		}
		replace_content = '<div id="layer_mask" class="layer_mask"></div>' + layerContent;
		if(!instance) {
			instance = document.createElement('div');
			instance.setAttribute('class', 'layer');
			var content = replace_content;
			document.body.appendChild(instance);
		}
		instance.innerHTML = replace_content;
		bindEvent();
		show();
		return instance;
	}
	function bindEvent(){
		var dom = document.getElementById('layer_mask');
		dom.onclick = function(){
			hide();
		}
	}
	function show(){
		instance.style.display = 'block';
	}
	function hide(){
		instance.style.display = 'none';
	}
	return {
		init: init
	}
})()