// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const productsCollection = db.collection('products')

// 云函数入口函数
exports.main = async (event, context) => {
	return await productsCollection.add({
		data: {
			title: "Product 3",
			image: "http://temp.im/100x100",
			tags: ['tag5', 'tag6'],
			price: 500.23,
			color: 'pink'
		}
	})
}