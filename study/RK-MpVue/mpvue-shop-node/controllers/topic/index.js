const { mysql } = require('../../mysql')

// 获取专题列表数据
async function listAction (ctx) {
	let page = ctx.query.page || 1 //页数
	const size = 5 // 条数
	// 分页处理
	const data = await mysql('nideshop_topic')
						.column('id', 'title', 'price_info', 'subtitle', 'scene_pic_url')
						.limit(size)
						.offset((page-1) * size) // 每页数据
	const data1 = await mysql('nideshop_topic')
						.column('id', 'title', 'price_info', 'subtitle', 'scene_pic_url')
						.select()
	const total = parseInt(data1.length / 5) // 总页数
	ctx.body = {
		'page': page,
		'total': total,
		'data': data
	}
}

// 获取商品详情信息
async function detailAction (ctx) {
	const id = ctx.query.id
	// console.log(id)
	let data = []
	if (id) {
		data = await mysql('nideshop_topic')
					.where({
						'id': id
					})
					.select()
	}
	const recommendList = await mysql('nideshop_topic')
							.column('id', 'title', 'price_info', 'subtitle', 'scene_pic_url')
							.limit(4)
							.select()
	ctx.body = {
		'data': data[0],
		'recommendList': recommendList,
	}
}

module.exports = {
	listAction,
	detailAction
}