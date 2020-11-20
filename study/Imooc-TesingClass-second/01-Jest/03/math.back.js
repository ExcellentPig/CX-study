test('测试6与6相匹配', () => {
	// toBe 匹配器  精确匹配
	expect(6).toBe(6)
})

test('测试6与6相匹配', () => {
	// toEqual 匹配器  只测试内容相等
	const a = { one: 1 }
	expect(a).toEqual({ one: 1 })
})

test('测试6与6相匹配', () => {
	// toBeNull 
	const a = null
	expect(a).toBeNull()
})

test('测试6与6相匹配', () => {
	// toBeUndefined 
	const a = undefined
	expect(a).toBeUndefined()
})

test('not匹配器', () => {
	const a = 1
	expect(a).not.toBeFalsy()
})

test('toMatch', ()=>{
	const str = 'http://www.aaa.com'
	expect(str).toMatch(/www/)
})

test('toContain', ()=>{
	const arr = [1,2,3,4,5] // 数组 Set
	expect(arr).toContain(1)
})

const throwError = () => {
	throw new Error('this is a new error')
}
test('toThrow', () => {
	expect(throwError).toThrow('this is a new error')
})

// 命令行o 模式需要配合git