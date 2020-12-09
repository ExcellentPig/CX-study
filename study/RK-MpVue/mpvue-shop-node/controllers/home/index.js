const { mysql } = require('../../mysql')

module.exports = async (ctx) => {
	// 抛出 轮播图数据
	const banner = await mysql('nideshop_ad').where({
		ad_position_id: 1
	}).select()
	
	// tabel 类型数据  channel
	const channel = await mysql('nideshop_channel').select()
	
	// 首页 brand数据
	const brandList = await mysql('nideshop_brand').where({
		is_new: 1  // 暂时 最新的产品  根据new_sort_order正序排序 限制4条
	}).orderBy('new_sort_order', 'asc').limit(4).select()
	
	// 新品首发数据
	const newGoods = await mysql('nideshop_goods')
							.whereIn('id', [1181000, 1135002, 1134030, 1134032]) // 拿到id为数组的值
							.andWhere('is_new', 1) // 并且is_new 为1
							.select()
	
	// 人气推荐
	const hotGoods = await mysql('nideshop_goods')
							.column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief') // 拿到指定字段
							.where({
								is_hot: 1 // 再次筛选
							})
							.limit(5)
							.select()
	
	ctx.body = {
		'banner': banner,
		'channel': channel,
		'brandList': brandList,
		'newGoods': newGoods,
		'hotGoods': hotGoods
	}
}

