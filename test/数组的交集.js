let arr1 = [1, 1, 2, 3, 3, 4, 5]
let arr2 = [2, 2, 3, 6, 6, 7]

// ES5 
// var intersection = arr1.filter(x => arr2.indexOf(x) > -1)
// console.log(intersection) // 有重复值

// ES6
// let aSet = new Set(arr1)
// let bSet = new Set(arr2)
// let intersection = Array.from(new Set(arr1.filter(v => bSet.has(v))))
// console.log(intersection)

// ES7
// let intersection = arr1.filter(v => arr2.includes(v))
// console.log(intersection) // 有重复值

let arr3 = [2, 10, 11]

function intersection(...args) {
	// console.log(args)
	let newArr = args.reduce((a, b) => a.filter(c => b.includes(c)))
	// console.log(newArr)
	return newArr
}
// console.log(intersection(arr1, arr2))
console.log(intersection(arr1, arr2, arr3))

//---------------------------------------------

function intersection1() {
	var result = [];
	var lists;
	if (arguments.length === 1) {
		lists = arguments[0];
	} else {
		lists = arguments;
	}
	for (var i = 0; i < lists.length; i++) {
		var currentList = lists[i];
		for (var y = 0; y < currentList.length; y++) {
			var currentValue = currentList[y];
			if (result.indexOf(currentValue) === -1) {
				var existsInAll = true;
				for (var x = 0; x < lists.length; x++) {
					if (lists[x].indexOf(currentValue) === -1) {
						existsInAll = false;
						break;
					}
				}
				if (existsInAll) {
					result.push(currentValue);
				}
			}
		}
	}
	return result;
}
console.log(intersection1(arr1, arr2, arr3))


// ----------------------------------------

// 两个数组的情况
var intersection3 = function(arr1, arr2) {
	var length = arr1.length;
	var result = [];
	var i;
	for (i = 0; i < length; i++) {
		if (result.indexOf(arr1[i]) >= 0)
			continue;
		else {
			if (arr2.indexOf(arr1[i]) >= 0)
				result.push(arr1[i]);
		}
	}
	return result;
}