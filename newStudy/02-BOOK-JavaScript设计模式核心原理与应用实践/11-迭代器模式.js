/*
迭代器模式
	提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示
*/

//ES6 迭代器
const arr = [1, 2, 3]
const iterator = arr[Symbol.iterator]()
iterator.next()
iterator.next()
iterator.next()
//等价于
const iterator = arr[Symbol.iterator]()
let now = { done: false }
while(!now.done) {
	now = iterator.next()
	if (!now.done) {
		console.log(`现在遍历到了${now.value}`)
	}
}
// 迭代器生产函数
function *iteratorGenerator() {
	yield '1号选手'
	yield '2号选手'
	yield '3号选手'
}
const iterator = iteratorGenerator()
iterator.next()
iterator.next()
iterator.next()
//迭代器生成函数
function iteratorGenerator (list) {
	var idx = 0
	var len = list.length
	return {
		next: function () {
			var done = idx >= len
			var value = !done ? list[idx++] : undefined,
			return {
				done: done,
				value: value
			}
		}
	}
}
var iterator = iteratorGenerator(['1号选手', '2号选手', '3号选手'])
iterator.next()
iterator.next()
iterator.next()