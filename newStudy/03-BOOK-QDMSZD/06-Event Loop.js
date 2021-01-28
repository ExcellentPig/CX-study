/*
线程和进程
	本质上来说，两个名词都是CPU工作时间片的一个描述
	进程描述了CPU在运行指令及加载和保存上下文所需的时间，放在应用上来说就代表了一个程序。
	线程是进程中的更小单位，描述了执行一段指令所需的时间
*/

/*
执行栈
	可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则
*/

/*
浏览器中的Event Loop
	当遇到异步代码时，会被挂起并在需要执行的时候加入到Task(有多种Task)队列中。
	一旦执行栈为空，Event Loop 就会从Task队列中拿出需要执行的代码并放入执行栈中执行，
	所有本质上来说JS中的异步还是同步行为
	
	不同的任务源会被分配到不同的Task队列中，任务源可以分为微任务(microtask)和宏任务(macrotask)
	在ES6规范中，microtask称为jobs,macrotask称为task
*/

/*
Event Loop 执行顺序
	首先会执行同步代码，这属于宏任务
	当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
	执行所有微任务
	当执行完所有微任务，如果有必要会渲染页面
	然后开始下一轮Event Loop, 执行宏任务中的异步代码，也就是setTimeout中的回调函数
	
	微任务包括：process.nextTick(Node独有)、promise、MutationObserver
	宏任务：script、setTimeout、setInterval、setImmediate、I/O、UI rendering
*/

/*
Node中的Event Loop
	Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。
	每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。
	当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。
	
	timer:
		timers阶段会执行setTimeout和setInterval回调，并且是由poll控制的
		同样，在Node中定时器指定的时间也不是准确时间，只能是尽快执行
	I/O
		I/O阶段会处理一些上一轮循环中的少数未执行的I/O回调
	idle,prepare
		idle,prepare阶段内部实现
	poll
		执行timer阶段执行回调
		执行I/O回调
	check
		check阶段执行setImmediate
	close callbacks
		close callbacks阶段执行close事件
*/