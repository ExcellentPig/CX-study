// 云函数入口文件
const cloud = require('wx-server-sdk')

// 引入mysql
const mysql = require('mysql2/promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	try {
		const conncetion = await mysql.createConnection({
			host: '10.10.10.246',
			database: 'nodemysql',
			user: 'root',
			password: 'root'
		})
		const [rows, fields] = await conncetion.execute('SELECT version();')
		return rows
	} catch (err) {
		console.log('error: ', err)
		return err
	}
}