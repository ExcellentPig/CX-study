const { mysql } = require('../../mysql')

// 商品详情页 根据id 获取数据
async function detailAction (ctx) {
	const goodsId = ctx.query.id
	const openId = ctx.query.openId
	// 查询信息
	const info = await mysql('nideshop_goods')
						.where({
							'id': goodsId
						})
						.select()
	// 获取商品的图片
	// 这两个表格 是关联表 通过goodsId查找数据
	const gallery = await mysql('nideshop_goods_gallery')
							.where({
								'goods_id': goodsId
							})
							.select()
	
	// 获取产品规格数据
	// 关联查询两张表 leftJoin
	const attribute = await mysql('nideshop_goods_attribute')
							.column('nideshop_goods_attribute.value', 'nideshop_attribute.name') // 两张表
							.leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id', 'nideshop_attribute.id') // 把两张表关联起来
							.where({
								'nideshop_goods_attribute.goods_id': goodsId
							})
							.select()
	
	// 常见问题的数据获取
	const issueList = await mysql('nideshop_goods_issue').select()
	
	// 大家都在看商品列表
	const productList = await mysql('nideshop_goods')
								.where({ // 取出和当前商品的category_id 有关联的商品 info里面有category_id
									'category_id': info[0].category_id
								})
								.select()
	
							
	ctx.body = { // 输出到前端
		'info': info[0] || [], // 拿到第一个数据 以防万一 出现过个 前端也方便处理
		'gallery': gallery,
		'attribute': attribute,
		'issueList': issueList,
		'productList': productList
	}
}

module.exports =  {
	detailAction
}