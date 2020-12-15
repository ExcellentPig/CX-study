const { mysql } = require('../../mysql')

// 获取分类列表  导航栏
async function categpryNav (ctx) {
	const categoryId  = ctx.query.id
	// console.log(categoryId)
	// 获取分类
	const currentNav = await mysql('nideshop_category')
						.where({
							'id': categoryId
						})
						.select()
	// 获取它的同类
	const navData = await mysql('nideshop_category')
						.where({
							'parent_id': currentNav[0].parent_id  // 'parent_id': 0 对应的就是导航栏的数据
						})
						.select()
	ctx.body = {
		navData,
		currentNav: currentNav[0]
	}
}

//获取 分类页面菜单的数据
async function indexAction (ctx) {
	const { id: categoryId } = ctx.query // 在这里其实前端没有传
	const data = await mysql('nideshop_category')
						.where({ // 菜单数据
							'parent_id': 0
						}).select()
	const currentCategory = []
	if (categoryId) {
		currentCategory = await mysql('nideshop_category')
								.where({
									'parent_id': categoryId
								}).select()
	}
	ctx.body = {
		'categoryList': data
	}
}

//获取 分类页面菜单对应的数据
async function currentAction (ctx) {
	const { id: categoryId } = ctx.query
	const data = {}
	const currentOne = await mysql('nideshop_category')
							.where({
								'id': categoryId
							}).select()
	const subList = await mysql('nideshop_category') // 找到对应数据
							.where({
								'parent_id': currentOne[0].id
							}).select()
	data.currentOne = currentOne[0]
	data.currentOne.subList = subList
	ctx.body = {
		'data': data
	}
}

module.exports = {
	categpryNav,
	indexAction,
	currentAction
}