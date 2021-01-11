/*
Http请求中的内容
	请求行
		ex: GET /images/logo.gif HTTP/1.1
		基本由请求方法，URL，协议版本组成
		GET与POST
			get请求能缓存，post不能
			post相对get安全一点点，因为get请求都包含在URL里(或者body里)，且会被浏览器保存历史记录，post不会，但是在抓包的情况下都是一样的
			URL有长度限制，会影响get请求，但是这个长度限制是浏览器规定的，不是RFC规定的
			post支持更多的编码类型且不对数据类型限制
	首部
		首部分为请求首部和响应首部，并且部分首部两种通用
		通用首部
			Cache-Control	控制缓存的行为
			Connection	浏览器想要优先使用的连接类型，比如keep-alibe
			Date	创建报文的时间
			Pragma	报文指令
			Via		代理服务器相关信息
			Transfer-Encoding	传输编码方式
			Upgrade		要求客户端升级协议
			Warning		在内容中可能存在错误
		请求首部
			Accept	能正确接收的媒体类型
			Accept-Charset	能正确接收的字符集
			Accept-Encoding	能正确接收的编码格式列表
			Accept-Language	能正切接收的语言列表
			Expect	期待服务端的执行行为
			From	请求方邮箱地址
			Host	服务器的域名
			If-Match	两端资源标记比较
			If-Modified-Since	本地资源未修改返回304(比较时间)
			If-Node-Match	本地资源未修改返回304(比较标记)
			User-Agent	客户端信息
			Max-Forwards	限制可被代理及网关转发的次数
			Proxy-Authroization	向代理服务发送验证信息
			Range	请求某个内容的一部分
			Referer	代表浏览器所访问的前一个页面
			TE	传输编码方式
		实体首部
			Allow	资源的正确请求方式
			Content-Encoding	内容的编码格式
			Content-Language	内容使用的语言
			Content-Length		request-body长度
			Content-Location	返回数据的备用地址
			Content-MD5			Base64加密格式的内容 MD5检验值
			Content-Range		内容的位置范围
			Content-Type		内容的媒体类型
			Expries				内容的过期时间
			Last_modified		内容的最后修改时间
		常见状态码
			1xx	接受、继续处理
			2xx 成功
				200-OK-表示从客户端发来的请求在服务器端被正确处理
				204-No content-表示请求成功，但响应报文不含实体的主体部分
				205-Reset Content-表示请求成功，但响应报文不含实体的主体部分，但是与204响应不同在于要求请求方重置内容
				206-Prtial Content-进行范围请求
			3xx 重定向
				301-moved permanently-永久性重定向，表示资源已被分配了新的URL
				302-found-临时性重定向，表示资源临时被分配了新的URL
				303-see other-表示资源存在着另一个URL，应该使用GET方法去获取资源
				307-temporary redirect-临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求
			4xx 客户端错误
				400-bad request-请求报文存在语法错误
				401-unauthorized-表示发送的请求需要通过HTTP认证信息
				403-forbidden-表示对请求资源的访问被服务器拒绝
				404-not found-表示在服务器上没有找到资源
			5xx 服务器错误
				500-internal server erro- 表示服务器端在执行请求时发生了错误
				501-Not Implemented-表示服务器不支持当前请求所需要的某个功能
				503-service unavailable-表明服务器暂存处于超负荷或正在停机维护，无法处理请求
*/