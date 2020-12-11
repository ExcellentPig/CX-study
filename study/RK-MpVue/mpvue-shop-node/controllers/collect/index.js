const { mysql } = require('../../mysql')

// 添加收藏
async function addCollect (ctx) {
	const { openId, goodsId } = ctx.request.body
	// console.log(openId, goodsId)
	// 判断是否已经收藏
	const iscollect = await mysql('nideshop_collect')
						.where({ // 匹配满足条件的数据
							'user_id': openId,
							'value_id': goodsId
						}).select()
	if (iscollect.length === 0) { // 没收藏就添加到表格
		await mysql('nideshop_collect').insert({ // 插入到表格
			'user_id': openId,
			'value_id': goodsId
		})
		ctx.body = {
			data: 'add success'
		}
	} else { // 已经收藏的 就移除
		await mysql('nideshop_collect').where({ 
			'user_id': openId,
			'value_id': goodsId
		}).del() // 也就是取消收藏
		ctx.body = {
			data: 'del success'
		}
	}
}

module.exports = {
	addCollect
}