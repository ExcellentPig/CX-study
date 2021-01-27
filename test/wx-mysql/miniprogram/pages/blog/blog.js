let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  floorstatus: true,
	  className: 'search1',
	  webUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this._loadBlogList()
	  console.log(1)
  },
  
  _loadBlogList (start = 0) {
	wx.cloud.callFunction({
		name: 'blog1',
		data: {
			keyword,
			start,
			count: 10,
			$url: 'list'
		}
	}).then(res => {
		console.log(res)
	})
  },
  
  searchHandler(e) {
	  console.log(e.detail)
  },
  scancode () {
	console.log(1)
	wx.scanCode({
	  success(res) {
		  //console.log('111',res)
		 wx.showModal({
		   title: '提示',
		   content: '扫描成功,但是微信小程序暂不支持个人类型小程序开启此功能',
		   success (res) {
		     if (res.confirm) {
		       console.log('用户点击确定')
		     } else if (res.cancel) {
		       console.log('用户点击取消')
		     }
		   }
		 })

	  }
	})  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  console.log(2)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  console.log(3)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll (e) {
  	// console.log(e, 1111)  
	if (e.scrollTop > 100) {
	      this.setData({
	        floorstatus: false
	      });
	    } else {
	      this.setData({
	        floorstatus: true
	      });
	}
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})