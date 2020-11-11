// 匹配器
// test('测试 test匹配器',()=>{
// 	expect('test')
// 	.toBe('test')
// })


// test('测试 test匹配器',()=>{ //相当于 ===
// 	const a = {numbe: 'test'}
// 	expect(a)
// 	.toBe('test') //error
// })


// test('toEqual匹配器',()=>{ // 相当于 ==
// 	const a = {number: 'toEquak'}
// 	expect(a)
// 	.toEqual({number: 'toEquak'})
// })

// test('toBeNull',()=>{  //null
// 	const a = null;
// 	expect(a)
// 	.toBeNull()
// })


// test('toBeUndefined',()=>{
// 	const a = undefined;
// 	expect(a)
// 	.toBeUndefined()
// })

// test('toBeDefined',()=>{  //定义
// 	const a = 1;
// 	expect(a)
// 	.toBeDefined()
// })

// test('toBeTruthy',()=>{ //true
// 	const a = 1;
// 	expect(a)
// 	.toBeTruthy()
// })

// test('toBeFalsy',()=>{  //false
// 	const a = 0;
// 	expect(a)
// 	.toBeFalsy()
// })

//----------------------------------------------------------

// test('toBeGreaterThan',()=>{
// 	const a = 10
// 	expect(a)
// 	.toBeGreaterThan(2) //大于
// })

// test('toBeLessThan',()=>{ //小于
// 	const a = 10 
// 	expect(a)
// 	.toBeLessThan(11)
// })


// test('toBeGreaterThanOrEqual',()=>{  //大于等于
// 	const a = 10
// 	expect(a)
// 	.toBeGreaterThanOrEqual(1)
// })

// test('toBeLessThanOrEqual',()=>{  //小于等于
// 	const a = 10
// 	expect(a)
// 	.toBeLessThanOrEqual(100)
// })

// test('toBeCloseTo',()=>{  // 浮点错误相关
// 	const one = 0.1
// 	const two = 0.2
// 	expect(one + two)
// 	.toBeCloseTo(0.3)
// })

//----------------------------------------------------

// test('toMatch',()=>{ //字符串
// 	const str = 'khan|liu|jack'
// 	expect(str)
// 	.toMatch('khan|');
// })

// test('toContain',()=>{ //数组
// 	const arr = ['khan','rose','jack']
// 	expect(arr)
// 	.toContain('khan');
// })

// test('toContain',()=>{ //数组 set
// 	const arr = ['khan','rose','jack']
// 	const data = new Set(arr);
// 	expect(data)
// 	.toContain('khan');
// })


const throwNewFunction = ()=>{
	throw new Error(`this is Error`)
}
// test('toThrow',()=>{ //错误 匹配器
// 	expect(throwNewFunction)
// 	.toThrow();
// })
// test('toThrow',()=>{ //错误 匹配器
// 	expect(throwNewFunction)
// 	.toThrow('this is Error'); //加入 就和Error 相同才行
// })
test('toThrow',()=>{ //错误 匹配器
	expect(throwNewFunction)
	.not //取反
	.toThrow('a');
})
