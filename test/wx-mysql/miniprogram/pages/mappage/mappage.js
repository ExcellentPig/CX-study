import amapFile from '../../utils/amap-wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  tips: [],
	  longitude: 0,
	  latitude: 0,
	  markers: [],
	  pois: [],
	  zIndex: -99
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let cityName = wx.getStorageSync('cityName')
	  wx.setStorageSync('cityName', cityName)
	  // console.log(amapFile)
	  console.log(this.data.tips)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  this.getMapaddress()
  },
  backPage () {
	  wx.navigateBack({
		  delta: 1
	  })
  },
  onSearch (e) {
	  // console.log(e.detail)
	  // let keywords = e.detail
	  // var myAmapFunc = new amapFile.AMapWX({
	  //   key:'5d96e687e8f74c23a2335d70be795968'
	  // })
	  // myAmapFunc.getInputtips({ // 搜索补全 地图 内容输入提示词
	  //   keywords: keywords,
	  //   location: '',
	  //   success: (data) =>  {
	  //     console.log(data)
	  //     if (data && data.tips) {
			// this.setData({
			// 	tips: data.tips,
			// 	zIndex: 99
			// })
	  //     }
	  //   }
	  // })
	  
	  let timer = null
	  if (timer) {
		  clearTimeout(timer)
	  }
	  timer = setTimeout(() => {
		  let keywords = e.detail
		  if (keywords == '' || !keywords || keywords == null || keywords == undefined) {
			  this.setData({
				tips: []
			  })
		  }
		  var myAmapFunc = new amapFile.AMapWX({
		    key:'5d96e687e8f74c23a2335d70be795968'
		  })
		  myAmapFunc.getInputtips({ // 搜索补全 地图 内容输入提示词
		    keywords: keywords,
		    location: '',
		    success: (data) =>  {
		      console.log(data)
		      if (data && data.tips) {
		  			this.setData({
		  				tips: data.tips,
		  				zIndex: 99
		  			})
		      }
		    }
		  })
	  }, 300)
  },
  onCancel () {
	  // console.log('cancel')
	  // wx.navigateBack({
	  // 		  delta: 1
	  // })
	  if (this.data.zIndex === 99) {
		  this.setData({
		  	zIndex: -99
		  })
	  } else {
		 wx.navigateBack({
		 		  delta: 1
		 }) 
	  }
  },
  modifyName (e) {
	  console.log(e.currentTarget.dataset.name)
	  let cityName = e.currentTarget.dataset.name
	  wx.setStorageSync('cityName', cityName)
	  wx.navigateBack({
	  		  delta: 1
	  })
  },
  getMapaddress () {
    var myAmapFunc = new amapFile.AMapWX({
      key:'5d96e687e8f74c23a2335d70be795968'
    })
    myAmapFunc.getRegeo({
      // 尝试之后 发现 需要iconPathSelected 然后后面也要传入marker之中
      iconPathSelected: "/static/marker.png",
      iconPath: "/static/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: (data) => {
        console.log(data)
		console.log(data[0].longitude)
        let marker = [
          {
            id: data[0].id,
            longitude: data[0].longitude,
            latitude: data[0].latitude,
            width: data[0].width,
            height: data[0].height,
            iconPath: data[0].iconPath,
          }
        ]
		this.setData({
			markers: marker,
			longitude: data[0].longitude,
			latitude: data[0].latitude,
			pois: data[0].regeocodeData.pois
		})
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  moveTolocation (e) {
	  this.getMapaddress()
	// const mpCtx = wx.createMapContext("map");
	// mpCtx.moveToLocation();
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