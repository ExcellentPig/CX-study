import NewBaoJian from './newBaojian.js'
const baojian = new NewBaoJian()


describe('我是父级分组', () => {
	afterEach(()=>{
		console.log('father afterEach')
	})
	describe('zs相关', () => { //分组
		afterEach(() => {
			console.log('zs afterEach')
		})
		test.only('测试 zscome in ', () => {
			baojian.person(1)
			baojian.demo1()
			console.log(baojian.fuwu)
			expect(baojian.fuwu)
				.toEqual("zscome in ")
		})
		test('测试 zsdemo4', () => {
			baojian.person(1)
			baojian.demo4()
			console.log(baojian.fuwu)
			expect(baojian.fuwu)
				.toEqual("zsdemo4")
		})
	})

	describe('ls相关', () => {
		afterEach(() => {
			console.log('ls afterEach')
		})
		test('测试 lscome out ', () => {
			baojian.person(20)
			baojian.demo2()
			console.log(baojian.fuwu)
			expect(baojian.fuwu)
				.toEqual("lscomeout")
		})

		test('测试 lsdemo3 ', () => {
			baojian.person(20)
			baojian.demo3()
			console.log(baojian.fuwu)
			expect(baojian.fuwu)
				.toEqual("lsdemo3")
		})
	})
})
