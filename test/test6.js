/*
浅拷贝
*/

//1、Object.assign()
//	数组
/*
let arr = [1,2,3,[10,20,30]];
let newArr = Object.assign(arr);
newArr[3][0] = 100;
console.log(arr);
console.log(newArr);
*/

//	对象
/*
let obj = {
	a:1,
	b:2,
	c:{
		m:10,
		n:20
	}
}
let newObj = Object.assign(obj);
newObj.c.m = 100;
console.log(obj);
console.log(newObj);
*/

//2、扩展运算符
// 数组
/*
let arr = [1,2,3,[10,20,30]];
let newArr = [...arr];
newArr[3][0] = 100;
console.log(arr);
console.log(newArr);
*/
// 对象
/*
let obj = {
	a:1,
	b:2,
	c:{
		m:10,
		n:20
	}
}
let newObj = { ...obj }
console.log(obj)
console.log(newObj)
*/

//3、遍历
//	数组
/*
let arr = [1,2,3,[10,20,30]];
let newArr = [];
arr.forEach((item)=>{
	newArr.push(item)
})
newArr[3][0] = 100;
console.log(arr);
console.log(newArr);
*/

//	对象
/*
let obj = {
	a:1,
	b:2,
	c:{
		m:10,
		n:20
	}
}
let newObj = {}
for(let key in obj) {
	newObj[key] = obj[key]
}
newObj.c.m = 100
console.log(obj)
console.log(newObj)
*/


/*
深拷贝
*/

//1、lodash插件中的cloneDeep()
/*
const _ = require('lodash')
let arr = [1,2,3,[10,20,30]]
let newArr = _.cloneDeep(arr);
newArr[3][0] = 100;
console.log(arr)
console.log(newArr)
*/

//2、JSON.parse() + JSON.stringify()
/*
let arr = [1,2,3,[10,20,30]];
let newArr = JSON.parse(JSON.stringify(arr))
newArr[3][0] = 100;
console.log(arr)
console.log(newArr)
*/

//3、手写
function deepClone(obj) {
	function isObject(para) {
		return (typeof para === 'object' || typeof para==='function') && para!==null;
	}
	if(!isObject(obj)) {
		return obj;
	}
	let cloneObj = Array.isArray(obj) ? []:{};
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
		}
	}
	return cloneObj;
}
let arr = [1, 2, 3, [10, 20, 30]];
let newArr = deepClone(arr);
newArr[3][0] = 100;
console.log(arr);
console.log(newArr);


let obj = { a: 1, b: 2, c: { m: 10, n: 20 } }
let newObj = deepClone(obj);
newObj.c.m = 100;
console.log(obj);
console.log(newObj)

//----------------------------------

// 深拷贝

function clone(source){
    var result;
    if(Object.prototype.toString.call(source)==='[object Object]'){
        result = {};
    }else if(Object.prototype.toString.call(source)==='[object Array]'){
        result = []
    }else{
        return;
    }
    for(var attr in source){
        if(Object.prototype.toString.call(source[attr])==='[object Array]' || Object.prototype.toString.call(source[attr])==='[object Object]'){
            result[attr] = clone(source[attr])
        }else{
            result[attr] = source[attr];
        }
    }
    return result;
}