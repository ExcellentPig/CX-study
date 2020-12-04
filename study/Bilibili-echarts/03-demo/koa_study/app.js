const Koa = require('koa')
const app = new Koa()

// ctx 上下文 web容器  ctx.request  ctx.response
// next 下一个中间件是否能够执行 取决于next这个函数有没有被调用
app.use((ctx, next) => {
	// console.log(ctx.request.url)
	console.log('1.....1')
	ctx.response.body = 'hello world'
	next()
	console.log('1.....2')
})

// 第二层中间件
// app.use((ctx, next) => {
// 	console.log('2.....1')
// 	next()
// 	console.log('2.....2')
// })

app.use(async (ctx, next) => {
	console.log('2.....1')
	const ret = await next()
	console.log(ret)
	console.log('2.....2')
})

// 第三层中间件
app.use((ctx, next) => {
	console.log(3)
	return '返回第二层'
})

app.listen(3000)