import addDivToBody from './demo'
import $ from 'jquery'

test('测试addDivToBody', ()=>{
	addDivToBody();
	console.log($('body').find('div').length)
	expect($('body').find('div').length).toBe(1)
})