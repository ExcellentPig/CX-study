/**
React和Vue他们都不是MVVM框架，只是借鉴MVVM的思路
	View —— 用户看见的视图
	Model —— 一般是本地数据和数据库中的数据
	ViewModel —— 只关心数据和业务的处理，不关心View如何处理数据 View和Model都有可以独立起来互不干扰
				 并且可以将复用的逻辑放在一个ViewModal中，让多个View复用这个ViewModel
				 
	Vue框架中  ViewModel就是组件实例，View就是模板，Model的话在引入Vuex的情况下是完全可以和组件分离的
	
	除了以上三个部分，其实在MVVM中还引入了一个隐式的Binder层，实现了View和ViewModel的绑定
	
	对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，
	而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓。
 */

/*
当然了 Virtual DOM(虚拟DOM其实就是类似于JS对象) 提高性能是其中一个优势，其实最大的优势还是在于：
	将 Virtual DOM 作为一个兼容层，让我们还能对接非 Web 端的系统，实现跨端开发。
	同样的，通过 Virtual DOM 我们可以渲染到其他的平台，比如实现 SSR、同构渲染等等。
	实现组件的高度抽象化
*/

/*
路由原理本质就是监听URL的变化，然后匹配路由规则，显示相应的页面，并且无需刷新页面，有以下两种方式实现：
	Hash模式
	History模式
	对比：
		Hash模式只可以更改#后面的内容，History模式可以通过API设置任意的同源URL
		History模式可以通过API添加任意类型数据到历史记录中，Hash模式只能更改Hash值，也就是字符串
		Hash模式无需后端配置，并且兼容性好。History模式在用户手动输入地址或者刷新页面的时候会发起URL请求
		后端需要配置index.html页面用于匹配不到静态资源的情况
*/
window.addEventListener('hashchange', ()=> {}) // #后面的哈希值发生变化时 

history.pushState(stateObject, title, URL) // 新增历史记录
history.replaceState(stateObject, title, URL) // 替换当前历史记录
// 点击后退按钮触发
window.addEventListener('propstate', e=> {
	console.log(e.state) // 这里的e是上面传入的stateObject
})

/*
vue生命周期钩子函数
	beforeCreate钩子函数调用时，是获取不到prop或者data中的数据的，因为这些数据的初始化都在initState中
	created钩子函数，这里已经可以访问之前不可以访问的数据了，但是这个时候组件还没被挂载，所以看不见
	beforeMount 开始创建VDOM(虚拟DOM)
	mounted 将VDOM渲染为真实DOM并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子
	beforUpdate和updated 分别是在更新前和更新后会调用
	keep-alive独立的生命周期 
		activated
		deactivated
		用keep-aliva包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行deactivated钩子函数，命中缓存渲染后会执行activated钩子函数
	beforeDestroy和destroyed 销毁前和销毁后
		beforeDestroy适合移除事件、定时器等 防止内存泄漏
		所有子组件都销毁完毕才会执行根组件的destroyed的钩子函数
*/

/*
组件通信
	父子通信
	  父组件通过props传递数据给子组件，子组件通过emit发送事件传递数据给父组件
	  v-model默认会解析成名为 value 的 prop 和名为 input 的事件，常用于 UI 控件上，但是究其根本，还是通过事件的方法让父组件修改数据。
	  $parent $children对象来访问组件实例中的方法和数据
	  Vue2.3+ 还可以使用$listeners和.sync
	兄弟通信
	  通过查找父组件中的子组件实现，也就是this.$parent.$children，在$children中可以通过组件的name查询到需要的组件实例，然后进行通信
	跨多层次组件通信
	  vue2.2新增API provide/inject
	任意组件
	  Event Bus 中央事件总线
	  Vuex
*/

/*
extend  作用是扩展组件生成一个构造器，通常会与$mount一起使用
*/
let Component = Vue.extend({
	template: '<div>test</div>'
})
new Component().$mount('#app')
let SuperComponent = Vue.extend(Component)
new SuperComponent({
	created() {
		console.log(1)
	}
})
new SuperComponent().$mount('#app')

