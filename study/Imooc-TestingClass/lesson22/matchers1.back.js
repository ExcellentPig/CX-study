test('测试匹配器',()=>{
	expect(6).toBe(6); //toBe匹配器 
	// toBe类似于 Object.is 或者 === 
})

test('测试匹配器',()=>{
	const a = {one: 1}
	expect(a).toEqual({one: 1}); 
	// toEqual 相当于 ==  匹配内容相等
})

test('测试匹配器',()=>{
	const a = null
	expect(a).toBeNull(); 
	// toBeNull 匹配null
})

test('测试匹配器',()=>{
	const a = undefined
	expect(a).toBeUndefined(); 
	// 匹配undefined
})

test('测试匹配器',()=>{
	const a = 0
	expect(a).toBeDefined(); 
	//  匹配定义
})

test('测试匹配器',()=>{
	const a = true
	expect(a).toBeTruthy(); 
	// 匹配真
})

test('测试匹配器',()=>{
	const a = false
	expect(a).toBeFalsy(); 
	// 匹配假
})

test('测试匹配器',()=>{
	const a = true
	expect(a).not.toBeFalsy(); 
	//  .not 取反
})

test('测试匹配器',()=>{
	const a = 10
	expect(a).toBeGreaterThan(9); 
	//  大于
})

test('测试匹配器',()=>{
	const a = 10
	expect(a).toBeLessThan(100); 
	//  a < 100 小于
})

test('测试匹配器',()=>{
	const a = 10
	expect(a).toBeGreaterThanOrEqual(10); 
	//  a>=10 大于等于
})

test('测试匹配器',()=>{
	const a = 0.1
	const b = 0.2
	expect(a+b).toBeCloseTo(0.3); 
	// 浮点问题 用toEqual是不通过的  要使用toBeCloseTo
})

test('测试匹配器',()=>{
	const a = 'rose|jack|dack'
	// expect(a).toMatch('|'); 
	expect(a).toMatch(/jack/); 
	// 匹配字符串
})

test('测试匹配器',()=>{
	// const a = [1,2,3,4,5]
	// expect(a).toContain(1); 
	//  数组匹配器 Set匹配器
	const a = new Set([1,2,3])
	expect(a).toContain(3); 
})


const throwNewErrorFunc = ()=>{
	throw new Error('this is a new Error')
}
test('测试匹配器',()=>{
	expect(throwNewErrorFunc).toThrow();  //可以写字符串和正则
	// 匹配异常
})