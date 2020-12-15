const { mysql } = require('../../mysql')


// 获取收货地址列表
async function getListAction (ctx) {
	const openId = ctx.query.openId
	const addressList = await mysql('nideshop_address')
							.where({
								'user_id': openId
							})
							.orderBy('is_default', 'desc')
							.select()
	ctx.body = {
		data: addressList
	}
}

//根据id获取地址信息
async function detailAction (ctx) {
	const id = ctx.query.id
	const detailData = await mysql('nideshop_address')
							.where({
								'id': id
							})
							.select()
	ctx.body = {
		data: detailData[0]
	}
}

// 添加或者更新收货地址 
async function saveAction (ctx) {
	const addressId = ctx.request.body.addressId
	const { userName, telNumber, address, detailaddress, checked, openId } = ctx.request.body 
	
	// console.log(checked, openId)
	
	// 如果是默认选中 现在数据库中查询 是否是默认地址  默认地址只能有一条
	if (checked) {
		const isDefault = await mysql('nideshop_address')
								.where({
									'user_id': openId,
									'is_default': 1
								}).select()
		// console.log(isDefault.length)
		if (isDefault.length > 0) { // 能找到 并且is_default': 1 注意需要是大于0 如果是大于1 就是可以允许有两个默认地址了 是不允许的
			// 更新表 
			await mysql('nideshop_address')
					.where({
						'user_id': openId, // 需要找到对应ID
						'is_default': 1
					})
					.update({
						'is_default': 0 // 将是数据库中原先是1的 更新为0(非默认)
					})
		}
	}
	if (!addressId) { // 当前不是点击编辑按钮 编辑按钮会有addressId
		// 添加地址
		// console.log(checked)
		const data = await mysql('nideshop_address')
							.insert({
								'name': userName,
								'mobile': telNumber,
								'address': address,
								'address_detail': detailaddress,
								'user_id': openId,
								'is_default': checked == 'true' || checked ? 1 : 0
							})
		if (data) { // 已经添加
			ctx.body = {
				data: true
			}
		} else {
			ctx.body = {
				data: false
			}
		}
	} else {
		// 更新地址
		const data = await mysql('nideshop_address')
							.where({
								'id': addressId
							})
							.update({
								'name': userName,
								'mobile': telNumber,
								'address': address,
								'address_detail': detailaddress,
								'user_id': openId,
								'is_default': checked == 'true' || checked ? 1 : 0
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

module.exports = {
	getListAction,
	detailAction,
	saveAction
}