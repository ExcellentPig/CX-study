/**
 * 使用dll技术对某些库(第三方)进行单独打包
 *  当运行webpack 默认查找 webpack.config.js配置文件
 *  
 *  webpack --config webpack.dll.js 可以运行
 */
const { resolve } = require('path')
const Webpack = require('webpack')
module.exports = {
	entry: {
		// 最终打包生成的[name] 
		// 'jQuery' 要打包的库
		jquery: ['jQuery']
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dll'),
		library: '[name]_[hash]', //打包的库里面向外暴露出去的内容叫什么名字
	},
	plugins: [
		// 打包生成一个manifest.json 提供一个jquery映射
		new Webpack.DllPlugin({
			name: '[name]_[hash]', // 映射库的暴露的内容名称
			path: resolve(__dirname, 'dll/manifest.json') // 输出文件的路径
		})
	],
	mode: 'production'
}