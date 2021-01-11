/*
原始(Primitive)类型
	boolean
	null
	undefined
	number
	string
	symbol
	原始类型储存的都是值，是没有函数可以调用
*/

/*
对象(Object)类型
	在JS中除了原始类型其他的就是对象类型了
	原始类型存储的是值，对象类型存储的是指针
*/

/*
typeof/instanceof
	typeof对于原始类型来说，除了null都可以显示正确的类型
	typeof对于对象来说除了函数都会显示object,所以typeof并不能准确判断变量到底是什么类型
	instanceof的内部机制是通过原型链来判断的
	对于原始类型来说直接通过instanceof来判断类型是不行的
*/
class PrimitiveString {
	static [Symbol.hasInstance](x) {
		return typeof x === 'string'
	}
}
console.log('hee' instanceof PrimitiveString) // true

/*
Boolean 除了undefined、null、false、NaN、''、0、-0,其他所有值都转为true,包括所有对象
*/

/*
 == 和 ===
	== 会进行类型转换
*/

/*
闭包
	函数A内部有一个函数B，函数B可以访问到函数A找中的变量，那么函数B就是闭包
*/
function A() {
	let a = 1
	window.B = function () {
		console.log(a)
	}
}
A()
B()

/*
深拷贝
	Json.parse(Json.stringify(object))
		问题：
			会忽略undefined
			会忽略symbol
			不会序列化函数
			不会解决循环引用的对象
	loadsh
浅拷贝：
	Object.assign()
	... 扩展运算符
	forEach  for in
*/

function deepClone(obj) {
	function isObject(o) {
		return (typeof o === 'object' || typeof o === 'function') && o !== null
	}
	if (!isObject(obj)) {
		throw new Error('非对象')
	}
	let isArray = Array.isArray(obj)
	let newObj = isArray ? [...obj] : {...obj},
	Reflect.ownKeys(newObj).forEach(key => { // Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
		newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
	})
	return newObj
}

/*
原型
	Object是所有对象的爸爸，所有对象都可以通过__proto__找到它
	Function是所有函数的爸爸，所有函数都可以通过__proto__找到它
	函数的prototype是一个对象
	对象的__proto__属性指向原型，__proto__将对象和原型连接起来组成了原型链
*/

/*
数组方法
	push()		在数组末尾添加一个或多个元素，返回数组新长度
	pop()		移除数组的最后一项，返回移除的项
	shift()		移除数组第一项，返回移除项
	unshift()	在数组的第一项前面添加一个或者多个元素，返回数组的长度
	
	纯函数: 1、不会改变原函数   2、返回一个数组
*/