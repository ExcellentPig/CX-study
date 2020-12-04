// 处理业务逻辑的中间  读取文件数据 
const path = require('path')
const fileUtils = require('../utils/file_utils.js')
module.exports = async (ctx, next) => {
	//根据请求的url来进行文件的读取
	const url = ctx.request.url
	// console.log(url)
	
	let filePath = url.replace('/api', '')
	filePath = '../data' + filePath + '.json'
	filePath = path.join(__dirname, filePath)
	try{
		const ret = await fileUtils.getFileJsonData(filePath)
		// console.log(filePath)
		ctx.response.body = ret
	}catch(error){
		const errorMsg = {
			message: '读取失败，文件不存在',
			status: 404
		}
		ctx.response.body = JSON.stringify(errorMsg)
	}
	await next()
}