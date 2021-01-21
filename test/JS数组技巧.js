// 1、删除数组的重复项
var fruits = ['banana', 'apple', 'orange', 'watermelon', 'apple', 'orange', 'grape', 'apple']
// 第一种方式
var uniqueFruits = Array.from(new Set(fruits))
console.log(uniqueFruits)
// 第二种
var uniqueFruits2 = [...new Set(fruits)]
console.log(uniqueFruits2)

// 2、替换数组中的特定值
var userNames = ['小智0', '小智1', '小智2', '小智3', '小智4', '小智5']
userNames.splice(0, 2, '小智替换位置0', '小智替换位置1')
console.log(userNames)

//3、Array.from 达到map效果
var friends = [
	{ name: '小智', age: 22 },
	{ name: '张三', age: 23 },
	{ name: '李四', age: 24 },
	{ name: '王五', age: 22 },
	{ name: '小六', age: 21 },
]
var friendsName = Array.from(friends, ({ name }) => name)
console.log(friendsName)

// 4、置空数组
var friends = [
	{ name: '小智', age: 22 },
	{ name: '张三', age: 23 },
	{ name: '李四', age: 24 },
	{ name: '王五', age: 22 },
	{ name: '小六', age: 21 },
]
friends.length = 0
console.log(friends)

// 5、数组转换为对象
var friends = ['小智', '前端小智', '大志', '前端大志']
var friendsObj = { ...friends }
console.log(friendsObj)

// 6、用数据填充数组
var newArray = new Array(10).fill(1)
console.log(newArray)

// 7、数组合并
var fruits = ['apple', 'banana', 'orange']
var meat = ['poultry', 'beef', 'fish']
var vegetables = ['potato', 'tomato', 'cucumber']
var food = [...fruits, ...meat, ...vegetables]
console.log(food)

// 8、两个数组的交集
var numOne = [0, 2, 4, 6, 8, 8]
var numTwo = [1, 2, 3, 4, 5, 6]
var duplicateValues = [...new Set(numOne)].filter(item => numTwo.includes(item))
console.log(duplicateValues)

// 9、从数组中删除虚值
var mixedArr = [0, 'blue', '', NaN, 9, true, undefined, 'white', false]
var trueArr = mixedArr.filter(Boolean)
console.log(trueArr)

// 10、从数组中获取随机值
var names = ['小智随机1', '小智随机2','小智随机3','小智随机4','小智随机5','小智随机6']
var randomName = names[(Math.floor(Math.random() * (names.length)))]
console.log(randomName)

// 11、反转数组
var names = ['小智随机1', '小智随机2','小智随机3','小智随机4','小智随机5','小智随机6']
var reverseColors = names.reverse()
console.log(reverseColors)

// 12、lastIndexOf() 方法
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7]
var lastIndex = nums.lastIndexOf(5) // 最后一个5的下标
console.log(lastIndex)

// 13、对数组中所有值求和
var nums = [1, 5, 2, 6]
var sum = nums.reduce((x, y) => x + y)
// var sum = nums.reduce((x, y) => x + y, 0) // 可以设置初始值
console.log(sum)