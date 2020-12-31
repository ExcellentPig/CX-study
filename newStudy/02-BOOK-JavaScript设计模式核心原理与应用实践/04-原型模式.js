/**
 * 只要我们还在借助Prototype来实现对象的创建和原型的继承，那么我们就是在应用原型模式
 */

/**
 * 使用原型模式，并不是为了得到一个副本，而是为了得到与构造函数(类)相对应的类型的实例、
 * 实现数据/方法的共享
 */

// 定义一个Dog类
class Dog {
	constructor(name, age) {
	    this.name = name
		this.age = age
	}
	eat () {
		console.log('肉骨头真好吃')
	}
}
// 等价于 这个构造函数
function Dog (name, age) {
	this.name = name
	this.age = age
}
Dog.prototype.eat = function () {
	console.log('肉骨头真好吃')
}

/**
 * JavaScript这门语言的根本就是原型模式， 可以把原型模式作为一种编程规范
 */

/**
 * 原型编程范式的核心思想就是利用实例来描述对象，用实例作为定义对象和继承的基础
 * 在JavaScript中，原型编程范式的体现就是基于原型链的继承
 */

/**
 * 在JavaScript中，每个构造函数都拥有一个prototype属性，他指向构造函数的原型对象
 * 这个原型对象有一个constructor属性指回构造函数
 * 每一个实例都有一个__proto__属性，当我们使用构造函数去创建实例时，实例的__proto__属性就会指向构造函数的原型对象
 */
function Dog (name, age) {
	this.name = name
	this.age = age
}
Dog.prototype.eat = function () {
	console.log('肉骨头真好吃')
}
//创建实例
const dog = new Dog('旺财', 3)

/**
 * 当我们试图访问一个JavaScript实例的属性/方法时，他首先搜索这个实例的本身
 * 当发现实例没有定义对应的属性/方法时，他会转而去搜索实例的原型对象
 * 如果原型对象也搜索不到，他就去搜索原型对象的原型对象
 * 这个搜索的轨迹，就叫做原型链 
 */

// 深拷贝 JSON.stringify
const liLei = {
	name: 'lilei',
	age: 27,
	habits: ['coding', 'hiking', 'running']
}
const liLeiStr = JSON.stringify(liLei)
const liLeiCopy = JSON.parse(liLeiStr)
iLeiCopy.habits.splice(0, 1) 
console.log('李雷副本的habits数组是', liLeiCopy.habits)
console.log('李雷的habits数组是',  liLei.habits)

// 深拷贝 递归
function deepClone (obj) {
	// 如果是值类型 或者 是null 则直接return
	if (typeof obj !== 'object' || obj === null) {
		return obj
	}
	// 定义结果对象
	let copy = {}
	if (obj.constructor === Array) {
		copy = []
	}
	// 遍历对象的key
	for (let key in obj) {
		// 如果key是对象的自有属性
		if (obj.hasOwnProperty(key)) {
			// 递归调用深拷贝方法
			copy[key] = deepClone(obj[key])
		}
	}
	return copy
}