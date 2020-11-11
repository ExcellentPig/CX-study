import NewBaoJian from './newBaojian.js'
const baojian = new NewBaoJian()

beforeAll(()=>{ //所有测试用例之前执行
	console.log('beforeAll')
})

beforeEach(()=>{ //在每一个测试用例之前执行
	console.log('beforeEach')
})

test('测试 zscome in ',()=>{
	baojian.person(1)
	baojian.demo1()
	console.log(baojian.fuwu)
	expect(baojian.fuwu)
	.toEqual("zscome in ")
})

test('测试 lscome out ',()=>{
	baojian.person(20)
	baojian.demo2()
	console.log(baojian.fuwu)
	expect(baojian.fuwu)
	.toEqual("lscomeout")
})

test('测试 lsdemo3 ',()=>{
	baojian.person(20)
	baojian.demo3()
	console.log(baojian.fuwu)
	expect(baojian.fuwu)
	.toEqual("lsdemo3")
})

test('测试 zsdemo4',()=>{
	baojian.person(1)
	baojian.demo4()
	console.log(baojian.fuwu)
	expect(baojian.fuwu)
	.toEqual("zsdemo4")
})

afterEach(()=>{ //每个测试用例执行完成之后
	console.log('afterEach')
})

afterAll(()=>{ //所有测试用例完成之后
	console.log('afterAll')
})
