const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'bulid')
	},
	module: {
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// 压缩配置
			minify: { // 配置html压缩
				collapseWhitespace: true, // 溢出空格
				removeComments: true // 溢出注释
			}
			
		})
	],
	mode: 'production'
}