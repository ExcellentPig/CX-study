// const math = require('./math.js');
// const { add,minus,multi } = math;

import { add,minus,multi } from './math.js'

test('测试加法',()=>{
	expect(add(3,3)).toBe(6);
})
test('测试减法',()=>{
	expect(minus(3,3)).toBe(0);
})
test('测试乘法',()=>{
	expect(multi(3,3)).toBe(9);
})