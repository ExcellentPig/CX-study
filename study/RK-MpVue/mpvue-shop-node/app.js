const Koa = require('koa') // i
const config = require('./config')
const router = require('./routes')

const bodyParser = require('koa-bodyparser') // post 请求需要添加

const app = new Koa()


app.use(bodyParser())

app.use(router.routes())

app.listen(config.port, () => {
	console.log(`server is started at port ${config.port}`)
})