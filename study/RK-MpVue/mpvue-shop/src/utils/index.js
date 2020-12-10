function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) { // 格式化时间
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 请求的封装
const host = 'http://localhost:5757/lm' // 接口前缀
export { host };

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

export function getOpenId() {
  wx.login({ // 这个方法可以拿到openid
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        // console.log(res)
        // console.log(code);
        var appId = 'wx47e3d301cb86fab1';
        var secret = 'c0a71f643dadc4612f516c3961e48f42';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            // console.log(res)
            let openid = res.data.openid //返回openid
            wx.setStorageSync('OPENID', openid)  //这里需要使用异步方法
            // console.log('openid为' + openid);
          }
        })
      }
  })
  wx.getSetting({ // 查看是否授权
    success(res) {
      if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function (res) {
            // console.log(res.userInfo)
            let userInfo = res.userInfo
            wx.setStorageSync('USERINFO', userInfo)
          }
        })
      }
    }
  })
}

export default {
  formatNumber,
  formatTime
}
