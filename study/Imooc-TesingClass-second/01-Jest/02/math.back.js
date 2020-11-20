const  math = require('./math.js')
const { add, minus, multi } = math

test('测试加法3+7', () => {
	expect(add(3, 3)).toBe(6)
})
test('测试减法6-3', () => {
	expect(minus(6, 3)).toBe(3)
})
test(`测试3*3`, () => {
	expect(multi(3, 3)).toBe(9)
})