
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/index.js', // 单入口
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
	/**
	 * 可以将node_modules中代码但单独打包成一个chunk
	 * 自动分析多入口chunk中， 有没有公共的文件 如果有就打包成单独的chunk
	 */
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	mode: 'production'
}
