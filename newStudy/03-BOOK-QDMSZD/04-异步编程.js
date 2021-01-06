/*
并发(concurrency) 和 并行(parallelism)区别
	并发是宏观概念，任务A和任务B在一段时间内通过任务间的切换完成了两个任务，这种情况我们称之为并发
	并行是微观概念，假设CUP中存在两个核心，那么我们就可以同时完成任务A,B，同时完成多个任务的情况就可以称之为并行
*/

/*
回调函数
	容易出现回调地狱
	出现回调地狱的根本原因
		嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
		嵌套函数一多，就很难处理错误
		回调函数不能使用try catch 不能直接return
*/

/*
Generator
	Generator可以控制函数的执行
*/
function *foo (x) {
	let y = 2 * (yield (x + 1))
	let z = yield(y / 3)
	return (x + y + z)
}
let it = foo(5)
it.next()
it.next(12)

// Generator解决回调地狱问题
function * fetch () {
	yield ajax(url, () => {})
	yield ajax(url1, () => {})
	yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()

/*
Promise
	状态
		等待中 pending
		完成了 resolved
		拒绝了 rejected
	缺点
		无法取消Promise,错误需要通过回调函数捕获
*/
ajax(url)
	.then(res=>{
		console.log(res)
		return ajax(url1)
	})
	.then(res => {
		console.log(res)
		return ajax(url2)
	})
	.then(res => console.log(res))
	
/*
async await
	一个函数加上async就会返回Promise
	async 就是将函数返回值使用Promise.resolve()包裹了下，和then中处理返回值一样，并且await只能配套async使用
	缺点
		await将异步代码改造成了同步代码，如果多个异步代码没有依赖性确使用了await会导致性能上的降低
*/
let a = 0
let b = async () => {
	a = a + await 10
	console.log('2', a) // '2' 10
}
b()
a++
console.log('1', a) // '1' 1

/*
常用定时器函数
	setTimeout
	setInterval 
	requestAnimationFrame 循环定时器
		自带节流功能 基本可以保证16.6ms内执行一次
*/
function setInterval(callback, interval) {
	let timer
	const now = Date.now
	let satrtTIme = now()
	let endTime = satrtTIme
	const loop = () => {
		timer = window.requestAnimationFrame(loop)
		endTime = now()
		if (endTime - startTimer >= interval) {
			startTimer = endTime = now()
			callback(timer)
		}
	}
	timer = window.requestAnimationFrame(loop)
	return timer
}
let a = 0
setInterval(timer => {
	console.log(1)
	a++
	if (a === 3) cancelAnimationFrame(timer)
}, 1000)