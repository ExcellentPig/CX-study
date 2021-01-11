import { fetchData } from './fetchData.js'

//回调内容的异步处理方式
// test('fetchData测试返回结果为{success: true}',(done)=>{
// 	fetchData((data)=>{
// 		expect(data)
// 		.toEqual({success: true})
// 		done() //需要加done() 来表示测试真正的结束
// 	})
// })

//就返回一个异步函数 promise
// test('fetchData测试返回结果为{success: true}',()=>{
// 	return fetchData().then(res=>{
// 		expect(res.data).toEqual({success: true})
// 	})
// })

//异常情况  如果正确测试用例里面的就不会执行 存在问题 
// test('fetchData测试返回结果为 404',()=>{
// 	expect.assertions(1); //这样就必须 有错误才能跑这个测试用例
// 	return fetchData().catch(e=>{ //使用catch 需要加一个断言 
// 		expect(e.toString().indexOf('404')>-1) // 
// 		.toBe(true)
// 	})
// })


//使用resolves
// test('fetchData 测试返回结果为{success: true}',()=>{
// 	// fetchData().then(res=>{
// 	// 	console.log(res)
// 	// })
// 	return expect(fetchData())
// 			.resolves // 拿到数据
// 			.toMatchObject({ //匹配数据
// 				data: {
// 					success: true
// 				}
// 			})
// })

// 测试异常
// test('fetchData测试返回结果为 404',()=>{
// 	return expect(fetchData())
// 			.rejects
// 			.toThrow()
// })

//async await
// test('fetchData 测试返回结果为{success: true}',async ()=>{
// 	await expect(fetchData())
// 			.resolves // 拿到数据
// 			.toMatchObject({ //匹配数据
// 				data: {
// 					success: true
// 				}
// 			})
// })

// test('fetchData测试返回结果为 404',async ()=>{
// 	await expect(fetchData())
// 			.rejects
// 			.toThrow()
// })


test('fetchData 测试返回结果为{success: true}',async ()=>{
	const response = await fetchData()
	expect(response.data).toEqual({
		success: true
	})
})

// test('fetchData测试返回结果为 404',async ()=>{ 
// 	expect.assertions(1) //使用catch就需要添加断言
// 	try {
// 		await fetchData()
// 	}catch(e) { 
// 		expect(e.toString()).toEqual('Error: Request failed with status code 404')
// 		//console.log(e.toString())
// 	}
// })