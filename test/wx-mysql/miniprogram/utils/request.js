const host = 'http://localhost:5757/lm'
function request (url, method, data, header = {}) {
  // loading
  wx.showLoading({
    title: '加载中...'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json"
      },
      success (res) {
        // console.log(res,'request')
        wx.hideLoading()
        resolve(res.data) // 请求回数据的data
      },
      fail (error) {
        wx.hideLoading()
        reject(false)
      },
      complete () { // 完成之后
        wx.hideLoading()
      }
    })
  })
}
// 进一步封装 更加便利
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}