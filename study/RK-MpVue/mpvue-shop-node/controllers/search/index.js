const { mysql } = require('../../mysql')
// 添加搜索历史
async function addHistoryAction (ctx) {
	// console.log(ctx.request.body)
	const { openId, keyword } = ctx.request.body // 拿到前端输入的数据  这里是post请求 然后通过{} 传递参数 需要用ctx.request.body 同时需要引入bodyParser 来处理 否则拿不到数据
	// console.log(openId, keyword, 'aaaa')
	const oldData = await mysql('nideshop_search_history')
							.where({ // 和数据库中对比 有就不需要再加入了
								'user_id': openId,
								'keyword': keyword
							})
	if (oldData.length === 0) { // 没有找到 就存入
		const data = await mysql('nideshop_search_history')
							.insert({
								'user_id': openId,
								'keyword': keyword,
								'add_time': parseInt(new Date().getTime() / 1000)
							})
		if (data) { // 插入成功
			ctx.body = {
				data: 'success'
			}
		} else { // 插入失败
			ctx.body = {
				data: 'fail'
			}
		}
	} else { // 找到了 就直接输出
		ctx.body = {
			data: '已存在的记录'
		}
	}
}

// 获取搜索历史 热门和输入的数据
async function indexAction (ctx) {
	const openId = ctx.query.openId  // query 是获取路由后面的数据 所以需要用query
	// console.log(openId, 1111)
	// 默认关键字
	const defaultKeyword = await mysql('nideshop_keywords')
							.where({
								'is_default': 1 // 为1 是当前的热门搜索数据
							})
							.limit(1)
							.select()
	// 热门关键字
	const hotKeywordList = await mysql('nideshop_keywords')
									.distinct('keyword') // 取出不同
									.column('keyword', 'is_hot') // 分组
									.limit(10)
									.select()
	// 搜索历史的数据
	const historyData = await mysql('nideshop_search_history')
								.where({
									'user_id': openId, // 需要匹配openid 查询对用的数据
								})
								.orderBy('add_time', 'desc') // 倒叙
								.limit(10) // 限制10条
								.select()
	// console.log(defaultKeyword)
	ctx.body = {
		'defaultKeyword': defaultKeyword[0], // 这里 我们只拿第一个数据
		'hotKeywordList': hotKeywordList,
		'historyData': historyData
	}
}

// 清除对应openid 的历史记录
async function clearHistoryAction (ctx) {
	const openId = ctx.request.body.openId
	// console.log(openId)
	const data = await mysql('nideshop_search_history')
						.where({
							'user_id': openId  //判断 openid 是否对应
						})
						.del() // 删除操作
	// console.log(data) // 返回的是删除的条数
	if (data) {
		ctx.body = {
			'data': '清除成功'
		}
	} else {
		ctx.body = {
			'data': null
		}
	}
}

// 根据对应输入的内容 进行实时搜索提示 同时获取商品数据
async function helperAction (ctx) {
	const keyword = ctx.query.keyword
	var order = ctx.query.order
	// console.log(keyword)
	// 正常应该在这里放入防抖 防止接口过度请求 减少请求 优化性能
	if (!order) { // 如果前端规定了排序就用前端的规定
		order = ''
		orderBy = 'id'
	} else { // 没规定 就后端自定义排序
		orderBy = 'retail_price'
	}
	const keywords = await mysql('nideshop_goods')
						.orderBy(orderBy, order)
						.column('id', 'name', 'list_pic_url', 'retail_price') // 拿到对应字段的数据
						.where('name', 'like', '%' + keyword + '%') // name字段 是否存在 ..(%)加keyword加..(%) 的数据
						.limit(10)
						.select()
	if (keywords) {
		ctx.body = {
			keywords
		}
	} else {
		ctx.body = {
			keywords: []
		}
	}
}

module.exports = {
	addHistoryAction,
	indexAction,
	clearHistoryAction,
	helperAction
}