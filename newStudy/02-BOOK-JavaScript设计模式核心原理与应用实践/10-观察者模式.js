/**
 * 观察者模式 --- 发布-订阅
 * 	观察者模式定义了一种多对一的依赖关系，让多个观察者对象同时监听某一个目标对象
 *  当这个目标对象的状态发生变化时，会通知所有观察者对象，使他们能够自动更新
 */
//定义发布者类
class Publisher {
	constructor() {
	    this.observers = []
		console.log('Publisher created')
	}
	// 增加订阅者
	add (observer) {
		console.log('Publisher.add invoked')
		this.observers.push(observer)
	}
	// 移除订阅者
	remove (observer) {
		console.log('Publish.remove invoked')
		this.observers.forEach((item, i) => {
			if (item === observer) {
				this.observers.splice(i, 1)
			}
		})
	}
	// 通知所有订阅者
	notify () {
		console.log('Publish.notify invoked')
		this.observers.forEach((observer) => {
			observer.update(this)
		})
	}
}
// 订阅者类
class Observer {
	constructor() {
	    console.log('Observer created')
	}
	update () {
		console.log('Observer.update invoked')
	}
}

//使所有的订阅者来监听某个特定状态的变化
// 定义一个具体的需求文档(prd)发布类
class PrdPublisher extends Publisher {
	constructor() {
	    super () 
		// 初始化需求文档
		this.prdState = null
		this.observers = []
		console.log('PrdPublisher created')
	}
	// 获取当前的prdState
	getState () {
		console.log('PrdPublisher.getState invoked')
		return this.prdState
	}
	// 该方法用于改变prdState 的值
	setState (state) {
		console.log('PrdPublisher.setState invoked')
		this.prdState = state // prd的值发生改变
		this.notify() // 需求文档变更，立即通知所有开发者
	}
}
// 订阅方
class DeveloperObserver extends Observer {
	constructor() {
	    super()
		// 需求文档一开始还不存在 prd初始为空对象
		this.prdState = {}
		console.log('DeveloperObserver created')
	}
	// 重写一个具体的update方法
	update(publisher) {
		console.log('DeveloperObserver.update invoked')
		// 更新需求文档
		this.prdState = publisher.getState()
		// 调用工作函数
		this.work()
	}
	// work方法 一个专门搬砖的方法
	work () {
		// 获取需求文档
		const prd = this.prdState
		// 开始基于需求文档提供的信息扮装
		...
		console.log('996 begins')
	}
}
// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
// 韩梅梅出现了
const hanMeiMei = new PrdPublisher()
// 需求文档出现了
const prd = {
    // 具体的需求内容
    ...
}
// 韩梅梅开始拉群
hanMeiMei.add(liLei)
hanMeiMei.add(A)
hanMeiMei.add(B)
// 韩梅梅发送了需求文档，并@了所有人
hanMeiMei.setState(prd)


/*
在Vue数据双向绑定的实现逻辑里，有这样三个关键角色：
observer（监听器）：注意，此 observer 非彼 observer。在我们上节的解析中，observer 作为设计模式中的一个角色，代表“订阅者”。但在Vue数据双向绑定的角色结构里，所谓的 observer 不仅是一个数据监听器，它还需要对监听到的数据进行转发——也就是说它同时还是一个发布者。
watcher（订阅者）：observer 把数据转发给了真正的订阅者——watcher对象。watcher 接收到新的数据后，会去更新视图。
compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管~
*/

// Observer
// observe方法遍历并包装对象属性
function observe(target) {
	// 如果target是一个对象
	if (target && typeof === 'object') {
		Object.keys(target).forEach((key) => {
			// defineReactive方法会给目标属性装上监听器
			defineReactive(target, key, target[key])
		})
	}
}
function defineReactive(target, key, val) {
	observe(val)
	Object.defineProperty(target, key, {
		enumerable: true,
		configurable: false,
		get: function() {
			return val
		},
		set: function (value) {
			console.log(`${target}属性的${key}属性从${val}值变成了${value}`)
			val = value
		}
	})
}

// 订阅者Dep
class Dep {
	constructor() {
		// 初始化订阅者队伍
	    this.subs = []
	}
	addSub (sub) {
		this.subs.push(sub)
	}
	notify () {
		this.subs.forEach((sub) => {
			sub.update()
		})
	}
}

// 改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者
function defineReactive (target, key,  val) {
	const dep = new Dep()
	// 监听当前属性
	observe()
	Object.defineProperty(target, key, {
		set: (value) => {
			// 通知所有订阅者
			dep.notify()
		}
	})
}

// 实现一个Event Bus/ Event Emitter

//创建一个Event Bus 
const EventBus = new Vue()
export default EventBus
// 主文件里引入EventBus 并挂载到全局
import bus from '../EventBus.js'
Vue.prototype.bus = bus 
// 订阅事件
this.bus.$on('someEvent', func)
// 发布触发事件
this.bus.$emit('someEvent', params)


//实现一个Event Bus
class EventEmitter {
	constructor() {
		// handlers是一个map，用于存储事件与回调之间的对应关系
	    this.handlers = {}
	}
	// on方法用于安装事件监听，它接受目标事件名和回调函数作为参数
	on(eventName, cb) {
		// 先检查一下目标事件名有没有对应的监听函数队列
		if (!this.handlers[eventName]) {
			// 如果没有，那么首先初始化一个箭筒函数队列
			this.handlers[eventName] = []
		}
		// 把回调函数推入目标事件的监听函数队列里去
		this.handlers[eventName].push(cb)
	}
	// emit方法用于触发目标事件， 他接受事件名和监听函数入参作为参数
	emit(eventName, ...args) {
		// 检查目标事件是否有监听函数队列
		if (this.handlers[eventName]) {
			// 如果有，则逐个调用队列里的回调函数
			this.handlers[eventName].forEach((callback) => {
				callback(...args)
			})
		}
	}
	// 移除某个事件回调队列里的指定回调函数
	off(eventName, cb) {
		const callbacks = this.handlers[eventName]
		const index = callbacks.indexOf(cb)
		if (index !== -1) {
			callbacks.splice(index, 1)
		}
	}
	// 为事件注册单次监听器
	once(eventName, cb) {
		// 对回调函数进行包装，使其执行完毕自动被移除
		const wrapper = (...args) => {
			cb(...args)
			this.off(eventName, wrapper)
		}
		this.on(eventName, wrapper)
	}
}

/*
观察者模式，解决的其实是模块间的耦合问题，有它在，即便是两个分离的、毫不相关的模块，
也可以实现数据通信。但观察者模式仅仅是减少了耦合，
并没有完全地解决耦合问题——被观察者必须去维护一套观察者的集合，这些观察者必须实现统一的方法供被观察者调用，
两者之间还是有着说不清、道不明的关系
*/