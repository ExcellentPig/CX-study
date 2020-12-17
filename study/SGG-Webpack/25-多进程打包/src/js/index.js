import { mul } from './test.js'
import '../css/index.css'

function sum (...args) {
	return args.reduce((p,c) => p+c, 0) // 0 是初始化值
}
console.log(mul(2, 4))

console.log(sum(1,2,3,4,5,6))
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
