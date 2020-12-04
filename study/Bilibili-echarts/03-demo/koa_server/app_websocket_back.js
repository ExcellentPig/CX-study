// 服务器的入口文件

const Koa = require('koa')

const app = new Koa()

//1
const respDurationMiddleware = require('./middleware/koa_response_duration.js')
app.use(respDurationMiddleware)
//2
const respHeaderMiddleware = require('./middleware/koa_response_header.js')
app.use(respHeaderMiddleware)
//3
const respDataMiddleware = require('./middleware/koa_response_data.js')
app.use(respDataMiddleware)

app.listen(8888)

const WebSocket = require('ws')
// 创建WebSocket服务端对象， 绑定9998的端口号
const wss = new WebSocket.Server({
	port: 9998
})
// 对客户端的连接事件进行监听
// client 代表的是客户端的连接socket对象
wss.on('connection', client => {
	console.log('有客户端连接了..')
	// 对客户端的连接对象进行message事件的监听
	// msg 客户端发送给服务端的数据
	client.on('message', msg => {
		console.log('客户端的数据' + msg)
		// 由服务端往客户端发送数据
		client.send('hello socket form backend')
	})
})