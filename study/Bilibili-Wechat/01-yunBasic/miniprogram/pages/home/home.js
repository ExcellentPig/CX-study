Page({
	navigateToAdd: function (event) {
		wx.navigateTo({
			url: '../add/add'
		})
	},
	navigateToIndex: function (event) {
		wx.navigateTo({
			url: '../index1/index1'
		})
	},
	navigateToComplex: function (event) {
		wx.navigateTo({
			url: '../complex/complex'
		})
	}
})