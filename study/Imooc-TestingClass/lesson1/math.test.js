//原始 实现方法
// var result = add(3,7);
// var expected = 10;
// if(result !== 10) {
// 	throw Error(`3+7应该等于${expected} 但是结果是${result}`);
// }

// var result = minus(3,3);
// var expected = 0;
// if(result !== 0) {
// 	throw Error(`3-3应该等于${expected} 但是结果是${result}`);
// }

// 现在
function expect(result) {
	return {
		toBe: function(actual) {
			if(result !== actual) {
				throw new Error(`预期值和实际值不相等，预期${actual}结果却是${result}`)
			}
		}
	}
}
// expect(add(3,3)).toBe(6);

function test(desc,fn) {
	try {
		fn();
		console.log(`${desc}通过测试`)
	}catch(e) {
		console.log(`${desc}没有通过测试 ${e}`)
	}
}

test('测试加法',()=>{
	expect(add(3,3)).toBe(6);
})
test('测试减法',()=>{
	expect(minus(3,3)).toBe(6);
})
test('测试乘法',()=>{
	expect(multi(3,3)).toBe(9);
})