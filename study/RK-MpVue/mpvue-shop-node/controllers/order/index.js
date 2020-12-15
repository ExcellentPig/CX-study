const { mysql } = require('../../mysql')

//购买、下单 向后端post数据
async function submitAction (ctx) {
	const { openId } = ctx.request.body
	// 其他写法获取post 参数
	let goodsId = ctx.request.body.goodsId
	let allPrice = ctx.request.body.allPrice
	
	// 是否存在订单
	const isOrder = await mysql('nideshop_order')
							.where({
								'user_id': openId,
							}).select()
	// console.log(isOrder)
	if (isOrder.length > 0) { // 存在订单
		// 更新订单
		const data = await mysql('nideshop_order')
							.where({
								'user_id': openId
							}).update({ // 更新数据库
								'user_id': openId,
								'goods_id': goodsId,
								'allprice': allPrice // 数据库字段一般没驼峰
							})
		if (data) {
			ctx.body = {
				data: true
			}
		} else {
			ctx.body = {
				data: false
			}
		}
	} else {  // 订单不存在
		const data = await mysql('nideshop_order')
							.insert({ // 插入数据库
 								'user_id': openId,
								'goods_id': goodsId,
								'allprice': allPrice
							})
		if (data) {
			ctx.body = {
				data: true
			}
		} else {
			ctx.body = {
				data: false
			}
		}
	}
}

// 获取支付，地址等详细信息
async function detailAction (ctx) {
	const openId = ctx.query.openId
	const addressId = ctx.query.addressId || '' // 前端没有 就初始化为空
	const orderDetail= await mysql('nideshop_order')
							.where({
								'user_id': openId
							}).select()
	// console.log(orderDetail[0])
	var goodsIds = orderDetail[0].goods_id.split(',') // 拿到goodsid 这里可以拿到多个id的
	// console.log(goodsIds)
	const list = await mysql('nideshop_cart')
						.andWhere({ // 关联字段
							'user_id': openId
						})
						.whereIn('goods_id', goodsIds)
						.select()
	// console.log(list)
	// 收货地址
	var addressList
	// console.log(addressId)
	if (addressId) { // 前端传了addressId
		addressList = await mysql('nideshop_address')
							.where({
								'user_id': openId,
								'id': addressId  // 需要对应的地址ID
							})
							.orderBy('is_default', 'desc')
							.select()
	} else { // 前端没传addressId  注意 这里如果手动删除了数据库里的数据 吧addressId对应的数据删除了 就会走这个条件 从而用openId 是有问题的
		addressList = await mysql('nideshop_address')
							.where({
								'user_id': openId // 没传就不需要地址ID
							})
							.orderBy('is_default', 'desc')
							.select()
	}
	// console.log(addressList)
	ctx.body = {
		price: orderDetail[0].allprice, // 这只是单价
		goodsList: list,
		address: addressList[0] || {}
	}
}


module.exports = {
	submitAction,
	detailAction
}