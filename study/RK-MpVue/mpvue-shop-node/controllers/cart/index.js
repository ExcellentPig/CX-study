const { mysql } = require('../../mysql')

async function addCart (ctx) {
	// 添加到购物车
	const { openId, goodsId, number } = ctx.request.body
	// 当前的商品 是否已经加入购物车 如果已经加入就累加数量就行 没有就完全添加
	const haveGoods = await mysql('nideshop_cart')
							.where({
								'user_id': openId,
								'goods_id': goodsId
							})
							.select()
	if (haveGoods.length === 0) { // 没有存在
		const goods = await mysql('nideshop_goods')
							.where({
								'id': goodsId // 去商品表中查找
							})
							.select()
		console.log(goods)
		// 如果goods不存在
		const { retail_price, name, list_pic_url } = goods[0]
		await mysql('nideshop_cart').insert({
			'user_id': openId,
			'goods_id': goodsId,
			number, // 添加一个字段
			'goods_name': name,
			retail_price, // 添加一个字段
			list_pic_url // 添加一个字段
		})
	} else {
		const oldNumber = await mysql('nideshop_cart')
								.where({
									'user_id': openId,
									'goods_id': goodsId
								})
								.column('number') 
								.select() // 取出number
		// 更新数据
		await mysql('nideshop_cart')
			.where({
				'user_id': openId,
				'goods_id': goodsId
			})
			.update({
				'number': oldNumber[0].number + number
			})
	}
	ctx.body = {
		data: 'success'
	}
}

module.exports = {
	addCart
}