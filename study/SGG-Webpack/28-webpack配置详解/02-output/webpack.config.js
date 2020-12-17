const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
	entry: './src/index.js',
	output: {
		// 文件名称 (指定目录)
		filename: '[name].js',
		// 输出文件目录(将来所有资源输出的公共目录)
		path: resolve(__dirname, 'build'),
		// 所有资源引用的公共路径前缀 -> 路径的前面  一般用于生产环境
		publicPath: '/',
		// 非入口chunk的名称(入口chunk entry指定的)
		chunkFilename: 'js/[name]_chunk.js',
		// 暴露给外部的变量
		library: '[name]', // 全局整个库向外暴露的变量名
		// libraryTarget: 'window', //变量名添加到那个属性上去 browser
		// libraryTarget: 'commonjs',
		libraryTarget: 'global'
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	mode: 'development'
}