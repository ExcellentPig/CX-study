// call
Function.prototype.myCall = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	context = context || window
	context.fn = this
	const args = [...arguments].slice(1)
	const result = context.fn(...args)
	delete context.fn
	return result
}

// apply 
Function.prototype.myApply = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	context = context || window
	context.fn = this
	let result
	if (arguments[1]) {
		result = context.fn(...arguments[1])
	} else {
		result = context.fn()
	}
	delete context.fn
	return result
}

// bind 
Function.prototype.myBind = function (context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	const _this = this
	const args = [...arguments].slice(1)
	return function F() {
		return new _this(...args, ...arguments)
	}
	return _this.apply(context, args.concat(...arguments))
}

/*
new
	在调用new的过程中会发生一下四件事情
		新生成了一个对象
		链接到原型
		绑定this
		返回新对象
*/

/*
instanceof
	instanceof可以正确判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的prototype
*/