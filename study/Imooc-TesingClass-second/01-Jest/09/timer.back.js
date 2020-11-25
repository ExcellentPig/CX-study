import timer from './timer'
// jest.useFakeTimers()

beforeEach(() => {
	jest.useFakeTimers()
})

test(`timer测试`, ()=> {
	const fn = jest.fn()
	timer(fn)
	// jest.runAllTimers() // 运行所有的定时器
	//jest.runOnlyPendingTimers()
	jest.advanceTimersByTime(3000)
	expect(fn).toHaveBeenCalledTimes(1)
})

test(`timer测试1`, ()=> {
	const fn = jest.fn()
	timer(fn)
	// jest.runAllTimers() // 运行所有的定时器
	//jest.runOnlyPendingTimers()
	jest.advanceTimersByTime(3000)
	expect(fn).toHaveBeenCalledTimes(1)
})