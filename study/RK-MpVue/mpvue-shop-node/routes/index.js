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

// 搜索相关的接口---清除对应openid的历史记录
router.post('/search/clearHistoryAction', controllers.search.index.clearHistoryAction)

// 搜索相关的接口---进行实时搜索提示 同时获取商品数据
router.get('/search/helperAction', controllers.search.index.helperAction)


// 详情页-- 拿到对应id的商品数据
router.get('/goods/detailAction', controllers.goods.index.detailAction)


// 收藏相关的接口---添加收藏 
router.post('/collect/addCollect', controllers.collect.index.addCollect)

// 订单相关的接口---购买
router.post('/order/submitAction', controllers.order.index.submitAction)
// 订单相关的接口---获取支付，地址等详细信息
router.get('/order/detailAction', controllers.order.index.detailAction)

// 购物车相关的接口---添加购物车
router.post('/cart/addCart', controllers.cart.index.addCart)

// 地址相关的接口---获取地址列表
router.get('/address/getListAction', controllers.address.index.getListAction)

// 地址相关的接口---根据id获取地址信息
router.get('/address/detailAction', controllers.address.index.detailAction)

module.exports = router