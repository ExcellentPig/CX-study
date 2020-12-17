const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 * entry 入口起点
 * 	1、string
 * 		单入口
 * 		打包形成一个chunk, 输出一个bundle文件
 * 		此时chunk的默认名字是main
 *  2、array
 * 		多入口
 * 		所有入口文件最终只会形成一个chunk,输出出去就只有一个bundle
 *  3、object
 * 		多入口
 * 		有几个入口文件就形成几个chunk 就输出几个文件
 * 		chunk名词是key
 * 
 * 		特殊用法
 * 			混合用法
 * 	
 */

module.exports = {
	// entry: './src/index.js',
	// entry: ['./src/index.js', './src/add.js'],
	// entry: {
	// 	index: './src/index.js',
	// 	add: './src/add.js'
	// },
	entry: {
		index: ['./src/index.js', './src/count.js'],
		add: './src/add.js'
	},
	output: {
		// filename: 'built.js',
		filename: '[name].js',
		path: resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	mode: 'development'
}