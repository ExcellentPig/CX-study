export default ({ store, route, redirect, params, query, req, res }) => {
  // context 服务端上下文
  // 全局守卫业务
  console.log('middleware nuxt.config.js outside')

  // store状态树信息
  // route 一条目标路由信息
  //redirect 路由的强制跳转
  // params query 校验参数的合理性
  // console.log('全局守卫前置守卫')
  // redirect('/login')
}
