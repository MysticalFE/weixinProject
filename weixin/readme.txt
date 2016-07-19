怎么部署好微信端的可执行环境?

1. 在你通过svn拉取后的目录中，根目录中新建以下几个文件：

分别是：
 index.php(不用改)
	
 jssdk.php -->第三方依赖


 注意一下，在 jssdk.php中，有这么一句话：
 "saestor://accesstoken/jsapi_ticket.json"
你要在相应的项目文件内，找到存储菜单，点击，创建一个buket，名字叫做 accesstoken  在这个accesstoken中，你需要上传2个文件，分别是：
	
	jsapi_ticket.json
	access_token.json


问题来了，我们自己的页面，如何拥有微信js jdk能力呢？

home.html   ---> home.php

 weixin.js ---> js sdk库---》 微信端提供api接口文件，必须在页面中引入的js文件

之后，我们要新建一个自己的页面。
 自己的页面是：
 这里你的页面就不再是html的页面了，是php的页面：

 self.php --->现在自己建立的一个新的页面

 到这时候，你直接访问，调用微信js API接口，会提示非法域名的报错，
 怎么解决呢？
 打开微信公众号，找到公众号设置， 找到里面功能设置，
设置js接口安全域名，替换成你自己的安全域名。


其实微信端 js SDK它最主要的功能是 分享文案配置，但是由于我们
这个公众号是普通订阅号，不是企业号，以及服务号，所以用不了。