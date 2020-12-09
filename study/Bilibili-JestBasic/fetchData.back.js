import {
	fetchData,
	fetchTwoData,
	fetchThrow,
	fetchFourData
} from './fetchData.js'

test('FetchData 方法测试', (done) => {
	fetchData(data => {
		expect(data)
			.toEqual({
				success: true
			})
		done() // 重要  
	})
})

test('fetchTwoData测试', () => {
	return fetchTwoData() //这种 promise 需要写return  或者 async await
		.then(res => {
			expect(res.data)
				.toEqual({
					success: true
				})
		})
})

// test('fetchThrow测试',()=>{ // 异常情况  这种方式不准确 
// 	return fetchThrow()
// 			.catch(e=>{
// 				//console.log(e.toString());
// 				expect(e.toString().indexOf('404') > -1)
// 				.toBe(true)
// 			})
// })

test('fetchThrow测试', () => { // 异常情况  
	expect.assertions(1) // 必须执行一次 expect
	return fetchThrow()
		.catch(e => {
			//console.log(e.toString());
			expect(e.toString().indexOf('404') > -1)
				.toBe(true)
		})
})


// test('fetchFourData测试',async ()=>{ //async  await
// 	await expect(fetchFourData())
// 			.resolves  //转换成promise对象
// 			.toMatchObject({ //一个成功就返回
// 				data: {
// 					success: true
// 				}
// 			})
// })

//方法二
test('fetchFourData测试',async ()=>{
	const res = await fetchFourData()
	expect(res.data)
	.toEqual({
		success: true
	})
})