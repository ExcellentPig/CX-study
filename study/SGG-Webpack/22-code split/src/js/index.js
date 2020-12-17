function sum (...args) {
	return args.reduce((p,c) => p+c, 0) // 0 是初始化值
}

/**
 * 通过js代码 将某文件打包成单独的chunk
 * import 动态导入语法： 能将某个文件单独打包
 * webpackChunkName: 'test' 设置文件名
 */
import (/* webpackChunkName: 'test' */'./test')
	.then((res) => {
		// 加载成功
		console.log(res)
	})
	.catch(() => {
		console.log('文件加载失败')
	})

console.log(sum(1,2,3,4,5,6))
