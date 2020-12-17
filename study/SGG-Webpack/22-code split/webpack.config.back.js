/**
 * 代码分割
 * 
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: { // 多入口 输出对应的bundle
		index: './src/js/index.js',
		test: './src/js/test.js'
	},
	output: {
		filename: 'js/[name].[contenthash:10].js', // 取出对应文件名
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		})
	],
	mode: 'production'
}
