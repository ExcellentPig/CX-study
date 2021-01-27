// components/toTop/toTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	  floorstatus: {
		  type: Boolean,
		  value: true
	  },
	  className: {
		  type: String,
		  value: 'search'
	  }
  },

  /**
   * 组件的初始数据
   */
  data: {
	  imgUrl: '/images/top.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
	    goTop: function (e) { // 一键回到顶部
	      if (wx.pageScrollTo) {
	        wx.pageScrollTo({
	          scrollTop: 0
	        })
	      } else {
	        wx.showModal({
	          title: '提示',
	          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
	        })
	      }
	    },
		onSearch (e) {
			// console.log(e.detail)
			this.triggerEvent('searchHandler', e.detail)
		}
  }
})
