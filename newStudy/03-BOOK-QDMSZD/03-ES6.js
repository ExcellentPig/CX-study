/*
其实JS中不存在类，class只是语法糖，本质还是函数
*/

// 组合继承
function Parent (value) {
	this.val = value
}
Parent.prototype.getValue = function() {
	console.log(this.val)
}
function Child(value) {
	Parent.call(this, value)
}
Child.prototype = new Parent()
const child = new Child(1)
child.getValue() // 1
child instanceof Parent // true


// 寄生组合继承
function Parent (value) {
	this.val = value
}
Parent.prototype.getValue = function () {
	console.log(this.val)
}
function Child (value) {
	Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
	constructor: {
		value: child,
		enumerable: true,
		writable: true,
		configurable: true
	}
})
const child = new Child(1)
child.getValue() // 1
child instanceof Parent // true

// Class继承
class Parent {
	constructor(value) {
	    this.val = value
	}
	getValue () {
		console.log(this.val)
	}
}
class Child extends Parent {
	constructor(value) {
	    super(value)
	}
}
let child = new Child(1)
child.getValue()
child instanceof Parent // true

/*
模块化的好处
	解决命名冲突
	提高复用性
	提高代码可维护性
*/

// AMD 
define(['./a', './b'], function (a, b) {
	a.do()
	b.do()
})

// CMD
define(function (require, exports, module) {
	var a = require('./a')
	a.doSomething()
})

// CommonJS 
module.exports = {
	a: 1
}

exports.a = 1

var module = require('./a.js')
module.a

// ES Module
import xxx from 'xxx'
import { XXX } from 'xxx'

export function a() {}
export default function() {}

/*
Proxy
	Vue3.0中通过Proxy来替换原本的Object.defineProperty来实现数据响应式
	Proxy是ES6中新增的功能，他可以用来自定义对象中操作
*/
// target 代表需要添加代理的对象
// handler 用来自定义对象中的操作
let p = new Proxy(target, handler)

// 通过 Proxy 来实现一个数据响应式
let onWatch = (obj, setBind, getLogger) => {
	let handler = {
		get (target, property, receiver) {
			getLogger (target, property)
			return Reflect.get(target, property, receiver)
		},
		set (target, property, value, receiver) {
			setBind(value, property)
			return Reflect.set(target, property, value)
		}
	}
	return new Proxy(obj, handler)
}
let obj = { a: 1 }
let p = onWatch(
	obj,
	(v, property) => {
		console.log(`监听到属性${property}改变为${v}`)
	},
	(target, property) => {
		console.log(`'${property}' = ${target[property]}`)
	}
)

/*
之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，
一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，
但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了
*/

/*
map 生成一个新数组，遍历原数组 将每个元素拿出来做一些变换然后放入到新数组中
	接受三个参数 -> 当前索引元素，索引，原数组
*/
[1, 2, 3].map(v => v + 1)
['1', '2', '3'].map(parseInt) // 1 NaN NaN

/*
filter 生成一个新数组，在遍历数组的时候将返回值为true的元素放入新数组
*/
let arr = [1, 2, 4, 6]
let newArray = array.filter(item => item !== 6)

/*
reduce 可以将数组中的元素通过回调函数最终转换为一个值
*/
const arr = [1, 2, 3]
let total = 0
for (let i = 0; i < arr.length; i++) {
	total += arr[i]
}
// 使用reduce
// 初始值为0
/*
首先初始值为 0，该值会在执行第一次回调函数时作为第一个参数传入
回调函数接受四个参数，分别为累计值、当前元素、当前索引、原数组，后三者想必大家都可以明白作用，这里着重分析第一个参数
在一次执行回调函数时，当前值和初始值相加得出结果 1，该结果会在第二次执行回调函数时当做第一个参数传入
所以在第二次执行回调函数时，相加的值就分别是 1 和 2，以此类推，循环结束后得到结果 6
*/
const sum = arr.reduce((acc, current) => acc + current, 0)

// 通过reduce实现map函数
const arr = [1, 2, 3]
const mapArray = arr.map(value => value * 2)
const reduceArray = arr.reduce((acc, current) => {
	acc.push(current * 2)
	return acc
}, [])