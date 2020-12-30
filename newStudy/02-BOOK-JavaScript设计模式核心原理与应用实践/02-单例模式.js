/**
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式
 */

// 一般类
class SingleDog {
	show () {
		console.log('我是一个单例对象')
	}
}
const s1 = new SingleDog()
const s2 = new SingleDog()
// s1 === s2 // false  s1与s2相互独立 各占一块内存空间 

// 单例模式希望：不管我们创建多少次，他只会给你返回第一次所创建的那唯一的一个实例
// 需要构造函数具备判断自己是否已经创建过一个实例的能力
class SingleDog {
	show () {
		console.log('我是一个单例对象')
	}
	static getInstance() { // 静态方法
		// 判断是狗已经new过一个实例
		if(!SingleDog.instance) {
			// 如果这个唯一实例不存在，就创建它
			SingleDog.instance = new SingleDog()
		}
		// 如果已经存在，则直接返回
		return SingleDog.instance
	}
}
const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()
// s1 === s2 // true

// getInstance 的逻辑还可以用闭包来实现
SingleDog.getInstance = (function() {
	// 定义自由变量instance,模拟私有变量
	let instance = null
	return function () {
		// 判断自由变量是否为null
		if(!instance) {
			// 如果为null则new出唯一实例
			instance = new SingleDog()
		}
		return instance
	}
})()

// Vuex中的单例模式
// Store的实现 正是单例模式的典型应用

// 在项目中引入Vuex:
// 安装vuex插件
Vue.use(Vuex) // 通过use() 内部实现install方法 也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store。
// 将store注入到Vue实例中
new Vue({
	el: '#app',
	store
})

// install 方法
let Vue // 和上面的instance作用一样
...
export function install(_Vue) {
	// 判断传入的Vue实例对象是否已经被install过Vuex插件(是否有了唯一的state)
	if (Vue && _Vue === Vue) {
		if (process.env.NODE_ENV !== 'product') {
			console.error (
				'[vuex] already installed. Vue.use(Vuex) should be called only once.'
			)
		}
		return
	}
	// 若没有，则为这个Vue实例对象install唯一的Vuex
	Vue = _Vue
	// 将Vuex的初始化逻辑写进Vue的钩子函数里
	applyMixin(Vue)
}

/*
楼上便是 Vuex 源码中单例模式的实现办法了，套路可以说和我们的getInstance如出一辙。
通过这种方式，可以保证一个 Vue 实例（即一个 Vue 应用）只会被 install 一次 Vuex 插件，
所以每个 Vue 实例只会拥有一个全局的 Store。
*/


// 实例——实现一个Storage

//静态方法版
// 定义Storage
class Storage {
	static getInstance () {
		// 判断是否已经new过一个实例了
		if (!Storage.instance) {
			Storage.instance = new Storage()
		}
		// 如果这个唯一的实例已经存在，则直接返回
		return Storage.instance
	}
	getItem (key) {
		return localStorage.getItem(key)
	}
	setItem(key, value) {
		return localStorage.setItem(key, value)
	}
}
const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()
storage1.setItem('name', 'lieli')
storage1.getItem('name') // lile
storage2.getItem('name') // lilei
storage1 === storage2 // true

// 闭包版
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
function StorageBase () {}
StorageBase.prototype.getItem = function (key) {
	return localStorage.getItem(key)
}
StorageBase.prototype.setItem = function (key, value) {
	return localStorage.setItem(key, value)
}
// 以闭包的方式创建一个引用自由变量的构造函数
const Storage = (function() {
	let instance = null
	return function() {
		// 判断自由变量是否为null
		if (!instance) {
			// 如果为null就new出唯一实例
			instance = new Storage()
		}
		return instance
	}
})()
// 这里不用new Storage的形式调用 直接Storage() 也会有一样的效果
const storage1 = new Storage()
const storage2 = new Storage()
storage1.setItem('name', 'lieli')
storage1.getItem('name') // lile
storage2.getItem('name') // lilei
storage1 === storage2 // true
