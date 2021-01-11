import { runCallback,createObject,getData } from './demo'
import axios from 'axios'
jest.mock('axios') //不会真正去请求数据 模拟 axios

test(`测试runCallback`,()=>{
	// const func = ()=>{
	// 	return 'hello'
	// }
	// expect(runCallback(func)).toBe('hello')
	
	const func = jest.fn(()=>{
		return '45'
	}); //提供的模拟的函数 mock函数 捕获函数的调用
	
	//func.mockReturnValueOnce('Dell') //模拟返回结果一次
	
	// func.mockImplementation(()=>{ // 也有Once 
	//  还可以写逻辑 
	// 	console.log(1)
	//  return 'dell'
	// })
	
	//func.mockReturnValueOnce('Dell').mockReturnValueOnce('2') //多次
	
	//func.mockReturnValue('dell') //无论多少次都返回这个
	
	
	// func.mockImplementation(()=>{
	// 	return this;
	// })
	// func.mockReturnThis(); //上下 等价
	
	runCallback(func)
	runCallback(func)
	// expect(func).toBeCalled() // 执行匹配器
	//console.log(func.mock)
	
	//这个才称为断言
	expect(func.mock.calls.length).toBe(2) //func 函数被调用两次
	
	//expect(func.mock.calls[0]).toEqual(['abc']) //函数的参数
	
	//expect(func.mock.resul[0].value).toBe('Dell');
	
	// expect(func).toBeCalledWith('abc')
	
})


test('测试 createObject',()=>{
	const func = jest.fn()
	createObject(func)
	console.log(func.mock)
})

// {
//    calls: [ [] ],
//    instances: [ mockConstructor {} ], // this指向
//    invocationCallOrder: [ 1 ], //执行顺序
//    results: [ { type: 'return', value: undefined } ]
//  }




test.only('测试getData',async ()=>{
	//改变函数的内部实现
	 axios.get.mockResolvedValue({data: 'hello'}) //模拟请求结果
	//axios.get.mockResolvedValueOne({data: 'hello'}) //模拟多次 await
	await getData().then((data)=>{
		expect(data).toBe('hello')
	})
})