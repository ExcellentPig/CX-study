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

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听 监听客户端的连接
// 当某一个客户端连接成功之后 就会对这个客户端进行监听
webSocketService.listen()
