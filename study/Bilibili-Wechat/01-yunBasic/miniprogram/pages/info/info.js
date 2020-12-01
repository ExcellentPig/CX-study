const db = wx.cloud.database()
const productsCollection = db.collection('products')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
	  // console.log(options)
	  productsCollection.doc(options.id).field({
		  color: true,
		  price: true,
		  title: true,
		  tags: true
	  }).get({
		 success: res => {
			 this.setData({
				 product: res.data,
				 id: options.id
			 })
		 }
	  })
  },
  addTag: function(event) {
	  productsCollection.doc(this.data.id).update({
		  data: {
			  tags: _.push(['tag10', 'tag20'])
		  }
	  }).then(res=> {
		  console.log(res)
	  })
  },
  deleteTag: function(event) {
	  // productsCollection.doc(this.data.id).update({
	  // 		  data: {
	  // 			  tags: _.shift()
	  // 		  }
	  // }).then(res=> {
	  // 		  console.log(res)
	  // })
	  productsCollection.doc(this.data.id).update({
	  		  data: {
	  			  tags: _.pop()
	  		  }
	  }).then(res=> {
	  		  console.log(res)
	  })
  },
  updatetag: function(event) {
	  productsCollection.doc(this.data.id).update({
		  data: {
			  title: 'update title'
		  }
	  }).then(res=>{
		  console.log(res)
	  })
  },
  batchUpdate: function(event) {
	  wx.cloud.callFunction({
		  name: 'batchData',
		  success: res=> {
			  console.log(res)
		  }
	  })
  },
  remove: function(event) {
	  productsCollection.doc(this.data.id).remove().then(res=> {
	  		  console.log(res)
	  })
  },
  batchDelete: function(event) {
	  wx.cloud.callFunction({
	  		  name: 'batchDelete'
	  }).then(res=>{
		  console.log(res)
	  })
  }
})