const db = wx.cloud.database()
const productsCollection = db.collection('products')
const _ = db.command
Page({
	data: {
		products: [],
		page: 0
	},
	onLoad: function(options) {
		productsCollection.get().then(res => {
			// console.log(res)
			this.setData({
				products: res.data
			})
		})
	},
	onPullDownRefresh: function() {
		productsCollection.get().then(res => {
			this.setData({
				products: res.data
			}, res => {
				console.log('刷新完成')
				wx.stopPullDownRefresh()
			})
		})
	},
	onReachBottom: function() {
		// console.log('bottom')
		let page = this.data.page + 20
		productsCollection.skip(page).get().then(res => {
			// console.log(res)
			let new_data = res.data
			let old_data = this.data.products
			this.setData({
				products: old_data.concat(new_data),
				page: page
			}, res => {
				console.log(res)
			})
		})
	},
	click: function(event) {
		console.log(event)
		productsCollection.doc(event.currentTarget.dataset.id).update({
			data: {
				price: _.inc(1)
			}
		})
	}
})
