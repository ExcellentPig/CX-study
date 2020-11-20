import Counter from './Counter.js'

let counter = null 
beforeAll(() => {
	console.log('beforeAll')
})

beforeEach(() => {
	console.log('beforeEach')
	counter = new Counter()
})

afterEach(() => {
	console.log('afterEach')
})

afterAll(() => {
	console.log('afterAll')
})

describe('add', () => {
	afterEach(() => {
		console.log('分组内的生命周期')
	})
	test('测试addOne方法', () => {
		console.log('addOne')
		counter.addOne()
		expect(counter.number).toBe(1)
	})
	test('测试addTwo方法', () => {
		console.log('addTwo')
		counter.addTwo()
		expect(counter.number).toBe(2)
	})
})

describe('minus', ()=>{
	test('测试minusOne方法', () => {
		console.log('minusOne')
		counter.minusOne()
		expect(counter.number).toBe(-1)
	})
	// test.only
	test('测试minusTwo方法', () => {
		console.log('minusTwo')
		counter.minusTwo()
		expect(counter.number).toBe(-2)
	})
})