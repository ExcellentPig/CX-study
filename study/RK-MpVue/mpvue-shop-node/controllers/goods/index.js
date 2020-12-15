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
	
	
	// 判断是否收藏过
	const iscollect = await mysql('nideshop_collect')
							.where({
								'user_id': openId,
								'value_id': goodsId
							})
							.select()
	let collected = false 
	if (iscollect.length > 0) {
		collected = true
	}
	
	// 购物车的数量 判断该用户的购物车里是否含有此商品
	const oldNumber = await mysql('nideshop_cart')
							.where({
								'user_id': openId // 查询对应openId的数据
							})
							.column('number').select()
	// console.log(oldNumber)
	let allnumber = 0
	if (oldNumber.length > 0) {
		for (let i=0; i<oldNumber.length; i++) {
			const element = oldNumber[i]
			allnumber += element.number // 已经有了 就将数量加一
		}
	}
	ctx.body = { // 输出到前端
		'info': info[0] || [], // 拿到第一个数据 以防万一 出现过个 前端也方便处理
		'gallery': gallery,
		'attribute': attribute,
		'issueList': issueList,
		'productList': productList,
		'collected': collected,
		'allnumber': allnumber
	}
}

// 对应分类的商品列表
async function goodsList (ctx) {
	const categoryId = ctx.query.categoryId
	// console.log(categoryId)
	let goodsList = []
	if (categoryId) {
		goodsList = await mysql('nideshop_goods')
						.where({
							'category_id': categoryId
						})
						.select()
		const currentNav = await mysql('nideshop_category')
								.where({
									'id': categoryId
								}).select()
		if (goodsList.length == 0) { // 没有取到商品
			// 找到之先关的子类，在找到与子类相关的商品
			let subIds = await mysql('nideshop_category')
								.where({
									'parent_id': categoryId
								})
								.column('id')
								.select()
			if (subIds !== 0) { // 在子类中嫩能够拿到
				subIds = subIds.map(item => {
					return item.id
				})
			}
			goodsList = await mysql('nideshop_goods')
							.whereIn('category_id', subIds)
							.limit(50)
							.select()
		}
		ctx.body = {
			data: goodsList,
			currentNav: currentNav[0]
		}
	}
}

module.exports =  {
	detailAction,
	goodsList
}