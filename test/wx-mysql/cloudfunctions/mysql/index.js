// 云函数入口文件
const cloud = require('wx-server-sdk')

// 引入mysql
const mysql = require('mysql2/promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	try {
		const conncetion = await mysql.createConnection({
			host: 'localhost',
			database: 'nodemysql',
			user: 'root',
			password: 'root',
			port: 3306
		})
		const [rows, fields] = await conncetion.execute('SELECT * FORM nideshop_product')
		return rows
	} catch (err) {
		console.log('error: ', err)
		return err
	}
}