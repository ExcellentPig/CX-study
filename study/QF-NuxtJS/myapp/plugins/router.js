/* 插件全局守卫 */
export default ({ app, redirect, params, query, store }) => {
  console.log('插件')
  // app == vue实例
  // redirect 跳转函数
  app.router.beforeEach((to, from, next) => {
    // 全局前置守卫 -- 插件
    // next(true)/false  next('/login')是错误的 和vue不一样
    // console.log('插件配置，', to)
    // if (to.name === 'login' || to.name === 'reg') {
    //   next()
    // } else {
    //   redirect({ name: 'login' })
    // }
    next()
  })

  // app.router.afterEach((to, from) => {
  //   console.log('插件全局后置守卫')
  // })
}
