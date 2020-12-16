const http = require('http')
const io = require('socket.io')

//1、创建http服务
let httpServer = http.createServer()
httpServer.listen(4000)

// //2、创建websocket服务
let wsServer = io.listen(httpServer) // 监听http服务

wsServer.on('connection', function (sock) {
	sock.on('a', function (num1, num2) { // 服务器接收
		console.log('接到了浏览器发送过来的数据', num1, num2)
	})
})