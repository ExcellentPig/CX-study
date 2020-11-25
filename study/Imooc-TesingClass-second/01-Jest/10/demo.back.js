//jest.mock('./util') // 自动会放在第一行

jest.mock('./util', ()=> {
	const Util = jest.fn( () => {
		console.log('constructor---')
	})
	Util.prototype.a = jest.fn(() => {
		console.log('a---')
	})
	Util.prototype.b = jest.fn(() => {
		console.log('b---')
	})
	return Util
})

import  Util from './util'

/**
 * 
 * jest.mock 发现 util是一个类，会自动把类的构造函数和方法变成jest.fn()
 * const Util = jest.fn()
 * Util.a = jest.fn()
 * Util.b = jest.fn()
 * 
 */


import demoFunction from './demo'

test('测试demofunction', ()=>{
	demoFunction()
	// expect(Util).toHaveBeenCalled()
	expect(Util.mock.instances[0].a).toHaveBeenCalled()
	expect(Util.mock.instances[0].b).toHaveBeenCalled()
	// console.log(Util.mock.instances[0])
})