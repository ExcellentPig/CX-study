/**
 * 导航守卫： 拦截组件
 *  导航守卫就是我们进行某些页面的时候需要判断当前用户是否登录过，如果登陆过，则可以跳转，否则重定向到登录页面
	导航守卫只是前端做出判断，检查请求头中是否带有token，并不能判断token是否失效
	每个守卫方法接收三个参数：
	to: Route: 即将要进入的目标 路由对象
	from: Route: 当前导航正要离开的路由
	next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
	next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
	`next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
	next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
	next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
	ps: 一定要确保要调用next
 */

/**
 * 添加路由守卫--导航守卫
 * 作用是通过判断来决定当前的路由跳转到底能不能进行
 * 这种守卫，只要进行路由的跳转就会自动触发，不能人为调用
 */
/**
 * to：目标路由
 * from：源路由
 * next：下一步的操作，就是用户当前需要进行的操作
 */
router.beforeEach((to, from, next) => {
	console.log(to)
	// 判断当前用户是否登录，如果登录了则可以跳转，否则重定向到登录页
	// 获取用户登录之后的token,进行token判断
	if (to.path !== '/login' || to.path !== '/register') { // 非登录页面验证是否存在token
		let token = localStorage.getItem('token')
		if (token) {
			next()
		} else {
			Toast('请先登录')
			next({ name: 'login' }) // 没有登录就重定向到登录页
		}
	} else {
		next()
	}
})


//---------------------------------------------------

/**
 * axios拦截器：拦截后端接口
 *  每次发送请求之前判断vuex或者本地存储中是否存在token
	如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
	即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
 */

/**
 * 添加请求拦截器
 * 每一个我们自己封装的axios请求都会经过这个拦截器
 */
axios.interceptors.request.use(function (config) {
	console.log(config)
	// 在发送请求之前做些什么：有没有token,如果有就以请求头的方式进行传递
	let token = localStorage.getItem('token')
	if (token) {
		// 设置请求头
		config.headers.Authorization = token 
	}
	return config
}, function (error) {
	// 请求失败做些什么
	return Promise.reject(error)
})

/**
 * 导航守卫和axios拦截器的区别
 *  导航守卫就是路由守卫，想进入一个页面时，判断是否有权限访问(有token，就有权限，没有就返回)，但并不能判断是否失效
 *  axios拦截器是发送请求判断token的有效性没如果有就将token放在请求头里
 *  导航守卫和axios拦截器一起使用，进而来确保登录的状态
 */
