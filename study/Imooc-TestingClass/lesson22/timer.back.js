import timer from './timer'

// jest.useFakeTimers(); //加的timer 模拟


beforeEach(()=>{
	jest.useFakeTimers(); 
})


// test('time测试',(done)=>{
// 	timer(()=>{
// 		expect(1).toBe(1)
// 		done()
// 	})
// })

test('time测试',()=>{
	const fn = jest.fn();
	timer(fn);
	//jest.runAllTimers() //timer马上执行
	//jest.runOnlyPendingTimers() //只执行当前处于队列中的timer 不会执行未创建的timer
	
	jest.advanceTimersByTime(3000) //快进3秒
	
	expect(fn).toHaveBeenCalledTimes(1) //被调用次数
})