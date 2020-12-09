const router = require('koa-router')({
	prefix: '/lm'  //加路由前缀
}) // i

const controllers = require('../controllers')

// const router = new Router()  // 像上面那样做了就不需要 new了
// router.get('/index/index', (ctx, next) => {
// 	// ctx.body = 'hello koa'
// 	// 从数据库获取数据返回给前端
// })

// 首页相关的接口
router.get('/index/index', controllers.home.index)

// 搜索相关的接口---添加历史搜索
router.post('/search/addhistoryaction', controllers.search.index.addHistoryAction)

// 搜索相关的接口---获取热门和历史搜索数据
router.get('/search/indexaction', controllers.search.index.indexAction)

module.exports = router