/*
mixin和mixins
	mixin用于全局混入，会影响每个组件实例，通常插件都是这样做初始化的
	mixins扩展组件的方式，如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过mixins混入代码
	mixins混入的钩子函数会先于组件内的钩子函数执行,并且在遇到同名选项的时候也会有选择性的进行合并
*/
Vue.mixin({
	beforeCreate(){
		// 这种方式会影响每个组件的beforeCreate钩子函数
	}
})

/*
computed和watch
	computed 计算属性，依赖于其他属性计算值，并且computed的值有缓存，只有当前计算值变化才会返回内容
	watch监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作
	一般需要依赖别的属性来动态获得值得时候使用computed,对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用watch
*/
// compued和watch还支持对于对象的写法
vm.$watch('obj', {
	// 深度遍历
	deep: true,
	// 立即触发
	immediate: true,
	// 执行的函数
	handler: function(val, oldVal){}
})
var vm = new Vue({
	data: { a: 1 },
	computed: {
		aPlus: {
			get: function () {
				return this.a + 1
			},
			set: function(v) {
				this.a = v - 1
			}
		}
	}
})

/*
keep-alive 组件的作用
	如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，可以使用keep-alive包裹需要保存的组件
	  生命周期
		activated
		deactivated
		用keep-alive包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行deactivated钩子函数，
		命中缓存后执行activated钩子函数
*/

/*
v-show 和 v-if
	v-show 是控制元素的display none block 
	v-if 代表创建于销毁
*/

/*
组件中data什么时候可以使用对象
	组件复用时所有组件实例都会共享data，如果data是对象的话，就会造成一个组件修改data以后会影响到其他所有组件,
	所以需要将data写成函数，每次用到就调用一次函数获得新的数据
	
	当我们使用new Vue() 的方式的时候，无论我们将data设置为对象还是函数都是可以的，因为new Vue()的方式是
	生成一个根组件，该组件不会复用，也就不存在共享data的情况了
*/

/*
响应式原理
	vue内部使用Object.defineProperty()来实现数据响应式，通过这个函数可以监听到set和get的事件
*/
var data = { name: 'yck' }
observer(data)
let name = data.name // get value
data.name = 'yyy' // change value
function observe(obj) {
	if (!obj || typeof obj !== 'object') {
		return
	}
	Object.keys(obj).forEach(key => {
		defineReactive(obj, key, obj[key])
	})
}
function defineReactive(obj, key, val) {
	observe(val)
	Object.defineProperty(obj, key, {
		// 可枚举
		enumerable: true,
		// 可配置
		configurable: true,
		// 自定义函数
		get: function reactiveGetter () {
			console.log('get value')
			return  val
		},
		set: function reactveSetter(newVal) {
			console.log('change value')
			val = newVal
		}
	})
}
//Dep类 用于解耦属性的依赖收集和派发更新操作
class Dep {
	constructor() {
	    this.subs = []
	}
	// 添加依赖
	addSub(sub) {
		this.subs.push(sub)
	}
	// 更新
	notify () {
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}
//全局属性 通过该属性配置Watcher
Dep.target = null

//触发依赖收集时的操作
class Wathcer {
	constructor(obj, key, cb) {
	    // 将Dep.target指向自己
		// 然后触发属性的getter添加监听
		// 最后将Dep.target置空
		Dep.target = this
		this.cb = cb
		this.obj = obj
		this.key = key
		this.value = obj[key]
		Dep.target = null
	}
	update () {
		// 获取新值
		this.value = this.obj[this.key]
		// 调用update方法更新Dom
		this.cb(this.value)
	}
}
//对 defineReactive 函数进行改造，在自定义函数中添加依赖收集和派发更新相关的代码。
function defineReactive(obj, key,  val) {
	// 递归子属性
	observe(val)
	let dp = new Dep()
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter () {
			console.log('get value')
			if (Dep.target) {
				do.addSub(Dep.target)
			}
			return val
		},
		set: function reactiveSetter(newVal) {
			console.log('change value')
			val = newVal
			dp.notify()
		}
	})
}
var data = { name: 'yck' }
observe(data)
function update(value) {
  document.querySelector('div').innerText = value
}
// 模拟解析到 `{{name}}` 触发的操作
new Watcher(data, 'name', update)
// update Dom innerText
data.name = 'yyy' 

/*
NextTick
	可以让我们在下次的DOM更新循环结束之后执行延迟回调，用户获得更新后的DOM
*/