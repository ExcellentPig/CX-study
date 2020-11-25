import { runCallback, createObject, getData } from './demo'
import axios from 'axios'

jest.mock('axios'); // 不回去请求真实的数据了

test('测试runCallback', () => {
	// const func = () => {
	// 	return 'hello'
	// }
	// expect(runCallback(func)).toBe('hello')
	
	// const func = jest.fn(() => {
	// 	return '46'
	// }) // mock函数  捕获函数的调用
	
	// func.mockImplementation(() => {
	// 	return 'dell'
	// })
	
	// func.mockImplementationOnce(() => {
	// 	return 'dell'
	// })
	
	const func = jest.fn()
	func.mockReturnValueOnce('dell')
	func.mockReturnValueOnce('lee')
	
	runCallback(func)
	runCallback(func)
	// expect(func).toBeCalled()
	console.log(func.mock)
	// expect(func.mock.calls.length).toBe(2)
	expect(func.mock.calls[0]).toEqual(['abc']) // 断言
	
})

test('测试createObject', () => {
	const func = jest.fn()
	createObject(func)
	console.log(func.mock)
})

test.only('测试getData', async () => {
	// axios.get.mockResolvedValue({ data: 'hello' })
	axios.get.mockResolvedValueOnce({ data: 'hello' }) // 只模拟一遍
	await getData().then((res) => {
		// console.log(res)
		expect(res).toBe('hello')
	})
})