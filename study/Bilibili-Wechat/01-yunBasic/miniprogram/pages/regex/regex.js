const db = wx.cloud.database()
const emailCollection = db.collection('email')
Page({
  data: {

  },
  onLoad: function (options) {
	emailCollection.count().then(res=>{
		console.log(res.total)
	})
	emailCollection.get().then(res=>{
		console.log(res.data)
	})
	emailCollection.where({
		address: db.RegExp({
			regexp: "foxmail"
		})
	}).get().then(res=>{
		console.log(res.data)
	})
	emailCollection.where({
		address: /gmail/i
	}).get().then(res=>{
		console.log(res.data)
	})
  },
})