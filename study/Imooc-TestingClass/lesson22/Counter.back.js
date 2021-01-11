import Counter from './Counter'

describe('Counter测试代码',()=>{
	let counter = null;
	beforeAll(() => { //所有测试用例之前
		console.log('BeforeAll')
		//counter = new Counter() //这样全局公用一个counter
	})
	
	beforeEach(() => { //每个测试用例之前
		console.log('beforeEach')
		counter = new Counter() //每个测试用例开始之前都会重新创建一个counter
	})
	
	afterEach(() => { //每个测试用例之后执行
		console.log('afterEach')
	})
	
	afterAll(() => { //所有测试用例之后执行
		console.log('afterAll')
	})
	
	describe('测试增加相关的代码', () => {
		test(`测试Counter中的addOne方法`, () => {
			console.log('addOne')
			counter.addOne()
			expect(counter.number).toBe(1)
		})
		test(`测试Counter中的addTwo方法`, () => {
			console.log('addTwo')
			counter.addTwo()
			expect(counter.number).toBe(2)
		})
	})
	
	describe('测试减少相关的代码', () => {
		//添加only表示只执行这一个用例
		test.only(`测试Counter中的minusOne方法`, () => {
			console.log('minusOne')
			counter.minusOne()
			expect(counter.number).toBe(-1)
		})
		test(`测试Counter中的minusTwo方法`, () => {
			console.log('minusTwo')
			counter.minusTwo()
			expect(counter.number).toBe(-2)
		})
	})
})