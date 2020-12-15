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
// 详情页-- 拿到分类商品的数据
router.get('/goods/goodsList', controllers.goods.index.goodsList)



// 收藏相关的接口---添加收藏 
router.post('/collect/addCollect', controllers.collect.index.addCollect)

// 订单相关的接口---购买、下单 向后端post数据
router.post('/order/submitAction', controllers.order.index.submitAction)
// 订单相关的接口---获取支付，地址等详细信息
router.get('/order/detailAction', controllers.order.index.detailAction)


// 购物车相关的接口---添加购物车
router.post('/cart/addCart', controllers.cart.index.addCart)
// 购物车相关的接口---获取购物车商品数据
router.get('/cart/cartList', controllers.cart.index.cartList)


// 地址相关的接口---获取地址列表
router.get('/address/getListAction', controllers.address.index.getListAction)
// 地址相关的接口---根据id获取地址信息
router.get('/address/detailAction', controllers.address.index.detailAction)
// 地址相关的接口---保存地址
router.post('/address/saveAction', controllers.address.index.saveAction)


// 分类相关接口---获取导航栏数据
router.get('/category/categpryNav', controllers.category.index.categpryNav)
// 分类相关接口---获取分类页面菜单的数据
router.get('/category/indexAction', controllers.category.index.indexAction)
// 分类相关接口---获取分类页面菜单对应的数据
router.get('/category/currentAction', controllers.category.index.currentAction)

// 专题相关接口---获取专题数据
router.get('/topic/listAction', controllers.topic.index.listAction)
// 专题相关接口---获取专题详情数据
router.get('/topic/detailAction', controllers.topic.index.detailAction)

module.exports = router