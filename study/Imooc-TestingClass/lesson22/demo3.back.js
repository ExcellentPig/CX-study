jest.mock('./demo3') //自动去__mocks__下去找

//jest.unmock('./demo3') //取消模拟

import {fetchData} from './demo3'

const { getNumber } = jest.requireActual('./demo3') //这样表示 从真正的函数中拿取方法 而不是在mock中

// import axios from 'axios'
// jest.mock('axios')

// test(`fetchData测试`,()=>{
// 	axios.get.mockResolvedValue({
// 		data: "(function(){return '123'})()"
// 	})
// 	return fetchData().then(data=>{
// 		expect(eval(data)).toEqual('123') //eval可执行
// 	})
// })


//直接模拟fetchData这个方法
test(`fetchData测试`,()=>{
	return fetchData().then(data=>{
		expect(eval(data)).toEqual('123') //eval可执行
	})
})

test(`getNumber测试`,()=>{
	expect(getNumber()).toEqual(23) //错误 这里开启了mock会在mock中查看是否有该方法
})