// 读取文件的工具方法
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
	// 根据路径 读取内容
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (error, data) => {
			if (error) {
				// 读取文件失败
				reject(error)
			} else {
				// 读取成功
				resolve(data)
			}
		})
	})
}