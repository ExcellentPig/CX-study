// const dabaojian = require('./dabaojian.js');
// const { baojian1,baojian2 } = dabaojian;

import { baojian1,baojian2 } from './dabaojian.js'

test('baojian1方法-300yuan',()=>{
	expect(baojian1(300))
	.toBe('good') //匹配器
})

test('baojian2方法-2000yuan',()=>{
	expect(baojian2(2000))
	.toBe('best')
})