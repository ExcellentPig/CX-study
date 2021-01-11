//模拟类
// jest.mock发现util是一个类，会自动把类的构造函数和方法变成jest.fn()
//jest.mock('./util')  //会自动提高到第一行
//相当于
// const Util = jest.fn();
// Util.a = jest.fn()
// Util.b = jest.fn()

//其他写法
jest.mock('./util',()=>{
	const Util = jest.fn(()=>{
		console.log('constructor')
	})
	Util.prototype.a = jest.fn(()=>{
		console.log('a')
	})
	Util.prototype.b = jest.fn(()=>{
		console.log('b')
	})
	return Util;
})

import Util from './util'

import demoFunction from './utilDemo'




test(`测试demoFunction`,()=>{
	demoFunction();
	expect(Util).toHaveBeenCalled()
	//console.log(Util.mock)
})