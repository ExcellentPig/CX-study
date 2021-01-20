// pages/loading1/loading1.js
let timer = null
let timer1 = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  second: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  timer = setTimeout(() => {
		  wx.switchTab({
			  url: '/pages/index/index'
		  })
	  }, 7000)
	  this.back()
  },
  back () {
	  timer1 = setInterval(() => {
		  let a = this.data.second - 1
		  this.setData({
			  second: a
		  })
		  if (a < 0) {
			  this.setData({
				second: 0
			  })
		  }
	  }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
	  clearTimeout(timer)
	  timer = null
	  clearInterval(timer11)
	  timer1 = null
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
	  console.log('loading timer',timer)
	  clearTimeout(timer)
	  timer = null
	  console.log('loading timer',timer)
	  console.log('loading timer1',timer1)
	  clearInterval(timer1)
	  timer1 = null
	  console.log('loading timer1',timer1)
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