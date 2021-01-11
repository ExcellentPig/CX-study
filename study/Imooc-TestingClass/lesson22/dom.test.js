import addDivToBody from './dom'
import $ from 'jquery'

test('测试 addDivToBody',()=>{
	addDivToBody()
	addDivToBody()
	
	expect($('body').find('div').length).toBe(2)
	
	console.log($('body').find('div').length)
})

//node 不具备DOM
// jest在node环境下自己模拟了一套DOM的API---jsDOM