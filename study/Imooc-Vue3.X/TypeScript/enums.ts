//枚举

// enum Direction {
// 	Up=10,
// 	Down,
// 	Left,
// 	Right
// }

//console.log(Direction.Up) // 没赋值的会自动递增
// console.log(Direction[0])


// enum Direction {
// 	Up='UP',
// 	Down='DOWN',
// 	Left='LEFT',
// 	Right='RIGHT'
// }
// const value = 'UP'
// if(value === Direction.Up) {
// 	console.log('upupupupup')
// }

// console.log(Direction.Up)

//常量枚举  不会把全部枚举编译长JS代码
const enum Direction {
	Up='UP',
	Down='DOWN',
	Left='LEFT',
	Right='RIGHT'
}
const value = 'UP'
if(value === Direction.Up) {
	console.log('upupupupup')
}