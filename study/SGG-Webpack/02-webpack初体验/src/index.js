/*
index.js webpack 入口起点文件
	1、运行指令
		开发环境  webpack ./src/index.js -o ./build/bulit.js --mode=development
		生产环境  webpack ./src/index.js -o ./build/bulit.js --mode=production
	2、结论
		1、webpack能处理js/json资源，不能处理css/img等其他资源
		2、生产环境更简洁 压缩代码
		3、生产和开发环境 将ES6模块化编译成浏览器能识别的模块化
*/

// import './index.css' // 需要配置

// JS 和 json 都是默认支持的
import data from './data.json'
console.log(data)

function add (x, y) {
	return x + y;
}
console.log(add(1, 2))