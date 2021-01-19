// components/testComponent/test.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
	  cityName: '这是一个组件'
  },
  // attached: function () {
	 //  const cityName = wx.getStorageSync('cityName')
	 //  this.setData({
		//   cityName: cityName || ''
	 //  })
	 //  console.log(cityName)
  // },
  

  /**
   * 组件的方法列表
   */
  methods: {
	  goToMappage () {
		  console.log(1)
		  wx.navigateTo({
			  url: '/pages/mappage/mappage'
		  })
	  }
  }
})
