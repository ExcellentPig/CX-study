// 计算服务器消耗时长的中间件
module.exports = async (ctx, next) => {
	const start = Date.now()
	await next()
	const end = Date.now()
	const duration = end - start
	ctx.set('X-Response-Time', duration + 'ms')
}