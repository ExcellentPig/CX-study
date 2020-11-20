import { runCallback } from './demo'

test('测试runCallback', () => {
	// const func = () => {
	// 	return 'hello'
	// }
	// expect(runCallback(func)).toBe('hello')
	
	const func = jest.fn()
	runCallback(func)
	
})