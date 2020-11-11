/*
vue2.x 中是通过defineProperty来实现响应式数据的

vue3.x中是通过Proxy来实现响应式数据的
*/

// let obj = { name: 'khan', age: 18 }
// let state = new Proxy(obj, {
// 	get(obj, key) {
// 		//console.log(obj,key)
// 		return obj[key]
// 	},
// 	set(obj, key, value) {
// 		console.log(obj,key,value)
// 		obj[key] = value
// 	}
// })

// // console.log(state.name)

// state.name = 'rs'
// console.log(obj)


let arr = [1,3,5]
let state = new Proxy(arr, {
	get(obj, key) {
		console.log(obj,key)
		return obj[key]
	},
	set(obj, key, value) {
		console.log(obj,key,value)
		obj[key] = value
		return true //告诉当前的操作是否成功
	}
})


//console.log(state[1])
state.push(7)