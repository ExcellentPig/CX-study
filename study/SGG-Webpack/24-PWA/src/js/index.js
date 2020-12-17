import { mul } from './test.js'
import '../css/index.css'

function sum (...args) {
	return args.reduce((p,c) => p+c, 0) // 0 是初始化值
}
console.log(mul(2, 4))

console.log(sum(1,2,3,4,5,6))

// 注册serviceworker
// 处理兼容问题
/*
"eslistConfig": {
    "extends": "airbnb-base",
	"env": {
		"browser": true
	}
  },
  
  eslint 不认识 window,navigator全局变量
	解决需要修改package.json配置 "browser": true
	
	sw代码必须运行在服务器上
		1、nodejs
		2、npm i server -g
		server -s build 启动服务器 将build目录下的所有资源暴露出去
*/
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(() => {
				console.log('serviceworker注册成功')
			})
			.catch(() => {
				console.log('serviceworker注册失败')
			})
	})
}
