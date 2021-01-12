/*
防抖——debounce
	在短时间内多次触发同一个函数，只执行最后一次，或者只在开始时执行
*/

// 1、普通方案
window.addEventListener('resize', () => {
	console.log('trigger')
})

// 2、改造为防抖
function debounce (fn, delay) {
	let timer = null
	return function () {
		let context = this
		let args = arguments
		clearTimeout(timer)
		timer = setTimeout(function () {
			fn.apply(context, args)
		}, delay)
	}
}
// 使用
function foo () {
	console.log('trigger')
}
window.addEventListener('resize', debounce(foo, 2000)) // 两秒触发一次

/*
节流——throttle
	节流是在一段时间内允许函数执行一次
*/

// 1、 时间戳实现
// 会在第一次触发事件立即执行，以后每隔delay后执行一次，并且最后一次触发事件不会被执行
var throttle = function (func, delay) {
	var prev = Date.now()
	return function () {
		var context = this
		var args = arguments
		var now = Date.now()
		if (now - prev >= delay) {
			func.apply(context, args)
			prev = Date.now()
		}
	}
}

// 2、 定时器实现
// 第一次触发事件不会执行，而是在delay秒之后才执行，当嘴鸥胡一次停止触发后，还会执行一次函数
var throttle = function (func, delay) {
	var timer = null
	return function () {
		var context = this
		var args = arguments
		if (!timer) {
			timer = setTimeout(function () {
				func.apply(context, args)
				timer = null
			}, delay)
		}
	}
}