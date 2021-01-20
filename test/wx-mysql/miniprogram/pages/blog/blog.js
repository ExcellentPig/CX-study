let keyword = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})