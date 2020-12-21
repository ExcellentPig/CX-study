const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'bulid')
	},
	module: {
		rules: [
			/**
			 * js兼容性处理  babel-loader
			 * 	 npm install babel-loader @babel/preset-env @babel/core -D
			 * 		1、 基本js兼容性处理 @babel/preset-env 
			 * 			只能转换基本语法 promise这些高级语法就不能转换了
			 *		2、全部js的兼容性处理
			 * 			@babel/polyfill
			 * 			import '@babel/polyfill' js文件引入即可
			 * 			问题： 这是 全部解决 引入了全部代码 体积太大
			 * 		3、 按需加载兼容性
			 * 			corejs //  npm i core-js -D // @core/js
			 */
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					// 预设：指示babel做怎么样的兼容性处理
					presets: [ // 注意这里需要两个数组包裹
						['@babel/preset-env',
						{
							// 按需加载
							useBuiltIns: 'usage',
							// 知道corejs的版本
							corejs: {
								version: 3 // 注意corejs的版本
							},
							// 指定兼容性做到那个版本浏览器
							targets: {
								chrome: '60',
								firefox: '60',
								ie: '9',
								safari: '10',
								edge: '17'
							}
						}]
					]
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
}