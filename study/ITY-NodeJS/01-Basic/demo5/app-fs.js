const fs = require('fs')

let path = './upload'

fs.stat(path, (err, data) => {
	if (err) {
		// 执行创建目录
		mkdir(path)
		return
	}
	if (!data.isDirectory()) {
		// 先删除
		fs.unlink(path, (err) => {
			if (!err) {
				// 执行创建目录
				mkdir(path)
			} else {
				console.log('创建失败', err)
			}
		})
	}
})

// 创建目录的方法
function mkdir(dir) {
	fs.mkdir(dir, (err) => {
		if (err) {
			console.log(err)
			return
		}
		console.log('mkdir success')
	})
}
