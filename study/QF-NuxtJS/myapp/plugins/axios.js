// 拦截器

export default ({ $axios, redirect, route, store }) => {
  // 基本配置
  $axios.defaults.timeout = 10000;

  //请求时拦截
  $axios.onRequest(config => {
    console.log('发送请求时的拦截')
    // config.header.token = '加token'
	config.headers.token = store.state.user.token
    return config
  })

  //响应拦截
  $axios.onResponse(res => {
    console.log('响应时的拦截')
    // if (res.data.err === 2 && route.fullPath !== '/login') {
    //   redirect('/login?path=' + route.fullPath)
    // }
    return res
  })


  //错误处理
  $axios.onError(error => {
    // 处理
    return error;
  })
}
