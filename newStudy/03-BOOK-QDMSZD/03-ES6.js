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