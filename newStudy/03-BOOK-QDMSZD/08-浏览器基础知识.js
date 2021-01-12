/*
事件机制
	事件触发三个阶段
		window往事件触发处传播，遇到注册的捕获事件会触发
		传播到事件触发处时触发注册的事件
		从事件触发处往window传播，遇到注册的冒泡事件会触发
	
	注册事件
		addEventListener()
	事件代理
		如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册到父节点上
		优点
			节省内存
			不需要给子节点注销事件
*/
node.addEventListener('click', event => {
	event.stopImmediatePropagation()
	console.log('冒泡')
}, false)

/*
跨域
	端口、域名、协议有一个不同就是跨域
*/
// JSONP 
// <script src="http://xxxxxx"></script>
// function jsonp(data) {
// 	console.log(data)
// }
// 封装JSONP 
function jsonp (url, jsonpCallback, success) {
	let script = document.createElement('script')
	script.src = url
	script.async = true
	script.type = 'text/javascript'
	window[jsonpCallback] = function (data) {
		success && success(data)
	}
	document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function (value) {
	console.log(value)
})

// CORS 
// Express 框架为例子
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  )
  next()
})

// document.domain
// 只能用于二级域名相同的情况下 a.test.com  b.test.com
document.domain = 'test.com'

// postMessage
// 用于获取嵌入页面中的第三方页面数据
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
	var origin = event.origin || event.originalEvent.origin
	if (origin === 'http://test.com') {
		console.log('验证通过')
	}
})

/*
存储
	cookie
		数据生命周期：一般由服务器生成，可以设置过期时间
		数据存储大小：4k
		与服务端通信：每次都会携带在header中，对于请求性能影响
	localStorage
		数据生命周期：除非清理，否者会一直存在
		数据存储大小：5M
		与服务端通信：不参与
	sessionStorage
		数据生命周期：页面关闭就清理
		数据存储大小：5M
		与服务端通信：不参与
	indexDB
		数据生命周期：除非清理，否者会一直存在
		数据存储大小：无限
		与服务端通信：不参与
	
	cookie属性
		value 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识
		http-only 不能通过JS访问Cookie,减少XSS攻击
		secure 只能在协议为HTTPS的请求中携带
		same-site 规定浏览器不能在跨域请求中携带Cookie,减少CSRF攻击
*/

/*
Service Worker
	Service Worker 是运行在浏览器背后的独立线程，一般可用来实现缓存功能
	使用Service Worker 传输协议必须为HTTPS
	因为Service Worker 中涉及到请求拦截，所以必须使用HTTPS协议来保障安全
*/
// 步骤实现
// index.js
if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register('sw.js')
		.then(function (registration) {
			console.log('service worker 注册成功')
		})
		.catch(function (err) {
			console.log('service worker 注册失败')
		})
}

// sw.js 
// 监听install事件，回调中缓存所需文件
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('my-cache')
			.then(function (cache) {
				return cache.addAll(['./index.html', './index.js'])
			})
	)
})
// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
	e.responseWith(
		caches.match(e.request)
			.then(function (response) {
				if (response) {
					return response
				}
				console.log('fetch source')
			})
	)
})