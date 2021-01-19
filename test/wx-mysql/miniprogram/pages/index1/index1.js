import { get } from '../../utils/request.js'
Page({
  data: {
    alpha: [1, 1, 1, 1, 1],
	cityName: '',
	datalist: []
  },
  onLoad: function () {
    var self = this;
    var _index = 0;
    var _alpha = self.data.alpha;
    var _speed = 500;
    var timer = setInterval(function () {
      var an_show = wx.createAnimation({});
      var an_hide = wx.createAnimation({});
      an_show.opacity(1).step({ duration: _speed });
      an_hide.opacity(0).step({ duration: _speed });
      _alpha[_index] = an_show;
      _alpha[_index == 0 ? 4 : _index - 1] = an_hide;
      self.setData({
        alpha: _alpha
      })
      _index = _index == 4 ? 0 : _index + 1;
    }, _speed);
	
	this.getData()
	
  },
  onShow: function () {
	   const cityName = wx.getStorageSync('cityName')
	   this.setData({
	  		  cityName: cityName || '定位中...'
	   })
	   console.log(cityName)
  },
  goToMappage () {
	  wx.navigateTo({
		  url: '/pages/mappage/mappage'
	  })
  },
  async getData () {
	  const data = await get('/index/index')
	  console.log(data)
  }
})