const db = wx.cloud.database()
const productsCollection = db.collection('products')

Page({
	addData: function (event) {
		// console.log(event)
		// productsCollection.add({
		// 	data: {
		// 		title: "Product 1",
		// 		image: "http://temp.im/100x100",
		// 		tags: ['tag1', 'tag2'],
		// 		price: 100.12,
		// 		color: 'red'
		// 	},
		// 	success: res=> {
		// 		console.log(res)
		// 	}
		// })
		// productsCollection.add({
		// 	data: {
		// 		title: "Product 2",
		// 		image: "http://temp.im/100x100",
		// 		tags: ['tag3', 'tag4'],
		// 		price: 50,
		// 		color: 'yellow'
		// 	}
		// }).then(res => {
		// 	console.log(res)
		// })
		// 以上 我们通过云函数来实现
		
		wx.cloud.callFunction({
			name: 'addData'
		}).then(res => {
			console.log(res)
		})
		
	}
})