/**
 * loader 
 * 	1、下载 2、配置loader
 * plugin 
 * 	1、下载 2、引入 3、使用
 */


const { resolve } = require('path') 

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			
		]
	},
	plugins: [
		// html-webpack-plugin
		// 功能：默认会创建一个空HTML，引入打包输出的所有资源(css/js)
		// 需求：需要有结构的HTML
		new HtmlWebpackPlugin({
			// 复制./src/index.html 文件 并自动引入引入打包输出的所有资源(css/js)
			template: './src/index.html'
		})
	],
	mode: 'development'
}