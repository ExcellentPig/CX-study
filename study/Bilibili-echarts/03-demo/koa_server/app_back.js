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