const db = wx.cloud.database()
const productsCollection = db.collection('products')
const _ = db.command
Page({
  data: {
	  count: 'count'
  },
  simple: function(event) {
	  productsCollection.get().then(res => {
		  this.setData({
			  products: res.data
		  })
	  })
  },
  red: function(event) {
	  productsCollection.where({
		  color: 'red'
	  }).get().then(res => {
	  		  this.setData({
	  			  products: res.data
	  		  })
	  })
  },
  lessThan: function(event) {
	  productsCollection.where({
	  		price: _.lt(100)
	  }).get().then(res => {
	  		  this.setData({
	  			  products: res.data
	  		  })
	  })
  },
  range: function(event) {
  	  productsCollection.where({
  	  		price: _.in([40,50,60])
  	  }).get().then(res => {
  	  		  this.setData({
  	  			  products: res.data
  	  		  })
  	  })
   },
   range20: function(event) {
	   productsCollection.where({
	   		price: _.gt(20).and(_.lt(110))
	   }).get().then(res => {
	   		  this.setData({
	   			  products: res.data
	   		  })
	   })
   },
   limit: function(event) {
	   productsCollection.limit(5).get().then(res => {
	   		  this.setData({
	   			  products: res.data
	   		  })
	   })
   },
   orderBy: function(event) {
	   productsCollection
	   .orderBy('price', 'asc') // 继续添加orderBy 可以进行多条件排序
	   .get().then(res => {
	   		  this.setData({
	   			  products: res.data
				  
	   		  })
	   })
   },
   count: function(event) {
	   productsCollection.where({
		   price: 50
	   }).count().then(res =>{
		   this.setData({
			   count: res.total
		   })
	   })
   }
})