console.log('index.js')

// import { mul } from './test.js'

// console.log(mul(3, 4))

document.getElementById('btn').onclick = function () {
	//console.log(mul(4, 4))
	// 懒加载  当文件需要使用时再加载
	// webpackPrefetch: true 预加载  会提前加载js文件  等其他资源加载完毕浏览器空闲了 再偷偷加载资源
	// 正常加载可以认为是并行加载(同一时间加载多个文件)
	import (/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({mul}) => {
			console.log(mul(4, 5))
		})
}