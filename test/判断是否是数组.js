let arr = [1, 2, 3, 4]

// 1
// console.log(typeof arr) // object

// 2
//console.log(arr instanceof Array) // true

// 3
// console.log(arr.constructor == Array) // true

// 4
//console.log(Object.prototype.toString.call(arr) === '[object Array]') // true
// 封装
// function isArray (o) {
// 	return Object.prototype.toString.call(o) === '[object Array]'
// }
// console.log(isArray(arr)) // true


// 5
console.log(Array.isArray(arr)) // true
