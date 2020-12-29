/**
 * fs.stat 检查是文件还是目录
 * fs.mkdir 创建目录
 * fs.writeFile 创建写入文件
 * fs.appendFile 最佳文件
 * fs.readFie 读取文件
 * fs.readdir 读取目录
 * fs.rename 重命名 移动
 * fs.rmdir 删除目录
 * fs.unlink 删除文件
 */

const fs = require('fs')
// fs.stat('./html', function(err, data) {
// 	if (err) {
// 		console.log(err)
// 		return 
// 	}
// 	console.log(`是文件${data.isFile()}`)
// 	console.log(`是目录${data.isDirectory()}`)
// })

// fs.stat('./package.json', function(err, data) {
// 	if (err) {
// 		console.log(err)
// 		return 
// 	}
// 	console.log(`是文件${data.isFile()}`)
// 	console.log(`是目录${data.isDirectory()}`)
// })


// fs.mkdir('./css', (err) => {
// 	if (err) {
// 		console.log(err, '创建失败')
// 		return
// 	}
// 	console.log('创建成功')
// })


// fs.writeFile('./html/index.html', 'hello nodejs', (err) => {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log('success')
// })

// fs.appendFile('./css/base.css', 'body{color: red; padding: 0}', (err) => {
// 	if (err) {
// 		console.log(err)
// 		return 
// 	}
// 	console.log('success')
// })


// fs.readFile('./html/index.html', (err, data) => {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log(data)
// 	console.log(data.toString()) // Buffer 转换成string
// })


// fs.readdir('./html', (err, data) => {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log(data)
// })

// ./css/base.css  ./html/index.css 移动
// fs.rename('./css/base.css', './css/index.css', (err)=> {
// 	if (err) {
// 		console.log(err)
// 		return
// 	}
// 	console.log('success')
// })

fs.unlink('./html/index.html', (err) => {
	fs.rmdir('./html', (err) => {
		if (err) {
			console.log(err)
			return
		}
		console.log('success')
	})
})

// fs.unlink('./css/index.css', (err) => {
// 		if (err) {
// 			console.log(err)
// 			return
// 		}
// 		console.log('success')
// })